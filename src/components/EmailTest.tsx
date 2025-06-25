
import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const EmailTest = () => {
  const [isSending, setIsSending] = useState(false);
  const [lastSent, setLastSent] = useState<string | null>(null);
  const { toast } = useToast();

  const testClient = {
    name: 'Fred Araujo',
    email: 'fred.araujods@gmail.com',
    phone: '+55 (71) 99121-6657',
    invoiceNumber: 'INV-2024-001',
    amount: '1.250,00',
    dueDate: '20/01/2025',
    daysOverdue: 1
  };

  const generateEmailTemplate = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f8fafc; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
          .highlight { background: #fef3c7; padding: 10px; border-left: 4px solid #f59e0b; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Quick Win Finance</h1>
            <p>Lembrete de Pagamento</p>
          </div>
          <div class="content">
            <h2>Olá ${testClient.name},</h2>
            <p>Esperamos que esteja bem!</p>
            <p>Notamos que sua fatura <strong>${testClient.invoiceNumber}</strong> no valor de <strong>R$ ${testClient.amount}</strong> venceu em <strong>${testClient.dueDate}</strong>.</p>
            
            <div class="highlight">
              <strong>⚠️ Fatura em atraso há ${testClient.daysOverdue} dia</strong>
            </div>
            
            <p>Para evitar qualquer inconveniente, solicitamos que regularize o pagamento o mais breve possível.</p>
            <p>Se já efetuou o pagamento, desconsidere este e-mail.</p>
            <p>Em caso de dúvidas, entre em contato conosco.</p>
            <br>
            <p>Atenciosamente,<br><strong>Equipe Financeira - Quick Win Finance</strong></p>
          </div>
          <div class="footer">
            <p>Este é um e-mail automático do sistema Quick Win Finance</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const sendTestEmail = async () => {
    setIsSending(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: testClient.email,
          subject: `Lembrete de Pagamento - Fatura ${testClient.invoiceNumber}`,
          html: generateEmailTemplate(),
          clientName: testClient.name,
          invoiceNumber: testClient.invoiceNumber,
          amount: testClient.amount,
          dueDate: testClient.dueDate
        }
      });

      if (error) throw error;

      if (data.success) {
        setLastSent(new Date().toLocaleString());
        toast({
          title: "Email enviado com sucesso!",
          description: `Email de cobrança enviado para ${testClient.name}`,
        });
      } else {
        throw new Error(data.error || 'Erro desconhecido');
      }
    } catch (error: any) {
      console.error('Erro ao enviar email:', error);
      toast({
        title: "Erro ao enviar email",
        description: error.message || 'Erro desconhecido ao enviar email',
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Mail className="h-5 w-5" />
          Teste de Envio de Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-2">Cliente de Teste:</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Nome:</strong> {testClient.name}</p>
            <p><strong>Email:</strong> {testClient.email}</p>
            <p><strong>WhatsApp:</strong> {testClient.phone}</p>
            <p><strong>Fatura:</strong> {testClient.invoiceNumber}</p>
            <p><strong>Valor:</strong> R$ {testClient.amount}</p>
            <p><strong>Vencimento:</strong> {testClient.dueDate}</p>
            <p><strong>Dias em atraso:</strong> {testClient.daysOverdue} dia</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button 
            onClick={sendTestEmail} 
            disabled={isSending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Enviar Email de Teste
              </>
            )}
          </Button>

          {lastSent && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              Último envio: {lastSent}
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <p className="text-sm text-yellow-800">
            <AlertCircle className="h-4 w-4 inline mr-1" />
            Este é um teste usando dados fictícios. O email será enviado para o endereço real do Fred Araujo.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTest;
