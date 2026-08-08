# Cahier des charges — Cartes multiservices, contrôle d’accès et transport public Mansa

## 1. Objet

Ce document définit le module transversal Mansa de cartes et identifiants multiservices, contrôle d’accès, validation de droits et transport public. Il complète les modules Cartes de paiement, Secteur public, Écoles et Universités, Entreprises et Employeurs, TPE, Identité numérique, Wallets et Péage sans les remplacer.

L’objectif est de permettre à une même infrastructure Mansa de gérer des supports physiques ou numériques utilisés pour plusieurs usages : identité fonctionnelle, accès à un site, transport, restauration, bibliothèque, parking, avantages employeur, flotte, fidélité, paiement lorsque contractuellement permis, et autres services configurés par une organisation.

Le module doit être multi-tenant, multi-fournisseurs, configurable et réutilisable pour les administrations, universités, écoles, entreprises, opérateurs de transport, parkings, sites industriels, centres commerciaux, stations-service et autres organisations autorisées.

## 2. Principes non négociables

1. Un identifiant multiservice n’est pas automatiquement une carte bancaire.
2. Les fonctions de paiement réglementées restent opérées par les partenaires habilités et les modules monétiques existants.
3. Les secrets cryptographiques, clés RFID/NFC, clés SAM, PAN, PIN et CVV ne sont jamais stockés en clair dans les journaux Mansa.
4. Un support perdu, volé, expiré ou révoqué doit pouvoir être invalidé rapidement sans supprimer l’historique.
5. Les droits sont évalués côté serveur ou par un moteur local signé et borné lorsque le mode hors ligne est autorisé.
6. Une organisation ne peut consulter que ses propres détenteurs, supports, droits, événements et équipements selon ses permissions.
7. Toute ouverture manuelle d’un accès sensible est auditée.
8. Le matériel doit rester multi-fournisseurs derrière des adaptateurs et interfaces documentées.
9. Les règles tarifaires, horaires, zones, quotas et politiques d’accès sont versionnées avec dates d’effet.
10. Les environnements Démo, Recette et Production sont strictement séparés.
11. Aucune fonctionnalité ne doit supposer qu’un utilisateur possède un smartphone ou une connexion Internet.
12. Les traitements biométriques ne sont pas requis par défaut et restent hors périmètre sauf projet séparé, base légale et validation explicite.

## 3. Relation avec les autres modules Mansa

Le module s’intègre notamment avec :

- Identité numérique et consentements ;
- KYC/KYB lorsque nécessaire ;
- Cartes physiques et virtuelles de paiement ;
- Wallets, ledger et soldes ;
- Paiements et Mobile Money ;
- Entreprises et Employeurs ;
- Écoles et Universités ;
- Secteur public et services de l’État ;
- Fidélité, cashback et récompenses ;
- Abonnements et facturation récurrente ;
- Facturation, reçus et devis ;
- Notifications ;
- Analytics et reporting ;
- Support et litiges ;
- Gestion des appareils ;
- Risk Engine ;
- API publiques et webhooks ;
- Péage et mobilité routière.

Le présent module fournit le moteur commun de support, droits, validation et équipements. Les règles financières restent déléguées aux modules financiers appropriés.

## 4. Cas d’usage principaux

Le système doit pouvoir couvrir au minimum :

### 4.1 Étudiant

- carte étudiante physique ou numérique ;
- identification dans l’établissement ;
- accès campus, bibliothèque, laboratoire ou résidence ;
- restauration universitaire ;
- transport étudiant ;
- suivi de validité d’inscription ;
- avantages et tarifs étudiants ;
- paiement ou wallet lorsqu’un produit financier autorisé est associé ;
- remplacement de carte ;
- suspension automatique à expiration de l’année académique.

### 4.2 Salarié et entreprise

- badge employé ;
- accès bureaux, chantier, dépôt, parking ou zones restreintes ;
- restaurant d’entreprise ;
- avantages employeur ;
- carte transport ou mobilité ;
- carte de dépenses professionnelle lorsqu’un produit monétique séparé existe ;
- quotas ou enveloppes ;
- gestion des visiteurs et prestataires ;
- révocation immédiate lors d’un départ.

### 4.3 Transport public

- carte ou badge de transport ;
- titre unitaire ;
- carnet de voyages ;
- abonnement journalier, hebdomadaire, mensuel ou personnalisé ;
- tarification par zone ;
- tarification par distance lorsque l’infrastructure le permet ;
- correspondances ;
- tarifs étudiants, seniors, sociaux ou employeurs ;
- validation à bord ou en station ;
- contrôle par agent ;
- fonctionnement dégradé hors ligne ;
- recharge via Mansa, guichet, TPE, Mobile Money ou autres canaux activés.

### 4.4 Parking et contrôle de véhicules

- badge RFID/NFC ou identifiant véhicule ;
- abonnement parking ;
- accès visiteur ;
- flotte d’entreprise ;
- ouverture de barrière ;
- journal entrée/sortie ;
- quotas de durée ;
- facturation du stationnement ;
- règles par site et zone.

### 4.5 Sites industriels et logistiques

- contrôle d’accès personnes ;
- contrôle d’accès véhicules ;
- badges temporaires ;
- zones à autorisation renforcée ;
- plages horaires ;
- règles de présence ;
- intégration aux tourniquets, barrières, lecteurs et contrôleurs locaux ;
- audit des ouvertures forcées ou manuelles.

### 4.6 Stations-service et flottes

Le module peut servir de couche d’identification et de droits pour des flottes d’entreprise :

- véhicule ou chauffeur identifié par badge, carte, QR ou tag autorisé ;
- station ou pompe autorisée ;
- type de carburant autorisé ;
- plafond par jour, semaine ou mois ;
- quantité maximale ;
- plages horaires ;
- validation par centre de coûts ;
- liaison à un compte entreprise ou à une facturation différée ;
- reçus et rapprochement ;
- suspension instantanée d’un véhicule ou d’un badge.

La commande physique d’une pompe ou d’un automate ne doit être activée que via une intégration industrielle validée et sécurisée avec le fournisseur concerné.

## 5. Types de supports

Le moteur doit abstraire le support physique ou numérique.

Types initiaux :

```text
NFC_CARD
RFID_HF_CARD
RFID_UHF_TAG
QR_STATIC
QR_DYNAMIC
MOBILE_CREDENTIAL
BARCODE
VEHICLE_IDENTIFIER
EXTERNAL_CREDENTIAL
VIRTUAL_PASS
```

Un support peut être uniquement identitaire, uniquement transport, uniquement accès, ou multiservice.

Le type de support ne doit jamais suffire à déterminer un droit : le droit actif et la politique de l’organisation doivent être vérifiés.

## 6. Carte multiservice

Une carte multiservice est un support pouvant référencer plusieurs services indépendants.

Exemple :

```text
Carte Étudiant Mansa
├── Identité étudiant
├── Accès campus
├── Bibliothèque
├── Restauration
├── Abonnement transport
├── Avantages étudiant
└── Paiement optionnel via produit financier séparé
```

Le système doit éviter de dupliquer les données sensibles sur la carte. La carte contient ou expose uniquement les éléments techniques nécessaires à l’identification sécurisée et à la validation.

## 7. Séparation identité / droit / moyen de paiement

Le modèle doit distinguer strictement :

```text
Person / OrganizationMember
Credential
Entitlement
PassProduct
PaymentInstrument
AccessPolicy
ValidationEvent
```

Un même détenteur peut posséder plusieurs `Credential`.

Un `Credential` peut donner accès à plusieurs `Entitlement`.

Un `PaymentInstrument` est géré séparément et n’est associé que lorsque cela est légalement, contractuellement et techniquement autorisé.

## 8. Entitlements et droits

Un `Entitlement` représente un droit d’usage.

Exemples :

- accès bâtiment A ;
- abonnement bus Zone 1-3 ;
- 20 repas ;
- parking mensuel ;
- accès bibliothèque ;
- 30 litres de diesel par semaine ;
- accès chantier du lundi au vendredi ;
- tarif étudiant ;
- invitation visiteur valable 4 heures.

Champs minimaux :

- identifiant ;
- tenant ;
- détenteur ;
- service ;
- produit ou politique ;
- date de début ;
- date de fin ;
- statut ;
- quotas ;
- zones ;
- horaires ;
- restrictions ;
- source d’attribution ;
- version de règle ;
- métadonnées minimales ;
- historique.

## 9. États d’un droit

```text
DRAFT
PENDING
ACTIVE
SUSPENDED
EXPIRED
REVOKED
CONSUMED
CANCELLED
```

Toutes les transitions sont auditées.

## 10. Produits de pass et abonnements

Un `PassProduct` permet à une organisation de créer des offres sans modification de code.

Exemples :

- Pass étudiant annuel ;
- Pass transport 30 jours ;
- Pass parking nuit ;
- Badge salarié permanent ;
- Visiteur 1 journée ;
- Pack 10 trajets ;
- Cantine 20 repas ;
- Flotte carburant 200 litres/mois.

Configuration :

- nom ;
- catégorie ;
- prix ;
- devise ;
- durée ;
- activation ;
- renouvellement ;
- zones ;
- quota ;
- population éligible ;
- canaux de vente ;
- canaux de validation ;
- politique de remboursement ;
- transférabilité ;
- mode offline ;
- date d’effet ;
- statut.

## 11. Moteur de règles

La décision d’autoriser un usage doit être calculée à partir de règles versionnées.

Entrées possibles :

- tenant ;
- identifiant ;
- détenteur ;
- service ;
- équipement ;
- zone ;
- date et heure ;
- droit actif ;
- quota restant ;
- blacklist ou révocation ;
- niveau de risque ;
- éventuelle dette ;
- état de synchronisation ;
- paramètres locaux.

Sorties :

```text
ALLOW
DENY
ALLOW_WITH_WARNING
REQUIRE_ONLINE
REQUIRE_OPERATOR
```

Chaque décision doit fournir un code de raison exploitable par l’interface et l’audit.

## 12. Transport public — modèle fonctionnel

Le transport doit supporter :

```text
TransportAuthority
TransportOperator
TransportNetwork
TransportLine
TransportStop
TransportZone
TransportVehicle
FareProduct
FareRule
TransportPass
Validator
ValidationEvent
InspectionEvent
```

Une autorité peut gérer plusieurs opérateurs. Un opérateur peut desservir plusieurs lignes et zones.

## 13. Tarification transport

Modes à supporter :

```text
FLAT_FARE
ZONE_BASED
DISTANCE_BASED
TIME_BASED
TRIP_BUNDLE
DAILY_CAP
WEEKLY_CAP
SUBSCRIPTION
FREE_ELIGIBLE
EXTERNAL_FARE_ENGINE
```

Les tarifs sont versionnés et peuvent différer selon :

- catégorie usager ;
- période ;
- zone ;
- ligne ;
- type de transport ;
- correspondance ;
- offre employeur ;
- subvention publique.

Mansa ne doit pas inventer une tarification lorsqu’elle est déterminée par un système externe : la réponse externe doit être référencée et auditable.

## 14. Validation d’un trajet

Flux type :

1. présentation du support ;
2. lecture sécurisée ;
3. identification du credential ;
4. vérification locale ou en ligne ;
5. détermination du droit ou du tarif ;
6. validation ;
7. mise à jour quota ou compteur ;
8. affichage vert/rouge et signal sonore configurable ;
9. stockage de l’événement ;
10. synchronisation vers Mansa ;
11. écriture financière si nécessaire via le module approprié.

Une validation ne doit pas débiter deux fois à cause d’une resynchronisation.

## 15. Tap-in / tap-out

Pour les réseaux qui utilisent entrée/sortie :

- le premier passage crée un `OPEN_JOURNEY` ;
- le passage de sortie clôt le trajet ;
- le moteur applique le tarif ;
- un trajet incomplet suit une politique configurable ;
- les doublons rapides sont filtrés selon une fenêtre définie ;
- le système conserve les preuves des deux validations.

## 16. Correspondances

Le moteur doit pouvoir gérer :

- durée de correspondance ;
- nombre maximal ;
- réseaux compatibles ;
- zones compatibles ;
- gratuité ou supplément ;
- règles différentes par produit.

## 17. Plafonnement tarifaire

Optionnellement :

- plafond quotidien ;
- plafond hebdomadaire ;
- plafond mensuel ;
- meilleur tarif calculé selon règles autorisées.

Tout ajustement financier doit être traçable dans le ledger et ne jamais modifier rétroactivement une écriture sans mécanisme comptable explicite.

## 18. Contrôle par agent

Une application ou un terminal de contrôle doit permettre à un agent habilité de :

- lire le support ;
- vérifier sa validité ;
- afficher uniquement les données nécessaires ;
- consulter les validations récentes autorisées ;
- enregistrer un contrôle ;
- signaler une anomalie ;
- générer une référence d’infraction lorsque le module Secteur public et la réglementation l’autorisent.

Le contrôleur ne doit jamais pouvoir modifier librement les droits ou les historiques.

## 19. Contrôle d’accès physique

Le système doit pouvoir piloter ou intégrer :

- portes ;
- portillons ;
- tourniquets ;
- barrières ;
- ascenseurs ;
- casiers ;
- parkings ;
- portails industriels.

L’intégration se fait derrière un `AccessDeviceAdapter`.

Interfaces possibles selon équipement :

- API IP documentée ;
- MQTT sécurisé ;
- WebSocket sécurisé ;
- protocole industriel documenté ;
- relais/contact sec ;
- contrôleur d’accès tiers ;
- SDK fournisseur.

Aucun protocole propriétaire ne doit être simulé sans documentation et validation du fournisseur.

## 20. Contrôleur local

Pour les sites qui nécessitent une continuité locale, un contrôleur local peut conserver :

- liste limitée de credentials autorisés ;
- règles signées ;
- liste de révocation ;
- horloge sécurisée ;
- file d’événements ;
- configuration de l’équipement ;
- version logicielle.

Les données locales sont minimisées et chiffrées selon les capacités du matériel.

## 21. Mode hors ligne

Le mode offline doit être explicitement configuré par service.

Principes :

- aucune validation financière définitive inventée ;
- identifiants de transaction ou d’événement uniques ;
- règles locales avec date d’expiration ;
- listes de révocation actualisées ;
- plafonds offline ;
- anti-replay ;
- horodatage ;
- synchronisation idempotente ;
- détection de conflit ;
- passage automatique en `REQUIRE_ONLINE` lorsque la politique locale n’est plus sûre.

## 22. Anti-passback et anti-partage

Pour les sites qui le nécessitent, une politique peut empêcher :

- deux entrées consécutives sans sortie ;
- utilisation simultanée du même badge sur plusieurs points ;
- répétitions anormales ;
- partage manifeste selon règles configurées.

Les mécanismes doivent rester proportionnés au risque et ne pas bloquer injustement un usager sans processus de recours.

## 23. QR statique et dynamique

Le QR peut être utilisé pour :

- billet ;
- invitation ;
- pass temporaire ;
- contrôle ;
- accès événement ;
- validation de service.

Pour les usages sensibles, privilégier un QR dynamique, signé ou à durée courte.

Un QR ne doit pas exposer directement des données personnelles sensibles.

## 24. NFC et RFID

Le module doit distinguer les technologies :

- NFC/HF courte portée pour badges, cartes étudiantes, transport ou accès ;
- UHF RFID pour identification à distance de véhicules ou autres cas appropriés ;
- autres technologies uniquement via adaptateur documenté.

Le système ne doit pas supposer qu’un UID RFID brut constitue à lui seul une preuve d’identité suffisante pour une opération sensible.

## 25. Gestion des supports

Cycle de vie :

```text
CREATED
UNASSIGNED
ASSIGNED
ACTIVE
SUSPENDED
LOST
STOLEN
DAMAGED
REPLACED
REVOKED
EXPIRED
ARCHIVED
```

Chaque support possède :

- identifiant interne ;
- type ;
- détenteur ;
- organisation ;
- date d’émission ;
- date d’expiration ;
- statut ;
- identifiant technique tokenisé ou haché selon usage ;
- profil de sécurité ;
- droits associés ;
- historique des remplacements.

## 26. Perte, vol et remplacement

Lorsqu’un support est déclaré perdu ou volé :

1. statut immédiat `LOST` ou `STOLEN` ;
2. propagation vers les systèmes et contrôleurs compatibles ;
3. ajout à la liste de révocation ;
4. conservation de l’historique ;
5. possibilité de créer un support de remplacement ;
6. migration contrôlée des droits transférables ;
7. notification au détenteur ou à l’organisation.

Le nouveau support possède un identifiant différent.

## 27. Invitation visiteur

Une organisation peut créer une invitation avec :

- hôte ;
- visiteur ;
- site ;
- zones ;
- créneau ;
- nombre d’entrées ;
- QR ou credential temporaire ;
- statut ;
- révocation anticipée.

Les données sont supprimées ou archivées selon la politique de conservation applicable.

## 28. Restauration et quotas

Le module peut gérer des droits non financiers tels que :

- 1 repas/jour ;
- 20 repas/mois ;
- subvention partielle ;
- repas employeur ;
- cantine scolaire.

Le passage décrémente le quota de manière idempotente.

Tout complément monétaire est traité par le module de paiement approprié.

## 29. Avantages employeur

Un employeur peut attribuer :

- transport ;
- restauration ;
- parking ;
- mobilité ;
- accès ;
- budget carburant ;
- autres avantages configurés.

L’administrateur peut définir :

- population ;
- période ;
- montant ou quota ;
- règles d’usage ;
- jours autorisés ;
- lieux autorisés ;
- politique d’expiration.

## 30. Flottes et véhicules

Le moteur doit pouvoir associer :

```text
Fleet
Vehicle
Driver
VehicleCredential
DriverCredential
FleetEntitlement
FleetPolicy
FleetUsageEvent
```

Une politique peut imposer simultanément un véhicule valide et un chauffeur valide.

## 31. Paiement associé

Trois modèles doivent être distingués :

### 31.1 Droit prépayé

Le client achète un pass, puis utilise le droit jusqu’à expiration ou épuisement.

### 31.2 Paiement à l’usage

Chaque validation crée une obligation ou une opération financière selon le service.

### 31.3 Facturation différée

Les usages sont agrégés puis facturés à une entreprise ou organisation.

Le ledger et le rapprochement doivent conserver la correspondance entre événement d’usage et écriture financière.

## 32. Moyens de paiement

Selon le service, le pays, le contrat et les canaux activés :

- wallet Mansa ;
- Mobile Money ;
- carte bancaire ;
- compte bancaire ;
- TPE ;
- QR ;
- carte Mansa ;
- facturation entreprise ;
- subvention ;
- gratuité autorisée.

Aucun canal n’est supposé disponible sans configuration.

## 33. Portail organisation

Le portail doit permettre aux administrateurs habilités de :

- créer des sites et zones ;
- gérer les détenteurs ;
- émettre et révoquer des supports ;
- créer des produits et abonnements ;
- définir les horaires ;
- configurer les quotas ;
- affecter des équipements ;
- consulter les événements ;
- gérer les exceptions ;
- exporter des rapports ;
- gérer les opérateurs ;
- paramétrer les notifications ;
- consulter l’état du parc matériel.

## 34. Portail transport

Fonctions supplémentaires :

- réseaux ;
- lignes ;
- arrêts ;
- zones ;
- véhicules ;
- validateurs ;
- tarifs ;
- produits ;
- abonnements ;
- contrôleurs ;
- ventes et recharges ;
- validations ;
- fraude présumée ;
- rapprochement financier ;
- statistiques de fréquentation agrégées.

## 35. Portail université

Fonctions supplémentaires :

- import ou synchronisation des étudiants ;
- année académique ;
- statut d’inscription ;
- cartes ;
- restauration ;
- bibliothèque ;
- résidence ;
- transport ;
- bourse ou aide via le module public ;
- gestion des droits par population.

Mansa ne remplace pas le système académique complet.

## 36. Application utilisateur

L’utilisateur doit pouvoir consulter selon ses droits :

- ses cartes et pass ;
- statut ;
- date d’expiration ;
- quotas ;
- prochains renouvellements ;
- historique d’usage autorisé ;
- titre transport ;
- QR temporaire lorsque permis ;
- déclaration perte/vol ;
- recharge ou renouvellement ;
- support.

## 37. Appareil validateur

Un validateur doit exposer au minimum :

```text
ValidatorDevice
DeviceAdapter
DeviceKeyReference
DeviceFirmware
DeviceConfig
DeviceHealth
DeviceAssignment
```

État :

```text
PROVISIONING
ACTIVE
DEGRADED
OFFLINE
SUSPENDED
REVOKED
MAINTENANCE
```

## 38. Provisioning des équipements

Étapes :

1. enregistrement de l’équipement ;
2. vérification fournisseur/modèle ;
3. affectation tenant/site ;
4. génération ou injection sécurisée des références de clés ;
5. configuration ;
6. test ;
7. activation ;
8. supervision ;
9. rotation de certificats ou secrets ;
10. révocation en fin de vie.

Aucun secret réel ne doit apparaître dans le dépôt.

## 39. Multi-fournisseurs

Le domaine ne doit dépendre d’aucune marque unique.

Contrats d’adaptation recommandés :

```text
CredentialReaderAdapter
AccessDeviceAdapter
TransportValidatorAdapter
BarrierAdapter
PrinterAdapter
PaymentTerminalAdapter
FleetDeviceAdapter
```

Chaque adaptateur déclare ses capacités.

Exemples :

```text
READ_NFC
READ_UHF
READ_QR
OPEN_RELAY
DISPLAY_MESSAGE
PLAY_SOUND
PRINT_RECEIPT
LOCAL_RULES
OFFLINE_QUEUE
REMOTE_CONFIG
HEALTH_STATUS
```

## 40. Marque blanche

Une organisation peut personnaliser :

- logo ;
- couleurs ;
- nom du pass ;
- visuel carte ;
- écran validateur ;
- reçus ;
- signalétique ;
- domaine ou sous-domaine ;
- messages.

Une mention `Propulsé par Mansa` peut être activée ou désactivée selon le contrat.

Les contraintes des réseaux de paiement, fabricants ou autorités restent prioritaires lorsqu’elles s’appliquent.

## 41. Sécurité

Mesures minimales :

- TLS ;
- authentification mutuelle pour équipements sensibles lorsque possible ;
- rotation de certificats ;
- chiffrement au repos ;
- secrets dans un gestionnaire dédié ;
- signature des configurations offline ;
- protection anti-replay ;
- rate limiting ;
- révocation ;
- contrôle RBAC/ABAC ;
- logs immuables pour événements critiques ;
- surveillance des équipements compromis.

## 42. Fraude et anomalies

Signaux possibles :

- même support utilisé à deux lieux incompatibles ;
- fréquence anormale ;
- tentatives répétées après révocation ;
- ouverture manuelle fréquente ;
- validateur hors ligne anormalement longtemps ;
- série d’événements non synchronisés ;
- compteur qui diverge ;
- passage sans validation ;
- badge véhicule utilisé sur un autre véhicule lorsque ce lien est obligatoire.

Le Risk Engine peut recommander :

```text
ALLOW
REVIEW
TEMPORARY_BLOCK
REQUIRE_ONLINE
REVOKE_DEVICE
```

Toute mesure définitive suit les règles métier et droits de recours applicables.

## 43. Audit

Événements à conserver :

- émission support ;
- affectation ;
- activation ;
- création droit ;
- modification droit ;
- validation ;
- refus ;
- entrée/sortie ;
- contrôle ;
- ouverture manuelle ;
- révocation ;
- remplacement ;
- modification tarif ;
- modification zone ;
- changement configuration équipement ;
- synchronisation offline ;
- correction administrative.

Chaque événement contient un identifiant de corrélation.

## 44. Protection des données

Le système applique :

- minimisation ;
- séparation des tenants ;
- durées de conservation configurées selon obligations ;
- pseudonymisation pour analytics ;
- limitation des données affichées aux contrôleurs ;
- export utilisateur lorsque requis ;
- suppression ou anonymisation lorsque légalement possible ;
- consentement lorsque nécessaire.

Les trajets détaillés et historiques d’accès sont considérés comme des données sensibles au regard de la vie privée et ne doivent pas être conservés indéfiniment sans justification.

## 45. API principales

Exemples indicatifs :

```text
POST   /credentials
GET    /credentials/{id}
POST   /credentials/{id}/assign
POST   /credentials/{id}/suspend
POST   /credentials/{id}/revoke
POST   /credentials/{id}/replace

POST   /entitlements
GET    /entitlements/{id}
POST   /entitlements/{id}/suspend
POST   /entitlements/{id}/revoke

POST   /passes/products
POST   /passes/purchase
POST   /passes/renew

POST   /validation/evaluate
POST   /validation/events
POST   /validation/offline-sync

POST   /access/decision
POST   /access/events
POST   /access/manual-open

POST   /transport/tap-in
POST   /transport/tap-out
POST   /transport/inspect

GET    /devices/{id}/config
POST   /devices/{id}/heartbeat
POST   /devices/{id}/events
```

Les API réelles suivent les conventions globales Mansa, l’idempotence et le versionnement existants.

## 46. Webhooks

Événements possibles :

```text
credential.created
credential.activated
credential.suspended
credential.revoked
credential.replaced
entitlement.activated
entitlement.expired
validation.allowed
validation.denied
transport.journey.completed
access.manual_open
validator.offline
validator.online
validator.compromised
pass.expiring
```

Les webhooks sont signés, rejouables de manière contrôlée et idempotents côté consommateur.

## 47. Modèle de données minimal

```text
Credential
CredentialType
CredentialAssignment
CredentialLifecycleEvent
Entitlement
EntitlementProduct
PassProduct
PassSubscription
Quota
QuotaConsumption
AccessSite
AccessZone
AccessPoint
AccessPolicy
AccessDecision
AccessEvent
TransportAuthority
TransportOperator
TransportNetwork
TransportLine
TransportStop
TransportZone
TransportVehicle
FareProduct
FareRule
TransportPass
Journey
ValidationEvent
InspectionEvent
ValidatorDevice
DeviceAdapter
DeviceConfig
DeviceHealthEvent
OfflineBatch
Fleet
Vehicle
Driver
FleetPolicy
FleetUsageEvent
```

## 48. Idempotence

Toute action pouvant avoir un effet financier, consommer un quota ou ouvrir un droit doit utiliser une clé d’idempotence ou un identifiant d’événement unique.

La resynchronisation offline ne doit jamais :

- débiter deux fois ;
- consommer deux fois un voyage ;
- créer deux trajets ;
- créer deux factures ;
- dupliquer un droit.

## 49. Disponibilité et résilience

Le service doit supporter :

- plusieurs zones de disponibilité lorsque l’infrastructure le permet ;
- files de messages ;
- retry contrôlé ;
- circuit breakers ;
- cache de règles signé ;
- reprise après incident ;
- supervision temps réel des validateurs et contrôleurs ;
- mode dégradé documenté.

## 50. Observabilité

Métriques :

- validations/minute ;
- taux d’autorisation ;
- taux de refus ;
- latence ;
- appareils online/offline ;
- taille des files offline ;
- erreurs par adaptateur ;
- synchronisations en échec ;
- ouvertures manuelles ;
- voyages incomplets ;
- consommations de quota ;
- taux de remplacement des supports.

Les métriques ne doivent pas exposer de données personnelles inutiles.

## 51. SLA appareils

Chaque famille d’équipement peut définir :

- fréquence heartbeat ;
- délai avant état `DEGRADED` ;
- délai avant `OFFLINE` ;
- version minimale ;
- fenêtre de mise à jour ;
- délai maximal de synchronisation ;
- politique de remplacement.

## 52. Tests obligatoires

### 52.1 Unitaires

- règles d’accès ;
- quotas ;
- tarifs ;
- expiration ;
- anti-replay ;
- machines à états ;
- idempotence.

### 52.2 Intégration

- lecteurs ;
- validateurs ;
- barrières ;
- contrôleurs ;
- TPE ;
- wallet ;
- Mobile Money ;
- ledger ;
- notification ;
- API organisations.

### 52.3 Offline

- coupure réseau ;
- reprise ;
- doublons ;
- horloge incorrecte ;
- règle expirée ;
- support révoqué ;
- file pleine ;
- perte d’alimentation ;
- synchronisation partielle.

### 52.4 Sécurité

- credential cloné simulé ;
- replay ;
- équipement révoqué ;
- certificat expiré ;
- tenant isolation ;
- élévation de privilèges ;
- QR expiré ;
- ouverture manuelle non autorisée.

## 53. Déploiement progressif

Le module doit pouvoir être déployé progressivement :

### Niveau 1 — numérique léger

- QR ;
- smartphone ou tablette ;
- portail ;
- validation en ligne ;
- coûts matériels faibles.

### Niveau 2 — badges et validateurs

- cartes NFC/RFID ;
- lecteurs dédiés ;
- contrôleur local ;
- fonctionnement offline limité.

### Niveau 3 — infrastructure automatisée

- portillons ;
- barrières ;
- tourniquets ;
- flotte de validateurs ;
- supervision centralisée ;
- redondance et maintenance industrielle.

Une organisation ne doit pas être obligée d’adopter le niveau maximal dès le lancement.

## 54. Modèles commerciaux

Mansa doit pouvoir proposer :

- licence SaaS ;
- frais par utilisateur actif ;
- frais par credential ;
- frais par validateur ;
- frais par validation ;
- abonnement organisation ;
- intégration sur devis ;
- maintenance ;
- matériel acheté directement par le client ;
- matériel fourni, intégré ou revendu par Mansa.

Les commissions financières sont configurées séparément selon les contrats et la réglementation.

## 55. Gouvernance et configuration

Les éléments suivants sont administrables sans redéploiement :

- produits ;
- tarifs ;
- zones ;
- horaires ;
- quotas ;
- types de supports ;
- politiques offline ;
- seuils fraude ;
- canaux de paiement ;
- modèles de reçus ;
- branding ;
- adaptateurs activés ;
- modèles d’équipement autorisés ;
- durées de conservation.

Toute modification sensible est versionnée et auditée.

## 56. Compatibilité avec le péage Mansa

Ce module ne remplace pas le cahier des charges Péage et Mobilité routière.

Les décisions de référence du péage restent inchangées :

- solution A : péage automatique classique avec barrière ;
- solution B : télépéage UHF RFID avec barrière ;
- free-flow uniquement comme évolution future optionnelle ;
- paiement classique configurable par billets et pièces FCFA, carte EMV multi-réseaux, NFC, carte Mansa, wallet Mansa, QR et Mobile Money selon canaux activés ;
- Mobile Money activable ou désactivable par l’administration aux niveaux prévus avec date d’effet et audit ;
- tags UHF passifs pour le télépéage initial ;
- contrôleur local, relais OPEN, barrière et capteurs de passage ;
- fonctionnement local sécurisé et resynchronisation sans double débit ;
- matériel multi-fournisseurs derrière adaptateurs ;
- voie automatique complète, voie semi-automatique et poste numérisé à faible coût ;
- déploiement progressif ;
- matériel acheté directement ou fourni/intégré/revendu par Mansa ;
- marque blanche État/concessionnaire avec mention `Propulsé par Mansa` facultative ;
- rapprochement anti-corruption entre véhicule, catégorie, tarif attendu, paiement, ouverture et passage physique ;
- toute ouverture manuelle auditée.

Le présent moteur peut partager certains composants techniques avec le péage, notamment les credentials, adaptateurs matériels, contrôleurs locaux, audit et supervision, sans fusionner les règles métier des deux domaines.

## 57. Hors périmètre

Ce module ne remplace pas :

- un système académique complet ;
- un SIRH complet ;
- un ERP de transport complet ;
- un système de signalisation ferroviaire ;
- un système de sécurité incendie ;
- un système de contrôle industriel critique ;
- la monétique bancaire ;
- un registre national d’identité ;
- un logiciel de police ;
- un système de vidéosurveillance biométrique.

Les intégrations critiques nécessitent toujours une validation technique, contractuelle et réglementaire spécifique.

## 58. Critères d’acceptation

Le module est considéré comme prêt à implémenter lorsque :

1. le modèle Credential/Entitlement/Pass est stabilisé ;
2. l’isolation multi-tenant est testée ;
3. le moteur de règles retourne des décisions explicites ;
4. l’idempotence des validations est démontrée ;
5. le mode offline est borné et testé ;
6. la révocation se propage correctement ;
7. au moins un adaptateur lecteur, un adaptateur accès et un adaptateur validateur sont implémentés en Recette ;
8. les événements sont auditables ;
9. les données personnelles sont minimisées ;
10. les produits et tarifs sont configurables sans changement de code ;
11. le parcours transport complet est testé ;
12. le parcours étudiant est testé ;
13. le parcours entreprise est testé ;
14. le parcours visiteur est testé ;
15. le rapprochement financier fonctionne lorsque le service est payant ;
16. les équipements compromis peuvent être révoqués ;
17. aucun secret de production n’est présent dans le dépôt.

## 59. Décisions d’architecture

Décisions retenues :

- moteur multiservice commun plutôt qu’une application séparée par secteur ;
- séparation stricte entre credential, droit et moyen de paiement ;
- adaptation multi-fournisseurs ;
- offline limité, signé et idempotent ;
- configuration par tenant ;
- prise en charge des étudiants, salariés, visiteurs, transports, parkings et flottes ;
- possibilité de marque blanche ;
- déploiement progressif ;
- réutilisation des briques Mansa existantes au lieu de dupliquer wallet, paiement, identité, notifications ou ledger.

## 60. Résultat attendu

Mansa doit pouvoir fournir à une organisation un même socle logiciel capable de répondre à des scénarios tels que :

- une université émet une carte étudiante utilisable pour accès, bibliothèque, cantine et transport ;
- une entreprise émet un badge salarié pour bureaux, parking, restauration et mobilité ;
- un opérateur de bus vend et valide des abonnements et carnets de trajets ;
- un parking ouvre automatiquement une barrière pour les abonnés autorisés ;
- une station-service applique des droits carburant à une flotte d’entreprise ;
- un site industriel gère employés, visiteurs, véhicules et zones restreintes ;
- une administration fournit une carte multiservice sans exposer de données financières sensibles sur le support.

Le cœur Mansa doit rester commun, configurable, auditable et indépendant d’un matériel ou fournisseur unique.
