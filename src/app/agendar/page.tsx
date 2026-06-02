'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, 
  User, 
  Heart, 
  Sparkles, 
  CreditCard, 
  CheckCircle2, 
  PawPrint,
  Clock,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { SERVICES, DAYS, TIMES, PAYMENT_METHODS } from '@/utils/constants';
import { addAppointment, isTimeSlotOccupied } from '@/utils/db';
import { DayOfWeek, PetPorte } from '@/types';

export default function Agendar() {
  // Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petPorte, setPetPorte] = useState<PetPorte>('Pequeno');
  
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | ''>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('pix');

  // Page State
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [busySlots, setBusySlots] = useState<{ [key: string]: boolean }>({});

  // Phone Mask
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 11) input = input.substring(0, 11);
    
    // Mask formatting
    let formatted = '';
    if (input.length > 0) {
      formatted = `(${input.substring(0, 2)}`;
      if (input.length > 2) {
        formatted += `) ${input.substring(2, 7)}`;
        if (input.length > 7) {
          formatted += `-${input.substring(7, 11)}`;
        }
      }
    }
    setClientPhone(formatted);
  };

  // Re-fetch busy slots when selectedDay changes
  useEffect(() => {
    if (selectedDay) {
      const slots: { [key: string]: boolean } = {};
      TIMES.forEach(time => {
        slots[time] = isTimeSlotOccupied(selectedDay as DayOfWeek, time);
      });
      setBusySlots(slots);
      // Reset selected time if it becomes busy
      if (selectedTime && slots[selectedTime]) {
        setSelectedTime('');
      }
    } else {
      setBusySlots({});
    }
  }, [selectedDay, selectedTime]);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Calculate values
  const totalValue = selectedServices.reduce((sum, serviceId) => {
    const service = SERVICES.find(s => s.id === serviceId);
    return sum + (service ? service.price : 0);
  }, 0);

  const getSelectedServicesObjects = () => {
    return SERVICES.filter(s => selectedServices.includes(s.id));
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!clientName.trim()) return setValidationError('Nome do cliente é obrigatório.');
    if (clientPhone.length < 14) return setValidationError('Telefone/WhatsApp inválido.');
    if (!petName.trim()) return setValidationError('Nome do cachorro é obrigatório.');
    if (!petBreed.trim()) return setValidationError('Raça do cachorro é obrigatória.');
    if (!petAge.trim()) return setValidationError('Idade do cachorro é obrigatória.');
    if (!selectedDay) return setValidationError('Selecione o dia da semana.');
    if (!selectedTime) return setValidationError('Selecione o horário desejado.');
    if (selectedServices.length === 0) return setValidationError('Selecione pelo menos um serviço.');
    if (!paymentMethod) return setValidationError('Selecione a forma de pagamento.');

    // Confirm slot is still free
    if (isTimeSlotOccupied(selectedDay as DayOfWeek, selectedTime)) {
      return setValidationError('Desculpe, este horário foi reservado recentemente. Escolha outro horário.');
    }

    setValidationError('');

    // Save to Database
    addAppointment({
      clientName,
      clientPhone,
      petName,
      petBreed,
      petAge,
      petPorte,
      day: selectedDay as DayOfWeek,
      time: selectedTime,
      services: selectedServices,
      totalValue,
      paymentMethod,
    });

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex-grow flex items-center justify-center py-16 px-4 bg-zinc-50 dark:bg-[#0b0f19] transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-[#131c2e] p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="mx-auto bg-emerald-100 dark:bg-emerald-500/10 p-4 rounded-full text-emerald-500 w-fit">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-950 dark:text-white">Agendamento Confirmado!</h2>
          
          <div className="bg-zinc-50 dark:bg-[#0b0f19] p-5 rounded-2xl border border-zinc-150 dark:border-zinc-800 text-left text-sm space-y-3">
            <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <span className="text-zinc-500">Cliente:</span>
              <span className="font-semibold">{clientName}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <span className="text-zinc-500">Cachorro:</span>
              <span className="font-semibold">{petName} ({petBreed})</span>
            </div>
            <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <span className="text-zinc-500">Dia e Hora:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedDay} às {selectedTime}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-zinc-500">Valor Total:</span>
              <span className="font-bold text-lg text-emerald-500">R$ {totalValue}</span>
            </div>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            "Agendamento confirmado com sucesso! A equipe Pet Paiola entrará em contato pelo WhatsApp."
          </p>

          <div className="pt-2">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-98"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-zinc-50 dark:bg-[#0b0f19] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <PawPrint className="w-3.5 h-3.5" />
            Rápido e Prático
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white">
            Agende um Horário
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Preencha os dados do tutor, do cãozinho, selecione os serviços desejados e garanta a vaga do seu pet!
          </p>
        </div>

        {validationError && (
          <div className="mb-8 max-w-3xl mx-auto bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 animate-shake">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold">{validationError}</span>
          </div>
        )}

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <form onSubmit={handleConfirm} className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Tutor & Pet Info */}
            <div className="bg-white dark:bg-[#131c2e] p-6 sm:p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-xl">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">1. Informações básicas</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tutor Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Nome do Tutor *</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">WhatsApp / Celular *</label>
                  <input
                    type="text"
                    required
                    placeholder="(11) 99999-9999"
                    value={clientPhone}
                    onChange={handlePhoneChange}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Pet Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Nome do Pet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nome do cãozinho"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                  />
                </div>

                {/* Breed */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Raça do Pet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Golden, Poodle, Vira-lata"
                    value={petBreed}
                    onChange={(e) => setPetBreed(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Idade do Pet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 2 anos"
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              {/* Porte */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">Porte do Cachorro *</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['Pequeno', 'Médio', 'Grande'] as PetPorte[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPetPorte(p)}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all text-center ${
                        petPorte === p
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-[#0b0f19] hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Step 2: Date & Time */}
            <div className="bg-white dark:bg-[#131c2e] p-6 sm:p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">2. Escolha o dia e horário</h3>
              </div>

              {/* Choose Day */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">Dia da Semana *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setSelectedDay(d);
                        setSelectedTime(''); // Reset time selection
                      }}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        selectedDay === d
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-[#0b0f19] hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Choose Time */}
              {selectedDay && (
                <div className="space-y-3 pt-2 animate-fadeIn">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">Horários Disponíveis *</label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    {TIMES.map((t) => {
                      const isBusy = busySlots[t];
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={isBusy}
                          onClick={() => setSelectedTime(t)}
                          className={`py-3.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                            isBusy
                              ? 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200/40 dark:border-zinc-800 text-zinc-350 dark:text-zinc-650 cursor-not-allowed line-through'
                              : selectedTime === t
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-xs'
                              : 'border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-[#0b0f19] hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <span className="flex flex-col items-center justify-center">
                            <span>{t}</span>
                            <span className="text-[9px] mt-0.5 font-normal">
                              {isBusy ? 'Ocupado' : 'Livre'}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Services & Payment */}
            <div className="bg-white dark:bg-[#131c2e] p-6 sm:p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 shadow-xs space-y-6">
              
              {/* Services Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-xl">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">3. Selecione os serviços (Vários permitidos)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map((s) => {
                    const isChecked = selectedServices.includes(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isChecked
                            ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                            : 'border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-[#0b0f19] hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60'
                        }`}
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{s.name}</h4>
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-xs">{s.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block font-black text-emerald-500 text-sm">R$ {s.price}</span>
                          <span className="block text-[10px] text-zinc-400 dark:text-zinc-500">{s.duration}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Selector */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-xl">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">4. Escolha a forma de pagamento</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {PAYMENT_METHODS.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setPaymentMethod(p.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer text-center space-y-1 ${
                        paymentMethod === p.id
                          ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                          : 'border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-[#0b0f19] hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{p.name}</h4>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </form>

          {/* Sticky Summary Side (Right) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white dark:bg-[#131c2e] p-6 sm:p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 shadow-md space-y-6">
              <h3 className="text-lg font-black text-zinc-950 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4">
                Resumo do Agendamento
              </h3>

              <div className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
                {/* Client Info */}
                {clientName && (
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Cliente</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{clientName}</span>
                    {clientPhone && <span className="block text-xs">{clientPhone}</span>}
                  </div>
                )}

                {/* Pet Info */}
                {petName && (
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Pet / Porte</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{petName}</span>
                    <span className="text-xs block">Raça: {petBreed || '-'} | Porte: {petPorte}</span>
                  </div>
                )}

                {/* Date / Time */}
                {selectedDay && (
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Data & Horário</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {selectedDay} às {selectedTime || 'Escolha o horário'}
                    </span>
                  </div>
                )}

                {/* Services */}
                {selectedServices.length > 0 && (
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1">Serviços Selecionados</span>
                    <ul className="space-y-1">
                      {getSelectedServicesObjects().map(s => (
                        <li key={s.id} className="flex justify-between items-center text-xs text-zinc-700 dark:text-zinc-300">
                          <span>• {s.name}</span>
                          <span className="font-semibold text-zinc-850 dark:text-zinc-250">R$ {s.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Payment Method */}
                <div>
                  <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Forma de Pagamento</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase text-xs">
                    {PAYMENT_METHODS.find(p => p.id === paymentMethod)?.name}
                  </span>
                </div>
              </div>

              {/* Total Block */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex justify-between items-center">
                <div>
                  <span className="block text-xs text-zinc-400">Total Previsto:</span>
                  <span className="text-2xl font-black text-emerald-500">R$ {totalValue}</span>
                </div>
                <span className="text-[10px] text-zinc-450 text-right bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-md font-semibold">
                  Sem taxas extras
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 text-base"
              >
                Confirmar Agendamento
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
