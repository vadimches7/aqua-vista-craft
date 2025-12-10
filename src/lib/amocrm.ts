/**
 * AmoCRM Integration
 * 
 * Для работы нужно:
 * 1. Получить API ключи в AmoCRM: Настройки → Интеграции → API
 * 2. Указать домен вашего AmoCRM (например: yourcompany.amocrm.ru)
 * 3. Создать переменные окружения:
 *    - VITE_AMOCRM_DOMAIN=yourcompany.amocrm.ru
 *    - VITE_AMOCRM_CLIENT_ID=your_client_id
 *    - VITE_AMOCRM_CLIENT_SECRET=your_client_secret
 *    - VITE_AMOCRM_REDIRECT_URI=https://yourdomain.com
 */

interface AmoCRMLead {
  name: string;
  price?: number;
  custom_fields_values?: Array<{
    field_id: number;
    values: Array<{ value: string | number }>;
  }>;
}

interface AmoCRMContact {
  name: string;
  phone?: string;
  email?: string;
  custom_fields_values?: Array<{
    field_id: number;
    values: Array<{ value: string }>;
  }>;
}

interface LeadData {
  // Основные данные
  name: string;
  phone: string;
  email?: string;
  
  // Данные из калькулятора
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
}

/**
 * Создаёт сделку и контакт в AmoCRM
 */
export async function createAmoCRMLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    const domain = import.meta.env.VITE_AMOCRM_DOMAIN || "amocrm.ru";
    const accessToken = import.meta.env.VITE_AMOCRM_ACCESS_TOKEN;

    console.log("AmoCRM: Starting lead creation", { 
      hasToken: !!accessToken,
      domain,
      dataName: data.name 
    });

    if (!accessToken) {
      console.error("AmoCRM access token not configured");
      return { success: false, error: "AmoCRM токен не настроен. Проверьте настройки переменных окружения." };
    }

    // Создаём контакт
    const contact = await createContact(domain, accessToken, {
      name: data.name,
      phone: data.phone,
      email: data.email,
    });

    // Создаём сделку
    const leadName = data.tariffName 
      ? `Заявка: ${data.tariffName}`
      : data.projectType 
        ? `Заявка: ${data.projectType}`
        : "Новая заявка с сайта";

    const lead = await createLead(domain, accessToken, {
      name: leadName,
      price: data.calculatedPrice,
      contact_id: contact.id,
      custom_fields: {
        projectType: data.projectType,
        volume: data.volume,
        style: data.style,
        address: data.address,
        convenientTime: data.convenientTime,
        source: data.source || "website",
        message: data.message,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("AmoCRM error:", error);
    const errorMessage = error?.message || "Ошибка при отправке заявки";
    return { success: false, error: errorMessage };
  }
}

/**
 * Получает токен доступа AmoCRM
 * Использует долгосрочный токен из переменных окружения
 */
async function getAmoCRMAccessToken(
  domain: string,
  clientId: string,
  clientSecret: string
): Promise<string | null> {
  // Используем долгосрочный токен из переменных окружения
  const accessToken = import.meta.env.VITE_AMOCRM_ACCESS_TOKEN;
  
  if (accessToken) {
    return accessToken;
  }

  // Если токена нет, возвращаем null
  return null;
}

/**
 * Создаёт контакт в AmoCRM
 */
async function createContact(
  domain: string,
  accessToken: string,
  contactData: AmoCRMContact
): Promise<{ id: number }> {
  // Используем API домен из переменных окружения или стандартный
  const apiDomain = import.meta.env.VITE_AMOCRM_API_DOMAIN || "api-b.amocrm.ru";
  
  // Формируем правильную структуру для AmoCRM API
  const contactPayload = {
    name: contactData.name,
    custom_fields_values: [] as any[],
  };

  // Добавляем телефон, если есть
  if (contactData.phone) {
    contactPayload.custom_fields_values.push({
      field_code: "PHONE",
      values: [{ value: contactData.phone, enum_code: "WORK" }],
    });
  }

  // Добавляем email, если есть
  if (contactData.email) {
    contactPayload.custom_fields_values.push({
      field_code: "EMAIL",
      values: [{ value: contactData.email, enum_code: "WORK" }],
    });
  }

  const response = await fetch(`https://${apiDomain}/api/v4/contacts`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([contactPayload]),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AmoCRM contact creation error:", errorText);
    throw new Error(`Failed to create contact: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data._embedded || !data._embedded.contacts || !data._embedded.contacts[0]) {
    throw new Error("Invalid response from AmoCRM");
  }
  return { id: data._embedded.contacts[0].id };
}

/**
 * Создаёт сделку в AmoCRM
 */
async function createLead(
  domain: string,
  accessToken: string,
  leadData: AmoCRMLead & { contact_id?: number; custom_fields?: Record<string, any> }
): Promise<{ id: number }> {
  const lead: any = {
    name: leadData.name,
  };

  // Добавляем цену, если есть
  if (leadData.price) {
    lead.price = leadData.price;
  }

  // Добавляем связь с контактом
  if (leadData.contact_id) {
    lead._embedded = {
      contacts: [{ id: leadData.contact_id }],
    };
  }

  // Используем API домен из переменных окружения или стандартный
  const apiDomain = import.meta.env.VITE_AMOCRM_API_DOMAIN || "api-b.amocrm.ru";
  const response = await fetch(`https://${apiDomain}/api/v4/leads`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([lead]),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AmoCRM lead creation error:", errorText);
    throw new Error(`Failed to create lead: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data._embedded || !data._embedded.leads || !data._embedded.leads[0]) {
    throw new Error("Invalid response from AmoCRM");
  }
  return { id: data._embedded.leads[0].id };
}

/**
 * Альтернативный способ: отправка через Webhook
 * Проще в настройке, но менее гибкий
 */
export async function sendToAmoCRMWebhook(data: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    const webhookUrl = import.meta.env.VITE_AMOCRM_WEBHOOK_URL;

    if (!webhookUrl) {
      return { success: false, error: "Webhook URL не настроен" };
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        projectType: data.projectType,
        volume: data.volume,
        style: data.style,
        calculatedPrice: data.calculatedPrice,
        address: data.address,
        convenientTime: data.convenientTime,
        source: data.source,
        tariffName: data.tariffName,
        message: data.message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Webhook error:", error);
    return { success: false, error: "Ошибка при отправке заявки" };
  }
}

