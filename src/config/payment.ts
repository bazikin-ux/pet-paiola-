/**
 * CONFIGURAÇÃO GLOBAL DE PAGAMENTO E GATEWAYS
 * 
 * Este arquivo centraliza todas as configurações que serão usadas pelas futuras
 * integrações com os gateways de pagamento (Mercado Pago, Stripe, PagSeguro).
 * 
 * Para ativar um gateway no futuro, configure as variáveis de ambiente no arquivo .env.local
 * correspondente e altere a propriedade `active` para `true`.
 */

export const PAYMENT_CONFIG = {
  // Define se o sistema está em modo sandbox/testes ou produção
  sandbox: process.env.NODE_ENV !== 'production',

  // Url base do app para redirecionamento de sucesso, falha ou pendente no checkout do cliente
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // Configuração individual de cada gateway de pagamento
  gateways: {
    mercadopago: {
      active: false, // Alterar para true quando for integrar
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
      publicKey: process.env.MERCADO_PAGO_PUBLIC_KEY || '',
      webhookUrl: '/api/webhooks/mercadopago',
      // Moedas aceitas
      currency: 'BRL',
    },
    
    stripe: {
      active: false, // Alterar para true quando for integrar
      secretKey: process.env.STRIPE_SECRET_KEY || '',
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      webhookUrl: '/api/webhooks/stripe',
      currency: 'brl',
    },

    pagseguro: {
      active: false, // Alterar para true quando for integrar
      token: process.env.PAGSEGURO_TOKEN || '',
      email: process.env.PAGSEGURO_EMAIL || '',
      env: (process.env.PAGSEGURO_ENV as 'sandbox' | 'production') || 'sandbox',
      webhookUrl: '/api/webhooks/pagseguro',
    }
  },

  // Taxas ou descontos configuráveis (futura implementação)
  promotions: {
    pixDiscountPercent: 0, // Ex: 5 para 5% de desconto no PIX
  }
};

/**
 * EXEMPLO DE COMO CONSUMIR ESTA CONFIGURAÇÃO NO CÓDIGO DA INTEGRAÇÃO:
 * 
 * ```typescript
 * import { PAYMENT_CONFIG } from '@/config/payment';
 * 
 * export async function processPayment(appointmentId: string) {
 *   if (PAYMENT_CONFIG.gateways.mercadopago.active) {
 *     // Executa fluxo Mercado Pago usando PAYMENT_CONFIG.gateways.mercadopago.accessToken
 *   } else if (PAYMENT_CONFIG.gateways.stripe.active) {
 *     // Executa fluxo Stripe
 *   } else {
 *     // Mantém pagamento manual offline (Pix, Dinheiro, Cartão na loja)
 *   }
 * }
 * ```
 */
export default PAYMENT_CONFIG;
