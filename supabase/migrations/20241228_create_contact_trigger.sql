-- Créer un trigger pour appeler la Edge Function quand un nouveau contact est ajouté
CREATE OR REPLACE FUNCTION handle_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- Appeler la Edge Function
  PERFORM
    net.http_post(
      url := 'https://votre-projet.supabase.co/functions/v1/send-contact-email',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}',
      body := json_build_object('contact', row_to_json(NEW))::text
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger
DROP TRIGGER IF EXISTS on_contact_insert ON contacts;
CREATE TRIGGER on_contact_insert
  AFTER INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_contact();

-- Activer l'extension http si pas déjà fait
CREATE EXTENSION IF NOT EXISTS http;
