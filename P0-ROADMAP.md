# Suivi d’exécution P0

Ce document de travail suit l’implémentation du périmètre P0 défini par la documentation officielle.
Il ne remplace et ne modifie aucun document officiel.

## Références

- `docs/04-exploitation/83-audit-initial-depot-preparation-execution.md`
- `docs/06-applications/72-plan-directeur-complet-realisation-projet-mansa.md`
- `docs/06-applications/43-application-mansa-agent-cash-network-gestion-du-float-depots-retraits-commissions-et-dab.md`
- `PILOT.md`

## Légende

- **Validé** : implémenté, testé et couvert par la CI.
- **Partiel** : socle présent, mais critères P0 incomplets.
- **Absent** : aucun module fonctionnel correspondant.

## Matrice d’écart

| Capacité P0         | État    | Éléments présents                                     | Écart principal                                                    |
| ------------------- | ------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| Authentification    | Validé  | Identity, jetons, sessions et tests                   | Durcissement de production hors P0 technique                       |
| Identité            | Validé  | Utilisateurs, appareils et profils                    | Parcours UI complet absent                                         |
| KYC                 | Partiel | Modèle, audit et règles d’éligibilité                 | Fournisseur, revue opérationnelle et pièces réelles absents        |
| Wallet              | Validé  | Wallet adossé au Ledger, statuts et audit             | Interfaces complètes absentes                                      |
| Ledger              | Validé  | Partie double, invariants, idempotence et audit       | Exploitation Finance avancée absente                               |
| Transfert           | Validé  | Transfert Mansa à Mansa et pilote d’intégration       | Parcours mobile complet absent                                     |
| Dépôt Agent         | Absent  | Blocage explicite hors ligne dans l’application Agent | Backend, modèle et comptabilisation absents                        |
| Retrait Agent       | Absent  | Blocage explicite hors ligne dans l’application Agent | Autorisation client, caisse et comptabilisation absentes           |
| Paiement commerçant | Partiel | Paiement interne atomique                             | Identification commerçant, QR et parcours Commerce absents         |
| QR                  | Absent  | Aucun module fonctionnel                              | Modèle, émission, validation et sécurité absents                   |
| Frais               | Partiel | Champ `feeAmount` sur les paiements                   | Moteur configurable et historisé absent                            |
| Commissions         | Absent  | Aucun modèle fonctionnel                              | Calcul, ventilation et paiement Agent absents                      |
| Notifications       | Validé  | Centre interne, politiques et audit                   | Canaux externes hors socle actuel                                  |
| Admin Web           | Partiel | Shell sécurisé minimal et politique MFA               | Consoles opérationnelles absentes                                  |
| Support             | Absent  | Aucun module fonctionnel                              | Dossiers, incidents et workflows absents                           |
| Monitoring          | Partiel | Endpoint de santé et CI                               | Métriques, traces, alertes et tableaux de bord absents             |
| Audit               | Partiel | Audits immuables par domaine                          | Journal global et exploitation centralisée absents                 |
| Sauvegardes         | Absent  | Documentation uniquement                              | Automatisation, restauration testée et preuves absentes            |
| Sécurité            | Partiel | RBAC, gardes, secrets contrôlés et audit CI           | SAST/DAST, gestion centralisée des secrets et exploitation absents |
| Pilote              | Partiel | Pilote technique P0-15A vert en CI                    | Recette et pilote terrain explicitement hors périmètre             |

## Ordre d’exécution retenu

Le premier bloc fonctionnel manquant est le **Cash Network Agent**. Son développement est découpé
afin de préserver les invariants financiers et d’éviter une implémentation monolithique.

### P0-16A — Socle Agent et float

- agent rattaché à un utilisateur vérifié ;
- statuts d’activation et de suspension contrôlés ;
- compte de float séparé du wallet personnel et de la caisse ;
- position par devise, pays et environnement ;
- permissions d’administration et de consultation ;
- audit immuable ;
- migration additive et tests PostgreSQL.

### P0-16B — Caisse Agent

- ouverture et fermeture de caisse ;
- déclarations physiques ;
- écarts tracés ;
- aucune valeur financière modifiable sans audit.

### P0-16C — Dépôt d’espèces

- identification du client ;
- contrôles agent, client, float et plafonds ;
- écriture Ledger atomique ;
- débit du float et crédit du wallet client ;
- idempotence, reçu et notification ;
- aucune confirmation du client.

### P0-16D — Retrait d’espèces

- authentification explicite du client ;
- contrôle du solde et de la caisse ;
- écriture Ledger atomique ;
- débit du wallet client et crédit du float ;
- remise des espèces uniquement après autorisation ;
- idempotence, reçu et notification.

### P0-16E — Frais et commissions

- règles configurables et versionnées ;
- calcul déterministe ;
- ventilation Ledger séparée ;
- historique immuable ;
- aucun tarif codé en dur.

## Condition de passage au lot suivant

Chaque lot doit disposer d’une migration additive, de permissions restrictives, d’un audit, de tests
unitaires et d’intégration, d’un build vert et d’une validation GitHub Actions avant le lot suivant.
