# Approvisionnement, fournisseurs et achats professionnels Mansa

## 1. Objet

Ce document définit le cahier des charges du moteur Mansa d’approvisionnement, de gestion fournisseurs et d’achats professionnels. Il complète les modules Commerce, catalogue/stock/POS, commandes/livraison, facturation, trésorerie, paiements, entreprises/employeurs, identité, fraude, notifications, analytics et API déjà documentés.

Le moteur est multi-tenant et réutilisable par commerces, restaurants, stations-service, supermarchés, entreprises, établissements, réseaux de franchises, associations et organismes publics lorsque leurs règles internes l’autorisent.

Il couvre le cycle `besoin -> demande d’achat -> approbation -> commande fournisseur -> réception -> rapprochement -> paiement -> retour/avoir -> reporting` sans remplacer la comptabilité légale ni imposer un fournisseur unique.

## 2. Principes fondamentaux

1. Un fournisseur, une commande d’achat, une réception et une facture fournisseur sont des objets distincts.
2. Toute dépense professionnelle peut être soumise à budget, centre de coût et workflow d’approbation.
3. Aucun paiement fournisseur n’est considéré comme confirmé sans preuve du ledger Mansa ou du prestataire de paiement vérifié.
4. Les montants sont stockés en unités mineures entières, jamais en flottants.
5. Les opérations mutatrices sont idempotentes.
6. Les créations, approbations, modifications, annulations, réceptions, écarts et paiements sont auditables.
7. Les rôles demandeur, approbateur, réceptionnaire, finance et administrateur sont séparables.
8. Les données fournisseurs sont minimisées et protégées selon leur sensibilité.
9. Les intégrations externes sont réalisées derrière des adaptateurs.
10. Les environnements Démo, Recette et Production sont strictement séparés.
11. Aucun secret fournisseur, bancaire ou prestataire n’est stocké dans Git.
12. Un document validé n’est jamais supprimé silencieusement : toute correction conserve l’historique.

## 3. Acteurs

- demandeur interne ;
- responsable d’équipe ;
- acheteur ;
- approbateur ;
- responsable de site ;
- magasinier ou réceptionnaire ;
- comptabilité fournisseurs ;
- trésorerie ;
- contrôleur interne ;
- administrateur d’organisation ;
- fournisseur ;
- partenaire financier ;
- auditeur habilité ;
- administrateur Mansa.

## 4. Périmètre fonctionnel

Le moteur couvre :

- référentiel fournisseurs ;
- catégories d’achat ;
- demandes d’achat ;
- budgets et centres de coût ;
- workflows d’approbation ;
- demandes de devis ;
- comparaison d’offres ;
- commandes fournisseurs ;
- contrats et prix négociés ;
- livraisons et réceptions ;
- contrôle qualité configurable ;
- écarts de quantité et de prix ;
- factures fournisseurs ;
- rapprochement 2-way ou 3-way ;
- échéanciers ;
- paiements fournisseurs ;
- retours fournisseur et avoirs ;
- réapprovisionnement automatique assisté ;
- historique, audit et analytics ;
- API et webhooks d’intégration.

## 5. Hors périmètre

Le module ne remplace pas :

- un ERP comptable complet ;
- la comptabilité légale ;
- un système fiscal national ;
- une banque ;
- un moteur de paie ;
- un outil de planification industrielle avancée ;
- une plateforme publique de marchés réglementés lorsque des procédures légales spécifiques s’appliquent.

Il peut s’intégrer à ces systèmes.

## 6. Référentiel fournisseur

Objet principal : `Supplier`.

Champs minimaux :

- id ;
- organizationId ;
- code interne ;
- raison sociale ou nom commercial ;
- type ;
- pays ;
- coordonnées professionnelles ;
- identifiants fiscaux ou d’enregistrement lorsque requis ;
- catégories fournies ;
- sites ou zones desservies ;
- devises acceptées ;
- conditions de paiement ;
- statut ;
- niveau de risque ;
- documents vérifiés ;
- createdAt ;
- updatedAt.

## 7. Types de fournisseurs

```text
PRODUCT_SUPPLIER
SERVICE_PROVIDER
WHOLESALER
DISTRIBUTOR
MANUFACTURER
LOGISTICS_PROVIDER
FUEL_SUPPLIER
UTILITIES_PROVIDER
PROFESSIONAL_SERVICE
PUBLIC_ENTITY
OTHER
```

Le type sert au paramétrage et ne détermine pas seul les permissions.

## 8. États fournisseur

```text
DRAFT
PENDING_REVIEW
ACTIVE
SUSPENDED
BLOCKED
ARCHIVED
```

Un fournisseur bloqué ne peut recevoir de nouvelle commande tant que le blocage est actif, sauf override explicitement autorisé et audité.

## 9. Fiche fournisseur et contrôle des doublons

Le système doit détecter les doublons probables par combinaison de nom, téléphone professionnel, email, identifiant fiscal, compte bancaire tokenisé ou référence partenaire.

Une fusion éventuelle doit être réservée à un rôle habilité, conserver les anciennes références et produire un événement d’audit.

## 10. Coordonnées bancaires fournisseur

Les coordonnées de règlement sensibles ne doivent pas être exposées inutilement aux utilisateurs opérationnels.

Toute modification d’un compte de règlement peut déclencher :

- authentification forte ;
- double validation ;
- délai de sécurité configurable ;
- notification à la finance ;
- comparaison avec l’historique ;
- blocage temporaire des paiements à risque.

Mansa privilégie les références tokenisées ou celles détenues par le prestataire financier lorsque cela est possible.

## 11. Catégories d’achat

Objet `ProcurementCategory`.

Exemples : marchandises, matières premières, carburant, emballages, entretien, informatique, prestations, transport, énergie, fournitures, construction, marketing.

Une catégorie peut définir : approbateurs requis, budget, fournisseurs autorisés, plafond, pièces justificatives, politique de devis et règles de réception.

## 12. Demande d’achat

Objet `PurchaseRequisition`.

Une demande d’achat décrit un besoin avant engagement fournisseur.

Champs minimaux :

- id ;
- requesterId ;
- organizationId ;
- locationId optionnel ;
- costCenterId ;
- categoryId ;
- description ;
- lignes demandées ;
- quantité ;
- estimation ;
- devise ;
- date souhaitée ;
- justification ;
- pièces jointes autorisées ;
- budgetReference ;
- statut ;
- workflowId.

## 13. États d’une demande d’achat

```text
DRAFT
SUBMITTED
UNDER_REVIEW
CHANGES_REQUESTED
APPROVED
PARTIALLY_APPROVED
REJECTED
CANCELLED
CONVERTED_TO_RFQ
CONVERTED_TO_PO
CLOSED
```

Les transitions sont contrôlées par machine à états.

## 14. Budgets et centres de coût

Toute demande peut être rattachée à :

- budget annuel ou périodique ;
- enveloppe par catégorie ;
- centre de coût ;
- projet ;
- site ;
- département ;
- programme public lorsque applicable.

Le moteur Budget Mansa reste la source de vérité des enveloppes lorsqu’il est activé.

## 15. Contrôle budgétaire

Modes configurables :

```text
INFORMATION_ONLY
WARN_ON_OVERAGE
BLOCK_ON_OVERAGE
REQUIRE_EXTRA_APPROVAL
EXTERNAL_BUDGET_CHECK
```

Le contrôle est effectué à la demande, à l’approbation et avant l’émission de la commande si la politique l’exige.

## 16. Workflows d’approbation

Le workflow peut dépendre de : montant, catégorie, site, département, fournisseur, risque, devise, type d’achat, contrat ou source de financement.

Exemples :

```text
<= 50_000 FCFA -> responsable de site
50_001 à 500_000 FCFA -> responsable + finance
> 500_000 FCFA -> direction + finance
```

Les seuils sont configurables par organisation. Ces valeurs ne sont que des exemples et ne constituent pas des règles Mansa imposées.

## 17. Délégation d’approbation

Une délégation doit posséder : titulaire, délégataire, périmètre, plafond, date de début, date de fin et justification.

Les délégations permanentes sans limite explicite doivent pouvoir être interdites par politique.

## 18. Demande de devis

Objet `RequestForQuotation` ou `RFQ`.

Une RFQ peut être créée depuis une demande d’achat approuvée ou directement par un acheteur habilité.

Elle définit : lignes, spécifications, quantités, date limite, conditions, devise, fournisseurs invités et critères de comparaison.

## 19. Offres fournisseur

Objet `SupplierQuote`.

Le système conserve : fournisseur, date, prix unitaires, taxes, transport, délais, conditions de paiement, durée de validité, remises et documents joints.

Une offre reçue ne doit pas écraser une offre antérieure ; chaque version reste historisée.

## 20. Comparaison des offres

Le moteur peut calculer des indicateurs de comparaison sans décider automatiquement d’un fournisseur lorsque la politique impose une décision humaine.

Critères possibles :

- coût total ;
- délai ;
- qualité historique ;
- respect SLA ;
- disponibilité ;
- conformité ;
- conditions de paiement ;
- risque fournisseur.

Les pondérations sont configurables et auditables.

## 21. Commande fournisseur

Objet `PurchaseOrder` ou `PO`.

Champs minimaux :

- id ;
- poNumber ;
- organizationId ;
- supplierId ;
- originatingRequisitionId optionnel ;
- contractId optionnel ;
- site de livraison ;
- devise ;
- sous-total ;
- taxes ;
- frais ;
- total ;
- conditions de paiement ;
- date d’émission ;
- date attendue ;
- statut ;
- approbations ;
- version ;
- idempotencyKey.

## 22. États d’une commande fournisseur

```text
DRAFT
PENDING_APPROVAL
APPROVED
SENT
ACKNOWLEDGED
PARTIALLY_RECEIVED
RECEIVED
PARTIALLY_INVOICED
INVOICED
CANCELLED
CLOSED
```

Une commande envoyée au fournisseur ne peut être modifiée silencieusement. Toute modification substantielle crée une nouvelle version ou un avenant.

## 23. Numérotation

Les numéros de PO sont uniques au minimum dans le périmètre organisation/environnement.

Ils peuvent suivre un format configurable, par exemple `PO-2026-BKO-000123`, sans exposer d’identifiant sensible.

## 24. Contrats fournisseurs

Objet `SupplierContract`.

Le contrat peut référencer : dates, catégories, prix négociés, remises, SLA, minimums, plafonds, renouvellement, documents, contacts et règles d’escalade.

Le module documentaire conserve les pièces ; le moteur achats conserve les références et règles exploitables.

## 25. Catalogues fournisseurs

Un fournisseur peut exposer un catalogue contractuel distinct du catalogue de vente Mansa.

Chaque article fournisseur peut être mappé vers un produit ou une matière interne sans imposer que les identifiants soient identiques.

## 26. Réapprovisionnement

Le moteur peut générer des suggestions à partir de :

- stock minimum ;
- stock de sécurité ;
- point de commande ;
- ventes récentes ;
- saisonnalité ;
- commandes clients confirmées ;
- délai fournisseur ;
- quantité économique configurable ;
- calendrier d’approvisionnement.

Une suggestion n’est pas une commande fournisseur tant qu’elle n’a pas franchi les validations requises.

## 27. Automatisation progressive

Modes :

```text
MANUAL_ONLY
SUGGEST_REQUISITION
AUTO_CREATE_DRAFT_REQUISITION
AUTO_SUBMIT_WITHIN_LIMITS
AUTO_CREATE_PO_WITHIN_APPROVED_CONTRACT
```

Les modes automatiques sont activables par organisation, catégorie, fournisseur, site et seuil. Chaque décision automatique est auditée.

## 28. Réception fournisseur

Objet `GoodsReceipt`.

Une réception est distincte de la commande et peut être partielle.

Champs : réceptionnaire, site, PO, date, lignes reçues, quantités acceptées, quantités refusées, lots/séries si applicables, état qualité, photos ou preuves si autorisées et commentaire.

## 29. Réception partielle

Une PO peut produire plusieurs réceptions. Le système calcule : commandé, déjà reçu, reçu lors de l’opération, restant et excédent éventuel.

Un dépassement de quantité peut être bloqué, toléré dans une marge ou soumis à approbation.

## 30. Contrôle qualité

Politiques possibles :

```text
NONE
VISUAL_CHECK
QUANTITY_CHECK
LOT_CHECK
EXPIRY_CHECK
QUALITY_APPROVAL_REQUIRED
EXTERNAL_QA
```

Pour les denrées, médicaments, carburants, matériaux ou produits réglementés, des règles spécialisées peuvent être ajoutées sans rendre le moteur générique dépendant d’un secteur.

## 31. Lots, séries et dates d’expiration

Lorsque le catalogue l’exige, la réception peut enregistrer numéro de lot, numéro de série, date de fabrication, date d’expiration et fournisseur d’origine.

Ces données alimentent le module Stock afin de supporter traçabilité et rappels.

## 32. Mise à jour du stock

Une réception validée crée des mouvements de stock idempotents vers le module Stock.

Une réception annulée ne supprime pas le mouvement initial : elle produit un mouvement correctif audité.

## 33. Écarts de réception

Types :

```text
SHORT_RECEIPT
OVER_RECEIPT
DAMAGED
WRONG_ITEM
QUALITY_REJECTED
MISSING_DOCUMENT
LATE_DELIVERY
OTHER
```

Chaque écart possède responsable, preuve minimale, résolution et impact financier éventuel.

## 34. Facture fournisseur

Objet `SupplierInvoice`.

Champs : numéro fournisseur, supplierId, dates, devise, lignes, taxes, total, référence PO éventuelle, référence réception éventuelle, échéance, statut, pièce source et empreinte anti-doublon.

## 35. Anti-doublon des factures

Le système recherche les doublons par fournisseur, numéro, montant, date, devise et empreinte documentaire lorsque disponible.

Un doublon probable est bloqué ou soumis à revue selon politique.

## 36. Rapprochement

Modes :

```text
NO_MATCH_REQUIRED
TWO_WAY_MATCH_PO_INVOICE
THREE_WAY_MATCH_PO_RECEIPT_INVOICE
EXTERNAL_MATCH
```

Le rapprochement 3-way compare commande, réception et facture avant autorisation de paiement.

## 37. Tolérances

Les tolérances de prix ou quantité sont configurables par organisation, catégorie, fournisseur et contrat.

Tout dépassement déclenche blocage, exception ou approbation renforcée selon politique.

## 38. États facture fournisseur

```text
DRAFT
RECEIVED
UNDER_REVIEW
MATCHED
EXCEPTION
APPROVED_FOR_PAYMENT
SCHEDULED
PARTIALLY_PAID
PAID
DISPUTED
CREDITED
CANCELLED
CLOSED
```

## 39. Échéanciers

Les échéances peuvent être : immédiates, net X jours, en plusieurs tranches, à réception, à validation, ou contractuelles.

Le système calcule les dates mais conserve la règle d’origine et les éventuelles modifications approuvées.

## 40. Paiement fournisseur

Le module transmet une instruction au moteur Paiements/Trésorerie. Il ne modifie pas directement le ledger.

Canaux possibles selon contrats et disponibilité :

```text
BANK_TRANSFER
MANSA_WALLET
MOBILE_MONEY
CARD_WHERE_SUPPORTED
PARTNER_RAIL
MANUAL_EXTERNAL_PAYMENT_REFERENCE
```

Le choix est configurable et doit respecter les limites réglementaires et contractuelles.

## 41. Paiement groupé

La trésorerie peut grouper plusieurs factures approuvées dans un lot de paiement, avec contrôles de total, bénéficiaires, devise et approbation.

Chaque facture conserve son allocation individuelle même lorsqu’elle est réglée dans un lot.

## 42. Double validation des paiements

Au-dessus d’un seuil configurable ou pour un changement récent de bénéficiaire, Mansa peut imposer maker-checker.

Le même utilisateur ne peut créer, modifier le bénéficiaire et approuver seul le paiement lorsque la politique de séparation des rôles l’interdit.

## 43. Paiement externe

Si un paiement est effectué en dehors de Mansa, le système peut enregistrer une référence externe et une preuve, mais le statut `PAID` doit suivre une procédure de confirmation ou rapprochement définie.

## 44. Retours fournisseur

Objet `SupplierReturn`.

Il référence réception, articles, quantités, motif, mode de retour, transport, preuve de remise et statut.

Le retour produit les mouvements de stock appropriés.

## 45. Avoirs fournisseur

Objet `SupplierCreditNote`.

Un avoir peut être appliqué à une facture ouverte, à un prochain paiement ou traité selon la politique comptable externe.

Le moteur conserve allocations et solde restant.

## 46. Litiges fournisseur

Un litige peut concerner prix, quantité, qualité, retard, facture ou contrat.

Le module Support/Litiges peut être utilisé pour les échanges structurés ; le module achats conserve la référence métier et l’impact opérationnel.

## 47. Performance fournisseur

Indicateurs possibles :

- taux de livraison à l’heure ;
- taux de conformité quantité ;
- taux de rejet qualité ;
- variation de prix ;
- temps moyen de résolution ;
- taux d’annulation ;
- taux de facture sans exception ;
- volume et valeur achetés.

Les scores doivent rester explicables et ne pas entraîner automatiquement une décision à fort impact sans politique définie.

## 48. Multi-sites

Une organisation peut gérer plusieurs magasins, dépôts, stations, restaurants ou bureaux.

Les fournisseurs, contrats et prix peuvent être globaux ou spécifiques à un site. Les réceptions et stocks restent attribués au lieu réel.

## 49. Transferts internes

Un besoin peut être satisfait par transfert de stock interne plutôt que par achat externe.

Le moteur peut recommander un transfert si un autre site dispose d’un surplus et si la politique l’autorise.

La décision et le mouvement restent gérés par le module Stock/Logistique.

## 50. Achats B2B et commandes récurrentes

Le moteur supporte commandes récurrentes, contrats-cadres, blanket orders, quantités prévues et appels de livraison.

Une récurrence ne doit pas contourner les plafonds et approbations applicables.

## 51. Stations-service

Pour une station-service, le module peut gérer achats de carburant, lubrifiants, pièces et produits boutique.

Les réceptions carburant peuvent ajouter des champs sectoriels : type de carburant, volume commandé, volume reçu, température ou densité si le processus métier l’exige, cuve de destination et document fournisseur.

Ces extensions ne modifient pas le socle générique.

## 52. Restaurants et commerces alimentaires

Le module peut gérer matières premières, emballages, dates d’expiration, lots, unités de conversion et fournisseurs alternatifs.

Les conversions d’unités doivent être déterministes et versionnées.

## 53. Entreprises et services

Les achats de services peuvent utiliser quantité, période, jalon, taux journalier ou montant forfaitaire.

La réception d’un service peut prendre la forme d’un `ServiceAcceptance` plutôt qu’un mouvement de stock.

## 54. Secteur public

Pour un organisme public, ce moteur peut être utilisé uniquement lorsque la procédure applicable l’autorise.

Les marchés publics, appels d’offres réglementés, seuils légaux, publications obligatoires ou contrôles externes doivent rester pilotés par les règles de l’autorité compétente. Mansa ne doit pas inventer ni contourner ces règles.

## 55. Fraude et contrôles internes

Signaux possibles :

- fournisseur créé puis payé immédiatement ;
- changement de compte bancaire avant paiement ;
- fractionnement de commandes sous un seuil ;
- multiples factures proches ;
- quantité reçue anormalement supérieure ;
- prix très au-dessus de l’historique ;
- approbations répétées par un même petit groupe ;
- conflit de séparation des rôles ;
- commandes hors horaires ou sites habituels.

Le Risk Engine peut scorer et demander revue sans bloquer arbitrairement toutes les opérations.

## 56. Conflits d’intérêts

Une organisation peut exiger une déclaration ou un contrôle de conflit d’intérêts pour certains achats.

Les données de conformité doivent être limitées aux finalités autorisées et accessibles uniquement aux rôles habilités.

## 57. Notifications

Événements configurables : demande soumise, approbation requise, demande rejetée, RFQ publiée, offre reçue, PO envoyée, retard fournisseur, réception, écart, facture reçue, exception de rapprochement, paiement planifié, paiement exécuté, retour ou avoir.

Les notifications passent par le moteur Notifications Mansa.

## 58. Jini

Jini peut assister :

- création d’une demande d’achat ;
- recherche de fournisseur existant ;
- synthèse d’offres ;
- détection d’écarts ;
- suggestion de réapprovisionnement ;
- préparation d’un rapport ;
- recherche dans les contrats et historiques autorisés.

Jini ne doit pas approuver une dépense, changer un bénéficiaire bancaire ou exécuter un paiement hors des politiques d’autorisation.

## 59. Jini Voice

Jini Voice peut permettre à un utilisateur habilité de consulter le statut d’une commande ou dicter une demande d’achat.

Toute création ou validation sensible doit être confirmée via un mécanisme d’authentification adapté ; la transcription vocale n’est jamais la source de vérité financière.

## 60. Offline et réseau dégradé

Un site peut préparer localement une réception ou une demande selon politique.

Les opérations offline doivent être signées, horodatées, bornées, idempotentes et resynchronisées. Aucun paiement fournisseur ne peut être inventé localement comme confirmé.

Les conflits de quantité ou de version sont placés en revue plutôt qu’écrasés silencieusement.

## 61. Intégrations comptables

Interface conceptuelle :

```text
AccountingAdapter
  exportSupplier()
  exportPurchaseOrder()
  exportReceipt()
  exportSupplierInvoice()
  exportCreditNote()
  exportPaymentReference()
  getSyncStatus()
```

Mansa doit pouvoir s’intégrer à plusieurs logiciels sans dépendre d’un ERP unique.

## 62. Intégrations fournisseurs

Interface conceptuelle :

```text
SupplierIntegrationAdapter
  sendRFQ()
  sendPurchaseOrder()
  getAcknowledgement()
  getCatalog()
  getShipmentStatus()
  receiveInvoice()
  receiveCreditNote()
  verifyWebhook()
```

Email structuré, portail fournisseur, API, EDI ou autre canal peuvent être supportés derrière les adaptateurs.

## 63. Portail fournisseur futur

Un portail fournisseur peut permettre :

- mise à jour contrôlée de la fiche ;
- réponse aux RFQ ;
- accusé de PO ;
- déclaration d’expédition ;
- dépôt de facture ;
- consultation du statut de paiement ;
- gestion des litiges.

Les modifications sensibles restent soumises aux validations de l’organisation cliente.

## 64. API

Endpoints conceptuels :

```text
POST /suppliers
GET /suppliers/{id}
POST /purchase-requisitions
POST /purchase-requisitions/{id}/submit
POST /purchase-requisitions/{id}/approve
POST /rfqs
POST /rfqs/{id}/quotes
POST /purchase-orders
POST /purchase-orders/{id}/send
POST /goods-receipts
POST /supplier-invoices
POST /supplier-invoices/{id}/match
POST /supplier-invoices/{id}/approve-payment
POST /supplier-returns
GET /procurement/analytics
```

Authentification, RBAC/ABAC, scopes, rate limits et idempotence sont obligatoires selon l’action.

## 65. Webhooks

Événements :

```text
supplier.activated
purchase_requisition.submitted
purchase_requisition.approved
rfq.created
supplier_quote.received
purchase_order.sent
purchase_order.acknowledged
goods_receipt.created
goods_receipt.exception
supplier_invoice.received
supplier_invoice.matched
supplier_invoice.exception
supplier_invoice.approved_for_payment
supplier_payment.completed
supplier_return.created
supplier_credit_note.received
```

Signature, timestamp, protection anti-rejeu, retries avec backoff et dead-letter queue sont requis.

## 66. Permissions

Exemples de scopes :

```text
procurement.supplier.read
procurement.supplier.manage
procurement.requisition.create
procurement.requisition.approve
procurement.rfq.manage
procurement.po.create
procurement.po.approve
procurement.receipt.create
procurement.invoice.read
procurement.invoice.match
procurement.invoice.approve_payment
procurement.return.manage
procurement.audit.read
```

Les permissions réelles sont composées avec organisation, site, montant et politique ABAC.

## 67. Audit

Événements obligatoires : création/modification fournisseur, changement bénéficiaire, demande, approbation, rejet, RFQ, sélection, PO, modification PO, réception, écart, facture, rapprochement, exception, approbation de paiement, paiement, retour, avoir et override.

Chaque événement conserve acteur, tenant, horodatage, ressource, action, résultat, motif et contexte technique minimal.

## 68. Conservation documentaire

Les bons de commande, devis, factures et preuves suivent une politique de conservation configurable tenant compte des obligations légales applicables.

Les pièces jointes sont contrôlées, chiffrées et protégées contre les types de fichiers dangereux.

## 69. Recherche

La recherche doit permettre au minimum : fournisseur, numéro PO, numéro facture, référence demande, site, période, statut, catégorie et centre de coût.

Les résultats respectent strictement le périmètre d’autorisation de l’utilisateur.

## 70. Analytics

Tableaux de bord possibles :

- dépenses par fournisseur ;
- dépenses par catégorie ;
- dépenses par site ;
- budget consommé ;
- délais d’approbation ;
- commandes ouvertes ;
- réceptions en retard ;
- écarts de réception ;
- factures en exception ;
- échéances à venir ;
- économies contractuelles ;
- concentration fournisseurs ;
- performance fournisseur.

## 71. Export

Formats possibles : CSV, XLSX, PDF de synthèse et API, selon permissions.

Les exports volumineux sont générés de manière asynchrone, avec lien temporaire et audit.

## 72. Multi-devise

Une commande et une facture conservent leur devise d’origine.

Si un reporting consolidé est demandé, le taux de conversion utilisé, sa source et sa date sont conservés afin de rendre le calcul reproductible.

## 73. Taxes

Les taxes fournisseurs sont enregistrées à partir des données applicables et des intégrations autorisées.

Mansa ne doit pas inventer un régime fiscal ni prétendre remplacer un conseil fiscal ou le système de l’administration.

## 74. Résilience

Les commandes et réceptions doivent survivre aux retries réseau sans duplication. Les webhooks externes sont idempotents. Les événements critiques peuvent être relayés via outbox transactionnelle.

Les écritures financières suivent les règles de résilience du ledger Mansa.

## 75. Observabilité

Métriques : taux d’erreur, latence, files d’attente, webhooks échoués, rapprochements en exception, synchronisations ERP échouées, opérations offline en attente et paiements bloqués.

Des alertes techniques ne doivent pas exposer de données fournisseurs sensibles.

## 76. Tests minimaux

- création et déduplication fournisseur ;
- changement de compte bancaire avec double validation ;
- demande d’achat et workflow multi-seuil ;
- contrôle budgétaire ;
- RFQ et comparaison d’offres ;
- création/versionnement PO ;
- réception partielle ;
- dépassement de quantité ;
- lot et expiration ;
- facture doublon ;
- 2-way et 3-way match ;
- tolérance de prix ;
- exception et override ;
- paiement groupé ;
- séparation des rôles ;
- retour et avoir ;
- offline/replay ;
- isolation multi-tenant ;
- idempotence API/webhooks.

## 77. Critères d’acceptation

Le module est considéré fonctionnel lorsqu’une organisation peut :

1. créer et valider ses fournisseurs ;
2. créer une demande d’achat avec budget et centre de coût ;
3. exécuter un workflow d’approbation ;
4. lancer une RFQ et comparer les offres ;
5. émettre une commande fournisseur versionnée ;
6. réceptionner partiellement ou totalement ;
7. mettre à jour le stock de manière auditable ;
8. recevoir et rapprocher une facture ;
9. gérer les exceptions ;
10. autoriser et tracer le paiement via les rails Mansa ;
11. gérer retour et avoir ;
12. analyser dépenses et performance ;
13. fonctionner avec plusieurs fournisseurs, sites, devises et intégrations sans verrouillage technique.

## 78. Résultat attendu

Mansa doit fournir un moteur d’achats professionnels complet mais modulaire : une organisation peut exprimer un besoin, faire approuver la dépense, consulter des fournisseurs, émettre une commande, réceptionner les biens ou services, rapprocher la facture, payer via les rails autorisés, gérer les écarts et analyser ses achats, avec séparation des rôles, audit, contrôle budgétaire, fonctionnement multi-sites et intégrations multi-fournisseurs, sans transformer Mansa en ERP monolithique ni contourner les obligations réglementaires applicables.
