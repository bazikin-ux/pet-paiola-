'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen py-12 md:py-20 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Fale Conosco
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white">
            Contato & Localização
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Dúvidas, sugestões ou agendamentos especiais? Entre em contato por formulário ou WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-50 dark:bg-[#131c2e] p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 space-y-6">
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Informações de Contato</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Estamos sempre disponíveis para ajudar. Você também pode vir nos fazer uma visita e trazer seu cãozinho para conhecer nosso espaço!
              </p>

              <div className="space-y-4">
                
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Telefone / WhatsApp</h4>
                    <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 font-medium">
                      (11) 99999-9999
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">E-mail Comercial</h4>
                    <a href="mailto:contato@petpaiola.com.br" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 font-medium">
                      contato@petpaiola.com.br
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Endereço</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Av. Principal dos Pets, 1500<br />
                      Jardim Feliz, São Paulo - SP<br />
                      CEP 01234-567
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-zinc-50 dark:bg-[#131c2e] p-4 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 relative overflow-hidden h-60 flex items-center justify-center text-center">
              <div className="absolute inset-0 bg-emerald-100/30 dark:bg-emerald-500/5 backdrop-blur-xs flex flex-col items-center justify-center p-6 space-y-2">
                <MapPin className="w-12 h-12 text-emerald-500 animate-bounce" />
                <span className="font-bold text-zinc-900 dark:text-white text-sm">Mapa Interativo (Simulado)</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Jardim Feliz, São Paulo - SP</span>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-all"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7 bg-zinc-50 dark:bg-[#131c2e] p-8 md:p-10 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40">
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-6">Envie uma Mensagem</h2>
            
            {status === 'success' ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <h3 className="text-lg font-bold">Mensagem Enviada!</h3>
                <p className="text-sm">
                  Obrigado pelo contato. Responderemos o mais breve possível no seu e-mail ou WhatsApp!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João da Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Seu E-mail *</label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: joao@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Telefone / WhatsApp (Opcional)</label>
                  <input
                    type="tel"
                    placeholder="Ex: (11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Sua Mensagem *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Escreva sua mensagem aqui..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10 resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Mensagem
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
