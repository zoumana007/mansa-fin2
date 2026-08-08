# Commandes, livraison et logistique du dernier kilomètre Mansa

## 1. Objet

Ce document définit le cahier des charges du moteur Mansa de commandes, préparation, retrait, livraison et orchestration logistique. Il complète les modules Commerce, catalogue/stock/POS, checkout, paiements, facturation, notifications, identité, fraude, annuaire et analytics déjà documentés.

Le moteur est multi-tenant et réutilisable par boutiques, restaurants, pharmacies lorsque la réglementation l’autorise, stations-service, supermarchés, entreprises, marketplaces, établissements et organismes publics. Il ne dépend d’aucun transporteur unique.

## 2. Principes fondamentaux

1. Une commande existe indépendamment de son paiement.
2. Une commande et une livraison possèdent des machines à états distinctes.
3. Aucun statut `DELIVERED` n’est créé sans événement de preuve conforme à la politique du marchand.
4. Les paiements restent gérés par le ledger et le moteur de paiement Mansa.
5. Les stocks réservés, préparés, remis et annulés sont traçables.
6. Les transporteurs externes sont intégrés derrière des adaptateurs.
7. Les opérations mutatrices sont idempotentes.
8. Les données de localisation sont minimisées et conservées selon une politique explicite.
9. Les environnements Démo, Recette et Production sont séparés.
10. Aucun secret prestataire n’est stocké dans Git.

## 3. Acteurs

- client ;
- commerçant ;
- caissier ;
- préparateur ;
- responsable de point de vente ;
- livreur interne ;
- société de livraison partenaire ;
- support ;
- finance ;
- administrateur Mansa ;
- système partenaire via API.

## 4. Canaux de commande

```text
CLIENT_APP
MERCHANT_APP
MERCHANT_WEB
POS
PUBLIC_WEB
PAYMENT_LINK
QR
API
JINI_ASSISTED
JINI_VOICE_ASSISTED
PUBLIC_SERVICE
```

Une commande créée par Jini ou Jini Voice doit toujours produire une confirmation structurée avant engagement financier lorsque les règles métier l’exigent.

## 5. Modes d’exécution

```text
IN_STORE
CLICK_AND_COLLECT
CURBSIDE_PICKUP
MERCHANT_DELIVERY
PARTNER_DELIVERY
CUSTOMER_CARRIER
DIGITAL_FULFILLMENT
SCHEDULED_SERVICE
```

Les modes disponibles sont configurables par organisation, site, zone, horaire, catégorie de produit et environnement.

## 6. Modèle de commande

Objet principal : `Order`.

Champs minimaux :

- id ;
- organizationId ;
- merchantId ;
- locationId ;
- customerId optionnel ;
- channel ;
- fulfillmentMode ;
- currency ;
- subtotalMinor ;
- discountMinor ;
- taxMinor ;
- deliveryFeeMinor ;
- serviceFeeMinor ;
- totalMinor ;
- paymentStatus ;
- fulfillmentStatus ;
- createdAt ;
- promisedAt optionnel ;
- metadata minimales ;
- idempotencyKey ;
- environment.

Aucun montant n’est stocké en flottant.

## 7. Lignes de commande

Chaque `OrderItem` conserve au minimum : produit ou service, variante, quantité, prix unitaire au moment de la commande, remises, taxes applicables, options, état de préparation et référence de stock si applicable.

Une modification ultérieure du catalogue ne doit pas réécrire l’historique d’une commande passée.

## 8. États de commande

```text
DRAFT
PENDING_CONFIRMATION
CONFIRMED
ACCEPTED
IN_PREPARATION
READY
PARTIALLY_FULFILLED
FULFILLED
CANCELLED
REJECTED
EXPIRED
RETURN_REQUESTED
PARTIALLY_RETURNED
RETURNED
CLOSED
```

Les transitions sont contrôlées et auditées.

## 9. Paiement et commande

`paymentStatus` est séparé :

```text
UNPAID
PENDING
AUTHORIZED
PARTIALLY_PAID
PAID
PARTIALLY_REFUNDED
REFUNDED
FAILED
```

Le moteur Checkout/PaymentIntent reste la source de vérité du paiement. Le module Commandes ne simule jamais une confirmation financière.

## 10. Réservation de stock

Selon la politique du commerce, le stock peut être réservé : à la confirmation, à l’autorisation du paiement, à la capture ou à l’acceptation par le commerce.

Toute réservation possède une expiration. Une annulation ou expiration libère les quantités de manière idempotente.

## 11. Ruptures et substitutions

Le commerce peut configurer :

```text
NO_SUBSTITUTION
CUSTOMER_APPROVAL_REQUIRED
EQUIVALENT_ALLOWED
PARTIAL_FULFILLMENT_ALLOWED
```

Toute substitution doit conserver le produit initial, le produit substitué, la différence de prix et le consentement lorsque requis.

## 12. Préparation

Le préparateur dispose d’une file de travail par site avec priorités, heure promise et contraintes métier.

Événements : `PICK_STARTED`, `ITEM_PICKED`, `ITEM_UNAVAILABLE`, `SUBSTITUTION_PROPOSED`, `PACKED`, `READY_FOR_HANDOFF`.

Les scans code-barres peuvent être utilisés pour réduire les erreurs.

## 13. Click & Collect

Le client reçoit une référence ou un QR de retrait ne contenant aucun secret permanent. La remise peut exiger un code à usage limité, QR dynamique, contrôle d’identité proportionné ou validation depuis l’application.

La preuve de retrait est horodatée et auditée.

## 14. Livraison

Objet `Delivery` distinct de `Order`.

Champs : id, orderId, providerType, providerId, courierId optionnel, pickup, destination, zone, fee, status, requestedAt, assignedAt, pickedUpAt, deliveredAt, proofPolicy, externalReference.

## 15. États de livraison

```text
CREATED
QUOTING
AWAITING_ASSIGNMENT
ASSIGNED
COURIER_EN_ROUTE_TO_PICKUP
AT_PICKUP
PICKED_UP
IN_TRANSIT
AT_DESTINATION
DELIVERED
DELIVERY_FAILED
CANCELLED
RETURN_TO_ORIGIN
RETURNED_TO_ORIGIN
```

## 16. Zones de livraison

Une organisation peut définir des zones par polygone, rayon, communes/quartiers, codes postaux lorsqu’ils existent ou listes administratives.

Chaque zone peut définir disponibilité, frais, minimum de commande, délai estimé, plages horaires, transporteurs autorisés et limites de capacité.

## 17. Adresses adaptées aux marchés locaux

Le modèle ne doit pas dépendre exclusivement d’une adresse postale occidentale. Il supporte : libellé libre, quartier, commune, ville, point de repère, coordonnées GPS consenties, instructions de remise et numéro de contact.

Les coordonnées précises ne sont collectées que lorsqu’elles sont nécessaires.

## 18. Tarification de livraison

Modes configurables :

```text
FREE
FIXED
BY_ZONE
BY_DISTANCE
BY_WEIGHT
BY_ORDER_VALUE
EXTERNAL_QUOTE
CONTRACT_RATE
```

Le tarif présenté au client est figé dans la commande une fois accepté, sauf modification explicitement consentie.

## 19. Créneaux et capacité

Les commerces peuvent définir des créneaux, capacité maximale, jours fériés, fermetures exceptionnelles et cut-off de commande.

Le moteur évite la sur-réservation par réservation temporaire de capacité.

## 20. Livreurs internes

Un commerce peut gérer sa propre flotte : livreurs, véhicules, disponibilité, zones, affectations et historique.

Les permissions sont limitées : un livreur ne doit voir que les données nécessaires à ses missions actives.

## 21. Transporteurs partenaires

Interface conceptuelle :

```text
DeliveryProviderAdapter
  quote()
  createDelivery()
  cancelDelivery()
  getStatus()
  assign()
  getTracking()
  verifyWebhook()
  getProof()
```

Aucun partenaire n’est codé comme unique fournisseur obligatoire.

## 22. Affectation

Modes : manuel, automatique interne, transporteur externe ou hybride. L’algorithme peut tenir compte de zone, capacité, véhicule, SLA, coût et disponibilité, sans discrimination fondée sur des attributs non nécessaires.

## 23. Suivi temps réel

Le suivi temps réel est optionnel et soumis au consentement et aux besoins opérationnels. La position haute fréquence ne doit pas être conservée indéfiniment.

Le client peut recevoir un statut sans accéder à l’historique complet de déplacement du livreur.

## 24. Preuve de livraison

Politiques configurables :

```text
NONE
CUSTOMER_CONFIRMATION
ONE_TIME_CODE
QR_HANDOFF
SIGNATURE
PHOTO_WHERE_LAWFUL
MERCHANT_CONFIRMATION
PROVIDER_PROOF
```

Une photo ne doit pas être obligatoire lorsqu’une méthode moins intrusive suffit. Les politiques de conservation sont configurables.

## 25. Paiement à la livraison

Le paiement à la livraison peut être activé par marché et commerce. Moyens possibles selon configuration : TPE, QR, wallet, Mobile Money ou espèces enregistrées.

Un livreur ne doit jamais marquer arbitrairement un paiement électronique comme réussi. La confirmation provient du ledger ou du prestataire vérifié.

Les espèces impliquent caisse, rapprochement, plafonds et audit séparés.

## 26. Livraison échouée

Le système conserve motif, tentative, heure et prochaine action. Options : nouvelle tentative, retrait en point de vente, retour origine, remboursement selon politique.

## 27. Annulation

Les règles dépendent de l’état : avant acceptation, préparation, prise en charge ou livraison. Les frais éventuels doivent être annoncés avant confirmation et conformes aux règles applicables.

Une annulation ne supprime jamais l’historique.

## 28. Retours

Objet `ReturnRequest` avec lignes concernées, motif, preuves minimales, méthode de retour, décision, remboursement associé et événements logistiques.

Les politiques sont définies par commerce dans les limites légales.

## 29. Remboursements

Le module déclenche une demande vers le moteur de paiement ; il ne modifie pas directement le ledger. Les remboursements partiels suivent les quantités effectivement retournées et les règles commerciales.

## 30. Restaurants et préparation rapide

Le moteur supporte temps de préparation, options/modificateurs, rupture temporaire, cuisine ou poste de préparation, commande à emporter et livraison.

Il ne remplace pas nécessairement un KDS spécialisé mais peut s’y intégrer.

## 31. Stations-service et entreprises

Le moteur peut traiter commandes de produits/services de station, retraits planifiés et commandes de flotte. Les achats carburant réglementés ou liés à un véhicule restent reliés au module Flotte/Carburant et à ses règles de plafond, véhicule, conducteur et station.

## 32. Commandes B2B

Support : bon de commande, centre de coût, approbation interne, prix contractuels, facturation différée autorisée, limites d’achat et références entreprise.

## 33. Marketplace future

Le modèle autorise plusieurs vendeurs sans activer automatiquement une marketplace réglementaire. Une future orchestration multi-vendeur doit séparer commande parent, sous-commandes, commissions, règlements, responsabilités et litiges.

## 34. Notifications

Événements configurables : confirmation, acceptation, préparation, prêt, livreur assigné, départ, arrivée, livré, échec, annulation, retour et remboursement.

Canaux via le moteur Notifications : push, SMS, email, WhatsApp ou autres uniquement lorsque disponibles et autorisés.

## 35. Jini et Jini Voice

Jini peut assister recherche, constitution du panier, statut et support. Jini Voice peut prendre une commande pour une organisation configurée.

Toute action financière ou modification sensible suit les mêmes contrôles d’autorisation que les interfaces classiques. Les conversations ne deviennent pas la source de vérité métier.

## 36. API

Endpoints conceptuels :

```text
POST /orders
GET /orders/{id}
POST /orders/{id}/confirm
POST /orders/{id}/cancel
POST /orders/{id}/items
POST /orders/{id}/fulfillment
POST /deliveries/quote
POST /deliveries
GET /deliveries/{id}
POST /deliveries/{id}/cancel
POST /returns
GET /returns/{id}
```

Authentification, RBAC, scopes, rate limits et idempotence sont obligatoires selon le canal.

## 37. Webhooks

Événements : `order.created`, `order.confirmed`, `order.ready`, `order.cancelled`, `delivery.assigned`, `delivery.picked_up`, `delivery.delivered`, `delivery.failed`, `return.created`, `return.completed`.

Signature, timestamp, anti-rejeu, retries avec backoff et dead-letter queue sont requis.

## 38. Offline et réseau dégradé

Un POS peut préparer certaines opérations locales selon politique, mais ne doit jamais inventer un paiement ou une livraison confirmée. Les mutations offline sont signées, bornées, ordonnées et resynchronisées avec détection de doublons et conflits.

## 39. Sécurité

RBAC/ABAC, authentification forte pour actions sensibles, chiffrement, journalisation, séparation des rôles, protection anti-rejeu et minimisation des données.

Les codes de remise sont courts en durée de vie, non réutilisables et stockés sous forme adaptée à la vérification sécurisée.

## 40. Vie privée

Les données de livraison ne doivent pas devenir un historique permanent de déplacements. Durées de conservation par catégorie, accès limité, export et suppression/anonymisation selon obligations légales et contractuelles.

## 41. Fraude et abus

Signaux possibles : répétition d’échecs, commandes anormales, abus de promotions, multiples comptes, incohérences de remise, faux statuts, remboursements excessifs, livreur/commerce à risque.

Le Risk Engine produit un score ou une décision auditable ; les décisions critiques peuvent nécessiter revue humaine.

## 42. Audit

Tracer création, modification, acceptation, substitution, préparation, affectation, remise, preuve, annulation, retour, remboursement et interventions manuelles.

Une correction crée un nouvel événement ; elle ne détruit pas l’événement initial.

## 43. Analytics

Indicateurs : volume commandes, panier moyen, taux d’acceptation, préparation moyenne, respect SLA, taux de livraison, échecs, annulations, retours, coût livraison, performance par zone/site/canal et satisfaction lorsqu’elle est collectée.

## 44. Configuration

Tout paramétrage significatif doit être versionné avec date d’effet : zones, frais, créneaux, modes, prestataires, preuves, annulations, retours, paiement à livraison, limites et politiques offline.

## 45. Multi-pays et multi-devises

Les règles de fiscalité, adresse, protection du consommateur, livraison, espèces et conservation varient par pays. Elles sont configurées et validées juridiquement ; aucune règle française, malienne ou autre ne devient implicitement universelle.

## 46. Tests obligatoires

- transitions d’état ;
- idempotence ;
- réservation/libération stock ;
- concurrence sur capacité ;
- substitutions ;
- calcul frais ;
- webhooks dupliqués/hors ordre ;
- paiement en attente ;
- annulation concurrente ;
- preuve à usage unique ;
- réseau dégradé ;
- retour/remboursement partiel ;
- isolation multi-tenant ;
- permissions livreur ;
- adaptateur transporteur indisponible.

## 47. Observabilité

Métriques, logs structurés sans secrets, traces distribuées, corrélation `orderId/paymentIntentId/deliveryId`, alertes sur files bloquées, taux d’échec prestataire et retards anormaux.

## 48. Déploiement progressif

Phase 1 : commandes + click & collect + livraison manuelle.

Phase 2 : livreurs internes + zones + créneaux + preuves.

Phase 3 : adaptateurs transporteurs + tracking + optimisation.

Phase 4 : B2B avancé et orchestration multi-vendeur lorsque le modèle juridique et commercial est validé.

## 49. Hors périmètre initial

- devenir automatiquement transporteur réglementé ;
- garantir une adresse postale universelle ;
- marketplace multi-vendeur avec conservation de fonds sans cadre réglementaire ;
- surveillance permanente des livreurs ;
- décision autonome de remboursement par IA ;
- logistique internationale douanière complète.

## 50. Résultat attendu

Mansa doit fournir un moteur de commandes et de fulfillment cohérent avec son écosystème : un commerce peut recevoir une commande depuis n’importe quel canal autorisé, réserver et préparer les articles, encaisser via les rails Mansa, remettre sur place ou orchestrer une livraison interne/externe, conserver une preuve auditable, gérer échecs et retours et analyser ses opérations, sans verrouillage à un fournisseur matériel, transporteur ou moyen de paiement unique.
