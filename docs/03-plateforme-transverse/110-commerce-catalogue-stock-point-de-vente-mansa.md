# 110 — Commerce, catalogue, stock et point de vente Mansa

## 1. Objet

Ce document définit le cahier des charges du module Commerce, catalogue, stock et point de vente Mansa. Il couvre la gestion opérationnelle d’un commerce depuis l’application Commerçant et le TPE : établissements, points de vente, employés, catalogue, variantes, prix, stock, ventes, retours, remises, tickets, synchronisation hors ligne et rapprochement avec les paiements.

## 2. Objectifs

- permettre à un commerçant de gérer un ou plusieurs établissements ;
- centraliser les produits, services, prix, taxes, remises et disponibilités ;
- gérer le stock par point de vente ;
- enregistrer des ventes avec ou sans paiement Mansa ;
- rapprocher automatiquement les ventes avec les transactions de paiement ;
- fonctionner en connectivité dégradée lorsque cela est autorisé ;
- limiter les pertes, erreurs et fraudes internes ;
- fournir des données fiables à la facturation, la fidélité et l’analytics.

## 3. Périmètre

Le module couvre :

- organisation commerçante ;
- établissements et points de vente ;
- utilisateurs et rôles métier ;
- catalogue produits et services ;
- catégories, variantes, options et unités ;
- prix et promotions ;
- gestion de stock ;
- panier et vente ;
- retours et annulations ;
- tickets et reçus ;
- caisse et sessions opérateur ;
- synchronisation offline ;
- intégration paiements, QR et TPE ;
- reporting opérationnel.

## 4. Hors périmètre

Le module ne remplace pas :

- le ledger financier Mansa ;
- le moteur de paiement ;
- la comptabilité légale complète d’une entreprise ;
- un ERP industriel complet ;
- un système de paie ;
- un WMS avancé pour grands entrepôts.

Ces fonctions peuvent être intégrées via API.

## 5. Intégrations

Le module s’intègre avec Identity, KYC/KYB, Wallet, Ledger, paiements, QR, NFC, cartes, Mobile Money, TPE, facturation, fidélité, abonnements, notifications, fraude et risque, support, analytics, administration, Jini et services publics lorsque pertinent.

## 6. Principes non négociables

1. Une vente commerciale et une transaction financière sont deux objets distincts.
2. Une vente ne modifie jamais directement un solde financier.
3. Tout mouvement de stock est traçable.
4. Toute modification de prix sensible est auditée.
5. Les permissions sont limitées par organisation, établissement et point de vente.
6. Les ventes offline ne doivent jamais contourner les limites de risque.
7. La synchronisation est idempotente.
8. Les données de paiement sensibles ne sont jamais stockées dans le domaine commerce.
9. Démo, Recette et Production sont séparés.

## 7. Concepts principaux

- `MerchantOrganization`
- `Store`
- `PointOfSale`
- `MerchantEmployee`
- `MerchantRole`
- `Catalog`
- `Category`
- `Product`
- `ProductVariant`
- `ServiceItem`
- `PriceBook`
- `Price`
- `Promotion`
- `InventoryLocation`
- `StockItem`
- `StockMovement`
- `StockAdjustment`
- `Sale`
- `SaleLine`
- `Cart`
- `Discount`
- `TaxRule`
- `Return`
- `RefundLink`
- `CashSession`
- `Receipt`
- `OfflineOperation`
- `SyncCursor`
- `MerchantAuditEvent`

## 8. Organisation commerçante

Une organisation commerçante peut contenir plusieurs enseignes, établissements et points de vente. Chaque entité possède un statut, un pays, une devise principale, un fuseau horaire, des règles de prix et des paramètres opérationnels.

Les identifiants juridiques et KYC/KYB restent gérés dans les domaines conformité et identité.

## 9. Établissements et points de vente

Un `Store` représente un établissement physique ou digital. Un `PointOfSale` représente un poste, un comptoir, une caisse, un TPE ou une instance logique de vente.

États possibles :

```text
DRAFT
ACTIVE
SUSPENDED
CLOSED
```

Chaque point de vente peut disposer de son catalogue, de ses règles de prix, de son stock, de ses utilisateurs autorisés et de ses méthodes de paiement disponibles.

## 10. Rôles commerçants

Rôles minimaux :

```text
MERCHANT_OWNER
MERCHANT_ADMIN
STORE_MANAGER
CASHIER
SALES_AGENT
STOCK_MANAGER
ACCOUNTING_VIEWER
SUPPORT_VIEWER
```

Le RBAC est renforcé par des contraintes de portée : organisation, établissement, point de vente et fonctionnalité.

## 11. Catalogue

Le catalogue gère produits et services. Chaque article contient au minimum : identifiant, nom, description, type, catégorie, statut, SKU facultatif, code-barres facultatif, unité, images, taxe applicable, règles de disponibilité et métadonnées.

Types :

```text
PHYSICAL_PRODUCT
DIGITAL_PRODUCT
SERVICE
FEE
OTHER
```

## 12. Variantes et options

Un produit peut avoir des variantes selon taille, couleur, conditionnement ou autre attribut configurable.

Chaque variante possède son propre SKU, code-barres, prix, stock et statut lorsque nécessaire.

Les options non stockées peuvent être utilisées pour des suppléments de service ou de restauration.

## 13. Catégories

Les catégories sont hiérarchiques et configurables. Elles servent à la navigation, au reporting, aux règles de promotion et aux restrictions éventuelles.

La suppression d’une catégorie utilisée est logique et ne détruit jamais l’historique.

## 14. Prix

Un prix est défini par :

- article ou variante ;
- devise ;
- montant en unité monétaire minimale ;
- période de validité ;
- point de vente ou groupe de points de vente ;
- canal ;
- priorité ;
- statut.

Aucun montant n’est stocké en flottant.

## 15. Livres de prix

Les `PriceBook` permettent de gérer plusieurs grilles : standard, gros, partenaire, VIP, temporaire, campagne ou établissement spécifique.

En cas de concurrence, une règle déterministe choisit le prix applicable.

## 16. Promotions et remises

Types :

```text
PERCENTAGE
FIXED_AMOUNT
BUY_X_GET_Y
BUNDLE_PRICE
LOYALTY_REWARD
MANUAL_DISCOUNT
PROMO_CODE
```

Chaque promotion possède une période, un périmètre, des conditions, un plafond, des règles de cumul et une priorité.

Les remises manuelles peuvent exiger un rôle supérieur ou une approbation.

## 17. Taxes

Le module applique des `TaxRule` configurables par pays, catégorie, article et période. Il ne déduit pas la conformité fiscale sans configuration officielle.

Le ticket conserve les montants hors taxe, taxes, taux et montants TTC lorsque le modèle du pays l’exige.

## 18. Stock

Le stock est géré par emplacement. Chaque `StockItem` contient notamment quantité disponible, réservée, seuil d’alerte, unité et dernière mise à jour.

Les quantités utilisent un format décimal adapté à l’unité métier, distinct des montants financiers.

## 19. Mouvements de stock

Types :

```text
RECEIPT
SALE
RETURN_IN
RETURN_OUT
TRANSFER_IN
TRANSFER_OUT
ADJUSTMENT_POSITIVE
ADJUSTMENT_NEGATIVE
DAMAGE
LOSS
EXPIRATION
INITIALIZATION
```

Tout mouvement contient auteur, date, origine, référence, quantité avant/après et justification lorsque nécessaire.

## 20. Ajustements

Les ajustements manuels négatifs ou importants exigent une permission spécifique et peuvent nécessiter une validation à quatre yeux.

Les seuils d’approbation sont configurables par organisation.

## 21. Transferts de stock

Un transfert entre emplacements suit un workflow :

```text
DRAFT
REQUESTED
APPROVED
IN_TRANSIT
RECEIVED
CANCELLED
```

Les sorties et entrées sont corrélées et auditées.

## 22. Panier

Un `Cart` est temporaire. Il contient articles, quantités, prix calculés, remises, taxes, vendeur, point de vente et contexte de canal.

Le recalcul serveur est obligatoire avant confirmation afin de ne pas faire confiance au prix fourni par le client.

## 23. Vente

États :

```text
DRAFT
PENDING_PAYMENT
PARTIALLY_PAID
PAID
COMPLETED
CANCELLED
RETURNED
PARTIALLY_RETURNED
```

Une vente possède un total commercial, un montant payé, un solde éventuel, les moyens de paiement utilisés et les références financières associées.

## 24. Paiement d’une vente

Une vente peut être réglée par un ou plusieurs moyens autorisés : Wallet Mansa, QR, carte via TPE, Mobile Money, espèces déclarées, virement référencé ou autre moyen configuré.

Le moteur de paiement reste responsable de l’autorisation financière.

Le domaine commerce reçoit uniquement les statuts et références nécessaires.

## 25. Paiement fractionné

Le système peut accepter plusieurs paiements sur une même vente si la politique commerçant l’autorise.

Chaque tentative possède son identifiant et son état. Le total réglé ne peut pas dépasser le montant dû sauf workflow explicite de pourboire ou avoir.

## 26. Vente en espèces

Une vente en espèces peut être enregistrée pour le suivi opérationnel. Elle ne génère pas de mouvement Wallet Mansa.

Le module peut néanmoins intégrer cette donnée aux rapports de caisse si l’organisation l’active.

## 27. Sessions de caisse

Une `CashSession` relie un opérateur, un point de vente, une heure d’ouverture et une heure de fermeture.

Elle peut contenir fonds initial, ventes espèces, remboursements, entrées/sorties déclarées, comptage final et écart.

Les écarts dépassant un seuil sont signalés.

## 28. Annulation

Une vente non finalisée peut être annulée selon les permissions. Une vente payée ne doit pas être supprimée : elle passe par un workflow de retour ou de remboursement.

Les annulations sont auditées.

## 29. Retours

Un `Return` référence une vente d’origine et les lignes retournées.

Motifs :

```text
CUSTOMER_REQUEST
DEFECTIVE
WRONG_ITEM
NOT_AS_DESCRIBED
DUPLICATE_SALE
MERCHANT_ERROR
OTHER
```

Le retour met à jour le stock uniquement selon la politique de remise en stock.

## 30. Remboursements

Le module commerce ne crédite jamais directement un wallet ou une carte. Il crée une demande de remboursement vers le domaine financier compétent avec la vente, la transaction, le montant, la devise, le motif et la clé d’idempotence.

Le statut financier retourné est reflété sur le retour.

## 31. Reçus et tickets

Un reçu commercial contient au minimum : commerçant, établissement, point de vente, date, numéro de vente, lignes, quantités, prix, remises, taxes, total, moyens de paiement masqués et références utiles.

Il peut être imprimé, envoyé électroniquement ou exporté selon les droits.

## 32. Numérotation

Les numéros de vente et de reçu sont générés de manière unique dans leur périmètre. La règle de numérotation est configurable mais ne doit pas reposer sur un simple compteur client hors ligne non protégé.

## 33. Mode hors ligne

Le mode offline permet uniquement les opérations autorisées par une politique locale : consultation de cache, construction de panier, enregistrement de vente locale, impression locale et, si explicitement permis, paiement offline selon les capacités du fournisseur.

Les limites dépendent du risque, du terminal, de la méthode de paiement, du montant et de l’ancienneté de la dernière synchronisation.

## 34. Journal offline

Chaque opération offline possède :

- `offlineOperationId` unique ;
- terminal ;
- utilisateur ;
- horodatage local ;
- séquence ;
- payload signé ou protégé ;
- version du schéma ;
- statut de synchronisation.

Les opérations sont rejouées de manière idempotente.

## 35. Résolution des conflits

Les conflits de synchronisation utilisent des règles par type d’objet. Les prix et permissions serveur priment. Les ventes déjà finalisées ne sont jamais écrasées silencieusement.

Un conflit non résolvable automatiquement est placé en revue opérationnelle.

## 36. Code-barres et scan

Le TPE et l’application Commerçant peuvent scanner un code-barres ou QR article pour identifier un produit. Les formats supportés sont configurables.

Le scan ne doit jamais permettre d’injecter un prix ou un identifiant non validé.

## 37. Inventaire physique

Le module peut créer une session d’inventaire avec gel logique facultatif, liste attendue, quantités comptées, écarts et validation.

La validation génère des mouvements d’ajustement audités.

## 38. Alertes stock

Alertes possibles : stock faible, rupture, stock négatif interdit, mouvement inhabituel, forte démarque, inventaire en retard et produit expirant lorsque la donnée existe.

Les alertes sont routées via le module Notifications.

## 39. Multi-devise

Un établissement peut afficher plusieurs devises si autorisé. La devise comptable de la vente reste explicite.

Toute conversion utilise le module FX et conserve taux, source et horodatage.

## 40. Fidélité

La vente publie les événements nécessaires au calcul des points, cashback et récompenses. Le domaine Fidélité reste responsable de ses règles et soldes.

Les récompenses utilisées sont référencées dans la vente.

## 41. Facturation

Après une vente éligible, le module peut demander la création d’un reçu fiscal, d’une facture ou d’un justificatif au domaine Facturation.

Les obligations réglementaires restent configurables par pays.

## 42. Employés et sécurité interne

Les actions sensibles comprennent notamment : changement de prix, remise manuelle, annulation, retour, ajustement de stock, ouverture de tiroir, export et clôture forcée.

Elles peuvent exiger authentification renforcée, approbation manager ou justification.

## 43. Limites et politiques

Paramètres configurables :

- remise maximale par rôle ;
- montant maximal d’annulation ;
- seuil d’ajustement stock ;
- délai maximal de retour ;
- montant offline maximal ;
- durée maximale sans synchronisation ;
- méthodes de paiement autorisées ;
- politiques de prix et taxe.

## 44. API principales

```text
createStore
updateStore
createPointOfSale
assignEmployee
createProduct
updateProduct
createVariant
setPrice
createPromotion
adjustStock
transferStock
createCart
priceCart
createSale
attachPayment
completeSale
cancelSale
createReturn
requestRefund
openCashSession
closeCashSession
syncOfflineOperations
```

Toutes les commandes critiques possèdent une clé d’idempotence lorsque nécessaire.

## 45. Événements principaux

```text
merchant.store.created
merchant.pos.activated
catalog.product.created
catalog.price.changed
inventory.stock.low
inventory.stock.adjusted
inventory.transfer.completed
sale.created
sale.payment.attached
sale.completed
sale.cancelled
sale.returned
cash_session.opened
cash_session.closed
offline.sync.completed
offline.sync.conflict
```

## 46. Modèle de données

Les entités métier sont isolées par `merchantOrganizationId`. Les relations vers Identity, KYC/KYB, Wallet et paiements utilisent des identifiants de référence, sans duplication des données sensibles.

Les objets historiques essentiels sont conservés même si un produit ou un utilisateur est désactivé.

## 47. Audit

L’audit couvre au minimum :

- création et modification d’établissement ;
- changements de rôle ;
- modifications de prix ;
- promotions ;
- ajustements et transferts de stock ;
- annulations ;
- retours ;
- demandes de remboursement ;
- clôtures de caisse ;
- exports ;
- conflits offline.

## 48. Anti-fraude

Des signaux sont transmis au moteur Risque : fréquence d’annulations, remises anormales, retours répétés, stock négatif, écarts de caisse, ventes fractionnées inhabituelles, terminal nouveau, activité hors horaires et volume anormal.

Le moteur Risque peut imposer une revue, une limite ou un blocage selon ses politiques.

## 49. Observabilité

Métriques minimales :

- nombre de ventes ;
- chiffre d’affaires brut commercial ;
- panier moyen ;
- taux d’annulation ;
- taux de retour ;
- promotions utilisées ;
- stock faible ;
- valeur estimée du stock ;
- démarque ;
- écarts de caisse ;
- taux de synchronisation offline ;
- conflits de synchronisation ;
- latence de création et finalisation de vente.

## 50. Analytics

Le domaine Analytics reçoit des événements pseudonymisés ou minimisés selon les besoins : vente, article, catégorie, magasin, canal, paiement, remise et stock.

Les rapports doivent respecter les droits d’accès et le cloisonnement organisationnel.

## 51. Jini

Jini peut aider à rechercher un produit, expliquer une baisse de stock, résumer les ventes, détecter des anomalies, proposer un réassort ou expliquer un écart de caisse.

Jini ne peut pas modifier prix, stock ou remboursements sans autorisation et politique métier explicites.

## 52. Administration

Le portail Admin permet selon le rôle : consultation organisation, points de vente, incidents de synchronisation, règles globales, limites, blocages, métriques et audit.

Les administrateurs Mansa ne doivent pas pouvoir modifier arbitrairement les prix d’un commerçant sans permission métier dédiée.

## 53. Performance

Objectifs indicatifs :

- lecture catalogue locale quasi instantanée après cache ;
- ajout au panier sous 200 ms côté service hors réseau externe ;
- création de vente sous 500 ms hors traitement paiement ;
- synchronisation paginée et reprise après interruption ;
- support de catalogues volumineux via pagination et indexation.

Ces objectifs sont mesurés par environnement et ajustés selon l’infrastructure réelle.

## 54. Résilience

Les appels aux domaines de paiement, fidélité, facturation et notifications utilisent timeouts, retries prudents, circuit breakers lorsque pertinent et événements asynchrones.

Une panne de notification ne doit pas invalider une vente déjà confirmée.

## 55. Sécurité

Le module applique :

- authentification forte selon rôle ;
- RBAC/ABAC serveur ;
- chiffrement en transit et au repos ;
- validation stricte des entrées ;
- protection contre rejeu ;
- rate limiting ;
- séparation des tenants ;
- journaux inviolables pour les actions sensibles ;
- révocation terminal et session.

## 56. Protection des données

Le domaine commerce conserve uniquement les données nécessaires à l’opération commerciale. Les données personnelles clients sont minimisées et référencées depuis Identity lorsque possible.

Les exports sont contrôlés et audités.

## 57. Tests unitaires

Les tests couvrent : calcul prix, promotions, taxes, transitions de vente, stock, ajustements, retours, limites, permissions et règles offline.

## 58. Tests d’intégration

Les tests couvrent : paiement réussi/échoué, idempotence, retour, remboursement, fidélité, facturation, notifications, risque, synchronisation et multi-tenant.

## 59. Tests offline

Scénarios minimaux :

- coupure avant création ;
- coupure après création locale ;
- double envoi ;
- opérations hors ordre ;
- conflit de prix ;
- utilisateur révoqué avant resynchronisation ;
- terminal révoqué ;
- expiration de la fenêtre offline ;
- reprise après crash.

## 60. Tests de sécurité

Vérifier notamment : escalade de privilèges, accès croisé entre commerçants, modification de prix côté client, rejeu offline, export non autorisé, accès à un établissement hors périmètre et manipulation des références de paiement.

## 61. Déploiement progressif

Ordre recommandé :

1. établissements et rôles ;
2. catalogue et prix ;
3. panier et vente ;
4. intégration paiements ;
5. tickets ;
6. stock ;
7. retours ;
8. sessions de caisse ;
9. offline ;
10. promotions et fidélité ;
11. analytics avancés.

## 62. Critères d’acceptation

Le module est acceptable lorsque :

- un commerçant peut créer et gérer son catalogue ;
- un employé autorisé peut réaliser une vente ;
- le paiement est correctement rapproché ;
- le stock est mis à jour de façon traçable ;
- les retours et remboursements suivent les workflows prévus ;
- le mode offline est idempotent et limité ;
- les permissions sont respectées ;
- les métriques et audits sont disponibles ;
- les tests critiques passent.

## 63. Définition de terminé

Le module est terminé lorsque les contrats API, modèles, workflows, règles de prix, stock, ventes, retours, caisse, offline, permissions, intégrations, sécurité, audit, observabilité et tests sont cohérents avec le reste de Mansa, et qu’un nouvel établissement, point de vente, terminal ou pays peut être ajouté sans réécrire le cœur du domaine commerce.
