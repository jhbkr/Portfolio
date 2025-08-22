import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Jihad Bakari - Pixel Web",
  description: "Politique de confidentialité de Jihad Bakari - Pixel Web. Protection des données personnelles et conformité RGPD pour nos services de développement web.",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
        
        <div className="mb-8 p-4 bg-muted/20 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Jihad Bakari, micro-entrepreneur exerçant sous le nom commercial "Pixel Web" (ci-après "nous", "notre" ou "le responsable de traitement"), 
            s'engage à protéger la vie privée et les données personnelles de ses utilisateurs et clients.
          </p>
          <p className="mt-4">
            Cette politique de confidentialité décrit comment nous collectons, utilisons, stockons et protégeons vos données personnelles 
            conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Responsable de traitement</h2>
          <div className="space-y-2">
            <p><strong>Identité :</strong> Jihad Bakari</p>
            <p><strong>Nom commercial :</strong> Pixel Web</p>
            <p><strong>Statut juridique :</strong> Micro-entrepreneur (Entreprise Individuelle)</p>
            <p><strong>SIREN :</strong> 989 818 018</p>
            <p><strong>SIRET :</strong> 989 818 018 00016</p>
            <p><strong>Adresse :</strong> 69 - Rhône, France</p>
            <p><strong>Email :</strong> jihad.bakari@epitech.eu</p>
            <p><strong>Téléphone :</strong> 06 61 52 77 54</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Base légale du traitement</h2>
          <p>Nous traitons vos données personnelles sur les bases légales suivantes :</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Exécution du contrat :</strong> Pour fournir nos services de développement web</li>
            <li><strong>Intérêt légitime :</strong> Pour améliorer nos services et assurer la sécurité</li>
            <li><strong>Consentement :</strong> Pour les communications marketing (révocable à tout moment)</li>
            <li><strong>Obligation légale :</strong> Pour respecter nos obligations comptables et fiscales</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Données collectées</h2>
          
          <h3 className="text-xl font-medium mb-3">4.1 Données d'identification</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Nom de l'entreprise (optionnel)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-6">4.2 Données de projet</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Description du projet</li>
            <li>Objectifs et besoins</li>
            <li>Budget et délais</li>
            <li>Documents et fichiers fournis</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-6">4.3 Données techniques</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Adresse IP</li>
            <li>Données de navigation (cookies techniques)</li>
            <li>Logs de connexion</li>
            <li>Informations sur le navigateur et l'appareil</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-6">4.4 Données de facturation</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Informations de facturation</li>
            <li>Historique des paiements</li>
            <li>Documents comptables</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Finalités du traitement</h2>
          <p>Vos données personnelles sont traitées pour les finalités suivantes :</p>
          
          <h3 className="text-xl font-medium mb-3 mt-4">5.1 Services de développement</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Réponse aux demandes de devis et de contact</li>
            <li>Exécution des prestations de services</li>
            <li>Suivi de projet et communication client</li>
            <li>Formation et accompagnement technique</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4">5.2 Gestion administrative</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Facturation et comptabilité</li>
            <li>Gestion de la relation commerciale</li>
            <li>Respect des obligations légales</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4">5.3 Amélioration des services</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Analyse des besoins clients</li>
            <li>Amélioration de nos processus</li>
            <li>Développement de nouveaux services</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4">5.4 Sécurité</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Protection contre la fraude</li>
            <li>Sécurisation de nos systèmes</li>
            <li>Prévention des incidents</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">6. Destinataires des données</h2>
          <p>Vos données personnelles sont destinées aux seules personnes suivantes :</p>
          
          <h3 className="text-xl font-medium mb-3 mt-4">6.1 Destinataires internes</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Jihad Bakari (responsable de traitement)</li>
            <li>Personnel autorisé (le cas échéant)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4">6.2 Prestataires de services</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Hébergeur web (données techniques uniquement)</li>
            <li>Fournisseurs d'outils de développement</li>
            <li>Services de paiement (données de facturation uniquement)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4">6.3 Autorités publiques</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Administration fiscale (obligation légale)</li>
            <li>Autorités judiciaires (sur réquisition)</li>
          </ul>

          <p className="mt-4">
            <strong>Engagement :</strong> Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">7. Durée de conservation</h2>
          <p>Nous conservons vos données personnelles pour les durées suivantes :</p>
          
          <h3 className="text-xl font-medium mb-3 mt-4">7.1 Données de contact</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>3 ans</strong> après le dernier contact (prospects)</li>
            <li><strong>5 ans</strong> après la fin de la relation commerciale (clients)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4">7.2 Données de facturation</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>10 ans</strong> (obligation comptable et fiscale)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4">7.3 Données techniques</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>12 mois</strong> pour les logs de connexion</li>
            <li><strong>13 mois</strong> pour les cookies (conformément à la CNIL)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4">7.4 Données de projet</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>5 ans</strong> après la fin du projet (sauvegarde technique)</li>
          </ul>

          <p className="mt-4">
            <strong>Note :</strong> Ces durées peuvent être prolongées en cas d'obligation légale ou de litige en cours.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">8. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          
          <h3 className="text-xl font-medium mb-3 mt-4">8.1 Droit d'accès</h3>
          <p>Vous pouvez demander à connaître les données personnelles vous concernant et obtenir une copie.</p>

          <h3 className="text-xl font-medium mb-3 mt-4">8.2 Droit de rectification</h3>
          <p>Vous pouvez demander la correction de données inexactes ou incomplètes.</p>

          <h3 className="text-xl font-medium mb-3 mt-4">8.3 Droit d'effacement</h3>
          <p>Vous pouvez demander la suppression de vos données personnelles dans les limites légales.</p>

          <h3 className="text-xl font-medium mb-3 mt-4">8.4 Droit à la limitation</h3>
          <p>Vous pouvez demander la limitation du traitement de vos données dans certaines conditions.</p>

          <h3 className="text-xl font-medium mb-3 mt-4">8.5 Droit à la portabilité</h3>
          <p>Vous pouvez demander la récupération de vos données dans un format structuré.</p>

          <h3 className="text-xl font-medium mb-3 mt-4">8.6 Droit d'opposition</h3>
          <p>Vous pouvez vous opposer au traitement de vos données pour des raisons légitimes.</p>

          <h3 className="text-xl font-medium mb-3 mt-4">8.7 Droit de retrait du consentement</h3>
          <p>Vous pouvez retirer votre consentement à tout moment pour les traitements basés sur le consentement.</p>

          <h3 className="text-xl font-medium mb-3 mt-4">8.8 Droit d'introduire une réclamation</h3>
          <p>Vous pouvez déposer une plainte auprès de la CNIL si vous estimez que vos droits ne sont pas respectés.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">9. Exercice de vos droits</h2>
          <p>Pour exercer vos droits, vous pouvez nous contacter :</p>
          
          <div className="mt-4 p-4 bg-muted/20 rounded-lg">
            <p><strong>Par email :</strong> jihad.bakari@epitech.eu</p>
            <p><strong>Par téléphone :</strong> 06 61 52 77 54</p>
            <p><strong>Par courrier :</strong> Jihad Bakari - Pixel Web, 69 - Rhône, France</p>
          </div>

          <p className="mt-4">
            <strong>Délai de réponse :</strong> Nous nous engageons à répondre dans un délai maximum de 1 mois.
          </p>
          <p className="mt-2">
            <strong>Justification d'identité :</strong> Nous pourrons vous demander une pièce d'identité pour vérifier votre identité.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">10. Cookies et technologies similaires</h2>
          
          <h3 className="text-xl font-medium mb-3">10.1 Types de cookies utilisés</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Cookies techniques :</strong> Nécessaires au fonctionnement du site</li>
            <li><strong>Cookies de session :</strong> Pour maintenir votre session active</li>
            <li><strong>Cookies de préférences :</strong> Pour mémoriser vos choix</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4">10.2 Gestion des cookies</h3>
          <p>
            Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, cela peut affecter le bon fonctionnement du site.
          </p>
          <p className="mt-2">
            <strong>Note :</strong> Nous n'utilisons pas de cookies de tracking ou de publicité.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">11. Sécurité des données</h2>
          <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données :</p>
          
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Chiffrement :</strong> Données transmises en HTTPS</li>
            <li><strong>Accès restreint :</strong> Accès limité aux personnes autorisées</li>
            <li><strong>Sauvegardes :</strong> Sauvegardes régulières et sécurisées</li>
            <li><strong>Mise à jour :</strong> Systèmes et logiciels régulièrement mis à jour</li>
            <li><strong>Formation :</strong> Personnel formé aux bonnes pratiques</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">12. Transferts hors UE</h2>
          <p>
            Vos données personnelles sont principalement traitées en France et dans l'Union Européenne.
          </p>
          <p className="mt-4">
            En cas de transfert hors UE (par exemple, si notre hébergeur est situé aux États-Unis), 
            nous nous assurons que des garanties appropriées sont mises en place :
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Décisions d'adéquation de la Commission européenne</li>
            <li>Clauses contractuelles types</li>
            <li>Certifications approuvées</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">13. Modifications de la politique</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour pour refléter les évolutions de nos pratiques 
            ou les changements législatifs.
          </p>
          <p className="mt-4">
            <strong>Notification :</strong> En cas de modification substantielle, nous vous informerons par email 
            ou par un avis sur notre site web.
          </p>
          <p className="mt-2">
            <strong>Date de dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">14. Contact et réclamations</h2>
          <p>Pour toute question concernant cette politique de confidentialité :</p>
          
          <div className="mt-4 p-4 bg-muted/20 rounded-lg">
            <p><strong>Délégué à la protection des données :</strong> Jihad Bakari</p>
            <p><strong>Email :</strong> jihad.bakari@epitech.eu</p>
            <p><strong>Téléphone :</strong> 06 61 52 77 54</p>
          </div>

          <p className="mt-4">
            <strong>Commission Nationale de l'Informatique et des Libertés (CNIL) :</strong>
          </p>
          <p className="mt-2">
            3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07<br />
            Téléphone : 01 53 73 22 22<br />
            Site web : <a href="https://www.cnil.fr" className="text-primary hover:underline">www.cnil.fr</a>
          </p>
        </section>

        <footer className="mt-16 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            <strong>Contact :</strong> jihad.bakari@epitech.eu | 06 61 52 77 54
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>
        </footer>
      </div>
    </div>
  )
}
