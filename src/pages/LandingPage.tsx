import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Calendar, 
  CreditCard, 
  Users, 
  FileText, 
  BarChart3, 
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Globe,
  Smartphone,
  Shield,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import userDashboardReal from "@/assets/user-dashboard-real.jpg";
import financeDashboardReal from "@/assets/finance-dashboard-real.jpg";
import adminDashboardReal from "@/assets/admin-dashboard-real.jpg";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Camera className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Studio</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Fonctionnalités
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tarifs
              </a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Témoignages
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">Se connecter</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/dashboard">Commencer gratuitement</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Star className="h-3 w-3 mr-1" />
                  4.8/5 sur nos avis clients
                </Badge>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Le seul outil qui réunit votre{" "}
                  <span className="text-primary">gestion photo</span>,{" "}
                  votre{" "}
                  <span className="text-primary">facturation</span>{" "}
                  et votre{" "}
                  <span className="text-primary underline decoration-2 underline-offset-4">CRM client</span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-lg">
                  Studio rassemble tous les outils nécessaires pour gérer votre activité de photographe professionnel. 
                  Simple, puissant et conçu pour vous faire gagner du temps.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8" asChild>
                  <Link to="/dashboard">
                    Démarrer maintenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  <Play className="mr-2 h-4 w-4" />
                  Voir la démo
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Gratuit pendant 14 jours</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Aucune carte bancaire requise</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={userDashboardReal} 
                  alt="Interface Studio - Dashboard utilisateur"
                  className="rounded-2xl shadow-2xl border"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl transform scale-110"></div>
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
      </section>

      {/* Features Bar */}
      <section className="bg-muted/30 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center">
            {[
              { icon: Calendar, text: "Planning séances" },
              { icon: Camera, text: "Galeries photo" },
              { icon: CreditCard, text: "Facturation auto" },
              { icon: Users, text: "CRM intégré" },
              { icon: BarChart3, text: "Analytics" }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground mb-8">
            +2,500 photographes professionnels ont déjà{" "}
            <span className="font-semibold text-foreground italic">adopté</span>{" "}
            Studio.
          </p>
          
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {["Studio Photo Pro", "Lumière & Co", "Click Studio", "Vision Photo", "Instant Memories"].map((name, index) => (
              <div key={index} className="text-lg font-semibold text-muted-foreground">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section id="features" className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Un logiciel <span className="italic">complet</span>, puissant et intégré
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Studio rassemble tous les outils et toutes les intégrations nécessaires pour gérer 
              l'ensemble de votre activité photographique professionnelle.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Gérez vos finances en temps réel</h3>
              <p className="text-muted-foreground">
                Suivez vos revenus, dépenses et bénéfices en temps réel. Créez des devis et factures 
                professionnels en quelques clics. Connectez vos comptes bancaires pour une synchronisation automatique.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Facturation automatisée</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Suivi des paiements</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Tableau de bord financier</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src={financeDashboardReal} 
                alt="Dashboard financier Studio"
                className="rounded-2xl shadow-xl border w-full"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative lg:order-1">
              <img 
                src={adminDashboardReal} 
                alt="Dashboard administrateur Studio"
                className="rounded-2xl shadow-xl border w-full"
              />
            </div>
            <div className="space-y-6 lg:order-2">
              <h3 className="text-2xl font-bold">Centralisez la gestion de vos clients</h3>
              <p className="text-muted-foreground">
                Un CRM intuitif pour gérer tous vos contacts, suivre vos projets et planifier vos séances. 
                Gardez un historique complet de chaque client et optimisez votre relation commerciale.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Base de données clients complète</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Planification des rendez-vous</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Historique des projets</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Pourquoi choisir Studio ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Une solution pensée par des photographes, pour des photographes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Gain de temps</h3>
                <p className="text-muted-foreground">
                  Automatisez vos tâches répétitives et gagnez jusqu'à 10 heures par semaine 
                  pour vous concentrer sur votre passion : la photographie.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Sécurité garantie</h3>
                <p className="text-muted-foreground">
                  Vos données sont protégées par un chiffrement de niveau bancaire. 
                  Sauvegardes automatiques et conformité RGPD.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Partout avec vous</h3>
                <p className="text-muted-foreground">
                  Application mobile native pour gérer votre activité où que vous soyez. 
                  Synchronisation en temps réel sur tous vos appareils.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Des tarifs transparents et flexibles
            </h2>
            <p className="text-lg text-muted-foreground">
              Choisissez l'abonnement qui correspond à votre activité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan Gratuit */}
            <Card className="relative">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">Découverte</h3>
                  <div className="text-3xl font-bold mb-4">
                    Gratuit
                  </div>
                  <p className="text-muted-foreground">Pour découvrir Studio</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Jusqu'à 5 clients</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">1 galerie photo</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Facturation simple</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Support email</span>
                  </li>
                </ul>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard">Commencer gratuitement</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Plan Pro */}
            <Card className="relative border-primary">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="px-3 py-1">Plus populaire</Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">Professionnel</h3>
                  <div className="text-3xl font-bold mb-4">
                    29€<span className="text-base font-normal text-muted-foreground">/mois</span>
                  </div>
                  <p className="text-muted-foreground">Pour les photographes pros</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Clients illimités</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Galeries illimitées</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">CRM complet</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Analytics avancées</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Support prioritaire</span>
                  </li>
                </ul>
                
                <Button className="w-full" asChild>
                  <Link to="/dashboard">Choisir Professionnel</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Plan Studio */}
            <Card className="relative">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">Studio</h3>
                  <div className="text-3xl font-bold mb-4">
                    89€<span className="text-base font-normal text-muted-foreground">/mois</span>
                  </div>
                  <p className="text-muted-foreground">Pour les équipes</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Tout du plan Pro</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Utilisateurs illimités</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">API personnalisée</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Support dédié</span>
                  </li>
                </ul>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard">Choisir Studio</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Prêt à transformer votre activité de photographe ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Rejoignez les milliers de photographes qui ont déjà fait confiance à Studio 
            pour développer leur entreprise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8" asChild>
              <Link to="/dashboard">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Parler à un expert
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Essai gratuit de 14 jours • Aucune carte bancaire requise • Support inclus
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Camera className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Studio</span>
              </div>
              <p className="text-muted-foreground">
                La solution complète pour gérer votre activité de photographe professionnel.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Intégrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Formation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Statut</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Confidentialité</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Studio. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}