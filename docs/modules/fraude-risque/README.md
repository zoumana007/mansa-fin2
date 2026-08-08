# Mansa — Cahier des charges du module Fraude & Risk Engine

## 1. Finalité

Le module Fraude & Risk Engine centralise l’évaluation du risque pour les paiements, transferts, cartes, TPE, QR/NFC, Mobile Money, remboursements, comptes marchands et services publics de Mansa. Il doit prendre des décisions rapides, explicables, auditables et configurables sans modifier le code métier.

## 2. Objectifs

- évaluer chaque opération sensible en temps réel ;
- détecter les comportements anormaux ;
- limiter les pertes sans dégrader inutilement l’expérience utilisateur ;
- appliquer une décision cohérente selon le contexte, le pays, le produit et le canal ;
- fournir une console de revue manuelle ;
- conserver l’historique complet des règles, décisions et actions ;
- rester indépendant d’un fournisseur externe unique.

## 3. Périmètre

Le moteur s’applique au minimum à :

- connexion et récupération de compte ;
- ajout ou modification de bénéficiaire ;
- transferts P2P ;
- paiements marchands ;
- QR/NFC ;
- cartes physiques et virtuelles ;
- TPE ;
- cash-in/cash-out ;
- Mobile Money ;
- remboursements ;
- changement de téléphone, e-mail, PIN ou données KYC ;
- opérations administratives sensibles ;
- paiements de taxes, amendes, frais scolaires et autres services publics ;
- API partenaires.

## 4. Résultat d’une évaluation

Chaque évaluation retourne :

- `risk_score` ;
- `risk_level` : LOW, MEDIUM, HIGH ou CRITICAL ;
- `decision` : ALLOW, CHALLENGE, REVIEW, HOLD, DECLINE ou BLOCK ;
- `reason_codes` ;
- `rules_triggered` ;
- `policy_version` ;
- `model_version` si un modèle est utilisé ;
- `correlation_id` ;
- `evaluated_at`.

Toute décision doit être explicable. Aucun refus critique ne doit reposer uniquement sur une sortie opaque.

## 5. Signaux analysés

### Compte et identité

- ancienneté du compte ;
- niveau KYC/KYB ;
- historique d’incidents ;
- changements récents de profil ;
- récupération récente de compte ;
- bénéficiaire nouvellement créé ;
- tentatives de connexion échouées.

### Appareil et réseau

- nouvel appareil ;
- appareil partagé par plusieurs comptes ;
- intégrité de l’appareil lorsque disponible ;
- adresse IP et pays estimé ;
- changement géographique inhabituel ;
- vélocité des connexions ;
- signaux techniques anormaux.

### Transaction

- montant et devise ;
- fréquence ;
- heure ;
- canal ;
- bénéficiaire ;
- marchand ;
- écart avec l’historique du client ;
- répétition d’échecs ;
- fractionnement de montants ;
- rapprochement des montants avec les plafonds.

### Marchand et TPE

- ancienneté du marchand ;
- secteur d’activité ;
- volume habituel ;
- taux de remboursement ;
- litiges ;
- localisation habituelle du terminal ;
- changement de comportement d’un employé ou d’un point de vente.

## 6. Moteur de règles

Les règles doivent être :

- versionnées ;
- activables ou désactivables immédiatement ;
- configurables par pays, produit, canal et segment ;
- assorties de seuils ;
- combinables avec AND/OR ;
- prioritaires ;
- testables en simulation avant activation ;
- réversibles via rollback.

Exemples :

- nouvel appareil + nouveau bénéficiaire + montant très supérieur à l’habitude => CHALLENGE ;
- plusieurs tentatives refusées sur une courte période => HOLD ;
- activité incohérente avec l’emplacement habituel => REVIEW ;
- comportement critique confirmé par plusieurs signaux => DECLINE ou BLOCK selon la politique active.

## 7. Vélocité

Le moteur doit suivre des fenêtres configurables par minute, heure et jour pour :

- nombre de transactions ;
- montant cumulé ;
- nombre de bénéficiaires ;
- nombre d’appareils ;
- nombre d’IP ;
- remboursements ;
- échecs d’authentification ;
- nombre de moyens de paiement utilisés.

## 8. Décisions

### ALLOW
Autorisation normale.

### CHALLENGE
Authentification ou confirmation renforcée.

### REVIEW
Envoi vers une file de revue manuelle.

### HOLD
Mise en attente temporaire dans les limites autorisées.

### DECLINE
Refus de l’opération.

### BLOCK
Blocage ciblé du compte, moyen de paiement, terminal, appareil ou autre entité selon les droits applicables.

## 9. Gestion des cas

Chaque cas doit contenir :

- identifiant unique ;
- type ;
- priorité ;
- statut ;
- score ;
- entités liées ;
- analyste assigné ;
- date de création ;
- SLA ;
- preuves ;
- notes ;
- décision finale ;
- montant exposé ;
- perte confirmée ou évitée.

Statuts recommandés : OPEN, TRIAGE, INVESTIGATING, WAITING_CUSTOMER, WAITING_PARTNER, ESCALATED, CONFIRMED_FRAUD, FALSE_POSITIVE, CLOSED.

## 10. Console fraude

La console doit présenter :

- identité du client ou marchand selon habilitation ;
- score et niveau de risque ;
- raisons de la décision ;
- chronologie ;
- transactions liées ;
- appareils ;
- bénéficiaires ;
- moyens de paiement ;
- TPE ;
- liens entre comptes ;
- décisions précédentes ;
- pièces justificatives ;
- historique des actions analystes.

Toute action est auditée.

## 11. Cas spécifiques Mobile Money

Le moteur doit pouvoir repérer :

- changements soudains de volume ;
- cycles inhabituels de cash-in/cash-out ;
- bénéficiaires récemment ajoutés ;
- comptes servant de relais ;
- séquences répétitives agent-client ;
- incohérences entre données Mansa et retour partenaire.

## 12. Cas spécifiques cartes

Prévoir :

- vélocité carte ;
- comportement géographique ;
- changement brutal de panier moyen ;
- utilisation inhabituelle d’une carte virtuelle ;
- répétition d’échecs ;
- remboursements inhabituels ;
- contexte du marchand.

Aucune donnée PCI interdite ne doit être stockée hors du périmètre autorisé.

## 13. Cas spécifiques TPE et marchands

Détecter notamment :

- volumes incohérents avec l’activité ;
- successions inhabituelles d’annulations ou remboursements ;
- utilisation anormale d’un terminal ;
- écarts de localisation ;
- variation brutale de comportement d’un point de vente.

## 14. Services publics

Pour les opérations État :

- vérifier l’identité et les droits de l’agent ;
- vérifier le terminal autorisé ;
- journaliser les annulations et corrections ;
- imposer une double validation pour certaines actions ;
- rapprocher l’opération avec la référence officielle ;
- détecter les abus récurrents ou incohérences opérationnelles.

## 15. Architecture logique

Composants recommandés :

- Risk API ;
- Rule Engine ;
- Velocity Store ;
- Feature Service ;
- Decision Service ;
- Case Management ;
- Watchlist Service ;
- Event Consumer ;
- Audit Service ;
- Risk Admin Console.

Les traitements synchrones critiques doivent rester séparés des analyses lourdes.

## 16. API indicative

- `POST /v1/risk/evaluate`
- `POST /v1/risk/challenges/{id}/complete`
- `GET /v1/risk/cases`
- `GET /v1/risk/cases/{id}`
- `POST /v1/risk/cases/{id}/actions`
- `GET /v1/risk/rules`
- `POST /v1/risk/rules`
- `POST /v1/risk/rules/{id}/simulate`
- `GET /v1/risk/entities/{id}/signals`

Les écritures sensibles doivent être idempotentes et auditées.

## 17. Événements

- `risk.evaluation.requested`
- `risk.evaluation.completed`
- `risk.challenge.required`
- `risk.transaction.held`
- `risk.transaction.declined`
- `risk.entity.blocked`
- `risk.case.created`
- `risk.case.updated`
- `risk.rule.changed`

Chaque événement possède un `event_id`, `correlation_id`, horodatage et version de schéma.

## 18. Modèle de données

Entités principales :

- `RiskEvaluation`
- `RiskDecision`
- `RiskRule`
- `RiskPolicy`
- `RiskSignal`
- `VelocityCounter`
- `RiskCase`
- `CaseEvent`
- `WatchlistEntry`
- `EntityRelationship`
- `RiskOverride`
- `FraudLoss`

## 19. Sécurité et gouvernance

- RBAC/ABAC ;
- MFA pour analystes et administrateurs ;
- journal immuable des changements de règles ;
- maker/checker pour règles critiques ;
- chiffrement en transit et au repos ;
- secrets gérés hors dépôt ;
- contrôle des exports ;
- rétention configurable ;
- historique et rollback des politiques.

## 20. Résilience

- timeouts stricts ;
- circuit breakers ;
- retries bornés ;
- idempotence ;
- files de reprise ;
- stratégie fail-open/fail-closed configurable par type d’opération ;
- mode dégradé documenté.

Une opération à risque critique ne doit jamais passer automatiquement en fail-open sans règle explicite.

## 21. Performance

Objectifs initiaux à valider en charge :

- disponibilité >= 99,95 % ;
- p95 d’une évaluation simple <= 150 ms hors dépendance externe lente ;
- p99 <= 300 ms en conditions nominales ;
- dégradation contrôlée si une source secondaire est indisponible.

## 22. Observabilité

Mesurer au minimum :

- volume d’évaluations ;
- latence ;
- taux ALLOW/CHALLENGE/REVIEW/HOLD/DECLINE/BLOCK ;
- faux positifs ;
- incidents confirmés ;
- pertes évitées et pertes confirmées ;
- règles les plus déclenchées ;
- backlog des cas ;
- SLA des analystes.

## 23. Machine learning

Le ML peut compléter les règles mais n’est pas obligatoire pour le MVP. Tout modèle utilisé doit être versionné, surveillé, réversible et suffisamment explicable. Les variables utilisées doivent respecter les règles de protection des données applicables.

## 24. Tests obligatoires

- tests unitaires du moteur de règles ;
- tests de vélocité ;
- tests d’idempotence ;
- tests de concurrence ;
- tests de latence ;
- tests de panne fournisseur ;
- tests de permissions ;
- tests de charge ;
- tests de non-régression des décisions ;
- tests des scénarios de fraude synthétiques.

## 25. Critères d’acceptation MVP

Le MVP est accepté si :

1. chaque transaction majeure peut être évaluée par une API unique ;
2. les règles sont versionnées et modifiables sans redéploiement ;
3. la vélocité fonctionne au moins par compte, appareil et bénéficiaire ;
4. les six décisions principales sont supportées ;
5. une file de revue manuelle existe ;
6. toutes les décisions et modifications sont auditables ;
7. les appels sont corrélés de bout en bout ;
8. une panne de source secondaire ne fait pas tomber tout le moteur ;
9. la configuration peut varier par pays et produit ;
10. aucun secret n’est stocké dans le dépôt.

## 26. Dépendances

Le module s’intègre avec Authentification, KYC/KYB, Wallets, Transactions, Paiements, Cartes, Mobile Money, TPE, Commerçants, Notifications, Support/Litiges, Audit, Analytics et Services État via API ou événements versionnés, sans accès direct aux bases des autres modules.
