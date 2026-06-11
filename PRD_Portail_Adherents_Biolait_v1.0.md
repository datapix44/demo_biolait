# PRD — Portail Adhérents Biolait
**Version 1.0 — Document de référence post-réunion client du 11 juin 2026**
**Rédigé par : DATAPIX (Vincent)**
**Date : 11 juin 2026**
**Statut : Soumis pour validation client**

---

## Table des matières

1. [Résumé exécutif](#1-résumé-exécutif)
2. [Contexte et objectifs](#2-contexte-et-objectifs)
3. [Parties prenantes](#3-parties-prenantes)
4. [Périmètre fonctionnel](#4-périmètre-fonctionnel)
5. [Personas utilisateurs](#5-personas-utilisateurs)
6. [User Stories par module](#6-user-stories-par-module)
7. [Exigences fonctionnelles détaillées](#7-exigences-fonctionnelles-détaillées)
8. [Règles métier](#8-règles-métier)
9. [Catalogue des notifications](#9-catalogue-des-notifications)
10. [Tableaux de bord](#10-tableaux-de-bord)
11. [Exigences non-fonctionnelles](#11-exigences-non-fonctionnelles)
12. [Architecture fonctionnelle](#12-architecture-fonctionnelle)
13. [Critères d'acceptation](#13-critères-dacceptation)
14. [Planning et jalons](#14-planning-et-jalons)
15. [Risques et mitigation](#15-risques-et-mitigation)
16. [Questions ouvertes et points à confirmer](#16-questions-ouvertes-et-points-à-confirmer)
17. [Glossaire](#17-glossaire)

---

## 1. Résumé exécutif

Le **Portail Adhérents Biolait** est une plateforme web unique regroupant deux modules fonctionnels distincts, accessibles via une authentification commune :

- **Brique AT (Apport Total)** : module de déclaration mensuelle du volume de lait livré hors Biolait, avec déduction automatique sur la facturation mensuelle de l'adhérent. **Priorité absolue. Cible bêta : septembre 2026.**
- **Brique PO (Programmes Opérationnels)** : module de gestion des dossiers de justification de dépenses dans le cadre du programme UE PAC lait bio, avec suivi d'enveloppe budgétaire et gestion documentaire. Seconde priorité, calendrier à affiner.

Ce portail est le premier espace numérique dédié aux adhérents de Biolait. Il s'inscrit dans une démarche de modernisation des outils internes, en remplacement du CRM historique "BDD" en fin de vie (projet distinct). La décision technologique (solution no-code Glide vs développement sur mesure) est encore en cours d'arbitrage et n'est pas tranchée dans ce document.

---

## 2. Contexte et objectifs

### 2.1 Contexte général

Biolait est une coopérative/structure de collecte de lait biologique qui travaille avec environ **1 100 adhérents** (producteurs/éleveurs). Aujourd'hui, aucun espace numérique dédié n'existe pour les adhérents. Les échanges se font principalement par téléphone, email, et via un CRM interne vieillissant.

Deux problématiques opérationnelles distinctes motivent ce projet :

**Problématique AT :** Certains adhérents livrent une partie de leur lait à d'autres acheteurs (hors Biolait). Biolait a besoin que ces adhérents déclarent chaque mois le volume total de lait produit, afin de déduire le montant correspondant à cet "apport total" sur leur facture mensuelle. Actuellement, ce processus est géré manuellement, avec environ 15 cas déclarés. La montée en charge est attendue à 200, 300, 500 voire 1 100 adhérents à terme.

**Problématique PO :** L'Union Européenne a ouvert un programme de subventions PAC pour le lait biologique. Biolait a déposé un dossier programme qui a été accepté. Chaque adhérent éligible dispose d'une enveloppe budgétaire annuelle (environ 2 000 €/an, soit ~4 000 € sur 2 ans, dans le cadre d'un programme sur 3 ans). Les adhérents doivent justifier leurs dépenses en téléchargeant des pièces justificatives. Aujourd'hui, ce processus n'est pas digitalisé.

### 2.2 Objectifs du projet

| Objectif | Module | Priorité |
|---|---|---|
| Permettre la déclaration mensuelle en ligne du volume lait hors-Biolait | AT | P0 |
| Automatiser l'alimentation du processus de facturation à partir des déclarations | AT | P0 |
| Envoyer des rappels automatiques aux adhérents avant la date limite de déclaration | AT | P1 |
| Donner à Biolait une vue centralisée des déclarations avec export CSV | AT | P0 |
| Permettre aux adhérents de soumettre et suivre leurs dossiers PO en ligne | PO | P1 |
| Permettre à Justine (Biolait) de valider les dossiers PO et de suivre les justificatifs | PO | P1 |
| Suivre en temps réel la consommation de l'enveloppe budgétaire par adhérent | PO | P1 |
| Offrir un portail unique avec authentification partagée pour les deux modules | Auth | P0 |
| Permettre à l'administrateur Biolait d'activer/désactiver l'accès par module | Admin | P0 |

---

## 3. Parties prenantes

### 3.1 Côté Biolait (client)

| Rôle | Nom/Fonction | Implication |
|---|---|---|
| Porteur projet / référent principal | Nicolas COURAUD (Resp. informatique) | Validation fonctionnelle, décisions projet, interlocuteur DATAPIX |
| Gestionnaire PO | Justine (Chargée partenariat financier) | Utilisation quotidienne Brique PO, validation des dossiers adhérents |
| DAF | Non nommé | Consultation lecture seule, indicateurs AT et PO |
| Équipe Cécile | Cécile et son équipe | Concernée par le futur module gestion des contrats (hors périmètre V1) |
| Adhérents (producteurs laitiers) | ~1 100 au total | Utilisateurs finaux des deux briques |

### 3.2 Côté DATAPIX (prestataire)

| Rôle | Nom | Implication |
|---|---|---|
| Responsable projet / développement | Vincent | Conception, réalisation, déploiement |

### 3.3 Matrice RACI simplifiée

| Décision / Activité | Nicolas | Justine | DAF | Vincent |
|---|---|---|---|---|
| Validation fonctionnelle PRD | A/R | C | I | R |
| Définition des types d'actions PO | R | R | — | I |
| Validation des dossiers PO | — | R | — | — |
| Activation des comptes adhérents | R/A | R (PO) | — | I |
| Recette / tests d'acceptation | A | R (PO) | I | R |
| Mise en production | A | — | — | R |

---

## 4. Périmètre fonctionnel

### 4.1 Dans le périmètre — V1

**Module Authentification & Administration**
- Portail web unique, responsive
- Authentification par email + mot de passe
- Page d'accueil post-connexion avec accès aux modules activés pour l'adhérent
- Import de la base adhérents via CSV (email, identifiant adhérent 4-5 chiffres, nom de l'exploitation)
- Gestion des droits par module par l'administrateur Biolait (activation/désactivation AT et/ou PO par adhérent)
- Réinitialisation de mot de passe
- Profils : adhérent, gestionnaire Biolait, DAF (lecture seule), administrateur

**Brique AT**
- Déclaration mensuelle du volume de lait total livré hors Biolait (volume global, sans détail par client/destination)
- Interface mobile-first
- Historique des déclarations par adhérent
- Date limite de déclaration : aux alentours du 20 de chaque mois (à confirmer — Q-10)
- Rappels automatiques par email et/ou SMS avant la date limite
- Tableau de bord adhérent : déclarations passées, statut du mois en cours, quota annuel
- Tableau de bord Biolait : liste de toutes les déclarations, vue par période
- Export CSV des déclarations (Biolait uniquement — pas de bouton côté adhérent)
- Intégration/alimentation du processus de facturation mensuelle (volume AT déduit de la facture lait)

**Brique PO**
- Interface desktop-orientée
- Navigation par thème (3 thèmes, ~40 types d'actions/dépenses réparties entre les thèmes — liste à finaliser avec Justine)
- Téléchargement de documents PDF vierges (modèles non-nominatifs) selon l'action sélectionnée
- Upload de pièces justificatives dans des emplacements typés (devis/contrat, facture, preuve de paiement, formulaires, attestations)
- Renommage automatique des fichiers à l'upload : `<YYYYMMDD>_<identifiant_adherent>_<nom_action>`
- Sauvegarde partielle d'un dossier sans validation finale
- Validation finale d'un dossier par l'adhérent une fois tous les documents déposés
- Suivi de statut : initié → documents déposés → soumis → vérifié/validé par Biolait
- Suivi de l'enveloppe budgétaire : saisie du montant, décrémentation, visualisation du solde (adhérent et admin)
- Notification à Justine (Biolait) lors de la complétude d'un dossier
- Tableau de bord gestionnaire Biolait (Justine) : liste des dossiers, statuts, indicateurs macro
- Export synthèse Biolait : liste des exploitations avec fichiers déposés et noms de fichiers
- Conditions d'accès : convention signée avec Biolait ; création de compte par Biolait après demande de l'adhérent par email PO dédié

### 4.2 Hors périmètre V1 (explicitement exclus)

| Élément | Statut |
|---|---|
| Module gestion des contrats (signature électronique, contrat rachat, Cerfa) | Mis en attente — bloc optionnel dans le devis, implique DAF et équipe Cécile |
| Détail par client/destination dans les déclarations AT | Non requis — déclaration globale mensuelle uniquement |
| Intégration temps réel avec les systèmes existants Biolait | Hors périmètre — réinjections CSV ponctuelles uniquement |
| Suivi multi-annuel cumulatif des enveloppes PO | Hors V1 |
| Notification retour adhérent après validation Biolait (PO) | Non décidé — voir Q-08 |
| Application mobile native (iOS/Android) | Non requis — portail web responsive suffit |
| Archivage automatisé des documents PO | Non requis en V1 — archivage manuel hors outil |

---

## 5. Personas utilisateurs

### Persona 1 — L'adhérent déclarant AT (mobile)

**Profil :** Éleveur/producteur laitier, 35–60 ans, à l'aise avec un smartphone mais peu habitué aux interfaces complexes. Travaille en extérieur ou à l'étable. Accède au portail principalement sur téléphone entre deux tâches.

**Besoins :**
- Déclarer son volume mensuel rapidement, en quelques clics
- Être rappelé automatiquement avant la date limite
- Voir l'historique de ses déclarations et son quota restant

**Critère de succès :** La déclaration se fait en moins de 2 minutes sur mobile, avec confirmation claire.

---

### Persona 2 — L'adhérent déposant PO (desktop)

**Profil :** Éleveur/producteur laitier éligible au programme PO, motivé pour obtenir les subventions européennes. Démarche plus administrative, accès depuis un ordinateur.

**Besoins :**
- Comprendre les actions éligibles et les documents requis
- Télécharger les bons modèles de documents
- Déposer les justificatifs dans les bons emplacements
- Suivre l'avancement de son dossier et le solde de son enveloppe

**Critère de succès :** L'adhérent sait à tout moment où en est son dossier et combien il lui reste d'enveloppe disponible.

---

### Persona 3 — Justine (gestionnaire PO, Biolait)

**Profil :** Collaboratrice Biolait en charge du suivi du programme PO. Utilise le portail depuis un poste de travail fixe. Suit les dossiers de plusieurs centaines d'adhérents potentiels.

**Besoins :**
- Être notifiée quand un dossier est complet
- Accéder aux pièces justificatives déposées et les valider
- Avoir une vue synthétique sur l'ensemble des dossiers
- Exporter une synthèse pour reporting

**Critère de succès :** Zéro dossier "perdu". Temps de traitement d'un dossier divisé par deux.

---

### Persona 4 — DAF (lecture seule)

**Profil :** Responsable administratif et financier de Biolait. Accède au portail pour consultation uniquement, sans interaction sur les données.

**Besoins :**
- Visualiser les données AT (volumes déclarés, impact facturation)
- Visualiser les données PO (enveloppes engagées, dossiers validés)

**Critère de succès :** Accès immédiat aux indicateurs clés sans solliciter les équipes.

---

### Persona 5 — Administrateur Biolait (Nicolas ou délégué)

**Profil :** Collaborateur Biolait en charge de la gestion des comptes du portail.

**Besoins :**
- Importer la liste des adhérents via CSV
- Activer/désactiver l'accès à chaque module (AT et/ou PO) par adhérent
- Gérer les comptes (création, désactivation, réinitialisation)

---

## 6. User Stories par module

### 6.1 Module Authentification & Administration

| ID | En tant que | Je veux | Afin de |
|---|---|---|---|
| AUTH-01 | Adhérent | Me connecter avec mon email et mon mot de passe | Accéder à mon espace personnel |
| AUTH-02 | Adhérent | Réinitialiser mon mot de passe par email | Retrouver l'accès en cas d'oubli |
| AUTH-03 | Adhérent | Voir sur la page d'accueil les modules auxquels j'ai accès | Naviguer directement vers la bonne brique |
| AUTH-04 | Admin Biolait | Importer la liste des adhérents via un fichier CSV | Initialiser la base utilisateurs sans saisie manuelle |
| AUTH-05 | Admin Biolait | Activer ou désactiver l'accès à la Brique AT pour un adhérent | Contrôler qui peut faire des déclarations AT |
| AUTH-06 | Admin Biolait | Activer ou désactiver l'accès à la Brique PO pour un adhérent | Contrôler qui peut soumettre des dossiers PO |
| AUTH-07 | Admin Biolait | Créer un compte adhérent manuellement | Traiter les demandes d'accès au cas par cas |
| AUTH-08 | Admin Biolait | Désactiver un compte adhérent | Bloquer l'accès en cas de départ ou de non-renouvellement |

### 6.2 Brique AT

| ID | En tant que | Je veux | Afin de |
|---|---|---|---|
| AT-01 | Adhérent AT | Déclarer mon volume mensuel de lait livré hors Biolait | Remplir mon obligation déclarative |
| AT-02 | Adhérent AT | Recevoir un rappel par email et/ou SMS avant le 20 du mois | Ne pas oublier ma déclaration |
| AT-03 | Adhérent AT | Voir la confirmation de ma déclaration après soumission | M'assurer que ma déclaration est bien enregistrée |
| AT-04 | Adhérent AT | Consulter l'historique de mes déclarations passées | Suivre mes volumes déclarés mois par mois |
| AT-05 | Gestionnaire Biolait | Voir toutes les déclarations AT du mois en cours | Suivre la collecte des déclarations |
| AT-06 | Gestionnaire Biolait | Exporter les déclarations AT en CSV | Alimenter le processus de facturation |
| AT-07 | Gestionnaire Biolait | Identifier les adhérents n'ayant pas encore déclaré | Relancer manuellement si nécessaire |
| AT-08 | DAF | Consulter les volumes déclarés sur une période | Avoir une vision financière des apports totaux |

### 6.3 Brique PO

| ID | En tant que | Je veux | Afin de |
|---|---|---|---|
| PO-01 | Adhérent PO | Voir les 3 thèmes disponibles et sélectionner un thème | Naviguer vers les actions qui me concernent |
| PO-02 | Adhérent PO | Voir la liste des types d'actions pour le thème choisi | Identifier l'action correspondant à ma dépense |
| PO-03 | Adhérent PO | Télécharger les documents PDF vierges associés à une action | Obtenir les modèles à remplir manuellement |
| PO-04 | Adhérent PO | Créer un nouveau dossier pour une action sélectionnée | Initier ma demande de subvention |
| PO-05 | Adhérent PO | Uploader mes pièces justificatives dans les emplacements typés prévus | Déposer mes documents au bon endroit |
| PO-06 | Adhérent PO | Sauvegarder mon dossier partiellement sans le valider | Revenir compléter mes documents plus tard |
| PO-07 | Adhérent PO | Valider définitivement mon dossier quand tous les documents sont présents | Soumettre ma demande à Biolait |
| PO-08 | Adhérent PO | Voir le statut de chaque dossier soumis | Suivre l'avancement de mes demandes |
| PO-09 | Adhérent PO | Voir le solde disponible de mon enveloppe budgétaire | Gérer mes demandes dans la limite de mon budget |
| PO-10 | Adhérent PO | Saisir le montant de chaque dépense | Permettre le suivi de consommation de l'enveloppe |
| PO-11 | Justine | Être notifiée quand un dossier adhérent est complet | Traiter les dossiers sans délai |
| PO-12 | Justine | Accéder à tous les documents d'un dossier | Vérifier la conformité des pièces justificatives |
| PO-13 | Justine | Valider ou rejeter un dossier avec commentaire | Clore le processus de validation |
| PO-14 | Justine | Voir le tableau de bord avec tous les dossiers et leurs statuts | Gérer sa charge de travail |
| PO-15 | Justine | Exporter une synthèse des dossiers et fichiers | Répondre aux obligations de reporting programme |
| PO-16 | DAF | Consulter les indicateurs macro du programme PO | Avoir une vision budgétaire consolidée |

---

## 7. Exigences fonctionnelles détaillées

### 7.1 Module Authentification & Administration

**7.1.1 Authentification**
- Connexion par email + mot de passe
- Gestion des sessions avec expiration configurable
- Réinitialisation de mot de passe par lien email (validité 24h)
- Page d'accueil post-connexion : affichage conditionnel des modules selon les droits activés
- Si aucun module n'est activé : message explicatif invitant à contacter Biolait

**7.1.2 Import CSV**
- Format CSV attendu : `email`, `identifiant_adherent` (4-5 chiffres), `nom_exploitation`
- Import non destructif : les comptes existants ne sont pas supprimés, les nouveaux sont créés
- Rapport d'import : nombre de lignes traitées, erreurs (email invalide, doublon, etc.)
- Réinjection possible pour mises à jour ponctuelles

**7.1.3 Gestion des droits**

Pour chaque adhérent, l'admin peut :
- Activer/désactiver l'accès AT
- Activer/désactiver l'accès PO
- Désactiver le compte (accès révoqué à tout)

**7.1.4 Profils utilisateurs**

| Profil | Accès AT | Accès PO | Admin |
|---|---|---|---|
| Adhérent (AT activé) | Déclaration | Non (sauf si PO activé) | Non |
| Adhérent (PO activé) | Non (sauf si AT activé) | Dossiers | Non |
| Gestionnaire Biolait | Lecture/export | Validation dossiers | Partiel |
| DAF | Lecture seule | Lecture seule | Non |
| Admin Biolait | Toutes actions | Toutes actions | Oui |

---

### 7.2 Brique AT — Exigences détaillées

**7.2.1 Déclaration mensuelle**
- Formulaire de déclaration : champ unique "Volume livré hors Biolait ce mois-ci (en litres)"
- Déclaration par période mensuelle (mois + année)
- Impossible de déclarer deux fois pour le même mois (modifiable jusqu'à la date limite)
- Passée la date limite (~20 du mois), la déclaration est verrouillée sauf intervention admin
- Confirmation visuelle et email de confirmation après soumission réussie

**7.2.2 Quota annuel**
- Quota maximum : **10 000 L/an par adhérent**
- Le portail affiche le cumul annuel déclaré et le quota restant
- Comportement au dépassement du quota : à définir (blocage ou avertissement — voir Q-11)

**7.2.3 Historique adhérent**
- Liste des déclarations passées : mois/année, volume déclaré, statut (soumis / pris en compte / hors délai)
- Accessible depuis l'espace personnel de l'adhérent

**7.2.4 Vue gestionnaire Biolait**
- Liste de tous les adhérents AT avec statut de déclaration pour le mois en cours (déclaré / non déclaré)
- Volume déclaré par adhérent, filtrable par période et par statut

**7.2.5 Export CSV (Biolait uniquement)**
- Bouton visible uniquement dans l'interface gestionnaire/admin, **pas dans l'espace adhérent**
- Colonnes : `identifiant_adherent`, `nom_exploitation`, `email`, `mois`, `annee`, `volume_declare_litres`, `date_soumission`
- Filtrable par période avant export

**7.2.6 Intégration facturation**
- Les données AT alimentent le processus de facturation mensuelle
- Modalité technique (webhook, export CSV planifié, API) : à définir en phase de conception
- Le volume déclaré est déduit de la facture lait mensuelle de l'adhérent
- Point d'intégration critique avec les systèmes Biolait existants (voir Risques §15)

---

### 7.3 Brique PO — Exigences détaillées

**7.3.1 Catalogue thèmes et actions**
- Structure à 2 niveaux : **Thème → Action**
- 3 thèmes (intitulés à confirmer — ex. : prairies, production végétale, production animale, équipements)
- ~40 types d'actions/dépenses au total, réparties entre les 3 thèmes
- Certains documents PDF sont partagés entre plusieurs actions
- Le catalogue est maintenu par l'administrateur Biolait (CRUD dans l'interface admin)

**7.3.2 Documents PDF vierges**
- Pour chaque action : liste des documents PDF vierges téléchargeables (modèles non-nominatifs)
- Un même PDF peut être lié à plusieurs actions
- Les PDFs sont stockés dans le portail et téléchargeables par l'adhérent

**7.3.3 Création et gestion d'un dossier**
- Un dossier = une action sélectionnée + documents justificatifs
- Un adhérent peut avoir plusieurs dossiers ouverts simultanément (actions différentes)
- Emplacements typés par dossier :
  - Devis / Contrat
  - Facture
  - Preuve de paiement
  - Formulaires
  - Attestations
- Sauvegarde partielle possible à tout moment
- Saisie du montant de la dépense associée au dossier

**7.3.4 Renommage automatique des fichiers**
- À l'upload, renommage automatique selon : `<YYYYMMDD>_<identifiant_adherent>_<nom_action>`
- Exemple : `20261015_0427_achat-semences-bio.pdf`
- Le nom d'origine du fichier n'est pas conservé (ou conservé en métadonnée uniquement)

**7.3.5 Validation et cycle de vie d'un dossier**

```
Initié → Documents déposés → Soumis → En cours de vérification → Validé / Rejeté
```

| Statut | Déclencheur |
|---|---|
| Initié | Dossier créé, aucun document déposé |
| Documents déposés | Au moins un document déposé, pas encore soumis |
| Soumis | Adhérent a cliqué "Valider" — emplacements obligatoires remplis |
| En cours de vérification | Justine a pris en charge le dossier |
| Validé | Justine a approuvé le dossier |
| Rejeté | Justine a refusé le dossier (motif obligatoire) |

**7.3.6 Suivi de l'enveloppe budgétaire**
- Enveloppe initialisée par l'admin lors de l'activation du compte PO (~2 000 €/an en moyenne)
- À chaque dossier soumis : le montant saisi est soustrait de l'enveloppe disponible
- Affichage adhérent : enveloppe totale, montant engagé, solde disponible
- Suivi multi-annuel cumulatif : **hors V1**

**7.3.7 Vue gestionnaire Justine**
- Tableau de bord : liste de tous les dossiers avec statut, adhérent, action, montant, date de soumission
- Filtres : statut, thème, adhérent, période
- Actions : Valider, Rejeter (motif obligatoire en cas de rejet)
- Export synthèse CSV : exploitations, actions, fichiers déposés (nom renommé, date de dépôt)

---

## 8. Règles métier

### 8.1 Règles métier — Brique AT

| ID | Règle |
|---|---|
| AT-RM-01 | Un adhérent ne peut déclarer que s'il a un **contrat de rachat de lait** signé avec Biolait et l'accès AT activé par l'admin |
| AT-RM-02 | La déclaration est **mensuelle** — une par mois par adhérent |
| AT-RM-03 | Le **quota annuel** est de **10 000 litres par adhérent** |
| AT-RM-04 | La **date limite de déclaration** est aux alentours du **20 de chaque mois** (à confirmer et configurable par l'admin) |
| AT-RM-05 | Passée la date limite, la déclaration est **verrouillée** — seul l'admin peut la modifier |
| AT-RM-06 | Le volume déclaré est exprimé en **litres entiers** |
| AT-RM-07 | L'export CSV est disponible **uniquement pour Biolait** (gestionnaire/admin), pas pour l'adhérent |
| AT-RM-08 | Les données déclarées alimentent le **processus de facturation** : le volume AT est déduit de la facture mensuelle lait |
| AT-RM-09 | Les rappels sont envoyés par **email et/ou SMS** |
| AT-RM-10 | Un adhérent peut **modifier** sa déclaration du mois en cours avant la date limite |

### 8.2 Règles métier — Brique PO

| ID | Règle |
|---|---|
| PO-RM-01 | Un adhérent ne peut accéder à la Brique PO que s'il a une **convention signée** avec Biolait et l'accès PO activé |
| PO-RM-02 | L'accès PO est créé par Biolait **à la demande** de l'adhérent (email à l'adresse PO dédiée) |
| PO-RM-03 | L'**enveloppe budgétaire** est initialisée par l'admin lors de l'activation PO |
| PO-RM-04 | Chaque dépense saisie **décrémente l'enveloppe** dès la soumission du dossier |
| PO-RM-05 | Un dossier ne peut être **soumis** que si tous les emplacements documentaires obligatoires sont remplis |
| PO-RM-06 | La sauvegarde **partielle** est autorisée à tout moment |
| PO-RM-07 | Les fichiers uploadés sont **automatiquement renommés** : `<YYYYMMDD>_<id_adherent>_<nom_action>` |
| PO-RM-08 | Un même document PDF vierge peut être associé à **plusieurs actions** |
| PO-RM-09 | La **notification à Justine** est déclenchée automatiquement lors du passage du dossier au statut "Soumis" |
| PO-RM-10 | La notification retour vers l'adhérent après validation Biolait est **à définir** (voir Q-08) |
| PO-RM-11 | Le budget est sur **année civile** dans le cadre d'un programme 3 ans |
| PO-RM-12 | Le suivi multi-annuel cumulatif est **hors V1** |

---

## 9. Catalogue des notifications

### 9.1 Brique AT

| ID | Déclencheur | Destinataire | Canal | Contenu |
|---|---|---|---|---|
| NOTIF-AT-01 | Rappel J-5 avant date limite (~15 du mois) | Adhérent AT non encore déclarant | Email + SMS | "Rappel : vous n'avez pas encore déclaré votre volume AT pour [mois]. Date limite : [date]. [Lien]" |
| NOTIF-AT-02 | Rappel J-1 avant date limite | Adhérent AT non encore déclarant | Email + SMS | "Dernier rappel : demain est la date limite de déclaration AT pour [mois]. [Lien]" |
| NOTIF-AT-03 | Soumission réussie d'une déclaration | Adhérent AT | Email | "Votre déclaration AT de [mois] a bien été enregistrée : [volume] litres." |
| NOTIF-AT-04 | Modification d'une déclaration | Adhérent AT | Email | "Votre déclaration AT de [mois] a été modifiée : nouveau volume [volume] litres." |

*Note : les préférences de canal (email uniquement, SMS uniquement, les deux) sont à définir — voir Q-12.*

### 9.2 Brique PO

| ID | Déclencheur | Destinataire | Canal | Contenu |
|---|---|---|---|---|
| NOTIF-PO-01 | Dossier soumis par l'adhérent | Justine (Biolait) | Email | "Nouveau dossier PO complet de [Nom exploitation] — Action : [nom action]. [Lien vers dossier]" |
| NOTIF-PO-02 | Dossier validé par Biolait | Adhérent PO | TBD | À définir — voir Q-08 |
| NOTIF-PO-03 | Dossier rejeté par Biolait | Adhérent PO | TBD | À définir — motif de rejet inclus |
| NOTIF-PO-04 | Activation du compte PO | Adhérent PO | Email | "Votre accès au module Programmes Opérationnels a été activé. [Lien + instructions]" |

### 9.3 Authentification

| ID | Déclencheur | Destinataire | Canal | Contenu |
|---|---|---|---|---|
| NOTIF-AUTH-01 | Création de compte | Adhérent | Email | Email de bienvenue avec lien de première connexion / initialisation de mot de passe |
| NOTIF-AUTH-02 | Demande de réinitialisation mot de passe | Adhérent | Email | Lien sécurisé de réinitialisation (validité 24h) |

---

## 10. Tableaux de bord

### 10.1 Dashboard adhérent AT (mobile-first)

- **Carte "Déclaration du mois en cours"** : statut (à déclarer / déclaré), bouton d'action principal
- **Barre de progression quota annuel** : X litres déclarés / 10 000 L — [Y] restants
  - Code couleur : vert (<80%) / orange (80–95%) / rouge (>95%)
- **Liste des 12 derniers mois** : mois, volume déclaré, statut
- **Bandeau d'alerte** si date limite proche et déclaration non faite

*Contrainte UX : bouton de déclaration accessible en 1 tap depuis la page d'accueil du module. Formulaire = 1 seul champ + confirmer.*

### 10.2 Dashboard adhérent PO (desktop-orienté)

- **Jauge enveloppe budgétaire** : total alloué / engagé / disponible
- **Tableau des dossiers en cours** : action, thème, statut, montant, date de dernière modification
- **Bouton "Nouveau dossier"**
- **Accès rapide par statut** (initié, soumis, validé, rejeté)
- **Section "Documents disponibles"** : catalogue des PDFs vierges par thème/action

### 10.3 Dashboard gestionnaire Biolait — AT

- Vue mois en cours : nombre d'adhérents AT actifs / ayant déclaré / manquants
- Tableau de tous les adhérents AT avec statut déclaration mois en cours
- Alerte adhérents non déclarants après date limite
- Bouton "Exporter CSV" (avec filtres applicables avant export)

### 10.4 Dashboard gestionnaire Biolait — PO (Justine)

- **Indicateurs macro** :
  - Nombre total de dossiers actifs et répartition par statut
  - Total enveloppes allouées vs engagées
  - Nombre d'adhérents PO actifs
- **File de dossiers à traiter** (statut "Soumis") triée par date
- Filtres : statut, thème, adhérent, période
- Bouton "Exporter synthèse CSV"

### 10.5 Dashboard DAF (lecture seule)

**AT :** volumes déclarés cumulés, nombre adhérents actifs, évolution mensuelle
**PO :** enveloppes allouées / engagées / validées, nombre de dossiers par statut

---

## 11. Exigences non-fonctionnelles

### 11.1 Performance

| Exigence | Cible |
|---|---|
| Chargement des pages principales sur 4G | < 3 secondes |
| Taille maximale par document uploadé | 10 Mo (à affiner) |
| Montée en charge | Jusqu'à 1 100 utilisateurs actifs |

### 11.2 Disponibilité

- Cible : 99% hors maintenances planifiées
- Maintenances à éviter autour du 15–20 de chaque mois (période de déclaration AT)

### 11.3 Sécurité

- HTTPS obligatoire
- Isolation des données : un adhérent ne peut accéder qu'à ses propres données
- Les documents uploadés sont accessibles uniquement à l'adhérent concerné et aux gestionnaires Biolait habilités
- Déconnexion automatique après expiration de session
- Logs d'accès aux documents (audit trail basique)

### 11.4 Conformité RGPD

- Base légale : exécution d'un contrat
- Données traitées : email, identifiant adhérent, nom d'exploitation, volumes déclarés, documents justificatifs
- Durée de conservation à définir avec Biolait
- Pas de transfert de données hors UE

### 11.5 Compatibilité

- **Brique AT** : compatible iOS Safari et Android Chrome (versions récentes) — optimisé smartphone
- **Brique PO** : compatible navigateurs desktop (Chrome, Firefox, Edge — versions récentes)
- Pas d'application native requise

### 11.6 Maintenabilité

- Interface d'administration permettant à Biolait de gérer de manière autonome :
  - Catalogue d'actions et documents PDF (Brique PO)
  - Comptes utilisateurs et droits
  - Paramètres de date limite AT
- Documentation utilisateur (guide rapide) à produire pour chaque profil

---

## 12. Architecture fonctionnelle

### 12.1 Vision d'ensemble

```
┌─────────────────────────────────────────────────────────┐
│                PORTAIL ADHÉRENTS BIOLAIT                │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │         COUCHE AUTHENTIFICATION PARTAGÉE         │   │
│  │  Login • Gestion profils • Droits par module     │   │
│  └──────────────────────────────────────────────────┘   │
│                          │                              │
│           ┌──────────────┴──────────────┐               │
│           ▼                             ▼               │
│  ┌─────────────────┐         ┌──────────────────────┐   │
│  │   BRIQUE AT     │         │      BRIQUE PO        │   │
│  │ (Apport Total)  │         │ (Prog. Opérationnels) │   │
│  │                 │         │                       │   │
│  │ • Déclarations  │         │ • Dossiers            │   │
│  │ • Rappels       │         │ • Documents PDF       │   │
│  │ • Export CSV    │         │ • Enveloppes          │   │
│  │ • ← Facturation │         │ • Validation Justine  │   │
│  └─────────────────┘         └──────────────────────┘   │
│           │                             │               │
│           └──────────────┬──────────────┘               │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │              INTERFACE ADMIN BIOLAIT             │   │
│  │  Import CSV • Droits • Paramètres • Reporting    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
              ┌───────────┴────────────┐
              ▼                        ▼
   ┌──────────────────┐     ┌──────────────────────┐
   │  PROCESSUS DE    │     │   SYSTÈMES BIOLAIT   │
   │  FACTURATION     │     │  (import CSV         │
   │  (déduction AT)  │     │   réinjections)      │
   └──────────────────┘     └──────────────────────┘
```

### 12.2 Gestion des accès

- Identifiant unique : **adresse email**
- Après connexion : page d'accueil affichant uniquement les modules dont les droits sont activés
- Un adhérent peut avoir accès à AT seul, PO seul, aux deux, ou à aucun
- L'accès à chaque module est accordé/révoqué indépendamment par l'administrateur Biolait

### 12.3 Chargement initial de la base utilisateurs

- Fichier CSV : `email`, `identifiant_adherent`, `nom_exploitation`
- Création des comptes sans activation de module par défaut
- Réinjections CSV ponctuelles pour les mises à jour

### 12.4 Intégration avec les systèmes existants

- **Facturation AT** : modalité technique à préciser (export CSV planifié, API ou autre)
- **Pas d'intégration temps réel** avec le CRM "BDD" (projet distinct, fin de vie)
- **SMS** : intégration avec un prestataire SMS à sélectionner

### 12.5 Note sur le choix technologique

La décision entre **Glide (no-code)** et **développement sur mesure** est en cours d'arbitrage. Ce PRD est tech-agnostique. Les critères clés :

| Critère | Glide | Développement sur mesure |
|---|---|---|
| Rapidité de mise en place | ++ | + |
| Autonomie de Nicolas COURAUD | ++ | — |
| Volume utilisateurs (jusqu'à 1 100) | Contrainte identifiée | Pas de limite |
| Type d'adresses email (domaine propre) | Contrainte à vérifier | Pas de limite |
| Intégration facturation AT | À évaluer | Maîtrisée |
| Coût initial | + | — |
| Évolutivité long terme | — | ++ |

**Décision à prendre avant le 20 juin 2026** (voir Q-01).

---

## 13. Critères d'acceptation

### 13.1 Module Authentification

| ID | Critère | Condition de succès |
|---|---|---|
| CA-AUTH-01 | Import CSV | Un fichier de 100 lignes est importé sans erreur en moins de 30 secondes |
| CA-AUTH-02 | Connexion | Un adhérent avec droits AT voit uniquement la tuile AT sur sa page d'accueil |
| CA-AUTH-03 | Isolation | Un adhérent ne peut pas accéder aux données d'un autre adhérent |
| CA-AUTH-04 | Gestion des droits | L'admin active/désactive un module pour un adhérent en moins de 3 clics |
| CA-AUTH-05 | Réinitialisation | Le lien de réinitialisation de mot de passe est reçu en moins de 2 minutes |

### 13.2 Brique AT

| ID | Critère | Condition de succès |
|---|---|---|
| CA-AT-01 | Déclaration mobile | Un adhérent déclare son volume mensuel en moins de 2 minutes sur smartphone |
| CA-AT-02 | Double déclaration | Déclarer deux fois pour le même mois affiche un message d'erreur clair |
| CA-AT-03 | Verrouillage | Passé le 20 du mois, le formulaire de déclaration est inaccessible pour l'adhérent |
| CA-AT-04 | Rappels | 5 jours avant la date limite, email ET SMS sont envoyés aux non-déclarants |
| CA-AT-05 | Export CSV | L'export d'un mois donné produit un fichier correct, sans données d'autres mois |
| CA-AT-06 | Quota | Le quota de 10 000 L est affiché correctement et mis à jour après chaque déclaration |
| CA-AT-07 | Restriction export | Le bouton d'export CSV n'est pas visible dans l'interface adhérent |

### 13.3 Brique PO

| ID | Critère | Condition de succès |
|---|---|---|
| CA-PO-01 | Navigation | Un adhérent accède au téléchargement d'un PDF en moins de 3 clics depuis l'accueil PO |
| CA-PO-02 | Renommage fichier | Un fichier uploadé est renommé automatiquement selon `YYYYMMDD_idadherent_nomaction` |
| CA-PO-03 | Sauvegarde partielle | Un dossier partiellement rempli est retrouvé intact à la prochaine connexion |
| CA-PO-04 | Blocage soumission | Il est impossible de soumettre un dossier si un emplacement obligatoire est vide |
| CA-PO-05 | Notification Justine | Justine reçoit un email dans les 5 minutes suivant la soumission d'un dossier complet |
| CA-PO-06 | Enveloppe | Le solde de l'enveloppe est mis à jour après soumission d'un dossier avec montant saisi |
| CA-PO-07 | Cycle de vie | Le cycle initié → soumis → validé fonctionne sans erreur de bout en bout |
| CA-PO-08 | Export synthèse | L'export contient le nom renommé de chaque fichier déposé |

---

## 14. Planning et jalons

### 14.1 Contraintes calendaires

| Contrainte | Détail |
|---|---|
| **Cible bêta AT** | **Septembre 2026** — impératif pour que les adhérents saisissent les données de septembre en vue de la paie d'octobre |
| Objectif initial manqué | Mise en place prévue le 15 juin 2026 non atteinte |
| Congés Justine + Vincent | 1re semaine d'août 2026 |
| Congés Nicolas COURAUD | Mi-juillet → début août 2026 |
| Proximité géographique | DATAPIX et Biolait tous deux à Nantes — ateliers en présentiel facilités |

### 14.2 Jalons proposés — Brique AT (priorité)

| Jalon | Date cible | Description |
|---|---|---|
| **J1 — Validation PRD** | ~20 juin 2026 | Client valide ce document + décision tech Glide vs code |
| J2 — Lancement réalisation AT | ~23 juin 2026 | Démarrage développement/configuration Brique AT |
| J3 — Atelier présentiel Nantes | ~30 juin – 4 juillet | Cadrage technique et UX avec Nicolas et Justine |
| J4 — Version alpha AT (interne) | ~18 juillet 2026 | Version testable en interne DATAPIX |
| *Pause estivale* | Mi-juillet – début août | Congés Nicolas ; Justine + Vincent absents 1re semaine août |
| **J5 — Version bêta AT** | ~18 août 2026 | Version déployée pour tests Biolait |
| J6 — Recette AT | ~25 août – 5 sept. 2026 | Tests d'acceptation avec Nicolas et équipe Biolait |
| **J7 — Mise en production AT** | **~8 septembre 2026** | Disponible pour la déclaration de septembre |
| J8 — Lancement réalisation PO | Septembre/Octobre 2026 | À planifier après mise en production AT |

### 14.3 Note sur la Brique PO

Le calendrier de la Brique PO sera précisé après validation du PRD et mise en production de la Brique AT. Un planning détaillé fera l'objet d'un point séparé.

---

## 15. Risques et mitigation

| ID | Risque | Proba | Impact | Mitigation |
|---|---|---|---|---|
| R-01 | **Décision technologique tardive** (Glide vs code) bloque le démarrage | Haute | Élevé | Décision à prendre avant le 20 juin — condition sine qua non |
| R-02 | **Contraintes Glide** sur le volume utilisateurs (jusqu'à 1 100) et les types d'emails | Haute (si Glide) | Élevé | Tester les limites du plan Maker avec données réelles ; avoir un plan de repli custom code |
| R-03 | **Intégration facturation AT** : processus de facturation Biolait non documenté — point critique | Moyenne | Élevé | Atelier dédié avec DAF/équipe facturation avant conception de l'interface |
| R-04 | **Catalogue actions PO incomplet** : les ~40 types d'actions ne sont pas encore finalisés | Haute | Moyen | Session de travail dédiée avec Justine avant début de réalisation PO |
| R-05 | **Fenêtre de développement courte** pour la bêta AT (juin-août avec congés) | Haute | Élevé | Démarrer dès validation PRD ; prioriser au maximum le scope AT |
| R-06 | **Adoption des adhérents** : éleveurs peu habitués au numérique | Moyenne | Moyen | UX mobile-first ultra simplifiée ; guide rapide ; support Biolait pour l'onboarding |
| R-07 | **Volume documents PO** : croissance rapide des dépôts si nombreux adhérents PO | Faible (V1) | Moyen | Dimensionner le stockage dès le départ |
| R-08 | **RGPD documents PO** : pièces justificatives contenant des données personnelles | Moyenne | Moyen | Politique de conservation et d'accès ; mention dans les CGU |
| R-09 | **SMS** : prestataire non encore choisi | Moyenne | Faible | Email comme fallback si SMS non disponible pour la bêta |
| R-10 | **Périmètre glissant** | Faible | Moyen | Tout ajout fait l'objet d'un avenant documenté |

---

## 16. Questions ouvertes et points à confirmer

### Décisions à prendre avant le démarrage (priorité absolue)

| ID | Question | Responsable | Échéance |
|---|---|---|---|
| **Q-01** | **Choix technologique : Glide ou développement sur mesure ?** Dépend de la validation des contraintes Glide (scale, type email) | Nicolas COURAUD | Avant 20 juin 2026 |
| **Q-02** | **Intégration facturation AT** : quel est exactement le processus de facturation actuel ? Quel format de données est attendu ? Qui est l'interlocuteur côté facturation ? | Nicolas / DAF | Atelier à planifier |
| **Q-03** | **Canal SMS** : quel prestataire ? Les adhérents renseignent leur numéro de téléphone où ? Qui configure les préférences (admin ou adhérent) ? | Nicolas | Avant démarrage AT |

### Décisions à prendre avant la réalisation PO

| ID | Question | Responsable | Échéance |
|---|---|---|---|
| Q-04 | **Liste exacte des 3 thèmes PO** (intitulés à confirmer) | Justine / Nicolas | Avant démarrage PO |
| Q-05 | **Catalogue complet des ~40 actions** : liste à fournir pour implémentation | Justine | Avant démarrage PO |
| Q-06 | **Documents PDF vierges** : qui fournit les modèles ? Nombre total de PDFs distincts ? | Justine | Avant démarrage PO |
| Q-07 | **Emplacements documentaires obligatoires vs optionnels** : pour chaque action, quels types de documents sont requis vs facultatifs ? | Justine | Avant démarrage PO |
| Q-08 | **Notification retour adhérent** après validation/rejet Biolait : oui/non ? Par quel canal ? Quel contenu en cas de rejet ? | Nicolas / Justine | Avant démarrage PO |
| Q-09 | **Montant de l'enveloppe** : identique pour tous (~2 000 €/an) ou variable par adhérent ? Comment transmis à DATAPIX lors de l'activation ? | Nicolas | Avant démarrage PO |

### Points de précision AT

| ID | Question | Responsable | Échéance |
|---|---|---|---|
| Q-10 | **Date limite exacte** : est-ce le 20 de chaque mois, ou variable ? Qui peut la modifier ? | Nicolas | Avant bêta AT |
| Q-11 | **Comportement au dépassement du quota** (10 000 L) : blocage ou simple avertissement ? | Nicolas | Avant bêta AT |
| Q-12 | **Préférences canal de notification** (email/SMS) : configurables par l'admin ? Par l'adhérent ? Les deux ? | Nicolas | Avant bêta AT |
| Q-13 | **Modification d'une déclaration verrouillée** : quel processus pour l'admin de corriger une déclaration après date limite ? | Nicolas | Avant bêta AT |

### Points généraux

| ID | Question | Responsable | Échéance |
|---|---|---|---|
| Q-14 | **Adresse email PO dédiée** pour les demandes d'accès des adhérents : quelle adresse, qui la gère ? | Nicolas | Avant démarrage PO |
| Q-15 | **Format de l'identifiant adhérent** : 4 ou 5 chiffres ? Cas particuliers (lettres) ? | Nicolas | Avant import CSV |
| Q-16 | **Durée de conservation des documents PO** dans le portail | Nicolas / DAF | Avant démarrage PO |
| Q-17 | **Module Contrats** (option devis) : budget séparé ou inclus ? Calendrier indicatif si activé ? | Nicolas / Cécile | Avant signature devis |
| Q-18 | **Accès DAF** : combien de personnes ? Accès aux deux modules ou au choix ? | Nicolas / DAF | Avant démarrage |

---

## 17. Glossaire

| Terme | Définition |
|---|---|
| **Adhérent** | Producteur laitier bio membre de Biolait, utilisateur final du portail |
| **Apport Total (AT)** | Volume total de lait produit par l'adhérent et livré à des acheteurs autres que Biolait |
| **Brique AT** | Module du portail dédié aux déclarations d'Apport Total |
| **Brique PO** | Module du portail dédié à la gestion des dossiers de Programmes Opérationnels |
| **Contrat de rachat de lait** | Contrat liant l'adhérent à Biolait pour la collecte du lait — condition d'accès à la Brique AT |
| **Convention PO** | Accord entre l'adhérent et Biolait pour la participation au Programme Opérationnel — condition d'accès à la Brique PO |
| **DAF** | Direction Administrative et Financière de Biolait — profil lecture seule sur le portail |
| **DATAPIX** | Prestataire en charge de la conception et du développement du portail (Vincent, Nantes) |
| **Enveloppe budgétaire PO** | Budget annuel alloué à chaque adhérent PO pour financer ses dépenses éligibles (~2 000 €/an) |
| **Exploitation** | La ferme/unité de production de l'adhérent |
| **Glide** | Outil no-code envisagé comme alternative au développement sur mesure |
| **Identifiant adhérent** | Code numérique unique à 4-5 chiffres identifiant chaque adhérent dans le système Biolait |
| **Justine** | Gestionnaire Biolait responsable du suivi et de la validation des dossiers PO |
| **Nicolas COURAUD** | Référent projet côté Biolait, interlocuteur principal DATAPIX |
| **PAC** | Politique Agricole Commune (européenne) — cadre des aides et subventions agricoles |
| **Programme Opérationnel (PO)** | Programme de subventions PAC-UE ouvert au lait bio, dont Biolait a déposé le dossier |
| **Quota AT** | Volume maximum déclarable par un adhérent au titre de l'Apport Total : **10 000 L/an** |
| **Thème PO** | Catégorie regroupant des types d'actions/dépenses éligibles au programme PO |
| **Vincent** | Responsable DATAPIX, en charge de la réalisation du portail |

---

*Document rédigé par DATAPIX — Vincent — 11 juin 2026*
*Version 1.0 — Post-réunion client du 11 juin 2026*
*Soumis à la validation de Nicolas COURAUD (Biolait)*
