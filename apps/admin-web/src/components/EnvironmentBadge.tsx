export function EnvironmentBadge({
  environment,
}: {
  environment: "development" | "staging" | "production";
}) {
  return (
    <span
      className={`environment environment-${environment}`}
      aria-label={`Environnement ${environment}`}
    >
      {environment}
    </span>
  );
}
