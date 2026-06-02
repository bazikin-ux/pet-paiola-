/**
 * SUPABASE INTEGRATION TEMPLATE
 * 
 * Este arquivo serve como base para migrar o banco de dados do localStorage para o Supabase.
 * Para ativar, você precisará instalar a dependência:
 * npm install @supabase/supabase-js
 * 
 * E configurar as variáveis de ambiente no arquivo `.env.local`:
 * NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
 * NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
 */

/*
import { createClient } from '@supabase/supabase-js';
import { Appointment } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// EXEMPLOS DE FUNÇÕES PARA SUBSTITUIR AS OPERAÇÕES DO LOCALSTORAGE:

// 1. Obter todos os agendamentos
export const getAppointmentsSupabase = async (): Promise<Appointment[]> => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return [];
  }
  return data as Appointment[];
};

// 2. Adicionar um agendamento
export const addAppointmentSupabase = async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert([
      {
        client_name: appointment.clientName,
        client_phone: appointment.clientPhone,
        pet_name: appointment.petName,
        pet_breed: appointment.petBreed,
        pet_age: appointment.petAge,
        pet_porte: appointment.petPorte,
        day: appointment.day,
        time: appointment.time,
        services: appointment.services,
        total_value: appointment.totalValue,
        payment_method: appointment.paymentMethod,
        status: 'Pendente',
      }
    ])
    .select();

  if (error) throw error;
  return data[0];
};

// 3. Atualizar um agendamento
export const updateAppointmentSupabase = async (appointment: Appointment) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({
      client_name: appointment.clientName,
      client_phone: appointment.clientPhone,
      pet_name: appointment.petName,
      pet_breed: appointment.petBreed,
      pet_age: appointment.petAge,
      pet_porte: appointment.petPorte,
      day: appointment.day,
      time: appointment.time,
      services: appointment.services,
      total_value: appointment.totalValue,
      payment_method: appointment.paymentMethod,
      status: appointment.status,
    })
    .eq('id', appointment.id);

  if (error) throw error;
  return data;
};

// 4. Excluir um agendamento
export const deleteAppointmentSupabase = async (id: string) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
*/
