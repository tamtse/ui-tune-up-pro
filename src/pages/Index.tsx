import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Users, Calendar, BarChart3, Star, Check, ArrowRight, Menu, X, ChevronDown, Shield, Zap } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Studio</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Fonctionnalités</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Tarifs</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">À propos</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" className="text-gray-600">
                Se connecter
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Essai gratuit
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Fonctionnalités</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Tarifs</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">À propos</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
                <div className="flex flex-col gap-2 pt-4">
                  <Button variant="ghost" className="justify-start">Se connecter</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white justify-start">Essai gratuit</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Tout ce dont les photographes ont
                <span className="block">besoin pour gérer leur entreprise</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 max-w-lg">
                De la planification à la livraison, gérez tous vos projets photographiques en un seul endroit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
                  Commencer gratuitement
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8">
                  Regarder la démo
                </Button>
              </div>
            </div>
            
            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="bg-white rounded-lg p-6 text-gray-900">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Tableau de bord</h3>
                    <Badge className="bg-green-100 text-green-800">En ligne</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">€4,250</div>
                      <div className="text-sm text-gray-600">Revenus ce mois</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-sm text-gray-600">Projets actifs</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm">Mariage Sophie & Marc</span>
                      <Badge variant="outline" className="text-xs">En cours</Badge>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm">Portrait Corporate</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">Terminé</Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">Shooting Mode</span>
                      <Badge variant="outline" className="text-xs">Planifié</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section 1 */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Un logiciel adapté pour les professionnels de la photographie
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Gérez vos clients, organisez vos séances, suivez vos revenus et automatisez votre facturation. 
                Tout ce dont vous avez besoin pour faire croître votre entreprise photographique.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Découvrir les fonctionnalités
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gray-100 rounded-2xl p-8 relative">
                <div className="absolute top-4 right-4">
                  <Camera className="w-16 h-16 text-blue-600 opacity-20" />
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Gestion des clients</h3>
                      <p className="text-sm text-gray-600">45 clients actifs</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Marie Dubois</span>
                      <span className="text-green-600">Payé</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Thomas Martin</span>
                      <span className="text-orange-600">En attente</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section 2 */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Tout le nécessaire pour votre entreprise
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Planification intelligente</h3>
              <p className="text-gray-600">Gérez votre calendrier, planifiez vos séances et synchronisez avec vos clients.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Analyses détaillées</h3>
              <p className="text-gray-600">Suivez vos performances, analysez vos revenus et optimisez votre rentabilité.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Sécurité garantie</h3>
              <p className="text-gray-600">Vos données et celles de vos clients sont protégées par un chiffrement de niveau bancaire.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Augmentez votre productivité et gagnez en temps
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Automatisez les tâches répétitives et concentrez-vous sur votre art. Notre plateforme vous fait gagner jusqu'à 10 heures par semaine.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Automatisation</h3>
              <p className="text-gray-600">Factures, rappels et suivis automatiques pour un gain de temps maximal.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
              <p className="text-gray-600">Partagez vos galeries avec vos clients et recevez leurs retours en temps réel.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Optimisation</h3>
              <p className="text-gray-600">Analyses avancées pour identifier les opportunités d'amélioration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Tarifs simples et flexibles
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Gratuit */}
            <Card className="bg-white text-gray-900 border-0">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl mb-2">Gratuit</CardTitle>
                <div className="text-4xl font-bold">0€</div>
                <div className="text-gray-600">par mois</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Jusqu'à 5 clients</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">1 GB de stockage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Support email</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Facturation basique</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Commencer gratuitement
                </Button>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="bg-blue-600 text-white border-2 border-blue-400 transform scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white px-4 py-1">
                  Plus populaire
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl mb-2">Pro</CardTitle>
                <div className="text-4xl font-bold">29€</div>
                <div className="text-blue-200">par mois</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">Clients illimités</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">100 GB de stockage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">Support prioritaire</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">Automatisation avancée</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">Analyses détaillées</span>
                  </li>
                </ul>
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  Choisir Pro
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="bg-white text-gray-900 border-0">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl mb-2">Enterprise</CardTitle>
                <div className="text-4xl font-bold">99€</div>
                <div className="text-gray-600">par mois</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Tout du plan Pro</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Stockage illimité</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Support téléphonique</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">API personnalisée</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Formation dédiée</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Contacter l'équipe
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              C'est pourquoi les clients nous aiment
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Cette plateforme a révolutionné ma façon de travailler. Je gagne un temps précieux sur la gestion administrative."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Marie Dubois</div>
                    <div className="text-sm text-gray-600">Photographe Portrait</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "L'interface est intuitive et mes clients adorent pouvoir suivre l'avancement de leurs projets en temps réel."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Thomas Martin</div>
                    <div className="text-sm text-gray-600">Photographe Mariage</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Les analyses m'aident à comprendre quels services sont les plus rentables. Indispensable pour mon business."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Sophie Laurent</div>
                    <div className="text-sm text-gray-600">Studio Photo</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Gérez efficacement vos prestations avec une plateforme centralisée
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Rejoignez plus de 2000 photographes qui utilisent notre solution pour développer leur activité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
                Commencer gratuitement
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8">
                Planifier une démo
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              Aucune carte bancaire requise • Configuration en 5 minutes • Support en français
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">Studio</span>
              </div>
              <p className="text-gray-400 mb-4">
                La solution complète pour gérer votre activité de photographe professionnel.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Intégrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Statut</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Studio. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;