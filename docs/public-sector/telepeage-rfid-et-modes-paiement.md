# Télépéage RFID et moyens de paiement configurables

Ce document complète les spécifications du péage Mansa et conserve deux architectures complémentaires : péage automatique classique avec barrière et télépéage RFID avec barrière, avec possibilité d’évolution ultérieure vers du free-flow.

## 1. Architecture télépéage retenue

Le télépéage initial repose sur un tag UHF RFID passif fixé sur le pare-brise du véhicule et associé dans Mansa à un véhicule, un compte et un statut d’autorisation.

Chaîne fonctionnelle :

`Tag RFID véhicule → lecteur/antenne de voie → contrôleur local → vérification Mansa → débit/autorisation → relais OPEN → barrière → capteur de passage → clôture de transaction`.

Le tag ne constitue pas à lui seul une preuve de paiement. Le backend ou le contrôleur local autorisé doit vérifier l’état du compte, les règles tarifaires et les éventuelles listes de blocage avant ouverture.

## 2. Approvisionnement RFID

Mansa ne fabrique pas les tags ni les lecteurs. Les tags UHF RFID passifs et les lecteurs/antennes sont achetés auprès de fabricants spécialisés.

Deux modèles commerciaux doivent rester possibles :

- l’État ou le concessionnaire achète directement les tags et lecteurs ;
- Mansa achète, intègre et revend le matériel dans une offre clé en main.

Les tags peuvent être personnalisés avec l’identité visuelle de l’autorité publique et un numéro visible, avec ou sans mention discrète `Propulsé par Mansa`.

## 3. Association tag-véhicule-compte

Lors de l’activation, le système associe au minimum :

- identifiant RFID ;
- véhicule ;
- plaque si disponible ;
- propriétaire ou organisation ;
- compte ou wallet de paiement ;
- statut actif/suspendu/bloqué ;
- date d’activation ;
- date d’expiration si applicable ;
- historique des réaffectations ;
- règles d’usage et plafonds éventuels.

Une réaffectation doit être auditée et ne doit jamais supprimer l’historique précédent.

## 4. Moyens de paiement conservés

Le système de péage doit pouvoir accepter, selon la voie et la politique publique :

- espèces en billets et pièces FCFA ;
- carte bancaire EMV ;
- sans-contact NFC ;
- carte Mansa ;
- wallet Mansa ;
- QR ;
- Mobile Money ;
- RFID télépéage ;
- compte flotte ou abonnement autorisé.

Le terminal carte doit être multi-réseaux et compatible avec les réseaux domestiques et internationaux activés par l’acquéreur, notamment Visa et Mastercard lorsque les accords correspondants sont en place.

## 5. Mobile Money activable ou désactivable

Mobile Money est un canal optionnel et configurable, pas une dépendance permanente.

L’administration habilitée doit pouvoir l’activer ou le désactiver :

- au niveau national ;
- par réseau routier ;
- par poste ;
- par voie ;
- par période ou date d’effet.

Aucune désactivation ne doit être déclenchée automatiquement simplement parce que l’usage des cartes augmente. Toute décision doit être explicite, datée et auditée.

Le même principe d’activation/désactivation s’applique aux autres moyens de paiement lorsque la politique publique évolue.

## 6. Marque blanche État

Toutes les interfaces physiques et numériques du péage doivent pouvoir fonctionner en marque blanche.

Éléments personnalisables :

- logo et identité de l’État ou du concessionnaire ;
- nom du service public ;
- couleurs ;
- écran d’accueil ;
- reçus ;
- signalétique de voie ;
- habillage des bornes et tags ;
- mention facultative `Propulsé par Mansa`.

Mansa ne doit pas dépendre d’une identité visuelle codée en dur.

## 7. Deux solutions de péage conservées

### Solution A — Péage automatique classique

Le conducteur s’arrête et paie via espèces/pièces, carte/NFC, QR, wallet ou Mobile Money selon les canaux activés. Après autorisation, le contrôleur local commande l’ouverture de la barrière.

### Solution B — Télépéage RFID

Le véhicule équipé d’un tag autorisé est détecté automatiquement. Le système identifie le compte, applique le tarif, valide ou débite la transaction puis ouvre la barrière sans action manuelle du conducteur.

Les deux solutions doivent coexister dans le même poste et partager la même supervision, le même ledger, le même rapprochement financier et les mêmes règles d’audit.

## 8. Évolution free-flow

Une évolution ultérieure vers du free-flow sans barrière peut être prévue avec portiques, RFID, lecture automatique de plaques, capteurs et traitement des véhicules non reconnus.

Cette évolution reste optionnelle car elle nécessite un cadre juridique, des mécanismes de gestion des impayés et une infrastructure plus avancée.

## 9. Sécurité et anti-fraude

Le système doit notamment :

- refuser les tags bloqués, expirés ou non associés ;
- détecter les usages anormaux d’un même tag ;
- empêcher l’ouverture sans autorisation valide sauf procédure d’exception auditée ;
- enregistrer chaque ouverture de barrière ;
- rapprocher lecture RFID, transaction, véhicule détecté et passage physique ;
- conserver les événements de sécurité ;
- permettre la révocation immédiate d’un tag.

## 10. Fonctionnement local et hors ligne

Le contrôleur de voie doit pouvoir maintenir un fonctionnement local limité et sécurisé en cas de perte Internet, avec cache de règles, listes de blocage, plafonds et journal d’événements.

La synchronisation avec Mansa doit reprendre automatiquement au retour du réseau, sans double débit ni suppression d’événements.
