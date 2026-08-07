# 92 — Abonnements et facturation récurrente Mansa : plans, cycles, prélèvements, relances, factures, taxes, Ledger, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du module **Abonnements et facturation récurrente Mansa**.

Le module doit permettre à Mansa, aux commerçants, entreprises, organisations et partenaires autorisés de vendre, gérer et facturer des services récurrents de manière fiable, transparente, auditable et multi-pays.

Il doit couvrir notamment :

- plans gratuits et payants ;
- abonnements mensuels, annuels et personnalisés ;
- essais gratuits ;
- périodes de grâce ;
- renouvellements automatiques ;
- prélèvements récurrents ;
- Mobile Money, Wallet, carte et virement ;
- changement de plan ;
- prorata ;
- suspension et reprise ;
- annulation ;
- coupons et promotions ;
- remises contractuelles ;
- taxes ;
- factures et avoirs ;
- remboursements ;
- échecs de paiement ;
- relances ;
- Ledger ;
- Webhooks ;
- API ;
- RBAC ;
- administration ;
- reporting ;
- multi-pays ;
- multi-devises ;
- conformité ;
- sécurité ;
- observabilité.

Aucun abonnement ne doit créer de mouvement financier en dehors du Ledger ni renouveler un engagement en contradiction avec les règles légales, contractuelles ou le consentement du client.

---

## 2. Principe général

Le parcours nominal doit pouvoir être :

```text
Choix d’un plan
→ Affichage du prix, taxes et conditions
→ Sélection du moyen de paiement
→ Consentement explicite au renouvellement
→ Création de l’abonnement
→ Activation des droits
→ Facturation à l’échéance
→ Encaissement
→ Émission du reçu ou de la facture
→ Renouvellement, changement, suspension ou résiliation
```

Chaque étape doit être traçable, idempotente et réconciliable.

---

## 3. Positionnement dans Mansa

Le module doit être utilisable par :

- application Client ;
- application Commerce ;
- application Admin Lite selon permissions ;
- portail Web ;
- portail Entreprise ;
- Hub ;
- API publiques ;
- back-office central ;
- Jini pour l’assistance et l’explication.

Il doit s’intégrer avec :

- Identity ;
- KYC/KYB ;
- Wallet ;
- Ledger ;
- Paiements ;
- Cartes ;
- Mobile Money ;
- Notifications ;
- Facturation ;
- Fiscalité ;
- RBAC ;
- Audit ;
- Reporting ;
- Feature Flags ;
- Jini ;
- Connecteurs partenaires.

---

## 4. Périmètre des abonnements

Le système doit gérer :

- abonnements Mansa destinés aux clients ;
- abonnements Mansa Commerce ;
- abonnements Mansa Business ;
- offres Enterprise ;
- offres Administration/État si contractuellement prévues ;
- abonnements vendus par des commerçants via Mansa ;
- services numériques récurrents ;
- services physiques récurrents ;
- adhésions ;
- forfaits ;
- licences par siège ;
- abonnements par usage ;
- abonnements hybrides fixe + usage.

Chaque catégorie doit pouvoir être activée ou désactivée par pays et par entité.

---

## 5. Entité Plan

Un plan doit contenir au minimum :

- identifiant ;
- propriétaire ;
- code interne ;
- nom ;
- description ;
- devise ;
- prix de base ;
- périodicité ;
- durée ;
- taxes applicables ;
- fonctionnalités incluses ;
- limites ;
- quotas ;
- période d’essai éventuelle ;
- politique de prorata ;
- politique d’annulation ;
- règles de remboursement ;
- statut ;
- pays autorisés ;
- canaux de vente ;
- métadonnées ;
- version contractuelle.

---

## 6. Types de plans

Le moteur doit prendre en charge :

- FREE ;
- FIXED_RECURRING ;
- PER_SEAT ;
- USAGE_BASED ;
- TIERED_USAGE ;
- FIXED_PLUS_USAGE ;
- PREPAID_RECURRING ;
- CONTRACTUAL ;
- CUSTOM_ENTERPRISE.

Les types disponibles doivent être administrables.

---

## 7. Périodicités

Périodicités possibles :

- jour ;
- semaine ;
- mois ;
- trimestre ;
- semestre ;
- année ;
- nombre personnalisé de jours ;
- calendrier contractuel personnalisé.

Les périodicités très courtes peuvent être désactivées par pays, type de client ou risque.

---

## 8. Versionnement des plans

Une modification de prix ou de conditions ne doit pas réécrire l’historique.

Le système doit créer une nouvelle version du plan avec :

- date d’effet ;
- population concernée ;
- ancienne version ;
- nouvelle version ;
- règles de migration ;
- consentement requis ou non ;
- journal d’audit.

---

## 9. Entité Abonnement

Un abonnement doit contenir :

- abonné ;
- organisation éventuelle ;
- plan et version ;
- devise ;
- date de début ;
- période courante ;
- date de prochaine facturation ;
- moyen de paiement ;
- consentement ;
- statut ;
- quantité ou sièges ;
- remises ;
- taxes ;
- solde de crédit éventuel ;
- métadonnées ;
- historique ;
- audit.

---

## 10. Statuts d’un abonnement

```text
DRAFT
TRIALING
ACTIVE
PAST_DUE
GRACE_PERIOD
PAUSED
SUSPENDED
CANCEL_AT_PERIOD_END
CANCELLED
EXPIRED
TERMINATED
UNDER_REVIEW
```

Les transitions doivent être explicites et contrôlées.

---

## 11. Création d’un abonnement

Avant activation, le système doit vérifier :

- identité ;
- éligibilité ;
- pays ;
- âge si applicable ;
- KYC/KYB requis ;
- disponibilité du plan ;
- prix ;
- devise ;
- taxes ;
- moyen de paiement ;
- consentement ;
- absence de doublon interdit ;
- règles anti-fraude.

---

## 12. Consentement au renouvellement

Le consentement doit être :

- explicite ;
- horodaté ;
- lié à une version des conditions ;
- lié au prix affiché ;
- lié à la fréquence ;
- consultable ;
- révocable selon les règles applicables.

L’écran de confirmation doit indiquer clairement la prochaine échéance et le caractère récurrent.

---

## 13. Essai gratuit

Un plan peut prévoir :

- aucun essai ;
- essai en jours ;
- essai jusqu’à une date ;
- essai avec ou sans moyen de paiement ;
- essai limité à une fois par personne, organisation ou moyen de paiement.

Le système doit prévenir avant la première facturation lorsque la réglementation ou la politique produit l’exige.

---

## 14. Conversion de l’essai

À la fin d’un essai :

- conversion automatique si consentie ;
- demande de confirmation si nécessaire ;
- expiration si aucun moyen valide ;
- période de grâce éventuelle ;
- impossibilité de débiter sans mandat valide.

---

## 15. Moyens de paiement récurrents

Le module doit pouvoir utiliser selon disponibilité :

- Wallet Mansa ;
- Mobile Money ;
- carte tokenisée ;
- prélèvement bancaire ;
- virement programmé ;
- compte entreprise ;
- crédit prépayé ;
- mandat partenaire.

Les données sensibles de carte ne doivent jamais être stockées en clair par Mansa.

---

## 16. Priorité des moyens de paiement

L’utilisateur ou l’organisation peut définir un ordre autorisé.

Exemple :

```text
1. Wallet Mansa
2. Mobile Money principal
3. Carte professionnelle
```

Le fallback automatique doit être explicitement autorisé et audité.

---

## 17. Mandats et autorisations

Chaque débit récurrent doit être relié à :

- un consentement ;
- un mandat ou token partenaire si requis ;
- un plafond éventuel ;
- une date de validité ;
- un bénéficiaire ;
- un historique de révocation.

---

## 18. Cycle de facturation

Le moteur doit calculer :

- début de période ;
- fin de période ;
- date de génération de facture ;
- date de tentative de paiement ;
- date d’échéance ;
- date de prochaine période ;
- fuseau horaire de référence.

Les calculs de calendrier doivent être déterministes.

---

## 19. Ancrage de facturation

Le système doit gérer :

- date d’inscription ;
- jour fixe du mois ;
- début de mois ;
- fin de mois ;
- date contractuelle ;
- calendrier personnalisé.

Les mois courts doivent être gérés sans dérive cumulative.

---

## 20. Facturation anticipée et à terme échu

Un composant de prix peut être facturé :

- au début de période ;
- à la fin de période ;
- après mesure d’usage ;
- à une date contractuelle.

Le document commercial doit distinguer clairement ces composantes.

---

## 21. Prorata

Lors d’un changement en cours de période, le moteur doit pouvoir appliquer :

- aucun prorata ;
- prorata immédiat ;
- crédit sur prochaine facture ;
- débit immédiat de la différence ;
- changement à la prochaine échéance.

La méthode doit être visible avant confirmation.

---

## 22. Upgrade

Un passage vers un plan supérieur peut :

- prendre effet immédiatement ;
- générer un prorata ;
- augmenter les droits immédiatement ;
- exiger un paiement avant activation ;
- attendre la prochaine période selon politique.

---

## 23. Downgrade

Un passage vers un plan inférieur peut :

- être immédiat ;
- être différé à la fin de période ;
- nécessiter la réduction des sièges ou quotas ;
- bloquer si des ressources dépassent les limites futures.

Aucune donnée utilisateur ne doit être supprimée sans règle explicite de conservation.

---

## 24. Quantités et sièges

Le système doit gérer :

- quantité fixe ;
- sièges actifs ;
- sièges invités ;
- minimum contractuel ;
- maximum ;
- ajout en cours de période ;
- retrait différé ;
- prorata par siège.

---

## 25. Facturation à l’usage

Les métriques d’usage peuvent inclure :

- transactions ;
- appels API ;
- terminaux ;
- utilisateurs actifs ;
- stockage ;
- messages ;
- fonctionnalités premium ;
- unités métier définies par contrat.

Chaque mesure doit être horodatée, déduplicable et auditable.

---

## 26. Agrégation d’usage

Modes possibles :

- somme ;
- maximum ;
- moyenne ;
- dernière valeur ;
- nombre d’événements uniques ;
- paliers.

Le moteur doit empêcher le double comptage d’un événement.

---

## 27. Paliers tarifaires

Le module doit permettre :

- volume pricing ;
- graduated pricing ;
- forfait inclus puis dépassement ;
- minimum facturable ;
- plafond contractuel.

Les calculs doivent être reproductibles à partir des événements sources.

---

## 28. Coupons

Un coupon peut définir :

- montant fixe ;
- pourcentage ;
- durée unique ;
- plusieurs cycles ;
- durée illimitée ;
- montant minimum ;
- plans éligibles ;
- pays ;
- devise ;
- date d’expiration ;
- nombre maximal d’utilisations.

---

## 29. Codes promotionnels

Les codes doivent gérer :

- code public ou privé ;
- campagnes ;
- attribution individuelle ;
- première souscription uniquement ;
- segmentation ;
- limite d’usage ;
- anti-abus ;
- journal des utilisations.

---

## 30. Remises contractuelles

Pour Business et Enterprise :

- remise par volume ;
- remise négociée ;
- prix spécifique ;
- engagement minimum ;
- période d’engagement ;
- crédit commercial ;
- gratuité temporaire.

Toute remise doit indiquer son approbateur et sa période de validité.

---

## 31. Taxes

Le moteur doit pouvoir déterminer :

- taxe applicable ;
- taux ;
- base taxable ;
- exonération ;
- taxe incluse ou ajoutée ;
- juridiction ;
- numéro fiscal ;
- règles B2B/B2C ;
- arrondis.

Les règles fiscales doivent être configurables par pays et validées juridiquement avant production.

---

## 32. Facture

Une facture doit pouvoir contenir :

- numéro unique ;
- fournisseur ;
- client ;
- adresses ;
- identifiants fiscaux ;
- période ;
- lignes ;
- quantités ;
- prix unitaires ;
- remises ;
- taxes ;
- total HT ;
- total taxes ;
- total TTC ;
- devise ;
- statut ;
- référence du paiement ;
- mentions légales ;
- PDF ou format réglementaire si requis.

---

## 33. Statuts de facture

```text
DRAFT
OPEN
PAYMENT_PENDING
PAID
PARTIALLY_PAID
PAST_DUE
VOID
CANCELLED
REFUNDED
PARTIALLY_REFUNDED
UNCOLLECTIBLE
```

Les transitions doivent préserver l’historique comptable.

---

## 34. Numérotation des factures

La numérotation doit être :

- unique dans le périmètre légal requis ;
- non réutilisable ;
- séquentielle si exigée ;
- indépendante par entité ou pays si nécessaire ;
- immuable après émission.

---

## 35. Avoirs

Un avoir doit référencer la facture d’origine et préciser :

- motif ;
- lignes corrigées ;
- montant ;
- taxes ;
- approbateur éventuel ;
- remboursement ou crédit associé.

---

## 36. Crédits client

Un crédit commercial peut être :

- appliqué à la prochaine facture ;
- limité dans le temps ;
- limité à certains plans ;
- non retirable ;
- remboursable uniquement selon politique.

Il doit être comptabilisé séparément d’un solde Wallet disponible.

---

## 37. Paiement d’une facture

Le paiement doit créer les écritures Ledger requises pour :

- montant brut ;
- taxes ;
- frais ;
- commission Mansa éventuelle ;
- part du vendeur ;
- remboursement éventuel ;
- ajustements.

Aucun statut PAID ne doit être posé sans confirmation financière fiable.

---

## 38. Idempotence des encaissements

Chaque tentative doit avoir une clé idempotente stable.

Le système doit empêcher :

- double débit ;
- double facture ;
- double commission ;
- double activation ;
- double remboursement.

---

## 39. Paiement échoué

Causes possibles :

- solde insuffisant ;
- moyen expiré ;
- mandat révoqué ;
- refus partenaire ;
- limite dépassée ;
- KYC bloqué ;
- incident réseau ;
- timeout ;
- fraude suspectée.

La cause technique ne doit pas être exposée de manière dangereuse au client.

---

## 40. Relances automatiques

Le moteur de relance doit être configurable :

```text
Tentative initiale
→ +1 jour
→ +3 jours
→ +7 jours
→ suspension ou résiliation selon politique
```

Le nombre, l’espacement et les heures de tentative doivent être administrables.

---

## 41. Période de grâce

Une période de grâce peut maintenir tout ou partie du service pendant une durée définie.

Elle doit préciser :

- durée ;
- fonctionnalités conservées ;
- fonctionnalités bloquées ;
- nombre de relances ;
- date de suspension ;
- date de résiliation.

---

## 42. Suspension

Une suspension peut être déclenchée par :

- impayé ;
- fraude ;
- demande client ;
- exigence conformité ;
- décision administrative autorisée ;
- contrat.

La suspension du service ne doit pas altérer l’historique financier.

---

## 43. Reprise

Une reprise peut nécessiter :

- régularisation des impayés ;
- nouveau moyen de paiement ;
- validation KYC/KYB ;
- confirmation ;
- approbation interne.

La date de prochaine facturation doit être recalculée de manière déterministe.

---

## 44. Annulation

L’abonné doit pouvoir annuler selon les règles applicables :

- immédiatement ;
- en fin de période ;
- à une date future ;
- avec délai légal ;
- via support pour contrat spécial.

Le système doit afficher la date exacte de fin des droits.

---

## 45. Rétractation et remboursements

Le moteur doit pouvoir appliquer par pays :

- droit de rétractation ;
- remboursement total ;
- remboursement partiel ;
- remboursement au prorata ;
- non-remboursable lorsque légalement permis ;
- exceptions contractuelles.

Les politiques doivent être validées juridiquement avant activation.

---

## 46. Renouvellement et hausse de prix

Avant une hausse applicable à un abonnement existant, le système doit pouvoir :

- notifier ;
- respecter un préavis ;
- demander un nouveau consentement si requis ;
- permettre l’annulation ;
- conserver la preuve de notification.

---

## 47. Notifications

Notifications possibles :

- début d’essai ;
- fin prochaine d’essai ;
- abonnement activé ;
- facture disponible ;
- débit à venir ;
- paiement réussi ;
- paiement échoué ;
- nouvelle tentative ;
- période de grâce ;
- suspension ;
- reprise ;
- changement de prix ;
- changement de plan ;
- annulation ;
- expiration ;
- remboursement.

Les canaux doivent respecter les préférences et obligations légales.

---

## 48. Jini

Jini peut :

- expliquer un plan ;
- comparer des offres ;
- expliquer une facture ;
- signaler une prochaine échéance ;
- expliquer un échec de paiement ;
- guider vers l’annulation ;
- proposer un plan plus adapté.

Jini ne doit jamais souscrire, renouveler, annuler ou débiter sans confirmation explicite lorsque celle-ci est requise.

---

## 49. Abonnements commerçants

Un commerçant autorisé peut créer des offres récurrentes pour :

- salle de sport ;
- restauration ;
- livraison ;
- entretien ;
- logiciels ;
- adhésion ;
- éducation ;
- services professionnels ;
- maintenance ;
- autres catégories autorisées.

Mansa doit pouvoir prélever une commission configurable.

---

## 50. Portail commerçant

Le commerçant doit pouvoir consulter :

- abonnés actifs ;
- essais ;
- MRR ;
- renouvellements ;
- churn ;
- impayés ;
- relances ;
- revenus ;
- taxes ;
- remboursements ;
- plans ;
- coupons ;
- export.

Les données visibles doivent respecter les permissions et la minimisation.

---

## 51. Abonnements Business et Enterprise

Le module doit gérer :

- contrat ;
- entité facturée ;
- centre de coût ;
- bon de commande ;
- sièges ;
- facturation consolidée ;
- plusieurs espaces ;
- plusieurs administrateurs ;
- engagement minimum ;
- échéance personnalisée ;
- règlement par virement ;
- conditions de paiement ;
- contact finance.

---

## 52. Administration centrale

L’administration doit pouvoir, selon RBAC :

- créer et versionner des plans ;
- désactiver un plan ;
- configurer pays et devises ;
- configurer taxes ;
- configurer relances ;
- gérer promotions ;
- consulter abonnements ;
- suspendre en cas de risque ;
- approuver remboursements sensibles ;
- gérer exceptions ;
- consulter factures ;
- exporter ;
- consulter audits.

Toute action financière sensible doit être tracée.

---

## 53. RBAC et séparation des pouvoirs

Rôles possibles :

- Super Admin ;
- Billing Admin ;
- Finance ;
- Support ;
- Risk ;
- Compliance ;
- Merchant Admin ;
- Enterprise Billing Admin ;
- Auditor ;
- Read Only.

Les remboursements élevés, remises exceptionnelles et modifications fiscales peuvent exiger une double approbation.

---

## 54. API

Exemples d’API :

```text
POST   /subscriptions
GET    /subscriptions/:id
POST   /subscriptions/:id/change-plan
POST   /subscriptions/:id/pause
POST   /subscriptions/:id/resume
POST   /subscriptions/:id/cancel
GET    /plans
POST   /billing/payment-methods
GET    /invoices
GET    /invoices/:id
POST   /invoices/:id/pay
POST   /invoices/:id/refund
POST   /usage-events
GET    /billing/portal-session
```

Les API doivent être versionnées, authentifiées, rate-limitées et documentées.

---

## 55. Webhooks et événements

Événements possibles :

```text
plan.created
plan.updated
subscription.created
subscription.trial_ending
subscription.activated
subscription.updated
subscription.past_due
subscription.paused
subscription.resumed
subscription.cancelled
invoice.created
invoice.finalized
invoice.payment_succeeded
invoice.payment_failed
invoice.voided
refund.created
refund.completed
usage.recorded
```

Les Webhooks doivent être signés, rejouables de manière contrôlée et déduplicables.

---

## 56. Ledger et comptabilité

Le Ledger doit rester la source financière de vérité.

Le module doit distinguer :

- créance ;
- encaissement ;
- taxe collectée ;
- commission ;
- revenu vendeur ;
- crédit ;
- avoir ;
- remboursement ;
- chargeback éventuel ;
- ajustement.

Aucun recalcul applicatif ne doit modifier rétroactivement une écriture validée.

---

## 57. Réconciliation

La réconciliation doit comparer :

- factures ;
- paiements Mansa ;
- écritures Ledger ;
- confirmations partenaires ;
- reversements vendeurs ;
- remboursements ;
- taxes ;
- commissions.

Les écarts doivent générer des alertes et dossiers de traitement.

---

## 58. Reporting

KPI minimum :

- abonnements actifs ;
- nouveaux abonnements ;
- essais ;
- conversion essai → payant ;
- MRR ;
- ARR ;
- ARPU ;
- churn logo ;
- churn revenu ;
- expansion ;
- contraction ;
- impayés ;
- taux de recouvrement ;
- remboursements ;
- taxes ;
- commissions ;
- revenus par plan ;
- revenus par pays ;
- cohortes.

Les définitions de KPI doivent être versionnées et documentées.

---

## 59. Sécurité, fraude et conformité

Le module doit surveiller notamment :

- création massive d’essais ;
- réutilisation abusive de promotions ;
- moyens de paiement compromis ;
- remboursements anormaux ;
- changement fréquent d’identité ;
- contournement de limites ;
- accès admin inhabituel ;
- modification fiscale non autorisée ;
- fraude commerçant ;
- fraude au chargeback.

Les décisions automatiques sensibles doivent être explicables et révisables selon les politiques applicables.

---

## 60. Tests fonctionnels, sécurité, performance et résilience

Les tests doivent couvrir :

- création et renouvellement ;
- essai ;
- prorata ;
- upgrade/downgrade ;
- coupons ;
- taxes ;
- usage ;
- facture ;
- avoir ;
- remboursement ;
- échec et relance ;
- suspension/reprise ;
- annulation ;
- idempotence ;
- double appel concurrent ;
- Webhooks dupliqués ;
- réseau faible ;
- partenaire indisponible ;
- reprise après panne ;
- millions d’abonnements ;
- échéances massives simultanées ;
- génération de factures en lot ;
- séparation RBAC ;
- tentative d’accès non autorisé ;
- intégrité Ledger.

---

## 61. Règles métier

1. Tout mouvement financier doit passer par le Ledger.
2. Un abonnement récurrent exige une preuve de consentement valide.
3. Le prix, la fréquence, les taxes et la prochaine échéance doivent être visibles avant souscription.
4. Un débit ne doit pas être effectué après révocation effective du mandat.
5. Toute tentative de paiement doit être idempotente.
6. Une facture émise ne doit pas être réécrite silencieusement.
7. Toute correction comptable doit passer par un mécanisme d’avoir ou d’ajustement autorisé.
8. Toute hausse de prix doit respecter les règles de préavis applicables.
9. Une annulation doit afficher la date exacte de fin de service.
10. Les essais gratuits doivent être protégés contre les abus.
11. Les coupons doivent respecter leurs limites d’usage.
12. Les taxes doivent être configurées par juridiction.
13. Les fonds d’un commerçant doivent être séparés des fonds de Mansa.
14. Les commissions doivent être configurables et auditables.
15. Les échecs partenaires ne doivent pas produire de double débit.
16. Les Webhooks doivent être vérifiés et dédupliqués.
17. Jini ne doit pas exécuter seul une souscription ou un débit nécessitant confirmation.
18. Les permissions RBAC doivent s’appliquer à toutes les actions administratives.
19. Les audits financiers et contractuels critiques doivent être immuables.
20. Chaque fonctionnalité doit pouvoir être activée ou désactivée par pays, canal, segment ou partenaire.

---

## 62. Ordre de développement recommandé

```text
P1-SUB-01 — Modèles Plan, Subscription, Invoice et Ledger mappings
P1-SUB-02 — Souscription, consentement et moyens de paiement
P1-SUB-03 — Cycles, renouvellements et moteur de facturation
P1-SUB-04 — Factures, taxes, numérotation et documents
P1-SUB-05 — Prorata, upgrade, downgrade et sièges
P1-SUB-06 — Essais, coupons, remises et crédits
P1-SUB-07 — Échecs de paiement, relances et période de grâce
P1-SUB-08 — Suspension, reprise, annulation et remboursements
P1-SUB-09 — Usage metering et tarification par paliers
P1-SUB-10 — Commerce, Business et Enterprise
P1-SUB-11 — API, Webhooks, administration et reporting
P1-SUB-12 — Sécurité, réconciliation et tests de bout en bout
```

---

## 63. Critères d’acceptation finaux

Le module Abonnements et facturation récurrente Mansa est validé lorsque :

- un plan peut être créé et versionné ;
- les plans peuvent être activés par pays ;
- un abonnement peut être souscrit ;
- le consentement est enregistré ;
- la prochaine échéance est affichée ;
- un essai gratuit fonctionne ;
- la conversion d’essai respecte le consentement ;
- les moyens de paiement autorisés fonctionnent ;
- le fallback respecte les autorisations ;
- un mandat peut être révoqué ;
- les cycles mensuels et annuels sont déterministes ;
- l’ancrage de facturation fonctionne ;
- la facturation anticipée et à terme échu fonctionne ;
- le prorata fonctionne ;
- un upgrade fonctionne ;
- un downgrade fonctionne ;
- les sièges sont gérés ;
- l’usage est mesuré sans double comptage ;
- les paliers tarifaires sont calculés correctement ;
- les coupons fonctionnent ;
- les codes promotionnels sont protégés contre les abus ;
- les remises contractuelles sont auditables ;
- les taxes sont calculées selon la configuration ;
- une facture peut être générée ;
- la numérotation est unique ;
- une facture émise est immuable ;
- un avoir peut être créé ;
- un crédit client peut être appliqué ;
- le paiement d’une facture passe par le Ledger ;
- un paiement ne peut pas être doublé ;
- les paiements échoués sont détectés ;
- les relances sont configurables ;
- la période de grâce fonctionne ;
- la suspension fonctionne ;
- la reprise fonctionne ;
- l’annulation immédiate et en fin de période fonctionne selon politique ;
- les remboursements sont audités ;
- les hausses de prix peuvent être notifiées avec préavis ;
- les notifications principales fonctionnent ;
- Jini peut expliquer sans exécuter seul une action sensible ;
- un commerçant peut gérer ses abonnements autorisés ;
- les offres Business et Enterprise sont prises en charge ;
- les rôles et permissions sont appliqués ;
- les API sont définies ;
- les Webhooks sont signés et déduplicables ;
- le Ledger reste la source financière de vérité ;
- la réconciliation détecte les écarts ;
- le reporting MRR/ARR/churn est disponible ;
- les feature flags permettent la désactivation par pays ;
- les tests fonctionnels réussissent ;
- les tests de sécurité réussissent ;
- les tests de performance réussissent ;
- les tests de résilience réussissent ;
- les audits financiers et contractuels critiques sont immuables.
