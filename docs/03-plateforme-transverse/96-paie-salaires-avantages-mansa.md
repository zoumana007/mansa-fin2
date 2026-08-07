# 96 — Paie, salaires et avantages Mansa : préparation, validation, versements, retenues, bulletins, conformité, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du module **Paie, salaires et avantages Mansa**.

Le module doit permettre aux entreprises et organisations autorisées de préparer, valider, exécuter et tracer des paiements de salaires et avantages, sans remplacer les obligations légales, fiscales ou sociales propres à chaque pays.

Il couvre : employés, contrats, périodes de paie, éléments variables, retenues, avantages, validations, versements, bulletins, régularisations, exports, reporting et audit.

---

## 2. Principe général

```text
Import ou création des employés
→ Définition de la période
→ Calcul des éléments
→ Contrôles
→ Approbations
→ Génération du fichier de paie
→ Versements
→ Bulletins
→ Réconciliation
→ Clôture
```

---

## 3. Positionnement dans Mansa

Intégrations : Identity, KYC/KYB, Wallet, Ledger, Paiements, Virements, Mobile Money, Cartes, Notifications, Documents, RBAC, Audit, Reporting, Feature Flags et partenaires RH/comptables.

---

## 4. Utilisateurs cibles

- PME ;
- grandes entreprises ;
- administrations autorisées ;
- associations ;
- cabinets de paie autorisés ;
- indépendants employeurs.

---

## 5. Entité Employee

Elle doit contenir identifiant interne, identité, coordonnées de paiement, statut, établissement, centre de coût, date d’entrée, type de contrat et métadonnées minimales.

---

## 6. Entité PayrollProfile

Le profil doit définir devise, fréquence, salaire de base, mode de paiement, retenues autorisées, avantages, règles d’arrondi et historique de version.

---

## 7. Périodes de paie

- hebdomadaire ;
- bimensuelle ;
- mensuelle ;
- trimestrielle pour cas spécifiques ;
- exceptionnelle ;
- personnalisée selon réglementation.

---

## 8. Statuts de période

```text
DRAFT
CALCULATING
READY_FOR_REVIEW
APPROVAL_PENDING
APPROVED
PAYMENT_PENDING
PARTIALLY_PAID
PAID
RECONCILED
CLOSED
CANCELLED
```

---

## 9. Salaire fixe

Le système doit gérer salaire de base, prorata d’entrée/sortie, absence selon règles fournies et modification versionnée.

---

## 10. Éléments variables

Primes, heures supplémentaires, commissions, indemnités, bonus, rappels et autres éléments doivent être importables ou saisis avec justification.

---

## 11. Retenues

Retenues fiscales, sociales, avances, prêts employeur ou autres ne peuvent être appliquées que selon règles validées et autorisées.

---

## 12. Avantages

Le module peut gérer transport, repas, téléphone, assurance, logement, bonus et avantages personnalisés.

---

## 13. Net à payer

Le net doit être calculé à partir d’éléments versionnés et explicables, sans modification manuelle silencieuse après approbation.

---

## 14. Multi-devises

La devise contractuelle de paie doit être conservée. Toute conversion réelle doit être explicitement exécutée et horodatée.

---

## 15. Coordonnées de paiement

Wallet Mansa, compte bancaire, Mobile Money ou autre rail autorisé, avec validation de propriété lorsque disponible.

---

## 16. Plusieurs moyens de paiement

Une entreprise peut répartir le net entre plusieurs destinations uniquement si cette fonctionnalité est autorisée et consentie.

---

## 17. Préfinancement

Avant lancement, le moteur doit vérifier que les fonds disponibles et réservés couvrent salaires, frais et obligations associées.

---

## 18. Réservation de fonds

Les montants approuvés peuvent être réservés dans le Ledger jusqu’à exécution ou annulation contrôlée.

---

## 19. Approbations

Les circuits peuvent exiger HR → Finance → Direction, double validation ou seuils selon montant et organisation.

---

## 20. Séparation des pouvoirs

La personne qui prépare ne doit pas nécessairement pouvoir approuver et payer seule. Les règles sont configurables par organisation.

---

## 21. Verrouillage

Après approbation finale, les lignes sont verrouillées. Toute correction crée une nouvelle version ou régularisation.

---

## 22. Paiement en lot

Les versements doivent utiliser un batch idempotent avec état global et état individuel par salarié.

---

## 23. Paiement partiel du lot

Le système doit distinguer salariés payés, en attente et échoués sans relancer les paiements déjà confirmés.

---

## 24. Rejeu contrôlé

Seules les lignes en échec peuvent être rejouées avec clé idempotente et audit.

---

## 25. Ledger

Le Ledger doit distinguer réservation, débit employeur, crédit salarié, frais, taxes éventuelles et annulations.

---

## 26. Réconciliation

Comparer batch, Ledger, partenaires bancaires/Mobile Money, retours d’état et comptes de financement.

---

## 27. Bulletin de paie

Le système peut produire ou intégrer un bulletin conforme aux règles locales lorsque cette fonctionnalité est juridiquement validée.

---

## 28. Contenu du bulletin

Employeur, salarié, période, brut, éléments, retenues, net, devise, date de paiement et mentions obligatoires configurables.

---

## 29. Distribution des bulletins

Portail sécurisé, téléchargement, e-mail chiffré/contrôlé ou autre canal autorisé ; aucun bulletin ne doit être exposé publiquement.

---

## 30. Régularisations

Correction positive ou négative avec motif, période d’origine, approbation et écriture distincte.

---

## 31. Avances sur salaire

Une avance doit être un module distinct ou une fonctionnalité encadrée, avec montant, remboursement et consentement explicites.

---

## 32. Saisie-arrêt et retenues judiciaires

Uniquement sur base légale vérifiée, avec droits restreints, confidentialité renforcée et audit.

---

## 33. Départs employés

Le système doit gérer solde de tout compte, dernière période, désactivation d’accès et conservation réglementaire.

---

## 34. Nouveaux employés

Le parcours doit contrôler identité, méthode de paiement, date d’effet et approbations avant inclusion.

---

## 35. Import CSV/XLSX

Les imports doivent valider format, doublons, identifiants, montants, devise et écarts anormaux avant ingestion.

---

## 36. API RH

Connecteurs possibles avec SIRH/ERP pour employés, variables, centres de coût, statuts et exports.

---

## 37. Jini

Jini peut expliquer une anomalie ou un bulletin, mais ne doit pas modifier une paie approuvée ni déclencher seul un paiement.

---

## 38. Détection d’anomalies

Salaires doublés, hausse inhabituelle, nouveau bénéficiaire, montant extrême, salarié inactif ou changement de coordonnées récent.

---

## 39. Notifications employeur

Période prête, anomalie, approbation requise, fonds insuffisants, lot terminé, paiement en échec et réconciliation incomplète.

---

## 40. Notifications salarié

Paiement reçu, bulletin disponible, changement autorisé de méthode de paiement et incident affectant son versement.

---

## 41. Portail employé

Consultation des paiements, bulletins, coordonnées de paiement et demandes autorisées, avec visibilité strictement personnelle.

---

## 42. API

```text
POST /payroll/runs
GET /payroll/runs/:id
POST /payroll/runs/:id/calculate
POST /payroll/runs/:id/approve
POST /payroll/runs/:id/pay
GET /payroll/employees/:id/payslips
```

---

## 43. Webhooks

payroll.run.ready, payroll.run.approved, payroll.payment.succeeded, payroll.payment.failed, payroll.run.reconciled.

---

## 44. Idempotence

Création de lot, paiement individuel, reprise et régularisation doivent être déduplicables.

---

## 45. Confidentialité

Les données de rémunération sont accessibles uniquement aux personnes habilitées et jamais visibles entre salariés.

---

## 46. Administration organisation

Gestion périodes, règles, rôles, circuits d’approbation, centres de coût, modèles d’import et connecteurs.

---

## 47. Administration centrale

Support technique sans accès systématique au détail salarial ; accès exceptionnel journalisé et limité.

---

## 48. RBAC

Payroll Preparer, HR Admin, Finance Approver, Payment Approver, Auditor, Employee, Support Restricted et Super Admin.

---

## 49. Audit

Changement de salaire, coordonnées de paiement, variables, approbation, paiement, export et accès sensible doivent être audités.

---

## 50. Anti-fraude

Détection de bénéficiaire substitué, compte mule, employé fictif, double paie, modification tardive et collusion interne.

---

## 51. Reporting

Masse salariale, net payé, taux d’échec, délais, coût par centre, variations, effectifs payés et réconciliation.

---

## 52. Exports

CSV, XLSX, PDF, formats comptables et fichiers réglementaires uniquement après validation locale.

---

## 53. Conformité

Fiscalité, droit du travail, obligations sociales, protection des données et règles de paiement sont configurées par pays.

---

## 54. Sécurité

MFA renforcé pour approbateurs, chiffrement, rate limiting, séparation tenant, secrets et restrictions d’export.

---

## 55. Conservation

Durées configurables selon obligations de paie, comptabilité, fiscalité et droit du travail.

---

## 56. Feature Flags

Activation par pays, organisation, méthode de paiement, type de bulletin et connecteur.

---

## 57. Multi-pays

Chaque pays possède ses règles de calcul, documents, retenues, formats et calendriers propres.

---

## 58. Performance

Support de dizaines de milliers de salariés par lot, traitement parallèle contrôlé et reprise sans double paiement.

---

## 59. Observabilité

Suivre calculs, approbations, files de paiement, erreurs partenaires, écarts et temps de clôture.

---

## 60. Tests fonctionnels, sécurité, performance et résilience

Tester import, calcul, approbation, verrouillage, fonds insuffisants, paiement lot, échecs partiels, rejeu, bulletins, RBAC et panne partenaire.

---

## 61. Règles métier

1. Une paie approuvée est verrouillée.
2. Toute correction crée une trace distincte.
3. Le Ledger est la source financière de vérité.
4. Les paiements sont idempotents.
5. Les fonds doivent être disponibles avant exécution.
6. Les données salariales sont strictement privées.
7. Les approbations respectent la séparation des pouvoirs.
8. Les nouveaux bénéficiaires sont contrôlés.
9. Les lots partiels ne rejouent pas les succès.
10. Les bulletins émis sont versionnés.
11. Les retenues doivent être autorisées.
12. Les conversions FX sont explicites.
13. Jini n’exécute pas seul une paie.
14. Les imports sont validés avant calcul.
15. Les exports sensibles sont contrôlés.
16. Les anomalies sont signalées avant paiement.
17. Les règles sont localisées par pays.
18. Les feature flags sont obligatoires.
19. Les audits critiques sont immuables.
20. Une organisation ne voit jamais les données d’une autre.

---

## 62. Ordre de développement recommandé

```text
P1-PAY-01 — Employés et profils de paie
P1-PAY-02 — Périodes et éléments
P1-PAY-03 — Calculs et contrôles
P1-PAY-04 — Approbations et verrouillage
P1-PAY-05 — Réservation de fonds
P1-PAY-06 — Paiements en lot
P1-PAY-07 — Réconciliation et rejeu
P1-PAY-08 — Bulletins et régularisations
P1-PAY-09 — Imports et connecteurs RH
P1-PAY-10 — Jini, alertes et anti-fraude
P1-PAY-11 — Administration et reporting
P1-PAY-12 — Tests de bout en bout
```

---

## 63. Critères d’acceptation finaux

Le module est validé lorsque : les employés peuvent être importés ; une période peut être calculée ; les variables et retenues sont traçables ; les approbations fonctionnent ; une paie approuvée est verrouillée ; les fonds sont réservables ; le paiement en lot est idempotent ; les échecs partiels sont rejouables sans doublon ; les bulletins sont privés ; les régularisations conservent l’historique ; RBAC et audits sont appliqués ; la réconciliation est disponible ; les tests fonctionnels, sécurité, performance et résilience réussissent.