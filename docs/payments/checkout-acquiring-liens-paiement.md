# Checkout, acquisition marchande et liens de paiement Mansa

## 1. Objet

Ce document définit le cahier des charges du moteur Mansa de paiement marchand en ligne et à distance. Il complète les modules Commerce, TPE, cartes, Mobile Money, abonnements, facturation, litiges, rapprochement et ledger déjà présents.

L’objectif est de permettre à un commerçant ou une organisation de recevoir des paiements via une interface Mansa unifiée sans imposer un seul acquéreur, un seul réseau carte ou un seul opérateur Mobile Money.

Mansa doit pouvoir fournir :

- un checkout hébergé ;
- un checkout embarqué ;
- des liens de paiement ;
- des QR de paiement ;
- une API de paiement ;
- des SDK lorsque nécessaire ;
- l’orchestration de plusieurs prestataires ;
- l’autorisation, la capture, l’annulation et le remboursement ;
- le suivi de règlement ;
- les webhooks ;
- la réconciliation ;
- la gestion de litiges ;
- l’intégration aux abonnements et factures récurrentes.

Ce module ne transforme pas automatiquement Mansa en acquéreur réglementé. Lorsque l’activité d’acquisition, d’encaissement, de conservation ou de règlement nécessite un agrément ou une licence, elle doit être portée par Mansa uniquement si les autorisations réglementaires nécessaires existent, sinon par une banque, un acquéreur, un établissement de paiement ou un partenaire autorisé.

## 2. Principes fondamentaux

1. Le ledger Mansa reste la référence interne des écritures Mansa.
2. Un paiement externe n’est jamais considéré comme confirmé sur la seule base d’un écran client.
3. Toute confirmation provient soit du ledger Mansa, soit d’une réponse ou notification vérifiable du prestataire de paiement.
4. Aucun PAN complet ni CVV ne doit être stocké par Mansa sauf architecture explicitement certifiée et autorisée ; par défaut, utiliser tokenisation ou composants hébergés d’un prestataire conforme.
5. Les moyens de paiement sont configurables par pays, organisation, commerce, canal et environnement.
6. Les secrets prestataires ne sont jamais stockés dans le dépôt Git.
7. Tous les appels mutateurs sont idempotents.
8. Tous les montants sont manipulés en unités monétaires entières, jamais en flottant.
9. Les règlements et commissions doivent être rapprochables de manière déterministe.
10. Les environnements Démo, Recette et Production sont strictement séparés.

## 3. Acteurs

- client final ;
- commerçant ;
- organisation ;
- opérateur de caisse ;
- administrateur commerce ;
- équipe Finance ;
- support ;
- banque partenaire ;
- acquéreur carte ;
- opérateur Mobile Money ;
- PSP ou passerelle de paiement ;
- équipe Risque ;
- auditeur ;
- administrateur Mansa.

## 4. Canaux de paiement

Le moteur doit supporter au minimum :

```text
HOSTED_CHECKOUT
EMBEDDED_CHECKOUT
PAYMENT_LINK
QR
MOBILE_APP
WEB_APP
MERCHANT_PORTAL
API
INVOICE
SUBSCRIPTION
POS_HANDOFF
```

Le canal ne détermine pas seul le moyen de paiement. Un même checkout peut proposer plusieurs moyens selon les règles activées.

## 5. Moyens de paiement

Moyens potentiels :

```text
MANSA_WALLET
CARD
MOBILE_MONEY
BANK_TRANSFER
BANK_ACCOUNT_INITIATION
QR
PAY_BY_LINK
CASH_REFERENCE
OTHER_PROVIDER
```

Chaque moyen est activable ou désactivable sans modification du code.

La disponibilité dépend :

- du pays ;
- du partenaire disponible ;
- des accords contractuels ;
- de la devise ;
- du profil marchand ;
- du risque ;
- du canal ;
- du montant ;
- de l’environnement.

## 6. Cartes bancaires

Le système carte doit être multi-acquéreur et multi-réseaux derrière des adaptateurs.

Lorsqu’ils sont contractuellement disponibles, les réseaux Visa et Mastercard peuvent être proposés, ainsi que d’autres réseaux activés par l’acquéreur.

Mansa ne doit jamais afficher une promesse du type « toutes les cartes du monde sont acceptées » sans preuve contractuelle et technique.

Le fournisseur carte doit exposer, directement ou indirectement :

- création d’intention de paiement ;
- authentification client lorsque requise ;
- autorisation ;
- capture ;
- annulation ;
- remboursement ;
- statut ;
- tokenisation ;
- notifications ;
- données de rapprochement.

## 7. Tokenisation et données carte

Architecture par défaut :

`Navigateur/App → composant sécurisé PSP/acquéreur → token de paiement → backend Mansa → adaptateur prestataire`.

Mansa doit éviter de recevoir le PAN et le CVV lorsque l’intégration du partenaire permet une collecte directe sécurisée.

Règles :

- ne jamais journaliser le PAN complet ;
- ne jamais journaliser le CVV ;
- masquer les numéros de carte ;
- utiliser des tokens opaques ;
- limiter les données carte aux usages nécessaires ;
- respecter les exigences PCI DSS applicables à l’architecture choisie.

## 8. Mobile Money

Le checkout peut proposer les opérateurs Mobile Money disponibles selon le pays et les contrats.

Le moteur doit supporter différents modèles :

- redirection ;
- push de confirmation ;
- demande initiée par API ;
- QR ;
- référence de paiement ;
- validation via application opérateur.

Un paiement Mobile Money reste `PENDING` tant qu’une confirmation vérifiable n’a pas été reçue.

## 9. Wallet Mansa

Un paiement wallet peut être autorisé directement dans Mansa si le compte, les règles et le solde le permettent.

Flux minimal :

1. création de l’intention ;
2. contrôle du compte ;
3. contrôle risque ;
4. authentification si requise ;
5. réservation ou débit ;
6. écriture ledger ;
7. confirmation ;
8. reçu ;
9. notification commerce.

## 10. Virement bancaire et initiation de paiement

Le checkout peut proposer :

- virement classique vers une référence dédiée ;
- compte virtuel si fourni par un partenaire ;
- initiation via Open Banking ou API bancaire lorsque disponible ;
- QR contenant une référence de paiement.

Un virement ne doit pas être considéré payé sur simple déclaration du client. La confirmation doit provenir du partenaire bancaire ou du rapprochement bancaire.

## 11. Intentions de paiement

Objet principal :

```text
PaymentIntent
```

Champs minimaux :

- id ;
- merchantId ;
- customerId optionnel ;
- amountMinor ;
- currency ;
- description ;
- reference ;
- channel ;
- allowedPaymentMethods ;
- status ;
- captureMode ;
- expiresAt ;
- metadata minimales ;
- createdAt ;
- updatedAt ;
- idempotencyKey ;
- environment.

## 12. États d’une intention

```text
CREATED
REQUIRES_PAYMENT_METHOD
REQUIRES_ACTION
PROCESSING
AUTHORIZED
PARTIALLY_CAPTURED
CAPTURED
SUCCEEDED
FAILED
CANCELLED
EXPIRED
PARTIALLY_REFUNDED
REFUNDED
DISPUTED
```

Les transitions doivent être contrôlées par machine à états.

## 13. Autorisation et capture

Deux modes :

```text
AUTOMATIC_CAPTURE
MANUAL_CAPTURE
```

Le mode manuel est utile notamment pour :

- hôtels ;
- location ;
- commandes avec disponibilité à confirmer ;
- prestations différées ;
- commerce nécessitant une validation avant encaissement.

La durée maximale d’autorisation dépend du prestataire et du réseau. Mansa doit utiliser les limites fournies par le partenaire au lieu de coder une durée universelle.

## 14. Capture partielle

Lorsque supportée par le prestataire, Mansa peut permettre une capture inférieure au montant autorisé.

Le système doit conserver :

- montant autorisé ;
- montant capturé ;
- montant restant ;
- date ;
- référence externe ;
- motif éventuel.

## 15. Annulation

Une intention non capturée peut être annulée si le prestataire le permet.

L’annulation ne supprime jamais l’historique de l’intention.

## 16. Remboursements

Le moteur doit supporter :

- remboursement total ;
- remboursement partiel ;
- plusieurs remboursements partiels dans la limite du montant encaissé ;
- raison ;
- approbateur si requis ;
- statut ;
- référence externe ;
- rapprochement.

États possibles :

```text
REFUND_REQUESTED
REFUND_PROCESSING
REFUND_SUCCEEDED
REFUND_FAILED
REFUND_CANCELLED
```

## 17. Checkout hébergé

Mansa peut fournir une page de paiement hébergée avec :

- logo commerce ;
- nom ;
- montant ;
- devise ;
- description ;
- numéro de commande ;
- moyens disponibles ;
- langue ;
- mentions réglementaires ;
- politique de remboursement si applicable ;
- retour vers le commerce.

Le design est personnalisable dans les limites de sécurité et de conformité.

## 18. Checkout embarqué

Le checkout embarqué peut être intégré dans le site ou l’application du marchand.

Le composant ne doit pas exposer de secrets serveur.

Toute donnée sensible doit passer par des composants ou flux sécurisés adaptés au prestataire.

## 19. Liens de paiement

Un marchand peut créer un `PaymentLink` depuis :

- Commerce ;
- portail web ;
- facture ;
- API ;
- support autorisé.

Champs :

- montant fixe ou libre selon règle ;
- devise ;
- motif ;
- date d’expiration ;
- nombre maximal d’utilisations ;
- moyens autorisés ;
- client optionnel ;
- référence ;
- redirection après paiement ;
- état.

## 20. Liens à montant fixe et libre

Deux modèles :

```text
FIXED_AMOUNT
CUSTOMER_ENTERED_AMOUNT
```

Le montant libre peut être utile pour dons, cotisations ou encaissements variables, mais doit imposer des minimums et maximums configurables.

## 21. QR de paiement

Le QR peut représenter :

- une intention précise ;
- un lien de paiement ;
- une facture ;
- une commande ;
- un identifiant commerce avec montant saisi ensuite.

Le QR ne doit pas contenir de secret permanent.

## 22. Expiration

Les intentions, QR ou liens peuvent expirer.

À expiration :

- le client ne peut plus initier un nouveau paiement ;
- les callbacks tardifs sont traités de façon idempotente ;
- l’historique est conservé ;
- une nouvelle intention peut être créée si nécessaire.

## 23. Commandes et paiements

Le paiement peut être lié à :

```text
Order
Invoice
Booking
Subscription
Quote
PublicObligation
MerchantSale
ServiceRequest
```

Une commande peut exister indépendamment du paiement.

## 24. Paiement de facture

Une facture Mansa peut générer automatiquement :

- lien ;
- QR ;
- référence ;
- intention ;
- reçu après paiement.

Les paiements partiels sont autorisés uniquement si la facture les accepte.

## 25. Abonnements

Le moteur s’intègre au module Abonnements pour :

- paiement initial ;
- renouvellement ;
- changement de moyen de paiement ;
- échec ;
- relance ;
- période de grâce ;
- résiliation.

Les credentials réutilisables doivent être des tokens prestataires autorisés, jamais des données carte brutes.

## 26. Authentification renforcée

Lorsque le prestataire ou la réglementation exige une authentification supplémentaire, Mansa doit supporter les étapes de type :

```text
REQUIRES_ACTION
REDIRECT_REQUIRED
CHALLENGE_REQUIRED
APPROVAL_REQUIRED
```

Le système ne doit pas coder en dur un mécanisme propre à un seul marché comme unique solution mondiale.

## 27. Router de paiement

Le `PaymentRouter` choisit l’adaptateur applicable selon :

- pays ;
- devise ;
- moyen ;
- disponibilité ;
- coût ;
- contrat ;
- performance ;
- taux d’acceptation ;
- risque ;
- règles du marchand ;
- maintenance ;
- limites du prestataire.

Le routage par coût ne doit jamais contourner une obligation réglementaire ou une règle de sécurité.

## 28. Adaptateurs prestataires

Interface conceptuelle :

```text
PaymentProviderAdapter
  createIntent()
  authorize()
  capture()
  cancel()
  refund()
  getStatus()
  tokenize()
  verifyWebhook()
  parseSettlement()
```

Des adaptateurs distincts peuvent exister pour :

- acquéreurs carte ;
- opérateurs Mobile Money ;
- banques ;
- PSP ;
- wallet Mansa ;
- autres rails autorisés.

## 29. Multi-fournisseurs

Mansa ne doit pas dépendre d’un seul prestataire.

Chaque connexion contient :

- organisation propriétaire ;
- pays ;
- prestataire ;
- environnement ;
- moyens supportés ;
- devises ;
- priorité ;
- statut ;
- règles de routage ;
- références de secrets stockées dans un gestionnaire sécurisé hors Git.

## 30. Idempotence

Toutes les opérations financières mutatrices nécessitent une clé d’idempotence, notamment :

- création intention ;
- capture ;
- remboursement ;
- annulation ;
- paiement wallet ;
- traitement webhook.

Une répétition du même événement ne doit jamais provoquer un double débit ou un double remboursement.

## 31. Webhooks sortants vers les marchands

Événements possibles :

```text
payment.created
payment.processing
payment.authorized
payment.succeeded
payment.failed
payment.cancelled
payment.refunded
payment.disputed
settlement.created
settlement.paid
```

Chaque webhook doit contenir :

- eventId ;
- type ;
- timestamp ;
- resourceId ;
- version ;
- payload minimal ;
- signature.

## 32. Sécurité des webhooks

Exigences :

- signature cryptographique ;
- horodatage ;
- protection contre replay ;
- retry ;
- journalisation ;
- rotation de secret ;
- plusieurs endpoints si autorisé ;
- possibilité de désactiver un endpoint compromis.

Les secrets de signature ne doivent jamais apparaître dans le dépôt.

## 33. Webhooks entrants prestataires

Chaque webhook entrant doit :

1. être authentifié selon le mécanisme du prestataire ;
2. être dédupliqué ;
3. être journalisé ;
4. être corrélé à une transaction ;
5. être traité idempotemment ;
6. mettre à jour la machine à états ;
7. déclencher les écritures nécessaires ;
8. déclencher les événements sortants.

## 34. Polling de secours

Lorsque les webhooks sont absents ou douteux, Mansa peut interroger le prestataire pour obtenir le statut.

Le polling ne doit pas créer plusieurs paiements.

## 35. Détection des statuts incohérents

Le système doit détecter :

- paiement déclaré réussi localement mais absent chez le prestataire ;
- paiement réussi chez le prestataire mais non enregistré localement ;
- double callback ;
- montant différent ;
- devise différente ;
- référence inconnue ;
- remboursement sans transaction correspondante.

Ces événements alimentent une file d’exception.

## 36. Frais et commissions

Les frais peuvent être :

- absorbés par le marchand ;
- facturés séparément selon réglementation ;
- inclus dans une tarification Mansa ;
- partagés avec un partenaire ;
- variables selon le moyen.

Aucun taux n’est codé en dur.

Le moteur conserve :

- montant brut ;
- frais prestataire ;
- frais Mansa ;
- taxes applicables ;
- montant net ;
- bénéficiaires ;
- devise ;
- règle tarifaire appliquée.

## 37. Règlement marchand

Le règlement marchand peut être :

```text
INSTANT
SAME_DAY
NEXT_DAY
SCHEDULED
PROVIDER_DEFINED
MANUAL_REVIEW
```

La disponibilité réelle dépend des capacités bancaires et réglementaires.

Mansa ne doit jamais promettre un délai de règlement non garanti par les partenaires.

## 38. Settlement

Objet :

```text
MerchantSettlement
```

Champs :

- merchantId ;
- period ;
- grossAmount ;
- refunds ;
- disputes ;
- providerFees ;
- mansaFees ;
- taxes ;
- netAmount ;
- payoutDestination ;
- status ;
- externalReference ;
- settledAt.

## 39. Réconciliation

La réconciliation rapproche :

- intentions ;
- transactions ;
- réponses prestataires ;
- webhooks ;
- écritures ledger ;
- fichiers ou API de règlement ;
- versements bancaires ;
- frais ;
- remboursements ;
- chargebacks.

Les écarts ne doivent jamais être masqués automatiquement.

## 40. Risque et fraude

Contrôles possibles :

- vélocité ;
- montants anormaux ;
- empreinte appareil ;
- pays ;
- IP ;
- historique client ;
- historique marchand ;
- multiples échecs ;
- incohérence de devise ;
- compte à risque ;
- liste de blocage ;
- règles partenaires.

Décisions :

```text
ALLOW
REVIEW
REQUIRE_ACTION
DECLINE
BLOCK
```

## 41. Protection des marchands

Un nouveau marchand peut recevoir des limites initiales :

- volume ;
- montant unitaire ;
- nombre de paiements ;
- fréquence de règlement ;
- réserve éventuelle si légalement et contractuellement applicable ;
- moyens autorisés.

Ces règles doivent être transparentes dans le portail concerné lorsque leur affichage est approprié.

## 42. Litiges et chargebacks

Le module s’intègre au système de litiges existant.

Un litige doit pouvoir référencer :

- paiement ;
- marchand ;
- client ;
- raison ;
- montant ;
- échéances ;
- preuves ;
- statut ;
- décision ;
- impact financier.

## 43. Reçus

Après paiement confirmé, le système peut générer :

- reçu numérique ;
- email ;
- SMS avec lien ;
- PDF ;
- référence vérifiable ;
- QR de vérification si pertinent.

Un reçu ne doit jamais être généré comme « payé » pour un paiement seulement `PROCESSING`.

## 44. Tableau de bord marchand

Indicateurs :

- paiements du jour ;
- volume ;
- taux de réussite ;
- panier moyen ;
- remboursements ;
- litiges ;
- règlements attendus ;
- règlements reçus ;
- frais ;
- moyens utilisés ;
- incidents prestataires.

## 45. Recherche

Filtres :

- référence ;
- client ;
- montant ;
- devise ;
- statut ;
- moyen ;
- prestataire ;
- commande ;
- facture ;
- date ;
- environnement.

## 46. API publique

Exemples conceptuels :

```http
POST   /v1/payment-intents
GET    /v1/payment-intents/:id
POST   /v1/payment-intents/:id/capture
POST   /v1/payment-intents/:id/cancel
POST   /v1/payments/:id/refunds
GET    /v1/payments/:id
POST   /v1/payment-links
GET    /v1/payment-links/:id
POST   /v1/webhook-endpoints
GET    /v1/settlements
```

Les chemins définitifs doivent rester cohérents avec les conventions API globales Mansa.

## 47. Authentification API

Le portail développeur doit permettre :

- identifiants Démo ;
- identifiants Recette ;
- identifiants Production ;
- scopes ;
- rotation ;
- révocation ;
- journalisation ;
- restrictions IP optionnelles ;
- quotas.

Les clés secrètes ne sont affichées qu’au moment approprié et ne sont jamais commitées.

## 48. Scopes API

Exemples :

```text
payments.read
payments.create
payments.capture
payments.refund
payment_links.read
payment_links.write
settlements.read
webhooks.read
webhooks.write
```

## 49. Environnements

### Démo

- prestataires mock ;
- aucune monnaie réelle ;
- scénarios succès/échec configurables.

### Recette

- sandbox partenaires lorsque disponible ;
- tests contractuels ;
- tests webhooks ;
- tests de rapprochement.

### Production

- secrets sécurisés ;
- contrôles renforcés ;
- audit ;
- alertes ;
- accès restreint.

## 50. MockPaymentProvider

Pour le développement local :

```text
MockPaymentProvider
```

Il doit simuler :

- succès ;
- refus ;
- timeout ;
- authentification requise ;
- webhook tardif ;
- webhook dupliqué ;
- remboursement ;
- litige ;
- règlement.

Aucun fournisseur payant ne doit être nécessaire pour tester les flux de base localement.

## 51. Observabilité

Métriques :

- latence ;
- disponibilité ;
- taux de succès par fournisseur ;
- erreurs ;
- callbacks en retard ;
- profondeur des files ;
- écarts de rapprochement ;
- taux de remboursement ;
- taux de litige.

Les métriques ne doivent pas contenir de données carte sensibles.

## 52. Haute disponibilité

Les composants critiques doivent supporter :

- retry contrôlé ;
- circuit breaker ;
- files durables ;
- reprise après crash ;
- idempotence ;
- bascule de prestataire lorsque contractuellement et techniquement autorisée.

Une bascule ne doit pas provoquer un second débit si le statut du premier fournisseur est incertain.

## 53. Paiement à statut incertain

Si un prestataire timeout après soumission :

```text
UNKNOWN_PROVIDER_STATE
```

Le système doit :

1. ne pas relancer aveuglément chez un autre fournisseur ;
2. interroger le fournisseur initial ;
3. attendre webhook si nécessaire ;
4. déclencher une exception si le statut reste inconnu ;
5. éviter tout double débit.

## 54. Données principales

```text
MerchantPaymentProfile
PaymentProviderConnection
PaymentMethodConfiguration
PaymentIntent
PaymentAttempt
PaymentTransaction
PaymentAuthorization
PaymentCapture
PaymentRefund
PaymentLink
CheckoutSession
PaymentWebhookEvent
MerchantSettlement
SettlementLine
ReconciliationException
```

## 55. Configuration marchand

Chaque marchand peut configurer dans les limites de son contrat :

- moyens ;
- devises ;
- langues ;
- logo ;
- couleurs ;
- texte de reçu ;
- URLs de retour ;
- webhooks ;
- politiques de capture ;
- paiement partiel si applicable ;
- notifications ;
- utilisateurs autorisés.

## 56. Multi-tenant

Toute requête doit être rattachée à un tenant et à un marchand autorisé.

Interdictions :

- lire les paiements d’un autre marchand ;
- rembourser une transaction d’un autre tenant ;
- réutiliser un token hors du périmètre autorisé ;
- partager des clés API entre tenants.

## 57. Internationalisation

Le checkout doit pouvoir gérer :

- français ;
- anglais ;
- langues locales ajoutées progressivement ;
- format de devise local ;
- fuseaux horaires ;
- règles spécifiques par pays.

## 58. Accessibilité

Les parcours de paiement doivent être utilisables :

- au clavier ;
- avec lecteurs d’écran lorsque possible ;
- avec contraste suffisant ;
- avec messages d’erreur compréhensibles ;
- sans dépendre uniquement d’une couleur.

## 59. Paiement avec faible connectivité

Pour un checkout en ligne, Mansa ne doit jamais afficher un paiement comme confirmé si la preuve n’a pas été obtenue.

En cas de coupure :

- conserver localement uniquement les données non sensibles nécessaires au retour UX ;
- permettre la reprise de session si sûre ;
- interroger le statut au retour réseau ;
- ne jamais stocker le CVV ;
- éviter une seconde soumission non idempotente.

## 60. Intégration POS et TPE

Le checkout ne remplace pas le TPE physique.

Il peut cependant :

- préparer une vente ;
- envoyer une demande au terminal ;
- recevoir le résultat ;
- rattacher la transaction à la commande ;
- générer le reçu ;
- synchroniser stock, facture et comptabilité.

Le matériel POS reste multi-fournisseurs via les adaptateurs définis dans les spécifications matériel Mansa.

## 61. Intégration secteur public

Le moteur peut être utilisé par les services publics pour payer une obligation ou une prestation, mais les exigences du module Secteur public restent prioritaires pour les barèmes, rôles, audit et rapprochement.

Les décisions péage existantes restent inchangées :

- péage automatique classique avec barrière ;
- télépéage UHF RFID avec barrière ;
- free-flow uniquement comme évolution optionnelle ultérieure ;
- espèces FCFA, carte EMV multi-réseaux, NFC, carte/wallet Mansa, QR et Mobile Money selon les canaux activés ;
- Mobile Money reste activable/désactivable par l’administration avec audit ;
- fonctionnement local sécurisé ;
- matériel multi-fournisseurs ;
- déploiement progressif ;
- achat direct du matériel ou fourniture/intégration par Mansa ;
- marque blanche ;
- rapprochement anti-corruption entre véhicule, tarif, paiement, ouverture et passage physique.

Le checkout en ligne ne doit pas supprimer ni remplacer ces architectures de voie.

## 62. Tests minimaux

Tests unitaires et d’intégration :

- création intention ;
- montant invalide ;
- devise non autorisée ;
- méthode désactivée ;
- succès ;
- refus ;
- timeout ;
- idempotence ;
- double webhook ;
- capture ;
- capture partielle ;
- annulation ;
- remboursement total ;
- remboursement partiel ;
- remboursement supérieur au capturé refusé ;
- webhook signature invalide ;
- règlement ;
- écart de rapprochement ;
- isolation tenant ;
- lien expiré ;
- reprise après état incertain.

## 63. Critères d’acceptation

Le module est considéré prêt lorsque :

1. un marchand peut créer une intention via API ou portail ;
2. un checkout hébergé peut être généré ;
3. plusieurs moyens peuvent être configurés ;
4. au moins un provider mock fonctionne sans service payant ;
5. les callbacks sont signés et idempotents ;
6. aucun secret n’est présent dans le dépôt ;
7. les remboursements sont tracés ;
8. les règlements sont rapprochables ;
9. l’isolation multi-tenant est testée ;
10. les erreurs prestataires ne provoquent pas de double débit ;
11. les environnements Démo, Recette et Production sont séparés ;
12. la solution reste compatible avec les modules Commerce, TPE, Abonnements, Factures, Litiges et Ledger.

## 64. Résultat attendu

Mansa doit disposer d’un moteur de paiement marchand moderne et réutilisable permettant à une boutique, une station-service, un restaurant, une plateforme, une entreprise, une université ou un organisme public d’encaisser en ligne ou à distance via une seule couche d’intégration, tout en conservant les prestataires réglementés et les rails de paiement derrière des adaptateurs interchangeables.
