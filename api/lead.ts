/**
 * AmoCRM Lead API Endpoint
 * 
 * POST /api/lead
 * 
 * Создаёт контакт (или находит существующий) и сделку в amoCRM
 * с привязкой к visitor_uid для связи с посетителем сайта
 * 
 * Требуемые переменные окружения:
 * - AMOCRM_DOMAIN - домен amoCRM (например: amocrm.ru)
 * - AMOCRM_ACCESS_TOKEN - long-lived токен для API v4
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface LeadRequest {
  // Основные данные
  name: string;
  phone: string;
  email?: string;
  
  // Данные из калькулятора/форм
  projectType?: string;
  volume?: string;
  style?: string;
  calculatedPrice?: number;
  address?: string;
  convenientTime?: string;
  
  // Источник заявки
  source?: string; // "calculator" | "tariff" | "contact" | "messenger"
  tariffName?: string;
  
  // Дополнительные данные
  message?: string;
  
  // ВАЖНО: visitor_uid для связи сделки с посетителем сайта
  visitor_uid?: string;
}

interface AmoCRMContact {
  id: number;
  name: string;
  custom_fields_values?: Array<{
    field_code: string;
    values: Array<{ value: string; enum_code?: string }>;
  }>;
}

interface AmoCRMLead {
  id: number;
  name: string;
  price?: number;
  visitor_uid?: string;
}

const AMOCRM_DOMAIN = process.env.AMOCRM_DOMAIN || process.env.VITE_AMOCRM_DOMAIN;
const AMOCRM_ACCESS_TOKEN = process.env.AMOCRM_ACCESS_TOKEN || process.env.VITE_AMOCRM_ACCESS_TOKEN;
const AMOCRM_API_DOMAIN = process.env.AMOCRM_API_DOMAIN || process.env.VITE_AMOCRM_API_DOMAIN || 'api-b.amocrm.ru';

/**
 * Ищет существующий контакт по телефону или email
 */
async function findContactByPhoneOrEmail(
  phone?: string,
  email?: string
): Promise<AmoCRMContact | null> {
  if (!phone && !email) return null;

  const queryParams: string[] = [];
  if (phone) {
    queryParams.push(`query=${encodeURIComponent(phone)}`);
  }
  if (email) {
    queryParams.push(`query=${encodeURIComponent(email)}`);
  }

  // Ищем контакт по телефону
  if (phone) {
    try {
      const response = await fetch(
        `https://${AMOCRM_API_DOMAIN}/api/v4/contacts?query=${encodeURIComponent(phone)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${AMOCRM_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data._embedded?.contacts?.length > 0) {
          // Проверяем, что телефон действительно совпадает
          const contact = data._embedded.contacts[0];
          const contactPhone = contact.custom_fields_values
            ?.find((f: any) => f.field_code === 'PHONE')
            ?.values?.[0]?.value;
          
          if (contactPhone && contactPhone.replace(/\D/g, '') === phone.replace(/\D/g, '')) {
            return contact;
          }
        }
      }
    } catch (error) {
      console.error('Error searching contact by phone:', error);
    }
  }

  // Ищем контакт по email
  if (email) {
    try {
      const response = await fetch(
        `https://${AMOCRM_API_DOMAIN}/api/v4/contacts?query=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${AMOCRM_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data._embedded?.contacts?.length > 0) {
          const contact = data._embedded.contacts[0];
          const contactEmail = contact.custom_fields_values
            ?.find((f: any) => f.field_code === 'EMAIL')
            ?.values?.[0]?.value;
          
          if (contactEmail && contactEmail.toLowerCase() === email.toLowerCase()) {
            return contact;
          }
        }
      }
    } catch (error) {
      console.error('Error searching contact by email:', error);
    }
  }

  return null;
}

/**
 * Создаёт новый контакт в amoCRM
 */
async function createContact(
  name: string,
  phone?: string,
  email?: string
): Promise<AmoCRMContact> {
  const contactPayload: any = {
    name: name,
    custom_fields_values: [],
  };

  if (phone) {
    contactPayload.custom_fields_values.push({
      field_code: 'PHONE',
      values: [{ value: phone, enum_code: 'WORK' }],
    });
  }

  if (email) {
    contactPayload.custom_fields_values.push({
      field_code: 'EMAIL',
      values: [{ value: email, enum_code: 'WORK' }],
    });
  }

  const response = await fetch(`https://${AMOCRM_API_DOMAIN}/api/v4/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AMOCRM_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([contactPayload]),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create contact: ${response.status} ${response.statusText}. ${errorText}`);
  }

  const data = await response.json();
  if (!data._embedded?.contacts?.[0]) {
    throw new Error('Invalid response from AmoCRM when creating contact');
  }

  return data._embedded.contacts[0];
}

/**
 * Создаёт сделку в amoCRM с привязкой к visitor_uid
 * 
 * ВАЖНО: visitor_uid передаётся в параметре visitor_uid при создании сделки.
 * Это позволяет amoCRM связать сделку с конкретным посетителем сайта,
 * отслеживаемым через AMOPIXEL_IDENTIFIER.
 */
async function createLead(
  name: string,
  contactId: number,
  visitorUid?: string,
  price?: number,
  customFields?: Record<string, any>
): Promise<AmoCRMLead> {
  const leadPayload: any = {
    name: name,
    _embedded: {
      contacts: [{ id: contactId }],
    },
  };

  // ВАЖНО: Передаём visitor_uid в параметре visitor_uid
  // Это ключевой момент для связи сделки с посетителем сайта
  if (visitorUid) {
    leadPayload.visitor_uid = visitorUid;
  }

  if (price) {
    leadPayload.price = price;
  }

  // Добавляем кастомные поля, если есть
  if (customFields) {
    leadPayload.custom_fields_values = [];
    
    // Здесь можно добавить маппинг кастомных полей
    // Например, если в amoCRM настроены поля для projectType, volume и т.д.
    // Для примера оставляем базовую структуру
  }

  const response = await fetch(`https://${AMOCRM_API_DOMAIN}/api/v4/leads`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AMOCRM_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([leadPayload]),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create lead: ${response.status} ${response.statusText}. ${errorText}`);
  }

  const data = await response.json();
  if (!data._embedded?.leads?.[0]) {
    throw new Error('Invalid response from AmoCRM when creating lead');
  }

  return data._embedded.leads[0];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Проверяем наличие токена
  if (!AMOCRM_ACCESS_TOKEN) {
    console.error('AmoCRM access token not configured');
    return res.status(500).json({ 
      success: false, 
      error: 'AmoCRM токен не настроен. Проверьте переменные окружения.' 
    });
  }

  try {
    const body: LeadRequest = req.body;

    // Валидация обязательных полей
    if (!body.name || !body.phone) {
      return res.status(400).json({
        success: false,
        error: 'Имя и телефон обязательны для заполнения',
      });
    }

    // Извлекаем visitor_uid из тела запроса
    const visitorUid = body.visitor_uid;
    
    console.log('Creating lead with visitor_uid:', visitorUid || 'not provided');

    // Шаг 1: Ищем существующий контакт или создаём новый
    let contact = await findContactByPhoneOrEmail(body.phone, body.email);
    
    if (!contact) {
      console.log('Contact not found, creating new contact');
      contact = await createContact(body.name, body.phone, body.email);
    } else {
      console.log('Found existing contact:', contact.id);
    }

    // Шаг 2: Формируем название сделки
    const leadName = body.tariffName
      ? `Заявка: ${body.tariffName}`
      : body.projectType
      ? `Заявка: ${body.projectType}`
      : 'Новая заявка с сайта';

    // Шаг 3: Создаём сделку с visitor_uid
    // ВАЖНО: visitor_uid передаётся здесь для связи сделки с посетителем
    const lead = await createLead(
      leadName,
      contact.id,
      visitorUid, // <-- КЛЮЧЕВОЙ ПАРАМЕТР: связывает сделку с посетителем сайта
      body.calculatedPrice,
      {
        projectType: body.projectType,
        volume: body.volume,
        style: body.style,
        address: body.address,
        convenientTime: body.convenientTime,
        source: body.source || 'website',
        message: body.message,
      }
    );

    console.log('Lead created successfully:', {
      leadId: lead.id,
      contactId: contact.id,
      visitorUid: visitorUid || 'not provided',
    });

    return res.status(200).json({
      success: true,
      leadId: lead.id,
      contactId: contact.id,
      visitorUid: visitorUid || null,
    });
  } catch (error: any) {
    console.error('AmoCRM API error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Ошибка при создании заявки в AmoCRM',
    });
  }
}
