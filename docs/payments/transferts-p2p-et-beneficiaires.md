# Cahier des charges — Transferts P2P, bénéficiaires et virements internes

## 1. Objectif

Définir le fonctionnement complet des transferts d’argent domestiques et internes à l’écosystème Mansa entre particuliers, professionnels, commerçants et comptes autorisés, sans couvrir ici les transferts internationaux et le change déjà traités dans un module séparé.

Le module doit offrir une expérience de transfert rapide, traçable et sûre, adaptée au contexte malien et africain, avec prise en charge des réseaux intermittents, des utilisateurs peu technophiles et des contrôles renforcés contre les erreurs, fraudes et détournements.

## 2. Périmètre

Le module couvre :

- transfert Mansa vers Mansa ;
- transfert vers numéro de téléphone vérifié ;
- transfert vers identifiant Mansa ;
- transfert vers QR personnel ou professionnel ;
- transfert entre comptes d’un même utilisateur ;
- transfert vers compte commerçant ;
- transfert vers compte entreprise ou organisation ;
- bénéficiaires enregistrés ;
- transferts ponctuels ;
- transferts planifiés ;
- transferts récurrents ;
- demandes d’argent ;
- partage de paiement ou de dépense ;
- ajout de motif, référence ou note ;
- reçu numérique ;
- annulation lorsque techniquement et juridiquement possible ;
- gestion des erreurs de destinataire et litiges associés.

Les transferts bancaires externes, internationaux et de change restent gérés par leurs modules dédiés mais doivent pouvoir utiliser les mêmes contrats de transaction et de notification.

## 3. Acteurs

- client particulier ;
- client professionnel ;
- commerçant ;
- entreprise ;
- agent Mansa lorsque le produit le permet ;
- administrateur support ;
- équipe conformité ;
- moteur fraude / Risk Engine ;
- service Ledger ;
- service Notifications ;
- service KYC/KYB ;
- partenaires bancaires ou Mobile Money via adaptateurs lorsque nécessaire.

## 4. Parcours de transfert standard

Le parcours principal doit rester court :

1. l’utilisateur choisit « Envoyer de l’argent » ;
2. il sélectionne ou saisit le bénéficiaire ;
3. Mansa résout l’identité publique du destinataire sans exposer de données excessives ;
4. l’utilisateur saisit le montant ;
5. il ajoute éventuellement un motif ;
6. l’application affiche un écran récapitulatif avec destinataire, montant, frais éventuels et montant total débité ;
7. l’utilisateur confirme selon le niveau de risque et les règles d’authentification ;
8. le transfert est autorisé, comptabilisé dans le Ledger et confirmé ;
9. l’émetteur et le destinataire reçoivent une notification et un reçu.

L’interface ne doit jamais masquer les frais. Un transfert gratuit doit afficher explicitement 0 FCFA de frais.

## 5. Résolution du bénéficiaire

Avant la confirmation finale, le système doit afficher une identité publique suffisante pour réduire les erreurs, par exemple :

- prénom et nom partiellement masqué selon le contexte ;
- nom commercial pour un professionnel ;
- avatar ou logo lorsque disponible ;
- identifiant Mansa public ;
- indicateur « compte vérifié » lorsque applicable.

Le numéro de téléphone complet, l’adresse, les documents KYC et autres informations privées ne doivent jamais être exposés inutilement.

## 6. Gestion des bénéficiaires

L’utilisateur doit pouvoir :

- enregistrer un bénéficiaire après un premier transfert ou manuellement ;
- attribuer un surnom ;
- marquer des bénéficiaires favoris ;
- supprimer ou masquer un bénéficiaire ;
- voir la date du dernier transfert ;
- voir les moyens de transfert disponibles ;
- bloquer un bénéficiaire ;
- signaler un bénéficiaire suspect.

Une modification sensible d’un bénéficiaire bancaire ou externe doit pouvoir déclencher un délai de sécurité configurable.

## 7. Transferts planifiés et récurrents

Le système doit permettre de planifier :

- un transfert unique à une date donnée ;
- un transfert hebdomadaire ;
- un transfert mensuel ;
- une fréquence personnalisée autorisée ;
- une date de fin ;
- un nombre maximal d’occurrences ;
- un montant fixe ;
- éventuellement un montant variable selon un contrat futur.

Avant chaque exécution, Mansa vérifie :

- solde disponible ;
- plafonds ;
- statut du compte ;
- statut du bénéficiaire ;
- règles KYC/KYB ;
- règles de fraude ;
- éventuelles sanctions ou restrictions.

En cas d’échec, le transfert ne doit jamais être débité partiellement. L’utilisateur reçoit une notification claire et le système applique la politique de nouvelle tentative configurée.

## 8. Demandes d’argent

Un utilisateur autorisé peut envoyer une demande de paiement à un autre utilisateur avec :

- montant ;
- motif ;
- date d’expiration ;
- référence ;
- lien ou QR de paiement.

Le destinataire peut accepter, refuser ou ignorer la demande.

Une demande d’argent n’est jamais un débit automatique et ne doit jamais permettre au demandeur de prélever des fonds sans autorisation explicite ou mandat distinct.

## 9. Partage de dépenses

Le module doit permettre de :

- diviser un montant entre plusieurs personnes ;
- répartir à parts égales ;
- saisir des montants personnalisés ;
- suivre qui a payé ;
- relancer les participants de manière limitée ;
- clôturer ou annuler le partage.

Les relances doivent respecter les préférences de notification et éviter le spam.

## 10. Frais et tarification

Les frais sont entièrement configurables par pays, produit, canal, segment client, montant ou partenaire.

Le moteur tarifaire doit prendre en charge :

- frais fixes ;
- frais en pourcentage ;
- minimum ;
- maximum ;
- gratuité ;
- promotions temporaires ;
- quotas gratuits ;
- frais supportés par l’émetteur ;
- frais supportés par le destinataire lorsque juridiquement autorisé ;
- partage de revenus avec partenaires.

Chaque règle tarifaire doit être versionnée, datée et auditable.

## 11. Plafonds et conformité

Les plafonds doivent dépendre au minimum de :

- niveau KYC ;
- type de compte ;
- ancienneté ;
- pays ;
- canal ;
- risque ;
- montant unitaire ;
- cumul journalier ;
- cumul hebdomadaire ;
- cumul mensuel.

Le module doit appliquer les règles de conformité et pouvoir mettre un transfert en attente de revue sans modifier silencieusement son statut.

## 12. Sécurité et confirmation

Le niveau de confirmation doit être proportionné au risque.

Selon le contexte, Mansa peut demander :

- PIN ;
- biométrie locale ;
- authentification renforcée ;
- validation d’un nouvel appareil ;
- délai de sécurité ;
- confirmation supplémentaire pour montant élevé ou nouveau bénéficiaire.

Le système doit éviter d’imposer des frictions excessives sur les opérations habituelles à faible risque.

Aucune donnée biométrique brute ne doit être envoyée au backend lorsque la biométrie du téléphone peut être utilisée localement.

## 13. Idempotence et double débit

Chaque ordre de transfert doit comporter une clé d’idempotence unique.

En cas de double clic, réseau instable, reprise après timeout ou répétition d’une requête, le backend doit retourner le résultat de l’opération d’origine et ne jamais créer un second débit involontaire.

## 14. États d’un transfert

États minimum :

- draft ;
- pending_confirmation ;
- pending ;
- processing ;
- completed ;
- failed ;
- rejected ;
- cancelled ;
- reversed ;
- disputed ;
- under_review.

Chaque transition doit être validée côté serveur et enregistrée dans l’audit.

## 15. Ledger et comptabilisation

Le Ledger constitue la source de vérité financière.

Un transfert Mansa vers Mansa doit produire des écritures équilibrées et atomiques. Aucun solde ne doit être modifié directement en dehors du Ledger.

Le module doit distinguer :

- solde comptable ;
- solde disponible ;
- montants réservés ;
- frais ;
- commissions ;
- taxes éventuelles ;
- reversals.

Toute opération doit être réconciliable par identifiant de transaction.

## 16. Mode réseau dégradé

Un transfert financier ne doit pas être considéré comme réussi uniquement parce que l’application cliente n’a plus de réseau.

En cas de perte de connexion :

- l’application conserve l’identifiant de requête ;
- elle affiche un état « vérification en cours » si le résultat est inconnu ;
- elle interroge ensuite le backend avec la même clé d’idempotence ;
- elle évite toute nouvelle tentative créant un débit distinct.

Les transferts totalement hors ligne avec valeur monétaire ne doivent être activés que dans un produit spécifique avec mécanisme cryptographique, plafonds et risque explicitement validés.

## 17. Erreur de destinataire

Le produit doit réduire ce risque avec :

- affichage clair du bénéficiaire avant confirmation ;
- favoris ;
- détection d’un nouveau bénéficiaire ;
- avertissement si le nom attendu diffère ;
- validation renforcée pour certains montants.

Une fois un transfert définitivement exécuté, l’utilisateur ne doit pas recevoir la fausse promesse d’une annulation automatique si les fonds ont déjà été crédités.

Le support peut ouvrir une procédure de récupération ou de médiation selon les règles applicables.

## 18. Reversal, annulation et remboursement

Le système distingue :

- annulation avant exécution ;
- expiration ;
- rejet ;
- reversal technique ;
- remboursement volontaire ;
- remboursement administratif autorisé.

Toute opération inverse doit référencer la transaction originale et créer de nouvelles écritures Ledger plutôt que supprimer l’historique.

## 19. Fraude et contrôles

Le Risk Engine peut évaluer :

- vélocité des transferts ;
- nouveau bénéficiaire ;
- appareil inhabituel ;
- géographie incohérente ;
- montant inhabituel ;
- compte récemment créé ;
- transferts circulaires ;
- fractionnement de montants ;
- concentration vers un même bénéficiaire ;
- comportement lié à des comptes déjà signalés.

Les décisions possibles incluent : autoriser, demander une confirmation supplémentaire, ralentir, mettre en revue ou bloquer selon les règles autorisées.

## 20. Notifications et reçus

Chaque transfert terminé doit produire un reçu avec au minimum :

- identifiant de transaction ;
- date et heure ;
- émetteur ;
- destinataire ;
- montant ;
- frais ;
- montant total ;
- statut ;
- motif ou référence lorsque présent.

Les notifications peuvent être envoyées via push, SMS, e-mail ou canaux autorisés, selon le profil et la criticité.

## 21. API et contrats

Endpoints indicatifs :

- POST /transfers/quote
- POST /transfers
- GET /transfers/{id}
- POST /transfers/{id}/confirm
- POST /transfers/{id}/cancel
- POST /transfers/{id}/report
- GET /beneficiaries
- POST /beneficiaries
- PATCH /beneficiaries/{id}
- DELETE /beneficiaries/{id}
- POST /money-requests
- GET /money-requests/{id}
- POST /money-requests/{id}/accept
- POST /money-requests/{id}/decline
- POST /scheduled-transfers
- PATCH /scheduled-transfers/{id}
- DELETE /scheduled-transfers/{id}

Les contrats doivent être versionnés et partagés via le package commun de types/schemas Mansa.

## 22. Modèle de données indicatif

Entités principales :

- Transfer ;
- TransferParty ;
- Beneficiary ;
- MoneyRequest ;
- ScheduledTransfer ;
- SplitPayment ;
- SplitParticipant ;
- TransferFeeQuote ;
- TransferRiskDecision ;
- TransferReceipt.

Les données financières critiques doivent être normalisées et liées au Ledger plutôt que dupliquées comme source de vérité.

## 23. Administration et support

Le portail Admin doit permettre aux rôles habilités de :

- rechercher une transaction ;
- consulter son parcours complet ;
- voir les écritures Ledger associées ;
- consulter les décisions risque ;
- voir les notifications envoyées ;
- ouvrir un litige ;
- déclencher les actions autorisées ;
- exporter un rapport ;
- consulter l’audit.

Aucun administrateur ne doit pouvoir modifier rétroactivement le montant ou le bénéficiaire d’une transaction terminée.

## 24. Observabilité

Indicateurs minimum :

- volume et valeur des transferts ;
- taux de succès ;
- latence moyenne ;
- taux d’échec par cause ;
- taux de reversal ;
- nouveaux bénéficiaires ;
- transferts planifiés exécutés/échoués ;
- demandes d’argent ;
- taux de fraude bloquée ;
- faux positifs ;
- coûts par canal.

Les métriques techniques ne doivent pas contenir de données personnelles ou secrets.

## 25. Tests essentiels

Le module doit comporter des tests pour :

- transfert nominal ;
- solde insuffisant ;
- plafond dépassé ;
- bénéficiaire invalide ;
- double requête avec même idempotency key ;
- panne réseau après débit ;
- échec Ledger ;
- reversal ;
- frais ;
- transfert planifié ;
- demande d’argent ;
- règles de risque ;
- contrôle d’accès Admin ;
- concurrence sur le même solde.

## 26. Critères d’acceptation

Le module est considéré prêt lorsque :

- un utilisateur KYC éligible peut envoyer des fonds à un autre compte autorisé ;
- aucun double débit n’est possible lors d’une répétition de requête ;
- les écritures Ledger sont équilibrées ;
- les plafonds et frais sont appliqués côté serveur ;
- le bénéficiaire est clairement identifié avant confirmation ;
- les reçus sont générés ;
- les transferts planifiés sont exécutés de manière idempotente ;
- toutes les transitions sensibles sont auditées ;
- les équipes support peuvent tracer un transfert sans pouvoir falsifier son historique.

## 27. Dépendances

Ce module dépend notamment de :

- Authentification et identité ;
- KYC/KYB ;
- Wallets et Ledger ;
- Risk Engine ;
- Notifications ;
- Tarification ;
- Audit ;
- Analytics ;
- Support et litiges.

Il doit rester découplé des fournisseurs externes grâce à des interfaces et adaptateurs remplaçables.
