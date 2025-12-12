import { useState, useEffect } from 'react';
import { onPopupOpen, type PopupPayload } from './postSubmitBus';

type PopupState = {
  isOpen: boolean;
  source?: PopupPayload['source'];
};

/**
 * Hook for managing post-submit popup state
 * Listens to global events and manages session storage
 */
export function usePostSubmitPopup() {
  const [state, setState] = useState<PopupState>({
    isOpen: false,
  });

  useEffect(() => {
    // Subscribe to popup open events
    const unsubscribe = onPopupOpen((payload) => {
      // Check if we should show popup (session storage + env flag)
      const showAlways =
        import.meta.env?.NEXT_PUBLIC_SHOW_POPUP_ALWAYS === 'true' ||
        (typeof process !== 'undefined' &&
          process.env?.NEXT_PUBLIC_SHOW_POPUP_ALWAYS === 'true');

      if (showAlways) {
        console.log('[PostSubmitPopup] Showing popup (always mode)', payload);
        setState({ isOpen: true, source: payload.source });
        return;
      }

      // Check session storage
      if (typeof window !== 'undefined') {
        const alreadyShown = sessionStorage.getItem('bc_popup_shown');
        if (!alreadyShown) {
          console.log('[PostSubmitPopup] Showing popup (first time in session)', payload);
          sessionStorage.setItem('bc_popup_shown', '1');
          setState({ isOpen: true, source: payload.source });
        } else {
          console.log('[PostSubmitPopup] Popup already shown in this session, skipping', payload);
        }
      }
    });

    return unsubscribe;
  }, []);

  const closePopup = () => {
    setState({ isOpen: false });
  };

  return {
    isOpen: state.isOpen,
    source: state.source,
    closePopup,
  };
}

