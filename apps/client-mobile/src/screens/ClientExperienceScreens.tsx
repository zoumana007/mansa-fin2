import { ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, radius, spacing, typography } from "../theme/tokens";

const quickActions = [
  { icon: "↗", label: "Envoyer" },
  { icon: "↙", label: "Recevoir" },
  { icon: "＋", label: "Recharger" },
  { icon: "▦", label: "Scanner" },
] as const;

const services = [
  { icon: "◉", title: "Paiement QR", subtitle: "Payer chez un commerçant" },
  { icon: "⌁", title: "Mobile Money", subtitle: "Orange, Wave et partenaires" },
  { icon: "▣", title: "Factures", subtitle: "Électricité, eau et services" },
  { icon: "♙", title: "Transferts", subtitle: "Envoyer localement et ailleurs" },
] as const;

function Screen({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

function Header({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <View style={styles.header}>
      <View>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text accessibilityRole="header" style={styles.title}>
          {title}
        </Text>
      </View>
      <Pressable accessibilityLabel="Ouvrir les notifications" style={styles.headerButton}>
        <Text style={styles.headerIcon}>⌁</Text>
        <View style={styles.notificationDot} />
      </Pressable>
    </View>
  );
}

function SectionTitle({ action, title }: { action?: string; title: string }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

export function HomeExperienceScreen() {
  return (
    <Screen>
      <Header eyebrow="BONJOUR" title="Bienvenue sur Mansa" />

      <View style={styles.balanceCard}>
        <View style={styles.balanceGlowOne} />
        <View style={styles.balanceGlowTwo} />
        <View style={styles.balanceTopRow}>
          <View>
            <Text style={styles.balanceLabel}>Solde principal</Text>
            <Text style={styles.balanceValue}>•••••• FCFA</Text>
          </View>
          <View style={styles.currencyPill}>
            <Text style={styles.currencyText}>XOF⌄</Text>
          </View>
        </View>
        <Text style={styles.balanceHint}>
          Connectez votre compte pour afficher les données réelles.
        </Text>
        <View style={styles.cardDivider} />
        <View style={styles.balanceFooter}>
          <Text style={styles.balanceFooterLabel}>Wallet Mansa</Text>
          <Text style={styles.balanceFooterValue}>Données sécurisées</Text>
        </View>
      </View>

      <View style={styles.quickGrid}>
        {quickActions.map((action) => (
          <Pressable key={action.label} style={styles.quickAction}>
            <View style={styles.quickIconWrap}>
              <Text style={styles.quickIcon}>{action.icon}</Text>
            </View>
            <Text style={styles.quickLabel}>{action.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.heroBanner}>
        <View style={styles.heroCopy}>
          <Text style={styles.heroBadge}>NOUVEAU</Text>
          <Text style={styles.heroTitle}>Tout Mansa, dans une seule application.</Text>
          <Text style={styles.heroText}>
            Paiements, cartes, commerces, réservations et services au même endroit.
          </Text>
          <Pressable style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Découvrir</Text>
          </Pressable>
        </View>
        <View style={styles.heroOrb}>
          <View style={styles.heroOrbInner}>
            <Text style={styles.heroOrbText}>M</Text>
          </View>
        </View>
      </View>

      <SectionTitle action="Tout voir" title="Services rapides" />
      <View style={styles.listCard}>
        {services.map((service, index) => (
          <Pressable
            key={service.title}
            style={[styles.serviceRow, index < services.length - 1 && styles.rowDivider]}
          >
            <View style={styles.serviceIcon}>
              <Text style={styles.serviceIconText}>{service.icon}</Text>
            </View>
            <View style={styles.serviceCopy}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>

      <SectionTitle action="Voir l’historique" title="Activité récente" />
      <View style={styles.emptyCard}>
        <View style={styles.emptyIcon}>
          <Text style={styles.emptyIconText}>↕</Text>
        </View>
        <Text style={styles.emptyTitle}>Aucune opération pour le moment</Text>
        <Text style={styles.emptyText}>
          Vos opérations confirmées apparaîtront ici dès que votre compte sera connecté.
        </Text>
      </View>
    </Screen>
  );
}

export function PaymentsExperienceScreen() {
  return (
    <Screen>
      <Header eyebrow="TRANSACTIONS" title="Paiements" />
      <View style={styles.primaryActionCard}>
        <Text style={styles.primaryActionIcon}>▦</Text>
        <Text style={styles.primaryActionTitle}>Scanner pour payer</Text>
        <Text style={styles.primaryActionText}>
          Scannez le QR Mansa d’un commerce pour lancer un paiement sécurisé.
        </Text>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Ouvrir le scanner</Text>
        </Pressable>
      </View>
      <SectionTitle title="Autres moyens" />
      <View style={styles.optionGrid}>
        {[
          ["↗", "Envoyer", "À un contact"],
          ["↙", "Recevoir", "Lien ou QR"],
          ["＋", "Recharger", "Wallet Mansa"],
          ["▣", "Factures", "Services publics"],
        ].map(([icon, title, subtitle]) => (
          <Pressable key={title} style={styles.optionCard}>
            <Text style={styles.optionIcon}>{icon}</Text>
            <Text style={styles.optionTitle}>{title}</Text>
            <Text style={styles.optionSubtitle}>{subtitle}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.infoStrip}>
        <Text style={styles.infoStripIcon}>✓</Text>
        <View style={styles.infoStripCopy}>
          <Text style={styles.infoStripTitle}>Paiements protégés</Text>
          <Text style={styles.infoStripText}>
            PIN, biométrie, contrôle d’appareil et confirmation claire avant toute opération.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

export function CardsExperienceScreen() {
  return (
    <Screen>
      <Header eyebrow="VOS MOYENS DE PAIEMENT" title="Cartes" />
      <View style={styles.mansaCard}>
        <View style={styles.cardTopLine}>
          <Text style={styles.cardBrand}>MANSA</Text>
          <Text style={styles.cardContactless}>)))</Text>
        </View>
        <View style={styles.chip}>
          <View style={styles.chipLine} />
          <View style={styles.chipLine} />
        </View>
        <Text style={styles.cardNumber}>••••  ••••  ••••  0000</Text>
        <View style={styles.cardBottomLine}>
          <View>
            <Text style={styles.cardMetaLabel}>TITULAIRE</Text>
            <Text style={styles.cardMetaValue}>VOTRE NOM</Text>
          </View>
          <View>
            <Text style={styles.cardMetaLabel}>EXPIRE</Text>
            <Text style={styles.cardMetaValue}>••/••</Text>
          </View>
          <Text style={styles.cardScheme}>VISA</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        {[
          ["❄", "Geler"],
          ["◉", "Afficher"],
          ["⚙", "Réglages"],
        ].map(([icon, label]) => (
          <Pressable key={label} style={styles.cardActionButton}>
            <Text style={styles.cardActionIcon}>{icon}</Text>
            <Text style={styles.cardActionLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.listCard}>
        {[
          ["Paiements en ligne", "À configurer"],
          ["Paiements sans contact", "À configurer"],
          ["Paiements internationaux", "À configurer"],
          ["Plafonds et limites", "Voir"],
        ].map(([title, status], index, array) => (
          <Pressable
            key={title}
            style={[styles.settingRow, index < array.length - 1 && styles.rowDivider]}
          >
            <Text style={styles.settingTitle}>{title}</Text>
            <View style={styles.settingRight}>
              <Text style={styles.settingStatus}>{status}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

export function HubExperienceScreen() {
  const categories = ["Restaurants", "Beauté", "Boutiques", "Services", "Hôtels", "Santé"];
  return (
    <Screen>
      <Header eyebrow="DÉCOUVRIR AUTOUR DE VOUS" title="Hub Mansa" />
      <Pressable style={styles.searchBar}>
        <Text style={styles.searchIcon}>⌕</Text>
        <Text style={styles.searchPlaceholder}>Rechercher un commerce ou un service</Text>
      </Pressable>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {categories.map((category) => (
          <Pressable key={category} style={styles.categoryPill}>
            <Text style={styles.categoryText}>{category}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.hubHero}>
        <Text style={styles.hubEyebrow}>MANSA HUB</Text>
        <Text style={styles.hubTitle}>Commandez, réservez et découvrez.</Text>
        <Text style={styles.hubText}>
          Les commerces vérifiés, leurs produits, leurs services et leurs disponibilités.
        </Text>
        <Pressable style={styles.hubButton}>
          <Text style={styles.hubButtonText}>Explorer le Hub</Text>
        </Pressable>
      </View>
      <SectionTitle action="Tout afficher" title="Près de vous" />
      <View style={styles.merchantGrid}>
        {["Commerce vérifié", "Restaurant partenaire"].map((name, index) => (
          <Pressable key={name} style={styles.merchantCard}>
            <View style={styles.merchantImage}>
              <Text style={styles.merchantImageText}>{index === 0 ? "M" : "R"}</Text>
            </View>
            <Text style={styles.merchantTitle}>{name}</Text>
            <Text style={styles.merchantMeta}>Disponible prochainement</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

export function ProfileExperienceScreen() {
  return (
    <Screen>
      <Header eyebrow="COMPTE" title="Profil" />
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>ZC</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>Compte Mansa</Text>
          <Text style={styles.profileMeta}>Complétez votre inscription</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>
      <View style={styles.verificationCard}>
        <View style={styles.verificationTop}>
          <Text style={styles.verificationTitle}>Vérification du compte</Text>
          <Text style={styles.verificationPercent}>0 %</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={styles.progressValue} />
        </View>
        <Text style={styles.verificationText}>
          Vérifiez votre identité pour accéder aux fonctionnalités financières réelles.
        </Text>
      </View>
      <View style={styles.listCard}>
        {[
          ["♙", "Informations personnelles"],
          ["◈", "Sécurité et appareils"],
          ["⌁", "Notifications"],
          ["◎", "Aide et assistance"],
          ["⚙", "Paramètres"],
        ].map(([icon, title], index, array) => (
          <Pressable
            key={title}
            style={[styles.profileRow, index < array.length - 1 && styles.rowDivider]}
          >
            <Text style={styles.profileRowIcon}>{icon}</Text>
            <Text style={styles.profileRowTitle}>{title}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.versionText}>Mansa Client · Aperçu visuel sécurisé</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: spacing.lg,
    paddingBottom: 120,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  eyebrow: { color: colors.primary, fontSize: 11, fontWeight: "800", letterSpacing: 1.6 },
  title: { color: colors.text, fontSize: 28, fontWeight: "900", letterSpacing: -0.8, marginTop: 4 },
  headerButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    position: "relative",
    width: 44,
  },
  headerIcon: { color: colors.text, fontSize: 22 },
  notificationDot: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 8,
    position: "absolute",
    right: 8,
    top: 8,
    width: 8,
  },
  balanceCard: {
    backgroundColor: "#101F19",
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 28,
    borderWidth: 1,
    minHeight: 230,
    overflow: "hidden",
    padding: 24,
    position: "relative",
  },
  balanceGlowOne: {
    backgroundColor: "rgba(77, 255, 179, 0.18)",
    borderRadius: 100,
    height: 180,
    position: "absolute",
    right: -65,
    top: -70,
    width: 180,
  },
  balanceGlowTwo: {
    backgroundColor: "rgba(255, 209, 102, 0.08)",
    borderRadius: 90,
    bottom: -100,
    height: 180,
    left: -60,
    position: "absolute",
    width: 180,
  },
  balanceTopRow: { flexDirection: "row", justifyContent: "space-between" },
  balanceLabel: { color: "rgba(255,255,255,0.64)", fontSize: 13, fontWeight: "600" },
  balanceValue: { color: "#FFFFFF", fontSize: 31, fontWeight: "900", letterSpacing: -1, marginTop: 8 },
  currencyPill: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8 },
  currencyText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  balanceHint: { color: "rgba(255,255,255,0.56)", fontSize: 12, lineHeight: 18, marginTop: 16, maxWidth: 260 },
  cardDivider: { backgroundColor: "rgba(255,255,255,0.1)", height: 1, marginTop: 22 },
  balanceFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 18 },
  balanceFooterLabel: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  balanceFooterValue: { color: "#7DE8B3", fontSize: 12, fontWeight: "700" },
  quickGrid: { flexDirection: "row", justifyContent: "space-between" },
  quickAction: { alignItems: "center", gap: 8, width: "23%" },
  quickIconWrap: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 20, borderWidth: 1, height: 54, justifyContent: "center", width: 54 },
  quickIcon: { color: colors.primary, fontSize: 22, fontWeight: "800" },
  quickLabel: { color: colors.text, fontSize: 12, fontWeight: "700" },
  heroBanner: { backgroundColor: "#E9F8F0", borderRadius: 24, flexDirection: "row", overflow: "hidden", padding: 22 },
  heroCopy: { flex: 1, zIndex: 2 },
  heroBadge: { color: "#167A4A", fontSize: 10, fontWeight: "900", letterSpacing: 1.5 },
  heroTitle: { color: "#0C3020", fontSize: 22, fontWeight: "900", letterSpacing: -0.5, lineHeight: 27, marginTop: 8 },
  heroText: { color: "#456657", fontSize: 12, lineHeight: 18, marginTop: 8 },
  heroButton: { alignSelf: "flex-start", backgroundColor: "#0F6F45", borderRadius: 13, marginTop: 16, paddingHorizontal: 16, paddingVertical: 10 },
  heroButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  heroOrb: { alignItems: "center", backgroundColor: "rgba(15,111,69,0.12)", borderRadius: 70, height: 130, justifyContent: "center", marginRight: -58, marginTop: 12, width: 130 },
  heroOrbInner: { alignItems: "center", backgroundColor: "#0F6F45", borderRadius: 38, height: 76, justifyContent: "center", width: 76 },
  heroOrbText: { color: "#FFFFFF", fontSize: 34, fontWeight: "900" },
  sectionTitleRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  sectionTitle: { color: colors.text, fontSize: typography.heading, fontWeight: "900" },
  sectionAction: { color: colors.primary, fontSize: 12, fontWeight: "800" },
  listCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 22, borderWidth: 1, overflow: "hidden" },
  serviceRow: { alignItems: "center", flexDirection: "row", minHeight: 76, paddingHorizontal: 16 },
  rowDivider: { borderBottomColor: colors.border, borderBottomWidth: 1 },
  serviceIcon: { alignItems: "center", backgroundColor: "rgba(31,180,105,0.1)", borderRadius: 15, height: 44, justifyContent: "center", width: 44 },
  serviceIconText: { color: colors.primary, fontSize: 19, fontWeight: "900" },
  serviceCopy: { flex: 1, marginLeft: 13 },
  serviceTitle: { color: colors.text, fontSize: 14, fontWeight: "800" },
  serviceSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  chevron: { color: colors.textMuted, fontSize: 25, fontWeight: "300" },
  emptyCard: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 22, borderWidth: 1, padding: 28 },
  emptyIcon: { alignItems: "center", backgroundColor: "rgba(31,180,105,0.1)", borderRadius: 24, height: 48, justifyContent: "center", width: 48 },
  emptyIconText: { color: colors.primary, fontSize: 20, fontWeight: "800" },
  emptyTitle: { color: colors.text, fontSize: 15, fontWeight: "800", marginTop: 14 },
  emptyText: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 7, textAlign: "center" },
  primaryActionCard: { alignItems: "center", backgroundColor: "#101F19", borderRadius: 28, padding: 28 },
  primaryActionIcon: { color: "#7DE8B3", fontSize: 48, fontWeight: "300" },
  primaryActionTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", marginTop: 12 },
  primaryActionText: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 19, marginTop: 8, textAlign: "center" },
  primaryButton: { backgroundColor: "#63DBA0", borderRadius: 15, marginTop: 20, paddingHorizontal: 24, paddingVertical: 13 },
  primaryButtonText: { color: "#082719", fontSize: 13, fontWeight: "900" },
  optionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  optionCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 20, borderWidth: 1, minHeight: 132, padding: 18, width: "48%" },
  optionIcon: { color: colors.primary, fontSize: 24, fontWeight: "900" },
  optionTitle: { color: colors.text, fontSize: 15, fontWeight: "900", marginTop: 14 },
  optionSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 5 },
  infoStrip: { backgroundColor: "rgba(31,180,105,0.09)", borderRadius: 20, flexDirection: "row", padding: 18 },
  infoStripIcon: { color: colors.primary, fontSize: 20, fontWeight: "900" },
  infoStripCopy: { flex: 1, marginLeft: 12 },
  infoStripTitle: { color: colors.text, fontSize: 14, fontWeight: "900" },
  infoStripText: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  mansaCard: { backgroundColor: "#15251F", borderRadius: 26, minHeight: 220, overflow: "hidden", padding: 24 },
  cardTopLine: { flexDirection: "row", justifyContent: "space-between" },
  cardBrand: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", letterSpacing: 3 },
  cardContactless: { color: "rgba(255,255,255,0.75)", fontSize: 17, fontWeight: "900", transform: [{ rotate: "90deg" }] },
  chip: { backgroundColor: "#D9B86C", borderRadius: 8, height: 38, justifyContent: "space-around", marginTop: 28, overflow: "hidden", paddingVertical: 7, width: 50 },
  chipLine: { backgroundColor: "rgba(80,50,0,0.28)", height: 2, width: "100%" },
  cardNumber: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", letterSpacing: 2, marginTop: 22 },
  cardBottomLine: { alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
  cardMetaLabel: { color: "rgba(255,255,255,0.45)", fontSize: 8, fontWeight: "700", letterSpacing: 1 },
  cardMetaValue: { color: "#FFFFFF", fontSize: 11, fontWeight: "800", marginTop: 4 },
  cardScheme: { color: "#FFFFFF", fontSize: 20, fontStyle: "italic", fontWeight: "900" },
  cardActions: { flexDirection: "row", gap: 10 },
  cardActionButton: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, flex: 1, gap: 7, paddingVertical: 15 },
  cardActionIcon: { color: colors.primary, fontSize: 18 },
  cardActionLabel: { color: colors.text, fontSize: 12, fontWeight: "800" },
  settingRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", minHeight: 64, paddingHorizontal: 16 },
  settingTitle: { color: colors.text, flex: 1, fontSize: 13, fontWeight: "700" },
  settingRight: { alignItems: "center", flexDirection: "row", gap: 8 },
  settingStatus: { color: colors.textMuted, fontSize: 11 },
  searchBar: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, flexDirection: "row", minHeight: 54, paddingHorizontal: 16 },
  searchIcon: { color: colors.primary, fontSize: 23 },
  searchPlaceholder: { color: colors.textMuted, fontSize: 13, marginLeft: 10 },
  horizontalScroll: { marginHorizontal: -spacing.lg, paddingHorizontal: spacing.lg },
  categoryPill: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 16, borderWidth: 1, marginRight: 10, paddingHorizontal: 15, paddingVertical: 10 },
  categoryText: { color: colors.text, fontSize: 12, fontWeight: "700" },
  hubHero: { backgroundColor: "#182B23", borderRadius: 26, padding: 24 },
  hubEyebrow: { color: "#7DE8B3", fontSize: 10, fontWeight: "900", letterSpacing: 1.6 },
  hubTitle: { color: "#FFFFFF", fontSize: 25, fontWeight: "900", lineHeight: 31, marginTop: 10 },
  hubText: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 19, marginTop: 10 },
  hubButton: { alignSelf: "flex-start", backgroundColor: "#63DBA0", borderRadius: 14, marginTop: 18, paddingHorizontal: 18, paddingVertical: 11 },
  hubButtonText: { color: "#082719", fontSize: 12, fontWeight: "900" },
  merchantGrid: { flexDirection: "row", gap: 12 },
  merchantCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 20, borderWidth: 1, overflow: "hidden", paddingBottom: 14, width: "48%" },
  merchantImage: { alignItems: "center", backgroundColor: "rgba(31,180,105,0.12)", height: 105, justifyContent: "center" },
  merchantImageText: { color: colors.primary, fontSize: 34, fontWeight: "900" },
  merchantTitle: { color: colors.text, fontSize: 13, fontWeight: "800", marginHorizontal: 12, marginTop: 12 },
  merchantMeta: { color: colors.textMuted, fontSize: 10, marginHorizontal: 12, marginTop: 5 },
  profileCard: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 22, borderWidth: 1, flexDirection: "row", padding: 16 },
  avatar: { alignItems: "center", backgroundColor: colors.primary, borderRadius: 24, height: 48, justifyContent: "center", width: 48 },
  avatarText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
  profileCopy: { flex: 1, marginLeft: 13 },
  profileName: { color: colors.text, fontSize: 15, fontWeight: "900" },
  profileMeta: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  verificationCard: { backgroundColor: "rgba(31,180,105,0.09)", borderRadius: 20, padding: 18 },
  verificationTop: { flexDirection: "row", justifyContent: "space-between" },
  verificationTitle: { color: colors.text, fontSize: 13, fontWeight: "900" },
  verificationPercent: { color: colors.primary, fontSize: 13, fontWeight: "900" },
  progressTrack: { backgroundColor: "rgba(31,180,105,0.18)", borderRadius: 4, height: 6, marginTop: 14, overflow: "hidden" },
  progressValue: { backgroundColor: colors.primary, height: "100%", width: "6%" },
  verificationText: { color: colors.textMuted, fontSize: 11, lineHeight: 17, marginTop: 12 },
  profileRow: { alignItems: "center", flexDirection: "row", minHeight: 64, paddingHorizontal: 16 },
  profileRowIcon: { color: colors.primary, fontSize: 19, width: 34 },
  profileRowTitle: { color: colors.text, flex: 1, fontSize: 13, fontWeight: "700" },
  versionText: { color: colors.textMuted, fontSize: 10, textAlign: "center" },
});
