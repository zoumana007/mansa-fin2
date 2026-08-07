# 93 — Budget intelligent et planification financière Mansa : catégories, enveloppes, prévisions, automatisations, Jini, sécurité, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du module **Budget intelligent et planification financière Mansa**.

Le module doit aider les particuliers, commerçants et entreprises à comprendre, prévoir et piloter leurs finances sans modifier directement les soldes comptables.

Il couvre notamment : budgets, catégories, enveloppes, objectifs, prévisions, dépenses récurrentes, alertes, recommandations Jini, règles automatiques, multi-comptes, multi-devises, reporting et administration.

---

## 2. Principe général

```text
Connexion des sources financières
→ Catégorisation
→ Définition d’un budget
→ Suivi temps réel
→ Prévisions
→ Alertes
→ Ajustements
→ Bilan de période
```

Le Ledger reste la source financière de vérité.

---

## 3. Positionnement dans Mansa

Le module doit s’intégrer avec Identity, KYC/KYB, Wallet, Ledger, Paiements, Cartes, Mobile Money, Épargne, Abonnements, Notifications, Jini, RBAC, Audit, Reporting et Feature Flags.

---

## 4. Utilisateurs cibles

- particuliers ;
- familles ;
- commerçants ;
- indépendants ;
- PME ;
- grandes entreprises ;
- organisations autorisées.

---

## 5. Entité Budget

Un budget doit contenir : propriétaire, périmètre, période, devise de référence, catégories, montants prévus, montants consommés, règles, seuils, statut et historique.

---

## 6. Types de budgets

- mensuel ;
- hebdomadaire ;
- annuel ;
- événement ;
- projet ;
- commerce ;
- département ;
- familial ;
- personnalisé.

---

## 7. Statuts

```text
DRAFT
ACTIVE
PAUSED
CLOSED
ARCHIVED
UNDER_REVIEW
```

---

## 8. Catégories

Les catégories doivent être hiérarchiques, personnalisables et administrables par pays : logement, alimentation, transport, santé, études, loisirs, taxes, salaires, stock, fournisseurs, énergie et autres.

---

## 9. Catégorisation automatique

Le moteur peut utiliser libellé, MCC, commerçant, historique, règles utilisateur et modèles IA. Toute correction utilisateur doit pouvoir améliorer les propositions futures.

---

## 10. Catégorisation manuelle

L’utilisateur doit pouvoir modifier une catégorie, scinder une opération et appliquer une règle aux opérations similaires.

---

## 11. Enveloppes budgétaires

Chaque catégorie peut avoir une enveloppe fixe ou dynamique avec plafond, période, report éventuel et seuil d’alerte.

---

## 12. Reports

Le reliquat peut être : perdu, reporté intégralement, reporté partiellement ou transféré vers un objectif d’épargne selon configuration.

---

## 13. Budgets partagés

Un budget partagé doit gérer propriétaires, contributeurs, lecteurs, approbateurs et auditeurs via RBAC/ABAC.

---

## 14. Sources de données

- Wallet Mansa ;
- comptes partenaires ;
- cartes ;
- Mobile Money ;
- caisse Commerce ;
- virements ;
- factures ;
- imports autorisés.

---

## 15. Solde disponible

Le module ne doit jamais inventer un solde. Il doit distinguer solde Ledger, fonds réservés, engagements futurs et budget restant.

---

## 16. Dépenses récurrentes

Le système doit détecter abonnements, loyers, salaires, factures, remboursements et autres récurrences avec niveau de confiance.

---

## 17. Revenus récurrents

Le système peut détecter salaires, ventes, allocations, paiements clients et autres entrées répétitives.

---

## 18. Prévision de trésorerie personnelle

La projection doit utiliser revenus attendus, dépenses connues, échéances, historique et marges de sécurité.

---

## 19. Prévision Commerce

Elle doit intégrer ventes, fournisseurs, taxes, salaires, loyer, stock, remboursements, saisonnalité et échéances.

---

## 20. Horizon de prévision

- 7 jours ;
- 30 jours ;
- 90 jours ;
- 12 mois ;
- horizon personnalisé selon produit.

---

## 21. Scénarios

L’utilisateur peut simuler scénario prudent, central, optimiste et personnalisé sans générer d’écriture financière.

---

## 22. Dépenses exceptionnelles

Une dépense exceptionnelle peut être intégrée aux prévisions avec date, montant, probabilité et catégorie.

---

## 23. Alertes de dépassement

Des alertes configurables doivent être émises à 50 %, 75 %, 90 %, 100 % ou seuil personnalisé.

---

## 24. Alertes de risque de solde

Le système peut prévenir d’un risque d’insuffisance future sans présenter la prévision comme certaine.

---

## 25. Règles automatiques

Exemple : si une catégorie atteint 90 %, réduire une enveloppe secondaire ou proposer un transfert, sans déplacer d’argent sans confirmation.

---

## 26. Limites automatiques

Les règles ne doivent jamais bloquer un paiement essentiel sans politique explicite et consentement approprié.

---

## 27. Objectifs

Un budget peut être relié à un objectif d’épargne, une facture, un projet ou un plan d’investissement autorisé.

---

## 28. Budgets famille

Le module doit permettre plafonds par membre, catégories privées, dépenses communes et visibilité configurable.

---

## 29. Budgets mineurs

Les comptes de mineurs doivent respecter les règles du représentant légal, les limites locales et la confidentialité appropriée.

---

## 30. Budgets Commerce

Le commerçant peut définir enveloppes stock, taxes, publicité, livraison, salaires, loyer, maintenance et réserve.

---

## 31. Budgets Entreprise

Les entreprises peuvent gérer centres de coût, départements, projets, responsables et circuits d’approbation.

---

## 32. Multi-devises

Les montants sources restent dans leur devise d’origine. La devise de reporting doit utiliser des taux horodatés et explicites.

---

## 33. Conversion indicative

Toute conversion budgétaire non exécutée doit être marquée indicative et distincte d’une opération FX réelle.

---

## 34. Jini

Jini peut expliquer les tendances, proposer des ajustements et simuler des scénarios. Il ne doit jamais déplacer des fonds sans confirmation requise.

---

## 35. Insights intelligents

Exemples : hausse inhabituelle d’une catégorie, abonnement oublié, baisse des ventes, dépense saisonnière, économie potentielle.

---

## 36. Explicabilité

Tout insight doit pouvoir indiquer les données principales ayant conduit à la recommandation.

---

## 37. Confidentialité

Les analyses doivent respecter minimisation, finalité, consentement, durée de conservation et isolement des organisations.

---

## 38. Données sensibles

Aucune donnée de budget ne doit être utilisée pour une décision de crédit ou d’assurance sans base légale, consentement et politique spécifique.

---

## 39. Notifications

Push, SMS, e-mail et in-app selon préférences, urgence, pays et coût du canal.

---

## 40. Résumé périodique

Le système peut produire bilan hebdomadaire, mensuel et annuel avec dépenses, revenus, écarts, objectifs et recommandations.

---

## 41. Exports

Formats possibles : CSV, PDF, XLSX, API et formats comptables autorisés selon profil.

---

## 42. API

```text
POST /budgets
GET /budgets/:id
PATCH /budgets/:id
POST /budgets/:id/categories
POST /budgets/:id/rules
GET /budgets/:id/forecast
GET /budgets/:id/insights
```

---

## 43. Webhooks

Événements : budget.created, budget.threshold_reached, budget.exceeded, forecast.risk_detected, category.updated, insight.created.

---

## 44. Idempotence

Les imports, catégorisations en lot et événements doivent être déduplicables.

---

## 45. Synchronisation

Les calculs doivent tolérer données retardées, événements hors ordre et reconnexions réseau.

---

## 46. Offline

L’application peut afficher le dernier état connu, clairement marqué, sans présenter des données obsolètes comme temps réel.

---

## 47. Administration

L’administration peut gérer catégories globales, règles, seuils par défaut, pays, feature flags et modèles de recommandations.

---

## 48. RBAC

Rôles : Owner, Budget Admin, Contributor, Approver, Auditor, Support Read Only et Super Admin selon contexte.

---

## 49. Audit

Création, modification de règles, changement de seuil, export sensible et action admin doivent être journalisés.

---

## 50. Anti-fraude

Le module doit détecter imports falsifiés, règles abusives, accès inhabituels et manipulations de catégorisation liées à des avantages.

---

## 51. Reporting produit

KPI : adoption, budgets actifs, taux de catégorisation, dépassements, précision prévisions, interaction insights et rétention.

---

## 52. Reporting utilisateur

Le reporting doit distinguer prévu, réel, engagé, disponible, projeté et écart.

---

## 53. Performance

Le moteur doit supporter millions d’opérations, recalcul incrémental et agrégations sans rescanner inutilement tout l’historique.

---

## 54. Observabilité

Métriques : latence de catégorisation, retard d’événements, erreurs, précision des jobs, files d’attente et anomalies.

---

## 55. Résilience

Le système doit reprendre après panne sans double comptage ni perte de règles utilisateur.

---

## 56. Feature Flags

Activation par pays, segment, version d’application, catégorie de client et organisation.

---

## 57. Multi-pays

Catégories, devises, fiscalité, formats et textes légaux doivent être configurables localement.

---

## 58. Accessibilité

Graphiques et indicateurs doivent rester compréhensibles sans couleur seule et supporter lecteurs d’écran.

---

## 59. Sécurité

Chiffrement, contrôle d’accès, rate limiting, protection API, journalisation et gestion des secrets sont obligatoires.

---

## 60. Tests fonctionnels, sécurité, performance et résilience

Tester création, catégories, récurrences, prévisions, multi-devises, budgets partagés, offline, concurrence, permissions, imports massifs et reprise après panne.

---

## 61. Règles métier

1. Le Ledger reste la source de vérité.
2. Un budget ne crée pas de solde parallèle.
3. Les prévisions doivent être identifiées comme estimations.
4. Toute conversion indicative doit être horodatée.
5. Les règles automatiques doivent être désactivables.
6. Aucun mouvement de fonds ne doit être exécuté par Jini sans confirmation requise.
7. Les données privées doivent être isolées.
8. Les imports doivent être déduplicables.
9. Les corrections doivent être auditables.
10. Les budgets partagés appliquent RBAC/ABAC.
11. Les mineurs bénéficient de protections spécifiques.
12. Les seuils sont configurables.
13. Les notifications respectent les préférences.
14. Les modèles doivent être monitorés.
15. Les données retardées doivent être signalées.
16. Les exports sensibles sont contrôlés.
17. Les recommandations doivent être explicables.
18. Les feature flags sont obligatoires.
19. Les audits critiques sont immuables.
20. Le module doit être désactivable par pays.

---

## 62. Ordre de développement recommandé

```text
P1-BUD-01 — Modèles Budget, Catégorie et Enveloppe
P1-BUD-02 — Agrégation Ledger et catégorisation
P1-BUD-03 — Suivi et seuils
P1-BUD-04 — Détection des récurrences
P1-BUD-05 — Prévisions et scénarios
P1-BUD-06 — Budgets partagés
P1-BUD-07 — Commerce et Entreprise
P1-BUD-08 — Multi-devises
P1-BUD-09 — Jini et insights
P1-BUD-10 — API, Webhooks et notifications
P1-BUD-11 — Administration, sécurité et reporting
P1-BUD-12 — Tests de bout en bout
```

---

## 63. Critères d’acceptation finaux

Le module est validé lorsque : un budget peut être créé ; les opérations sont catégorisées ; les catégories sont corrigibles ; les enveloppes fonctionnent ; les seuils déclenchent des alertes ; les récurrences sont détectées ; les prévisions sont calculées ; les scénarios sont simulables ; les budgets partagés respectent les permissions ; Commerce et Entreprise sont supportés ; le multi-devises est explicite ; Jini conseille sans exécuter seul ; les exports fonctionnent ; API et Webhooks sont définis ; l’offline signale l’obsolescence ; les audits sont présents ; les tests fonctionnels, sécurité, performance et résilience réussissent ; le Ledger reste la source financière de vérité.