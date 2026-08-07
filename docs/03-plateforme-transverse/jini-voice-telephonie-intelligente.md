# Jini Voice — Téléphonie intelligente professionnelle

## 1. Objet

Jini Voice est un module professionnel de téléphonie intelligente destiné aux entreprises, commerçants, indépendants, administrations, collectivités et services publics. Il peut être intégré à Mansa mais reste découplé afin d’être réutilisable comme produit autonome.

Le module ne constitue pas une application grand public d’appels entre particuliers. Il sert à automatiser, assister et tracer des interactions téléphoniques professionnelles : accueil, qualification, prise de commande, rendez-vous, information, support, relance et routage.

## 2. Objectifs

- répondre aux appels entrants 24/7 selon la politique de l’organisation ;
- comprendre la demande de l’appelant ;
- répondre à partir de données autorisées et à jour ;
- transférer vers un humain lorsque nécessaire ;
- prendre une commande, un rendez-vous ou une demande de support ;
- synchroniser le résultat dans l’application Commerçant, le Hub/Annuaire ou un système tiers ;
- fonctionner avec plusieurs langues, dont le français et le bambara lorsque les modèles disponibles le permettent ;
- minimiser la conservation des données vocales et textuelles ;
- permettre l’export local par l’organisation avant suppression ;
- fournir une traçabilité complète sans conserver inutilement le contenu sensible.

## 3. Principes non négociables

1. Jini Voice doit annoncer clairement lorsqu’un assistant automatisé intervient si la réglementation ou la politique locale l’exige.
2. Aucun paiement sensible, code PIN, CVV, mot de passe ou secret ne doit être demandé ou stocké par le moteur conversationnel.
3. Les enregistrements audio sont désactivés par défaut et activables uniquement par politique explicite.
4. Les transcriptions sont conservées pendant une durée courte, configurable, puis supprimées automatiquement.
5. L’organisation peut exporter ses données autorisées vers son propre stockage avant suppression.
6. Les données d’un client ne doivent jamais être exposées à un autre client ou à une autre organisation.
7. Toute action métier déclenchée par la voix doit être idempotente et auditée.
8. Toute réponse basée sur une donnée métier doit provenir d’une source approuvée.
9. Les décisions critiques doivent pouvoir être reprises par un humain.
10. Le module doit continuer à fonctionner en mode dégradé lorsque certains services IA sont indisponibles.

## 4. Acteurs

- appelant ;
- agent IA Jini Voice ;
- employé ou opérateur humain ;
- commerçant ;
- administrateur d’organisation ;
- super administrateur Mansa ;
- système métier connecté ;
- opérateur télécom/SIP ;
- service de transcription ;
- moteur de synthèse vocale ;
- moteur de compréhension/conversation.

## 5. Cas d’usage prioritaires

### 5.1 Commerce

- horaires et disponibilité ;
- prise de commande ;
- état d’une commande ;
- réservation ;
- questions produit ;
- transfert vers un vendeur ;
- création d’un ticket après l’appel.

### 5.2 Entreprises

- standard automatique ;
- qualification d’appel ;
- prise de rendez-vous ;
- support de premier niveau ;
- collecte structurée d’informations ;
- redirection vers un service.

### 5.3 Administrations et services publics

- information sur procédures ;
- orientation vers le bon service ;
- prise de rendez-vous ;
- suivi de dossier à partir d’un identifiant autorisé ;
- rappel d’éléments administratifs non sensibles.

## 6. Architecture logique

Le module comprend au minimum :

- `VoiceGateway` ;
- `CallSessionService` ;
- `SpeechToTextAdapter` ;
- `ConversationOrchestrator` ;
- `KnowledgeRetriever` ;
- `BusinessActionRouter` ;
- `TextToSpeechAdapter` ;
- `HumanHandoffService` ;
- `RetentionService` ;
- `AuditService` ;
- `PolicyEngine` ;
- `AnalyticsService`.

Les fournisseurs télécom, STT, LLM et TTS sont isolés derrière des adaptateurs interchangeables.

## 7. Cycle de vie d’un appel

```text
RINGING
ANSWERED
IDENTIFYING_INTENT
HANDLING
WAITING_EXTERNAL_ACTION
HANDOFF_REQUESTED
TRANSFERRED
COMPLETED
FAILED
ABANDONED
```

Chaque transition conserve un horodatage, une raison et un identifiant de corrélation.

## 8. Identification de l’appelant

L’identification peut utiliser :

- numéro appelant ;
- identifiant client fourni oralement puis confirmé ;
- numéro de commande ;
- référence de dossier ;
- authentification renforcée via un canal séparé lorsque nécessaire.

Le simple numéro de téléphone ne doit pas suffire pour exposer des informations sensibles.

## 9. Intentions supportées

Le moteur doit reconnaître au minimum :

```text
INFORMATION_REQUEST
ORDER_CREATE
ORDER_STATUS
BOOKING_CREATE
BOOKING_CHANGE
SUPPORT_REQUEST
ACCOUNT_HELP
ADMINISTRATIVE_GUIDANCE
HUMAN_AGENT
COMPLAINT
OTHER
```

Les intentions sont configurables par organisation.

## 10. Base de connaissances

Une organisation peut connecter :

- catalogue produits ;
- horaires ;
- FAQ ;
- politiques de retour ;
- tarifs publics ;
- procédures ;
- adresses ;
- documents validés ;
- informations de service.

Chaque source possède : propriétaire, version, date de mise à jour, portée et statut de publication.

## 11. Réponses contrôlées

Pour les sujets à risque, le moteur doit privilégier des réponses déterministes ou des contenus approuvés plutôt qu’une génération libre.

Les réponses doivent pouvoir être bloquées par catégorie : juridique, médical, financier, sécurité, données personnelles, engagement contractuel.

## 12. Prise de commande

Jini Voice peut créer un panier structuré :

- produit ;
- variante ;
- quantité ;
- prix courant issu du système commerçant ;
- disponibilité ;
- adresse ou mode de retrait ;
- instructions ;
- identité client si nécessaire.

Avant création définitive, le système relit le récapitulatif et demande une confirmation explicite.

Le paiement n’est pas collecté oralement. Jini Voice peut générer un lien de paiement, une demande Mansa ou orienter vers le canal sécurisé prévu.

## 13. Synchronisation commerce et Hub

Si le commerce utilise l’application Commerçant, les commandes et demandes sont envoyées directement au compte du commerce.

Si l’organisation n’utilise pas l’application Commerçant mais dispose d’un profil Hub/Annuaire, les données autorisées peuvent être synchronisées dans l’espace professionnel du Hub.

Sinon, une intégration générique peut utiliser webhook, API ou export structuré.

## 14. Rendez-vous

Le module doit :

- lire les créneaux disponibles ;
- proposer plusieurs options ;
- confirmer date, heure et fuseau ;
- créer le rendez-vous ;
- envoyer une confirmation ;
- permettre modification ou annulation selon les règles.

## 15. Transfert vers un humain

Le transfert doit être possible lorsque :

- l’utilisateur le demande ;
- la confiance de compréhension est insuffisante ;
- la politique l’impose ;
- une opération sensible est requise ;
- plusieurs échecs consécutifs surviennent ;
- un risque ou une plainte est détecté.

Le contexte utile peut être transmis à l’agent humain sans inclure des données inutiles.

## 16. Multilingue

La langue peut être :

- choisie par menu ;
- détectée automatiquement ;
- configurée par numéro ou organisation.

Le français est la langue de référence initiale. Le bambara doit être prévu dans l’architecture avec évaluation explicite de la qualité STT/TTS avant activation en production.

## 17. Conservation des données

Les politiques doivent distinguer :

- métadonnées d’appel ;
- audio ;
- transcription ;
- résumé ;
- données métier extraites ;
- événements d’audit.

Valeurs recommandées par défaut :

- audio : non conservé ;
- transcription brute : durée très courte configurable ;
- résumé : durée définie par le besoin métier ;
- données métier nécessaires : selon la politique du système cible ;
- audit minimal : durée réglementaire applicable.

## 18. Export avant suppression

L’administrateur peut exporter les données autorisées vers :

- stockage local de l’organisation ;
- fichier chiffré ;
- API de sauvegarde ;
- espace documentaire interne.

L’export doit être journalisé. La suppression programmée n’est pas annulée automatiquement par un export.

## 19. Sécurité

- chiffrement en transit ;
- chiffrement au repos lorsque des données sont conservées ;
- séparation stricte multi-tenant ;
- rotation des secrets ;
- contrôle d’accès RBAC/ABAC ;
- limitation de débit ;
- anti-spam ;
- détection d’abus ;
- masquage des données sensibles dans les logs ;
- politique de moindre privilège.

## 20. Anti-fraude et abus

Le module doit détecter :

- appels automatisés massifs ;
- tentatives répétées d’extraction de données ;
- usurpation évidente ;
- demandes anormales ;
- prompt injection via contenu vocal ou documents ;
- contournement des règles ;
- abus des actions métier.

Les sources récupérées depuis la base de connaissances sont traitées comme données, jamais comme instructions système.

## 21. Observabilité

Mesures principales :

- appels reçus ;
- taux de décroché ;
- durée moyenne ;
- taux de résolution automatique ;
- taux de transfert humain ;
- intents principaux ;
- taux d’échec STT/TTS ;
- latence par étape ;
- actions métier réussies/échouées ;
- coût moyen par appel ;
- satisfaction lorsque mesurée.

## 22. Maîtrise des coûts

Le système suit séparément :

- minutes télécom ;
- transcription ;
- tokens ou consommation du moteur conversationnel ;
- synthèse vocale ;
- stockage ;
- appels API externes.

Des plafonds peuvent être configurés par organisation, numéro, jour et mois.

## 23. Administration

L’administration permet de configurer :

- numéros ;
- horaires ;
- langues ;
- voix ;
- scripts d’accueil ;
- intents ;
- sources de connaissances ;
- transferts ;
- règles de rétention ;
- quotas ;
- intégrations ;
- niveaux d’autonomie ;
- fonctionnalités activées ;
- environnement Démo/Recette/Production.

## 24. API minimale

Exemples de ressources :

```text
POST /voice/calls
GET /voice/calls/:id
POST /voice/calls/:id/handoff
POST /voice/actions/orders
POST /voice/actions/bookings
GET /voice/knowledge/sources
POST /voice/knowledge/sources
GET /voice/policies
PATCH /voice/policies/:id
POST /voice/exports
```

Les contrats réels doivent être versionnés et documentés dans le catalogue API Mansa.

## 25. Événements

Événements principaux :

```text
voice.call.started
voice.call.intent_detected
voice.call.handoff_requested
voice.call.completed
voice.action.requested
voice.action.completed
voice.action.failed
voice.retention.deleted
voice.export.completed
```

Chaque événement possède un identifiant unique et un `correlationId`.

## 26. Tests obligatoires

- tests unitaires du moteur de politiques ;
- tests de conversation déterministes ;
- tests de concurrence sur les actions métier ;
- tests d’idempotence ;
- tests multi-tenant ;
- tests de rétention et suppression ;
- tests de transfert humain ;
- tests de panne STT/LLM/TTS ;
- tests de sécurité et injection ;
- tests de charge téléphonique ;
- tests de coût et quotas.

## 27. Critères d’acceptation

Le module est acceptable lorsque :

- un appel peut être traité de bout en bout avec traçabilité ;
- les actions métier sont synchronisées sans doublon ;
- aucune donnée de paiement sensible n’est collectée oralement ;
- les politiques de rétention suppriment réellement les contenus arrivés à expiration ;
- l’export fonctionne avant suppression ;
- le transfert humain conserve uniquement le contexte nécessaire ;
- la séparation multi-tenant est testée ;
- la latence est mesurée et compatible avec une conversation naturelle ;
- les coûts sont mesurables et plafonnables ;
- aucun secret n’est présent dans le dépôt.

## 28. Déploiement progressif

Phase 1 : accueil, information, routage et transfert humain.

Phase 2 : commandes, rendez-vous et tickets structurés.

Phase 3 : intégrations Commerçant, Hub et systèmes tiers.

Phase 4 : multilingue renforcé, analytics avancés et optimisation des coûts.

Toute nouvelle autonomie doit être activée par configuration et non imposée globalement.