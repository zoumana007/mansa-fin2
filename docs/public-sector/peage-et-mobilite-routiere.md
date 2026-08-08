# Service public — Péage et mobilité routière

## 1. Objectif

Intégrer dans Mansa un service de péage routier public ou concédé permettant de payer, contrôler, rapprocher et auditer les droits de passage sur les routes, ponts, tunnels et axes payants.

Le module doit fonctionner comme une brique du domaine État, avec une séparation stricte entre la collecte, l’exploitation du poste de péage, la supervision publique, la comptabilité et l’audit.

## 2. Cas d’usage couverts

- Paiement au poste de péage par carte, QR, wallet Mansa, Mobile Money ou autre moyen autorisé.
- Paiement sans contact sur terminal compatible.
- Compte prépayé pour particuliers, entreprises, transporteurs, taxis, bus et flottes.
- Abonnement ou forfait par véhicule, catégorie, axe ou période.
- Passage avec lecture de plaque lorsque la réglementation et l’équipement le permettent.
- Gestion des véhicules exonérés ou prioritaires selon une liste officielle.
- Paiement différé pour flottes autorisées.
- Reçu numérique immédiat.
- Consultation de l’historique des passages et paiements.
- Remboursement, annulation ou correction sous contrôle habilité.

## 3. Identification du passage

Chaque passage doit créer un enregistrement unique comprenant au minimum :

- identifiant du passage ;
- poste de péage ;
- voie ;
- sens de circulation ;
- date et heure ;
- classe tarifaire ;
- montant théorique ;
- montant réellement encaissé ;
- moyen de paiement ;
- référence transaction Mansa ;
- identifiant du terminal ;
- identifiant de l’agent lorsque pertinent ;
- plaque ou identifiant véhicule si disponible ;
- état du passage : payé, exempté, en attente, rejeté, contesté, annulé.

## 4. Tarification

Les tarifs doivent être entièrement configurables depuis l’administration autorisée selon :

- catégorie de véhicule ;
- nombre d’essieux ;
- poids ou classe réglementaire ;
- poste de péage ;
- axe ou ouvrage ;
- période ;
- type d’abonnement ;
- profil particulier ou professionnel ;
- exonération ou convention spécifique.

Aucune modification tarifaire ne doit être appliquée sans date d’effet, auteur, motif et journal d’audit.

## 5. Paiement et expérience terrain

Le paiement au péage doit être très rapide. Le parcours standard ne doit pas imposer inutilement une authentification longue au conducteur.

Les terminaux doivent pouvoir :

- calculer ou recevoir le tarif ;
- afficher le montant avant paiement ;
- accepter les moyens de paiement activés ;
- confirmer immédiatement le résultat ;
- générer un reçu ;
- fonctionner en mode dégradé contrôlé en cas de coupure réseau ;
- resynchroniser les transactions dès le retour de la connexion.

Les règles de fonctionnement hors ligne doivent prévoir des plafonds, compteurs, listes de blocage locales et mécanismes anti-double-débit.

## 6. Comptes prépayés et flottes

Une entreprise ou un transporteur doit pouvoir enregistrer plusieurs véhicules sous un même compte et :

- attribuer un plafond par véhicule ;
- visualiser les passages ;
- recevoir des factures consolidées ;
- exporter les données ;
- activer ou suspendre un véhicule ;
- associer un badge, QR, identifiant ou plaque selon le matériel disponible.

## 7. Exonérations

Le système doit supporter une liste d’exonérations administrée par une autorité habilitée.

Chaque exonération doit comporter :

- motif juridique ou administratif ;
- véhicule ou catégorie concernée ;
- période de validité ;
- autorité ayant accordé l’exonération ;
- justificatif ou référence ;
- journal des utilisations.

Aucun agent de terrain ne doit pouvoir créer une exonération permanente depuis un poste de péage.

## 8. Anti-fraude et anti-corruption

Le module doit réduire les possibilités de détournement grâce à :

- rapprochement automatique entre passages et encaissements ;
- interdiction des suppressions silencieuses ;
- journal d’audit immuable ;
- comparaison entre comptage de véhicules et transactions ;
- alertes sur montants modifiés, annulations excessives ou voies anormalement peu rentables ;
- suivi des écarts par poste, voie, équipe et période ;
- séparation des rôles entre opérateur, superviseur et auditeur ;
- justification obligatoire des opérations manuelles sensibles.

## 9. Rapprochement financier

Chaque poste doit produire automatiquement :

- montant brut attendu ;
- montant encaissé par moyen de paiement ;
- exonérations ;
- annulations et remboursements ;
- écarts ;
- frais de paiement ;
- montant net à reverser ;
- ventilation État, concessionnaire ou autre bénéficiaire selon le contrat.

Les règles de partage des recettes doivent être configurables et versionnées.

## 10. Administration

Le portail d’administration doit permettre aux rôles habilités de gérer :

- postes de péage ;
- voies ;
- terminaux ;
- catégories de véhicules ;
- grilles tarifaires ;
- abonnements ;
- comptes de flotte ;
- exonérations ;
- agents et permissions ;
- rapprochements ;
- incidents ;
- tableaux de bord ;
- exports comptables et rapports d’audit.

## 11. Données et confidentialité

Les données de mobilité peuvent être sensibles. Leur conservation doit être limitée au besoin opérationnel, réglementaire, comptable et antifraude.

Les accès aux historiques détaillés de déplacement doivent être restreints, journalisés et soumis à une finalité autorisée.

Les données de paiement ne doivent jamais contenir de secret de carte exploitable ou de clé API dans les journaux applicatifs.

## 12. Intégrations possibles

Le module doit pouvoir être relié par adaptateurs à :

- systèmes de barrières ;
- lecteurs RFID ou badges ;
- caméras de lecture de plaques ;
- terminaux Android/TPE ;
- systèmes de pesage ;
- opérateurs Mobile Money ;
- banques et acquéreurs ;
- systèmes comptables publics ;
- plateformes de concessionnaires routiers.

Toute intégration externe doit pouvoir être désactivée sans arrêter le cœur du service.

## 13. Indicateurs

Les tableaux de bord doivent suivre au minimum :

- nombre de passages ;
- chiffre d’affaires par poste et voie ;
- répartition par classe de véhicule ;
- taux de paiement électronique ;
- temps moyen de traitement ;
- taux d’échec ;
- montant des exonérations ;
- annulations et remboursements ;
- écarts de rapprochement ;
- disponibilité des terminaux et voies.

## 14. Gouvernance

Le service de péage est un sous-module du domaine public Mansa. Les responsabilités institutionnelles, tarifs officiels, exonérations légales, règles de partage des recettes et durées de conservation doivent être configurés conformément aux conventions signées avec l’État, les collectivités ou concessionnaires concernés.

Les paramètres sensibles ne doivent jamais être codés en dur.
