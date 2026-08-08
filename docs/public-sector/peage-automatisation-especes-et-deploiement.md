# Péage — Automatisation des espèces et déploiement progressif

Ce document complète `peage-et-mobilite-routiere.md` et définit la prise en charge des billets et pièces, l’automatisation des voies et une stratégie réaliste de déploiement lorsque tous les postes ne peuvent pas être équipés immédiatement.

## 1. Moyens de paiement

Le péage Mansa ne doit pas imposer le tout-numérique. Selon l’équipement de la voie, il doit accepter :

- billets FCFA ;
- pièces FCFA ;
- carte bancaire et sans-contact ;
- wallet Mansa ;
- QR ;
- Mobile Money ;
- badges ou comptes prépayés autorisés.

Chaque encaissement, y compris en espèces, doit être rattaché à un passage unique et entrer dans le rapprochement financier du poste.

## 2. Trois niveaux d’équipement

### Niveau A — Voie entièrement automatique

Une borne automatique peut regrouper : accepteur de billets, monnayeur, coffre sécurisé, rendu de monnaie lorsque le matériel le permet, lecteur carte/NFC, QR, écran, imprimante de reçu, interphone, capteurs de véhicule et commande de barrière.

Le conducteur sélectionne ou confirme la catégorie si celle-ci n’est pas déterminée automatiquement, voit le tarif, paie, reçoit la confirmation puis la barrière s’ouvre. Aucun agent n’est nécessaire pour chaque transaction normale.

### Niveau B — Voie semi-automatique

Un agent peut rester présent pour assister et classer les véhicules, mais l’argent est introduit dans une machine sécurisée qui compte et valide billets et pièces. L’agent ne conserve pas directement la caisse et ne peut pas modifier silencieusement le montant comptabilisé.

Ce niveau permet de réduire fortement le risque de détournement sans supporter immédiatement le coût d’une voie totalement autonome.

### Niveau C — Poste numérisé à faible coût

Pour les petits postes qui ne peuvent pas encore recevoir de borne : terminal Mansa/TPE, caisse contrôlée, reçu obligatoire et enregistrement de chaque passage. Les espèces restent acceptées, mais le système rapproche les montants déclarés avec le trafic enregistré.

Ce niveau constitue une étape transitoire et non une obligation d’automatiser immédiatement tous les péages.

## 3. Gestion sécurisée des espèces

Une borne compatible espèces doit enregistrer :

- montant attendu ;
- billets et pièces introduits ;
- montant accepté ;
- monnaie rendue ;
- montant net conservé ;
- niveau du coffre ;
- erreurs ou rejets de billets/pièces ;
- ouverture du compartiment sécurisé ;
- identité de la personne ayant réalisé une collecte ou maintenance ;
- horodatage de chaque événement.

Les coffres doivent être scellables ou sécurisés. Les opérations de collecte doivent utiliser une procédure de double contrôle lorsque l’organisation l’exige.

## 4. Anti-corruption par rapprochement physique et financier

Le système doit comparer automatiquement :

`véhicules détectés ↔ catégorie tarifaire ↔ tarif attendu ↔ transaction enregistrée ↔ argent électronique ou espèces reçues ↔ ouverture de barrière`.

Une barrière ouverte sans paiement ou exonération valide génère un événement d’exception. Une ouverture manuelle doit enregistrer l’agent, l’heure, le motif et, selon la politique du poste, l’autorisation d’un superviseur.

Des alertes doivent détecter notamment :

- trop d’ouvertures manuelles ;
- écarts entre trafic et recettes ;
- annulations anormales ;
- manque de caisse ;
- collectes de coffre non rapprochées ;
- panne répétée d’un moyen de paiement ;
- voie présentant des recettes anormalement faibles par rapport au trafic.

## 5. Continuité en cas de panne

Une panne de borne ne doit pas bloquer tout le poste. Chaque site doit disposer d’une procédure de bascule vers une autre voie, un terminal mobile ou un mode semi-automatique. Les événements hors ligne sont signés, horodatés, stockés localement puis synchronisés lorsque la connexion revient.

Les règles hors ligne doivent limiter le risque de double encaissement et empêcher la suppression locale des transactions.

## 6. Déploiement progressif

Mansa doit permettre à l’État ou au concessionnaire de moderniser les péages sans devoir acheter une borne automatique pour chaque voie dès le premier jour.

### Phase 1 — Pilote

Équiper quelques voies sur un ou plusieurs postes à trafic élevé. Mesurer trafic, temps de passage, recettes, écarts de caisse, disponibilité du matériel et adoption des paiements numériques.

### Phase 2 — Modèle hybride

Installer les voies automatiques sur les axes prioritaires, des machines semi-automatiques sur les postes intermédiaires et conserver les postes numérisés à faible coût ailleurs.

### Phase 3 — Extension selon rentabilité

Prioriser les nouveaux équipements à partir du trafic, des pertes évitées, du coût de personnel, de la disponibilité électrique/réseau et du retour sur investissement constaté.

### Phase 4 — Automatisation renforcée

Ajouter progressivement classification automatique, lecture de plaques, badges/RFID et voies rapides lorsque le cadre juridique, le budget et les infrastructures le permettent.

## 7. Modèle économique à proposer à l’État

Le dossier de décision doit comparer au minimum :

- investissement matériel initial ;
- installation et génie civil ;
- énergie et connectivité ;
- maintenance et pièces de rechange ;
- coût logiciel Mansa ;
- coût actuel d’exploitation ;
- pertes et écarts de caisse constatés ;
- augmentation potentielle du taux de collecte ;
- réduction du nombre de postes nécessitant un encaissement humain permanent ;
- durée estimée de retour sur investissement.

Mansa ne doit pas supposer que l’État finance l’ensemble du réseau en une seule fois. Les modalités possibles — achat direct, location, crédit-bail, concession ou financement par économies de collecte — doivent rester configurables et faire l’objet de contrats distincts.

## 8. Personnel

L’objectif est de réduire les tâches répétitives d’encaissement et les occasions de détournement, pas de supprimer toute présence humaine. Les besoins se déplacent vers supervision, assistance aux usagers, maintenance, sécurité, contrôle et gestion des incidents.

Le système doit permettre de mesurer objectivement le besoin en personnel par poste et par tranche horaire.

## 9. Exigence de neutralité matérielle

Mansa doit rester indépendant d’un fabricant unique. Les accepteurs de billets, monnayeurs, barrières, capteurs, lecteurs, imprimantes et coffres sont intégrés derrière des adaptateurs afin de pouvoir mettre en concurrence plusieurs fournisseurs et remplacer un équipement sans réécrire le cœur du service.

Aucune référence fournisseur, clé, identifiant de production ou secret ne doit être codé en dur dans le dépôt.
