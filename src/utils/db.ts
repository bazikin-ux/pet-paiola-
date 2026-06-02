import { Appointment, DayOfWeek } from '@/types';

const STORAGE_KEY = 'pet_paiola_appointments';

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    clientName: 'João Silva',
    clientPhone: '(11) 98888-7777',
    petName: 'Bob',
    petBreed: 'Golden Retriever',
    petAge: '3',
    petPorte: 'Grande',
    day: 'Terça',
    time: '09:00',
    services: ['1', '4'], // Banho simples + Corte de unhas
    totalValue: 118,
    paymentMethod: 'pix',
    status: 'Concluído',
    paymentStatus: 'Pago',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    clientName: 'Maria Souza',
    clientPhone: '(11) 97777-6666',
    petName: 'Mel',
    petBreed: 'Shih Tzu',
    petAge: '2',
    petPorte: 'Pequeno',
    day: 'Terça',
    time: '13:00',
    services: ['2', '5'], // Banho e tosa + Hidratação
    totalValue: 198,
    paymentMethod: 'credito',
    status: 'Pendente',
    paymentStatus: 'Pendente',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: '3',
    clientName: 'Pedro Santos',
    clientPhone: '(11) 96666-5555',
    petName: 'Thor',
    petBreed: 'Bulldog Francês',
    petAge: '5',
    petPorte: 'Médio',
    day: 'Quarta',
    time: '10:00',
    services: ['1', '6'], // Banho simples + Limpeza de ouvido
    totalValue: 114,
    paymentMethod: 'debito',
    status: 'Pendente',
    paymentStatus: 'Pendente',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    clientName: 'Ana Oliveira',
    clientPhone: '(11) 95555-4444',
    petName: 'Luna',
    petBreed: 'Poodle',
    petAge: '1',
    petPorte: 'Pequeno',
    day: 'Sexta',
    time: '15:00',
    services: ['2', '7'], // Banho e tosa + Escovação de dentes
    totalValue: 188,
    paymentMethod: 'pix',
    status: 'Pendente',
    paymentStatus: 'Pendente',
    createdAt: new Date().toISOString(),
  }
];

export const getAppointments = (): Appointment[] => {
  if (typeof window === 'undefined') return MOCK_APPOINTMENTS;
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_APPOINTMENTS));
    return MOCK_APPOINTMENTS;
  }
  
  try {
    const list = JSON.parse(data);
    // Backwards compatibility migration for missing paymentStatus field
    return list.map((a: any) => ({
      ...a,
      paymentStatus: a.paymentStatus || (a.status === 'Concluído' ? 'Pago' : 'Pendente')
    }));
  } catch (error) {
    console.error('Failed to parse appointments from localStorage:', error);
    return MOCK_APPOINTMENTS;
  }
};

export const saveAppointments = (appointments: Appointment[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

export const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'paymentStatus'>): Appointment => {
  const appointments = getAppointments();
  const newAppointment: Appointment = {
    ...appointment,
    id: Math.random().toString(36).substring(2, 9),
    status: 'Pendente',
    paymentStatus: 'Pendente',
    createdAt: new Date().toISOString(),
  };
  
  appointments.push(newAppointment);
  saveAppointments(appointments);
  return newAppointment;
};

export const updateAppointment = (updated: Appointment): void => {
  const appointments = getAppointments();
  const index = appointments.findIndex(a => a.id === updated.id);
  if (index !== -1) {
    appointments[index] = updated;
    saveAppointments(appointments);
  }
};

export const deleteAppointment = (id: string): void => {
  const appointments = getAppointments();
  const filtered = appointments.filter(a => a.id !== id);
  saveAppointments(filtered);
};

export const isTimeSlotOccupied = (day: DayOfWeek, time: string, excludeAppointmentId?: string): boolean => {
  const appointments = getAppointments();
  return appointments.some(a => 
    a.day === day && 
    a.time === time && 
    a.status !== 'Cancelado' &&
    a.id !== excludeAppointmentId
  );
};
