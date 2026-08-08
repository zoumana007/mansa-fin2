# Mansa État — Plateforme de péage et télépéage

## 1. Objectif

Ce cahier des charges définit le module Mansa destiné aux péages publics, concédés ou privés. Il complète le moteur transversal `Access & Mobility` sans le remplacer.

Le module doit permettre à l'État, à une agence routière ou à un concessionnaire de déployer progressivement plusieurs types de voies, plusieurs moyens de paiement et plusieurs niveaux d'équipement sans dépendre d'un fournisseur unique.

## 2. Principes de référence obligatoires

Deux solutions initiales doivent coexister :

1. **Péage automatique/classique avec barrière** ;
2. **Télépéage UHF RFID avec barrière**.

Une évolution ultérieure vers du **free-flow sans barrière** doit être prévue dans l'architecture, mais elle reste optionnelle et ne remplace pas les deux solutions initiales.

Le système doit être multi-fournisseurs, configurable par l'administration, auditable, résilient aux coupures réseau et compatible avec un déploiement progressif site par site et voie par voie.

## 3. Typologie des voies

Le système doit supporter au minimum trois niveaux d'équipement.

### 3.1 Voie automatique complète

Équipements possibles :

- borne tactile ou terminal de paiement ;
- lecteur EMV ;
- NFC ;
- QR ;
- lecteur UHF RFID ;
- caméra ANPR/LPR ;
- barrière ;
- boucles ou capteurs véhicule ;
- écran usager ;
- imprimante de reçu si nécessaire ;
- contrôleur de voie local ;
- réseau principal + secours selon configuration.

### 3.2 Voie semi-automatique

Elle permet l'intervention d'un agent tout en conservant une traçabilité numérique complète.

Elle peut gérer :

- billets FCFA ;
- pièces FCFA ;
- carte bancaire ;
- Mansa ;
- QR ;
- Mobile Money ;
- badge/télépéage ;
- saisie contrôlée de catégorie véhicule ;
- impression ou envoi de reçu.

Toute ouverture manuelle doit être justifiée, identifiée et auditée.

### 3.3 Poste numérisé à faible coût

Pour les sites où l'État ne souhaite pas investir immédiatement dans une voie totalement automatisée.

Équipement possible :

- terminal Android durci ou TPE ;
- petite imprimante ;
- lecteur QR/NFC ;
- caisse sécurisée pour espèces ;
- contrôleur de barrière simple ;
- connexion mobile ;
- mode local/hors ligne.

Ce niveau doit permettre de numériser les recettes et les passages avant une modernisation complète.

## 4. Péage classique avec barrière

Le péage classique peut accepter, selon les canaux activés :

- billets FCFA ;
- pièces FCFA ;
- carte bancaire EMV ;
- paiement sans contact NFC ;
- carte Mansa ;
- wallet Mansa ;
- QR ;
- Mobile Money.

Les moyens de paiement sont configurables par pays, réseau, poste, voie et période d'effet.

Le système ne doit jamais supposer qu'un moyen de paiement est disponible simplement parce que le logiciel le supporte : l'acquéreur, la banque, l'opérateur ou l'administration doivent l'avoir activé contractuellement et techniquement.

## 5. Paiement par carte bancaire

Le terminal carte doit accepter les réseaux réellement activés par l'acquéreur.

Exemples :

- Visa ;
- Mastercard ;
- autres réseaux domestiques ou internationaux si activés.

La documentation et l'interface ne doivent pas annoncer « toutes les cartes du monde ». La formulation correcte est : **réseaux de cartes activés par l'acquéreur et le contrat du poste**.

Le terminal doit prendre en charge lorsque disponible :

- puce EMV ;
- sans contact ;
- PIN ;
- annulation ;
- reversals ;
- gestion des timeouts ;
- journalisation ;
- réconciliation.

## 6. Mobile Money

Mobile Money est un canal activable/désactivable par l'administration.

La configuration doit pouvoir s'appliquer :

- au niveau national ;
- par réseau de péage ;
- par poste ;
- par voie ;
- par opérateur ;
- avec date d'effet et éventuellement date de fin.

Toute activation ou désactivation doit être auditée.

Le logiciel ne doit jamais supprimer automatiquement Mobile Money à cause d'une panne temporaire ou d'un changement de stratégie. Il doit simplement pouvoir le marquer temporairement indisponible ou désactivé par politique.

## 7. Espèces FCFA

Les voies compatibles espèces doivent gérer séparément :

- montant attendu ;
- montant reçu ;
- monnaie rendue ;
- identifiant agent ;
- session de caisse ;
- ouverture/fermeture de caisse ;
- fonds initial ;
- dépôts/retraits de caisse ;
- écarts ;
- annulations ;
- reçus ;
- rapprochement fin de poste.

Les espèces ne doivent jamais contourner la transaction numérique : chaque passage payant doit produire un événement financier et un événement de passage.

## 8. Télépéage UHF RFID avec barrière

Le télépéage initial repose sur :

- tag UHF RFID passif ;
- tag associé à un véhicule ;
- compte, abonnement ou wallet associé ;
- lecteur/antenne UHF ;
- contrôleur local ;
- logique d'autorisation ;
- relais `OPEN` ou interface industrielle ;
- barrière ;
- capteurs de passage ;
- éventuellement caméra ANPR pour vérifier la plaque.

Le tag ne contient pas à lui seul l'état de l'abonnement. La source de vérité est côté Mansa ou dans un cache local autorisé et signé.

## 9. Association RFID, véhicule et plaque

Chaque télépéage peut associer :

- identifiant RFID ;
- véhicule ;
- plaque ;
- catégorie ;
- propriétaire ;
- compte ;
- abonnement ;
- wallet ;
- statut ;
- voies autorisées ;
- plages horaires ;
- plafonds ;
- liste de blocage.

Le système doit pouvoir appliquer une double vérification RFID + ANPR pour limiter le prêt ou le transfert frauduleux d'un tag.

## 10. Catégories et tarification

Le moteur doit permettre à l'administration de créer des catégories de véhicules configurables, par exemple :

- moto ;
- véhicule léger ;
- utilitaire ;
- minibus ;
- autobus ;
- camion 2 essieux ;
- camion multi-essieux ;
- véhicule spécial ;
- véhicule exonéré.

Les tarifs doivent être versionnés avec :

- montant ;
- monnaie ;
- catégorie ;
- site ;
- sens éventuel ;
- date d'effet ;
- date de fin ;
- autorité ayant validé ;
- justification ou référence de décision.

Un changement de tarif ne doit pas écraser l'historique.

## 11. Détection de catégorie

La catégorie peut être déterminée par :

- capteurs ;
- caméra ;
- classification automatique ;
- plaque/véhicule connu ;
- saisie agent ;
- règles spécifiques.

En cas de saisie manuelle, l'identité de l'agent et la catégorie choisie doivent être auditées.

## 12. Anti-corruption et rapprochement physique

Le système doit rapprocher au minimum :

1. véhicule détecté ;
2. catégorie détectée ou déclarée ;
3. tarif attendu ;
4. paiement ou exonération ;
5. commande d'ouverture ;
6. ouverture réelle de barrière ;
7. passage physique confirmé par capteur.

Une anomalie doit être générée si, par exemple :

- la barrière s'ouvre sans paiement ni exonération ;
- un paiement existe sans passage ;
- un passage existe sans transaction ;
- la catégorie appliquée est incohérente ;
- un agent ouvre manuellement sans justification ;
- les recettes de caisse diffèrent des transactions ;
- le nombre de véhicules physiques diffère fortement du nombre de transactions.

## 13. Ouvertures manuelles

Toute ouverture manuelle doit enregistrer :

- agent ;
- rôle ;
- date/heure ;
- voie ;
- motif ;
- véhicule/plaque si disponible ;
- photo ou événement ANPR si disponible ;
- approbation supérieure lorsque la politique l'exige.

Les motifs doivent être configurables : urgence, panne, véhicule officiel autorisé, incident technique, maintenance, évacuation, etc.

## 14. Exonérations

Le système doit permettre des exonérations contrôlées pour certains véhicules ou institutions.

Une exonération doit avoir :

- bénéficiaire ;
- véhicule/plaque ou groupe ;
- motif ;
- autorité d'approbation ;
- date de début ;
- date de fin ;
- sites concernés ;
- historique des passages.

Une exonération permanente sans trace d'approbation ne doit pas être possible.

## 15. Fonctionnement local et hors ligne

Chaque voie doit pouvoir continuer à fonctionner de manière sécurisée en cas de coupure réseau lorsque la politique le permet.

Le contrôleur local peut conserver :

- configuration de voie ;
- tarifs en vigueur ;
- tags autorisés en cache limité ;
- tags bloqués ;
- limites hors ligne ;
- clés ou éléments cryptographiques nécessaires ;
- journal local signé ;
- séquence d'événements.

Au retour du réseau :

- synchronisation automatique ;
- déduplication ;
- aucun double débit ;
- rapprochement des événements ;
- alerte sur divergences ;
- reprise idempotente.

## 16. Gestion des pannes

Une voie peut adopter notamment les états :

```text
ACTIVE
DEGRADED
SUSPENDED
MAINTENANCE
CLOSED
DISABLED
```

La panne d'un composant ne doit pas forcément arrêter toute la voie.

Exemples :

- ANPR indisponible mais RFID actif ;
- Mobile Money indisponible mais carte et espèces actives ;
- réseau cloud indisponible mais mode local actif ;
- imprimante indisponible mais reçu numérique disponible ;
- barrière en panne : fermeture de la voie si sécurité non garantie.

L'écran de la borne doit afficher un message clair et exact.

## 17. Écran et information usager

Le système doit pouvoir afficher :

- catégorie détectée ;
- montant dû ;
- moyens de paiement disponibles ;
- paiement accepté/refusé ;
- abonnement expiré ;
- RFID non reconnu ;
- service indisponible ;
- voie à utiliser en secours ;
- reçu ou référence de transaction.

Les messages doivent être configurables et localisables.

## 18. Reçus

Chaque transaction doit pouvoir produire un reçu contenant selon le cas :

- identifiant transaction ;
- poste ;
- voie ;
- date/heure ;
- catégorie ;
- tarif ;
- moyen de paiement ;
- montant ;
- statut ;
- référence de paiement ;
- identité visuelle de l'autorité ou concessionnaire.

Le reçu peut être imprimé, affiché par QR, envoyé dans l'app Mansa ou transmis par canal autorisé.

## 19. Marque blanche

Les équipements et interfaces doivent pouvoir être personnalisés pour l'État ou le concessionnaire :

- bornes ;
- écrans ;
- tickets/reçus ;
- tags RFID ;
- signalétique ;
- portail d'administration ;
- couleurs ;
- logos ;
- textes réglementaires.

La mention `Propulsé par Mansa` doit rester facultative et configurable.

## 20. Multi-fournisseurs

Le matériel doit être piloté derrière des adaptateurs.

Interfaces recommandées :

```text
TollTerminalProvider
PaymentTerminalProvider
CashDeviceProvider
RFIDReaderProvider
ANPRProvider
BarrierProvider
LaneControllerProvider
VehicleSensorProvider
ReceiptPrinterProvider
```

Les équipements peuvent communiquer via :

- API locale ;
- TCP/IP ;
- RS485 ;
- Wiegand ;
- SDK ;
- webhook ;
- contact sec ;
- relais ;
- protocole industriel documenté.

Aucun fournisseur ne doit être codé comme dépendance unique du domaine.

## 21. Contrôleur de voie

Le contrôleur local est responsable de l'orchestration temps réel :

- lecture capteur d'approche ;
- lecture RFID ;
- récupération ANPR ;
- calcul/chargement tarif ;
- autorisation de paiement ou abonnement ;
- décision `ALLOW` / `DENY` ;
- commande de barrière ;
- confirmation de passage ;
- journalisation ;
- mode hors ligne.

Les délais de décision doivent être suffisamment courts pour ne pas créer de files inutiles.

## 22. Abonnements télépéage

Les abonnements peuvent être :

- mensuels ;
- annuels ;
- nombre de passages ;
- flotte ;
- catégorie ;
- site ;
- réseau ;
- prépayés ;
- postpayés si autorisés.

Statuts recommandés :

```text
ACTIVE
SUSPENDED
EXPIRED
CANCELLED
TERMINATED
```

Les règles de remboursement sont configurables par produit et par autorité. Le système doit notamment supporter `NON_REFUNDABLE` lorsque le cadre contractuel ou réglementaire le prévoit.

## 23. Déploiement progressif

L'État ou le concessionnaire ne doit pas être obligé d'équiper tous les péages immédiatement.

Le déploiement doit pouvoir se faire par phases :

1. numérisation des postes existants ;
2. ajout de paiements numériques ;
3. automatisation de certaines voies ;
4. télépéage RFID sur certaines voies ;
5. extension multi-sites ;
6. éventuellement free-flow à long terme.

Les anciennes et nouvelles voies doivent pouvoir coexister pendant la transition.

## 24. Modèles commerciaux

Deux modèles doivent être supportés.

### Modèle A — Matériel acheté par l'État ou le concessionnaire

Mansa fournit le logiciel, l'intégration et éventuellement le support, tandis que le client achète directement les bornes, lecteurs, barrières, terminaux et autres équipements.

### Modèle B — Matériel fourni par Mansa

Mansa peut intégrer, fournir ou revendre le matériel dans le cadre d'un contrat commercial adapté.

Le logiciel ne doit pas dépendre d'un seul de ces modèles.

## 25. Administration

Le portail État/concessionnaire doit permettre de gérer :

- réseaux ;
- postes ;
- voies ;
- équipements ;
- moyens de paiement ;
- opérateurs Mobile Money ;
- acquéreurs carte ;
- catégories ;
- tarifs ;
- exonérations ;
- abonnements ;
- tags ;
- incidents ;
- caisses ;
- agents ;
- rôles ;
- rapports ;
- audits.

Toute modification sensible doit avoir auteur, date d'effet, ancienne valeur et nouvelle valeur.

## 26. RBAC et séparation des responsabilités

Rôles possibles :

- super administrateur ;
- administrateur national ;
- administrateur réseau ;
- responsable de poste ;
- superviseur ;
- agent de voie ;
- caissier ;
- maintenance ;
- audit/inspection ;
- lecture seule.

Les permissions doivent être granulaires. Un agent de voie ne doit pas pouvoir modifier les tarifs nationaux ou supprimer des journaux.

## 27. Journal d'audit

Doivent notamment être audités :

- changement tarifaire ;
- activation/désactivation d'un moyen de paiement ;
- changement Mobile Money ;
- création d'exonération ;
- ouverture manuelle ;
- annulation de transaction ;
- modification de catégorie ;
- désactivation d'un équipement ;
- changement de politique offline ;
- modification d'un abonnement ;
- réaffectation d'un tag.

Les journaux d'audit ne doivent pas être modifiables par les opérateurs ordinaires.

## 28. Reporting

Le système doit fournir au minimum :

- trafic par heure/jour/mois ;
- trafic par poste et voie ;
- recettes par moyen de paiement ;
- recettes espèces ;
- écarts de caisse ;
- taux de télépéage ;
- taux d'échec de paiement ;
- ouvertures manuelles ;
- exonérations ;
- incidents ;
- disponibilité des équipements ;
- temps moyen de passage ;
- anomalies anti-fraude.

## 29. Réconciliation financière

La plateforme doit rapprocher :

- transactions Mansa ;
- paiements carte ;
- Mobile Money ;
- espèces ;
- abonnements ;
- passages ;
- règlements acquéreurs/opérateurs ;
- comptes de l'État ou du concessionnaire.

Toute différence doit produire un statut de rapprochement et une piste d'investigation.

## 30. Free-flow futur

L'architecture doit permettre plus tard une voie sans barrière utilisant par exemple :

- ANPR ;
- RFID ;
- classification automatique ;
- portiques ;
- comptes prépayés/postpayés ;
- recouvrement des impayés.

Cette capacité est une évolution optionnelle. Elle ne doit pas supprimer ni rendre obsolètes les voies classiques et RFID avec barrière.

## 31. Sécurité

Exigences :

- chiffrement des communications ;
- secrets hors dépôt Git ;
- rotation des secrets ;
- authentification forte des admins ;
- journalisation ;
- segmentation réseau des équipements ;
- signatures ou mécanismes d'intégrité pour données offline ;
- protection contre rejeu et double traitement ;
- surveillance des équipements.

## 32. Modèle de données minimal

Entités recommandées :

```text
TollNetwork
TollPlaza
TollLane
TollEquipment
TollVehicleClass
TollTariff
TollTransaction
TollPassage
TollPayment
TollCashSession
TollExemption
TollSubscription
TollRFIDTag
TollVehicle
TollIncident
TollManualOpening
TollReconciliation
TollAuditLog
```

Toutes les entités métier doivent être multi-tenant lorsque le contexte l'exige et rattachées explicitement à l'autorité ou au concessionnaire concerné.

## 33. Critères d'acceptation principaux

Le module est considéré correctement implémenté lorsque :

- péage classique et télépéage RFID peuvent coexister sur un même poste ;
- Mobile Money peut être activé/désactivé sans changement de code ;
- les réseaux carte sont configurés selon l'acquéreur ;
- une voie peut fonctionner temporairement hors ligne sans double débit ;
- toute ouverture manuelle est auditée ;
- chaque passage peut être rapproché d'une catégorie, d'un tarif et d'un statut financier ;
- les espèces sont rapprochées des sessions de caisse ;
- le matériel est abstrait derrière des adaptateurs ;
- les trois niveaux d'équipement peuvent coexister ;
- la marque blanche est configurable ;
- le déploiement peut être progressif ;
- le futur free-flow peut être ajouté sans réécrire le domaine de base.
