# Bloc 5 — Design Language & UX Patterns Mansa

## 1. Objectif

Ce document définit les règles d'expérience utilisateur et d'organisation des interfaces de l'ensemble de l'écosystème Mansa.

Toutes les interfaces doivent suivre les mêmes principes, quel que soit le produit.

Produits concernés :

- Site Web
- Application Client
- Application Commerçant
- Application TPE
- Application Admin Lite
- Portail Administrateur
- Portail État
- Annuaire
- API Console
- Interfaces Support

---

# 2. Principes UX

Toute interface Mansa doit respecter les principes suivants :

- compréhension immédiate
- une seule action principale par écran
- navigation prévisible
- sécurité visible
- rapidité
- retour immédiat
- réduction du nombre d'étapes
- cohérence
- accessibilité
- confiance

Une personne découvrant Mansa doit comprendre un écran en moins de cinq secondes.

---

# 3. Architecture globale

Chaque écran doit être construit dans cet ordre :

1. Navigation
2. Titre
3. Résumé
4. Action principale
5. Contenu
6. Actions secondaires
7. Informations complémentaires

Cette hiérarchie ne doit jamais être inversée.

---

# 4. Navigation Web

Le site utilise :

Navigation supérieure

↓

Hero

↓

Sections

↓

Call To Action

↓

Footer

Navigation sticky autorisée.

---

# 5. Navigation Mobile

Ordre conseillé

Accueil

Paiements

Cartes

Annuaire

Profil

Maximum :

5 onglets.

Jamais davantage.

---

# 6. Navigation TPE

Accueil

↓

Montant

↓

Choix du paiement

↓

Lecture

↓

Validation

↓

Reçu

Aucun écran inutile.

---

# 7. Navigation Admin

Menu latéral

↓

Tableau de bord

↓

Pages métiers

↓

Fiche détaillée

↓

Historique

↓

Logs

Le menu reste toujours visible.

---

# 8. Dashboard Client

L'écran principal contient :

Bonjour

↓

Solde principal

↓

Cartes

↓

Actions rapides

↓

Historique

↓

Promotions

↓

Actualités

↓

Support

---

# 9. Dashboard Commerçant

Il contient :

CA

↓

Transactions

↓

QR

↓

Produits

↓

Clients

↓

Paiements

↓

Statistiques

↓

Promotions

↓

Support

---

# 10. Dashboard TPE

Écran simplifié.

Montant

↓

Moyen de paiement

↓

Validation

↓

Impression

↓

Historique

↓

Clôture

---

# 11. Dashboard Administrateur

Il contient :

KPIs

↓

Alertes

↓

Transactions

↓

Utilisateurs

↓

Commerçants

↓

Support

↓

Fraudes

↓

Rapports

↓

Logs

---

# 12. Dashboard État

Il contient :

Taxes

↓

Amendes

↓

Paiements

↓

Services

↓

Rapports

↓

Statistiques

↓

Audits

↓

Exports

---

# 13. Historique

Chaque historique possède :

Recherche

↓

Filtres

↓

Liste

↓

Détails

↓

Export

↓

Partage

Chaque ligne affiche :

montant

date

heure

statut

référence

catégorie

---

# 14. Recherche

Toujours disponible.

Elle doit permettre :

recherche instantanée

correction orthographique

historique

résultats récents

résultats favoris

---

# 15. Filtres

Filtres possibles :

Date

Montant

Statut

Pays

Devise

Commerce

Catégorie

Utilisateur

Carte

Compte

---

# 16. Wallet

L'écran Wallet affiche :

Cartes

↓

Comptes

↓

Wallets

↓

Historique

↓

Paramètres

↓

Ajouter

↓

Supprimer

↓

Bloquer

↓

Débloquer

---

# 17. Cartes

Une carte possède :

image

nom

type

statut

expiration

plafond

numéro masqué

actions

---

# 18. Paiement

Le parcours officiel

Choisir

↓

Vérifier

↓

Confirmer

↓

Traiter

↓

Valider

↓

Reçu

Jamais davantage.

---

# 19. Paiement QR

Scanner

↓

Lecture

↓

Résumé

↓

Confirmation

↓

Validation

↓

Reçu

---

# 20. Paiement NFC

Approcher

↓

Lecture

↓

Authentification

↓

Validation

↓

Confirmation

↓

Historique

---

# 21. Paiement partagé

Créer

↓

Ajouter

↓

Répartition

↓

Invitation

↓

Paiement

↓

Suivi

↓

Historique

---

# 22. Virement

Choisir bénéficiaire

↓

Montant

↓

Résumé

↓

Confirmation

↓

Validation

↓

Reçu

---

# 23. Dépôt

Choisir

↓

Montant

↓

Résumé

↓

Validation

↓

Confirmation

---

# 24. Retrait

Montant

↓

Authentification

↓

Validation

↓

Code

↓

Retrait

↓

Historique

---

# 25. KYC

Informations

↓

Document

↓

Selfie

↓

Adresse

↓

Validation

↓

Analyse

↓

Résultat

---

# 26. Création de compte

Téléphone

↓

OTP

↓

Informations

↓

PIN

↓

KYC

↓

Confirmation

---

# 27. Connexion

Téléphone

↓

PIN

ou

Biométrie

↓

Accueil

---

# 28. Mot de passe oublié

Téléphone

↓

OTP

↓

Nouveau code

↓

Connexion

---

# 29. Paramètres

Profil

↓

Sécurité

↓

Cartes

↓

Notifications

↓

Langues

↓

Appareils

↓

Support

↓

À propos

---

# 30. Notifications

Financières

Sécurité

Promotions

Support

État

IA

Commerçant

Système

---

# 31. Support

FAQ

↓

Recherche

↓

Conversation

↓

Appel

↓

Ticket

↓

Historique

---

# 32. IA Jini

Conversation

↓

Actions

↓

Suggestions

↓

Historique

↓

Paramètres

---

# 33. États

Tous les écrans prévoient :

vide

chargement

erreur

succès

hors ligne

mise à jour

désactivé

---

# 34. États vides

Chaque écran vide possède :

illustration

explication

action

---

# 35. Erreurs

Toujours :

titre

explication

solution

bouton

support

---

# 36. Confirmation

Toute action critique demande confirmation :

suppression

blocage

fermeture

remboursement

annulation

---

# 37. Sécurité

Les opérations sensibles affichent :

icône

résumé

authentification

confirmation

---

# 38. Responsive

Mobile

Tablette

Desktop

Grand écran

TPE

Tous les composants doivent fonctionner sur ces cinq formats.

---

# 39. Accessibilité

Navigation clavier

Lecteur d'écran

Contrastes

Focus

Taille dynamique

Réduction des animations

Zones tactiles

---

# 40. Parcours utilisateur

Découverte

↓

Création

↓

Validation

↓

Première transaction

↓

Habitude

↓

Fidélité

↓

Premium

---

# 41. Parcours commerçant

Inscription

↓

Validation

↓

QR

↓

Premier paiement

↓

Historique

↓

Statistiques

↓

Croissance

---

# 42. Parcours administrateur

Connexion

↓

Dashboard

↓

Recherche

↓

Action

↓

Journal

↓

Déconnexion

---

# 43. Parcours État

Connexion

↓

Service

↓

Contrôle

↓

Validation

↓

Rapport

↓

Archivage

---

# 44. Règles de cohérence

Même icône

Même couleur

Même animation

Même vocabulaire

Même logique

Même hiérarchie

Même comportement

---

# 45. Règles de navigation

Jamais plus de trois niveaux de profondeur.

Toujours proposer un retour.

Toujours conserver le contexte.

Ne jamais perdre les données non enregistrées.

---

# 46. Règles de performance

Moins de trois secondes pour afficher un écran.

Moins d'une seconde pour les interactions courantes.

Animations fluides.

Chargement progressif.

---

# 47. Règles UX financières

Toujours afficher :

montant

devise

frais

statut

référence

date

heure

Les montants sensibles peuvent être masqués.

---

# 48. Cohérence inter-produits

Toutes les applications doivent donner l'impression d'appartenir à la même entreprise.

Le vocabulaire, les composants, les animations et les parcours doivent rester identiques.

---

# 49. Validation UX

Une interface est validée si :

elle est comprise immédiatement ;

une nouvelle personne peut réaliser l'action principale sans aide ;

aucune étape n'est inutile ;

la sécurité est visible ;

les erreurs sont compréhensibles ;

les parcours restent rapides.

---

# 50. Règle finale

Chaque écran Mansa doit permettre à l'utilisateur de comprendre :

où il se trouve,

ce qu'il peut faire,

ce qui va se passer,

et comment revenir en arrière,

sans jamais avoir besoin d'explications supplémentaires.
