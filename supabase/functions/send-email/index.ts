
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  clientName: string;
  invoiceNumber?: string;
  amount?: string;
  dueDate?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, clientName, invoiceNumber, amount, dueDate }: EmailRequest = await req.json();

    console.log(`Enviando email para: ${to} - Cliente: ${clientName}`);

    const emailResponse = await resend.emails.send({
      from: "Quick Win Finance <noreply@brandlovrs.app>",
      to: [to],
      subject: subject,
      html: html,
    });

    console.log("Email enviado com sucesso:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      message: `Email enviado para ${clientName} (${to})` 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erro ao enviar email:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
