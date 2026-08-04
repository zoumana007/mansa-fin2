# 86 — Compatibilité multi-appareils, synchronisation et continuité de session Mansa

## 1. Objet du document

Ce document définit le cahier des charges complet de la compatibilité multi-appareils de Mansa.

L’objectif est de permettre à un même utilisateur d’accéder à son compte Mansa depuis plusieurs types d’appareils tout en conservant une expérience cohérente, sécurisée, synchronisée et adaptée à chaque écran.

Le périmètre couvre notamment :

- iPhone ;
- iPad ;
- Apple Watch ;
- smartphones Android ;
- tablettes Android ;
- appareils pliables ;
- montres Wear OS ;
- Mac ;
- PC Windows ;
- Linux ;
- navigateurs Web ;
- PWA ;
- terminaux Android dédiés ;
- TPE ;
- bornes ;
- futurs appareils compatibles.

Mansa ne doit pas être conçu comme une simple application mobile agrandie sur tous les écrans. Chaque plateforme doit proposer une interface, une navigation, des permissions et des fonctionnalités adaptées à son usage réel.

---

## 2. Principe « un compte Mansa, plusieurs appareils »

Un utilisateur doit pouvoir retrouver sur ses appareils autorisés :

- son identité ;
- son profil ;
- ses Wallets ;
- ses cartes ;
- son historique ;
- ses bénéficiaires ;
- ses paramètres ;
- ses favoris ;
- ses rendez-vous ;
- ses commandes ;
- ses notifications ;
- ses préférences d’accessibilité ;
- ses sessions actives ;
- les appareils reconnus.

Les données financières ne doivent jamais dépendre d’un stockage local considéré comme source de vérité.

Le backend Mansa reste la source de vérité pour :

- le Ledger ;
- les soldes ;
- les paiements ;
- les transferts ;
- les cartes ;
- les commandes ;
- les réservations ;
- les droits ;
- les statuts de sécurité.

---

## 3. Plateformes officiellement supportées

### 3.1 Mobile

- iOS ;
- Android ;
- smartphones d’entrée, milieu et haut de gamme ;
- tailles d’écran variées ;
- orientation portrait ;
- orientation paysage lorsque pertinente.

### 3.2 Tablettes

- iPadOS ;
- tablettes Android ;
- tablettes avec clavier ;
- tablettes utilisées en mobilité ;
- tablettes utilisées au comptoir ;
- mode partagé selon les règles métier.

### 3.3 Montres connectées

- watchOS ;
- Wear OS ;
- notifications ;
- consultation rapide ;
- validation limitée ;
- QR ou identifiant temporaire selon sécurité.

### 3.4 Ordinateurs

- macOS ;
- Windows ;
- Linux ;
- ordinateur portable ;
- ordinateur de bureau ;
- écrans multiples ;
- clavier et souris ;
- navigateurs modernes.

### 3.5 Web et PWA

- portail public ;
- portail commerçant ;
- portail administrateur ;
- portail partenaire ;
- portail développeur ;
- installation PWA lorsque adaptée ;
- fonctionnement hors ligne limité ;
- notifications Web selon support.

### 3.6 Terminaux dédiés

- TPE Android ;
- borne libre-service ;
- tablette de caisse ;
- terminal Agent ;
- GAB/DAB selon architecture dédiée ;
- écran d’affichage professionnel.

---

## 4. Applications concernées

La stratégie multi-appareils doit couvrir :

- Application Client ;
- Application Commerce ;
- Application Agent ;
- Application TPE ;
- Admin Lite ;
- Admin Web ;
- Portail Commerçant ;
- Site Public ;
- Hub Annuaire ;
- Jini ;
- Portail Partenaires ;
- Portail Développeurs ;
- interfaces institutionnelles ;
- interfaces État selon droits.

---

## 5. Application Client sur smartphone

L’application Client mobile doit proposer l’expérience principale de Mansa.

Fonctions prioritaires :

- onboarding ;
- connexion ;
- KYC ;
- Wallet ;
- paiements ;
- transferts ;
- cartes ;
- QR ;
- Hub ;
- Mansa Connect ;
- notifications ;
- Jini ;
- profil ;
- sécurité ;
- gestion des appareils.

L’interface doit être optimisée pour l’usage à une main lorsque possible.

---

## 6. Application Client sur tablette

La version tablette ne doit pas être une simple version téléphone étirée.

Elle doit pouvoir proposer :

- navigation latérale ;
- colonnes multiples ;
- affichage simultané d’une liste et d’un détail ;
- tableaux adaptés ;
- meilleure utilisation du paysage ;
- gestion du clavier ;
- gestion de la souris ou du trackpad ;
- fenêtres ou panneaux contextuels ;
- multitâche ;
- glisser-déposer selon les cas ;
- accessibilité renforcée.

Exemples :

- historique à gauche et détail d’une transaction à droite ;
- Hub avec résultats et carte simultanés ;
- messagerie et conversation ouvertes ensemble ;
- cartes et paramètres visibles dans deux panneaux.

---

## 7. Application Commerce multi-appareils

L’application Commerce doit fonctionner sur :

- smartphone ;
- tablette ;
- navigateur ;
- ordinateur ;
- appareil de comptoir.

### 7.1 Smartphone

Priorités :

- encaissement ;
- notifications ;
- commandes ;
- rendez-vous ;
- catalogue rapide ;
- photos produits ;
- remboursements autorisés ;
- suivi du chiffre d’affaires ;
- messagerie.

### 7.2 Tablette

Priorités :

- caisse ;
- gestion du planning ;
- prise de commande ;
- catalogue ;
- employés ;
- rendez-vous ;
- affichage client éventuel ;
- mode comptoir.

### 7.3 Ordinateur

Priorités :

- gestion avancée ;
- catalogue complet ;
- imports ;
- exports ;
- analytics ;
- facturation ;
- administration des employés ;
- mini-site ;
- campagnes ;
- paramètres ;
- Studio Photo IA en lot.

---

## 8. Application Agent multi-appareils

L’application Agent doit être disponible selon les besoins sur :

- smartphone Android ;
- tablette Android ;
- appareil renforcé ;
- terminal de guichet ;
- navigateur interne selon politique.

Elle doit proposer :

- mode terrain ;
- mode guichet ;
- caisse ;
- float ;
- dépôt ;
- retrait ;
- KYC assisté ;
- historique ;
- clôture ;
- impression ou reçu numérique ;
- fonctionnement réseau faible ;
- synchronisation différée sécurisée.

---

## 9. Application TPE

L’application TPE doit être optimisée pour :

- terminaux Android certifiés ;
- écran tactile ;
- lecteur NFC ;
- lecteur de carte ;
- imprimante ;
- scanner ;
- PIN pad selon matériel ;
- mode kiosque ;
- administration distante ;
- mises à jour contrôlées.

Elle ne doit pas être confondue avec l’application Commerce classique même si certains composants peuvent être partagés.

---

## 10. Admin Web

L’Admin Web doit être conçu d’abord pour :

- PC ;
- Mac ;
- écrans larges ;
- double écran ;
- clavier et souris ;
- tableaux complexes ;
- recherche avancée ;
- filtres ;
- exports ;
- actions en masse ;
- audit ;
- supervision.

Une version tablette peut être supportée, mais les actions critiques doivent rester adaptées aux capacités de l’appareil.

---

## 11. Compatibilité Apple

### 11.1 iPhone

- Face ID ;
- Touch ID selon appareil ;
- notifications push ;
- liens universels ;
- partage ;
- appareil photo ;
- QR ;
- NFC selon possibilités ;
- widgets ;
- Live Activities selon usage ;
- Dynamic Island selon usage ;
- Apple Wallet lorsque les partenaires l’autorisent ;
- Apple Pay lorsque l’intégration est disponible.

### 11.2 iPad

- Split View ;
- Stage Manager selon support ;
- clavier ;
- trackpad ;
- orientation paysage ;
- interfaces multi-colonnes ;
- glisser-déposer contrôlé ;
- impression ;
- scan de documents.

### 11.3 Apple Watch

L’Apple Watch doit rester une extension limitée et sécurisée.

Fonctions possibles :

- notifications ;
- consultation d’un solde masqué ou limité ;
- derniers mouvements ;
- rappel de rendez-vous ;
- statut d’une commande ;
- blocage temporaire d’une carte ;
- QR temporaire ;
- validation d’une action non critique ;
- lancement d’une action sur l’iPhone.

Fonctions interdites ou limitées sans validation renforcée :

- modification KYC ;
- changement de bénéficiaire ;
- gros transfert ;
- modification de sécurité ;
- récupération de compte ;
- ajout d’un appareil ;
- changement de numéro.

### 11.4 Mac

Le Mac peut accéder à :

- portails Web ;
- PWA ;
- application desktop éventuelle ;
- application iPad compatible selon stratégie ;
- notifications ;
- gestion avancée Commerce ou Admin.

---

## 12. Compatibilité Android

### 12.1 Smartphones Android

- biométrie ;
- notifications ;
- liens d’application ;
- NFC ;
- caméra ;
- QR ;
- partage ;
- Google Wallet lorsque disponible ;
- gestion des économies de batterie ;
- compatibilité avec plusieurs fabricants.

### 12.2 Tablettes Android

- mode paysage ;
- multi-fenêtres ;
- clavier ;
- souris ;
- interfaces à panneaux ;
- mode comptoir ;
- mode kiosque ;
- profil professionnel géré.

### 12.3 Appareils pliables

L’interface doit gérer :

- changement de posture ;
- écran plié ;
- écran déplié ;
- continuité de l’état ;
- adaptation instantanée ;
- double panneau ;
- zones de charnière.

### 12.4 Wear OS

Fonctions similaires à l’Apple Watch :

- notifications ;
- consultation rapide ;
- statut ;
- QR temporaire ;
- actions limitées ;
- blocage carte ;
- lancement sur téléphone.

---

## 13. Compatibilité Web

Les portails doivent fonctionner sur les navigateurs supportés.

Fonctions attendues :

- responsive ;
- clavier ;
- souris ;
- tactile ;
- navigation accessible ;
- téléchargement contrôlé ;
- impression ;
- partage ;
- notifications Web selon autorisation ;
- gestion des sessions ;
- déconnexion distante ;
- adaptation mobile du Web sans remplacer l’application native.

---

## 14. PWA

Une PWA peut être utilisée pour :

- accès rapide ;
- portail commerçant léger ;
- portail partenaire ;
- fonctions hors ligne limitées ;
- installation sur l’écran d’accueil ;
- cache contrôlé ;
- notifications selon support.

La PWA ne doit pas être utilisée pour contourner les exigences de sécurité des fonctions natives sensibles.

---

## 15. Continuité de session

Un utilisateur peut commencer une action sur un appareil et la reprendre sur un autre lorsque cela est autorisé.

Exemples :

- commencer un KYC sur mobile et terminer sur tablette ;
- préparer une commande sur ordinateur et la suivre sur téléphone ;
- créer une promotion sur Web et la valider sur mobile ;
- consulter une réservation sur montre puis ouvrir le détail sur téléphone ;
- lancer une demande de paiement sur tablette et la confirmer sur TPE.

La continuité ne doit jamais contourner une validation de sécurité.

---

## 16. Types d’état synchronisés

Le système peut synchroniser :

- préférences ;
- thème ;
- langue ;
- accessibilité ;
- favoris ;
- brouillons autorisés ;
- paniers ;
- recherches récentes selon consentement ;
- rendez-vous ;
- commandes ;
- statut de notification ;
- liste des appareils ;
- sessions ;
- réglages de sécurité non sensibles ;
- progression de certains parcours.

---

## 17. Données non synchronisées librement

Certaines données doivent rester limitées à un appareil ou à un contexte :

- clés privées ;
- secrets locaux ;
- données biométriques ;
- jetons de session ;
- données TPE sécurisées ;
- informations temporaires sensibles ;
- cache financier ;
- données hors ligne non encore validées ;
- éléments réglementés par le pays.

---

## 18. Gestion des appareils

Depuis son profil, l’utilisateur doit pouvoir voir :

- nom de l’appareil ;
- type ;
- système ;
- version de l’application ;
- dernière activité ;
- date d’ajout ;
- niveau de confiance ;
- localisation approximative lorsque autorisée ;
- session active ;
- statut ;
- moyen d’authentification ;
- possibilité de renommer ;
- possibilité de révoquer.

---

## 19. Enregistrement d’un nouvel appareil

Lorsqu’un appareil est ajouté, le système doit vérifier selon le risque :

- identifiant du compte ;
- mot de passe ou passkey ;
- appareil déjà approuvé ;
- e-mail ;
- biométrie locale ;
- preuve KYC ;
- code de récupération ;
- validation manuelle ;
- vérification supplémentaire selon le contexte.

Le SMS ne doit pas être obligatoire si une méthode sécurisée alternative est disponible.

---

## 20. Device Binding

Chaque appareil autorisé doit être lié au compte par des mécanismes sécurisés.

Le Device Binding peut utiliser :

- paire de clés ;
- Secure Enclave ;
- Android Keystore ;
- attestation ;
- identifiant d’installation ;
- jeton lié à l’appareil ;
- rotation de clés ;
- certificat selon besoin.

Un simple identifiant matériel ne doit pas être considéré comme une preuve suffisante.

---

## 21. Device Trust

Chaque appareil peut recevoir un niveau de confiance :

- UNKNOWN ;
- NEW ;
- LIMITED ;
- TRUSTED ;
- HIGH_TRUST ;
- SUSPICIOUS ;
- COMPROMISED ;
- REVOKED.

Le niveau peut dépendre :

- ancienneté ;
- biométrie ;
- attestation ;
- comportement ;
- réseau ;
- localisation ;
- version du système ;
- jailbreak ou root ;
- historique de fraude ;
- validation par un autre appareil.

---

## 22. Score de risque appareil

Le système doit pouvoir calculer un score selon :

- nouvel appareil ;
- appareil non reconnu ;
- changement brutal de pays ;
- système obsolète ;
- application modifiée ;
- root ;
- jailbreak ;
- émulateur suspect ;
- automatisation ;
- IP à risque ;
- appareil partagé ;
- sessions multiples inhabituelles ;
- tentatives échouées ;
- comportement anormal.

---

## 23. Limite du nombre d’appareils

Le nombre d’appareils actifs doit être configurable selon :

- type de compte ;
- offre ;
- rôle ;
- pays ;
- niveau de risque ;
- type d’application.

Exemples :

- Client standard : plusieurs appareils personnels avec limite configurable ;
- Agent : appareils autorisés par l’organisation ;
- Commerçant : appareils personnels et professionnels ;
- Admin : appareils gérés et fortement contrôlés ;
- TPE : terminal enregistré individuellement.

---

## 24. Sessions

Chaque session doit contenir :

- identifiant ;
- utilisateur ;
- appareil ;
- application ;
- date de création ;
- dernière activité ;
- expiration ;
- adresse IP ;
- contexte ;
- niveau de confiance ;
- méthode d’authentification ;
- statut ;
- raison de révocation éventuelle.

---

## 25. Révocation de session

L’utilisateur ou un administrateur autorisé doit pouvoir :

- déconnecter un appareil ;
- déconnecter toutes les autres sessions ;
- révoquer un jeton ;
- bloquer un appareil ;
- marquer un appareil perdu ;
- forcer une nouvelle authentification ;
- déclencher une revue de sécurité.

---

## 26. Appareil perdu ou volé

Le parcours doit permettre :

- signalement ;
- révocation immédiate ;
- blocage des sessions ;
- suppression des clés locales lorsque possible ;
- invalidation des données hors ligne ;
- gel facultatif de certaines fonctions ;
- vérification des dernières activités ;
- changement des facteurs d’authentification ;
- audit ;
- récupération sécurisée.

---

## 27. Changement de téléphone

Le système doit permettre une migration contrôlée :

```text
Ancien appareil reconnu
→ Validation du nouvel appareil
→ Transfert des préférences autorisées
→ Création de nouvelles clés
→ Révocation facultative de l’ancien appareil
→ Vérification finale
```

Les clés de sécurité ne doivent pas être copiées directement comme de simples fichiers.

---

## 28. Migration sans ancien appareil

Lorsque l’ancien appareil est indisponible, le système peut utiliser :

- passkey synchronisée selon politique ;
- e-mail vérifié ;
- code de récupération ;
- KYC renforcé ;
- selfie et document ;
- support manuel ;
- délai de sécurité ;
- limitation temporaire ;
- revue de fraude.

---

## 29. Mode hors ligne

Le mode hors ligne doit être limité et contrôlé.

Il peut permettre :

- consultation de certaines données en cache ;
- consultation de reçus ;
- consultation de rendez-vous ;
- brouillons ;
- catalogue ;
- saisie d’une opération Agent selon règles ;
- file d’attente locale chiffrée ;
- synchronisation ultérieure.

Il ne doit jamais afficher un solde local comme vérité garantie si la synchronisation n’est pas à jour.

---

## 30. Actions interdites hors ligne

Sauf protocole spécifique validé, le mode hors ligne ne doit pas permettre :

- double dépense ;
- transfert irréversible ;
- modification de sécurité ;
- ajout de bénéficiaire sensible ;
- gros retrait ;
- changement KYC ;
- révocation d’appareil sans confirmation serveur ;
- création d’un solde local indépendant.

---

## 31. File d’attente locale

Les actions différées doivent contenir :

- identifiant unique ;
- horodatage ;
- appareil ;
- utilisateur ;
- type ;
- payload chiffré ;
- expiration ;
- statut ;
- nombre de tentatives ;
- clé d’idempotence ;
- preuve d’intégrité.

---

## 32. Synchronisation incrémentale

Le système doit éviter de télécharger toutes les données à chaque ouverture.

Il doit utiliser :

- curseurs ;
- versions ;
- timestamps ;
- ETags ;
- delta sync ;
- pagination ;
- cache ;
- invalidation ;
- événements ;
- reprise après coupure.

---

## 33. Conflits de synchronisation

Les conflits peuvent concerner :

- préférences ;
- brouillons ;
- catalogue ;
- planning ;
- stock ;
- rendez-vous ;
- messages ;
- fichiers ;
- paramètres.

Le système doit définir pour chaque type :

- priorité serveur ;
- priorité dernière version ;
- fusion ;
- résolution manuelle ;
- rejet ;
- audit.

Les opérations financières validées ne doivent pas être fusionnées comme de simples documents.

---

## 34. Temps réel

Le temps réel peut utiliser :

- WebSocket ;
- Server-Sent Events ;
- push ;
- polling adaptatif ;
- événements internes ;
- files de messages.

Exemples :

- nouveau paiement ;
- changement de solde ;
- commande ;
- réservation ;
- message ;
- appareil révoqué ;
- alerte de sécurité.

---

## 35. Notifications multi-appareils

Le moteur doit éviter d’envoyer inutilement la même notification à tous les appareils.

Il doit prendre en compte :

- appareil actif ;
- priorité ;
- canal ;
- montre connectée ;
- téléphone ;
- tablette ;
- Web ;
- fuseau horaire ;
- présence de l’utilisateur ;
- notification déjà lue ;
- préférences.

---

## 36. Déduplication des notifications

Une notification doit avoir :

- identifiant global ;
- événement source ;
- utilisateurs cibles ;
- appareils cibles ;
- canaux ;
- statut de lecture ;
- statut d’affichage ;
- expiration ;
- priorité.

Si l’utilisateur lit une notification sur un appareil, les autres doivent pouvoir se mettre à jour.

---

## 37. Sauvegarde locale

Les données locales doivent être :

- minimisées ;
- chiffrées ;
- temporaires ;
- liées à l’appareil ;
- supprimables ;
- invalidées après révocation ;
- séparées selon les profils ;
- protégées contre les captures ou exports selon sensibilité.

---

## 38. Chiffrement

Le système doit appliquer :

- TLS ;
- chiffrement au repos ;
- stockage sécurisé des clés ;
- rotation ;
- séparation des secrets ;
- chiffrement local ;
- effacement logique sécurisé ;
- protection des sauvegardes ;
- gestion des certificats.

---

## 39. Root, jailbreak et appareils compromis

Le système doit détecter ou évaluer :

- root ;
- jailbreak ;
- bootloader déverrouillé ;
- application modifiée ;
- hooking ;
- instrumentation ;
- émulateur suspect ;
- débogage non autorisé ;
- système obsolète ;
- malware connu.

Réactions possibles :

- avertissement ;
- limitation ;
- nouvelle authentification ;
- blocage des fonctions sensibles ;
- suspension ;
- revue manuelle.

---

## 40. Attestation d’appareil

Lorsque possible, Mansa peut utiliser :

- services d’attestation Apple ;
- services d’attestation Android ;
- certificats TPE ;
- MDM ;
- empreinte applicative ;
- preuve d’intégrité ;
- signature de requête.

L’attestation doit rester abstraite afin de pouvoir changer de fournisseur ou de mécanisme.

---

## 41. Mise à jour des applications

Le système doit gérer :

- version minimale ;
- version recommandée ;
- mise à jour obligatoire ;
- compatibilité API ;
- correctif de sécurité ;
- déploiement progressif ;
- rollback ;
- suivi par plateforme ;
- communication utilisateur.

---

## 42. Compatibilité API

Les API doivent être versionnées.

Le système doit prévoir :

- rétrocompatibilité ;
- dépréciation ;
- période de transition ;
- version minimale ;
- feature negotiation ;
- erreurs explicites ;
- télémétrie ;
- documentation ;
- migration progressive.

---

## 43. Responsive Design

Le Design System Mansa doit définir :

- breakpoints ;
- grilles ;
- espacements ;
- tailles ;
- densité ;
- composants adaptatifs ;
- navigation ;
- panneaux ;
- modales ;
- tables ;
- formulaires ;
- cartes ;
- graphiques.

---

## 44. Navigation adaptative

Exemples :

- téléphone : barre inférieure ;
- tablette : rail ou menu latéral ;
- ordinateur : sidebar complète ;
- montre : listes courtes ;
- TPE : flux linéaire ;
- Admin : navigation dense ;
- borne : navigation simplifiée.

---

## 45. Accessibilité multi-appareils

Le système doit prendre en charge :

- VoiceOver ;
- TalkBack ;
- clavier ;
- navigation au focus ;
- souris ;
- trackpad ;
- contraste ;
- grandes polices ;
- réduction des animations ;
- commandes vocales selon support ;
- lecteurs d’écran ;
- alternatives textuelles ;
- zones tactiles adaptées.

---

## 46. Internationalisation

L’interface doit gérer :

- langues ;
- sens d’écriture ;
- formats de date ;
- formats monétaires ;
- fuseaux horaires ;
- calendriers ;
- numéros de téléphone ;
- adresses ;
- unités ;
- traductions par plateforme.

---

## 47. Multi-pays

Les capacités peuvent varier selon :

- réglementation ;
- banque partenaire ;
- Mobile Money ;
- carte ;
- KYC ;
- langue ;
- appareil ;
- disponibilité technique ;
- store ;
- fournisseur ;
- sécurité.

---

## 48. Feature Flags

Les fonctionnalités doivent être activables selon :

- plateforme ;
- version ;
- pays ;
- rôle ;
- offre ;
- appareil ;
- niveau de confiance ;
- groupe pilote ;
- partenaire ;
- environnement.

Exemples :

- Apple Watch ;
- Wear OS ;
- PWA ;
- mode tablette ;
- appareil pliable ;
- hors ligne Agent ;
- Live Activities ;
- widgets ;
- Google Wallet ;
- Apple Wallet ;
- continuité de session.

---

## 49. Administration centrale

L’administration doit pouvoir :

- rechercher un appareil ;
- consulter ses sessions ;
- voir le niveau de confiance ;
- révoquer ;
- suspendre ;
- autoriser ;
- forcer une mise à jour ;
- bloquer une version ;
- voir les alertes ;
- auditer ;
- gérer les limites ;
- gérer les feature flags.

---

## 50. Administration des appareils professionnels

Pour les Agents, TPE et appareils Commerce gérés :

- attribution à une organisation ;
- attribution à un employé ;
- mode kiosque ;
- installation contrôlée ;
- configuration distante ;
- certificat ;
- révocation ;
- inventaire ;
- statut réseau ;
- version ;
- incident ;
- remplacement.

---

## 51. MDM

Mansa peut intégrer un système de gestion d’appareils pour :

- TPE ;
- tablettes Agents ;
- appareils de caisse ;
- terminaux d’administration ;
- appareils institutionnels.

Fonctions :

- déploiement ;
- configuration ;
- verrouillage ;
- mise à jour ;
- effacement ;
- conformité ;
- inventaire ;
- certificats.

---

## 52. Audit

Chaque événement critique doit être audité :

- appareil ajouté ;
- appareil approuvé ;
- appareil révoqué ;
- session créée ;
- session prolongée ;
- session révoquée ;
- changement de confiance ;
- détection root ;
- migration ;
- récupération ;
- changement de clé ;
- conflit ;
- action hors ligne ;
- intervention administrative.

---

## 53. API principales

Exemples :

```http
GET    /devices
POST   /devices/register
GET    /devices/{deviceId}
PATCH  /devices/{deviceId}
POST   /devices/{deviceId}/trust
POST   /devices/{deviceId}/revoke
POST   /devices/{deviceId}/report-lost
POST   /devices/{deviceId}/rotate-key
GET    /devices/{deviceId}/sessions
GET    /sessions
POST   /sessions/{sessionId}/revoke
POST   /sessions/revoke-others
POST   /sessions/logout-all
POST   /devices/migrations
GET    /devices/migrations/{migrationId}
POST   /sync/pull
POST   /sync/push
GET    /sync/status
```

---

## 54. Webhooks

Événements possibles :

```text
device.registered
device.approved
device.trusted
device.limited
device.suspicious
device.compromised
device.revoked
device.reported_lost
device.key_rotated
device.migration.started
device.migration.completed
session.created
session.refreshed
session.expired
session.revoked
session.suspicious
sync.completed
sync.failed
```

---

## 55. Modèles principaux

- Device
- DeviceInstallation
- DeviceSession
- DeviceTrust
- DeviceRiskAssessment
- DeviceKey
- DeviceAttestation
- DeviceMigration
- DevicePolicy
- DeviceCapability
- DeviceNotificationState
- DeviceSyncCursor
- DeviceOfflineQueue
- DeviceAudit
- ManagedDevice
- ManagedDeviceAssignment

---

## 56. Rôles

Exemples :

```text
CLIENT
MERCHANT_OWNER
MERCHANT_MANAGER
MERCHANT_EMPLOYEE
AGENT
AGENT_MANAGER
TPE_OPERATOR
DEVICE_ADMIN
SECURITY_ANALYST
SUPPORT_OPERATOR
SUPER_ADMIN
AUDITOR
```

---

## 57. Permissions

Exemples :

```text
device.read.self
device.manage.self
device.register
device.rename
device.revoke.self
device.trust.manage
device.block
device.audit.read
session.read.self
session.revoke.self
session.revoke.any
managed_device.read
managed_device.assign
managed_device.configure
managed_device.revoke
sync.read
sync.manage
```

---

## 58. Reporting

Rapports possibles :

- appareils enregistrés ;
- appareils actifs ;
- plateformes ;
- versions ;
- sessions ;
- appareils compromis ;
- appareils révoqués ;
- migrations ;
- erreurs de synchronisation ;
- usage hors ligne ;
- notifications ;
- appareils gérés ;
- incidents ;
- adoption tablette ;
- adoption montre ;
- usage Web.

---

## 59. Indicateurs

Exemples :

- appareils actifs par utilisateur ;
- taux de reconnexion ;
- taux de migration réussie ;
- durée moyenne des sessions ;
- taux de révocation ;
- taux de root ou jailbreak ;
- taux d’échec de synchronisation ;
- latence de synchronisation ;
- versions obsolètes ;
- taux de mise à jour ;
- usage par plateforme ;
- incidents par type d’appareil.

---

## 60. Performance

Le système doit viser :

- démarrage rapide ;
- cache contrôlé ;
- synchronisation incrémentale ;
- faible consommation réseau ;
- faible consommation batterie ;
- compression ;
- pagination ;
- reprise ;
- préchargement limité ;
- suppression des traitements inutiles ;
- adaptation aux appareils modestes.

---

## 61. Optimisation mémoire

Les applications doivent :

- limiter les images lourdes ;
- libérer les ressources ;
- virtualiser les listes ;
- charger à la demande ;
- éviter les caches illimités ;
- réduire les tâches d’arrière-plan ;
- gérer les appareils à faible mémoire ;
- surveiller les crashes.

---

## 62. Consommation réseau

Le système doit :

- compresser ;
- différer les médias lourds ;
- proposer Wi-Fi uniquement selon préférence ;
- utiliser des miniatures ;
- reprendre les transferts ;
- éviter les doublons ;
- afficher la taille ;
- adapter la qualité ;
- gérer le réseau faible.

---

## 63. Consommation batterie

Le système doit limiter :

- géolocalisation continue ;
- polling agressif ;
- tâches en arrière-plan ;
- animations lourdes ;
- synchronisations inutiles ;
- scans fréquents ;
- notifications redondantes.

---

## 64. Tests fonctionnels

- inscription sur téléphone ;
- connexion sur tablette ;
- consultation Web ;
- ajout d’un appareil ;
- révocation ;
- changement de téléphone ;
- migration ;
- session multiple ;
- continuité ;
- synchronisation ;
- conflit ;
- hors ligne ;
- reprise ;
- notification multi-appareils ;
- Apple Watch ;
- Wear OS ;
- tablette ;
- appareil pliable ;
- PWA ;
- TPE.

---

## 65. Tests de sécurité

- vol de session ;
- réutilisation de jeton ;
- clonage d’appareil ;
- root ;
- jailbreak ;
- émulateur suspect ;
- application modifiée ;
- MITM ;
- clé compromise ;
- appareil révoqué ;
- migration frauduleuse ;
- récupération frauduleuse ;
- accès inter-utilisateur ;
- accès inter-commerce ;
- contournement de version ;
- synchronisation falsifiée.

---

## 66. Tests de performance

- grand nombre d’appareils ;
- sessions simultanées ;
- synchronisation massive ;
- notifications massives ;
- appareils à faible mémoire ;
- réseau lent ;
- listes volumineuses ;
- multi-écrans ;
- reprise après veille ;
- changement de posture pliable.

---

## 67. Tests de résilience

- réseau coupé ;
- téléphone éteint ;
- synchronisation interrompue ;
- serveur indisponible ;
- notification échouée ;
- changement de fuseau ;
- changement d’heure ;
- session expirée ;
- appareil révoqué hors ligne ;
- migration interrompue ;
- perte de clé ;
- mise à jour échouée ;
- rollback ;
- cache corrompu.

---

## 68. Règles métier

1. Le backend reste la source de vérité des données financières.
2. Un appareil révoqué ne peut plus accéder aux API protégées.
3. La suppression d’un appareil ne supprime pas les données du compte.
4. Chaque session doit être liée à un appareil ou à un contexte identifié.
5. Les appareils professionnels doivent être attribués et audités.
6. Les clés locales doivent être protégées par le mécanisme sécurisé de la plateforme.
7. Les données biométriques ne doivent pas être copiées vers Mansa.
8. Un nouvel appareil peut recevoir des limites temporaires.
9. Les appareils compromis peuvent être suspendus automatiquement.
10. Les actions sensibles peuvent exiger une authentification renforcée.
11. Le mode hors ligne ne doit pas permettre de créer un solde indépendant.
12. Chaque action différée doit être idempotente.
13. Les conflits financiers ne doivent pas être fusionnés automatiquement.
14. Les sessions doivent avoir une expiration configurable.
15. Les utilisateurs doivent pouvoir révoquer leurs propres appareils.
16. Les administrateurs ne doivent agir que selon leurs permissions.
17. Les changements de confiance doivent être audités.
18. Les versions obsolètes peuvent être limitées ou bloquées.
19. Les feature flags doivent permettre un déploiement progressif.
20. Les notifications doivent être dédupliquées.
21. Les données locales sensibles doivent être supprimées après révocation lorsque possible.
22. Les migrations d’appareil doivent créer de nouvelles clés.
23. Les appareils à risque doivent recevoir un score.
24. La synchronisation doit être chiffrée.
25. La géolocalisation approximative doit respecter le consentement.
26. Les montres ne doivent pas permettre seules les opérations critiques.
27. Les portails Web doivent permettre la révocation des sessions.
28. Les appareils TPE doivent être enregistrés individuellement.
29. Les audits critiques doivent être immuables.
30. Chaque plateforme doit respecter les règles du pays et du partenaire.

---

## 69. Ordre de développement recommandé

```text
P1-DEVICE-01 — Modèles Device, Session et Trust
P1-DEVICE-02 — Enregistrement et révocation des appareils
P1-DEVICE-03 — Device Binding et gestion des clés
P1-DEVICE-04 — Synchronisation incrémentale
P1-DEVICE-05 — Gestion des conflits et mode hors ligne
P1-DEVICE-06 — Interfaces téléphone et tablette adaptatives
P1-DEVICE-07 — Web, PWA et continuité de session
P1-DEVICE-08 — Apple Watch et Wear OS
P1-DEVICE-09 — Appareils professionnels, TPE et MDM
P1-DEVICE-10 — Administration, reporting et audit
P1-DEVICE-11 — Sécurité avancée et attestation
P1-DEVICE-12 — Tests de bout en bout multi-plateformes
```

---

## 70. Critères d’acceptation finaux

Le module est validé lorsque :

- l’application Client fonctionne sur iPhone ;
- elle fonctionne sur Android ;
- elle est adaptée aux tablettes ;
- elle gère les appareils pliables ;
- les portails fonctionnent sur Mac ;
- les portails fonctionnent sur Windows ;
- les portails fonctionnent sur Linux ;
- la PWA peut être installée lorsque activée ;
- l’Apple Watch peut recevoir les fonctions autorisées ;
- Wear OS peut recevoir les fonctions autorisées ;
- l’application Commerce est adaptée au smartphone ;
- elle est adaptée à la tablette ;
- le Portail Commerçant fonctionne sur ordinateur ;
- l’application Agent fonctionne sur les appareils autorisés ;
- l’application TPE fonctionne en mode dédié ;
- un utilisateur peut enregistrer un nouvel appareil ;
- il peut voir ses appareils ;
- il peut les renommer ;
- il peut les révoquer ;
- il peut voir ses sessions ;
- il peut déconnecter une session ;
- il peut déconnecter toutes les autres sessions ;
- un appareil révoqué est bloqué ;
- un appareil perdu peut être signalé ;
- le changement de téléphone est géré ;
- la migration sans ancien appareil est sécurisée ;
- de nouvelles clés sont créées lors de la migration ;
- le Device Binding est appliqué ;
- le Device Trust est appliqué ;
- le score de risque est disponible ;
- les appareils compromis peuvent être limités ;
- les appareils professionnels sont inventoriés ;
- les TPE sont enregistrés individuellement ;
- les sessions sont liées aux appareils ;
- les sessions expirent ;
- les jetons révoqués ne sont plus utilisables ;
- la synchronisation des préférences fonctionne ;
- la synchronisation des favoris fonctionne ;
- la synchronisation des rendez-vous fonctionne ;
- la synchronisation des commandes fonctionne ;
- la synchronisation des notifications fonctionne ;
- les données financières restent servies par le backend ;
- le mode hors ligne est limité ;
- les actions différées utilisent l’idempotence ;
- les files locales sont chiffrées ;
- la reprise après coupure fonctionne ;
- la synchronisation incrémentale fonctionne ;
- les conflits sont détectés ;
- les règles de résolution sont définies ;
- les notifications sont dédupliquées ;
- la lecture se synchronise entre appareils ;
- les clés sont protégées ;
- la rotation est possible ;
- les données locales sont minimisées ;
- les appareils rootés ou jailbreakés sont détectés ou évalués ;
- l’attestation est abstraite ;
- les versions minimales sont administrables ;
- les mises à jour obligatoires sont possibles ;
- le responsive design est appliqué ;
- la navigation s’adapte à la plateforme ;
- VoiceOver est supporté ;
- TalkBack est supporté ;
- le clavier est supporté ;
- la souris et le trackpad sont supportés ;
- le multi-langues est supporté ;
- les fuseaux horaires sont gérés ;
- les feature flags sont disponibles ;
- l’administration des appareils est disponible ;
- le reporting est disponible ;
- les audits sont disponibles ;
- les tests fonctionnels réussissent ;
- les tests de sécurité réussissent ;
- les tests de performance réussissent ;
- les tests de résilience réussissent ;
- les audits critiques sont immuables.
