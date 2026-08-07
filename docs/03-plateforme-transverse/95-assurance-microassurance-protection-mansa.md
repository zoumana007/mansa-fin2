# 95 — Assurance, microassurance et protection Mansa : offres partenaires, souscription, primes, sinistres, indemnisation, conformité, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du module **Assurance, microassurance et protection Mansa**.

Le module doit permettre de distribuer et administrer des produits d’assurance fournis par des assureurs ou intermédiaires autorisés, sans présenter Mansa comme assureur lorsqu’elle ne détient pas l’agrément requis.

Il couvre : catalogue, éligibilité, devis, consentement, souscription, primes, renouvellement, attestations, sinistres, pièces justificatives, expertise, indemnisation, résiliation, conformité, fraude et reporting.

---

## 2. Principe général

```text
Choix d’une protection
→ Devis
→ Informations et consentements
→ Vérifications
→ Souscription partenaire
→ Paiement de prime
→ Émission de preuve
→ Vie du contrat
→ Déclaration de sinistre éventuelle
→ Décision partenaire
→ Indemnisation ou clôture
```

---

## 3. Positionnement dans Mansa

Intégrations : Identity, KYC/KYB, Wallet, Ledger, Paiements, Abonnements, Notifications, Documents, Jini, RBAC, Audit, Reporting, Feature Flags et partenaires assureurs.

---

## 4. Rôle de Mansa

Le rôle juridique doit être configurable et affiché : distributeur, apporteur, courtier partenaire, interface technique, collecteur de prime autorisé ou autre rôle validé.

---

## 5. Catégories de produits

- accident ;
- santé complémentaire si autorisée ;
- mobile/appareil ;
- voyage ;
- véhicule ;
- habitation ;
- commerce ;
- récolte/agriculture ;
- décès/obsèques si autorisé ;
- protection paiement ;
- produit partenaire personnalisé.

---

## 6. Entité InsuranceProduct

Elle doit contenir assureur, pays, garanties, exclusions, plafonds, franchise, prime, fréquence, âge/segment, documents, durée, renouvellement et version contractuelle.

---

## 7. Entité Quote

Un devis contient produit, assuré, réponses de tarification, prime, taxes, durée de validité, garanties et exclusions applicables.

---

## 8. Entité Policy

Une police contient assureur, assuré, bénéficiaires éventuels, garanties, prime, dates, statut, numéro de contrat, documents et historique.

---

## 9. Statuts de police

```text
DRAFT
PENDING_PAYMENT
ACTIVE
GRACE_PERIOD
SUSPENDED
CANCEL_AT_END
CANCELLED
EXPIRED
CLAIM_OPEN
TERMINATED
```

---

## 10. Éligibilité

Les critères doivent être fournis ou validés par le partenaire : pays, âge, activité, montant assuré, type de bien, KYC et exclusions réglementaires.

---

## 11. Questionnaire

Les questions de souscription doivent être versionnées, minimisées et limitées aux informations nécessaires au produit.

---

## 12. Données sensibles

Les données de santé ou autres données sensibles ne doivent être collectées que lorsqu’elles sont strictement nécessaires, légalement permises et protégées avec un niveau renforcé.

---

## 13. Devis

Le devis doit distinguer prime nette, taxes, frais autorisés, fréquence et coût total sur la période.

---

## 14. Garanties

Chaque garantie doit avoir libellé, événement couvert, plafond, franchise, délai de carence éventuel et conditions.

---

## 15. Exclusions

Les exclusions doivent être visibles avant souscription et accessibles après souscription.

---

## 16. Consentement

L’acceptation doit être liée à la version exacte du produit, des conditions et des notices remises.

---

## 17. Paiement de prime

Moyens : Wallet, Mobile Money, carte, virement, prélèvement autorisé et autres rails partenaires selon pays.

---

## 18. Prime récurrente

Les paiements récurrents doivent utiliser le module Abonnements et respecter mandat, consentement et règles de relance.

---

## 19. Ledger

Le Ledger doit distinguer prime, taxe, commission autorisée, part assureur, remboursement de prime et indemnisation transitant éventuellement par Mansa.

---

## 20. Activation

Une police ne devient ACTIVE qu’après confirmation du partenaire et, lorsque requis, confirmation de paiement.

---

## 21. Attestation

Le système doit permettre de consulter et télécharger une preuve de couverture authentifiable.

---

## 22. Renouvellement

Le renouvellement automatique doit être explicitement autorisé et respecter les préavis de changement de tarif ou garanties.

---

## 23. Période de grâce

Une période de grâce ne peut être appliquée que si le produit partenaire le prévoit et doit indiquer précisément l’état de couverture.

---

## 24. Résiliation

L’utilisateur doit pouvoir demander la résiliation selon les règles légales et contractuelles, avec date d’effet visible.

---

## 25. Remboursement de prime

Toute restitution doit suivre les règles du partenaire et être comptabilisée dans le Ledger.

---

## 26. Déclaration de sinistre

Le parcours doit permettre type de sinistre, date, lieu, description, montant estimé, pièces et coordonnées utiles.

---

## 27. Statuts de sinistre

```text
DRAFT
SUBMITTED
UNDER_REVIEW
MORE_INFO_REQUIRED
ASSESSMENT
APPROVED
PARTIALLY_APPROVED
REJECTED
PAYMENT_PENDING
PAID
CLOSED
DISPUTED
```

---

## 28. Pièces justificatives

Photos, factures, constats, attestations et documents doivent être chiffrés, horodatés, contrôlés et conservés selon politique.

---

## 29. Upload faible réseau

Le module doit supporter reprise d’upload, compression contrôlée, brouillon local sécurisé et synchronisation ultérieure.

---

## 30. Expertise

Une expertise peut être demandée par le partenaire et son statut doit être visible sans exposer des données internes non nécessaires.

---

## 31. Décision

La décision finale relève du partenaire habilité. Mansa ne doit pas présenter une estimation comme une décision contractuelle.

---

## 32. Indemnisation

L’indemnisation peut être versée vers Wallet, compte bancaire, Mobile Money, bénéficiaire ou prestataire selon contrat et partenaire.

---

## 33. Paiement direct prestataire

Pour réparation ou soins autorisés, le partenaire peut payer directement un prestataire identifié.

---

## 34. Bénéficiaires

Les bénéficiaires éventuels doivent être gérés avec identité, relation, quote-part et règles de modification.

---

## 35. Litige

Le client doit pouvoir contester une décision, fournir des pièces et suivre l’escalade vers le partenaire ou médiateur compétent.

---

## 36. Anti-fraude sinistre

Détection : doublons, documents manipulés, sinistres incohérents, collusion, multi-déclarations et appareils compromis.

---

## 37. Anti-fraude souscription

Détection identité multiple, fausse déclaration, bien déjà couvert de manière incompatible et moyens de paiement compromis.

---

## 38. Jini

Jini peut expliquer garanties, exclusions et étapes d’un sinistre, sans conclure seul qu’un sinistre sera indemnisé.

---

## 39. Notifications

Devis, activation, prime à venir, paiement échoué, renouvellement, fin de couverture, pièce manquante, décision de sinistre et paiement.

---

## 40. Portail client

Afficher contrats, garanties, attestations, échéances, primes, sinistres, documents et contacts utiles.

---

## 41. Portail Commerce/Entreprise

Gérer contrats professionnels, biens assurés, salariés couverts si applicable, factures et sinistres avec RBAC.

---

## 42. API

```text
GET /insurance/products
POST /insurance/quotes
POST /insurance/policies
GET /insurance/policies/:id
POST /insurance/claims
GET /insurance/claims/:id
POST /insurance/claims/:id/documents
```

---

## 43. Webhooks

insurance.policy.activated, insurance.payment.failed, insurance.policy.renewed, insurance.claim.updated, insurance.claim.approved, insurance.claim.paid.

---

## 44. Idempotence

Souscription, paiement de prime, création de sinistre et indemnisation doivent être déduplicables.

---

## 45. Réconciliation

Comparer primes, Ledger, partenaire assureur, commissions, remboursements et indemnisations.

---

## 46. Documents contractuels

Les documents émis doivent être versionnés, immuables après émission et liés au contrat exact.

---

## 47. Administration

Gérer partenaires, produits, pays, garanties, commissions, documents, relances, sinistres et feature flags selon permissions.

---

## 48. RBAC

Insurance Admin, Partner Operator, Claims Agent, Risk, Compliance, Finance, Support, Auditor et Read Only.

---

## 49. Audit

Souscription, modification bénéficiaire, résiliation, décision de sinistre, paiement et action admin doivent être audités.

---

## 50. Reporting

Polices actives, primes, renouvellement, sinistres, fréquence, sévérité, délai de traitement, indemnisations, résiliations et performance partenaire.

---

## 51. Conformité

Le module doit intégrer obligations d’information, devoir de conseil éventuel, distribution, sanctions, AML/CFT lorsque pertinent et protection des données.

---

## 52. Sécurité

Chiffrement fort, accès minimum, protection documents, secrets partenaires, isolation tenant et journaux d’accès sensibles.

---

## 53. Conservation

Durées spécifiques par police, sinistre, comptabilité, fraude et réglementation locale.

---

## 54. Feature Flags

Activation par produit, partenaire, pays, canal, segment et environnement.

---

## 55. Multi-pays

Contrats, taxes, garanties, exclusions, langues, autorités et procédures doivent être localisés.

---

## 56. Multi-devises

Prime et indemnité gardent leur devise contractuelle ; toute conversion réelle doit être explicite et Ledgerisée.

---

## 57. Accessibilité

Les garanties et exclusions doivent être lisibles, structurées et disponibles en langage compréhensible.

---

## 58. Observabilité

Suivre latence partenaires, souscriptions en attente, paiements, uploads, sinistres bloqués et écarts de réconciliation.

---

## 59. Résilience

Panne partenaire, réseau faible et Webhooks dupliqués ne doivent créer ni double police ni double indemnisation.

---

## 60. Tests fonctionnels, sécurité, performance et résilience

Tester devis, souscription, paiement, activation, renouvellement, résiliation, sinistre, upload, décision, indemnisation, doublons, panne et reprise.

---

## 61. Règles métier

1. Mansa ne se présente pas comme assureur sans agrément.
2. L’assureur contractuel est clairement identifié.
3. Garanties et exclusions sont visibles avant souscription.
4. Les questionnaires sont versionnés.
5. Les données sensibles sont minimisées.
6. Une police active exige confirmation fiable.
7. Les primes passent par le Ledger lorsqu’elles transitent par Mansa.
8. Le renouvellement automatique exige consentement valide.
9. Les sinistres sont idempotents.
10. Les décisions contractuelles viennent du partenaire habilité.
11. Jini ne promet pas d’indemnisation.
12. Les documents émis sont immuables.
13. Les indemnisations sont réconciliées.
14. Les commissions sont transparentes et auditables.
15. Les permissions sont appliquées.
16. Les actions critiques sont auditées.
17. Les feature flags sont obligatoires.
18. Les règles sont localisées par pays.
19. Les tests de fraude sont continus.
20. Les audits critiques sont immuables.

---

## 62. Ordre de développement recommandé

```text
P1-INS-01 — Produits et devis
P1-INS-02 — Éligibilité et consentements
P1-INS-03 — Souscription et documents
P1-INS-04 — Primes et Ledger
P1-INS-05 — Renouvellement et résiliation
P1-INS-06 — Déclaration de sinistre
P1-INS-07 — Documents et expertise
P1-INS-08 — Décision et indemnisation
P1-INS-09 — Anti-fraude et conformité
P1-INS-10 — API, Webhooks et Jini
P1-INS-11 — Administration et reporting
P1-INS-12 — Tests de bout en bout
```

---

## 63. Critères d’acceptation finaux

Le module est validé lorsque : les produits partenaires sont configurables ; un devis est calculé et versionné ; garanties et exclusions sont affichées ; la souscription conserve les consentements ; la prime est encaissée et réconciliée ; une attestation est disponible ; renouvellement et résiliation respectent les règles ; un sinistre peut être déclaré avec pièces ; la décision partenaire est tracée ; l’indemnisation est idempotente ; Jini explique sans promettre ; API et Webhooks sont définis ; RBAC et audits sont appliqués ; les tests fonctionnels, sécurité, performance et résilience réussissent.