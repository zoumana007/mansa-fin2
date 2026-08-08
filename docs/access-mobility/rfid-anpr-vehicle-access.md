# Access & Mobility — RFID, ANPR, véhicules et contrôle d’accès

## 1. Objet

Ce document définit un moteur transversal Mansa de contrôle d’accès et de mobilité réutilisable pour :

- péages publics ou privés ;
- parkings ;
- entreprises et sites industriels ;
- stations-service ;
- universités et campus ;
- transports ;
- flottes professionnelles ;
- résidences et sites sécurisés.

Le moteur ne doit pas être codé spécifiquement pour un seul secteur. Les règles sont configurées par organisation, site, voie, véhicule, utilisateur, abonnement et matériel.

## 2. Principe général

Chaîne fonctionnelle recommandée :

`Véhicule → tag RFID UHF + caméra ANPR → contrôleur local → moteur de règles Mansa → abonnement/paiement/autorisation → relais OPEN → barrière → capteur de passage → événement et audit`.

Le RFID sert d’identifiant rapide. La plaque lue par ANPR apporte une vérification supplémentaire contre le transfert frauduleux d’un tag sur un autre véhicule.

## 3. Association RFID, véhicule et plaque

Un tag RFID peut être associé à :

- identifiant du tag ;
- véhicule ;
- plaque ;
- propriétaire ;
- organisation ;
- compte ou wallet ;
- abonnement ;
- statut ;
- sites autorisés ;
- plages horaires ;
- nombre de passages ;
- limites de dépense ;
- règles spécifiques.

Le système doit supporter :

- un tag lié à un seul véhicule ;
- un tag autorisé pour plusieurs véhicules d’une flotte, si la politique le permet ;
- remplacement de véhicule ;
- tag perdu ou volé ;
- suspension immédiate ;
- réaffectation auditée.

## 4. Vérification RFID + plaque

Les politiques doivent être configurables sans modifier le code :

```text
RFID_ONLY
PLATE_ONLY
RFID_AND_PLATE_REQUIRED
RFID_AND_PLATE_PREFERRED
RFID_VALID_PLATE_UNREADABLE_ALLOW_WITH_RULES
RFID_VALID_PLATE_MISMATCH_DENY
MANUAL_REVIEW
```

Exemple :

- RFID valide + plaque attendue = autorisation ;
- RFID valide + plaque illisible = décision selon politique ;
- RFID valide + autre plaque avec forte confiance = refus ou contrôle ;
- RFID expiré = refus ;
- abonnement expiré = refus ;
- véhicule bloqué = refus.

## 5. Caméra ANPR

Une caméra ANPR/LPR doit pouvoir être enregistrée depuis le portail sans changement de code.

Configuration minimale :

- identifiant du matériel ;
- nom ;
- organisation ;
- site ;
- voie ;
- sens entrée/sortie ;
- adresse réseau ;
- fournisseur/protocole ;
- zone de lecture ;
- niveau de confiance minimum ;
- lecteur RFID associé ;
- barrière associée ;
- statut ;
- dernière communication ;
- version du firmware si disponible.

Les secrets d’accès caméra doivent être stockés dans un gestionnaire de secrets ou mécanisme chiffré, jamais dans Git.

## 6. Abstraction multi-fournisseurs

Mansa doit être indépendant d’une marque unique.

Interfaces recommandées :

```text
ANPRProvider
RFIDReaderProvider
BarrierProvider
LaneControllerProvider
VehicleSensorProvider
```

Chaque constructeur est intégré par adaptateur. Les protocoles supportés peuvent inclure API HTTP locale, webhook, SDK, ONVIF lorsque pertinent, Wiegand, RS485, TCP/IP, contact sec ou autres interfaces industrielles documentées.

## 7. Configuration du lecteur RFID

Depuis le portail :

`Matériel → Lecteurs RFID → Ajouter`

Champs :

- nom du lecteur ;
- site ;
- voie ;
- adresse réseau ;
- protocole ;
- portée configurée ;
- antenne(s) ;
- sens de lecture ;
- contrôleur local ;
- politique anti-collision ;
- statut.

Un mode `Tester la lecture` doit permettre de lire un tag et d’afficher son identifiant sans l’activer automatiquement.

## 8. Enrôlement d’un véhicule

Flux recommandé :

1. créer ou sélectionner le véhicule ;
2. saisir ou confirmer la plaque ;
3. lire le tag RFID ;
4. associer le tag au véhicule ;
5. sélectionner compte ou organisation ;
6. sélectionner abonnement ou règles d’accès ;
7. définir sites, voies, horaires et plafonds ;
8. activer ;
9. journaliser l’opération.

Un mode d’import en masse doit permettre aux grandes flottes de charger véhicules et plaques puis d’associer rapidement les tags.

## 9. Moteur d’abonnement

Le système ne doit pas écrire la date de fin dans le tag comme source de vérité. Le tag identifie le véhicule ; Mansa conserve :

- date de début ;
- date de fin ;
- statut ;
- renouvellement ;
- quota ;
- sites autorisés ;
- règles de paiement.

Le même RFID peut donc rester installé pendant plusieurs années tandis que les droits changent côté Mansa.

## 10. Barrière et contrôleur local

La barrière n’a pas besoin de communiquer directement avec le cloud Mansa.

Architecture :

`Mansa / borne locale → contrôleur de voie → relais/contact sec → entrée OPEN/START de la barrière`.

Le contrôleur doit pouvoir :

- recevoir ALLOW/DENY ;
- déclencher une impulsion d’ouverture ;
- lire l’état des capteurs ;
- empêcher une fermeture dangereuse ;
- journaliser les ouvertures manuelles ;
- fonctionner en mode dégradé limité ;
- resynchroniser ensuite.

## 11. Capteurs véhicule

Une voie peut utiliser :

- boucle inductive ;
- cellule photoélectrique ;
- radar ;
- lidar ;
- autre capteur compatible.

Configuration recommandée :

- capteur avant voie : arrivée ;
- capteur zone barrière : sécurité ;
- capteur après barrière : confirmation de sortie.

Une barrière ne doit pas se refermer sur un véhicule présent dans la zone de sécurité.

## 12. Fonctionnement hors ligne

Le contrôleur local peut conserver :

- règles minimales ;
- liste de tags bloqués ;
- abonnements autorisés en cache limité ;
- plafonds hors ligne ;
- horodatage ;
- journal signé d’événements.

Au retour du réseau :

- synchronisation automatique ;
- déduplication ;
- aucun double débit ;
- conservation de l’ordre des événements ;
- alerte en cas d’écart.

## 13. Cas station-service

Une station-service peut utiliser le même moteur :

`RFID/plaque → véhicule reconnu → règles flotte → type de carburant autorisé → plafond → autorisation → paiement/facturation → reçu → reporting entreprise`.

Exemples de règles :

- diesel uniquement ;
- 50 000 FCFA par semaine ;
- stations autorisées ;
- heures autorisées ;
- véhicule précis ;
- chauffeur ou flotte ;
- facturation mensuelle.

## 14. Cas entreprise et parking

Une entreprise peut configurer :

- employés ;
- visiteurs ;
- véhicules ;
- parkings ;
- sites ;
- horaires ;
- abonnements ;
- quotas ;
- accès temporaires ;
- révocation immédiate.

Le portail entreprise permet de gérer ces droits sans intervention développeur.

## 15. Cas université et transport

Le même moteur peut gérer :

- carte étudiant NFC/RFID ;
- badge transport ;
- accès campus ;
- restauration ;
- parking ;
- abonnement ;
- identité ;
- contrôle de validité.

Pour les personnes, NFC sécurisé est généralement préféré pour lecture courte portée. Pour les véhicules, UHF RFID est adapté à la lecture à distance.

## 16. Anti-fraude

Le moteur doit détecter :

- tag utilisé avec plaques différentes ;
- lectures simultanées incompatibles ;
- tag cloné ou réutilisé anormalement ;
- plaque sur liste de blocage ;
- abonnement expiré ;
- ouverture sans transaction ni autorisation ;
- nombre anormal d’ouvertures manuelles ;
- incohérence entre capteurs et événements.

Toute exception doit être auditée.

## 17. Confidentialité

Les historiques de déplacement peuvent être sensibles. Les données doivent être minimisées, conservées selon une durée configurable et accessibles uniquement aux rôles autorisés.

Les images ANPR ne doivent pas être conservées indéfiniment par défaut. La politique de conservation est définie selon besoin opérationnel, antifraude et obligations légales.

## 18. Portail de configuration

Menus recommandés :

```text
Access & Mobility
├── Sites
├── Voies
├── Véhicules
├── Plaques
├── Tags RFID
├── Caméras ANPR
├── Barrières
├── Contrôleurs
├── Capteurs
├── Abonnements
├── Politiques d’accès
├── Événements
├── Alertes
└── Audit
```

Toutes les règles métier doivent être configurables depuis le portail avec permissions, date d’effet, versioning et journal d’audit.

## 19. Suspension, maintenance et panne

Un service, un site, une voie ou un équipement peut adopter les états suivants :

```text
ACTIVE
SUSPENDED
MAINTENANCE
DEGRADED
CLOSED
DISABLED
```

La suspension ne supprime ni les abonnements, ni les véhicules, ni les tags RFID, ni les droits historiques. Une réactivation restaure le service selon les règles en vigueur.

En cas de panne partielle, Mansa doit identifier précisément le composant indisponible : caméra ANPR, lecteur RFID, terminal carte, Mobile Money, réseau, contrôleur, barrière, imprimante ou autre périphérique. Les autres moyens disponibles doivent continuer à fonctionner lorsque cela est sûr.

## 20. Affichage obligatoire sur la borne

L’écran de la borne ou du terminal de voie doit informer immédiatement l’usager de l’état du service.

Exemples :

- `Service temporairement indisponible — utilisez la voie 2.`
- `Télépéage indisponible — veuillez utiliser le paiement à la borne.`
- `Paiement par carte indisponible — autres moyens disponibles.`
- `Connexion momentanément indisponible — traitement en mode dégradé.`
- `Voie fermée pour maintenance.`

Le message affiché doit être configurable par l’organisation, localisable par langue et cohérent avec l’état réel du matériel. Une panne ne doit jamais être présentée comme un paiement refusé par le client.

## 21. Bascule et continuité de service

Selon la nature de l’incident, le moteur peut :

- rediriger vers une autre voie ;
- désactiver uniquement le moyen de paiement en panne ;
- basculer du RFID vers la borne de paiement ;
- basculer de la vérification `RFID_AND_PLATE_REQUIRED` vers une politique dégradée préautorisée ;
- activer un mode local hors ligne ;
- fermer complètement la voie si la sécurité n’est plus garantie.

Toute bascule automatique ou manuelle est journalisée.

## 22. Suspension d’un abonnement et résiliation

Les abonnements liés à Access & Mobility doivent supporter :

```text
ACTIVE
SUSPENDED
EXPIRED
CANCELLED
TERMINATED
```

Une résiliation ou suspension ne supprime jamais l’historique de paiement, de passage ou d’affectation RFID.

La politique financière est configurable par produit et par organisation. Les modes minimaux sont :

```text
NON_REFUNDABLE
PRORATA_REFUND
CREDIT
EXTEND_VALIDITY
MANUAL_DECISION
```

Pour un service public, l’autorité peut configurer un abonnement comme non remboursable après résiliation lorsque son cadre juridique et ses conditions de vente le permettent. Cette règle ne doit pas être codée en dur pour tous les services et tous les clients.

## 23. Suspension du service et traitement de la durée d’abonnement

Lorsqu’un service est suspendu indépendamment de l’usager, l’organisation doit pouvoir choisir une politique explicite :

```text
SUBSCRIPTION_CLOCK_CONTINUES
PAUSE_AND_EXTEND
COMPENSATE_WITH_CREDIT
MANUAL_COMPENSATION
NO_COMPENSATION
```

La politique appliquée doit être versionnée, datée et auditable. Une modification ne doit pas rétroagir silencieusement sur des abonnements déjà conclus.

## 24. Audit des incidents

Chaque incident opérationnel doit pouvoir enregistrer :

- site et voie ;
- équipement concerné ;
- heure de début ;
- heure de fin ;
- cause connue ou supposée ;
- état du service ;
- message présenté aux usagers ;
- mode de secours activé ;
- opérateur ou système à l’origine du changement ;
- nombre de passages et transactions affectés ;
- décision éventuelle de compensation.

Ces données alimentent le reporting de disponibilité, les SLA et les contrôles de conformité.
