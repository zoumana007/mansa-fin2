# Fondations visuelles du design system Mansa

## 1. Objectif

Ce document définit les règles visuelles communes à toutes les interfaces Mansa :

- site web ;
- application client ;
- application commerçant ;
- application TPE ;
- application Admin Lite ;
- portail administrateur ;
- annuaire ;
- interfaces partenaires ;
- outils internes.

Ces règles doivent permettre à toutes les équipes et à toutes les intelligences artificielles travaillant sur le projet de produire des interfaces cohérentes.

## 2. Principes visuels

L’identité visuelle Mansa doit être :

- premium ;
- moderne ;
- technologique ;
- rassurante ;
- accessible ;
- africaine sans être folklorique ;
- sobre sur les opérations financières ;
- plus expressive sur le site vitrine.

L’interface doit toujours privilégier :

1. la lisibilité ;
2. la compréhension ;
3. la sécurité ;
4. la rapidité ;
5. l’esthétique.

L’esthétique ne doit jamais rendre une opération financière moins claire.

## 3. Palette principale

### Bleu nuit Mansa

Couleur principale des fonds sombres.

Utilisations :

- arrière-plans ;
- navigation ;
- écrans de sécurité ;
- cartes premium ;
- sections du site web ;
- interfaces administratives sombres.

Valeur de référence :

```text
#07111F
```

Variantes :

```text
#050914
#0A1525
#101B2D
#162238
```

### Cyan technologique

Couleur principale d’accent.

Utilisations :

- actions principales ;
- éléments actifs ;
- liens ;
- graphiques ;
- reflets ;
- animations ;
- technologie NFC ;
- éléments interactifs.

Valeur de référence :

```text
#4DE8FF
```

Variantes :

```text
#22D3EE
#67E8F9
#A5F3FC
```

### Bleu électrique

Utilisé pour les actions importantes et la continuité visuelle.

Valeur de référence :

```text
#4F7CFF
```

Utilisations :

- boutons ;
- liens ;
- graphiques ;
- sélection ;
- navigation active ;
- illustrations technologiques.

### Violet premium

Utilisé pour :

- Jini ;
- intelligence artificielle ;
- automatisation ;
- fonctionnalités premium ;
- innovations ;
- gradients avancés.

Valeur de référence :

```text
#8B5CF6
```

Variantes :

```text
#7C3AED
#A78BFA
#C4B5FD
```

### Vert de validation

Utilisé pour :

- paiement réussi ;
- vérification ;
- statut actif ;
- solde positif ;
- sécurité validée ;
- connexion réussie.

Valeur de référence :

```text
#33D17A
```

Variantes :

```text
#22C55E
#4CF0A7
#86EFAC
```

## 4. Couleurs fonctionnelles

### Succès

```text
#22C55E
```

### Avertissement

```text
#F59E0B
```

### Erreur

```text
#EF4444
```

### Information

```text
#3B82F6
```

### En attente

```text
#F97316
```

### Désactivé

```text
#64748B
```

Chaque statut doit être accompagné de :

- texte ;
- icône ;
- libellé ;
- forme ou badge.

La couleur seule ne suffit jamais.

## 5. Couleurs de fond

### Mode sombre

Fond principal :

```text
#050914
```

Fond secondaire :

```text
#07111F
```

Surface standard :

```text
#0E1828
```

Surface surélevée :

```text
#142033
```

Surface transparente :

```text
rgba(255, 255, 255, 0.06)
```

### Mode clair

Fond principal :

```text
#F7F9FC
```

Fond secondaire :

```text
#FFFFFF
```

Surface standard :

```text
#FFFFFF
```

Surface surélevée :

```text
#F1F5F9
```

Surface transparente :

```text
rgba(255, 255, 255, 0.72)
```

## 6. Couleurs de texte

### Mode sombre

Texte principal :

```text
#F8FAFC
```

Texte secondaire :

```text
#CBD5E1
```

Texte discret :

```text
#94A3B8
```

Texte désactivé :

```text
#64748B
```

### Mode clair

Texte principal :

```text
#0F172A
```

Texte secondaire :

```text
#334155
```

Texte discret :

```text
#64748B
```

Texte désactivé :

```text
#94A3B8
```

## 7. Dégradés officiels

### Dégradé principal

```text
cyan → bleu électrique → violet
```

Exemple :

```css
linear-gradient(
  90deg,
  #4DE8FF 0%,
  #4F7CFF 50%,
  #8B5CF6 100%
)
```

### Dégradé succès

```css
linear-gradient(
  135deg,
  #22C55E 0%,
  #4DE8FF 100%
)
```

### Dégradé Jini

```css
linear-gradient(
  135deg,
  #8B5CF6 0%,
  #4F7CFF 50%,
  #4DE8FF 100%
)
```

### Dégradé carte bancaire

```css
linear-gradient(
  135deg,
  #0F766E 0%,
  #2563EB 55%,
  #7C3AED 100%
)
```

Les dégradés ne doivent pas être utilisés sur tous les composants.

Ils doivent être réservés aux :

- boutons principaux ;
- cartes premium ;
- animations ;
- états réussis ;
- sections marketing ;
- éléments de marque.

## 8. Typographie

### Police principale

Le système doit utiliser une police sans serif moderne, lisible et compatible avec de nombreuses langues.

Choix recommandé :

```text
Inter
```

Alternatives possibles :

```text
SF Pro
Roboto
Manrope
Plus Jakarta Sans
```

Sur iOS, la police système peut être utilisée.

Sur Android, Roboto ou une police harmonisée avec le design system peut être utilisée.

## 9. Hiérarchie typographique

### Très grand titre marketing

Taille web :

```text
64 à 96 px
```

Poids :

```text
700 à 900
```

Utilisé uniquement sur le site vitrine.

### Titre principal d’écran

Taille :

```text
28 à 40 px
```

Poids :

```text
700 à 800
```

### Titre de section

Taille :

```text
22 à 28 px
```

Poids :

```text
650 à 750
```

### Titre de carte

Taille :

```text
16 à 20 px
```

Poids :

```text
600 à 700
```

### Texte courant

Taille :

```text
15 à 17 px
```

Poids :

```text
400 à 500
```

### Texte secondaire

Taille :

```text
13 à 15 px
```

Poids :

```text
400 à 500
```

### Petit texte

Taille :

```text
11 à 13 px
```

Utilisations :

- métadonnées ;
- date ;
- heure ;
- référence ;
- information secondaire.

## 10. Typographie financière

Les montants doivent être très lisibles.

Règles :

- utiliser des chiffres tabulaires lorsque possible ;
- aligner les décimales ;
- ne pas casser un montant sur deux lignes ;
- conserver la devise visible ;
- utiliser un poids fort pour les soldes ;
- utiliser une taille plus grande pour les montants importants ;
- éviter les polices décoratives ;
- masquer les montants sensibles lorsque demandé.

Exemple :

```text
842 500 F CFA
```

et non :

```text
842500FCFA
```

## 11. Icônes

Les icônes doivent être simples et cohérentes.

Bibliothèques recommandées :

- Lucide ;
- Phosphor ;
- Material Symbols ;
- SF Symbols sur iOS.

Le projet ne doit pas mélanger plusieurs styles d’icônes sur le même écran.

Les icônes doivent respecter :

- même épaisseur de trait ;
- même style ;
- mêmes proportions ;
- tailles cohérentes ;
- alignement régulier.

## 12. Tailles d’icônes

Petite icône :

```text
16 px
```

Icône standard :

```text
20 à 24 px
```

Icône importante :

```text
28 à 32 px
```

Icône illustrative :

```text
40 à 64 px
```

Les icônes cliquables doivent avoir une zone tactile d’au moins :

```text
44 × 44 px
```

## 13. Espacements

Le système d’espacement repose sur une base de 4 px.

Échelle officielle :

```text
4 px
8 px
12 px
16 px
20 px
24 px
32 px
40 px
48 px
64 px
80 px
96 px
```

Les valeurs non prévues doivent rester exceptionnelles.

## 14. Espacement des composants

### Boutons

Espacement horizontal interne :

```text
16 à 24 px
```

Espacement vertical interne :

```text
12 à 16 px
```

### Cartes

Espacement interne mobile :

```text
16 à 20 px
```

Espacement interne web :

```text
20 à 32 px
```

### Écrans mobiles

Marges latérales principales :

```text
16 à 20 px
```

### Portails web

Marges de contenu :

```text
24 à 48 px
```

### Site vitrine

Marges horizontales :

```text
5 à 8 % de la largeur
```

avec une largeur maximale du contenu.

## 15. Grille mobile

La grille mobile doit utiliser :

- une colonne principale ;
- des cartes empilées ;
- des zones tactiles larges ;
- des marges constantes ;
- des éléments importants accessibles au pouce.

Largeurs de référence :

```text
320 px
360 px
390 px
430 px
```

L’interface doit rester utilisable sur les petits écrans Android.

## 16. Grille tablette

La tablette peut utiliser :

- deux colonnes ;
- panneaux latéraux ;
- vues maîtres-détails ;
- graphiques élargis ;
- navigation adaptée.

La tablette TPE doit privilégier :

- gros boutons ;
- lecture rapide ;
- peu de texte ;
- navigation stable ;
- états réseau visibles.

## 17. Grille web

Le site et les portails doivent utiliser une grille de :

```text
12 colonnes
```

Largeur maximale recommandée :

```text
1200 à 1440 px
```

Points de rupture suggérés :

```text
mobile : moins de 640 px
tablette : 640 à 1024 px
desktop : 1024 à 1440 px
large : plus de 1440 px
```

## 18. Rayons de bordure

Échelle recommandée :

```text
8 px
12 px
16 px
20 px
24 px
28 px
32 px
999 px
```

Utilisation :

- 8 à 12 px : petits composants ;
- 14 à 18 px : boutons et champs ;
- 18 à 24 px : cartes ;
- 24 à 32 px : modales et grands panneaux ;
- 999 px : badges, avatars et boutons pilules.

## 19. Bordures

Les bordures doivent rester fines.

Épaisseur standard :

```text
1 px
```

Épaisseur renforcée :

```text
2 px
```

Les bordures transparentes peuvent utiliser :

```text
rgba(255, 255, 255, 0.10)
```

ou en mode clair :

```text
rgba(15, 23, 42, 0.10)
```

## 20. Ombres

Les ombres doivent créer de la profondeur sans donner un effet lourd.

### Ombre légère

Utilisée pour :

- petits panneaux ;
- cartes simples ;
- menus.

### Ombre moyenne

Utilisée pour :

- cartes interactives ;
- modales ;
- éléments flottants.

### Ombre forte

Réservée aux :

- objets 3D ;
- cartes bancaires ;
- téléphones de présentation ;
- scènes marketing.

Les ombres fortes doivent être rares dans les applications.

## 21. Effet Liquid Glass

Une surface Liquid Glass doit comporter :

- fond transparent ;
- flou ;
- bordure lumineuse ;
- légère ombre ;
- contraste suffisant ;
- lumière réactive ;
- version simplifiée si les performances sont faibles.

Exemple web :

```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.12);
box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
```

## 22. Utilisation du verre

Le verre peut être utilisé sur :

- navigation ;
- menus ;
- panneaux flottants ;
- notifications ;
- cartes marketing ;
- modales ;
- filtres.

Il doit être évité sur :

- longs formulaires ;
- tableaux très denses ;
- textes longs ;
- documents ;
- écrans critiques de sécurité ;
- zones où le contraste devient insuffisant.

## 23. Images et illustrations

Les illustrations Mansa doivent être :

- modernes ;
- sobres ;
- compréhensibles ;
- culturellement adaptées ;
- cohérentes avec la marque ;
- utilisables en mode sombre et clair.

Les illustrations doivent éviter :

- les clichés africains ;
- les personnages artificiels génériques ;
- les symboles trop abstraits ;
- les images trop chargées ;
- les photos ne correspondant pas aux utilisateurs réels.

## 24. Photographies

Les photographies doivent montrer :

- des utilisateurs réels ;
- des commerçants ;
- des étudiants ;
- des familles ;
- des entreprises ;
- des agents ;
- des contextes africains modernes ;
- des usages concrets de la technologie.

Les photos doivent être naturelles et crédibles.

## 25. Mode clair et mode sombre

Les deux modes doivent être prévus dès la conception.

Le mode sombre ne doit pas simplement inverser les couleurs.

Chaque mode doit avoir :

- sa propre hiérarchie ;
- ses propres surfaces ;
- ses propres ombres ;
- ses propres contrastes ;
- ses propres niveaux de transparence.

L’utilisateur doit pouvoir choisir :

- clair ;
- sombre ;
- système.

## 26. Accessibilité visuelle

Le système doit respecter :

- contraste suffisant ;
- taille de texte lisible ;
- zoom ;
- taille de police dynamique ;
- focus visible ;
- zones tactiles larges ;
- réduction des mouvements ;
- texte alternatif ;
- informations non dépendantes de la couleur.

## 27. Règles responsive

Chaque composant doit fonctionner sur :

- petit smartphone ;
- grand smartphone ;
- tablette ;
- TPE ;
- ordinateur portable ;
- écran desktop ;
- grand écran administratif.

Aucun écran ne doit être conçu uniquement pour une taille précise.

## 28. Tokens de design

Les valeurs du design system doivent être enregistrées sous forme de tokens.

Catégories :

- couleurs ;
- typographie ;
- espacements ;
- rayons ;
- ombres ;
- bordures ;
- durées d’animation ;
- niveaux de profondeur ;
- tailles d’icônes ;
- points de rupture.

Exemple :

```json
{
  "color": {
    "brand": {
      "primary": "#4DE8FF",
      "secondary": "#4F7CFF",
      "premium": "#8B5CF6"
    },
    "status": {
      "success": "#22C55E",
      "warning": "#F59E0B",
      "danger": "#EF4444"
    }
  }
}
```

## 29. Cohérence interplateforme

Le design doit rester reconnaissable partout.

Toutefois :

- iOS doit respecter les habitudes iOS ;
- Android doit respecter les habitudes Android ;
- le TPE doit privilégier la rapidité ;
- le web doit privilégier la richesse visuelle ;
- l’administration doit privilégier la densité et le contrôle.

La cohérence ne signifie pas copier exactement la même interface sur toutes les plateformes.

## 30. Règle finale

Chaque écran Mansa doit pouvoir être identifié comme appartenant à la même marque, même sans afficher le logo.

La couleur, la typographie, les espacements, les animations, les cartes et les composants doivent former une identité visuelle stable et reconnaissable.
