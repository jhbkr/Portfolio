import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Jihad Bakari - Pixel Web",
  description: "Conditions générales de vente de Jihad Bakari - Pixel Web, micro-entrepreneur en développement web et mobile. Services de création de sites web, e-commerce et applications.",
}

export default function CGVPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Conditions Générales de Vente</h1>
        
        <div className="mb-8 p-4 bg-muted/20 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Préambule</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les prestations de services conclues par Jihad Bakari, micro-entrepreneur exerçant sous le nom commercial "Pixel Web", auprès de ses clients professionnels et particuliers.
          </p>
          <p className="mt-4">
            Toute commande implique l'acceptation sans réserve par l'acheteur des présentes conditions de vente. Aucune condition particulière ne peut, sauf acceptation expresse, prévaloir sur les présentes conditions générales de vente.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Identification du prestataire</h2>
          <div className="space-y-2">
            <p><strong>Raison sociale :</strong> Jihad Bakari</p>
            <p><strong>Nom commercial :</strong> Pixel Web</p>
            <p><strong>Statut juridique :</strong> Micro-entrepreneur (Entreprise Individuelle)</p>
            <p><strong>SIREN :</strong> 989 818 018</p>
            <p><strong>SIRET :</strong> 989 818 018 00016</p>
            <p><strong>Code APE :</strong> 62.01Z - Programmation informatique</p>
            <p><strong>Adresse :</strong> 69 - Rhône, France</p>
            <p><strong>Email :</strong> jihad.bakari@epitech.eu</p>
            <p><strong>Téléphone :</strong> 06 61 52 77 54</p>
            <p><strong>TVA :</strong> Franchise en base - TVA non applicable, art. 293 B du CGI</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Services proposés</h2>
          <p>Jihad Bakari - Pixel Web propose les services suivants :</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Création et développement de sites web vitrines</li>
            <li>Création et développement de sites e-commerce</li>
            <li>Développement d'applications web</li>
            <li>Refonte et maintenance de sites existants</li>
            <li>Optimisation SEO et performance</li>
            <li>Formation et accompagnement technique</li>
            <li>Services de maintenance et support</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Prix et modalités de paiement</h2>
          
          <h3 className="text-xl font-medium mb-3">4.1 Prix</h3>
          <p>
            Les prix sont exprimés en euros et hors taxes. La TVA n'est pas applicable (franchise en base, art. 293 B du CGI). 
            Les prix peuvent être révisés à tout moment, les nouveaux tarifs s'appliquent aux commandes passées après la date de révision.
          </p>

          <h3 className="text-xl font-medium mb-3 mt-6">4.2 Modalités de paiement</h3>
          <p>Le paiement s'effectue selon les modalités suivantes :</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>40% d'acompte</strong> à la commande</li>
            <li><strong>40% à la recette</strong> (validation des développements)</li>
            <li><strong>20% à la mise en ligne</strong> (livraison finale)</li>
          </ul>
          <p className="mt-4">
            <strong>Moyens de paiement acceptés :</strong> Virement bancaire, chèque
          </p>
          <p className="mt-2">
            <strong>Délai de paiement :</strong> 30 jours fin de mois pour les professionnels (B2B)
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Délais d'exécution</h2>
          <p>
            Les délais d'exécution sont donnés à titre indicatif et peuvent varier selon la complexité du projet et la disponibilité des éléments fournis par le client.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-4">
            <li><strong>Pack Vitrine :</strong> 1-2 semaines</li>
            <li><strong>Pack E-commerce :</strong> 3-4 semaines</li>
            <li><strong>Pack MVP :</strong> 4-6 semaines</li>
            <li><strong>Projets sur mesure :</strong> Selon cahier des charges</li>
          </ul>
          <p className="mt-4">
            En cas de retard imputable au prestataire, aucune pénalité ne pourra être exigée par le client, sauf en cas de faute lourde ou dolosive.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">6. Révisions et modifications</h2>
          <p>
            Chaque phase de développement inclut <strong>2 allers-retours de révisions</strong>. 
            Les modifications mineures sont incluses dans le prix initial.
          </p>
          <p className="mt-4">
            Les modifications majeures ou ajouts de fonctionnalités font l'objet d'un devis complémentaire.
            Le prestataire s'engage à répondre aux demandes de révision sous <strong>48h ouvrées maximum</strong>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">7. Propriété intellectuelle</h2>
          <p>
            La propriété intellectuelle des développements réalisés est transférée au client une fois la prestation entièrement soldée.
          </p>
          <p className="mt-4">
            Le client s'engage à respecter les droits de propriété intellectuelle du prestataire sur les éléments techniques, frameworks, bibliothèques et outils utilisés.
          </p>
          <p className="mt-4">
            Le prestataire conserve le droit d'utiliser les développements réalisés à des fins de démonstration dans son portfolio, sauf opposition expresse du client.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">8. Garanties et responsabilités</h2>
          
          <h3 className="text-xl font-medium mb-3">8.1 Garantie bugfix</h3>
          <p>
            Le prestataire garantit la correction des bugs détectés dans les <strong>7 jours suivant la mise en ligne</strong>.
            Cette garantie ne couvre pas les modifications demandées par le client après la livraison.
          </p>

          <h3 className="text-xl font-medium mb-3 mt-6">8.2 Limitation de responsabilité</h3>
          <p>
            La responsabilité du prestataire est limitée au montant HT de la prestation facturée.
            Le prestataire ne saurait être tenu responsable des dommages indirects, pertes de données ou préjudices commerciaux.
          </p>

          <h3 className="text-xl font-medium mb-3 mt-6">8.3 Obligations du client</h3>
          <p>Le client s'engage à :</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Fournir les informations et contenus nécessaires dans les délais convenus</li>
            <li>Respecter les délais de validation et de paiement</li>
            <li>Utiliser les développements conformément à leur destination</li>
            <li>Effectuer les sauvegardes nécessaires</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">9. Pénalités de retard</h2>
          <p>
            En cas de retard de paiement, des pénalités s'appliquent automatiquement :
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Taux d'intérêt :</strong> Taux légal en vigueur</li>
            <li><strong>Indemnité forfaitaire :</strong> 40 € (B2B, Code de commerce)</li>
          </ul>
          <p className="mt-4">
            Ces pénalités sont exigibles sans mise en demeure préalable.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">10. Livraison et réception</h2>
          <p>
            La livraison s'effectue par mise en ligne du site ou remise des fichiers sources selon les modalités définies dans le devis.
          </p>
          <p className="mt-4">
            La réception est réputée tacite si le client n'a pas formulé de réserves motivées par écrit dans les 7 jours suivant la livraison.
          </p>
          <p className="mt-4">
            <strong>Livrables inclus :</strong>
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Site mis en ligne et fonctionnel</li>
            <li>Fichiers sources</li>
            <li>Documentation technique</li>
            <li>Formation d'utilisation (1h)</li>
            <li>Assistance technique post-livraison (7 jours)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">11. Droit de rétractation</h2>
          <p>
            <strong>Pour les particuliers :</strong> Droit de rétractation de 14 jours à compter de la commande, sauf pour les prestations commencées avec accord exprès du client.
          </p>
          <p className="mt-4">
            <strong>Pour les professionnels :</strong> Aucun droit de rétractation n'est applicable (B2B).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">12. Force majeure</h2>
          <p>
            Les parties ne pourront être tenues responsables de l'inexécution de leurs obligations en cas de force majeure (événements imprévisibles, irrésistibles et extérieurs aux parties).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">13. Résiliation</h2>
          <p>
            En cas de manquement grave de l'une des parties à ses obligations, le contrat pourra être résilié de plein droit après mise en demeure restée sans effet pendant 15 jours.
          </p>
          <p className="mt-4">
            En cas de résiliation, le prestataire sera rémunéré au prorata des prestations effectivement réalisées.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">14. Litiges et droit applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux de Lyon seront seuls compétents.
          </p>
          <p className="mt-4">
            En cas de litige, les parties s'efforceront de trouver une solution amiable avant toute action judiciaire.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">15. Protection des données personnelles</h2>
          <p>
            Les données personnelles collectées dans le cadre de la relation commerciale sont traitées conformément à notre politique de confidentialité, accessible sur notre site web.
          </p>
          <p className="mt-4">
            Le client dispose des droits d'accès, de rectification, d'effacement et d'opposition sur ses données personnelles.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">16. Acceptation</h2>
          <p>
            L'acceptation des présentes conditions générales de vente est matérialisée par la signature du devis ou la validation de la commande.
          </p>
          <p className="mt-4">
            Toute modification des présentes CGV sera communiquée au client par email et s'appliquera aux nouvelles commandes.
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
