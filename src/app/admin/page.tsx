'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  Lock,
  LogOut,
  ChevronRight,
  PawPrint,
  Clock,
  Sparkles,
  AlertCircle,
  Plus
} from 'lucide-react';
import { getAppointments, updateAppointment, deleteAppointment } from '@/utils/db';
import { SERVICES, DAYS, TIMES, PAYMENT_METHODS } from '@/utils/constants';
import { Appointment, DayOfWeek, PetPorte, AppointmentStatus, PaymentStatus } from '@/types';

export default function AdminPanel() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agenda' | 'agendamentos'>('dashboard');

  // Database State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);

  // Filters for manage appointments tab
  const [filterDay, setFilterDay] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterClient, setFilterClient] = useState<string>('');

  // Editing Modal State
  const [editingApp, setEditingApp] = useState<Appointment | null>(null);
  const [editClientName, setEditClientName] = useState('');
  const [editClientPhone, setEditClientPhone] = useState('');
  const [editPetName, setEditPetName] = useState('');
  const [editPetBreed, setEditPetBreed] = useState('');
  const [editPetAge, setEditPetAge] = useState('');
  const [editPetPorte, setEditPetPorte] = useState<PetPorte>('Pequeno');
  const [editDay, setEditDay] = useState<DayOfWeek>('Segunda');
  const [editTime, setEditTime] = useState('');
  const [editServices, setEditServices] = useState<string[]>([]);
  const [editPayment, setEditPayment] = useState('');
  const [editStatus, setEditStatus] = useState<AppointmentStatus>('Pendente');
  const [editPaymentStatus, setEditPaymentStatus] = useState<PaymentStatus>('Pendente');

  // Fetch appointments on load and when logged in
  useEffect(() => {
    // Session persistent login check
    const isLogged = sessionStorage.getItem('pet_paiola_logged') === 'true';
    if (isLogged) {
      setIsLoggedIn(true);
    }
    setAppointments(getAppointments());
  }, []);

  const refreshData = () => {
    setAppointments(getAppointments());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      sessionStorage.setItem('pet_paiola_logged', 'true');
      setLoginError('');
    } else {
      setLoginError('Usuário ou senha inválidos.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('pet_paiola_logged');
  };

  // Toast helper
  const showToast = (message: string, type: 'success' | 'danger' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Update Status
  const handleStatusChange = (app: Appointment, newStatus: AppointmentStatus) => {
    const updated = { ...app, status: newStatus };
    updateAppointment(updated);
    refreshData();
    showToast(`Agendamento de ${app.clientName} marcado como ${newStatus.toLowerCase()}.`);
  };

  // Update Payment Status
  const handlePaymentStatusChange = (app: Appointment, newPaymentStatus: PaymentStatus) => {
    const updated = { ...app, paymentStatus: newPaymentStatus };
    updateAppointment(updated);
    refreshData();
    showToast(`Status de pagamento de ${app.clientName} alterado para ${newPaymentStatus}.`);
  };

  // Delete Appointment
  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir permanentemente este agendamento?')) {
      deleteAppointment(id);
      refreshData();
      showToast('Agendamento excluído com sucesso.', 'danger');
    }
  };

  // Edit Modal triggers
  const openEditModal = (app: Appointment) => {
    setEditingApp(app);
    setEditClientName(app.clientName);
    setEditClientPhone(app.clientPhone);
    setEditPetName(app.petName);
    setEditPetBreed(app.petBreed);
    setEditPetAge(app.petAge);
    setEditPetPorte(app.petPorte);
    setEditDay(app.day);
    setEditTime(app.time);
    setEditServices(app.services);
    setEditPayment(app.paymentMethod);
    setEditStatus(app.status);
    setEditPaymentStatus(app.paymentStatus || 'Pendente');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    // Check total
    const total = editServices.reduce((sum, serviceId) => {
      const service = SERVICES.find(s => s.id === serviceId);
      return sum + (service ? service.price : 0);
    }, 0);

    const updated: Appointment = {
      ...editingApp,
      clientName: editClientName,
      clientPhone: editClientPhone,
      petName: editPetName,
      petBreed: editPetBreed,
      petAge: editPetAge,
      petPorte: editPetPorte,
      day: editDay,
      time: editTime,
      services: editServices,
      paymentMethod: editPayment,
      totalValue: total,
      status: editStatus,
      paymentStatus: editPaymentStatus
    };

    updateAppointment(updated);
    setEditingApp(null);
    refreshData();
    showToast('Agendamento atualizado com sucesso!');
  };

  const toggleEditService = (serviceId: string) => {
    if (editServices.includes(serviceId)) {
      setEditServices(editServices.filter(id => id !== serviceId));
    } else {
      setEditServices([...editServices, serviceId]);
    }
  };

  // Dashboard Stats calculations
  const totalAgendamentos = appointments.length;
  
  const faturamentoPrevisto = appointments
    .filter(a => a.status !== 'Cancelado')
    .reduce((sum, a) => sum + a.totalValue, 0);
  
  const totalClientes = Array.from(new Set(appointments.map(a => a.clientPhone))).length;

  // Services sold count
  const serviceStats: { [key: string]: { name: string; count: number } } = {};
  SERVICES.forEach(s => {
    serviceStats[s.id] = { name: s.name, count: 0 };
  });
  appointments.forEach(a => {
    if (a.status !== 'Cancelado') {
      a.services.forEach(sId => {
        if (serviceStats[sId]) {
          serviceStats[sId].count += 1;
        }
      });
    }
  });
  const mostSoldServices = Object.values(serviceStats).sort((a, b) => b.count - a.count);

  // Filtered Appointments list
  const filteredAppointments = appointments.filter(a => {
    const matchesDay = filterDay === '' || a.day === filterDay;
    const matchesStatus = filterStatus === '' || a.status === filterStatus;
    const matchesClient = filterClient === '' || 
      a.clientName.toLowerCase().includes(filterClient.toLowerCase()) || 
      a.petName.toLowerCase().includes(filterClient.toLowerCase());
    return matchesDay && matchesStatus && matchesClient;
  }).sort((a, b) => {
    // Sort by status pending first, then by day/time (rough sort)
    if (a.status === 'Pendente' && b.status !== 'Pendente') return -1;
    if (a.status !== 'Pendente' && b.status === 'Pendente') return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Next Appointments (Pendente status)
  const nextAppointments = appointments
    .filter(a => a.status === 'Pendente')
    .slice(0, 5);

  // Agenda Semanal Stats
  const getDayAppCount = (day: DayOfWeek) => {
    return appointments.filter(a => a.day === day && a.status !== 'Cancelado').length;
  };

  const getSlotDetails = (day: DayOfWeek, time: string) => {
    const app = appointments.find(a => a.day === day && a.time === time && a.status !== 'Cancelado');
    return app;
  };

  // Login Screen Render
  if (!isLoggedIn) {
    return (
      <div className="flex-grow flex items-center justify-center bg-zinc-50 dark:bg-[#0b0f19] py-20 px-4 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-[#131c2e] p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto bg-emerald-500/10 text-emerald-500 p-3 rounded-2xl w-fit">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-950 dark:text-white">Acesso Restrito</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Entre com as credenciais administrativas para gerenciar o pet shop.</p>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Usuário</label>
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-55 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Senha</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-55 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-emerald-500/10 text-zinc-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-98"
            >
              Entrar no Painel
            </button>
          </form>
          
          <div className="text-center pt-2">
            <span className="text-xs text-zinc-400">Dica: admin / admin123</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-zinc-50 dark:bg-[#0b0f19] transition-colors duration-300 min-h-screen">
      
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-55 px-6 py-4 rounded-xl shadow-lg border flex items-center gap-3 animate-slideIn ${
          toast.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400'
        }`}>
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Top Banner Control */}
      <div className="bg-white dark:bg-[#131c2e] border-b border-zinc-200 dark:border-zinc-800 py-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 text-white p-2.5 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-zinc-950 dark:text-white">Painel Administrativo</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Controle de agendamentos e faturamento</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Tabs Selector */}
            <div className="bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-xl flex gap-1 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex-grow sm:flex-grow-0 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-white dark:bg-[#131c2e] text-emerald-500 dark:text-emerald-400 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('agenda')}
                className={`flex-grow sm:flex-grow-0 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'agenda'
                    ? 'bg-white dark:bg-[#131c2e] text-emerald-500 dark:text-emerald-400 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white'
                }`}
              >
                Agenda Semanal
              </button>
              <button
                onClick={() => setActiveTab('agendamentos')}
                className={`flex-grow sm:flex-grow-0 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'agendamentos'
                    ? 'bg-white dark:bg-[#131c2e] text-emerald-500 dark:text-emerald-400 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white'
                }`}
              >
                Gerenciar
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
              title="Sair do painel"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ==================== TAB 1: DASHBOARD OVERVIEW ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Total Appointments */}
              <div className="bg-white dark:bg-[#131c2e] p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total de Agendamentos</span>
                  <span className="block text-3xl font-black text-zinc-950 dark:text-white">{totalAgendamentos}</span>
                </div>
                <div className="bg-emerald-500/10 text-emerald-500 p-3 rounded-2xl">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

              {/* Faturamento Previsto */}
              <div className="bg-white dark:bg-[#131c2e] p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Faturamento Previsto</span>
                  <span className="block text-3xl font-black text-emerald-500">R$ {faturamentoPrevisto}</span>
                </div>
                <div className="bg-yellow-500/10 text-yellow-500 p-3 rounded-2xl">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              {/* Registered Clients */}
              <div className="bg-white dark:bg-[#131c2e] p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Clientes Atendidos</span>
                  <span className="block text-3xl font-black text-zinc-950 dark:text-white">{totalClientes}</span>
                </div>
                <div className="bg-purple-500/10 text-purple-500 p-3 rounded-2xl">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              {/* Status Indicator */}
              <div className="bg-white dark:bg-[#131c2e] p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Atendimentos Pendentes</span>
                  <span className="block text-3xl font-black text-yellow-500">
                    {appointments.filter(a => a.status === 'Pendente').length}
                  </span>
                </div>
                <div className="bg-blue-500/10 text-blue-500 p-3 rounded-2xl">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Split dashboard body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Next Appointments List (Left) */}
              <div className="lg:col-span-7 bg-white dark:bg-[#131c2e] p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 space-y-6 shadow-xs">
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-850 pb-4">
                  <h3 className="font-black text-lg text-zinc-950 dark:text-white">Próximos Atendimentos</h3>
                  <button 
                    onClick={() => setActiveTab('agendamentos')} 
                    className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1"
                  >
                    Ver todos <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {nextAppointments.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500">
                    Nenhum atendimento pendente na fila!
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-850">
                    {nextAppointments.map(app => (
                      <div key={app.id} className="py-4 flex justify-between items-center gap-4">
                        <div className="space-y-1">
                          <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{app.petName} ({app.petBreed})</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Tutor: {app.clientName} | {app.clientPhone}
                          </p>
                          <div className="flex gap-2 pt-1.5">
                            {app.services.map(sId => (
                              <span key={sId} className="bg-zinc-100 dark:bg-zinc-800 text-[10px] px-2 py-0.5 rounded-md text-zinc-500">
                                {SERVICES.find(s => s.id === sId)?.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="block text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md text-center">
                            {app.day} — {app.time}
                          </span>
                          <span className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mt-1">
                            R$ {app.totalValue}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top Services Sold (Right) */}
              <div className="lg:col-span-5 bg-white dark:bg-[#131c2e] p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 space-y-6 shadow-xs">
                <div className="border-b border-zinc-100 dark:border-zinc-850 pb-4">
                  <h3 className="font-black text-lg text-zinc-950 dark:text-white">Serviços Mais Procurados</h3>
                </div>

                <div className="space-y-4">
                  {mostSoldServices.map((service, index) => {
                    const maxCount = Math.max(...mostSoldServices.map(s => s.count)) || 1;
                    const percent = Math.round((service.count / maxCount) * 100);
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-zinc-850 dark:text-zinc-200">{service.name}</span>
                          <span className="text-emerald-500">{service.count} {service.count === 1 ? 'venda' : 'vendas'}</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 2: AGENDA SEMANAL ==================== */}
        {activeTab === 'agenda' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Daily Summaries cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {DAYS.map(day => {
                const count = getDayAppCount(day);
                return (
                  <div key={day} className="bg-white dark:bg-[#131c2e] p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/40 text-center">
                    <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">{day}</span>
                    <span className="block text-xl font-black text-zinc-950 dark:text-white mt-1">{count}</span>
                    <span className="text-[10px] text-zinc-550 dark:text-zinc-450 block">Agendamentos</span>
                  </div>
                );
              })}
            </div>

            {/* Weekly Calendar Grid */}
            <div className="bg-white dark:bg-[#131c2e] rounded-3xl border border-zinc-200/55 dark:border-zinc-800/40 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse text-left text-sm text-zinc-500 dark:text-zinc-400">
                  <thead className="bg-zinc-50 dark:bg-[#0c1221] text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider border-b border-zinc-250 dark:border-zinc-800">
                    <tr>
                      <th className="py-4 px-6 font-extrabold w-28 text-center">Horário</th>
                      {DAYS.map(day => (
                        <th key={day} className="py-4 px-4 text-center">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-250 dark:divide-zinc-800">
                    {TIMES.map(time => (
                      <tr key={time} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-800/10">
                        {/* Time Row Label */}
                        <td className="py-4 px-6 text-center font-bold text-zinc-900 dark:text-white bg-zinc-50/50 dark:bg-[#0c1221]/30 border-r border-zinc-250 dark:border-zinc-800">
                          {time}
                        </td>
                        
                        {/* Time Slots for each Day */}
                        {DAYS.map(day => {
                          const isSaturdayClosedSlot = day === 'Sábado' && (time === '14:00' || time === '15:00' || time === '16:00');
                          const app = getSlotDetails(day, time);
                          
                          if (isSaturdayClosedSlot) {
                            return (
                              <td key={day} className="p-3 text-center bg-zinc-50 dark:bg-zinc-900/30 text-zinc-350 dark:text-zinc-650 text-xs font-semibold">
                                Fechado
                              </td>
                            );
                          }
                          
                          return (
                            <td key={day} className="p-3 text-center">
                              {app ? (
                                <div 
                                  onClick={() => openEditModal(app)}
                                  className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all hover:scale-[1.02] ${
                                    app.status === 'Concluído'
                                      ? 'bg-zinc-100 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-750 text-zinc-500 dark:text-zinc-400'
                                      : 'bg-emerald-500/15 dark:bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:border-emerald-500'
                                  }`}
                                  title={`Ver detalhes do atendimento de ${app.petName}`}
                                >
                                  <div className="font-extrabold truncate">{app.petName}</div>
                                  <div className="text-[10px] text-zinc-450 dark:text-zinc-500 truncate">{app.clientName}</div>
                                  <span className={`inline-block text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md mt-1 ${
                                    app.status === 'Concluído'
                                      ? 'bg-zinc-200/50 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400'
                                      : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                  }`}>
                                    {app.status}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-zinc-300 dark:text-zinc-750 font-medium text-xs">
                                  Livre
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 3: GERENCIAR AGENDAMENTOS ==================== */}
        {activeTab === 'agendamentos' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Search and Filters Block */}
            <div className="bg-white dark:bg-[#131c2e] p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Client/Pet search input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Pesquisar cliente ou pet..."
                  value={filterClient}
                  onChange={(e) => setFilterClient(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl pl-11 pr-4 py-3 text-xs outline-hidden focus:ring-2 focus:ring-emerald-500/10 text-zinc-900 dark:text-white"
                />
              </div>

              {/* Filter Selects */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                
                {/* Day Filter */}
                <div className="relative w-full sm:w-40">
                  <Filter className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-zinc-400" />
                  <select
                    value={filterDay}
                    onChange={(e) => setFilterDay(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl pl-9 pr-4 py-3 text-xs outline-hidden focus:ring-2 focus:ring-emerald-500/10 text-zinc-900 dark:text-white appearance-none"
                  >
                    <option value="">Filtrar Dia</option>
                    {DAYS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="relative w-full sm:w-40">
                  <Filter className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-zinc-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl pl-9 pr-4 py-3 text-xs outline-hidden focus:ring-2 focus:ring-emerald-500/10 text-zinc-900 dark:text-white appearance-none"
                  >
                    <option value="">Filtrar Status</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Appointments List */}
            {filteredAppointments.length === 0 ? (
              <div className="bg-white dark:bg-[#131c2e] p-12 text-center rounded-3xl border border-zinc-200/50 dark:border-zinc-800/40 text-zinc-500">
                Nenhum agendamento encontrado para os filtros selecionados.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAppointments.map(app => (
                  <div 
                    key={app.id} 
                    className={`bg-white dark:bg-[#131c2e] p-6 rounded-3xl border shadow-xs flex flex-col justify-between transition-all ${
                      app.status === 'Cancelado' 
                        ? 'border-red-500/20 bg-red-500/[0.01]' 
                        : app.status === 'Concluído'
                        ? 'border-zinc-200 dark:border-zinc-850'
                        : 'border-emerald-500/20'
                    }`}
                  >
                    
                    {/* App Header */}
                    <div className="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-850 pb-4">
                      <div>
                        <h4 className="font-extrabold text-zinc-900 dark:text-white text-base">
                          {app.petName} ({app.petBreed})
                        </h4>
                        <span className="block text-xs text-zinc-400 dark:text-zinc-500">
                          Porte: {app.petPorte} | Idade: {app.petAge}
                        </span>
                      </div>
                      
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'Concluído'
                          ? 'bg-zinc-100 dark:bg-zinc-850 text-zinc-500'
                          : app.status === 'Cancelado'
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    {/* App Body Details */}
                    <div className="py-4 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Cliente/Tutor:</span>
                        <span className="font-semibold text-zinc-850 dark:text-zinc-200">{app.clientName} ({app.clientPhone})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Dia e Horário:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{app.day} às {app.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Pagamento:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-850 dark:text-zinc-200 uppercase">
                            {PAYMENT_METHODS.find(p => p.id === app.paymentMethod)?.name}
                          </span>
                          <select
                            value={app.paymentStatus || 'Pendente'}
                            onChange={(e) => handlePaymentStatusChange(app, e.target.value as PaymentStatus)}
                            className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase outline-hidden cursor-pointer border-0 ${
                              app.paymentStatus === 'Pago'
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                : app.paymentStatus === 'Cancelado'
                                ? 'bg-red-500/10 text-red-500'
                                : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-450'
                            }`}
                          >
                            <option value="Pendente" className="bg-white dark:bg-[#131c2e] text-yellow-600 dark:text-yellow-450">Pendente</option>
                            <option value="Pago" className="bg-white dark:bg-[#131c2e] text-emerald-600 dark:text-emerald-400">Pago</option>
                            <option value="Cancelado" className="bg-white dark:bg-[#131c2e] text-red-500">Cancelado</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col pt-1">
                        <span className="text-zinc-400 mb-1">Serviços:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {app.services.map(sId => (
                            <span key={sId} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 px-2 py-0.5 rounded-md text-[10px] font-medium text-zinc-650 dark:text-zinc-350">
                              {SERVICES.find(s => s.id === sId)?.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* App Footer Control Buttons */}
                    <div className="border-t border-zinc-100 dark:border-zinc-850 pt-4 flex items-center justify-between gap-4">
                      
                      {/* Price indicator */}
                      <div>
                        <span className="block text-[9px] text-zinc-400 uppercase">Preço Total</span>
                        <span className="text-base font-black text-emerald-500">R$ {app.totalValue}</span>
                      </div>

                      {/* Administrative Actions */}
                      <div className="flex items-center gap-2">
                        
                        {/* Mark Done */}
                        {app.status === 'Pendente' && (
                          <button
                            onClick={() => handleStatusChange(app, 'Concluído')}
                            className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                            title="Marcar como Concluído"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Cancel App */}
                        {app.status === 'Pendente' && (
                          <button
                            onClick={() => handleStatusChange(app, 'Cancelado')}
                            className="p-2 rounded-lg bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500 hover:text-white transition-all"
                            title="Cancelar Agendamento"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Edit modal */}
                        <button
                          onClick={() => openEditModal(app)}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-550 dark:text-blue-450 hover:bg-blue-550 hover:text-white transition-all"
                          title="Editar Agendamento"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Delete App */}
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          title="Excluir Permanente"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* ==================== EDIT APPOINTMENT MODAL ==================== */}
      {editingApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full bg-white dark:bg-[#131c2e] rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-zinc-150 dark:border-zinc-800 pb-4">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Editar Agendamento</h3>
              <button 
                onClick={() => setEditingApp(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white text-sm font-bold bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1.5 transition-colors"
              >
                Fechar
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleEditSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Nome do Tutor</label>
                  <input
                    type="text"
                    required
                    value={editClientName}
                    onChange={(e) => setEditClientName(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs outline-hidden"
                  />
                </div>

                {/* Client Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">WhatsApp / Celular</label>
                  <input
                    type="text"
                    required
                    value={editClientPhone}
                    onChange={(e) => setEditClientPhone(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Pet Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Nome do Pet</label>
                  <input
                    type="text"
                    required
                    value={editPetName}
                    onChange={(e) => setEditPetName(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs outline-hidden"
                  />
                </div>

                {/* Pet Breed */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Raça</label>
                  <input
                    type="text"
                    required
                    value={editPetBreed}
                    onChange={(e) => setEditPetBreed(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs outline-hidden"
                  />
                </div>

                {/* Pet Age */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Idade</label>
                  <input
                    type="text"
                    required
                    value={editPetAge}
                    onChange={(e) => setEditPetAge(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs outline-hidden"
                  />
                </div>
              </div>

              {/* Porte selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Porte</label>
                <div className="flex gap-4">
                  {(['Pequeno', 'Médio', 'Grande'] as PetPorte[]).map(porte => (
                    <button
                      key={porte}
                      type="button"
                      onClick={() => setEditPetPorte(porte)}
                      className={`flex-grow py-2 rounded-lg text-xs font-bold border transition-all ${
                        editPetPorte === porte
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                          : 'border-zinc-200 dark:border-zinc-850'
                      }`}
                    >
                      {porte}
                    </button>
                  ))}
                </div>
              </div>

              {/* Day / Time Select */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Dia da Semana</label>
                  <select
                    value={editDay}
                    onChange={(e) => setEditDay(e.target.value as DayOfWeek)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-white"
                  >
                    {DAYS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Horário</label>
                  <select
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-white"
                  >
                    {TIMES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Services choice */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Serviços</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES.map(s => {
                    const isChecked = editServices.includes(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleEditService(s.id)}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all text-xs flex justify-between items-center ${
                          isChecked
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold'
                            : 'border-zinc-200 dark:border-zinc-850'
                        }`}
                      >
                        <span className="truncate">{s.name}</span>
                        <span className="shrink-0 ml-1.5 font-bold">R$ {s.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment / Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Forma de Pagamento</label>
                  <select
                    value={editPayment}
                    onChange={(e) => setEditPayment(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-white"
                  >
                    {PAYMENT_METHODS.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Status do Agendamento</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as AppointmentStatus)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-white"
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Status do Pagamento</label>
                  <select
                    value={editPaymentStatus}
                    onChange={(e) => setEditPaymentStatus(e.target.value as any)}
                    className="w-full bg-zinc-50 dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-850 rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-white"
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Pago">Pago</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              {/* Save trigger */}
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-98"
              >
                Salvar Alterações
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
