# Système d’animation et d’interaction Mansa

## 1. Objectif

Le système d’animation Mansa doit définir une expérience cohérente sur :

- le site web ;
- l’application client ;
- l’application commerçant ;
- l’application TPE ;
- l’application Admin Lite ;
- le portail administrateur ;
- l’annuaire ;
- les interfaces partenaires.

Les animations doivent renforcer :

- la compréhension ;
- la confiance ;
- la fluidité ;
- la sensation de qualité ;
- la perception de rapidité ;
- l’identité de marque.

Elles ne doivent jamais distraire, ralentir une opération ou masquer un état réel.

## 2. Principes généraux

Toute animation Mansa doit respecter les principes suivants :

- être utile ;
- être courte ;
- être naturelle ;
- être interrompable ;
- être cohérente avec l’action ;
- être adaptée à la plateforme ;
- rester fluide sur les appareils peu puissants ;
- respecter la réduction des mouvements ;
- ne jamais remplacer une confirmation claire ;
- ne jamais bloquer une opération critique.

## 3. Niveaux d’animation

### Niveau 1 — Essentiel

Utilisé partout.

Exemples :

- bouton pressé ;
- apparition d’un message ;
- changement d’état ;
- chargement ;
- validation ;
- erreur ;
- transition entre écrans.

### Niveau 2 — Premium

Utilisé dans les applications modernes Mansa.

Exemples :

- carte bancaire interactive ;
- graphique animé ;
- bottom sheet fluide ;
- transition partagée ;
- mouvement haptique ;
- QR Code animé ;
- paiement NFC.

### Niveau 3 — Immersif

Réservé surtout au site web.

Exemples :

- objets 3D ;
- téléphone interactif ;
- parallaxe ;
- animations au curseur ;
- particules ;
- scène cinématographique ;
- globe 3D ;
- défilement narratif.

Le niveau 3 ne doit jamais être obligatoire pour accéder à une information.

## 4. Durées officielles

### Retour immédiat

```text
80 à 120 ms
```

Utilisé pour :

- pression ;
- changement visuel instantané ;
- vibration ;
- focus.

### Animation courte

```text
140 à 220 ms
```

Utilisée pour :

- boutons ;
- icônes ;
- badges ;
- menus simples ;
- petites cartes.

### Animation standard

```text
220 à 320 ms
```

Utilisée pour :

- modales ;
- bottom sheets ;
- panneaux ;
- changement d’onglet ;
- navigation secondaire.

### Animation longue

```text
320 à 500 ms
```

Utilisée pour :

- transition entre écrans ;
- animations importantes ;
- cartes bancaires ;
- panneaux complexes.

### Animation de confirmation

```text
500 à 1 200 ms
```

Utilisée pour :

- paiement réussi ;
- transfert réussi ;
- vérification KYC ;
- ajout de carte ;
- activation d’un service.

## 5. Courbes d’animation

Les animations doivent utiliser des courbes naturelles.

### Entrée standard

```text
cubic-bezier(0.2, 0.8, 0.2, 1)
```

### Sortie rapide

```text
cubic-bezier(0.4, 0, 1, 1)
```

### Mouvement doux

```text
cubic-bezier(0.22, 1, 0.36, 1)
```

### Effet élastique léger

À utiliser uniquement pour :

- succès ;
- apparition d’un badge ;
- validation ;
- petit retour haptique.

L’effet élastique doit rester subtil.

## 6. Animation des boutons

### État pressé

Le bouton doit :

- réduire légèrement sa taille ;
- diminuer légèrement sa luminosité ;
- produire un retour haptique sur mobile ;
- conserver une zone tactile stable.

Exemple :

```text
scale: 0.97 à 0.99
```

### État chargement

Le bouton doit :

- conserver sa largeur ;
- afficher un indicateur ;
- désactiver les clics répétés ;
- conserver le texte important si possible ;
- ne pas déplacer la mise en page.

### État succès

Le bouton peut :

- afficher une coche ;
- changer de couleur ;
- produire une légère pulsation ;
- revenir ensuite à son état normal.

## 7. Transitions entre écrans

### Application mobile

Les transitions doivent :

- respecter la direction de navigation ;
- donner une sensation de continuité ;
- rester rapides ;
- préserver le contexte visuel ;
- éviter les effets trop spectaculaires.

Exemples :

- glissement horizontal ;
- apparition progressive ;
- transition partagée d’une carte ;
- ouverture depuis un élément sélectionné.

### Web

Les transitions peuvent être plus riches :

- fondu ;
- zoom léger ;
- déplacement vertical ;
- morphing ;
- sections animées au défilement ;
- changement de profondeur.

## 8. Transitions partagées

Une transition partagée doit être utilisée lorsqu’un élément existe avant et après la navigation.

Exemples :

- carte bancaire ;
- avatar ;
- produit ;
- reçu ;
- transaction ;
- commerce ;
- graphique.

L’élément semble se déplacer naturellement vers son nouvel emplacement.

## 9. Animation des cartes bancaires

Les cartes bancaires Mansa doivent pouvoir intégrer :

- inclinaison légère ;
- reflet dynamique ;
- profondeur ;
- retournement ;
- zoom ;
- gel et dégel ;
- ajout au Wallet ;
- état bloqué ;
- état expiré ;
- état virtuel ;
- état jetable.

### Règles

- ne jamais exposer des données sensibles pendant une animation ;
- ne pas rendre le numéro lisible par défaut ;
- désactiver les mouvements lourds si nécessaire ;
- limiter l’inclinaison ;
- éviter les rotations excessives.

### Inclinaison recommandée

```text
4 à 10 degrés
```

## 10. Animation de paiement réussi

Séquence recommandée :

1. Le bouton se contracte légèrement.
2. L’écran affiche la vérification.
3. Une onde lumineuse apparaît.
4. Une coche se dessine.
5. Un retour haptique confirme.
6. Le reçu apparaît.
7. Le solde se met à jour.
8. Une notification peut être générée.

La confirmation doit rester lisible même si l’animation est désactivée.

## 11. Animation de paiement échoué

L’échec ne doit jamais être dramatique.

Séquence recommandée :

1. L’état passe en erreur.
2. Une vibration courte peut être utilisée.
3. Le message explique la cause.
4. Une action utile est proposée.
5. Le montant ne doit pas sembler débité.

À éviter :

- secousse excessive ;
- rouge clignotant ;
- son agressif ;
- animation anxiogène.

## 12. Animation de transfert

Le transfert peut utiliser :

- mouvement du montant ;
- déplacement vers le bénéficiaire ;
- animation de l’avatar ;
- mise à jour du solde ;
- apparition du reçu ;
- vibration légère.

Le mouvement reste symbolique.

Il ne doit pas donner l’impression que l’argent est envoyé avant confirmation réelle.

## 13. Animation NFC

États recommandés :

### Prêt

- halo léger ;
- icône NFC active ;
- instruction claire.

### Carte détectée

- pulsation courte ;
- vibration ;
- changement d’état.

### Lecture

- onde animée ;
- indicateur de progression ;
- message court.

### Validation

- coche ;
- son léger si autorisé ;
- retour haptique.

### Erreur

- message clair ;
- suggestion de reprise ;
- nouvelle tentative.

## 14. Animation QR Code

Le QR Code peut intégrer :

- apparition progressive ;
- cadre de scan ;
- ligne de lecture ;
- indicateur d’expiration ;
- pulsation discrète ;
- confirmation de scan.

Le QR Code lui-même ne doit pas être déformé.

## 15. Animation des graphiques

Les graphiques doivent :

- se dessiner progressivement ;
- afficher les valeurs sans délai excessif ;
- rester lisibles sans animation ;
- permettre le survol sur le web ;
- permettre le toucher sur mobile ;
- éviter les mouvements permanents.

Durée recommandée :

```text
500 à 1 000 ms
```

## 16. Animation des soldes et montants

Les changements de montant peuvent être animés par :

- compteur progressif ;
- changement de couleur bref ;
- apparition du nouveau montant ;
- transition verticale.

Règles :

- ne pas masquer le montant réel ;
- conserver les séparateurs ;
- éviter les animations longues ;
- ne pas animer les montants à chaque rafraîchissement mineur.

## 17. Chargement

### Skeleton loaders

À privilégier pour :

- listes ;
- cartes ;
- profils ;
- tableaux ;
- graphiques.

### Spinner

À utiliser uniquement pour les attentes courtes.

### Progression réelle

Quand une progression réelle est connue, elle doit être affichée.

Exemples :

- téléchargement ;
- import ;
- vérification ;
- envoi ;
- installation ;
- mise à jour.

## 18. Animations permanentes

Les animations permanentes doivent être rares.

Elles peuvent être utilisées pour :

- fond marketing ;
- halo Jini ;
- particules du site ;
- indicateur actif ;
- état d’écoute.

Elles doivent :

- consommer peu de ressources ;
- être lentes ;
- pouvoir être réduites ;
- s’arrêter hors écran ;
- ne pas fatiguer visuellement.

## 19. Système 3D du site web

Le site web Mansa peut utiliser :

- téléphone 3D ;
- carte bancaire 3D ;
- globe ;
- objets flottants ;
- maquette de TPE ;
- interface de paiement ;
- particules ;
- scènes interactives.

### Règles

- chargement progressif ;
- compression des modèles ;
- qualité adaptable ;
- fallback 2D ;
- désactivation sur appareils faibles ;
- respect du mobile ;
- pas de blocage du contenu principal.

## 20. Mouvement au curseur

Les éléments peuvent réagir au curseur par :

- inclinaison ;
- lumière ;
- déplacement léger ;
- profondeur ;
- parallaxe ;
- suivi de halo.

Le mouvement doit rester subtil.

Valeurs recommandées :

```text
translation : 4 à 20 px
rotation : 2 à 8 degrés
```

## 21. Parallaxe

Le parallaxe peut être appliqué à :

- arrière-plans ;
- objets 3D ;
- textes marketing ;
- cartes ;
- éléments décoratifs.

Il doit être évité sur :

- formulaires ;
- tableaux ;
- zones de paiement ;
- textes longs ;
- interfaces administratives critiques.

## 22. Scroll animations

Les éléments peuvent apparaître au défilement par :

- fondu ;
- montée légère ;
- agrandissement ;
- révélation ;
- déplacement horizontal ;
- dessin progressif.

Une section ne doit pas rester invisible si JavaScript échoue.

## 23. Jini

L’assistant Jini doit avoir une identité animée propre.

Éléments possibles :

- halo violet et cyan ;
- pulsation ;
- particules ;
- anneaux ;
- onde sonore ;
- lumière réactive ;
- animation de réflexion.

États :

- repos ;
- écoute ;
- réflexion ;
- réponse ;
- erreur ;
- interruption ;
- confidentialité.

L’animation de réflexion ne doit jamais simuler un traitement plus long que le traitement réel.

## 24. Retour haptique

Le retour haptique doit être utilisé pour :

- pression ;
- validation ;
- erreur ;
- paiement ;
- NFC ;
- QR ;
- action critique ;
- sélection.

Types recommandés :

- léger ;
- moyen ;
- succès ;
- avertissement ;
- erreur.

Le retour haptique doit être configurable.

## 25. Sons

Les sons doivent rester facultatifs.

Ils peuvent être utilisés pour :

- paiement réussi ;
- erreur ;
- scan ;
- impression ;
- clôture TPE.

Ils doivent être :

- courts ;
- discrets ;
- désactivables ;
- adaptés aux environnements publics ;
- différents selon le type d’action.

## 26. TPE

L’application TPE doit utiliser des animations :

- rapides ;
- visibles ;
- compréhensibles ;
- résistantes aux faibles performances ;
- adaptées aux gros boutons.

À privilégier :

- confirmation claire ;
- progression ;
- changement de couleur ;
- icône animée ;
- vibration ;
- son configurable.

À éviter :

- parallaxe ;
- 3D lourde ;
- mouvements complexes ;
- transitions longues ;
- effets décoratifs excessifs.

## 27. Portail administrateur

Le portail administrateur doit utiliser des animations discrètes.

Exemples :

- ouverture d’un panneau ;
- filtre ;
- tri ;
- mise à jour d’un graphique ;
- notification ;
- changement de statut ;
- mise en évidence d’une anomalie.

La densité d’information reste prioritaire.

## 28. Réduction des mouvements

Le système doit respecter :

```text
prefers-reduced-motion
```

et les réglages équivalents mobiles.

Lorsque la réduction des mouvements est activée :

- supprimer les rotations ;
- supprimer les parallaxes ;
- supprimer les zooms importants ;
- réduire les déplacements ;
- conserver les changements d’état ;
- conserver les confirmations ;
- conserver les informations essentielles.

## 29. Performance

Objectifs :

### Web

- maintenir une animation fluide ;
- éviter les recalculs inutiles ;
- utiliser transform et opacity ;
- limiter les filtres lourds ;
- charger les modèles 3D à la demande ;
- suspendre les animations hors écran.

### Mobile

- utiliser les animations natives ;
- éviter les calculs JavaScript continus ;
- limiter les effets de flou ;
- tester sur téléphones d’entrée de gamme ;
- limiter la consommation de batterie.

## 30. Technologies recommandées

### Web

- Framer Motion ;
- GSAP ;
- React Three Fiber ;
- Three.js ;
- Rive ;
- Lottie ;
- CSS animations ;
- Web Animations API.

### React Native

- React Native Reanimated ;
- Moti ;
- Gesture Handler ;
- Lottie ;
- Rive ;
- Haptics natifs.

### Android TPE

- Jetpack Compose ;
- MotionLayout ;
- animations Android natives ;
- retour haptique natif ;
- sons locaux.

## 31. Tokens d’animation

Le système doit définir des tokens partagés.

Exemple :

```json
{
  "motion": {
    "duration": {
      "instant": 100,
      "short": 180,
      "standard": 280,
      "long": 420,
      "confirmation": 800
    },
    "easing": {
      "standard": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      "exit": "cubic-bezier(0.4, 0, 1, 1)",
      "smooth": "cubic-bezier(0.22, 1, 0.36, 1)"
    }
  }
}
```

## 32. Tests obligatoires

Chaque animation importante doit être testée sur :

- petit téléphone Android ;
- iPhone ;
- tablette ;
- TPE ;
- ordinateur portable ;
- navigateur mobile ;
- mode économie d’énergie ;
- mode réduction des mouvements ;
- connexion faible ;
- appareil peu puissant.

## 33. Critères de validation

Une animation est validée si :

- elle améliore la compréhension ;
- elle reste fluide ;
- elle ne bloque rien ;
- elle fonctionne sans son ;
- elle fonctionne sans vibration ;
- elle fonctionne en réduction des mouvements ;
- elle ne masque pas une erreur ;
- elle respecte la sécurité ;
- elle garde l’interface lisible.

## 34. Règle finale

Le mouvement Mansa doit donner l’impression que l’interface comprend l’utilisateur.

Le site web peut émerveiller.

Les applications doivent accompagner.

Le TPE doit confirmer.

L’administration doit informer.
