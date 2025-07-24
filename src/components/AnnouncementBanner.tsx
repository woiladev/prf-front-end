import React from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-4 py-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-center">
          <div className="relative z-10">
            <span className="text-sm font-semibold drop-shadow-sm">
              🎉 Nouveau sur PRF : Accédez à plus de 500 projets avec notre abonnement VIP ! 
              Rejoignez-nous dès maintenant ! 🚀
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm relative z-10"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}