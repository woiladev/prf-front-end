import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  backUrl?: string;
  backText?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  title = "Page non trouvée",
  message = "La page que vous recherchez n'existe pas ou a été déplacée.",
  showBackButton = true,
  backUrl = "/",
  backText = "Retour à l'accueil"
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">{message}</p>
        
        {showBackButton && (
          <div className="space-y-4">
            <Link
              to={backUrl}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              {backText}
            </Link>
            
            <div>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour à la page précédente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFound;