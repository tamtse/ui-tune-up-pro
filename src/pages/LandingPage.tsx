import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, StarIcon } from "lucide-react";
import dashboardInterface from "@/assets/dashboard-interface.jpg";
import photographerWorkspace from "@/assets/photographer-workspace.jpg";
import mobileInterface from "@/assets/mobile-interface.jpg";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-lg">STUDIO</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Accueil</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Fonctionnalités</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Tarifs</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Se connecter
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Tout ce dont les photographes ont<br />
              besoin pour gérer leur entreprise
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              De la planification des séances à la livraison des photos, en passant par la facturation et le suivi client. 
              Studio simplifie tous les aspects de votre activité de photographe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Commencer gratuitement
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Voir la démonstration
              </Button>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-2xl p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">147</div>
                  <div className="text-sm text-gray-600">Clients actifs</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">€12,450</div>
                  <div className="text-sm text-gray-600">Revenus ce mois</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">23</div>
                  <div className="text-sm text-gray-600">Séances à venir</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-gray-600">Satisfaction client</div>
                </div>
              </div>
              <img 
                src={dashboardInterface} 
                alt="Interface tableau de bord"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Photography Software Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Un logiciel adapté pour<br />
                les professionnels de la photographie
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Studio a été conçu spécifiquement pour répondre aux besoins uniques des photographes professionnels. 
                Gérez vos clients, planifiez vos séances, facturez vos prestations et livrez vos photos en toute simplicité.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Découvrir toutes les fonctionnalités
              </Button>
            </div>
            <div className="relative">
              <img 
                src={photographerWorkspace} 
                alt="Photographe professionnel au travail"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tout le nécessaire pour votre entreprise
            </h2>
            <p className="text-lg text-muted-foreground">
              Une suite complète d'outils pour gérer efficacement votre activité de photographe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl">📅</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestion des rendez-vous</h3>
                <p className="text-muted-foreground">
                  Planifiez et organisez vos séances photo avec un calendrier intuitif et des rappels automatiques.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-600 text-xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Facturation automatisée</h3>
                <p className="text-muted-foreground">
                  Créez et envoyez des devis et factures professionnels en quelques clics.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-600 text-xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">CRM intégré</h3>
                <p className="text-muted-foreground">
                  Centralisez toutes les informations de vos clients et suivez vos interactions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-orange-600 text-xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Galeries en ligne</h3>
                <p className="text-muted-foreground">
                  Créez des galeries privées pour partager et vendre vos photos à vos clients.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-red-600 text-xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Analytiques</h3>
                <p className="text-muted-foreground">
                  Suivez vos performances avec des rapports détaillés sur votre activité.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-teal-600 text-xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Application mobile</h3>
                <p className="text-muted-foreground">
                  Gérez votre activité où que vous soyez avec notre application mobile.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <img 
              src={mobileInterface} 
              alt="Interface mobile de l'application"
              className="mx-auto rounded-lg shadow-lg max-w-4xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Productivity Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Augmenter votre productivité<br />
            et gagner en temps
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Studio automatise les tâches répétitives et vous fait gagner des heures chaque semaine. 
            Concentrez-vous sur ce que vous aimez : la photographie.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gain de temps</h3>
                <p className="text-muted-foreground">
                  Économisez jusqu'à 10 heures par semaine grâce à l'automatisation des tâches administratives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Plus de créativité</h3>
                <p className="text-muted-foreground">
                  Libérez votre temps pour vous concentrer sur la création et le développement artistique.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Croissance accelerée</h3>
                <p className="text-muted-foreground">
                  Développez votre activité plus rapidement avec des outils de gestion performants.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tarifs simples et flexibles
            </h2>
            <p className="text-lg text-blue-100">
              Choisissez l'abonnement qui convient le mieux à votre activité de photographe professionnel
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan Gratuit */}
            <Card className="bg-white text-gray-900">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Gratuit</h3>
                  <div className="text-4xl font-bold mb-4">0€<span className="text-lg font-normal">/mois</span></div>
                  <p className="text-muted-foreground">Parfait pour débuter</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Jusqu'à 5 clients</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Gestion des rendez-vous</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Facturation simple</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>1 galerie en ligne</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Support email</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Commencer gratuitement
                </Button>
              </CardContent>
            </Card>

            {/* Plan Pro */}
            <Card className="bg-white text-gray-900 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white">
                Plus populaire
              </Badge>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <div className="text-4xl font-bold mb-4">29€<span className="text-lg font-normal">/mois</span></div>
                  <p className="text-muted-foreground">Pour les professionnels</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Clients illimités</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>CRM avancé</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Facturation automatisée</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Galeries illimitées</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Analytiques détaillées</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Application mobile</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Support prioritaire</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Choisir Pro
                </Button>
              </CardContent>
            </Card>

            {/* Plan Premium */}
            <Card className="bg-white text-gray-900">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Premium</h3>
                  <div className="text-4xl font-bold mb-4">99€<span className="text-lg font-normal">/mois</span></div>
                  <p className="text-muted-foreground">Pour les studios</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Tout du plan Pro</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Multi-utilisateurs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>API personnalisée</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Intégrations avancées</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Formation personnalisée</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Support dédié</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Contacter l'équipe
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              C'est pourquoi les clients nous aiment
            </h2>
            <p className="text-lg text-muted-foreground">
              Découvrez ce que disent nos utilisateurs de Studio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Studio a révolutionné ma façon de gérer mon activité. Je gagne un temps précieux sur l'administratif 
                  et je peux me concentrer sur ma passion : la photographie."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Marie Dubois</div>
                    <div className="text-sm text-muted-foreground">Photographe de mariage</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Les galeries en ligne de Studio sont parfaites pour présenter mon travail à mes clients. 
                  L'interface est intuitive et très professionnelle."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Thomas Martin</div>
                    <div className="text-sm text-muted-foreground">Photographe portrait</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Depuis que j'utilise Studio, mon chiffre d'affaires a augmenté de 30%. 
                  Les outils de suivi et d'analyse sont remarquables."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Sophie Bernard</div>
                    <div className="text-sm text-muted-foreground">Studio Bernard Photo</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Gérez efficacement vos prestations<br />
            avec une plateforme centralisée
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Rejoignez plus de 10 000 photographes qui font confiance à Studio pour développer leur activité. 
            Commencez votre essai gratuit dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Commencer gratuitement
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
              Planifier une démonstration
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-semibold text-white text-lg">STUDIO</span>
              </div>
              <p className="text-sm">
                La solution complète pour gérer votre activité de photographe professionnel.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white">Tarifs</a></li>
                <li><a href="#" className="hover:text-white">Démonstration</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Formation</a></li>
                <li><a href="#" className="hover:text-white">Statut</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">À propos</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carrières</a></li>
                <li><a href="#" className="hover:text-white">Partenaires</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2024 Studio. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white">Mentions légales</a>
              <a href="#" className="text-sm hover:text-white">Confidentialité</a>
              <a href="#" className="text-sm hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}