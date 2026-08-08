# Cahier des charges — Authentification, identité et contrôle d’accès

## 1. Objectif

Ce module fournit le socle d’identité et d’autorisation de l’écosystème Mansa. Il doit protéger les applications Client, Commerçant, TPE, Admin Lite, Annuaire/Hub, portail Admin Web, APIs partenaires et modules État, tout en conservant des parcours adaptés aux particuliers, employés, agents, administrateurs et intégrations machine-à-machine.

## 2. Périmètre

Le module couvre :

- création et gestion des identités ;
- authentification par mot de passe, PIN, biométrie locale et OTP lorsque nécessaire ;
- sessions mobiles et web ;
- authentification renforcée pour opérations sensibles ;
- gestion des appareils de confiance ;
- rôles, permissions et politiques d’accès ;
- délégation et comptes employés ;
- accès partenaires et comptes de service ;
- révocation, verrouillage, récupération et fermeture de compte ;
- audit des événements de sécurité.

Le module ne remplace pas les procédures KYC/KYB : il consomme leur statut pour déterminer certains droits.

## 3. Principes de sécurité

1. Aucun mot de passe, PIN, secret OTP ou jeton brut n’est stocké en clair.
2. Les mots de passe sont hachés avec un algorithme adaptatif moderne et paramètres configurables.
3. Le PIN transactionnel est distinct du mot de passe principal lorsqu’il est utilisé.
4. Les jetons d’accès ont une durée de vie courte ; les jetons de renouvellement sont rotatifs et révocables.
5. Toute réutilisation d’un refresh token déjà consommé déclenche une révocation de la chaîne de session concernée.
6. Les actions à fort risque exigent une authentification récente ou renforcée.
7. Les permissions sont refusées par défaut.
8. Toute décision d’autorisation sensible est auditée avec acteur, ressource, action, résultat et contexte.
9. Les données biométriques ne quittent jamais le système sécurisé du téléphone ; Mansa ne stocke que le résultat d’authentification fourni par l’OS.
10. Les secrets techniques sont fournis par le gestionnaire de secrets de l’environnement et jamais intégrés au dépôt.

## 4. Types d’identités

### 4.1 Client particulier

Un particulier possède une identité principale Mansa liée à un identifiant interne immuable. Les numéros de téléphone, adresses e-mail et autres identifiants externes restent modifiables et ne servent jamais de clé primaire métier.

### 4.2 Commerçant

Le propriétaire ou représentant légal possède une identité personnelle et une relation avec une organisation commerciale. Les employés sont des membres distincts avec leurs propres identités et permissions.

### 4.3 Agent et agent public

Chaque agent dispose d’une identité individuelle. Aucun compte partagé n’est autorisé pour les opérations financières, administratives ou de contrôle.

### 4.4 Administrateur

Les comptes administrateurs sont séparés des comptes clients lorsque nécessaire et protégés par une authentification renforcée obligatoire. Les privilèges élevés sont attribués explicitement et peuvent être limités dans le temps.

### 4.5 Partenaire et compte de service

Les intégrations serveur-à-serveur utilisent des identités techniques dédiées, des clés ou mécanismes d’authentification machine appropriés, des scopes minimaux et une rotation régulière des secrets.

## 5. Identifiants et modèle de données

Entités minimales :

- `Identity` ;
- `Credential` ;
- `Session` ;
- `Device` ;
- `OrganizationMembership` ;
- `Role` ;
- `Permission` ;
- `Policy` ;
- `ServiceAccount` ;
- `SecurityEvent` ;
- `RecoveryChallenge`.

Chaque identité possède un UUID interne non réutilisable.

Les statuts d’identité incluent au minimum : `PENDING`, `ACTIVE`, `LOCKED`, `SUSPENDED`, `CLOSED`.

## 6. Création de compte et connexion

### 6.1 Création

Le parcours doit :

1. collecter l’identifiant principal autorisé par le pays ;
2. vérifier la possession de cet identifiant lorsque nécessaire ;
3. créer l’identité interne ;
4. enregistrer le consentement et les versions de documents applicables ;
5. initier ou rattacher le parcours KYC ;
6. enregistrer le premier appareil ;
7. créer une session uniquement lorsque les règles de risque l’autorisent.

### 6.2 Connexion

La connexion accepte uniquement les méthodes activées pour le contexte. Le backend évalue :

- validité de l’identité ;
- statut du compte ;
- appareil ;
- pays ;
- adresse IP et signaux de risque ;
- échecs récents ;
- statut KYC lorsque pertinent.

Le système applique un rate limiting adaptatif et des délais progressifs en cas d’échecs répétés.

## 7. PIN et biométrie

Le PIN sert à simplifier certains parcours sur appareil déjà enrôlé. Il ne doit pas être considéré comme un secret universel réutilisable sur tous les appareils.

La biométrie repose exclusivement sur les APIs sécurisées natives iOS/Android. Le serveur ne reçoit jamais empreinte, visage ou gabarit biométrique.

Pour une opération financière sensible, le client signe ou confirme un challenge transactionnel lié au montant, au bénéficiaire et à un identifiant de transaction afin d’éviter qu’une validation soit réutilisée pour une autre opération.

## 8. OTP et authentification renforcée

L’OTP peut être utilisé pour :

- vérification initiale d’un numéro ou e-mail ;
- récupération de compte ;
- connexion à risque ;
- ajout d’un nouvel appareil ;
- changement d’information sensible.

Un OTP :

- est à usage unique ;
- expire rapidement ;
- possède un nombre maximal de tentatives ;
- ne doit pas être journalisé en clair ;
- ne suffit pas seul pour les opérations les plus critiques lorsque des signaux de fraude sont présents.

Les administrateurs et comptes à privilèges élevés doivent utiliser un second facteur plus robuste lorsque la plateforme le permet.

## 9. Sessions et jetons

### 9.1 Access token

- durée courte ;
- audience explicite ;
- scopes minimaux ;
- identifiant de session ;
- identifiant d’identité ;
- aucune donnée personnelle inutile.

### 9.2 Refresh token

- stocké sous forme protégée côté serveur ;
- rotation à chaque utilisation ;
- révocable par session, appareil ou identité ;
- détection de réutilisation ;
- expiration absolue configurable.

### 9.3 Révocation

Doivent pouvoir être révoqués immédiatement :

- une session ;
- toutes les sessions d’un appareil ;
- toutes les sessions d’une identité ;
- tous les accès d’une organisation ;
- un compte de service ;
- un scope partenaire.

## 10. Gestion des appareils

Chaque appareil enrôlé possède :

- un identifiant interne ;
- une clé publique ou preuve cryptographique lorsque disponible ;
- la plateforme ;
- une version d’application ;
- une date d’enrôlement ;
- un statut de confiance ;
- une dernière activité ;
- des signaux de sécurité.

L’ajout d’un nouvel appareil peut déclencher une vérification renforcée et une notification à l’utilisateur.

Un appareil compromis, rooté ou jailbreaké peut être limité selon la politique de risque, sans dépendre d’un seul signal.

## 11. Autorisation RBAC et ABAC

Mansa utilise une combinaison de :

- RBAC pour les responsabilités structurées ;
- ABAC/politiques contextuelles pour les contraintes dynamiques.

Exemples d’attributs :

- pays ;
- organisation ;
- agence ;
- rôle ;
- type d’utilisateur ;
- niveau KYC ;
- montant ;
- produit ;
- statut du compte ;
- canal ;
- horaire ;
- niveau de risque.

Une règle peut par exemple autoriser un employé de commerce à initier un remboursement dans une limite définie mais exiger une approbation du responsable au-delà.

## 12. Rôles de référence

Rôles indicatifs, configurables :

- `CLIENT` ;
- `MERCHANT_OWNER` ;
- `MERCHANT_MANAGER` ;
- `MERCHANT_CASHIER` ;
- `FIELD_AGENT` ;
- `PUBLIC_AGENT` ;
- `SUPPORT_AGENT` ;
- `COMPLIANCE_ANALYST` ;
- `RISK_ANALYST` ;
- `FINANCE_OPERATOR` ;
- `ADMIN` ;
- `SUPER_ADMIN` ;
- `PARTNER_SERVICE`.

Le rôle `SUPER_ADMIN` ne doit jamais contourner la journalisation ni les contrôles critiques. Les opérations extrêmement sensibles peuvent exiger une double approbation.

## 13. Permissions

Les permissions suivent une nomenclature stable :

`<domaine>.<ressource>.<action>`

Exemples :

- `wallet.balance.read` ;
- `payment.refund.create` ;
- `merchant.employee.manage` ;
- `kyc.case.review` ;
- `admin.role.assign` ;
- `public.fine.issue`.

Les permissions sont versionnées et testées automatiquement.

## 14. Délégation et comptes employés

Le propriétaire d’une organisation peut inviter un employé sans partager ses identifiants.

Chaque invitation contient :

- organisation ;
- rôle proposé ;
- permissions éventuelles ;
- date d’expiration ;
- identité de l’invitant.

Les droits peuvent être suspendus ou retirés immédiatement. L’historique des changements reste conservé dans l’audit.

## 15. Accès administrateur

Le portail Admin impose :

- MFA ;
- session plus courte ;
- authentification récente pour actions critiques ;
- restrictions réseau ou device lorsque configurées ;
- approbation renforcée pour changements de commissions, limites, rôles critiques ou opérations financières exceptionnelles ;
- journal d’audit non modifiable par l’administrateur opérateur.

Aucune interface ne doit afficher un secret complet, un PIN ou une information d’authentification réutilisable.

## 16. Récupération de compte

Le parcours de récupération doit privilégier la sécurité plutôt que la simplicité.

Il doit :

- vérifier plusieurs signaux selon le niveau de risque ;
- invalider les sessions potentiellement compromises ;
- notifier le titulaire ;
- appliquer un délai ou une revue humaine pour les cas sensibles ;
- interdire aux agents support de connaître ou choisir directement un nouveau secret pour l’utilisateur.

## 17. Verrouillage et suspension

Le système distingue :

- verrouillage automatique après anomalies d’authentification ;
- suspension risque/fraude ;
- suspension conformité ;
- suspension administrative ;
- fermeture volontaire ou réglementaire.

Chaque état possède des motifs structurés et des règles de réactivation.

## 18. APIs principales

Exemples d’API :

- `POST /v1/auth/register` ;
- `POST /v1/auth/login` ;
- `POST /v1/auth/refresh` ;
- `POST /v1/auth/logout` ;
- `POST /v1/auth/step-up` ;
- `POST /v1/auth/recovery/start` ;
- `POST /v1/auth/recovery/complete` ;
- `GET /v1/me/sessions` ;
- `DELETE /v1/me/sessions/{id}` ;
- `GET /v1/me/devices` ;
- `DELETE /v1/me/devices/{id}` ;
- `POST /v1/organizations/{id}/members` ;
- `PATCH /v1/organizations/{id}/members/{memberId}`.

Toutes les commandes mutables importantes acceptent un identifiant de corrélation et, lorsqu’approprié, une clé d’idempotence.

## 19. Événements métier

Le module publie notamment :

- `identity.created` ;
- `identity.activated` ;
- `identity.locked` ;
- `identity.suspended` ;
- `auth.login.succeeded` ;
- `auth.login.failed` ;
- `auth.step_up.completed` ;
- `session.created` ;
- `session.revoked` ;
- `device.enrolled` ;
- `device.revoked` ;
- `role.assigned` ;
- `role.revoked`.

Les événements ne contiennent pas de secrets.

## 20. Audit

Chaque événement de sécurité enregistre au minimum :

- identifiant d’événement ;
- horodatage serveur ;
- acteur ;
- type d’identité ;
- session ;
- appareil ;
- action ;
- ressource ;
- résultat ;
- raison normalisée ;
- identifiant de corrélation ;
- métadonnées de risque non sensibles.

Les journaux sont protégés contre la modification et soumis à une politique de rétention définie par conformité.

## 21. Observabilité

Métriques minimales :

- taux de connexion réussie ;
- taux d’échec par canal ;
- volume d’OTP ;
- taux d’OTP invalide ;
- verrouillages ;
- récupérations ;
- nouveaux appareils ;
- refresh token reuse ;
- refus d’autorisation ;
- latence des endpoints d’authentification.

Des alertes sont définies sur les variations anormales.

## 22. Protection contre les abus

Le module doit gérer :

- rate limiting par IP, identité, device et identifiant cible ;
- credential stuffing ;
- brute force ;
- enumeration de comptes ;
- spam OTP ;
- session fixation ;
- vol et réutilisation de refresh token ;
- escalade de privilèges ;
- invitation abusive d’employés.

Les réponses publiques ne doivent pas révéler inutilement l’existence d’un compte.

## 23. Multi-pays

Les politiques suivantes sont configurables par pays :

- identifiants acceptés ;
- exigences de vérification ;
- règles d’âge ;
- moyens OTP ;
- délais de récupération ;
- facteurs obligatoires ;
- contraintes réglementaires.

Le cœur d’identité reste commun afin d’éviter une duplication du modèle.

## 24. Disponibilité et performance

Objectifs initiaux :

- endpoints de validation de session hautement disponibles ;
- dégradation contrôlée en cas d’indisponibilité d’un fournisseur OTP ;
- cache de permissions à courte durée avec invalidation lors des changements ;
- aucune dépendance synchrone non essentielle dans le chemin critique de validation d’un access token.

Les objectifs chiffrés définitifs sont fixés dans le SLO global de la plateforme.

## 25. Tests obligatoires

- tests unitaires des politiques d’accès ;
- tests d’intégration login/refresh/logout ;
- tests de rotation de refresh tokens ;
- tests de révocation ;
- tests de concurrence ;
- tests de rate limiting ;
- tests de récupération ;
- tests de séparation d’organisations ;
- tests d’escalade de privilèges ;
- tests de non-régression des permissions ;
- tests E2E sur Client, Commerçant et Admin.

Chaque permission critique doit posséder au moins un test positif et un test négatif.

## 26. Critères d’acceptation

Le module est considéré prêt pour intégration lorsque :

1. un utilisateur peut créer et sécuriser son identité ;
2. les sessions peuvent être créées, renouvelées et révoquées de manière sûre ;
3. l’ajout et la révocation d’appareils sont opérationnels ;
4. les rôles et permissions isolent correctement utilisateurs et organisations ;
5. les administrateurs utilisent une authentification renforcée ;
6. les scénarios de récupération sont audités ;
7. les événements de sécurité sont exploitables par risque et support ;
8. les tests d’autorisation et de révocation passent ;
9. aucun secret réutilisable n’apparaît dans les logs ;
10. une suspension d’identité ou révocation de privilège prend effet immédiatement selon les SLO définis.

## 27. Dépendances

- module KYC/KYB et conformité ;
- Risk Engine ;
- notifications multicanales ;
- audit central ;
- gestion des organisations ;
- gestionnaire de secrets ;
- observabilité.

## 28. Évolutions prévues

- passkeys/WebAuthn pour les canaux compatibles ;
- politiques adaptatives avancées ;
- approbation à quatre yeux généralisée pour opérations critiques ;
- federation d’identité pour grands partenaires et administrations ;
- gestion centralisée des accès privilégiés à durée limitée.
