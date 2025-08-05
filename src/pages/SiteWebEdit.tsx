import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  Globe, 
  Upload, 
  ExternalLink,
  Power,
  PowerOff,
  Trash2,
  X,
  Settings
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface VitrineData {
  id: string;
  nom: string;
  sousDomaine: string;
  description: string;
  couleurPrimaire: string;
  couleurSecondaire: string;
  couleurAccent: string;
  statut: 'publié' | 'brouillon' | 'hors-ligne';
  logo: string | null;
  imageCouverture: string | null;
  biographie: string;
  galerie: string[];
  reseauxSociaux: {
    facebook: string;
    instagram: string;
    linkedin: string;
    website: string;
  };
  contact: {
    email: string;
    telephone: string;
    adresse: string;
  };
  customPages?: {
    about?: {
      enabled: boolean;
      content?: string;
    };
    contact?: {
      enabled: boolean;
      content?: string;
    };
    gallery?: {
      enabled: boolean;
      images?: string[];
    };
  };
  dateCreation: string;
  derniereModification: string;
  visites: number;
  url: string;
}

const mockVitrine: VitrineData = {
  id: "1",
  nom: "Studio Photo Lumière",
  sousDomaine: "studio-lumiere",
  description: "Studio photo professionnel spécialisé dans les portraits et événements",
  couleurPrimaire: "#e91e63",
  couleurSecondaire: "#f8bbd9",
  couleurAccent: "#ad1457",
  statut: "publié",
  logo: "/lovable-uploads/7285260e-899b-4817-9f82-90b6507e5c8d.png",
  imageCouverture: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800",
  biographie: "Photographe professionnel depuis 10 ans, je me spécialise dans les portraits, mariages et événements corporate. Mon approche artistique combine technique moderne et sensibilité créative pour capturer vos moments les plus précieux.",
  galerie: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400", 
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400",
    "https://images.unsplash.com/photo-1594736797933-d0d29a65a3d0?w=400",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=400",
    "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=400"
  ],
  reseauxSociaux: {
    facebook: "https://facebook.com/studiolumiere",
    instagram: "https://instagram.com/studiolumiere",
    linkedin: "https://linkedin.com/company/studiolumiere",
    website: "https://studiolumiere.com"
  },
  contact: {
    email: "contact@studiolumiere.com",
    telephone: "+33 1 23 45 67 89",
    adresse: "123 Rue de la Photo\n75001 Paris\nFrance"
  },
  customPages: {
    about: { 
      enabled: true,
      content: "Notre studio existe depuis 2014 et a réalisé plus de 500 séances photo. Nous nous spécialisons dans la photographie de mariage, portrait et événementiel."
    },
    contact: { 
      enabled: true,
      content: "N'hésitez pas à nous contacter pour discuter de votre projet photo. Nous offrons une consultation gratuite."
    },
    gallery: { 
      enabled: true,
      images: [
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400",
        "https://images.unsplash.com/photo-1542435503-956c469947f6?w=400"
      ]
    }
  },
  dateCreation: "2024-01-15",
  derniereModification: "2024-01-20",
  visites: 1247,
  url: "https://studio-lumiere.mondomaine.com"
};

const palettesCouleurs = [
  { nom: "Bleu Professionnel", primaire: "#2563eb", secondaire: "#1e40af", accent: "#3b82f6" },
  { nom: "Vert Nature", primaire: "#16a34a", secondaire: "#15803d", accent: "#22c55e" },
  { nom: "Violet Créatif", primaire: "#9333ea", secondaire: "#7c3aed", accent: "#a855f7" },
  { nom: "Orange Énergique", primaire: "#ea580c", secondaire: "#dc2626", accent: "#f97316" },
  { nom: "Rose Élégant", primaire: "#e11d48", secondaire: "#be185d", accent: "#f43f5e" },
  { nom: "Gris Minimaliste", primaire: "#374151", secondaire: "#1f2937", accent: "#6b7280" }
];

export default function SiteWebEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [vitrine, setVitrine] = useState<VitrineData | null>(null);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    // Simulation chargement des données
    setVitrine(mockVitrine);
  }, [id]);

  if (!vitrine) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Chargement...</p>
        </div>
      </AdminLayout>
    );
  }

  const handleChange = (field: string, value: any) => {
    setVitrine(prev => prev ? { ...prev, [field]: value } : null);
    setIsModified(true);
  };

  const handleNestedChange = (parent: string, field: string, value: string) => {
    setVitrine(prev => {
      if (!prev) return null;
      const parentObj = prev[parent as keyof VitrineData] as Record<string, any>;
      return {
        ...prev,
        [parent]: { ...parentObj, [field]: value }
      };
    });
    setIsModified(true);
  };

  const handleSave = () => {
    toast.success("Vitrine mise à jour avec succès!");
    setIsModified(false);
  };

  const handlePublish = () => {
    handleChange('statut', 'publié');
    toast.success("Vitrine publiée avec succès!");
    setIsModified(false);
  };

  const handleUnpublish = () => {
    handleChange('statut', 'hors-ligne');
    toast.success("Vitrine mise hors ligne");
    setIsModified(false);
  };

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette vitrine ? Cette action est irréversible.")) {
      toast.success("Vitrine supprimée");
      navigate("/site-web");
    }
  };

  const getStatutBadge = (statut: VitrineData['statut']) => {
    switch (statut) {
      case 'publié':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">En ligne</Badge>;
      case 'brouillon':
        return <Badge variant="secondary">Brouillon</Badge>;
      case 'hors-ligne':
        return <Badge variant="outline">Hors ligne</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/site-web")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Ma vitrine - {vitrine.nom}</h1>
              {getStatutBadge(vitrine.statut)}
            </div>
            <p className="text-muted-foreground">
              {vitrine.sousDomaine}.mondomaine.com
            </p>
          </div>
          <div className="flex gap-2">
            {vitrine.statut === 'publié' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(vitrine.url, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Voir
              </Button>
            )}
            {vitrine.statut === 'publié' ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleUnpublish}
              >
                <PowerOff className="mr-2 h-4 w-4" />
                Mettre hors ligne
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handlePublish}
              >
                <Power className="mr-2 h-4 w-4" />
                Publier
              </Button>
            )}
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{vitrine.visites.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Visites totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {new Date(vitrine.derniereModification).toLocaleDateString()}
              </div>
              <p className="text-xs text-muted-foreground">Dernière modification</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">Personnalisée</div>
              <p className="text-xs text-muted-foreground">Palette de couleurs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {new Date(vitrine.dateCreation).toLocaleDateString()}
              </div>
              <p className="text-xs text-muted-foreground">Date de création</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="design">Couleurs</TabsTrigger>
                <TabsTrigger value="contenu">Contenu</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                    <CardDescription>
                      Modifiez le nom et la description de votre vitrine
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom de la vitrine</Label>
                      <Input
                        id="nom"
                        value={vitrine.nom}
                        onChange={(e) => handleChange('nom', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Sous-domaine</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          value={vitrine.sousDomaine}
                          disabled
                          className="flex-1 bg-muted"
                        />
                        <span className="text-sm text-muted-foreground">.mondomaine.com</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Le sous-domaine ne peut pas être modifié après création
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description courte</Label>
                      <Textarea
                        id="description"
                        value={vitrine.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choix du thème</CardTitle>
                    <CardDescription>
                      Sélectionnez le design de votre site vitrine
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Thème 1 - Galerie simple */}
                      <div className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                        true ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="bg-gray-100 rounded-lg p-3 mb-3">
                          <div className="bg-white rounded shadow-sm p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-1">
                                <div className="w-4 h-4 rounded-full bg-primary"></div>
                                <span className="text-xs font-medium">Studio</span>
                              </div>
                              <div className="flex space-x-2 text-xs">
                                <span className="text-primary">GALERIE</span>
                                <span className="text-gray-400">CONTACT</span>
                              </div>
                            </div>
                            <div className="text-center py-2">
                              <h3 className="text-sm font-light text-primary mb-1">Photo Gallery</h3>
                              <p className="text-xs text-gray-500">- SHARING MOMENTS -</p>
                            </div>
                            <div className="grid grid-cols-4 gap-1">
                              {[1,2,3,4].map((i) => (
                                <div key={i} className="aspect-square bg-gray-200 rounded-sm"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm">Thème Galerie Simple</h4>
                        <p className="text-xs text-gray-500">Design épuré avec focus sur les images</p>
                      </div>

                      {/* Thème 2 - Masonry */}
                      <div className="cursor-pointer p-4 border-2 rounded-lg transition-all border-gray-200 hover:border-gray-300">
                        <div className="bg-gray-100 rounded-lg p-3 mb-3">
                          <div className="bg-white rounded shadow-sm p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-1">
                                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                                <span className="text-xs font-medium">Portfolio</span>
                              </div>
                              <div className="flex space-x-2 text-xs">
                                <span className="text-emerald-500">WORKS</span>
                                <span className="text-gray-400">ABOUT</span>
                              </div>
                            </div>
                            <div className="text-center py-2">
                              <h3 className="text-sm font-light text-emerald-500 mb-1">My Portfolio</h3>
                              <p className="text-xs text-gray-500">Creative Works</p>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              <div className="aspect-square bg-gray-200 rounded-sm"></div>
                              <div className="aspect-[3/4] bg-gray-200 rounded-sm"></div>
                              <div className="aspect-square bg-gray-200 rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm">Thème Masonry</h4>
                        <p className="text-xs text-gray-500">Layout créatif avec grille dynamique</p>
                      </div>

                      {/* Thème 3 - Minimal */}
                      <div className="cursor-pointer p-4 border-2 rounded-lg transition-all border-gray-200 hover:border-gray-300">
                        <div className="bg-gray-100 rounded-lg p-3 mb-3">
                          <div className="bg-white rounded shadow-sm p-3">
                            <div className="text-center mb-2">
                              <div className="w-6 h-6 rounded-full bg-gray-800 mx-auto mb-1"></div>
                              <span className="text-xs font-light tracking-wider">MINIMAL STUDIO</span>
                            </div>
                            <div className="text-center py-2">
                              <h3 className="text-xs font-light text-gray-800 mb-1">Photography</h3>
                              <div className="w-8 h-px bg-gray-300 mx-auto"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {[1,2].map((i) => (
                                <div key={i} className="aspect-[4/5] bg-gray-200 rounded-sm"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm">Thème Minimal</h4>
                        <p className="text-xs text-gray-500">Design épuré et sophistiqué</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Personnalisation des couleurs</CardTitle>
                    <CardDescription>
                      Adaptez les couleurs du thème sélectionné
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Palettes prédéfinies */}
                    <div className="space-y-3">
                      <Label>Palettes prédéfinies</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {palettesCouleurs.map((palette) => (
                          <div
                            key={palette.nom}
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${
                              vitrine.couleurPrimaire === palette.primaire 
                                ? 'border-primary ring-2 ring-primary/20' 
                                : 'hover:border-primary/50'
                            }`}
                            onClick={() => {
                              handleChange('couleurPrimaire', palette.primaire);
                              handleChange('couleurSecondaire', palette.secondaire);
                              handleChange('couleurAccent', palette.accent);
                            }}
                          >
                            <div className="flex gap-1 mb-2">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: palette.primaire }}
                              ></div>
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: palette.secondaire }}
                              ></div>
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: palette.accent }}
                              ></div>
                            </div>
                            <p className="text-sm font-medium">{palette.nom}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Couleurs personnalisées */}
                    <div className="space-y-4">
                      <Label>Couleurs personnalisées</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="couleurPrimaire">Couleur principale</Label>
                          <div className="flex gap-2">
                            <Input
                              id="couleurPrimaire"
                              type="color"
                              value={vitrine.couleurPrimaire}
                              onChange={(e) => handleChange('couleurPrimaire', e.target.value)}
                              className="w-12 h-10 p-1 border rounded"
                            />
                            <Input
                              value={vitrine.couleurPrimaire}
                              onChange={(e) => handleChange('couleurPrimaire', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="couleurSecondaire">Couleur secondaire</Label>
                          <div className="flex gap-2">
                            <Input
                              id="couleurSecondaire"
                              type="color"
                              value={vitrine.couleurSecondaire}
                              onChange={(e) => handleChange('couleurSecondaire', e.target.value)}
                              className="w-12 h-10 p-1 border rounded"
                            />
                            <Input
                              value={vitrine.couleurSecondaire}
                              onChange={(e) => handleChange('couleurSecondaire', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="couleurAccent">Couleur d'accent</Label>
                          <div className="flex gap-2">
                            <Input
                              id="couleurAccent"
                              type="color"
                              value={vitrine.couleurAccent}
                              onChange={(e) => handleChange('couleurAccent', e.target.value)}
                              className="w-12 h-10 p-1 border rounded"
                            />
                            <Input
                              value={vitrine.couleurAccent}
                              onChange={(e) => handleChange('couleurAccent', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Aperçu des couleurs */}
                    <div className="space-y-3">
                      <Label>Aperçu de votre palette</Label>
                      <div className="p-4 border rounded-lg" style={{ 
                        background: `linear-gradient(135deg, ${vitrine.couleurPrimaire}20, ${vitrine.couleurAccent}20)` 
                      }}>
                        <div className="space-y-3">
                          <div 
                            className="px-4 py-2 rounded text-white text-sm font-medium"
                            style={{ backgroundColor: vitrine.couleurPrimaire }}
                          >
                            Bouton principal
                          </div>
                          <div 
                            className="px-4 py-2 rounded text-white text-sm"
                            style={{ backgroundColor: vitrine.couleurSecondaire }}
                          >
                            Bouton secondaire
                          </div>
                          <div 
                            className="px-3 py-1 rounded text-white text-xs inline-block"
                            style={{ backgroundColor: vitrine.couleurAccent }}
                          >
                            Badge d'accent
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Aperçu du thème</CardTitle>
                    <CardDescription>
                      Prévisualisation de votre site vitrine
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                      <div className="bg-white rounded shadow-sm p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                              style={{ backgroundColor: vitrine.couleurPrimaire }}
                            >
                              {vitrine.nom?.charAt(0) || 'L'}
                            </div>
                            <span className="font-semibold text-sm">{vitrine.nom || 'Mon Studio'}</span>
                          </div>
                          <div className="flex space-x-4 text-xs">
                            <span style={{ color: vitrine.couleurPrimaire }}>GALERIE</span>
                            <span className="text-gray-500">À PROPOS</span>
                            <span className="text-gray-500">CONTACT</span>
                          </div>
                        </div>
                        <div className="text-center py-6">
                          <h2 className="text-2xl font-light mb-2" style={{ color: vitrine.couleurPrimaire }}>
                            Photo Gallery
                          </h2>
                          <p className="text-sm text-gray-600">- SHARING MOMENTS -</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {[1,2,3,4].map((i) => (
                            <div key={i} className="aspect-square bg-gray-200 rounded"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Images</CardTitle>
                    <CardDescription>
                      Logo et image de couverture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Logo</Label>
                        <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Glissez votre logo ici ou{" "}
                            <label className="text-primary cursor-pointer">
                              parcourez
                              <input type="file" className="hidden" accept="image/*" />
                            </label>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Image de couverture</Label>
                        <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Glissez votre image ici ou{" "}
                            <label className="text-primary cursor-pointer">
                              parcourez
                              <input type="file" className="hidden" accept="image/*" />
                            </label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Galerie d'images</CardTitle>
                    <CardDescription>
                      Maximum 30 images autorisées
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            console.log(`${files.length} fichiers sélectionnés`);
                            // TODO: Upload vers S3
                          }}
                        />
                        <Button variant="outline" className="flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          Ajouter des images
                        </Button>
                      </label>
                      <span className="text-sm text-gray-500">
                        {vitrine.galerie?.length || 0}/30 images
                      </span>
                    </div>
                    
                    {vitrine.galerie && vitrine.galerie.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {vitrine.galerie.slice(0, 8).map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                              <img 
                                src={image} 
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const newImages = vitrine.galerie.filter((_, i) => i !== index);
                                handleChange('galerie', newImages);
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        {vitrine.galerie.length > 8 && (
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm text-gray-500">
                              +{vitrine.galerie.length - 8} autres
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pages personnalisées</CardTitle>
                    <CardDescription>
                      Maximum 3 pages personnalisées
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['about', 'contact', 'gallery'].map((pageType) => {
                      const pageNames = {
                        about: 'À propos',
                        contact: 'Contact',
                        gallery: 'Galerie supplémentaire'
                      };
                      
                      const isEnabled = vitrine.customPages?.[pageType as keyof typeof vitrine.customPages]?.enabled || false;
                      
                      return (
                        <div key={pageType} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Switch
                              checked={isEnabled}
                              onCheckedChange={(checked) => {
                                const currentPages = vitrine.customPages || {};
                                handleChange('customPages', {
                                  ...currentPages,
                                  [pageType]: {
                                    ...currentPages[pageType as keyof typeof currentPages],
                                    enabled: checked
                                  }
                                });
                              }}
                            />
                            <div>
                              <Label className="font-medium">{pageNames[pageType as keyof typeof pageNames]}</Label>
                              <p className="text-sm text-gray-500">
                                {pageType === 'about' && 'Page de présentation de votre activité'}
                                {pageType === 'contact' && 'Formulaire de contact et informations'}
                                {pageType === 'gallery' && 'Galerie d\'images supplémentaire'}
                              </p>
                            </div>
                          </div>
                          {isEnabled && (
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4 mr-2" />
                              Configurer
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contenu" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Biographie</CardTitle>
                    <CardDescription>
                      Présentez-vous à vos visiteurs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={vitrine.biographie}
                      onChange={(e) => handleChange('biographie', e.target.value)}
                      rows={6}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Réseaux sociaux</CardTitle>
                    <CardDescription>
                      Liens vers vos profils sociaux
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          value={vitrine.reseauxSociaux.facebook}
                          onChange={(e) => handleNestedChange('reseauxSociaux', 'facebook', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          value={vitrine.reseauxSociaux.instagram}
                          onChange={(e) => handleNestedChange('reseauxSociaux', 'instagram', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={vitrine.reseauxSociaux.linkedin}
                          onChange={(e) => handleNestedChange('reseauxSociaux', 'linkedin', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Site web</Label>
                        <Input
                          id="website"
                          value={vitrine.reseauxSociaux.website}
                          onChange={(e) => handleNestedChange('reseauxSociaux', 'website', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Coordonnées</CardTitle>
                    <CardDescription>
                      Informations de contact pour vos clients
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={vitrine.contact.email}
                        onChange={(e) => handleNestedChange('contact', 'email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        value={vitrine.contact.telephone}
                        onChange={(e) => handleNestedChange('contact', 'telephone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adresse">Adresse</Label>
                      <Textarea
                        id="adresse"
                        value={vitrine.contact.adresse}
                        onChange={(e) => handleNestedChange('contact', 'adresse', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Aperçu et actions */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Aperçu
                </CardTitle>
                <CardDescription>
                  Prévisualisation de votre vitrine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Globe className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Vitrine avec palette personnalisée
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">{vitrine.nom}</h3>
                    <p className="text-xs text-muted-foreground">
                      {vitrine.sousDomaine}.mondomaine.com
                    </p>
                  </div>

                  {vitrine.description && (
                    <p className="text-sm text-muted-foreground">
                      {vitrine.description.substring(0, 100)}
                      {vitrine.description.length > 100 && "..."}
                    </p>
                  )}

                  <div className="space-y-2">
                    <Button 
                      onClick={handleSave}
                      disabled={!isModified}
                      className="w-full"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Sauvegarder{isModified ? " *" : ""}
                    </Button>

                    <Button 
                      variant="destructive"
                      onClick={handleDelete}
                      className="w-full"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}