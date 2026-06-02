import Link from 'next/link';
import { Phone, MapPin, Clock, Heart, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-[#080c14] border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                <img 
                  src="/logo.jpeg" 
                  alt="Pet Paiola Logo" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-zinc-900 dark:text-white leading-none">
                  PET PAIOLA
                </span>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mt-0.5">
                  Banho & Tosa
                </span>
              </div>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              O melhor cuidado para o seu melhor amigo. Higiene, tosa e tratamentos especiais em Santo André.
            </p>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-500" />
              Funcionamento
            </h3>
            <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <li>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Terça a Sexta:</span>
                <br />
                09:00 às 17:00
              </li>
              <li>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Sábado:</span>
                <br />
                09:00 às 14:00
              </li>
              <li className="text-yellow-500 dark:text-yellow-400 font-medium text-xs">
                Segunda e Domingo: Fechado
              </li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-500" />
              Localização & Contato
            </h3>
            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Rua Inga, 328 — Jardim do Estádio<br />
                  Santo André - SP, CEP 09175-050
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                <a 
                  href="https://wa.me/5511968205116" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 transition-colors font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  (11) 96820-5116 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
                <a 
                  href="mailto:aelgviana3@gmail.com" 
                  className="hover:text-emerald-500 transition-colors text-zinc-700 dark:text-zinc-300"
                >
                  aelgviana3@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
          <p>&copy; {currentYear} PET PAIOLA BANHO & TOSA. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Desenvolvido com <Heart className="h-3 w-3 text-red-500 fill-red-500" /> para o seu pet.
          </p>
        </div>
      </div>
    </footer>
  );
}
