export function getVisitorUid(): string | undefined {
  try {
    return localStorage.getItem("amo_visitor_uid") || undefined;
  } catch {
    return undefined;
  }
}
