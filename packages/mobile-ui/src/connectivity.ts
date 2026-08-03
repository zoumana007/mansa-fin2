export type ConnectionState = "online" | "offline" | "recovering";
export function connectionMessage(state: ConnectionState): string | null {
  if (state === "offline")
    return "Connexion indisponible. Les données affichées peuvent être anciennes.";
  if (state === "recovering") return "Reconnexion en cours…";
  return null;
}
