import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Users, Calendar, BarChart3, Star, Check, ArrowRight, Zap, Shield, Globe } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "Gestion de Portfolio",
      description: "Organisez et présentez vos photos professionnellement avec des galeries intelligentes."
    },
    {
      icon: Users,
      title: "Gestion Clients",
      description: "Centralisez toutes les informations de vos clients et l'historique de vos collaborations."
    },
    {
      icon: Calendar,
      title: "Planification Séances",
      description: "Calendrier intégré pour gérer vos rendez-vous et shooting photo en temps réel."
    },
    {
      icon: BarChart3,
      title: "Analyses & Rapports",
      description: "Suivez votre performance et analysez vos revenus avec des tableaux de bord détaillés."
    }
  ];

  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "/mois",
      description: "Parfait pour débuter",
      features: [
        "Jusqu'à 10 clients",
        "1 GB de stockage photo",
        "Calendrier basique",
        "Support email"
      ],
      popular: false
    },
    {
      name: "Professionnel",
      price: "29€",
      period: "/mois",
      description: "Pour les photographes établis",
      features: [
        "Clients illimités",
        "100 GB de stockage",
        "Site vitrine inclus",
        "Analyses avancées",
        "Support prioritaire",
        "Facturation automatique"
      ],
      popular: true
    },
    {
      name: "Studio",
      price: "69€",
      period: "/mois",
      description: "Pour les équipes et studios",
      features: [
        "Tout du plan Pro",
        "Stockage illimité",
        "Multi-utilisateurs",
        "API personnalisée",
        "Formation dédiée",
        "Manager de compte"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Photographe Portrait",
      content: "Cette solution a transformé ma façon de travailler. Je gagne 3h par semaine sur la gestion administrative.",
      rating: 5
    },
    {
      name: "Thomas Martin",
      role: "Photographe Mariage",
      content: "L'interface est intuitive et mes clients adorent pouvoir suivre l'avancement de leurs projets en temps réel.",
      rating: 5
    },
    {
      name: "Sophie Laurent",
      role: "Studio Photo",
      content: "Parfait pour gérer notre équipe de 5 photographes. Les rapports nous aident à optimiser notre rentabilité.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit">
                <Zap className="w-3 h-3 mr-1" />
                Nouveau: Site vitrine inclus
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Tout ce dont les photographes ont besoin pour gérer leur
                <span className="text-accent"> entreprise</span>
              </h1>
              <p className="text-xl lg:text-2xl text-primary-foreground/90 max-w-lg">
                De la prise de contact à la livraison finale, centralisez et automatisez votre activité photographique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Essayer gratuitement
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Voir la démo
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-primary-foreground/80">
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Sans engagement
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Configuration en 5 min
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Données sécurisées
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent rounded-full"></div>
                      <span className="font-semibold">Dashboard</span>
                    </div>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold">€2,340</div>
                      <div className="text-sm text-primary-foreground/70">Ce mois</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold">18</div>
                      <div className="text-sm text-primary-foreground/70">Clients actifs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Fonctionnalités
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Un logiciel adapté pour les professionnels de la photographie
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Optimisez chaque aspect de votre activité avec des outils pensés spécifiquement pour les photographes professionnels.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Productivity Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Productivité
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Augmentez votre productivité et gagnez en temps
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Automatisez les tâches répétitives, organisez vos projets et concentrez-vous sur ce que vous faites de mieux : créer de magnifiques photos.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Facturation automatique</h3>
                    <p className="text-muted-foreground">Générez et envoyez vos factures automatiquement après chaque livraison.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Suivi des projets</h3>
                    <p className="text-muted-foreground">Gardez un œil sur l'avancement de tous vos projets en cours depuis un seul endroit.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Rappels intelligents</h3>
                    <p className="text-muted-foreground">Ne ratez plus jamais un rendez-vous ou une échéance importante.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-card rounded-2xl p-8 shadow-xl border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Projets en cours</h3>
                    <Badge variant="secondary">4 actifs</Badge>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Mariage Sophie & Marc", progress: 75, status: "En retouche" },
                      { name: "Shooting Corporate", progress: 100, status: "Livré" },
                      { name: "Portrait Famille Dubois", progress: 25, status: "En cours" },
                    ].map((project, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{project.name}</span>
                          <span className="text-muted-foreground">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2 transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground">{project.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Tarifs
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Tarifs simples et flexibles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choisissez le plan qui correspond à votre activité. Changez ou annulez à tout moment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-2 border-primary shadow-xl scale-105' : 'border shadow-lg'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Le plus populaire
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.name === "Gratuit" ? "Commencer gratuitement" : "Choisir ce plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Témoignages
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              C'est pourquoi les clients nous aiment
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Gérez efficacement vos prestations avec une plateforme centralisée
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Rejoignez plus de 2000 photographes qui font confiance à notre solution pour développer leur activité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Démarrer l'essai gratuit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Demander une démo
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-6">
              Aucune carte bancaire requise • Configuration en 5 minutes • Support en français
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-6 h-6 text-primary" />
                <span className="font-bold text-xl">PhotoCRM</span>
              </div>
              <p className="text-muted-foreground mb-4">
                La solution complète pour gérer votre activité de photographe professionnel.
              </p>
              <div className="flex gap-4">
                <Globe className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Intégrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tutoriels</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Statut</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Presse</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 PhotoCRM. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
