import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Palette, 
  Image, 
  Layout, 
  Settings, 
  Eye, 
  Smartphone, 
  Monitor,
  Plus,
  Pencil,
  Trash2,
  Copy,
  ExternalLink,
  Camera,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "modern",
    name: "Modern Portfolio",
    description: "Design épuré et moderne avec galeries en grille",
    image: "/placeholder-template-modern.jpg",
    features: ["Galerie en grille", "Navigation sticky", "Formulaire contact"],
    category: "portfolio"
  },
  {
    id: "classic",
    name: "Classic Elegance", 
    description: "Style classique et élégant pour photos de mariage",
    image: "/placeholder-template-classic.jpg",
    features: ["Carousel principal", "Sections personnalisables", "Blog intégré"],
    category: "wedding"
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Approche minimaliste mettant l'accent sur les photos",
    image: "/placeholder-template-minimal.jpg", 
    features: ["Design épuré", "Chargement rapide", "Focus sur l'image"],
    category: "art"
  }
];

const mockWebsites = [
  {
    id: "1",
    name: "Portfolio Principal",
    domain: "johndoe.vitrine.com",
    template: "Modern Portfolio",
    status: "published",
    lastModified: "2024-01-15",
    views: 1234
  },
  {
    id: "2", 
    name: "Mariages 2024",
    domain: "mariages.johndoe.com",
    template: "Classic Elegance",
    status: "draft",
    lastModified: "2024-01-10",
    views: 0
  }
];

export default function WebsiteBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState("websites");

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Créateur de Site Vitrine
            </h1>
            <p className="text-muted-foreground mt-1">
              Créez et gérez vos sites vitrine en quelques minutes
            </p>
          </div>
          <Button className="self-start sm:self-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Site
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="websites">Mes Sites</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="editor">Éditeur</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Mes Sites */}
          <TabsContent value="websites" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockWebsites.map((site) => (
                <Card key={site.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{site.name}</CardTitle>
                      <Badge variant={site.status === "published" ? "default" : "secondary"}>
                        {site.status === "published" ? "Publié" : "Brouillon"}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {site.domain}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Template: {site.template}</span>
                      <span>{site.views} vues</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Pencil className="h-3 w-3 mr-1" />
                        Éditer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates" className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold">Choisir un Template</h2>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant={previewMode === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                >
                  <Monitor className="h-4 w-4 mr-1" />
                  Desktop
                </Button>
                <Button
                  variant={previewMode === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                >
                  <Smartphone className="h-4 w-4 mr-1" />
                  Mobile
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card 
                  key={template.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-lg",
                    selectedTemplate === template.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center">
                      <Layout className="h-12 w-12 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={selectedTemplate === template.id ? "default" : "outline"}
                    >
                      {selectedTemplate === template.id ? "Sélectionné" : "Utiliser ce template"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Éditeur */}
          <TabsContent value="editor" className="space-y-4">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Panel de configuration */}
              <div className="lg:col-span-1 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Personnalisation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Logo</label>
                      <Button variant="outline" className="w-full">
                        <Image className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom du studio</label>
                      <input 
                        className="w-full px-3 py-2 border border-input rounded-md text-sm"
                        placeholder="Studio Photo"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Slogan</label>
                      <input 
                        className="w-full px-3 py-2 border border-input rounded-md text-sm"
                        placeholder="Capturer vos moments précieux"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Couleur principale</label>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-primary rounded border cursor-pointer"></div>
                        <div className="w-8 h-8 bg-secondary rounded border cursor-pointer"></div>
                        <div className="w-8 h-8 bg-accent rounded border cursor-pointer"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <input 
                        className="flex-1 px-2 py-1 border border-input rounded text-sm"
                        placeholder="contact@studio.com"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <input 
                        className="flex-1 px-2 py-1 border border-input rounded text-sm"
                        placeholder="+33 1 23 45 67 89"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <input 
                        className="flex-1 px-2 py-1 border border-input rounded text-sm"
                        placeholder="Paris, France"
                      />
                    </div>
                    
                    <div className="pt-2 border-t">
                      <label className="text-sm font-medium mb-2 block">Réseaux sociaux</label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-muted-foreground" />
                          <input 
                            className="flex-1 px-2 py-1 border border-input rounded text-sm"
                            placeholder="@studio_photo"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Facebook className="h-4 w-4 text-muted-foreground" />
                          <input 
                            className="flex-1 px-2 py-1 border border-input rounded text-sm"
                            placeholder="Studio Photo"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Aperçu */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Aperçu en temps réel
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-1" />
                          Sauvegarder
                        </Button>
                        <Button size="sm">
                          <Globe className="h-4 w-4 mr-1" />
                          Publier
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={cn(
                      "mx-auto bg-background border rounded-lg overflow-hidden",
                      previewMode === "desktop" ? "max-w-full" : "max-w-sm"
                    )}>
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <Camera className="h-16 w-16 text-primary mx-auto" />
                          <h3 className="text-xl font-bold">Studio Photo</h3>
                          <p className="text-muted-foreground">Aperçu de votre site vitrine</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Paramètres */}
          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres généraux</CardTitle>
                  <CardDescription>
                    Configuration de base pour vos sites vitrine
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom de domaine par défaut</label>
                    <input 
                      className="w-full px-3 py-2 border border-input rounded-md"
                      value="johndoe.vitrine.com"
                      readOnly
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Domaine personnalisé</label>
                    <input 
                      className="w-full px-3 py-2 border border-input rounded-md"
                      placeholder="www.mon-studio.com"
                    />
                    <p className="text-xs text-muted-foreground">
                      Configurez votre propre nom de domaine
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO et Analytics</CardTitle>
                  <CardDescription>
                    Optimisation pour les moteurs de recherche
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titre SEO par défaut</label>
                    <input 
                      className="w-full px-3 py-2 border border-input rounded-md"
                      placeholder="Studio Photo - Photographe professionnel"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description SEO</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-input rounded-md"
                      rows={3}
                      placeholder="Description de votre studio photo pour les moteurs de recherche..."
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Analytics activé</label>
                    <input type="checkbox" className="rounded" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}