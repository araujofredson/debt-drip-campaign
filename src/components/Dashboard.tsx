import React from 'react';
import { AlertTriangle, Clock, Mail, Phone, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EmailTest from './EmailTest';

const Dashboard = () => {
  const stats = [
    {
      title: 'Clientes com Pendência',
      value: '23',
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'E-mails Enviados Hoje',
      value: '15',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'WhatsApp Enviados',
      value: '8',
      icon: Phone,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Casos para Jurídico',
      value: '3',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const recentActions = [
    {
      id: 1,
      client: 'João Silva',
      action: 'E-mail enviado',
      days: 1,
      status: 'email',
      time: '09:30',
    },
    {
      id: 2,
      client: 'Maria Santos',
      action: 'WhatsApp enviado',
      days: 3,
      status: 'whatsapp',
      time: '09:15',
    },
    {
      id: 3,
      client: 'Pedro Costa',
      action: 'Encaminhado para jurídico',
      days: 5,
      status: 'juridico',
      time: '08:45',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema de cobrança automática</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="flex items-center p-6">
                <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Adicionar o componente de teste de email */}
      <EmailTest />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Ações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActions.map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-medium text-gray-900">{action.client}</p>
                      <p className="text-sm text-gray-600">{action.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      action.status === 'email' ? 'default' :
                      action.status === 'whatsapp' ? 'secondary' : 'destructive'
                    }>
                      {action.days} dia{action.days > 1 ? 's' : ''}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{action.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fluxo de Comunicação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-medium text-blue-900">1 dia de atraso</p>
                  <p className="text-sm text-blue-700">Envio de e-mail para o cliente</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 border border-green-200 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-medium text-green-900">3 dias de atraso</p>
                  <p className="text-sm text-green-700">Envio de WhatsApp para o cliente</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 border border-red-200 bg-red-50 rounded-lg">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <p className="font-medium text-red-900">5 dias de atraso</p>
                  <p className="text-sm text-red-700">Encaminhamento para jurídico</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
