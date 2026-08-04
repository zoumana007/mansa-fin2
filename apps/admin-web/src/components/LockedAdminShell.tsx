import { visibleAdminSections } from "../auth/access-policy";
import { EnvironmentBadge } from "./EnvironmentBadge";

const anonymousContext = {
  authenticated: false,
  mfaVerified: false,
  permissions: new Set<string>(),
};

export function LockedAdminShell() {
  const sections = visibleAdminSections(anonymousContext);
  return (
    <main className="shell">
      <header className="header">
        <div>
          <p className="eyebrow">Mansa</p>
          <h1>Administration</h1>
        </div>
        <EnvironmentBadge environment="development" />
      </header>
      <section className="access-card" aria-labelledby="access-title">
        <p className="status">Accès verrouillé</p>
        <h2 id="access-title">Authentification renforcée requise</h2>
        <p>
          Le portail exige une session administrative valide et un second facteur. Aucun module ni
          aucune donnée ne sont chargés avant cette vérification.
        </p>
        <button type="button" disabled aria-disabled="true">
          Connexion indisponible dans ce socle
        </button>
      </section>
      <nav aria-label="Navigation administrative autorisée">
        {sections.length === 0 ? (
          <p className="empty">Aucune section visible sans permission explicite.</p>
        ) : (
          <ul>
            {sections.map((section) => (
              <li key={section}>{section}</li>
            ))}
          </ul>
        )}
      </nav>
    </main>
  );
}
