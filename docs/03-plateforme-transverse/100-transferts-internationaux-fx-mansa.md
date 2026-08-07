# 100 — Transferts internationaux et change Mansa : corridors, FX, bénéficiaires, conformité, exécution, réconciliation, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du module **Transferts internationaux et change Mansa**.

Le module doit permettre d’orchestrer des transferts transfrontaliers et conversions de devises via des partenaires autorisés, sans présenter Mansa comme établissement de change, banque correspondante ou opérateur de transfert lorsqu’elle ne détient pas les agréments nécessaires.

Il couvre : corridors, devises, cotations FX, bénéficiaires, frais, conformité, sanctions, limites, exécution, suivi, retours, remboursements, réconciliation, administration et reporting.

---

## 2. Principe général

```text
Choix du corridor
→ Saisie du bénéficiaire
→ Vérifications
→ Cotation FX
→ Affichage montant reçu + frais
→ Confirmation
→ Réservation/débit
→ Exécution partenaire
→ Suivi
→ Confirmation finale
→ Réconciliation
```

---

## 3. Positionnement dans Mansa

Intégrations : Identity, KYC/KYB, Wallet, Ledger, Paiements, Banque, Mobile Money, Cartes, Trésorerie, Notifications, Jini, RBAC, Audit, Reporting, Feature Flags et partenaires FX/remittance.

---

## 4. Rôle de Mansa

Le rôle doit être affiché et configurable par corridor : interface technique, distributeur, agent autorisé, apporteur ou autre rôle validé juridiquement.

---

## 5. Corridors

Un corridor doit définir pays source, pays destination, devises, rails disponibles, partenaires, limites, délais, frais et règles de conformité.

---

## 6. Entité Corridor

Champs : code, source, destination, devise débit, devise crédit, rails, partenaires, statut, horaires, jours ouvrés, limites et feature flags.

---

## 7. Devises

Le moteur doit gérer ISO 4217 lorsque applicable, précision décimale, arrondis, devise de règlement et devise de remise.

---

## 8. Entité FXQuote

Une cotation doit contenir paire, taux, source, spread, frais, montant envoyé, montant reçu, expiration et identifiant unique.

---

## 9. Durée de validité du taux

La cotation doit expirer automatiquement après la durée définie ; une nouvelle confirmation est requise si le taux change.

---

## 10. Transparence FX

Afficher taux appliqué, frais fixes, frais variables, montant débité, montant estimé/reçu et devise finale.

---

## 11. Taux indicatif

Les taux affichés avant cotation ferme doivent être clairement marqués indicatifs.

---

## 12. Source des taux

Chaque taux doit être relié à une source ou partenaire et horodaté.

---

## 13. Spread

Le spread éventuel doit être configurable, auditable et compatible avec les obligations de transparence locales.

---

## 14. Bénéficiaires

Nom, pays, coordonnées, type de compte, rail, devise, relation éventuelle, statut de vérification et historique.

---

## 15. Nouveau bénéficiaire

Peut déclencher MFA, délai de sécurité, vérification renforcée et plafonds réduits.

---

## 16. Vérification du bénéficiaire

Utiliser les services disponibles : validation IBAN/compte, nom, Mobile Money, banque, sanctions et règles partenaire.

---

## 17. KYC/KYB expéditeur

Le niveau requis dépend du pays, montant, fréquence, corridor, usage et profil de risque.

---

## 18. KYC bénéficiaire

Certains corridors peuvent exiger des informations ou vérifications supplémentaires côté bénéficiaire.

---

## 19. Motif du transfert

Les motifs doivent être configurables : famille, études, commerce, facture, salaire, investissement autorisé, voyage ou autre motif permis.

---

## 20. Source des fonds

Pour certains seuils, le système peut demander justificatif de source des fonds selon politique AML/CFT.

---

## 21. Sanctions

Screening des personnes, organisations, banques, pays et autres éléments requis avant exécution.

---

## 22. AML/CFT

Le moteur doit appliquer règles de surveillance adaptées aux transferts transfrontaliers et conserver les éléments nécessaires aux investigations.

---

## 23. Limites

Plafonds par transaction, jour, mois, corridor, KYC, pays, rail, bénéficiaire et niveau de risque.

---

## 24. Structuration

Détecter tentatives de fractionnement destinées à contourner les seuils ou contrôles.

---

## 25. Pays restreints

Les corridors interdits ou suspendus doivent être bloqués via configuration centrale et feature flags.

---

## 26. Méthodes de financement

Wallet, compte bancaire, Mobile Money, carte ou autre source autorisée selon corridor.

---

## 27. Réservation de fonds

Le montant à débiter doit être réservé pendant la cotation ou l’exécution selon le modèle partenaire.

---

## 28. Statuts du transfert

```text
DRAFT
QUOTED
CONFIRMED
COMPLIANCE_REVIEW
FUNDS_RESERVED
SUBMITTED
IN_PROGRESS
DELIVERED
FAILED
RETURNED
REFUND_PENDING
REFUNDED
CANCELLED
UNDER_REVIEW
```

---

## 29. Confirmation

La confirmation finale doit reprendre bénéficiaire, montant, devise, taux, frais, délai estimé et référence.

---

## 30. Idempotence

La confirmation et la soumission partenaire doivent utiliser une clé stable empêchant tout double transfert.

---

## 31. Ledger

Le Ledger doit distinguer principal, frais, spread/revenu autorisé, réservation, débit, retour et remboursement.

---

## 32. Exécution partenaire

Chaque instruction doit avoir identifiant Mansa, identifiant partenaire, horodatages et statut de transmission.

---

## 33. Routage

Plusieurs partenaires peuvent être disponibles ; le routage doit respecter coût, disponibilité, risque, conformité, SLA et politique commerciale.

---

## 34. Routage explicable

La raison du partenaire choisi doit être journalisée pour audit interne.

---

## 35. Délai estimé

Le délai affiché doit être basé sur corridor, rail, horaires, jours ouvrés et historique, sans garantie non contractuelle.

---

## 36. Suivi

Le client doit voir étapes principales sans exposer d’informations techniques ou conformité sensibles.

---

## 37. Confirmation de livraison

Un transfert n’est DELIVERED qu’après confirmation fiable du partenaire ou rail final.

---

## 38. Échec

Les échecs doivent distinguer bénéficiaire invalide, conformité, partenaire, liquidité, rail, timeout et problème technique.

---

## 39. Timeout

Un timeout ne doit jamais être traité automatiquement comme échec définitif avant vérification du statut partenaire.

---

## 40. Retour de fonds

Un transfert retourné doit être relié à l’instruction d’origine, au motif et aux écritures de retour.

---

## 41. Remboursement

Le remboursement doit suivre les règles du corridor, frais remboursables ou non, et être idempotent.

---

## 42. Annulation

Possible uniquement avant le point d’irrévocabilité défini par le rail/partenaire.

---

## 43. FX inverse sur retour

Si un retour nécessite une nouvelle conversion, le traitement du risque FX et du montant remboursé doit être défini contractuellement.

---

## 44. Liquidité

Le module doit surveiller les comptes de règlement, préfinancement et limites partenaire nécessaires aux corridors.

---

## 45. Réconciliation

Comparer Ledger, partenaires FX, banques, Mobile Money, comptes de règlement, frais et retours.

---

## 46. Nostro/Vostro partenaires

Lorsque pertinent, les soldes de règlement externes doivent être suivis sans les confondre avec les soldes clients Mansa.

---

## 47. Jini

Jini peut expliquer frais, taux, délai et statut, mais ne doit pas garantir un taux expiré ni contourner les contrôles conformité.

---

## 48. Notifications

Cotation expirée, transfert confirmé, revue requise, en cours, livré, échoué, retourné, remboursé et corridor indisponible.

---

## 49. API

```text
GET /cross-border/corridors
POST /fx/quotes
POST /cross-border/transfers
GET /cross-border/transfers/:id
POST /cross-border/transfers/:id/cancel
GET /cross-border/beneficiaries
POST /cross-border/beneficiaries
```

---

## 50. Webhooks

fx.quote.expired, transfer.submitted, transfer.in_progress, transfer.delivered, transfer.failed, transfer.returned, transfer.refunded.

---

## 51. Administration

Configurer corridors, devises, partenaires, limites, spreads, frais, horaires, règles de routage et feature flags.

---

## 52. RBAC

FX Admin, Treasury Operator, Compliance Analyst, Risk, Finance, Support, Partner Operator, Auditor et Read Only.

---

## 53. Audit

Cotation, spread, bénéficiaire, décision conformité, routage, exécution, retour, remboursement et action admin doivent être audités.

---

## 54. Reporting

Volume, montant, corridor, devise, marge, frais, taux de succès, délai, retours, conformité, partenaires et liquidité.

---

## 55. Sécurité

MFA, chiffrement, secrets partenaires, restrictions IP si nécessaire, rate limiting, contrôle appareil et isolation tenant.

---

## 56. Conservation

Durées selon transfert de fonds, AML/CFT, sanctions, comptabilité, fraude et protection des données.

---

## 57. Feature Flags

Activation par corridor, devise, rail, partenaire, segment, pays et environnement.

---

## 58. Performance

Le moteur doit supporter des pics de cotations et transferts avec caches de taux courts et traitement asynchrone fiable.

---

## 59. Observabilité

Latence de cotation, taux expirés, erreurs partenaire, transferts bloqués, liquidité, écarts et délais de livraison.

---

## 60. Tests fonctionnels, sécurité, performance et résilience

Tester cotation, expiration, bénéficiaire, conformité, réservation, transfert, timeout, retour, remboursement, double soumission, panne partenaire et reprise.

---

## 61. Règles métier

1. Mansa ne se présente pas comme opérateur réglementé sans agrément approprié.
2. Chaque corridor doit être explicitement activé.
3. Les taux sont horodatés et sourcés.
4. Les taux expirés ne peuvent pas être réutilisés silencieusement.
5. Les frais et le montant reçu sont affichés avant confirmation.
6. Les bénéficiaires sont contrôlés.
7. Les limites KYC sont appliquées.
8. Les contrôles sanctions et AML/CFT sont exécutés selon politique.
9. La soumission est idempotente.
10. Le Ledger reste la source financière de vérité.
11. Un timeout n’est pas un échec définitif.
12. Les retours référencent le transfert d’origine.
13. Les remboursements sont idempotents.
14. Les soldes de règlement partenaires sont séparés des soldes clients.
15. Jini ne contourne pas la conformité.
16. Les conversions de reporting sont distinctes des conversions exécutées.
17. Les règles sont configurables par pays.
18. Les feature flags sont obligatoires.
19. Les actions sensibles sont auditées.
20. Les audits critiques sont immuables.

---

## 62. Ordre de développement recommandé

```text
P1-FX-01 — Corridors et devises
P1-FX-02 — Cotations et taux
P1-FX-03 — Bénéficiaires et KYC
P1-FX-04 — Sanctions, AML/CFT et limites
P1-FX-05 — Réservation et Ledger
P1-FX-06 — Exécution et routage
P1-FX-07 — Suivi, retours et remboursements
P1-FX-08 — Liquidité et règlement
P1-FX-09 — Réconciliation
P1-FX-10 — API, Webhooks et Jini
P1-FX-11 — Administration, risque et reporting
P1-FX-12 — Tests de bout en bout
```

---

## 63. Critères d’acceptation finaux

Le module est validé lorsque : les corridors sont configurables ; une cotation FX est sourcée, horodatée et expirante ; les frais et montants sont transparents ; les bénéficiaires sont contrôlés ; KYC, limites et conformité sont appliqués ; les fonds sont réservés correctement ; la soumission partenaire est idempotente ; le routage est auditable ; les timeouts sont réconciliés avant décision ; retours et remboursements sont traçables ; le Ledger et la réconciliation sont cohérents ; Jini explique sans contourner la conformité ; RBAC et audits sont appliqués ; les tests fonctionnels, sécurité, performance et résilience réussissent.