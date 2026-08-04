# Pilote technique P0-15A

Ce pilote valide uniquement le socle P0 dans un environnement local ou CI isolé. Il ne constitue
ni une Recette, ni un pilote terrain, ni une autorisation de déploiement en Production.

## Périmètre

Le parcours vérifie :

- la disponibilité de l’API ;
- l’inscription et les sessions ;
- le refus d’accès sans permission ;
- les profils et wallets de test ;
- l’éligibilité KYC simulée dans la base isolée ;
- une alimentation équilibrée par le Ledger ;
- un transfert Mansa à Mansa ;
- l’idempotence et le rejet d’un rejeu incohérent ;
- la conservation de l’équilibre comptable.

## Exécution locale

```bash
docker compose -f compose.pilot.yaml up -d
DATABASE_URL='postgresql://postgres@localhost:55432/mansa_pilot?schema=public' \
ACCESS_TOKEN_SECRET='local-only-access-token-secret-000000000000000000' \
TOKEN_HASH_SECRET='local-only-token-hash-secret-00000000000000000000' \
PILOT_ENVIRONMENT='test' \
pnpm pilot:check
docker compose -f compose.pilot.yaml down
```

La commande refuse toute base distante et tout nom de base différent de `mansa_pilot`.

## Hors périmètre

- argent réel ;
- données réelles ;
- partenaires externes ;
- Cash Network ;
- TPE ou GAB/DAB ;
- environnement de Recette ou Production ;
- déploiement externe.

Un pilote terrain reste interdit tant que toutes les conditions officielles ne sont pas remplies.
