import { Service, DayOfWeek } from '@/types';

export const SERVICES: Service[] = [
  { id: '1', name: 'Banho simples', price: 79, duration: '45 min', description: 'Higienização completa, secagem e escovação dos pelos.' },
  { id: '2', name: 'Banho e tosa', price: 139, duration: '90 min', description: 'Banho completo mais tosa geral (máquina e tesoura).' },
  { id: '3', name: 'Tosa higiênica', price: 59, duration: '30 min', description: 'Tosa na barriguinha, bumbum, patinhas e limpeza de olhos.' },
  { id: '4', name: 'Corte de unhas', price: 39, duration: '15 min', description: 'Corte e lixamento seguro das unhas do seu cão.' },
  { id: '5', name: 'Hidratação', price: 59, duration: '30 min', description: 'Tratamento de pelos para maciez e brilho intenso.' },
  { id: '6', name: 'Limpeza de ouvido', price: 35, duration: '15 min', description: 'Remoção de excesso de pelos e higienização dos condutos.' },
  { id: '7', name: 'Escovação de dentes', price: 49, duration: '15 min', description: 'Higienização bucal para prevenção de tártaro e mau hálito.' },
];

export const DAYS: DayOfWeek[] = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado'
];

export const TIMES = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00'
];

export const PAYMENT_METHODS = [
  { id: 'pix', name: 'Pix', description: 'Aprovação instantânea' },
  { id: 'credito', name: 'Cartão de crédito', description: 'Até 3x sem juros' },
  { id: 'debito', name: 'Cartão de débito', description: 'Taxa zero' },
  { id: 'dinheiro', name: 'Dinheiro na loja', description: 'Pague ao retirar seu pet' }
];
