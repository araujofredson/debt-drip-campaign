
import React, { useState } from 'react';
import { Mail, Phone, AlertTriangle, Edit, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Templates = () => {
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [templates, setTemplates] = useState([
    {
      id: 'email_day1',
      type: 'E-mail - Dia 1',
      icon: Mail,
      color: 'blue',
      subject: 'Lembrete de Pagamento - Fatura Vencida',
      content: `Olá [NOME],

Esperamos que esteja bem!

Notamos que sua fatura [NUMERO] no valor de R$ [VALOR] venceu em [DATA_VENCIMENTO].

Para evitar qualquer inconveniente, solicitamos que regularize o pagamento o mais breve possível.

Se já efetuou o pagamento, desconsidere este e-mail.

Atenciosamente,
Equipe Financeira`,
      variables: ['NOME', 'NUMERO', 'VALOR', 'DATA_VENCIMENTO'],
    },
    {
      id: 'whatsapp_day3',
      type: 'WhatsApp - Dia 3',
      icon: Phone,
      color: 'green',
      subject: '',
      content: `Oi [NOME]! 👋

Sua fatura [NUMERO] está em atraso há 3 dias.
💰 Valor: R$ [VALOR]

Precisa de ajuda para quitar? Estamos aqui para te ajudar! 😊

Por favor, entre em contato conosco.`,
      variables: ['NOME', 'NUMERO', 'VALOR'],
    },
    {
      id: 'legal_day5',
      type: 'Jurídico - Dia 5',
      icon: AlertTriangle,
      color: 'red',
      subject: 'Cliente com Pendência - Encaminhamento Jurídico',
      content: `Prezado time jurídico,

Cliente com pendência para análise:

• Nome: [NOME]
• E-mail: [EMAIL]
• Telefone: [TELEFONE]
• Fatura: [NUMERO]
• Valor: R$ [VALOR]
• Data de Vencimento: [DATA_VENCIMENTO]
• Dias em Atraso: [DIAS_ATRASO]

Favor proceder com as medidas cabíveis.

Sistema Automatizado - Quick Win Finance`,
      variables: ['NOME', 'EMAIL', 'TELEFONE', 'NUMERO', 'VALOR', 'DATA_VENCIMENTO', 'DIAS_ATRASO'],
    },
  ]);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900' },
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900' },
    };
    return colors[color as keyof typeof colors];
  };

  const handleEdit = (templateId: string) => {
    setEditingTemplate(templateId);
  };

  const handleSave = () => {
    setEditingTemplate(null);
    // Aqui você salvaria as alterações
  };

  const handleCancel = () => {
    setEditingTemplate(null);
    // Aqui você reverteria as alterações
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Templates de Mensagem</h1>
        <p className="text-gray-600">Configure os templates para cada etapa do fluxo de cobrança</p>
      </div>

      <div className="grid gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          const colors = getColorClasses(template.color);
          const isEditing = editingTemplate === template.id;
          
          return (
            <Card key={template.id} className={`${colors.bg} ${colors.border} border-2`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="h-6 w-6" />
                    <span className={colors.text}>{template.type}</span>
                  </CardTitle>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                          <Save className="h-4 w-4 mr-1" />
                          Salvar
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-1" />
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleEdit(template.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {template.subject && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto do E-mail:
                    </label>
                    {isEditing ? (
                      <Input 
                        defaultValue={template.subject}
                        className="bg-white"
                      />
                    ) : (
                      <div className="bg-white p-3 rounded border">
                        {template.subject}
                      </div>
                    )}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conteúdo da Mensagem:
                  </label>
                  {isEditing ? (
                    <Textarea 
                      defaultValue={template.content}
                      rows={8}
                      className="bg-white"
                    />
                  ) : (
                    <div className="bg-white p-4 rounded border">
                      <pre className="whitespace-pre-wrap text-sm">{template.content}</pre>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variáveis Disponíveis:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {template.variables.map((variable) => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        [{variable}]
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">💡 Dicas para Templates</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-yellow-700">
          <ul className="space-y-2">
            <li>• Use as variáveis entre colchetes para personalização automática</li>
            <li>• Mantenha o tom adequado para cada etapa (amigável → firme → formal)</li>
            <li>• Para WhatsApp, use emojis com moderação para humanizar a mensagem</li>
            <li>• Templates do jurídico devem ser objetivos e conter todas as informações necessárias</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Templates;
