/**
 * Analytics helpers for GTM, Yandex Metrika, and VK Pixel
 * Safe wrappers that don't break if analytics scripts are not loaded
 */

type AnalyticsEvent = {
  event: string;
  [key: string]: unknown;
};

/**
 * Push event to Google Tag Manager dataLayer
 */
export function pushDataLayer(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  try {
    const dataLayer = (window as any).dataLayer;
    if (Array.isArray(dataLayer)) {
      dataLayer.push(event);
    }
  } catch (error) {
    console.warn('dataLayer push error:', error);
  }
}

/**
 * Track event in Yandex Metrika
 */
export function trackYandex(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  try {
    const ym = (window as any).ym;
    if (typeof ym === 'function') {
      // Yandex Metrika counter ID - should be configured in the project
      const counterId = (window as any).YM_COUNTER_ID;
      if (counterId) {
        ym(counterId, 'reachGoal', event, params);
      }
    }
  } catch (error) {
    console.warn('Yandex Metrika track error:', error);
  }
}

/**
 * Track event in VK Pixel
 */
export function trackVK(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  try {
    const vkPixel = (window as any).vkPixel;
    if (typeof vkPixel === 'function') {
      vkPixel('track', event, params);
    }
  } catch (error) {
    console.warn('VK Pixel track error:', error);
  }
}

/**
 * Universal track function that sends to all available analytics
 */
export function trackEvent(event: string, params?: Record<string, unknown>): void {
  const analyticsEvent: AnalyticsEvent = {
    event,
    ...params,
  };

  pushDataLayer(analyticsEvent);
  trackYandex(event, params);
  trackVK(event, params);
}



