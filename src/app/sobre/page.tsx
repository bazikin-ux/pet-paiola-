'use client';

import Link from 'next/link';
import { Heart, Sparkles, Shield, Trophy } from 'lucide-react';

export default function Sobre() {
  const stats = [
    { value: '5+', label: 'Anos de história' },
    { value: '10k+', label: 'Banhos realizados' },
    { value: '4.9', label: 'Nota média Google' },
    { value: '8+', label: 'Especialistas na equipe' },
  ];

  return (
    <div className="flex flex-col min-h-screen py-12 md:py-20 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Conheça Nossa História
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white">
            Sobre a Pet <span className="text-emerald-500">Paiola</span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Mais do que um pet shop: somos um espaço de carinho, saúde e bem-estar para o seu cãozinho.
          </p>
        </div>

        {/* Story Section */}
        <div className="space-y-12 text-zinc-650 dark:text-zinc-350">
          
          <div className="bg-zinc-50 dark:bg-[#131c2e] p-8 md:p-12 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
              <h2 className="text-2xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <Heart className="text-emerald-500" /> Como tudo começou
              </h2>
              <p className="text-sm leading-relaxed text-zinc-550 dark:text-zinc-400">
                A Pet Paiola nasceu do sonho de criar um espaço onde os cães se sentissem em casa, em um ambiente tranquilo e amoroso. Sentíamos falta de um pet shop focado no bem-estar emocional do animal, e não apenas na limpeza.
              </p>
              <p className="text-sm leading-relaxed text-zinc-550 dark:text-zinc-400">
                Começamos pequenos, mas com dedicação, produtos premium e foco absoluto na segurança, logo conquistamos a confiança dos tutores de Santo André e região.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-emerald-500 shadow-xl animate-float">
                <img 
                  src="/logo.jpeg" 
                  alt="Pet Paiola Logo Oficial" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-zinc-50 dark:bg-[#131c2e] p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/40 text-center space-y-1">
                <span className="block text-3xl font-black text-emerald-500">{s.value}</span>
                <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-50 dark:bg-[#131c2e] p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 space-y-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl w-fit">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Nossa Missão</h3>
              <p className="text-sm leading-relaxed">
                Proporcionar serviços de banho, tosa e bem-estar canino com o mais alto padrão de qualidade e segurança, promovendo uma vida mais saudável e feliz para os cães e tranquilidade total para seus tutores.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-[#131c2e] p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 space-y-4">
              <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl w-fit">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Nossa Visão</h3>
              <p className="text-sm leading-relaxed">
                Ser reconhecida como a marca de referência em excelência de estética e saúde canina em Santo André, mantendo sempre o atendimento humanizado e individualizado de cada cliente de quatro patas.
              </p>
            </div>
          </div>

          {/* Localização / Endereço */}
          <div className="bg-zinc-50 dark:bg-[#131c2e] p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 space-y-4">
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              📍 Onde Estamos
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Venha conhecer nosso espaço físico! Temos uma infraestrutura completa e segura para receber o seu melhor amigo.
            </p>
            <div className="text-sm text-zinc-800 dark:text-zinc-250 font-semibold bg-white dark:bg-[#0b0f19] p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 leading-relaxed shadow-2xs">
              <span className="text-emerald-500 font-bold block mb-1">Endereço Oficial:</span>
              Rua Inga, 328 — Jardim do Estádio<br />
              Santo André - SP, CEP: 09175-050 — Brasil
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center pt-8">
            <h3 className="text-2xl font-bold text-zinc-950 dark:text-white mb-4">Que tal dar um trato no visual do seu melhor amigo?</h3>
            <Link
              href="/agendar"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Agendar Banho / Tosa
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
