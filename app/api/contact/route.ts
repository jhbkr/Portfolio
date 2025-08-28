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

    // Envoyer une notification par email (optionnel)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
      
      if (supabaseUrl && supabaseServiceKey) {
        await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contact: {
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
              rgpd_accepted: rgpdAccepted
            }
          })
        })
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
