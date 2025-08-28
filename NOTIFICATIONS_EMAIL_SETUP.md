# 🎯 Guide de configuration des notifications par email

## 📋 Étapes à suivre

### 1. Créer un compte Resend (Gratuit)
- Allez sur [https://resend.com](https://resend.com)
- Créez un compte gratuit
- Vérifiez votre email
- Allez dans **API Keys** et copiez votre clé API

### 2. Configurer les variables d'environnement

#### Dans votre fichier `.env.local` (local) :
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key

# Supabase Service Role Key (pour les Edge Functions)
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TO_EMAIL=jihad.bakari@epitech.eu
```

#### Dans Vercel (Production) :
1. Allez sur votre projet Vercel
2. **Settings** → **Environment Variables**
3. Ajoutez ces variables :
   - `SUPABASE_SERVICE_ROLE_KEY` = votre-service-role-key
   - `RESEND_API_KEY` = votre-clé-resend
   - `TO_EMAIL` = jihad.bakari@epitech.eu

### 3. Obtenir votre Service Role Key Supabase
1. Allez sur votre dashboard Supabase
2. **Settings** → **API**
3. Copiez la **Service Role Key** (pas l'Anon Key)

### 4. Déployer la Edge Function
```bash
# Connecter à votre projet Supabase
supabase link --project-ref votre-project-ref

# Déployer la fonction
supabase functions deploy send-contact-email

# Déployer la migration (trigger)
supabase db push
```

### 5. Configurer les variables d'environnement Supabase
1. Dashboard Supabase → **Settings** → **Edge Functions**
2. Ajoutez :
   - `RESEND_API_KEY` = votre-clé-resend
   - `TO_EMAIL` = jihad.bakari@epitech.eu

## 🎉 Résultat

Une fois configuré :
- ✅ Quand quelqu'un remplit un formulaire → Email automatique
- ✅ Email avec toutes les informations du contact
- ✅ Design professionnel et responsive
- ✅ Fonctionne en local et en production

## 🔧 Test

Pour tester :
1. Remplissez un formulaire sur votre site
2. Vérifiez votre boîte email
3. Vous devriez recevoir une notification

## 🚨 Dépannage

### Si ça ne marche pas :
1. Vérifiez que toutes les variables d'environnement sont configurées
2. Vérifiez les logs dans Supabase Dashboard → **Edge Functions**
3. Testez la fonction manuellement avec curl

### Variables manquantes :
- `SUPABASE_SERVICE_ROLE_KEY` : Obtenez-la dans Supabase Dashboard → Settings → API
- `RESEND_API_KEY` : Créez un compte sur resend.com
- `TO_EMAIL` : Votre email de réception

## 📧 Exemple d'email reçu

Vous recevrez un email avec :
- Nom du contact
- Email et téléphone
- Société (si renseignée)
- Source (portfolio ou freelance)
- Objectif du projet
- Pack choisi
- Budget
- Message
- Date et heure

**Dites-moi quand vous avez terminé chaque étape !** 🚀
