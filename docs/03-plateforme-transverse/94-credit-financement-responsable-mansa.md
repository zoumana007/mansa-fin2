# 94 — Crédit et financement responsable Mansa : éligibilité, offres partenaires, scoring explicable, échéanciers, recouvrement, conformité, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du module **Crédit et financement responsable Mansa**.

Le module doit permettre de distribuer et gérer des financements proposés par des établissements partenaires autorisés, sans que Mansa ne se présente comme prêteur lorsqu’elle ne détient pas l’agrément requis.

Il couvre : demande, éligibilité, consentement, scoring, offre, contrat, décaissement, échéancier, remboursement, retard, restructuration, recouvrement, litiges, reporting et audit.

---

## 2. Principe général

```text
Demande
→ Consentement
→ Vérifications KYC/KYB
→ Évaluation
→ Offre partenaire
→ Acceptation
→ Signature
→ Décaissement
→ Remboursements
→ Clôture
```

---

## 3. Positionnement dans Mansa

Intégrations obligatoires : Identity, KYC/KYB, Wallet, Ledger, Paiements, Budget, Épargne, Notifications, Jini, RBAC, Audit, Reporting, Feature Flags et partenaires de crédit.

---

## 4. Rôle de Mansa

Le rôle doit être configurable : apporteur, distributeur, interface technique, agent autorisé, gestionnaire de servicing ou autre rôle légalement validé.

---

## 5. Produits

- microcrédit ;
- crédit consommation ;
- financement équipement ;
- avance commerçant ;
- fonds de roulement ;
- crédit scolaire ;
- financement facture ;
- BNPL si autorisé ;
- produit partenaire personnalisé.

---

## 6. Entité CreditProduct

Elle doit contenir partenaire, pays, devise, montant min/max, durée, taux, frais, garanties, critères, règles de retard et version contractuelle.

---

## 7. Entité CreditApplication

Elle doit contenir demandeur, produit, montant, finalité, données consenties, statut, décisions, justificatifs, horodatages et audit.

---

## 8. Statuts de demande

```text
DRAFT
SUBMITTED
UNDER_REVIEW
MORE_INFO_REQUIRED
APPROVED
REJECTED
OFFERED
ACCEPTED
EXPIRED
CANCELLED
```

---

## 9. Statuts du crédit

```text
PENDING_DISBURSEMENT
ACTIVE
PAST_DUE
RESTRUCTURED
IN_COLLECTION
SETTLED
DEFAULTED
CANCELLED
UNDER_DISPUTE
```

---

## 10. Consentement données

Chaque source de données utilisée pour l’évaluation doit avoir finalité, base légale, durée de conservation et preuve de consentement lorsque nécessaire.

---

## 11. KYC/KYB

Aucune offre ne doit être activée sans niveau KYC/KYB compatible avec le produit, le montant et la réglementation locale.

---

## 12. Données d’évaluation

Peuvent être utilisées uniquement si autorisées : historique Mansa, revenus, ventes, remboursements, factures, ancienneté, comportement transactionnel et données partenaire.

---

## 13. Données interdites ou sensibles

Le moteur ne doit pas utiliser arbitrairement religion, origine, santé, opinions ou autres données protégées. Toute variable sensible doit être exclue ou juridiquement justifiée.

---

## 14. Scoring

Le scoring doit produire score, version modèle, facteurs principaux, seuil, niveau de confiance et résultat.

---

## 15. Explicabilité

Une décision défavorable doit pouvoir fournir une explication compréhensible conforme aux obligations applicables.

---

## 16. Décision humaine

Les cas à faible confiance, montants élevés ou anomalies doivent pouvoir être envoyés en revue humaine.

---

## 17. Prévention du surendettement

Le moteur doit contrôler capacité de remboursement, engagements connus, échéances et règles locales de ratio d’endettement.

---

## 18. Simulation

L’utilisateur doit pouvoir simuler montant, durée, échéance, coût total et calendrier avant engagement.

---

## 19. Transparence tarifaire

Taux, frais, pénalités, assurance éventuelle, coût total et montant net versé doivent être affichés avant acceptation.

---

## 20. Offre

Une offre doit comporter identifiant, validité, montant, durée, échéancier, taux, frais, conditions et partenaire prêteur.

---

## 21. Signature

La signature ou acceptation doit être liée à la version exacte du contrat et horodatée.

---

## 22. Décaissement

Le décaissement doit provenir d’un partenaire autorisé et passer par des écritures Ledger traçables.

---

## 23. Affectation directe

Selon produit, le financement peut être versé au Wallet, au commerçant, au fournisseur ou à une facture identifiée.

---

## 24. Échéancier

Chaque échéance doit contenir principal, intérêts, frais, taxes éventuelles, date et statut.

---

## 25. Remboursements

Moyens possibles : Wallet, Mobile Money, carte, virement, prélèvement autorisé, paiement agent ou autre rail partenaire.

---

## 26. Remboursement anticipé

Le système doit calculer le montant de clôture et appliquer uniquement les frais légalement et contractuellement prévus.

---

## 27. Paiement partiel

L’ordre d’affectation principal/intérêts/frais doit être configurable selon contrat et juridiction.

---

## 28. Retard

Un retard doit être détecté de manière déterministe et ne jamais dépendre d’un simple timeout partenaire non réconcilié.

---

## 29. Période de grâce

Une période de grâce peut être prévue avec règles claires, sans frais cachés.

---

## 30. Pénalités

Toute pénalité doit être plafonnée, contractuelle, légalement autorisée et auditable.

---

## 31. Relances

Les relances doivent être proportionnées, respectueuses, configurables et conformes aux règles de contact.

---

## 32. Difficulté financière

L’utilisateur doit pouvoir déclarer une difficulté et accéder, si disponible, à des options de restructuration ou assistance.

---

## 33. Restructuration

Toute restructuration doit créer un nouvel échéancier versionné sans réécrire l’historique.

---

## 34. Recouvrement

Le recouvrement doit appliquer procédures autorisées, journaliser les contacts et interdire harcèlement ou pratiques abusives.

---

## 35. Contentieux

Le passage au contentieux doit être réservé aux rôles autorisés et conserver preuves, notifications et historique.

---

## 36. Garanties

Les garanties éventuelles doivent être décrites explicitement et gérées selon droit local.

---

## 37. Co-emprunteurs

Le module peut gérer plusieurs parties, consentements séparés et responsabilités contractuelles.

---

## 38. Crédit commerçant

Les offres commerce peuvent utiliser ventes et flux autorisés avec règles spécifiques de confidentialité et capacité.

---

## 39. Financement facture

Une facture financée doit être authentifiée, non déjà financée et reliée à un événement de règlement.

---

## 40. Jini

Jini peut expliquer une offre et simuler des scénarios, mais ne doit jamais promettre une approbation ni accepter un crédit seul.

---

## 41. Notifications

Demande reçue, document manquant, offre disponible, échéance proche, paiement reçu, retard, restructuration et clôture.

---

## 42. API

```text
POST /credit/applications
GET /credit/applications/:id
GET /credit/offers
POST /credit/offers/:id/accept
GET /credit/loans/:id/schedule
POST /credit/loans/:id/payments
```

---

## 43. Webhooks

credit.application.updated, credit.offer.created, credit.disbursed, credit.payment.received, credit.past_due, credit.settled.

---

## 44. Idempotence

Demande, acceptation, décaissement et remboursement doivent être protégés contre les doubles traitements.

---

## 45. Ledger

Le Ledger doit distinguer principal, intérêts, frais, taxes, pénalités autorisées, remboursements et ajustements.

---

## 46. Réconciliation

Comparer Ledger, partenaire prêteur, rails de paiement, échéanciers et reversements.

---

## 47. Bureau de crédit

Toute consultation ou déclaration à un bureau de crédit doit être activée uniquement lorsqu’elle est légalement permise et contractuellement prévue.

---

## 48. Administration

Gestion produits, partenaires, limites, pays, modèles, règles de décision, relances, restructurations et exceptions.

---

## 49. RBAC

Credit Admin, Underwriter, Risk, Compliance, Collections, Support, Auditor, Partner Operator et Read Only.

---

## 50. Audit

Décisions, changements de modèle, exceptions, décaissements, restructurations et actions de recouvrement doivent être immuables.

---

## 51. Anti-fraude

Détection identité synthétique, multi-demandes, documents falsifiés, collusion commerçant, fraude remboursement et comptes compromis.

---

## 52. Reporting

Demandes, approbation, décaissements, encours, PAR, défaut, remboursement, coût du risque, restructurations et performance partenaire.

---

## 53. Monitoring modèle

Mesurer dérive, biais, taux d’erreur, stabilité des variables et performance par segment autorisé.

---

## 54. Sécurité

Chiffrement, accès minimum, secrets partenaires, isolation tenant, rate limiting et protection des documents.

---

## 55. Conservation

Les durées doivent suivre obligations crédit, lutte anti-fraude, comptabilité et protection des données par pays.

---

## 56. Feature Flags

Activation par produit, partenaire, pays, segment, canal et environnement.

---

## 57. Multi-pays

Taux, plafonds, contrats, procédures, frais, bureaux de crédit et règles de recouvrement sont localisés.

---

## 58. Multi-devises

Un contrat garde sa devise contractuelle. Toute conversion doit être explicitement exécutée et enregistrée.

---

## 59. Observabilité

Latence partenaire, décisions, files de revue, échecs décaissement, retard de réconciliation et erreurs de calcul.

---

## 60. Tests fonctionnels, sécurité, performance et résilience

Tester demande, scoring, offre, signature, décaissement, échéancier, retard, remboursement, restructuration, double événements, panne partenaire et reprise.

---

## 61. Règles métier

1. Mansa ne se présente pas comme prêteur sans agrément.
2. Le prêteur contractuel doit être clairement identifié.
3. Toute donnée de scoring doit avoir une base d’utilisation valide.
4. Les décisions doivent être versionnées et explicables.
5. Le surendettement doit être contrôlé.
6. Les coûts sont affichés avant engagement.
7. Aucune pénalité cachée n’est permise.
8. Le Ledger est la source financière de vérité.
9. Le décaissement est idempotent.
10. Le remboursement est idempotent.
11. Les contrats émis sont immuables.
12. Les restructurations conservent l’historique.
13. Les pratiques de recouvrement abusives sont interdites.
14. Les rôles sensibles sont séparés.
15. Les actions critiques sont auditées.
16. Les modèles sont monitorés.
17. Jini ne promet jamais une approbation.
18. Les règles sont configurables par pays.
19. Les feature flags sont obligatoires.
20. Les audits critiques sont immuables.

---

## 62. Ordre de développement recommandé

```text
P1-CRD-01 — Produits et demandes
P1-CRD-02 — Consentements et KYC/KYB
P1-CRD-03 — Scoring et revue humaine
P1-CRD-04 — Simulation et offres
P1-CRD-05 — Contrat et décaissement
P1-CRD-06 — Échéanciers et remboursements
P1-CRD-07 — Retards et relances
P1-CRD-08 — Restructuration et recouvrement
P1-CRD-09 — Ledger et réconciliation
P1-CRD-10 — API, Webhooks et Jini
P1-CRD-11 — Administration, risque et reporting
P1-CRD-12 — Tests de bout en bout
```

---

## 63. Critères d’acceptation finaux

Le module est validé lorsque : les produits sont configurables ; une demande complète est traçable ; les consentements sont prouvables ; KYC/KYB est appliqué ; le scoring est versionné et explicable ; une offre peut être simulée, acceptée et signée ; le décaissement passe par le Ledger ; l’échéancier est exact ; les remboursements et remboursements anticipés fonctionnent ; les retards sont détectés ; les pénalités respectent les règles ; la restructuration conserve l’historique ; le recouvrement est audité ; les API et Webhooks sont définis ; la réconciliation fonctionne ; le reporting est disponible ; les tests fonctionnels, sécurité, performance et résilience réussissent.