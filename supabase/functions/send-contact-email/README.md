# Fonction de notification par email

Cette Edge Function envoie automatiquement un email de notification quand un nouveau contact est ajouté à la base de données.

## Configuration requise

### 1. Créer un compte Resend
- Allez sur [https://resend.com](https://resend.com)
- Créez un compte gratuit
- Obtenez votre clé API

### 2. Configurer les variables d'environnement
Dans votre dashboard Supabase, allez dans **Settings > Edge Functions** et ajoutez :

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TO_EMAIL=jihad.bakari@epitech.eu
```

### 3. Déployer la fonction
```bash
supabase functions deploy send-contact-email
```

### 4. Exécuter la migration
```bash
supabase db push
```

## Fonctionnement

1. Quand quelqu'un remplit un formulaire, les données sont insérées dans la table `contacts`
2. Le trigger `on_contact_insert` se déclenche automatiquement
3. La Edge Function `send-contact-email` est appelée avec les données du contact
4. Un email de notification est envoyé à votre adresse email

## Test

Pour tester la fonction :
```bash
curl -X POST 'https://votre-projet.supabase.co/functions/v1/send-contact-email' \
  -H 'Authorization: Bearer votre-anon-key' \
  -H 'Content-Type: application/json' \
  -d '{"contact":{"name":"Test","email":"test@example.com","source":"portfolio"}}'
```
