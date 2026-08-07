# 106 — Analytics et reporting Mansa

## 1. Objet

Ce document définit le cahier des charges du module **Analytics et reporting Mansa**. Il centralise les indicateurs opérationnels, financiers, commerciaux et produit nécessaires au pilotage de l’écosystème Mansa.

Le module ne remplace pas les systèmes transactionnels. Il consomme des données publiées par les domaines métier et construit des vues analytiques, rapports, tableaux de bord et exports contrôlés.

## 2. Objectifs

- fournir une vision consolidée de l’activité ;
- mesurer acquisition, activation, engagement, rétention et revenus ;
- suivre les volumes et montants par produit, pays et canal ;
- fournir des indicateurs aux commerçants, agents, partenaires et équipes Mansa ;
- permettre des rapports périodiques ;
- réduire les calculs manuels ;
- garantir la cohérence des définitions de KPI ;
- tracer les versions de métriques ;
- supporter les besoins de reporting réglementaire et partenaire lorsque les données nécessaires sont disponibles.

## 3. Sources de données

Le module peut consommer des événements ou vues issus de :

- comptes utilisateurs ;
- KYC/KYB ;
- wallets ;
- ledger ;
- paiements ;
- transferts ;
- cartes ;
- QR ;
- TPE ;
- Mobile Money ;
- commerçants ;
- agents ;
- épargne ;
- abonnements ;
- facturation ;
- fidélité ;
- litiges ;
- support ;
- modules État ;
- applications web et mobiles.

## 4. Principes

1. Les systèmes métiers restent sources de vérité.
2. Une métrique publiée possède une définition stable et documentée.
3. Toute modification importante de formule crée une nouvelle version.
4. Les agrégations sont reproductibles.
5. Les montants financiers sont calculés avec des types précis adaptés à la devise.
6. Les dimensions de temps utilisent des fuseaux explicites.
7. Les données sont filtrées selon le rôle et l’organisation de l’utilisateur.
8. Les exports sont journalisés.
9. Les données personnelles sont limitées au strict besoin analytique.
10. Les indicateurs doivent signaler leur fraîcheur.

## 5. Concepts principaux

- `AnalyticsEvent` ;
- `MetricDefinition` ;
- `MetricVersion` ;
- `DimensionDefinition` ;
- `FactRecord` ;
- `Dashboard` ;
- `DashboardWidget` ;
- `ReportDefinition` ;
- `ReportRun` ;
- `ExportJob` ;
- `DataFreshnessStatus` ;
- `AnalyticsSegment`.

## 6. Dimensions standard

Les métriques doivent pouvoir être ventilées selon :

- date ;
- heure ;
- pays ;
- région ;
- ville ;
- devise ;
- produit ;
- canal ;
- application ;
- commerçant ;
- catégorie commerçant ;
- agent ;
- partenaire ;
- type de compte ;
- statut KYC ;
- moyen de paiement.

## 7. KPI utilisateurs

Le module doit pouvoir calculer :

- nouveaux inscrits ;
- utilisateurs activés ;
- utilisateurs actifs quotidiens ;
- utilisateurs actifs hebdomadaires ;
- utilisateurs actifs mensuels ;
- taux d’activation ;
- rétention ;
- réactivation ;
- fréquence d’utilisation ;
- nombre moyen de transactions par utilisateur actif.

Les définitions exactes des fenêtres d’activité sont versionnées.

## 8. KPI transactionnels

- nombre de paiements ;
- montant total ;
- panier moyen ;
- taux de réussite ;
- taux d’échec ;
- taux d’annulation ;
- remboursements ;
- transferts ;
- retraits ;
- dépôts ;
- ventilation par canal ;
- ventilation par devise ;
- ventilation par partenaire.

## 9. KPI commerçants

- commerçants actifs ;
- nouveaux commerçants ;
- volume encaissé ;
- nombre de transactions ;
- panier moyen ;
- fréquence de vente ;
- répartition par point de vente ;
- activité TPE ;
- activité QR ;
- remboursements ;
- taux de succès ;
- évolution journalière, hebdomadaire et mensuelle.

## 10. KPI agents

- agents actifs ;
- dépôts et retraits réalisés ;
- volume traité ;
- commissions ;
- activité par zone ;
- fréquence d’opérations ;
- solde opérationnel lorsque ce suivi est disponible ;
- évolution de performance.

## 11. KPI revenus

Le module peut présenter :

- revenus bruts ;
- commissions Mansa ;
- commissions partenaires ;
- revenus par produit ;
- revenus par pays ;
- revenus par canal ;
- coût estimé des partenaires lorsque disponible ;
- marge par flux lorsque les données de coût sont fiables.

Chaque indicateur financier doit préciser la période, la devise et le niveau de consolidation.

## 12. KPI produits

Chaque produit peut exposer des indicateurs spécifiques :

- cartes actives ;
- paiements carte ;
- paiements QR ;
- abonnements actifs ;
- épargne active ;
- cashback attribué ;
- factures émises ;
- litiges ouverts ;
- campagnes utilisées.

## 13. Entonnoirs

Le système doit permettre des funnels configurables.

Exemple :

```text
VISITE
INSCRIPTION
COMPTE_VERIFIE
PREMIER_DEPOT
PREMIER_PAIEMENT
UTILISATEUR_ACTIF_30J
```

Chaque étape doit être calculée sur une cohorte clairement définie.

## 14. Cohortes

Les cohortes peuvent être créées par :

- date d’inscription ;
- date d’activation ;
- premier paiement ;
- premier usage d’un produit ;
- commerçant ;
- pays ;
- campagne ;
- canal d’acquisition.

## 15. Segments analytiques

Un segment est une population définie par des critères documentés. Il peut être utilisé pour reporting, personnalisation autorisée ou campagne, sous réserve des règles de confidentialité applicables.

Exemples :

- nouveaux utilisateurs ;
- utilisateurs actifs ;
- utilisateurs inactifs ;
- commerçants à forte activité ;
- agents actifs ;
- utilisateurs d’un produit donné.

## 16. Tableaux de bord

Le système doit proposer des tableaux de bord pour :

- direction ;
- opérations ;
- finance ;
- produit ;
- commerçants ;
- agents ;
- support ;
- partenaires ;
- administrations lorsque prévu par contrat.

Chaque tableau de bord possède une liste explicite de widgets, dimensions, filtres et permissions.

## 17. Widgets

Types minimum :

```text
KPI_CARD
LINE_CHART
BAR_CHART
STACKED_BAR
TABLE
FUNNEL
COHORT_TABLE
MAP
RANKING
```

Le choix de visualisation ne doit pas modifier la définition du KPI.

## 18. Filtres

Les dashboards peuvent filtrer par :

- période ;
- pays ;
- région ;
- devise ;
- produit ;
- canal ;
- commerçant ;
- partenaire ;
- point de vente ;
- agent ;
- statut.

## 19. Fraîcheur des données

Chaque indicateur affiche une fraîcheur :

```text
REAL_TIME
NEAR_REAL_TIME
HOURLY
DAILY
MONTHLY
```

Un timestamp `lastUpdatedAt` doit être disponible pour les vues non temps réel.

## 20. Temps réel et batch

Les indicateurs critiques peuvent être alimentés par flux d’événements. Les agrégations lourdes peuvent être calculées par batch.

Le choix dépend du besoin métier, du coût et du niveau de précision attendu.

## 21. Déduplication

Les événements analytiques doivent porter un identifiant stable. Le pipeline doit tolérer les relectures sans compter plusieurs fois le même événement.

## 22. Retards et corrections

Le pipeline doit accepter les événements retardés et pouvoir recalculer une fenêtre historique lorsque des données corrigées sont reçues.

Un rapport déjà produit doit conserver sa date de génération et la version de métrique utilisée.

## 23. Rapports programmés

Un rapport peut être généré :

- quotidiennement ;
- hebdomadairement ;
- mensuellement ;
- à la demande ;
- à une date spécifique.

Il possède :

- destinataire ou organisation ;
- période ;
- métriques ;
- dimensions ;
- format ;
- statut ;
- heure de génération ;
- version des définitions.

## 24. Formats d’export

Formats prévus :

```text
CSV
XLSX
PDF
JSON
```

Les exports volumineux sont traités de manière asynchrone avec un statut consultable.

## 25. Portail commerçant

Le commerçant doit pouvoir consulter uniquement ses propres données et celles de ses points de vente autorisés :

- ventes ;
- encaissements ;
- panier moyen ;
- évolution ;
- remboursements ;
- paiements par canal ;
- activité par point de vente.

## 26. Portail agent

L’agent peut consulter :

- opérations ;
- volumes ;
- commissions ;
- activité journalière ;
- historique ;
- indicateurs autorisés pour son périmètre.

## 27. Portail partenaire

Un partenaire externe ne voit que les métriques contractuellement autorisées pour son périmètre.

Aucune vue multi-partenaire ne doit être accessible sans rôle explicite.

## 28. Administration

L’administration Mansa doit pouvoir :

- créer des définitions de métriques ;
- versionner une formule ;
- publier un dashboard ;
- gérer les accès ;
- créer un rapport ;
- relancer un calcul ;
- suivre la fraîcheur ;
- inspecter les erreurs de pipeline ;
- désactiver une métrique obsolète.

## 29. Permissions

Exemples :

```text
analytics.dashboard.read
analytics.metric.read
analytics.metric.manage
analytics.report.read
analytics.report.create
analytics.export.create
analytics.export.read
analytics.admin
```

Les accès restent restreints au périmètre métier de l’utilisateur.

## 30. Modèle de données minimal

### MetricDefinition

```text
id
key
name
description
unit
aggregationType
status
currentVersionId
createdAt
updatedAt
```

### MetricVersion

```text
id
metricDefinitionId
version
formula
dimensions
validFrom
createdBy
publishedAt
```

### ReportDefinition

```text
id
name
organizationId
frequency
format
filters
metrics
status
```

### ReportRun

```text
id
reportDefinitionId
periodStart
periodEnd
status
generatedAt
artifactReference
```

## 31. API minimale

```text
GET  /analytics/dashboards
GET  /analytics/dashboards/:id
GET  /analytics/metrics
POST /analytics/queries
GET  /reports
POST /reports
POST /reports/:id/run
POST /exports
GET  /exports/:id
```

## 32. Performance

Le système doit utiliser :

- pré-agrégations ;
- caches contrôlés ;
- pagination ;
- limites de période ;
- index adaptés ;
- requêtes asynchrones pour les calculs lourds.

Un dashboard standard doit charger rapidement sans interroger directement les tables transactionnelles critiques.

## 33. Observabilité

Métriques de pipeline :

- événements reçus ;
- événements rejetés ;
- latence d’ingestion ;
- retard de traitement ;
- erreurs de calcul ;
- fraîcheur des tables ;
- durée des rapports ;
- durée des exports ;
- taille des files.

## 34. Qualité des données

Des contrôles doivent détecter :

- volumes anormalement faibles ;
- volumes anormalement élevés ;
- dimensions inconnues ;
- devise manquante ;
- périodes incomplètes ;
- doublons ;
- divergence entre agrégats et sources de contrôle.

## 35. Gouvernance des KPI

Chaque KPI critique doit avoir :

- propriétaire métier ;
- définition ;
- formule ;
- source ;
- fréquence ;
- unité ;
- dimensions autorisées ;
- version ;
- date d’effet.

Les équipes ne doivent pas recréer plusieurs définitions incompatibles du même indicateur.

## 36. Tests requis

Tests unitaires :

- formules ;
- agrégations ;
- arrondis ;
- filtres ;
- calculs de période ;
- déduplication.

Tests d’intégration :

- événement vers agrégat ;
- dashboard vers métrique ;
- rapport vers export ;
- contrôle de périmètre organisationnel.

Tests de charge :

- fort volume d’événements ;
- dashboards simultanés ;
- exports volumineux ;
- recalcul historique.

## 37. Critères d’acceptation

Le module est prêt lorsque :

- les KPI prioritaires disposent d’une définition versionnée ;
- les données sont correctement isolées par organisation et rôle ;
- la fraîcheur est visible ;
- les événements sont dédupliqués ;
- les dashboards principaux sont disponibles ;
- les rapports et exports fonctionnent ;
- les contrôles de qualité sont actifs ;
- les calculs financiers sont cohérents ;
- les pipelines sont observables ;
- les deux dépôts de spécifications sont synchronisés.
