
import React, { useState } from 'react';
import { Search, Mail, Phone, AlertTriangle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ClientsList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@exemplo.com',
      phone: '(11) 99999-1234',
      invoice: 'INV-001',
      amount: 1500.00,
      dueDate: '2024-06-20',
      daysOverdue: 1,
      status: 'email_sent',
      lastAction: '2024-06-21 09:30',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      phone: '(11) 99999-5678',
      invoice: 'INV-002',
      amount: 2300.00,
      dueDate: '2024-06-18',
      daysOverdue: 3,
      status: 'whatsapp_sent',
      lastAction: '2024-06-21 09:15',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@exemplo.com',
      phone: '(11) 99999-9012',
      invoice: 'INV-003',
      amount: 850.00,
      dueDate: '2024-06-16',
      daysOverdue: 5,
      status: 'legal',
      lastAction: '2024-06-21 08:45',
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'ana@exemplo.com',
      phone: '(11) 99999-3456',
      invoice: 'INV-004',
      amount: 1200.00,
      dueDate: '2024-06-20',
      daysOverdue: 1,
      status: 'pending',
      lastAction: '-',
    },
  ];

  const getStatusInfo = (status: string, days: number) => {
    switch (status) {
      case 'email_sent':
        return { label: 'E-mail Enviado', color: 'bg-blue-100 text-blue-800', icon: Mail };
      case 'whatsapp_sent':
        return { label: 'WhatsApp Enviado', color: 'bg-green-100 text-green-800', icon: Phone };
      case 'legal':
        return { label: 'Jurídico', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
      default:
        return { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: Calendar };
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.invoice.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Clientes com Pendências</h1>
        <p className="text-gray-600">Lista de clientes com faturas vencidas</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nome, e-mail ou fatura..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>Atualizar Lista</Button>
      </div>

      <div className="grid gap-6">
        {filteredClients.map((client) => {
          const statusInfo = getStatusInfo(client.status, client.daysOverdue);
          const StatusIcon = statusInfo.icon;
          
          return (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                      <Badge variant="outline">
                        {client.daysOverdue} dia{client.daysOverdue > 1 ? 's' : ''} de atraso
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">E-mail</p>
                        <p className="font-medium">{client.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Telefone</p>
                        <p className="font-medium">{client.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Fatura</p>
                        <p className="font-medium">{client.invoice}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Valor</p>
                        <p className="font-medium text-red-600">
                          R$ {client.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
                      <span>Vencimento: {new Date(client.dueDate).toLocaleDateString('pt-BR')}</span>
                      <span>Última ação: {client.lastAction}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                    <Button size="sm">
                      Ação Manual
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ClientsList;
