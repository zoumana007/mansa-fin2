# 88 — Programme de Parrainage, Affiliation et Récompenses Mansa : invitations, codes, liens, QR, bonus, commissions, anti-fraude, campagnes, administration et reporting

## 1. Objet du document

Ce document définit le cahier des charges complet du **Programme de Parrainage Mansa**.

Le programme doit permettre à un utilisateur, un commerçant, un Agent, une entreprise, une institution ou un partenaire autorisé d’inviter de nouveaux utilisateurs et de recevoir une récompense lorsque les conditions définies sont remplies.

Le système doit couvrir :

- parrainage Client ;
- parrainage Commerce ;
- parrainage Agent ;
- parrainage Entreprise ;
- affiliation ;
- campagnes promotionnelles ;
- codes de parrainage ;
- liens d’invitation ;
- QR Codes ;
- attribution ;
- récompenses ;
- commissions ;
- cashback ;
- points ;
- crédits ;
- avantages non financiers ;
- paliers ;
- classements ;
- suivi ;
- partage ;
- anti-fraude ;
- administration ;
- multi-pays ;
- multi-devise ;
- fiscalité ;
- reporting ;
- audit.

Le programme ne doit jamais permettre la création artificielle d’argent, de soldes ou de récompenses en dehors du Ledger.

---

## 2. Principe général

Le parcours général doit être :

```text
Création d’une invitation
→ Partage du code, lien ou QR
→ Inscription du filleul
→ Attribution du parrain
→ Vérification des conditions
→ Délai de validation
→ Calcul de la récompense
→ Comptabilisation dans le Ledger
→ Notification
→ Audit
```

Une inscription seule ne doit pas obligatoirement déclencher une récompense.

La récompense doit dépendre de conditions administrables.

---

## 3. Acteurs concernés

Le programme peut concerner :

- Client particulier ;
- Commerçant ;
- Agent ;
- Employé Commerce ;
- Entreprise ;
- Association ;
- École ;
- Université ;
- Institution ;
- Administration publique ;
- partenaire bancaire ;
- partenaire Mobile Money ;
- influenceur ;
- ambassadeur ;
- apporteur d’affaires ;
- développeur partenaire ;
- franchise ;
- réseau commercial ;
- équipe interne autorisée.

---

## 4. Types de programme

Le système doit permettre plusieurs programmes indépendants :

- parrainage Client vers Client ;
- Client vers Commerce ;
- Commerce vers Client ;
- Commerce vers Commerce ;
- Agent vers Client ;
- Agent vers Commerce ;
- Entreprise vers employés ;
- Établissement vers étudiants ;
- partenaire vers utilisateurs ;
- affiliation publique ;
- campagne influenceur ;
- campagne géographique ;
- campagne événementielle ;
- programme interne ;
- programme multi-niveaux limité et réglementé ;
- programme de fidélité lié au parrainage.

---

## 5. Parrainage Client

Un Client peut inviter une autre personne à créer un compte Mansa.

La récompense peut être déclenchée lorsque le filleul :

- crée un compte ;
- vérifie son e-mail ;
- enregistre un appareil sécurisé ;
- termine son KYC ;
- crée son Wallet ;
- effectue son premier dépôt ;
- reçoit son premier paiement ;
- réalise son premier paiement ;
- effectue un transfert ;
- commande une carte ;
- utilise le Hub ;
- atteint un volume minimum ;
- reste actif pendant une période définie.

---

## 6. Parrainage Commerce

Un commerçant peut inviter :

- de nouveaux clients ;
- d’autres commerces ;
- des employés ;
- des fournisseurs ;
- des partenaires.

Les récompenses possibles :

- réduction d’abonnement ;
- mois gratuit ;
- crédits Studio Photo IA ;
- réduction sur les frais ;
- mise en avant Hub ;
- points ;
- cashback ;
- commission ;
- accès temporaire Premium ;
- quota supplémentaire ;
- badge Ambassadeur.

---

## 7. Parrainage Agent

Un Agent peut être récompensé pour :

- activation d’un nouveau client ;
- KYC validé ;
- ouverture d’un Wallet ;
- premier dépôt ;
- activation d’un commerçant ;
- installation d’un TPE ;
- activation d’un point de service ;
- volume durable généré.

Le système doit éviter que l’Agent soit payé pour de faux comptes ou de simples inscriptions non actives.

---

## 8. Parrainage Entreprise

Une entreprise peut inviter :

- employés ;
- fournisseurs ;
- clients ;
- partenaires ;
- sous-traitants.

Les avantages peuvent être attribués :

- à l’entreprise ;
- à l’employé ;
- aux deux ;
- à un Wallet collectif ;
- à une campagne sociale ;
- à une association choisie.

---

## 9. Parrainage Institutionnel

Une école, une université, une mairie, une administration ou une institution peut disposer :

- d’un code institutionnel ;
- d’un QR dédié ;
- d’une campagne ;
- d’un tableau de bord ;
- d’un suivi ;
- de quotas ;
- de règles spécifiques ;
- d’un contrat associé.

Les récompenses doivent respecter les règles applicables aux acteurs publics et éviter tout avantage personnel illégal.

---

## 10. Affiliation

Le système d’affiliation doit permettre à un partenaire autorisé de promouvoir Mansa par :

- lien suivi ;
- code ;
- QR ;
- page personnalisée ;
- campagne ;
- contenu ;
- bannière ;
- API ;
- mini-site ;
- intégration partenaire.

L’affilié peut recevoir :

- montant fixe ;
- pourcentage ;
- commission récurrente limitée ;
- avantage en nature ;
- crédit de service ;
- récompense par palier.

---

## 11. Code de parrainage

Chaque utilisateur éligible peut recevoir un code.

Exemples :

```text
ZOUMANA25
MANSA7X4K
BOUTIQUE-BAMAKO
AGENT-1048
```

Le code doit être :

- unique dans son périmètre ;
- non sensible à la casse selon configuration ;
- limité en longueur ;
- lisible ;
- partageable ;
- révocable ;
- expirant si nécessaire ;
- traçable ;
- protégé contre l’usurpation.

---

## 12. Codes personnalisés

Selon l’offre ou le rôle, l’utilisateur peut demander un code personnalisé.

Le système doit vérifier :

- disponibilité ;
- contenu interdit ;
- marque ;
- usurpation ;
- nom protégé ;
- mot réservé ;
- longueur ;
- caractères autorisés ;
- risque de confusion.

---

## 13. Lien d’invitation

Chaque campagne peut générer un lien du type :

```text
mansa.app/invite/ZOUMANA25
```

Le lien doit contenir ou référencer :

- programme ;
- campagne ;
- parrain ;
- canal ;
- date ;
- pays ;
- langue ;
- source ;
- appareil ;
- attribution ;
- expiration éventuelle.

---

## 14. QR Code

Le système doit permettre de générer un QR Code pour :

- affichage mobile ;
- impression ;
- boutique ;
- événement ;
- affiche ;
- carte de visite ;
- TPE ;
- site ;
- réseau social ;
- campagne institutionnelle.

Le QR doit ouvrir un lien officiel Mansa.

---

## 15. Partage

Le parrain peut partager via :

- WhatsApp ;
- messagerie ;
- e-mail ;
- réseaux sociaux ;
- QR ;
- copier le lien ;
- AirDrop ;
- partage Android ;
- fiche imprimée ;
- mini-site ;
- NFC selon usage.

---

## 16. Page d’invitation

La page doit afficher :

- identité publique du programme ;
- nom ou pseudonyme autorisé du parrain ;
- avantages ;
- conditions ;
- date d’expiration ;
- étapes requises ;
- pays ;
- mentions légales ;
- lien vers l’inscription ;
- politique de confidentialité.

Elle ne doit pas afficher de données sensibles du parrain.

---

## 17. Attribution du parrain

L’attribution peut être réalisée par :

- code saisi ;
- lien ouvert ;
- QR scanné ;
- campagne ;
- appareil ;
- cookie ou stockage autorisé ;
- paramètre d’inscription ;
- import institutionnel ;
- API partenaire.

---

## 18. Fenêtre d’attribution

L’administration doit pouvoir définir une durée :

- immédiate ;
- 24 heures ;
- 7 jours ;
- 30 jours ;
- durée personnalisée ;
- jusqu’à inscription ;
- jusqu’au premier événement qualifiant.

---

## 19. Priorité d’attribution

En cas de plusieurs sources possibles, les règles peuvent être :

- premier code valide ;
- dernier lien valide ;
- code saisi manuellement prioritaire ;
- campagne institutionnelle prioritaire ;
- partenaire contractuel prioritaire ;
- attribution figée après inscription ;
- revue manuelle.

La règle doit être claire et auditable.

---

## 20. Attribution unique

Un filleul ne doit pas pouvoir être attribué simultanément à plusieurs parrains pour la même récompense, sauf programme explicitement prévu.

---

## 21. Changement de parrain

Le changement doit être limité.

Cas possibles :

- erreur avant KYC ;
- code incorrect ;
- campagne institutionnelle ;
- support ;
- fraude ;
- attribution technique erronée.

Toute modification doit être auditée.

---

## 22. Conditions d’éligibilité du parrain

Le parrain peut devoir :

- avoir un compte actif ;
- avoir terminé son KYC ;
- disposer d’un Wallet ;
- ne pas être suspendu ;
- respecter les conditions ;
- ne pas avoir dépassé un plafond ;
- appartenir au bon pays ;
- être inscrit au programme ;
- accepter les règles ;
- ne pas être détecté comme fraudeur.

---

## 23. Conditions d’éligibilité du filleul

Le filleul peut devoir :

- être un nouvel utilisateur ;
- ne jamais avoir eu de compte ;
- utiliser des coordonnées uniques ;
- utiliser un appareil autorisé ;
- terminer son KYC ;
- respecter l’âge minimum ;
- résider dans un pays éligible ;
- réaliser une première opération réelle ;
- ne pas annuler l’opération ;
- ne pas être lié frauduleusement au parrain.

---

## 24. Événements qualifiants

Exemples :

```text
ACCOUNT_CREATED
EMAIL_VERIFIED
DEVICE_TRUSTED
KYC_APPROVED
WALLET_ACTIVATED
FIRST_DEPOSIT_COMPLETED
FIRST_PAYMENT_COMPLETED
FIRST_TRANSFER_COMPLETED
FIRST_CARD_ORDERED
FIRST_HUB_ORDER_COMPLETED
MERCHANT_ACTIVATED
TPE_ACTIVATED
VOLUME_THRESHOLD_REACHED
RETENTION_PERIOD_REACHED
```

---

## 25. Conditions multiples

Une récompense peut exiger plusieurs conditions :

```text
KYC validé
+ Wallet actif
+ Premier dépôt de 5 000 FCFA minimum
+ Premier paiement réel
+ Compte actif pendant 14 jours
```

---

## 26. Délai de validation

La récompense peut rester en attente pendant :

- quelques heures ;
- plusieurs jours ;
- fin du délai de remboursement ;
- fin du délai de fraude ;
- fin du rapprochement ;
- validation KYC ;
- validation partenaire.

---

## 27. Statuts d’un parrainage

```text
INVITED
LINK_OPENED
REGISTERED
ATTRIBUTED
PENDING_REQUIREMENTS
QUALIFIED
UNDER_REVIEW
REWARD_PENDING
REWARDED
REJECTED
CANCELLED
EXPIRED
FRAUD_SUSPECTED
REWARD_REVERSED
```

---

## 28. Types de récompense

Le système peut offrir :

- argent ;
- cashback ;
- points ;
- crédit Mansa ;
- réduction de frais ;
- coupon ;
- remise abonnement ;
- mois gratuit ;
- crédit IA ;
- promotion Hub ;
- quota supplémentaire ;
- carte gratuite ;
- badge ;
- avantage partenaire ;
- don ;
- lot ;
- récompense personnalisée.

---

## 29. Récompense du parrain

Le parrain peut recevoir :

- montant fixe ;
- pourcentage ;
- récompense selon palier ;
- commission conditionnelle ;
- avantage non financier ;
- récompense différée.

---

## 30. Récompense du filleul

Le filleul peut recevoir :

- bonus de bienvenue ;
- réduction ;
- cashback ;
- gratuité temporaire ;
- quota supplémentaire ;
- coupon ;
- carte gratuite ;
- crédit Hub ;
- crédit IA ;
- avantage partenaire.

---

## 31. Récompense double

Une campagne peut récompenser :

- seulement le parrain ;
- seulement le filleul ;
- les deux ;
- le parrain après activation ;
- le filleul immédiatement ;
- les deux à des moments différents.

---

## 32. Montants en unités minimales

Toutes les récompenses financières doivent être enregistrées en unités minimales.

Exemples :

- FCFA sans décimales ;
- centimes pour EUR ;
- cents pour USD.

---

## 33. Comptabilisation Ledger

Toute récompense financière doit produire une opération Ledger équilibrée.

Exemple :

```text
Débit : Budget marketing Parrainage
Crédit : Wallet du parrain
```

Aucun bonus ne doit être ajouté par simple modification de solde.

---

## 34. Source de financement

Chaque programme doit définir une source :

- budget Mansa ;
- budget partenaire ;
- budget commerçant ;
- budget institutionnel ;
- budget marketing ;
- enveloppe promotionnelle ;
- sponsor ;
- commission prélevée ;
- fonds contractuel.

---

## 35. Budget de campagne

Chaque campagne doit pouvoir définir :

- budget total ;
- budget quotidien ;
- budget hebdomadaire ;
- budget mensuel ;
- montant réservé ;
- montant consommé ;
- montant restant ;
- seuil d’alerte ;
- date de fin ;
- arrêt automatique.

---

## 36. Réservation budgétaire

Le système peut réserver une partie du budget lorsque le filleul devient probablement éligible.

Statuts possibles :

- AVAILABLE ;
- RESERVED ;
- COMMITTED ;
- SPENT ;
- RELEASED ;
- EXHAUSTED.

---

## 37. Plafonds

Les plafonds peuvent dépendre :

- du parrain ;
- du filleul ;
- du programme ;
- de la campagne ;
- du jour ;
- de la semaine ;
- du mois ;
- du pays ;
- du rôle ;
- du niveau KYC ;
- de l’offre ;
- du risque.

---

## 38. Paliers

Exemple :

```text
1 filleul qualifié : 1 000 FCFA
5 filleuls qualifiés : bonus de 3 000 FCFA
10 filleuls qualifiés : bonus de 10 000 FCFA
25 filleuls qualifiés : mois Premium offert
```

---

## 39. Récompenses progressives

La valeur peut évoluer selon :

- nombre de filleuls ;
- qualité ;
- volume ;
- rétention ;
- secteur ;
- période ;
- campagne ;
- pays ;
- niveau du parrain.

---

## 40. Classements

Le système peut proposer :

- meilleur parrain ;
- meilleur Agent ;
- meilleur Commerce ;
- meilleur ambassadeur ;
- classement local ;
- classement mensuel ;
- classement événementiel.

Les classements doivent éviter d’exposer des données personnelles.

---

## 41. Badges

Exemples :

- Premier parrainage ;
- Ambassadeur ;
- Super Ambassadeur ;
- Commerce recruteur ;
- Agent développeur ;
- Partenaire Gold ;
- Parrain de confiance ;
- Leader régional.

---

## 42. Challenges

Le système peut créer des défis :

- inviter 3 personnes ;
- activer 5 commerces ;
- atteindre un volume ;
- recruter dans une région ;
- terminer avant une date ;
- atteindre un taux de rétention ;
- obtenir des filleuls vérifiés.

---

## 43. Parrainage multi-niveaux

Le système peut techniquement gérer plusieurs niveaux, mais cela doit être fortement limité.

Exemple autorisable :

- niveau direct ;
- bonus d’équipe limité ;
- réseau professionnel contractuel.

Le système ne doit pas devenir une structure pyramidale illégale.

---

## 44. Limites du multi-niveaux

Interdictions :

- rémunération uniquement basée sur le recrutement ;
- niveaux illimités ;
- obligation de paiement pour entrer ;
- promesse de richesse ;
- récompense sans activité réelle ;
- système opaque ;
- commissions non plafonnées.

---

## 45. Parrainage par équipe

Une entreprise ou un réseau peut créer une équipe avec :

- responsable ;
- membres ;
- objectifs ;
- territoire ;
- campagne ;
- budget ;
- rapports ;
- permissions.

---

## 46. Parrainage géographique

Les campagnes peuvent cibler :

- pays ;
- région ;
- ville ;
- commune ;
- quartier ;
- zone commerciale ;
- campus ;
- événement ;
- agence ;
- point Agent.

---

## 47. Multi-pays

Chaque pays peut définir :

- programmes autorisés ;
- types de récompenses ;
- plafonds ;
- devise ;
- fiscalité ;
- âge minimum ;
- règles marketing ;
- restrictions ;
- partenaires ;
- contrats ;
- mentions légales.

---

## 48. Multi-devises

Le système doit distinguer :

- devise de la campagne ;
- devise du parrain ;
- devise du filleul ;
- devise du Wallet ;
- devise du règlement ;
- taux de conversion ;
- frais éventuels ;
- date du taux.

---

## 49. Conversion de récompense

La conversion doit être :

- explicite ;
- auditée ;
- basée sur un taux identifié ;
- comptabilisée ;
- visible dans le détail.

---

## 50. Récompenses non retirables

Certains crédits peuvent être limités à un usage :

- paiement de frais ;
- abonnement ;
- Studio Photo IA ;
- publicité Hub ;
- commande ;
- achat partenaire ;
- carte.

Ils doivent être clairement distingués de l’argent disponible.

---

## 51. Expiration des récompenses

Une récompense peut expirer selon :

- type ;
- campagne ;
- contrat ;
- pays ;
- date ;
- absence d’utilisation.

L’expiration doit être annoncée à l’avance.

---

## 52. Annulation d’une récompense

Une récompense peut être annulée si :

- opération remboursée ;
- paiement frauduleux ;
- KYC révoqué ;
- compte dupliqué ;
- fraude confirmée ;
- campagne annulée ;
- erreur technique ;
- condition non respectée.

---

## 53. Reprise de récompense

Une récompense déjà versée peut être reprise uniquement selon les règles acceptées et dans les limites légales.

Le système doit produire une opération Ledger distincte.

Il ne doit jamais modifier rétroactivement l’écriture originale.

---

## 54. Solde insuffisant pour reprise

Si la récompense a été dépensée :

- créer une créance promotionnelle ;
- limiter les futurs bonus ;
- compenser sur une récompense future ;
- ouvrir une revue ;
- ne pas créer arbitrairement un solde négatif non autorisé.

---

## 55. Notification du parrain

Le parrain doit pouvoir être informé lorsque :

- invitation envoyée ;
- lien ouvert selon consentement ;
- filleul inscrit ;
- condition manquante ;
- filleul qualifié ;
- récompense en attente ;
- récompense versée ;
- récompense refusée ;
- plafond atteint ;
- campagne expirante ;
- fraude suspectée.

---

## 56. Confidentialité du filleul

Le parrain ne doit pas voir :

- documents KYC ;
- numéro complet ;
- e-mail complet ;
- transactions ;
- solde ;
- motif réglementaire détaillé ;
- données sensibles.

Il peut voir seulement un statut autorisé.

Exemple :

```text
Invitation acceptée
Conditions en cours
Récompense validée
```

---

## 57. Tableau de bord du parrain

Le tableau peut afficher :

- code ;
- lien ;
- QR ;
- invitations ;
- inscriptions ;
- filleuls qualifiés ;
- récompenses en attente ;
- récompenses reçues ;
- plafonds ;
- paliers ;
- campagnes ;
- historique ;
- règles.

---

## 58. Tableau Commerce

Le commerçant peut voir :

- clients invités ;
- nouveaux clients ;
- conversions ;
- ventes générées ;
- récompenses ;
- coupons ;
- coût d’acquisition ;
- campagne ;
- retour sur investissement.

---

## 59. Tableau Agent

L’Agent peut voir :

- activations ;
- KYC validés ;
- dépôts qualifiants ;
- commerces activés ;
- commissions ;
- opérations rejetées ;
- objectifs ;
- classement selon activation.

---

## 60. Tableau partenaire

Le partenaire peut voir selon permissions :

- clics ;
- inscriptions ;
- activations ;
- conversions ;
- volume ;
- commissions ;
- dépenses ;
- pays ;
- campagnes ;
- factures ;
- exports.

---

## 61. Partage social

Le système peut générer :

- message court ;
- visuel ;
- QR ;
- story ;
- bannière ;
- texte traduit ;
- vidéo courte ;
- fiche imprimable.

---

## 62. Studio IA pour les campagnes

Le Studio Photo IA peut aider à créer :

- visuel de parrainage ;
- bannière ;
- story ;
- affiche ;
- QR intégré ;
- déclinaisons ;
- visuel Commerce.

Toute publication doit être validée.

---

## 63. Jini

Jini peut aider à :

- expliquer le programme ;
- vérifier les conditions ;
- générer un message ;
- rappeler un palier ;
- analyser les performances ;
- proposer une campagne ;
- répondre aux questions ;
- détecter une anomalie.

Jini ne doit pas attribuer ou annuler seul une récompense.

---

## 64. Anti-fraude

Le programme doit détecter :

- auto-parrainage ;
- comptes multiples ;
- appareils partagés suspects ;
- même identité ;
- même document ;
- même numéro ;
- même e-mail ;
- même moyen de paiement ;
- même compte bancaire ;
- même carte ;
- même adresse IP ;
- émulateurs ;
- fermes de comptes ;
- faux dépôts ;
- paiements circulaires ;
- remboursements rapides ;
- activité artificielle.

---

## 65. Auto-parrainage

Le système doit empêcher qu’un utilisateur se parraine lui-même directement ou indirectement.

Les contrôles peuvent inclure :

- identité ;
- appareil ;
- document ;
- biométrie ;
- moyen de paiement ;
- téléphone ;
- e-mail ;
- réseau ;
- comportement.

---

## 66. Comptes liés

Le système peut construire un graphe de relations :

- appareils ;
- identités ;
- paiements ;
- adresses ;
- cartes ;
- Wallets ;
- réseaux ;
- Agents ;
- commerçants ;
- campagnes.

---

## 67. Paiements circulaires

Le système doit détecter les opérations créées uniquement pour débloquer un bonus :

```text
Parrain → Filleul
Filleul → Parrain
Remboursement immédiat
Paiement entre comptes liés
```

---

## 68. Vrais événements qualifiants

Les événements qualifiants doivent être :

- comptabilisés ;
- non annulés ;
- non remboursés ;
- non frauduleux ;
- au-dessus du seuil ;
- effectués avec des fonds réels selon les règles ;
- confirmés par le partenaire si nécessaire.

---

## 69. Score de risque

Chaque parrainage peut recevoir un score selon :

- appareil ;
- identité ;
- réseau ;
- comportement ;
- campagne ;
- volume ;
- vitesse ;
- liens ;
- historique ;
- anomalies ;
- géographie ;
- remboursement.

---

## 70. Revue manuelle

Les cas suspects peuvent passer en revue.

Statuts :

```text
NOT_REQUIRED
PENDING
IN_REVIEW
APPROVED
REJECTED
ESCALATED
```

---

## 71. Blocage temporaire

En cas de risque :

- suspendre la récompense ;
- laisser le compte fonctionner selon niveau de risque ;
- demander une vérification ;
- retarder le paiement ;
- limiter le programme ;
- bloquer la campagne ;
- escalader à la fraude.

---

## 72. Liste de refus

Le système peut maintenir :

- utilisateurs exclus ;
- appareils exclus ;
- numéros exclus ;
- partenaires exclus ;
- campagnes bloquées ;
- codes compromis ;
- adresses à risque ;
- moyens de paiement à risque.

---

## 73. Code compromis

Si un code est diffusé frauduleusement :

- suspension ;
- remplacement ;
- invalidation ;
- conservation de l’historique ;
- notification ;
- revue des attributions ;
- blocage des nouvelles récompenses.

---

## 74. Abus de partage

Le système doit limiter :

- spam ;
- messages automatiques ;
- scraping ;
- génération massive ;
- harcèlement ;
- invitations non sollicitées ;
- achat de trafic frauduleux.

---

## 75. Consentement et communication

L’utilisateur doit pouvoir :

- accepter le programme ;
- consulter les conditions ;
- arrêter de participer ;
- désactiver certains rappels ;
- refuser le marketing ;
- garder les notifications transactionnelles nécessaires.

---

## 76. Conditions du programme

Chaque programme doit publier :

- organisateur ;
- bénéficiaires ;
- dates ;
- pays ;
- conditions ;
- récompenses ;
- plafonds ;
- exclusions ;
- expiration ;
- fraude ;
- réclamation ;
- fiscalité ;
- modification ;
- arrêt.

---

## 77. Versionnement des règles

Les règles doivent être versionnées.

Un parrainage doit conserver la version applicable au moment de l’attribution ou de l’événement défini.

---

## 78. Modification d’une campagne

Une modification ne doit pas changer rétroactivement les droits acquis, sauf correction légitime prévue.

---

## 79. Arrêt d’une campagne

L’arrêt doit préciser :

- nouvelles invitations refusées ;
- inscriptions existantes ;
- filleuls en cours ;
- récompenses déjà qualifiées ;
- budget restant ;
- date de clôture ;
- communications.

---

## 80. Réclamations

Un utilisateur peut contester :

- attribution incorrecte ;
- condition considérée non remplie ;
- récompense manquante ;
- montant incorrect ;
- expiration ;
- fraude ;
- annulation ;
- changement de parrain.

---

## 81. Preuves de parrainage

Le système doit conserver :

- code ;
- lien ;
- QR ;
- date ;
- appareil ;
- campagne ;
- attribution ;
- événements ;
- règles ;
- version ;
- récompense ;
- Ledger ;
- notifications ;
- décision ;
- audit.

---

## 82. Support

Le support doit pouvoir :

- consulter le dossier ;
- expliquer le statut ;
- demander une preuve ;
- corriger une erreur autorisée ;
- escalader ;
- ne pas forcer un paiement sans permission ;
- laisser une trace.

---

## 83. Administration

L’administration doit pouvoir gérer :

- programmes ;
- campagnes ;
- codes ;
- règles ;
- conditions ;
- récompenses ;
- budgets ;
- plafonds ;
- paliers ;
- pays ;
- devises ;
- acteurs ;
- partenaires ;
- fraude ;
- réclamations ;
- contenus ;
- traductions ;
- feature flags ;
- fournisseurs ;
- rapports ;
- audits.

---

## 84. Séparation des responsabilités

Les rôles doivent séparer :

- création ;
- modification ;
- validation ;
- publication ;
- budget ;
- paiement ;
- fraude ;
- support ;
- reporting ;
- audit.

---

## 85. Approbation à plusieurs niveaux

Une campagne importante peut nécessiter :

```text
Création Marketing
→ Validation Finance
→ Validation Conformité
→ Validation Sécurité
→ Publication
```

---

## 86. API principales

Exemples :

```http
GET    /referrals/programs
GET    /referrals/me
GET    /referrals/me/code
POST   /referrals/me/code/regenerate
GET    /referrals/me/link
GET    /referrals/me/qr
GET    /referrals/me/invitations
GET    /referrals/me/rewards
POST   /referrals/apply-code
POST   /referrals/invitations
GET    /referrals/status/{referralId}

POST   /internal/referrals/events
POST   /internal/referrals/qualify
POST   /internal/referrals/reward
POST   /internal/referrals/reverse

POST   /admin/referral-programs
PATCH  /admin/referral-programs/{programId}
POST   /admin/referral-campaigns
POST   /admin/referral-campaigns/{campaignId}/approve
POST   /admin/referral-campaigns/{campaignId}/activate
POST   /admin/referral-campaigns/{campaignId}/pause
POST   /admin/referral-campaigns/{campaignId}/close
GET    /admin/referral-analytics
```

---

## 87. Webhooks

Événements possibles :

```text
referral.invitation.created
referral.link.opened
referral.user.registered
referral.attributed
referral.requirement.completed
referral.qualified
referral.review.started
referral.approved
referral.rejected
referral.reward.pending
referral.reward.issued
referral.reward.reversed
referral.fraud.suspected
referral.campaign.started
referral.campaign.paused
referral.campaign.completed
referral.budget.threshold_reached
```

---

## 88. Modèles principaux

- ReferralProgram
- ReferralProgramVersion
- ReferralCampaign
- ReferralCampaignBudget
- ReferralCode
- ReferralLink
- ReferralQrCode
- ReferralInvitation
- ReferralAttribution
- ReferralParticipant
- ReferralRequirement
- ReferralEvent
- ReferralQualification
- ReferralRewardRule
- ReferralReward
- ReferralRewardLedgerReference
- ReferralTier
- ReferralChallenge
- ReferralTeam
- ReferralAffiliate
- ReferralPartnerContract
- ReferralRiskAssessment
- ReferralReview
- ReferralDispute
- ReferralAudit
- ReferralAnalytics

---

## 89. Rôles

Exemples :

```text
REFERRAL_SUPER_ADMIN
REFERRAL_PROGRAM_MANAGER
REFERRAL_CAMPAIGN_MANAGER
REFERRAL_FINANCE_MANAGER
REFERRAL_COMPLIANCE_MANAGER
REFERRAL_FRAUD_ANALYST
REFERRAL_SUPPORT_OPERATOR
REFERRAL_PARTNER_MANAGER
AFFILIATE
AMBASSADOR
AGENT
MERCHANT_OWNER
AUDITOR
VIEWER
```

---

## 90. Permissions

Exemples :

```text
referral.read.self
referral.invite
referral.code.manage.self
referral.reward.read.self
referral.program.read
referral.program.manage
referral.campaign.create
referral.campaign.approve
referral.campaign.activate
referral.campaign.pause
referral.budget.read
referral.budget.manage
referral.reward.issue
referral.reward.reverse
referral.risk.read
referral.review.manage
referral.dispute.manage
referral.analytics.read
referral.audit.read
```

---

## 91. Feature Flags

Exemples :

- parrainage Client ;
- parrainage Commerce ;
- parrainage Agent ;
- affiliation ;
- QR ;
- code personnalisé ;
- récompense double ;
- paliers ;
- challenges ;
- classement ;
- récompense financière ;
- récompense en points ;
- récompense IA ;
- réduction abonnement ;
- multi-niveaux limité ;
- campagne institutionnelle ;
- Jini ;
- partage social.

---

## 92. Reporting

Rapports possibles :

- invitations ;
- ouvertures de liens ;
- inscriptions ;
- attributions ;
- KYC validés ;
- filleuls qualifiés ;
- récompenses ;
- récompenses en attente ;
- récompenses annulées ;
- coût ;
- budget ;
- fraude ;
- campagnes ;
- parrains ;
- Agents ;
- commerces ;
- affiliés ;
- pays ;
- villes ;
- canaux ;
- rétention ;
- volume généré.

---

## 93. Indicateurs

Exemples :

- taux clic vers inscription ;
- taux inscription vers KYC ;
- taux qualification ;
- coût d’acquisition ;
- coût par filleul actif ;
- délai moyen de qualification ;
- taux de fraude ;
- taux de rejet ;
- valeur générée ;
- volume ;
- rétention à 30 jours ;
- récompense moyenne ;
- budget consommé ;
- rentabilité par campagne ;
- performance par parrain.

---

## 94. Facturation partenaire

Pour l’affiliation, le système peut générer :

- relevé ;
- facture ;
- commission ;
- période ;
- devise ;
- taxes ;
- retenues ;
- statut de paiement ;
- justificatifs ;
- export.

---

## 95. Fiscalité

Le système doit permettre de configurer :

- nature de la récompense ;
- seuil déclaratif ;
- retenue ;
- facture ;
- TVA éventuelle ;
- pays ;
- type d’acteur ;
- document fiscal ;
- reporting.

La configuration exacte dépendra du pays et des partenaires.

---

## 96. Tests fonctionnels

- création de programme ;
- création de campagne ;
- code ;
- lien ;
- QR ;
- invitation ;
- inscription ;
- attribution ;
- condition ;
- qualification ;
- délai ;
- récompense ;
- Ledger ;
- plafond ;
- palier ;
- challenge ;
- classement ;
- expiration ;
- annulation ;
- reprise ;
- contestation ;
- rapport.

---

## 97. Tests de sécurité

- code usurpé ;
- accès inter-utilisateur ;
- changement de parrain ;
- récompense forcée ;
- modification de budget ;
- double paiement ;
- double attribution ;
- injection ;
- permission ;
- fraude Agent ;
- campagne non approuvée ;
- lien falsifié ;
- secret ;
- export ;
- audit.

---

## 98. Tests anti-fraude

- auto-parrainage ;
- même appareil ;
- même identité ;
- faux comptes ;
- émulateur ;
- paiements circulaires ;
- remboursement ;
- volume artificiel ;
- ferme de comptes ;
- Agent complice ;
- commerçant complice ;
- code compromis ;
- multi-niveaux abusif.

---

## 99. Tests de performance

- millions de codes ;
- campagnes massives ;
- événements simultanés ;
- qualification ;
- calcul de paliers ;
- classements ;
- attribution ;
- reporting ;
- anti-fraude ;
- versements en lot ;
- Webhooks.

---

## 100. Tests de résilience

- événement dupliqué ;
- Ledger indisponible ;
- budget épuisé ;
- service fraude indisponible ;
- campagne interrompue ;
- réseau coupé ;
- Webhook échoué ;
- qualification retardée ;
- paiement échoué ;
- reprise ;
- timeout ;
- partenaire indisponible.

---

## 101. Règles métier

1. Un filleul ne peut être récompensé plusieurs fois pour le même programme sans règle explicite.
2. Un utilisateur ne peut pas se parrainer lui-même.
3. Une récompense financière doit passer par le Ledger.
4. Le solde ne doit jamais être modifié directement.
5. Une inscription seule ne déclenche pas nécessairement une récompense.
6. Les conditions doivent être versionnées.
7. Les événements qualifiants doivent être idempotents.
8. Une opération remboursée peut invalider la qualification.
9. Les budgets doivent être contrôlés avant versement.
10. Une campagne sans budget ne doit plus promettre de nouvelle récompense.
11. Les plafonds doivent être appliqués.
12. Les récompenses en attente ne sont pas disponibles.
13. Les données du filleul doivent être minimisées.
14. Le parrain ne doit pas accéder au KYC du filleul.
15. Les modifications d’attribution doivent être auditées.
16. Les récompenses reprises doivent utiliser une nouvelle écriture.
17. Les fournisseurs et partenaires doivent être interchangeables.
18. Les campagnes publiques doivent être approuvées.
19. Les programmes institutionnels doivent respecter les règles de conformité.
20. Le multi-niveaux doit être limité et contrôlé.
21. Les comptes liés doivent être analysés.
22. Les paiements circulaires doivent être détectés.
23. Les récompenses non retirables doivent être distinctes de l’argent.
24. L’expiration doit être communiquée.
25. Les règles fiscales doivent être configurables.
26. Les classements ne doivent pas exposer de données sensibles.
27. Les codes compromis doivent pouvoir être révoqués.
28. Les utilisateurs suspendus ne doivent pas recevoir de nouvelles récompenses.
29. Les audits financiers doivent être immuables.
30. Chaque pays doit pouvoir désactiver le programme.

---

## 102. Ordre de développement recommandé

```text
P1-REF-01 — Modèles Programme, Campagne et Attribution
P1-REF-02 — Codes, liens, QR et partage
P1-REF-03 — Événements et conditions de qualification
P1-REF-04 — Récompenses et intégration Ledger
P1-REF-05 — Budgets, plafonds et paliers
P1-REF-06 — Tableaux Client, Commerce, Agent et Partenaire
P1-REF-07 — Campagnes, affiliation et équipes
P1-REF-08 — Anti-fraude et revue manuelle
P1-REF-09 — Litiges, support et reprise de récompense
P1-REF-10 — Administration, fiscalité et reporting
P1-REF-11 — Jini, partage social et Studio IA
P1-REF-12 — Tests de bout en bout
```

---

## 103. Critères d’acceptation finaux

Le Programme de Parrainage Mansa est validé lorsque :

- un programme peut être créé ;
- ses règles sont versionnées ;
- une campagne peut être créée ;
- elle peut être approuvée ;
- elle peut être activée ;
- elle peut être suspendue ;
- elle peut être clôturée ;
- un code unique peut être généré ;
- un code personnalisé peut être contrôlé ;
- un lien peut être généré ;
- un QR peut être généré ;
- une invitation peut être partagée ;
- une page d’invitation est disponible ;
- l’inscription peut attribuer un parrain ;
- la fenêtre d’attribution fonctionne ;
- les conflits d’attribution sont gérés ;
- le changement de parrain est limité ;
- les conditions du parrain sont vérifiées ;
- les conditions du filleul sont vérifiées ;
- les événements qualifiants sont enregistrés ;
- les événements sont idempotents ;
- plusieurs conditions peuvent être combinées ;
- un délai de validation peut être appliqué ;
- les statuts sont disponibles ;
- une récompense du parrain peut être calculée ;
- une récompense du filleul peut être calculée ;
- une récompense double est possible ;
- les récompenses financières passent par le Ledger ;
- les récompenses non financières sont gérées ;
- la source de financement est identifiée ;
- les budgets sont configurables ;
- les budgets sont contrôlés ;
- les réservations budgétaires fonctionnent ;
- les plafonds fonctionnent ;
- les paliers fonctionnent ;
- les challenges fonctionnent ;
- les badges fonctionnent ;
- les classements protègent les données ;
- les récompenses peuvent expirer ;
- une récompense peut être annulée ;
- une récompense peut être reprise avec une nouvelle écriture ;
- les récompenses non retirables sont distinguées ;
- le tableau du parrain est disponible ;
- le tableau Commerce est disponible ;
- le tableau Agent est disponible ;
- le tableau partenaire est disponible ;
- les notifications sont envoyées ;
- la confidentialité du filleul est respectée ;
- le partage social est disponible ;
- Jini peut expliquer les conditions ;
- Jini ne peut pas verser seul une récompense ;
- l’auto-parrainage est détecté ;
- les comptes liés sont analysés ;
- les paiements circulaires sont détectés ;
- les faux comptes sont détectés ;
- les cas suspects sont mis en revue ;
- les codes compromis peuvent être suspendus ;
- l’anti-spam est appliqué ;
- les conditions sont visibles ;
- les réclamations sont gérées ;
- les preuves sont conservées ;
- les permissions sont appliquées ;
- les campagnes importantes nécessitent plusieurs validations ;
- le multi-pays est pris en charge ;
- le multi-devises est pris en charge ;
- les règles fiscales sont configurables ;
- les API sont disponibles ;
- les Webhooks sont disponibles ;
- les feature flags sont disponibles ;
- les rapports sont disponibles ;
- les indicateurs sont calculés ;
- les tests fonctionnels réussissent ;
- les tests de sécurité réussissent ;
- les tests anti-fraude réussissent ;
- les tests de performance réussissent ;
- les tests de résilience réussissent ;
- les audits critiques sont immuables.
