import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isResending, setIsResending] = useState(false);
  const { verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from localStorage (set during login/register)
    const pendingEmail = localStorage.getItem('pending_verification_email');
    if (pendingEmail) {
      setEmail(pendingEmail);
    } else {
      // If no pending email, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    // Validate OTP format
    if (otp.length < 6) {
      setMessage({ type: 'error', text: 'Le code OTP doit contenir 6 chiffres.' });
      return;
    }
    
    // Remove digit-only validation since API accepts string
    
    setIsLoading(true);
    
    try {
      // Ensure we have the email from localStorage or state
      const emailToVerify = email || localStorage.getItem('pending_verification_email');
      
      if (!emailToVerify) {
        setMessage({ type: 'error', text: 'Adresse email introuvable. Veuillez vous reconnecter.' });
        setIsLoading(false);
        return;
      }
      
      const result = await verifyOtp(emailToVerify, otp.trim());
      
      if (result.success) {
        setIsVerified(true);
        setMessage({ type: 'success', text: result.message || 'OTP verified successfully' });
        // Clear pending email
        localStorage.removeItem('pending_verification_email');
        
        // Redirect after showing success message
        setTimeout(() => {
          // Check if user is admin and redirect accordingly
          if (result.user?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Invalid or expired OTP' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    // Get email from localStorage or state
    const emailToResend = email || localStorage.getItem('pending_verification_email');
    
    if (!emailToResend) {
      setMessage({ type: 'error', text: 'Adresse email introuvable. Veuillez vous reconnecter.' });
      navigate('/login');
      return;
    }

    setIsResending(true);
    setMessage(null);
    
    try {
      console.log('Resending OTP to:', emailToResend); // Debug log
      
      // Use the auth context resend method which handles CORS properly
      const result = await resendOtp(emailToResend);
      
      console.log('Resend OTP result:', result); // Debug log
      
      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: result.message || `Un nouveau code OTP a été envoyé à ${emailToResend}` 
        });
        // Clear the current OTP input
        setOtp('');
      } else {
        setMessage({ 
          type: 'error', 
          text: result.message || 'Impossible d\'envoyer un nouveau code OTP. Veuillez réessayer.' 
        });
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Erreur de connexion. Veuillez vérifier votre réseau et réessayer.' 
      });
    } finally {
      setIsResending(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Compte vérifié avec succès !
            </h2>
            <p className="text-gray-600 mb-6">
              Bienvenue sur Infos et Coaching. Redirection en cours...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center mb-8">
            <img 
              src="https://i.imgur.com/igx1kpI.png" 
              alt="PRF Logo" 
              className="h-16 w-auto object-contain mx-auto mb-4 rounded-xl"
            />
            <h2 className="text-3xl font-bold text-gray-900">
              Vérification OTP
            </h2>
            <p className="mt-2 text-gray-600">
              Entrez le code reçu par email pour vérifier votre compte
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              <span className="text-sm">{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code de vérification
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-mono"
                  placeholder="Entrez le code OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  maxLength={6}
                  autoComplete="one-time-code"
                />
              </div>
              {email && (
                <p className="text-sm text-gray-500 mt-2">
                  Code envoyé à {email}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 6}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition-colors ${
                isLoading || otp.length < 6
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Vérification en cours...
                </div>
              ) : (
                <>
                  Vérifier le code
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              className={`w-full font-medium transition-colors ${
                isResending 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              {isResending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Envoi en cours...
                </div>
              ) : (
                'Renvoyer le code'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}