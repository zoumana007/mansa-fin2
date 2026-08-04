# 90 — API Publiques, Portail Développeur et Écosystème Partenaires Mansa : intégrations, clés, OAuth, Webhooks, sandbox, quotas, facturation, sécurité, conformité, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet des **API Publiques Mansa**, du **Portail Développeur** et de l’écosystème d’intégration destiné aux partenaires.

Le système doit permettre à des acteurs autorisés de connecter leurs applications, logiciels, sites, terminaux ou systèmes d’information à Mansa.

Les intégrations possibles doivent couvrir notamment :

- paiements ;
- Wallets ;
- transferts ;
- Mobile Money ;
- cartes ;
- Commerce ;
- Hub ;
- commandes ;
- réservations ;
- TPE ;
- Agent ;
- notifications ;
- fidélité ;
- promotions ;
- facturation ;
- identité ;
- KYC et KYB ;
- reporting ;
- remboursements ;
- litiges ;
- webhooks ;
- données partenaires autorisées.

Le système ne doit jamais donner un accès direct à la base de données interne.

Toutes les intégrations doivent passer par des interfaces sécurisées, versionnées, auditées et limitées selon les permissions.

---

## 2. Principe général

Le parcours d’intégration doit être :

```text
Création d’un compte développeur
→ Vérification de l’organisation
→ Création d’une application
→ Sélection des produits API
→ Attribution des permissions
→ Génération des identifiants Sandbox
→ Développement et tests
→ Contrôles techniques et conformité
→ Demande d’accès Production
→ Approbation
→ Activation
→ Suivi, facturation et audit
```

Aucune application ne doit accéder à la Production sans validation.

---

## 3. Acteurs concernés

Le Portail Développeur peut être utilisé par :

- commerçants ;
- entreprises ;
- banques ;
- fintechs ;
- opérateurs Mobile Money ;
- établissements scolaires ;
- universités ;
- administrations ;
- institutions publiques ;
- sociétés de transport ;
- sociétés de livraison ;
- ERP ;
- logiciels de caisse ;
- marketplaces ;
- agences ;
- intégrateurs ;
- développeurs indépendants autorisés ;
- partenaires techniques ;
- éditeurs SaaS ;
- assureurs ;
- entreprises de construction ;
- hôtels ;
- restaurants ;
- associations ;
- ONG ;
- plateformes de réservation.

Chaque acteur doit recevoir uniquement les accès compatibles avec son activité, son contrat et son niveau de vérification.

---

## 4. Produits API

Les produits peuvent être regroupés en familles :

- API Identity ;
- API Authentification ;
- API KYC/KYB ;
- API Wallet ;
- API Paiement ;
- API Transfert ;
- API Mobile Money ;
- API Cartes ;
- API Commerce ;
- API Hub ;
- API Commandes ;
- API Réservations ;
- API Facturation ;
- API Fidélité ;
- API Promotions ;
- API Notifications ;
- API TPE ;
- API Agent ;
- API Reporting ;
- API Litiges ;
- API Publicité ;
- API Parrainage ;
- API Open Banking éventuelle ;
- API Administration partenaire ;
- API Webhooks.

---

## 5. Portail Développeur

Le portail doit permettre :

- création de compte ;
- connexion ;
- gestion de l’organisation ;
- vérification KYB ;
- création d’applications ;
- gestion des environnements ;
- gestion des clés ;
- gestion OAuth ;
- documentation ;
- console API ;
- Sandbox ;
- logs ;
- Webhooks ;
- quotas ;
- facturation ;
- support ;
- tickets ;
- rapports ;
- demandes de Production ;
- statut de conformité ;
- incidents ;
- historique.

---

## 6. Organisations

Chaque compte développeur doit être rattaché à une organisation.

Une organisation peut contenir :

- nom ;
- type ;
- pays ;
- activité ;
- représentant ;
- KYB ;
- adresse ;
- site ;
- contrat ;
- statut ;
- équipe ;
- applications ;
- moyens de paiement ;
- factures ;
- environnements ;
- permissions ;
- historique.

---

## 7. Membres d’une organisation

Les rôles possibles :

- propriétaire ;
- administrateur ;
- développeur ;
- sécurité ;
- conformité ;
- finance ;
- support ;
- analyste ;
- lecteur.

Chaque membre doit disposer de permissions limitées.

---

## 8. Applications partenaires

Une organisation peut créer plusieurs applications.

Chaque application doit contenir :

- nom ;
- description ;
- type ;
- environnement ;
- pays ;
- produits API ;
- scopes ;
- URLs ;
- redirect URIs ;
- Webhooks ;
- clés ;
- secret ;
- certificats ;
- statut ;
- propriétaire ;
- version ;
- historique ;
- restrictions.

---

## 9. Types d’application

Exemples :

- application mobile ;
- application Web ;
- backend serveur ;
- terminal TPE ;
- ERP ;
- caisse ;
- plugin e-commerce ;
- application Agent ;
- système institutionnel ;
- application partenaire ;
- service automatisé ;
- script interne autorisé ;
- connecteur SaaS ;
- borne ;
- appareil embarqué.

---

## 10. Environnements

Le système doit séparer :

```text
LOCAL
DEVELOPMENT
SANDBOX
TEST
CERTIFICATION
PRODUCTION
```

Chaque environnement doit utiliser :

- identifiants distincts ;
- données distinctes ;
- endpoints distincts ;
- clés distinctes ;
- limites distinctes ;
- secrets distincts ;
- journaux distincts.

---

## 11. Sandbox

La Sandbox doit permettre :

- utilisateurs fictifs ;
- Wallets fictifs ;
- paiements simulés ;
- cartes simulées ;
- Mobile Money simulé ;
- Webhooks simulés ;
- erreurs contrôlées ;
- remboursements ;
- litiges ;
- scénarios de fraude ;
- changements de statut ;
- tests KYC ;
- tests de performance limités.

Aucun argent réel ne doit circuler dans la Sandbox.

---

## 12. Données Sandbox

Les données Sandbox doivent être :

- fictives ;
- isolées ;
- réinitialisables ;
- documentées ;
- non confondues avec la Production ;
- clairement identifiées ;
- supprimables ;
- générées automatiquement.

---

## 13. Console de test

Le portail peut proposer une console permettant :

- choix de l’endpoint ;
- saisie des paramètres ;
- génération d’un jeton ;
- envoi de requête ;
- affichage de réponse ;
- copie du code ;
- simulation d’erreur ;
- historique ;
- export ;
- visualisation des Webhooks.

---

## 14. Documentation interactive

La documentation doit inclure :

- description ;
- endpoint ;
- méthode ;
- paramètres ;
- corps de requête ;
- réponse ;
- exemples ;
- erreurs ;
- permissions ;
- limites ;
- idempotence ;
- Webhooks ;
- version ;
- SDK ;
- changelog.

---

## 15. Standards

Les API doivent utiliser des standards clairs :

- HTTPS ;
- REST JSON pour les interfaces courantes ;
- OpenAPI ;
- OAuth 2.1 ;
- OpenID Connect si nécessaire ;
- JWT ;
- Webhooks signés ;
- mTLS pour certains partenaires ;
- ISO 8601 ;
- identifiants uniques ;
- UTF-8 ;
- pagination standard ;
- erreurs structurées.

---

## 16. URLs des API

Exemple :

```text
https://api.mansa.app/v1
https://sandbox.api.mansa.app/v1
```

Les URLs doivent être distinctes par environnement.

---

## 17. Versionnement

Le système doit supporter :

```text
/v1/
/v2/
```

Chaque version doit avoir :

- date de publication ;
- statut ;
- documentation ;
- période de support ;
- date de dépréciation ;
- date de suppression ;
- guide de migration.

---

## 18. Compatibilité ascendante

Une modification mineure ne doit pas casser une intégration existante.

Sont normalement compatibles :

- ajout de champ facultatif ;
- ajout d’un endpoint ;
- ajout d’une valeur non bloquante si correctement prévu ;
- ajout d’un Webhook facultatif.

---

## 19. Changements incompatibles

Exemples :

- suppression d’un champ ;
- changement de type ;
- changement de sens ;
- modification de signature ;
- suppression d’un endpoint ;
- modification majeure d’authentification.

Ils doivent nécessiter une nouvelle version.

---

## 20. Changelog

Le Portail doit afficher :

- nouvelle fonctionnalité ;
- correction ;
- modification ;
- dépréciation ;
- incident ;
- changement de quota ;
- changement de sécurité ;
- migration nécessaire.

---

## 21. Authentification des applications

Le système peut utiliser :

- client ID ;
- client secret ;
- OAuth ;
- JWT signé ;
- certificat ;
- mTLS ;
- clé API limitée ;
- signature HMAC ;
- appareil lié.

Le mode doit dépendre du niveau de risque.

---

## 22. Clés API

Chaque clé doit avoir :

- identifiant ;
- nom ;
- application ;
- environnement ;
- date de création ;
- date d’expiration ;
- scopes ;
- statut ;
- dernière utilisation ;
- adresse IP autorisée éventuelle ;
- créateur ;
- rotation ;
- révocation.

---

## 23. Secrets

Un secret ne doit être affiché qu’une seule fois après création, sauf mécanisme sécurisé prévu.

Le système doit permettre :

- régénération ;
- rotation ;
- expiration ;
- révocation ;
- double secret temporaire pendant migration ;
- audit.

---

## 24. Rotation des clés

La rotation doit pouvoir être :

- manuelle ;
- programmée ;
- obligatoire ;
- automatique ;
- imposée après incident ;
- déclenchée après changement d’équipe.

---

## 25. OAuth

OAuth doit permettre :

- autorisation utilisateur ;
- consentement ;
- scopes ;
- code d’autorisation ;
- PKCE ;
- refresh token ;
- révocation ;
- expiration ;
- rotation ;
- gestion d’appareil ;
- redirection sécurisée.

---

## 26. Scopes

Exemples :

```text
identity.read
wallet.read
wallet.create
payment.create
payment.read
refund.create
order.read
order.manage
booking.read
booking.manage
notification.send
report.read
merchant.read
merchant.manage
```

Les scopes doivent être :

- explicites ;
- limités ;
- documentés ;
- approuvés ;
- auditables.

---

## 27. Consentement utilisateur

Lorsqu’une application agit pour un utilisateur, l’écran de consentement doit afficher :

- nom de l’application ;
- organisation ;
- données demandées ;
- actions autorisées ;
- durée ;
- possibilité de refuser ;
- possibilité de révoquer ;
- politique de confidentialité ;
- support.

---

## 28. Révocation du consentement

L’utilisateur doit pouvoir :

- voir les applications connectées ;
- voir leurs accès ;
- révoquer une application ;
- révoquer un scope ;
- consulter la dernière utilisation ;
- signaler une application.

---

## 29. Authentification serveur à serveur

Les intégrations machine-to-machine doivent utiliser :

- identifiants dédiés ;
- scopes limités ;
- IP allowlist éventuelle ;
- mTLS éventuel ;
- certificats ;
- expiration courte ;
- rotation ;
- audit.

---

## 30. mTLS

Le mTLS peut être obligatoire pour :

- banques ;
- Mobile Money ;
- paiements critiques ;
- interfaces État ;
- systèmes institutionnels ;
- opérations sensibles ;
- production à haut volume.

---

## 31. Signature des requêtes

Certaines requêtes doivent inclure :

- timestamp ;
- identifiant de requête ;
- nonce ;
- signature ;
- empreinte du corps ;
- version de signature.

---

## 32. Prévention du rejeu

Le système doit empêcher :

- requêtes anciennes ;
- nonce réutilisé ;
- signature réutilisée ;
- double paiement ;
- double remboursement ;
- double transfert.

---

## 33. Idempotence

Les endpoints sensibles doivent exiger une clé d’idempotence.

Exemples :

```text
POST /payments
POST /transfers
POST /refunds
POST /orders
POST /bookings
```

Une même clé avec une requête différente doit être refusée.

---

## 34. Identifiants de requête

Chaque réponse doit inclure un identifiant permettant :

- support ;
- suivi ;
- corrélation ;
- audit ;
- recherche dans les logs.

Exemple :

```text
X-Request-Id: req_01J...
```

---

## 35. Limitation de débit

Le système doit appliquer :

- limites par clé ;
- limites par application ;
- limites par organisation ;
- limites par endpoint ;
- limites par pays ;
- limites par environnement ;
- limites par risque ;
- limites par offre.

---

## 36. Réponses de quota

Lorsque la limite est atteinte, l’API doit retourner une erreur structurée avec :

- limite ;
- période ;
- consommation ;
- réinitialisation ;
- identifiant de support.

---

## 37. Quotas

Les quotas peuvent concerner :

- requêtes ;
- paiements ;
- Webhooks ;
- exports ;
- utilisateurs ;
- rapports ;
- stockage ;
- clés ;
- applications ;
- appels IA ;
- notifications.

---

## 38. Offres développeur

Exemples :

- Sandbox gratuite ;
- Starter ;
- Standard ;
- Professionnel ;
- Entreprise ;
- Institutionnel ;
- Partenaire stratégique.

---

## 39. Sandbox gratuite

La Sandbox peut inclure sans surcoût :

- documentation ;
- utilisateurs fictifs ;
- paiements fictifs ;
- Webhooks ;
- clés de test ;
- console ;
- petits quotas ;
- SDK ;
- support communautaire.

---

## 40. Production payante

La Production peut être facturée selon :

- abonnement ;
- appel API ;
- transaction ;
- volume ;
- nombre d’applications ;
- support ;
- SLA ;
- environnement ;
- fonctionnalités Premium ;
- certification ;
- stockage.

---

## 41. Facturation

La facturation doit suivre :

- organisation ;
- application ;
- produit API ;
- volume ;
- période ;
- offre ;
- dépassement ;
- taxes ;
- devise ;
- remise ;
- crédit ;
- facture ;
- paiement ;
- statut.

---

## 42. Crédits API

Mansa peut attribuer :

- crédit de test ;
- crédit de migration ;
- crédit partenaire ;
- crédit promotionnel ;
- compensation ;
- crédit contractuel.

Les crédits doivent être :

- limités ;
- expirants ;
- non retirables ;
- traçables.

---

## 43. Tableau de consommation

Le partenaire doit pouvoir consulter :

- appels ;
- erreurs ;
- latence ;
- quotas ;
- coûts ;
- Webhooks ;
- applications ;
- pays ;
- endpoints ;
- consommation journalière ;
- prévision de dépassement.

---

## 44. Alertes de consommation

Le système peut notifier à :

- 50 % ;
- 75 % ;
- 90 % ;
- 100 % ;
- dépassement.

---

## 45. API Identity

Fonctions possibles :

- récupérer le profil autorisé ;
- vérifier l’existence d’un compte selon règles ;
- créer une invitation ;
- gérer un consentement ;
- vérifier un statut ;
- lire des attributs autorisés.

Les documents KYC bruts ne doivent jamais être exposés sans justification et autorisation spécifiques.

---

## 46. API KYC/KYB

Le partenaire peut, selon permissions :

- créer un dossier ;
- envoyer des documents ;
- consulter un statut ;
- répondre à une demande ;
- recevoir un Webhook ;
- vérifier une expiration ;
- lancer une revue.

---

## 47. API Wallet

Fonctions possibles :

- créer un Wallet ;
- lire un Wallet ;
- consulter un solde autorisé ;
- consulter un historique ;
- geler ;
- dégeler selon permission ;
- fermer selon règles ;
- lire les devises.

---

## 48. API Paiement

Fonctions possibles :

- créer une intention ;
- confirmer ;
- consulter ;
- annuler ;
- rembourser ;
- récupérer un reçu ;
- créer un lien ;
- créer un QR ;
- gérer un paiement partagé.

---

## 49. API Transfert

Fonctions possibles :

- initier ;
- estimer les frais ;
- vérifier le bénéficiaire ;
- confirmer ;
- consulter ;
- annuler si possible ;
- recevoir un statut ;
- télécharger une preuve.

---

## 50. API Mobile Money

Le système doit abstraire :

- dépôt ;
- retrait ;
- collecte ;
- décaissement ;
- vérification de statut ;
- annulation ;
- rapprochement ;
- Webhooks ;
- erreurs fournisseur.

---

## 51. API Cartes

Selon contrat :

- commander ;
- créer une carte virtuelle ;
- activer ;
- bloquer ;
- débloquer ;
- modifier un plafond ;
- consulter les opérations ;
- gérer une carte jetable ;
- recevoir les événements.

---

## 52. API Commerce

Fonctions possibles :

- créer un commerce ;
- gérer profil ;
- gérer produits ;
- gérer services ;
- consulter ventes ;
- créer paiement ;
- consulter règlements ;
- gérer employés ;
- gérer points de vente.

---

## 53. API Hub

Fonctions possibles :

- recherche ;
- catégories ;
- produits ;
- services ;
- profils ;
- disponibilités ;
- commandes ;
- réservations ;
- favoris ;
- avis ;
- promotions.

---

## 54. API Commandes

Fonctions possibles :

- créer ;
- accepter ;
- refuser ;
- préparer ;
- expédier ;
- livrer ;
- annuler ;
- rembourser ;
- suivre ;
- ajouter une preuve.

---

## 55. API Réservations

Fonctions possibles :

- consulter les disponibilités ;
- réserver ;
- confirmer ;
- refuser ;
- modifier ;
- reporter ;
- annuler ;
- clôturer ;
- déclarer un no-show.

---

## 56. API Notifications

Le partenaire peut envoyer des notifications uniquement :

- à ses utilisateurs autorisés ;
- selon consentement ;
- via modèles approuvés ;
- selon quotas ;
- sans accès direct aux jetons appareils.

---

## 57. API Reporting

Rapports possibles :

- paiements ;
- transactions ;
- commandes ;
- réservations ;
- commissions ;
- règlements ;
- erreurs ;
- volumes ;
- fraude ;
- performance.

---

## 58. API Litiges

Selon permission :

- créer ;
- consulter ;
- répondre ;
- envoyer une preuve ;
- accepter une décision ;
- faire appel ;
- recevoir un statut.

---

## 59. Webhooks

Les Webhooks doivent notifier les événements sans nécessiter un polling permanent.

Exemples :

```text
payment.created
payment.completed
payment.failed
payment.refunded
transfer.completed
wallet.updated
kyc.approved
order.created
order.updated
booking.confirmed
booking.cancelled
card.blocked
dispute.created
```

---

## 60. Configuration d’un Webhook

Chaque endpoint doit contenir :

- URL ;
- événements ;
- environnement ;
- secret ;
- statut ;
- version ;
- date de création ;
- dernière livraison ;
- taux de réussite ;
- utilisateur créateur.

---

## 61. Signature des Webhooks

Chaque Webhook doit inclure :

- identifiant ;
- timestamp ;
- signature ;
- version ;
- événement ;
- tentative ;
- corps.

Le partenaire doit pouvoir vérifier la signature.

---

## 62. Retry des Webhooks

Le système doit gérer :

- nouvelle tentative ;
- délai progressif ;
- nombre maximal ;
- expiration ;
- DLQ ;
- réémission manuelle ;
- suspension après erreurs répétées.

---

## 63. Ordre des événements

Le système ne doit pas garantir implicitement que tous les événements arrivent dans l’ordre, sauf contrat explicite.

Chaque événement doit contenir :

- date ;
- version ;
- identifiant ressource ;
- séquence éventuelle ;
- statut final ou intermédiaire.

---

## 64. Déduplication Webhook

Le partenaire doit pouvoir dédupliquer grâce à un identifiant d’événement unique.

---

## 65. Historique des livraisons

Le portail doit afficher :

- événement ;
- endpoint ;
- statut ;
- code HTTP ;
- durée ;
- tentative ;
- réponse ;
- date ;
- possibilité de rejouer.

Les réponses contenant des secrets doivent être masquées.

---

## 66. SDK

Mansa peut fournir des SDK pour :

- TypeScript ;
- JavaScript ;
- Kotlin ;
- Swift ;
- Java ;
- Python ;
- PHP ;
- C# ;
- Go.

---

## 67. Qualité des SDK

Chaque SDK doit inclure :

- authentification ;
- typage ;
- gestion des erreurs ;
- retries sûrs ;
- idempotence ;
- pagination ;
- Webhooks ;
- exemples ;
- tests ;
- versionnement ;
- documentation.

---

## 68. CLI Mansa

Une interface en ligne de commande peut permettre :

- connexion ;
- création d’application ;
- génération de clé Sandbox ;
- consultation des logs ;
- écoute des Webhooks ;
- déclenchement d’événements de test ;
- validation de configuration ;
- déploiement de modèle Webhook.

---

## 69. Plugins

Mansa peut proposer des plugins pour :

- Shopify ;
- WooCommerce ;
- PrestaShop ;
- Magento ;
- WordPress ;
- ERP ;
- logiciels de caisse ;
- outils comptables ;
- plateformes de réservation ;
- systèmes scolaires.

---

## 70. Connecteurs

Les connecteurs doivent rester isolés du noyau métier.

Exemples :

```text
PaymentConnector
CommerceConnector
ErpConnector
DeliveryConnector
CalendarConnector
AccountingConnector
```

---

## 71. Marketplace d’intégrations

Le Portail peut proposer une marketplace listant :

- plugins officiels ;
- intégrations partenaires ;
- outils certifiés ;
- extensions ;
- connecteurs ;
- applications approuvées.

---

## 72. Publication d’une application

Avant publication, l’application doit être évaluée sur :

- sécurité ;
- confidentialité ;
- qualité ;
- identité de l’éditeur ;
- support ;
- permissions ;
- conformité ;
- expérience utilisateur ;
- stabilité ;
- politique de données.

---

## 73. Statuts d’une application

```text
DRAFT
SANDBOX_ACTIVE
CERTIFICATION_REQUIRED
UNDER_REVIEW
APPROVED
PRODUCTION_ACTIVE
LIMITED
SUSPENDED
REJECTED
REVOKED
ARCHIVED
```

---

## 74. Certification

La certification peut inclure :

- tests fonctionnels ;
- tests sécurité ;
- tests Webhooks ;
- tests idempotence ;
- tests de charge ;
- revue des permissions ;
- revue juridique ;
- revue conformité ;
- revue UX ;
- contrôle des erreurs.

---

## 75. Checklist Production

Avant activation :

- KYB approuvé ;
- contrat signé ;
- politique de confidentialité ;
- URLs HTTPS ;
- secrets sécurisés ;
- Webhooks validés ;
- responsabilités définies ;
- contacts incidents ;
- tests réussis ;
- limites configurées ;
- support disponible ;
- facturation configurée.

---

## 76. Demande de Production

La demande doit préciser :

- cas d’usage ;
- pays ;
- volume estimé ;
- utilisateurs ;
- endpoints ;
- scopes ;
- sécurité ;
- stockage ;
- sous-traitants ;
- conformité ;
- plan d’incident ;
- contacts.

---

## 77. Approbation

Le processus peut être :

```text
Revue technique
→ Revue sécurité
→ Revue conformité
→ Revue commerciale
→ Revue juridique
→ Activation
```

---

## 78. Accès temporaire

Certains accès Production peuvent être :

- limités dans le temps ;
- limités en volume ;
- limités à un groupe pilote ;
- limités à un pays ;
- soumis à revue.

---

## 79. Gestion des erreurs

Les erreurs doivent être structurées.

Exemple :

```json
{
  "error": {
    "code": "PAYMENT_INSUFFICIENT_FUNDS",
    "message": "Le solde disponible est insuffisant.",
    "requestId": "req_01J..."
  }
}
```

---

## 80. Codes d’erreur

Les codes doivent être :

- stables ;
- documentés ;
- traduisibles ;
- distincts du texte ;
- exploitables par machine ;
- non révélateurs de secrets.

---

## 81. Pagination

Le système doit supporter une pagination sûre :

- curseur ;
- limite ;
- page suivante ;
- tri ;
- filtre ;
- cohérence ;
- limite maximale.

---

## 82. Filtres

Les filtres autorisés doivent être :

- documentés ;
- validés ;
- limités ;
- indexés ;
- protégés contre les requêtes coûteuses.

---

## 83. Exports

Les gros exports doivent être asynchrones.

Statuts possibles :

```text
REQUESTED
PROCESSING
READY
FAILED
EXPIRED
```

---

## 84. Fichiers exportés

Les exports doivent utiliser :

- URL temporaire ;
- chiffrement ;
- expiration ;
- contrôle d’accès ;
- audit ;
- suppression automatique.

---

## 85. Logs développeur

Le portail doit afficher :

- requêtes ;
- réponses masquées ;
- latence ;
- statut ;
- endpoint ;
- environnement ;
- request ID ;
- erreurs ;
- consommation.

Les données sensibles doivent être masquées.

---

## 86. Masquage des données

Les logs ne doivent jamais afficher en clair :

- secrets ;
- PIN ;
- CVV ;
- numéro complet de carte ;
- document KYC complet ;
- mot de passe ;
- token complet ;
- données biométriques ;
- clé privée.

---

## 87. Observabilité

Mansa doit surveiller :

- disponibilité ;
- latence ;
- erreurs ;
- quotas ;
- saturation ;
- Webhooks ;
- fournisseurs ;
- régions ;
- dépendances ;
- incidents.

---

## 88. SLA

Les offres peuvent proposer :

- disponibilité cible ;
- délai support ;
- priorité incident ;
- temps de rétablissement ;
- maintenance planifiée ;
- compensation éventuelle.

---

## 89. Page de statut

Le système doit publier :

- disponibilité ;
- incident ;
- maintenance ;
- historique ;
- impact ;
- résolution ;
- abonnement aux alertes.

---

## 90. Incidents partenaires

En cas d’incident :

- identifier les applications affectées ;
- limiter le service ;
- notifier les contacts ;
- publier le statut ;
- révoquer des clés si nécessaire ;
- conserver les preuves ;
- fournir un rapport.

---

## 91. Sécurité des applications

Le système doit vérifier :

- HTTPS ;
- secrets ;
- dépendances ;
- certificats ;
- redirect URIs ;
- permissions ;
- comportement ;
- volumes ;
- géographie ;
- appareil ;
- signatures ;
- vulnérabilités déclarées.

---

## 92. Détection d’abus

Le système doit détecter :

- scraping ;
- exfiltration ;
- appels massifs ;
- clés partagées ;
- fraude ;
- contournement de quota ;
- scans ;
- endpoints sensibles ;
- comportement inhabituel ;
- Webhooks suspects.

---

## 93. Scoring de risque

Chaque application peut recevoir un score selon :

- organisation ;
- activité ;
- permissions ;
- volume ;
- erreurs ;
- pays ;
- incidents ;
- sécurité ;
- historique ;
- conformité.

---

## 94. Actions automatiques

Selon le risque :

- limitation ;
- ralentissement ;
- blocage d’un endpoint ;
- révocation de clé ;
- suspension Sandbox ;
- suspension Production ;
- demande de contrôle ;
- revue manuelle.

---

## 95. Applications compromises

En cas de compromission :

- révoquer les clés ;
- désactiver les jetons ;
- suspendre les Webhooks ;
- informer le partenaire ;
- analyser les accès ;
- identifier les utilisateurs concernés ;
- restaurer avec de nouvelles clés ;
- auditer.

---

## 96. Confidentialité

Le partenaire ne doit accéder qu’aux données nécessaires.

Le système doit appliquer :

- minimisation ;
- scopes ;
- consentement ;
- rétention ;
- chiffrement ;
- suppression ;
- traçabilité ;
- limitation de finalité ;
- contrats.

---

## 97. Sous-traitants

Le partenaire doit déclarer les sous-traitants ayant accès aux données selon les règles applicables.

---

## 98. Localisation des données

Les restrictions peuvent dépendre :

- du pays ;
- du type de donnée ;
- du contrat ;
- du partenaire ;
- de la réglementation ;
- du fournisseur cloud.

---

## 99. Conservation

Chaque donnée doit avoir :

- durée ;
- justification ;
- politique de suppression ;
- exceptions ;
- obligations légales ;
- audit.

---

## 100. Suppression

Lorsqu’une intégration est supprimée :

- révoquer les clés ;
- désactiver les Webhooks ;
- arrêter les nouveaux accès ;
- conserver les audits requis ;
- supprimer les données non nécessaires ;
- informer les utilisateurs si nécessaire.

---

## 101. Conformité

Le Portail doit gérer :

- KYB ;
- contrats ;
- politiques ;
- responsabilités ;
- sous-traitants ;
- sécurité ;
- preuve de consentement ;
- données ;
- incidents ;
- audits ;
- revues périodiques.

---

## 102. Revue périodique

Une organisation peut devoir renouveler :

- KYB ;
- documents ;
- certificats ;
- contrats ;
- accès ;
- scopes ;
- sécurité ;
- contacts ;
- assurance éventuelle.

---

## 103. Support développeur

Canaux possibles :

- documentation ;
- centre d’aide ;
- tickets ;
- e-mail ;
- chat ;
- forum ;
- support prioritaire ;
- gestionnaire partenaire ;
- incidents critiques.

---

## 104. Niveaux de support

Exemples :

- communautaire ;
- standard ;
- prioritaire ;
- entreprise ;
- stratégique ;
- institutionnel.

---

## 105. Tickets

Chaque ticket doit contenir :

- organisation ;
- application ;
- environnement ;
- request ID ;
- endpoint ;
- date ;
- priorité ;
- description ;
- pièces ;
- statut ;
- historique.

---

## 106. Assistant Jini Développeur

Jini peut aider à :

- chercher dans la documentation ;
- expliquer une erreur ;
- générer un exemple ;
- proposer un endpoint ;
- expliquer OAuth ;
- diagnostiquer un Webhook ;
- lire un log masqué ;
- proposer une migration ;
- créer un scénario Sandbox.

Jini ne doit pas exposer :

- secret ;
- clé ;
- donnée client ;
- information interne sensible ;
- accès non autorisé.

---

## 107. Génération de code

Jini peut proposer des exemples pour :

- TypeScript ;
- Kotlin ;
- Swift ;
- Python ;
- Java ;
- PHP ;
- cURL.

Le code doit être présenté comme exemple et nécessiter une validation du développeur.

---

## 108. Administration centrale

L’administration doit pouvoir gérer :

- organisations ;
- applications ;
- produits API ;
- scopes ;
- clés ;
- certificats ;
- environnements ;
- quotas ;
- offres ;
- coûts ;
- factures ;
- Webhooks ;
- versions ;
- documentation ;
- incidents ;
- risques ;
- conformité ;
- certifications ;
- marketplace ;
- support ;
- feature flags ;
- audits.

---

## 109. Séparation des responsabilités

Les rôles doivent séparer :

- commercial ;
- développeur ;
- sécurité ;
- conformité ;
- finance ;
- support ;
- approbation Production ;
- gestion des clés ;
- facturation ;
- audit.

---

## 110. Approbations critiques

Exemples :

```text
Demande de scope sensible
→ Validation métier
→ Validation sécurité
→ Validation conformité
→ Activation
```

---

## 111. API principales du Portail

Exemples :

```http
GET    /developer/organizations
POST   /developer/organizations
GET    /developer/apps
POST   /developer/apps
PATCH  /developer/apps/{appId}
POST   /developer/apps/{appId}/credentials
POST   /developer/apps/{appId}/credentials/rotate
POST   /developer/apps/{appId}/production-request
GET    /developer/apps/{appId}/logs
GET    /developer/apps/{appId}/usage
GET    /developer/apps/{appId}/webhooks
POST   /developer/apps/{appId}/webhooks
POST   /developer/apps/{appId}/webhooks/{webhookId}/test
POST   /developer/apps/{appId}/webhooks/{webhookId}/replay
GET    /developer/billing
GET    /developer/invoices
GET    /developer/documentation
```

---

## 112. Webhooks du Portail

Événements possibles :

```text
developer.organization.created
developer.organization.verified
developer.app.created
developer.app.production_requested
developer.app.approved
developer.app.rejected
developer.app.suspended
developer.credential.created
developer.credential.rotated
developer.credential.revoked
developer.quota.threshold_reached
developer.webhook.failed
developer.invoice.created
developer.incident.created
```

---

## 113. Modèles principaux

- DeveloperOrganization
- DeveloperOrganizationMember
- DeveloperApplication
- DeveloperApplicationEnvironment
- DeveloperCredential
- DeveloperCertificate
- DeveloperScope
- DeveloperProductSubscription
- DeveloperConsent
- DeveloperWebhookEndpoint
- DeveloperWebhookDelivery
- DeveloperApiRequest
- DeveloperUsage
- DeveloperQuota
- DeveloperPlan
- DeveloperInvoice
- DeveloperCredit
- DeveloperProductionRequest
- DeveloperCertification
- DeveloperRiskAssessment
- DeveloperIncident
- DeveloperSupportTicket
- DeveloperAudit
- DeveloperSdkVersion
- DeveloperDocumentationVersion

---

## 114. Rôles

Exemples :

```text
DEVELOPER_ORG_OWNER
DEVELOPER_ORG_ADMIN
DEVELOPER
DEVELOPER_SECURITY_MANAGER
DEVELOPER_COMPLIANCE_MANAGER
DEVELOPER_FINANCE_MANAGER
DEVELOPER_ANALYST
API_PRODUCT_MANAGER
API_SECURITY_ADMIN
API_COMPLIANCE_ADMIN
API_SUPPORT_OPERATOR
API_BILLING_MANAGER
AUDITOR
VIEWER
```

---

## 115. Permissions

Exemples :

```text
developer.organization.read
developer.organization.manage
developer.app.read
developer.app.create
developer.app.manage
developer.credential.create
developer.credential.rotate
developer.credential.revoke
developer.webhook.manage
developer.logs.read
developer.usage.read
developer.billing.read
developer.production.request
developer.production.approve
developer.scope.manage
developer.quota.manage
developer.risk.read
developer.support.manage
developer.audit.read
```

---

## 116. Feature Flags

Exemples :

- Sandbox ;
- console interactive ;
- OAuth ;
- mTLS ;
- clés API ;
- Webhooks ;
- SDK ;
- CLI ;
- plugins ;
- marketplace ;
- facturation à l’usage ;
- crédits API ;
- certifications ;
- Jini Développeur ;
- logs avancés ;
- exports ;
- Open Banking ;
- API institutionnelles.

---

## 117. Reporting

Rapports possibles :

- organisations ;
- applications ;
- clés ;
- requêtes ;
- erreurs ;
- latence ;
- volumes ;
- endpoints ;
- environnements ;
- Webhooks ;
- quotas ;
- factures ;
- coûts ;
- Production ;
- incidents ;
- risques ;
- certifications ;
- pays ;
- SDK ;
- versions ;
- support.

---

## 118. Indicateurs

Exemples :

- développeurs actifs ;
- organisations actives ;
- applications Sandbox ;
- applications Production ;
- requêtes par jour ;
- taux d’erreur ;
- latence moyenne ;
- disponibilité ;
- taux de réussite Webhook ;
- consommation moyenne ;
- revenu API ;
- dépassements ;
- temps d’approbation ;
- incidents ;
- clés expirées ;
- taux de migration de version.

---

## 119. Tests fonctionnels

- création organisation ;
- invitation membre ;
- création application ;
- Sandbox ;
- clé ;
- rotation ;
- OAuth ;
- scope ;
- Webhook ;
- replay ;
- quota ;
- facturation ;
- demande Production ;
- approbation ;
- suspension ;
- documentation ;
- console ;
- SDK ;
- ticket.

---

## 120. Tests de sécurité

- clé exposée ;
- secret réutilisé ;
- accès inter-organisation ;
- scope excessif ;
- redirection OAuth falsifiée ;
- token volé ;
- rejeu ;
- signature invalide ;
- Webhook falsifié ;
- mTLS invalide ;
- escalade ;
- injection ;
- logs sensibles ;
- export ;
- audit.

---

## 121. Tests de performance

- appels massifs ;
- quotas ;
- paiement ;
- reporting ;
- Webhooks ;
- OAuth ;
- Sandbox ;
- exports ;
- logs ;
- plusieurs partenaires ;
- plusieurs pays ;
- haute disponibilité.

---

## 122. Tests de résilience

- partenaire indisponible ;
- Webhook indisponible ;
- base indisponible ;
- file bloquée ;
- certificat expiré ;
- clé révoquée ;
- requête dupliquée ;
- timeout ;
- incident régional ;
- fallback ;
- reprise ;
- migration de version.

---

## 123. Règles métier

1. Aucun partenaire ne doit accéder directement à la base de données.
2. Toute application doit appartenir à une organisation vérifiée avant la Production.
3. Les environnements doivent être strictement séparés.
4. Les secrets ne doivent jamais être enregistrés en clair.
5. Les scopes doivent appliquer le principe du moindre privilège.
6. Les endpoints sensibles doivent utiliser l’idempotence.
7. Les Webhooks doivent être signés.
8. Les événements doivent être déduplicables.
9. Les clés doivent pouvoir être révoquées immédiatement.
10. Les jetons doivent expirer.
11. Les quotas doivent être appliqués avant saturation.
12. Les données sensibles doivent être masquées dans les logs.
13. Les documents KYC ne doivent pas être exposés sans autorisation spécifique.
14. Les utilisateurs doivent pouvoir révoquer leur consentement.
15. Les changements incompatibles nécessitent une nouvelle version.
16. Les versions dépréciées doivent être annoncées.
17. Les gros exports doivent être asynchrones.
18. Les URLs de téléchargement doivent expirer.
19. Les applications compromises doivent pouvoir être suspendues.
20. Les partenaires doivent déclarer les sous-traitants requis.
21. Les coûts doivent être traçables par application.
22. Les environnements Sandbox ne doivent jamais déplacer de fonds réels.
23. Une demande Production doit être approuvée.
24. Les permissions critiques doivent nécessiter plusieurs validations.
25. Les partenaires ne doivent recevoir que les données nécessaires.
26. Les erreurs ne doivent pas révéler d’informations internes sensibles.
27. Les API doivent être observables.
28. Les incidents doivent être audités.
29. Les feature flags doivent permettre de désactiver un produit API.
30. Les audits critiques doivent être immuables.

---

## 124. Ordre de développement recommandé

```text
P1-API-01 — Organisations, membres et applications
P1-API-02 — Environnements et Sandbox
P1-API-03 — Clés, secrets, OAuth et scopes
P1-API-04 — Documentation OpenAPI et console interactive
P1-API-05 — Produits API Wallet, Paiement et Commerce
P1-API-06 — Webhooks, signatures et reprises
P1-API-07 — Quotas, offres, consommation et facturation
P1-API-08 — Demande Production et certification
P1-API-09 — SDK, CLI, plugins et marketplace
P1-API-10 — Sécurité, risque et conformité
P1-API-11 — Support, statut, observabilité et reporting
P1-API-12 — Tests de bout en bout
```

---

## 125. Critères d’acceptation finaux

Le module API Publiques Mansa est validé lorsque :

- une organisation développeur peut être créée ;
- le KYB peut être associé ;
- plusieurs membres peuvent être ajoutés ;
- les rôles sont appliqués ;
- une application peut être créée ;
- plusieurs applications peuvent appartenir à une organisation ;
- les environnements sont séparés ;
- la Sandbox fonctionne sans argent réel ;
- des données fictives peuvent être générées ;
- une console de test est disponible ;
- la documentation est interactive ;
- les endpoints sont versionnés ;
- un changelog est disponible ;
- une clé Sandbox peut être créée ;
- les secrets sont affichés de manière sécurisée ;
- les clés peuvent être tournées ;
- les clés peuvent être révoquées ;
- OAuth fonctionne ;
- PKCE est appliqué lorsque nécessaire ;
- les scopes sont explicites ;
- l’utilisateur peut donner son consentement ;
- l’utilisateur peut révoquer son consentement ;
- l’authentification serveur à serveur fonctionne ;
- le mTLS peut être activé ;
- les requêtes peuvent être signées ;
- les attaques par rejeu sont bloquées ;
- les clés d’idempotence sont prises en charge ;
- chaque requête possède un request ID ;
- les quotas fonctionnent ;
- les limites par application fonctionnent ;
- les alertes de consommation fonctionnent ;
- les offres sont configurables ;
- la Sandbox peut rester gratuite ;
- la Production peut être facturée ;
- les crédits API sont distincts ;
- la consommation est visible ;
- l’API Identity est limitée ;
- l’API KYC/KYB expose uniquement les données autorisées ;
- l’API Wallet fonctionne ;
- l’API Paiement fonctionne ;
- l’API Transfert fonctionne ;
- l’API Mobile Money est abstraite ;
- l’API Cartes peut être activée selon contrat ;
- l’API Commerce fonctionne ;
- l’API Hub fonctionne ;
- l’API Commandes fonctionne ;
- l’API Réservations fonctionne ;
- l’API Notifications respecte les consentements ;
- l’API Reporting est disponible ;
- l’API Litiges est contrôlée ;
- les Webhooks sont configurables ;
- les Webhooks sont signés ;
- les retries fonctionnent ;
- les événements sont déduplicables ;
- les livraisons peuvent être rejouées ;
- les SDK peuvent être publiés ;
- une CLI peut être fournie ;
- les plugins peuvent être ajoutés ;
- les connecteurs sont isolés du noyau ;
- une marketplace d’intégrations peut être activée ;
- une application peut être soumise à certification ;
- les statuts d’application fonctionnent ;
- la checklist Production est appliquée ;
- une demande Production peut être créée ;
- plusieurs validations peuvent être exigées ;
- un accès temporaire peut être accordé ;
- les erreurs sont structurées ;
- les codes d’erreur sont stables ;
- la pagination fonctionne ;
- les exports sont asynchrones ;
- les liens d’export expirent ;
- les logs masquent les données sensibles ;
- l’observabilité est disponible ;
- les SLA sont configurables ;
- une page de statut est disponible ;
- les incidents partenaires sont gérés ;
- les abus sont détectés ;
- les applications compromises peuvent être suspendues ;
- les règles de confidentialité sont appliquées ;
- les sous-traitants peuvent être déclarés ;
- la localisation des données est configurable ;
- la conservation est configurable ;
- la suppression d’intégration révoque les accès ;
- la conformité est suivie ;
- les revues périodiques sont possibles ;
- le support développeur est disponible ;
- Jini Développeur peut expliquer la documentation ;
- Jini ne peut pas exposer de secret ;
- les rôles et permissions sont appliqués ;
- les feature flags sont disponibles ;
- le reporting est disponible ;
- les tests fonctionnels réussissent ;
- les tests de sécurité réussissent ;
- les tests de performance réussissent ;
- les tests de résilience réussissent ;
- les audits critiques sont immuables.
