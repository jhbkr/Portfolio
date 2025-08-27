import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
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
    } = req.body

    // Validation basique
    if (!name || !email || !source) {
      return res.status(400).json({ error: 'Missing required fields' })
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
      return res.status(500).json({ error: 'Database error' })
    }

    // Envoyer email de notification (optionnel)
    // await sendNotificationEmail({ name, email, source, message })

    res.status(200).json({ 
      success: true, 
      message: 'Contact submitted successfully',
      data 
    })

  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
} 