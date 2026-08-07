# 99 — Séquestre, escrow et paiements conditionnels Mansa : réservation, jalons, libération, litiges, conformité, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du module **Séquestre, escrow et paiements conditionnels Mansa**.

Le module doit permettre de sécuriser des paiements entre plusieurs parties en réservant des fonds jusqu’à la réalisation de conditions explicites, sans présenter Mansa comme dépositaire ou séquestre réglementé lorsqu’elle ne dispose pas du cadre juridique requis.

Il couvre : création d’accord, parties, conditions, réservation, jalons, preuves, validation, libération, remboursement, expiration, litige, arbitrage, Ledger, conformité, administration et reporting.

---

## 2. Principe général

```text
Création de l’accord
→ Définition des parties et conditions
→ Acceptation
→ Réservation des fonds
→ Exécution du service ou livraison
→ Preuves
→ Validation des conditions
→ Libération ou remboursement
→ Réconciliation
→ Clôture
```

---

## 3. Positionnement dans Mansa

Intégrations : Identity, KYC/KYB, Wallet, Ledger, Paiements, Commerce, Marketplace, Litiges, Notifications, Documents, Jini, RBAC, Audit, Reporting et Feature Flags.

---

## 4. Rôle juridique de Mansa

Le modèle opérationnel doit être configurable selon pays et partenaire : simple orchestration technique, compte de cantonnement partenaire, séquestre tiers ou autre mécanisme légalement validé.

---

## 5. Cas d’usage

- marketplace ;
- vente de biens ;
- prestations de service ;
- réservation ;
- travaux ;
- freelance ;
- commerce B2B ;
- acompte ;
- paiement par jalons ;
- livraison contre paiement ;
- transaction personnalisée autorisée.

---

## 6. Entité EscrowAgreement

Elle doit contenir parties, montant, devise, objet, conditions, échéances, frais, règles de remboursement, litige, statut, documents, consentements et audit.

---

## 7. Parties

Rôles possibles : payeur, bénéficiaire, vendeur, acheteur, prestataire, donneur d’ordre, approbateur, arbitre autorisé et plateforme.

---

## 8. Statuts

```text
DRAFT
PENDING_ACCEPTANCE
PENDING_FUNDING
FUNDED
IN_PROGRESS
MILESTONE_REVIEW
RELEASE_PENDING
PARTIALLY_RELEASED
RELEASED
REFUND_PENDING
REFUNDED
EXPIRED
DISPUTED
CANCELLED
CLOSED
```

---

## 9. Création de l’accord

L’accord doit préciser objet, parties, montant, conditions, délais, preuves requises, mécanisme de décision, frais et procédure de litige.

---

## 10. Acceptation

Chaque partie contractuelle doit accepter la version exacte de l’accord avec horodatage et preuve.

---

## 11. KYC/KYB

Le niveau de vérification doit dépendre du montant, du pays, du type de transaction et du profil des parties.

---

## 12. Financement

Le financement peut provenir de Wallet, banque, Mobile Money, carte ou autre rail autorisé.

---

## 13. Réservation des fonds

Les fonds doivent être réservés ou transférés vers le mécanisme partenaire approprié, jamais simulés par un simple champ applicatif.

---

## 14. Ledger

Le Ledger doit distinguer disponible, réservé, fonds sous condition, frais, libération, remboursement et ajustement.

---

## 15. Confirmation de financement

L’accord ne devient FUNDED qu’après confirmation financière fiable et réconciliation suffisante.

---

## 16. Conditions

Types : livraison, validation manuelle, date, document, jalon, quantité, approbation multiple ou événement partenaire.

---

## 17. Conditions interdites

Aucune condition illégale, non vérifiable, discriminatoire ou incompatible avec la politique Mansa ne doit être acceptée.

---

## 18. Jalons

Un accord peut contenir plusieurs jalons avec montant ou pourcentage, date cible, preuves et approbateurs.

---

## 19. Libération partielle

Une partie des fonds peut être libérée après validation d’un jalon sans fermer l’accord complet.

---

## 20. Preuves

Documents, photos, bons de livraison, signatures, factures, données logistiques et événements partenaires doivent être horodatés.

---

## 21. Intégrité des preuves

Les preuves critiques doivent conserver hash, source, auteur et transformations éventuelles.

---

## 22. Validation acheteur

L’acheteur peut accepter, refuser avec motif ou demander une correction pendant le délai prévu.

---

## 23. Validation automatique

Une libération automatique n’est permise que si la condition est objectivement vérifiable, explicitement acceptée et juridiquement valable.

---

## 24. Délai de validation

Le système doit afficher une date limite avant toute libération automatique éventuelle.

---

## 25. Double approbation

Les montants élevés ou contrats B2B peuvent exiger plusieurs approbateurs.

---

## 26. Livraison

Un événement de livraison doit contenir source, référence, date, statut et preuve exploitable.

---

## 27. Service

Pour une prestation, le bénéficiaire peut déposer livrable, rapport, facture ou autre preuve définie.

---

## 28. Expiration

Si les conditions ne sont pas remplies avant échéance, le système applique la règle prévue : prolongation, remboursement, revue ou litige.

---

## 29. Prolongation

Toute prolongation doit être acceptée selon les règles de l’accord et versionnée.

---

## 30. Annulation avant financement

Possible selon règles sans écriture financière définitive.

---

## 31. Annulation après financement

Elle doit déclencher remboursement ou décision selon contrat et permissions.

---

## 32. Remboursement

Le remboursement total ou partiel doit être idempotent, Ledgerisé et réconcilié.

---

## 33. Frais

Frais plateforme, paiement, partenaire et arbitrage doivent être affichés avant acceptation.

---

## 34. Commission

La commission Mansa éventuelle ne doit être reconnue qu’au moment prévu contractuellement et comptablement.

---

## 35. Litige

Une partie peut ouvrir un litige avant libération définitive selon la fenêtre prévue.

---

## 36. Gel pendant litige

La partie contestée reste bloquée jusqu’à résolution, sauf décision juridiquement autorisée.

---

## 37. Arbitrage

Le processus doit identifier qui décide : parties, médiateur, plateforme autorisée, partenaire ou autorité compétente.

---

## 38. Décision partielle

Un litige peut attribuer une partie au vendeur et rembourser le solde à l’acheteur.

---

## 39. Commerce et Marketplace

Le module doit distinguer responsabilité de Mansa, vendeur, marketplace, transporteur et partenaire de paiement.

---

## 40. Jini

Jini peut expliquer les conditions, délais et pièces, mais ne doit jamais décider seul d’une libération litigieuse.

---

## 41. Notifications

Accord à accepter, financement reçu, jalon soumis, validation requise, délai proche, libération, remboursement, litige et clôture.

---

## 42. API

```text
POST /escrow/agreements
GET /escrow/agreements/:id
POST /escrow/agreements/:id/accept
POST /escrow/agreements/:id/fund
POST /escrow/agreements/:id/milestones/:mid/submit
POST /escrow/agreements/:id/release
POST /escrow/agreements/:id/refund
POST /escrow/agreements/:id/disputes
```

---

## 43. Webhooks

escrow.created, escrow.funded, escrow.milestone.submitted, escrow.release.pending, escrow.released, escrow.refunded, escrow.disputed, escrow.closed.

---

## 44. Idempotence

Financement, libération, remboursement, jalons et décisions doivent être déduplicables.

---

## 45. Réconciliation

Comparer Ledger, partenaire de cantonnement, rails de paiement, libérations et remboursements.

---

## 46. Multi-devises

Un accord conserve une devise contractuelle. Les conversions ne sont permises que selon règles explicites.

---

## 47. Administration

Configurer limites, pays, types de conditions, partenaires, délais, frais, workflows de litige et feature flags.

---

## 48. RBAC

Escrow Admin, Operations, Dispute Agent, Finance, Risk, Compliance, Marketplace Admin, Auditor et Read Only.

---

## 49. Séparation des pouvoirs

Les libérations manuelles exceptionnelles peuvent exiger double approbation.

---

## 50. Audit

Création, acceptation, financement, modification, preuve, libération, remboursement, litige et action admin doivent être journalisés.

---

## 51. Anti-fraude

Détection de faux vendeur, collusion, preuve falsifiée, livraison fictive, compte mule, auto-transaction et multi-comptes abusifs.

---

## 52. Reporting

Volume sous condition, accords actifs, délai moyen, libérations, remboursements, litiges, fraude, revenus et fonds en attente.

---

## 53. Conformité

Le modèle doit être validé pour cantonnement, protection des fonds, AML/CFT, sanctions, commerce et protection client.

---

## 54. Sécurité

MFA pour actions sensibles, chiffrement, séparation tenant, protection des preuves, rate limiting et secrets partenaires.

---

## 55. Conservation

Accords, preuves, écritures et litiges sont conservés selon obligations contractuelles, financières et locales.

---

## 56. Feature Flags

Activation par pays, type de transaction, marketplace, montant, partenaire et canal.

---

## 57. Multi-pays

Les mécanismes juridiques, délais, rôles et recours varient selon le pays et doivent être configurables.

---

## 58. Performance

Le moteur doit supporter de grands volumes d’accords et jalons sans recalcul global inutile.

---

## 59. Observabilité

Accords bloqués, fonds en attente, délais, erreurs partenaire, écarts de réconciliation et événements dupliqués.

---

## 60. Tests fonctionnels, sécurité, performance et résilience

Tester accord, acceptation, financement, jalons, libération partielle, remboursement, expiration, litige, double événement, panne et reprise.

---

## 61. Règles métier

1. Mansa ne se présente pas comme séquestre réglementé sans cadre approprié.
2. Les parties et conditions sont explicites.
3. Les consentements sont versionnés.
4. Les fonds réservés passent par un mécanisme financier réel.
5. Le Ledger reste la source de vérité interne.
6. Une libération exige condition satisfaite ou décision autorisée.
7. Les remboursements sont idempotents.
8. Les libérations sont idempotentes.
9. Les preuves critiques sont intègres.
10. Les litiges bloquent les fonds concernés.
11. Les frais sont affichés avant acceptation.
12. Les prolongations sont versionnées.
13. Jini ne décide pas seul d’un litige.
14. Les actions manuelles sensibles sont approuvées.
15. Les rôles restent séparés.
16. Les règles sont configurables par pays.
17. Les feature flags sont obligatoires.
18. Les fonds de plusieurs accords ne sont pas confondus applicativement.
19. Les écarts sont réconciliés.
20. Les audits critiques sont immuables.

---

## 62. Ordre de développement recommandé

```text
P1-ESC-01 — Accords, parties et conditions
P1-ESC-02 — Acceptation et KYC/KYB
P1-ESC-03 — Financement et réservation
P1-ESC-04 — Jalons et preuves
P1-ESC-05 — Validation et libération
P1-ESC-06 — Remboursement et expiration
P1-ESC-07 — Litiges et arbitrage
P1-ESC-08 — Marketplace et Commerce
P1-ESC-09 — Ledger et réconciliation
P1-ESC-10 — API, Webhooks et Jini
P1-ESC-11 — Administration, risque et reporting
P1-ESC-12 — Tests de bout en bout
```

---

## 63. Critères d’acceptation finaux

Le module est validé lorsque : un accord peut être créé et accepté ; les parties et conditions sont versionnées ; les fonds peuvent être réellement réservés ; les jalons et preuves sont gérés ; les libérations totales et partielles sont idempotentes ; les remboursements fonctionnent ; l’expiration applique la règle prévue ; les litiges gèlent les fonds concernés ; la décision partielle fonctionne ; le Ledger et la réconciliation sont cohérents ; Jini guide sans décider seul ; RBAC et audits sont appliqués ; les tests fonctionnels, sécurité, performance et résilience réussissent.