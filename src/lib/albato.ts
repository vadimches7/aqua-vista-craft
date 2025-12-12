/**
 * Albato Webhook integration
 * Sends form submissions to Albato webhook which forwards to amoCRM
 */

const ALBATO_WEBHOOK_URL =
  'https://h.albato.ru/wh/38/1lf8be4/ti_3pZCXqU8mG5NOYYwpbW4v4AwRdMxnMo5c4HNIbCQ/';

export type AlbatoPayload = {
  // Основные поля для контакта (стандартные названия для amoCRM)
  name: string;
  phone: string;
  email?: string;
  // Альтернативные названия для совместимости
  first_name?: string;
  last_name?: string;
  // Название сделки (явное поле для amoCRM)
  deal_name?: string;
  lead_name?: string;
  // Метаданные
  source: 'bio-cube.ru';
  page_url: string;
  form: 'contact' | 'calculator' | 'tariff';
  // Дополнительные поля для калькулятора
  project_type?: string;
  volume?: string;
  calculated_price?: string;
  address?: string;
  // Дополнительные поля для тарифов
  tariff_title?: string;
  tariff_price?: string;
  // Сообщение/комментарий для сделки
  message?: string;
};

/**
 * Send form data to Albato webhook
 */
export async function sendToAlbato(data: {
  name: string;
  phone: string;
  email?: string;
  form: 'contact' | 'calculator' | 'tariff';
  // Дополнительные поля для калькулятора
  project_type?: string;
  volume?: string;
  calculated_price?: string;
  address?: string;
  // Дополнительные поля для тарифов
  tariff_title?: string;
  tariff_price?: string;
}): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('sendToAlbato can only be called in browser');
  }

  // Формируем название сделки
  let dealName = `Заявка с сайта — ${data.form}`;
  if (data.form === 'calculator' && data.project_type) {
    dealName = `Заявка с калькулятора — ${data.project_type}`;
  } else if (data.form === 'tariff' && data.tariff_title) {
    dealName = `Заявка по тарифу — ${data.tariff_title}`;
  }
  
  // Формируем сообщение для сделки из дополнительных данных
  const messageParts: string[] = [];
  messageParts.push(`Имя: ${data.name}`);
  messageParts.push(`Телефон: ${data.phone}`);
  if (data.email) messageParts.push(`Email: ${data.email}`);
  if (data.project_type) messageParts.push(`Тип проекта: ${data.project_type}`);
  if (data.volume) messageParts.push(`Литраж: ${data.volume}`);
  if (data.calculated_price) messageParts.push(`Стоимость: ${data.calculated_price}`);
  if (data.address) messageParts.push(`Адрес: ${data.address}`);
  if (data.tariff_title) messageParts.push(`Тариф: ${data.tariff_title} (${data.tariff_price})`);
  
  const payload: AlbatoPayload = {
    ...data,
    // Добавляем first_name для совместимости с amoCRM
    first_name: data.name.split(' ')[0] || data.name,
    last_name: data.name.split(' ').slice(1).join(' ') || undefined,
    // Явное название сделки
    deal_name: dealName,
    lead_name: dealName,
    source: 'bio-cube.ru',
    page_url: window.location.href,
    message: messageParts.join('\n'),
  };

  console.log('[Albato] Sending request to webhook:', {
    url: ALBATO_WEBHOOK_URL,
    payload,
  });

  try {
    // Albato может требовать данные в разных форматах
    // Пробуем form-urlencoded формат (application/x-www-form-urlencoded)
    // Это стандартный формат для webhook'ов
    
    const formData = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    console.log('[Albato] Sending form data:', Object.fromEntries(formData));

    const response = await fetch(ALBATO_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      mode: 'cors',
      credentials: 'omit',
    });

    console.log('[Albato] Response status:', response.status, response.statusText);

    // Albato может возвращать разные статусы, но главное - проверить, что запрос дошел
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error('[Albato] Error response:', errorText);
      throw new Error(`Albato webhook error: ${response.status} ${response.statusText}`);
    }

    const responseText = await response.text().catch(() => '');
    console.log('[Albato] Success! Response:', responseText || 'OK');
  } catch (error: any) {
    console.error('[Albato] Request failed:', error);
    
    // Если это CORS ошибка или сетевая ошибка
    if (error.name === 'TypeError' || error.message.includes('fetch')) {
      throw new Error('Network error: Unable to reach Albato webhook. Check your internet connection and CORS settings.');
    }
    
    throw error;
  }
}

