import { getVisitorUid } from "./visitor";

type LeadPayload = {
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  visitor_uid?: string;
};

export async function createAmoCRMLead(payload: LeadPayload) {
  const API_BASE =
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_BASE) ||
    import.meta.env?.NEXT_PUBLIC_API_BASE;
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_BASE is not defined");
  }

  const res = await fetch(`${API_BASE}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    mode: "cors",
    credentials: "omit",
  });

  const ct = res.headers.get("content-type") || "";
  const text = await res.text();

  if (!ct.includes("application/json")) {
    throw new Error(
      `API returned non-JSON (${res.status}): ${text.slice(0, 200)}`
    );
  }
  const json = JSON.parse(text);
  if (!res.ok) throw new Error(json?.error || `API error ${res.status}`);
  return json; // { ok: true, leadId, contactId, visitor_uid }
}

export async function submitLead(data: {
  name: string;
  phone?: string;
  email?: string;
  message?: string;
}) {
  const visitor_uid = getVisitorUid();
  return createAmoCRMLead({ ...data, visitor_uid });
}
