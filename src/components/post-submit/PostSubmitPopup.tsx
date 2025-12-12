import { useEffect, useRef, useState } from 'react';
import { X, Volume2, VolumeX, ArrowRight, Fish } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePostSubmitPopup } from './usePostSubmitPopup';
import { trackEvent } from '@/lib/analytics';

const PostSubmitPopup = () => {
  const { isOpen, source, closePopup } = usePostSubmitPopup();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Get environment variables
  const configUrl =
    import.meta.env?.NEXT_PUBLIC_CONFIG_URL ||
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CONFIG_URL) ||
    '';

  const videoSrc =
    import.meta.env?.NEXT_PUBLIC_POPUP_VIDEO_SRC ||
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_POPUP_VIDEO_SRC) ||
    '';

  // Track popup open
  useEffect(() => {
    if (isOpen && source) {
      trackEvent('bc_popup_open', { source });
    }
  }, [isOpen, source]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
        trackEvent('bc_popup_close', { source });
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, source, closePopup]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Auto-play video when popup opens
  useEffect(() => {
    if (isOpen && videoRef.current && videoSrc && !hasVideoError) {
      const video = videoRef.current;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoLoaded(true);
            // Track video play event when it starts playing
            trackEvent('bc_popup_video_play', { source });
          })
          .catch((error) => {
            console.warn('Video autoplay failed:', error);
            setHasVideoError(true);
          });
      }
    }
  }, [isOpen, videoSrc, hasVideoError, source]);

  const handleToggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      // Event is already tracked when video starts playing
    }
  };

  const handleGoToConfigurator = () => {
    if (configUrl) {
      trackEvent('bc_popup_go_configurator', { source });
      window.open(configUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGoToSpecies = () => {
    if (configUrl) {
      const speciesUrl = `${configUrl}?tab=species`;
      trackEvent('bc_popup_go_species', { source });
      window.open(speciesUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
      trackEvent('bc_popup_close', { source });
    }
  };

  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log('[PostSubmitPopup] Rendering popup', { source, isOpen });
    }
  }, [isOpen, source]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Popup Content */}
      <div
        ref={containerRef}
        className="relative w-full max-w-2xl bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            closePopup();
            trackEvent('bc_popup_close', { source });
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <h2
              id="popup-title"
              className="text-2xl md:text-3xl font-serif font-bold text-foreground"
            >
              Мы уже готовим для вас лучшее предложение
            </h2>
            <p className="text-lg text-muted-foreground">
              Пока команда считает проект — попробуйте наш новый конфигуратор аквариума и
              совместимость рыб
            </p>
          </div>

          {/* Video Block */}
          {videoSrc && !hasVideoError ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-background/50 border border-border/50">
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                playsInline
                loop
                className="w-full h-full object-cover"
                onError={() => setHasVideoError(true)}
                poster="/images/placeholder.svg"
              >
                <source src={videoSrc} type="video/mp4" />
                <source src={videoSrc.replace(/\.mp4$/, '.webm')} type="video/webm" />
              </video>

              {/* Video Controls Overlay */}
              <div className="absolute bottom-4 right-4">
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors"
                  aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              {/* Loading indicator */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <div className="w-8 h-8 border-2 border-bio border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          ) : (
            // Fallback: Static hero with animation
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-bio/20 via-background to-bio/10 border border-border/50 flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('/images/hero-aquarium.jpg')] bg-cover bg-center opacity-20" />
              <div className="relative z-10 text-center space-y-2">
                <Fish className="w-16 h-16 text-bio mx-auto animate-pulse" />
                <p className="text-sm text-muted-foreground">Конфигуратор аквариума</p>
              </div>
            </div>
          )}

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-bio">•</span>
              <span>Изучите виды</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-bio">•</span>
              <span>Проверьте совместимость</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-bio">•</span>
              <span>Подберите стиль и объём</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            {configUrl ? (
              <>
                <Button
                  variant="bio"
                  size="lg"
                  className="w-full group"
                  onClick={handleGoToConfigurator}
                >
                  <span>Перейти в конфигуратор</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleGoToSpecies}
                >
                  <Fish className="w-4 h-4 mr-2" />
                  <span>Узнать о видах рыб</span>
                </Button>
              </>
            ) : (
              <div className="p-4 rounded-lg bg-muted/20 border border-border/50 text-center">
                <p className="text-sm text-muted-foreground">
                  Конфигуратор скоро будет доступен
                </p>
              </div>
            )}
          </div>

          {/* Microcopy */}
          <div className="pt-4 border-t border-border/50 space-y-3">
            <p className="text-xs text-center text-muted-foreground">
              Мы тестируем продукт — ваша обратная связь помогает сделать его лучше
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                closePopup();
                trackEvent('bc_popup_close', { source, reason: 'feedback_later' });
              }}
            >
              Оставить отзыв позже
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSubmitPopup;

