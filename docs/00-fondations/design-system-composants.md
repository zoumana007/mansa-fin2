# Design system des composants Mansa

## 1. Objectif

Le design system Mansa doit garantir une identité visuelle cohérente sur l’ensemble de l’écosystème :

- site web ;
- application client ;
- application commerçant ;
- application TPE ;
- application Admin Lite ;
- portail administrateur ;
- annuaire ;
- interfaces partenaires ;
- outils internes.

Chaque composant doit être réutilisable, accessible, performant et configurable.

## 2. Principes généraux

Tous les composants doivent respecter les règles suivantes :

- apparence cohérente sur toutes les plateformes ;
- adaptation au mode clair et sombre ;
- tailles accessibles ;
- retour visuel immédiat ;
- états complets ;
- animations sobres sur les applications ;
- animations plus riches sur le site web ;
- compatibilité avec les écrans tactiles ;
- compatibilité clavier et lecteur d’écran sur le web ;
- adaptation aux appareils peu puissants.

Chaque composant doit obligatoirement prévoir les états suivants :

- normal ;
- survol ;
- pressé ;
- focus ;
- désactivé ;
- chargement ;
- succès ;
- erreur ;
- avertissement.

## 3. Boutons

### Bouton principal

Utilisé pour l’action la plus importante de l’écran.

Exemples :

- payer ;
- envoyer ;
- confirmer ;
- continuer ;
- créer un compte.

Caractéristiques :

- fond principal Mansa ;
- texte très lisible ;
- hauteur confortable ;
- légère animation au clic ;
- retour haptique sur mobile ;
- état de chargement intégré ;
- blocage contre les doubles clics.

### Bouton secondaire

Utilisé pour une action importante mais non prioritaire.

Exemples :

- ajouter un bénéficiaire ;
- consulter les détails ;
- modifier ;
- télécharger un reçu.

### Bouton tertiaire

Utilisé pour les actions discrètes.

Exemples :

- annuler ;
- fermer ;
- ignorer ;
- revenir.

### Bouton critique

Réservé aux actions sensibles.

Exemples :

- supprimer un compte ;
- bloquer une carte ;
- annuler définitivement une opération ;
- suspendre un utilisateur.

Il doit toujours afficher une confirmation claire.

### Bouton icône

Utilisé pour :

- notifications ;
- scanner ;
- paramètres ;
- partage ;
- aide ;
- filtre ;
- recherche.

## 4. Champs de saisie

Les champs doivent être simples, lisibles et rassurants.

Types principaux :

- texte ;
- téléphone ;
- e-mail ;
- mot de passe ;
- montant ;
- code PIN ;
- code OTP ;
- recherche ;
- adresse ;
- numéro de carte ;
- date d’expiration ;
- sélection de pays ;
- sélection de devise.

Chaque champ doit prévoir :

- libellé visible ;
- texte d’aide ;
- message d’erreur ;
- validation en temps réel ;
- icône adaptée ;
- clavier mobile approprié ;
- masquage des données sensibles ;
- état lecture seule ;
- autocomplétion lorsque cela est sûr.

## 5. Cartes d’interface

### Carte standard

Utilisée pour présenter :

- une information ;
- un service ;
- une promotion ;
- un raccourci ;
- un résumé.

### Carte financière

Utilisée pour :

- solde ;
- dépense ;
- revenu ;
- épargne ;
- dette ;
- crédit ;
- commission.

### Carte bancaire

Elle doit prévoir :

- version physique ;
- version virtuelle ;
- version temporaire ;
- version jetable ;
- statut actif ;
- statut bloqué ;
- statut expiré ;
- statut en fabrication ;
- statut en livraison.

Interactions possibles :

- inclinaison légère ;
- reflet dynamique ;
- retournement ;
- gel et dégel ;
- affichage masqué des numéros ;
- copie sécurisée ;
- ajout au Wallet.

### Carte commerçant

Utilisée pour :

- chiffre d’affaires ;
- ventes ;
- remboursements ;
- paiements en attente ;
- commissions ;
- stocks ;
- promotions.

### Carte administrative

Utilisée pour :

- indicateur ;
- alerte ;
- tâche ;
- incident ;
- utilisateur ;
- transaction ;
- anomalie ;
- audit.

## 6. Navigation

### Barre de navigation mobile

Elle doit contenir entre trois et cinq destinations principales.

Exemple application client :

- Accueil ;
- Paiements ;
- Cartes ;
- Annuaire ;
- Profil.

### Barre latérale web

Utilisée sur :

- portail administrateur ;
- portail commerçant ;
- espace partenaire ;
- espace développeur.

Elle doit prévoir :

- sections repliables ;
- permissions selon le rôle ;
- compteur de notifications ;
- recherche rapide ;
- accès au support ;
- déconnexion sécurisée.

### Navigation supérieure

Utilisée principalement sur le site web et certains portails.

Elle peut adopter un style Liquid Glass léger.

## 7. Fenêtres et panneaux

### Modale

Utilisée pour :

- confirmation ;
- information importante ;
- choix simple ;
- action critique.

### Bottom sheet

Prioritaire sur mobile pour :

- sélection d’un compte ;
- choix d’une carte ;
- filtre ;
- détails rapides ;
- validation ;
- partage.

### Panneau latéral

Utilisé sur le web pour :

- consulter un profil ;
- afficher une transaction ;
- modifier un objet ;
- afficher des détails sans quitter la page.

### Écran plein

Utilisé pour les opérations importantes :

- paiement ;
- transfert ;
- KYC ;
- création de compte ;
- configuration de sécurité.

## 8. Notifications et messages

### Toast

Message court pour :

- succès ;
- information ;
- avertissement ;
- erreur mineure.

### Bannière

Utilisée pour :

- maintenance ;
- incident ;
- problème de sécurité ;
- vérification manquante ;
- nouvelle version obligatoire.

### Centre de notifications

Il doit gérer :

- notifications financières ;
- sécurité ;
- promotions ;
- messages administratifs ;
- activité commerçant ;
- assistance ;
- annonces officielles.

Chaque notification doit avoir :

- date ;
- heure ;
- statut lu ou non lu ;
- catégorie ;
- action possible ;
- niveau de priorité.

## 9. Composants financiers

### Affichage d’un montant

Doit gérer :

- différentes devises ;
- séparateurs locaux ;
- montants négatifs ;
- montants masqués ;
- grands nombres ;
- centimes ;
- conversion ;
- mise à jour animée.

### Sélecteur de compte

Permet de choisir :

- compte principal ;
- portefeuille ;
- coffre ;
- compte commerçant ;
- compte professionnel ;
- compte État ;
- devise.

### Clavier de montant

Doit être :

- rapide ;
- lisible ;
- compatible avec la devise ;
- protégé contre les erreurs ;
- compatible avec les plafonds ;
- accompagné d’un résumé des frais.

### Résumé de transaction

Doit afficher :

- montant ;
- bénéficiaire ;
- frais ;
- taux de change ;
- source des fonds ;
- date ;
- référence ;
- statut ;
- bouton reçu ;
- bouton assistance.

### Statut de transaction

Statuts principaux :

- initiée ;
- en vérification ;
- en attente ;
- réussie ;
- échouée ;
- annulée ;
- remboursée ;
- contestée ;
- bloquée pour contrôle.

## 10. Composants de paiement

### QR Code

Doit prévoir :

- génération ;
- scan ;
- expiration ;
- montant fixe ou libre ;
- identité du commerçant ;
- statut en direct ;
- mode hors ligne lorsque disponible ;
- confirmation visuelle.

### NFC

L’interface doit indiquer clairement :

- appareil prêt ;
- carte détectée ;
- lecture en cours ;
- validation ;
- erreur ;
- retrait de la carte ;
- paiement réussi.

### Paiement partagé

Doit gérer :

- division égale ;
- division personnalisée ;
- paiement par article ;
- invitation de plusieurs personnes ;
- suivi des paiements reçus ;
- relance ;
- solde restant.

### Reçu

Le reçu doit pouvoir être :

- affiché ;
- téléchargé ;
- partagé ;
- envoyé ;
- imprimé ;
- vérifié ;
- retrouvé dans l’historique.

## 11. Composants d’identité et KYC

### Capture de document

Doit fournir :

- cadre de capture ;
- aide au positionnement ;
- détection de flou ;
- détection de lumière ;
- recto et verso ;
- progression ;
- reprise en cas d’erreur.

### Vérification faciale

Doit comporter :

- consignes simples ;
- animation de guidage ;
- vérification de présence réelle ;
- confirmation ;
- traitement respectueux de la confidentialité.

### Statut KYC

Statuts :

- non commencé ;
- incomplet ;
- en cours d’analyse ;
- validé ;
- refusé ;
- informations à compléter ;
- expiré.

## 12. Graphiques et données

Types principaux :

- courbe ;
- barres ;
- anneau ;
- répartition ;
- évolution ;
- comparaison ;
- carte géographique ;
- jauge ;
- tableau.

Règles :

- animation progressive ;
- valeurs lisibles ;
- légende claire ;
- accessibilité ;
- filtrage ;
- export ;
- vue simplifiée sur mobile ;
- vue détaillée sur le web.

## 13. Tableaux administratifs

Les tableaux doivent gérer :

- tri ;
- filtre ;
- recherche ;
- pagination ;
- colonnes personnalisables ;
- export ;
- sélection multiple ;
- actions groupées ;
- permissions ;
- historique des modifications ;
- affichage des détails.

Ils doivent aussi prévoir une vue sous forme de cartes pour les petits écrans.

## 14. Chargement et attente

### Skeleton loader

À utiliser pour :

- tableaux ;
- cartes ;
- profils ;
- graphiques ;
- listes.

### Spinner

Réservé aux attentes courtes.

### Barre de progression

Utilisée pour :

- KYC ;
- téléchargement ;
- import ;
- traitement ;
- inscription ;
- configuration.

Une animation ne doit jamais masquer un blocage réel.

## 15. États vides

Chaque écran vide doit contenir :

- une illustration légère ;
- une explication ;
- une action principale ;
- une éventuelle action secondaire.

Exemples :

- aucune transaction ;
- aucune carte ;
- aucun bénéficiaire ;
- aucune notification ;
- aucune vente ;
- aucun résultat.

## 16. Erreurs

Les erreurs doivent être formulées clairement.

À éviter :

- erreur inconnue ;
- opération impossible ;
- problème technique.

À privilégier :

- la connexion a été interrompue ;
- le montant dépasse votre plafond ;
- cette carte est actuellement bloquée ;
- le code saisi est incorrect ;
- le paiement n’a pas été débité.

Chaque erreur doit proposer une action utile.

## 17. Composants spécifiques au TPE

L’application TPE doit prévoir :

- clavier montant ;
- choix du moyen de paiement ;
- lecture carte ;
- sans contact ;
- QR ;
- Mobile Money ;
- paiement partagé ;
- pourboire ;
- remboursement ;
- historique ;
- clôture de caisse ;
- impression ;
- connexion imprimante ;
- mode hors ligne ;
- état réseau ;
- niveau de batterie ;
- identité du caissier ;
- changement d’utilisateur.

Les boutons doivent être plus grands que sur une application mobile classique.

## 18. Composants spécifiques au site web

Le site web peut ajouter :

- cartes 3D ;
- téléphones interactifs ;
- sections avec parallaxe ;
- statistiques animées ;
- objets réactifs au curseur ;
- carrousels immersifs ;
- démonstrations de produits ;
- globe 3D ;
- présentation des partenaires ;
- animations de parcours utilisateur.

Ces composants ne doivent pas ralentir l’accès aux informations principales.

## 19. Bibliothèque de composants

Chaque composant devra être documenté avec :

- nom ;
- description ;
- usage ;
- variantes ;
- tailles ;
- états ;
- règles d’accessibilité ;
- règles d’animation ;
- exemple web ;
- exemple mobile ;
- exemple sombre ;
- exemple clair ;
- limitations ;
- erreurs à éviter.

## 20. Gouvernance du design system

Toute modification d’un composant partagé doit :

- être documentée ;
- être versionnée ;
- être testée ;
- être validée ;
- être communiquée aux équipes ;
- prévoir une migration ;
- éviter de casser les anciennes interfaces.

Le design system doit rester pilotable par l’administration pour les éléments configurables, sans permettre de modifier les règles critiques de sécurité.
