# Gestion de l’argent — Budgets, coffres et objectifs d’épargne

## 1. Objectif

Ajouter à Mansa un module de gestion financière personnelle et professionnelle permettant aux utilisateurs de répartir leur argent, suivre des budgets, créer des coffres d’épargne et définir des objectifs sans mélanger ces mécanismes avec le solde réellement disponible du compte principal.

Le module doit rester compatible avec les comptes individuels, professionnels et, à terme, les comptes familiaux ou partagés autorisés. Il doit fonctionner avec plusieurs devises et plusieurs pays sans coder en dur les règles du Mali.

## 2. Principes fonctionnels

Le système doit distinguer clairement :

- le solde comptable du compte ;
- le solde disponible ;
- les montants réservés ;
- les montants affectés à des budgets ;
- les montants placés dans des coffres ;
- les montants bloqués temporairement par une opération en cours.

Un budget est un outil de suivi et d’allocation. Il ne doit pas nécessairement déplacer juridiquement l’argent.

Un coffre représente une enveloppe distincte, avec des règles de disponibilité configurables. Selon l’architecture bancaire ou partenaire retenue, le coffre peut être purement logique ou correspondre à un sous-compte réel. Cette distinction doit être explicite dans la configuration.

## 3. Budgets

Un utilisateur doit pouvoir créer un budget avec :

- nom ;
- catégorie ;
- montant cible ;
- période ;
- devise ;
- date de début ;
- date de fin éventuelle ;
- icône ou couleur d’affichage ;
- compte source ;
- statut actif, suspendu ou archivé.

Périodes supportées au minimum :

- semaine ;
- mois ;
- trimestre ;
- période personnalisée.

Exemples : alimentation, carburant, transport, logement, scolarité, loisirs, abonnements, dépenses professionnelles.

## 4. Affectation automatique des dépenses

Chaque transaction éligible peut être automatiquement rattachée à un budget à partir de :

- catégorie marchand ;
- commerçant ;
- MCC ou code équivalent lorsqu’il existe ;
- tag utilisateur ;
- type de transaction ;
- compte utilisé ;
- règle personnalisée.

L’utilisateur doit pouvoir corriger manuellement l’affectation d’une dépense sans modifier la transaction financière d’origine.

Toute correction de classification doit être historisée afin d’améliorer les règles futures sans altérer les données comptables.

## 5. Alertes de budget

Les seuils d’alerte doivent être configurables, par exemple :

- 50 % consommé ;
- 75 % consommé ;
- 90 % consommé ;
- 100 % atteint ;
- dépassement.

L’utilisateur doit pouvoir désactiver certaines alertes ou choisir les canaux autorisés.

Le système ne doit jamais bloquer automatiquement une transaction simplement parce qu’un budget est dépassé, sauf si l’utilisateur a explicitement activé une règle de contrôle distincte et compatible avec les règles de paiement du compte.

## 6. Budgets professionnels

Pour les commerçants et entreprises, les budgets doivent pouvoir être utilisés pour :

- achats fournisseurs ;
- dépenses de caisse ;
- marketing ;
- transport ;
- salaires ;
- maintenance ;
- charges fixes ;
- investissements ;
- dépenses par équipe ou point de vente.

Les permissions doivent permettre de limiter qui peut créer, modifier ou consulter un budget.

## 7. Coffres

Un utilisateur doit pouvoir créer plusieurs coffres avec :

- nom ;
- objectif éventuel ;
- montant cible ;
- devise ;
- solde courant ;
- source de financement ;
- fréquence d’alimentation ;
- règle de retrait ;
- date cible ;
- statut.

Exemples : urgence, voyage, loyer, scolarité, achat de matériel, investissement, impôts, projet professionnel.

## 8. Alimentation des coffres

Un coffre peut être alimenté par :

- transfert manuel depuis le compte principal ;
- montant fixe périodique ;
- pourcentage d’une entrée d’argent ;
- arrondi de paiement ;
- règle conditionnelle ;
- transfert depuis un autre compte autorisé.

Exemple d’arrondi : un paiement de 1 750 FCFA peut être arrondi à 2 000 FCFA et les 250 FCFA restants transférés dans un coffre, si cette option est activée et si le modèle bancaire le permet.

Les règles automatiques doivent être désactivables immédiatement.

## 9. Types de disponibilité

Chaque coffre doit déclarer son mode de disponibilité :

### Coffre flexible

Retrait disponible à tout moment.

### Coffre avec délai volontaire

L’utilisateur peut imposer un délai avant retrait, par exemple 24 heures, 48 heures ou une durée personnalisée, dans les limites autorisées.

### Coffre à date cible

L’argent est destiné à un objectif daté. Le système peut déconseiller un retrait anticipé mais ne doit pas présenter un blocage comme juridiquement garanti si l’infrastructure partenaire ne permet pas réellement ce blocage.

### Coffre professionnel contrôlé

Un retrait peut nécessiter une permission ou une approbation interne selon les rôles de l’organisation.

## 10. Objectifs d’épargne

Un objectif doit afficher :

- montant cible ;
- montant déjà atteint ;
- pourcentage de progression ;
- montant restant ;
- date cible ;
- rythme moyen nécessaire ;
- historique des contributions.

Le système peut proposer une contribution périodique indicative, sans déclencher de prélèvement sans consentement explicite.

## 11. Règles automatiques

Mansa doit disposer d’un moteur de règles réutilisable permettant notamment :

- mettre 5 % de chaque salaire dans un coffre ;
- transférer 1 000 FCFA chaque semaine ;
- mettre de côté les arrondis ;
- affecter automatiquement les achats carburant au budget Transport ;
- alimenter un coffre Impôts à partir d’un pourcentage du chiffre d’affaires marchand.

Chaque règle doit comporter :

- propriétaire ;
- déclencheur ;
- conditions ;
- action ;
- plafond ;
- priorité ;
- date d’effet ;
- état actif ou suspendu ;
- journal d’exécution.

Une règle ne doit jamais pouvoir créer un solde négatif si le produit financier ne l’autorise pas.

## 12. Moteur de catégorisation

La catégorisation des transactions doit être indépendante du grand livre comptable.

Elle peut utiliser progressivement :

- règles déterministes ;
- données marchand ;
- libellé de transaction ;
- historique utilisateur ;
- modèles de classification ou IA lorsque cela est pertinent.

Toute classification IA doit rester révisable et ne doit pas décider seule d’une opération financière irréversible.

## 13. Modèle de données minimal

Prévoir au minimum les entités conceptuelles suivantes :

### Budget

- id ;
- ownerType ;
- ownerId ;
- accountId ;
- name ;
- categoryId ;
- currency ;
- limitAmount ;
- periodType ;
- startAt ;
- endAt ;
- status ;
- createdAt ;
- updatedAt.

### BudgetAllocation

- id ;
- budgetId ;
- transactionId ;
- amount ;
- source AUTO ou MANUAL ;
- createdAt.

### Vault

- id ;
- ownerType ;
- ownerId ;
- sourceAccountId ;
- name ;
- currency ;
- targetAmount ;
- targetDate ;
- availabilityMode ;
- status ;
- createdAt ;
- updatedAt.

### VaultMovement

- id ;
- vaultId ;
- transactionReference ;
- direction IN ou OUT ;
- amount ;
- reason ;
- createdAt.

### SavingRule

- id ;
- ownerId ;
- triggerType ;
- conditions ;
- actionType ;
- amountType ;
- amountValue ;
- maximumAmount ;
- status ;
- lastExecutedAt.

## 14. Ledger et intégrité financière

Les soldes des coffres ne doivent pas être maintenus uniquement par une simple colonne modifiable sans historique.

Toute entrée ou sortie financière réelle doit produire des écritures traçables dans le mécanisme comptable approprié.

Les opérations doivent être idempotentes et utiliser une référence unique afin d’éviter les doubles transferts lors d’une reprise réseau ou d’un webhook rejoué.

Une modification de nom, objectif ou couleur de coffre ne doit jamais modifier son historique financier.

## 15. Gestion des échecs

Si une alimentation automatique échoue :

- ne pas réessayer indéfiniment ;
- enregistrer la cause ;
- notifier selon les préférences ;
- permettre une reprise contrôlée ;
- garantir l’idempotence.

Un solde insuffisant ne doit pas déclencher de découvert sauf produit explicitement autorisé.

## 16. Expérience utilisateur

L’écran principal de gestion d’argent doit pouvoir afficher :

- dépenses du mois ;
- budgets proches de leur limite ;
- progression des coffres ;
- objectifs à venir ;
- règles automatiques actives ;
- recommandations facultatives.

Les montants doivent toujours être affichés avec devise et format local corrects.

## 17. Confidentialité

Les budgets et objectifs d’épargne constituent des données financières privées.

Le système doit :

- limiter les accès par rôle ;
- journaliser les accès administratifs sensibles ;
- éviter d’exposer des montants dans des notifications non sécurisées lorsque l’utilisateur l’a désactivé ;
- respecter les politiques de conservation applicables.

Les données de budget ne doivent pas être utilisées à des fins publicitaires sans base juridique et consentement approprié.

## 18. API fonctionnelle

Prévoir des interfaces pour :

- créer, lire, modifier et archiver un budget ;
- calculer la consommation d’un budget ;
- rattacher ou détacher une transaction ;
- créer et gérer un coffre ;
- alimenter ou retirer d’un coffre ;
- créer une règle automatique ;
- suspendre une règle ;
- récupérer les projections d’objectif ;
- obtenir l’historique.

Les routes d’écriture doivent être protégées par authentification, autorisation et contrôles d’idempotence lorsque nécessaire.

## 19. Événements métier

Le module doit pouvoir publier des événements comme :

- budget.created ;
- budget.threshold_reached ;
- budget.exceeded ;
- vault.created ;
- vault.funded ;
- vault.withdrawn ;
- vault.goal_reached ;
- saving_rule.executed ;
- saving_rule.failed.

Ces événements peuvent alimenter notifications, analytics et journal d’audit sans coupler directement les modules.

## 20. Administration et support

Les agents support autorisés peuvent consulter les informations strictement nécessaires au diagnostic mais ne doivent pas pouvoir déplacer l’argent d’un coffre sans procédure financière autorisée.

Toute intervention sensible doit être auditée avec :

- acteur ;
- motif ;
- date ;
- ancienne valeur ;
- nouvelle valeur.

## 21. Indicateurs

Suivre au minimum :

- nombre de budgets actifs ;
- taux d’utilisation des budgets ;
- nombre de coffres actifs ;
- montant total épargné par devise ;
- taux d’atteinte des objectifs ;
- nombre de règles automatiques actives ;
- taux d’échec des alimentations automatiques ;
- fréquence des retraits anticipés.

Les tableaux de bord internes doivent utiliser des données agrégées lorsque les détails individuels ne sont pas nécessaires.

## 22. Hors périmètre initial

Ne pas inclure automatiquement dans ce module :

- conseil en investissement réglementé ;
- rendement garanti ;
- crédit automatique ;
- gestion d’actifs ;
- trading ;
- assurance ;
- blocage juridique de fonds sans infrastructure bancaire appropriée.

Ces produits doivent être traités séparément s’ils sont ajoutés plus tard.

## 23. Critères d’acceptation

Le module est considéré fonctionnel lorsque :

- un utilisateur peut créer plusieurs budgets ;
- les transactions peuvent être classées et rattachées sans altérer le ledger ;
- les seuils de budget sont calculés correctement ;
- un utilisateur peut créer et alimenter un coffre ;
- un retrait conserve une piste d’audit complète ;
- les règles automatiques sont idempotentes ;
- les échecs ne produisent pas de double débit ;
- les permissions professionnelles sont respectées ;
- les montants sont cohérents entre interface, API et écritures comptables ;
- aucune règle sensible n’est codée en dur pour un pays ou un partenaire.
