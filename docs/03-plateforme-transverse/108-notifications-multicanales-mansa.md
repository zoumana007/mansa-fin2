# 108 — Notifications multicanales Mansa

## 1. Objet du document

Ce document définit le cahier des charges du module **Notifications multicanales Mansa**.

Le module centralise la préparation, la personnalisation, l’envoi, le suivi et l’audit des communications transactionnelles et opérationnelles émises par l’écosystème Mansa vers les clients, commerçants, agents, entreprises, administrateurs et partenaires autorisés.

Il doit fonctionner comme une brique transverse réutilisable par toutes les applications et tous les services Mansa sans exposer les fournisseurs externes directement au métier.

---

## 2. Objectifs

- fournir un point d’entrée unique pour toutes les notifications ;
- supporter plusieurs canaux selon disponibilité et consentement ;
- garantir la priorité des messages de sécurité et de transaction ;
- éviter les doublons et les envois concurrents ;
- permettre des modèles versionnés et localisés ;
- gérer le français, le bambara et l’anglais, puis d’autres langues par pays ;
- assurer la traçabilité complète de chaque tentative ;
- respecter les préférences utilisateur et les obligations légales ;
- isoler les fournisseurs SMS, e-mail, push et messagerie derrière des adaptateurs ;
- permettre le remplacement d’un fournisseur sans modifier les services métier ;
- fournir des métriques de délivrabilité, coût et latence ;
- éviter l’exposition de données sensibles dans les messages.

---

## 3. Positionnement dans l’écosystème Mansa

Le module s’intègre notamment avec :

- Identity et authentification ;
- KYC/KYB ;
- Wallet et Ledger ;
- paiements et transferts ;
- cartes ;
- QR et TPE ;
- Mobile Money ;
- abonnements ;
- facturation et reçus ;
- fidélité ;
- fraude et risque ;
- support ;
- Jini et Jini Voice ;
- administration ;
- analytics ;
- module État ;
- applications Client, Commerçant, TPE, Admin Lite et Annuaire/Hub.

---

## 4. Principes non négociables

1. Aucun mot de passe, PIN, clé privée, secret API ou donnée carte complète ne doit être envoyé dans une notification.
2. Les OTP et codes temporaires sont traités comme des données sensibles à durée de vie courte.
3. Toute notification possède un identifiant unique et une clé d’idempotence lorsque le cas métier l’exige.
4. Les modèles publiés sont versionnés et auditables.
5. Les préférences marketing ne peuvent pas bloquer les messages strictement transactionnels ou de sécurité requis.
6. Les fournisseurs externes ne sont jamais appelés directement par les modules métier.
7. Chaque tentative d’envoi produit un état traçable.
8. Les webhooks de fournisseurs doivent être authentifiés, validés et idempotents.
9. Les données personnelles envoyées à un fournisseur sont limitées au strict nécessaire.
10. Les environnements Démo, Recette et Production utilisent des configurations et identifiants séparés.
11. Les notifications critiques disposent de politiques de retry et, si autorisé, de fallback contrôlé.
12. Aucun fallback ne doit transformer silencieusement un message non consenti en message marketing sur un autre canal.

---

## 5. Concepts principaux

Le module manipule au minimum :

- `NotificationRequest` ;
- `Notification` ;
- `NotificationRecipient` ;
- `NotificationTemplate` ;
- `NotificationTemplateVersion` ;
- `NotificationPreference` ;
- `NotificationChannel` ;
- `NotificationAttempt` ;
- `NotificationDeliveryEvent` ;
- `NotificationProvider` ;
- `NotificationProviderRoute` ;
- `NotificationPolicy` ;
- `NotificationSchedule` ;
- `NotificationBatch` ;
- `NotificationAttachment` ;
- `NotificationAuditEvent` ;
- `NotificationSuppression` ;
- `NotificationCostRecord`.

---

## 6. Canaux supportés

Le socle doit prévoir au minimum :

```text
IN_APP
PUSH
SMS
EMAIL
WHATSAPP
WEBHOOK
VOICE
```

`WHATSAPP` et `VOICE` sont activés uniquement lorsqu’un fournisseur et un cadre contractuel adaptés sont disponibles.

---

## 7. Catégories de notifications

```text
SECURITY
TRANSACTIONAL
COMPLIANCE
ACCOUNT
SUPPORT
SERVICE
MARKETING
REMINDER
SYSTEM
```

La catégorie détermine les règles de consentement, priorité, conservation et fallback.

---

## 8. Niveaux de priorité

```text
CRITICAL
HIGH
NORMAL
LOW
BULK
```

Exemples :

- connexion suspecte : `CRITICAL` ;
- paiement confirmé : `HIGH` ;
- reçu disponible : `NORMAL` ;
- rappel non urgent : `LOW` ;
- campagne promotionnelle : `BULK`.

Les files de traitement doivent empêcher les campagnes de masse de retarder les notifications critiques.

---

## 9. Cycle de vie d’une notification

```text
CREATED
VALIDATED
QUEUED
SCHEDULED
SENDING
SENT
DELIVERED
READ
FAILED
CANCELLED
EXPIRED
SUPPRESSED
```

Les transitions dépendent du canal et des retours disponibles chez le fournisseur.

---

## 10. Entrée métier unifiée

Les services métier soumettent une intention de notification, par exemple :

```text
notificationKey = PAYMENT_SUCCEEDED
recipientId = usr_xxx
locale = fr-ML
variables = {
  amountMinor: 250000,
  currency: XOF,
  merchantDisplayName: "Exemple"
}
```

Le service métier ne transmet pas de texte final spécifique au fournisseur sauf cas explicitement autorisé.

---

## 11. Idempotence

Pour les événements transactionnels, une clé d’idempotence doit pouvoir être construite à partir de :

- type d’événement ;
- identifiant de ressource ;
- destinataire ;
- version logique de l’événement.

Une nouvelle tentative technique ne crée pas une nouvelle notification métier.

---

## 12. Modèles de messages

Chaque modèle possède :

- une clé stable ;
- une catégorie ;
- un canal ;
- une langue ;
- un pays éventuel ;
- un statut ;
- une version ;
- un sujet éventuel ;
- un corps ;
- une liste de variables autorisées ;
- les contraintes de longueur ;
- les mentions obligatoires ;
- la date d’effet ;
- l’auteur et l’approbateur lorsque requis.

---

## 13. Versionnement des modèles

États :

```text
DRAFT
REVIEW
APPROVED
ACTIVE
DEPRECATED
ARCHIVED
```

Une notification envoyée conserve la référence exacte de la version utilisée.

---

## 14. Variables de modèle

Le moteur doit :

- vérifier les variables requises ;
- rejeter les variables inconnues si la politique le demande ;
- échapper le contenu selon le canal ;
- empêcher l’injection HTML ou de template ;
- appliquer des formats monétaires et de date localisés ;
- masquer les données sensibles ;
- limiter la longueur finale.

---

## 15. Internationalisation

Le module doit supporter au minimum :

```text
fr-ML
bm-ML
en
```

Puis d’autres locales par configuration.

Ordre de résolution :

1. locale explicitement demandée et autorisée ;
2. préférence utilisateur ;
3. langue du pays ;
4. langue de secours du produit ;
5. français si aucune autre règle ne s’applique pour le Mali.

---

## 16. Bambara

Les contenus bambara doivent être gérés comme des modèles validés et non comme des traductions improvisées au moment de l’envoi.

Pour les messages critiques, une validation humaine ou linguistique doit pouvoir être exigée avant publication d’une nouvelle version.

---

## 17. Préférences utilisateur

Les préférences doivent pouvoir être définies par :

- catégorie ;
- canal ;
- type de notification ;
- période de silence ;
- langue ;
- appareil ;
- pays.

Les préférences marketing sont distinctes des préférences opérationnelles.

---

## 18. Consentement

Le système conserve :

- la finalité ;
- le canal ;
- le statut ;
- la source ;
- la date ;
- la version des conditions ;
- la preuve associée si nécessaire.

Le retrait d’un consentement marketing doit être effectif rapidement et auditable.

---

## 19. Notifications de sécurité

Exemples :

- nouveau terminal ;
- changement de mot de passe ;
- modification d’un facteur MFA ;
- connexion inhabituelle ;
- carte bloquée ;
- changement de numéro ;
- modification de coordonnées sensibles ;
- récupération de compte.

Ces messages sont prioritaires et ne doivent jamais inclure d’information permettant de contourner la sécurité.

---

## 20. OTP et codes temporaires

Les OTP doivent :

- avoir une durée de vie courte ;
- être générés par le service d’authentification approprié ;
- ne pas être journalisés en clair ;
- ne pas être réutilisables ;
- être limités en fréquence ;
- être invalidés après usage ou expiration ;
- ne jamais être inclus dans des analytics de contenu.

Le module notification transporte le message mais ne devient pas la source de vérité du secret.

---

## 21. Notifications transactionnelles

Exemples :

- paiement initié ;
- paiement confirmé ;
- paiement refusé ;
- transfert reçu ;
- retrait effectué ;
- dépôt reçu ;
- remboursement ;
- règlement marchand ;
- facture ou reçu disponible ;
- carte utilisée ;
- abonnement renouvelé.

Les montants affichés sont formatés à partir de valeurs financières validées par le domaine source.

---

## 22. In-app

Les notifications in-app doivent supporter :

- titre ;
- corps ;
- icône ou catégorie ;
- action profonde (`deepLink`) ;
- état lu/non lu ;
- date d’expiration ;
- regroupement ;
- archivage ;
- pagination ;
- synchronisation multi-appareils.

Les liens profonds doivent être validés contre une liste de destinations autorisées.

---

## 23. Push mobile

Le module doit prévoir des adaptateurs pour les services de push des plateformes mobiles.

Il doit gérer :

- tokens de périphérique ;
- rotation des tokens ;
- invalidation ;
- multi-appareils ;
- environnement ;
- application concernée ;
- payload minimal ;
- priorité ;
- expiration ;
- retours de délivrabilité lorsque disponibles.

---

## 24. SMS

Le canal SMS doit gérer :

- normalisation E.164 ;
- pays ;
- fournisseur ;
- longueur ;
- segmentation ;
- encodage ;
- sender ID lorsque autorisé ;
- coûts par segment ;
- états fournisseur ;
- limitation de fréquence.

Le système doit éviter de fragmenter inutilement un message critique en trop de segments.

---

## 25. E-mail

Le canal e-mail doit supporter :

- texte brut ;
- HTML sécurisé ;
- sujet ;
- modèles responsives ;
- liens signés et expirables lorsque requis ;
- pièces jointes contrôlées ;
- désabonnement marketing ;
- gestion des rebonds ;
- plaintes ;
- suppressions.

---

## 26. WhatsApp et messageries partenaires

Lorsqu’un canal de messagerie partenaire est activé :

- seuls les modèles approuvés par le fournisseur sont utilisés si requis ;
- les fenêtres conversationnelles sont respectées ;
- les coûts sont suivis ;
- les consentements sont vérifiés ;
- un fallback n’est exécuté que selon une politique explicite.

---

## 27. Voice

Pour les notifications vocales, l’intégration doit passer par Jini Voice ou un adaptateur autorisé.

Cas possibles :

- rappel de rendez-vous ;
- alerte importante ;
- information de service ;
- accessibilité.

Aucun appel automatique promotionnel ne doit être émis sans base légale et consentement adapté.

---

## 28. Routage fournisseur

Le routage peut dépendre de :

- canal ;
- pays ;
- opérateur ;
- coût ;
- disponibilité ;
- taux de délivrabilité ;
- catégorie ;
- priorité ;
- contrat ;
- plafond budgétaire.

Le routage doit être configurable sans modification de code métier.

---

## 29. Fallback

Exemple autorisé :

```text
PUSH -> SMS
```

uniquement si :

- la notification est éligible au fallback ;
- le délai maximum du premier canal est dépassé ;
- le destinataire autorise le second canal ou la catégorie le permet ;
- la politique de coût l’autorise ;
- aucun succès final n’a déjà été reçu.

---

## 30. Retry

Les retries techniques utilisent :

- backoff exponentiel ;
- jitter ;
- nombre maximal de tentatives ;
- classification des erreurs ;
- file de messages morts (`DLQ`) ;
- reprise manuelle contrôlée.

Les erreurs permanentes ne doivent pas être réessayées indéfiniment.

---

## 31. Planification

Le module doit permettre :

- envoi immédiat ;
- envoi différé ;
- fenêtre horaire ;
- fuseau horaire du destinataire ;
- expiration ;
- annulation avant émission ;
- campagne par lot.

Les notifications de sécurité critiques ignorent les périodes de silence lorsqu’une politique l’impose.

---

## 32. Quiet hours

Les utilisateurs peuvent définir des périodes de silence pour les catégories non critiques.

Le système doit distinguer :

- fuseau du compte ;
- fuseau détecté ;
- fuseau du pays ;
- absence de fuseau fiable.

La règle retenue est enregistrée pour audit.

---

## 33. Batches et campagnes

Les envois en masse doivent :

- être segmentés ;
- respecter les consentements ;
- appliquer des limites de débit ;
- ne pas saturer les files critiques ;
- permettre pause et annulation ;
- mesurer le coût estimé avant envoi ;
- produire un rapport final.

---

## 34. Pièces jointes

Les pièces jointes sont désactivées par défaut sauf cas métier autorisé.

Lorsqu’elles sont nécessaires :

- type MIME validé ;
- taille limitée ;
- antivirus/scan si pertinent ;
- stockage temporaire sécurisé ;
- URL signée privilégiée ;
- durée de conservation contrôlée.

---

## 35. Suppression list

Le module conserve des suppressions pour :

- adresse e-mail invalide ;
- plainte ;
- numéro non joignable ;
- token push invalide ;
- désabonnement ;
- restriction conformité ;
- décision sécurité.

La suppression est évaluée avant appel fournisseur.

---

## 36. Webhooks fournisseurs

Tout webhook entrant doit :

- vérifier signature ou mécanisme équivalent ;
- vérifier timestamp si disponible ;
- limiter les rejeux ;
- valider le schéma ;
- retrouver l’identifiant fournisseur ;
- être idempotent ;
- conserver l’événement utile ;
- ignorer ou quarantainer les événements inconnus.

---

## 37. États de délivrabilité

Le modèle interne doit normaliser les états fournisseurs vers :

```text
ACCEPTED
SENT
DELIVERED
READ
BOUNCED
REJECTED
UNDELIVERABLE
EXPIRED
UNKNOWN
```

L’état brut fournisseur peut être conservé séparément pour diagnostic.

---

## 38. Déduplication

Le système doit empêcher :

- double envoi lié à un retry métier ;
- double consommation d’un événement ;
- double traitement d’un webhook ;
- double fallback après succès tardif ;
- double campagne sur un même segment lorsque la clé d’unicité l’interdit.

---

## 39. Architecture cible

Architecture logique recommandée :

```text
Domain Event / API
        |
Notification Orchestrator
        |
Policy + Preference + Template
        |
Channel Queue
        |
Provider Adapter
        |
External Provider
        |
Delivery Webhook
        |
Delivery State + Analytics
```

---

## 40. Événements entrants

Le module peut consommer des événements comme :

```text
payment.succeeded
payment.failed
transfer.received
card.blocked
security.new_device
kyc.status_changed
subscription.renewed
invoice.created
support.ticket.updated
loyalty.reward_granted
```

Les contrats sont versionnés.

---

## 41. Événements sortants

Exemples :

```text
notification.queued
notification.sent
notification.delivered
notification.failed
notification.read
notification.suppressed
```

Ces événements ne doivent jamais exposer le contenu sensible complet dans le bus si cela n’est pas nécessaire.

---

## 42. API interne minimale

Le service doit prévoir des opérations équivalentes à :

```text
POST /internal/notifications
GET  /internal/notifications/:id
POST /internal/notifications/:id/cancel
POST /internal/notifications/:id/retry
```

Les routes d’administration sont séparées des routes applicatives.

---

## 43. API utilisateur

Selon l’application :

```text
GET   /me/notifications
GET   /me/notifications/:id
POST  /me/notifications/:id/read
POST  /me/notifications/read-all
GET   /me/notification-preferences
PATCH /me/notification-preferences
```

Les préférences non modifiables légalement sont clairement identifiées.

---

## 44. Administration

L’administration doit permettre :

- consulter les modèles ;
- créer un brouillon ;
- comparer les versions ;
- approuver et publier ;
- désactiver un modèle ;
- visualiser la délivrabilité ;
- consulter les erreurs ;
- filtrer par canal/pays/fournisseur ;
- suspendre une campagne ;
- gérer les routes fournisseurs ;
- voir les coûts agrégés ;
- effectuer un renvoi contrôlé ;
- consulter l’audit.

---

## 45. Permissions

Exemples de permissions :

```text
notifications.read
notifications.retry
notifications.cancel
notifications.templates.read
notifications.templates.write
notifications.templates.approve
notifications.providers.read
notifications.providers.manage
notifications.campaigns.read
notifications.campaigns.manage
notifications.analytics.read
```

Les secrets fournisseurs ne sont jamais affichés en clair dans l’administration.

---

## 46. Données minimales d’une tentative

Une tentative doit enregistrer au minimum :

- `notificationId` ;
- canal ;
- fournisseur ;
- route ;
- date de début ;
- date de fin ;
- statut ;
- code erreur normalisé ;
- identifiant fournisseur ;
- coût si disponible ;
- nombre de segments si SMS ;
- compteur de tentative.

Le contenu complet n’est conservé que si la politique de données l’autorise.

---

## 47. Protection des données

Le module applique :

- minimisation ;
- chiffrement en transit ;
- chiffrement au repos lorsque requis ;
- masquage dans les logs ;
- rétention courte des payloads sensibles ;
- séparation métadonnées/contenu ;
- suppression selon politique ;
- contrôle d’accès fin.

---

## 48. Conservation

Les durées sont configurables par catégorie et juridiction.

Les métadonnées nécessaires à l’audit financier ou sécurité peuvent avoir une durée distincte du corps du message.

Le système doit pouvoir supprimer le contenu tout en conservant une preuve minimale d’envoi lorsque la réglementation l’autorise ou l’exige.

---

## 49. Observabilité

Métriques minimales :

- notifications créées ;
- notifications envoyées ;
- délivrées ;
- échecs ;
- taux de retry ;
- latence p50/p95/p99 ;
- profondeur des files ;
- âge du message le plus ancien ;
- taux par fournisseur ;
- coût par canal ;
- taux de fallback ;
- taux de suppression.

---

## 50. Alerting

Alertes possibles :

- fournisseur indisponible ;
- chute de délivrabilité ;
- hausse des erreurs ;
- file critique en retard ;
- hausse anormale des coûts ;
- webhook invalide ;
- volume inhabituel ;
- taux de rejet anormal.

---

## 51. Limites et quotas

Les limites peuvent être définies par :

- utilisateur ;
- appareil ;
- numéro ;
- adresse ;
- organisation ;
- application ;
- type de notification ;
- fournisseur ;
- pays ;
- période.

Les limites de sécurité ne sont pas contournables par les applications clientes.

---

## 52. Résilience

Le module doit supporter :

- files durables ;
- reprise après redémarrage ;
- traitement au moins une fois avec idempotence ;
- circuit breaker fournisseur ;
- timeout ;
- retry contrôlé ;
- DLQ ;
- replay administratif audité ;
- dégradation d’un canal sans panne globale.

---

## 53. Mode Démo

En Démo :

- aucun SMS/e-mail réel n’est envoyé par défaut ;
- les messages sont redirigés vers un provider mock ;
- les payloads peuvent être visualisés dans un panneau de test sécurisé ;
- les scénarios delivered/failed/bounced sont simulables ;
- aucune donnée de production n’est utilisée.

---

## 54. Mode Recette

En Recette :

- fournisseurs sandbox privilégiés ;
- allowlist de destinataires ;
- quotas très faibles ;
- marquage explicite des messages de test ;
- webhooks test séparés de Production.

---

## 55. Mode Production

En Production :

- secrets dans un gestionnaire de secrets ;
- rotation ;
- monitoring permanent ;
- limites de débit ;
- circuits de secours documentés ;
- alertes ;
- audit ;
- contrôles de coût ;
- procédures incident.

---

## 56. Tests unitaires

Couvrir notamment :

- résolution de template ;
- locale ;
- préférences ;
- consentement ;
- priorité ;
- idempotence ;
- fallback ;
- retry ;
- normalisation des états ;
- masquage ;
- limites ;
- quiet hours.

---

## 57. Tests d’intégration

Couvrir :

- file -> worker -> provider mock ;
- webhook -> normalisation -> état ;
- fallback ;
- token push invalide ;
- SMS multi-segments ;
- e-mail bounced ;
- désabonnement marketing ;
- publication d’un modèle ;
- événement métier vers notification.

---

## 58. Tests de concurrence

Vérifier :

- deux workers sur la même notification ;
- double événement ;
- webhook répété ;
- retry simultané ;
- succès tardif après déclenchement d’un fallback ;
- campagne interrompue pendant traitement.

---

## 59. Tests sécurité

Vérifier :

- injection dans templates ;
- liens malveillants ;
- fuite de secrets dans logs ;
- webhook forgé ;
- accès cross-tenant ;
- élévation de privilège ;
- lecture de notifications d’un autre compte ;
- extraction de données depuis l’admin ;
- abus de l’endpoint d’envoi.

---

## 60. Tests de charge

Mesurer :

- débit normal ;
- pic après incident ;
- campagnes volumineuses ;
- capacité de la file critique ;
- temps de reprise après indisponibilité fournisseur ;
- comportement sous limitation fournisseur.

---

## 61. Multi-tenant

Toutes les données organisationnelles doivent être isolées par tenant lorsque le cas d’usage le nécessite.

Les modèles globaux Mansa et modèles spécifiques partenaires doivent être distingués explicitement.

Aucun administrateur d’un partenaire ne peut lire les notifications d’un autre tenant.

---

## 62. Multi-pays

La configuration par pays peut inclure :

- canaux autorisés ;
- fournisseurs ;
- sender IDs ;
- langues ;
- règles de consentement ;
- limites ;
- coûts ;
- fenêtres d’envoi ;
- mentions obligatoires.

---

## 63. Coûts

Le système doit suivre lorsque disponible :

- coût par SMS ;
- coût par segment ;
- coût conversationnel ;
- coût fournisseur ;
- coût par campagne ;
- coût par organisation ;
- coût par pays ;
- coût par type de notification.

Les coûts fournisseurs ne doivent jamais être supposés fixes dans le code.

---

## 64. Tableau de bord

Le dashboard doit afficher au minimum :

- volume par canal ;
- succès/échec ;
- délivrabilité ;
- latence ;
- coût ;
- fournisseurs dégradés ;
- top erreurs ;
- files en attente ;
- campagnes actives ;
- taux de lecture lorsque disponible.

---

## 65. Journal d’audit

Événements audités :

- création/modification de modèle ;
- approbation ;
- publication ;
- changement de fournisseur ;
- changement de route ;
- lancement/pause de campagne ;
- retry manuel ;
- annulation ;
- export ;
- modification de politique.

---

## 66. Anti-spam

Le module doit inclure :

- quotas ;
- fréquence maximale ;
- déduplication ;
- consentement ;
- suppression list ;
- revue des campagnes ;
- possibilité de suspension globale ;
- détection de volume anormal.

---

## 67. Kill switches

L’administration doit pouvoir couper rapidement :

```text
ALL_MARKETING
CHANNEL_SMS
CHANNEL_EMAIL
CHANNEL_PUSH
PROVIDER_<ID>
COUNTRY_<CODE>
CAMPAIGN_<ID>
```

Les notifications critiques ne sont arrêtées globalement que selon une procédure d’incident autorisée.

---

## 68. Dépendances techniques recommandées

Le module peut s’appuyer sur :

- NestJS ;
- PostgreSQL ;
- Prisma ;
- Redis pour throttling/cache si nécessaire ;
- broker de messages durable ;
- workers dédiés ;
- OpenTelemetry ;
- adaptateurs fournisseurs séparés ;
- stockage objet sécurisé pour les rares pièces jointes autorisées.

Le choix final du broker et des fournisseurs reste une décision d’architecture/configuration.

---

## 69. Structure logique recommandée

```text
notifications/
  application/
  domain/
  infrastructure/
  templates/
  policies/
  providers/
    mock/
    push/
    sms/
    email/
    whatsapp/
    voice/
  workers/
  webhooks/
  admin/
  tests/
```

---

## 70. Critères d’acceptation

Le module est considéré prêt pour intégration lorsque :

- un service métier peut demander une notification sans connaître le fournisseur ;
- les modèles sont versionnés et localisés ;
- les préférences et consentements sont appliqués ;
- les catégories critiques sont prioritaires ;
- les appels fournisseur sont idempotents ou protégés contre les doublons ;
- les retours de délivrabilité sont normalisés ;
- les webhooks sont authentifiés et idempotents ;
- le retry, fallback, DLQ et kill switch sont testés ;
- les secrets et données sensibles sont absents des logs ;
- les métriques et audits sont exploitables ;
- les environnements Démo, Recette et Production sont séparés ;
- les tests unitaires, intégration, concurrence, charge et sécurité passent ;
- aucun secret n’est présent dans le dépôt.

---

## 71. Définition de terminé

Le module est terminé lorsque la documentation, les contrats, les modèles de données, politiques, adaptateurs mock, files, workers, webhooks, observabilité, administration et tests associés sont cohérents avec le reste de Mansa, et que l’ajout d’un nouveau fournisseur ou d’un nouveau pays peut être réalisé sans réécrire le cœur métier.
