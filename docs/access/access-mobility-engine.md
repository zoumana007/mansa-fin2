# Mansa Access & Mobility Engine

## 1. Objet

Ce module définit une couche transversale réutilisable pour les usages d’accès, mobilité, parking, transport, flotte, station-service, campus, entreprise et services publics ou privés.

Principe : `identifiant → règles → autorisation/paiement → équipement → preuve d’usage → audit`.

Le moteur est multi-tenant, configurable, multi-fournisseurs et ne remplace pas les modules financiers Mansa existants.

## 2. Cas d’usage

Le moteur couvre notamment : parking d’entreprise, parking public ou privé, accès de site, campus, cartes étudiantes, badges salariés, transport collectif, abonnements transport, flottes, stations-service, péages privés ou concessionnés, restauration d’entreprise ou universitaire et services associés à un compte Mansa.

## 3. Modèle métier

Concepts minimaux :

```text
AccessOrganization
AccessSite
AccessZone
AccessPoint
AccessDevice
Credential
CredentialAssignment
AccessPolicy
AccessRule
Entitlement
Subscription
Vehicle
FleetAccount
UsageEvent
AuthorizationDecision
PaymentInstruction
DeviceCommand
AccessAuditEvent
```

Chaque organisation conserve ses propres règles, équipements, supports, historiques et données.

## 4. Supports et identifiants

Le moteur doit pouvoir gérer, selon le cas :

- UHF RFID ;
- carte RFID/NFC ;
- NFC mobile ;
- QR statique ou dynamique ;
- code-barres ;
- plaque d’immatriculation via un système compatible ;
- carte Mansa ;
- compte Mansa ;
- badge employé ;
- carte étudiante ;
- pass visiteur ;
- autre support via adaptateur.

Aucun support ne doit contenir en clair des secrets financiers.

## 5. Carte et badge multiservice

Une carte ou un badge peut servir à plusieurs usages : identité visuelle, accès, transport, restauration, bibliothèque, parking, paiement, avantages salarié, campus ou services internes.

Chaque droit est indépendant, configurable et révocable.

États recommandés : `PENDING`, `ACTIVE`, `SUSPENDED`, `BLOCKED`, `LOST`, `STOLEN`, `EXPIRED`, `REVOKED`, `REPLACED`.

## 6. Association des supports

Un support peut être associé à une personne, un étudiant, un employé, un visiteur, un véhicule, une flotte, une organisation, un compte, un abonnement ou un ensemble de droits.

Les changements d’association sont historisés et audités.

## 7. Moteur de règles

Les règles doivent être paramétrables sans modifier le code pour les cas standards.

Exemples : site autorisé, horaires, zones, nombre de passages, abonnement actif, plafond journalier ou mensuel, véhicule autorisé, type de carburant, montant maximum, gratuité, tarif étudiant, tarif salarié ou validation opérateur.

Décisions possibles : `ALLOW`, `DENY`, `REQUIRE_PAYMENT`, `REQUIRE_SECOND_FACTOR`, `REQUIRE_OPERATOR`, `OFFLINE_ALLOW_LIMITED`, `OFFLINE_DENY`.

Toute décision conserve la règle et sa version, l’heure, le contexte, le support, l’objet concerné et le résultat.

## 8. Parking et barrières

Chaîne recommandée :

`badge/RFID/plaque/QR → lecteur → contrôleur local → Access Engine → autorisation ou paiement → commande barrière → capteur de passage → clôture`.

Le système doit gérer entrée, sortie, durée, abonnement, tarif, gratuité, flotte, visiteurs et ouverture manuelle auditée.

## 9. Stations-service et flottes

Une station-service peut utiliser le moteur pour une flotte d’entreprise.

Flux : identification du véhicule ou support, vérification du compte flotte, contrôle des règles, validation du carburant et des plafonds, autorisation, enregistrement du volume et du montant, débit ou facturation selon contrat, reçu et rapprochement.

Règles configurables : type de carburant, montant ou litres maximum, plafond journalier/hebdomadaire/mensuel, stations autorisées, plages horaires, véhicule, conducteur si requis et mode de facturation.

## 10. Compte flotte

Un `FleetAccount` peut regrouper plusieurs véhicules et supports avec : budget global, budget par véhicule, plafonds, alertes, suspension, exports, facturation centralisée, rapprochement et analytique.

## 11. Transport public et privé

Le moteur doit supporter ticket unitaire, carnet, abonnement journalier, hebdomadaire, mensuel ou annuel, tarifs étudiant/salarié/social, gratuité, zones, correspondances et plafonnement tarifaire lorsque configuré.

Supports possibles : carte transport, carte étudiante, carte employé, NFC mobile, QR, compte Mansa et carte bancaire sans contact lorsque l’architecture d’acceptation le permet.

## 12. Mode hors ligne

Les lecteurs, valideurs et contrôleurs doivent pouvoir fonctionner temporairement sans Internet selon des limites configurées.

Le mode offline doit utiliser des règles locales signées, des droits à durée limitée, des journaux locaux, des clés d’idempotence et une resynchronisation ultérieure sans double débit.

## 13. Entreprises et établissements

Une entreprise peut gérer employés, badges, véhicules, visiteurs, sites, zones, horaires, abonnements, budgets et révocations.

Une école ou université peut associer une carte étudiante à l’accès campus, transport, bibliothèque, restauration, logement et autres services activés par l’établissement.

## 14. Paiement et facturation

Modes possibles : `FREE`, `PREPAID`, `PAY_PER_USE`, `POSTPAID`, `SUBSCRIPTION`, `CORPORATE_BILLED`, `GOVERNMENT_FUNDED`, `SPONSORED`, `MIXED`.

Les paiements utilisent le ledger et les modules financiers Mansa existants. Aucun ledger parallèle ne doit être créé.

Canaux possibles selon configuration : wallet Mansa, carte Mansa, carte bancaire via acquéreur, Mobile Money, banque, compte entreprise, abonnement, QR et espèces uniquement dans les parcours explicitement prévus.

## 15. Matériel multi-fournisseurs

Le domaine métier ne doit dépendre d’aucun fabricant unique.

Équipements possibles : lecteurs UHF RFID, lecteurs NFC, lecteurs QR, caméras de lecture de plaque, barrières, portiques, tourniquets, valideurs transport, contrôleurs industriels, terminaux Android, TPE et équipements de station-service disposant d’une interface compatible.

Adaptateurs recommandés :

```text
AccessDeviceAdapter
CredentialReaderAdapter
BarrierAdapter
TurnstileAdapter
FuelControllerAdapter
PlateRecognitionAdapter
PaymentTerminalAdapter
SensorAdapter
```

Les équipements simples peuvent être pilotés via contact sec, relais ou interface industrielle documentée derrière un contrôleur local sécurisé.

## 16. Sécurité et audit

Doivent être audités : activation et révocation des supports, changement de règles, décisions, paiements, commandes d’équipement, ouvertures manuelles, changements de plafonds et opérations administrateur.

Le système doit prévoir authentification forte pour les rôles sensibles, RBAC/ABAC, chiffrement en transit, secrets hors dépôt, anti-rejeu, révocation immédiate, isolation multi-tenant et minimisation des données.

## 17. Rapprochement physique-numérique

Lorsque des capteurs sont disponibles, le moteur rapproche : identifiant détecté, personne ou véhicule attendu, décision, paiement ou droit, commande envoyée, réponse de l’équipement, passage physique et clôture de l’événement.

## 18. Marque blanche

Le produit doit être personnalisable pour entreprise, université, transporteur, station-service, concessionnaire, administration ou collectivité.

Éléments configurables : nom commercial, logo, couleurs, supports physiques, écrans, reçus, signalétique et mention facultative `Propulsé par Mansa`.

Les identifiants techniques internes restent stables même si le nom commercial change.

## 19. Niveaux de déploiement

Trois niveaux doivent être possibles :

- léger : smartphone/terminal Android, QR/NFC, validation opérateur ;
- semi-automatisé : lecteur dédié, contrôleur local, barrière/tourniquet et gestion d’exception ;
- automatisé : identification automatique, capteurs, commande équipement, supervision et fonctionnement offline sécurisé.

Le client peut déployer progressivement sans acheter immédiatement l’équipement maximal.

## 20. Modèles commerciaux

Deux modèles minimum :

- matériel acheté directement par le client auprès de fournisseurs compatibles, Mansa fournissant logiciel et intégration ;
- matériel fourni, intégré ou revendu par Mansa dans une offre clé en main.

## 21. Exigences de référence pour le péage État

La généralisation du moteur ne modifie pas les décisions déjà prises pour le péage public :

- deux solutions coexistent : (A) péage automatique classique avec barrière et (B) télépéage UHF RFID avec barrière ;
- free-flow sans barrière uniquement comme évolution optionnelle ultérieure ;
- péage classique compatible, selon canaux activés, avec billets et pièces FCFA, carte EMV multi-réseaux, NFC, carte Mansa, wallet Mansa, QR et Mobile Money ;
- Mobile Money activable/désactivable au niveau national, réseau, poste ou voie avec date d’effet et audit ;
- terminal carte compatible avec les réseaux activés par l’acquéreur, notamment Visa et Mastercard lorsque contractuellement disponibles, sans garantir toutes les cartes du monde ;
- télépéage initial fondé sur tags UHF RFID passifs associés à un véhicule et un compte, lecteur/antenne, contrôleur local, relais OPEN, barrière et capteurs de passage ;
- fonctionnement local/hors ligne sécurisé, sans double débit, avec resynchronisation ;
- matériel multi-fournisseurs derrière adaptateurs ;
- trois niveaux d’équipement : voie automatique complète, voie semi-automatique avec gestion sécurisée des espèces, poste numérisé à faible coût ;
- déploiement progressif ;
- matériel acheté directement par l’État/concessionnaire ou fourni/intégré/revendu par Mansa ;
- marque blanche État/concessionnaire pour bornes, tags, écrans, reçus et signalétique, avec mention facultative `Propulsé par Mansa` ;
- anti-corruption : rapprochement véhicule détecté, catégorie, tarif attendu, paiement, ouverture de barrière et passage physique ;
- toute ouverture manuelle est auditée.

## 22. Critères d’acceptation

Le module est correctement spécifié lorsque :

1. une organisation peut créer plusieurs sites et points d’accès ;
2. plusieurs supports peuvent être enregistrés ;
3. un support peut être lié à une personne, un véhicule ou une flotte ;
4. les règles sont configurables et versionnées ;
5. chaque autorisation est auditable ;
6. les équipements sont pilotés via adaptateurs ;
7. le mode offline ne crée pas de double débit ;
8. les ouvertures manuelles sont tracées ;
9. parking, transport, entreprise, campus et flotte peuvent utiliser le même moteur sans partager leurs données ;
10. le ledger Mansa reste la source de vérité financière ;
11. le branding est configurable ;
12. aucun fournisseur matériel unique n’est imposé ;
13. les exigences du péage État restent compatibles et inchangées.
