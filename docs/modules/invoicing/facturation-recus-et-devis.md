# Cahier des charges — Facturation, reçus et devis

## 1. Objet

Ce module permet aux commerçants et organisations utilisant Mansa de créer, transmettre, suivre et archiver des devis, factures et reçus liés à leurs ventes et encaissements. Il doit fonctionner de manière cohérente avec les paiements, le wallet, le TPE, le QR, les liens de paiement, les exports comptables et l’administration.

## 2. Objectifs

- créer des devis et factures depuis l’application Commerçant et le portail web ;
- générer automatiquement un reçu après un paiement confirmé ;
- relier chaque document à une transaction lorsqu’elle existe ;
- permettre l’envoi par notification, e-mail, lien ou QR ;
- conserver un historique complet et auditable ;
- gérer plusieurs langues, devises et pays ;
- permettre les exports PDF et structurés ;
- éviter toute modification silencieuse d’un document déjà émis.

## 3. Acteurs

- commerçant ;
- employé de commerce ;
- client ;
- administrateur de l’organisation ;
- comptable ;
- support Mansa ;
- système de paiement ;
- partenaire comptable ou ERP.

## 4. Types de documents

Le module doit prendre en charge au minimum :

- devis ;
- facture ;
- facture d’acompte ;
- facture finale ;
- avoir ;
- reçu de paiement ;
- reçu de remboursement ;
- preuve de règlement ;
- note ou document personnalisé non fiscal lorsque la réglementation l’autorise.

Chaque type est activable ou désactivable par pays et organisation.

## 5. Cycle de vie

### 5.1 Devis

Statuts :

- DRAFT ;
- SENT ;
- VIEWED ;
- ACCEPTED ;
- REJECTED ;
- EXPIRED ;
- CONVERTED ;
- CANCELLED.

Un devis accepté peut être converti en facture en conservant le lien vers le document d’origine.

### 5.2 Facture

Statuts :

- DRAFT ;
- ISSUED ;
- PARTIALLY_PAID ;
- PAID ;
- OVERDUE ;
- CANCELLED ;
- CREDITED.

Une facture émise ne doit pas être modifiée directement. Toute correction significative doit passer par une nouvelle version, un avoir ou une annulation tracée selon la règle applicable.

### 5.3 Reçu

Un reçu est généré uniquement à partir d’un paiement confirmé ou d’une opération explicitement enregistrée comme encaissée.

Le reçu doit rester immuable après émission.

## 6. Contenu minimal d’un document

Selon le type et le pays :

- identifiant unique ;
- numéro lisible ;
- type de document ;
- date d’émission ;
- date d’échéance éventuelle ;
- identité de l’organisation ;
- identité du client si nécessaire ;
- adresse ;
- identifiant fiscal ou légal si requis ;
- lignes de produits ou services ;
- quantité ;
- prix unitaire ;
- remises ;
- taxes ;
- sous-total ;
- total ;
- devise ;
- montant payé ;
- solde restant ;
- mode de paiement ;
- référence de transaction ;
- conditions ;
- mentions légales ;
- langue ;
- statut.

## 7. Numérotation

La numérotation est configurable par organisation et par type de document.

Exemple de format :

`INV-2026-00001234`

Contraintes :

- unicité ;
- incrément contrôlé ;
- pas de réutilisation d’un numéro annulé si la réglementation l’interdit ;
- séquence séparée par pays, organisation ou établissement si nécessaire ;
- verrouillage transactionnel pour éviter les doublons en concurrence.

## 8. Catalogue et lignes

Une ligne peut provenir :

- du catalogue du commerçant ;
- d’une saisie libre ;
- d’un panier POS ;
- d’une commande ;
- d’un abonnement ;
- d’une intégration externe.

Chaque ligne contient un snapshot des informations au moment de l’émission afin qu’une modification future du catalogue ne change jamais un document historique.

## 9. Taxes et remises

Le moteur doit permettre :

- taxe par ligne ;
- taxe globale ;
- plusieurs taux ;
- exonération ;
- remise fixe ;
- remise en pourcentage ;
- remise par ligne ;
- remise globale.

Les règles fiscales doivent être configurables par juridiction et validées avant activation en production.

## 10. Paiement d’une facture

Une facture peut être réglée via :

- wallet Mansa ;
- QR ;
- lien de paiement ;
- TPE ;
- Mobile Money ;
- carte ;
- virement ;
- autre canal externe validé.

Le module doit pouvoir générer une demande de paiement liée à la facture.

Lorsqu’un paiement est confirmé :

1. le paiement est rapproché de la facture ;
2. le montant payé est mis à jour ;
3. le statut passe à `PARTIALLY_PAID` ou `PAID` ;
4. un reçu est généré ;
5. les événements correspondants sont publiés.

## 11. Paiement partiel

Une facture peut accepter ou refuser les paiements partiels selon configuration.

Le système doit conserver :

- chaque paiement ;
- sa date ;
- son canal ;
- son montant ;
- son identifiant de transaction ;
- le solde avant et après paiement.

## 12. Remboursement et avoir

Un remboursement financier et un avoir comptable sont deux opérations distinctes.

Le système doit pouvoir :

- créer un avoir total ou partiel ;
- relier l’avoir à la facture d’origine ;
- enregistrer un remboursement ;
- générer un reçu de remboursement ;
- conserver les liens entre tous les documents et transactions concernés.

## 13. Envoi et partage

Canaux possibles :

- notification dans l’application ;
- e-mail ;
- SMS contenant un lien ;
- WhatsApp ou autre canal via intégration future ;
- QR ;
- téléchargement PDF ;
- impression POS ;
- partage natif mobile.

Le lien public doit être signé, expirable et limité aux données nécessaires.

## 14. PDF

Le moteur PDF doit :

- utiliser un template versionné ;
- supporter logo et identité visuelle ;
- respecter les champs légaux du pays ;
- prendre en charge plusieurs langues ;
- produire un rendu stable ;
- permettre impression A4 et formats de ticket adaptés ;
- conserver l’empreinte du rendu émis si nécessaire.

## 15. Données et modèle minimal

Entités recommandées :

- `Invoice` ;
- `InvoiceLine` ;
- `InvoicePayment` ;
- `Quote` ;
- `QuoteLine` ;
- `Receipt` ;
- `CreditNote` ;
- `DocumentSequence` ;
- `DocumentTemplate` ;
- `DocumentDelivery` ;
- `TaxRuleSnapshot` ;
- `InvoiceAuditEvent`.

Les montants sont stockés en unités monétaires entières, jamais en flottants.

## 16. API minimale

Exemples :

- `POST /quotes` ;
- `GET /quotes/:id` ;
- `POST /quotes/:id/send` ;
- `POST /quotes/:id/accept` ;
- `POST /quotes/:id/convert` ;
- `POST /invoices` ;
- `GET /invoices/:id` ;
- `POST /invoices/:id/issue` ;
- `POST /invoices/:id/send` ;
- `POST /invoices/:id/payment-request` ;
- `GET /invoices/:id/payments` ;
- `POST /invoices/:id/credit-notes` ;
- `GET /receipts/:id` ;
- `GET /receipts/:id/pdf`.

Toutes les opérations d’écriture sensibles doivent être idempotentes lorsque nécessaire.

## 17. Événements

Événements métier recommandés :

- `quote.created` ;
- `quote.sent` ;
- `quote.accepted` ;
- `quote.converted` ;
- `invoice.created` ;
- `invoice.issued` ;
- `invoice.sent` ;
- `invoice.partially_paid` ;
- `invoice.paid` ;
- `invoice.overdue` ;
- `invoice.cancelled` ;
- `credit_note.issued` ;
- `receipt.issued` ;
- `receipt.refund_issued`.

## 18. Relances

Le commerçant peut activer des relances automatiques :

- avant échéance ;
- le jour de l’échéance ;
- après retard ;
- selon plusieurs paliers.

Les relances doivent respecter les préférences du client et les règles locales.

## 19. Multi-établissement

Une organisation possédant plusieurs boutiques doit pouvoir :

- séparer ou mutualiser les séquences ;
- utiliser des adresses différentes ;
- affecter un document à un établissement ;
- filtrer les rapports ;
- déléguer des permissions par établissement.

## 20. Permissions

Rôles possibles :

- INVOICE_VIEWER ;
- INVOICE_CREATOR ;
- INVOICE_MANAGER ;
- ACCOUNTANT ;
- ORGANIZATION_ADMIN.

Actions sensibles :

- annulation ;
- création d’avoir ;
- modification de séquence ;
- changement de règle fiscale ;
- export massif.

Elles doivent être auditées et peuvent exiger une validation renforcée.

## 21. Intégrations

Le module doit pouvoir s’intégrer avec :

- système de paiement Mansa ;
- wallet ;
- TPE ;
- catalogue commerçant ;
- abonnements ;
- commandes ;
- comptabilité ;
- ERP ;
- stockage documentaire ;
- notifications ;
- analytics.

Les intégrations externes passent par des adaptateurs et webhooks versionnés.

## 22. Exports

Formats recommandés :

- PDF ;
- CSV ;
- XLSX ;
- JSON ;
- export comptable spécifique via adaptateur.

Les exports volumineux doivent être générés de manière asynchrone avec contrôle d’accès et expiration du lien.

## 23. Recherche et filtres

Critères minimum :

- numéro ;
- client ;
- statut ;
- date ;
- montant ;
- devise ;
- établissement ;
- transaction ;
- type de document ;
- retard ;
- canal de paiement.

## 24. Observabilité

Métriques :

- documents créés ;
- factures émises ;
- valeur facturée ;
- valeur encaissée ;
- délai moyen de paiement ;
- taux de paiement à l’échéance ;
- montant en retard ;
- avoirs ;
- remboursements ;
- erreurs de génération PDF ;
- erreurs d’envoi ;
- erreurs de rapprochement.

## 25. Sécurité

Exigences :

- contrôle d’accès par organisation ;
- prévention de l’accès croisé entre tenants ;
- chiffrement en transit et au repos ;
- URLs publiques signées et expirables ;
- journal d’audit ;
- protection anti-rejeu ;
- idempotence ;
- aucune donnée de carte sensible dans les documents ;
- masquage des informations personnelles lorsque nécessaire.

## 26. Archivage

Les durées de conservation doivent être configurées par pays.

Un document fiscal ou légal soumis à une obligation de conservation ne doit pas être supprimé avant l’échéance réglementaire applicable.

L’archivage doit préserver :

- contenu ;
- version ;
- date ;
- identifiant ;
- relations ;
- historique ;
- preuve d’émission.

## 27. Tests

Tests minimum :

- numérotation concurrente ;
- calcul des totaux ;
- remises ;
- taxes ;
- paiements partiels ;
- conversion devis vers facture ;
- création d’avoir ;
- génération reçu ;
- idempotence ;
- permissions ;
- multi-tenant ;
- PDF ;
- relances ;
- rapprochement avec transactions.

## 28. Critères d’acceptation

Le module est prêt lorsque :

1. un commerçant peut créer un devis et le convertir en facture ;
2. une facture émise devient immuable ;
3. un paiement confirmé met à jour la facture de manière idempotente ;
4. un reçu est généré automatiquement ;
5. les paiements partiels sont correctement suivis ;
6. les avoirs sont reliés à la facture d’origine ;
7. les séquences sont uniques même en concurrence ;
8. les PDF sont générés de manière stable ;
9. les exports respectent les permissions ;
10. toutes les actions sensibles sont auditées ;
11. les règles par pays sont configurables ;
12. aucun secret n’est présent dans le dépôt.
