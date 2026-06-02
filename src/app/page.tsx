'use client';

import Link from 'next/link';
import { 
  PawPrint, 
  Calendar, 
  Shield, 
  Sparkles, 
  Award, 
  Heart, 
  Star, 
  ArrowRight,
  Phone,
  Clock,
  MapPin
} from 'lucide-react';
import { SERVICES } from '@/utils/constants';

export default function Home() {
  const mainServices = SERVICES.slice(0, 4); // Show top 4 services on home page

  const benefits = [
    {
      icon: Award,
      title: 'Profissionais Qualificados',
      desc: 'Nossa equipe é formada por groomers certificados e veterinários consultores apaixonados por animais.'
    },
    {
      icon: Shield,
      title: 'Ambiente Seguro e Limpo',
      desc: 'Instalações 100% higienizadas e esterilizadas para garantir o bem-estar e saúde do seu pet.'
    },
    {
      icon: Sparkles,
      title: 'Produtos de Elite',
      desc: 'Usamos shampoos hipoalergênicos e produtos importados de alta qualidade específicos para cada pelagem.'
    },
    {
      icon: Heart,
      title: 'Carinho de Verdade',
      desc: 'Não é apenas trabalho, amamos o que fazemos. Seu amigo será tratado com todo o amor do mundo.'
    }
  ];

  const testimonials = [
    {
      name: 'Mariana Santos',
      pet: 'Bob (Golden Retriever)',
      text: 'O Bob adora o banho da Pet Paiola! Ele sempre volta super cheiroso, feliz e calmo. A equipe tem um carinho que nunca vi em outro pet shop.',
      rating: 5
    },
    {
      name: 'Roberto Lima',
      pet: 'Floquinho (Poodle)',
      text: 'O trabalho de tosa é simplesmente impecável. Cortam exatamente como peço e o Floquinho nem fica estressado. Recomendo de olhos fechados!',
      rating: 5
    },
    {
      name: 'Camila Fernandes',
      pet: 'Mel (Shih Tzu)',
      text: 'A hidratação da Pet Paiola é maravilhosa! O pelo da Mel fica sedoso, brilhante e sem nós por semanas. Fora o atendimento que é 10/10.',
      rating: 5
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-[#0d1527] dark:via-[#0b0f19] dark:to-[#0d1527]/30 transition-colors duration-300">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-yellow-300/20 dark:bg-yellow-500/10 rounded-full blur-3xl" style={{ animationDelay: '1.5s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Col - Hero Text */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="h-4.5 w-4.5" />
                Seu Pet em Boas Mãos
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                PET <span className="text-emerald-500">PAIOLA</span>
              </h1>
              
              <p className="text-xl sm:text-2xl font-medium text-zinc-700 dark:text-zinc-300 italic">
                “Cuidado, carinho e banho para seu melhor amigo”
              </p>
              
              <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0">
                Oferecemos banho completo, tosa especializada, tratamentos de pelagem e muito mais. Agende em poucos segundos e traga a felicidade que seu cãozinho merece!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/agendar"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/45 transition-all text-base"
                >
                  <Calendar className="h-5 w-5" />
                  Agendar Agora
                </Link>
                <Link
                  href="/sobre"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 font-bold px-8 py-4 rounded-2xl transition-all text-base"
                >
                  Conhecer Mais
                  <ArrowRight className="h-5 w-5 text-zinc-400" />
                </Link>
              </div>
            </div>

            {/* Right Col - Hero visual representation */}
            <div className="flex justify-center relative">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-emerald-500 to-yellow-400 p-3 shadow-2xl animate-float">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#131c2e] overflow-hidden flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-zinc-150 dark:border-zinc-800">
                    <img 
                      src="/logo.jpeg" 
                      alt="PET PAIOLA Logo Oficial" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white uppercase tracking-tight">PET PAIOLA</h3>
                  <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider -mt-2">
                    Banho & Tosa
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 px-4">
                    O melhor centro de estética animal de Santo André, cuidando com amor do seu melhor amigo!
                  </p>
                  <div className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-500/10 px-3 py-1 rounded-full text-yellow-600 dark:text-yellow-400 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    4.9 / 5.0 no Google Reviews
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BENEFITS SECTION */}
      <section className="py-20 bg-white dark:bg-[#0b0f19] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Por que escolher a <span className="text-emerald-500">Pet Paiola</span>?
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              Cuidamos de cada detalhe para que a experiência do seu melhor amigo seja relaxante, divertida e totalmente segura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div 
                key={i} 
                className="group relative bg-zinc-50 dark:bg-[#131c2e] p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">{b.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAIN SERVICES PREVIEW */}
      <section className="py-20 bg-zinc-50 dark:bg-[#090d16] border-t border-zinc-200/50 dark:border-zinc-800/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                Nossos Serviços Principais
              </h2>
              <p className="text-lg text-zinc-500 dark:text-zinc-400">
                Uma gama completa de serviços para deixar o seu companheiro limpo, saudável e elegante.
              </p>
            </div>
            <Link
              href="/agendar"
              className="inline-flex items-center gap-2 text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-bold transition-colors group text-lg"
            >
              Ver todos os serviços
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainServices.map((service) => (
              <div 
                key={service.id} 
                className="bg-white dark:bg-[#131c2e] p-6 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {service.duration}
                    </span>
                    <span className="text-xl font-black text-emerald-500">
                      R$ {service.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <Link
                  href="/agendar"
                  className="w-full text-center py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white text-zinc-700 dark:text-zinc-300 font-semibold transition-all text-sm"
                >
                  Agendar este
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLIENT TESTIMONIALS */}
      <section className="py-20 bg-white dark:bg-[#0b0f19] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Quem ama, <span className="text-emerald-500">aprova</span>!
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              Veja o depoimento de tutores que confiam o cuidado de seus companheiros à nossa equipe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-50 dark:bg-[#131c2e] p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex text-yellow-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-350 italic text-sm leading-relaxed">
                    “{t.text}”
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-zinc-200 dark:border-zinc-800/60 pt-4">
                  <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-2 rounded-xl text-emerald-500">
                    <PawPrint className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{t.name}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Tutor(a) do {t.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VISITE A PET PAIOLA */}
      <section className="py-20 bg-zinc-50 dark:bg-[#090d16] border-t border-zinc-200/50 dark:border-zinc-800/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Visite a <span className="text-emerald-500">Pet Paiola</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
              Traga seu cãozinho para um momento relaxante e saia com ele cheiroso e feliz. Veja abaixo nossa localização e horários.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Info Column */}
            <div className="lg:col-span-5 bg-white dark:bg-[#131c2e] p-8 rounded-3xl border border-zinc-200/65 dark:border-zinc-850 shadow-xs flex flex-col justify-between space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shrink-0">
                  <img src="/logo.jpeg" alt="PET PAIOLA" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white uppercase leading-none">PET PAIOLA</h3>
                  <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider mt-1 block">Banho & Tosa</span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-zinc-650 dark:text-zinc-350">
                
                {/* Endereço */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider text-zinc-400">Endereço</h4>
                    <p className="mt-0.5 leading-relaxed">
                      Rua Inga, 328 — Jardim do Estádio<br />
                      Santo André - SP, CEP: 09175-050
                    </p>
                  </div>
                </div>

                {/* Funcionamento */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider text-zinc-400">Funcionamento</h4>
                    <p className="mt-0.5 leading-relaxed">
                      Terça a Sexta: 09h às 17h<br />
                      Sábado: 09h às 14h<br />
                      Segunda e Domingo: Fechado
                    </p>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider text-zinc-400">Telefone / WhatsApp</h4>
                    <a href="https://wa.me/5511968205116" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors font-semibold text-zinc-800 dark:text-zinc-250 mt-0.5 block">
                      (11) 96820-5116
                    </a>
                  </div>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://wa.me/5511968205116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  Falar no WhatsApp
                </a>
                <Link
                  href="/agendar"
                  className="flex-grow flex items-center justify-center gap-2 bg-zinc-900 dark:bg-emerald-500/10 hover:bg-zinc-800 dark:hover:bg-emerald-500/20 text-white dark:text-emerald-400 font-bold py-3 px-4 rounded-xl text-sm transition-all border border-zinc-800 dark:border-emerald-500/20"
                >
                  Agendar Agora
                </Link>
              </div>

            </div>

            {/* Map Column */}
            <div className="lg:col-span-7 bg-white dark:bg-[#131c2e] p-4 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 shadow-xs flex flex-col justify-between space-y-4">
              <div className="w-full h-80 lg:h-full min-h-[300px] rounded-2xl overflow-hidden border border-zinc-250 dark:border-zinc-800">
                <iframe
                  src="https://maps.google.com/maps?q=Rua%20Inga,%20328%20-%20Jardim%20do%20Est%C3%A1dio,%20Santo%20Andr%C3%A9%20-%20SP&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Localização Pet Paiola Principal"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
