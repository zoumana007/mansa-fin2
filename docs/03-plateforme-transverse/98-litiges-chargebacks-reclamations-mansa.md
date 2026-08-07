# 98 — Litiges, chargebacks et réclamations Mansa : contestation, preuves, arbitrage, remboursements, conformité, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du module **Litiges, chargebacks et réclamations Mansa**.

Le module doit permettre de déclarer, instruire, suivre et résoudre les contestations liées aux paiements, cartes, transferts, achats, abonnements et services Mansa, tout en respectant les règles des réseaux, partenaires et juridictions.

Il couvre : ouverture de dossier, typologie, délais, gel éventuel, preuves, échanges, remboursement, chargeback, représentation, arbitrage, clôture, fraude, reporting et audit.

---

## 2. Principe général

```text
Contestation
→ Vérification d’éligibilité
→ Création du dossier
→ Collecte des preuves
→ Mesures conservatoires éventuelles
→ Instruction
→ Décision ou transmission partenaire
→ Remboursement/chargeback éventuel
→ Réconciliation
→ Clôture
```

---

## 3. Positionnement dans Mansa

Intégrations : Identity, KYC/KYB, Wallet, Ledger, Paiements, Cartes, Mobile Money, Commerce, Abonnements, Notifications, Documents, Support, Jini, RBAC, Audit, Reporting et Feature Flags.

---

## 4. Périmètre

- paiement carte ;
- paiement QR ;
- transfert ;
- Mobile Money ;
- retrait ;
- achat Commerce ;
- abonnement ;
- remboursement ;
- opération non reconnue ;
- service non fourni ;
- montant incorrect ;
- doublon.

---

## 5. Entité Dispute

Elle doit contenir transaction, demandeur, motif, canal, montant contesté, devise, date limite, statut, preuves, décisions, écritures liées et audit.

---

## 6. Statuts

```text
DRAFT
SUBMITTED
ELIGIBILITY_REVIEW
OPEN
EVIDENCE_REQUIRED
UNDER_REVIEW
PARTNER_REVIEW
PROVISIONAL_CREDIT
REPRESENTMENT
ARBITRATION
WON
LOST
PARTIALLY_RESOLVED
CLOSED
CANCELLED
```

---

## 7. Motifs

Les motifs doivent être configurables par rail et partenaire, avec codes internes et codes réseau lorsque requis.

---

## 8. Délais

Chaque type de contestation doit calculer automatiquement date limite client, date limite partenaire et étapes intermédiaires.

---

## 9. Éligibilité

Le moteur vérifie type d’opération, statut, délai, montant, antécédents, remboursement existant et règles du partenaire.

---

## 10. Contestation partielle

Le client peut contester tout ou partie d’une transaction lorsque le rail le permet.

---

## 11. Transaction non reconnue

Le parcours doit déclencher contrôles de sécurité adaptés : appareil, session, carte, authentification et risque de compromission.

---

## 12. Carte compromise

Le système peut proposer gel ou remplacement de carte sans attendre la décision finale du litige lorsque les règles de sécurité le justifient.

---

## 13. Preuves client

Reçus, captures, messages, documents, photos et attestations, avec horodatage et contrôles d’intégrité.

---

## 14. Preuves commerçant

Reçu, preuve de livraison, politique de remboursement, authentification, logs TPE, facture et échanges pertinents.

---

## 15. Chaîne de conservation

Les preuves critiques doivent conserver origine, hash, date, auteur et transformations éventuelles.

---

## 16. Données minimales

Seules les données nécessaires à l’instruction doivent être communiquées entre parties.

---

## 17. Crédit provisoire

Un crédit provisoire ne peut être accordé que si les règles du produit/partenaire le permettent et doit être identifié comme tel dans le Ledger.

---

## 18. Gel de fonds

Un gel commerçant ou une réserve ne peut être appliqué que selon contrat, risque, réseau et droit applicable.

---

## 19. Remboursement amiable

Un commerçant peut proposer un remboursement total ou partiel avant escalade lorsque cela est permis.

---

## 20. Chargeback

Toute création de chargeback doit respecter code motif, montant, délai, réseau et preuve de transmission.

---

## 21. Représentation

Le commerçant ou partenaire peut fournir une réponse et de nouvelles preuves avant la date limite.

---

## 22. Pré-arbitrage

Le moteur doit suivre les étapes supplémentaires prévues par les réseaux de cartes ou partenaires.

---

## 23. Arbitrage

Toute procédure d’arbitrage doit être explicitement approuvée lorsqu’elle peut générer des frais importants.

---

## 24. Décision

La décision doit préciser gagnant/perdant/partiel, montant, motif, autorité décisionnaire et écritures financières associées.

---

## 25. Ledger

Le Ledger doit distinguer montant contesté, crédit provisoire, remboursement, reprise de crédit, frais réseau et ajustements.

---

## 26. Double remboursement

Le système doit empêcher remboursement commerçant + chargeback sur le même montant sans mécanisme de compensation.

---

## 27. Paiements en espèces

Les contestations d’opérations agent doivent être reliées aux journaux agent, reçus, cash-in/cash-out et contrôles terrain.

---

## 28. Retraits DAB/TPE

Gérer cash non délivré, montant partiel, débit sans espèces et rapprochement avec opérateur/acquéreur.

---

## 29. Mobile Money

Les litiges Mobile Money doivent intégrer références opérateur, statut final et procédure de rappel/annulation disponible.

---

## 30. Commerce

Le commerçant dispose d’un espace pour répondre, suivre les délais et télécharger les preuves autorisées.

---

## 31. Marketplace

En présence d’une marketplace, le rôle de vendeur, plateforme, transporteur et prestataire doit être distingué.

---

## 32. Abonnements

Contestation d’un renouvellement : consentement, notification, date d’annulation, usage et remboursement doivent être consultables.

---

## 33. Fraude friendly fraud

Le moteur doit détecter contestations répétitives incohérentes tout en conservant un droit de recours équitable.

---

## 34. Fraude commerçant

Surveiller taux de litige, motifs, montants, cohortes et anomalies par terminal/compte.

---

## 35. Protection utilisateur

Les mesures anti-fraude ne doivent pas empêcher arbitrairement un client légitime de déposer une contestation.

---

## 36. Support

Les agents support voient uniquement les données nécessaires et ne peuvent pas modifier une décision financière sans permission.

---

## 37. Jini

Jini peut guider dans le choix du motif, expliquer le statut et demander les pièces, mais ne décide pas seul de l’issue.

---

## 38. Notifications

Dossier ouvert, preuve requise, délai proche, réponse adverse, décision, crédit provisoire, remboursement et clôture.

---

## 39. SLA

Les SLA sont définis par type, rail, partenaire et juridiction et doivent être monitorés.

---

## 40. Escalade

Escalade automatique en cas de délai critique, montant élevé, fraude, VIP contractuel ou obligation réglementaire.

---

## 41. Médiation

Le dossier peut être transmis à un médiateur ou organisme compétent selon pays et produit.

---

## 42. API

```text
POST /disputes
GET /disputes/:id
POST /disputes/:id/evidence
POST /disputes/:id/respond
POST /disputes/:id/escalate
POST /disputes/:id/close
```

---

## 43. Webhooks

 dispute.created, dispute.evidence_required, dispute.updated, dispute.provisional_credit, dispute.won, dispute.lost, dispute.closed.

---

## 44. Idempotence

Ouverture, crédit provisoire, remboursement, chargeback et reprise doivent être déduplicables.

---

## 45. Réconciliation

Comparer Ledger, réseau, acquéreur, émetteur, Mobile Money, remboursements et écritures commerçant.

---

## 46. Administration

Configurer motifs, délais, partenaires, seuils, workflows, modèles de preuve, SLA et feature flags.

---

## 47. RBAC

Dispute Agent, Senior Dispute Agent, Risk, Fraud, Finance, Merchant Support, Compliance, Auditor et Read Only.

---

## 48. Séparation des pouvoirs

Les ajustements manuels élevés et crédits exceptionnels peuvent nécessiter double approbation.

---

## 49. Audit

Toute modification de motif, preuve, décision, crédit, remboursement et action admin doit être journalisée.

---

## 50. Reporting

Taux de litige, win rate, motifs, montants, délais, crédits provisoires, pertes, frais réseau et performance commerçant.

---

## 51. Alertes risque

Seuils par commerçant, terminal, utilisateur, BIN, pays, produit et période.

---

## 52. Conservation

Durées selon réseau, paiement, comptabilité, fraude, protection client et réglementation locale.

---

## 53. Sécurité

Chiffrement des preuves, contrôle d’accès, liens temporaires, anti-malware, rate limiting et isolation tenant.

---

## 54. Feature Flags

Activation par rail, pays, partenaire, type de litige et environnement.

---

## 55. Multi-pays

Délais légaux, voies de recours, autorités, langues et règles de remboursement doivent être localisés.

---

## 56. Multi-devises

Le montant contesté reste dans la devise d’origine ; toute conversion de reporting est indicative.

---

## 57. Performance

Le système doit supporter pics massifs de litiges et uploads sans bloquer les paiements normaux.

---

## 58. Observabilité

SLA, dossiers bloqués, files de preuves, erreurs partenaires, écarts et retards de Webhooks.

---

## 59. Résilience

Les reprises après panne ne doivent pas créer double crédit provisoire ou double chargeback.

---

## 60. Tests fonctionnels, sécurité, performance et résilience

Tester ouverture, délai, preuves, remboursement, crédit provisoire, chargeback, représentation, décision, doublons, panne et reprise.

---

## 61. Règles métier

1. Chaque litige référence une transaction précise.
2. Les délais sont calculés automatiquement.
3. Les preuves critiques sont intègres et horodatées.
4. Le Ledger est la source financière de vérité.
5. Les crédits provisoires sont identifiés séparément.
6. Aucun double remboursement n’est permis.
7. Les chargebacks sont idempotents.
8. Les rôles sont séparés.
9. Les décisions sont auditables.
10. Le client peut suivre son dossier.
11. Le commerçant ne voit que les données nécessaires.
12. Jini ne décide pas seul.
13. Les règles réseau sont versionnées.
14. Les SLA sont monitorés.
15. Les litiges fraude sont escaladables.
16. Les recours locaux sont configurables.
17. Les feature flags sont obligatoires.
18. Les données sont conservées selon politique.
19. Les ajustements exceptionnels sont approuvés.
20. Les audits critiques sont immuables.

---

## 62. Ordre de développement recommandé

```text
P1-DSP-01 — Modèles litige et motifs
P1-DSP-02 — Éligibilité et délais
P1-DSP-03 — Preuves et documents
P1-DSP-04 — Remboursement et crédit provisoire
P1-DSP-05 — Chargeback et représentation
P1-DSP-06 — Arbitrage et décisions
P1-DSP-07 — Commerce et marketplace
P1-DSP-08 — Fraude et alertes
P1-DSP-09 — Ledger et réconciliation
P1-DSP-10 — API, Webhooks et Jini
P1-DSP-11 — Administration et reporting
P1-DSP-12 — Tests de bout en bout
```

---

## 63. Critères d’acceptation finaux

Le module est validé lorsque : une transaction peut être contestée ; l’éligibilité et les délais sont calculés ; les preuves peuvent être déposées ; les crédits provisoires sont tracés ; les remboursements ne se doublonnent pas ; les chargebacks et représentations sont gérés ; les décisions sont auditables ; Commerce peut répondre ; les SLA sont suivis ; la réconciliation fonctionne ; Jini guide sans décider seul ; RBAC et feature flags sont appliqués ; les tests fonctionnels, sécurité, performance et résilience réussissent.