/**
 * Утилита для работы с visitor_uid из amoCRM visitor tracking
 * 
 * visitor_uid сохраняется в localStorage под ключом "amo_visitor_uid"
 * через GTM и AMOPIXEL_IDENTIFIER
 */

/**
 * Получает visitor_uid из localStorage
 * @returns visitor_uid или null, если не найден
 */
export function getVisitorUid(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const visitorUid = localStorage.getItem('amo_visitor_uid');
    return visitorUid;
  } catch (error) {
    console.error('Error reading visitor_uid from localStorage:', error);
    return null;
  }
}

/**
 * Проверяет, есть ли visitor_uid в localStorage
 */
export function hasVisitorUid(): boolean {
  return getVisitorUid() !== null;
}
