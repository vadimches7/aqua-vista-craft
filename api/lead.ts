import type { VercelRequest, VercelResponse } from "@vercel/node";

const AMO_TOKEN = process.env.AMOCRM_ACCESS_TOKEN;
const AMO_API = process.env.AMOCRM_API_DOMAIN || "api-b.amocrm.ru";

function allowCors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://bio-cube.ru");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  allowCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!AMO_TOKEN) {
    return res
      .status(500)
      .json({ error: "AmoCRM token is not configured on the server" });
  }

  try {
    const { name, phone, email, message, visitor_uid } = req.body || {};

    if (!name && !phone && !email) {
      return res.status(400).json({ error: "Missing lead data" });
    }

    const contactPayload = [
      {
        name: name || phone || email || "Лид с сайта",
        custom_fields_values: [
          ...(phone
            ? [{ field_code: "PHONE", values: [{ value: phone }] }]
            : []),
          ...(email
            ? [{ field_code: "EMAIL", values: [{ value: email }] }]
            : []),
        ],
      },
    ];

    const contactResp = await fetch(`https://${AMO_API}/api/v4/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AMO_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactPayload),
    });
    const contactText = await contactResp.text();
    const contactJson =
      contactResp.headers.get("content-type")?.includes("application/json") &&
      contactText
        ? JSON.parse(contactText)
        : contactText;

    if (!contactResp.ok) {
      return res
        .status(502)
        .json({ error: "amoCRM contacts error", details: contactJson });
    }

    const contactId = (contactJson as any)?._embedded?.contacts?.[0]?.id;

    const leadPayload = [
      {
        name: `Заявка с сайта Bio-Cube — ${name || phone || email || ""}`.trim(),
        _embedded: contactId ? { contacts: [{ id: contactId }] } : undefined,
        ...(typeof visitor_uid === "string" && visitor_uid
          ? { visitor_uid }
          : {}),
      },
    ];

    const leadResp = await fetch(`https://${AMO_API}/api/v4/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AMO_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadPayload),
    });
    const leadText = await leadResp.text();
    const leadJson =
      leadResp.headers.get("content-type")?.includes("application/json") &&
      leadText
        ? JSON.parse(leadText)
        : leadText;

    if (!leadResp.ok) {
      return res
        .status(502)
        .json({ error: "amoCRM leads error", details: leadJson });
    }

    const leadId = (leadJson as any)?._embedded?.leads?.[0]?.id;

    if (leadId && message) {
      await fetch(`https://${AMO_API}/api/v4/leads/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AMO_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            entity_id: leadId,
            note_type: "common",
            params: { text: message },
          },
        ]),
      });
    }

    return res
      .status(200)
      .json({ ok: true, leadId, contactId, visitor_uid: visitor_uid || null });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}


