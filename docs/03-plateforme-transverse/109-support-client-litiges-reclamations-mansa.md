# 109 — Support client, litiges et réclamations Mansa

## 1. Objet

Ce document définit le cahier des charges du module Support client, litiges et réclamations Mansa. Le module centralise la réception, la qualification, l’affectation, le traitement, l’escalade, la résolution et l’audit des demandes provenant des clients, commerçants, agents, entreprises, partenaires et administrations autorisées.

## 2. Objectifs

- fournir un point d’entrée unique pour le support ;
- rattacher les demandes aux utilisateurs, produits et transactions concernés ;
- distinguer demande générale, incident, réclamation et litige financier ;
- prioriser les cas urgents ;
- suivre les SLA et escalades ;
- assurer une traçabilité complète ;
- permettre une intégration prudente de Jini ;
- mesurer qualité, délais, volumes et satisfaction.

## 3. Intégrations

Le module s’intègre avec Identity, KYC/KYB, Wallet, Ledger, paiements, transferts, cartes, QR, TPE, Mobile Money, facturation, abonnements, fidélité, fraude et risque, notifications, Jini, Jini Voice, analytics, administration et services publics.

## 4. Principes non négociables

1. Le support ne modifie jamais directement un solde ou une écriture comptable.
2. Toute action sensible est autorisée et auditée.
3. Les données affichées sont limitées selon le rôle.
4. Les litiges financiers suivent un workflow dédié.
5. Toute résolution financière est exécutée par le domaine financier compétent.
6. Les délais sont configurables par pays, produit et partenaire.
7. Les pièces jointes sont contrôlées et stockées de manière sécurisée.
8. Démo, Recette et Production sont séparés.

## 5. Concepts principaux

- `SupportCase`
- `SupportConversation`
- `SupportMessage`
- `SupportParticipant`
- `SupportCategory`
- `SupportReason`
- `SupportPriority`
- `SupportAssignment`
- `SupportQueue`
- `SupportSlaPolicy`
- `SupportAttachment`
- `SupportNote`
- `SupportEscalation`
- `SupportResolution`
- `Dispute`
- `DisputeEvidence`
- `DisputeDecision`
- `RefundRequest`
- `CustomerSatisfactionSurvey`
- `SupportAuditEvent`

## 6. Types de dossiers

```text
QUESTION
REQUEST
INCIDENT
COMPLAINT
FINANCIAL_DISPUTE
CARD_DISPUTE
MERCHANT_DISPUTE
KYC_REVIEW
ACCOUNT_ACCESS
FRAUD_ALERT
TECHNICAL_ISSUE
PUBLIC_SERVICE_CASE
PARTNER_ESCALATION
```

## 7. États support

```text
NEW
OPEN
PENDING_CUSTOMER
PENDING_INTERNAL
PENDING_PARTNER
ESCALATED
RESOLVED
CLOSED
CANCELLED
```

## 8. États d’un litige

```text
CREATED
ELIGIBILITY_CHECK
EVIDENCE_REQUIRED
UNDER_REVIEW
PARTNER_REVIEW
DECISION_PENDING
ACCEPTED
PARTIALLY_ACCEPTED
REJECTED
SETTLEMENT_PENDING
SETTLED
CLOSED
```

## 9. Priorités

```text
CRITICAL
URGENT
HIGH
NORMAL
LOW
```

La priorité dépend du motif, de l’impact financier, du risque, du statut du compte, du produit et du SLA applicable.

## 10. Canaux de création

Un dossier peut être créé depuis l’application Client, l’application Commerçant, le TPE, Admin Lite, le portail web, un canal e-mail autorisé, Jini Voice, un agent support, un webhook partenaire ou un événement interne.

Le canal d’origine est conservé dans l’historique.

## 11. Données minimales

Chaque dossier contient : identifiant, organisation, pays, type, catégorie, motif, priorité, statut, utilisateur ou entité concernée, canal d’origine, produit, transaction associée si applicable, date de création, SLA, équipe responsable et historique d’affectation.

## 12. Timeline unifiée

La timeline contient les messages, notes internes, changements de statut, affectations, escalades, pièces, événements partenaires, décisions, actions financières demandées, notifications et événements SLA.

Chaque entrée possède un auteur, une source, une date et un type.

## 13. Files de traitement

```text
GENERAL_SUPPORT
PAYMENTS
TRANSFERS
CARDS
MOBILE_MONEY
MERCHANTS
KYC_KYB
FRAUD_RISK
TECHNICAL
PUBLIC_SERVICES
PARTNER_OPERATIONS
```

Le routage utilise notamment le pays, la langue, le produit, la priorité, la compétence et la charge disponible.

## 14. SLA

Une politique SLA définit le délai de première réponse, le délai cible de résolution, le calendrier ouvré, les pauses autorisées, les règles d’escalade et les exceptions applicables.

Le système déclenche des alertes avant et après dépassement.

## 15. Contestation de transaction

Lorsqu’une transaction est contestée, le système vérifie l’appartenance de la transaction, son état, son type, sa date, l’éligibilité au litige, la présence éventuelle d’un dossier existant, le motif et les éléments nécessaires à l’instruction.

Le ticket ne modifie jamais directement la transaction d’origine.

## 16. Motifs de litige

```text
TRANSACTION_NOT_RECOGNIZED
DUPLICATE_TRANSACTION
WRONG_AMOUNT
CASH_NOT_RECEIVED
MERCHANT_NOT_PAID
SERVICE_NOT_RECEIVED
REFUND_NOT_RECEIVED
TRANSFER_TO_WRONG_RECIPIENT
PARTNER_TIMEOUT
TECHNICAL_ERROR
OTHER
```

## 17. Décision et règlement

Une décision de litige enregistre le résultat, le motif, la justification interne, le message destiné au client, le décideur, la date et l’éventuelle action financière requise.

Lorsqu’un remboursement est nécessaire, le module crée une `RefundRequest` vers le service financier compétent avec identifiant de transaction, montant, devise, motif, approbations et clé d’idempotence.

## 18. Séparation des responsabilités

Le support peut consulter, qualifier, demander une action et suivre son résultat. Il ne peut pas contourner les contrôles du domaine financier, du risque, du KYC ou des cartes.

Les opérations importantes peuvent exiger une validation à quatre yeux.

## 19. RBAC et isolation

Rôles prévus :

```text
SUPPORT_AGENT
SUPPORT_SENIOR
SUPPORT_SUPERVISOR
DISPUTE_AGENT
FRAUD_AGENT
COMPLIANCE_AGENT
OPERATIONS_AGENT
PARTNER_AGENT
PUBLIC_SERVICE_AGENT
SUPPORT_ADMIN
SUPER_ADMIN
```

Les droits sont également limités par pays, organisation, produit, file et sensibilité.

## 20. Jini et Jini Voice

Jini peut classer une demande, proposer une priorité, résumer l’historique, suggérer une réponse, identifier un article d’aide, relever les informations manquantes et proposer une escalade.

Jini Voice peut transmettre au dossier l’identifiant d’appel, la langue, la transcription autorisée, le résumé, l’intention et le résultat du routage.

Les décisions financières irréversibles restent soumises aux politiques métier et aux autorisations applicables.

## 21. API et événements

Opérations principales :

```text
createCase
getCase
searchCases
addMessage
addInternalNote
assignCase
changeStatus
escalateCase
createDispute
submitDisputeEvidence
decideDispute
requestRefund
closeCase
reopenCase
```

Événements principaux :

```text
support.case.created
support.case.assigned
support.case.escalated
support.case.resolved
support.case.closed
support.sla.at_risk
support.sla.breached
dispute.created
dispute.evidence.required
dispute.decided
refund.requested
customer.satisfaction.received
```

Les commandes et webhooks concernés doivent être idempotents.

## 22. Sécurité et audit

Le module applique authentification forte pour les agents, contrôle d’accès serveur, validation des entrées, chiffrement, scan des pièces jointes, limitation de débit, masquage des données et journalisation des opérations sensibles.

L’audit couvre notamment les consultations sensibles, affectations, changements de statut, escalades, décisions, demandes de remboursement, exports et changements de règles.

## 23. Observabilité

Métriques minimales : dossiers créés, backlog, première réponse, temps moyen de résolution, taux de réouverture, dépassements SLA, volume par motif, litiges acceptés ou rejetés, remboursements demandés, satisfaction et temps d’attente partenaire.

## 24. Tests

Les tests couvrent :

- transitions d’état ;
- calcul SLA ;
- routage ;
- permissions ;
- isolation multi-tenant ;
- création de litige ;
- idempotence ;
- escalades ;
- demande de remboursement ;
- webhooks partenaires ;
- notifications ;
- pièces jointes ;
- sécurité des accès.

## 25. Déploiement progressif

Ordre recommandé : support général, files et SLA, paiements/transferts, litiges, cartes et Mobile Money, fraude/conformité, commerçants et agents, services publics, automatisations Jini, analytics avancés.

## 26. Définition de terminé

Le module est terminé lorsque la documentation, les contrats, modèles de données, workflows, files, SLA, permissions, politiques de sécurité, événements, intégrations, observabilité, administration et tests sont cohérents avec le reste de Mansa, et qu’un nouveau pays, partenaire ou type de dossier peut être ajouté sans réécrire le cœur du support.
