# 103 — Réseau d’agents, commissions et opérations cash Mansa

## 1. Objet du document

Ce document définit le cahier des charges du module **Réseau d’agents, commissions et opérations cash Mansa**.

Le module organise l’onboarding des agents, leurs points de service, la gestion de liquidité, les dépôts et retraits, les commissions, les limites, la supervision, la fraude, la réconciliation et le reporting.

Mansa doit rester configurable par pays, partenaire, réseau, catégorie d’agent et type d’opération. Aucune règle tarifaire ou de rémunération ne doit être codée en dur.

---

## 2. Objectifs

- permettre à un réseau d’agents autorisés de réaliser des opérations de dépôt et retrait ;
- rémunérer les agents de manière transparente et configurable ;
- maîtriser le risque de liquidité et de fraude ;
- fournir une traçabilité complète de chaque opération ;
- permettre un pilotage central du réseau ;
- supporter plusieurs partenaires bancaires ou Mobile Money ;
- fonctionner en mode connecté et avec des mécanismes dégradés strictement contrôlés lorsque cela est autorisé.

---

## 3. Acteurs

- agent individuel ;
- propriétaire de point de service ;
- employé d’un point de service ;
- superviseur régional ;
- opérateur réseau ;
- équipe finance ;
- équipe conformité ;
- équipe risque/fraude ;
- support ;
- administrateur Mansa ;
- partenaire bancaire ou Mobile Money.

---

## 4. Entité Agent

Champs minimum :

- identifiant Mansa ;
- type d’agent ;
- organisation ou propriétaire ;
- statut ;
- niveau KYC/KYB ;
- pays et zone ;
- points de service associés ;
- comptes de règlement ;
- limites ;
- profil de commission ;
- indicateurs de risque ;
- dates de création, validation, suspension et fermeture.

---

## 5. Types d’agents

```text
INDIVIDUAL
MERCHANT
DISTRIBUTOR
SUPER_AGENT
PUBLIC_SERVICE
PARTNER_BRANCH
MOBILE_AGENT
OTHER
```

Chaque type possède ses propres exigences d’éligibilité, limites, commissions et autorisations.

---

## 6. Statuts

```text
DRAFT
PENDING_REVIEW
ACTIVE
LIMITED
SUSPENDED
BLOCKED
CLOSED
REJECTED
```

Toute transition sensible est auditée avec motif, auteur et horodatage.

---

## 7. Onboarding agent

Le parcours doit couvrir :

1. création de la candidature ;
2. identité et coordonnées ;
3. documents KYC/KYB ;
4. adresse et géolocalisation du point ;
5. vérification des moyens de règlement ;
6. contrôle conformité ;
7. affectation d’un profil de risque ;
8. validation ;
9. activation des opérations autorisées.

L’activation ne doit jamais être implicite après simple inscription.

---

## 8. Point de service

Un agent peut posséder plusieurs points de service. Chaque point contient : adresse, coordonnées GPS, horaires, employés, terminal(s), capacités cash, plafonds, devise(s), statut et zone de supervision.

---

## 9. Employés d’agent

Les employés utilisent des comptes nominatifs avec RBAC. Le partage d’identifiants est interdit.

Permissions typiques :

- initier dépôt ;
- initier retrait ;
- consulter caisse ;
- imprimer reçu ;
- annuler une opération avant validation finale ;
- clôturer caisse ;
- consulter commissions.

---

## 10. Wallet agent

Le système distingue au minimum :

- solde électronique disponible ;
- solde réservé ;
- cash déclaré ;
- commissions acquises ;
- commissions en attente ;
- ajustements ;
- compte de règlement partenaire.

Aucune confusion ne doit être possible entre argent du client, fonds de l’agent et revenus de commission.

---

## 11. Cash-in

Flux de référence :

```text
Identification client
→ Saisie du montant
→ Vérification limites et risque
→ Réception du cash par l’agent
→ Création transaction idempotente
→ Crédit du wallet client
→ Débit du float agent
→ Calcul commission
→ Reçu
→ Audit et réconciliation
```

Le crédit client ne doit intervenir qu’après validation transactionnelle cohérente.

---

## 12. Cash-out

Flux de référence :

```text
Identification client
→ Demande de retrait
→ Vérification solde et limites
→ Authentification/autorisation requise
→ Réservation des fonds
→ Validation agent
→ Débit wallet client
→ Crédit float agent
→ Remise du cash
→ Calcul commission
→ Reçu
→ Audit et réconciliation
```

La remise de cash doit être corrélée à une transaction unique et traçable.

---

## 13. Confirmation client

Les mécanismes de confirmation peuvent dépendre du canal et du niveau de risque : PIN, biométrie locale, OTP, validation dans l’application, USSD ou mécanisme partenaire.

Le module doit rester utilisable dans les zones à faible connectivité sans diminuer les contrôles de sécurité obligatoires.

---

## 14. Mode faible connectivité

Le mode dégradé ne doit jamais autoriser une création libre de monnaie électronique.

Il peut permettre :

- préparation locale d’une opération ;
- file d’attente chiffrée ;
- consultation d’un état local marqué comme potentiellement obsolète ;
- reprise contrôlée après reconnexion.

Toute opération financière finale exige les garanties d’autorisation prévues par le rail utilisé.

---

## 15. Idempotence

Chaque dépôt/retrait possède une clé idempotente stable. Une répétition réseau ou un double clic ne doit jamais créer deux opérations financières.

---

## 16. États transactionnels

```text
CREATED
PENDING_AUTHORIZATION
AUTHORIZED
PROCESSING
COMPLETED
FAILED
REVERSED
CANCELLED
UNKNOWN
```

`UNKNOWN` impose une vérification partenaire avant toute nouvelle tentative.

---

## 17. Limites

Les limites sont configurables par :

- pays ;
- type d’agent ;
- agent ;
- point de service ;
- client ;
- niveau KYC ;
- type d’opération ;
- montant unitaire ;
- cumul journalier, hebdomadaire et mensuel ;
- devise ;
- partenaire.

---

## 18. Moteur de commissions

Aucune commission n’est codée en dur.

Le moteur doit accepter :

- pourcentage ;
- montant fixe ;
- tranches ;
- minimum ;
- maximum ;
- formule mixte ;
- bonus volume ;
- bonus zone ;
- campagne temporaire ;
- partage multi-acteurs.

---

## 19. Exemple de règle

```text
Frais client = 1 % du montant
Part agent = configurable
Part Mansa = configurable
Part partenaire = configurable
Taxes = configurable
```

Cet exemple n’est pas une valeur contractuelle et doit être administrable sans déploiement logiciel.

---

## 20. Commission agent

La commission doit comporter : règle appliquée, base de calcul, montant brut, taxes éventuelles, montant net, bénéficiaire, transaction source et statut.

---

## 21. Statuts de commission

```text
PENDING
ACCRUED
PAYABLE
PAID
REVERSED
DISPUTED
```

Une transaction annulée ou reversée peut entraîner la reprise de la commission selon la politique applicable.

---

## 22. Partage de commission

Le moteur supporte plusieurs bénéficiaires : agent, super-agent, distributeur, Mansa, banque, opérateur, apporteur ou autre partenaire.

La somme des parts doit être validée avant activation de la règle.

---

## 23. Versionnement tarifaire

Chaque grille de frais et commissions est versionnée avec date d’effet. Une transaction conserve toujours la version utilisée au moment de son exécution.

---

## 24. Simulation tarifaire

Avant activation, l’administrateur peut simuler une règle sur plusieurs montants et profils afin de vérifier frais client, rémunération agent et marge Mansa.

---

## 25. Float électronique

Chaque agent possède un seuil minimum, un seuil cible et un plafond. Les opérations doivent être refusées proprement lorsque le float est insuffisant.

---

## 26. Gestion du cash physique

Le système peut enregistrer les déclarations de caisse, sans considérer cette déclaration comme une preuve comptable absolue.

Les écarts entre cash déclaré, transactions et contrôles terrain sont signalés.

---

## 27. Rééquilibrage

Un agent peut demander un rééquilibrage de float via :

- super-agent ;
- banque partenaire ;
- transfert bancaire ;
- Mobile Money partenaire ;
- dépôt central ;
- mécanisme approuvé localement.

Chaque méthode utilise un adaptateur et une réconciliation propres.

---

## 28. Super-agent

Le super-agent peut approvisionner des agents sous réserve de limites et d’autorisations. Les flux doivent être enregistrés comme transferts distincts, jamais comme ajustements manuels invisibles.

---

## 29. Clôture de caisse

Une clôture produit : solde initial, cash-in, cash-out, rééquilibrages, commissions, ajustements, solde théorique, solde déclaré et écarts.

---

## 30. Ajustements

Tout ajustement financier manuel exige :

- autorisation renforcée ;
- motif ;
- pièce justificative éventuelle ;
- double validation au-dessus d’un seuil ;
- écriture d’audit immuable.

---

## 31. Fraude et risque

Signaux à surveiller :

- fractionnement de transactions ;
- retraits répétés ;
- volume soudainement anormal ;
- opérations croisées entre agents ;
- activité hors horaires ;
- géolocalisation incohérente ;
- terminal inhabituel ;
- écarts de caisse répétés ;
- nombreux échecs d’authentification ;
- comptes clients liés ;
- contournement de plafonds.

---

## 32. Mesures de risque

Le moteur peut : demander une vérification supplémentaire, réduire temporairement les limites, bloquer une opération, placer en revue ou suspendre un agent.

Les décisions automatisées sensibles doivent être explicables et révisables selon la politique de conformité.

---

## 33. Géolocalisation

La géolocalisation peut contribuer au contrôle du point de service mais ne constitue jamais seule une preuve d’identité ou de transaction.

---

## 34. TPE et terminaux

Chaque terminal est associé à un point de service et possède identifiant, statut, clés/certificats gérés hors code, version applicative, dernière connexion et capacités.

---

## 35. Reçus

Chaque opération terminée génère un reçu contenant référence, type, montant, frais, date, point de service et statut. Les informations sensibles sont masquées.

---

## 36. Notifications

Notifications possibles : transaction réussie, échec, reversement, float faible, limite atteinte, commission acquise, anomalie, suspension, demande de rééquilibrage et clôture.

---

## 37. Réconciliation

Comparer au minimum :

- ledger Mansa ;
- transactions agent ;
- wallet client ;
- wallet agent ;
- commissions ;
- fichiers/événements partenaires ;
- règlements bancaires ou Mobile Money.

Tout écart devient un dossier de réconciliation traçable.

---

## 38. API principales

```text
POST /agents
GET /agents/:id
PATCH /agents/:id/status
POST /agents/:id/service-points
GET /agents/:id/liquidity
POST /agent-transactions/cash-in
POST /agent-transactions/cash-out
GET /agent-transactions/:id
GET /agents/:id/commissions
POST /agents/:id/rebalancing-requests
POST /agents/:id/cash-closures
```

---

## 39. Webhooks

```text
agent.activated
agent.suspended
agent.float.low
cash_in.completed
cash_out.completed
transaction.reversed
commission.accrued
commission.reversed
rebalancing.updated
cash_closure.discrepancy
```

Les webhooks sont signés, idempotents et rejouables de manière contrôlée.

---

## 40. Administration

Le portail Admin doit permettre de gérer : profils agents, zones, points de service, plafonds, règles de commission, campagnes, super-agents, partenaires, alertes, suspensions, ajustements et réconciliation.

---

## 41. RBAC

Rôles suggérés :

```text
AGENT_OWNER
AGENT_CASHIER
AGENT_MANAGER
SUPER_AGENT
NETWORK_OPERATIONS
FINANCE
COMPLIANCE
RISK
SUPPORT_RESTRICTED
AUDITOR
SUPER_ADMIN
```

---

## 42. Audit

Doivent être audités : création agent, validation KYC/KYB, changement de statut, changement de limite, changement tarifaire, opération cash, reversement, ajustement, suspension, rééquilibrage et clôture.

---

## 43. Confidentialité

Les données agents et clients sont minimisées, chiffrées, segmentées par rôle et conservées selon les obligations locales et la politique Mansa.

---

## 44. Multi-pays

Le module est paramétrable par pays pour devise, KYC/KYB, limites, frais, taxes, obligations de reçu, partenaires, horaires et exigences réglementaires.

---

## 45. Feature flags

Fonctions activables séparément : cash-in, cash-out, super-agent, rééquilibrage bancaire, rééquilibrage Mobile Money, bonus commissions, mode faible connectivité et géolocalisation renforcée.

---

## 46. Observabilité

Métriques : volume, valeur, taux d’échec, latence, float moyen, ruptures de liquidité, commissions, marge, reversements, écarts de caisse, alertes fraude et disponibilité par zone.

---

## 47. Tests

Tester :

- onboarding et suspension ;
- cash-in/cash-out ;
- idempotence ;
- insuffisance de float ;
- limites ;
- calcul par tranches ;
- versionnement tarifaire ;
- partage de commission ;
- reversement ;
- clôture de caisse ;
- rééquilibrage ;
- double validation ;
- panne partenaire ;
- reprise réseau ;
- webhook dupliqué ;
- isolation RBAC ;
- charge et concurrence.

---

## 48. Règles métier non négociables

1. Aucun montant monétaire en flottant.
2. Toute opération financière est idempotente.
3. Aucun agent non actif ne peut exécuter une opération.
4. Les limites sont vérifiées avant engagement financier.
5. Un retrait ne doit jamais produire un double débit.
6. Un timeout partenaire n’est pas automatiquement un échec final.
7. Les commissions sont calculées à partir d’une règle versionnée.
8. Une commission peut être reversée si la transaction source l’est.
9. Les fonds client, agent et revenus sont séparés comptablement.
10. Les ajustements manuels sont audités et fortement autorisés.
11. Les secrets terminaux et partenaires ne sont jamais dans Git.
12. Le mode offline ne crée jamais de valeur non autorisée.
13. Les règles sont configurables par pays et partenaire.
14. Les opérations sensibles sont journalisées de manière immuable.
15. Toute suspension prend effet immédiatement sur les nouveaux flux.

---

## 49. Ordre de développement recommandé

```text
P1-AGT-01 — Modèles Agent et ServicePoint
P1-AGT-02 — Onboarding et statuts
P1-AGT-03 — Wallet/float agent
P1-AGT-04 — Cash-in
P1-AGT-05 — Cash-out
P1-AGT-06 — Moteur de limites
P1-AGT-07 — Moteur de commissions versionné
P1-AGT-08 — Rééquilibrage et super-agent
P1-AGT-09 — Clôture de caisse
P1-AGT-10 — Fraude et supervision
P1-AGT-11 — Réconciliation et reporting
P1-AGT-12 — API, webhooks et tests E2E
```

---

## 50. Critères d’acceptation finaux

Le module est validé lorsque les agents peuvent être onboardés et supervisés, les rôles employés sont isolés, les dépôts et retraits sont idempotents, les limites et la liquidité sont contrôlées, les commissions sont configurables et versionnées, les reversements sont cohérents, les super-agents et rééquilibrages sont traçables, les clôtures détectent les écarts, la fraude produit des alertes exploitables, la réconciliation compare les sources internes et partenaires, les secrets sont absents du dépôt et les tests fonctionnels, sécurité, concurrence et résilience réussissent.
