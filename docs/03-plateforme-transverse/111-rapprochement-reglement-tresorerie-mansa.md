# 111 — Rapprochement, règlement et trésorerie Mansa

## 1. Objet

Ce document définit le cahier des charges du module Rapprochement, règlement et trésorerie Mansa. Il couvre la collecte des écritures financières opérationnelles, le rapprochement entre les systèmes internes et les partenaires externes, la détection des écarts, la préparation des règlements, le suivi des comptes de cantonnement ou de règlement, la gestion des suspens, la trésorerie opérationnelle, les clôtures et la production d’états de contrôle.

## 2. Objectifs

- garantir qu’une transaction Mansa est cohérente avec les écritures du partenaire correspondant ;
- identifier rapidement les écarts de montant, statut, devise, référence ou date ;
- automatiser le rapprochement lorsque les preuves sont suffisantes ;
- isoler les suspens et permettre leur résolution manuelle contrôlée ;
- préparer les règlements vers marchands, agents, partenaires et autres bénéficiaires ;
- suivre les soldes de trésorerie opérationnelle sans remplacer le ledger principal ;
- fournir une piste d’audit complète ;
- permettre la clôture quotidienne et périodique ;
- supporter plusieurs banques, opérateurs Mobile Money, processeurs cartes, réseaux et pays ;
- éviter tout ajustement financier direct sans justification, approbation et trace.

## 3. Périmètre

Le module couvre :

- ingestion de relevés et fichiers partenaires ;
- rapprochement transactionnel ;
- rapprochement agrégé ;
- gestion des écarts ;
- suspens ;
- résolution manuelle ;
- préparation des règlements ;
- lots de règlement ;
- instructions de paiement sortantes ;
- suivi d’exécution ;
- rapprochement des règlements ;
- comptes opérationnels et positions de trésorerie ;
- prévisions de liquidité ;
- clôtures ;
- reporting de contrôle ;
- audit ;
- intégrations avec Ledger, paiements, cartes, Mobile Money, marchands, agents, frais, support, fraude et analytics.

## 4. Hors périmètre

Le module ne remplace pas :

- le grand livre comptable de Mansa ;
- la comptabilité légale d’une banque ou d’un partenaire ;
- un système bancaire central ;
- un moteur de paiement ;
- un système SWIFT ou RTGS ;
- la comptabilité générale complète de l’entreprise ;
- un système de gestion d’actifs financiers.

## 5. Intégrations

Le module s’intègre avec Ledger, Wallet, paiements, transferts, cartes, QR, NFC, Mobile Money, agents, commerçants, facturation, commissions, fraude et risque, support, analytics, administration et les connecteurs bancaires ou partenaires.

## 6. Principes non négociables

1. Le rapprochement ne modifie jamais silencieusement une transaction source.
2. Toute différence est représentée comme un objet d’écart ou de suspens.
3. Toute correction financière passe par le Ledger ou le domaine financier compétent.
4. Aucun montant n’est stocké en flottant.
5. Les opérations sont idempotentes.
6. Toute action manuelle est auditée.
7. Les fichiers partenaires sont vérifiés, horodatés et historisés.
8. Les clôtures sont versionnées et reproductibles.
9. Un lot de règlement possède un état déterministe et une preuve d’exécution.
10. Les environnements Démo, Recette et Production sont strictement séparés.
11. Aucun secret bancaire ou identifiant de production n’est stocké dans le dépôt de code.
12. Les règles de rapprochement sont configurables par partenaire et versionnées.

## 7. Concepts principaux

- `ReconciliationSource`
- `ExternalStatement`
- `StatementLine`
- `ReconciliationRule`
- `ReconciliationRun`
- `ReconciliationMatch`
- `ReconciliationException`
- `SuspenseItem`
- `ResolutionAction`
- `SettlementAccount`
- `SettlementInstruction`
- `SettlementBatch`
- `SettlementTransfer`
- `SettlementConfirmation`
- `TreasuryPosition`
- `LiquidityForecast`
- `ClosingRun`
- `ClosingControl`
- `BalanceSnapshot`
- `OperationalAccount`
- `CashMovement`
- `ReconciliationAuditEvent`

## 8. Sources de rapprochement

Sources minimales :

```text
INTERNAL_LEDGER
BANK_STATEMENT
MOBILE_MONEY_STATEMENT
CARD_PROCESSOR_STATEMENT
CARD_NETWORK_REPORT
MERCHANT_SETTLEMENT_REPORT
AGENT_SETTLEMENT_REPORT
PAYMENT_PROVIDER_REPORT
MANUAL_CONTROL_FILE
```

Chaque source possède un propriétaire, un format, une fréquence, une devise, un fuseau horaire et un niveau de confiance.

## 9. Ingestion des fichiers

Les fichiers externes peuvent être reçus par API, SFTP, dépôt sécurisé, webhook ou import manuel contrôlé.

Chaque ingestion doit enregistrer :

- source ;
- partenaire ;
- période ;
- nom logique ;
- empreinte du fichier ;
- taille ;
- format ;
- date de réception ;
- auteur ou canal ;
- statut de parsing ;
- nombre de lignes ;
- totaux annoncés ;
- erreurs éventuelles.

## 10. Formats pris en charge

Le module doit pouvoir supporter de manière extensible :

```text
CSV
TSV
JSON
XML
XLSX
ISO20022
FIXED_WIDTH
CUSTOM_PARTNER_FORMAT
```

Les parseurs sont isolés derrière des adaptateurs par partenaire.

## 11. Validation d’ingestion

Avant rapprochement, le système vérifie :

- intégrité du fichier ;
- doublon ;
- cohérence de période ;
- devise ;
- structure attendue ;
- total de contrôle ;
- présence des colonnes requises ;
- format des références ;
- anomalies manifestes.

Un fichier invalide est rejeté ou mis en quarantaine sans altérer les données précédentes.

## 12. Rapprochement transactionnel

Le moteur compare des transactions unitaires internes avec des lignes externes selon une stratégie de correspondance configurée.

Critères possibles :

- identifiant partenaire ;
- référence Mansa ;
- montant ;
- devise ;
- date ;
- compte ;
- terminal ;
- commerçant ;
- type de transaction ;
- statut ;
- numéro de lot ;
- hash métier.

## 13. Règles de matching

Une `ReconciliationRule` contient :

- partenaire ;
- type de flux ;
- priorité ;
- champs obligatoires ;
- tolérance temporelle ;
- tolérance de montant si autorisée ;
- devise ;
- logique de normalisation ;
- score minimal ;
- version ;
- date d’effet.

## 14. Types de correspondance

```text
EXACT
PROBABLE
AGGREGATED
ONE_TO_MANY
MANY_TO_ONE
MANUAL
UNMATCHED
```

Une correspondance probable au-dessus d’un seuil peut être auto-validée uniquement si la politique le permet.

## 15. Rapprochement agrégé

Le système supporte les cas où un partenaire fournit des totaux plutôt que des lignes unitaires.

Dimensions possibles :

- date ;
- commerçant ;
- agent ;
- terminal ;
- banque ;
- produit ;
- devise ;
- lot ;
- canal.

Le rapprochement agrégé ne doit pas masquer les écarts unitaires lorsqu’ils sont disponibles.

## 16. États d’un run de rapprochement

```text
CREATED
INGESTING
VALIDATING
MATCHING
REVIEW_REQUIRED
COMPLETED
FAILED
CANCELLED
```

Un run est immuable après clôture ; une correction crée un nouveau run ou une révision explicitement liée.

## 17. Écarts

Types d’écarts minimaux :

```text
MISSING_INTERNAL
MISSING_EXTERNAL
AMOUNT_MISMATCH
CURRENCY_MISMATCH
STATUS_MISMATCH
DATE_MISMATCH
DUPLICATE
REFERENCE_MISMATCH
FEE_MISMATCH
SETTLEMENT_MISMATCH
UNKNOWN
```

Chaque écart possède un niveau de sévérité et une file de traitement.

## 18. Suspens

Un `SuspenseItem` représente un élément non résolu qui doit rester visible jusqu’à traitement.

Champs minimaux :

- identifiant ;
- type ;
- source ;
- montant ;
- devise ;
- références ;
- date d’origine ;
- date de détection ;
- priorité ;
- responsable ;
- SLA ;
- statut ;
- commentaire ;
- pièces justificatives.

## 19. États d’un suspens

```text
OPEN
ASSIGNED
UNDER_REVIEW
WAITING_PARTNER
WAITING_INTERNAL_ACTION
RESOLVED
WRITTEN_OFF
CANCELLED
```

## 20. Résolution manuelle

Actions autorisées :

```text
LINK_MATCH
RECLASSIFY
REQUEST_PARTNER_CONFIRMATION
CREATE_LEDGER_ADJUSTMENT_REQUEST
MARK_DUPLICATE
MARK_EXPECTED_TIMING_DIFFERENCE
WRITE_OFF_REQUEST
CLOSE_WITH_EVIDENCE
```

Aucune action manuelle ne modifie directement un solde.

## 21. Principe des quatre yeux

Les ajustements financiers, write-offs ou résolutions au-dessus d’un seuil peuvent exiger une double validation.

Le second approbateur doit être distinct du premier.

## 22. Pièces justificatives

Chaque résolution sensible peut exiger :

- relevé partenaire ;
- référence transaction ;
- échange support ;
- confirmation banque ;
- preuve de paiement ;
- rapport système ;
- commentaire structuré.

Les pièces sont conservées via le service documentaire sécurisé.

## 23. Règlement

Le règlement correspond au transfert effectif des montants dus après calcul des obligations.

Bénéficiaires possibles :

- commerçant ;
- agent ;
- banque partenaire ;
- opérateur Mobile Money ;
- processeur ;
- administration ;
- autre partenaire contractuel.

## 24. Calcul du net à régler

Le net à régler peut intégrer :

- montant brut ;
- remboursements ;
- annulations ;
- commissions ;
- frais ;
- taxes configurées ;
- réserves ;
- ajustements approuvés ;
- retenues contractuelles ;
- montant déjà réglé.

Chaque composant doit être traçable jusqu’aux transactions ou règles d’origine.

## 25. Lots de règlement

Un `SettlementBatch` regroupe des obligations compatibles selon :

- bénéficiaire ;
- devise ;
- compte de destination ;
- date de règlement ;
- partenaire ;
- pays ;
- fréquence ;
- méthode de paiement.

## 26. États d’un lot

```text
DRAFT
CALCULATED
REVIEW_REQUIRED
APPROVED
SUBMITTED
PROCESSING
PARTIALLY_COMPLETED
COMPLETED
FAILED
CANCELLED
```

## 27. Instruction de règlement

Une `SettlementInstruction` contient :

- bénéficiaire ;
- compte destination ;
- montant ;
- devise ;
- référence ;
- clé d’idempotence ;
- date souhaitée ;
- canal ;
- partenaire d’exécution ;
- lot d’origine ;
- statut ;
- preuve d’exécution.

Les comptes destination sont tokenisés ou masqués dans les vues non autorisées.

## 28. Exécution

L’exécution peut passer par banque, API partenaire, virement, Mobile Money ou autre canal autorisé.

Les connecteurs sont isolés derrière :

```text
SettlementProvider
BankTransferProvider
MobileMoneySettlementProvider
InternalSettlementProvider
```

## 29. Idempotence des règlements

Une instruction ne peut pas être exécutée deux fois à cause d’un retry.

Le système conserve :

- clé d’idempotence interne ;
- référence partenaire ;
- statut externe ;
- horodatage ;
- résultat brut archivé de façon sécurisée si nécessaire.

## 30. Confirmation de règlement

Une confirmation peut provenir d’un webhook, d’une API, d’un fichier de retour ou d’un relevé bancaire.

Elle doit être rapprochée avec l’instruction initiale avant de déclarer le règlement finalisé.

## 31. Échec de règlement

Causes possibles :

```text
INVALID_ACCOUNT
INSUFFICIENT_FUNDS
PARTNER_UNAVAILABLE
BANK_REJECTED
COMPLIANCE_HOLD
LIMIT_EXCEEDED
DUPLICATE
TECHNICAL_ERROR
UNKNOWN
```

Un échec conserve l’obligation financière en attente tant qu’elle n’est pas résolue.

## 32. Règlement partiel

Le système doit pouvoir représenter un règlement partiel sans considérer le lot comme intégralement soldé.

Le reliquat reste attaché au bénéficiaire et à la période d’origine.

## 33. Fréquences de règlement

Exemples configurables :

```text
REAL_TIME
INTRADAY
DAILY
T_PLUS_1
T_PLUS_2
WEEKLY
MONTHLY
MANUAL
```

La fréquence dépend du contrat et du partenaire.

## 34. Cut-off

Chaque canal de règlement peut posséder une heure limite, un calendrier ouvré, des jours fériés et un fuseau horaire.

Les instructions après cut-off sont planifiées pour la prochaine fenêtre éligible.

## 35. Comptes de règlement

Un `SettlementAccount` représente un compte opérationnel connu du système : bancaire, Mobile Money, interne ou autre.

Le module conserve :

- propriétaire ;
- type ;
- devise ;
- partenaire ;
- identifiant masqué ;
- statut ;
- usage autorisé ;
- limites ;
- dernière synchronisation.

## 36. Trésorerie opérationnelle

La trésorerie suit les positions disponibles et attendues par compte et devise sans devenir la source de vérité comptable.

Elle s’appuie sur les soldes validés et les mouvements attendus.

## 37. Position de trésorerie

Une `TreasuryPosition` contient :

- compte ;
- devise ;
- solde comptable ;
- solde disponible ;
- entrées attendues ;
- sorties attendues ;
- montant réservé ;
- position nette ;
- date de valeur ;
- source ;
- niveau de confiance.

## 38. Prévision de liquidité

Le système peut produire une prévision selon :

- règlements planifiés ;
- encaissements attendus ;
- historique ;
- calendrier ;
- volume marchand ;
- retraits agents ;
- remboursements ;
- dépenses opérationnelles intégrées.

La prévision est informative et ne remplace pas une validation financière humaine.

## 39. Seuils de liquidité

Alertes possibles :

```text
LOW_LIQUIDITY
CRITICAL_LIQUIDITY
EXCESS_LIQUIDITY
UNEXPECTED_OUTFLOW
UNEXPECTED_INFLOW
BALANCE_STALE
```

Les seuils sont configurables par compte et devise.

## 40. Transferts internes de trésorerie

Un transfert interne entre comptes opérationnels suit un workflow d’approbation séparé.

Il doit indiquer : motif, source, destination, montant, devise, initiateur, approbateur, référence et résultat d’exécution.

## 41. Clôture quotidienne

La clôture quotidienne vérifie au minimum :

- runs de rapprochement terminés ;
- suspens critiques ;
- écarts majeurs ;
- lots de règlement ;
- confirmations reçues ;
- positions de trésorerie ;
- soldes internes ;
- fichiers attendus ;
- incidents actifs.

## 42. États de clôture

```text
OPEN
CHECKING
BLOCKED
READY
CLOSED
REOPENED
```

Une clôture bloquée doit exposer précisément les contrôles échoués.

## 43. Réouverture

Une période clôturée peut être réouverte uniquement par un rôle autorisé avec justification, approbation et audit complet.

La réouverture ne supprime jamais les résultats de clôture précédents.

## 44. Contrôles de clôture

Exemples :

- total Ledger versus relevé bancaire ;
- total paiements versus processeur ;
- total commissions versus moteur de frais ;
- obligations marchands versus lots de règlement ;
- soldes d’ouverture plus mouvements versus soldes de clôture ;
- absence de fichiers partenaires manquants.

## 45. Reporting de contrôle

Rapports minimaux :

- transactions rapprochées ;
- taux de matching ;
- écarts par type ;
- suspens ouverts ;
- ancienneté des suspens ;
- règlements dus ;
- règlements exécutés ;
- échecs ;
- liquidité par compte ;
- position nette ;
- clôtures ;
- ajustements approuvés.

## 46. Vieillissement des suspens

Les suspens sont classés par âge :

```text
D0
D1_D2
D3_D7
D8_D30
OVER_30_DAYS
```

Les seuils peuvent varier selon le partenaire et le type de flux.

## 47. SLA

Chaque type d’écart peut définir :

- délai de prise en charge ;
- délai de résolution ;
- escalade ;
- propriétaire ;
- priorité ;
- niveau de notification.

## 48. Notifications opérationnelles

Alertes possibles :

- fichier attendu manquant ;
- taux de matching anormal ;
- suspens critique ;
- lot de règlement bloqué ;
- échec bancaire ;
- faible liquidité ;
- clôture bloquée ;
- solde partenaire non synchronisé ;
- dépassement SLA.

## 49. API rapprochement

Endpoints indicatifs :

```text
POST /v1/reconciliation/sources/:sourceId/imports
GET  /v1/reconciliation/runs
GET  /v1/reconciliation/runs/:id
POST /v1/reconciliation/runs
GET  /v1/reconciliation/exceptions
GET  /v1/reconciliation/suspense
POST /v1/reconciliation/suspense/:id/actions/resolve
POST /v1/reconciliation/suspense/:id/actions/assign
```

## 50. API règlement

```text
GET  /v1/settlements/batches
POST /v1/settlements/batches
GET  /v1/settlements/batches/:id
POST /v1/settlements/batches/:id/actions/calculate
POST /v1/settlements/batches/:id/actions/approve
POST /v1/settlements/batches/:id/actions/submit
GET  /v1/settlements/instructions/:id
```

## 51. API trésorerie

```text
GET /v1/treasury/accounts
GET /v1/treasury/positions
GET /v1/treasury/forecast
GET /v1/treasury/alerts
GET /v1/treasury/closings
POST /v1/treasury/closings/:id/actions/close
```

## 52. Permissions

Rôles indicatifs :

```text
RECON_VIEWER
RECON_OPERATOR
RECON_MANAGER
SETTLEMENT_OPERATOR
SETTLEMENT_APPROVER
TREASURY_VIEWER
TREASURY_OPERATOR
TREASURY_MANAGER
FINANCE_ADMIN
AUDITOR
```

## 53. Séparation des responsabilités

L’initiateur d’un règlement ne doit pas pouvoir l’approuver seul lorsqu’un contrôle à quatre yeux est requis.

Un opérateur de rapprochement ne peut pas modifier le Ledger directement.

Un utilisateur support peut consulter un statut sans accéder aux coordonnées bancaires complètes.

## 54. Journal d’audit

Le journal conserve :

- import de fichier ;
- lancement de run ;
- changement de règle ;
- matching manuel ;
- création de suspens ;
- résolution ;
- création de lot ;
- recalcul ;
- approbation ;
- soumission ;
- confirmation ;
- transfert de trésorerie ;
- clôture ;
- réouverture ;
- export.

## 55. Sécurité

Les données sensibles utilisent :

- TLS ;
- chiffrement au repos ;
- secrets hors code ;
- accès minimal ;
- masquage des comptes ;
- URLs temporaires pour fichiers ;
- validation des uploads ;
- contrôle d’intégrité ;
- audit administrateur.

## 56. Logs

Les logs ne contiennent jamais :

- secrets partenaires ;
- credentials bancaires ;
- numéros complets de comptes ;
- fichiers bruts sensibles ;
- tokens d’accès ;
- clés d’API.

## 57. Observabilité

Métriques minimales :

- taux de matching ;
- nombre d’écarts ;
- suspens ouverts ;
- âge moyen des suspens ;
- temps de résolution ;
- fichiers manquants ;
- lots en attente ;
- taux d’échec de règlement ;
- latence partenaire ;
- liquidité disponible ;
- clôtures bloquées ;
- volume d’ajustements.

## 58. Alertes techniques

Alertes :

- parsing impossible ;
- webhook invalide ;
- répétition de timeout ;
- dérive du taux de matching ;
- double instruction détectée ;
- incohérence de total ;
- position obsolète ;
- clôture dépassant le SLA.

## 59. Tests unitaires

Couvrir :

- règles de matching ;
- tolérances ;
- détection de doublons ;
- calcul de net à régler ;
- états de lots ;
- idempotence ;
- calcul de position ;
- règles de cut-off ;
- états de clôture.

## 60. Tests d’intégration

Tester :

- import fichier ;
- parsing partenaire ;
- Ledger ;
- webhook de confirmation ;
- génération de lot ;
- fournisseur bancaire mock ;
- règlement partiel ;
- échec puis retry ;
- clôture ;
- audit.

## 61. Tests de sécurité

Inclure :

- accès à un compte non autorisé ;
- modification de lot sans rôle ;
- contournement quatre yeux ;
- double soumission ;
- rejeu webhook ;
- fichier malveillant ;
- fuite de compte dans logs ;
- modification de clôture ;
- accès horizontal entre organisations.

## 62. Données de test

Les environnements hors production utilisent des comptes, relevés, références et fichiers synthétiques.

Aucune donnée bancaire réelle de Production ne doit être copiée vers Démo ou Recette.

## 63. Multi-pays

La configuration par pays comprend :

- devises ;
- jours ouvrés ;
- calendriers ;
- partenaires ;
- formats ;
- cut-offs ;
- fréquences de règlement ;
- seuils d’approbation ;
- règles de reporting ;
- politiques de conservation.

L’ajout d’un pays ne doit pas nécessiter de fork du domaine.

## 64. Critères d’acceptation

Le module est acceptable lorsque :

- un fichier partenaire peut être ingéré et validé ;
- les transactions peuvent être rapprochées automatiquement ;
- les écarts sont classifiés et visibles ;
- les suspens peuvent être résolus avec preuve et audit ;
- un lot de règlement peut être calculé, approuvé, exécuté et confirmé ;
- un retry ne déclenche pas de double paiement ;
- les positions de trésorerie sont calculables par compte et devise ;
- les clôtures quotidiennes détectent les anomalies ;
- les accès respectent RBAC/ABAC ;
- les métriques et alertes critiques sont disponibles.

## 65. Définition de terminé

Le module est terminé lorsque les contrats API, modèles, règles de rapprochement, imports, suspens, règlements, trésorerie, clôtures, sécurité, audit, observabilité, intégrations et tests sont cohérents avec le reste de Mansa, et qu’un nouveau partenaire bancaire, Mobile Money, processeur, commerçant ou pays peut être ajouté sans réécrire le cœur du domaine.
