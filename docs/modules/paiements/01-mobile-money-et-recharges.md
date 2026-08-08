# Cahier des charges — Mobile Money, recharges et interopérabilité

## 1. Objectif

Ce module permet à Mansa d’orchestrer les flux entre les portefeuilles Mansa, les opérateurs Mobile Money, les banques partenaires et les commerçants, sans coupler le cœur métier à un fournisseur unique. Il doit fonctionner d’abord au Mali puis être extensible à d’autres pays d’Afrique de l’Ouest.

Le module couvre les recharges, décaissements, paiements marchands, transferts vers ou depuis un opérateur Mobile Money, suivi d’état, réconciliation, remboursements, commissions, limites, disponibilité opérateur et gestion des incidents.

## 2. Périmètre fonctionnel

### 2.1 Recharger un portefeuille Mansa depuis Mobile Money

Le client choisit un opérateur compatible, saisit ou confirme le numéro de téléphone, indique le montant puis Mansa crée une intention de recharge.

Le débit réel est initié via l’intégration partenaire. Selon les capacités du fournisseur, la confirmation peut reposer sur USSD, STK Push, application opérateur, OTP, webhook ou redirection externe.

Mansa ne crédite définitivement le portefeuille qu’après confirmation fiable du fournisseur ou après une règle de règlement explicitement configurée.

### 2.2 Retirer de Mansa vers Mobile Money

Le client choisit un opérateur et un numéro bénéficiaire. Le système vérifie KYC, limites, solde disponible, risque et disponibilité du partenaire avant de réserver le montant.

Le débit comptable est finalisé uniquement lorsque le fournisseur confirme le décaissement. En cas d’échec définitif, la réservation est libérée automatiquement.

### 2.3 Paiements marchands

Un commerçant peut accepter un paiement financé depuis :

- solde Mansa ;
- Mobile Money ;
- carte bancaire ;
- compte bancaire lorsque disponible ;
- combinaison autorisée de plusieurs sources de financement.

Le commerçant reçoit une confirmation Mansa indépendante du canal de financement utilisé par le client.

### 2.4 Transferts interopérables

Le moteur doit supporter :

- Mansa vers Mansa ;
- Mobile Money vers Mansa ;
- Mansa vers Mobile Money ;
- banque vers Mansa ;
- Mansa vers banque ;
- Mobile Money vers Mobile Money via Mansa uniquement lorsque les contrats et règles locales le permettent.

## 3. Architecture d’intégration

Chaque opérateur est isolé derrière un adaptateur implémentant une interface commune.

Interface minimale :

- `createCollection()` ;
- `getCollectionStatus()` ;
- `createDisbursement()` ;
- `getDisbursementStatus()` ;
- `refund()` si supporté ;
- `validateAccount()` si supporté ;
- `parseWebhook()` ;
- `healthCheck()` ;
- `getCapabilities()`.

Le domaine Mansa ne doit jamais dépendre directement du SDK d’un opérateur.

## 4. États transactionnels

Une opération Mobile Money suit une machine à états explicite :

- `CREATED` ;
- `VALIDATING` ;
- `PENDING_CUSTOMER_ACTION` ;
- `SUBMITTED` ;
- `PROCESSING` ;
- `SUCCEEDED` ;
- `FAILED` ;
- `EXPIRED` ;
- `CANCELLED` ;
- `REVERSAL_PENDING` ;
- `REVERSED` ;
- `MANUAL_REVIEW`.

Les transitions sont contrôlées côté serveur et toute transition invalide est refusée et auditée.

## 5. Idempotence et cohérence financière

Toute opération possède :

- un `transactionId` Mansa ;
- une `idempotencyKey` ;
- une référence partenaire ;
- une référence de rapprochement ;
- l’horodatage de chaque événement ;
- le dernier statut connu ;
- le montant principal ;
- les frais ;
- les commissions ;
- la devise ;
- le pays ;
- le partenaire.

Une même clé d’idempotence ne peut jamais produire deux débits ou deux crédits.

Les écritures financières doivent utiliser le ledger Mansa. Aucun solde ne doit être modifié directement par le module d’intégration.

## 6. Webhooks

Les webhooks partenaires doivent :

1. être authentifiés ou validés cryptographiquement lorsque le fournisseur le permet ;
2. être horodatés ;
3. être protégés contre le rejeu ;
4. être persistés avant traitement ;
5. être traités de façon idempotente ;
6. être associés à la transaction Mansa correspondante ;
7. produire un événement d’audit ;
8. supporter une file de reprise en cas d’indisponibilité interne.

Un webhook ne doit jamais être considéré comme fiable uniquement parce qu’il provient d’une URL connue.

## 7. Gestion des frais et commissions

Le moteur tarifaire doit permettre de configurer séparément :

- frais client ;
- part Mansa ;
- commission agent ;
- commission commerçant ou réseau ;
- coût opérateur ;
- taxe éventuelle ;
- subvention promotionnelle ;
- plafond minimum et maximum ;
- frais fixes ;
- frais proportionnels ;
- règles par pays, canal, opérateur, segment et type d’opération.

Les frais appliqués à une transaction sont figés au moment de sa création afin qu’une modification de configuration ne change pas rétroactivement l’opération.

## 8. Limites et contrôles

Les limites sont configurables par :

- niveau KYC ;
- type de client ;
- pays ;
- opérateur ;
- canal ;
- jour, semaine et mois ;
- montant unitaire ;
- nombre d’opérations ;
- score de risque ;
- statut du compte.

Le système doit permettre de bloquer instantanément un opérateur ou un type de flux sans redéploiement.

## 9. Gestion des numéros et comptes bénéficiaires

Les numéros de téléphone sont normalisés en format E.164 avant toute opération.

Le système conserve :

- pays ;
- indicatif ;
- numéro normalisé ;
- opérateur détecté ou choisi ;
- résultat de validation partenaire lorsque disponible ;
- nom retourné par le partenaire uniquement si le contrat et la réglementation l’autorisent.

Aucune donnée retournée par un partenaire ne doit remplacer la vérification d’identité Mansa.

## 10. Expérience hors connexion ou faible connectivité

Mansa doit dégrader proprement l’expérience lorsque le réseau est faible.

L’application peut préparer localement une intention, afficher un QR ou conserver un brouillon, mais aucune opération financière ne doit être considérée comme finalisée hors ligne sans confirmation serveur.

Pour les cas terrain compatibles, l’architecture peut prévoir :

- USSD ;
- SMS transactionnel signé côté serveur lorsqu’un partenaire le permet ;
- QR dynamique à durée courte ;
- reprise automatique à la reconnexion ;
- terminal agent disposant d’une connectivité alternative.

## 11. Réconciliation

Chaque partenaire dispose d’un processus de réconciliation automatique.

Le système compare au minimum :

- transactions Mansa ;
- transactions confirmées par API ;
- webhooks reçus ;
- fichiers de règlement ou exports partenaire ;
- montants nets ;
- commissions ;
- annulations ;
- remboursements ;
- références externes.

Les écarts sont classés :

- transaction absente chez Mansa ;
- transaction absente chez le partenaire ;
- statut divergent ;
- montant divergent ;
- doublon ;
- commission divergente ;
- règlement manquant.

Tout écart non résolu passe dans une file d’exception avec propriétaire, statut et historique.

## 12. Disponibilité partenaire

Un service de santé partenaire mesure :

- succès des appels ;
- latence ;
- taux d’erreur ;
- taux de timeout ;
- âge du dernier webhook ;
- incidents en cours ;
- disponibilité par type d’opération.

Le routage peut désactiver automatiquement certaines opérations en cas d’incident sévère, avec possibilité de reprise manuelle par un administrateur autorisé.

## 13. Sécurité

Les secrets API sont stockés dans le gestionnaire de secrets de l’environnement et jamais dans Git.

Exigences minimales :

- TLS obligatoire ;
- rotation des clés ;
- contrôle d’accès par rôle ;
- séparation Démo, Recette et Production ;
- journal d’audit immuable ;
- limitation de débit ;
- protection anti-rejeu ;
- validation stricte des payloads ;
- chiffrement des données sensibles au repos ;
- masquage des numéros dans les logs ;
- aucun secret ou token dans les traces applicatives.

## 14. Modèle de données minimal

### `MobileMoneyProvider`

- `id`
- `countryCode`
- `name`
- `providerType`
- `status`
- `capabilities`
- `configurationReference`
- `createdAt`
- `updatedAt`

### `MobileMoneyTransaction`

- `id`
- `transactionId`
- `providerId`
- `type`
- `direction`
- `status`
- `amountMinor`
- `feeMinor`
- `currency`
- `phoneNumberHash`
- `maskedPhoneNumber`
- `partnerReference`
- `reconciliationReference`
- `idempotencyKey`
- `failureCode`
- `failureMessage`
- `createdAt`
- `updatedAt`
- `completedAt`

### `MobileMoneyWebhookEvent`

- `id`
- `providerId`
- `externalEventId`
- `payloadHash`
- `receivedAt`
- `processedAt`
- `processingStatus`
- `transactionId`

## 15. API Mansa

Exemples d’API internes ou publiques :

- `POST /v1/mobile-money/collections`
- `GET /v1/mobile-money/collections/:id`
- `POST /v1/mobile-money/disbursements`
- `GET /v1/mobile-money/disbursements/:id`
- `POST /v1/mobile-money/transactions/:id/refund`
- `GET /v1/mobile-money/providers`
- `GET /v1/mobile-money/providers/:id/status`
- `POST /v1/webhooks/mobile-money/:provider`

Chaque endpoint d’écriture requiert une clé d’idempotence lorsque pertinent.

## 16. Administration

Le portail Admin doit permettre :

- activer ou désactiver un opérateur ;
- activer ou désactiver une capacité ;
- définir limites et frais ;
- consulter les transactions ;
- filtrer par partenaire, statut, pays et période ;
- consulter les incidents ;
- relancer une vérification de statut ;
- initier une action de réconciliation autorisée ;
- consulter les écarts ;
- exporter les rapports autorisés ;
- visualiser les métriques de disponibilité.

Toute action administrative sensible nécessite une permission dédiée et génère un audit.

## 17. Observabilité

Métriques minimales :

- volume par opérateur ;
- montant total ;
- taux de succès ;
- taux d’échec ;
- taux de timeout ;
- latence P50/P95/P99 ;
- durée moyenne avant confirmation ;
- nombre de transactions en attente anormalement longtemps ;
- écarts de réconciliation ;
- coût partenaire ;
- revenu net Mansa ;
- commissions agents.

Les dashboards ne doivent jamais exposer de numéro complet ou de donnée personnelle non nécessaire.

## 18. Tests obligatoires

- tests unitaires des machines à états ;
- tests d’idempotence ;
- tests des adaptateurs ;
- tests de signature webhook ;
- tests de rejeu ;
- tests de timeout ;
- tests de statut incohérent ;
- tests de double webhook ;
- tests de réconciliation ;
- tests de rollback comptable ;
- tests de limites ;
- tests de frais ;
- tests de disponibilité opérateur ;
- tests de montée en charge sur les endpoints critiques.

Les environnements de test utilisent des mocks ou sandboxes partenaires. Aucun vrai débit client ne doit être nécessaire pour la CI.

## 19. Critères d’acceptation

Le module est considéré prêt lorsque :

1. au moins un adaptateur de démonstration est fonctionnel de bout en bout ;
2. les collections et décaissements sont idempotents ;
3. toutes les écritures passent par le ledger ;
4. les webhooks sont sécurisés et rejouables sans double effet ;
5. la réconciliation détecte les écarts ;
6. les frais et limites sont configurables ;
7. un opérateur peut être désactivé sans redéploiement ;
8. les transactions restent traçables de bout en bout ;
9. les secrets sont absents du dépôt ;
10. les mêmes contrats peuvent accueillir un nouvel opérateur sans modifier le cœur métier.

## 20. Dépendances

Ce module dépend des briques Mansa suivantes :

- authentification et identité ;
- KYC/KYB ;
- wallets et ledger ;
- moteur de risque ;
- notifications ;
- audit ;
- moteur tarifaire ;
- rapprochement et trésorerie.

Il sert ensuite de fondation aux recharges, paiements marchands, agents, TPE et parcours omnicanaux.
