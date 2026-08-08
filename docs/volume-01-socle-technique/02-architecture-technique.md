# Volume 1 — Architecture technique

## Objectif

Ce document définit le socle technique de Mansa et l’organisation des applications, services, données et intégrations.

## Architecture générale

Mansa suit une architecture modulaire. Les applications Client, Commerçant, TPE, Admin Lite, Annuaire/Hub, portail Admin Web et site public consomment des API versionnées. La logique métier reste centralisée dans les modules backend et n’est pas dupliquée dans les interfaces.

## Backend

Le backend de référence utilise NestJS, TypeScript, PostgreSQL et Prisma. Les principaux domaines sont : identité, KYC/KYB, wallets, transactions, cartes, commerçants, Mobile Money, notifications, support, risque, reporting et services publics.

## Données financières

Les montants sont stockés en unités mineures entières avec leur devise. Les mouvements utilisent des identifiants uniques et des règles d’idempotence afin d’éviter les doublons. L’historique financier doit rester vérifiable.

## Intégrations

Les banques, opérateurs Mobile Money, services de messagerie, processeurs de paiement et administrations sont intégrés derrière des adaptateurs séparés. Une indisponibilité d’un partenaire ne doit pas rendre indisponible toute la plateforme.

## Environnements

Les environnements Local, Démo, Recette et Production sont séparés. Chaque environnement utilise ses propres ressources et paramètres.

## Multi-pays

La configuration par pays contient notamment la devise, le fuseau, les langues, les plafonds, les frais, les partenaires, les formats téléphoniques et les fonctions actives. Le Mali constitue la première configuration.

## Observabilité

Chaque service produit des journaux structurés, des métriques et des traces. Les opérations importantes utilisent des identifiants de requête et de corrélation.

## Qualité

Chaque changement passe par le formatage, le lint, la validation TypeScript, les tests et le build. Les scénarios financiers importants disposent de tests de non-régression.

## Critères d’acceptation

L’architecture est considérée correctement mise en place lorsque les domaines sont séparés, les API sont versionnées, les transactions sont idempotentes, les environnements sont isolés, les intégrations externes sont découplées et l’ajout d’un pays reste principalement une opération de configuration.
