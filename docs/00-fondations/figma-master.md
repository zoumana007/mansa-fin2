# Bloc 9 — Figma Master Mansa

## 1. Objectif

Le Figma Master Mansa constitue la source officielle de conception pour toutes les interfaces de l’écosystème.

Il doit permettre à un designer, un développeur, Codex, Claude Code ou toute autre intelligence artificielle autorisée de comprendre précisément :

- l’identité visuelle ;
- les règles d’interface ;
- les composants ;
- les variantes ;
- les états ;
- les animations ;
- les parcours ;
- les tokens ;
- les règles responsive ;
- les règles d’accessibilité ;
- les conventions de nommage ;
- les méthodes de livraison.

Produits concernés :

- site vitrine ;
- application client ;
- application commerçant ;
- application TPE ;
- application Admin Lite ;
- portail administrateur ;
- portail État ;
- annuaire ;
- portail développeur ;
- interfaces partenaires ;
- Jini ;
- outils internes.

## 2. Rôle du fichier Figma Master

Le Figma Master doit être utilisé pour créer les nouvelles interfaces, documenter les composants, valider les parcours, partager les maquettes, générer les spécifications, préparer le développement, vérifier la cohérence, tester les variantes, organiser les prototypes et conserver l’historique du design.

Aucune interface importante ne doit être développée sans référence validée dans le Figma Master ou dans la documentation officielle.

## 3. Principe de source unique

Le fichier Figma Master est la source principale pour les composants visuels, variantes, styles, variables, dimensions, espacements, comportements, prototypes et règles responsive.

Le code reste la source principale pour le comportement réellement livré, les règles métier, la sécurité, les performances, l’accessibilité technique, les données et les permissions.

Figma et le code doivent rester synchronisés.

## 4. Organisation générale

Structure recommandée :

```text
00 — Cover
01 — Foundations
02 — Tokens
03 — Brand
04 — Components
05 — Patterns
06 — Mobile Client
07 — Merchant
08 — TPE
09 — Admin Lite
10 — Admin Web
11 — State Portal
12 — Directory
13 — Developer Portal
14 — Website
15 — Jini
16 — Prototypes
17 — Accessibility
18 — Motion
19 — Handoff
20 — Archive
```

## 5. Page Cover

La page Cover doit contenir le nom du projet, la version, la date de dernière mise à jour, le statut, les responsables, les liens principaux, l’environnement, les avertissements et une description courte.

Exemple :

```text
Mansa Design System
Version 1.0
Source officielle des interfaces Mansa
```

## 6. Page Foundations

Elle doit présenter les principes UX, principes visuels, couleurs, typographie, espacements, grilles, bordures, ombres, icônes, illustrations, photographie, accessibilité et motion.

## 7. Page Tokens

Elle doit contenir toutes les variables de design : couleurs, typographie, espacements, tailles, rayons, bordures, ombres, opacité, profondeur, icônes, durées, easing, breakpoints et grilles.

## 8. Variables Figma

Les variables doivent être utilisées pour éviter les valeurs écrites manuellement.

Collections recommandées :

```text
Mansa / Color
Mansa / Typography
Mansa / Spacing
Mansa / Radius
Mansa / Elevation
Mansa / Motion
Mansa / Layout
Mansa / Platform
```

## 9. Modes de variables

Les collections doivent prévoir plusieurs modes :

```text
Light
Dark
High Contrast
Reduced Motion
Mobile
Tablet
Desktop
TPE
```

Les modes doivent être utilisés uniquement lorsqu’ils apportent une vraie différence.

## 10. Variables de couleur

Structure recommandée :

```text
color/brand/primary
color/brand/secondary
color/brand/premium
color/background/base
color/background/surface
color/background/elevated
color/text/primary
color/text/secondary
color/text/muted
color/border/default
color/status/success
color/status/warning
color/status/danger
color/status/info
```

## 11. Couleurs primitives

Les couleurs primitives doivent être séparées des couleurs sémantiques.

Exemple :

```text
primitive/cyan/500
primitive/blue/600
primitive/violet/500
primitive/green/500
primitive/red/500
primitive/slate/900
```

## 12. Couleurs sémantiques

Les composants doivent utiliser des variables sémantiques.

Exemple :

```text
button/primary/background
button/primary/text
input/border/default
card/background/elevated
status/success/background
```

Il faut éviter d’utiliser directement une couleur primitive dans un composant final.

## 13. Variables de typographie

Structure recommandée :

```text
font/family/primary
font/size/display
font/size/title
font/size/body
font/size/label
font/weight/regular
font/weight/medium
font/weight/semibold
font/weight/bold
font/line-height/tight
font/line-height/normal
font/letter-spacing/display
```

## 14. Styles de texte

Styles recommandés :

```text
Display/Large
Display/Medium
Heading/H1
Heading/H2
Heading/H3
Heading/H4
Body/Large
Body/Medium
Body/Small
Label/Large
Label/Medium
Label/Small
Amount/Hero
Amount/Standard
Metadata
Code
```

## 15. Typographie financière

Les montants doivent utiliser des styles spécifiques :

```text
Amount/Hero
Amount/Card
Amount/Transaction
Amount/Compact
Amount/Negative
Amount/Positive
```

Règles : chiffres tabulaires, devise visible, largeur stable, pas de retour à la ligne, contraste élevé et séparateurs locaux.

## 16. Variables d’espacement

Échelle recommandée :

```text
space/0 = 0
space/1 = 4
space/2 = 8
space/3 = 12
space/4 = 16
space/5 = 20
space/6 = 24
space/8 = 32
space/10 = 40
space/12 = 48
space/16 = 64
space/20 = 80
space/24 = 96
```

## 17. Variables de rayon

Structure recommandée :

```text
radius/none
radius/xs
radius/sm
radius/md
radius/lg
radius/xl
radius/2xl
radius/full
```

Valeurs recommandées : `0, 8, 12, 16, 20, 24, 32, 999`.

## 18. Variables d’ombre

Structure recommandée :

```text
elevation/none
elevation/low
elevation/medium
elevation/high
elevation/floating
elevation/marketing
```

Les ombres doivent être adaptées au mode clair et sombre.

## 19. Variables de motion

Structure recommandée :

```text
motion/duration/instant
motion/duration/short
motion/duration/standard
motion/duration/long
motion/duration/confirmation
motion/easing/standard
motion/easing/smooth
motion/easing/exit
motion/scale/pressed
motion/scale/hover
```

## 20. Page Brand

Elle doit contenir le logo, ses variantes, les zones de protection, tailles minimales, couleurs, interdictions, co-branding, icône d’application, favicon, signature et éléments graphiques.

## 21. Logo principal

Variantes : horizontal, vertical, symbole, monochrome, clair, sombre et petit format.

## 22. Zone de protection

Le logo doit conserver une zone vide minimale autour de lui. Cette zone doit être représentée clairement dans Figma. Aucun élément ne doit entrer dans cette zone.

## 23. Utilisations interdites du logo

Interdictions : étirer, déformer, incliner, recolorer librement, ajouter une ombre non prévue, modifier les proportions, placer sur un fond illisible, animer sans règle ou combiner avec un autre logo sans validation.

## 24. Co-branding

Les compositions avec un partenaire doivent préciser l’ordre des logos, la séparation, les tailles, la responsabilité, le contexte, la version claire, la version sombre et la version mobile.

## 25. Icône d’application

L’icône doit prévoir iOS, Android, web, favicon, notifications, petit format et mode sombre éventuel.

## 26. Page Components

Les composants doivent être organisés par catégories : Actions, Inputs, Navigation, Cards, Lists, Tables, Feedback, Overlays, Finance, Payments, Identity, Charts, Commerce, State, Developer, TPE et Jini.

## 27. Composant principal

Chaque composant doit contenir un composant racine, des propriétés, variantes, états, tailles, contenu, mode clair, mode sombre, responsive, accessibilité et exemples.

## 28. Auto Layout

Tous les composants doivent utiliser Auto Layout lorsque cela est possible.

Règles : éviter les positions absolues inutiles, utiliser les espacements variables, permettre l’adaptation du texte, prévoir les contenus longs, utiliser Hug, Fill et Fixed de manière cohérente et éviter les dimensions rigides sans justification.

## 29. Hug Contents

À utiliser pour les boutons, badges, labels, petits menus et composants à contenu variable.

## 30. Fill Container

À utiliser pour les champs, boutons pleine largeur, sections, cartes, colonnes, tableaux et panneaux.

## 31. Fixed Width

À utiliser seulement pour les icônes, avatars, contrôles fixes, cartes bancaires, appareils et éléments nécessitant une proportion précise.

## 32. Propriétés de composants

Types recommandés : Boolean, Text, Instance swap, Variant et Visibility.

Exemple :

```text
icon-left = true
icon-right = false
loading = false
status = default
size = medium
label = Continuer
```

## 33. Variantes

Les variantes doivent éviter la multiplication inutile.

Exemple :

```text
Type = Primary / Secondary / Tertiary / Danger
Size = Small / Medium / Large
State = Default / Hover / Pressed / Focus / Disabled / Loading
Theme = Light / Dark
```

## 34. Propriétés booléennes

À utiliser pour l’icône, badge, sous-texte, statut, description, bouton secondaire, séparateur et image.

## 35. Instance Swap

À utiliser pour les icônes, avatars, logos, illustrations, moyens de paiement, pays et réseaux.

## 36. Slots

Les composants complexes peuvent prévoir des zones remplaçables : contenu de carte, graphique, footer, action, avatar et panneau secondaire.

## 37. Composants imbriqués

Les composants doivent réutiliser d’autres composants.

Exemple :

```text
Transaction Card
├── Avatar
├── Text Group
├── Amount
├── Status Badge
└── Icon Button
```

## 38. Nommage des composants

Format recommandé :

```text
Mansa / Catégorie / Composant / Variante
```

Exemples :

```text
Mansa / Actions / Button / Primary
Mansa / Finance / Amount / Hero
Mansa / Payments / QR / Scanner
```

## 39. Nommage des variantes

Exemple :

```text
Type=Primary, Size=Medium, State=Default
```

Les noms doivent être courts, stables, compréhensibles et cohérents dans tout le fichier.

## 40. Langue de nommage

Les noms techniques peuvent être en anglais pour faciliter le développement. Le contenu visible par les utilisateurs doit être localisé.

## 41. Description des composants

Chaque composant doit posséder une description Figma précisant usage, contexte, limites, comportement, accessibilité, lien vers la documentation et statut de maturité.

## 42. Statut de maturité

Valeurs recommandées :

```text
Draft
Review
Approved
Deprecated
Experimental
```

## 43. Composants expérimentaux

Ils doivent être clairement identifiés, isolés, non publiés dans la bibliothèque principale, testés, documentés et validés avant utilisation.

## 44. Composants dépréciés

Ils doivent afficher un avertissement, le composant de remplacement, la date de retrait, le guide de migration et l’interdiction de nouvelle utilisation.

## 45. Bibliothèque publiée

Seuls les composants validés doivent être publiés. La bibliothèque principale doit rester propre, stable, documentée, versionnée et sans doublons.

## 46. Page Patterns

Elle doit contenir les compositions réutilisables : connexion, inscription, KYC, paiement, transfert, QR, NFC, historique, filtre, recherche, support, tableau de bord, reçu, erreur et état vide.

## 47. Pattern de connexion

Écrans : téléphone ou identifiant, PIN, biométrie, erreur, verrouillage et succès.

## 48. Pattern d’inscription

Écrans : bienvenue, téléphone, OTP, informations, PIN, KYC et confirmation.

## 49. Pattern KYC

Écrans : introduction, informations, document, selfie, adresse, analyse, résultat et complément demandé.

## 50. Pattern paiement

Écrans : montant, moyen, résumé, authentification, traitement, succès, reçu, erreur et en attente.

## 51. Pattern transfert

Écrans : bénéficiaire, montant, frais, résumé, confirmation, succès, reçu et erreur.

## 52. Pattern QR

Écrans : scanner, code détecté, résumé, paiement, succès, expiration et erreur.

## 53. Pattern NFC

Écrans : prêt, carte détectée, lecture, authentification, succès, erreur et retrait de carte.

## 54. Pattern support

Écrans : accueil, recherche, FAQ, conversation, ticket, suivi et résolution.

## 55. Pattern historique

Écrans : liste, filtres, recherche, détail, reçu, contestation et export.

## 56. Page Mobile Client

Sections recommandées :

```text
00 Onboarding
01 Authentication
02 Home
03 Payments
04 Transfers
05 Cards
06 Wallet
07 Budgets
08 Vaults
09 Directory
10 Jini
11 Notifications
12 Support
13 Profile
14 Settings
15 Security
16 States
```

## 57. Frames mobiles

Tailles de référence :

```text
320 × 568
360 × 800
390 × 844
430 × 932
```

## 58. Safe Areas

Les maquettes mobiles doivent prévoir la barre d’état, l’encoche, Dynamic Island, la barre de navigation, le clavier, les zones système et les gestes.

## 59. Page Merchant

Sections recommandées : onboarding, authentication, dashboard, payments, QR, TPE, products, orders, customers, loyalty, promotions, invoices, stock, reports, team, settings et support.

## 60. Page TPE

Sections recommandées : login, shift, amount, payment method, card, NFC, QR, Mobile Money, split payment, result, receipt, refund, history, closing, offline, settings et errors.

## 61. Frames TPE

Les frames doivent correspondre aux appareils ciblés et prévoir portrait, paysage si nécessaire, clavier, imprimante, batterie, réseau, barre système et gros boutons.

## 62. Page Admin Lite

Sections recommandées : login, dashboard, alerts, transactions, users, merchants, support, incidents, approvals, notifications et settings.

## 63. Page Admin Web

Sections recommandées : login, dashboard, users, merchants, transactions, cards, payments, fraud, KYC, support, partners, state services, reports, audit, roles, settings et system.

## 64. Frames desktop

Tailles de référence :

```text
1280 × 800
1440 × 900
1600 × 1000
1920 × 1080
```

La mise en page doit utiliser des contraintes et une grille.

## 65. Page State Portal

Sections recommandées : authentication, dashboard, fines, taxes, scholarships, education, agents, citizens, payments, reports, audit, services, integrations et settings.

## 66. Page Directory

Sections recommandées : home, search, map, categories, merchant detail, promotions, favorites, reviews, directions, filters et states.

## 67. Page Developer Portal

Sections recommandées : overview, applications, API keys, webhooks, logs, documentation, SDK, environments, usage, billing, support et settings.

## 68. Page Website

Sections recommandées : home, individuals, merchants, businesses, government, cards, payments, directory, Jini, developers, security, pricing, about, news, careers, support, legal et campaigns.

## 69. Frames web marketing

Tailles de référence :

```text
1440 px
1280 px
1024 px
768 px
390 px
320 px
```

Les sections doivent utiliser des composants responsives.

## 70. Page Jini

Sections recommandées : identity, rest, listening, thinking, response, suggestions, actions, errors, privacy, voice et history.

## 71. Page Prototypes

Les prototypes doivent être organisés par produit.

Exemple :

```text
Prototype / Client / Payment
Prototype / Merchant / QR
Prototype / TPE / NFC
Prototype / Admin / Fraud Review
Prototype / Website / Hero
```

## 72. Prototypes prioritaires

Prototypes obligatoires : inscription, connexion, paiement, transfert, carte, QR, NFC, KYC, commerçant, TPE, support, Jini, administration et site web.

## 73. Prototypes réalistes

Les prototypes doivent utiliser des contenus réalistes, montants fictifs, noms fictifs, états complets, erreurs, chargements, retours et navigation.

## 74. Données fictives

Toutes les données de démonstration doivent être fictives.

Interdictions : vrais numéros de carte, vraies clés API, vrais comptes, données personnelles réelles, documents réels, secrets et identifiants internes.

## 75. Connexions de prototypes

Les connexions doivent être nommées, simples, cohérentes, limitées au parcours et faciles à maintenir.

## 76. Variables dans les prototypes

Les variables peuvent gérer le thème, le statut, la progression, les choix, le montant, l’utilisateur, la navigation et l’affichage conditionnel.

## 77. Prototypes conditionnels

Ils peuvent être utilisés pour les erreurs, choix de paiement, états, succès, refus, navigation différente et variantes de rôle.

## 78. Page Accessibility

Elle doit présenter le contraste, le focus, les tailles, la navigation clavier, les lecteurs d’écran, les touch targets, la réduction des mouvements, les textes alternatifs, les erreurs et les états.

## 79. Contrastes

Les combinaisons de couleurs doivent être testées et documentées.

Chaque exemple doit afficher les couleurs, le ratio, l’usage, le statut et la correction éventuelle.

## 80. Focus

Les états de focus doivent être dessinés pour les boutons, champs, liens, cartes, menus, tableaux, modales et commandes.

## 81. Zones tactiles

La zone interactive minimale doit être représentée.

Référence :

```text
44 × 44 px
```

Les icônes peuvent être plus petites, mais leur zone tactile doit rester suffisante.

## 82. Textes dynamiques

Les écrans doivent être testés avec taille normale, taille augmentée, texte long, traduction longue, nom long, montant élevé et devise longue.

## 83. Réduction des mouvements

Les prototypes doivent prévoir une variante réduite pour la 3D, le parallaxe, les transitions, les cartes, Jini, le chargement et le site web.

## 84. Page Motion

Elle doit contenir les tokens, principes, exemples, prototypes, séquences, états, réduction, haptique, sons et 3D.

## 85. Documentation d’une animation

Chaque animation doit préciser le déclencheur, la durée, l’easing, le déplacement, l’échelle, la rotation, l’opacité, l’haptique, le son, le fallback et la plateforme.

## 86. Storyboards

Les animations complexes doivent utiliser un storyboard.

Exemples : paiement réussi, transfert, NFC, carte gelée, ajout au Wallet, Jini et scène web 3D.

## 87. Page Handoff

Elle doit contenir les écrans validés, composants utilisés, tokens, règles responsive, comportements, cas limites, contenus, assets, liens et statut.

## 88. Statut des écrans

Valeurs recommandées :

```text
Draft
In Review
Approved
Ready for Development
In Development
QA
Released
Deprecated
```

## 89. Annotation des écrans

Les annotations doivent préciser le comportement, la règle métier, l’interaction, la permission, l’erreur, le chargement, l’accessibilité, le responsive et la dépendance API.

## 90. Numérotation des écrans

Format recommandé :

```text
Produit.Module.Parcours.Étape
```

Exemple :

```text
CLIENT.PAYMENT.CARD.03
```

## 91. Nommage des frames

Format recommandé :

```text
[Produit] / [Module] / [Écran] / [État]
```

Exemple :

```text
Client / Payment / Confirmation / Success
```

## 92. Nommage des sections

Exemple :

```text
01 — Happy Path
02 — Loading
03 — Errors
04 — Empty States
05 — Edge Cases
06 — Responsive
```

## 93. Pages de parcours

Chaque parcours doit contenir le happy path, le chargement, l’erreur, le vide, le hors ligne, le refus, le retour, l’abandon, la reprise et le succès.

## 94. Cas limites

Les maquettes doivent prévoir le texte trop long, montant très élevé, devise différente, aucun réseau, compte bloqué, carte expirée, KYC incomplet, utilisateur non autorisé, service indisponible et données absentes.

## 95. Comportement responsive

Chaque écran doit préciser les éléments fixes, flexibles, masqués, déplacés, l’ordre, les colonnes, la navigation, la largeur maximale et l’adaptation tactile.

## 96. Contraintes

Les composants doivent utiliser les contraintes appropriées : Left and Right, Top, Center, Scale, Fill container, Min width et Max width.

## 97. Min et Max Width

Les composants doivent prévoir des limites pour les formulaires, cartes, modales, panneaux, textes, tableaux et sections web.

## 98. Grilles Figma

Grilles recommandées :

### Mobile

```text
4 colonnes
16 à 20 px de marge
8 à 16 px de gouttière
```

### Tablette

```text
8 colonnes
24 à 32 px de marge
16 à 24 px de gouttière
```

### Desktop

```text
12 colonnes
32 à 80 px de marge
20 à 32 px de gouttière
```

## 99. Grille TPE

Elle doit privilégier les gros contrôles, zones tactiles, lisibilité, stabilité, peu de colonnes et alignements simples.

## 100. Layout Grids

Les grilles doivent être enregistrées comme styles partagés.

Noms recommandés :

```text
Grid/Mobile/4
Grid/Tablet/8
Grid/Desktop/12
Grid/Admin/12
Grid/TPE/4
```

## 101. Illustrations

Les illustrations doivent être organisées dans une bibliothèque.

Catégories : onboarding, états vides, erreurs, succès, sécurité, commerce, État, Jini, support et marketing.

## 102. Style des illustrations

Les illustrations doivent être cohérentes, modernes, simples, adaptées aux contextes africains, non stéréotypées, compatibles clair et sombre et faciles à exporter.

## 103. Photographies

Les photos doivent être classées par particuliers, commerçants, étudiants, entreprises, agents, institutions, équipes, produits et événements.

## 104. Utilisation des photos

Chaque photo doit préciser la source, licence, autorisation, contexte, recadrage, alternative et texte alternatif.

## 105. Icônes

La bibliothèque d’icônes doit préciser la famille, l’épaisseur, la taille, l’usage, les catégories, l’état et le remplacement.

## 106. Convention des icônes

Format recommandé :

```text
Icon / Catégorie / Nom / Taille
```

Exemple :

```text
Icon / Payment / QR / 24
```

## 107. Icônes propriétaires

Les icônes spécifiques Mansa doivent être séparées des bibliothèques externes.

Exemples : Jini, service État, coffre, TPE, annuaire, paiement partagé et agent.

## 108. Assets

Les assets doivent être organisés par : Logos, Icons, Illustrations, Photos, 3D, Lottie, Rive, Videos, Documents et Maps.

## 109. Export des assets

Formats recommandés : SVG pour icônes et logos, PNG ou WebP pour images, AVIF lorsque pertinent, PDF pour documents, JSON pour Lottie, `.riv` pour Rive et GLB ou GLTF pour 3D.

## 110. Nommage des assets

Format recommandé :

```text
mansa-product-category-name-variant-theme-size
```

Exemple :

```text
mansa-client-payment-success-dark-2x
```

## 111. Résolutions

Les images raster doivent prévoir 1x, 2x et 3x si nécessaire. Les assets vectoriels doivent rester vectoriels lorsque possible.

## 112. Optimisation

Avant export : supprimer les calques inutiles, aplatir si nécessaire, compresser, vérifier les dimensions, vérifier la transparence, vérifier le poids et vérifier le thème.

## 113. Bibliothèques externes

Toute bibliothèque externe doit être approuvée, documentée, versionnée, compatible avec la licence, contrôlée et remplaçable.

## 114. Branches Figma

Les branches peuvent être utilisées pour nouvelles fonctionnalités, redesign, changements de tokens, nouveaux composants, expérimentations et corrections importantes.

## 115. Convention de branche

Format recommandé :

```text
design/produit-fonction-description
```

Exemple :

```text
design/client-payment-split
```

## 116. Revue de branche

Une branche doit être revue avant fusion. La revue doit vérifier la cohérence, les composants, tokens, responsive, accessibilité, contenu, états, documentation et impacts.

## 117. Versionnement

Les versions du design system doivent suivre une convention.

Exemple :

```text
1.0.0
```

- Major : changement incompatible.
- Minor : nouvelle fonctionnalité compatible.
- Patch : correction.

## 118. Journal des changements

Chaque version doit préciser la date, l’auteur, le changement, les composants, les écrans, l’impact, la migration et le statut.

## 119. Release Notes Design

Exemple :

```text
Version 1.2.0
- Ajout du paiement partagé
- Nouvelle variante de carte virtuelle
- Mise à jour des tokens de motion
- Correction du contraste des badges
```

## 120. Synchronisation avec le code

Les tokens Figma doivent pouvoir être transformés en JSON, CSS variables, TypeScript, React Native, Android, iOS et documentation.

## 121. Tokens exportables

Structure recommandée :

```json
{
  "color": {},
  "spacing": {},
  "radius": {},
  "typography": {},
  "motion": {},
  "elevation": {}
}
```

## 122. Style Dictionary

Un outil de transformation peut convertir les tokens vers plusieurs plateformes : CSS, SCSS, TypeScript, JSON, Kotlin, Swift et React Native.

## 123. Liaison Figma-Code

Chaque composant peut être lié à un composant React, React Native, Android, Storybook, documentation, dépôt et tests.

## 124. Dev Mode

Les développeurs doivent utiliser Dev Mode pour consulter dimensions, variables, espacements, couleurs, code, assets, annotations et comportements.

## 125. Prêt pour développement

Un écran est prêt lorsqu’il contient un statut validé, les composants officiels, tous les états, les règles responsive, le contenu final ou identifié, les annotations, assets, interactions, accessibilité et dépendances.

## 126. Checklist de livraison

Avant livraison : composants validés, textes validés, erreurs dessinées, chargements dessinés, responsive vérifié, mode sombre vérifié, accessibilité vérifiée, prototype testé, assets exportables et annotations terminées.

## 127. Storybook

La bibliothèque développée doit être documentée dans Storybook ou un outil équivalent.

Chaque composant doit montrer les variantes, états, contenu long, clair, sombre, mobile, accessibilité et interactions.

## 128. Correspondance Figma-Storybook

Chaque composant Figma doit avoir un équivalent développé lorsque pertinent.

Exemple :

```text
Figma: Actions/Button/Primary
Code: <Button variant="primary" />
```

## 129. Tests visuels

Les maquettes servent de référence pour la régression visuelle, comparaison, QA, responsive, thèmes et composants.

## 130. Tolérances

Les différences acceptables doivent être définies : rendu de police, sous-pixel, navigateur, système, ombre et anti-aliasing.

Les différences structurelles ne sont pas acceptables sans validation.

## 131. Page Archive

Elle doit contenir les anciennes versions, composants dépréciés, concepts rejetés, parcours remplacés, campagnes terminées et références historiques.

## 132. Archivage

Avant archivage : nommer, dater, expliquer, indiquer le remplacement, retirer de la bibliothèque active et conserver les liens utiles.

## 133. Nettoyage du fichier

Le fichier doit être nettoyé régulièrement : supprimer les doublons, fusionner les variantes, renommer, archiver, réparer les composants, vérifier les variables, supprimer les assets inutiles et contrôler les liens.

## 134. Responsabilités

Rôles possibles : Design System Lead, Product Designer, UX Designer, UI Designer, Motion Designer, 3D Designer, Content Designer, Accessibility Reviewer, Developer Reviewer et Product Owner.

## 135. Permissions Figma

Les permissions doivent être adaptées : lecture, commentaire, édition, publication et administration.

La bibliothèque officielle ne doit pas être modifiable par tout le monde.

## 136. Validation

Un changement majeur doit être validé par design, produit, développement, accessibilité, sécurité si nécessaire et métier concerné.

## 137. Commentaires

Les commentaires doivent être précis, liés à un élément, résolus, datés, orientés action et sans discussion dispersée.

## 138. Décisions de design

Les décisions importantes doivent être documentées.

Format recommandé :

```text
Décision
Contexte
Options
Choix
Raison
Impact
Date
Responsable
```

## 139. Figma et intelligence artificielle

Les IA autorisées peuvent utiliser le Figma Master pour générer du code, proposer des variantes, analyser la cohérence, créer des prototypes, détecter les doublons et préparer les spécifications.

## 140. Règles pour les IA

Une IA ne doit pas modifier la bibliothèque officielle sans validation, inventer des tokens, créer des composants doublons, changer les couleurs, supprimer des états, ignorer l’accessibilité, publier automatiquement ou utiliser des données réelles.

## 141. Prompt de référence pour les IA

```text
Utilise uniquement les composants, variables, styles, grilles et règles présents dans le Figma Master Mansa. Ne crée aucun nouveau composant si un équivalent existe. Respecte les modes clair et sombre, les états, l’accessibilité, les règles responsive et les tokens de motion. Toute exception doit être documentée.
```

## 142. Génération de code

Le code généré doit utiliser les tokens, utiliser les composants existants, éviter les valeurs codées en dur, respecter le responsive, respecter l’accessibilité, prévoir les états, rester maintenable et être testé.

## 143. Reconstruction depuis Figma

Pour reconstruire une interface, l’IA ou le développeur doit vérifier : Frame, Grille, Composants, Variantes, Variables, États, Prototype, Annotations, Responsive et Accessibilité.

## 144. Tests utilisateurs

Les prototypes Figma peuvent servir à tester la compréhension, navigation, rapidité, confiance, erreurs, accessibilité, préférences et parcours.

## 145. Scénarios de test

Exemples : créer un compte, envoyer de l’argent, bloquer une carte, payer par QR, encaisser un paiement, faire une clôture TPE, retrouver une transaction, payer une amende et utiliser Jini.

## 146. Résultats de tests

Les résultats doivent être documentés avec le scénario, profil, réussite, difficulté, temps, erreur, commentaire, recommandation et décision.

## 147. Contenu et microcopy

Le Figma Master doit utiliser des textes proches du contenu final.

À éviter : Lorem ipsum, textes irréalistes, montants incohérents, erreurs vagues et libellés temporaires non identifiés.

## 148. Content Design

Les textes doivent être courts, clairs, rassurants, précis, adaptés au contexte, cohérents, traduisibles et non ambigus.

## 149. Glossaire

Un glossaire doit définir les termes officiels : compte, wallet, coffre, transfert, paiement, bénéficiaire, commerçant, agent, transaction, reçu, remboursement et contestation.

## 150. Terminologie interdite

Les équipes ne doivent pas utiliser plusieurs mots différents pour la même fonction sans raison.

Choisir un terme officiel entre transfert, virement et envoi d’argent selon le contexte métier.

## 151. Internationalisation

Les composants doivent prévoir les textes longs, pluriels, nombres, dates, devises, pays, formats, caractères spéciaux et droite à gauche si nécessaire.

## 152. Bambara et langues locales

Les écrans doivent pouvoir accueillir des traductions locales.

La validation doit vérifier la longueur, compréhension, cohérence, termes financiers, alphabets et audio éventuel.

## 153. Mode clair et sombre

Tous les composants principaux doivent être dessinés dans les deux modes.

Les modes ne doivent pas être traités comme une simple inversion.

## 154. High Contrast

Une variante à contraste renforcé peut être prévue pour les textes, focus, formulaires, statuts, administration et TPE.

## 155. Écrans d’erreur

Chaque produit doit avoir une bibliothèque d’erreurs : réseau, paiement, carte, KYC, permission, serveur, session, fichier, appareil, fraude et support.

## 156. États vides

Chaque module doit prévoir illustration, titre, description, action et aide éventuelle.

## 157. États de chargement

Chaque écran doit préciser skeleton, spinner, progression, contenu partiel, timeout et reprise.

## 158. États hors ligne

Ils doivent être dessinés pour l’application client, commerçant, TPE, administration mobile et annuaire.

## 159. Permissions

Les écrans doivent prévoir accès autorisé, accès limité, lecture seule, action interdite, demande d’approbation et rôle insuffisant.

## 160. Sécurité

Les maquettes sensibles doivent indiquer les données masquées, l’authentification, l’expiration, la session, l’appareil, la confirmation, l’audit et l’avertissement.

## 161. Cartes bancaires

Les maquettes doivent utiliser des données fictives.

Les numéros doivent être masqués, non réalistes, sans risque et distincts des données de production.

## 162. TPE

Les maquettes TPE doivent simuler uniquement des transactions fictives.

Les états doivent préciser démonstration, recette, production, hors ligne et test.

## 163. Environnements

Les environnements doivent être représentés par des bannières ou indicateurs.

Valeurs : Demo, Staging et Production.

## 164. Documentation des breakpoints

Chaque composant responsive doit préciser mobile, tablette, desktop, large et TPE.

## 165. Comportements tactiles

Les prototypes mobiles doivent montrer tap, long press, swipe, drag, pull to refresh, pinch si nécessaire et retour système.

## 166. Comportements clavier

Les prototypes web doivent documenter Tab, Shift + Tab, Enter, Escape, flèches, raccourcis et focus.

## 167. Comportements souris

Ils peuvent inclure hover, click, drag, scroll, curseur, tooltip et clic droit si prévu.

## 168. Haptique

Les interactions mobiles doivent préciser le type de retour : light, medium, success, warning ou error.

## 169. Sons

Les interactions sonores doivent préciser le fichier, déclencheur, volume, durée, désactivation et alternative visuelle.

## 170. 3D dans Figma

Les scènes 3D peuvent être représentées par captures, storyboards, vidéos, prototypes, liens externes et annotations techniques.

Figma ne remplace pas l’outil 3D.

## 171. Modèles 3D

Chaque modèle doit avoir une fiche : nom, format, poids, source, licence, textures, variantes, fallback et usage.

## 172. Lottie et Rive

Chaque animation doit avoir un aperçu, fichier, état, thème, déclencheur, durée, fallback et réduction des mouvements.

## 173. Documentation développeur

Les maquettes doivent fournir suffisamment d’informations pour éviter les suppositions.

Toute règle absente doit être clarifiée avant développement lorsqu’elle touche la sécurité, le paiement, les permissions, les données ou le comportement critique.

## 174. Design QA

Après développement, une revue doit comparer la structure, les composants, espacements, couleurs, typographie, responsive, états, animation, accessibilité et contenu.

## 175. Checklist Design QA

- écran correct ;
- composant correct ;
- token correct ;
- texte correct ;
- état correct ;
- responsive correct ;
- focus correct ;
- thème correct ;
- animation correcte ;
- erreur correcte.

## 176. Écarts

Chaque écart doit être classé critique, important, mineur, accepté ou volontaire.

## 177. Correction des écarts

Une correction peut être faite dans le code, dans Figma, dans les deux ou dans la documentation.

La source officielle doit rester cohérente.

## 178. Dette design

Les compromis temporaires doivent être enregistrés.

Chaque dette doit préciser cause, impact, produit, priorité, responsable, date cible et solution.

## 179. Gouvernance du Figma Master

Toute modification importante doit utiliser une branche, être revue, respecter les tokens, éviter les doublons, être documentée, testée, publiée et communiquée.

## 180. Publication

Avant publication : composants validés, descriptions présentes, noms corrects, propriétés propres, variables correctes, dépendances vérifiées, changements documentés et équipe informée.

## 181. Sauvegarde

Le système doit prévoir l’historique Figma, des exports, versions, bibliothèque, archives, documentation GitHub et sauvegardes régulières.

## 182. Continuité

Les informations critiques du design system ne doivent pas exister uniquement dans Figma.

Elles doivent aussi être présentes dans la documentation, les tokens, le code, Storybook, le dépôt et les guides.

## 183. Sécurité d’accès

Les droits doivent être retirés lorsque nécessaire.

Les comptes doivent utiliser authentification forte, accès limité, rôles, historique et comptes professionnels.

## 184. Données sensibles

Aucune donnée sensible ne doit être stockée dans Figma.

Interdictions : clients réels, comptes réels, documents réels, secrets, clés, mots de passe, données KYC et informations bancaires.

## 185. Formation

Les nouveaux membres doivent apprendre la structure, les variables, composants, conventions, branches, publication, accessibilité, handoff et gouvernance.

## 186. Guide de contribution

1. Chercher un composant existant.
2. Vérifier le besoin.
3. Créer une branche.
4. Utiliser les tokens.
5. Documenter.
6. Tester.
7. Demander une revue.
8. Publier après validation.

## 187. Critères d’un nouveau composant

Un nouveau composant est autorisé si aucun composant existant ne répond au besoin, le besoin est récurrent, il respecte les tokens, il est accessible, documenté, testable et maintenable.

## 188. Critères d’une nouvelle variante

Une variante est autorisée si elle représente une différence réelle, est réutilisable, ne peut pas être gérée par une propriété simple, ne crée pas de confusion et reste maintenable.

## 189. Critères de suppression

Un composant peut être supprimé s’il n’est plus utilisé, un remplacement existe, la migration est terminée, la documentation est mise à jour, le code est aligné et l’archive est conservée.

## 190. Mesures de qualité

Le Figma Master doit être évalué selon le taux de réutilisation, le nombre de doublons, la couverture des états, la couverture responsive, la couverture accessibilité, la cohérence code-design, la vitesse de livraison et les erreurs détectées.

## 191. Tableau de suivi

Un tableau peut suivre le composant, propriétaire, statut, dernière mise à jour, code disponible, documentation, accessibilité, tests et version.

## 192. Audits périodiques

Audits recommandés : mensuel pour les composants actifs, trimestriel pour le système, avant chaque version majeure, après changement de marque et après changement technique important.

## 193. Audit de cohérence

Il doit vérifier les couleurs, styles, tokens, noms, composants, variantes, grilles, espaces, rayons et icônes.

## 194. Audit d’accessibilité

Il doit vérifier le contraste, focus, taille, lecture, navigation, mouvement, touch targets, erreurs et formulaires.

## 195. Audit responsive

Il doit vérifier petit mobile, grand mobile, tablette, desktop, grand écran, TPE, orientation et clavier.

## 196. Audit de contenu

Il doit vérifier la terminologie, le ton, la traduction, les erreurs, les libellés, la cohérence, la longueur et le format.

## 197. Audit de sécurité visuelle

Il doit vérifier les données fictives, le masquage, les permissions, l’environnement, les avertissements, les actions critiques et les confirmations.

## 198. Règles de qualité finale

Une interface Figma est validée si elle utilise les composants officiels, les tokens, possède tous ses états, est responsive, accessible, documentée, testable, respecte la sécurité, possède un prototype lorsque nécessaire et est prête pour le développement.

## 199. Résultat attendu

Le Figma Master doit permettre de concevoir l’ensemble de l’écosystème sans réinventer les boutons, cartes, parcours, couleurs, animations, tableaux, formulaires, règles responsive et comportements.

## 200. Règle finale

Le Figma Master Mansa doit être suffisamment clair pour qu’une nouvelle équipe puisse comprendre, concevoir et développer une interface cohérente sans dépendre de connaissances non documentées.

Il doit protéger l’identité de Mansa.

Il doit accélérer le développement.

Il doit réduire les erreurs.

Il doit garantir que toutes les interfaces appartiennent au même écosystème.
