import React from 'react';
import { useState } from 'react';
import { apiService } from '../services/api';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { APP_CONFIG, CONTACT_INFO } from '../config/constants';
import { ROUTES } from '../config/routes';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [mode, setMode] = useState<'subscribe' | 'unsubscribe'>('subscribe');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    setMessage(null);

    try {
      const response = await apiService.subscribeNewsletter({ email: email.trim() });
      
      if (response.success) {
        setMessage({ type: 'success', text: response.data?.message || 'Abonnement réussi' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: response.error || 'Erreur lors de l\'abonnement' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur de connexion' });
    } finally {
      setIsSubscribing(false);
    }
  };
  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsUnsubscribing(true);
    setMessage(null);

    try {
      const response = await apiService.unsubscribeNewsletter({ email: email.trim() });
      
      if (response.success) {
        setMessage({ type: 'success', text: response.data?.message || 'Désabonnement réussi' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: response.error || 'Erreur lors du désabonnement' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur de connexion' });
    } finally {
      setIsUnsubscribing(false);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src={APP_CONFIG.LOGO_URL} 
                alt={`${APP_CONFIG.NAME} Logo`} 
                className="h-8 w-auto object-contain mr-2 rounded-md"
              />
              <h3 className="text-xl font-bold">{APP_CONFIG.NAME}</h3>
            </div>
            <p className="text-slate-300 mb-4">
              {APP_CONFIG.FULL_NAME}
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
              <Twitter className="h-6 w-6 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
              <Instagram className="h-6 w-6 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link to={ROUTES.PROJECTS} className="text-slate-300 hover:text-green-400 transition-colors duration-200">Projets</Link></li>
              <li><Link to={ROUTES.MARKETPLACE} className="text-slate-300 hover:text-green-400 transition-colors duration-200">Marketplace</Link></li>
              <li><Link to={ROUTES.EXPERTS} className="text-slate-300 hover:text-green-400 transition-colors duration-200">Experts</Link></li>
              <li><Link to={ROUTES.FORMALIZATION} className="text-slate-300 hover:text-green-400 transition-colors duration-200">Formalisation</Link></li>
              <li><Link to={ROUTES.FAQ} className="text-slate-300 hover:text-green-400 transition-colors duration-200">FAQ</Link></li>
              <li><Link to={ROUTES.BLOG} className="text-slate-300 hover:text-green-400 transition-colors duration-200">Blog</Link></li>
              <li><Link to={ROUTES.CONTACT} className="text-slate-300 hover:text-green-400 transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Agriculture</span></li>
              <li><span className="text-slate-300">Pêche</span></li>
              <li><span className="text-slate-300">Coopératives</span></li>
              <li><span className="text-slate-300">Conseil juridique</span></li>
            </ul>
          </div>

          {/* Newsletter Unsubscribe */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-slate-300 text-sm mb-4">
              {mode === 'subscribe' ? 'Recevez nos dernières actualités' : 'Ne plus recevoir nos newsletters'}
            </p>
            
            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}
            
            <div className="mb-3">
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => setMode('subscribe')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    mode === 'subscribe' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  S'abonner
                </button>
                <button
                  onClick={() => setMode('unsubscribe')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    mode === 'unsubscribe' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Se désabonner
                </button>
              </div>
            </div>
            
            <form onSubmit={mode === 'subscribe' ? handleSubscribe : handleUnsubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-3 py-2 text-gray-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={isSubscribing || isUnsubscribing}
                className={`w-full disabled:bg-gray-400 text-white py-2 px-3 rounded-lg font-medium transition-colors text-sm ${
                  mode === 'subscribe' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {(isSubscribing || isUnsubscribing) ? 'Traitement...' : 
                 mode === 'subscribe' ? 'S\'abonner' : 'Se désabonner'}
              </button>
            </form>
            
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                  <span className="text-slate-400">{CONTACT_INFO.EMAIL}</span>
                <span className="text-slate-400">contact@prf.cm</span>
              </div>
              <div className="flex items-center space-x-2">
                  <span className="text-slate-400">{CONTACT_INFO.PHONE}</span>
                <span className="text-slate-400">+237 671 234 567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700 text-center">
          <p className="text-slate-400">
            © 2024 {APP_CONFIG.NAME}. Tous droits réservés. Fait avec ❤️ pour le Cameroun.
          </p>
        </div>
      </div>
    </footer>
  );
}