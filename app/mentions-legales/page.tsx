import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions Légales | Jihad Bakari - Pixel Web",
  description: "Mentions légales du site web de Jihad Bakari - Pixel Web, micro-entrepreneur en développement web et mobile.",
}

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Identité du professionnel</h2>
          <div className="space-y-2">
            <p><strong>Nom :</strong> Jihad Bakari</p>
            <p><strong>Raison sociale :</strong> Pixel Web</p>
            <p><strong>Statut juridique :</strong> Micro-entrepreneur (Entreprise Individuelle)</p>
            <p><strong>SIREN :</strong> 989 818 018</p>
            <p><strong>SIRET :</strong> 989 818 018 00016</p>
            <p><strong>Code APE :</strong> 62.01Z - Programmation informatique</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Coordonnées de contact</h2>
          <div className="space-y-2">
            <p><strong>Email :</strong> jihad.bakari@epitech.eu</p>
            <p><strong>Téléphone :</strong> 06 61 52 77 54</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. TVA</h2>
          <p>Franchise en base de TVA - TVA non applicable, art. 293 B du CGI</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Hébergement</h2>
          <div className="space-y-2">
            <p><strong>Hébergeur :</strong> Votre hébergeur (à insérer)</p>
            <p><strong>Adresse :</strong> [Adresse de l'hébergeur]</p>
            <p><strong>Téléphone :</strong> [Téléphone de l'hébergeur]</p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <em>Note : Les informations d'hébergement seront complétées lors de la mise en ligne du site.</em>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
          <p className="mt-4">
            La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">6. Protection des données personnelles (RGPD)</h2>
          
          <h3 className="text-xl font-medium mb-3">6.1 Collecte des données</h3>
          <p>
            Les données personnelles collectées sur ce site sont traitées dans le cadre de la relation commerciale et de la prestation de services. 
            La base juridique du traitement est l'exécution du contrat et l'intérêt légitime.
          </p>

          <h3 className="text-xl font-medium mb-3 mt-6">6.2 Données collectées</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Nom de l'entreprise (optionnel)</li>
            <li>Informations relatives au projet</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-6">6.3 Finalités du traitement</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Réponse aux demandes de devis et de contact</li>
            <li>Exécution des prestations de services</li>
            <li>Suivi de la relation commerciale</li>
            <li>Amélioration de nos services</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-6">6.4 Destinataires des données</h3>
          <p>
            Les données sont destinées à Jihad Bakari - Pixel Web et ne sont pas transmises à des tiers, 
            sauf obligation légale ou réglementaire.
          </p>

          <h3 className="text-xl font-medium mb-3 mt-6">6.5 Durée de conservation</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Données de contact : 3 ans après le dernier contact</li>
            <li>Données comptables : 10 ans (obligation légale)</li>
            <li>Données de facturation : 10 ans (obligation légale)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-6">6.6 Vos droits</h3>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Droit d'accès :</strong> Vous pouvez demander à connaître les données vous concernant</li>
            <li><strong>Droit de rectification :</strong> Vous pouvez demander la correction de données inexactes</li>
            <li><strong>Droit d'effacement :</strong> Vous pouvez demander la suppression de vos données</li>
            <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données</li>
            <li><strong>Droit à la portabilité :</strong> Vous pouvez demander la récupération de vos données</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-6">6.7 Contact RGPD</h3>
          <p>
            Pour exercer vos droits ou pour toute question relative au traitement de vos données personnelles, 
            vous pouvez nous contacter à l'adresse email suivante : jihad.bakari@epitech.eu
          </p>

          <h3 className="text-xl font-medium mb-3 mt-6">6.8 Transfert hors UE</h3>
          <p>
            En cas de transfert de données hors de l'Union Européenne (par exemple, si l'hébergeur est situé aux États-Unis), 
            des garanties appropriées seront mises en place conformément au RGPD.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
          <p>
            Ce site utilise des cookies techniques nécessaires au bon fonctionnement du site. 
            Aucun cookie de tracking ou de publicité n'est utilisé.
          </p>
          <p className="mt-4">
            Vous pouvez configurer votre navigateur pour refuser les cookies, 
            mais cela peut affecter le bon fonctionnement du site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">8. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont soumises au droit français. 
            En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>

        <footer className="mt-16 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </footer>
      </div>
    </div>
  )
}
