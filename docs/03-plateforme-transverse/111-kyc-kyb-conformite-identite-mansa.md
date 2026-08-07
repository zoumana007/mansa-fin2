# 111 — KYC, KYB, conformité et vérification d’identité Mansa

## 1. Objet

Ce document définit le cahier des charges du module KYC, KYB, conformité et vérification d’identité Mansa. Il couvre l’entrée en relation des particuliers, commerçants, agents, entreprises et organisations publiques, la collecte et la vérification des informations, la gestion des justificatifs, les niveaux de vérification, les contrôles réglementaires, les revues manuelles, la traçabilité des décisions et l’intégration avec les domaines financiers.

## 2. Objectifs

- permettre une entrée en relation progressive et adaptée au risque ;
- distinguer clairement KYC particulier et KYB organisation ;
- centraliser les statuts de vérification sans dupliquer les données d’identité ;
- appliquer des limites de produits et de transaction selon le niveau de vérification ;
- automatiser les contrôles lorsque cela est possible ;
- permettre une revue humaine documentée lorsque nécessaire ;
- conserver une piste d’audit complète et non altérable ;
- supporter plusieurs pays, exigences et partenaires de vérification ;
- réduire les faux positifs sans diminuer les exigences de sécurité ;
- ne jamais présenter une règle réglementaire comme universelle lorsqu’elle dépend du pays ou du partenaire agréé.

## 3. Périmètre

Le module couvre :

- profil d’identité et statut de vérification ;
- KYC particulier ;
- KYB commerçant, entreprise et organisation ;
- représentants légaux et bénéficiaires effectifs ;
- collecte de documents ;
- vérification documentaire ;
- contrôle de cohérence des données ;
- preuve de vie lorsque activée ;
- contrôles sanctions, PEP et listes de surveillance via fournisseurs autorisés ;
- score de risque d’entrée en relation ;
- niveaux KYC/KYB ;
- limitations liées au niveau ;
- demandes de complément ;
- revue manuelle ;
- approbation, rejet, suspension et réexamen ;
- expiration et renouvellement des justificatifs ;
- audit et justification des décisions ;
- intégrations avec Wallet, paiements, cartes, TPE, agents, commerces, support, fraude et administration.

## 4. Hors périmètre

Le module ne remplace pas :

- un registre d’état civil ;
- un registre du commerce ;
- un fournisseur officiel de vérification documentaire ;
- une autorité de supervision ;
- une décision juridique ou réglementaire ;
- le moteur de fraude transactionnelle ;
- le ledger financier ;
- la conservation de secrets d’authentification utilisateur.

Les règles légales et seuils définitifs sont configurés par pays et validés par les partenaires juridiques, bancaires et conformité.

## 5. Intégrations

Le module s’intègre avec Identity, Auth, Consent, Wallet, Ledger, paiements, transferts, cartes, Mobile Money, TPE, Commerce, Agents, Fraude et Risque, Support, Notifications, Analytics, Administration, Jini et les partenaires externes de vérification.

## 6. Principes non négociables

1. Une identité applicative et un dossier KYC/KYB sont deux objets distincts.
2. Aucun statut `VERIFIED` ne peut être attribué sans règle de décision explicite.
3. Toute décision sensible est auditée avec auteur, date, motif et preuves utilisées.
4. Les justificatifs sont chiffrés au repos et en transit.
5. Les applications clientes ne reçoivent jamais les documents bruts sans autorisation explicite.
6. Les secrets et données biométriques ne sont jamais stockés en clair.
7. Les résultats d’un fournisseur externe sont normalisés dans un modèle interne.
8. Les seuils, niveaux et documents requis sont configurables par pays et type de profil.
9. Une vérification expirée ne doit pas être traitée comme valide silencieusement.
10. Les environnements Démo, Recette et Production utilisent des jeux de données et fournisseurs strictement séparés.
11. Aucun opérateur ne peut approuver son propre dossier ou contourner le principe des quatre yeux lorsque celui-ci est requis.
12. Toute donnée personnelle possède une politique de conservation et de suppression conforme à la règle applicable.

## 7. Concepts principaux

- `VerificationProfile`
- `VerificationCase`
- `KycCase`
- `KybCase`
- `VerificationLevel`
- `VerificationRequirement`
- `VerificationPolicy`
- `IdentityClaim`
- `VerificationDocument`
- `DocumentType`
- `DocumentCheck`
- `LivenessCheck`
- `ScreeningCheck`
- `ScreeningMatch`
- `RiskAssessment`
- `LegalRepresentative`
- `BeneficialOwner`
- `BusinessRegistration`
- `VerificationTask`
- `ManualReview`
- `Decision`
- `DecisionReason`
- `EvidenceReference`
- `VerificationProvider`
- `ProviderAttempt`
- `ExpiryRule`
- `RefreshRequest`
- `ComplianceAuditEvent`

## 8. Types de profils

Le module supporte au minimum :

```text
INDIVIDUAL
MERCHANT_SOLE_TRADER
MERCHANT_COMPANY
BUSINESS
AGENT
PUBLIC_ORGANIZATION
NON_PROFIT
PARTNER_ORGANIZATION
```

Chaque type possède sa propre politique de documents, contrôles, seuils et niveaux.

## 9. États d’un dossier

États minimaux :

```text
DRAFT
IN_PROGRESS
AWAITING_DOCUMENTS
AWAITING_USER_ACTION
AUTOMATED_REVIEW
MANUAL_REVIEW
APPROVED
REJECTED
SUSPENDED
EXPIRED
CANCELLED
```

Les transitions sont contrôlées par une machine à états et auditées.

## 10. Niveaux de vérification

Les niveaux ne sont jamais codés en dur de manière universelle. Une configuration de pays peut définir par exemple :

```text
LEVEL_0_UNVERIFIED
LEVEL_1_BASIC
LEVEL_2_STANDARD
LEVEL_3_ENHANCED
```

Chaque niveau détermine les produits accessibles, limites de transaction, limites de solde, canaux autorisés et exigences complémentaires.

## 11. Politique de vérification

Une `VerificationPolicy` est définie par :

- pays ;
- type de profil ;
- produit ou canal ;
- niveau cible ;
- documents exigés ;
- contrôles automatiques ;
- contrôles manuels ;
- règles d’expiration ;
- seuils de risque ;
- contraintes de résidence ;
- version de politique ;
- date d’entrée en vigueur.

Une décision conserve la version exacte de la politique utilisée.

## 12. KYC particulier

Le dossier particulier peut collecter selon la politique applicable :

- nom et prénoms ;
- date de naissance ;
- pays et lieu de naissance ;
- nationalité ;
- sexe lorsque légalement nécessaire ;
- adresse ;
- téléphone ;
- e-mail ;
- profession ou activité ;
- source de fonds lorsque requise ;
- pièce d’identité ;
- justificatif d’adresse ;
- photo ou selfie de vérification lorsque autorisé ;
- informations fiscales lorsque obligatoires.

Le système doit distinguer donnée déclarée, donnée vérifiée et donnée provenant d’une source tierce.

## 13. KYB organisation

Le KYB couvre notamment :

- raison sociale ;
- nom commercial ;
- forme juridique ;
- pays d’immatriculation ;
- numéro d’enregistrement ;
- identifiant fiscal lorsque requis ;
- adresse du siège ;
- activité principale ;
- date de création ;
- représentants légaux ;
- bénéficiaires effectifs ;
- documents constitutifs ;
- licences ou autorisations lorsque l’activité l’exige ;
- coordonnées professionnelles ;
- informations de compte de règlement si applicables.

## 14. Représentants légaux

Chaque représentant légal possède un lien typé avec l’organisation, une période de validité, des pouvoirs et son propre statut de vérification.

Une organisation ne peut pas être déclarée complètement vérifiée si les représentants nécessaires ne satisfont pas la politique applicable.

## 15. Bénéficiaires effectifs

Les bénéficiaires effectifs sont gérés comme des personnes distinctes liées à l’organisation avec :

- type de contrôle ;
- pourcentage de détention si applicable ;
- chaîne de propriété ;
- date d’effet ;
- source de preuve ;
- statut de vérification.

Les seuils de déclaration sont configurés par juridiction et ne sont pas codés en dur dans le domaine.

## 16. Documents

Un `VerificationDocument` contient uniquement les métadonnées métier et une référence sécurisée vers le stockage documentaire.

Champs minimaux :

- identifiant ;
- type ;
- titulaire ;
- pays émetteur ;
- numéro masqué ;
- date d’émission ;
- date d’expiration ;
- référence de stockage ;
- empreinte cryptographique ;
- statut ;
- date de réception ;
- origine ;
- version.

## 17. Types de documents

Exemples configurables :

```text
NATIONAL_ID
PASSPORT
RESIDENCE_PERMIT
DRIVING_LICENCE
PROOF_OF_ADDRESS
BIRTH_CERTIFICATE
BUSINESS_REGISTRATION
TAX_CERTIFICATE
ARTICLES_OF_ASSOCIATION
OPERATING_LICENCE
BANK_STATEMENT
REPRESENTATIVE_MANDATE
OTHER
```

La disponibilité dépend du pays et du profil.

## 18. Stockage documentaire

Les documents sont stockés dans un service sécurisé séparé avec :

- chiffrement au repos ;
- chiffrement en transit ;
- contrôle d’accès par rôle et finalité ;
- URLs temporaires ;
- journal d’accès ;
- politique de rétention ;
- suppression contrôlée ;
- antivirus ou analyse de fichier ;
- vérification MIME et taille ;
- interdiction d’exécution.

## 19. Vérification documentaire

Un `DocumentCheck` peut contenir :

- extraction OCR ;
- contrôle de lisibilité ;
- détection de document expiré ;
- cohérence nom/date de naissance ;
- contrôle de format ;
- contrôle de sécurité si le fournisseur le permet ;
- comparaison avec données déclarées ;
- score de confiance ;
- codes d’erreur normalisés.

Le score seul ne constitue jamais une preuve suffisante sans règle de décision associée.

## 20. Preuve de vie

La preuve de vie est facultative et activée uniquement lorsqu’elle est nécessaire, proportionnée et légalement autorisée.

Résultats normalisés :

```text
NOT_REQUIRED
PENDING
PASSED
FAILED
INCONCLUSIVE
PROVIDER_ERROR
```

Aucune image biométrique brute ne doit être diffusée dans les logs ou événements.

## 21. Contrôle de cohérence

Le moteur compare les déclarations avec les informations vérifiées selon des règles tolérantes aux variations de format : accents, ordre des noms, translittération, espaces, formats de date et numéros de document.

Les différences significatives déclenchent une action : correction utilisateur, nouvelle preuve ou revue manuelle.

## 22. Screening conformité

Les contrôles de sanctions, PEP et listes de surveillance sont exécutés uniquement via sources et fournisseurs validés par l’équipe conformité.

Le domaine stocke :

- fournisseur ;
- type de liste ;
- date du contrôle ;
- version ou référence de source ;
- score de correspondance ;
- résultat normalisé ;
- décision humaine éventuelle.

## 23. Correspondances de screening

États :

```text
NO_MATCH
POTENTIAL_MATCH
CONFIRMED_MATCH
FALSE_POSITIVE
NEEDS_REVIEW
```

Une correspondance potentielle ne provoque pas automatiquement une accusation ou une suppression de compte. Elle déclenche le workflow prévu par la politique conformité.

## 24. Évaluation du risque d’entrée en relation

Le `RiskAssessment` peut considérer :

- pays ;
- type de client ;
- activité ;
- produit demandé ;
- canal ;
- source de fonds ;
- structure juridique ;
- résultats de screening ;
- incohérences documentaires ;
- signaux de fraude ;
- historique Mansa lorsqu’il existe.

Les facteurs et pondérations sont versionnés et auditables.

## 25. Catégories de risque

Exemple interne configurable :

```text
LOW
STANDARD
ELEVATED
HIGH
PROHIBITED
```

La catégorie détermine le niveau de diligence, les validations requises et la fréquence de réexamen.

## 26. Revue manuelle

Une revue manuelle crée une `VerificationTask` assignable à un opérateur ou une file.

Elle contient :

- motif ;
- priorité ;
- SLA ;
- données nécessaires ;
- documents accessibles ;
- historique ;
- actions permises ;
- décision finale ;
- commentaire obligatoire selon le résultat.

## 27. Principe des quatre yeux

Les dossiers à risque élevé ou opérations sensibles peuvent exiger une double validation.

Le second approbateur doit être distinct du premier et disposer du rôle requis.

Les règles de quatre yeux sont configurables par politique.

## 28. Décisions

Décisions minimales :

```text
APPROVE
APPROVE_WITH_LIMITS
REQUEST_MORE_INFORMATION
REJECT
SUSPEND
ESCALATE
```

Chaque décision contient un code de motif structuré et, lorsque nécessaire, un commentaire interne.

## 29. Motifs de décision

Les motifs sont catalogués et versionnés pour permettre reporting et audit.

Exemples : document illisible, document expiré, données incohérentes, vérification externe indisponible, justificatif manquant, correspondance à revoir, risque supérieur au seuil, exigence réglementaire non satisfaite.

## 30. Demande de complément

Une demande de complément doit indiquer précisément :

- ce qui manque ;
- pourquoi c’est nécessaire ;
- formats acceptés ;
- date limite éventuelle ;
- canal de soumission ;
- statut de chaque exigence.

Le système évite de demander à nouveau un document déjà valide et encore applicable.

## 31. Expiration et renouvellement

Les documents et contrôles peuvent expirer selon :

- date du document ;
- politique pays ;
- changement de risque ;
- changement d’identité ;
- changement de structure juridique ;
- fréquence de revue périodique.

Le renouvellement peut être anticipé par notification avant expiration.

## 32. Réexamen périodique

Le système planifie des `RefreshRequest` selon le niveau de risque et la politique.

Un réexamen ne doit pas effacer l’historique précédent. Chaque cycle constitue une nouvelle version du dossier.

## 33. Changement d’identité

Les changements sensibles de nom, date de naissance, nationalité, représentants légaux, bénéficiaires effectifs ou documents juridiques déclenchent une réévaluation configurable.

Les anciennes valeurs restent historisées selon la politique de conservation.

## 34. Restrictions produits

Le niveau de vérification peut conditionner :

- création de wallet ;
- solde maximal ;
- transferts ;
- retraits ;
- paiement marchand ;
- carte virtuelle ;
- carte physique ;
- recharge ;
- paiement international ;
- accès agent ;
- accès marchand ;
- fonctionnalités État.

Les domaines consommateurs interrogent une décision de politique et ne reproduisent pas les règles KYC en local.

## 35. Limites financières

Les limites sont calculées par un moteur de limites central à partir du niveau KYC/KYB, du pays, du produit, du risque et des règles partenaires.

Le module KYC fournit les attributs de conformité ; il ne modifie jamais directement un solde.

## 36. Suspension

Une vérification peut être suspendue sans supprimer le compte identité.

Motifs possibles : document expiré, réexamen requis, alerte conformité, anomalie grave, demande partenaire ou exigence réglementaire.

La suspension publie un événement consommable par les domaines financiers.

## 37. Rejet

Un rejet est irréversible uniquement si la politique l’exige. Sinon un nouveau dossier peut être autorisé après délai, correction ou nouvelle preuve.

Le détail interne d’un contrôle sensible n’est pas nécessairement affiché à l’utilisateur lorsque cela créerait un risque de contournement.

## 38. Fournisseurs externes

Chaque fournisseur est isolé derrière une interface interne :

```text
VerificationProvider
DocumentVerificationProvider
LivenessProvider
ScreeningProvider
RegistryProvider
```

Le cœur métier ne dépend jamais directement d’un SDK externe.

## 39. Résilience fournisseur

Le système gère :

- timeout ;
- retry contrôlé ;
- idempotence ;
- circuit breaker ;
- indisponibilité ;
- réponse partielle ;
- changement de fournisseur ;
- reprise manuelle.

Une panne fournisseur ne transforme jamais un contrôle non réalisé en contrôle réussi.

## 40. Idempotence

Toute création de dossier, soumission de document et demande de vérification externe utilise une clé d’idempotence.

Les webhooks fournisseurs sont dédupliqués par identifiant externe et empreinte.

## 41. Webhooks externes

Les webhooks doivent être :

- authentifiés ;
- vérifiés cryptographiquement lorsque possible ;
- horodatés ;
- dédupliqués ;
- journalisés ;
- traités de manière asynchrone ;
- rejouables sans double décision.

## 42. Événements internes

Événements minimaux :

```text
verification.case.created
verification.document.received
verification.document.checked
verification.screening.completed
verification.review.requested
verification.more_information.requested
verification.approved
verification.rejected
verification.suspended
verification.expired
verification.refreshed
kyb.beneficial_owner.changed
kyb.legal_representative.changed
```

Chaque événement possède version de schéma, corrélation, auteur logique et horodatage.

## 43. API publique interne

Endpoints indicatifs :

```text
POST   /v1/verifications/cases
GET    /v1/verifications/cases/:id
POST   /v1/verifications/cases/:id/documents
GET    /v1/verifications/cases/:id/requirements
POST   /v1/verifications/cases/:id/submit
POST   /v1/verifications/cases/:id/actions/request-information
POST   /v1/verifications/cases/:id/actions/cancel
GET    /v1/verifications/profiles/:subjectId/status
```

Les endpoints d’administration et de revue sont séparés des endpoints utilisateur.

## 44. API administration

Endpoints indicatifs :

```text
GET  /v1/admin/verifications/review-queue
GET  /v1/admin/verifications/cases/:id
POST /v1/admin/verifications/cases/:id/decision
POST /v1/admin/verifications/cases/:id/assign
POST /v1/admin/verifications/cases/:id/escalate
GET  /v1/admin/verifications/policies
```

Les droits sont contrôlés par RBAC et ABAC.

## 45. Permissions

Rôles indicatifs :

```text
KYC_VIEWER
KYC_REVIEWER
KYC_SENIOR_REVIEWER
KYB_REVIEWER
COMPLIANCE_OFFICER
COMPLIANCE_ADMIN
AUDITOR
SUPPORT_LIMITED
```

L’accès aux documents bruts peut être plus restrictif que l’accès au statut du dossier.

## 46. Séparation des responsabilités

Un agent support peut voir qu’un document est manquant sans pouvoir consulter son contenu.

Un opérateur conformité peut revoir un dossier sans modifier les données financières.

Un administrateur technique ne reçoit pas automatiquement le droit d’accéder aux documents d’identité.

## 47. Journal d’audit

Le journal conserve notamment :

- ouverture de dossier ;
- upload ;
- consultation de document ;
- résultat de contrôle ;
- changement de statut ;
- demande de complément ;
- assignation ;
- décision ;
- changement de politique ;
- export ;
- suppression ou anonymisation ;
- accès administratif exceptionnel.

## 48. Protection des données

Les données sont classifiées au minimum en : publique, interne, confidentielle, donnée personnelle sensible et secret.

Les documents d’identité sont traités comme données fortement sensibles avec accès minimal et traçabilité renforcée.

## 49. Minimisation

Le système ne collecte que les informations nécessaires au niveau et au produit concernés.

Une exigence supplémentaire doit être justifiée par une politique versionnée.

## 50. Rétention et suppression

La durée de conservation est définie par pays, type de donnée, relation client et obligations applicables.

Une suppression logique ou physique respecte les obligations légales, litiges en cours et périodes de conservation obligatoires.

Les fichiers supprimés ne doivent pas rester disponibles via d’anciennes URLs temporaires.

## 51. Chiffrement

Les données sensibles utilisent :

- TLS en transit ;
- chiffrement fort au repos ;
- clés gérées hors code source ;
- rotation ;
- séparation par environnement ;
- contrôle d’accès aux clés ;
- journalisation des opérations administratives.

## 52. Logs

Les logs ne contiennent jamais :

- image brute de document ;
- selfie ;
- numéro complet de pièce ;
- secret d’API ;
- token d’accès ;
- donnée biométrique brute.

Les identifiants personnels sont masqués lorsque possible.

## 53. Notifications utilisateur

Notifications possibles :

- dossier démarré ;
- document reçu ;
- document rejeté avec motif exploitable ;
- complément requis ;
- dossier approuvé ;
- renouvellement prochain ;
- vérification expirée ;
- action urgente requise.

Les notifications ne révèlent pas les détails internes d’un screening sensible.

## 54. SLA et files de travail

Les files de revue sont triées selon :

- risque ;
- ancienneté ;
- produit ;
- montant potentiel ;
- pays ;
- type de dossier ;
- niveau demandé ;
- date limite.

Les dépassements de SLA génèrent une alerte opérationnelle.

## 55. Observabilité

Métriques minimales :

- dossiers créés ;
- taux de complétion ;
- temps moyen de vérification ;
- taux de revue manuelle ;
- taux de rejet ;
- taux de complément ;
- erreurs fournisseur ;
- latence fournisseur ;
- documents expirant ;
- dossiers bloqués ;
- faux positifs de screening ;
- backlog de revue ;
- respect SLA.

## 56. Analytics

Les rapports agrégés doivent éviter l’exposition de données personnelles inutiles.

Les tableaux de bord présentent des volumes, délais, taux, pays, canaux et motifs structurés avec contrôle d’accès.

## 57. Tests unitaires

Couvrir au minimum :

- transitions d’état ;
- calcul des exigences ;
- version de politique ;
- expiration ;
- règles de décision ;
- restrictions de niveau ;
- quatre yeux ;
- déduplication webhook ;
- masquage des données.

## 58. Tests d’intégration

Tester :

- stockage sécurisé ;
- fournisseurs mock ;
- webhooks ;
- événements ;
- notifications ;
- interactions Wallet et limites ;
- gestion des erreurs ;
- réexamen ;
- migration de politique.

## 59. Tests de sécurité

Inclure :

- accès horizontal à un dossier tiers ;
- accès vertical sans rôle ;
- URL de document expirée ;
- upload malveillant ;
- spoofing MIME ;
- fuite de PII dans logs ;
- rejeu webhook ;
- modification de décision ;
- contournement quatre yeux ;
- injection dans métadonnées.

## 60. Données de test

Les environnements hors production utilisent uniquement des données synthétiques ou explicitement autorisées.

Aucun document réel de client ne doit être copié de Production vers Démo ou Recette.

## 61. Configuration multi-pays

Chaque pays dispose de :

- types de documents ;
- niveaux ;
- seuils ;
- règles de réexamen ;
- fournisseurs disponibles ;
- exigences KYB ;
- langues ;
- formats de données ;
- politiques de conservation ;
- limites de produits associées.

Le déploiement d’un nouveau pays ne doit pas nécessiter de fork du domaine KYC/KYB.

## 62. Migration et versionnement

Les politiques sont immuables après activation. Toute modification crée une nouvelle version.

Les dossiers existants conservent la politique de décision historique tout en pouvant recevoir une obligation de migration ou de réexamen explicite.

## 63. Critères d’acceptation

Le module est acceptable lorsque :

- un particulier peut compléter un KYC de bout en bout ;
- une organisation peut compléter un KYB avec représentants et bénéficiaires effectifs ;
- les documents sont stockés de manière sécurisée ;
- les fournisseurs externes sont remplaçables ;
- les décisions automatiques et manuelles sont auditables ;
- les niveaux conditionnent correctement les produits et limites ;
- l’expiration et le réexamen fonctionnent ;
- les données personnelles ne fuient pas dans les logs ;
- les accès administratifs respectent RBAC/ABAC ;
- les tests de sécurité et d’intégration critiques passent.

## 64. Définition de terminé

Le module est terminé lorsque les contrats API, modèles, politiques, workflows KYC/KYB, documents, contrôles, screening, niveaux, restrictions, revues manuelles, sécurité, audit, observabilité, intégrations et tests sont cohérents avec le reste de Mansa, et qu’un nouveau pays, fournisseur de vérification ou niveau de conformité peut être ajouté sans réécrire le cœur du domaine.
