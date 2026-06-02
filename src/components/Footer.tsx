import Link from 'next/link';
import { PawPrint, Phone, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-[#080c14] border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-emerald-500 p-2 rounded-xl text-white">
                <PawPrint className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-white">
                Pet <span className="text-emerald-500">Paiola</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              “Cuidado, carinho e banho para seu melhor amigo”
            </p>
            <div className="flex space-x-3 text-xs text-zinc-400 dark:text-zinc-500">
              <span>CNPJ: 12.345.678/0001-99</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-500" />
              Funcionamento
            </h3>
            <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <li>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Segunda a Sexta:</span>
                <br />
                08h às 12h — 13h às 18h
              </li>
              <li>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Sábado:</span>
                <br />
                08h às 12h — 13h às 17h
              </li>
              <li className="text-yellow-500 dark:text-yellow-400 font-medium">
                Domingos e Feriados: Fechado
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
                  Av. Principal dos Pets, 1500 — Bairro Jardim Feliz<br />
                  São Paulo - SP, CEP 01234-567
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 transition-colors font-medium text-zinc-700 dark:text-zinc-300"
                >
                  (11) 99999-9999 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
          <p>&copy; {currentYear} Pet Paiola. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Desenvolvido com <Heart className="h-3 w-3 text-red-500 fill-red-500" /> para o seu melhor amigo.
          </p>
        </div>
      </div>
    </footer>
  );
}
