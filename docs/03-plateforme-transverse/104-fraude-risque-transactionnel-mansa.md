# 104 — Fraude, risque transactionnel et moteur de décision Mansa

## 1. Objet du document

Ce document définit le cahier des charges du module **Fraude, risque transactionnel et moteur de décision Mansa**.

Le module doit détecter, évaluer, expliquer et traiter les comportements suspects sur l’ensemble de l’écosystème Mansa : comptes clients, commerçants, agents, TPE, cartes, wallets, paiements, transferts, retraits, dépôts, Mobile Money, Open Banking, services publics et opérations administratives sensibles.

Il ne remplace ni l’analyse humaine, ni les obligations réglementaires, ni les contrôles propres aux banques, réseaux cartes ou opérateurs partenaires. Il fournit une couche transverse de prévention, détection, décision, investigation et traçabilité.

---

## 2. Objectifs

- réduire les pertes liées à la fraude ;
- limiter les faux positifs ;
- détecter les comportements anormaux en temps réel et en différé ;
- appliquer des décisions proportionnées au risque ;
- préserver l’expérience des utilisateurs légitimes ;
- fournir une justification exploitable de chaque décision ;
- permettre une revue humaine ;
- centraliser les signaux de risque multi-produits ;
- adapter les règles par pays, partenaire, produit et segment ;
- garantir l’auditabilité complète des décisions.

---

## 3. Positionnement dans l’architecture Mansa

Le moteur de risque est transverse et s’intègre notamment avec :

- Identity et authentification ;
- KYC/KYB ;
- Wallet et Ledger ;
- paiements et transferts ;
- cartes physiques et virtuelles ;
- Mobile Money ;
- réseau d’agents ;
- TPE et commerçants ;
- Open Banking ;
- abonnements ;
- crédit ;
- trésorerie ;
- Jini ;
- notifications ;
- support ;
- administration ;
- audit ;
- data/analytics ;
- partenaires externes.

---

## 4. Principes non négociables

1. Aucune décision sensible ne doit être impossible à retracer.
2. Aucune règle critique ne doit être codée en dur dans une interface cliente.
3. Les secrets, clés et modèles propriétaires ne sont jamais exposés côté client.
4. Les décisions automatiques doivent être explicables à un analyste autorisé.
5. Une panne du moteur ne doit jamais conduire silencieusement à autoriser toutes les opérations.
6. Le comportement de repli doit être configuré par type d’opération et niveau de criticité.
7. Les règles, seuils et modèles sont versionnés.
8. Les données utilisées doivent être minimisées et légalement justifiées.
9. Les décisions à fort impact doivent pouvoir être révisées humainement lorsque requis.
10. Toute intervention administrative sensible est auditée.

---

## 5. Concepts principaux

Le module manipule au minimum :

- `RiskEvent` ;
- `RiskSignal` ;
- `RiskAssessment` ;
- `RiskScore` ;
- `RiskDecision` ;
- `RiskRule` ;
- `RuleVersion` ;
- `RiskProfile` ;
- `DeviceProfile` ;
- `VelocityCounter` ;
- `WatchlistMatch` ;
- `FraudCase` ;
- `CaseEvidence` ;
- `CaseAction` ;
- `ReviewDecision` ;
- `RiskModelVersion` ;
- `Override` ;
- `RiskConfiguration`.

---

## 6. Entité RiskEvent

Un événement de risque représente une action évaluée : connexion, changement de mot de passe, ajout de bénéficiaire, paiement, retrait, transfert, création de carte, modification KYC, changement d’appareil, opération TPE ou action administrative.

Champs minimum :

- identifiant ;
- type d’événement ;
- date/heure ;
- acteur ;
- tenant/organisation ;
- pays ;
- canal ;
- produit ;
- montant et devise si applicable ;
- appareil ;
- session ;
- IP et métadonnées réseau autorisées ;
- géolocalisation si disponible et autorisée ;
- bénéficiaire/contrepartie ;
- références transactionnelles ;
- contexte enrichi ;
- niveau de sensibilité.

---

## 7. Typologie de signaux

Les signaux peuvent provenir de :

- identité ;
- authentification ;
- appareil ;
- réseau ;
- géographie ;
- comportement ;
- vélocité ;
- montant ;
- bénéficiaire ;
- historique transactionnel ;
- KYC/KYB ;
- partenaire ;
- liste de surveillance ;
- fraude confirmée antérieure ;
- chargeback/litige ;
- relation entre comptes ;
- anomalie de terminal ;
- modèle statistique ou ML ;
- règle experte.

---

## 8. Niveaux de risque

```text
VERY_LOW
LOW
MEDIUM
HIGH
VERY_HIGH
CRITICAL
UNKNOWN
```

Le niveau n’est jamais dérivé uniquement d’un seuil global unique : il peut varier selon le produit, le pays, le montant et la sensibilité de l’action.

---

## 9. Décisions possibles

```text
ALLOW
ALLOW_WITH_MONITORING
STEP_UP_AUTHENTICATION
REQUIRE_ADDITIONAL_INFORMATION
DELAY
MANUAL_REVIEW
LIMIT
BLOCK_TRANSACTION
BLOCK_FEATURE
SUSPEND_ACCOUNT
REJECT
ESCALATE
```

Une décision doit inclure sa raison, sa politique, sa version, ses signaux principaux et sa durée d’application lorsqu’elle est temporaire.

---

## 10. Score de risque

Le moteur peut produire un score numérique interne, mais ce score n’est pas suffisant à lui seul pour expliquer une décision.

Il doit être accompagné de facteurs structurés, par exemple :

```text
score = 82/100
niveau = HIGH
facteurs = [NEW_DEVICE, UNUSUAL_AMOUNT, NEW_BENEFICIARY, HIGH_VELOCITY]
```

Les échelles de score doivent être documentées et versionnées.

---

## 11. Moteur de règles

Le moteur de règles doit supporter :

- conditions simples ;
- groupes AND/OR ;
- seuils ;
- fenêtres temporelles ;
- listes ;
- règles de vélocité ;
- règles contextuelles ;
- exceptions ;
- priorités ;
- règles par segment ;
- activation programmée ;
- expiration ;
- simulation avant publication.

---

## 12. Versionnement des règles

Toute règle possède : identifiant stable, version, auteur, date de création, date d’effet, justification, environnement, statut et historique.

Une transaction doit conserver la version exacte des règles qui ont participé à sa décision.

---

## 13. Cycle de vie d’une règle

```text
DRAFT
TESTING
APPROVED
SCHEDULED
ACTIVE
PAUSED
RETIRED
REJECTED
```

La mise en production d’une règle critique peut nécessiter une double validation.

---

## 14. Simulation de règle

Avant activation, une règle doit pouvoir être exécutée sur un échantillon historique pseudonymisé ou sur des événements synthétiques.

La simulation mesure au minimum :

- volume d’événements touchés ;
- taux de blocage ;
- taux de revue ;
- utilisateurs affectés ;
- pertes historiques potentiellement évitées ;
- faux positifs estimés ;
- latence ajoutée.

---

## 15. Vélocité

Exemples de compteurs :

- nombre de connexions en 10 minutes ;
- nombre de bénéficiaires ajoutés en 24 heures ;
- montant cumulé transféré en 1 heure ;
- retraits par jour ;
- cartes virtuelles créées ;
- tentatives de paiement refusées ;
- transactions par appareil ;
- comptes utilisés depuis la même empreinte technique.

Les fenêtres doivent être configurables.

---

## 16. Détection de fractionnement

Le système doit détecter les séries d’opérations proches qui semblent contourner un seuil ou une limite.

L’analyse peut porter sur un utilisateur, un bénéficiaire, un agent, un commerçant, un appareil, une adresse réseau ou un groupe de comptes reliés.

---

## 17. Nouvel appareil

Un nouvel appareil n’est pas automatiquement frauduleux. Il augmente le risque selon le contexte : montant, action, historique, localisation, réinitialisation récente, changement SIM, bénéficiaire nouveau et autres signaux disponibles.

---

## 18. Empreinte appareil

L’empreinte doit utiliser uniquement des attributs autorisés et proportionnés.

Elle sert à reconnaître des tendances, pas à constituer une identité juridique certaine.

---

## 19. Réseau et IP

Signaux possibles :

- changement brutal de pays ;
- proxy ou infrastructure à risque lorsqu’une source fiable le signale ;
- trop grand nombre de comptes depuis une même origine ;
- géolocalisation impossible ;
- incohérence avec l’historique.

Une adresse IP seule ne suffit jamais à prouver une fraude.

---

## 20. Géolocalisation

La géolocalisation est un signal contextuel. Le module doit gérer imprécision, VPN, roaming, réseaux mobiles, frontières et absence d’autorisation de localisation.

---

## 21. Impossible travel

Une alerte peut être produite lorsque deux événements géographiquement éloignés sont incompatibles avec le temps écoulé.

L’alerte doit tenir compte des erreurs de localisation et ne doit pas entraîner automatiquement une suspension définitive.

---

## 22. Bénéficiaire à risque

Facteurs : bénéficiaire nouveau, bénéficiaire partagé par de nombreux comptes suspects, historique de litiges, activité anormale, réseau de comptes liés ou signal partenaire.

---

## 23. Risque commerçant

Indicateurs :

- hausse soudaine de volume ;
- taux de remboursement anormal ;
- taux de litige élevé ;
- tickets incohérents avec le secteur ;
- activité hors zone ;
- transactions circulaires ;
- usage de terminaux non autorisés ;
- fractionnement ;
- volumes incompatibles avec le KYB.

---

## 24. Risque agent

Indicateurs :

- dépôts/retraits croisés ;
- écarts de caisse ;
- activité hors horaires ;
- transactions répétitives ;
- contournement de plafonds ;
- utilisation de comptes liés ;
- changement fréquent de terminal ;
- hausse anormale de commissions ;
- plaintes récurrentes.

---

## 25. Risque carte

Signaux : nouveau marchand, pays inhabituel, e-commerce soudain, séries de petits tests, retraits inhabituels, tentative après plusieurs refus, appareil compromis, carte virtuelle jetable mal utilisée ou donnée réseau partenaire.

---

## 26. Risque Mobile Money

Le module peut intégrer : statut partenaire, numéro récemment modifié si l’information est légalement disponible, vélocité de cash-in/cash-out, bénéficiaires multiples, erreurs répétées, reversements et incohérences de nom.

---

## 27. Risque Open Banking

Signaux : nouvelle banque connectée, reconnexion inhabituelle, consentement récent, nouveau bénéficiaire, paiement initié juste après une prise de contrôle présumée ou multiples échecs de SCA.

---

## 28. Risque TPE

Indicateurs : terminal déplacé, terminal modifié, version applicative obsolète, activité impossible, volume soudain, marchand incohérent ou clé/certificat invalide.

---

## 29. Risque compte compromis

Combinaison possible :

```text
nouvel appareil
+ changement de mot de passe récent
+ bénéficiaire nouveau
+ montant inhabituel
+ localisation anormale
= risque élevé de prise de contrôle
```

Le moteur doit pouvoir imposer une authentification renforcée ou une revue avant mouvement de fonds.

---

## 30. Step-up authentication

Le moteur peut demander une étape supplémentaire : OTP, biométrie locale, confirmation dans l’application, réauthentification, validation d’un appareil connu ou mécanisme partenaire.

Le mécanisme choisi dépend du canal et ne doit jamais être simulé côté serveur sans preuve réelle.

---

## 31. Blocage temporaire

Un blocage temporaire comporte : objet bloqué, motif, date de début, date d’expiration, source, règle, possibilité de revue et conditions de levée.

---

## 32. Suspension de compte

La suspension complète est réservée aux cas prévus par politique et doit éviter de bloquer inutilement les voies de recours, d’identification ou d’assistance autorisées.

---

## 33. Mode fail-safe

Pour chaque type d’action, la politique définit le comportement si le moteur de risque est indisponible :

```text
ALLOW_WITH_LIMIT
REQUIRE_STEP_UP
QUEUE_FOR_REVIEW
BLOCK
USE_CACHED_POLICY
```

Aucune stratégie universelle `ALLOW_ALL` ne doit exister pour les opérations critiques.

---

## 34. Latence

Les décisions synchrones destinées aux paiements doivent respecter un budget de latence strict.

Les traitements lourds, graphes relationnels, enrichissements externes et analyses historiques doivent être découplés lorsque possible.

---

## 35. Architecture temps réel

Flux recommandé :

```text
Événement produit
→ normalisation
→ enrichissement local
→ règles rapides
→ score/modèle éventuel
→ décision
→ réponse au produit
→ journalisation
→ enrichissements asynchrones
→ case management si nécessaire
```

---

## 36. Traitements différés

Les analyses différées servent notamment à :

- détecter des réseaux de comptes ;
- recalculer des profils ;
- repérer des fraudes lentes ;
- analyser des tendances ;
- produire des alertes rétroactives ;
- réentraîner ou recalibrer des modèles lorsque cela est gouverné.

---

## 37. Graphes relationnels

Le système peut établir des relations entre comptes, appareils, bénéficiaires, marchands, agents, téléphones et moyens de paiement.

Ces relations doivent avoir une source, un niveau de confiance et une durée de conservation définie.

---

## 38. Watchlists

Les listes internes ou partenaires peuvent contenir comptes, appareils, bénéficiaires ou entités signalées.

Chaque entrée doit préciser : source, motif, portée, date d’effet, expiration, niveau de confiance et autorisation d’usage.

---

## 39. Listes réglementaires

Les contrôles réglementaires de sanctions/PEP ne doivent pas être improvisés dans le moteur fraude. Ils doivent provenir d’un module conformité ou d’un prestataire approprié, avec résultats transmis comme signaux structurés.

---

## 40. Case management

Une alerte importante peut créer un `FraudCase` contenant :

- priorité ;
- catégorie ;
- utilisateur/organisation ;
- transactions liées ;
- signaux ;
- chronologie ;
- pièces ;
- analyste assigné ;
- actions ;
- décision ;
- motif de clôture.

---

## 41. Statuts d’un dossier

```text
OPEN
TRIAGED
INVESTIGATING
WAITING_INFORMATION
ESCALATED
ACTIONED
CLOSED_CONFIRMED_FRAUD
CLOSED_FALSE_POSITIVE
CLOSED_INCONCLUSIVE
```

---

## 42. Priorités

```text
P4_LOW
P3_MEDIUM
P2_HIGH
P1_CRITICAL
```

Les SLA de traitement doivent être configurables par catégorie et pays.

---

## 43. Assignation

Le moteur peut assigner automatiquement selon compétence, langue, pays, charge, type de fraude et niveau d’accès.

---

## 44. Double contrôle

Les actions sensibles comme déblocage d’un compte critique, suppression d’une watchlist ou override d’un blocage important peuvent nécessiter une seconde approbation.

---

## 45. Override humain

Un analyste autorisé peut remplacer une décision lorsque la politique le permet.

L’override doit contenir auteur, justification, durée, décision originale, nouvelle décision et validation éventuelle.

---

## 46. Faux positifs

Tout dossier clôturé comme faux positif doit être exploitable pour améliorer règles et modèles, sans affaiblir automatiquement les contrôles.

---

## 47. Fraude confirmée

Une fraude confirmée doit alimenter un signal durable approprié, les métriques de perte, la recherche de comptes liés et les procédures de récupération ou de déclaration applicables.

---

## 48. Modèles ML

Les modèles de machine learning sont optionnels. Le système doit fonctionner avec des règles déterministes avant leur introduction.

Tout modèle déployé possède :

- identifiant ;
- version ;
- données d’entraînement documentées ;
- période ;
- métriques ;
- seuils ;
- propriétaire ;
- date d’approbation ;
- environnement ;
- stratégie de rollback.

---

## 49. Gouvernance ML

Avant déploiement : validation technique, performance hors échantillon, analyse de biais pertinente, tests de dérive, explicabilité suffisante et procédure d’arrêt.

---

## 50. Drift

Surveiller : dérive des entrées, dérive des scores, baisse du taux de détection, hausse des faux positifs et changements de comportement par segment.

---

## 51. Shadow mode

Une nouvelle règle ou un nouveau modèle peut fonctionner en `SHADOW` sans influencer la décision finale, afin de mesurer son impact.

---

## 52. A/B contrôlé

Un test de stratégie de risque n’est permis que si la sécurité, la conformité et les seuils de perte acceptables sont préservés. Les opérations dangereuses ne doivent jamais être utilisées comme expérimentation non contrôlée.

---

## 53. Données personnelles

Le module doit respecter minimisation, finalité, contrôle d’accès, chiffrement, conservation limitée et droit applicable.

Les analystes ne voient que les données nécessaires à leur rôle.

---

## 54. Données sensibles

Les documents KYC, PAN complets, secrets, biométries brutes, mots de passe et jetons d’authentification ne doivent jamais être copiés inutilement dans les événements de fraude.

---

## 55. Conservation

Les durées de conservation sont configurables par catégorie de donnée, pays et obligation légale. Les événements d’audit requis peuvent avoir une politique distincte des données analytiques.

---

## 56. RBAC

Rôles possibles :

- Fraud Analyst ;
- Senior Fraud Analyst ;
- Risk Manager ;
- Compliance Restricted ;
- Support Restricted ;
- Auditor Read Only ;
- Rule Administrator ;
- Model Administrator ;
- Super Admin sous contrôle renforcé.

---

## 57. Séparation des pouvoirs

Une même personne ne doit pas pouvoir créer, approuver et publier seule une règle critique lorsque la politique impose une séparation des rôles.

---

## 58. Administration

Le portail doit permettre : règles, versions, seuils, listes, segments, décisions, SLA, files de revue, feature flags, stratégies de repli, modèles, dashboards et audits.

---

## 59. API synchrones

```text
POST /risk/assessments
GET /risk/assessments/:id
POST /risk/assessments/:id/review
POST /risk/decisions/:id/override
GET /risk/profiles/:subjectId
```

Les API doivent être authentifiées, autorisées, idempotentes lorsque nécessaire et corrélées aux transactions sources.

---

## 60. API administration

```text
POST /risk/rules
POST /risk/rules/:id/versions
POST /risk/rules/:id/simulate
POST /risk/rules/:id/approve
POST /risk/rules/:id/activate
POST /risk/rules/:id/pause
GET /risk/cases
GET /risk/cases/:id
PATCH /risk/cases/:id
POST /risk/watchlists
```

---

## 61. Événements

Exemples :

```text
risk.assessment.completed
risk.decision.blocked
risk.step_up.required
risk.case.created
risk.case.escalated
risk.case.closed
risk.rule.activated
risk.rule.paused
risk.override.created
risk.model.drift_detected
```

---

## 62. Webhooks externes

Les données de fraude reçues de partenaires doivent être authentifiées, signées lorsque possible, dédupliquées et associées à une source de confiance.

---

## 63. Idempotence

Une même requête d’évaluation rejouée avec la même clé et le même contexte ne doit pas provoquer des actions contradictoires ou créer plusieurs dossiers identiques.

---

## 64. Corrélation

Toutes les décisions doivent être liées aux identifiants de session, utilisateur, transaction, appareil, règle et dossier lorsqu’ils existent.

---

## 65. Audit

Audit obligatoire pour :

- création/modification de règle ;
- activation/pause ;
- changement de seuil ;
- ajout/retrait de watchlist ;
- consultation sensible ;
- assignation dossier ;
- décision analyste ;
- override ;
- suspension/déblocage ;
- déploiement de modèle.

---

## 66. Observabilité

Métriques :

- évaluations par seconde ;
- latence p50/p95/p99 ;
- taux ALLOW/BLOCK/REVIEW ;
- taux de step-up ;
- dossiers ouverts ;
- backlog par priorité ;
- faux positifs ;
- fraude confirmée ;
- pertes évitées estimées ;
- pertes réalisées ;
- disponibilité moteur ;
- erreurs d’enrichissement ;
- dérive modèle.

---

## 67. Alertes opérationnelles

Alerter sur : hausse brutale des blocages, chute du trafic évalué, indisponibilité du moteur, saturation de file, latence excessive, partenaire de données indisponible, règle générant un volume anormal ou dérive de modèle.

---

## 68. Reporting

Rapports par pays, produit, canal, segment, type de fraude, règle, partenaire, commerçant, agent, montant et période.

Les rapports doivent distinguer suspicion, fraude confirmée, faux positif et perte financière réellement comptabilisée.

---

## 69. Jini

Jini peut expliquer à un utilisateur qu’une opération nécessite une vérification supplémentaire dans un langage non accusatoire, mais ne doit jamais révéler les règles de détection internes ni permettre de contourner les contrôles.

Jini ne lève jamais seul un blocage fraude critique.

---

## 70. Support

Le support standard doit voir un motif simplifié et les actions autorisées, sans accès aux règles sensibles ni aux détails permettant de contourner le système.

---

## 71. Notifications utilisateur

Les messages doivent être adaptés au risque :

- « Vérification supplémentaire requise » ;
- « Opération en cours de vérification » ;
- « Opération refusée » ;
- « Activité inhabituelle détectée ».

Ne jamais afficher le score interne, la règle exacte ou des informations sensibles de détection.

---

## 72. Tests fonctionnels

Tester au minimum :

- règle simple ;
- plusieurs règles contradictoires ;
- vélocité ;
- nouvel appareil ;
- step-up ;
- blocage ;
- revue humaine ;
- override ;
- faux positif ;
- watchlist ;
- expiration d’un blocage ;
- versionnement ;
- simulation ;
- shadow mode.

---

## 73. Tests de sécurité

Tester : RBAC, élévation de privilèges, modification non autorisée de règle, fuite de données, injection dans DSL de règles, replay, webhook falsifié, accès inter-tenant et audit incomplet.

---

## 74. Tests de concurrence

Deux évaluations simultanées sur le même compte doivent mettre à jour correctement les compteurs de vélocité sans perdre d’événements.

---

## 75. Tests de résilience

Tester : Redis/cache indisponible, base lente, bus d’événements en retard, service d’enrichissement externe indisponible, modèle non disponible, timeout et reprise après panne.

---

## 76. Performance

Les chemins synchrones doivent éviter les appels externes non bornés. Les données essentielles de vélocité doivent être accessibles avec une latence compatible avec les paiements.

---

## 77. Multi-tenant

Aucun tenant ne peut consulter les dossiers, règles privées, profils ou données de risque d’un autre tenant, sauf mécanisme explicitement prévu pour l’administration centrale Mansa et audité.

---

## 78. Multi-pays

Les seuils, obligations, catégories de fraude, sources de données, niveaux d’action et durées de conservation peuvent varier par pays.

Le moteur doit charger une configuration explicite, jamais déduire silencieusement une règle réglementaire.

---

## 79. Environnements

`DEMO`, `RECETTE` et `PRODUCTION` sont séparés. Les watchlists et modèles de production ne doivent pas être copiés vers des environnements de test sans procédure de pseudonymisation et autorisation.

---

## 80. Feature flags

Une nouvelle capacité de risque peut être activée progressivement par pays, produit, segment ou partenaire.

Un kill switch permet de désactiver rapidement une règle ou intégration défaillante.

---

## 81. Règles métier essentielles

1. Toute opération critique est évaluée selon une politique explicite.
2. Toute décision conserve ses facteurs et versions.
3. Les règles sont versionnées et auditées.
4. Les compteurs de vélocité sont atomiques ou équivalents.
5. Un timeout d’évaluation n’est jamais interprété implicitement comme `ALLOW`.
6. Les scores internes ne sont pas exposés aux utilisateurs.
7. Les données sensibles sont minimisées.
8. Les overrides sont justifiés et auditables.
9. Les modèles ML sont optionnels et gouvernés.
10. Toute action automatique critique peut être reliée à une politique et une preuve d’exécution.

---

## 82. Critères d’acceptation finaux

Le module est validé lorsque :

- les événements de risque sont normalisés ;
- les règles sont configurables, versionnées et simulables ;
- les décisions temps réel sont explicables ;
- les compteurs de vélocité sont fiables sous concurrence ;
- le step-up fonctionne ;
- les blocages temporaires et suspensions sont traçables ;
- le mode fail-safe est défini par produit ;
- les dossiers fraude peuvent être créés, assignés, investigués et clôturés ;
- les overrides sont contrôlés ;
- les faux positifs et fraudes confirmées alimentent les métriques ;
- les modèles éventuels sont versionnés et monitorés ;
- le RBAC et la séparation des pouvoirs sont respectés ;
- les données sont isolées par tenant ;
- les dashboards et alertes opérationnelles sont disponibles ;
- aucun secret n’est présent dans le dépôt ;
- les tests fonctionnels, sécurité, concurrence, performance et résilience réussissent.
