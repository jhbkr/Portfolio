// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { contact } = await req.json()

    // Configuration Resend (vous devrez créer un compte sur resend.com)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const TO_EMAIL = Deno.env.get('TO_EMAIL') || 'jihad.bakari@epitech.eu'

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured')
    }

    // Préparer l'email
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouveau contact - Portfolio</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #374151; }
          .value { color: #6b7280; }
          .badge { display: inline-block; background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Nouveau contact reçu !</h1>
            <p>Quelqu'un a rempli le formulaire de votre portfolio</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nom :</div>
              <div class="value">${contact.name}</div>
            </div>
            <div class="field">
              <div class="label">Email :</div>
              <div class="value">${contact.email}</div>
            </div>
            ${contact.phone ? `
            <div class="field">
              <div class="label">Téléphone :</div>
              <div class="value">${contact.phone}</div>
            </div>
            ` : ''}
            ${contact.company ? `
            <div class="field">
              <div class="label">Société :</div>
              <div class="value">${contact.company}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Source :</div>
              <div class="value">
                <span class="badge">${contact.source}</span>
              </div>
            </div>
            ${contact.project_objective ? `
            <div class="field">
              <div class="label">Objectif du projet :</div>
              <div class="value">${contact.project_objective}</div>
            </div>
            ` : ''}
            ${contact.chosen_pack ? `
            <div class="field">
              <div class="label">Pack choisi :</div>
              <div class="value">${contact.chosen_pack}</div>
            </div>
            ` : ''}
            ${contact.budget_range ? `
            <div class="field">
              <div class="label">Budget :</div>
              <div class="value">${contact.budget_range}</div>
            </div>
            ` : ''}
            ${contact.message ? `
            <div class="field">
              <div class="label">Message :</div>
              <div class="value">${contact.message}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Date de réception :</div>
              <div class="value">${new Date().toLocaleString('fr-FR')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Envoyer l'email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <noreply@votre-domaine.com>',
        to: [TO_EMAIL],
        subject: `Nouveau contact - ${contact.name}`,
        html: emailContent,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Resend API error: ${error}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
