import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import MobileMoneyPayment from '../components/MobileMoneyPayment';

export default function Checkout() {
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    paymentMethod: 'mobile_money'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobileMoneyPayment, setShowMobileMoneyPayment] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    
    try {
      const response = await apiService.checkout();
      
      if (response.success && response.data) {
        setOrderId(response.data.order.id);
        
        if (formData.paymentMethod === 'mobile_money') {
          setShowMobileMoneyPayment(true);
        } else {
          // For other payment methods, simulate success
          setTimeout(() => {
            setIsProcessing(false);
            clearCart();
            setStep(3);
          }, 3000);
        }
      } else {
        throw new Error(response.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
      
      // Show error notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = 'Erreur lors de la création de la commande';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 5000);
    } finally {
      if (formData.paymentMethod !== 'mobile_money') {
        setIsProcessing(false);
      }
    }
  };

  const handlePaymentSuccess = async () => {
    if (orderId) {
      try {
        await apiService.confirmOrderPayment({
          order_id: orderId,
          payment_status: 'success'
        });
        clearCart();
        setStep(3);
        setShowMobileMoneyPayment(false);
      } catch (error) {
        console.error('Payment confirmation error:', error);
      }
    }
  };

  const handlePaymentCancel = () => {
    setShowMobileMoneyPayment(false);
    setIsProcessing(false);
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucun article dans le panier</h2>
          <Link
            to="/marketplace"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Retour au marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/cart"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour au panier
          </Link>
        </div>
      </div>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {[
              { number: 1, title: 'Informations', icon: Truck },
              { number: 2, title: 'Paiement', icon: CreditCard },
              { number: 3, title: 'Confirmation', icon: CheckCircle }
            ].map((stepItem) => (
              <div key={stepItem.number} className="flex flex-col md:flex-row items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepItem.number ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                } shadow-md`}>
                  <stepItem.icon className="h-5 w-5" />
                </div>
                <span className={`mt-2 md:mt-0 md:ml-2 font-medium text-sm md:text-base text-center ${
                  step >= stepItem.number ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {stepItem.title}
                </span>
                {stepItem.number < 3 && (
                  <div className={`hidden md:block w-12 lg:w-16 h-1 mx-4 ${
                    step > stepItem.number ? 'bg-green-600' : 'bg-gray-200'
                  } rounded-full`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === 1 && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Delivery Information */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations de livraison</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Région *
                      </label>
                      <select
                        name="region"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        value={formData.region}
                        onChange={handleInputChange}
                      >
                        <option value="">Sélectionner une région</option>
                        <option value="centre">Centre</option>
                        <option value="littoral">Littoral</option>
                        <option value="ouest">Ouest</option>
                        <option value="nord">Nord</option>
                        <option value="sud">Sud</option>
                        <option value="est">Est</option>
                        <option value="adamaoua">Adamaoua</option>
                        <option value="nord-ouest">Nord-Ouest</option>
                        <option value="sud-ouest">Sud-Ouest</option>
                        <option value="extreme-nord">Extrême-Nord</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Résumé de la commande</h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-700">Quantité: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-green-600">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between text-xl font-bold bg-green-50 p-4 rounded-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="text-green-700">{getTotalPrice().toLocaleString()} FCFA</span>
                  </div>
                </div>
                <button
                  onClick={handleNextStep}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Continuer vers le paiement
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Méthode de paiement</h2>
                <div className="space-y-4">
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile_money"
                        checked={formData.paymentMethod === 'mobile_money'}
                        onChange={handleInputChange}
                        className="mr-3 w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Mobile Money</div>
                        <div className="text-sm text-gray-700">Orange Money, MTN Mobile Money</div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={formData.paymentMethod === 'bank_transfer'}
                        onChange={handleInputChange}
                        className="mr-3 w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Virement bancaire</div>
                        <div className="text-sm text-gray-700">Paiement par virement</div>
                      </div>
                    </label>
                  </div>

                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={formData.paymentMethod === 'cash_on_delivery'}
                        onChange={handleInputChange}
                        className="mr-3 w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Paiement à la livraison</div>
                        <div className="text-sm text-gray-700">Payez en espèces à la réception</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-800 font-medium">
                      Vos informations de paiement sont sécurisées
                    </span>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handlePreviousStep}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                  >
                    {isProcessing ? 'Traitement...' : 'Confirmer la commande'}
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Récapitulatif</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Livraison</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-800 font-medium">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.region}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Articles</h4>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-800 font-medium">{item.name} x{item.quantity}</span>
                        <span className="text-green-600 font-semibold">{item.price}</span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between text-xl font-bold bg-green-50 p-4 rounded-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="text-green-700">{getTotalPrice().toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="bg-white rounded-xl shadow-lg p-12 max-w-2xl mx-auto border border-gray-100">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Commande confirmée !
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Merci pour votre commande. Vous recevrez un email de confirmation sous peu.
                </p>
                <div className="flex space-x-4 justify-center">
                  <Link
                    to="/marketplace"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Continuer les achats
                  </Link>
                  <Link
                    to="/"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                  >
                    Retour à l'accueil
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Money Payment Modal */}
      {showMobileMoneyPayment && (
        <MobileMoneyPayment
          amount={`${getTotalPrice().toLocaleString()} FCFA`}
          planName="Commande Marketplace"
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
}