# Cahier des charges — Notifications multicanales Mansa

## 1. Objet

Le module Notifications centralise la création, l’orchestration, la distribution, le suivi et la gouvernance de toutes les communications transactionnelles et opérationnelles de Mansa. Il doit desservir les applications Client, Commerçant, TPE, Admin Lite, Annuaire/Hub, les portails web, les partenaires et les équipes internes.

Le module doit être conçu comme un service indépendant, multi-pays, multi-tenant, auditable et résilient.

## 2. Canaux pris en charge

Le socle doit prévoir les canaux suivants :

- notification push mobile ;
- notification in-app ;
- SMS ;
- e-mail ;
- message WhatsApp ou canal conversationnel via adaptateur externe, uniquement lorsque disponible et autorisé ;
- webhook partenaire ;
- alerte interne vers les outils d’exploitation.

Chaque canal externe doit être encapsulé derrière un adaptateur afin de pouvoir changer de fournisseur sans modifier la logique métier.

## 3. Cas d’usage prioritaires

### 3.1 Paiements et transferts

- confirmation de paiement ;
- confirmation de transfert ;
- échec ou annulation ;
- remboursement ;
- réception de fonds ;
- retrait ou dépôt agent ;
- paiement QR ou NFC ;
- paiement par carte ;
- échéance ou paiement récurrent.

### 3.2 Sécurité

- nouvelle connexion ;
- appareil inconnu ;
- changement de mot de passe ;
- changement de PIN ;
- tentative sensible bloquée ;
- modification de coordonnées ;
- carte bloquée ou débloquée ;
- alerte fraude ;
- modification KYC ou KYB.

### 3.3 Commerçants

- nouvelle vente ;
- remboursement ;
- règlement disponible ;
- anomalie de rapprochement ;
- stock faible si le module commerce l’active ;
- nouvel avis ou message ;
- expiration d’abonnement ou de service.

### 3.4 Administration et secteur public

- amende émise ;
- amende payée ;
- taxe ou frais administratif dû ;
- bourse versée ;
- échéance administrative ;
- dossier rejeté, validé ou incomplet ;
- notification officielle avec preuve de délivrance lorsque le cadre réglementaire le permet.

## 4. Architecture fonctionnelle

Le module est organisé autour des composants suivants :

1. Notification API
2. Notification Orchestrator
3. Template Service
4. Preference Service
5. Channel Router
6. Provider Adapters
7. Delivery Worker
8. Retry & Dead Letter Queue
9. Delivery Tracking
10. Audit & Analytics

## 5. Modèle de données minimal

### Notification

- id
- tenantId
- countryCode
- userId ou recipientId
- eventType
- category
- priority
- status
- correlationId
- idempotencyKey
- createdAt
- scheduledAt
- expiresAt

### NotificationChannel

- id
- notificationId
- channel
- provider
- destinationMasked
- status
- attempts
- providerMessageId
- sentAt
- deliveredAt
- failedAt
- failureCode

### NotificationTemplate

- id
- code
- locale
- channel
- title
- body
- variablesSchema
- version
- active

### NotificationPreference

- userId
- category
- pushEnabled
- smsEnabled
- emailEnabled
- inAppEnabled
- marketingEnabled
- quietHours
- preferredLanguage

### NotificationEvent

- id
- notificationId
- event
- metadata
- createdAt

## 6. Catégories de notifications

Les notifications doivent être classées au minimum en :

- TRANSACTIONAL
- SECURITY
- COMPLIANCE
- SERVICE
- MARKETING
- INTERNAL_OPERATION

Les notifications SECURITY et certaines notifications TRANSACTIONAL ou COMPLIANCE ne doivent pas pouvoir être totalement désactivées par l’utilisateur lorsqu’elles sont nécessaires à la sécurité ou à la réglementation.

## 7. Priorités

- CRITICAL : sécurité, fraude, blocage, incident majeur ;
- HIGH : paiement, transfert, retrait, remboursement ;
- NORMAL : activité compte, règlement, support ;
- LOW : information non urgente ;
- MARKETING : campagnes et promotions.

Le routeur doit utiliser la priorité pour contrôler l’ordre de traitement et les politiques de reprise.

## 8. Préférences utilisateur

L’utilisateur doit pouvoir :

- choisir les canaux facultatifs ;
- choisir la langue ;
- définir des heures silencieuses pour les notifications non critiques ;
- désactiver les communications marketing ;
- consulter l’historique des notifications in-app ;
- marquer une notification comme lue ;
- supprimer localement une notification lorsque la politique de conservation l’autorise.

Les préférences de marketing doivent être séparées des communications transactionnelles.

## 9. Langues

Le module doit gérer au minimum :

- français ;
- bambara ;
- anglais.

Les modèles doivent être versionnés par langue et par canal. Une langue de repli doit être définie au niveau pays et tenant.

## 10. Templates

Les templates ne doivent jamais contenir de logique métier complexe.

Variables autorisées par exemple :

- prénom ;
- montant ;
- devise ;
- marchand ;
- référence transaction ;
- date ;
- statut ;
- lien profond sécurisé.

Toutes les variables doivent être validées contre un schéma avant rendu.

Les messages sensibles ne doivent jamais contenir :

- PIN ;
- mot de passe ;
- CVV ;
- numéro complet de carte ;
- secret OTP après expiration ;
- données KYC inutiles.

## 11. Push mobile

Le module doit supporter les fournisseurs de push iOS et Android via un adaptateur unique.

Fonctions :

- token par appareil ;
- invalidation des tokens obsolètes ;
- deep links ;
- regroupement ;
- badges ;
- notifications silencieuses réservées aux usages strictement nécessaires ;
- déduplication ;
- limitation par utilisateur et appareil.

## 12. SMS

Le SMS doit être réservé aux cas où il apporte une valeur réelle, compte tenu du coût.

Règles :

- provider configurable par pays ;
- alphanumeric sender lorsque disponible ;
- découpage contrôlé ;
- pas de données financières trop détaillées ;
- fallback possible en cas d’absence de push pour certains événements critiques ;
- quotas et budgets par tenant.

## 13. E-mail

Les e-mails doivent utiliser :

- templates HTML responsives ;
- version texte ;
- domaine d’envoi configuré ;
- SPF, DKIM et DMARC ;
- suivi d’échec ;
- désabonnement pour le marketing ;
- liens signés avec durée de vie limitée lorsque nécessaire.

## 14. In-app

Le centre de notifications in-app doit proposer :

- pagination ;
- filtres ;
- statut lu/non lu ;
- catégorie ;
- priorité ;
- deep link ;
- compteur non lu ;
- synchronisation multi-appareil.

## 15. Idempotence

Toute demande de notification doit accepter un `idempotencyKey`.

Une même notification métier ne doit pas être envoyée deux fois à cause d’un retry réseau ou d’un webhook dupliqué.

L’unicité doit être définie par tenant + type d’événement + destinataire + clé d’idempotence.

## 16. Files et traitement asynchrone

Le traitement doit être asynchrone via une file de messages.

États recommandés :

- CREATED
- QUEUED
- PROCESSING
- SENT
- DELIVERED
- READ
- FAILED
- EXPIRED
- CANCELLED

Les erreurs temporaires doivent déclencher des retries avec backoff exponentiel.

Les erreurs permanentes doivent rejoindre une Dead Letter Queue pour analyse.

## 17. Résilience

Le service doit gérer :

- indisponibilité fournisseur ;
- timeout ;
- rate limits ;
- tokens invalides ;
- numéros non joignables ;
- adresses e-mail invalides ;
- duplication d’événement ;
- pics de charge.

Un circuit breaker doit pouvoir être activé par fournisseur.

## 18. Sécurité

- chiffrement TLS ;
- chiffrement des destinations sensibles au repos lorsque nécessaire ;
- masquage des numéros et e-mails dans les interfaces d’administration ;
- RBAC pour l’accès aux notifications ;
- interdiction d’édition arbitraire des messages de sécurité en production ;
- journal d’audit pour création ou modification de templates ;
- contrôle des deep links ;
- signature des webhooks.

## 19. Conformité et conservation

La durée de conservation doit être configurable par catégorie et par pays.

Les données de livraison doivent être séparées du contenu lorsque possible afin de limiter la conservation de données personnelles.

Les messages marketing doivent respecter le consentement et le retrait du consentement.

Les exports et suppressions doivent respecter les politiques légales applicables.

## 20. Back-office

Le portail Admin doit permettre :

- consulter les taux de succès ;
- filtrer par canal, pays, tenant, type et fournisseur ;
- afficher les erreurs ;
- relancer une notification autorisée ;
- désactiver temporairement un canal ;
- basculer de fournisseur ;
- gérer les templates ;
- prévisualiser un template ;
- lancer un test vers un destinataire de test ;
- suivre les dépenses SMS et fournisseurs ;
- visualiser la Dead Letter Queue.

Toute action sensible doit être auditée.

## 21. API indicative

- POST /v1/notifications
- GET /v1/notifications/:id
- GET /v1/users/:userId/notifications
- POST /v1/notifications/:id/read
- POST /v1/notifications/read-all
- GET /v1/notification-preferences
- PATCH /v1/notification-preferences
- GET /v1/admin/notification-templates
- POST /v1/admin/notification-templates
- PATCH /v1/admin/notification-templates/:id
- POST /v1/admin/notification-templates/:id/test
- GET /v1/admin/notification-deliveries

## 22. Événements entrants

Le module doit pouvoir consommer notamment :

- payment.completed
- payment.failed
- transfer.completed
- transfer.failed
- refund.completed
- cashout.completed
- login.new_device
- card.blocked
- fraud.alert
- kyc.updated
- merchant.settlement.completed
- public_service.payment_due
- support.case.updated

## 23. Événements sortants

- notification.created
- notification.sent
- notification.delivered
- notification.read
- notification.failed
- notification.provider_degraded

## 24. Observabilité

Métriques minimales :

- notifications créées par type ;
- taux d’envoi ;
- taux de livraison ;
- taux d’échec ;
- latence p50/p95/p99 ;
- retries ;
- DLQ ;
- coût SMS ;
- taux d’ouverture lorsque mesurable légalement ;
- erreurs par fournisseur.

Tous les logs doivent inclure `correlationId` et `notificationId` sans exposer de données sensibles inutiles.

## 25. Tests

Le module doit disposer de :

- tests unitaires du routage ;
- tests templates ;
- tests idempotence ;
- tests preferences ;
- tests retries ;
- tests failover fournisseur ;
- tests de sécurité ;
- tests de charge ;
- tests E2E avec fournisseurs mockés.

## 26. Environnements

### Démo

Fournisseurs mockés, aucun message réel sauf destinataires explicitement autorisés.

### Recette

Fournisseurs sandbox ou comptes de test, quotas faibles.

### Production

Fournisseurs réels, secrets injectés par le gestionnaire de secrets, monitoring et budgets activés.

## 27. Critères d’acceptation

Le module est considéré comme prêt lorsque :

1. une transaction peut déclencher une notification idempotente ;
2. le canal est choisi selon préférences, priorité et disponibilité ;
3. les templates sont versionnés et multilingues ;
4. les échecs temporaires sont retentés sans duplication ;
5. les échecs permanents sont traçables ;
6. les utilisateurs peuvent gérer leurs préférences facultatives ;
7. les notifications critiques ne sont pas bloquées par les préférences marketing ;
8. les secrets et données sensibles ne sont pas exposés ;
9. les métriques et audits sont disponibles ;
10. les adaptateurs fournisseurs peuvent être remplacés sans modifier le cœur métier.
