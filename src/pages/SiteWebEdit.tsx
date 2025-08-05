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
  X
} from "lucide-react";
import { toast } from "sonner";

interface VitrineData {
  id: string;
  nom: string;
  sousDomaine: string;
  description: string;
  theme: string;
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
  theme: "moderne",
  statut: "publié",
  logo: null,
  imageCouverture: null,
  biographie: "Photographe professionnel depuis 10 ans, je me spécialise dans les portraits, mariages et événements corporate. Mon approche artistique combine technique moderne et sensibilité créative pour capturer vos moments les plus précieux.",
  galerie: [],
  reseauxSociaux: {
    facebook: "https://facebook.com/studiolumiere",
    instagram: "https://instagram.com/studiolumiere",
    linkedin: "",
    website: "https://studiolumiere.com"
  },
  contact: {
    email: "contact@studiolumiere.com",
    telephone: "+33 1 23 45 67 89",
    adresse: "123 Rue de la Photo\n75001 Paris\nFrance"
  },
  dateCreation: "2024-01-15",
  derniereModification: "2024-01-20",
  visites: 1247,
  url: "https://studio-lumiere.mondomaine.com"
};

const themes = [
  { id: "moderne", nom: "Moderne", preview: "bg-gradient-to-br from-blue-500 to-purple-600" },
  { id: "elegant", nom: "Élégant", preview: "bg-gradient-to-br from-gray-800 to-gray-600" },
  { id: "minimal", nom: "Minimal", preview: "bg-gradient-to-br from-gray-100 to-white border" },
  { id: "artistique", nom: "Artistique", preview: "bg-gradient-to-br from-pink-500 to-orange-500" },
  { id: "professionnel", nom: "Professionnel", preview: "bg-gradient-to-br from-slate-700 to-slate-900" }
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
              <div className="text-2xl font-bold">{themes.find(t => t.id === vitrine.theme)?.nom}</div>
              <p className="text-xs text-muted-foreground">Thème actuel</p>
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
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="contenu">Contenu</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
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

              <TabsContent value="design" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thème</CardTitle>
                    <CardDescription>
                      Changez l'apparence de votre vitrine
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            vitrine.theme === theme.id 
                              ? 'border-primary ring-2 ring-primary/20' 
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => handleChange('theme', theme.id)}
                        >
                          <div className={`aspect-video rounded mb-3 ${theme.preview}`}></div>
                          <h4 className="font-medium">{theme.nom}</h4>
                        </div>
                      ))}
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
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
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
                        Thème: {themes.find(t => t.id === vitrine.theme)?.nom}
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