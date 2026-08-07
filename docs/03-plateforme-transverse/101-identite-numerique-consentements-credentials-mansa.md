# 101 — Identité numérique, consentements et credentials Mansa : preuve d’identité, autorisations, partage sélectif, révocation, sécurité, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du module **Identité numérique, consentements et credentials Mansa**.

Le module doit permettre de gérer de manière sécurisée les preuves d’identité, attributs vérifiés, consentements, autorisations de partage et justificatifs numériques utilisés dans l’écosystème Mansa, sans transformer Mansa en autorité d’identité publique lorsqu’elle n’en a pas le mandat légal.

---

## 2. Principe général

```text
Enrôlement
→ Vérification d’identité
→ Création des attributs vérifiés
→ Consentement
→ Émission ou association d’un credential
→ Présentation sélective
→ Vérification
→ Révocation ou expiration
→ Audit
```

---

## 3. Positionnement dans Mansa

Intégrations : Identity, KYC/KYB, Wallet, Cartes, Paiements, Commerce, État, Universités, Jini, Notifications, RBAC, Audit, Reporting, Feature Flags et partenaires d’identité.

---

## 4. Utilisateurs cibles

- particuliers ;
- commerçants ;
- agents ;
- entreprises ;
- administrations ;
- universités ;
- partenaires financiers ;
- organisations habilitées.

---

## 5. Entité IdentityProfile

Elle doit contenir identifiant Mansa, niveau de vérification, attributs validés, sources, dates de vérification, statut, pays, historique et références de preuve.

---

## 6. Niveaux de vérification

```text
UNVERIFIED
BASIC
VERIFIED
ENHANCED
ORGANIZATION_VERIFIED
SUSPENDED
REVOKED
```

---

## 7. Attributs vérifiables

Exemples : nom, prénom, date de naissance, nationalité, adresse, téléphone, e-mail, statut étudiant, statut commerçant, rôle professionnel, identifiant fiscal et attributs partenaires autorisés.

---

## 8. Source de vérité

Chaque attribut vérifié doit référencer sa source, son mode de vérification, la date et la durée de validité.

---

## 9. Documents justificatifs

Les documents doivent être chiffrés, minimisés, versionnés et accessibles uniquement aux rôles habilités.

---

## 10. Biométrie

Toute biométrie éventuelle doit être explicitement justifiée, juridiquement permise, stockée selon une architecture dédiée et ne jamais être utilisée comme simple identifiant public.

---

## 11. Consentement

Chaque consentement doit contenir finalité, données concernées, bénéficiaire, durée, version du texte, statut et preuve horodatée.

---

## 12. Statuts du consentement

```text
DRAFT
ACTIVE
EXPIRED
REVOKED
WITHDRAWN
SUPERSEDED
```

---

## 13. Consentement granulaire

L’utilisateur doit pouvoir autoriser uniquement les attributs nécessaires à une finalité donnée.

---

## 14. Partage sélectif

Le système doit préférer la transmission minimale : par exemple confirmer « majeur » sans transmettre la date de naissance complète lorsque cela suffit.

---

## 15. Preuve de consentement

La preuve doit inclure horodatage, version, canal, authentification utilisée et identifiant du demandeur.

---

## 16. Retrait du consentement

Le retrait doit prendre effet pour les traitements futurs lorsqu’il est juridiquement applicable, sans effacer les obligations légales de conservation antérieures.

---

## 17. Credentials numériques

Un credential représente un ensemble d’attributs signé ou attesté par une entité autorisée.

---

## 18. Types de credentials

- identité vérifiée ;
- carte étudiante numérique ;
- statut commerçant ;
- habilitation agent ;
- preuve KYC ;
- preuve KYB ;
- badge professionnel ;
- justificatif partenaire ;
- credential personnalisé autorisé.

---

## 19. Entité Credential

Champs : type, issuer, subject, claims, date d’émission, expiration, statut, version, identifiant, signature/référence cryptographique et politique de révocation.

---

## 20. Issuer

Tout émetteur doit être explicitement identifié, authentifié, autorisé et lié à une politique d’émission.

---

## 21. Holder

Le détenteur peut être une personne, une organisation ou un appareil autorisé selon le type de credential.

---

## 22. Verifier

Le vérificateur doit déclarer sa finalité, les attributs demandés et son identité applicative.

---

## 23. Présentation

Une présentation doit être générée pour une finalité précise, limitée dans le temps et non réutilisable indéfiniment.

---

## 24. QR de vérification

Un QR peut contenir un jeton temporaire ou une URL de vérification sécurisée, jamais les données personnelles complètes en clair.

---

## 25. NFC

Les échanges NFC doivent appliquer authentification, chiffrement et minimisation des données.

---

## 26. Expiration

Tout credential expiré doit être rejeté pour les usages exigeant une validité courante.

---

## 27. Révocation

L’émetteur doit pouvoir révoquer un credential avec motif, date, portée et audit.

---

## 28. Suspension

Une suspension temporaire peut être utilisée lorsqu’une investigation est en cours.

---

## 29. Registre de statut

Le système doit permettre à un vérificateur autorisé de contrôler statut actif, expiré, suspendu ou révoqué sans exposer des données non nécessaires.

---

## 30. Rotation des clés

Les clés d’émission et vérification doivent être rotatives, versionnées et stockées dans un gestionnaire de secrets/HSM lorsque requis.

---

## 31. Compromission

Une compromission de clé doit déclencher rotation, révocation ciblée, alerte et procédure de reprise.

---

## 32. Identité d’organisation

Les organisations doivent être reliées à leur KYB, représentants, domaines, établissements et rôles internes.

---

## 33. Délégation

Une organisation peut déléguer une habilitation à un employé avec périmètre, date de début, date de fin et niveau d’autorité.

---

## 34. Agents publics

Les credentials agents doivent contenir administration, matricule interne éventuel, rôle, zone, droits et date d’expiration.

---

## 35. Étudiants

Les credentials étudiants peuvent inclure établissement, cursus, année, statut d’inscription et date de validité.

---

## 36. Commerçants

Le credential commerçant peut attester KYB, statut actif, catégorie et informations commerciales autorisées.

---

## 37. Jini

Jini peut expliquer quels attributs sont demandés et pourquoi, mais ne doit jamais accepter un consentement ou présenter un credential sans action explicite lorsque celle-ci est requise.

---

## 38. Notifications

Émission, utilisation sensible, demande de partage, expiration proche, révocation, nouvelle délégation et activité inhabituelle.

---

## 39. Journal d’utilisation

L’utilisateur doit pouvoir consulter qui a demandé ou vérifié ses données lorsque la réglementation et l’architecture le permettent.

---

## 40. API

```text
GET /identity/profile
POST /identity/consents
POST /identity/consents/:id/revoke
POST /credentials
GET /credentials/:id
POST /credentials/:id/present
POST /credentials/:id/revoke
POST /credentials/verify
```

---

## 41. Webhooks

identity.verified, consent.created, consent.revoked, credential.issued, credential.presented, credential.suspended, credential.revoked, credential.expired.

---

## 42. Idempotence

Émission, révocation, consentement et présentation doivent être protégés contre les doubles traitements.

---

## 43. Autorisation

Toute lecture d’attribut sensible doit appliquer RBAC/ABAC et politiques de finalité.

---

## 44. Administration

Configurer types de credentials, émetteurs, règles d’émission, expirations, partenaires, textes de consentement, pays et feature flags.

---

## 45. RBAC

Identity Admin, Verification Agent, Issuer Operator, Compliance, Support Restricted, Auditor, Organization Admin et Read Only.

---

## 46. Audit

Vérification, modification d’attribut, émission, présentation, révocation, changement de clé et action admin doivent être audités.

---

## 47. Anti-fraude

Détection de documents falsifiés, multi-identités, usurpation, credential cloné, QR rejoué, appareil compromis et émetteur suspect.

---

## 48. Anti-rejeu

Les présentations sensibles doivent utiliser nonce, expiration courte ou mécanisme équivalent.

---

## 49. Protection contre la corrélation

Le système doit éviter d’exposer un identifiant global stable à tous les partenaires lorsque cela n’est pas nécessaire.

---

## 50. Confidentialité

Minimisation, séparation des finalités, chiffrement, accès minimum, durée de conservation et suppression contrôlée sont obligatoires.

---

## 51. Conservation

Les durées diffèrent pour documents KYC, consentements, credentials, preuves d’émission, logs et obligations légales.

---

## 52. Reporting

Nombre de profils vérifiés, credentials actifs, expirations, révocations, consentements, taux d’échec de vérification et usage par partenaire.

---

## 53. Multi-pays

Documents acceptés, niveaux KYC, autorités, durées, textes légaux et types de credentials doivent être configurables par pays.

---

## 54. Interopérabilité

Le module doit pouvoir intégrer des standards de credentials ou protocoles d’identité reconnus lorsque les partenaires et réglementations le permettent.

---

## 55. Offline

Certaines vérifications peuvent fonctionner hors ligne uniquement avec preuves signées, durée courte, cache sécurisé et politique explicite.

---

## 56. Feature Flags

Activation par pays, type de credential, émetteur, vérificateur, application et environnement.

---

## 57. Performance

Le système doit supporter des volumes élevés de vérifications sans exposer les documents source à chaque requête.

---

## 58. Observabilité

Suivre latence de vérification, erreurs d’émetteur, rejets, expirations, revocations, tentatives de rejeu et incidents cryptographiques.

---

## 59. Résilience

Une panne d’un partenaire ne doit pas invalider les credentials déjà vérifiables localement lorsque leur modèle cryptographique le permet.

---

## 60. Tests fonctionnels, sécurité, performance et résilience

Tester enrôlement, consentement, émission, présentation, vérification, expiration, suspension, révocation, rotation de clé, rejeu, permissions et panne partenaire.

---

## 61. Règles métier

1. Mansa ne se présente pas comme autorité nationale d’identité sans mandat.
2. Chaque attribut vérifié possède une source identifiable.
3. Les consentements sont versionnés et horodatés.
4. Le partage est limité au strict nécessaire.
5. Les credentials ont un émetteur explicite.
6. Les credentials expirés sont rejetés lorsque la validité courante est requise.
7. Les révocations sont immédiates dès publication de leur statut.
8. Les présentations sensibles sont anti-rejeu.
9. Les QR ne contiennent pas de données sensibles complètes en clair.
10. Les clés sont rotatives et protégées.
11. Les délégations ont une durée et un périmètre.
12. Jini n’accepte pas seul un consentement.
13. Les accès sensibles sont audités.
14. Les organisations sont isolées.
15. Les données biométriques bénéficient de protections renforcées.
16. Les règles sont configurables par pays.
17. Les feature flags sont obligatoires.
18. Les partenaires ne reçoivent que les attributs autorisés.
19. Les incidents de clé déclenchent une procédure de reprise.
20. Les audits critiques sont immuables.

---

## 62. Ordre de développement recommandé

```text
P1-IDN-01 — Profils et niveaux de vérification
P1-IDN-02 — Attributs et sources
P1-IDN-03 — Consentements
P1-IDN-04 — Credentials et émetteurs
P1-IDN-05 — Présentation et vérification
P1-IDN-06 — QR, NFC et anti-rejeu
P1-IDN-07 — Révocation, suspension et expiration
P1-IDN-08 — Organisations et délégations
P1-IDN-09 — Clés et sécurité cryptographique
P1-IDN-10 — API, Webhooks et Jini
P1-IDN-11 — Administration, conformité et reporting
P1-IDN-12 — Tests de bout en bout
```

---

## 63. Critères d’acceptation finaux

Le module est validé lorsque : les profils et niveaux de vérification sont gérés ; les attributs conservent leur source ; les consentements sont granulaires et révocables ; les credentials peuvent être émis, présentés, vérifiés, suspendus et révoqués ; les QR et présentations sensibles résistent au rejeu ; les délégations expirent correctement ; la rotation des clés est prévue ; Jini explique sans consentir à la place de l’utilisateur ; RBAC, audits et feature flags sont appliqués ; la confidentialité et la minimisation sont respectées ; les tests fonctionnels, sécurité, performance et résilience réussissent.