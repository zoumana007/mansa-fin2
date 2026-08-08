# Cahier des charges — Flottes, carburant, stations-service et contrôle d’accès privé

## 1. Objet

Ce document définit le module Mansa destiné aux entreprises, gestionnaires de flottes, stations-service, parkings privés, sites industriels, dépôts logistiques et autres organisations qui souhaitent utiliser le même principe général que le péage Mansa : identifier un véhicule, une personne ou un support, appliquer des règles, autoriser ou refuser une action, déclencher éventuellement un paiement, puis tracer l’événement.

Le module est distinct du péage public et du transport collectif déjà documentés. Il réutilise cependant les briques communes de Mansa : identité, cartes et badges, wallet, paiements, abonnements, entreprises, appareils, audit, risque, notifications, analytics et intégrations.

Il permet notamment :

- la gestion de flottes de véhicules ;
- le ravitaillement contrôlé en carburant ;
- les cartes ou badges flotte ;
- l’identification RFID/NFC/QR/plaque ;
- les plafonds de consommation ;
- les règles par véhicule, conducteur, produit ou station ;
- les paiements différés ou prépayés ;
- les comptes entreprise ;
- les parkings et accès privés ;
- les barrières et portails ;
- le contrôle d’accès de sites industriels ;
- la gestion des visiteurs et prestataires ;
- le rapprochement automatique des événements physiques et financiers ;
- le fonctionnement local sécurisé en cas de connectivité intermittente.

## 2. Principes d’architecture

1. Le moteur doit être multi-tenant et sector-agnostic.
2. Une organisation ne voit jamais les véhicules, utilisateurs, règles ou transactions d’une autre organisation.
3. Le système ne dépend d’aucun fournisseur unique de lecteur, pompe, barrière, caméra, terminal ou badge.
4. Les matériels sont pilotés derrière des adaptateurs documentés.
5. Les fonctions de paiement utilisent les partenaires financiers et canaux autorisés ; le module ne se substitue pas à un acquéreur ou à un émetteur réglementé.
6. Les règles d’autorisation sont séparées des règles de paiement.
7. Une autorisation physique ne vaut pas automatiquement preuve de paiement.
8. Toute ouverture manuelle, override ou dérogation doit être auditée.
9. Les événements terrain doivent être idempotents et résister aux doublons lors de la resynchronisation.
10. Les secrets, clés et identifiants de production ne sont jamais stockés dans Git.
11. Les environnements Démo, Recette et Production restent séparés.
12. Les règles doivent être configurables depuis les portails autorisés sans modifier le code.

## 3. Cas d’usage principaux

Le module doit couvrir au minimum :

### 3.1 Flotte d’entreprise

Une entreprise enregistre ses véhicules, conducteurs, centres de coût, sites et règles. Elle peut attribuer un badge, une carte, un QR ou un identifiant RFID à un véhicule ou à un conducteur.

### 3.2 Station-service partenaire

Une station identifie le véhicule ou le conducteur, vérifie les droits, les limites et le type de carburant autorisé, puis autorise le ravitaillement dans la limite configurée.

### 3.3 Parking privé

Une entreprise ou un gestionnaire de parking définit des abonnements, droits d’entrée, plages horaires, visiteurs, listes blanches et règles tarifaires.

### 3.4 Site industriel ou logistique

Le système gère l’entrée et la sortie de véhicules, chauffeurs, prestataires et visiteurs, avec éventuellement badge, plaque, QR temporaire et validation par un poste de garde.

### 3.5 Dépôt ou terminal de transport

Les véhicules autorisés peuvent accéder à un dépôt, une zone de chargement ou une aire réservée selon leur contrat, créneau ou mission.

## 4. Modèle fonctionnel minimal

Concepts minimaux :

```text
FleetOrganization
FleetAccount
FleetVehicle
Driver
VehicleAssignment
FleetCredential
CredentialBinding
FuelStation
FuelPump
FuelProduct
FuelContract
FuelRule
FuelAuthorization
FuelTransaction
FuelInvoice
AccessSite
AccessZone
AccessPoint
AccessRule
AccessCredential
AccessSession
ParkingProduct
ParkingSubscription
BarrierDevice
ReaderDevice
CameraDevice
DeviceAdapter
LocalController
ManualOverride
SettlementBatch
FleetAuditEvent
```

## 5. Véhicules

Chaque `FleetVehicle` peut contenir :

- identifiant interne ;
- immatriculation ;
- pays d’immatriculation ;
- marque ;
- modèle ;
- catégorie ;
- type de carburant ;
- capacité de réservoir si utilisée ;
- numéro de flotte interne ;
- centre de coût ;
- département ;
- site de rattachement ;
- statut ;
- supports associés ;
- règles actives ;
- dates de validité.

Les données inutiles au service ne doivent pas être collectées.

## 6. États d’un véhicule

```text
PENDING
ACTIVE
SUSPENDED
MAINTENANCE
BLOCKED
RETIRED
ARCHIVED
```

Un véhicule suspendu ou bloqué ne doit plus pouvoir utiliser les services concernés, sauf dérogation explicitement autorisée et auditée.

## 7. Conducteurs

Un conducteur peut être :

- salarié ;
- prestataire ;
- chauffeur temporaire ;
- conducteur invité ;
- conducteur externe autorisé.

Le profil peut être lié à un ou plusieurs véhicules selon les règles de l’entreprise.

Le système doit permettre :

- affectation temporaire ;
- affectation permanente ;
- dates de début et de fin ;
- restrictions par véhicule ;
- restrictions par site ;
- suspension immédiate ;
- historique des affectations.

## 8. Supports d’identification

Le module doit supporter :

```text
UHF_RFID_TAG
HF_RFID_CARD
NFC_CARD
MOBILE_NFC
QR_STATIC
QR_DYNAMIC
APP_TOKEN
VEHICLE_PLATE
BARCODE
PHYSICAL_CARD
OTHER
```

Un support peut être associé :

- au véhicule ;
- au conducteur ;
- au contrat ;
- à l’organisation ;
- à un visiteur temporaire.

Les associations sont versionnées et révocables.

## 9. RFID véhicule

Pour les usages nécessitant une lecture à distance, Mansa peut utiliser un tag UHF RFID passif associé au véhicule et au compte.

Flux général :

1. détection du tag ;
2. lecture de l’identifiant technique ;
3. résolution vers le véhicule et le contrat ;
4. contrôle du statut ;
5. application des règles ;
6. autorisation ou refus ;
7. création d’un événement signé ;
8. déclenchement éventuel du matériel ;
9. synchronisation serveur.

Le tag ne doit pas contenir en clair de données financières sensibles.

## 10. Plaque d’immatriculation

La plaque peut être utilisée comme facteur d’identification complémentaire.

La reconnaissance automatique de plaque, lorsqu’elle est activée, doit :

- être configurable par site ;
- conserver uniquement les données nécessaires ;
- prévoir une durée de rétention ;
- journaliser les corrections manuelles ;
- permettre la vérification croisée avec le badge ou tag ;
- ne jamais constituer seule une preuve de paiement irrévocable.

## 11. Compte flotte

Un `FleetAccount` représente le compte contractuel d’une organisation.

Il peut fonctionner en :

```text
PREPAID
POSTPAID
CREDIT_LIMIT
WALLET_BACKED
INVOICE_BASED
HYBRID
```

Le mode est défini par contrat et par partenaire financier.

## 12. Règles carburant

Une `FuelRule` peut limiter :

- type de carburant ;
- quantité maximale par opération ;
- montant maximal par opération ;
- montant maximal quotidien ;
- quantité maximale quotidienne ;
- budget hebdomadaire ou mensuel ;
- nombre d’opérations ;
- stations autorisées ;
- zones géographiques ;
- jours et horaires ;
- véhicule ;
- conducteur ;
- centre de coût ;
- kilométrage minimal entre deux ravitaillements ;
- niveau de risque ;
- présence obligatoire du conducteur ;
- double authentification éventuelle.

Les règles sont versionnées avec dates d’effet.

## 13. Produits carburant

Le module doit distinguer les produits configurés par la station :

```text
DIESEL
GASOLINE
LPG
CNG
ELECTRIC_CHARGING
LUBRICANT
ADBLUE
OTHER
```

Une organisation peut autoriser certains produits et en interdire d’autres.

## 14. Flux de ravitaillement avec badge ou RFID

Flux recommandé :

1. identification du véhicule ;
2. identification facultative ou obligatoire du conducteur ;
3. résolution du contrat entreprise ;
4. vérification des statuts ;
5. chargement des règles carburant ;
6. sélection ou détection du produit ;
7. calcul de la limite disponible ;
8. émission d’une `FuelAuthorization` ;
9. déverrouillage logique de la pompe ou validation par l’opérateur ;
10. ravitaillement ;
11. remontée du volume et du montant réels ;
12. création de la transaction ;
13. rapprochement avec l’autorisation ;
14. débit, réservation, facturation ou mise en compte ;
15. émission du reçu ;
16. journalisation.

## 15. Autorisation carburant

Une autorisation doit comporter :

- identifiant unique ;
- véhicule ;
- conducteur si requis ;
- station ;
- pompe ;
- produit ;
- limite en montant ou volume ;
- devise ;
- heure d’émission ;
- durée de validité ;
- règle appliquée ;
- statut ;
- référence idempotente.

États :

```text
PENDING
AUTHORIZED
PARTIALLY_USED
COMPLETED
EXPIRED
CANCELLED
DECLINED
RECONCILIATION_REQUIRED
```

## 16. Paiement et règlement

Les modèles doivent pouvoir inclure :

- débit wallet entreprise ;
- compte prépayé ;
- facture périodique ;
- prélèvement bancaire via partenaire ;
- carte corporate via partenaire ;
- crédit contractuel ;
- Mobile Money si contractuellement autorisé ;
- règlement centralisé de groupe.

Mansa ne doit jamais considérer une simple ouverture de pompe comme preuve définitive de paiement.

## 17. Facturation entreprise

Le système doit produire des relevés par :

- entreprise ;
- véhicule ;
- conducteur ;
- station ;
- produit ;
- centre de coût ;
- période ;
- projet ;
- département.

Les factures peuvent être émises directement par l’entité habilitée ou générées comme documents de support selon le modèle contractuel.

## 18. Contrôle anti-fraude carburant

Le moteur de risque doit pouvoir détecter :

- deux ravitaillements impossibles géographiquement ;
- volume supérieur à la capacité configurée ;
- fréquence anormale ;
- mauvais type de carburant ;
- badge utilisé sans véhicule attendu ;
- véhicule différent de la plaque détectée ;
- conducteur non affecté ;
- utilisation hors horaires ;
- pompe ou station non autorisée ;
- modification manuelle répétée ;
- tentatives refusées multiples ;
- dépassement de budget ;
- incohérence kilométrage/consommation.

Les alertes ne doivent pas bloquer automatiquement toutes les opérations : les politiques sont configurables.

## 19. Saisie du kilométrage

Une organisation peut activer la saisie de l’odomètre avant ravitaillement.

Le système doit :

- comparer à la dernière valeur ;
- détecter les valeurs décroissantes ;
- signaler les écarts anormaux ;
- accepter une justification contrôlée ;
- conserver l’historique ;
- ne pas inventer une valeur en cas d’absence.

## 20. Stations-service

Chaque `FuelStation` peut définir :

- exploitant ;
- adresse ;
- géolocalisation ;
- horaires ;
- produits ;
- pompes ;
- terminaux ;
- lecteurs ;
- canaux de paiement ;
- contrats entreprise acceptés ;
- règles locales ;
- statut ;
- capacités offline.

## 21. Intégration pompes

Le système doit être multi-fournisseurs.

Les modes d’intégration peuvent inclure :

```text
API
SERIAL_GATEWAY
TCP_IP
INDUSTRIAL_PROTOCOL
DRY_CONTACT
RELAY
POS_INTEGRATION
MANUAL_CONFIRMED
OTHER
```

Chaque fournisseur est encapsulé dans un `DeviceAdapter`.

Aucune hypothèse ne doit imposer un protocole propriétaire unique.

## 22. Mode semi-automatique station

Lorsque l’intégration directe à la pompe n’est pas disponible :

1. le véhicule est identifié ;
2. Mansa valide les droits ;
3. l’opérateur voit la limite autorisée ;
4. il effectue le ravitaillement ;
5. il saisit ou reçoit le volume réel ;
6. la transaction est rapprochée ;
7. toute correction est auditée.

Ce mode permet un déploiement progressif sans remplacer immédiatement tout le matériel existant.

## 23. Contrôle d’accès privé

Le moteur d’accès doit pouvoir gérer :

- parkings ;
- entrepôts ;
- sièges d’entreprise ;
- sites industriels ;
- dépôts ;
- zones réservées ;
- résidences ;
- campus ;
- événements privés.

## 24. Sites et zones

Un `AccessSite` contient une ou plusieurs `AccessZone`.

Une zone peut être :

```text
PUBLIC
EMPLOYEE_ONLY
VEHICLE_ONLY
RESTRICTED
HIGH_SECURITY
VISITOR
LOADING_ZONE
PARKING
FUEL_AREA
OTHER
```

Les règles peuvent différer par zone.

## 25. Points d’accès

Un `AccessPoint` peut représenter :

- barrière véhicule ;
- portail ;
- porte ;
- tourniquet ;
- borne ;
- quai ;
- poste de garde.

Il est associé à un ou plusieurs lecteurs ou contrôleurs.

## 26. Flux d’accès véhicule

Flux cible :

1. détection véhicule ;
2. lecture RFID/NFC/QR/plaque ;
3. résolution identité ou contrat ;
4. vérification des droits ;
5. contrôle horaire et zone ;
6. contrôle éventuel de paiement ou abonnement ;
7. émission d’une décision ;
8. commande OPEN si autorisé ;
9. détection du passage physique ;
10. fermeture ;
11. enregistrement de l’événement ;
12. rapprochement des données.

## 27. Barrières et contrôleurs

Le matériel doit pouvoir être piloté via :

- relais ;
- contact sec ;
- API locale ;
- protocole industriel documenté ;
- contrôleur intermédiaire.

Le logiciel métier ne doit jamais dépendre directement du modèle de barrière.

## 28. Capteurs de passage

Le système peut intégrer :

- boucle inductive ;
- cellule photoélectrique ;
- radar ;
- lidar ;
- capteur de présence ;
- caméra ;
- autre capteur certifié par le fournisseur.

Le rôle des capteurs est de confirmer la présence et le passage, pas de créer un paiement par eux-mêmes.

## 29. Parking et abonnements

Le module doit permettre :

- abonnement mensuel ;
- abonnement salarié ;
- abonnement résident ;
- abonnement flotte ;
- réservation ;
- paiement à l’heure ;
- forfait journalier ;
- gratuité contrôlée ;
- visiteurs ;
- invitations temporaires ;
- validation par entreprise ou commerçant.

## 30. Règles de parking

Une règle peut utiliser :

- plaque ;
- badge ;
- entreprise ;
- zone ;
- plage horaire ;
- nombre d’entrées ;
- capacité ;
- abonnement ;
- solde ;
- réservation ;
- durée maximale.

## 31. Visiteurs et prestataires

Le système doit permettre de créer une autorisation temporaire avec :

- identité minimale ;
- organisation invitante ;
- site ;
- zone ;
- date et heure ;
- véhicule éventuel ;
- QR temporaire ;
- sponsor interne ;
- statut ;
- expiration automatique.

## 32. Fonctionnement local et hors ligne

Le contrôleur local doit pouvoir conserver une politique limitée et sécurisée :

- listes d’autorisations nécessaires ;
- révocations ;
- règles horaires ;
- limites ;
- événements en attente ;
- compteurs anti-rejeu ;
- version de configuration.

Il ne doit jamais inventer un paiement ou un solde.

## 33. Anti-double traitement

Chaque événement terrain possède un identifiant unique.

La resynchronisation doit :

- reconnaître les événements déjà traités ;
- empêcher le double débit ;
- empêcher la double facturation ;
- préserver l’ordre logique ;
- signaler les conflits ;
- conserver la preuve locale et serveur.

## 34. Ouverture manuelle

Toute ouverture manuelle doit enregistrer :

- agent ;
- terminal ;
- point d’accès ;
- motif ;
- date et heure ;
- véhicule ou identité si disponible ;
- éventuelle approbation ;
- résultat ;
- commentaire.

Les ouvertures manuelles répétées doivent être remontées au moteur de risque.

## 35. Marque blanche

Le module doit supporter une personnalisation pour :

- entreprise ;
- station-service ;
- gestionnaire de parking ;
- site industriel ;
- opérateur logistique.

Éléments personnalisables :

- nom ;
- logo ;
- couleurs ;
- badge ;
- carte ;
- écran ;
- ticket ;
- reçu ;
- borne ;
- signalétique ;
- domaine ou sous-domaine.

La mention `Propulsé par Mansa` est facultative selon contrat.

## 36. Portail entreprise

Le portail Entreprises et Employeurs doit pouvoir afficher :

- flotte ;
- conducteurs ;
- badges ;
- règles ;
- consommation ;
- budgets ;
- anomalies ;
- factures ;
- accès ;
- parkings ;
- rapports ;
- exports ;
- alertes.

Les droits sont gérés par RBAC.

## 37. Portail station-service

Le portail station doit permettre :

- gestion des sites ;
- pompes ;
- produits ;
- prix ;
- contrats ;
- autorisations ;
- transactions ;
- rapprochement ;
- incidents ;
- appareils ;
- rapports ;
- facturation.

## 38. Notifications

Exemples configurables :

- ravitaillement effectué ;
- dépassement de seuil ;
- tentative refusée ;
- badge bloqué ;
- consommation anormale ;
- accès manuel ;
- facture disponible ;
- appareil hors ligne ;
- limite bientôt atteinte.

Les canaux utilisent le moteur de notifications Mansa.

## 39. Analytics

Indicateurs possibles :

- consommation par véhicule ;
- coût par kilomètre ;
- litres par période ;
- coût par centre ;
- stations les plus utilisées ;
- anomalies ;
- taux de refus ;
- utilisation des parkings ;
- taux d’occupation ;
- ouvertures manuelles ;
- appareils hors ligne ;
- économies estimées.

## 40. Audit

Événements sensibles à journaliser :

- création/suppression de véhicule ;
- affectation de conducteur ;
- émission/révocation de badge ;
- modification d’une règle ;
- changement de limite ;
- autorisation carburant ;
- ravitaillement ;
- remboursement ;
- ouverture manuelle ;
- correction de plaque ;
- changement de prix ;
- modification d’un appareil ;
- export sensible.

## 41. Sécurité

Le module doit appliquer :

- authentification forte pour les rôles sensibles ;
- RBAC ;
- séparation des rôles ;
- chiffrement en transit ;
- chiffrement des données sensibles au repos ;
- rotation des secrets ;
- certificats appareils ;
- révocation ;
- journalisation ;
- limitation de débit ;
- détection de fraude ;
- durée de session adaptée au terrain.

## 42. API et webhooks

API minimales :

```text
POST /fleet/vehicles
GET /fleet/vehicles/:id
POST /fleet/credentials
POST /fleet/fuel/authorizations
POST /fleet/fuel/transactions
POST /fleet/access/authorize
POST /fleet/access/events
GET /fleet/accounts/:id/usage
GET /fleet/reports
```

Webhooks possibles :

```text
fleet.vehicle.updated
fleet.credential.revoked
fuel.authorization.created
fuel.transaction.completed
fuel.transaction.flagged
access.authorized
access.denied
access.manual_override
fleet.limit.reached
```

Toutes les écritures externes sont idempotentes.

## 43. Adaptateurs matériels

Interfaces recommandées :

```text
CredentialReaderAdapter
PlateRecognitionAdapter
BarrierAdapter
LocalControllerAdapter
FuelPumpAdapter
PaymentTerminalAdapter
SensorAdapter
PrinterAdapter
```

Chaque adaptateur expose des capacités et versions.

## 44. Niveaux de déploiement

Le module doit permettre un déploiement progressif :

### Niveau 1 — numérique léger

- portail ;
- badges ou QR ;
- opérateur humain ;
- enregistrement des transactions ;
- règles et facturation.

### Niveau 2 — semi-automatique

- lecteur RFID/NFC ;
- terminal local ;
- contrôle des règles ;
- intervention opérateur limitée ;
- intégration partielle à la pompe ou barrière.

### Niveau 3 — automatique

- identification automatique ;
- contrôleur local ;
- intégration pompe/barrière ;
- capteurs ;
- rapprochement automatique ;
- supervision distante.

Une organisation ne doit pas être obligée d’atteindre immédiatement le niveau 3.

## 45. Modèles commerciaux

Le système doit supporter au moins :

```text
SOFTWARE_ONLY
SOFTWARE_PLUS_INTEGRATION
HARDWARE_RESALE
HARDWARE_LEASE
MANAGED_SERVICE
TRANSACTION_FEE
SUBSCRIPTION
HYBRID
```

Le matériel peut être :

- acheté directement par le client ;
- fourni par un intégrateur ;
- revendu par Mansa ;
- loué dans le cadre d’un contrat séparé.

## 46. Compatibilité avec le moteur de péage

Le module réutilise des concepts communs au péage :

- RFID ;
- identification véhicule ;
- contrôleur local ;
- barrières ;
- capteurs ;
- ouverture auditée ;
- fonctionnement hors ligne ;
- règles et tarifs ;
- paiement ;
- rapprochement.

Il ne doit cependant pas être codé comme une simple variante du péage public. Le domaine flotte/station/accès reste un module privé autonome réutilisant des services communs.

## 47. Exigences de cohérence avec le péage État

Les décisions de référence du domaine péage restent inchangées :

- deux solutions initiales coexistent : péage automatique classique avec barrière et télépéage RFID avec barrière ;
- le free-flow reste une évolution ultérieure optionnelle ;
- le péage classique peut accepter billets et pièces FCFA, carte EMV multi-réseaux, NFC, carte Mansa, wallet Mansa, QR et Mobile Money selon configuration ;
- Mobile Money reste activable ou désactivable par l’administration sans suppression automatique ;
- le télépéage initial repose sur tags UHF RFID passifs, lecteur/antenne, contrôleur local, relais OPEN, barrière et capteurs ;
- le fonctionnement local sécurisé doit empêcher les doubles débits ;
- les terminaux cartes acceptent les réseaux activés par l’acquéreur, notamment Visa et Mastercard lorsqu’ils sont contractuellement disponibles ;
- le matériel reste multi-fournisseurs ;
- plusieurs niveaux d’équipement et un déploiement progressif sont prévus ;
- le matériel peut être acheté par l’État/concessionnaire ou fourni/intégré/revendu par Mansa ;
- la marque blanche est supportée ;
- les ouvertures manuelles sont auditées et rapprochées avec le passage physique.

## 48. Tests minimaux

Tests obligatoires :

- véhicule autorisé ;
- véhicule bloqué ;
- badge perdu ;
- mauvais carburant ;
- dépassement de plafond ;
- ravitaillement offline ;
- resynchronisation ;
- événement dupliqué ;
- pompe indisponible ;
- ouverture barrière refusée ;
- ouverture manuelle ;
- plaque différente du tag ;
- abonnement parking expiré ;
- visiteur expiré ;
- changement de règle avec date d’effet ;
- révocation immédiate ;
- indisponibilité d’un fournisseur ;
- reprise après redémarrage du contrôleur local.

## 49. Critères d’acceptation

Le module est considéré prêt fonctionnellement lorsque :

1. une entreprise peut créer une flotte et ses règles ;
2. un véhicule peut être identifié par au moins un support ;
3. une station peut demander une autorisation et enregistrer un ravitaillement ;
4. les plafonds et restrictions sont appliqués ;
5. les transactions sont rapprochées ;
6. un parking ou site peut gérer des droits d’accès ;
7. une barrière peut être pilotée via un adaptateur ;
8. les opérations offline se resynchronisent sans doublon ;
9. les ouvertures manuelles sont auditables ;
10. les données restent isolées par organisation ;
11. les portails exposent les rapports essentiels ;
12. aucun fournisseur matériel unique n’est imposé.

## 50. Extensions futures

Extensions possibles :

- recharge de véhicules électriques ;
- télématique et données CAN via partenaires ;
- maintenance prédictive ;
- réservation de bornes ;
- badges interopérables multi-réseaux ;
- péage privé d’entreprise ;
- accès chantier ;
- gestion de cour logistique ;
- intégration assurance flotte ;
- optimisation IA des consommations ;
- scoring écologique ;
- gestion des émissions carbone.

Ces extensions doivent rester modulaires et ne pas remettre en cause les principes définis dans ce document.
