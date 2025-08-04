import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Globe, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  ExternalLink,
  Power,
  PowerOff,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Vitrine {
  id: string;
  nom: string;
  sousDomaine: string;
  theme: string;
  statut: 'publié' | 'brouillon' | 'hors-ligne';
  dateCreation: string;
  derniereModification: string;
  visites: number;
  url: string;
}

const mockVitrines: Vitrine[] = [
  {
    id: "1",
    nom: "Studio Photo Lumière",
    sousDomaine: "studio-lumiere",
    theme: "Moderne",
    statut: "publié",
    dateCreation: "2024-01-15",
    derniereModification: "2024-01-20",
    visites: 1247,
    url: "https://studio-lumiere.mondomaine.com"
  },
  {
    id: "2", 
    nom: "Photographe Mariage",
    sousDomaine: "mariage-photo",
    theme: "Élégant",
    statut: "brouillon",
    dateCreation: "2024-01-10",
    derniereModification: "2024-01-18",
    visites: 0,
    url: "https://mariage-photo.mondomaine.com"
  },
  {
    id: "3",
    nom: "Portfolio Nature",
    sousDomaine: "nature-portfolio",
    theme: "Minimal",
    statut: "hors-ligne",
    dateCreation: "2023-12-20",
    derniereModification: "2024-01-05",
    visites: 856,
    url: "https://nature-portfolio.mondomaine.com"
  }
];

export default function SiteWeb() {
  const [vitrines] = useState<Vitrine[]>(mockVitrines);
  const navigate = useNavigate();

  const getStatutBadge = (statut: Vitrine['statut']) => {
    switch (statut) {
      case 'publié':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">En ligne</Badge>;
      case 'brouillon':
        return <Badge variant="secondary">Brouillon</Badge>;
      case 'hors-ligne':
        return <Badge variant="outline">Hors ligne</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const handleCreateVitrine = () => {
    navigate("/site-web/create");
  };

  const handleEditVitrine = (vitrineId: string) => {
    navigate(`/site-web/edit/${vitrineId}`);
  };

  const handleViewVitrine = (url: string) => {
    window.open(url, '_blank');
  };

  const statsCards = [
    {
      title: "Total Vitrines",
      value: vitrines.length.toString(),
      icon: Globe,
      description: "Vitrines créées"
    },
    {
      title: "En ligne",
      value: vitrines.filter(v => v.statut === 'publié').length.toString(),
      icon: Power,
      description: "Vitrines actives"
    },
    {
      title: "Visites totales",
      value: vitrines.reduce((acc, v) => acc + v.visites, 0).toLocaleString(),
      icon: BarChart3,
      description: "Ce mois-ci"
    },
    {
      title: "Brouillons",
      value: vitrines.filter(v => v.statut === 'brouillon').length.toString(),
      icon: Edit,
      description: "En cours"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Site Web</h1>
            <p className="text-muted-foreground">
              Gérez vos vitrines publiques et sous-domaines
            </p>
          </div>
          <Button onClick={handleCreateVitrine} className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Créer une vitrine
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="vitrines" className="space-y-4">
          <TabsList>
            <TabsTrigger value="vitrines">Mes Vitrines</TabsTrigger>
            <TabsTrigger value="themes">Thèmes</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="vitrines" className="space-y-4">
            {vitrines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vitrines.map((vitrine) => (
                  <Card key={vitrine.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{vitrine.nom}</CardTitle>
                          <CardDescription>
                            {vitrine.sousDomaine}.mondomaine.com
                          </CardDescription>
                        </div>
                        {getStatutBadge(vitrine.statut)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Thème:</span>
                          <span>{vitrine.theme}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Visites:</span>
                          <span>{vitrine.visites.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Modifié:</span>
                          <span>{new Date(vitrine.derniereModification).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditVitrine(vitrine.id)}
                          className="flex-1"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Éditer
                        </Button>
                        {vitrine.statut === 'publié' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewVitrine(vitrine.url)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune vitrine</h3>
                  <p className="text-muted-foreground mb-4">
                    Créez votre première vitrine pour commencer.
                  </p>
                  <Button onClick={handleCreateVitrine}>
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une vitrine
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="themes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thèmes disponibles</CardTitle>
                <CardDescription>
                  Sélectionnez un thème pour personnaliser vos vitrines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Moderne", "Élégant", "Minimal", "Artistique", "Professionnel"].map((theme) => (
                    <div key={theme} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded mb-3"></div>
                      <h4 className="font-medium">{theme}</h4>
                      <p className="text-sm text-muted-foreground">Thème {theme.toLowerCase()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres des vitrines</CardTitle>
                <CardDescription>
                  Configuration générale de vos vitrines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Domaine principal</label>
                  <p className="text-sm text-muted-foreground">mondomaine.com</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Analytics</label>
                  <p className="text-sm text-muted-foreground">Suivi des visites activé</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">SEO</label>
                  <p className="text-sm text-muted-foreground">Optimisation automatique activée</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}