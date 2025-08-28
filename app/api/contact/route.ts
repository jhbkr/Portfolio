import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      name,
      email,
      phone,
      company,
      source,
      formType,
      projectObjective,
      chosenPack,
      budgetRange,
      desiredDeadline,
      message,
      cgvAccepted,
      rgpdAccepted
    } = body

    // Validation basique
    if (!name || !email || !source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insérer dans Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone,
          company,
          source,
          form_type: formType,
          project_objective: projectObjective,
          chosen_pack: chosenPack,
          budget_range: budgetRange,
          desired_deadline: desiredDeadline,
          message,
          cgv_accepted: cgvAccepted,
          rgpd_accepted: rgpdAccepted,
          status: 'new'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      )
    }

    // Envoyer une notification par email via Resend
    try {
      const RESEND_API_KEY = process.env.RESEND_API_KEY
      const TO_EMAIL = process.env.TO_EMAIL || 'jihad.bakari@epitech.eu'
      
      if (RESEND_API_KEY) {
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
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email :</div>
                  <div class="value">${email}</div>
                </div>
                ${phone ? `
                <div class="field">
                  <div class="label">Téléphone :</div>
                  <div class="value">${phone}</div>
                </div>
                ` : ''}
                ${company ? `
                <div class="field">
                  <div class="label">Société :</div>
                  <div class="value">${company}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Source :</div>
                  <div class="value">
                    <span class="badge">${source}</span>
                  </div>
                </div>
                ${projectObjective ? `
                <div class="field">
                  <div class="label">Objectif du projet :</div>
                  <div class="value">${projectObjective}</div>
                </div>
                ` : ''}
                ${chosenPack ? `
                <div class="field">
                  <div class="label">Pack choisi :</div>
                  <div class="value">${chosenPack}</div>
                </div>
                ` : ''}
                ${budgetRange ? `
                <div class="field">
                  <div class="label">Budget :</div>
                  <div class="value">${budgetRange}</div>
                </div>
                ` : ''}
                ${message ? `
                <div class="field">
                  <div class="label">Message :</div>
                  <div class="value">${message}</div>
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
            subject: `Nouveau contact - ${name}`,
            html: emailContent,
          }),
        })

        if (!response.ok) {
          const error = await response.text()
          console.error('Resend API error:', error)
        } else {
          console.log('Email notification sent successfully')
        }
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError)
      // Ne pas faire échouer la requête si l'email échoue
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Contact submitted successfully',
      data 
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
