import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  Globe, 
  Upload, 
  Check,
  X,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface VitrineForm {
  nom: string;
  sousDomaine: string;
  description: string;
  theme: string;
  logo: File | null;
  imageCouverture: File | null;
  biographie: string;
  galerie: File[];
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
}

const themes = [
  {
    id: "moderne",
    nom: "Moderne",
    description: "Design épuré et contemporain",
    preview: "bg-gradient-to-br from-blue-500 to-purple-600"
  },
  {
    id: "elegant",
    nom: "Élégant", 
    description: "Style raffiné et sophistiqué",
    preview: "bg-gradient-to-br from-gray-800 to-gray-600"
  },
  {
    id: "minimal",
    nom: "Minimal",
    description: "Simplicité et clarté",
    preview: "bg-gradient-to-br from-gray-100 to-white border"
  },
  {
    id: "artistique",
    nom: "Artistique",
    description: "Créatif et expressif",
    preview: "bg-gradient-to-br from-pink-500 to-orange-500"
  },
  {
    id: "professionnel",
    nom: "Professionnel",
    description: "Sobre et corporate",
    preview: "bg-gradient-to-br from-slate-700 to-slate-900"
  }
];

export default function SiteWebCreate() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [sousDomaineStatus, setSousDomaineStatus] = useState<'checking' | 'available' | 'taken' | 'invalid' | null>(null);
  
  const [form, setForm] = useState<VitrineForm>({
    nom: "",
    sousDomaine: "",
    description: "",
    theme: "",
    logo: null,
    imageCouverture: null,
    biographie: "",
    galerie: [],
    reseauxSociaux: {
      facebook: "",
      instagram: "",
      linkedin: "",
      website: ""
    },
    contact: {
      email: "",
      telephone: "",
      adresse: ""
    }
  });

  const checkSousDomaine = async (value: string) => {
    if (!value) {
      setSousDomaineStatus(null);
      return;
    }

    // Validation format
    const regex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;
    if (!regex.test(value) || value.length < 3) {
      setSousDomaineStatus('invalid');
      return;
    }

    setSousDomaineStatus('checking');
    
    // Simulation vérification disponibilité
    setTimeout(() => {
      const reserved = ['www', 'api', 'admin', 'mail', 'ftp', 'test'];
      const taken = ['studio-lumiere', 'photo-pro', 'artiste-photo'];
      
      if (reserved.includes(value) || taken.includes(value)) {
        setSousDomaineStatus('taken');
      } else {
        setSousDomaineStatus('available');
      }
    }, 1000);
  };

  const handleSousDomaineChange = (value: string) => {
    const clean = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setForm(prev => ({ ...prev, sousDomaine: clean }));
    checkSousDomaine(clean);
  };

  const handleFileUpload = (field: keyof VitrineForm, file: File | null) => {
    setForm(prev => ({ ...prev, [field]: file }));
  };

  const handleGalerieUpload = (files: FileList) => {
    const fileArray = Array.from(files).slice(0, 10); // Max 10 images
    setForm(prev => ({ ...prev, galerie: [...prev.galerie, ...fileArray] }));
  };

  const removeGalerieImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      galerie: prev.galerie.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (publier = false) => {
    if (!form.nom || !form.sousDomaine || !form.theme) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    if (sousDomaineStatus !== 'available') {
      toast.error("Le sous-domaine n'est pas valide ou disponible");
      return;
    }

    // Simulation sauvegarde
    toast.success(publier ? "Vitrine publiée avec succès!" : "Vitrine sauvegardée en brouillon");
    navigate("/site-web");
  };

  const getSousDomaineStatus = () => {
    switch (sousDomaineStatus) {
      case 'checking':
        return <Badge variant="secondary">Vérification...</Badge>;
      case 'available':
        return <Badge variant="default" className="bg-green-500"><Check className="w-3 h-3 mr-1" />Disponible</Badge>;
      case 'taken':
        return <Badge variant="destructive"><X className="w-3 h-3 mr-1" />Non disponible</Badge>;
      case 'invalid':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Format invalide</Badge>;
      default:
        return null;
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
          <div>
            <h1 className="text-2xl font-bold text-foreground">Créer une vitrine</h1>
            <p className="text-muted-foreground">
              Configurez votre vitrine publique avec sous-domaine
            </p>
          </div>
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
                      Définissez le nom et l'adresse de votre vitrine
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom de la vitrine *</Label>
                      <Input
                        id="nom"
                        value={form.nom}
                        onChange={(e) => setForm(prev => ({ ...prev, nom: e.target.value }))}
                        placeholder="Studio Photo Lumière"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sousDomaine">Sous-domaine *</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          id="sousDomaine"
                          value={form.sousDomaine}
                          onChange={(e) => handleSousDomaineChange(e.target.value)}
                          placeholder="studio-lumiere"
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground">.mondomaine.com</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        {getSousDomaineStatus()}
                        {form.sousDomaine && (
                          <span className="text-xs text-muted-foreground">
                            URL: https://{form.sousDomaine}.mondomaine.com
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description courte</Label>
                      <Textarea
                        id="description"
                        value={form.description}
                        onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Studio photo professionnel spécialisé dans les portraits..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Choisir un thème</CardTitle>
                    <CardDescription>
                      Sélectionnez le style de votre vitrine
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            form.theme === theme.id 
                              ? 'border-primary ring-2 ring-primary/20' 
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => setForm(prev => ({ ...prev, theme: theme.id }))}
                        >
                          <div className={`aspect-video rounded mb-3 ${theme.preview}`}></div>
                          <h4 className="font-medium">{theme.nom}</h4>
                          <p className="text-sm text-muted-foreground">{theme.description}</p>
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
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileUpload('logo', e.target.files?.[0] || null)}
                              />
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
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileUpload('imageCouverture', e.target.files?.[0] || null)}
                              />
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
                      value={form.biographie}
                      onChange={(e) => setForm(prev => ({ ...prev, biographie: e.target.value }))}
                      placeholder="Photographe professionnel depuis 10 ans, je me spécialise dans..."
                      rows={6}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Galerie photos</CardTitle>
                    <CardDescription>
                      Ajoutez vos meilleures réalisations (max 10 images)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {form.galerie.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {form.galerie.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Galerie ${index + 1}`}
                              className="aspect-square object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeGalerieImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Glissez vos images ici ou{" "}
                        <label className="text-primary cursor-pointer">
                          parcourez
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={(e) => e.target.files && handleGalerieUpload(e.target.files)}
                          />
                        </label>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {form.galerie.length}/10 images
                      </p>
                    </div>
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
                          value={form.reseauxSociaux.facebook}
                          onChange={(e) => setForm(prev => ({
                            ...prev,
                            reseauxSociaux: { ...prev.reseauxSociaux, facebook: e.target.value }
                          }))}
                          placeholder="https://facebook.com/votrepage"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          value={form.reseauxSociaux.instagram}
                          onChange={(e) => setForm(prev => ({
                            ...prev,
                            reseauxSociaux: { ...prev.reseauxSociaux, instagram: e.target.value }
                          }))}
                          placeholder="https://instagram.com/votrepage"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={form.reseauxSociaux.linkedin}
                          onChange={(e) => setForm(prev => ({
                            ...prev,
                            reseauxSociaux: { ...prev.reseauxSociaux, linkedin: e.target.value }
                          }))}
                          placeholder="https://linkedin.com/in/votreprofil"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Site web</Label>
                        <Input
                          id="website"
                          value={form.reseauxSociaux.website}
                          onChange={(e) => setForm(prev => ({
                            ...prev,
                            reseauxSociaux: { ...prev.reseauxSociaux, website: e.target.value }
                          }))}
                          placeholder="https://votresite.com"
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
                        value={form.contact.email}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          contact: { ...prev.contact, email: e.target.value }
                        }))}
                        placeholder="contact@exemple.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        value={form.contact.telephone}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          contact: { ...prev.contact, telephone: e.target.value }
                        }))}
                        placeholder="+33 1 23 45 67 89"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adresse">Adresse</Label>
                      <Textarea
                        id="adresse"
                        value={form.contact.adresse}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          contact: { ...prev.contact, adresse: e.target.value }
                        }))}
                        placeholder="123 Rue de la Photo, 75001 Paris"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Aperçu */}
          <div className="lg:col-span-1">
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
                        {form.theme ? `Thème: ${themes.find(t => t.id === form.theme)?.nom}` : "Sélectionnez un thème"}
                      </p>
                    </div>
                  </div>

                  {form.nom && (
                    <div>
                      <h3 className="font-medium">{form.nom}</h3>
                      {form.sousDomaine && (
                        <p className="text-xs text-muted-foreground">
                          {form.sousDomaine}.mondomaine.com
                        </p>
                      )}
                    </div>
                  )}

                  {form.description && (
                    <p className="text-sm text-muted-foreground">
                      {form.description.substring(0, 100)}
                      {form.description.length > 100 && "..."}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSave(false)}
                      disabled={!form.nom || !form.sousDomaine || sousDomaineStatus !== 'available'}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Brouillon
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleSave(true)}
                      disabled={!form.nom || !form.sousDomaine || !form.theme || sousDomaineStatus !== 'available'}
                    >
                      Publier
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