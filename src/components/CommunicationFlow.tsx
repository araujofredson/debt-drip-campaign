
import React from 'react';
import { Mail, Phone, AlertTriangle, Clock, CheckCircle, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const CommunicationFlow = () => {
  const flowSteps = [
    {
      day: 1,
      title: 'E-mail para Cliente',
      description: 'Envio de e-mail de cobrança amigável para o contato do cliente',
      icon: Mail,
      color: 'blue',
      template: 'Olá [NOME], sua fatura [NUMERO] no valor de R$ [VALOR] venceu. Por favor, regularize o pagamento.',
      activeClients: 15,
    },
    {
      day: 3,
      title: 'WhatsApp para Cliente',
      description: 'Envio de mensagem via WhatsApp com tom mais direto',
      icon: Phone,
      color: 'green',
      template: 'Oi [NOME]! Sua fatura [NUMERO] está em atraso há 3 dias. Valor: R$ [VALOR]. Precisa de ajuda?',
      activeClients: 8,
    },
    {
      day: 5,
      title: 'Encaminhar para Jurídico',
      description: 'E-mail automático para o setor jurídico com os dados do cliente',
      icon: AlertTriangle,
      color: 'red',
      template: 'Cliente [NOME] com pendência de R$ [VALOR] há 5 dias. Fatura: [NUMERO]. Contato: [EMAIL]',
      activeClients: 3,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-900',
        icon: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-900',
        icon: 'text-green-600',
        badge: 'bg-green-100 text-green-800',
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-900',
        icon: 'text-red-600',
        badge: 'bg-red-100 text-red-800',
      },
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fluxo de Comunicação</h1>
        <p className="text-gray-600">Automação de cobrança baseada em dias de atraso</p>
      </div>

      <div className="grid gap-6">
        {flowSteps.map((step, index) => {
          const Icon = step.icon;
          const colors = getColorClasses(step.color);
          
          return (
            <div key={step.day} className="relative">
              <Card className={`${colors.bg} ${colors.border} border-2`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full bg-white`}>
                          <Icon className={`h-6 w-6 ${colors.icon}`} />
                        </div>
                        <div>
                          <h3 className={`text-xl ${colors.text}`}>Dia {step.day}: {step.title}</h3>
                          <p className="text-sm text-gray-600 font-normal">{step.description}</p>
                        </div>
                      </div>
                    </CardTitle>
                    <Badge className={colors.badge}>
                      {step.activeClients} cliente{step.activeClients !== 1 ? 's' : ''} ativo{step.activeClients !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Template da Mensagem:</h4>
                      <div className="bg-white p-4 rounded-lg border">
                        <p className="text-gray-700 italic">"{step.template}"</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Executado automaticamente
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Sistema ativo
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Editar Template
                        </Button>
                        <Button size="sm">
                          Testar Envio
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {index < flowSteps.length - 1 && (
                <div className="flex justify-center py-4">
                  <ArrowDown className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-center">Configurações do Fluxo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-gray-900">E-mail Jurídico</h4>
              <p className="text-sm text-gray-600 mt-1">juridico@brandlovers.ai</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-gray-900">Horário de Execução</h4>
              <p className="text-sm text-gray-600 mt-1">09:00 às 18:00 (dias úteis)</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-gray-900">Status do Sistema</h4>
              <Badge className="bg-green-100 text-green-800 mt-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ativo
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationFlow;
