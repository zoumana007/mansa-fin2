# Bloc 6 — Bibliothèque complète des composants Mansa

## 1. Objectif

La bibliothèque de composants Mansa définit tous les éléments réutilisables nécessaires à la construction des interfaces de l’écosystème.

Produits concernés :

- site web ;
- application client ;
- application commerçant ;
- application TPE ;
- application Admin Lite ;
- portail administrateur ;
- portail État ;
- annuaire ;
- portail développeur ;
- interfaces partenaires ;
- outils internes.

Chaque composant doit être :

- réutilisable ;
- configurable ;
- accessible ;
- responsive ;
- documenté ;
- testable ;
- compatible avec les modes clair et sombre ;
- compatible avec la réduction des animations ;
- performant sur les appareils d’entrée de gamme.

---

# 2. Structure obligatoire d’un composant

Chaque composant doit posséder :

- un nom officiel ;
- un rôle ;
- des variantes ;
- des tailles ;
- des états ;
- des règles d’utilisation ;
- des règles d’accessibilité ;
- des règles d’animation ;
- une version mobile ;
- une version web ;
- une version sombre ;
- une version claire ;
- une documentation technique ;
- des tests.

---

# 3. États obligatoires

Chaque composant interactif doit prévoir :

- normal ;
- survol ;
- focus ;
- pressé ;
- sélectionné ;
- désactivé ;
- lecture seule ;
- chargement ;
- succès ;
- avertissement ;
- erreur ;
- hors ligne.

---

# 4. Bouton principal

Utilisation :

- confirmer ;
- payer ;
- envoyer ;
- continuer ;
- créer ;
- valider.

Variantes :

- standard ;
- avec icône ;
- avec chargement ;
- avec montant ;
- pleine largeur ;
- compacte.

Règles :

- une seule action principale par zone ;
- texte court ;
- contraste élevé ;
- protection contre les doubles clics ;
- retour haptique sur mobile.

---

# 5. Bouton secondaire

Utilisation :

- modifier ;
- consulter ;
- ajouter ;
- télécharger ;
- partager.

Variantes :

- contour ;
- surface ;
- texte et icône ;
- compacte.

---

# 6. Bouton tertiaire

Utilisation :

- annuler ;
- fermer ;
- ignorer ;
- revenir ;
- afficher plus.

Il doit rester visuellement discret.

---

# 7. Bouton critique

Utilisation :

- supprimer ;
- bloquer ;
- suspendre ;
- annuler définitivement ;
- révoquer.

Règles :

- couleur fonctionnelle de danger ;
- confirmation obligatoire ;
- explication claire ;
- aucun déclenchement accidentel.

---

# 8. Bouton icône

Utilisation :

- recherche ;
- paramètres ;
- partage ;
- filtre ;
- scanner ;
- notifications ;
- fermeture.

Zone tactile minimale :

```text
44 × 44 px
```

---

# 9. Bouton flottant

Utilisation :

- nouvelle transaction ;
- scanner ;
- créer ;
- ajouter.

Il doit rester accessible sans masquer le contenu principal.

---

# 10. Groupe de boutons

Utilisation :

- choix exclusif ;
- actions liées ;
- contrôles rapides.

Variantes :

- horizontal ;
- vertical ;
- segmenté ;
- compact.

---

# 11. Champ texte

Contenu :

- libellé ;
- valeur ;
- aide ;
- erreur ;
- icône ;
- compteur facultatif.

États :

- vide ;
- rempli ;
- focus ;
- erreur ;
- désactivé ;
- lecture seule.

---

# 12. Champ téléphone

Fonctions :

- indicatif ;
- format local ;
- validation ;
- détection de pays ;
- clavier numérique ;
- autocomplétion sécurisée.

---

# 13. Champ e-mail

Fonctions :

- validation ;
- suggestions ;
- autocomplétion ;
- correction simple ;
- message d’erreur clair.

---

# 14. Champ mot de passe

Fonctions :

- afficher ou masquer ;
- niveau de sécurité ;
- exigences visibles ;
- détection des erreurs ;
- autocomplétion contrôlée.

---

# 15. Champ PIN

Règles :

- chiffres uniquement ;
- nombre de caractères défini ;
- masquage ;
- prévention des captures lorsque nécessaire ;
- biométrie proposée en alternative.

---

# 16. Champ OTP

Fonctions :

- saisie automatique ;
- collage complet ;
- renvoi du code ;
- minuterie ;
- validation immédiate ;
- message d’expiration.

---

# 17. Champ montant

Fonctions :

- devise ;
- séparateurs ;
- plafond ;
- frais ;
- solde disponible ;
- validation ;
- conversion ;
- clavier adapté.

---

# 18. Zone de texte

Utilisation :

- message ;
- description ;
- commentaire ;
- motif ;
- support.

Fonctions :

- compteur ;
- redimensionnement web ;
- longueur maximale ;
- sauvegarde de brouillon.

---

# 19. Sélecteur simple

Utilisation :

- pays ;
- devise ;
- catégorie ;
- statut ;
- compte ;
- carte.

Variantes :

- menu ;
- bottom sheet ;
- recherche ;
- liste.

---

# 20. Sélecteur multiple

Fonctions :

- plusieurs choix ;
- compteur ;
- suppression rapide ;
- recherche ;
- sélection complète ;
- réinitialisation.

---

# 21. Sélecteur de date

Variantes :

- date simple ;
- période ;
- mois ;
- année ;
- date et heure.

Il doit respecter le format local.

---

# 22. Sélecteur de devise

Contenu :

- code ;
- nom ;
- symbole ;
- pays ;
- taux éventuel ;
- compte associé.

---

# 23. Sélecteur de pays

Contenu :

- drapeau ;
- nom ;
- indicatif ;
- code ISO ;
- disponibilité du service.

---

# 24. Case à cocher

Utilisation :

- consentement ;
- sélection multiple ;
- paramètre ;
- action groupée.

États :

- décochée ;
- cochée ;
- partielle ;
- désactivée.

---

# 25. Bouton radio

Utilisation :

- choix unique ;
- méthode de paiement ;
- compte source ;
- type de service.

---

# 26. Interrupteur

Utilisation :

- activer ;
- désactiver ;
- notifications ;
- biométrie ;
- carte ;
- fonction facultative.

Le changement doit être immédiat ou clairement confirmé.

---

# 27. Curseur

Utilisation :

- montant ;
- plafond ;
- fréquence ;
- niveau ;
- réglage.

Il doit afficher la valeur exacte.

---

# 28. Clavier numérique

Utilisation :

- montant ;
- PIN ;
- code ;
- TPE.

Variantes :

- standard ;
- TPE ;
- avec décimales ;
- avec montant rapide.

---

# 29. Barre de recherche

Fonctions :

- recherche instantanée ;
- suggestions ;
- historique ;
- effacement ;
- filtres ;
- commande vocale facultative.

---

# 30. Barre de navigation mobile

Maximum :

```text
5 destinations
```

Composants :

- icône ;
- libellé ;
- état actif ;
- badge ;
- animation légère.

---

# 31. Navigation supérieure web

Contenu possible :

- logo ;
- liens ;
- recherche ;
- connexion ;
- langue ;
- thème ;
- appel à l’action.

Variantes :

- transparente ;
- Liquid Glass ;
- fixe ;
- compacte.

---

# 32. Barre latérale

Utilisation :

- administration ;
- commerce ;
- État ;
- portail développeur.

Fonctions :

- sections ;
- sous-sections ;
- repli ;
- permissions ;
- recherche ;
- badges ;
- profil.

---

# 33. Fil d’Ariane

Utilisation :

- administration ;
- paramètres ;
- pages profondes ;
- portail développeur.

Il doit afficher le contexte sans surcharger l’écran.

---

# 34. Onglets

Variantes :

- horizontaux ;
- verticaux ;
- segmentés ;
- défilables ;
- avec badges.

---

# 35. Pagination

Variantes :

- pages ;
- charger plus ;
- défilement infini ;
- curseur API.

Le portail administrateur doit privilégier une pagination contrôlée.

---

# 36. Carte standard

Contenu :

- titre ;
- description ;
- icône ;
- statut ;
- action ;
- métadonnées.

Variantes :

- simple ;
- interactive ;
- sélectionnable ;
- Liquid Glass ;
- compacte.

---

# 37. Carte financière

Contenu :

- libellé ;
- montant ;
- évolution ;
- période ;
- graphique ;
- statut.

---

# 38. Carte bancaire

Contenu :

- marque ;
- type ;
- titulaire ;
- numéro masqué ;
- expiration ;
- statut ;
- réseau ;
- devise.

Variantes :

- physique ;
- virtuelle ;
- temporaire ;
- jetable ;
- premium ;
- bloquée ;
- expirée ;
- en livraison.

---

# 39. Carte compte

Contenu :

- nom ;
- solde ;
- devise ;
- numéro masqué ;
- type ;
- statut ;
- action rapide.

---

# 40. Carte transaction

Contenu :

- bénéficiaire ;
- montant ;
- date ;
- statut ;
- catégorie ;
- référence ;
- moyen de paiement.

---

# 41. Carte commerçant

Contenu :

- nom ;
- logo ;
- catégorie ;
- localisation ;
- note ;
- promotion ;
- moyens de paiement ;
- statut ouvert ou fermé.

---

# 42. Carte promotion

Contenu :

- image ;
- titre ;
- réduction ;
- période ;
- conditions ;
- commerce ;
- action.

---

# 43. Carte utilisateur

Contenu :

- avatar ;
- nom ;
- statut ;
- identifiant ;
- rôle ;
- niveau KYC ;
- dernière activité.

---

# 44. Carte indicateur

Utilisation :

- KPI ;
- ventes ;
- fraude ;
- utilisateurs ;
- taxes ;
- incidents ;
- commissions.

---

# 45. Carte alerte

Niveaux :

- information ;
- avertissement ;
- critique ;
- urgence.

Contenu :

- titre ;
- résumé ;
- date ;
- source ;
- action ;
- statut.

---

# 46. Carte Jini

Contenu :

- suggestion ;
- analyse ;
- recommandation ;
- source ;
- action ;
- niveau de confiance.

---

# 47. Liste standard

Variantes :

- simple ;
- avec icône ;
- avec avatar ;
- avec statut ;
- avec action ;
- sélectionnable.

---

# 48. Liste de transactions

Chaque ligne contient :

- icône ou avatar ;
- nom ;
- catégorie ;
- date ;
- montant ;
- statut ;
- devise.

---

# 49. Liste de bénéficiaires

Contenu :

- avatar ;
- nom ;
- identifiant ;
- banque ou wallet ;
- favori ;
- dernière utilisation.

---

# 50. Liste de notifications

Contenu :

- icône ;
- catégorie ;
- titre ;
- résumé ;
- date ;
- état lu ;
- action.

---

# 51. Tableau administratif

Fonctions :

- tri ;
- filtre ;
- recherche ;
- pagination ;
- sélection ;
- export ;
- actions groupées ;
- colonnes configurables ;
- vue détaillée.

---

# 52. Tableau financier

Colonnes possibles :

- référence ;
- utilisateur ;
- montant ;
- frais ;
- devise ;
- date ;
- statut ;
- moyen ;
- pays ;
- risque.

---

# 53. Tableau audit

Colonnes :

- utilisateur ;
- rôle ;
- action ;
- date ;
- heure ;
- objet ;
- ancienne valeur ;
- nouvelle valeur ;
- adresse IP ;
- appareil.

---

# 54. Badge

Variantes :

- neutre ;
- succès ;
- avertissement ;
- erreur ;
- information ;
- premium ;
- brouillon.

---

# 55. Statut

Chaque statut associe :

- couleur ;
- icône ;
- texte ;
- forme ;
- description facultative.

---

# 56. Avatar

Variantes :

- image ;
- initiales ;
- icône ;
- entreprise ;
- groupe.

Tailles :

- petite ;
- standard ;
- grande ;
- profil.

---

# 57. Logo commerçant

Règles :

- format carré ou circulaire ;
- fond de secours ;
- compression ;
- vérification ;
- cohérence sur toutes les interfaces.

---

# 58. Icône fonctionnelle

Catégories :

- finance ;
- navigation ;
- sécurité ;
- commerce ;
- État ;
- support ;
- IA ;
- système.

---

# 59. Tooltip

Utilisation :

- clarification ;
- icône ;
- terme technique ;
- donnée abrégée.

Il ne doit jamais contenir une information indispensable.

---

# 60. Popover

Utilisation :

- détails rapides ;
- actions ;
- filtres ;
- profil ;
- paramètres courts.

---

# 61. Menu contextuel

Utilisation :

- modifier ;
- partager ;
- exporter ;
- bloquer ;
- supprimer ;
- consulter.

---

# 62. Menu déroulant

Fonctions :

- sélection ;
- navigation ;
- actions ;
- recherche facultative ;
- groupes ;
- raccourcis clavier.

---

# 63. Modale

Variantes :

- information ;
- confirmation ;
- formulaire ;
- erreur ;
- critique ;
- plein écran.

---

# 64. Bottom sheet

Utilisation mobile :

- sélection ;
- détails ;
- confirmation ;
- filtre ;
- partage ;
- choix de compte.

---

# 65. Panneau latéral

Utilisation web :

- détail ;
- édition ;
- historique ;
- support ;
- audit ;
- profil.

---

# 66. Accordéon

Utilisation :

- FAQ ;
- détails ;
- paramètres ;
- documentation ;
- regroupement.

---

# 67. Toast

Types :

- succès ;
- information ;
- avertissement ;
- erreur.

Durée :

- courte pour information ;
- plus longue pour erreur ;
- persistante si une action est requise.

---

# 68. Bannière

Utilisation :

- maintenance ;
- incident ;
- mise à jour ;
- sécurité ;
- vérification ;
- annonce officielle.

---

# 69. Alerte intégrée

Utilisation :

- formulaire ;
- transaction ;
- compte ;
- carte ;
- KYC ;
- sécurité.

---

# 70. Centre de notifications

Fonctions :

- catégories ;
- filtrage ;
- lecture ;
- archivage ;
- suppression ;
- action ;
- priorité.

---

# 71. Skeleton loader

Variantes :

- carte ;
- liste ;
- tableau ;
- profil ;
- graphique ;
- détail.

---

# 72. Spinner

Utilisation :

- attente courte ;
- action locale ;
- vérification simple.

Il ne doit pas être utilisé seul pour une attente longue.

---

# 73. Barre de progression

Utilisation :

- inscription ;
- KYC ;
- téléchargement ;
- import ;
- traitement ;
- configuration.

---

# 74. Indicateur d’étapes

Utilisation :

- onboarding ;
- KYC ;
- paiement ;
- création de compte ;
- demande ;
- formulaire complexe.

---

# 75. État vide

Contenu :

- illustration ;
- titre ;
- explication ;
- action principale ;
- action secondaire facultative.

---

# 76. État d’erreur

Contenu :

- titre clair ;
- explication ;
- solution ;
- nouvelle tentative ;
- support.

---

# 77. État hors ligne

Contenu :

- état réseau ;
- données disponibles ;
- actions possibles ;
- synchronisation ;
- nouvelle tentative.

---

# 78. Carte hors ligne TPE

Informations :

- mode actif ;
- limite ;
- nombre d’opérations ;
- dernière synchronisation ;
- risque ;
- état réseau.

---

# 79. Montant principal

Utilisation :

- solde ;
- paiement ;
- transfert ;
- vente ;
- taxe.

Règles :

- grande lisibilité ;
- chiffres tabulaires ;
- devise visible ;
- aucun retour à la ligne.

---

# 80. Montant secondaire

Utilisation :

- frais ;
- conversion ;
- remise ;
- taxe ;
- commission ;
- solde restant.

---

# 81. Résumé de transaction

Contenu :

- montant ;
- bénéficiaire ;
- source ;
- frais ;
- taux ;
- référence ;
- statut ;
- date ;
- heure.

---

# 82. Reçu

Actions :

- consulter ;
- télécharger ;
- partager ;
- envoyer ;
- imprimer ;
- vérifier ;
- contester.

---

# 83. Reçu TPE

Contenu :

- commerçant ;
- terminal ;
- caissier ;
- montant ;
- moyen ;
- référence ;
- date ;
- heure ;
- statut ;
- signature éventuelle.

---

# 84. Clavier de montant TPE

Fonctions :

- gros boutons ;
- effacement ;
- validation ;
- montants rapides ;
- devise ;
- limite ;
- retour sonore facultatif.

---

# 85. Sélecteur de moyen de paiement

Choix possibles :

- carte ;
- NFC ;
- QR ;
- Mobile Money ;
- wallet ;
- espèces enregistrées ;
- paiement partagé ;
- lien.

---

# 86. Interface NFC

États :

- prêt ;
- carte détectée ;
- lecture ;
- authentification ;
- validation ;
- erreur ;
- retrait de carte.

---

# 87. Scanner QR

Éléments :

- caméra ;
- cadre ;
- flash ;
- galerie ;
- aide ;
- retour ;
- confirmation ;
- erreur.

---

# 88. QR Code de paiement

Contenu :

- code ;
- montant ;
- commerce ;
- expiration ;
- référence ;
- partage ;
- annulation.

---

# 89. Paiement partagé

Composants :

- participants ;
- articles ;
- montant total ;
- répartition ;
- paiements reçus ;
- reste ;
- relance ;
- clôture.

---

# 90. Sélecteur de bénéficiaire

Sources :

- favoris ;
- récents ;
- contacts ;
- annuaire ;
- numéro ;
- QR ;
- compte bancaire.

---

# 91. Carte bénéficiaire

Contenu :

- nom ;
- avatar ;
- identifiant ;
- établissement ;
- compte masqué ;
- statut vérifié ;
- favori.

---

# 92. Capture de document

Éléments :

- cadre ;
- consigne ;
- flash ;
- recto ;
- verso ;
- qualité ;
- reprise ;
- validation.

---

# 93. Vérification faciale

Éléments :

- caméra ;
- contour ;
- consigne ;
- progression ;
- confidentialité ;
- reprise ;
- résultat.

---

# 94. Statut KYC

Valeurs :

- non commencé ;
- incomplet ;
- en analyse ;
- validé ;
- refusé ;
- complément demandé ;
- expiré.

---

# 95. Carte sécurité

Contenu :

- fonction ;
- statut ;
- dernière modification ;
- appareil ;
- action ;
- recommandation.

---

# 96. Liste des appareils

Contenu :

- appareil ;
- système ;
- localisation ;
- dernière activité ;
- statut ;
- révocation.

---

# 97. Biométrie

Composants :

- activation ;
- désactivation ;
- confirmation ;
- appareil compatible ;
- état ;
- alternative PIN.

---

# 98. Graphique en courbe

Utilisation :

- évolution ;
- solde ;
- revenus ;
- transactions ;
- activité.

Fonctions :

- période ;
- survol ;
- comparaison ;
- export ;
- accessibilité.

---

# 99. Graphique en barres

Utilisation :

- comparaison ;
- ventes ;
- pays ;
- catégories ;
- périodes.

---

# 100. Graphique en anneau

Utilisation :

- répartition ;
- catégories ;
- moyens de paiement ;
- statuts ;
- commissions.

---

# 101. Jauge

Utilisation :

- plafond ;
- risque ;
- progression ;
- objectif ;
- disponibilité.

---

# 102. Carte géographique

Utilisation :

- utilisateurs ;
- transactions ;
- commerces ;
- expansion ;
- incidents ;
- services publics.

---

# 103. KPI

Contenu :

- valeur ;
- variation ;
- période ;
- objectif ;
- source ;
- détail.

---

# 104. Filtre rapide

Variantes :

- aujourd’hui ;
- semaine ;
- mois ;
- année ;
- personnalisé.

---

# 105. Filtre avancé

Champs possibles :

- date ;
- montant ;
- statut ;
- pays ;
- utilisateur ;
- produit ;
- moyen ;
- risque ;
- devise.

---

# 106. Export

Formats :

- CSV ;
- XLSX ;
- PDF ;
- JSON ;
- impression.

Règles :

- permissions ;
- journalisation ;
- confirmation ;
- protection des données.

---

# 107. Import

Fonctions :

- modèle ;
- téléversement ;
- vérification ;
- aperçu ;
- erreurs ;
- correction ;
- validation ;
- rapport.

---

# 108. Téléversement de fichier

États :

- vide ;
- survol ;
- dépôt ;
- chargement ;
- succès ;
- erreur ;
- remplacement.

---

# 109. Galerie

Utilisation :

- commerce ;
- produit ;
- document ;
- preuve ;
- promotion ;
- assistance.

---

# 110. Image produit

Variantes :

- miniature ;
- carte ;
- détail ;
- zoom ;
- galerie.

---

# 111. Carte produit

Contenu :

- image ;
- nom ;
- prix ;
- stock ;
- promotion ;
- catégorie ;
- action.

---

# 112. Panier

Contenu :

- produits ;
- quantités ;
- prix ;
- remise ;
- taxe ;
- total ;
- paiement.

---

# 113. Sélecteur de quantité

Fonctions :

- ajouter ;
- retirer ;
- saisie ;
- stock ;
- limite ;
- suppression.

---

# 114. Carte commande

Contenu :

- numéro ;
- client ;
- montant ;
- statut ;
- date ;
- livraison ;
- action.

---

# 115. Ticket support

Contenu :

- référence ;
- sujet ;
- priorité ;
- statut ;
- utilisateur ;
- agent ;
- date ;
- historique.

---

# 116. Conversation support

Composants :

- messages ;
- pièces jointes ;
- statut ;
- agent ;
- horodatage ;
- saisie ;
- clôture.

---

# 117. Message utilisateur

Variantes :

- texte ;
- image ;
- fichier ;
- système ;
- erreur ;
- action.

---

# 118. Conversation Jini

Composants :

- message utilisateur ;
- réponse Jini ;
- suggestion ;
- action ;
- source ;
- historique ;
- saisie vocale.

---

# 119. Carte suggestion Jini

Contenu :

- recommandation ;
- justification ;
- impact ;
- action ;
- niveau de confiance ;
- refus.

---

# 120. Commande vocale

États :

- repos ;
- écoute ;
- traitement ;
- réponse ;
- erreur ;
- interruption.

---

# 121. Sélecteur de langue

Contenu :

- langue ;
- région ;
- disponibilité ;
- téléchargement hors ligne éventuel.

---

# 122. Sélecteur de thème

Choix :

- clair ;
- sombre ;
- système.

---

# 123. Paramètre

Contenu :

- titre ;
- description ;
- contrôle ;
- statut ;
- dépendance ;
- aide.

---

# 124. Carte abonnement

Contenu :

- formule ;
- prix ;
- période ;
- fonctionnalités ;
- statut ;
- renouvellement ;
- action.

---

# 125. Comparateur d’offres

Fonctions :

- colonnes ;
- fonctionnalités ;
- prix ;
- recommandations ;
- sélection ;
- détail.

---

# 126. Carte fidélité

Contenu :

- commerce ;
- points ;
- niveau ;
- récompense ;
- progression ;
- expiration.

---

# 127. Carte récompense

Contenu :

- titre ;
- coût ;
- disponibilité ;
- expiration ;
- conditions ;
- action.

---

# 128. Carte événement

Contenu :

- titre ;
- date ;
- lieu ;
- organisateur ;
- statut ;
- inscription ;
- rappel.

---

# 129. Carte service public

Contenu :

- administration ;
- service ;
- description ;
- montant ;
- délai ;
- documents ;
- action.

---

# 130. Carte amende

Contenu :

- type ;
- montant ;
- agent ;
- date ;
- lieu ;
- preuve ;
- statut ;
- contestation ;
- paiement.

---

# 131. Carte taxe

Contenu :

- catégorie ;
- période ;
- montant ;
- échéance ;
- statut ;
- détail ;
- paiement.

---

# 132. Carte bourse

Contenu :

- programme ;
- bénéficiaire ;
- montant ;
- période ;
- statut ;
- versement ;
- historique.

---

# 133. Profil agent

Contenu :

- identité ;
- organisme ;
- matricule ;
- rôle ;
- permissions ;
- statut ;
- historique ;
- appareil.

---

# 134. Carte audit agent

Contenu :

- action ;
- heure ;
- dossier ;
- localisation ;
- appareil ;
- résultat ;
- anomalie éventuelle.

---

# 135. Sélecteur de rôle

Fonctions :

- rôle ;
- permissions ;
- périmètre ;
- durée ;
- validation ;
- audit.

---

# 136. Matrice de permissions

Axes :

- rôle ;
- ressource ;
- lecture ;
- création ;
- modification ;
- suppression ;
- export ;
- validation.

---

# 137. Journal d’activité

Contenu :

- utilisateur ;
- action ;
- date ;
- objet ;
- résultat ;
- appareil ;
- adresse IP ;
- localisation.

---

# 138. Carte fraude

Contenu :

- score ;
- raison ;
- transaction ;
- utilisateur ;
- signaux ;
- statut ;
- décision ;
- historique.

---

# 139. Indicateur de risque

Niveaux :

- faible ;
- moyen ;
- élevé ;
- critique.

Il doit toujours afficher une explication.

---

# 140. Carte incident

Contenu :

- titre ;
- service ;
- gravité ;
- début ;
- statut ;
- impact ;
- responsable ;
- résolution.

---

# 141. Timeline

Utilisation :

- transaction ;
- KYC ;
- livraison ;
- ticket ;
- incident ;
- demande ;
- audit.

---

# 142. Stepper vertical

Utilisation :

- processus administratif ;
- KYC ;
- enquête ;
- livraison ;
- validation.

---

# 143. Calendrier

Variantes :

- jour ;
- semaine ;
- mois ;
- agenda ;
- opérations ;
- échéances.

---

# 144. Créneau horaire

Utilisation :

- rendez-vous ;
- livraison ;
- appel ;
- intervention ;
- support.

---

# 145. Carte rendez-vous

Contenu :

- date ;
- heure ;
- participant ;
- lieu ;
- canal ;
- statut ;
- action.

---

# 146. Carte développeur

Contenu :

- application ;
- environnement ;
- clé ;
- statut ;
- quota ;
- dernière activité ;
- documentation.

---

# 147. Clé API

Fonctions :

- création ;
- masquage ;
- copie ;
- rotation ;
- révocation ;
- expiration ;
- permissions.

---

# 148. Webhook

Contenu :

- URL ;
- événements ;
- statut ;
- secret ;
- dernières tentatives ;
- erreurs ;
- test.

---

# 149. Console de logs API

Fonctions :

- recherche ;
- filtres ;
- statut ;
- latence ;
- requête ;
- réponse ;
- export ;
- répétition.

---

# 150. Sélecteur d’environnement

Choix :

- démonstration ;
- recette ;
- production.

Le changement doit être clairement visible.

---

# 151. Bannière d’environnement

Elle doit indiquer en permanence :

- environnement ;
- couleur ;
- restrictions ;
- données ;
- risque.

---

# 152. Carte partenaire

Contenu :

- logo ;
- nom ;
- type ;
- statut ;
- contrat ;
- services ;
- contacts ;
- performance.

---

# 153. Carte banque

Contenu :

- banque ;
- services ;
- disponibilité ;
- incidents ;
- volumes ;
- règlement ;
- contact.

---

# 154. Carte Mobile Money

Contenu :

- opérateur ;
- pays ;
- statut ;
- frais ;
- limites ;
- incidents ;
- volume.

---

# 155. Carte réseau de cartes

Contenu :

- réseau ;
- pays ;
- statut ;
- certification ;
- opérations ;
- litiges ;
- disponibilité.

---

# 156. Carte terminal

Contenu :

- identifiant ;
- modèle ;
- commerce ;
- caissier ;
- statut ;
- batterie ;
- réseau ;
- dernière activité.

---

# 157. Carte imprimante

Contenu :

- modèle ;
- connexion ;
- papier ;
- statut ;
- test ;
- erreur.

---

# 158. État réseau

Valeurs :

- en ligne ;
- faible ;
- hors ligne ;
- synchronisation ;
- erreur.

---

# 159. État batterie

Niveaux :

- élevé ;
- moyen ;
- faible ;
- critique ;
- en charge.

---

# 160. Carte synchronisation

Contenu :

- dernière synchronisation ;
- opérations en attente ;
- erreurs ;
- progression ;
- action.

---

# 161. Carte version d’application

Contenu :

- version ;
- plateforme ;
- date ;
- statut ;
- obligatoire ;
- notes ;
- mise à jour.

---

# 162. Fenêtre de mise à jour

Types :

- facultative ;
- recommandée ;
- obligatoire ;
- critique.

---

# 163. Consentement

Contenu :

- objectif ;
- données ;
- durée ;
- tiers ;
- choix ;
- retrait ;
- preuve.

---

# 164. Cookie banner web

Choix :

- accepter ;
- refuser ;
- personnaliser ;
- politique.

---

# 165. Signature électronique

Fonctions :

- dessin ;
- validation ;
- effacement ;
- identité ;
- horodatage ;
- preuve.

---

# 166. Carte document

Contenu :

- nom ;
- type ;
- taille ;
- date ;
- statut ;
- propriétaire ;
- action.

---

# 167. Visionneuse de document

Fonctions :

- zoom ;
- pages ;
- recherche ;
- téléchargement ;
- impression ;
- annotation selon permissions.

---

# 168. Annotation

Types :

- commentaire ;
- surlignage ;
- validation ;
- rejet ;
- demande de correction.

---

# 169. Composant de comparaison

Utilisation :

- avant et après ;
- offres ;
- documents ;
- valeurs ;
- versions ;
- anomalies.

---

# 170. Différence de valeur

Affiche :

- ancienne valeur ;
- nouvelle valeur ;
- auteur ;
- date ;
- motif.

---

# 171. Carte version

Contenu :

- numéro ;
- date ;
- auteur ;
- changements ;
- statut ;
- restauration.

---

# 172. Command palette

Utilisation web :

- navigation ;
- recherche ;
- actions ;
- raccourcis ;
- création rapide.

---

# 173. Raccourcis clavier

Le portail web peut proposer :

- recherche ;
- création ;
- navigation ;
- fermeture ;
- sauvegarde ;
- aide.

---

# 174. Aide contextuelle

Formats :

- tooltip ;
- panneau ;
- tutoriel ;
- lien ;
- exemple ;
- vidéo.

---

# 175. Tutoriel guidé

Fonctions :

- étapes ;
- progression ;
- précédent ;
- suivant ;
- ignorer ;
- reprendre.

---

# 176. Onboarding

Composants :

- présentation ;
- bénéfices ;
- permissions ;
- inscription ;
- sécurité ;
- première action.

---

# 177. Checklist de démarrage

Utilisation :

- commerçant ;
- développeur ;
- administrateur ;
- agent ;
- utilisateur premium.

---

# 178. Carte objectif

Contenu :

- titre ;
- montant cible ;
- progression ;
- échéance ;
- contribution ;
- statut.

---

# 179. Barre d’objectif

Fonctions :

- progression ;
- montant restant ;
- date ;
- recommandation ;
- animation légère.

---

# 180. Carte coffre

Contenu :

- nom ;
- solde ;
- objectif ;
- verrouillage ;
- fréquence ;
- action.

---

# 181. Carte budget

Contenu :

- catégorie ;
- montant prévu ;
- dépensé ;
- restant ;
- période ;
- alerte.

---

# 182. Carte abonnement détecté

Contenu :

- service ;
- montant ;
- fréquence ;
- prochaine date ;
- statut ;
- annulation ;
- analyse.

---

# 183. Carte dépense

Contenu :

- catégorie ;
- commerce ;
- montant ;
- date ;
- note ;
- budget ;
- justificatif.

---

# 184. Carte facture

Contenu :

- numéro ;
- émetteur ;
- client ;
- montant ;
- échéance ;
- statut ;
- paiement.

---

# 185. Créateur de facture

Champs :

- client ;
- produits ;
- quantité ;
- taxe ;
- remise ;
- échéance ;
- notes ;
- aperçu.

---

# 186. Carte devis

Contenu :

- référence ;
- client ;
- montant ;
- validité ;
- statut ;
- conversion en facture.

---

# 187. Carte stock

Contenu :

- produit ;
- quantité ;
- seuil ;
- valeur ;
- emplacement ;
- alerte.

---

# 188. Alerte stock

Niveaux :

- faible ;
- rupture ;
- surstock ;
- expiration.

---

# 189. Scanner code-barres

Fonctions :

- caméra ;
- saisie ;
- flash ;
- résultat ;
- produit ;
- quantité ;
- erreur.

---

# 190. Carte livraison

Contenu :

- commande ;
- destinataire ;
- adresse ;
- agent ;
- statut ;
- progression ;
- preuve.

---

# 191. Carte adresse

Contenu :

- libellé ;
- adresse ;
- coordonnées ;
- instructions ;
- favori ;
- vérification.

---

# 192. Carte localisation

Fonctions :

- carte ;
- position ;
- distance ;
- itinéraire ;
- disponibilité ;
- confidentialité.

---

# 193. Carte agence

Contenu :

- nom ;
- adresse ;
- horaires ;
- services ;
- distance ;
- statut ;
- contact.

---

# 194. Carte distributeur

Contenu :

- localisation ;
- disponibilité ;
- services ;
- frais ;
- horaires ;
- état.

---

# 195. Carte agent Mobile Money

Contenu :

- nom ;
- opérateur ;
- localisation ;
- disponibilité ;
- liquidité déclarée ;
- note ;
- horaires.

---

# 196. Carte avis

Contenu :

- auteur ;
- note ;
- date ;
- commentaire ;
- réponse ;
- statut.

---

# 197. Sélecteur de note

Valeurs :

```text
1 à 5
```

Il doit être accessible au clavier et au lecteur d’écran.

---

# 198. Carte contact

Contenu :

- nom ;
- téléphone ;
- e-mail ;
- rôle ;
- entreprise ;
- actions.

---

# 199. Carte équipe

Contenu :

- membre ;
- rôle ;
- permissions ;
- statut ;
- dernière activité ;
- actions.

---

# 200. Gouvernance de la bibliothèque

Tout nouveau composant doit :

- répondre à un besoin réel ;
- éviter les doublons ;
- respecter les tokens ;
- être documenté ;
- être testé ;
- être accessible ;
- être validé ;
- être versionné ;
- prévoir une migration ;
- être ajouté à la bibliothèque officielle.

---

# 201. Convention de nommage

Format recommandé :

```text
Mansa/Produit/Catégorie/Composant/Variante/État
```

Exemple :

```text
Mansa/Mobile/Payment/Button/Primary/Loading
```

---

# 202. Documentation Figma

Chaque composant Figma doit contenir :

- Auto Layout ;
- variables ;
- variantes ;
- propriétés ;
- états ;
- description ;
- exemples ;
- règles ;
- composants liés.

---

# 203. Documentation technique

Chaque composant développé doit contenir :

- API ;
- propriétés ;
- événements ;
- exemples ;
- accessibilité ;
- tests ;
- dépendances ;
- limitations ;
- version.

---

# 204. Tests visuels

Les composants doivent être testés sur :

- mode clair ;
- mode sombre ;
- petit écran ;
- grand écran ;
- texte long ;
- langue différente ;
- données absentes ;
- erreur ;
- chargement ;
- réduction des mouvements.

---

# 205. Tests fonctionnels

Les tests doivent couvrir :

- clic ;
- clavier ;
- toucher ;
- lecteur d’écran ;
- focus ;
- validation ;
- erreur ;
- réseau faible ;
- hors ligne ;
- double action.

---

# 206. Règle finale

Aucune équipe ne doit recréer un composant existant sans justification.

La bibliothèque Mansa constitue la source officielle pour toutes les interfaces.

Un composant doit toujours être cohérent, prévisible, accessible et reconnaissable, quel que soit le produit dans lequel il est utilisé.
