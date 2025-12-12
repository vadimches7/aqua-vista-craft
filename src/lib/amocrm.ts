/**
 * AmoCRM Integration
 * 
 * Отправляет заявки через API endpoint /api/lead
 * который создаёт контакт и сделку в amoCRM с привязкой к visitor_uid
 */

import { getVisitorUid } from './visitor';

export interface LeadData {
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
 * Создаёт сделку и контакт в AmoCRM через API endpoint
 * 
 * Автоматически добавляет visitor_uid из localStorage для связи сделки с посетителем сайта
 */
export async function createAmoCRMLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    // Получаем visitor_uid из localStorage
    // Это ключевой параметр для связи сделки с посетителем сайта
    const visitorUid = getVisitorUid();
    
    console.log("AmoCRM: Starting lead creation", { 
      name: data.name,
      phone: data.phone,
      visitorUid: visitorUid || 'not provided',
      source: data.source 
    });

    // Определяем URL API endpoint
    // Используем относительный путь - Vercel rewrites настроены в vercel.json
    const apiUrl = '/api/lead';

    // Отправляем запрос на сервер
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        visitor_uid: visitorUid, // <-- Передаём visitor_uid на сервер
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create lead');
    }

    console.log("AmoCRM: Lead created successfully", {
      leadId: result.leadId,
      contactId: result.contactId,
      visitorUid: result.visitorUid,
    });

    return { success: true };
  } catch (error: any) {
    console.error("AmoCRM error:", error);
    const errorMessage = error?.message || "Ошибка при отправке заявки";
    return { success: false, error: errorMessage };
  }
}



