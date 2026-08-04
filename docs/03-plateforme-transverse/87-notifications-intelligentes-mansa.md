# 87 — Notifications intelligentes Mansa : push, e-mail, in-app, Web, montre, priorités, préférences, anti-spam, automatisation, sécurité, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du système de **notifications intelligentes Mansa**.

Le système doit permettre d’informer chaque utilisateur au bon moment, sur le bon appareil, avec le bon niveau de priorité, sans envoyer inutilement le même message sur tous les canaux.

Il doit couvrir notamment :

- notifications push ;
- notifications dans l’application ;
- notifications Web ;
- e-mails ;
- messages sur Apple Watch ;
- messages sur Wear OS ;
- alertes de sécurité ;
- alertes financières ;
- notifications Commerce ;
- notifications Agent ;
- notifications TPE ;
- notifications Admin ;
- rappels ;
- campagnes ;
- annonces ;
- automatisations ;
- préférences ;
- anti-spam ;
- déduplication ;
- journalisation ;
- reporting ;
- multi-pays ;
- multi-langues.

Le système doit être centralisé et utilisable par l’ensemble de l’écosystème Mansa.

---

## 2. Principe général

Le moteur de notifications doit fonctionner selon ce principe :

```text
Événement métier
→ Analyse de priorité
→ Vérification du consentement
→ Sélection du canal
→ Sélection de l’appareil
→ Génération du contenu
→ Envoi
→ Suivi de livraison
→ Mise à jour du statut
→ Audit
```

Une notification ne doit jamais être envoyée uniquement parce qu’un événement existe.

Le système doit vérifier :

- si l’utilisateur doit réellement être informé ;
- si le canal est autorisé ;
- si l’appareil est actif ;
- si la notification a déjà été envoyée ;
- si elle a déjà été lue ;
- si elle est encore utile ;
- si elle respecte les préférences ;
- si elle respecte le pays ;
- si elle respecte la sécurité ;
- si elle respecte les horaires autorisés.

---

## 3. Applications concernées

Le système doit être intégré à :

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
- Portail Partenaire ;
- Portail Développeur ;
- interfaces État ;
- interfaces institutionnelles ;
- futures applications Mansa.

---

## 4. Types de notifications

Le système doit distinguer plusieurs catégories :

- financières ;
- sécurité ;
- compte ;
- KYC ;
- paiements ;
- transferts ;
- cartes ;
- Wallet ;
- Mobile Money ;
- banque ;
- commerce ;
- commandes ;
- réservations ;
- livraison ;
- fidélité ;
- promotions ;
- Hub ;
- support ;
- administration ;
- système ;
- réglementation ;
- marketing ;
- partenaires ;
- urgence ;
- information générale.

---

## 5. Notifications financières

Exemples :

- paiement reçu ;
- paiement envoyé ;
- transfert reçu ;
- transfert exécuté ;
- transfert échoué ;
- dépôt effectué ;
- retrait effectué ;
- remboursement ;
- frais appliqués ;
- solde faible ;
- opération en attente ;
- opération refusée ;
- opération annulée ;
- rapprochement terminé ;
- règlement commerçant ;
- commission Agent ;
- paiement TPE ;
- paiement QR ;
- paiement hors ligne synchronisé.

Les montants doivent être affichés uniquement selon les règles de confidentialité choisies.

---

## 6. Notifications de sécurité

Exemples :

- nouvel appareil ;
- nouvelle connexion ;
- tentative échouée ;
- mot de passe modifié ;
- passkey ajoutée ;
- appareil révoqué ;
- session suspecte ;
- carte bloquée ;
- changement de numéro ;
- changement d’e-mail ;
- modification KYC ;
- comportement inhabituel ;
- tentative de fraude ;
- récupération de compte ;
- changement de PIN ;
- réinitialisation de sécurité.

Les notifications de sécurité critiques ne doivent pas pouvoir être entièrement désactivées.

---

## 7. Notifications KYC et KYB

Exemples :

- dossier reçu ;
- document manquant ;
- document illisible ;
- vérification en cours ;
- vérification réussie ;
- vérification refusée ;
- justificatif expirant ;
- nouvelle vérification demandée ;
- KYB incomplet ;
- activité non autorisée ;
- document professionnel à renouveler ;
- revue manuelle ;
- demande complémentaire.

---

## 8. Notifications Wallet

Exemples :

- Wallet créé ;
- Wallet activé ;
- Wallet gelé ;
- Wallet suspendu ;
- Wallet limité ;
- Wallet clôturé ;
- devise ajoutée ;
- plafond atteint ;
- plafond bientôt atteint ;
- solde faible ;
- Wallet débloqué ;
- opération bloquée.

---

## 9. Notifications cartes

Exemples :

- carte virtuelle créée ;
- carte physique commandée ;
- carte expédiée ;
- carte livrée ;
- carte activée ;
- carte bloquée ;
- carte débloquée ;
- paiement par carte ;
- paiement refusé ;
- retrait GAB ;
- tentative inhabituelle ;
- carte expirante ;
- carte remplacée ;
- code PIN modifié ;
- paiement sans contact activé ;
- plafond modifié ;
- carte ajoutée à un Wallet externe.

---

## 10. Notifications Commerce

Exemples :

- nouvelle vente ;
- nouveau paiement ;
- nouvelle commande ;
- commande annulée ;
- commande prête ;
- remboursement demandé ;
- remboursement approuvé ;
- règlement reçu ;
- stock faible ;
- stock épuisé ;
- nouvel avis ;
- nouveau message ;
- nouvelle réservation ;
- rendez-vous annulé ;
- no-show ;
- campagne terminée ;
- abonnement expirant ;
- quota IA atteint ;
- média signalé ;
- Studio Photo IA terminé.

---

## 11. Notifications Agent

Exemples :

- caisse ouverte ;
- caisse fermée ;
- dépôt client ;
- retrait client ;
- float faible ;
- float élevé ;
- rapprochement ;
- commission calculée ;
- opération en attente ;
- action refusée ;
- appareil suspendu ;
- document client incomplet ;
- contrôle demandé ;
- plafond Agent atteint ;
- incident réseau ;
- synchronisation terminée.

---

## 12. Notifications TPE

Exemples :

- terminal activé ;
- terminal désactivé ;
- paiement accepté ;
- paiement refusé ;
- remboursement ;
- mise à jour disponible ;
- mise à jour obligatoire ;
- certificat expirant ;
- imprimante indisponible ;
- réseau indisponible ;
- synchronisation ;
- clôture ;
- anomalie ;
- terminal compromis ;
- maintenance programmée.

---

## 13. Notifications Hub

Exemples :

- réservation confirmée ;
- réservation modifiée ;
- réservation annulée ;
- commande confirmée ;
- commande prête ;
- livraison en route ;
- commande livrée ;
- promotion favorite ;
- réponse à un avis ;
- commerce ajouté aux favoris ;
- nouveauté dans une catégorie ;
- disponibilité retrouvée ;
- produit de nouveau en stock ;
- prix modifié ;
- coupon expirant ;
- rappel de rendez-vous.

---

## 14. Notifications Support

Exemples :

- ticket créé ;
- réponse reçue ;
- ticket assigné ;
- information demandée ;
- incident résolu ;
- litige ouvert ;
- litige mis à jour ;
- décision rendue ;
- recours possible ;
- ticket fermé ;
- satisfaction demandée.

---

## 15. Notifications Administration

Exemples :

- incident critique ;
- hausse de fraude ;
- service indisponible ;
- file bloquée ;
- seuil dépassé ;
- erreur partenaire ;
- anomalie comptable ;
- utilisateur à risque ;
- appareil compromis ;
- KYC en attente ;
- signalement ;
- litige urgent ;
- campagne terminée ;
- configuration modifiée ;
- clé API expirante ;
- certificat expirant.

---

## 16. Niveaux de priorité

Le système doit distinguer au minimum :

```text
LOW
NORMAL
HIGH
CRITICAL
EMERGENCY
```

### LOW

- promotion ;
- conseil ;
- recommandation ;
- nouveauté ;
- rappel non essentiel.

### NORMAL

- commande mise à jour ;
- rendez-vous ;
- nouveau message ;
- paiement courant ;
- réponse support.

### HIGH

- paiement important ;
- opération refusée ;
- document expirant ;
- livraison problématique ;
- stock critique ;
- plafond atteint.

### CRITICAL

- tentative de fraude ;
- nouvel appareil suspect ;
- carte compromise ;
- compte suspendu ;
- transfert inhabituel ;
- incident de sécurité.

### EMERGENCY

Réservé à certains cas institutionnels ou opérationnels exceptionnellement urgents.

---

## 17. Canaux

Canaux possibles :

- notification in-app ;
- push mobile ;
- push Web ;
- e-mail ;
- SMS éventuel ;
- Apple Watch ;
- Wear OS ;
- écran TPE ;
- écran Agent ;
- tableau Admin ;
- webhook ;
- boîte de réception Mansa ;
- bannière ;
- modal ;
- centre d’alertes.

Le SMS doit rester un canal optionnel et exceptionnel.

---

## 18. Stratégie sans SMS au lancement

Le système doit fonctionner au lancement avec :

- push mobile ;
- notification in-app ;
- e-mail ;
- passkeys ;
- biométrie ;
- centre de sécurité ;
- validation depuis un appareil approuvé ;
- notifications Web.

Le SMS ne doit pas être nécessaire pour :

- connexion normale ;
- confirmation de paiement ;
- notification de transfert ;
- rappel ;
- commande ;
- réservation ;
- promotion ;
- notification de support.

---

## 19. Notification in-app

Chaque application doit proposer une boîte de réception interne avec :

- notifications non lues ;
- notifications lues ;
- filtres ;
- recherche ;
- catégories ;
- date ;
- priorité ;
- actions rapides ;
- archivage ;
- suppression selon règles ;
- marquage lu ;
- marquage non lu ;
- lien vers l’objet concerné.

---

## 20. Centre de notifications

Le centre doit regrouper :

- sécurité ;
- paiements ;
- Wallet ;
- cartes ;
- commerce ;
- Hub ;
- support ;
- promotions ;
- système.

L’utilisateur doit pouvoir filtrer par :

- catégorie ;
- date ;
- priorité ;
- application ;
- statut ;
- appareil ;
- action requise.

---

## 21. Actions rapides

Une notification peut proposer une action limitée :

- voir le paiement ;
- ouvrir le reçu ;
- confirmer un rendez-vous ;
- suivre une commande ;
- répondre à un message ;
- bloquer une carte ;
- ouvrir le support ;
- consulter un litige ;
- télécharger un document ;
- valider une action non critique.

Les actions sensibles doivent exiger une authentification renforcée.

---

## 22. Deep links

Chaque notification doit pouvoir ouvrir directement :

- une transaction ;
- une carte ;
- un Wallet ;
- une commande ;
- une réservation ;
- un produit ;
- un ticket ;
- un appareil ;
- une page Admin ;
- une action spécifique.

Le lien doit vérifier :

- l’authentification ;
- les permissions ;
- le pays ;
- la version ;
- l’existence de la ressource ;
- l’expiration.

---

## 23. Préférences utilisateur

L’utilisateur doit pouvoir configurer :

- catégories ;
- canaux ;
- heures ;
- appareil principal ;
- notifications promotionnelles ;
- rappels ;
- e-mails ;
- Web ;
- montre ;
- son ;
- vibration ;
- aperçu ;
- affichage du montant ;
- confidentialité sur écran verrouillé.

---

## 24. Notifications obligatoires

Certaines notifications ne doivent pas pouvoir être désactivées :

- sécurité critique ;
- modification d’identité ;
- nouvel appareil ;
- changement de mot de passe ;
- opération financière ;
- carte compromise ;
- compte suspendu ;
- décision réglementaire ;
- modification importante des conditions ;
- incident affectant les fonds.

L’utilisateur peut parfois choisir le canal, mais pas supprimer entièrement l’information.

---

## 25. Confidentialité sur écran verrouillé

L’utilisateur doit pouvoir choisir :

- afficher le contenu complet ;
- masquer le montant ;
- masquer le commerce ;
- afficher seulement « Nouvelle notification Mansa » ;
- masquer tout contenu sensible ;
- autoriser uniquement après déverrouillage.

---

## 26. Préférences par appareil

Les préférences peuvent varier selon :

- téléphone ;
- tablette ;
- montre ;
- navigateur ;
- TPE ;
- appareil Commerce ;
- appareil Agent.

Exemple :

- sécurité sur tous les appareils ;
- promotions seulement sur téléphone ;
- commandes sur tablette Commerce ;
- rappels sur montre ;
- Admin critique sur ordinateur et téléphone.

---

## 27. Heures silencieuses

L’utilisateur peut définir :

- début ;
- fin ;
- jours ;
- fuseau horaire ;
- exceptions ;
- catégories prioritaires.

Les notifications critiques doivent pouvoir contourner les heures silencieuses selon règles.

---

## 28. Fuseaux horaires

Le système doit gérer :

- fuseau utilisateur ;
- fuseau appareil ;
- fuseau commerce ;
- fuseau pays ;
- voyage ;
- changement automatique ;
- calendrier local ;
- heure d’été.

---

## 29. Déduplication

Le système doit éviter :

- plusieurs notifications identiques ;
- répétition sur tous les appareils ;
- double e-mail ;
- double push ;
- notification après lecture ;
- rappel après annulation ;
- envoi après expiration.

Chaque notification doit posséder :

- identifiant global ;
- événement source ;
- clé de déduplication ;
- utilisateur ;
- appareil ;
- canal ;
- période de validité.

---

## 30. Notification multi-appareils

Le moteur doit choisir l’appareil adapté selon :

- appareil actif ;
- dernière activité ;
- niveau de confiance ;
- canal autorisé ;
- type d’événement ;
- montre connectée ;
- application ouverte ;
- écran disponible ;
- priorité.

Exemple :

```text
Utilisateur actif sur téléphone
→ Push téléphone
→ Pas de push tablette immédiat
→ Synchronisation dans la boîte in-app partout
```

---

## 31. Lecture synchronisée

Lorsqu’une notification est lue :

- elle doit être marquée lue sur les autres appareils ;
- son badge doit être mis à jour ;
- les rappels inutiles doivent être supprimés ;
- les actions expirées doivent être désactivées.

---

## 32. Expiration

Une notification peut expirer.

Exemples :

- code temporaire ;
- rendez-vous passé ;
- commande annulée ;
- promotion terminée ;
- paiement déjà traité ;
- incident résolu ;
- appareil déjà révoqué.

---

## 33. Rappels

Le système peut envoyer des rappels pour :

- rendez-vous ;
- échéance ;
- abonnement ;
- facture ;
- carte expirante ;
- document KYC ;
- promotion ;
- commande non récupérée ;
- ticket sans réponse ;
- panier abandonné ;
- solde insuffisant ;
- paiement récurrent ;
- remboursement.

---

## 34. Règles de rappel

Chaque rappel doit définir :

- événement ;
- date ;
- fréquence ;
- nombre maximal ;
- canal ;
- priorité ;
- conditions d’arrêt ;
- délai ;
- fuseau ;
- consentement.

---

## 35. Rappels intelligents

Le système peut adapter un rappel selon :

- comportement ;
- heure habituelle ;
- fuseau ;
- appareil actif ;
- importance ;
- historique de lecture ;
- conversion ;
- canal préféré ;
- fréquence récente.

Il ne doit pas devenir intrusif.

---

## 36. Campagnes

Les équipes autorisées peuvent créer :

- campagne d’information ;
- campagne marketing ;
- campagne réglementaire ;
- campagne de sécurité ;
- campagne commerçante ;
- campagne Hub ;
- campagne pays ;
- campagne partenaire.

---

## 37. Ciblage

Une campagne peut cibler selon :

- pays ;
- ville ;
- langue ;
- type de compte ;
- rôle ;
- offre ;
- commerçant ;
- secteur ;
- appareil ;
- version ;
- activité ;
- âge du compte ;
- consentement ;
- fidélité ;
- comportement ;
- statut KYC.

Les données sensibles ne doivent pas être utilisées sans base légitime.

---

## 38. Segments

Exemples :

- nouveaux utilisateurs ;
- utilisateurs inactifs ;
- clients actifs ;
- commerçants Premium ;
- Agents ;
- utilisateurs sans KYC ;
- utilisateurs avec carte ;
- utilisateurs Hub ;
- utilisateurs d’une ville ;
- utilisateurs ayant abandonné un panier ;
- utilisateurs ayant réservé récemment.

---

## 39. Campagnes transactionnelles et marketing

Le système doit séparer :

### Transactionnel

- sécurité ;
- paiement ;
- compte ;
- commande ;
- réservation ;
- support.

### Marketing

- promotions ;
- recommandations ;
- nouveautés ;
- fidélité ;
- contenus sponsorisés.

Le refus du marketing ne doit pas bloquer les notifications transactionnelles.

---

## 40. Fréquence maximale

L’administration doit pouvoir définir :

- notifications marketing par jour ;
- notifications marketing par semaine ;
- notifications par commerce ;
- notifications par campagne ;
- période de repos ;
- priorité ;
- fréquence par canal.

---

## 41. Anti-spam

Le système doit détecter :

- volume excessif ;
- campagne répétée ;
- ciblage abusif ;
- contenu trompeur ;
- notifications trop fréquentes ;
- duplication ;
- envoi hors autorisation ;
- commerce abusif ;
- partenaire abusif.

---

## 42. Notifications commerçantes

Un commerçant peut envoyer selon son offre :

- promotion ;
- disponibilité ;
- nouveau produit ;
- rappel de réservation ;
- panier abandonné ;
- coupon ;
- fidélité ;
- événement.

Il ne doit pas pouvoir envoyer librement à n’importe quel utilisateur.

---

## 43. Consentement commercial

Un commerçant ne peut notifier que :

- ses clients autorisés ;
- ses abonnés ;
- ses favoris selon règles ;
- ses clients ayant consenti ;
- les utilisateurs d’une campagne Mansa approuvée.

---

## 44. Modération des campagnes

Les campagnes peuvent être :

- approuvées automatiquement ;
- soumises à validation ;
- suspendues ;
- rejetées ;
- modifiées ;
- auditées.

---

## 45. Contenus interdits

Les notifications ne doivent pas contenir :

- fraude ;
- phishing ;
- usurpation ;
- faux lien ;
- contenu illégal ;
- promesse mensongère ;
- discrimination ;
- harcèlement ;
- contenu sexuel interdit ;
- incitation dangereuse ;
- fausse promotion ;
- collecte abusive de données.

---

## 46. Modèles de notification

Le système doit proposer des modèles administrables :

- titre ;
- message ;
- variables ;
- langue ;
- canal ;
- priorité ;
- action ;
- expiration ;
- icône ;
- catégorie ;
- version.

---

## 47. Variables dynamiques

Exemples :

```text
{{user.firstName}}
{{transaction.amount}}
{{transaction.currency}}
{{merchant.name}}
{{order.reference}}
{{booking.date}}
{{card.last4}}
{{support.ticketId}}
```

Les variables doivent être validées avant envoi.

---

## 48. Multi-langues

Chaque modèle peut avoir :

- français ;
- bambara ;
- anglais ;
- arabe ;
- langues supplémentaires.

Le système doit utiliser :

- langue du compte ;
- langue de l’application ;
- langue du commerce ;
- langue du pays ;
- fallback.

---

## 49. Traductions

Les traductions doivent être :

- validées ;
- versionnées ;
- administrables ;
- testées ;
- adaptées culturellement ;
- non générées automatiquement sans contrôle pour les contenus sensibles.

---

## 50. Personnalisation

Le système peut adapter :

- prénom ;
- langue ;
- commerce ;
- montant ;
- catégorie ;
- appareil ;
- heure ;
- offre ;
- historique ;
- préférence.

La personnalisation ne doit pas révéler des données sensibles sur un écran non sécurisé.

---

## 51. Jini

Jini peut aider à :

- résumer une alerte ;
- expliquer un paiement ;
- expliquer une erreur ;
- proposer une action ;
- classer une notification ;
- rédiger une campagne ;
- traduire ;
- détecter un contenu trompeur ;
- recommander une fréquence.

Jini ne doit pas envoyer une campagne sensible sans validation humaine.

---

## 52. Notifications intelligentes par IA

L’IA peut proposer :

- meilleure heure d’envoi ;
- meilleur canal ;
- meilleure fréquence ;
- meilleure langue ;
- meilleure formulation ;
- regroupement ;
- priorité ;
- détection de fatigue ;
- détection d’abus.

---

## 53. Limites de l’IA

L’IA ne doit pas :

- modifier une alerte financière ;
- changer un montant ;
- masquer un incident ;
- inventer un statut ;
- envoyer une campagne seule ;
- contourner un consentement ;
- changer une priorité critique sans règle ;
- produire une fausse urgence.

---

## 54. Regroupement

Le système peut regrouper plusieurs événements.

Exemple :

```text
Vous avez reçu 5 paiements aujourd’hui pour un total de 75 000 FCFA.
```

Le regroupement doit conserver l’accès aux détails.

---

## 55. Résumés quotidiens

Un utilisateur peut choisir :

- résumé du matin ;
- résumé du soir ;
- résumé Commerce ;
- résumé Agent ;
- résumé Admin ;
- résumé hebdomadaire.

---

## 56. Résumé Commerce

Exemples :

- ventes ;
- commandes ;
- réservations ;
- avis ;
- stock faible ;
- remboursements ;
- règlements ;
- incidents ;
- campagnes.

---

## 57. Résumé Admin

Exemples :

- fraude ;
- KYC ;
- incidents ;
- paiements ;
- erreurs ;
- appareils compromis ;
- tickets ;
- opérations en attente ;
- alertes partenaires ;
- changements de configuration.

---

## 58. Distribution asynchrone

L’envoi doit utiliser une file de messages.

Statuts possibles :

```text
CREATED
QUEUED
PROCESSING
SENT
DELIVERED
OPENED
READ
CLICKED
FAILED
RETRYING
EXPIRED
CANCELLED
SUPPRESSED
```

---

## 59. Reprises

Le système doit gérer :

- retry ;
- délai progressif ;
- limite de tentatives ;
- fournisseur secondaire ;
- file d’échec ;
- annulation ;
- expiration ;
- surveillance.

---

## 60. Fournisseurs

Le moteur doit utiliser une abstraction :

```text
NotificationProvider
├── Push Provider
├── Email Provider
├── Web Push Provider
├── SMS Provider éventuel
├── Fournisseur local
└── Fournisseur futur
```

Le code métier ne doit pas dépendre directement d’un fournisseur unique.

---

## 61. Push mobile

Le système doit gérer :

- jeton appareil ;
- renouvellement ;
- jeton expiré ;
- application désinstallée ;
- environnement ;
- iOS ;
- Android ;
- priorité ;
- son ;
- badge ;
- action ;
- image ;
- expiration.

---

## 62. E-mail

Le système doit gérer :

- modèles ;
- HTML ;
- texte brut ;
- liens sécurisés ;
- désabonnement marketing ;
- rebonds ;
- plaintes ;
- réputation ;
- domaine ;
- signature ;
- suivi selon consentement.

---

## 63. Web Push

Le système doit gérer :

- navigateur ;
- autorisation ;
- abonnement ;
- révocation ;
- PWA ;
- expiration ;
- action ;
- compatibilité ;
- désabonnement.

---

## 64. Apple Watch et Wear OS

Les montres peuvent recevoir :

- alertes sécurité ;
- paiements ;
- rappels ;
- commandes ;
- rendez-vous ;
- blocage carte ;
- actions rapides limitées.

Les informations sensibles doivent être masquées selon les préférences.

---

## 65. Badges

Les applications peuvent afficher :

- nombre de notifications non lues ;
- nombre d’actions requises ;
- alertes critiques ;
- commandes ;
- messages ;
- rendez-vous.

---

## 66. Notifications persistantes

Certaines alertes doivent rester visibles jusqu’à résolution :

- compte limité ;
- KYC incomplet ;
- carte compromise ;
- paiement en attente ;
- incident Agent ;
- mise à jour TPE obligatoire ;
- document expiré.

---

## 67. Bannières in-app

Les bannières peuvent afficher :

- incident ;
- maintenance ;
- nouveauté ;
- sécurité ;
- information réglementaire ;
- campagne ;
- action nécessaire.

---

## 68. Modales

Une modal doit être réservée à :

- action critique ;
- consentement ;
- changement réglementaire ;
- sécurité ;
- blocage ;
- décision importante.

Elle ne doit pas être utilisée pour du marketing intrusif.

---

## 69. Maintenance

Le système doit informer avant :

- maintenance planifiée ;
- indisponibilité ;
- coupure partenaire ;
- mise à jour ;
- restriction temporaire ;
- fin de maintenance.

---

## 70. Incident en temps réel

En cas d’incident, l’administration doit pouvoir :

- créer une alerte ;
- cibler les utilisateurs touchés ;
- mettre à jour le statut ;
- envoyer une résolution ;
- arrêter les notifications ;
- publier dans le centre de statut.

---

## 71. Administration

L’Admin doit pouvoir :

- créer des modèles ;
- modifier des modèles ;
- gérer les langues ;
- créer des campagnes ;
- cibler ;
- programmer ;
- annuler ;
- suivre ;
- modérer ;
- gérer les fournisseurs ;
- gérer les quotas ;
- gérer les priorités ;
- voir les erreurs ;
- voir les coûts ;
- auditer.

---

## 72. Permissions administratives

Les rôles doivent séparer :

- création ;
- validation ;
- publication ;
- annulation ;
- analyse ;
- administration technique ;
- gestion des fournisseurs ;
- campagnes ;
- sécurité ;
- audit.

---

## 73. API principales

Exemples :

```http
GET    /notifications
GET    /notifications/{notificationId}
POST   /notifications/{notificationId}/read
POST   /notifications/read-all
POST   /notifications/{notificationId}/archive
GET    /notification-preferences
PATCH  /notification-preferences
GET    /notification-devices
POST   /notification-devices/{deviceId}/test

POST   /internal/notifications/send
POST   /internal/notifications/batch
POST   /internal/notifications/cancel
GET    /internal/notifications/{notificationId}/status

POST   /admin/notification-templates
PATCH  /admin/notification-templates/{templateId}
POST   /admin/notification-campaigns
POST   /admin/notification-campaigns/{campaignId}/approve
POST   /admin/notification-campaigns/{campaignId}/send
POST   /admin/notification-campaigns/{campaignId}/cancel
GET    /admin/notification-analytics
```

---

## 74. Webhooks

Événements possibles :

```text
notification.created
notification.queued
notification.sent
notification.delivered
notification.opened
notification.read
notification.clicked
notification.failed
notification.expired
notification.cancelled
notification.preference.updated
notification.campaign.created
notification.campaign.approved
notification.campaign.started
notification.campaign.completed
notification.campaign.cancelled
```

---

## 75. Modèles principaux

- Notification
- NotificationEvent
- NotificationRecipient
- NotificationDelivery
- NotificationTemplate
- NotificationTemplateVersion
- NotificationPreference
- NotificationChannelPreference
- NotificationDevicePreference
- NotificationCampaign
- NotificationSegment
- NotificationSchedule
- NotificationProviderConfig
- NotificationRetry
- NotificationSuppression
- NotificationAudit
- NotificationAnalytics
- NotificationTranslation

---

## 76. Rôles

Exemples :

```text
NOTIFICATION_SUPER_ADMIN
NOTIFICATION_OPERATOR
NOTIFICATION_TEMPLATE_MANAGER
NOTIFICATION_CAMPAIGN_MANAGER
NOTIFICATION_CAMPAIGN_APPROVER
NOTIFICATION_SECURITY_MANAGER
NOTIFICATION_PROVIDER_ADMIN
MARKETING_MANAGER
SUPPORT_OPERATOR
AUDITOR
VIEWER
```

---

## 77. Permissions

Exemples :

```text
notification.read.self
notification.manage.self
notification.preference.read
notification.preference.manage
notification.send.transactional
notification.send.security
notification.send.marketing
notification.template.read
notification.template.manage
notification.campaign.create
notification.campaign.approve
notification.campaign.send
notification.campaign.cancel
notification.provider.manage
notification.analytics.read
notification.audit.read
```

---

## 78. Feature Flags

Exemples :

- push mobile ;
- Web Push ;
- e-mail ;
- SMS éventuel ;
- Apple Watch ;
- Wear OS ;
- résumés ;
- campagnes ;
- IA d’optimisation ;
- regroupement ;
- notifications Hub ;
- notifications Commerce ;
- notifications Agent ;
- notifications TPE ;
- heures silencieuses ;
- recommandations ;
- contenu enrichi.

---

## 79. Reporting

Rapports possibles :

- notifications créées ;
- envoyées ;
- livrées ;
- ouvertes ;
- lues ;
- cliquées ;
- échouées ;
- supprimées ;
- expirées ;
- par canal ;
- par pays ;
- par application ;
- par catégorie ;
- par priorité ;
- par campagne ;
- par fournisseur ;
- par appareil ;
- par langue ;
- par coût.

---

## 80. Indicateurs

Exemples :

- taux de livraison ;
- taux d’ouverture ;
- taux de lecture ;
- taux de clic ;
- taux d’échec ;
- délai moyen ;
- coût moyen ;
- désabonnement ;
- plaintes ;
- fatigue ;
- conversion ;
- rétention ;
- notifications par utilisateur ;
- fréquence par canal ;
- taux de déduplication.

---

## 81. Coûts

L’administration doit suivre :

- coût push ;
- coût e-mail ;
- coût SMS éventuel ;
- coût fournisseur ;
- coût par campagne ;
- coût par pays ;
- coût par utilisateur ;
- coût par canal ;
- volume gratuit ;
- dépassement.

---

## 82. Optimisation des coûts

Le système doit privilégier :

- in-app ;
- push ;
- Web Push ;
- regroupement ;
- résumés ;
- déduplication ;
- e-mail lorsque pertinent ;
- SMS uniquement en dernier recours.

---

## 83. Tests fonctionnels

- création ;
- envoi ;
- lecture ;
- clic ;
- archivage ;
- préférence ;
- heures silencieuses ;
- appareil principal ;
- push ;
- e-mail ;
- Web ;
- montre ;
- campagne ;
- ciblage ;
- rappel ;
- regroupement ;
- résumé ;
- expiration ;
- annulation ;
- déduplication.

---

## 84. Tests de sécurité

- notification inter-utilisateur ;
- fuite de montant ;
- deep link non autorisé ;
- modèle modifié ;
- campagne sans validation ;
- usurpation ;
- phishing ;
- lien falsifié ;
- permission ;
- accès Admin ;
- variable injectée ;
- fournisseur compromis ;
- secret ;
- audit.

---

## 85. Tests de performance

- envoi massif ;
- plusieurs millions de destinataires ;
- segmentation ;
- file ;
- reprise ;
- Web Push ;
- push mobile ;
- e-mails ;
- lecture simultanée ;
- synchronisation ;
- campagnes ;
- reporting.

---

## 86. Tests de résilience

- fournisseur indisponible ;
- jeton invalide ;
- réseau coupé ;
- file bloquée ;
- délai ;
- reprise ;
- double événement ;
- campagne interrompue ;
- base indisponible ;
- Webhook échoué ;
- appareil hors ligne ;
- changement de fuseau ;
- expiration.

---

## 87. Règles métier

1. Toute notification doit être liée à un événement ou à une campagne autorisée.
2. Les notifications critiques ne peuvent pas être entièrement désactivées.
3. Les préférences marketing doivent être respectées.
4. Les notifications transactionnelles et marketing doivent être séparées.
5. Le SMS doit rester facultatif et exceptionnel.
6. Les notifications doivent être dédupliquées.
7. Les notifications expirées ne doivent plus déclencher d’action.
8. Les liens doivent vérifier les permissions.
9. Les montants peuvent être masqués.
10. Les notifications lues doivent se synchroniser.
11. Les campagnes doivent respecter les quotas.
12. Les campagnes sensibles doivent être approuvées.
13. Les fournisseurs doivent être interchangeables.
14. Les envois doivent être asynchrones.
15. Les échecs doivent être rejouables.
16. Les appareils révoqués ne doivent plus recevoir de contenu sensible.
17. Les messages doivent respecter la langue de l’utilisateur.
18. Les fuseaux horaires doivent être pris en compte.
19. Les heures silencieuses doivent être respectées.
20. Les alertes critiques peuvent contourner certaines limites.
21. Les commerçants ne doivent notifier que les utilisateurs autorisés.
22. Les contenus trompeurs doivent être bloqués.
23. Les coûts doivent être suivis.
24. Les audits critiques doivent être immuables.
25. Une campagne annulée ne doit plus envoyer de nouveaux messages.
26. Les variables dynamiques doivent être validées.
27. Les notifications doivent minimiser les données sensibles.
28. Les messages de sécurité doivent rester clairs et non ambigus.
29. L’IA ne doit pas inventer de contenu financier.
30. Chaque canal doit respecter les règles du pays.

---

## 88. Ordre de développement recommandé

```text
P1-NOTIF-01 — Modèles Notification, Template et Preference
P1-NOTIF-02 — Boîte in-app et synchronisation de lecture
P1-NOTIF-03 — Push iOS et Android
P1-NOTIF-04 — E-mail et Web Push
P1-NOTIF-05 — Priorités, déduplication et expiration
P1-NOTIF-06 — Préférences, heures silencieuses et appareils
P1-NOTIF-07 — Campagnes, ciblage et consentement
P1-NOTIF-08 — Notifications Commerce, Agent, TPE et Hub
P1-NOTIF-09 — Apple Watch et Wear OS
P1-NOTIF-10 — Administration, fournisseurs et coûts
P1-NOTIF-11 — Reporting et optimisation intelligente
P1-NOTIF-12 — Tests de bout en bout
```

---

## 89. Critères d’acceptation finaux

Le module Notifications intelligentes Mansa est validé lorsque :

- les événements métier peuvent créer une notification ;
- la notification possède une priorité ;
- le canal est choisi selon les règles ;
- le consentement est vérifié ;
- les préférences sont respectées ;
- les notifications in-app fonctionnent ;
- la boîte de réception est disponible ;
- les notifications peuvent être lues ;
- elles peuvent être archivées ;
- la lecture se synchronise ;
- les badges sont mis à jour ;
- les push iOS fonctionnent ;
- les push Android fonctionnent ;
- les Web Push fonctionnent lorsqu’activés ;
- les e-mails fonctionnent ;
- le SMS n’est pas obligatoire ;
- les Apple Watch reçoivent les notifications autorisées ;
- Wear OS reçoit les notifications autorisées ;
- les appareils révoqués sont exclus ;
- les montants peuvent être masqués ;
- les préférences par appareil fonctionnent ;
- les heures silencieuses fonctionnent ;
- les alertes critiques restent disponibles ;
- les deep links fonctionnent ;
- les deep links vérifient les permissions ;
- les actions sensibles demandent une authentification ;
- les notifications sont dédupliquées ;
- les notifications expirent ;
- les notifications inutiles sont supprimées ;
- les rappels fonctionnent ;
- les rappels s’arrêtent après résolution ;
- les campagnes peuvent être créées ;
- les campagnes peuvent être ciblées ;
- les campagnes marketing respectent le consentement ;
- les campagnes sensibles peuvent être approuvées ;
- les campagnes peuvent être annulées ;
- les commerçants sont limités aux audiences autorisées ;
- l’anti-spam est appliqué ;
- les modèles sont administrables ;
- les variables dynamiques sont validées ;
- les traductions sont disponibles ;
- le multi-langues fonctionne ;
- le fuseau horaire est pris en compte ;
- les résumés peuvent être générés ;
- les notifications peuvent être regroupées ;
- Jini peut proposer une formulation ;
- Jini ne peut pas envoyer seul une alerte sensible ;
- les traitements sont asynchrones ;
- les retries fonctionnent ;
- les files d’échec existent ;
- les fournisseurs sont interchangeables ;
- les coûts sont suivis ;
- les rôles et permissions sont appliqués ;
- les feature flags sont disponibles ;
- le reporting est disponible ;
- les tests fonctionnels réussissent ;
- les tests de sécurité réussissent ;
- les tests de performance réussissent ;
- les tests de résilience réussissent ;
- les audits critiques sont immuables.
