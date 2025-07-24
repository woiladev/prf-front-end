import React, { useState } from 'react';
import { Phone, CreditCard, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface MobileMoneyPaymentProps {
  amount: string;
  planName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function MobileMoneyPayment({ amount, planName, onSuccess, onCancel }: MobileMoneyPaymentProps) {
  const [selectedProvider, setSelectedProvider] = useState<'mtn' | 'orange' | ''>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1); // 1: Select provider, 2: Enter phone, 3: Confirm payment, 4: Processing, 5: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const providers = [
    {
      id: 'mtn' as const,
      name: 'MTN Mobile Money',
      logo: '🟡',
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
      description: 'Payez avec MTN MoMo'
    },
    {
      id: 'orange' as const,
      name: 'Orange Money',
      logo: '🟠',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      description: 'Payez avec Orange Money'
    }
  ];

  const handleProviderSelect = (providerId: 'mtn' | 'orange') => {
    setSelectedProvider(providerId);
    setStep(2);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 9) {
      setStep(3);
    }
  };

  const handleConfirmPayment = () => {
    setStep(4);
    setIsProcessing(true);
    
    // Generate transaction ID
    const txId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    setTransactionId(txId);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(5);
      
      // Auto-complete after showing success
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }, 5000);
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    // Format as +237 6XX XXX XXX
    if (digits.length >= 9) {
      const formatted = digits.slice(-9);
      return `+237 ${formatted.slice(0, 3)} ${formatted.slice(3, 6)} ${formatted.slice(6)}`;
    }
    return phone;
  };

  const selectedProviderInfo = providers.find(p => p.id === selectedProvider);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200 animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Paiement Mobile Money</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            >
              ✕
            </button>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">Plan: {planName}</p>
            <p className="text-lg font-bold text-green-600">{amount}</p>
          </div>
        </div>

        {/* Step 1: Select Provider */}
        {step === 1 && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Choisissez votre opérateur
            </h3>
            <div className="space-y-3">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider.id)}
                  className={`w-full p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 text-left ${provider.hoverColor} hover:text-white group shadow-sm hover:shadow-lg transform hover:scale-105 hover-lift`}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">{provider.logo}</div>
                    <div>
                      <div className="font-semibold group-hover:text-white">{provider.name}</div>
                      <div className="text-sm text-gray-600 group-hover:text-gray-100">
                        {provider.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Enter Phone Number */}
        {step === 2 && selectedProviderInfo && (
          <div className="p-6">
            <div className="flex items-center mb-4">
              <button
                onClick={() => setStep(1)}
                className="text-blue-600 hover:text-blue-800 mr-3"
              >
                ← Retour
              </button>
              <div className="flex items-center">
                <span className="text-xl mr-2">{selectedProviderInfo.logo}</span>
                <span className="font-semibold">{selectedProviderInfo.name}</span>
              </div>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    placeholder="6XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={15}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Format: 6XX XXX XXX (sans l'indicatif +237)
                </p>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length < 9}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg disabled:shadow-none transform hover:scale-105 disabled:transform-none hover:shadow-2xl"
              >
                Continuer
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Confirm Payment */}
        {step === 3 && selectedProviderInfo && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{selectedProviderInfo.logo}</div>
              <h3 className="text-lg font-semibold text-gray-900">
                Confirmer le paiement
              </h3>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-6 border border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Opérateur:</span>
                  <span className="font-semibold">{selectedProviderInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Numéro:</span>
                  <span className="font-semibold">{formatPhoneNumber(phoneNumber)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold">{planName}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-gray-900 font-semibold">Montant:</span>
                  <span className="font-bold text-green-600">{amount}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-200">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Instructions de paiement:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Vous recevrez un SMS de confirmation</li>
                    <li>Composez le code USSD ou confirmez via l'app</li>
                    <li>Entrez votre code PIN pour valider</li>
                    <li>Attendez la confirmation du paiement</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Modifier
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-2xl"
              >
                Confirmer le paiement
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Processing */}
        {step === 4 && selectedProviderInfo && (
          <div className="p-6 text-center">
            <div className="mb-6">
              <div className="relative">
                <Loader className="h-12 w-12 text-blue-600 mx-auto animate-spin mb-4" />
                <div className="absolute inset-0 h-12 w-12 mx-auto border-4 border-blue-200 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Traitement du paiement...
              </h3>
              <p className="text-gray-600">
                Veuillez confirmer le paiement sur votre téléphone
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-6 border border-yellow-200">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl mr-2">{selectedProviderInfo.logo}</span>
                <span className="font-semibold">{selectedProviderInfo.name}</span>
              </div>
              <p className="text-sm text-yellow-800">
                Un SMS a été envoyé au {formatPhoneNumber(phoneNumber)}
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                ID Transaction: {transactionId}
              </p>
            </div>

            <div className="text-sm text-gray-600">
              <p>⏱️ Temps d'attente: 2-5 minutes</p>
              <p className="mt-2">
                Si vous ne recevez pas de SMS, vérifiez que votre numéro est correct
                et que vous avez suffisamment de crédit.
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="p-6 text-center">
            <div className="relative mb-4">
              <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto animate-bounce" />
              <div className="absolute inset-0 h-16 w-16 mx-auto border-4 border-emerald-200 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Paiement réussi !
            </h3>
            <p className="text-gray-600 mb-4">
              Votre abonnement {planName} a été activé avec succès.
            </p>
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6 border border-emerald-200">
              <div className="text-sm text-emerald-800">
                <p><strong>Transaction ID:</strong> {transactionId}</p>
                <p><strong>Montant:</strong> {amount}</p>
                <p><strong>Statut:</strong> Confirmé ✅</p>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Redirection vers votre tableau de bord...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}