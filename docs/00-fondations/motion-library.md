# Bloc 7 — Motion Library Mansa

## 1. Objectif

La Motion Library Mansa définit toutes les animations réutilisables de l’écosystème.

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
- Jini ;
- outils internes.

Chaque animation doit être :

- utile ;
- cohérente ;
- performante ;
- accessible ;
- interrompable ;
- documentée ;
- configurable ;
- compatible avec la réduction des mouvements ;
- adaptée à la plateforme ;
- testée sur appareils faibles.

## 2. Principes fondamentaux

Le mouvement Mansa doit :

- guider ;
- confirmer ;
- expliquer ;
- rassurer ;
- hiérarchiser ;
- donner une sensation de qualité ;
- préserver la rapidité ;
- rester discret dans les opérations sensibles.

Le mouvement ne doit jamais :

- masquer une erreur ;
- retarder une confirmation réelle ;
- simuler un traitement inexistant ;
- exposer des données sensibles ;
- rendre une action ambiguë ;
- empêcher une interaction ;
- distraire pendant un paiement ;
- fatiguer visuellement.

## 3. Niveaux d’animation

### Niveau 1 — Fonctionnel

Utilisé partout.

Exemples : pression, focus, changement d’état, validation, erreur, chargement, apparition, disparition et navigation.

### Niveau 2 — Premium

Utilisé principalement dans les applications.

Exemples : carte bancaire interactive, graphique progressif, transition partagée, retour haptique, QR animé, NFC animé, paiement réussi et mise à jour du solde.

### Niveau 3 — Immersif

Utilisé principalement sur le site web.

Exemples : objets 3D, téléphone interactif, carte bancaire 3D, globe, particules, parallaxe, storytelling au défilement et éclairage dynamique.

## 4. Tokens de durée

- Instantané : 80 ms.
- Très court : 120 ms.
- Court : 180 ms.
- Standard : 280 ms.
- Long : 420 ms.
- Confirmation : 800 ms.
- Immersif : 1 200 à 4 000 ms.

## 5. Courbes d’animation

- Standard : `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Douce : `cubic-bezier(0.22, 1, 0.36, 1)`.
- Sortie rapide : `cubic-bezier(0.4, 0, 1, 1)`.
- Entrée contrôlée : `cubic-bezier(0, 0, 0.2, 1)`.
- Élastique léger : réservé au succès, aux badges, aux confirmations et aux récompenses.

## 6. Tokens de déplacement

- Très léger : 2 à 4 px.
- Léger : 4 à 8 px.
- Standard : 8 à 16 px.
- Important : 16 à 32 px.
- Immersif : 32 à 120 px, uniquement pour le site web.

## 7. Tokens d’échelle

- Pression : 0.97 à 0.99.
- Survol : 1.01 à 1.03.
- Apparition : 0.96 à 1.
- Confirmation : 0.85 à 1.
- Immersif : 0.8 à 1.2.

## 8. Tokens de rotation

- Interface : 1 à 4 degrés.
- Carte bancaire : 4 à 10 degrés.
- Objet 3D : 10 à 360 degrés.

## 9. Animation de pression

Éléments concernés : bouton, carte, option, onglet, icône et ligne interactive.

Comportement : réduction légère, baisse légère de luminosité, retour haptique facultatif et relâchement rapide.

## 10. Animation de survol

Web uniquement. Effets possibles : élévation, lumière, bordure, déplacement léger, changement de fond et apparition d’une action.

Le survol ne doit jamais être obligatoire pour découvrir une fonction.

## 11. Animation de focus

Le focus doit être visible, stable, contrasté et non dépendant de la couleur seule.

## 12. Animation de sélection

Lorsqu’un élément est sélectionné, son fond change, une coche peut apparaître, la bordure se renforce et un retour haptique peut être utilisé.

## 13. Animation de désactivation

Un élément désactivé doit perdre en contraste, arrêter ses animations, ne plus répondre au clic et expliquer pourquoi si nécessaire.

## 14. Bouton principal

- Pressé : `scale 0.98`, durée 100 ms.
- Chargement : largeur conservée, progression visible, clics bloqués, aucun saut de mise en page.
- Succès : coche, changement de couleur, pulsation légère et retour à l’état normal.
- Erreur : changement d’état, vibration courte et message clair.

## 15. Bouton secondaire

Fond léger, bordure renforcée, translation verticale de 1 à 2 px et aucune animation spectaculaire.

## 16. Bouton critique

Animation minimale, sans rebond ni effet ludique. Confirmation obligatoire.

## 17. Bouton icône

Animation possible : rotation courte, changement de forme, halo, apparition d’un badge et retour haptique.

## 18. Barre de navigation mobile

Lors d’un changement d’onglet : icône active, libellé renforcé, indicateur animé, transition du contenu et retour haptique léger.

Durée : 180 à 280 ms.

## 19. Onglets

Transitions possibles : glissement, fondu, indicateur mobile et apparition du contenu.

## 20. Barre latérale

Animations : repli, dépli, ouverture des groupes, déplacement du contenu, apparition des libellés et changement d’icône.

Durée : 220 à 320 ms.

## 21. Menu déroulant

Entrée par fondu, déplacement vertical léger et échelle légère. Sortie plus rapide que l’entrée.

## 22. Tooltip

Entrée : 120 à 180 ms. Sortie : 80 à 120 ms.

## 23. Popover

Apparition depuis l’élément déclencheur, translation légère, fondu et échelle de 0.98 à 1.

## 24. Modale

Entrée : fond assombri, échelle légère, déplacement vertical et focus automatique. Sortie plus rapide avec restitution du focus.

## 25. Bottom sheet

Glissement depuis le bas, ralentissement naturel, arrière-plan atténué et geste de fermeture suivant le doigt.

## 26. Panneau latéral

Glissement horizontal, fond atténué facultatif, contenu principal conservé et focus déplacé.

## 27. Accordéon

Hauteur progressive, rotation de l’icône, apparition du contenu et conservation de la position de lecture.

## 28. Toast

Entrée par glissement, fondu et élévation. Sortie par fondu et glissement court.

## 29. Bannière

Déplacement vertical contrôlé sans superposition sur les actions critiques.

## 30. Carte standard

Élévation, bordure lumineuse, déplacement léger, apparition des actions et réduction au clic.

## 31. Carte financière

Mise à jour du montant, graphique progressif, changement de tendance et apparition de la comparaison.

## 32. Carte bancaire interactive

Effets autorisés : inclinaison, reflet, profondeur, retournement, zoom, gel, dégel, sélection et ajout au Wallet.

Le numéro doit rester masqué et l’animation doit s’arrêter en réduction des mouvements.

## 33. Reflet de carte bancaire

Le reflet suit légèrement le curseur ou le mouvement sans masquer les informations.

## 34. Retournement de carte

Durée : 420 à 650 ms. Les données sensibles doivent rester protégées.

## 35. Gel de carte

Séquence : pression, refroidissement visuel, disparition du halo actif, statut bloqué, retour haptique et confirmation textuelle.

## 36. Dégel de carte

Séquence : authentification, restauration des couleurs, halo actif, coche et confirmation.

## 37. Ajout au Wallet

Séquence : carte sélectionnée, élévation, déplacement vers le Wallet, validation, coche et retour haptique.

## 38. Animation de solde

Compteur progressif facultatif, transition verticale, couleur temporaire et valeur réelle affichée rapidement.

## 39. Masquage du solde

Flou, disparition progressive, remplacement par symboles et changement d’icône.

## 40. Animation de transaction

Insertion dans la liste, déplacement vertical, changement de statut, mise à jour du montant et apparition du reçu.

## 41. Paiement réussi

Séquence officielle : bouton pressé, vérification, onde lumineuse, coche animée, retour haptique, message de confirmation, reçu, mise à jour du solde et notification éventuelle.

## 42. Paiement échoué

Arrêt du traitement, état erreur, vibration courte, message clair, cause, action proposée et assurance sur le débit lorsque applicable.

## 43. Paiement en attente

Indicateur calme, statut clair, absence de faux succès, minuterie si pertinente et action de suivi.

## 44. Paiement remboursé

Statut mis à jour, montant retourné, référence, notification et mise à jour du solde.

## 45. Transfert réussi

Montant se déplaçant symboliquement, avatar du bénéficiaire, coche, solde mis à jour et reçu.

## 46. Transfert échoué

Retour visuel du montant, statut erreur, explication, nouvelle tentative et support.

## 47. Paiement partagé

Apparition des participants, répartition des montants, progression des paiements, statut individuel et clôture collective.

## 48. QR Code de paiement

Apparition progressive, cadre, minuterie, halo, statut et confirmation de scan. Le QR Code ne doit jamais être déformé.

## 49. Scanner QR

États : recherche, code détecté, lecture, validation, erreur et code expiré.

## 50. NFC prêt

Halo, onde lente, icône NFC, instruction et vibration facultative.

## 51. NFC carte détectée

Pulsation, vibration, changement d’icône et état lecture.

## 52. NFC lecture

Onde, progression, message, son facultatif et maintien de la carte demandé.

## 53. NFC succès

Coche, lumière verte, vibration succès, son court et reçu.

## 54. NFC erreur

État rouge discret, vibration erreur, message, nouvelle tentative et solution alternative.

## 55. Mobile Money

États animés : opérateur sélectionné, demande envoyée, confirmation attendue, paiement validé, expiration, erreur et annulation.

## 56. Dépôt

Montant ajouté, progression, confirmation, mise à jour du solde et reçu.

## 57. Retrait

Authentification, code, attente, disponibilité, confirmation et reçu.

## 58. KYC

Progression, document, selfie, adresse, analyse et résultat. Le niveau d’avancement doit rester visible.

## 59. Capture de document

Cadre, détection des bords, lumière, netteté, validation et reprise.

## 60. Vérification faciale

Contour, alignement, instruction, progression, validation et erreur.

## 61. OTP

Passage automatique au champ suivant, validation, erreur, expiration et renvoi.

## 62. PIN

Remplissage des points, erreur discrète, vibration, biométrie alternative et verrouillage temporaire.

## 63. Biométrie

États : attente, lecture, validation, échec et alternative PIN.

## 64. Graphique en courbe

Dessin progressif, remplissage, apparition des points, tooltip et changement de période.

## 65. Graphique en barres

Montée des barres, apparition des valeurs, tri, comparaison et changement de filtre.

## 66. Graphique en anneau

Progression circulaire, apparition de la légende, sélection d’une catégorie et mise à jour.

## 67. Jauge

Progression, changement de niveau, alerte et objectif atteint.

## 68. KPI

Compteur, variation, flèche, comparaison et mise à jour.

## 69. Tableau administratif

Animations discrètes : tri, filtre, ligne sélectionnée, mise à jour, suppression et apparition de détails.

## 70. Ligne de tableau

États : survol, sélection, expansion, chargement, succès et erreur.

## 71. Filtres

Ouverture, sélection, suppression, réinitialisation et compteur de résultats.

## 72. Recherche

Focus, suggestions, chargement, résultat, aucun résultat et effacement.

## 73. Pagination

Changement de page, maintien de la position, skeleton et apparition des résultats.

## 74. Défilement infini

Indicateur de chargement, conservation de la position, fin de liste claire et reprise après erreur.

## 75. Skeleton loader

Forme proche du contenu réel, animation légère, arrêt immédiat au chargement et respect de la réduction des mouvements.

## 76. Spinner

Réservé aux attentes courtes et traitements locaux.

## 77. Barre de progression

Types : réelle, indéterminée, par étapes et circulaire.

## 78. État vide

Illustration légère, apparition du texte et bouton, sans mouvement permanent inutile.

## 79. État d’erreur

Apparition immédiate, légère vibration, mise en évidence et action de reprise.

## 80. État hors ligne

Indicateur réseau, passage en mode local, synchronisation, retour en ligne et reprise.

## 81. Synchronisation

États : en attente, en cours, terminée, partielle et erreur.

## 82. TPE — montant

Saisie, suppression, montant rapide, validation et plafond dépassé.

## 83. TPE — choix du paiement

Sélection, agrandissement léger, changement d’icône et passage à l’étape suivante.

## 84. TPE — carte insérée

Insertion, lecture, code PIN, traitement, retrait, succès et erreur.

## 85. TPE — impression

Impression en cours, papier, succès, absence de papier et réimpression.

## 86. TPE — clôture

Vérification, résumé, confirmation, traitement, rapport, impression et succès.

## 87. TPE — mode hors ligne

Changement d’état, badge visible, compteur d’opérations, synchronisation différée et avertissement de limite.

## 88. Notification

Apparition, badge, lecture, archivage, suppression et ouverture.

## 89. Badge de notification

Apparition, compteur, pulsation unique et disparition. Pas de pulsation permanente.

## 90. Centre de notifications

Ouverture, filtrage, lecture, regroupement et archivage.

## 91. Promotion

Apparition, progression, coupon activé, expiration et récompense.

## 92. Fidélité

Ajout de points, progression, passage de niveau, récompense débloquée et expiration.

## 93. Coffre

Ajout, retrait, progression vers l’objectif, verrouillage, déverrouillage et objectif atteint.

## 94. Budget

Consommation, seuil, alerte, dépassement et remise à zéro de période.

## 95. Abonnement détecté

Apparition, classification, prochaine échéance, annulation et économie estimée.

## 96. Facture

Création, aperçu, envoi, paiement, retard et annulation.

## 97. Stock

Ajout, retrait, seuil faible, rupture et synchronisation.

## 98. Livraison

Progression, position, changement de statut, arrivée et preuve.

## 99. Support

Ouverture du chat, message envoyé, agent en train d’écrire, ticket créé, résolution et clôture.

## 100. Message

États : envoi, envoyé, reçu, lu, erreur et nouvelle tentative.

## 101. Jini — repos

Halo lent, respiration légère, aucune distraction et arrêt hors écran.

## 102. Jini — écoute

Onde sonore, halo actif, bouton d’arrêt et indication de confidentialité.

## 103. Jini — réflexion

Mouvement non répétitif excessif, progression facultative, possibilité d’interrompre et durée liée au traitement réel.

## 104. Jini — réponse

Apparition progressive du texte, synchronisation voix, actions proposées, sources et retour haptique facultatif.

## 105. Jini — erreur

Halo réduit, message clair, nouvelle tentative et alternative manuelle.

## 106. Jini — action exécutée

Résumé, confirmation, traitement, résultat, journalisation et possibilité d’annuler si autorisée.

## 107. Onboarding

Progression, transitions, illustrations, permissions et première action.

## 108. Tutoriel guidé

Surbrillance, déplacement du focus, progression, suivant, précédent et fermeture.

## 109. Checklist de démarrage

Coche, progression, étape débloquée et objectif atteint.

## 110. Site web — Hero

Texte révélé, téléphone 3D, carte bancaire, lumière, particules, CTA et chiffres animés.

## 111. Site web — téléphone 3D

Rotation légère, suivi du curseur, changement d’écran, zoom, flottement et lumière.

## 112. Site web — carte bancaire 3D

Rotation, reflet, changement de face, déplacement, mise en avant et retour à la position initiale.

## 113. Site web — globe 3D

Rotation lente, pays actifs, points, trajectoires, zoom, sélection et statistiques. Fallback obligatoire en 2D.

## 114. Site web — particules

Faible densité, vitesse lente, arrêt hors écran, qualité adaptable, désactivation mobile si nécessaire et aucune obstruction du texte.

## 115. Site web — Aurora

Dégradés lents, mouvement diffus, faible contraste, réaction légère et réduction en mode économie.

## 116. Site web — Liquid Glass

Lumière, transparence, déplacement du reflet, profondeur, bordure et flou.

## 117. Site web — parallaxe

Niveaux : fond, contenu, objet, lumière et particules. Les déplacements doivent rester limités.

## 118. Site web — scroll reveal

Fondu, montée, déplacement horizontal, échelle, masque et dessin. Le contenu doit rester disponible sans JavaScript.

## 119. Site web — storytelling

Structure : introduction, problème, solution, produit, preuve, impact et appel à l’action.

## 120. Site web — statistiques

Compteur, barre, carte, carte géographique, comparaison et apparition progressive.

## 121. Site web — partenaires

Défilement lent, apparition, survol, détail et regroupement.

## 122. Site web — carrousel

Contrôle manuel, pause, navigation clavier, indicateurs, gestes tactiles et aucune vitesse excessive.

## 123. Site web — transition de page

Fondu, déplacement, masque, zoom léger et continuité d’objet. Durée maximale recommandée : 500 ms.

## 124. Portail administrateur

Animations autorisées : panneaux, filtres, tableaux, graphiques, alertes, statuts, modales et menus.

## 125. Portail État

Le mouvement doit privilégier la preuve, le statut, la traçabilité, la confirmation, le contrôle et la sécurité.

## 126. Annuaire

Carte commerce, recherche, filtre, localisation, favori, itinéraire et promotion.

## 127. Portail développeur

Copie de clé, test API, webhook, logs, changement d’environnement, erreurs et réussite.

## 128. Changement d’environnement

Démonstration, recette et production doivent avoir une transition visible, une bannière, une couleur, une confirmation et un rappel permanent.

## 129. Clé API

Génération, masquage, copie, rotation et révocation.

## 130. Webhook

Test, succès, erreur, tentative, répétition et latence.

## 131. Import

Téléversement, analyse, aperçu, erreurs, correction, validation et rapport.

## 132. Export

Préparation, génération, téléchargement, succès, erreur et expiration.

## 133. Téléversement

Glisser-déposer, progression, vérification, succès, erreur et remplacement.

## 134. Calendrier

Changement de mois, sélection, période, événement, détail et création.

## 135. Timeline

Apparition des étapes, progression, statut, expansion et détail.

## 136. Audit

Comparaison, changement, détail, filtre et export, sans effet décoratif inutile.

## 137. Fraude

Score, signaux, niveau, statut, décision et résolution.

## 138. Incident

Ouverture, changement de gravité, progression, résolution et historique.

## 139. Accessibilité

Chaque animation doit respecter la réduction des mouvements, rester compréhensible sans animation, éviter le clignotement, fonctionner au clavier, préserver le focus et ne jamais dépendre du son seul.

## 140. Réduction des mouvements

Supprimer les rotations, parallaxes, mouvements 3D et particules ; réduire les déplacements ; remplacer par des fondus ; conserver les confirmations et les changements d’état.

## 141. Mode économie d’énergie

Réduire les particules, flous, ombres animées et fréquences ; suspendre hors écran ; désactiver la 3D lourde.

## 142. Performance web

Privilégier `transform` et `opacity`, éviter les recalculs, suspendre hors écran, charger la 3D à la demande, compresser les modèles, limiter les filtres, utiliser des fallbacks et tester sur mobile.

## 143. Performance mobile

Utiliser le thread natif, éviter les calculs JavaScript continus, limiter les flous et animations simultanées, tester sur Android d’entrée de gamme, surveiller la batterie et optimiser les images.

## 144. Performance TPE

Priorités : stabilité, lisibilité, rapidité, confirmation, faible consommation et fonctionnement hors ligne.

## 145. Technologies web

- Framer Motion ;
- GSAP ;
- React Three Fiber ;
- Three.js ;
- Rive ;
- Lottie ;
- CSS animations ;
- Web Animations API.

## 146. Technologies React Native

- React Native Reanimated ;
- Moti ;
- Gesture Handler ;
- Lottie ;
- Rive ;
- Haptics natifs.

## 147. Technologies Android TPE

- Jetpack Compose ;
- MotionLayout ;
- animations Android natives ;
- haptique natif ;
- sons locaux ;
- transitions optimisées.

## 148. Tokens techniques

```json
{
  "motion": {
    "duration": {
      "instant": 80,
      "veryShort": 120,
      "short": 180,
      "standard": 280,
      "long": 420,
      "confirmation": 800
    },
    "easing": {
      "standard": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      "smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
      "exit": "cubic-bezier(0.4, 0, 1, 1)"
    },
    "scale": {
      "pressed": 0.98,
      "hover": 1.02,
      "enter": 0.96
    }
  }
}
```

## 149. Convention de nommage

Format recommandé :

```text
Mansa/Motion/Produit/Composant/Action/État
```

Exemple :

```text
Mansa/Motion/Mobile/Payment/Confirm/Success
```

## 150. Documentation obligatoire

Chaque animation doit préciser : nom, objectif, déclencheur, durée, easing, déplacement, échelle, rotation, opacité, haptique, son, plateforme, réduction des mouvements, fallback, performance et tests.

## 151. Tests obligatoires

Tester sur petit Android, grand Android, iPhone, tablette, TPE, navigateur mobile, ordinateur portable, grand écran, connexion faible, appareil faible, mode sombre, mode clair, réduction des mouvements et économie d’énergie.

## 152. Critères de validation

Une animation est validée si elle améliore la compréhension, reste fluide, ne bloque rien, fonctionne sans son ni vibration, respecte la réduction des mouvements, ne masque aucune erreur, respecte la sécurité, garde le texte lisible et ne retarde pas l’action réelle.

## 153. Gouvernance

Toute nouvelle animation doit répondre à un besoin, utiliser les tokens, éviter les doublons, être documentée, testée, accessible, validée, versionnée, prévoir un fallback et rejoindre la bibliothèque officielle.

## 154. Règle finale

Le mouvement Mansa doit donner l’impression que l’interface comprend l’utilisateur.

Le site web peut émerveiller.

Les applications doivent accompagner.

Le TPE doit confirmer.

L’administration doit informer.

Jini doit rassurer.

Chaque animation doit avoir une fonction claire et rester fidèle à l’identité Mansa.
