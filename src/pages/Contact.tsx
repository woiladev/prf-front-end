import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { apiService, CreateContactRequest } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    object: '',
    message: '',
    request_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const contactTypes = [
    { id: 'general', name: 'Question générale' },
    { id: 'support', name: 'Support technique' },
    { id: 'partnership', name: 'Partenariat' },
    { id: 'expert', name: 'Devenir expert' },
    { id: 'feedback', name: 'Feedback' },
    { id: 'business', name: 'Développement d\'affaires' },
    { id: 'legal', name: 'Questions juridiques' },
    { id: 'technical', name: 'Assistance technique' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    setIsSubmitting(true);
    
    try {
      const contactData: CreateContactRequest = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        request_type: formData.request_type,
        object: formData.object.trim(),
        message: formData.message.trim()
      };
      
      const response = await apiService.submitContactRequest(contactData);
      
      if (response.success) {
        setIsSubmitted(true);
        setSubmitMessage({ 
          type: 'success', 
          text: response.data?.message || 'Message envoyé avec succès!' 
        });
        
        // Subscribe to newsletter automatically
        try {
          await apiService.subscribeNewsletter({ email: contactData.email });
        } catch (error) {
          console.log('Newsletter subscription failed, but contact was successful');
        }
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: response.error || 'Erreur lors de l\'envoi du message' 
        });
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Erreur de connexion. Veuillez réessayer.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Message envoyé avec succès !
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    object: '',
                    message: '',
                    request_type: 'general'
                  });
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Envoyer un autre message
              </button>
              <a
                href="/"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-blue-900/30 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-purple-500/15 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl text-shadow-glow">
              Contactez-nous
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-xl text-shadow-glow">
              Notre équipe est là pour vous accompagner dans vos projets entrepreneuriaux
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600 mb-4">Appelez-nous directement</p>
              <a
                href="tel:+237671234567"
                className="text-blue-600 hover:text-blue-800 font-medium text-lg"
              >
                +237 671 234 567
              </a>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Envoyez-nous un message</p>
              <a
                href="mailto:contact@prf.cm"
                className="text-green-600 hover:text-green-800 font-medium text-lg"
              >
                contact@prf.cm
              </a>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Adresse</h3>
              <p className="text-gray-600 mb-4">Visitez nos bureaux</p>
              <p className="text-orange-600 font-medium">
                Douala, Cameroun<br />
                Bonanjo - Rue de la Réunification
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Envoyez-nous un message
            </h2>
            <p className="text-xl text-gray-600">
              Nous vous répondrons dans les 24 heures
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800 text-sm font-medium">
                  En soumettant ce formulaire, vous serez automatiquement abonné à notre newsletter pour recevoir nos dernières actualités
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg flex items-center ${
                submitMessage.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitMessage.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2" />
                )}
                <span className="text-sm">{submitMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de demande *
                  </label>
                  <select
                    name="request_type"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.request_type}
                    onChange={handleInputChange}
                  >
                    {contactTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objet *
                </label>
                <input
                  type="text"
                  name="object"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.object}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Décrivez votre demande en détail..."
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement des réponses à vos questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Comment puis-je accéder aux projets ?
                </h3>
                <p className="text-gray-600">
                  Vous pouvez consulter nos projets gouvernementaux gratuitement. 
                  Pour accéder aux contenus premium, un abonnement VIP est requis.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Comment contacter un expert ?
                </h3>
                <p className="text-gray-600">
                  Les coordonnées des experts sont disponibles pour les membres VIP. 
                  Vous pouvez également nous contacter pour une mise en relation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Proposez-vous un accompagnement personnalisé ?
                </h3>
                <p className="text-gray-600">
                  Oui, nous offrons un accompagnement personnalisé pour la formalisation 
                  d'entreprises et le développement de projets.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quels sont vos horaires d'ouverture ?
                </h3>
                <p className="text-gray-600">
                  Nous sommes disponibles du lundi au vendredi de 8h à 17h. 
                  Les demandes par email sont traitées 7j/7.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Comment vendre sur le marketplace ?
                </h3>
                <p className="text-gray-600">
                  Contactez-nous pour devenir vendeur sur notre marketplace. 
                  Nous vous accompagnerons dans la création de votre boutique.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Organisez-vous des formations ?
                </h3>
                <p className="text-gray-600">
                  Oui, nous organisons régulièrement des formations et webinaires 
                  pour nos membres sur différents aspects de l'entrepreneuriat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-center mb-8">
              <Clock className="h-12 w-12 text-blue-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Horaires d'ouverture</h2>
                <p className="text-gray-600">Nous sommes là pour vous accompagner</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bureau principal</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi:</span>
                    <span className="font-medium">8h00 - 17h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi:</span>
                    <span className="font-medium">9h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche:</span>
                    <span className="font-medium text-red-600">Fermé</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Support en ligne</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium text-green-600">24h/7j</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chat en ligne:</span>
                    <span className="font-medium">8h00 - 20h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgences:</span>
                    <span className="font-medium">Sur rendez-vous</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}