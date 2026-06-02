/**
 * TEMPLATE DE CONFIGURAÇÃO E INTEGRAÇÃO DE GATEWAYS DE PAGAMENTO
 * 
 * Este arquivo serve como a estrutura base de preparação para integrações futuras
 * de gateways de pagamento (Mercado Pago, PagSeguro, Stripe, etc.).
 * 
 * NÃO IMPORTAR OU EXECUTAR TRANSAÇÕES REAIS AQUI AINDA.
 */

import { Appointment } from '@/types';
import { PAYMENT_CONFIG } from '@/config/payment';

// Tipagem para resposta genérica de criação de pagamento
export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  checkoutUrl?: string; // URL para redirecionar o cliente (Stripe Checkout, Mercado Pago Preference, etc.)
  qrCode?: string;      // Caso gere PIX dinâmico (Mercado Pago / PagSeguro)
  qrCodeBase64?: string;
  error?: string;
}

/**
 * 1. INTEGRAÇÃO FUTURA COM MERCADO PAGO
 * 
 * Instalação: npm install mercadopago
 * 
 * Exemplo de implementação para criar uma preferência de pagamento (PIX / Cartão):
 */
export async function createMercadoPagoPreference(appointment: Appointment): Promise<PaymentResponse> {
  console.log('[Future MP Integration] Criando preferência para o agendamento:', appointment.id);
  
  // Exemplo de código de integração futura:
  /*
  import { MercadoPagoConfig, Preference } from 'mercadopago';
  
  const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '' });
  const preference = new Preference(client);
  
  try {
    const response = await preference.create({
      body: {
        items: [
          {
            id: appointment.id,
            title: `Serviço Pet Paiola - Pet: ${appointment.petName}`,
            quantity: 1,
            unit_price: appointment.totalValue,
            currency_id: 'BRL',
          }
        ],
        payer: {
          name: appointment.clientName,
          phone: { number: appointment.clientPhone }
        },
        back_urls: {
          success: 'https://pet-paiola.vercel.app/agendar/sucesso',
          failure: 'https://pet-paiola.vercel.app/agendar/falha',
          pending: 'https://pet-paiola.vercel.app/agendar/pendente',
        },
        notification_url: 'https://seu-dominio.com/api/webhooks/mercadopago',
      }
    });
    
    return {
      success: true,
      paymentId: response.id,
      checkoutUrl: response.init_point // URL sandbox ou de produção
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
  */

  return {
    success: true,
    paymentId: 'mp_mock_123456',
    checkoutUrl: '#' // Redirecionamento simulado
  };
}

/**
 * 2. INTEGRAÇÃO FUTURA COM STRIPE
 * 
 * Instalação: npm install stripe
 * 
 * Exemplo de implementação para criar uma sessão de Checkout:
 */
export async function createStripeSession(appointment: Appointment): Promise<PaymentResponse> {
  console.log('[Future Stripe Integration] Criando sessão Stripe para o agendamento:', appointment.id);

  /*
  import Stripe from 'stripe';
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Banho e Tosa Pet Paiola - Pet: ${appointment.petName}`,
            },
            unit_amount: appointment.totalValue * 100, // Stripe utiliza centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://pet-paiola.vercel.app/agendar/sucesso?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://pet-paiola.vercel.app/agendar/cancelado',
    });

    return {
      success: true,
      paymentId: session.id,
      checkoutUrl: session.url || ''
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
  */

  return {
    success: true,
    paymentId: 'cs_stripe_mock_123456',
    checkoutUrl: '#'
  };
}

/**
 * 3. INTEGRAÇÃO FUTURA COM PAGSEGURO
 * 
 * Exemplo de chamada HTTP para a API de Checkouts/Cobranças do PagSeguro:
 */
export async function createPagSeguroOrder(appointment: Appointment): Promise<PaymentResponse> {
  console.log('[Future PagSeguro Integration] Criando pedido no PagSeguro:', appointment.id);
  
  // Endpoint PagSeguro: https://api.pagseguro.com/orders
  // Requer Headers: Authorization (Bearer Token) e Content-Type: application/json
  
  return {
    success: true,
    paymentId: 'ps_mock_123456',
    checkoutUrl: '#'
  };
}

/**
 * 4. WEBHOOK DE PAGAMENTO (COMO PROCESSAR O RETORNO AUTOMÁTICO DO GATEWAY)
 * 
 * Quando a integração automática estiver ativa, o gateway enviará uma notificação HTTP (Webhook)
 * indicando que o status do pagamento mudou (ex: Pago, Cancelado).
 * 
 * O endpoint de API (ex: /api/webhooks/payment) receberá os dados e deverá executar:
 * 
 * ```typescript
 * import { updateAppointment, getAppointments } from '@/utils/db';
 * 
 * export async function handleWebhookNotification(gatewayPaymentId: string, newGatewayStatus: string) {
 *   const appointments = getAppointments();
 *   const app = appointments.find(a => a.paymentGatewayId === gatewayPaymentId);
 *   
 *   if (app) {
 *     if (newGatewayStatus === 'approved' || newGatewayStatus === 'succeeded') {
 *       app.paymentStatus = 'Pago';
 *     } else if (newGatewayStatus === 'cancelled' || newGatewayStatus === 'refunded') {
 *       app.paymentStatus = 'Cancelado';
 *     }
 *     updateAppointment(app);
 *     console.log(`Status de pagamento atualizado automaticamente para ${app.paymentStatus}`);
 *   }
 * }
 * ```
 */
