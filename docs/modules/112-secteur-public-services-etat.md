# 112 — Secteur public, services de l’État et paiements administratifs Mansa

## 1. Objet

Ce document définit le cahier des charges du module Secteur public et services de l’État de Mansa. Le module permet aux administrations, collectivités, établissements publics, universités et agents habilités de créer, percevoir, suivre et rapprocher des obligations ou prestations publiques via Mansa, tout en garantissant traçabilité, séparation des rôles, lutte contre la fraude et limitation des manipulations manuelles.

Le module couvre notamment les amendes, taxes et redevances, frais administratifs, paiements scolaires ou universitaires, bourses et aides, cartes étudiantes, encaissements de guichet et services publics numériques.

## 2. Objectifs

- dématérialiser les paiements publics sans supprimer les contrôles réglementaires ;
- permettre à une administration de définir ses services, tarifs, règles et bénéficiaires ;
- fournir un paiement immédiat ou différé via wallet, Mobile Money, carte, banque ou TPE ;
- réduire la manipulation d’espèces par les agents publics ;
- empêcher un agent de modifier librement un montant réglementaire ;
- tracer chaque création, modification, annulation, encaissement et remboursement ;
- fournir des reçus vérifiables ;
- automatiser le rapprochement avec les écritures Mansa et les partenaires de paiement ;
- supporter les contrôles hiérarchiques et le principe des quatre yeux ;
- exposer des tableaux de bord par organisme, service, zone, agent et période ;
- permettre l’intégration avec les systèmes de l’État sans rendre Mansa dépendant d’un SI unique.

## 3. Périmètre

Le module couvre :

- organisations publiques et sous-entités ;
- identité et habilitation des agents ;
- catalogue de services publics ;
- barèmes et règles tarifaires ;
- création d’obligations de paiement ;
- amendes et contraventions ;
- taxes, redevances et droits ;
- paiements scolaires et universitaires ;
- bourses, aides et décaissements publics ;
- cartes étudiantes et identifiants associés ;
- paiements sur place et à distance ;
- QR de paiement et références uniques ;
- TPE ou terminaux d’agents ;
- reçus officiels ;
- annulations et remboursements contrôlés ;
- contestations et réclamations ;
- rapprochement et règlement ;
- audit et reporting ;
- API et webhooks d’intégration.

## 4. Hors périmètre

Le module ne remplace pas :

- les lois, décrets ou procédures administratives ;
- un registre national d’identité ;
- un système fiscal complet ;
- un système judiciaire ;
- un logiciel de police ;
- un système académique complet ;
- un système de paie publique ;
- la comptabilité légale de l’État ;
- un système bancaire central.

Mansa transporte et trace des ordres, paiements et preuves selon les règles fournies par l’organisme habilité.

## 5. Acteurs

- citoyen ou usager ;
- étudiant ;
- bénéficiaire d’aide ou de bourse ;
- agent public terrain ;
- agent de guichet ;
- superviseur ;
- contrôleur ;
- responsable financier ;
- administrateur d’organisme ;
- administrateur central Mansa ;
- banque partenaire ;
- opérateur Mobile Money ;
- établissement d’enseignement ;
- collectivité ou ministère ;
- auditeur habilité.

## 6. Principes non négociables

1. Un agent ne peut jamais modifier un barème réglementaire sans habilitation spécifique.
2. Toute obligation possède une référence unique et immuable.
3. Aucun montant financier n’est stocké en flottant.
4. Toute action sensible est horodatée, signée logiquement et auditée.
5. Les rôles de création, validation, encaissement, remboursement et audit sont séparables.
6. Toute annulation conserve l’objet d’origine et sa justification.
7. Un paiement confirmé ne peut pas être supprimé.
8. Les paiements sont idempotents.
9. Les reçus sont vérifiables indépendamment de l’interface de l’agent.
10. Les environnements Démo, Recette et Production sont strictement séparés.
11. Aucun secret de production n’est stocké dans le dépôt.
12. Les règles sont versionnées avec dates d’effet.
13. Un agent ne peut jamais encaisser sur son wallet personnel une obligation publique.
14. Les fonds suivent uniquement les comptes de règlement configurés pour l’organisme.
15. Les données personnelles sont minimisées selon le service rendu.

## 7. Modèle organisationnel public

Concepts minimaux :

```text
PublicOrganization
PublicDepartment
PublicService
PublicOffice
PublicAgent
AgentAssignment
AgentCredential
PublicTariff
TariffVersion
PublicObligation
PublicPayment
PublicReceipt
PublicRefund
PublicDispute
PublicSettlement
PublicAuditEvent
```

Une organisation peut contenir plusieurs directions, services, bureaux et zones géographiques.

## 8. Types d’organismes

```text
MINISTRY
AGENCY
MUNICIPALITY
REGION
UNIVERSITY
SCHOOL
PUBLIC_HOSPITAL
POLICE_SERVICE
TRANSPORT_AUTHORITY
TAX_AUTHORITY
SOCIAL_PROGRAM
OTHER_PUBLIC_BODY
```

Le type sert au paramétrage, pas à déterminer seul les permissions.

## 9. Identité des agents

Chaque agent public doit posséder :

- identifiant interne Mansa ;
- identifiant fourni par l’organisme ;
- organisme et service ;
- fonction ;
- zone ou poste d’affectation ;
- rôles ;
- période de validité ;
- statut ;
- méthodes d’authentification autorisées ;
- terminal éventuellement assigné ;
- historique des habilitations.

Aucun compte générique partagé n’est autorisé pour les opérations sensibles.

## 10. États d’un agent

```text
PENDING
ACTIVE
SUSPENDED
REVOKED
EXPIRED
```

La révocation doit être effective immédiatement dans les contrôles d’autorisation.

## 11. Catalogue de services publics

Chaque `PublicService` définit :

- code du service ;
- organisme propriétaire ;
- libellé ;
- description ;
- catégorie ;
- canaux autorisés ;
- données minimales requises ;
- mode de calcul du montant ;
- compte ou règle de règlement ;
- politique de reçu ;
- politique d’annulation ;
- politique de contestation ;
- dates de validité.

## 12. Barèmes

Un `PublicTariff` peut être :

```text
FIXED
TIERED
FORMULA
PERCENTAGE
EXTERNAL_CALCULATION
MANUAL_WITH_LIMITS
```

Le mode `MANUAL_WITH_LIMITS` doit rester exceptionnel et imposer des bornes, un motif et des contrôles renforcés.

## 13. Versionnement des tarifs

Chaque changement de tarif crée une nouvelle version avec :

- date d’effet ;
- auteur ;
- approbateur ;
- référence juridique ou administrative ;
- ancien montant ;
- nouveau montant ;
- devise ;
- justification ;
- statut de publication.

Une obligation déjà émise conserve la version tarifaire appliquée au moment de sa création sauf règle réglementaire explicite.

## 14. Obligation publique

Une `PublicObligation` représente une somme ou une formalité due par un usager.

Champs minimaux :

- identifiant Mansa ;
- référence publique ;
- organisme ;
- service ;
- débiteur ou bénéficiaire ;
- montant ;
- devise ;
- motif ;
- date de création ;
- date d’échéance ;
- version tarifaire ;
- agent ou système créateur ;
- statut ;
- métadonnées métier minimales ;
- canal de création.

## 15. États d’une obligation

```text
DRAFT
ISSUED
PENDING_PAYMENT
PARTIALLY_PAID
PAID
EXPIRED
CANCELLED
DISPUTED
REFUNDED
CLOSED
```

Les transitions sont contrôlées par machine à états.

## 16. Référence unique

Toute obligation doit être identifiable par au moins une référence publique stable.

La référence doit :

- être non ambiguë ;
- éviter l’exposition directe d’identifiants sensibles ;
- supporter la saisie manuelle ;
- être utilisable dans un QR ;
- être vérifiable via API ;
- rester consultable après paiement.

## 17. Amendes et contraventions

Le sous-module Amendes permet à un agent habilité d’enregistrer une infraction à partir d’un catalogue approuvé.

Le montant est déterminé par :

- type d’infraction ;
- classe ou niveau ;
- règle réglementaire ;
- éventuelle majoration ou minoration autorisée ;
- date et contexte.

L’agent choisit l’infraction ; il ne saisit pas librement le montant lorsque celui-ci est réglementé.

## 18. Création d’une amende sur le terrain

Flux recommandé :

1. authentification forte de l’agent ;
2. identification du service et du terminal ;
3. sélection de l’infraction ;
4. saisie des éléments requis ;
5. calcul automatique du montant ;
6. affichage du détail avant émission ;
7. génération d’une référence et d’un QR ;
8. paiement immédiat ou création d’une dette payable ultérieurement ;
9. émission d’un reçu ou avis ;
10. journalisation complète.

## 19. Données minimales d’une amende

Selon la réglementation et la politique de minimisation :

- type d’infraction ;
- date et heure ;
- zone ;
- agent ;
- montant ;
- référence ;
- véhicule ou usager si nécessaire ;
- éléments justificatifs autorisés ;
- statut de paiement.

Les données biométriques ou excessives ne sont pas collectées par défaut.

## 20. Paiement sur place

Canaux possibles :

```text
MANSA_WALLET
MOBILE_MONEY
CARD
BANK_ACCOUNT
TPE
QR
PAYMENT_LINK
CASH_REGISTERED_EXCEPTION
```

Le paiement en espèces peut être désactivé par organisme. S’il est exceptionnellement autorisé, il doit être enregistré comme tel avec un contrôle de caisse séparé.

## 21. Paiement sans Internet côté usager

Lorsqu’un usager ne dispose pas d’Internet, l’agent peut afficher ou imprimer une référence et un QR utilisables ultérieurement.

Le terminal agent ne doit jamais simuler un paiement confirmé sans preuve du prestataire de paiement ou du ledger Mansa.

## 22. Mode réseau dégradé

En cas de connectivité intermittente, le terminal peut préparer une opération locale signée et limitée, mais :

- aucune confirmation de paiement définitive n’est inventée ;
- les numéros d’opération sont préalloués ou sécurisés ;
- les opérations en attente sont synchronisées dès retour du réseau ;
- les doublons sont détectés par idempotence ;
- les limites offline sont configurables par organisme et type d’action.

## 23. Taxes, redevances et droits

Le sous-module supporte :

- taxe fixe ;
- taxe basée sur une assiette ;
- droit de dossier ;
- redevance de service ;
- licence ou autorisation ;
- paiement périodique ;
- pénalité réglementaire ;
- paiement fractionné si autorisé.

Les calculs complexes peuvent être fournis par un moteur externe de l’administration, Mansa conservant la preuve de la réponse utilisée.

## 24. Paiements scolaires et universitaires

Le module peut gérer :

- frais d’inscription ;
- frais de scolarité ;
- bibliothèque ;
- restauration ;
- logement étudiant ;
- examens ;
- services universitaires ;
- autres frais configurés.

Chaque paiement peut être lié à un étudiant et à une année académique sans exposer davantage de données que nécessaire.

## 25. Cartes étudiantes

Une carte étudiante Mansa peut référencer :

- identifiant étudiant ;
- établissement ;
- année ou période de validité ;
- statut ;
- photo si autorisée ;
- QR ou identifiant sans contact ;
- services associés.

La carte ne doit pas contenir en clair des secrets d’authentification ni des données financières sensibles.

## 26. Bourses et aides

Le sous-module de décaissement public gère :

- programme ;
- bénéficiaire ;
- critères importés ou validés par l’organisme ;
- montant ;
- périodicité ;
- canal de versement ;
- statut ;
- retenues éventuelles ;
- preuve de paiement.

Mansa ne décide pas seul de l’éligibilité réglementaire ; l’organisme fournit ou valide la décision.

## 27. États d’un versement public

```text
PLANNED
VALIDATED
READY
PROCESSING
PAID
FAILED
ON_HOLD
CANCELLED
REVERSED
```

Un versement échoué reste traçable et peut être rejoué de façon idempotente.

## 28. Contrôle des doublons de bénéficiaires

Le système doit détecter les risques de double versement selon :

- programme ;
- période ;
- identifiant bénéficiaire ;
- compte destination ;
- référence externe ;
- empreinte métier.

Une alerte ne doit pas automatiquement supprimer un bénéficiaire légitime ; elle déclenche une revue selon les règles du programme.

## 29. Reçus officiels

Chaque paiement confirmé génère un `PublicReceipt` contenant :

- référence du paiement ;
- référence de l’obligation ;
- organisme ;
- service ;
- montant ;
- devise ;
- date ;
- canal ;
- statut ;
- QR ou code de vérification ;
- signature logique ou preuve d’intégrité.

Le reçu ne doit pas exposer le PAN complet d’une carte ni d’autres secrets.

## 30. Vérification publique d’un reçu

Une page ou API de vérification peut retourner uniquement :

- validité ;
- organisme ;
- type de service ;
- montant ;
- devise ;
- date ;
- statut.

Les informations personnelles sont masquées par défaut.

## 31. Annulation d’une obligation

Une obligation peut être annulée uniquement si la règle métier l’autorise.

L’annulation enregistre :

- auteur ;
- rôle ;
- date ;
- motif ;
- pièce justificative éventuelle ;
- approbation ;
- ancien statut ;
- nouveau statut.

Une obligation payée n’est pas simplement annulée : un processus de remboursement ou de correction est nécessaire.

## 32. Remboursements

Un remboursement public doit être :

- lié au paiement initial ;
- justifié ;
- autorisé selon un seuil ;
- éventuellement validé par un second rôle ;
- exécuté via un canal supporté ;
- rapproché ;
- audité.

## 33. Contestations

Un usager peut contester une obligation lorsque le service le permet.

Statuts minimaux :

```text
OPEN
UNDER_REVIEW
WAITING_EVIDENCE
ACCEPTED
REJECTED
CANCELLED
CLOSED
```

Une contestation n’efface jamais l’historique de l’obligation.

## 34. Anti-corruption par conception

Le module doit réduire les opportunités de détournement sans présumer qu’un acteur particulier est malveillant.

Contrôles recommandés :

- barèmes centralisés ;
- interdiction des wallets personnels ;
- agents nominatifs ;
- terminaux assignés ;
- reçus vérifiables ;
- géolocalisation uniquement si autorisée et nécessaire ;
- alertes sur taux d’annulation anormal ;
- alertes sur modifications fréquentes ;
- séparation des rôles ;
- contrôles aléatoires ;
- rapprochement automatique ;
- tableau de bord d’anomalies ;
- impossibilité de supprimer les traces.

## 35. Séparation des rôles

Rôles de référence :

```text
PUBLIC_AGENT
PUBLIC_CASHIER
PUBLIC_SUPERVISOR
PUBLIC_FINANCE
PUBLIC_AUDITOR
PUBLIC_ORG_ADMIN
MANSA_SUPPORT_RESTRICTED
MANSA_SUPER_ADMIN
```

Les permissions sont gérées en RBAC/ABAC avec périmètres d’organisme, service, région et montant.

## 36. Matrice d’approbation

Les seuils d’approbation peuvent dépendre de :

- type d’opération ;
- montant ;
- organisme ;
- service ;
- niveau de risque ;
- canal ;
- rôle du demandeur.

Une personne ne peut pas approuver sa propre action lorsque la politique exige quatre yeux.

## 37. Audit

Événements minimaux :

```text
AGENT_LOGIN
AGENT_ROLE_CHANGED
TARIFF_CREATED
TARIFF_APPROVED
TARIFF_PUBLISHED
OBLIGATION_CREATED
OBLIGATION_CANCELLED
PAYMENT_INITIATED
PAYMENT_CONFIRMED
PAYMENT_FAILED
REFUND_REQUESTED
REFUND_APPROVED
REFUND_EXECUTED
DISPUTE_OPENED
DISPUTE_RESOLVED
BENEFIT_BATCH_CREATED
BENEFIT_PAYMENT_SENT
SETTLEMENT_CLOSED
EXPORT_GENERATED
```

Chaque événement contient acteur, ressource, action, horodatage, contexte et corrélation.

## 38. Données et confidentialité

Les données doivent être classées au minimum en :

```text
PUBLIC
INTERNAL
CONFIDENTIAL
HIGHLY_SENSITIVE
```

Les champs sensibles sont masqués dans les interfaces et exports selon les droits.

## 39. Conservation

Les durées de conservation sont configurées selon le cadre légal applicable et le contrat avec l’organisme.

Le système doit permettre :

- archivage ;
- verrouillage légal ;
- anonymisation lorsque applicable ;
- export réglementaire ;
- traçabilité des suppressions autorisées.

## 40. Paiements

Le module s’appuie sur les domaines de paiement Mansa existants et ne duplique pas leur logique.

Références nécessaires :

- `paymentId` ;
- `transactionId` ;
- `ledgerEntryId` ;
- `providerReference` ;
- `publicObligationId` ;
- `publicOrganizationId`.

## 41. Ledger

Toute confirmation financière doit être reflétée dans le Ledger selon les règles comptables internes Mansa.

Le module public n’édite jamais directement les soldes.

## 42. Frais Mansa

Les frais peuvent être :

```text
PAID_BY_USER
PAID_BY_ORGANIZATION
SHARED
WAIVED
```

Le modèle de frais est configurable par service et contrat.

Les frais réglementaires et les frais commerciaux Mansa doivent être distingués dans les écritures et reçus.

## 43. Commissions d’agents

Par défaut, un agent public n’obtient aucune commission personnelle.

Si un réseau d’encaissement externe ou agent agréé est rémunéré, la commission passe par le moteur de commissions Mansa et un bénéficiaire contractuel distinct.

## 44. Règlement des fonds

Le module transmet les obligations de règlement au domaine Finance/Rapprochement.

Les comptes de destination sont configurés par organisme, service, devise et contrat.

Aucun agent opérationnel ne peut modifier seul un compte de règlement.

## 45. Rapprochement

Le système rapproche :

- obligations émises ;
- paiements initiés ;
- paiements confirmés ;
- écritures ledger ;
- retours partenaires ;
- règlements ;
- remboursements ;
- versements de bourses ou aides.

Tout écart devient un élément de contrôle ou suspens.

## 46. TPE et terminaux agents

Les terminaux peuvent fournir :

- authentification agent ;
- catalogue des infractions ou services ;
- scan de QR ;
- génération d’obligation ;
- encaissement ;
- impression ou partage de reçu ;
- consultation limitée de l’historique ;
- synchronisation offline contrôlée.

## 47. Sécurité terminal

Exigences minimales :

- association terminal-agent ;
- révocation à distance ;
- chiffrement local ;
- stockage minimal ;
- expiration de session ;
- détection de terminal compromis lorsque possible ;
- aucune clé secrète de production codée en dur ;
- logs techniques sans données excessives.

## 48. API publique interne au SI État

Exemples d’API :

```text
POST /v1/public/obligations
GET /v1/public/obligations/{id}
POST /v1/public/obligations/{id}/cancel
POST /v1/public/payments
GET /v1/public/payments/{id}
POST /v1/public/refunds
POST /v1/public/disputes
POST /v1/public/benefit-batches
GET /v1/public/receipts/{reference}/verify
```

Les API sont versionnées, authentifiées, autorisées et soumises à idempotence.

## 49. Webhooks

Événements possibles :

```text
public.obligation.issued
public.obligation.cancelled
public.payment.confirmed
public.payment.failed
public.refund.completed
public.dispute.updated
public.benefit.paid
public.settlement.completed
```

Chaque webhook est signé et rejouable en sécurité.

## 50. Idempotence

Les endpoints d’écriture utilisent une clé d’idempotence.

Le serveur conserve le lien entre :

- clé ;
- client ;
- route ;
- empreinte de requête ;
- résultat ;
- expiration.

Une même clé avec une requête différente est rejetée.

## 51. Imports en masse

Les organismes peuvent importer :

- obligations ;
- bénéficiaires ;
- étudiants ;
- barèmes ;
- versements ;
- références externes.

Les imports sont prévalidés avant exécution et produisent un rapport détaillé.

## 52. Exports

Exports possibles :

- CSV ;
- XLSX ;
- PDF de synthèse ;
- JSON ;
- API ;
- formats partenaire spécifiques.

Les exports massifs sensibles nécessitent une permission dédiée et sont audités.

## 53. Reporting

Indicateurs minimaux :

- obligations émises ;
- montants dus ;
- montants encaissés ;
- taux de paiement ;
- délai moyen de paiement ;
- paiements par canal ;
- annulations ;
- remboursements ;
- contestations ;
- écarts de rapprochement ;
- montants réglés ;
- bourses versées ;
- échecs de décaissement.

## 54. Détection d’anomalies

Signaux possibles :

- taux d’annulation élevé par agent ;
- créations répétées puis annulations ;
- montants manuels proches des seuils ;
- activité hors horaires attendus ;
- terminal utilisé par plusieurs agents ;
- volume inhabituel ;
- répétition d’un bénéficiaire ;
- remboursement disproportionné ;
- changement de compte de règlement.

Les signaux sont envoyés au module Risque/Fraude pour décision.

## 55. Administration

L’interface d’administration doit permettre :

- créer un organisme ;
- gérer ses services ;
- définir ses zones ;
- importer les agents ;
- gérer rôles et habilitations ;
- publier des tarifs ;
- configurer les canaux ;
- configurer les seuils ;
- configurer les comptes de règlement ;
- consulter les audits ;
- suspendre un service ;
- activer un kill switch.

## 56. Kill switches

Désactivations possibles :

```text
DISABLE_ORGANIZATION
DISABLE_SERVICE
DISABLE_AGENT
DISABLE_TERMINAL
DISABLE_PAYMENT_CHANNEL
DISABLE_REFUNDS
DISABLE_BENEFIT_PAYOUTS
DISABLE_OFFLINE_MODE
```

Un kill switch ne supprime jamais l’historique.

## 57. Multi-pays

Le modèle doit supporter :

- pays ;
- devise ;
- langue ;
- format de référence ;
- calendrier ;
- règles fiscales ;
- autorités ;
- politiques de conservation ;
- fuseaux horaires.

Les règles du Mali ne doivent pas être codées comme hypothèse universelle.

## 58. Internationalisation

Textes et reçus peuvent être localisés selon les langues activées.

Les libellés réglementaires fournis par l’organisme sont versionnés afin d’éviter une traduction automatique non validée dans les documents officiels.

## 59. Notifications

Notifications possibles :

- obligation émise ;
- échéance prochaine ;
- paiement confirmé ;
- paiement échoué ;
- contestation mise à jour ;
- remboursement effectué ;
- bourse versée.

Canaux : push, SMS, e-mail ou autres canaux configurés.

## 60. Support

Les agents support Mansa disposent d’un accès limité.

Ils peuvent diagnostiquer un paiement mais ne peuvent pas :

- modifier un barème ;
- créer une obligation officielle au nom d’un agent public ;
- effacer un reçu ;
- valider seuls un remboursement sensible ;
- changer un compte de règlement.

## 61. Observabilité

Métriques techniques :

- taux de succès des API ;
- latence ;
- erreurs par partenaire ;
- files en attente ;
- webhooks échoués ;
- paiements bloqués ;
- synchronisations offline ;
- imports en erreur.

## 62. SLO indicatifs

Objectifs initiaux à valider :

- disponibilité API publique : 99,9 % ;
- création d’obligation en ligne : p95 < 800 ms hors dépendance externe ;
- vérification de reçu : p95 < 500 ms ;
- traitement webhook : reprise automatique ;
- audit : aucune perte d’événement accepté.

## 63. Tests unitaires

Couvrir au minimum :

- calcul tarifaire ;
- transitions de statut ;
- autorisations ;
- idempotence ;
- annulations ;
- remboursements ;
- règle quatre yeux ;
- doublons bénéficiaires ;
- génération de références ;
- validation d’import.

## 64. Tests d’intégration

Scénarios :

- création puis paiement d’une amende ;
- paiement différé via référence ;
- taxe calculée par système externe ;
- versement de bourse ;
- échec puis retry idempotent ;
- remboursement ;
- contestation ;
- rapprochement ;
- révocation immédiate d’un agent ;
- import massif partiellement invalide.

## 65. Tests de sécurité

- élévation de privilège ;
- accès inter-organismes ;
- modification de barème non autorisée ;
- réutilisation de session d’agent ;
- injection ;
- falsification de reçu ;
- attaque replay ;
- webhook falsifié ;
- export non autorisé ;
- modification de compte de règlement.

## 66. Tests anti-fraude

Vérifier notamment :

- agent créant des obligations hors périmètre ;
- annulations répétées ;
- remboursements vers un autre bénéficiaire ;
- changement de terminal ;
- duplication de versements ;
- barème altéré ;
- paiement déclaré sans preuve fournisseur.

## 67. Performance

Les listes administratives doivent être paginées et filtrables.

Les tableaux de bord lourds s’appuient sur des vues analytiques ou pipelines adaptés plutôt que sur des agrégations coûteuses dans les transactions opérationnelles.

## 68. Résilience

Les intégrations externes utilisent :

- timeouts ;
- retry borné ;
- backoff ;
- circuit breaker ;
- idempotence ;
- dead-letter queue lorsque nécessaire ;
- corrélation de bout en bout.

## 69. Modèle de données indicatif

Relations principales :

```text
PublicOrganization 1---N PublicDepartment
PublicOrganization 1---N PublicAgent
PublicOrganization 1---N PublicService
PublicService 1---N PublicTariff
PublicTariff 1---N TariffVersion
PublicService 1---N PublicObligation
PublicObligation 1---N PublicPayment
PublicPayment 0---N PublicRefund
PublicObligation 0---N PublicDispute
PublicOrganization 1---N PublicSettlement
PublicAgent 1---N PublicAuditEvent
```

## 70. Champs monétaires

Convention recommandée :

```text
amountMinor: bigint
currency: char(3)
```

Pour XOF, le montant métier peut être entier, mais le modèle reste générique.

## 71. Concurrence

Les actions concurrentes sur une obligation utilisent version optimiste ou verrou métier afin d’éviter :

- double paiement ;
- double annulation ;
- remboursement multiple ;
- changement incohérent de statut.

## 72. Événements de domaine

```text
PublicObligationIssued
PublicObligationCancelled
PublicPaymentConfirmed
PublicRefundRequested
PublicRefundCompleted
PublicDisputeOpened
PublicTariffPublished
PublicBenefitBatchValidated
PublicBenefitPaid
PublicAgentRevoked
```

## 73. Confidentialité des preuves

Les photos, documents ou justificatifs éventuels ne doivent pas être intégrés dans les événements diffusés.

Les événements référencent uniquement un identifiant de document sécurisé.

## 74. Intégration avec Jini

Jini peut assister l’usager pour :

- expliquer une obligation ;
- retrouver une référence ;
- indiquer les canaux de paiement ;
- suivre un paiement ;
- orienter vers une contestation.

Jini ne peut pas annuler une amende ni modifier un barème sans workflow autorisé.

## 75. Intégration avec l’Annuaire/Hub

Un organisme peut publier dans l’Annuaire :

- coordonnées ;
- horaires ;
- services disponibles ;
- liens de paiement officiels ;
- informations vérifiées.

Les données opérationnelles sensibles restent hors de l’annuaire public.

## 76. Modes Démo, Recette et Production

### Démo

- données fictives ;
- paiements simulés ;
- aucun règlement réel.

### Recette

- partenaires sandbox ;
- utilisateurs de test ;
- validation des workflows.

### Production

- accès fortement contrôlés ;
- clés de production ;
- audit renforcé ;
- supervision ;
- procédures d’incident.

## 77. Paramétrage initial recommandé pour le Mali

Hypothèse à valider avec les organismes compétents :

- XOF comme devise principale ;
- français comme langue administrative par défaut ;
- prise en charge progressive d’autres langues dans les interfaces d’assistance ;
- Mobile Money, carte, wallet Mansa et banque comme canaux possibles selon contrat ;
- aucun paiement en espèces obligatoire dans Mansa ;
- barèmes importés ou validés par l’autorité compétente.

Aucun montant d’amende ou taxe réel n’est codé dans le produit sans source officielle et validation contractuelle.

## 78. Procédure d’onboarding d’un organisme

1. contrat et validation juridique ;
2. création de l’organisation ;
3. configuration des services ;
4. import des barèmes ;
5. configuration des comptes de règlement ;
6. définition des rôles ;
7. import des agents ;
8. configuration des terminaux ;
9. intégration API si nécessaire ;
10. recette ;
11. formation ;
12. mise en production ;
13. suivi renforcé post-lancement.

## 79. Gouvernance des changements

Les changements sensibles nécessitent :

- demande ;
- justification ;
- approbation ;
- date d’effet ;
- test ;
- publication ;
- audit.

Sont concernés notamment les barèmes, rôles, comptes de règlement, limites, canaux et règles de remboursement.

## 80. Critères d’acceptation MVP

Le MVP est accepté si :

- un organisme peut être configuré ;
- des agents nominatifs peuvent être habilités ;
- un catalogue d’infractions ou services peut être publié ;
- un agent peut émettre une obligation sans modifier arbitrairement son montant ;
- un usager peut payer par au moins un canal réel ou sandbox ;
- un reçu vérifiable est généré ;
- les opérations sont visibles dans l’audit ;
- une annulation et un remboursement suivent un workflow contrôlé ;
- le rapprochement peut identifier les paiements ;
- un administrateur peut suspendre un agent ou service ;
- les tests d’autorisation inter-organismes passent.

## 81. Critères d’acceptation phase 2

- bourses et aides en lots ;
- cartes étudiantes ;
- intégrations SI État ;
- offline contrôlé ;
- analytics avancés ;
- détection d’anomalies ;
- multi-organismes à grande échelle ;
- multi-pays ;
- automatisation complète du règlement.

## 82. Risques principaux

- mauvaise configuration d’un barème ;
- compromission d’un compte agent ;
- corruption ou collusion interne ;
- dépendance à un SI public indisponible ;
- falsification de reçus hors plateforme ;
- erreurs de rapprochement ;
- paiement dupliqué ;
- fuite de données personnelles ;
- mauvaise gestion des droits ;
- changement réglementaire non répercuté.

## 83. Mesures de réduction des risques

- double validation ;
- versionnement ;
- contrôle d’accès fin ;
- MFA ;
- audit immuable ;
- rapprochement ;
- alertes fraude ;
- kill switches ;
- tests de sécurité ;
- revue périodique des accès ;
- procédure d’urgence pour les changements réglementaires.

## 84. Dépendances Mansa

Le module dépend principalement de :

- Identity/Auth ;
- RBAC/ABAC ;
- KYC lorsque nécessaire ;
- Wallet ;
- Payments ;
- Ledger ;
- Mobile Money ;
- Cards ;
- TPE ;
- Notifications ;
- Documents ;
- Support ;
- Fraud/Risk ;
- Analytics ;
- Finance/Reconciliation ;
- Audit.

## 85. Décisions d’architecture

- isoler le domaine `public-sector` des domaines de paiement ;
- utiliser des adaptateurs pour chaque SI public ;
- ne jamais dupliquer le Ledger ;
- conserver les barèmes comme objets versionnés ;
- faire des obligations l’objet central du domaine ;
- traiter tous les paiements via les moteurs Mansa existants ;
- publier des événements pour les intégrations plutôt que coupler directement les modules.

## 86. Résultat attendu

Le module doit permettre à Mansa de devenir une couche de paiement et de traçabilité fiable pour les services publics, sans donner à la plateforme ni aux agents des pouvoirs non prévus par l’autorité compétente. L’architecture doit rendre les flux vérifiables, audités, configurables, interopérables et résistants aux erreurs, doublons et manipulations.
