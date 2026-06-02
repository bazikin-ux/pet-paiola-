export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export type PetPorte = 'Pequeno' | 'Médio' | 'Grande';

export type DayOfWeek = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado';

export type AppointmentStatus = 'Pendente' | 'Concluído' | 'Cancelado';

export type PaymentStatus = 'Pendente' | 'Pago' | 'Cancelado';

export interface Client {
  name: string;
  phone: string;
}

export interface Pet {
  name: string;
  breed: string;
  age: string;
  porte: PetPorte;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  petName: string;
  petBreed: string;
  petAge: string;
  petPorte: PetPorte;
  day: DayOfWeek;
  time: string;
  services: string[]; // ids of services
  totalValue: number;
  paymentMethod: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface WeeklySchedule {
  day: DayOfWeek;
  time: string;
  appointmentId?: string;
  clientName?: string;
  petName?: string;
}
