import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle, CheckCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ResetPassword() {
  const [step, setStep] = useState(1); // 1: Verify OTP, 2: Set New Password
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { verifyOtpPassword, setNewPassword: setNewPasswordAPI, forgotPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from localStorage (set during forgot password)
    const resetEmail = localStorage.getItem('password_reset_email');
    if (resetEmail) {
      setEmail(resetEmail);
    } else {
      // If no email, redirect to forgot password
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (otp.length < 6) {
      setMessage({ type: 'error', text: 'Le code OTP doit contenir 6 chiffres.' });
      return;
    }
    
    if (!/^\d+$/.test(otp)) {
      setMessage({ type: 'error', text: 'Le code OTP ne doit contenir que des chiffres.' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await verifyOtpPassword(email, otp.trim());
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'OTP verified successfully' });
        setTimeout(() => {
          setStep(2);
          setMessage(null);
        }, 1500);
      } else {
        setMessage({ type: 'error', text: result.message || 'Invalid OTP or email' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Le mot de passe doit contenir au moins 6 caractères.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas.' });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await setNewPasswordAPI(email, newPassword);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'Password reset successfully' });
        // Clear stored email
        localStorage.removeItem('password_reset_email');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Invalid email or password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      console.log('Reset Password: Resending OTP to:', email); // Debug log
      
      // Use the forgot password method which handles CORS properly through API service
      const result = await forgotPassword(email);
      
      console.log('Reset Password: Resend result:', result); // Debug log
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Un nouveau code a été envoyé à votre email.' });
        setOtp('');
      } else {
        setMessage({ 
          type: 'error', 
          text: result.message || 'Impossible d\'envoyer un nouveau code. Veuillez réessayer.' 
        });
      }
    } catch (error) {
      console.error('Reset Password: Resend error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Erreur de réseau. Veuillez vérifier votre connexion et réessayer.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              {step === 1 ? 'Vérification du code' : 'Nouveau mot de passe'}
            </h2>
            <p className="mt-2 text-gray-600">
              {step === 1 
                ? 'Entrez le code reçu par email' 
                : 'Choisissez un nouveau mot de passe sécurisé'
              }
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
          <Link
            to="/forgot-password"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>

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

          {step === 1 ? (
            /* Step 1: Verify OTP */
            <form onSubmit={handleVerifyOtp} className="space-y-6">
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
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    pattern="[0-9]*"
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
                disabled={isLoading || otp.length < 6 || !/^\d+$/.test(otp)}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition-colors ${
                  isLoading || otp.length < 6 || !/^\d+$/.test(otp)
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Vérification...
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
                disabled={isLoading}
                className={`w-full font-medium transition-colors ${
                  isLoading 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Renvoyer le code
              </button>
            </form>
          ) : (
            /* Step 2: Set New Password */
            <form onSubmit={handleSetNewPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Minimum 6 caractères"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirmez votre mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Conseils pour un mot de passe sécurisé :</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Au moins 6 caractères</li>
                  <li>• Mélangez lettres, chiffres et symboles</li>
                  <li>• Évitez les informations personnelles</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isLoading || newPassword.length < 6 || newPassword !== confirmPassword}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition-colors ${
                  isLoading || newPassword.length < 6 || newPassword !== confirmPassword
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mise à jour...
                  </div>
                ) : (
                  <>
                    Réinitialiser le mot de passe
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600">
              Vous vous souvenez de votre mot de passe ?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}