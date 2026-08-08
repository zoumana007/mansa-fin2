# Cahier des charges — Paiement de factures, services essentiels, airtime et bundles Mansa

## 1. Objet

Ce document définit le module Mansa de paiement de factures et de services essentiels. Il couvre les paiements vers des fournisseurs externes tels que l’électricité, l’eau, les télécommunications, Internet, télévision, énergie prépayée, recharges de crédit téléphonique et forfaits data, ainsi que d’autres créanciers ou opérateurs intégrés.

L’objectif est de permettre à un particulier, une entreprise, un agent ou un commerçant autorisé de consulter, payer ou recharger un service depuis Mansa, sans transformer Mansa en système métier du fournisseur. Mansa orchestre la recherche de facture, le calcul des frais, le paiement, la confirmation, la remise de preuve, le rapprochement et les notifications.

## 2. Principes non négociables

1. Mansa ne doit jamais marquer une facture comme réglée sans confirmation fiable du fournisseur ou d’un partenaire de paiement habilité.
2. Le ledger Mansa et la dette du fournisseur restent deux domaines distincts, corrélés par références idempotentes.
3. Aucun secret fournisseur, token de production ou identifiant sensible n’est stocké dans Git.
4. Les intégrations sont multi-fournisseurs et encapsulées derrière des adaptateurs.
5. Les montants financiers sont stockés en unités mineures entières, jamais en flottants.
6. Les frais, commissions, taxes et remises sont versionnés et expliqués avant confirmation.
7. Les environnements Démo, Recette et Production sont strictement séparés.
8. Une panne externe ne doit pas provoquer de double débit.
9. Toute opération financière doit être idempotente, traçable et rapprochable.
10. Les moyens de paiement réellement disponibles sont déterminés par la configuration, les partenaires et le pays ; Mansa ne prétend pas supporter un fournisseur sans intégration validée.
11. Un paiement réussi côté Mansa mais non confirmé côté fournisseur doit entrer dans un état de rapprochement, jamais être silencieusement considéré comme terminé.
12. Les remboursements et annulations suivent les capacités réelles du fournisseur et les règles contractuelles.

## 3. Cas d’usage couverts

Le module doit pouvoir prendre en charge notamment :

- facture d’électricité postpayée ;
- compteur électrique prépayé avec génération de token lorsque le fournisseur le supporte ;
- facture d’eau ;
- recharge crédit téléphonique ;
- achat de forfait voix, SMS ou data ;
- Internet fixe ou mobile ;
- télévision payante ;
- abonnement numérique ou service récurrent externe ;
- gaz ou énergie lorsque disponible ;
- frais d’un opérateur de transport ou service privé lorsque la logique relève d’une facture externe ;
- paiement d’une référence client ou contrat ;
- paiement pour un tiers ;
- paiement en point de vente ou chez un agent Mansa ;
- paiement d’entreprise en masse, sous contrôle ;
- programmation de rappels et, lorsque autorisé, paiement automatique.

## 4. Hors périmètre

Ce module ne remplace pas :

- le système de facturation interne d’un fournisseur ;
- les systèmes de comptage physique d’eau ou d’électricité ;
- le BSS/OSS d’un opérateur télécom ;
- le moteur fiscal d’une administration ;
- les systèmes de paiement scolaire déjà couverts par le module Secteur public ;
- le moteur de facturation Commerce Mansa ;
- le moteur d’abonnement Mansa lorsqu’il s’agit d’un abonnement émis directement par Mansa.

Le module peut toutefois s’intégrer à ces systèmes via API, fichiers, webhooks ou connecteurs partenaires.

## 5. Architecture logique

```text
Client / Commerce / Agent / Portail Entreprise
                 |
          Bill Payment API
                 |
      Bill Payment Orchestrator
      /          |            \
Biller       Payment       Reconciliation
Registry     Orchestrator      Engine
   |              |              |
Biller Adapter   Ledger      Settlement
   |
Fournisseur / Agrégateur / Opérateur
```

Les adaptateurs de fournisseurs doivent rester découplés du domaine de paiement Mansa.

## 6. Modèle minimal

```text
Biller
BillerService
BillerProduct
BillerChannel
BillerAdapter
BillerAccountReference
BillInquiry
Bill
BillLine
BillPaymentOrder
BillPaymentAttempt
BillPaymentConfirmation
BillPaymentReceipt
TopupOrder
TopupProduct
UtilityToken
AutoPayMandate
BillReminder
BillerFeeRule
BillerCommissionRule
BillerSettlement
BillerReconciliationItem
BillerDispute
BillerAuditEvent
```

## 7. Registre des fournisseurs

Chaque `Biller` contient au minimum :

- identifiant Mansa ;
- nom public ;
- pays ;
- catégorie ;
- statut ;
- partenaire ou connexion technique ;
- modes de recherche supportés ;
- produits disponibles ;
- devises ;
- limites ;
- canaux autorisés ;
- politique de frais ;
- politique de remboursement ;
- SLA attendu ;
- état opérationnel.

Statuts :

```text
DRAFT
TESTING
ACTIVE
DEGRADED
SUSPENDED
RETIRED
```

Un fournisseur ne doit apparaître comme disponible au client que s’il est actif pour le pays, le canal et l’environnement concernés.

## 8. Catégories de fournisseurs

```text
ELECTRICITY
WATER
TELECOM_AIRTIME
TELECOM_DATA
INTERNET
TV
GAS
ENERGY
TRANSPORT
EDUCATION_EXTERNAL
HOUSING
INSURANCE_EXTERNAL
SUBSCRIPTION_EXTERNAL
OTHER_BILLER
```

Ces catégories servent à l’UX, au reporting et au paramétrage ; elles ne doivent pas imposer seules les règles financières.

## 9. Adaptateurs fournisseurs

Interface logique recommandée :

```text
BillerAdapter
- healthCheck()
- validateReference()
- inquiry()
- quote()
- pay()
- confirm()
- status()
- cancel()        // si supporté
- refund()        // si supporté
- listProducts()  // si supporté
- purchaseTopup() // si supporté
```

Chaque capacité doit être déclarée explicitement.

Un adaptateur ne doit jamais simuler une capacité que le fournisseur ne supporte pas.

## 10. Modes d’intégration

Les fournisseurs peuvent être connectés par :

```text
DIRECT_API
AGGREGATOR_API
BANK_PARTNER_API
MOBILE_MONEY_PARTNER
FILE_EXCHANGE
SFTP_BATCH
WEBHOOK
MANUAL_RECONCILIATION_CONTROLLED
OTHER_APPROVED_CONNECTOR
```

Le mode manuel doit rester exceptionnel, audité et inadapté aux confirmations temps réel.

## 11. Référence client

Une facture ou recharge peut être identifiée par :

- numéro client ;
- numéro de compteur ;
- numéro de contrat ;
- numéro de téléphone ;
- numéro d’abonné ;
- référence de facture ;
- identifiant de terminal ;
- identifiant externe fourni par le partenaire.

La donnée saisie doit être normalisée et validée avant paiement.

Lorsque possible, le nom ou un indice du titulaire doit être retourné afin de réduire les erreurs, tout en minimisant l’exposition de données personnelles.

## 12. Recherche de facture

Flux recommandé :

1. choix du fournisseur ;
2. saisie de la référence ;
3. validation locale du format ;
4. requête `inquiry` ;
5. affichage du fournisseur, du compte, du montant et de l’échéance ;
6. affichage des frais et du total ;
7. choix du moyen de paiement ;
8. confirmation ;
9. paiement ;
10. confirmation fournisseur ;
11. reçu.

Une réponse d’inquiry doit être horodatée et posséder une durée de validité.

## 13. Types de facture

```text
FIXED_AMOUNT
VARIABLE_AMOUNT
PARTIAL_ALLOWED
FULL_ONLY
PREPAID_PURCHASE
PRODUCT_CATALOG
OPEN_AMOUNT_WITH_LIMITS
```

Le client ne doit pouvoir modifier le montant que lorsque le fournisseur l’autorise explicitement.

## 14. États d’une recherche

```text
CREATED
VALIDATING
FOUND
NOT_FOUND
EXPIRED
FAILED
```

Une recherche expirée doit être rafraîchie avant paiement si le fournisseur exige un montant à jour.

## 15. Ordre de paiement

`BillPaymentOrder` contient notamment :

- identifiant Mansa ;
- utilisateur ou organisation ;
- fournisseur ;
- produit ;
- référence client ;
- facture externe ;
- montant fournisseur ;
- frais ;
- taxes ;
- remise ;
- total ;
- devise ;
- moyen de paiement ;
- référence d’idempotence ;
- date de création ;
- date d’expiration ;
- statut.

## 16. États du paiement de facture

```text
DRAFT
QUOTED
PENDING_PAYMENT
PAYMENT_AUTHORIZED
PAYMENT_CAPTURED
SUBMITTING_TO_BILLER
PENDING_BILLER_CONFIRMATION
CONFIRMED
FAILED
REVERSAL_PENDING
REVERSED
REFUND_PENDING
REFUNDED
DISPUTED
EXPIRED
```

Les transitions doivent être contrôlées par machine à états.

## 17. Séparation paiement / fournisseur

Un débit Mansa réussi n’implique pas automatiquement que le fournisseur a appliqué le paiement.

Le système doit distinguer au minimum :

```text
paymentStatus
billerStatus
reconciliationStatus
```

Exemple :

```text
paymentStatus = CAPTURED
billerStatus = PENDING
reconciliationStatus = ACTION_REQUIRED
```

Cette distinction est essentielle pour éviter les faux succès.

## 18. Idempotence

Chaque demande de paiement fournisseur doit posséder :

- `clientRequestId` ;
- `mansaPaymentOrderId` ;
- `providerRequestId` si disponible ;
- référence d’idempotence stable ;
- empreinte des champs critiques.

Une répétition réseau ne doit jamais créer deux débits ni deux achats de recharge.

## 19. Moyens de paiement

Selon le pays et les partenariats activés :

```text
MANSA_WALLET
MOBILE_MONEY
CARD
BANK_ACCOUNT
TPE
AGENT_CASH_REGISTERED
BUSINESS_BALANCE
OTHER_APPROVED_METHOD
```

Le mode espèces via agent ou commerce doit être enregistré dans le module Cash Network et rapproché ; aucun agent ne doit encaisser hors système pour déclarer ensuite arbitrairement une facture payée.

## 20. Frais et commissions

Les frais peuvent dépendre de :

- fournisseur ;
- produit ;
- pays ;
- montant ;
- moyen de paiement ;
- canal ;
- segment client ;
- contrat commercial ;
- promotion ;
- période.

Les frais doivent être affichés avant confirmation.

Les commissions d’agent ou de commerçant sont gérées par le moteur de commissions Mansa et ne doivent pas être codées en dur dans les adaptateurs.

## 21. Airtime

Pour les recharges téléphoniques, le module doit permettre :

- choix opérateur ;
- numéro de téléphone ;
- détection opérateur facultative ;
- montants prédéfinis ;
- montant libre si autorisé ;
- achat pour soi ;
- achat pour un tiers ;
- confirmation du numéro ;
- reçu numérique ;
- suivi de statut.

Le système ne doit pas supposer qu’un numéro appartient à un opérateur uniquement à partir du préfixe lorsque la portabilité rend cette déduction non fiable.

## 22. Forfaits data, voix et SMS

Un `TopupProduct` peut représenter :

- data ;
- voix ;
- SMS ;
- mix ;
- international ;
- social pass ;
- nuit/week-end ;
- autre produit opérateur.

Chaque produit contient :

- code fournisseur ;
- libellé ;
- prix ;
- devise ;
- volume ou avantage ;
- durée de validité ;
- conditions ;
- état ;
- date de dernière synchronisation.

Le catalogue doit pouvoir être actualisé dynamiquement.

## 23. Électricité prépayée

Lorsqu’un opérateur supporte les compteurs prépayés, Mansa doit pouvoir gérer :

1. saisie du numéro compteur ;
2. validation ;
3. saisie du montant ;
4. calcul frais/taxes ;
5. paiement ;
6. demande au fournisseur ;
7. réception du token ;
8. stockage sécurisé de la preuve ;
9. affichage et notification du token ;
10. possibilité de retrouver le token dans l’historique.

Le token doit être traité comme une donnée métier sensible : visible uniquement aux utilisateurs autorisés, sans exposition inutile dans les logs.

## 24. UtilityToken

Champs recommandés :

```text
UtilityToken
- id
- billPaymentOrderId
- billerId
- meterReference
- tokenMasked
- tokenEncrypted
- tokenType
- issuedAt
- expiresAt?
- retrievalCount
- status
```

Le token complet doit être chiffré au repos si sa conservation est nécessaire.

## 25. Paiement de facture postpayée

Pour une facture postpayée, Mansa doit afficher lorsque disponible :

- titulaire ou indice de titulaire ;
- période ;
- montant dû ;
- montant minimum ;
- arriérés ;
- pénalités ;
- date limite ;
- référence facture ;
- devise.

Ces données proviennent du fournisseur et ne doivent pas être recalculées arbitrairement par Mansa.

## 26. Paiement partiel

Si le fournisseur l’autorise :

- seuil minimum ;
- montant maximum ;
- nombre de paiements ;
- solde après paiement ;
- règles de pénalité ;
- ordre d’affectation.

Mansa doit se conformer aux règles retournées par le fournisseur.

## 27. Paiement pour un tiers

L’utilisateur peut enregistrer des bénéficiaires tels que :

- compteur familial ;
- numéro de téléphone d’un proche ;
- abonnement TV ;
- facture d’un logement ;
- contrat d’entreprise.

Un bénéficiaire sauvegardé contient uniquement les données nécessaires et peut être renommé localement par l’utilisateur.

## 28. Favoris

Le client peut enregistrer :

- fournisseur ;
- référence ;
- libellé personnel ;
- canal préféré ;
- rappel ;
- autopay si autorisé.

La suppression d’un favori ne supprime jamais l’historique financier correspondant.

## 29. Rappels

`BillReminder` peut être déclenché :

- à date fixe ;
- avant échéance ;
- après nouvelle facture détectée ;
- sur estimation de récurrence ;
- après échec de paiement.

Les notifications utilisent le système omnicanal Mansa et respectent les préférences utilisateur.

## 30. Paiement automatique

Un `AutoPayMandate` doit être explicite et révocable.

Il contient :

- fournisseur ;
- référence ;
- moyen de paiement autorisé ;
- plafond par paiement ;
- plafond mensuel ;
- règle de montant ;
- date de début ;
- date de fin facultative ;
- consentement ;
- état.

États :

```text
DRAFT
ACTIVE
PAUSED
REVOKED
EXPIRED
```

Aucun prélèvement automatique ne doit être créé par défaut sans consentement explicite.

## 31. Entreprises

Le portail Entreprises peut permettre :

- gestion de références de factures ;
- centres de coût ;
- budgets par service ;
- approbation à plusieurs niveaux ;
- paiement groupé ;
- délégation ;
- export comptable ;
- reporting ;
- limites ;
- rapprochement.

Un paiement en masse doit être traité comme une collection d’ordres indépendants pour éviter qu’un échec fournisseur rende le lot opaque.

## 32. Agents et commerces

Un agent ou commerce autorisé peut effectuer une facture pour un client selon ses permissions.

Flux :

1. sélectionner service ;
2. saisir référence ;
3. afficher identité minimale et montant ;
4. encaisser via canal autorisé ;
5. soumettre au fournisseur ;
6. remettre reçu ;
7. créditer commission selon règle.

Toute opération doit être rattachée à l’agent, au terminal et au point de service.

## 33. Mode hors ligne

Les paiements de factures qui nécessitent une confirmation fournisseur ne peuvent pas être déclarés définitivement réussis hors ligne.

Le mode dégradé peut permettre :

- préparation d’une demande ;
- enregistrement d’une référence ;
- consultation d’un catalogue en cache borné ;
- impression d’une référence de demande ;
- mise en file signée si le contrat fournisseur l’autorise.

Il ne doit jamais générer un faux token d’électricité, une fausse recharge ou une fausse confirmation.

## 34. Timeouts et statut inconnu

Lorsqu’une requête expire après débit potentiel :

```text
UNKNOWN_PROVIDER_STATUS
```

Le système doit :

1. ne pas retenter aveuglément ;
2. interroger `status()` avec la même référence ;
3. utiliser webhook si disponible ;
4. rapprocher les fichiers de règlement ;
5. escalader si le statut reste inconnu.

## 35. Reversal

Si le paiement Mansa a été capturé mais que le fournisseur refuse définitivement l’opération, le système doit déclencher selon politique :

- annulation avant règlement ;
- reversal ledger ;
- remboursement ;
- crédit compensatoire contrôlé.

Toute correction conserve la transaction d’origine.

## 36. Reçus

Le reçu doit pouvoir contenir :

- référence Mansa ;
- fournisseur ;
- service ;
- référence client masquée si nécessaire ;
- montant ;
- frais ;
- total ;
- date ;
- statut ;
- référence fournisseur ;
- token prépayé lorsque pertinent et autorisé ;
- QR de vérification si applicable.

Un reçu `PENDING` doit être clairement distingué d’un reçu `CONFIRMED`.

## 37. Notifications

Événements recommandés :

```text
BILL_FOUND
BILL_DUE_SOON
PAYMENT_INITIATED
PAYMENT_PENDING
PAYMENT_CONFIRMED
PAYMENT_FAILED
REVERSAL_COMPLETED
REFUND_COMPLETED
TOPUP_DELIVERED
UTILITY_TOKEN_ISSUED
AUTOPAY_EXECUTED
AUTOPAY_FAILED
```

Les SMS contenant des tokens ou références sensibles doivent suivre une politique de minimisation.

## 38. Webhooks fournisseurs

Les webhooks entrants doivent être :

- authentifiés ;
- signés lorsque possible ;
- protégés contre replay ;
- idempotents ;
- journalisés ;
- corrélés par référence ;
- traités asynchronement.

Un webhook ne doit pas pouvoir modifier directement le ledger sans validation du domaine paiement.

## 39. Rapprochement

Le rapprochement doit comparer au minimum :

```text
Mansa Payment Order
Mansa Ledger Transaction
Provider Transaction
Provider Settlement Record
Partner Bank / Aggregator Settlement
```

Anomalies :

```text
MISSING_PROVIDER_TX
MISSING_MANSA_TX
AMOUNT_MISMATCH
STATUS_MISMATCH
DUPLICATE_PROVIDER_TX
DUPLICATE_MANSA_TX
SETTLEMENT_MISMATCH
UNKNOWN_REFERENCE
```

## 40. Règlement fournisseur

Selon le contrat, le fournisseur peut être réglé :

- en temps réel ;
- préfinancé ;
- net en fin de journée ;
- brut ;
- net de commission ;
- via banque partenaire ;
- via agrégateur.

Les comptes de cantonnement, settlement et trésorerie utilisent les modules Finance et Trésorerie existants.

## 41. Gestion de liquidité préfinancée

Certains agrégateurs ou opérateurs imposent un solde préfinancé.

Mansa doit pouvoir surveiller :

- solde disponible ;
- seuil d’alerte ;
- consommation ;
- recharge du compte technique ;
- rapprochement ;
- suspension préventive d’un service si le solde devient insuffisant.

Aucun solde fournisseur ne doit être confondu avec le solde wallet d’un client.

## 42. Tarifs et versions

Les changements fournisseur doivent être versionnés :

- frais ;
- commission ;
- prix produit ;
- taxes ;
- limites ;
- disponibilité ;
- SLA ;
- date d’effet.

Une transaction garde la version appliquée lors de son exécution.

## 43. Limites

Limites possibles :

```text
MIN_AMOUNT
MAX_AMOUNT
DAILY_AMOUNT
MONTHLY_AMOUNT
DAILY_COUNT
PER_REFERENCE_LIMIT
PER_USER_LIMIT
PER_AGENT_LIMIT
```

Les limites peuvent provenir de Mansa, du fournisseur, de la réglementation ou du partenaire de paiement. La règle la plus restrictive applicable doit être respectée.

## 44. Risque et fraude

Le moteur de risque doit pouvoir détecter :

- recharges répétées rapides ;
- montants inhabituels ;
- nombreux numéros distincts ;
- agent effectuant des opérations anormales ;
- références fournisseurs invalides répétées ;
- paiement en boucle sur même compte ;
- divergences de statut ;
- abus de promotions ;
- contournement de limites.

Les règles de risque ne doivent pas bloquer silencieusement : un code de décision doit être conservé.

## 45. KYC et conformité

Le niveau KYC requis peut dépendre :

- du montant ;
- du canal ;
- du pays ;
- du fournisseur ;
- du moyen de paiement ;
- du volume cumulé.

Les contrôles KYC/KYB utilisent le module conformité Mansa existant.

## 46. Sécurité

Exigences minimales :

- TLS pour les connexions ;
- stockage chiffré des secrets via gestionnaire de secrets ;
- rotation des credentials ;
- RBAC ;
- audit ;
- masquage des références sensibles ;
- chiffrement des tokens utilitaires lorsque conservés ;
- aucune donnée carte sensible dans les logs ;
- séparation des tenants ;
- validation stricte des entrées fournisseur.

## 47. Observabilité

Métriques :

- taux de succès par fournisseur ;
- latence inquiry ;
- latence paiement ;
- taux de statut inconnu ;
- reversals ;
- remboursements ;
- erreurs techniques ;
- volume et valeur ;
- disponibilité fournisseur ;
- solde préfinancé ;
- anomalies de rapprochement.

Alertes par fournisseur et environnement.

## 48. SLA et circuit breaker

Si un fournisseur est instable :

- circuit breaker ;
- backoff ;
- file asynchrone ;
- désactivation temporaire contrôlée ;
- bannière dans l’UX ;
- alternative si disponible.

Le système ne doit pas multiplier les tentatives financières en cas de panne.

## 49. UX client

L’interface doit présenter clairement :

- fournisseur ;
- référence ;
- titulaire ou indice si disponible ;
- montant ;
- frais ;
- total ;
- moyen de paiement ;
- statut final.

Pour les numéros de téléphone et compteurs, une étape de confirmation visuelle doit réduire les erreurs de saisie.

## 50. Historique

Le client doit retrouver :

- date ;
- fournisseur ;
- montant ;
- référence ;
- statut ;
- reçu ;
- token prépayé si applicable ;
- possibilité de recommencer une opération avec confirmation des données actuelles.

Rejouer une opération historique doit créer un nouvel ordre ; jamais réutiliser la transaction passée.

## 51. Recherche et support

Le support autorisé peut rechercher par :

- ID Mansa ;
- référence fournisseur ;
- référence client masquée ;
- utilisateur ;
- agent ;
- date ;
- montant ;
- statut.

Les données affichées dépendent du rôle et du tenant.

## 52. Litiges

Un litige peut porter sur :

- débit sans fourniture ;
- mauvais numéro ;
- token non reçu ;
- fournisseur indiquant impayé ;
- double débit ;
- recharge incorrecte ;
- remboursement absent.

Les preuves doivent regrouper événements Mansa, provider references, ledger, webhooks, statuts et rapprochement.

## 53. API internes

Exemples :

```text
GET  /billers
GET  /billers/{id}/products
POST /bill-inquiries
POST /bill-payment-orders
POST /bill-payment-orders/{id}/confirm
GET  /bill-payment-orders/{id}
POST /topups
GET  /topups/{id}
POST /autopay-mandates
PATCH /autopay-mandates/{id}
GET  /bill-reminders
```

Toutes les écritures financières nécessitent idempotency key.

## 54. Événements de domaine

```text
BillerActivated
BillInquiryCompleted
BillPaymentOrderCreated
BillPaymentCaptured
BillSubmittedToProvider
BillPaymentConfirmed
BillPaymentFailed
BillPaymentUnknown
BillPaymentReversed
TopupDelivered
UtilityTokenIssued
AutoPayMandateCreated
AutoPayExecuted
ReconciliationMismatchDetected
```

Les consommateurs doivent être idempotents.

## 55. Tests

Tests minimum :

- facture trouvée ;
- facture inexistante ;
- facture expirée ;
- paiement réussi ;
- timeout après débit ;
- retry avec même idempotency key ;
- refus fournisseur ;
- reversal ;
- achat airtime ;
- mauvais numéro ;
- catalogue data ;
- token électricité ;
- webhook dupliqué ;
- rapprochement mismatch ;
- fournisseur indisponible ;
- paiement agent ;
- autopay plafond dépassé ;
- isolation multi-tenant.

## 56. Multi-pays

Chaque pays peut avoir :

- fournisseurs différents ;
- devises ;
- limites ;
- agrégateurs ;
- règles KYC ;
- taxes ;
- moyens de paiement ;
- produits télécom ;
- langues.

Le code métier ne doit pas contenir de règles nationales codées en dur lorsqu’elles peuvent être configurées.

## 57. Déploiement progressif

Ordre recommandé :

1. sandbox avec MockBillerAdapter ;
2. premier fournisseur ou agrégateur ;
3. inquiry + paiement ;
4. rapprochement ;
5. airtime ;
6. bundles ;
7. électricité prépayée ;
8. rappels ;
9. autopay ;
10. paiements entreprise et agents à grande échelle.

Le lancement peut commencer avec quelques fournisseurs sans attendre la couverture de tout le pays.

## 58. MockBillerAdapter

Pour le développement local, un adaptateur mock doit simuler :

- facture trouvée ;
- facture non trouvée ;
- succès ;
- échec ;
- timeout ;
- succès différé ;
- webhook ;
- token prépayé fictif ;
- catalogue airtime/data ;
- mismatch de rapprochement.

Aucun appel payant ou fournisseur réel n’est nécessaire en environnement local.

## 59. Administration

Les administrateurs autorisés doivent pouvoir :

- activer/désactiver un fournisseur ;
- activer par pays ;
- configurer canal ;
- configurer frais ;
- configurer commissions ;
- définir limites ;
- voir santé ;
- voir anomalies ;
- suspendre une intégration ;
- basculer un adaptateur après validation ;
- auditer les changements.

Toute modification financière ou d’activation doit être auditée avec date d’effet.

## 60. Critères d’acceptation

Le module est prêt pour une intégration fournisseur lorsque :

- le registre des billers existe ;
- les adaptateurs sont abstraits ;
- inquiry et paiement sont idempotents ;
- le ledger est séparé du statut fournisseur ;
- les états inconnus sont gérés ;
- le rapprochement existe ;
- les frais sont versionnés ;
- les reçus distinguent pending et confirmed ;
- les webhooks sont sécurisés ;
- un MockBillerAdapter permet les tests locaux ;
- les opérations sont auditables ;
- aucun secret de production n’est présent dans le dépôt.

## 61. Positionnement dans Mansa

Ce module complète Wallet, Payments, Cash Network, Commerce, Entreprises, Notifications, Risk, KYC, Finance et Trésorerie. Il permet à Mansa de devenir un point d’accès unifié aux paiements du quotidien — électricité, eau, télécom, Internet et autres services — tout en conservant une architecture multi-fournisseurs, traçable et compatible avec un déploiement progressif au Mali puis dans d’autres pays.
