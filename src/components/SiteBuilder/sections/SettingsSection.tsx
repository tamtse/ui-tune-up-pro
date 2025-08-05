import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Globe, 
  Search, 
  Eye, 
  BarChart3, 
  Shield, 
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Download,
  Upload,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

interface SettingsSectionProps {
  siteData: {
    nom: string;
    sousDomaine: string;
    statut: 'published' | 'draft' | 'offline';
    url: string;
    [key: string]: any;
  };
  onSettingsChange: (field: string, value: any) => void;
}

export function SettingsSection({ siteData, onSettingsChange }: SettingsSectionProps) {
  const handleExportData = () => {
    const dataStr = JSON.stringify(siteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${siteData.sousDomaine}-backup.json`;
    link.click();
    toast.success("Données exportées avec succès");
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        // Ici vous pourriez valider et importer les données
        toast.success("Données importées avec succès");
      } catch (error) {
        toast.error("Erreur lors de l'import du fichier");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Informations générales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Informations du site
          </CardTitle>
          <CardDescription>
            Configuration générale de votre site vitrine
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="site-name">Nom du site</Label>
              <Input
                id="site-name"
                value={siteData.nom}
                onChange={(e) => onSettingsChange('nom', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subdomain">Sous-domaine</Label>
              <div className="flex">
                <Input
                  id="subdomain"
                  value={siteData.sousDomaine}
                  disabled
                  className="bg-muted"
                />
                <span className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r bg-muted text-muted-foreground">
                  .mondomaine.com
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Statut de publication</Label>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant={siteData.statut === 'published' ? 'default' : 'secondary'}>
                {siteData.statut === 'published' ? 'En ligne' : 
                 siteData.statut === 'draft' ? 'Brouillon' : 'Hors ligne'}
              </Badge>
              {siteData.statut === 'published' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(siteData.url, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Voir le site
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO et référencement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO et référencement
          </CardTitle>
          <CardDescription>
            Optimisez votre site pour les moteurs de recherche
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="meta-title">Titre de la page (meta title)</Label>
            <Input
              id="meta-title"
              placeholder="Titre qui apparaît dans les résultats Google"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommandé : 50-60 caractères
            </p>
          </div>

          <div>
            <Label htmlFor="meta-description">Description (meta description)</Label>
            <Input
              id="meta-description"
              placeholder="Description qui apparaît dans les résultats Google"
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommandé : 150-160 caractères
            </p>
          </div>

          <div>
            <Label htmlFor="keywords">Mots-clés</Label>
            <Input
              id="keywords"
              placeholder="photographe, mariage, portrait, paris"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Indexation par les moteurs de recherche</Label>
              <p className="text-sm text-muted-foreground">
                Autoriser Google et autres moteurs à indexer votre site
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Analytics et statistiques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics et statistiques
          </CardTitle>
          <CardDescription>
            Suivez les performances de votre site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="google-analytics">Google Analytics ID</Label>
            <Input
              id="google-analytics"
              placeholder="G-XXXXXXXXXX"
            />
          </div>

          <div>
            <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
            <Input
              id="facebook-pixel"
              placeholder="123456789012345"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Cookies de statistiques</Label>
              <p className="text-sm text-muted-foreground">
                Collecte anonyme des données de visite
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Bannière de cookies (RGPD)</Label>
              <p className="text-sm text-muted-foreground">
                Afficher le consentement aux cookies
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Performance et optimisation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Performance
          </CardTitle>
          <CardDescription>
            Optimisations pour la vitesse de chargement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Compression des images</Label>
              <p className="text-sm text-muted-foreground">
                Réduit automatiquement la taille des images
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Lazy loading</Label>
              <p className="text-sm text-muted-foreground">
                Charge les images uniquement quand nécessaire
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Cache navigateur</Label>
              <p className="text-sm text-muted-foreground">
                Améliore les temps de chargement pour les visiteurs récurrents
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <Label>Format d'images préféré</Label>
            <Select defaultValue="webp">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="webp">WebP (recommandé)</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Responsive et appareils */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Responsive Design
          </CardTitle>
          <CardDescription>
            Adaptation aux différents appareils
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Desktop
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Tablet className="h-4 w-4" />
              Tablet
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Mode mobile-first</Label>
              <p className="text-sm text-muted-foreground">
                Priorise l'expérience mobile
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Navigation tactile</Label>
              <p className="text-sm text-muted-foreground">
                Optimise les gestes tactiles sur mobile
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Sécurité et confidentialité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sécurité et confidentialité
          </CardTitle>
          <CardDescription>
            Protection de votre site et des données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>HTTPS forcé</Label>
              <p className="text-sm text-muted-foreground">
                Redirection automatique vers la version sécurisée
              </p>
            </div>
            <Switch defaultChecked disabled />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Protection anti-spam</Label>
              <p className="text-sm text-muted-foreground">
                Filtrage automatique des messages indésirables
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Sauvegarde automatique</Label>
              <p className="text-sm text-muted-foreground">
                Sauvegarde quotidienne de votre site
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Import/Export et sauvegarde */}
      <Card>
        <CardHeader>
          <CardTitle>Sauvegarde et restauration</CardTitle>
          <CardDescription>
            Gérez vos données et configurations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={handleExportData} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exporter les données
            </Button>
            
            <label>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Importer des données
              </Button>
            </label>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>• L'export inclut toutes vos configurations et contenus</p>
            <p>• L'import remplacera les données actuelles</p>
            <p>• Format : fichier JSON</p>
          </div>
        </CardContent>
      </Card>

      {/* Zone de danger */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Zone de danger</CardTitle>
          <CardDescription>
            Actions irréversibles sur votre site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => {
              if (confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données ?")) {
                toast.success("Site réinitialisé");
              }
            }}
          >
            Réinitialiser le site
          </Button>
          
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              if (confirm("Êtes-vous sûr de vouloir supprimer définitivement ce site ? Cette action est irréversible.")) {
                toast.success("Site supprimé");
              }
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer définitivement
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}