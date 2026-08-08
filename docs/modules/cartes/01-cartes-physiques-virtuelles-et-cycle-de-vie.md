# Cahier des charges — Cartes physiques, virtuelles et cycle de vie

## 1. Objectif

Ce module définit la gestion complète des cartes Mansa : cartes physiques, cartes virtuelles, cartes temporaires, cartes jetables lorsque le partenaire l’autorise, tokenisation pour wallets compatibles, contrôle des plafonds, autorisations, blocage, remplacement, renouvellement, opposition, personnalisation, suivi de fabrication et intégration avec la banque émettrice et le processeur cartes.

Le module doit fonctionner sans dépendre directement d’un réseau, d’une banque ou d’un processeur unique. Mansa orchestre l’expérience client, les règles métier, les contrôles de risque, les paramètres configurables et l’affichage dans les applications, tandis que l’émission monétique réelle reste réalisée par les partenaires réglementés et contractuellement autorisés.

## 2. Principes généraux

1. Mansa ne génère jamais elle-même de PAN réel, de CVV réel ni de clé cryptographique de carte en production.
2. Les données carte sensibles sont minimisées et tokenisées dès que possible.
3. Aucun PAN complet, CVV, PIN ou secret de personnalisation n’est stocké dans les logs, analytics ou outils support.
4. Toute opération sensible sur une carte doit être authentifiée, autorisée et auditée.
5. Les capacités visibles dépendent du pays, du partenaire émetteur, du réseau de carte, du niveau KYC et du profil client.
6. Les environnements Démo, Recette et Production sont strictement séparés.
7. Toutes les actions doivent être idempotentes lorsque leur répétition peut provoquer un double effet chez le partenaire.
8. Une carte Mansa est toujours reliée à un produit carte versionné et à un compte ou portefeuille de financement clairement identifié.

## 3. Types de cartes

Le système doit pouvoir supporter plusieurs familles de cartes configurables.

### 3.1 Carte physique

Carte plastique ou autre support physique émis par un partenaire agréé.

Fonctions possibles selon contrat :

- paiement en magasin ;
- paiement sans contact ;
- paiement e-commerce ;
- retrait DAB ;
- paiement international ;
- paiement récurrent ;
- tokenisation wallet ;
- contrôle par catégorie de marchand ;
- plafonds configurables.

### 3.2 Carte virtuelle permanente

Carte numérique liée au compte client et disponible dans l’application.

Elle peut posséder :

- PAN tokenisé ou affichage sécurisé fourni par le partenaire ;
- date d’expiration ;
- CVV dynamique ou statique selon partenaire ;
- activation instantanée ;
- gel et dégel ;
- limites dédiées ;
- paiement e-commerce ;
- tokenisation wallet si supportée.

### 3.3 Carte virtuelle temporaire

Carte avec durée de vie limitée.

Paramètres possibles :

- expiration après une durée définie ;
- plafond maximal ;
- nombre maximal de transactions ;
- usage limité à certaines catégories ou zones ;
- fermeture automatique après expiration.

### 3.4 Carte jetable

Fonction optionnelle uniquement si le processeur et l’émetteur la supportent.

Après une transaction autorisée ou une condition configurée, les informations carte deviennent inutilisables et sont remplacées par une nouvelle référence fournie par le partenaire.

Mansa ne simule jamais cette fonction si l’infrastructure d’émission ne la permet pas réellement.

### 3.5 Carte entreprise ou employé

Produit destiné à une organisation avec :

- propriétaire légal entreprise ;
- porteur identifié ;
- budget ou sous-compte associé ;
- limites imposées par l’organisation ;
- catégories de dépense autorisées ;
- visibilité comptable ;
- règles de validation ;
- révocation par administrateur entreprise.

## 4. Produits carte

Un `CardProduct` représente une configuration commerciale et technique.

Il contient notamment :

- pays ;
- devise principale ;
- banque émettrice ;
- processeur ;
- réseau ;
- type physique ou virtuel ;
- BIN ou plage gérée par le partenaire, référencée sans exposer de secret ;
- fonctions autorisées ;
- frais ;
- limites ;
- critères d’éligibilité ;
- niveau KYC minimal ;
- règles de livraison ;
- règles de renouvellement ;
- règles de remplacement ;
- règles de personnalisation ;
- statut commercial.

La modification d’un produit doit être versionnée. Une carte existante conserve la version du produit applicable lors de son émission sauf migration explicitement réalisée.

## 5. Éligibilité

Avant toute demande de carte, Mansa vérifie :

- identité du client ;
- statut KYC ;
- statut du compte ;
- pays de résidence ou d’émission ;
- âge minimal applicable ;
- sanctions ou restrictions réglementaires ;
- score de risque ;
- limites de nombre de cartes ;
- disponibilité du produit ;
- éventuels frais d’émission ;
- capacité du partenaire.

Le résultat est explicite :

- `ELIGIBLE` ;
- `NOT_ELIGIBLE` ;
- `REVIEW_REQUIRED` ;
- `TEMPORARILY_UNAVAILABLE`.

## 6. Demande de carte physique

Parcours cible :

1. sélection du produit ;
2. vérification éligibilité ;
3. confirmation du nom à imprimer selon règles partenaire ;
4. choix ou validation de l’adresse ;
5. affichage des frais ;
6. consentement ;
7. paiement ou réservation des frais si nécessaire ;
8. création de la demande ;
9. transmission au partenaire ;
10. suivi fabrication ;
11. expédition ;
12. livraison ;
13. activation.

Chaque étape doit être traçable.

## 7. Personnalisation visuelle

Le design de carte est géré comme un actif versionné approuvé par les partenaires concernés.

Le système doit pouvoir référencer :

- face avant ;
- face arrière ;
- logo Mansa ;
- logo banque émettrice ;
- logo réseau ;
- emplacement puce ;
- symbole sans contact ;
- nom du porteur lorsque autorisé ;
- éléments légaux ;
- couleurs ;
- variantes premium ou entreprise.

Mansa ne doit jamais supposer qu’elle peut imprimer librement une carte de réseau. Toute maquette destinée à la production nécessite validation de l’émetteur, du processeur, du fabricant et du réseau selon leurs exigences.

## 8. Photo du client

La photo du client sur la carte est optionnelle et désactivée par défaut.

Elle ne peut être activée que si :

- le produit le prévoit ;
- le fabricant le supporte ;
- l’émetteur l’autorise ;
- le client a donné son consentement lorsque requis ;
- les règles de protection des données sont respectées.

La photo KYC ne doit pas être automatiquement réutilisée pour impression sans base légale et consentement approprié.

## 9. États du cycle de vie

Une carte utilise une machine à états contrôlée côté serveur.

États principaux :

- `REQUESTED` ;
- `ELIGIBILITY_REVIEW` ;
- `PENDING_PAYMENT` ;
- `SUBMITTED_TO_ISSUER` ;
- `APPROVED` ;
- `PERSONALIZATION_PENDING` ;
- `IN_PRODUCTION` ;
- `SHIPPED` ;
- `DELIVERED` ;
- `PENDING_ACTIVATION` ;
- `ACTIVE` ;
- `FROZEN` ;
- `SUSPENDED` ;
- `BLOCKED` ;
- `LOST` ;
- `STOLEN` ;
- `COMPROMISED` ;
- `REPLACEMENT_PENDING` ;
- `EXPIRED` ;
- `CLOSED` ;
- `CANCELLED`.

Toutes les transitions doivent être validées selon l’état actuel et les capacités du partenaire.

## 10. Activation

Une carte physique ne devient utilisable qu’après activation réussie.

Méthodes possibles selon partenaire :

- activation depuis l’application ;
- première transaction avec puce et PIN ;
- code d’activation ;
- procédure bancaire partenaire.

Mansa affiche uniquement les méthodes réellement disponibles.

L’activation est auditée avec :

- identifiant de carte interne ;
- acteur ;
- appareil ;
- horodatage ;
- résultat partenaire ;
- corrélation de requête.

## 11. PIN

Le PIN est géré par l’émetteur ou le processeur.

Mansa peut fournir une interface pour :

- demander la définition du PIN ;
- demander un changement ;
- consulter les règles ;
- déclencher un déblocage après vérification forte.

Le PIN en clair ne doit jamais transiter dans les journaux applicatifs Mansa.

Si un composant certifié ou un SDK partenaire est requis, l’application l’intègre selon les spécifications officielles.

## 12. Affichage des informations carte

L’application doit afficher par défaut uniquement :

- nom du produit ;
- quatre derniers chiffres ;
- réseau ;
- statut ;
- expiration masquée si nécessaire ;
- portefeuille lié ;
- limites principales.

L’affichage temporaire de données sensibles nécessite :

- authentification forte ;
- session valide ;
- contrôle anti-capture lorsque techniquement raisonnable ;
- durée d’affichage courte ;
- aucun cache persistant ;
- aucun analytics contenant les données affichées.

## 13. Gel et dégel

Le client peut geler une carte lorsque le partenaire le permet.

Un gel :

- bloque les nouvelles autorisations selon les capacités du processeur ;
- ne clôture pas la carte ;
- conserve l’historique ;
- peut être réversible.

Le dégel nécessite une authentification adaptée au niveau de risque.

Chaque action est synchronisée avec le partenaire et confirmée avant affichage d’un état final.

## 14. Opposition, perte et vol

Le client doit pouvoir déclarer rapidement :

- carte perdue ;
- carte volée ;
- carte compromise.

Le système :

1. bloque immédiatement la carte côté partenaire lorsque possible ;
2. journalise l’événement ;
3. évalue les transactions récentes ;
4. propose un remplacement si éligible ;
5. déclenche les notifications ;
6. ouvre un dossier de support ou de fraude lorsque nécessaire.

Une carte déclarée volée ou compromise ne doit pas être simplement dégelable par le client.

## 15. Remplacement

Motifs possibles :

- perte ;
- vol ;
- compromission ;
- carte endommagée ;
- défaut de fabrication ;
- changement de nom autorisé ;
- migration produit ;
- expiration anticipée décidée par l’émetteur.

Le remplacement possède une relation explicite avec la carte précédente.

Le système conserve :

- motif ;
- frais ;
- ancienne carte ;
- nouvelle carte ;
- date de demande ;
- date de clôture ancienne carte ;
- date d’activation nouvelle carte.

## 16. Renouvellement

Le renouvellement peut être automatique ou manuel selon le produit.

Le moteur doit anticiper l’expiration et vérifier :

- statut du client ;
- KYC encore valide ;
- activité du compte ;
- adresse ;
- disponibilité du produit ;
- restrictions ;
- règles de frais ;
- accord du partenaire.

Des notifications sont envoyées avant expiration et avant toute expédition payante.

## 17. Fermeture

La fermeture d’une carte doit :

- empêcher les nouvelles autorisations ;
- informer le partenaire ;
- conserver l’historique réglementaire nécessaire ;
- traiter les autorisations encore en attente ;
- gérer les remboursements tardifs ;
- ne pas supprimer les écritures comptables liées.

## 18. Sources de financement

Une carte peut être associée à :

- portefeuille principal ;
- sous-portefeuille ;
- budget ;
- compte entreprise ;
- compte bancaire partenaire lorsque prévu.

La source de financement active doit être déterminée avant l’autorisation ou selon les règles du processeur.

Le changement de source de financement est interdit pendant une transaction en cours lorsque cela peut créer une incohérence.

## 19. Autorisations de paiement

Le module carte reçoit ou consomme les événements d’autorisation fournis par le processeur.

Une autorisation contient au minimum :

- référence processeur ;
- carte interne ;
- montant ;
- devise ;
- montant converti lorsque disponible ;
- marchand ;
- MCC ;
- pays ;
- canal ;
- horodatage ;
- résultat ;
- code de refus ;
- indicateurs 3DS lorsque disponibles ;
- indicateurs sans contact ou carte présente ;
- niveau de risque.

Mansa ne doit pas inventer un statut d’autorisation non confirmé par le partenaire.

## 20. Réservation et capture

Pour les paiements carte, le ledger Mansa doit distinguer :

- réservation ;
- capture ;
- libération ;
- annulation ;
- remboursement ;
- chargeback ;
- ajustement.

Une réservation réduit le solde disponible sans modifier arbitrairement le solde comptable final.

Les expirations de réservation doivent suivre les événements et règles du processeur.

## 21. Plafonds

Le moteur de limites doit permettre des plafonds par :

- transaction ;
- jour ;
- semaine ;
- mois ;
- retrait ;
- paiement ;
- e-commerce ;
- sans contact ;
- international ;
- catégorie marchand ;
- carte ;
- utilisateur ;
- produit ;
- niveau KYC ;
- score de risque.

Les limites client configurables doivent rester à l’intérieur des limites maximales imposées par Mansa et les partenaires.

## 22. Contrôles utilisateur

Lorsque le processeur le supporte, le client peut activer ou désactiver :

- paiements e-commerce ;
- paiements internationaux ;
- retraits ;
- sans contact ;
- paiements récurrents ;
- paiements en bande magnétique ;
- certaines zones géographiques ;
- certaines catégories de marchand.

Les paramètres sont synchronisés côté serveur et côté processeur avant confirmation.

## 23. Paiements récurrents et abonnements

Le module doit distinguer :

- transaction initiée par le porteur ;
- transaction initiée par le marchand ;
- abonnement récurrent ;
- paiement échelonné lorsque supporté.

L’application peut afficher les commerçants récurrents détectés à partir des transactions, mais ne doit pas prétendre pouvoir annuler un abonnement marchand si aucun mécanisme contractuel ne le permet.

## 24. E-commerce et 3-D Secure

Pour les paiements en ligne, le module doit supporter les mécanismes de sécurité du réseau et du processeur, notamment 3-D Secure lorsque applicable.

Le parcours peut inclure :

- challenge dans l’application ;
- OTP partenaire ;
- authentification biométrique ;
- redirection ;
- exemption réglementaire ou de faible risque.

Mansa respecte toujours la décision finale du serveur d’accès ou du partenaire concerné.

## 25. Tokenisation et wallets mobiles

Le système doit prévoir une couche d’intégration pour tokeniser les cartes vers des wallets externes lorsque les partenaires le permettent.

Exemples de capacités :

- demander l’éligibilité ;
- provisionner un token ;
- suspendre un token ;
- reprendre un token ;
- supprimer un token ;
- afficher les appareils liés.

Les tokens réseau sont distincts de la carte physique et possèdent leur propre cycle de vie.

Aucune intégration Apple Pay, Google Wallet ou autre wallet ne doit être considérée disponible avant accord du réseau, de l’émetteur et de la plateforme concernée.

## 26. Retraits DAB

Les retraits sont soumis à :

- disponibilité du produit ;
- plafond retrait ;
- frais ;
- contrôle risque ;
- solde disponible ;
- restrictions pays ;
- statut de la carte.

Les événements de retrait doivent être rapprochés avec le ledger et les fichiers de règlement.

## 27. Taux de change

Pour les transactions dans une devise différente de la devise du compte, Mansa affiche lorsque disponible :

- montant d’origine ;
- devise d’origine ;
- montant comptabilisé ;
- devise du compte ;
- taux appliqué ;
- frais de change ;
- source du taux ou indication partenaire.

Le taux réellement appliqué dépend du réseau, de l’émetteur ou du processeur et ne doit pas être remplacé par une estimation Mansa dans l’écriture finale.

## 28. Frais

Le moteur tarifaire doit supporter :

- frais d’émission ;
- frais de livraison ;
- abonnement carte ;
- frais de remplacement ;
- frais de retrait ;
- frais internationaux ;
- frais de change ;
- frais de service optionnels ;
- promotions ;
- exemptions.

Les frais appliqués à une opération sont figés avec la transaction correspondante.

## 29. Livraison

Une commande de carte physique possède un suivi distinct.

États possibles :

- `ADDRESS_PENDING` ;
- `READY_FOR_PRODUCTION` ;
- `PRODUCED` ;
- `HANDED_TO_CARRIER` ;
- `IN_TRANSIT` ;
- `DELIVERY_ATTEMPTED` ;
- `DELIVERED` ;
- `RETURNED` ;
- `LOST_IN_TRANSIT` ;
- `CANCELLED`.

Les données de suivi du transporteur sont conservées séparément des données carte sensibles.

## 30. Fabrication et personnalisation

Le module doit pouvoir transmettre au fabricant ou processeur uniquement les données nécessaires, via canal sécurisé et contrat d’intégration.

Exigences :

- fichiers ou API chiffrés ;
- contrôle d’accès ;
- vérification d’intégrité ;
- accusé de réception ;
- suivi des rejets ;
- aucun export manuel non contrôlé de données sensibles ;
- conservation limitée selon besoin opérationnel et réglementaire.

## 31. Intégration partenaire

Chaque processeur ou émetteur est isolé derrière un adaptateur commun.

Interface cible indicative :

- `checkCardEligibility()` ;
- `createCardholder()` ;
- `createCard()` ;
- `getCard()` ;
- `activateCard()` ;
- `freezeCard()` ;
- `unfreezeCard()` ;
- `blockCard()` ;
- `replaceCard()` ;
- `updateCardControls()` ;
- `updateCardLimits()` ;
- `getSensitiveCardDataToken()` ;
- `getAuthorizationEvents()` ;
- `getCardTransactions()` ;
- `createWalletProvisioningRequest()` ;
- `parseWebhook()` ;
- `healthCheck()` ;
- `getCapabilities()`.

Le domaine Mansa ne dépend jamais directement du SDK propriétaire.

## 32. Webhooks

Les événements partenaires doivent être :

- authentifiés ;
- protégés contre le rejeu ;
- persistés avant traitement ;
- idempotents ;
- corrélés à une carte ou transaction ;
- auditables ;
- rejouables en cas d’incident interne.

Événements typiques :

- carte créée ;
- carte produite ;
- carte expédiée ;
- carte activée ;
- statut modifié ;
- autorisation ;
- capture ;
- remboursement ;
- chargeback ;
- token wallet créé ou suspendu.

## 33. Sécurité et PCI DSS

L’architecture doit réduire au maximum le périmètre PCI DSS de Mansa.

Mesures minimales :

- tokenisation ;
- absence de CVV dans les bases Mansa ;
- absence de PAN complet dans les logs ;
- masquage strict ;
- segmentation réseau ;
- chiffrement en transit et au repos ;
- accès au moindre privilège ;
- audit des accès ;
- rotation des secrets ;
- détection d’accès anormal ;
- interdiction des copies de données carte dans les tickets support ;
- rétention minimale ;
- tests de sécurité réguliers.

Les exigences PCI exactes doivent être validées selon l’architecture retenue avec l’émetteur, le processeur et un conseil spécialisé avant production.

## 34. Modèle de données minimal

### `CardProduct`

- `id`
- `countryCode`
- `currency`
- `issuerId`
- `processorId`
- `network`
- `cardType`
- `version`
- `status`
- `capabilities`
- `minKycLevel`
- `createdAt`
- `updatedAt`

### `Card`

- `id`
- `userId`
- `organizationId` optionnel
- `cardProductId`
- `fundingAccountId`
- `externalCardReference`
- `last4`
- `network`
- `type`
- `status`
- `expiryMonthMasked`
- `expiryYearMasked`
- `isPhysical`
- `createdAt`
- `activatedAt`
- `closedAt`

### `CardOrder`

- `id`
- `cardId`
- `status`
- `deliveryAddressId`
- `carrierReference`
- `trackingReference`
- `productionReference`
- `feeTransactionId`
- `createdAt`
- `shippedAt`
- `deliveredAt`

### `CardControl`

- `id`
- `cardId`
- `controlType`
- `enabled`
- `value`
- `source`
- `updatedAt`

### `CardLimit`

- `id`
- `cardId`
- `limitType`
- `period`
- `amountMinor`
- `currency`
- `effectiveFrom`
- `effectiveTo`

### `CardAuthorization`

- `id`
- `cardId`
- `externalReference`
- `status`
- `amountMinor`
- `currency`
- `merchantNameMasked`
- `merchantCategoryCode`
- `merchantCountry`
- `channel`
- `riskDecisionId`
- `ledgerReservationId`
- `authorizedAt`

### `CardLifecycleEvent`

- `id`
- `cardId`
- `eventType`
- `previousStatus`
- `newStatus`
- `actorType`
- `actorId`
- `partnerReference`
- `createdAt`

### `CardToken`

- `id`
- `cardId`
- `provider`
- `externalTokenReference`
- `deviceReferenceHash`
- `status`
- `createdAt`
- `suspendedAt`
- `deletedAt`

## 35. API Mansa

Exemples :

- `GET /v1/card-products`
- `POST /v1/cards`
- `GET /v1/cards`
- `GET /v1/cards/:id`
- `POST /v1/cards/:id/activate`
- `POST /v1/cards/:id/freeze`
- `POST /v1/cards/:id/unfreeze`
- `POST /v1/cards/:id/report-lost`
- `POST /v1/cards/:id/report-stolen`
- `POST /v1/cards/:id/report-compromised`
- `POST /v1/cards/:id/replace`
- `PATCH /v1/cards/:id/controls`
- `PATCH /v1/cards/:id/limits`
- `GET /v1/cards/:id/transactions`
- `GET /v1/cards/:id/order`
- `POST /v1/cards/:id/wallet-tokens`
- `DELETE /v1/cards/:id/wallet-tokens/:tokenId`
- `POST /v1/webhooks/cards/:partner`

Toutes les actions d’écriture sensibles doivent supporter une clé d’idempotence lorsque pertinent.

## 36. Application Client

L’application Client doit permettre selon les capacités du produit :

- voir toutes les cartes ;
- distinguer physique et virtuelle ;
- voir le statut ;
- demander une carte ;
- suivre la livraison ;
- activer ;
- geler ou dégeler ;
- modifier les contrôles ;
- modifier les limites autorisées ;
- consulter les dépenses ;
- déclarer perte ou vol ;
- demander un remplacement ;
- consulter les frais ;
- voir les tokens wallet ;
- accéder aux données sensibles uniquement via parcours sécurisé.

Les états non disponibles doivent être expliqués clairement plutôt que simulés.

## 37. Portail Admin

Le portail Admin doit permettre aux rôles autorisés :

- consulter les produits ;
- activer ou désactiver un produit ;
- consulter les cartes par statut ;
- rechercher avec données masquées ;
- examiner les demandes ;
- suivre production et livraison ;
- bloquer une carte ;
- initier un remplacement ;
- consulter les événements ;
- consulter les autorisations ;
- visualiser les incidents partenaires ;
- exporter des rapports non sensibles ;
- gérer les limites globales ;
- consulter les métriques.

Aucun agent support standard ne doit pouvoir afficher librement PAN, CVV ou PIN.

## 38. Rôles et permissions

Permissions dédiées recommandées :

- `cards.read`
- `cards.create`
- `cards.freeze`
- `cards.block`
- `cards.replace`
- `cards.manage_controls`
- `cards.manage_limits`
- `cards.manage_products`
- `cards.view_sensitive_reference`
- `cards.manage_delivery`
- `cards.manage_tokens`

Les permissions sensibles peuvent nécessiter une double validation selon politique interne.

## 39. Audit

Sont obligatoirement audités :

- demande de carte ;
- activation ;
- gel ;
- dégel ;
- opposition ;
- remplacement ;
- changement de limites ;
- changement de contrôles ;
- accès à une donnée sensible ;
- changement de produit ;
- action administrateur ;
- événement partenaire critique.

Les journaux d’audit ne contiennent aucune donnée carte interdite.

## 40. Fraude et risque

Le moteur de risque peut décider :

- autoriser ;
- refuser ;
- demander challenge ;
- geler temporairement ;
- envoyer notification ;
- ouvrir une revue manuelle.

Signaux possibles :

- vélocité ;
- montant inhabituel ;
- nouveau pays ;
- MCC à risque ;
- nouvel appareil ;
- tentative e-commerce répétée ;
- retraits successifs ;
- incohérence géographique ;
- carte récemment remplacée ;
- changement récent de contrôle.

La décision finale doit rester cohérente avec les capacités temps réel du processeur.

## 41. Réconciliation

Le module doit rapprocher :

- autorisations ;
- captures ;
- annulations ;
- remboursements ;
- retraits ;
- frais ;
- chargebacks ;
- fichiers réseau ou processeur ;
- écritures du ledger.

Les écarts sont envoyés vers le module rapprochement et trésorerie.

## 42. Chargebacks et contestations

Une transaction carte contestée est transmise au module support et litiges.

Le système conserve :

- transaction concernée ;
- motif ;
- preuves ;
- échéances ;
- statut réseau ;
- montant contesté ;
- montant provisoirement crédité ;
- décision finale ;
- écritures comptables associées.

Les délais dépendent des règles du réseau et du partenaire et sont configurables.

## 43. Notifications

Notifications possibles :

- carte commandée ;
- fabrication commencée ;
- expédition ;
- livraison ;
- activation ;
- paiement accepté ;
- paiement refusé ;
- retrait ;
- gel ;
- dégel ;
- opposition ;
- remplacement ;
- expiration prochaine ;
- changement de limite ;
- token wallet ajouté ;
- activité suspecte.

Les notifications ne doivent jamais contenir PAN complet, CVV ou PIN.

## 44. Observabilité

Métriques minimales :

- cartes actives ;
- cartes émises ;
- délai moyen d’émission ;
- délai moyen de livraison ;
- taux d’activation ;
- volume et montant de paiements ;
- taux d’autorisation ;
- taux de refus ;
- raisons de refus ;
- fraude ;
- retraits ;
- remplacements ;
- cartes gelées ;
- erreurs partenaire ;
- latence webhooks ;
- chargebacks ;
- revenu frais carte ;
- coût partenaire.

## 45. Gestion des incidents

Un incident processeur peut nécessiter :

- suspension temporaire des nouvelles émissions ;
- suspension d’une fonction ;
- blocage d’un type de transaction ;
- bannière d’information ;
- bascule en lecture seule ;
- réconciliation renforcée après rétablissement.

Les administrateurs autorisés doivent pouvoir désactiver une capacité sans redéploiement.

## 46. Tests obligatoires

- éligibilité ;
- création de carte idempotente ;
- machine à états ;
- activation ;
- gel et dégel ;
- opposition ;
- remplacement ;
- renouvellement ;
- limites ;
- contrôles ;
- webhooks en double ;
- webhook invalide ;
- autorisation ;
- capture ;
- réservation ledger ;
- libération ;
- remboursement ;
- retrait ;
- token wallet ;
- expiration ;
- livraison ;
- permissions admin ;
- masquage des données ;
- absence de données PCI dans les logs ;
- indisponibilité partenaire ;
- montée en charge sur les événements d’autorisation.

## 47. Environnements

### Démo

- cartes fictives ;
- aucun PAN réel ;
- simulateur d’autorisations ;
- simulateur de livraison ;
- scénarios fraude ;
- données clairement marquées comme démo.

### Recette

- sandbox émetteur ou processeur ;
- cartes de test officielles ;
- webhooks de test ;
- validation d’intégration ;
- tests de certification nécessaires.

### Production

- uniquement partenaires contractés ;
- secrets issus du gestionnaire de secrets ;
- supervision ;
- procédures d’incident ;
- audit sécurité ;
- obligations PCI et réglementaires validées.

## 48. Critères d’acceptation

Le module est considéré prêt lorsque :

1. les produits carte sont configurables et versionnés ;
2. une carte peut être demandée sans exposer de donnée sensible ;
3. le cycle de vie est contrôlé côté serveur ;
4. les actions activation, gel, opposition et remplacement sont idempotentes ;
5. les contrôles et limites sont synchronisés avec le processeur ;
6. les autorisations sont reliées au ledger ;
7. les webhooks sont sécurisés et rejouables sans double effet ;
8. les données PCI sont absentes des logs ;
9. le portail Admin respecte les permissions ;
10. les applications n’affichent que les capacités réellement supportées ;
11. les cartes physiques peuvent être suivies de la commande à l’activation ;
12. les cartes virtuelles sont gérées via les capacités officielles du partenaire ;
13. le module de risque et le support reçoivent les événements nécessaires ;
14. les transactions sont rapprochables de bout en bout ;
15. un nouvel émetteur ou processeur peut être ajouté derrière un adaptateur sans réécrire le cœur métier.

## 49. Dépendances

Ce module dépend de :

- authentification et identité ;
- KYC/KYB ;
- wallets et ledger ;
- transactions ;
- moteur tarifaire ;
- moteur de risque ;
- notifications ;
- support et litiges ;
- rapprochement et trésorerie ;
- audit ;
- intégrations partenaires.

Il sert ensuite de fondation aux paiements carte, aux programmes premium, aux comptes entreprise, aux budgets employés, aux wallets mobiles et aux parcours TPE.

## 50. Hypothèses à valider avec les partenaires

Les points suivants ne doivent pas être considérés acquis avant signature et certification :

- réseau de carte retenu ;
- banque émettrice ;
- processeur ;
- disponibilité de cartes virtuelles ;
- disponibilité de cartes jetables ;
- CVV dynamique ;
- tokenisation Apple Pay ou Google Wallet ;
- personnalisation avec photo ;
- fabrication locale ou internationale ;
- délais de livraison ;
- plafonds réglementaires ;
- disponibilité internationale ;
- retraits DAB ;
- 3-D Secure ;
- exigences de certification ;
- modèle économique et frais partenaires.

Toute fonctionnalité dépendante de ces points doit rester derrière une configuration ou un feature flag tant qu’elle n’est pas contractuellement et techniquement validée.
