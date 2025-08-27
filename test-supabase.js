const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qfbkjtouqcggmzawiyug.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmtqdG91cWNnZ216YXdpeXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMDE0NzYsImV4cCI6MjA3MTg3NzQ3Nn0.HGTK6-CmK-pXwbAZAKYFel3Zg8H1o-XIhKyndCg6oJE'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('🔗 Test de connexion à Supabase...')
    
    // Test de connexion basique
    const { data, error } = await supabase
      .from('contacts')
      .select('count')
      .limit(1)
    
    if (error) {
      console.log('❌ Erreur de connexion:', error.message)
    } else {
      console.log('✅ Connexion réussie !')
      console.log('📊 Table contacts accessible')
    }
    
  } catch (err) {
    console.log('❌ Erreur:', err.message)
  }
}

testConnection()
