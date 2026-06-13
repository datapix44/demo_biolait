import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateCreation } from "@/lib/gemini/client";
import { buildCreationPrompt } from "@/lib/gemini/prompts";
import { FREE_TIER_LIMIT } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check subscription and usage
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("plan, generations_used, status")
      .eq("user_id", user.id)
      .single();

    if (
      subscription?.plan === "free" &&
      (subscription?.generations_used ?? 0) >= FREE_TIER_LIMIT
    ) {
      return NextResponse.json(
        { error: "free_limit_reached", message: "Limite du plan gratuit atteinte" },
        { status: 402 }
      );
    }

    const body = await request.json();
    const { prompt, projectId, templateStyle, previousPrompts } = body;

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    // Build optimized prompt
    const fullPrompt = buildCreationPrompt(prompt, {
      templateStyle,
      previousPrompts,
    });

    // Generate with Gemini
    const result = await generateCreation({ prompt: fullPrompt });

    // Increment usage counter
    await supabase
      .from("subscriptions")
      .update({ generations_used: (subscription?.generations_used ?? 0) + 1 })
      .eq("user_id", user.id);

    // Save version to DB if projectId provided
    if (projectId) {
      const { data: versions } = await supabase
        .from("project_versions")
        .select("version_number")
        .eq("project_id", projectId)
        .order("version_number", { ascending: false })
        .limit(1);

      const nextVersion = (versions?.[0]?.version_number ?? 0) + 1;

      await supabase.from("project_versions").insert({
        project_id: projectId,
        version_number: nextVersion,
        prompt_used: fullPrompt,
        metadata: { originalPrompt: prompt, mock: result.mock },
      });
    }

    return NextResponse.json({
      imageBase64: result.imageBase64,
      revisedPrompt: result.revisedPrompt,
      mock: result.mock,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
