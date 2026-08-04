# 85 — Studio Photo IA Mansa pour les commerçants : amélioration automatique, suppression d’arrière-plan, génération de décors, formats e-commerce, contrôle qualité, sécurité et administration

## 1. Objet du document

Ce document définit le cahier des charges complet du **Studio Photo IA Mansa**.

Cette fonctionnalité doit permettre aux commerçants de transformer rapidement une photo ordinaire de produit en image professionnelle, propre et adaptée à la vente en ligne.

Le fonctionnement doit s’inspirer de l’expérience d’outils comme YouCam, les studios photo e-commerce automatisés et les éditeurs d’images assistés par intelligence artificielle.

Le Studio Photo IA doit être intégré à :

- l’application Commerce ;
- le Portail Web Commerçant ;
- le Hub Annuaire ;
- la création de produits ;
- la création de services ;
- les promotions ;
- les mini-sites commerçants ;
- les publications commerciales ;
- les réseaux sociaux ;
- les campagnes marketing Mansa.

L’objectif est qu’un commerçant puisse prendre une photo simple avec son téléphone, puis obtenir en quelques secondes une image professionnelle prête à publier.

---

## 2. Principe général

Le parcours doit être simple :

```text
Prendre ou importer une photo
→ Détecter le produit
→ Analyser la qualité
→ Proposer des améliorations
→ Générer plusieurs rendus
→ Comparer avant/après
→ Valider
→ Publier
```

Le commerçant doit toujours garder le contrôle final.

Aucune image ne doit être publiée automatiquement sans validation.

---

## 3. Points d’entrée

Le Studio Photo IA doit être accessible depuis :

- création d’un produit ;
- modification d’un produit ;
- création d’un service ;
- création d’une promotion ;
- gestion du catalogue ;
- gestion du mini-site ;
- bibliothèque médias ;
- création d’une bannière ;
- création d’un contenu sponsorisé ;
- création d’une publication sociale ;
- actions rapides Commerce.

---

## 4. Sources d’image

Le commerçant doit pouvoir utiliser :

- appareil photo ;
- galerie du téléphone ;
- fichiers de l’appareil ;
- glisser-déposer sur le web ;
- import depuis le catalogue ;
- image provenant d’un ancien produit ;
- image issue d’un fournisseur ;
- image provenant d’une URL autorisée ;
- lot de plusieurs images.

---

## 5. Formats acceptés

Formats possibles :

- JPEG ;
- JPG ;
- PNG ;
- HEIC ;
- WEBP ;
- TIFF selon support ;
- RAW selon offre avancée.

Le système doit contrôler :

- type réel ;
- extension ;
- dimensions ;
- poids ;
- corruption ;
- sécurité ;
- présence de malware ;
- métadonnées sensibles.

---

## 6. Analyse initiale de la photo

Avant traitement, l’IA doit analyser :

- présence du produit ;
- nombre de produits ;
- qualité générale ;
- netteté ;
- luminosité ;
- contraste ;
- bruit ;
- cadrage ;
- arrière-plan ;
- ombres ;
- reflets ;
- orientation ;
- résolution ;
- objets parasites ;
- mains ou personnes visibles ;
- texte visible ;
- logo ou marque ;
- risque de contenu trompeur.

---

## 7. Score de qualité

Chaque photo peut recevoir un score.

Exemple :

```text
Qualité générale : 72/100
Netteté : bonne
Lumière : moyenne
Fond : encombré
Cadrage : à améliorer
Résolution : suffisante
```

Le système peut proposer :

- publier telle quelle ;
- améliorer légèrement ;
- améliorer complètement ;
- reprendre la photo ;
- utiliser un autre angle ;
- ajouter des photos supplémentaires.

---

## 8. Détection du produit

L’IA doit détecter automatiquement :

- contour du produit ;
- zone principale ;
- objets secondaires ;
- arrière-plan ;
- ombre ;
- reflet ;
- emballage ;
- étiquette ;
- texte ;
- accessoires ;
- support.

Le commerçant doit pouvoir corriger manuellement la sélection.

---

## 9. Suppression d’arrière-plan

Le système doit permettre :

- suppression automatique ;
- fond transparent ;
- fond blanc ;
- fond gris clair ;
- fond de couleur ;
- fond personnalisé ;
- remplacement par un décor généré ;
- conservation de l’ombre ;
- suppression de l’ombre ;
- génération d’une nouvelle ombre.

---

## 10. Fonds e-commerce

Fonds prédéfinis possibles :

- blanc pur ;
- blanc cassé ;
- gris studio ;
- beige ;
- noir premium ;
- marbre ;
- bois ;
- tissu ;
- cuisine ;
- salle de bain ;
- bureau ;
- boutique ;
- extérieur ;
- fond africain moderne ;
- fond artisanal ;
- fond luxe ;
- fond minimaliste.

---

## 11. Génération de décor

Le commerçant peut demander un décor adapté au produit.

Exemples :

- parfum sur une surface en marbre ;
- chaussure dans un studio moderne ;
- plat dans un restaurant ;
- meuble dans un salon ;
- cosmétique dans une salle de bain ;
- téléphone sur un bureau ;
- vêtement sur mannequin numérique ;
- outil dans un atelier ;
- produit agricole dans un environnement naturel.

L’IA doit éviter les décors incohérents ou trompeurs.

---

## 12. Modes de rendu

Modes proposés :

- Standard e-commerce ;
- Studio premium ;
- Luxe ;
- Minimaliste ;
- Naturel ;
- Lifestyle ;
- Réseaux sociaux ;
- Catalogue ;
- Publicité ;
- Promotion ;
- Bannière ;
- Miniature ;
- Fond transparent ;
- Mise en situation.

---

## 13. Amélioration automatique

Le traitement peut améliorer :

- exposition ;
- balance des blancs ;
- contraste ;
- netteté ;
- réduction du bruit ;
- couleurs ;
- détails ;
- saturation ;
- cadrage ;
- perspective ;
- ombres ;
- reflets ;
- résolution ;
- compression.

---

## 14. Amélioration de résolution

L’IA peut proposer :

- x2 ;
- x4 ;
- format HD ;
- format Full HD ;
- format catalogue ;
- format bannière.

L’amélioration ne doit pas inventer de détails trompeurs sur le produit.

---

## 15. Recadrage automatique

Formats possibles :

- carré 1:1 ;
- portrait 4:5 ;
- vertical 9:16 ;
- paysage 16:9 ;
- story ;
- bannière ;
- catalogue ;
- miniature ;
- fiche produit ;
- publicité.

---

## 16. Formats Mansa

Le système doit générer automatiquement les formats nécessaires pour :

- fiche produit ;
- Hub ;
- mini-site commerçant ;
- promotion ;
- bannière ;
- recherche ;
- panier ;
- commande ;
- catalogue ;
- réseaux sociaux ;
- publicité.

---

## 17. Suppression d’objets indésirables

Le commerçant peut retirer :

- main ;
- doigt ;
- câble ;
- boîte vide ;
- étiquette temporaire ;
- objet parasite ;
- poussière ;
- tache ;
- reflet ;
- arrière-plan ;
- support non souhaité.

---

## 18. Limites de suppression

Le système ne doit pas permettre de masquer de manière trompeuse :

- défaut réel important ;
- casse ;
- usure ;
- rayure importante ;
- date de péremption ;
- avertissement ;
- information légale ;
- taille réelle ;
- quantité ;
- composition ;
- élément essentiel.

---

## 19. Ombres

Options possibles :

- conserver l’ombre originale ;
- adoucir l’ombre ;
- supprimer l’ombre ;
- créer une ombre studio ;
- créer une ombre flottante ;
- créer une ombre naturelle ;
- ajuster l’intensité ;
- ajuster la direction.

---

## 20. Reflets

Le système peut :

- réduire les reflets ;
- corriger les reflets ;
- supprimer un reflet parasite ;
- conserver les reflets naturels ;
- ajouter un reflet studio léger.

Il ne doit pas modifier les caractéristiques réelles du produit.

---

## 21. Couleurs

L’IA peut :

- corriger les couleurs ;
- équilibrer la lumière ;
- rendre les couleurs plus fidèles ;
- proposer une version plus vive ;
- comparer avec l’original.

Le commerçant doit être averti si la couleur est modifiée significativement.

---

## 22. Couleur réelle du produit

Le système doit afficher un avertissement lorsque :

- une couleur est remplacée ;
- une teinte est fortement modifiée ;
- la luminosité change l’apparence réelle ;
- une variante est générée artificiellement.

Une image de variante générée doit être identifiée comme telle.

---

## 23. Mannequin numérique

Pour les vêtements, le système peut proposer :

- mannequin neutre ;
- mannequin homme ;
- mannequin femme ;
- mannequin enfant selon règles ;
- présentation à plat ;
- mannequin invisible ;
- mise en situation.

Il ne doit pas générer une représentation trompeuse de la coupe ou de la taille.

---

## 24. Produits alimentaires

Pour les aliments, l’IA peut :

- améliorer la lumière ;
- nettoyer le fond ;
- améliorer le cadrage ;
- créer une mise en scène ;
- proposer un fond restaurant ;
- générer une photo de menu.

Elle ne doit pas ajouter des ingrédients absents ni modifier la portion réelle sans indication.

---

## 25. Produits cosmétiques

Pour les cosmétiques :

- fond studio ;
- fond salle de bain ;
- rendu premium ;
- reflet contrôlé ;
- présentation du packaging ;
- mise en avant des variantes.

Les mentions légales et le packaging ne doivent pas être altérés.

---

## 26. Produits artisanaux

Le Studio doit valoriser :

- textile ;
- bijoux ;
- sculptures ;
- mobilier ;
- décoration ;
- produits locaux ;
- créations artisanales ;
- accessoires ;
- objets traditionnels.

Il doit conserver l’authenticité du produit.

---

## 27. Produits de construction

Pour les matériaux et équipements :

- fond neutre ;
- vue technique ;
- mise en situation chantier ;
- dimensions ;
- détails ;
- plusieurs angles ;
- zoom matière ;
- étiquette produit.

Les dimensions et performances ne doivent pas être inventées.

---

## 28. Photos de services

Pour les services, le système peut améliorer :

- locaux ;
- équipe ;
- salon ;
- restaurant ;
- cabinet ;
- atelier ;
- salle ;
- véhicule ;
- chantier ;
- espace de travail.

Il ne doit pas créer de faux locaux ou de fausses équipes sans indication.

---

## 29. Création de bannière

Le système peut générer une bannière à partir de :

- produit ;
- logo ;
- promotion ;
- texte ;
- prix ;
- date ;
- appel à l’action ;
- couleurs du commerce.

Formats :

- Hub ;
- mini-site ;
- application ;
- web ;
- story ;
- publication ;
- écran Commerce.

---

## 30. Création de visuel promotionnel

Le commerçant peut sélectionner :

- produit ;
- ancien prix ;
- nouveau prix ;
- promotion ;
- date ;
- logo ;
- texte ;
- style.

L’IA propose plusieurs maquettes.

---

## 31. Texte généré

L’IA peut proposer :

- nom du produit ;
- titre commercial ;
- courte description ;
- description détaillée ;
- caractéristiques ;
- texte promotionnel ;
- hashtags ;
- texte publicitaire ;
- texte pour réseaux sociaux.

Toute information générée doit être confirmée par le commerçant.

---

## 32. Détection de texte

Le système peut détecter :

- prix ;
- marque ;
- référence ;
- composition ;
- quantité ;
- date ;
- code-barres ;
- avertissement ;
- instruction.

Le texte ne doit pas être modifié automatiquement sans validation.

---

## 33. Logo du commerce

Le commerçant peut ajouter :

- logo ;
- filigrane ;
- signature visuelle ;
- nom du commerce ;
- QR Code ;
- URL du mini-site.

La position, taille et transparence doivent être configurables.

---

## 34. Protection contre les faux logos

Le système doit empêcher :

- usage d’une marque non autorisée ;
- ajout d’un faux logo ;
- usurpation ;
- imitation ;
- suppression d’une marque légitime ;
- modification frauduleuse d’emballage.

---

## 35. Traitement par lot

Le commerçant peut traiter :

- plusieurs produits ;
- plusieurs variantes ;
- plusieurs photos ;
- plusieurs formats ;
- un catalogue complet.

Fonctions possibles :

- mêmes paramètres ;
- même fond ;
- même cadrage ;
- même logo ;
- même style ;
- export groupé.

---

## 36. Avant et après

Le système doit permettre :

- comparaison côte à côte ;
- curseur avant/après ;
- zoom ;
- retour à l’original ;
- choix entre plusieurs rendus ;
- historique des versions.

---

## 37. Versions

Chaque traitement doit conserver :

- image originale ;
- version modifiée ;
- paramètres ;
- date ;
- utilisateur ;
- outil utilisé ;
- modèle IA ;
- statut ;
- validation ;
- produit associé.

---

## 38. Publication

Après validation, le commerçant peut publier dans :

- fiche produit ;
- catalogue ;
- Hub ;
- mini-site ;
- promotion ;
- story ;
- campagne ;
- réseaux sociaux ;
- bannière ;
- publicité.

---

## 39. Publication différée

Le commerçant peut :

- publier immédiatement ;
- enregistrer en brouillon ;
- programmer ;
- soumettre à validation ;
- publier sur plusieurs canaux ;
- remplacer une image existante.

---

## 40. Bibliothèque média

La bibliothèque doit permettre :

- classement ;
- recherche ;
- filtres ;
- dossiers ;
- tags ;
- produits associés ;
- versions ;
- originaux ;
- images IA ;
- fichiers publiés ;
- archivage ;
- suppression contrôlée.

---

## 41. Métadonnées

Chaque média peut contenir :

- identifiant ;
- commerce ;
- auteur ;
- date ;
- produit ;
- transformation ;
- format ;
- résolution ;
- taille ;
- modèle IA ;
- droits ;
- statut ;
- hash ;
- historique.

---

## 42. Stockage

Les médias doivent être stockés dans un stockage objet sécurisé.

Le système doit prévoir :

- chiffrement ;
- URL temporaire ;
- CDN ;
- compression ;
- sauvegarde ;
- antivirus ;
- contrôle d’accès ;
- rétention ;
- suppression ;
- versionnement.

---

## 43. Confidentialité

Les photos non publiées doivent rester privées.

Aucun autre commerçant ne doit pouvoir accéder :

- aux originaux ;
- aux brouillons ;
- aux versions ;
- aux paramètres ;
- aux médias privés ;
- aux données EXIF sensibles.

---

## 44. Données EXIF

Avant publication, le système peut supprimer :

- coordonnées GPS ;
- modèle d’appareil ;
- heure précise ;
- informations personnelles ;
- nom du propriétaire ;
- autres métadonnées sensibles.

---

## 45. Consentement

Avant traitement IA, le commerçant doit confirmer :

- qu’il possède les droits sur l’image ;
- qu’il est autorisé à présenter le produit ;
- qu’il accepte le traitement ;
- qu’il comprend les limites ;
- qu’il valide avant publication.

---

## 46. Droits d’auteur

Le système doit prévenir :

- import d’images volées ;
- utilisation non autorisée ;
- copie de catalogue ;
- réutilisation frauduleuse ;
- suppression de filigrane ;
- usurpation de marque.

---

## 47. Contenu interdit

Le système doit bloquer ou soumettre à contrôle :

- contenu illégal ;
- produits interdits ;
- contenus violents ;
- contenus sexuels interdits ;
- faux documents ;
- contrefaçons ;
- produits réglementés sans autorisation ;
- armes ;
- drogues ;
- contenus frauduleux.

---

## 48. Contrôle de conformité produit

Selon la catégorie, le système peut vérifier :

- mentions obligatoires ;
- avertissements ;
- licence ;
- catégorie autorisée ;
- âge minimum ;
- pays ;
- réglementation ;
- preuve d’activité ;
- KYB.

---

## 49. Transparence IA

Les images fortement générées peuvent être marquées :

- Image améliorée par IA ;
- Décor généré par IA ;
- Mise en situation générée ;
- Variante visuelle générée.

Le niveau de transparence doit être configurable selon les règles du pays et de la plateforme.

---

## 50. Interdiction de tromper

L’IA ne doit pas :

- modifier la quantité réelle ;
- agrandir artificiellement le produit ;
- cacher un défaut essentiel ;
- ajouter un accessoire non inclus ;
- changer la marque ;
- inventer une certification ;
- modifier une date ;
- falsifier une étiquette ;
- créer une fausse promotion ;
- générer une fausse preuve.

---

## 51. Validation du commerçant

Avant publication, le commerçant doit confirmer :

```text
Je confirme que cette image représente correctement le produit ou le service proposé.
```

Cette validation doit être enregistrée.

---

## 52. Modération administrative

L’administration doit pouvoir :

- voir les médias signalés ;
- suspendre une image ;
- demander l’original ;
- masquer un produit ;
- contrôler une transformation ;
- bloquer un commerce ;
- demander des justificatifs ;
- restaurer après vérification ;
- auditer les traitements.

---

## 53. Signalement client

Un client peut signaler :

- image trompeuse ;
- produit différent ;
- fausse couleur ;
- faux décor ;
- accessoire non fourni ;
- fausse marque ;
- contrefaçon ;
- contenu interdit ;
- image volée.

---

## 54. Litiges

En cas de litige, le système doit conserver :

- photo originale ;
- photo publiée ;
- date ;
- paramètres IA ;
- validation ;
- description produit ;
- commande ;
- conversation ;
- preuve de livraison ;
- décision.

---

## 55. Quotas

Le Studio peut être limité selon l’offre :

- nombre de traitements ;
- nombre d’images ;
- résolution ;
- formats ;
- traitement par lot ;
- génération de décor ;
- suppression d’objets ;
- export ;
- stockage ;
- priorité.

---

## 56. Offres commerciales

Exemples :

- Gratuit ;
- Standard ;
- Professionnel ;
- Premium ;
- Entreprise.

Le niveau Gratuit peut proposer :

- nombre limité d’images ;
- fond blanc ;
- recadrage ;
- amélioration simple.

Les offres supérieures peuvent proposer :

- décors générés ;
- traitement par lot ;
- haute résolution ;
- campagnes ;
- automatisations ;
- API ;
- stockage avancé ;
- génération de variantes.

---

## 57. Coût par génération

Le coût interne peut dépendre :

- modèle utilisé ;
- résolution ;
- nombre d’images ;
- type de traitement ;
- temps de calcul ;
- génération de décor ;
- upscale ;
- traitement par lot.

L’administration doit pouvoir suivre ces coûts.

---

## 58. Configuration administrative

L’administration doit pouvoir modifier :

- quotas ;
- prix ;
- modèles IA ;
- catégories autorisées ;
- styles ;
- formats ;
- résolutions ;
- limites ;
- pays ;
- offres ;
- modération ;
- conservation ;
- feature flags.

---

## 59. Fournisseurs IA

Le système doit utiliser une abstraction.

Exemple :

```text
ImageAIProvider
├── Provider A
├── Provider B
├── Modèle interne
└── Fournisseur futur
```

Le code métier ne doit pas dépendre d’un fournisseur unique.

---

## 60. Configuration des fournisseurs

Chaque fournisseur doit avoir :

- identifiant ;
- environnement ;
- endpoint ;
- modèle ;
- capacités ;
- coût ;
- limite ;
- délai ;
- statut ;
- priorité ;
- fallback ;
- pays autorisés.

---

## 61. Fallback

Si un fournisseur est indisponible :

- utiliser un autre fournisseur ;
- mettre la demande en attente ;
- proposer un traitement simple local ;
- informer le commerçant ;
- ne pas perdre l’original ;
- permettre de relancer.

---

## 62. Traitement asynchrone

Les traitements lourds doivent être asynchrones.

Statuts possibles :

- UPLOADED ;
- ANALYZING ;
- PROCESSING ;
- GENERATING ;
- REVIEW_REQUIRED ;
- COMPLETED ;
- FAILED ;
- CANCELLED ;
- EXPIRED.

---

## 63. File de traitement

La file doit gérer :

- priorité ;
- retries ;
- timeout ;
- annulation ;
- DLQ ;
- reprise ;
- monitoring ;
- coût ;
- capacité.

---

## 64. Notifications

Le commerçant peut recevoir :

- traitement commencé ;
- image prête ;
- traitement échoué ;
- validation requise ;
- quota bientôt atteint ;
- image signalée ;
- image suspendue ;
- crédit consommé.

---

## 65. API principales

Exemples :

```http
POST   /merchant-ai/images/upload
POST   /merchant-ai/images/analyze
POST   /merchant-ai/images/enhance
POST   /merchant-ai/images/remove-background
POST   /merchant-ai/images/generate-background
POST   /merchant-ai/images/upscale
POST   /merchant-ai/images/remove-object
POST   /merchant-ai/images/generate-formats
POST   /merchant-ai/images/batch
GET    /merchant-ai/jobs/{jobId}
POST   /merchant-ai/jobs/{jobId}/cancel
GET    /merchant-ai/library
POST   /merchant-ai/images/{imageId}/approve
POST   /merchant-ai/images/{imageId}/publish
```

---

## 66. Webhooks

Événements possibles :

```text
merchant_ai.image.uploaded
merchant_ai.analysis.completed
merchant_ai.processing.started
merchant_ai.processing.completed
merchant_ai.processing.failed
merchant_ai.image.approved
merchant_ai.image.published
merchant_ai.image.flagged
merchant_ai.quota.reached
```

---

## 67. Modèles principaux

- MerchantMediaAsset
- MerchantMediaOriginal
- MerchantMediaVersion
- MerchantImageJob
- MerchantImageTransformation
- MerchantImagePreset
- MerchantImageTemplate
- MerchantImagePublication
- MerchantImageApproval
- MerchantImageModeration
- MerchantImageReport
- MerchantImageQuota
- MerchantImageUsage
- MerchantImageAudit
- ImageAIProviderConfig

---

## 68. Rôles

Exemples :

```text
MERCHANT_OWNER
MERCHANT_MANAGER
MERCHANT_CATALOG_MANAGER
MERCHANT_MARKETING_MANAGER
MERCHANT_MEDIA_EDITOR
MERCHANT_MEDIA_VIEWER
AI_MEDIA_ADMIN
AI_MEDIA_MODERATOR
AI_COST_MANAGER
AUDITOR
```

---

## 69. Permissions

Exemples :

```text
merchant_media.read
merchant_media.upload
merchant_media.edit
merchant_media.generate
merchant_media.approve
merchant_media.publish
merchant_media.delete
merchant_media.batch
merchant_media.report
merchant_media.audit.read
merchant_ai.provider.manage
merchant_ai.quota.manage
```

---

## 70. Feature Flags

Exemples :

- amélioration automatique ;
- suppression de fond ;
- fond généré ;
- suppression d’objet ;
- upscale ;
- traitement par lot ;
- mannequin numérique ;
- bannière ;
- visuel promotionnel ;
- texte généré ;
- publication automatique après validation ;
- watermark ;
- API ;
- fournisseur spécifique.

---

## 71. Application Commerce

Dans l’application Commerce, le Studio doit proposer :

- bouton Prendre une photo ;
- bouton Importer ;
- analyse ;
- suggestions ;
- rendu rapide ;
- comparaison ;
- choix du format ;
- validation ;
- publication ;
- historique.

---

## 72. Portail Web Commerçant

Le portail doit proposer :

- glisser-déposer ;
- traitement en lot ;
- catalogue complet ;
- édition avancée ;
- bibliothèque ;
- modèles ;
- campagnes ;
- exports ;
- statistiques ;
- quotas ;
- historique.

---

## 73. Expérience mobile

Le parcours mobile doit être conçu pour :

- réseau faible ;
- appareil moyen de gamme ;
- upload différé ;
- reprise après coupure ;
- compression locale ;
- aperçu léger ;
- traitement serveur ;
- notification de fin.

---

## 74. Mode réseau faible

En cas de réseau faible :

- compresser l’image ;
- conserver l’original localement ;
- reprendre l’upload ;
- limiter l’aperçu ;
- différer le traitement ;
- informer le commerçant ;
- éviter un double upload.

---

## 75. Traitement local

Certaines opérations simples peuvent être locales :

- recadrage ;
- rotation ;
- compression ;
- filtre léger ;
- réduction de taille ;
- aperçu ;
- sélection du produit.

Les traitements lourds doivent rester côté serveur.

---

## 76. Performance

Objectifs :

- aperçu rapide ;
- traitement simple en quelques secondes ;
- traitement avancé asynchrone ;
- file visible ;
- progression ;
- reprise ;
- CDN ;
- cache ;
- formats optimisés.

---

## 77. Tests fonctionnels

- prise de photo ;
- import ;
- analyse ;
- suppression de fond ;
- fond blanc ;
- fond généré ;
- amélioration ;
- upscale ;
- recadrage ;
- suppression d’objet ;
- logo ;
- bannière ;
- lot ;
- comparaison ;
- validation ;
- publication ;
- signalement.

---

## 78. Tests de sécurité

- upload malveillant ;
- extension falsifiée ;
- accès inter-commerce ;
- image privée ;
- suppression non autorisée ;
- contenu interdit ;
- marque ;
- droits ;
- métadonnées ;
- injection ;
- secret ;
- fournisseur IA ;
- audit.

---

## 79. Tests de performance

- upload ;
- traitement ;
- batch ;
- haute résolution ;
- stockage ;
- CDN ;
- file ;
- reprise ;
- génération multiple ;
- bibliothèque ;
- recherche.

---

## 80. Tests de résilience

- réseau coupé ;
- upload interrompu ;
- fournisseur indisponible ;
- job bloqué ;
- timeout ;
- génération échouée ;
- quota ;
- stockage indisponible ;
- notification échouée ;
- reprise ;
- double demande.

---

## 81. Reporting

Rapports possibles :

- images traitées ;
- types de traitement ;
- taux de réussite ;
- temps moyen ;
- coût ;
- fournisseur ;
- commerce ;
- offre ;
- quota ;
- images publiées ;
- images signalées ;
- conversions produits ;
- usage par pays.

---

## 82. Indicateurs

Exemples :

- nombre de commerçants utilisateurs ;
- images générées ;
- taux d’adoption ;
- coût moyen ;
- temps moyen ;
- taux d’échec ;
- taux de publication ;
- taux de signalement ;
- augmentation de conversion ;
- usage par catégorie ;
- usage par offre.

---

## 83. Règles métier

1. L’original doit toujours être conservé selon la politique de rétention.
2. Aucune image ne doit être publiée sans validation.
3. Le commerçant doit posséder les droits sur l’image.
4. Les traitements doivent être audités.
5. Les images privées ne doivent pas être accessibles publiquement.
6. Les données EXIF sensibles doivent être supprimées avant publication.
7. Les images trompeuses peuvent être suspendues.
8. Les transformations importantes doivent être identifiables.
9. Les faux logos sont interdits.
10. Les informations légales ne doivent pas être supprimées.
11. Les quotas doivent être configurables.
12. Les coûts doivent être suivis.
13. Les fournisseurs IA doivent être interchangeables.
14. Les traitements lourds doivent être asynchrones.
15. Les doubles demandes doivent être évitées.
16. Les contenus interdits doivent être bloqués.
17. Les produits réglementés nécessitent les contrôles requis.
18. Les publications doivent respecter le pays et la catégorie.
19. Les utilisateurs doivent pouvoir revenir à l’original.
20. Les audits critiques doivent être immuables.

---

## 84. Ordre de développement recommandé

```text
P1-AI-01 — Modèles médias et stockage sécurisé
P1-AI-02 — Upload, caméra et bibliothèque
P1-AI-03 — Analyse qualité et détection produit
P1-AI-04 — Suppression d’arrière-plan
P1-AI-05 — Amélioration et upscale
P1-AI-06 — Génération de décors
P1-AI-07 — Suppression d’objets et retouches
P1-AI-08 — Formats e-commerce et réseaux sociaux
P1-AI-09 — Traitement par lot
P1-AI-10 — Validation, publication et historique
P1-AI-11 — Quotas, abonnements et coûts
P1-AI-12 — Modération et fraude
P1-AI-13 — Administration des fournisseurs IA
P1-AI-14 — Tests de bout en bout
```

---

## 85. Critères d’acceptation finaux

Le Studio Photo IA Mansa est validé lorsque :

- le commerçant peut prendre une photo ;
- il peut importer une image ;
- le système analyse la qualité ;
- le produit est détecté ;
- la sélection peut être corrigée ;
- l’arrière-plan peut être supprimé ;
- un fond blanc peut être généré ;
- un fond transparent peut être généré ;
- des décors peuvent être proposés ;
- la lumière peut être améliorée ;
- la netteté peut être améliorée ;
- les couleurs peuvent être corrigées ;
- la résolution peut être augmentée ;
- les formats Mansa sont générés ;
- le recadrage automatique fonctionne ;
- les objets indésirables peuvent être retirés ;
- les ombres sont configurables ;
- les reflets peuvent être corrigés ;
- l’original est conservé ;
- l’avant/après est disponible ;
- plusieurs versions sont conservées ;
- le traitement par lot fonctionne ;
- le logo peut être ajouté ;
- les bannières peuvent être générées ;
- les promotions peuvent être générées ;
- les descriptions peuvent être proposées ;
- le commerçant valide avant publication ;
- les images peuvent être publiées dans le Hub ;
- les images peuvent être publiées sur le mini-site ;
- les images peuvent être utilisées dans le catalogue ;
- les données EXIF sensibles sont supprimées ;
- le stockage est sécurisé ;
- les accès inter-commerce sont interdits ;
- les droits d’auteur sont encadrés ;
- les faux logos sont bloqués ;
- les contenus interdits sont modérés ;
- les images trompeuses peuvent être signalées ;
- les litiges conservent les preuves ;
- les quotas sont configurables ;
- les coûts sont suivis ;
- les fournisseurs IA sont interchangeables ;
- le fallback est prévu ;
- les traitements lourds sont asynchrones ;
- les notifications sont envoyées ;
- les rôles et permissions sont appliqués ;
- les feature flags sont disponibles ;
- le reporting est disponible ;
- les tests fonctionnels, sécurité, performance et résilience réussissent ;
- les audits sont immuables.
