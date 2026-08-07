# 97 — Trésorerie et cash management Mansa : positions, prévisions, liquidité, paiements, approbations, rapprochement, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du module **Trésorerie et cash management Mansa**.

Le module doit permettre aux entreprises, commerçants structurés et organisations autorisées de centraliser la visibilité sur leurs liquidités, prévoir les besoins, préparer des paiements et piloter les flux avec contrôles renforcés.

Il couvre : comptes, positions, prévisions, cash pooling logique, réserves, paiements en lot, approbations, échéances, rapprochement, alertes, reporting et audit.

---

## 2. Principe général

```text
Connexion des comptes
→ Consolidation des positions
→ Prévisions
→ Identification des besoins
→ Préparation des mouvements
→ Approbations
→ Exécution
→ Réconciliation
→ Reporting
```

---

## 3. Positionnement dans Mansa

Intégrations : Identity, KYB, Wallet, Ledger, Paiements, Virements, Cartes, Mobile Money, Budget, Paie, Facturation, Notifications, Jini, RBAC, Audit, Reporting et Feature Flags.

---

## 4. Utilisateurs cibles

- PME ;
- groupes d’entreprises ;
- commerces multi-sites ;
- associations ;
- administrations autorisées ;
- directions financières.

---

## 5. Entité TreasuryAccount

Elle doit contenir organisation, établissement, type, devise, identifiant masqué, statut, permissions, source de solde et date de dernière synchronisation.

---

## 6. Types de comptes

Wallet Mansa, comptes bancaires connectés, comptes Mobile Money professionnels, comptes de cantonnement autorisés et comptes virtuels.

---

## 7. Position de trésorerie

La position doit distinguer disponible, réservé, engagé, en transit, bloqué et prévisionnel.

---

## 8. Statuts de synchronisation

```text
CURRENT
DELAYED
PARTIAL
UNAVAILABLE
RECONCILIATION_REQUIRED
```

---

## 9. Agrégation multi-comptes

Le module doit consolider sans fusionner juridiquement les soldes de comptes distincts.

---

## 10. Multi-devises

Les soldes d’origine restent inchangés ; la consolidation utilise une devise de reporting avec taux horodatés.

---

## 11. Prévision de trésorerie

Elle doit intégrer factures clients/fournisseurs, paie, taxes, loyers, abonnements, paiements planifiés et historique.

---

## 12. Horizons

7 jours, 30 jours, 90 jours, 12 mois et horizon personnalisé.

---

## 13. Scénarios

Prudent, central, optimiste et personnalisé sans générer de mouvements financiers.

---

## 14. Encaissements attendus

Chaque encaissement attendu doit avoir source, montant, date, probabilité et statut de rapprochement.

---

## 15. Décaissements attendus

Fournisseurs, paie, fiscalité, loyers, dette, investissements et dépenses récurrentes.

---

## 16. Réserves

L’organisation peut définir un minimum de liquidité à préserver par compte, entité ou devise.

---

## 17. Seuils d’alerte

Alertes de solde bas, pic de décaissement, concentration bancaire, retard d’encaissement ou écart de prévision.

---

## 18. Cash pooling logique

Le module peut suggérer une centralisation ou réallocation, mais tout mouvement réel nécessite instruction et permissions appropriées.

---

## 19. Virements internes

Transferts entre comptes de la même organisation avec justification, approbation et Ledger.

---

## 20. Paiements fournisseurs

Préparation manuelle, importée ou issue d’une facture validée avec contrôles du bénéficiaire.

---

## 21. Paiements en lot

Les batches doivent être idempotents et exposer le statut de chaque ligne.

---

## 22. Bénéficiaires

Nom, coordonnées, vérification, historique, statut, pays, devise et niveau de confiance.

---

## 23. Nouveau bénéficiaire

Un nouveau bénéficiaire peut déclencher délai de sécurité, MFA et approbation renforcée.

---

## 24. Approbations

Circuits configurables par montant, devise, entité, compte, bénéficiaire, urgence et type de paiement.

---

## 25. Double contrôle

Les paiements sensibles peuvent exiger maker-checker ou plusieurs approbateurs distincts.

---

## 26. Délégations

Toute délégation doit avoir périmètre, plafond, période de validité et audit.

---

## 27. Calendrier de paiements

Le système doit afficher échéances, paiements préparés, approuvés, programmés et exécutés.

---

## 28. Paiement programmé

Une instruction future doit être modifiable jusqu’au point de verrouillage défini.

---

## 29. Paiement urgent

Les flux urgents doivent être identifiés séparément et peuvent exiger des contrôles renforcés.

---

## 30. Ledger

Le Ledger reste la source interne de vérité pour tous les mouvements Mansa.

---

## 31. Réconciliation bancaire

Comparer transactions importées, écritures Mansa, paiements initiés et références partenaires.

---

## 32. Matching automatique

Rapprochement par montant, date, référence, bénéficiaire, facture et tolérance configurable.

---

## 33. Matching manuel

Toute action manuelle doit conserver auteur, justification et historique.

---

## 34. Écarts

Les écarts doivent générer statut, propriétaire de traitement, commentaire et résolution.

---

## 35. Cash concentration

Le reporting doit montrer la concentration des liquidités par établissement, pays, devise et entité.

---

## 36. Risque de liquidité

Jini ou le moteur peut signaler une tension prévisionnelle sans la présenter comme certaine.

---

## 37. Jini

Jini peut expliquer positions, prévisions et anomalies, proposer des scénarios, mais ne doit jamais exécuter seul un virement.

---

## 38. Notifications

Solde critique, paiement à approuver, échec, bénéficiaire ajouté, écart de rapprochement, prévision négative et compte indisponible.

---

## 39. Dashboard

Positions, courbe prévisionnelle, top flux, échéances, alertes, paiements en attente et écarts.

---

## 40. Centres de coût

Les paiements et prévisions peuvent être rattachés à département, projet, site ou centre de coût.

---

## 41. Multi-entités

Un groupe peut consulter plusieurs entités sans mélanger leurs droits ni leurs fonds.

---

## 42. API

```text
GET /treasury/positions
GET /treasury/forecast
POST /treasury/payments
POST /treasury/payment-batches
POST /treasury/payments/:id/approve
GET /treasury/reconciliation
```

---

## 43. Webhooks

 treasury.position.updated, treasury.payment.approval_required, treasury.payment.succeeded, treasury.payment.failed, treasury.reconciliation.mismatch.

---

## 44. Idempotence

Paiements, batches, imports et événements de rapprochement doivent être déduplicables.

---

## 45. Imports

CSV, XLSX, formats bancaires et API selon partenaires, avec validation stricte avant traitement.

---

## 46. Exports

Positions, prévisions, paiements, rapprochements et journaux selon permissions.

---

## 47. Administration organisation

Comptes, approbations, limites, bénéficiaires, délégations, centres de coût et règles d’alerte.

---

## 48. Administration centrale

Gestion connecteurs, pays, feature flags, incidents et support restreint.

---

## 49. RBAC

Treasury Admin, Preparer, Approver, CFO, Accountant, Auditor, Viewer et Support Restricted.

---

## 50. Audit

Ajout de compte, bénéficiaire, délégation, modification de limite, approbation et paiement doivent être audités.

---

## 51. Anti-fraude

Détection bénéficiaire substitué, paiement inhabituel, changement de compte, contournement de seuil, fraude interne et compte compromis.

---

## 52. Reporting

Liquidité, cash burn, prévisions, paiements, écarts, délais d’approbation, concentration et disponibilité des fonds.

---

## 53. Sécurité

MFA renforcé, contrôle réseau/appareil, chiffrement, séparation tenant, secrets et rate limiting.

---

## 54. Conservation

Durées selon comptabilité, audit, réglementation et politique d’entreprise.

---

## 55. Feature Flags

Activation par organisation, pays, compte, type de paiement, connecteur et devise.

---

## 56. Multi-pays

Formats, jours ouvrés, rails, règles bancaires, devises et documents varient par pays.

---

## 57. Performance

Support de volumes élevés de comptes, transactions et batches avec agrégations incrémentales.

---

## 58. Observabilité

Latence des soldes, retard de synchronisation, erreurs de paiement, files d’approbation et écarts.

---

## 59. Résilience

Une panne partenaire ne doit pas entraîner double paiement ni perte d’état de rapprochement.

---

## 60. Tests fonctionnels, sécurité, performance et résilience

Tester agrégation, prévisions, approbations, bénéficiaires, batches, réconciliation, multi-entités, panne, doublons et reprise.

---

## 61. Règles métier

1. Les comptes restent juridiquement distincts.
2. Le Ledger reste la source de vérité des mouvements Mansa.
3. Les positions externes indiquent leur fraîcheur.
4. Les conversions de reporting sont indicatives.
5. Tout paiement exige permissions valides.
6. Les nouveaux bénéficiaires sont contrôlés.
7. Les batches sont idempotents.
8. Les succès ne sont jamais rejoués.
9. Les approbations respectent les seuils.
10. Les délégations expirent automatiquement.
11. Les fonds réservés ne sont pas présentés comme disponibles.
12. Les prévisions sont identifiées comme estimations.
13. Les écarts sont traçables.
14. Jini n’exécute pas seul un paiement.
15. Les multi-entités restent isolées.
16. Les exports sensibles sont contrôlés.
17. Les règles sont configurables par pays.
18. Les feature flags sont obligatoires.
19. Les audits critiques sont immuables.
20. Les actions sensibles utilisent une authentification renforcée.

---

## 62. Ordre de développement recommandé

```text
P1-TRY-01 — Comptes et positions
P1-TRY-02 — Agrégation multi-comptes
P1-TRY-03 — Prévisions et scénarios
P1-TRY-04 — Bénéficiaires
P1-TRY-05 — Paiements et batches
P1-TRY-06 — Approbations et délégations
P1-TRY-07 — Réconciliation
P1-TRY-08 — Multi-entités et centres de coût
P1-TRY-09 — Jini et alertes
P1-TRY-10 — API, imports et Webhooks
P1-TRY-11 — Administration, sécurité et reporting
P1-TRY-12 — Tests de bout en bout
```

---

## 63. Critères d’acceptation finaux

Le module est validé lorsque : plusieurs comptes peuvent être agrégés ; la fraîcheur est visible ; les positions distinguent disponible et réservé ; les prévisions fonctionnent ; les scénarios sont simulables ; les bénéficiaires sont contrôlés ; les approbations sont configurables ; les batches sont idempotents ; le rapprochement détecte les écarts ; les multi-entités restent isolées ; Jini conseille sans exécuter seul ; RBAC et audits sont appliqués ; les tests fonctionnels, sécurité, performance et résilience réussissent.