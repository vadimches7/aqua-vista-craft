/**
 * Конфигурация AmoCRM
 * 
 * ВАЖНО: Для продакшена замените значения на реальные
 * или используйте переменные окружения
 */

export const amocrmConfig = {
  domain: import.meta.env.VITE_AMOCRM_DOMAIN || "amocrm.ru",
  apiDomain: import.meta.env.VITE_AMOCRM_API_DOMAIN || "api-b.amocrm.ru",
  accessToken: import.meta.env.VITE_AMOCRM_ACCESS_TOKEN,
};

