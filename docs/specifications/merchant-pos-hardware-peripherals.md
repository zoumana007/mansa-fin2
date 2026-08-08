# Cahier des charges — Matériel de caisse et périphériques POS multi-fournisseurs Mansa

## 1. Objet

Ce document complète le module Commerce, catalogue, stock et point de vente Mansa en définissant la couche matérielle d’un poste de caisse moderne : tablette ou écran tactile, terminal de paiement, imprimante, tiroir-caisse, scanner, balance, afficheur client, écran cuisine et autres périphériques.

L’objectif est que Mansa fournisse principalement le logiciel, l’orchestration et les adaptateurs, sans imposer une marque unique de matériel. Une boulangerie, un restaurant, une station-service, une boutique, un supermarché ou une entreprise doit pouvoir déployer Mansa sur du matériel compatible acheté directement ou fourni/intégré par Mansa.

## 2. Principes non négociables

1. Mansa ne dépend d’aucun constructeur unique de caisse, tablette, imprimante ou terminal.
2. Les périphériques sont encapsulés derrière des adaptateurs documentés.
3. Les données carte sensibles restent dans le domaine monétique certifié ; le POS commerce ne stocke jamais PAN complet, PIN ou cryptogramme.
4. Une vente commerciale et son paiement restent deux objets corrélés mais distincts.
5. Les équipements et capacités sont découverts/configurés par point de vente.
6. Une panne d’un périphérique non critique ne doit pas bloquer inutilement toute la caisse.
7. Les actions sensibles, ouvertures manuelles et changements de configuration sont audités.
8. Le fonctionnement dégradé doit être explicite, borné et resynchronisable.
9. Démo, Recette et Production sont séparés.
10. Aucun secret de production n’est stocké dans Git.

## 3. Cas d’usage

Le module doit couvrir au minimum :

- boulangerie et pâtisserie ;
- café et restauration rapide ;
- restaurant avec commandes et cuisine ;
- commerce de détail ;
- supermarché et supérette ;
- pharmacie ou commerce spécialisé lorsque réglementairement permis ;
- station-service côté boutique et encaissement ;
- billetterie ou guichet ;
- caisse mobile ou pop-up ;
- point de vente temporaire lors d’un événement.

## 4. Architecture logique

```text
Mansa Commerce / POS UI
        |
POS Orchestrator
        |
Device Abstraction Layer
        |
+ PrinterAdapter
+ ScannerAdapter
+ CashDrawerAdapter
+ ScaleAdapter
+ CustomerDisplayAdapter
+ PaymentTerminalAdapter
+ KitchenDisplayAdapter
+ NFCReaderAdapter
+ OtherDeviceAdapter
        |
Matériel multi-fournisseurs
```

Le domaine Commerce ne doit pas contenir de logique propriétaire d’un fabricant lorsque celle-ci peut être isolée dans un adaptateur.

## 5. Modèle minimal

```text
PosWorkstation
PosDevice
DeviceCapability
DeviceAdapter
DeviceBinding
DeviceHealth
PeripheralEvent
PrintJob
CashDrawerEvent
ScanEvent
ScaleReading
CustomerDisplaySession
PaymentTerminalBinding
KitchenDisplayEndpoint
LocalPosController
PosHardwareAuditEvent
```

## 6. Poste de caisse

Un `PosWorkstation` représente une caisse physique ou logique et contient notamment :

- organisation ;
- établissement ;
- point de vente ;
- identifiant du poste ;
- terminal principal ;
- périphériques associés ;
- opérateurs autorisés ;
- capacités disponibles ;
- version logicielle ;
- état réseau ;
- dernière synchronisation ;
- politique offline ;
- statut.

États :

```text
PROVISIONING
ACTIVE
DEGRADED
MAINTENANCE
SUSPENDED
RETIRED
```

## 7. Formats matériels

Mansa doit pouvoir fonctionner selon plusieurs configurations :

### 7.1 Tablette légère

- tablette Android/iPad ou matériel compatible ;
- support de comptoir ;
- TPE séparé ;
- imprimante facultative ;
- scanner caméra ou externe.

### 7.2 Caisse tout-en-un

- écran tactile ;
- ordinateur intégré ;
- imprimante ;
- tiroir-caisse ;
- scanner ;
- afficheur client facultatif.

### 7.3 TPE intelligent

Pour les petits commerces, un terminal Android compatible peut assurer caisse simplifiée et paiement, selon les certifications et capacités du fournisseur.

### 7.4 Poste multi-écrans

Pour restauration, grande distribution ou points de vente complexes : écran opérateur, écran client, écran cuisine ou préparation, scanners et imprimantes multiples.

## 8. Connexions périphériques

Les adaptateurs peuvent supporter selon le matériel :

```text
USB
USB_HID
BLUETOOTH
BLUETOOTH_LE
ETHERNET
WIFI_LAN
SERIAL
TCP_IP
VENDOR_SDK
WEB_API
LOCAL_SERVICE
CLOUD_CONNECTOR
```

La compatibilité doit être déclarée explicitement ; Mansa ne doit jamais prétendre qu’un périphérique est compatible sans adaptateur testé.

## 9. Imprimantes tickets

Le système doit gérer :

- ticket client ;
- duplicata marqué comme tel ;
- reçu de retour ;
- bon de préparation ;
- rapport de caisse ;
- QR et code-barres lorsque supportés ;
- largeur et format configurables ;
- plusieurs imprimantes par poste ;
- routage par catégorie en restauration.

Un `PrintJob` possède identifiant, type, destination, contenu rendu, statut, nombre de tentatives et référence métier.

États :

```text
QUEUED
PRINTING
PRINTED
FAILED
CANCELLED
```

Une réimpression doit être auditée lorsque le document est sensible.

## 10. Tiroir-caisse

Le tiroir peut être piloté via imprimante, interface dédiée ou contrôleur compatible.

Ouvertures autorisées :

- vente espèces ;
- remboursement espèces ;
- ouverture de session ;
- clôture/comptage ;
- dépôt ou retrait de caisse autorisé ;
- ouverture manuelle avec permission.

Chaque ouverture manuelle doit enregistrer opérateur, poste, heure, motif et autorisation.

## 11. Scanner codes-barres et QR

Le scanner peut être intégré, USB HID, Bluetooth ou caméra.

Le scan peut servir à :

- ajouter un article ;
- rechercher un produit ;
- lire une carte fidélité ;
- lire un bon ou coupon ;
- identifier une commande ;
- scanner un QR de paiement via le module approprié.

Une donnée scannée est une entrée non fiable et doit être validée avant toute action financière.

## 12. Balance

Pour les commerces vendant au poids, le système peut intégrer une balance compatible.

Chaque lecture doit inclure :

- valeur ;
- unité ;
- appareil ;
- horodatage ;
- stabilité de mesure si exposée ;
- référence du produit ou de la ligne de vente.

Les obligations métrologiques locales restent applicables et Mansa ne doit pas déclarer une balance légalement certifiée sans preuve du fournisseur/exploitant.

## 13. Afficheur client

L’écran client peut afficher :

- articles ;
- quantités ;
- prix ;
- remises ;
- total ;
- état du paiement ;
- QR lorsque pertinent ;
- fidélité ;
- reçu numérique ;
- contenu promotionnel configuré.

Aucune donnée personnelle d’un client précédent ne doit rester visible après clôture de session.

## 14. Terminal de paiement

Le terminal de paiement est lié au poste par un `PaymentTerminalBinding`.

Modes d’intégration possibles :

```text
SEMI_INTEGRATED
SMARTPOS_SDK
LOCAL_API
CLOUD_TERMINAL_API
STANDALONE_REFERENCED
```

Flux recommandé :

1. le POS calcule la vente ;
2. le serveur valide le montant ;
3. Mansa envoie une demande au connecteur monétique ;
4. le terminal effectue l’interaction carte/NFC ;
5. l’acquéreur renvoie le résultat ;
6. Mansa corrèle paiement et vente ;
7. le POS finalise la vente ;
8. le reçu est généré.

Le terminal doit accepter uniquement les réseaux activés par l’acquéreur et contractuellement disponibles, notamment Visa et Mastercard lorsqu’ils sont activés. Aucune garantie « toutes les cartes du monde » n’est autorisée.

## 15. Écran cuisine / préparation

Pour restauration et métiers de préparation, Mansa peut fournir un `KitchenDisplayEndpoint`.

Une commande peut être routée par station :

```text
KITCHEN
BAR
BAKERY
DESSERT
PACKAGING
OTHER
```

États de préparation :

```text
NEW
ACCEPTED
PREPARING
READY
SERVED
CANCELLED
```

Les modifications après lancement en préparation doivent être visibles et auditées.

## 16. Imprimantes cuisine

En alternative ou complément au KDS, des bons peuvent être imprimés automatiquement selon :

- catégorie ;
- station ;
- emplacement ;
- type de commande ;
- disponibilité du KDS.

Une panne d’imprimante cuisine doit générer une alerte visible et permettre un reroutage configuré.

## 17. Commandes restauration

Le POS peut supporter :

```text
COUNTER
DINE_IN
TAKEAWAY
DELIVERY
PICKUP
DRIVE_THROUGH
```

Les tables, numéros de commande, noms courts de retrait et autres identifiants opérationnels doivent être configurables sans collecter inutilement des données personnelles.

## 18. Multi-périphériques

Un poste peut posséder plusieurs appareils d’un même type. Exemple :

- imprimante ticket caisse ;
- imprimante cuisine ;
- imprimante bar ;
- scanner fixe ;
- scanner portable ;
- TPE principal ;
- TPE de secours.

Les priorités et stratégies de secours sont configurables.

## 19. Découverte et association

L’installation d’un appareil suit :

1. découverte ou saisie contrôlée ;
2. identification du modèle ;
3. sélection de l’adaptateur ;
4. test de connectivité ;
5. lecture des capacités ;
6. association au tenant et au point de vente ;
7. test fonctionnel ;
8. activation ;
9. audit.

L’association d’un terminal financier peut nécessiter une procédure supplémentaire du prestataire.

## 20. Capacités

Exemples de `DeviceCapability` :

```text
PRINT_RECEIPT
PRINT_QR
OPEN_DRAWER
SCAN_1D
SCAN_2D
READ_WEIGHT
DISPLAY_CUSTOMER_CART
ACCEPT_CARD_PAYMENT
READ_NFC
DISPLAY_KITCHEN_ORDER
BEEP
OFFLINE_QUEUE
```

L’interface Mansa doit adapter les fonctionnalités à la capacité réelle du poste.

## 21. Santé des équipements

Le système doit suivre lorsque techniquement disponible :

- online/offline ;
- dernière communication ;
- erreurs ;
- papier faible/absent ;
- capot ouvert ;
- batterie ;
- température ;
- version firmware ;
- version adaptateur.

Les informations dépendent des capacités du fournisseur et ne doivent pas être inventées.

## 22. Mode dégradé

Exemples :

- imprimante HS : proposer reçu numérique ;
- écran client HS : la vente peut continuer ;
- scanner HS : recherche manuelle autorisée ;
- réseau WAN HS : appliquer la politique offline ;
- TPE HS : proposer uniquement les moyens de paiement réellement disponibles ;
- serveur local HS : basculer selon plan de continuité configuré.

Aucun mode dégradé ne doit simuler une autorisation financière inexistante.

## 23. Contrôleur local

Un `LocalPosController` facultatif peut :

- maintenir les connexions périphériques ;
- exécuter les adaptateurs locaux ;
- mettre en file les travaux d’impression ;
- maintenir un cache borné ;
- transmettre les événements ;
- surveiller les équipements ;
- fonctionner sur LAN en cas de coupure Internet selon politique.

Il ne doit jamais devenir une source de vérité financière indépendante du ledger.

## 24. Sécurité locale

Le poste doit prévoir :

- authentification opérateur ;
- verrouillage automatique ;
- chiffrement des secrets locaux ;
- permissions OS minimales ;
- signature ou intégrité des mises à jour ;
- rotation des credentials appareil ;
- révocation à distance ;
- journal d’audit ;
- aucune donnée carte sensible dans les logs.

## 25. Gestion de parc

Depuis les portails autorisés, l’organisation doit pouvoir consulter :

- postes ;
- périphériques ;
- statut ;
- établissement ;
- version ;
- dernière connexion ;
- incidents ;
- affectation ;
- date d’installation ;
- maintenance ;
- historique.

Les fonctions de MDM existantes ou partenaires peuvent être intégrées plutôt que réimplémentées.

## 26. Mises à jour

Les mises à jour d’application et d’adaptateurs doivent être :

- versionnées ;
- signées lorsque applicable ;
- déployables progressivement ;
- compatibles avec rollback lorsque techniquement possible ;
- testées en Recette avant Production ;
- observables.

Une mise à jour ne doit pas être lancée automatiquement au milieu d’une transaction active.

## 27. Multi-fournisseurs

Le catalogue de compatibilité doit distinguer :

```text
CERTIFIED
TESTED
PARTIALLY_SUPPORTED
EXPERIMENTAL
UNSUPPORTED
```

Chaque entrée peut préciser modèle, OS/firmware, connexion, fonctions testées, version adaptateur et restrictions.

## 28. Modèles commerciaux matériels

Mansa doit supporter :

1. matériel acheté directement par le commerçant auprès d’un fournisseur compatible ;
2. matériel fourni, intégré ou revendu par Mansa ou un partenaire ;
3. location/abonnement matériel si proposé contractuellement ;
4. parc mixte existant + nouveau matériel.

Le logiciel ne doit pas artificiellement bloquer un matériel compatible simplement parce qu’il n’a pas été vendu par Mansa.

## 29. Personnalisation

Selon contrat, l’expérience peut inclure :

- marque du commerçant ;
- logo ;
- ticket personnalisé ;
- écran client ;
- message d’accueil ;
- promotions ;
- thème autorisé ;
- mention facultative `Propulsé par Mansa`.

La personnalisation ne doit pas masquer les informations réglementaires obligatoires.

## 30. Anti-fraude opérationnelle

Le système doit détecter ou rendre analysables :

- ouvertures tiroir sans vente ;
- réimpressions excessives ;
- annulations répétées ;
- remises manuelles anormales ;
- remboursements inhabituels ;
- périphérique remplacé sans autorisation ;
- TPE non associé ;
- déconnexion répétée avant paiement ;
- écarts de caisse ;
- usage d’un poste hors établissement prévu.

Les alertes sont soumises aux politiques du moteur de risque.

## 31. Audit

Événements minimaux :

- ajout/retrait appareil ;
- changement d’adaptateur ;
- changement de configuration ;
- test appareil ;
- ouverture tiroir ;
- réimpression ;
- panne ;
- bascule de secours ;
- association/dissociation TPE ;
- activation du mode offline ;
- override opérateur.

## 32. API et événements

Exemples d’événements :

```text
pos.device.connected
pos.device.disconnected
pos.device.health_changed
pos.print.completed
pos.print.failed
pos.drawer.opened
pos.scan.received
pos.scale.reading
pos.customer_display.started
pos.payment_terminal.status_changed
pos.kitchen_order.updated
```

Les webhooks sont signés, rejouables de manière idempotente et soumis aux permissions du tenant.

## 33. Données et confidentialité

Le module ne collecte que les données nécessaires à l’exploitation du poste. Les télémétries doivent avoir une durée de conservation configurable. Les données clients affichées ou mises en cache localement sont minimisées et purgées selon politique.

## 34. Observabilité

Mesures utiles :

- disponibilité des postes ;
- taux d’échec impression ;
- latence périphériques ;
- taux de déconnexion ;
- échecs d’association TPE ;
- temps de préparation KDS ;
- utilisation du mode offline ;
- incidents par modèle/firmware.

## 35. Tests

La stratégie doit inclure :

- tests unitaires d’adaptateurs ;
- simulateurs matériels ;
- tests d’intégration sur appareils réels ;
- déconnexion/reconnexion ;
- panne papier ;
- double scan ;
- impression répétée ;
- coupure réseau ;
- redémarrage en transaction ;
- périphérique remplacé ;
- synchronisation après offline ;
- tests de sécurité et permissions.

## 36. Critères d’acceptation

Le module est considéré correctement spécifié lorsque :

1. un commerce peut configurer un poste sans dépendre d’une marque unique ;
2. les périphériques sont abstraits derrière des adaptateurs ;
3. imprimante, scanner, tiroir, afficheur et TPE peuvent être associés indépendamment ;
4. les capacités réelles pilotent l’interface ;
5. les pannes ont des comportements dégradés explicites ;
6. les opérations financières restent dans les modules monétiques ;
7. les actions sensibles sont auditées ;
8. le matériel peut être acheté par le client ou fourni par Mansa ;
9. les restaurants peuvent utiliser KDS ou imprimantes de préparation ;
10. les configurations sont multi-tenant, versionnées et sécurisées.

## 37. Positionnement dans Mansa

Ce module transforme le POS Mansa en plateforme matérielle ouverte. Mansa peut ainsi équiper une petite boulangerie avec une tablette et un TPE, ou un réseau plus complexe avec plusieurs caisses, écrans clients, scanners, imprimantes et écrans cuisine, tout en conservant le même backend Commerce, paiement, stock, fidélité, analytics et administration.
