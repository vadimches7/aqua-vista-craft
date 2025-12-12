/**
 * Event bus for post-submit popup communication
 * Simple event emitter pattern for cross-component communication
 */

type PopupSource = 'contact' | 'calculator' | 'tariffs';

type PopupPayload = {
  source: PopupSource;
};

type PopupListener = (payload: PopupPayload) => void;

class PostSubmitBus {
  private listeners: Set<PopupListener> = new Set();

  /**
   * Subscribe to popup open events
   */
  onOpen(listener: PopupListener): () => void {
    this.listeners.add(listener);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Emit popup open event
   */
  open(payload: PopupPayload): void {
    console.log('[PostSubmitBus] Opening popup', payload);
    console.log('[PostSubmitBus] Listeners count:', this.listeners.size);
    if (this.listeners.size === 0) {
      console.warn('[PostSubmitBus] No listeners registered! Popup component may not be mounted.');
    }
    this.listeners.forEach((listener) => {
      try {
        listener(payload);
      } catch (error) {
        console.error('PostSubmitBus listener error:', error);
      }
    });
  }

  /**
   * Emit popup close event
   */
  close(): void {
    // For now, close is handled by component state
    // This can be extended if needed
  }
}

// Singleton instance
const bus = new PostSubmitBus();

/**
 * Open popup with source identifier
 */
export function openPopup(payload: PopupPayload): void {
  bus.open(payload);
}

/**
 * Subscribe to popup events
 */
export function onPopupOpen(listener: PopupListener): () => void {
  return bus.onOpen(listener);
}

export type { PopupSource, PopupPayload };

