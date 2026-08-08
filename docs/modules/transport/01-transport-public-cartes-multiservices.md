# Cahier des charges — Transport public, cartes multiservices et validation sans contact

## 1. Objet

Ce document définit le module Mansa dédié au transport public, aux cartes multiservices et aux dispositifs de validation associés. Il complète les modules déjà existants concernant les cartes de paiement, les services publics, les écoles et universités, les entreprises, les agents, le portefeuille Mansa, les abonnements, la facturation et les paiements.

L’objectif est de permettre à Mansa de fournir une infrastructure cohérente pour :

- les réseaux de bus, cars, navettes et autres transports collectifs ;
- les autorités organisatrices de transport ;
- les opérateurs publics ou privés ;
- les établissements scolaires et universitaires ;
- les entreprises et employeurs ;
- les collectivités et administrations ;
- les campus, sites industriels et bâtiments ;
- les usagers particuliers ;
- les étudiants, salariés, agents et bénéficiaires de programmes publics.

Le module doit prendre en charge des cartes, badges ou identifiants numériques pouvant servir à plusieurs usages : transport, identification, contrôle d’accès, restauration, bibliothèque, avantages employeur, paiement ou preuve de droit.

## 2. Principes d’architecture

1. Le module ne dépend pas d’un fournisseur unique de cartes, puces, lecteurs, valideurs ou contrôleurs.
2. Les matériels sont intégrés derrière des adaptateurs documentés.
3. Une carte multiservice n’est pas obligatoirement une carte bancaire.
4. Les fonctions de paiement réglementé restent fournies par les partenaires financiers habilités lorsqu’elles sont nécessaires.
5. Les fonctions transport et accès utilisent des identifiants, jetons ou droits dédiés ; elles ne doivent pas exposer de données bancaires sensibles.
6. Les environnements Démo, Recette et Production restent strictement séparés.
7. Les actions sensibles sont auditables et les droits d’administration suivent le RBAC Mansa.
8. Le mode hors ligne doit être prévu pour les valideurs et terminaux terrain lorsque la connectivité est intermittente.
9. Les systèmes locaux doivent empêcher les doubles validations ou doubles débits lors de la resynchronisation.
10. Les données personnelles doivent être minimisées selon l’usage.

## 3. Périmètre fonctionnel

Le module couvre :

- réseaux et opérateurs de transport ;
- lignes, zones, arrêts et véhicules ;
- produits tarifaires ;
- tickets unitaires ;
- carnets et forfaits ;
- abonnements ;
- tarifs sociaux, étudiants et salariés ;
- cartes et badges multiservices ;
- identifiants NFC/RFID ;
- QR de transport ;
- titres numériques dans l’application ;
- validateurs embarqués ;
- bornes fixes ;
- terminaux de contrôle ;
- droits d’accès ;
- règles de correspondance ;
- plafonds journaliers ou hebdomadaires ;
- validations en ligne et hors ligne ;
- lutte contre la fraude ;
- gestion des appareils ;
- reporting et rapprochement ;
- API avec opérateurs, écoles, entreprises et autorités publiques.

## 4. Hors périmètre

Le module ne remplace pas :

- un logiciel complet de planification d’exploitation de réseau ;
- un système ferroviaire de signalisation ;
- un système national d’identité ;
- un système bancaire central ;
- une solution de paie complète ;
- la réglementation tarifaire décidée par l’autorité compétente.

Mansa orchestre les droits, validations, paiements, preuves, intégrations et contrôles selon les règles fournies par les organisations habilitées.

## 5. Acteurs

- voyageur ;
- étudiant ;
- élève ;
- salarié ;
- agent public ;
- bénéficiaire d’un tarif social ;
- contrôleur ;
- conducteur ou agent de station ;
- opérateur de transport ;
- autorité organisatrice ;
- établissement scolaire ou universitaire ;
- entreprise ou employeur ;
- gestionnaire de site ;
- administrateur Mansa ;
- partenaire financier ;
- intégrateur matériel.

## 6. Modèle organisationnel

Concepts minimaux :

```text
TransportAuthority
TransportOperator
TransportNetwork
TransportLine
TransportZone
TransportStop
TransportVehicle
FareProduct
FareRule
Entitlement
TravelCredential
CredentialMedium
ValidatorDevice
InspectorDevice
ValidationEvent
TripEvent
AccessRight
AccessPoint
SubscriptionContract
SubsidyProgram
SettlementBatch
TransportAuditEvent
```

Une autorité peut superviser plusieurs opérateurs. Un opérateur peut gérer plusieurs lignes, zones, dépôts ou catégories de véhicules.

## 7. Types de titres

Le moteur doit supporter au minimum :

```text
SINGLE_RIDE
MULTI_RIDE
DAILY_PASS
WEEKLY_PASS
MONTHLY_PASS
ANNUAL_PASS
STUDENT_PASS
SCHOOL_PASS
EMPLOYEE_PASS
SOCIAL_PASS
EVENT_PASS
VISITOR_PASS
ZONE_PASS
DISTANCE_BASED
PAY_AS_YOU_GO
CAPPED_PAY_AS_YOU_GO
FREE_ENTITLEMENT
OTHER
```

Les catégories sont configurables et versionnées.

## 8. Produits tarifaires

Chaque `FareProduct` définit :

- réseau ou opérateur ;
- zone d’application ;
- catégorie d’usager ;
- durée ;
- prix ;
- devise ;
- nombre de voyages autorisés ;
- règles de correspondance ;
- plage horaire ;
- jours autorisés ;
- règles de validation ;
- règles de remboursement ;
- éligibilité ;
- éventuelle subvention ;
- date d’effet ;
- date de fin ;
- statut de publication.

Toute modification tarifaire crée une nouvelle version.

## 9. Tarifs étudiants et scolaires

Le module doit pouvoir proposer des produits spécifiques associés à un statut étudiant ou scolaire.

L’éligibilité peut provenir :

- du portail Écoles et Universités Mansa ;
- d’une API d’établissement ;
- d’un import administratif ;
- d’une validation manuelle avec justificatif ;
- d’un programme public.

Les données conservées doivent être limitées au strict nécessaire : établissement, statut, période de validité et identifiant de référence.

## 10. Tarifs salariés et entreprises

Une entreprise peut financer ou subventionner tout ou partie d’un abonnement transport.

Le portail Entreprises et Employeurs peut gérer :

- salariés éligibles ;
- budget transport ;
- taux de prise en charge ;
- plafonds ;
- période ;
- règles par site ;
- suspension lors du départ du salarié ;
- exports comptables ;
- rapprochement des montants financés.

Une entreprise ne peut pas consulter l’historique détaillé des déplacements d’un salarié sauf base légale et besoin explicitement autorisé. Les données destinées au remboursement ou à la comptabilité doivent être agrégées autant que possible.

## 11. Cartes multiservices

Une `TravelCredential` peut être portée sur plusieurs supports :

```text
PHYSICAL_CARD
NFC_CARD
RFID_BADGE
MOBILE_NFC
QR_DYNAMIC
QR_STATIC_LIMITED
APP_TOKEN
WEARABLE
OTHER
```

Le système doit permettre à une même personne de posséder plusieurs supports associés au même profil, avec des règles de priorité et de révocation.

## 12. Carte étudiant multiservice

Une carte étudiant peut combiner :

- identité universitaire ;
- transport ;
- restauration ;
- bibliothèque ;
- accès campus ;
- événements ;
- services universitaires ;
- paiement lorsque le produit financier autorisé est activé.

La carte ne doit pas contenir en clair :

- PAN bancaire ;
- CVV ;
- PIN ;
- secret d’authentification ;
- données biométriques ;
- données financières sensibles.

Les services sont représentés par des identifiants, droits, tokens ou références sécurisées.

## 13. Carte entreprise ou employé multiservice

Un badge employé peut combiner :

- identification ;
- accès bâtiment ;
- cantine ;
- navette d’entreprise ;
- abonnement transport subventionné ;
- avantages ;
- dépenses professionnelles si une carte financière séparée ou combinée est contractuellement autorisée.

Les fonctions d’accès et les fonctions financières doivent rester logiquement séparées même si elles utilisent un même support physique.

## 14. Support physique et personnalisation

Le système doit permettre de référencer :

- fournisseur de carte ;
- type de puce ;
- technologie sans contact ;
- identifiant technique ;
- design ;
- logo organisation ;
- photo si autorisée ;
- nom du porteur ;
- QR ;
- numéro de série ;
- date d’émission ;
- date d’expiration.

La personnalisation peut être marque blanche pour une université, une entreprise, une collectivité ou un réseau de transport.

Une mention `Propulsé par Mansa` peut être activée ou désactivée selon contrat.

## 15. Technologies NFC/RFID

Le module ne doit pas imposer une seule technologie.

Les adaptateurs peuvent prendre en charge selon le projet :

- ISO/IEC 14443 ;
- MIFARE ou technologies compatibles lorsque contractuellement et techniquement validées ;
- NFC mobile ;
- UHF RFID pour certains cas d’identification à distance ;
- QR lorsque le sans-contact n’est pas disponible.

Les clés cryptographiques ou secrets de carte ne sont jamais stockés dans le dépôt Git.

## 16. Cycle de vie du support

États minimaux :

```text
REQUESTED
ISSUED
ACTIVE
SUSPENDED
LOST
STOLEN
DAMAGED
REPLACEMENT_PENDING
REPLACED
EXPIRED
REVOKED
CLOSED
```

Toute transition est auditée.

## 17. Perte, vol et remplacement

Lorsqu’un support est déclaré perdu ou volé :

1. le support est immédiatement désactivé dans Mansa ;
2. la liste de révocation est transmise aux appareils connectés ;
3. le support ne peut plus créer de nouveaux droits ;
4. les droits transférables sont migrés vers un nouveau support selon les règles ;
5. les validations antérieures restent conservées ;
6. le remplacement est journalisé.

## 18. Validateurs de transport

Un `ValidatorDevice` peut être :

```text
ONBOARD_VALIDATOR
STATION_GATE
PLATFORM_VALIDATOR
PORTABLE_VALIDATOR
KIOSK
DRIVER_TERMINAL
OTHER
```

Chaque appareil possède :

- identifiant unique ;
- opérateur ;
- dépôt ou site ;
- véhicule ou station ;
- version logicielle ;
- configuration ;
- clés ou certificats gérés hors dépôt ;
- statut ;
- date de dernière synchronisation ;
- règles offline ;
- capacité matérielle.

## 19. Flux de validation

Flux cible :

1. détection du support ;
2. lecture de l’identifiant ou token ;
3. vérification locale minimale ;
4. chargement des droits disponibles ;
5. application de la règle tarifaire ;
6. contrôle anti-rejeu ;
7. création d’un `ValidationEvent` ;
8. affichage résultat accepté/refusé ;
9. signal visuel et sonore ;
10. synchronisation serveur immédiate ou différée.

## 20. Réponses du validateur

Le validateur doit produire des états explicites :

```text
ACCEPTED
ACCEPTED_OFFLINE
TRANSFER_ACCEPTED
PASS_ACTIVE
FREE_ENTITLEMENT
INSUFFICIENT_BALANCE
EXPIRED
NOT_YET_VALID
ALREADY_USED
BLOCKED_CREDENTIAL
INVALID_CREDENTIAL
WRONG_ZONE
WRONG_TIME
ONLINE_CHECK_REQUIRED
DEVICE_ERROR
```

Les messages affichés à l’usager restent compréhensibles et ne révèlent aucune information sensible.

## 21. Mode hors ligne

Le mode hors ligne est obligatoire pour les réseaux où la couverture peut être intermittente.

Le terminal conserve localement, de manière protégée :

- configuration tarifaire versionnée ;
- liste limitée de droits utilisables hors ligne ;
- liste de révocation ;
- compteur anti-rejeu ;
- événements de validation en attente ;
- limites offline.

Le terminal ne doit jamais inventer un rechargement, un abonnement ou un paiement non confirmé.

## 22. Prévention du double débit

Chaque validation financière ou consommation de droit doit disposer d’un identifiant idempotent.

La resynchronisation serveur doit :

- reconnaître les événements déjà traités ;
- conserver l’ordre logique ;
- détecter les doublons ;
- résoudre les conflits selon une règle déterministe ;
- ne jamais débiter deux fois un même événement.

## 23. Paiement à l’usage

Pour `PAY_AS_YOU_GO`, le système peut débiter :

- wallet Mansa ;
- compte prépayé transport ;
- Mobile Money selon configuration ;
- carte bancaire via partenaire lorsque le réseau de transport l’autorise ;
- compte employeur ;
- subvention publique ;
- combinaison de plusieurs sources autorisées.

Le moyen réellement utilisé doit être traçable.

## 24. Plafonnement tarifaire

Le système peut appliquer des plafonds :

- journalier ;
- hebdomadaire ;
- mensuel ;
- par zone ;
- par réseau ;
- par catégorie d’usager.

Lorsque le plafond est atteint, les validations suivantes éligibles peuvent être gratuites sans générer de nouveau débit.

## 25. Correspondances

Le moteur tarifaire doit pouvoir reconnaître une correspondance lorsque :

- elle intervient dans une fenêtre de temps autorisée ;
- le trajet suivant appartient aux lignes ou zones admissibles ;
- le titre utilisé permet les correspondances ;
- les règles anti-fraude sont respectées.

## 26. Contrôle à bord ou en station

Un contrôleur utilise un `InspectorDevice` permettant :

- lecture du support ;
- vérification de la dernière validation ;
- consultation du droit actif ;
- vérification hors ligne ;
- création d’un contrôle ;
- création d’un signalement ;
- génération d’une obligation ou amende via le module Secteur public si l’organisme est habilité.

Le contrôleur ne doit jamais pouvoir modifier les règles tarifaires depuis son terminal terrain.

## 27. Lien avec le module Amendes

Lorsqu’une absence de titre valide donne lieu à une contravention :

1. le contrôleur crée un événement de contrôle ;
2. le type d’infraction est choisi dans un catalogue approuvé ;
3. le module Secteur public calcule le montant réglementaire ;
4. une référence unique est générée ;
5. le paiement immédiat ou différé suit les règles du module public ;
6. l’opération est auditée.

## 28. Bornes et kiosques

Les bornes de transport peuvent permettre :

- achat de titre ;
- rechargement ;
- consultation solde ou droits ;
- renouvellement d’abonnement ;
- impression ou affichage QR ;
- remplacement temporaire ;
- paiement via moyens activés.

Les moyens de paiement dépendent du matériel et de l’acquéreur.

## 29. Multi-fournisseurs matériel

Les équipements doivent être intégrés via des interfaces abstraites :

```text
CredentialReaderAdapter
ValidatorAdapter
GateControllerAdapter
PrinterAdapter
PaymentTerminalAdapter
DeviceTelemetryAdapter
```

Chaque adaptateur documente :

- protocole ;
- version ;
- commandes ;
- événements ;
- erreurs ;
- timeouts ;
- stratégie de reconnexion ;
- sécurité ;
- mode test.

## 30. Barrières et portiques

Dans une station équipée de portiques :

1. le support est validé ;
2. le moteur local décide selon les règles disponibles ;
3. l’adaptateur envoie la commande d’ouverture ;
4. un capteur confirme le passage ;
5. l’événement est enregistré ;
6. toute ouverture manuelle est auditée.

La commande d’ouverture doit utiliser une interface industrielle documentée ou un relais/contact sec lorsque le matériel le prévoit.

## 31. Contrôle d’accès hors transport

La même infrastructure de credential peut être utilisée pour :

- campus ;
- bibliothèques ;
- résidences ;
- bureaux ;
- parkings ;
- zones industrielles ;
- événements.

Les permissions sont représentées par des `AccessRight` séparés des droits transport.

## 32. Principe de séparation des usages

Un support peut être commun, mais chaque domaine possède son propre espace logique :

```text
IDENTITY
TRANSPORT
ACCESS
CAMPUS_SERVICES
EMPLOYEE_SERVICES
PAYMENT_REFERENCE
LOYALTY
OTHER
```

La révocation d’un usage ne doit pas nécessairement désactiver tous les autres.

## 33. Abonnements

Les abonnements transport réutilisent le moteur d’abonnements Mansa.

Paramètres :

- produit ;
- période ;
- renouvellement automatique ou manuel ;
- source de paiement ;
- bénéficiaire ;
- subvention ;
- date de début ;
- date de fin ;
- période de grâce ;
- règles d’échec de paiement.

## 34. Subventions publiques

Une autorité peut créer un programme de subvention pour :

- étudiants ;
- élèves ;
- personnes âgées ;
- personnes en situation de handicap ;
- demandeurs d’emploi ;
- agents publics ;
- autres catégories réglementaires.

Mansa applique la décision fournie ou validée par l’organisme ; Mansa ne décide pas seule de l’éligibilité réglementaire.

## 35. Financement employeur

Un abonnement peut être réparti entre :

- salarié ;
- employeur ;
- État ;
- collectivité ;
- programme social.

Le ledger conserve des écritures séparées afin de rendre le rapprochement auditable.

## 36. Application Client

L’application Client peut afficher :

- carte transport numérique ;
- abonnements actifs ;
- nombre de voyages restants ;
- zones couvertes ;
- historique de validations ;
- recharge ;
- renouvellement ;
- déclaration perte/vol ;
- QR temporaire ;
- avantages associés.

## 37. Application ou portail opérateur

Un opérateur peut gérer :

- lignes ;
- zones ;
- véhicules ;
- valideurs ;
- produits tarifaires ;
- incidents ;
- contrôleurs ;
- ventes ;
- validations ;
- fraude ;
- remboursements ;
- reporting ;
- rapprochement.

## 38. Portail Écoles et Universités

Un établissement peut :

- confirmer le statut étudiant ;
- affecter un produit ;
- subventionner un abonnement ;
- émettre ou suspendre une carte ;
- activer les services campus ;
- administrer les périodes de validité.

Les données académiques non nécessaires ne sont pas exposées au transporteur.

## 39. Portail Entreprises et Employeurs

Une entreprise peut :

- affecter des badges ;
- gérer les navettes ;
- financer des titres ;
- définir les bénéficiaires ;
- gérer les accès ;
- suspendre un badge lors d’un départ ;
- récupérer des justificatifs comptables agrégés.

## 40. Administration publique

Une administration peut :

- créer les catégories tarifaires ;
- définir les opérateurs ;
- créer les programmes sociaux ;
- activer des moyens de paiement ;
- définir les règles de contrôle ;
- suivre les indicateurs ;
- auditer les changements.

## 41. Encaissement et règlement

Le module distingue :

- vente ;
- validation ;
- consommation d’un droit ;
- débit ;
- remboursement ;
- subvention ;
- règlement opérateur.

Une validation n’entraîne pas forcément un débit : un abonnement prépayé ou un droit gratuit peut produire une validation sans mouvement financier.

## 42. Rapprochement

Le rapprochement doit pouvoir comparer :

- titres vendus ;
- montants encaissés ;
- droits créés ;
- validations ;
- remboursements ;
- subventions ;
- montants dus à chaque opérateur ;
- frais Mansa ;
- frais partenaires.

## 43. Fraude et anomalies

Le moteur de risque peut détecter :

- validations impossibles à quelques secondes d’intervalle dans des lieux incompatibles ;
- copie de credential ;
- appareil anormal ;
- trop grand nombre de refus ;
- usage d’un titre expiré ;
- réutilisation de QR ;
- ouverture manuelle répétée d’un portique ;
- validation hors ligne excessive ;
- divergence ventes/validations.

## 44. QR dynamique

Un QR numérique de transport doit de préférence être dynamique, signé et limité dans le temps.

Il peut contenir :

- version ;
- identifiant opaque ;
- période de validité ;
- nonce ;
- signature ou MAC ;
- informations minimales nécessaires au contrôle.

Il ne contient jamais de données bancaires sensibles en clair.

## 45. QR temporaire de secours

Lors d’un remplacement de carte, un QR temporaire peut être délivré si la politique du réseau l’autorise.

Il possède :

- durée limitée ;
- nombre d’utilisations limité ;
- liaison au titulaire ;
- mécanisme anti-rejeu ;
- révocation possible.

## 46. Confidentialité

Le système doit appliquer :

- minimisation des données ;
- limitation de conservation ;
- séparation des rôles ;
- chiffrement en transit ;
- chiffrement des données sensibles au repos ;
- journalisation des accès administratifs ;
- politiques différentes pour données de mobilité et données financières.

## 47. Historique de mobilité

L’historique de validation peut révéler des habitudes de déplacement. Il doit donc être traité comme une donnée sensible du point de vue de la confidentialité opérationnelle.

Les exports doivent appliquer :

- pseudonymisation lorsque possible ;
- agrégation pour les analyses ;
- limitation d’accès ;
- durée de conservation configurable ;
- traçabilité des consultations.

## 48. Sécurité des appareils

Chaque validateur doit disposer :

- identité appareil ;
- certificat ou secret provisionné hors dépôt ;
- rotation des secrets ;
- blocage à distance ;
- mise à jour signée ;
- configuration versionnée ;
- télémétrie ;
- détection de compromission lorsque possible.

## 49. Gestion des mises à jour

Les déploiements utilisent le module de gestion du parc d’appareils Mansa.

Une mise à jour peut être :

- pilote ;
- progressive ;
- par dépôt ;
- par ligne ;
- par modèle d’appareil ;
- générale.

Un rollback doit être prévu pour les versions critiques.

## 50. Observabilité

Indicateurs techniques :

- appareils en ligne ;
- appareils hors ligne ;
- taux d’erreur ;
- latence de validation ;
- file d’événements non synchronisés ;
- version logicielle ;
- état des lecteurs ;
- état des portiques ;
- taux de refus.

## 51. Analytics métier

Indicateurs possibles :

- validations par ligne ;
- validations par heure ;
- titres vendus ;
- abonnements actifs ;
- revenus ;
- subventions ;
- taux de fraude ;
- incidents ;
- disponibilité des appareils ;
- usage par catégorie tarifaire.

Les analyses individuelles ne doivent pas être exposées à des acteurs non habilités.

## 52. API

Exemples d’API :

```text
POST /transport/credentials
GET /transport/credentials/{id}
POST /transport/credentials/{id}/suspend
POST /transport/credentials/{id}/replace
POST /transport/entitlements
POST /transport/validations
POST /transport/validations/batch
GET /transport/fare-products
POST /transport/subscriptions
POST /transport/inspections
GET /transport/devices/{id}
POST /transport/devices/{id}/sync
```

Les API financières réutilisent les services Mansa existants plutôt que de dupliquer la logique de paiement.

## 53. Webhooks

Événements possibles :

```text
transport.credential.issued
transport.credential.suspended
transport.credential.replaced
transport.entitlement.created
transport.entitlement.expired
transport.validation.accepted
transport.validation.rejected
transport.device.offline
transport.device.sync_completed
transport.subscription.renewed
transport.subscription.payment_failed
transport.inspection.created
```

Les webhooks suivent les règles de signature, idempotence et reprise déjà définies dans la plateforme Mansa.

## 54. États de validation

Une `ValidationEvent` contient au minimum :

- identifiant unique ;
- credential ;
- droit utilisé ;
- appareil ;
- opérateur ;
- ligne ;
- véhicule ou station ;
- date/heure appareil ;
- date/heure serveur ;
- résultat ;
- mode online/offline ;
- version tarifaire ;
- montant éventuel ;
- identifiant de transaction éventuel ;
- indicateurs de risque.

## 55. Tests obligatoires

Tests unitaires :

- éligibilité ;
- règles tarifaires ;
- correspondances ;
- plafonnement ;
- cycle de vie credential ;
- anti-rejeu ;
- idempotence.

Tests d’intégration :

- valideur ;
- mode offline ;
- resynchronisation ;
- paiement ;
- remboursement ;
- subvention ;
- remplacement carte ;
- contrôle ;
- portique.

Tests de charge :

- heure de pointe ;
- grand nombre de validations simultanées ;
- synchronisation massive après coupure réseau.

## 56. Critères d’acceptation

Le module est considéré correctement spécifié lorsque :

1. un opérateur peut publier des produits tarifaires versionnés ;
2. un étudiant peut recevoir un droit transport lié à son statut sans duplication de dossier ;
3. une entreprise peut financer un abonnement salarié ;
4. une carte multiservice peut porter plusieurs usages sans mélanger leurs données ;
5. un validateur peut fonctionner hors ligne selon des limites explicites ;
6. la resynchronisation ne crée pas de double débit ;
7. un support perdu peut être révoqué et remplacé ;
8. un contrôleur peut vérifier un droit et déclencher une procédure réglementaire sans modifier le tarif ;
9. les matériels restent multi-fournisseurs ;
10. les données de mobilité sont protégées et minimisées ;
11. les flux financiers sont rapprochables ;
12. les changements administratifs sont audités.

## 57. Déploiement progressif

Le module doit pouvoir être déployé par étapes :

### Phase 1 — Carte et titres numériques

- création produits ;
- abonnements ;
- QR ;
- wallet transport ;
- contrôle simple.

### Phase 2 — Validateurs et cartes NFC/RFID

- cartes physiques ;
- valideurs embarqués ;
- mode hors ligne ;
- appareils de contrôle.

### Phase 3 — Multiservice

- campus ;
- entreprise ;
- accès bâtiment ;
- cantine ;
- avantages.

### Phase 4 — Interopérabilité réseau

- plusieurs opérateurs ;
- clearing ;
- correspondances inter-réseaux ;
- plafonnement global.

## 58. Références aux autres modules Mansa

Ce module réutilise sans les dupliquer :

- Cartes physiques et virtuelles ;
- Wallets et ledger ;
- Paiements et Mobile Money ;
- Abonnements ;
- Secteur public et services de l’État ;
- Écoles et Universités ;
- Entreprises et Employeurs ;
- Identité et consentements ;
- KYC/KYB ;
- Risk Engine ;
- Notifications ;
- Analytics ;
- Parc d’appareils ;
- API et webhooks ;
- Support et litiges.

## 59. Décisions de conception à préserver

- La carte multiservice ne doit pas être confondue avec une carte bancaire classique.
- Le même support peut porter plusieurs usages, mais les droits sont séparés logiquement.
- NFC/RFID, QR et mobile peuvent coexister.
- Le réseau doit pouvoir fonctionner avec plusieurs fournisseurs de matériel.
- Le mode offline est une exigence de premier ordre.
- Aucun double débit ne doit être possible lors de la resynchronisation.
- Les universités, entreprises, autorités et opérateurs gardent des périmètres de données distincts.
- Les fonctions transport restent configurables sans modifier le code pour chaque nouveau réseau.
- Les intégrations financières utilisent les partenaires réglementés et les modules financiers existants de Mansa.

## 60. Extensions futures

Extensions possibles :

- mobilité interurbaine ;
- cars longue distance ;
- train ;
- ferries ;
- vélos ou micro-mobilité ;
- parkings ;
- billets événementiels ;
- wallet mobilité multi-opérateurs ;
- open-loop EMV lorsque l’acquéreur et l’opérateur le permettent ;
- intégration MaaS ;
- calcul multimodal avancé.

Ces extensions restent derrière des capacités configurables et ne doivent pas remettre en cause le modèle multiservice défini ici.
