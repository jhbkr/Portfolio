import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Jihad Bakari - Pixel Web",
  description: "Conditions générales de vente de Jihad Bakari - Pixel Web, micro-entrepreneur en développement web et mobile.",
}

export default function CGVPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Conditions Générales de Vente</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Identification du prestataire</h2>
          <div className="space-y-2">
            <p><strong>Nom :</strong> Jihad Bakari</p>
            <p><strong>Raison sociale :</strong> Pixel Web</p>
            <p><strong>Statut juridique :</strong> Micro-entrepreneur (Entreprise Individuelle)</p>
            <p><strong>SIREN :</strong> 989 818 018</p>
            <p><strong>SIRET :</strong> 989 818 018 00016</p>
            <p><strong>Code APE :</strong> 62.01Z - Programmation informatique</p>
            <p><strong>Email :</strong> jihad.bakari@epitech.eu</p>
            <p><strong>Téléphone :</strong> 06 61 52 77 54</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Description des services</h2>
          <p>
            Jihad Bakari - Pixel Web propose des services de développement web et mobile, incluant :
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Packs de développement :</strong> Sites vitrine, e-commerce, applications web, API</li>
            <li><strong>Options :</strong> Logo, SEO avancé, maintenance, formation</li>
            <li><strong>Maintenance :</strong> Services de maintenance et support technique</li>
            <li><strong>Process :</strong> Méthodologie agile avec sprints et livraisons itératives</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Prix et modalités de paiement</h2>
          
          <h3 className="text-xl font-medium mb-3">3.1 Prix</h3>
          <p>
            Tous les prix sont exprimés en euros et hors taxes. La TVA n'est pas applicable 
            (franchise en base, art. 293 B du CGI).
          </p>

          <h3 className="text-xl font-medium mb-3 mt-6">3.2 Modalités de paiement</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Acompte :</strong> 40% à la commande</li>
            <li><strong>Solde :</strong> 40% à la recette + 20% à la mise en ligne</li>
            <li><strong>Paiement :</strong> Par virement bancaire ou chèque</li>
            <li><strong>Délai de paiement :</strong> 30 jours fin de mois (B2B)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Délais d'exécution</h2>
          <p>Les délais estimatifs varient selon le pack choisi :</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Pack Vitrine :</strong> 1-2 semaines</li>
            <li><strong>Pack E-commerce :</strong> 3-4 semaines</li>
            <li><strong>Pack MVP :</strong> 4-6 semaines</li>
            <li><strong>Projets sur mesure :</strong> Selon cahier des charges</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            <em>Ces délais sont donnés à titre indicatif et peuvent varier selon la complexité du projet.</em>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Révisions et modifications</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Révisions incluses :</strong> 2 allers-retours par phase de développement</li>
            <li><strong>Modifications mineures :</strong> Incluses dans le prix initial</li>
            <li><strong>Modifications majeures :</strong> Faisant l'objet d'un devis complémentaire</li>
            <li><strong>Délai de réponse :</strong> 48h ouvrées maximum</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">6. Propriété intellectuelle</h2>
          <p>
            La propriété intellectuelle des développements réalisés est transférée au client 
            une fois la prestation entièrement soldée.
          </p>
          <p className="mt-4">
            Le client s'engage à respecter les droits de propriété intellectuelle du prestataire 
            sur les éléments techniques, frameworks et bibliothèques utilisés.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">7. Garantie et support</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Garantie bugfix :</strong> 7 jours après la mise en ligne</li>
            <li><strong>Support minimal :</strong> Assistance technique de base incluse</li>
            <li><strong>Maintenance :</strong> Faisant l'objet d'un contrat séparé</li>
            <li><strong>Exclusions :</strong> Modifications non demandées, interventions tierces</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">8. Pénalités de retard</h2>
          <p>
            En cas de retard de paiement, des pénalités seront appliquées :
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Taux :</strong> Taux légal en vigueur</li>
            <li><strong>Indemnité forfaitaire :</strong> 40€ (B2B)</li>
            <li><strong>Application :</strong> Sans préjudice d'un complément si frais supérieurs</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">9. Livraison et exécution</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Livraison :</strong> Mise en ligne du site ou remise des fichiers sources</li>
            <li><strong>Handover :</strong> Formation et documentation fournies</li>
            <li><strong>Validation :</strong> Recette client obligatoire avant finalisation</li>
            <li><strong>Support post-livraison :</strong> 7 jours d'assistance technique</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">10. Rétractation</h2>
          <p>
            <strong>Non applicable pour les professionnels (B2B).</strong>
          </p>
          <p className="mt-4">
            Pour les particuliers, le droit de rétractation de 14 jours ne s'applique pas 
            aux prestations de services entamées avec l'accord du client.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">11. Force majeure</h2>
          <p>
            Le prestataire ne pourra être tenu responsable de l'inexécution de ses obligations 
            en cas de force majeure (pandémie, grève, panne technique majeure, etc.).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">12. Résiliation</h2>
          <p>
            Le contrat peut être résilié par l'une des parties en cas de manquement grave 
            aux obligations contractuelles, après mise en demeure restée sans effet pendant 15 jours.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">13. Litiges et tribunal compétent</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Tribunal compétent :</strong> Lyon, France</li>
            <li><strong>Droit applicable :</strong> Droit français</li>
            <li><strong>Médiation :</strong> Possible avant toute action en justice</li>
            <li><strong>Contact médiation :</strong> jihad.bakari@epitech.eu</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">14. Protection des données</h2>
          <p>
            Le traitement des données personnelles est régi par notre politique de confidentialité 
            et conforme au RGPD. Les données sont collectées pour l'exécution du contrat.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">15. Acceptation des conditions</h2>
          <p>
            L'acceptation de ces conditions générales de vente est matérialisée par :
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>La signature du devis</li>
            <li>Le versement de l'acompte</li>
            <li>La validation du projet</li>
          </ul>
        </section>

        <footer className="mt-16 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <em>Ces conditions générales de vente sont conformes aux obligations légales françaises 
            et peuvent être modifiées à tout moment. La version en vigueur est celle accessible sur le site.</em>
          </p>
        </footer>
      </div>
    </div>
  )
}
