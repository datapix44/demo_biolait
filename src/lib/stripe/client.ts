import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-05-27.dahlia",
    });
  }
  return stripeClient;
}

export const PREMIUM_PRICE_ID = process.env.STRIPE_PRICE_ID_PREMIUM!;

export async function createCheckoutSession(
  userId: string,
  userEmail: string,
  priceId: string = PREMIUM_PRICE_ID
) {
  const stripe = getStripe();

  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?upgrade=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?upgrade=canceled`,
    locale: "fr",
  });
}

export async function createPortalSession(stripeCustomerId: string) {
  const stripe = getStripe();

  return stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
  });
}
