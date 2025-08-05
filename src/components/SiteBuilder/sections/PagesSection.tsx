import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  Edit, 
  FileText, 
  Phone, 
  Image as ImageIcon,
  ExternalLink,
  Copy,
  Eye
} from "lucide-react";
import { toast } from "sonner";

interface CustomPage {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  content: string;
  type: 'about' | 'contact' | 'gallery' | 'custom';
}

interface PagesSectionProps {
  customPages: CustomPage[];
  onPagesChange: (pages: CustomPage[]) => void;
  maxPages?: number;
}

const defaultPages: Omit<CustomPage, 'id'>[] = [
  {
    name: "À propos",
    slug: "about",
    type: "about",
    enabled: false,
    content: "Parlez de votre histoire, votre parcours et votre passion..."
  },
  {
    name: "Contact",
    slug: "contact", 
    type: "contact",
    enabled: false,
    content: "Informations de contact et formulaire pour vos clients..."
  },
  {
    name: "Galerie",
    slug: "gallery",
    type: "gallery", 
    enabled: false,
    content: "Galerie d'images dédiée avec vos meilleures créations..."
  }
];

export function PagesSection({ 
  customPages, 
  onPagesChange, 
  maxPages = 3 
}: PagesSectionProps) {
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [newPageName, setNewPageName] = useState("");

  const togglePageEnabled = (pageId: string) => {
    const updatedPages = customPages.map(page =>
      page.id === pageId ? { ...page, enabled: !page.enabled } : page
    );
    onPagesChange(updatedPages);
    toast.success(`Page ${updatedPages.find(p => p.id === pageId)?.enabled ? 'activée' : 'désactivée'}`);
  };

  const updatePageContent = (pageId: string, content: string) => {
    const updatedPages = customPages.map(page =>
      page.id === pageId ? { ...page, content } : page
    );
    onPagesChange(updatedPages);
  };

  const addCustomPage = () => {
    if (!newPageName.trim()) {
      toast.error("Veuillez saisir un nom de page");
      return;
    }

    if (customPages.length >= maxPages) {
      toast.error(`Maximum ${maxPages} pages autorisées`);
      return;
    }

    const slug = newPageName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newPage: CustomPage = {
      id: `custom-${Date.now()}`,
      name: newPageName,
      slug,
      type: 'custom',
      enabled: true,
      content: `Contenu de la page ${newPageName}...`
    };

    onPagesChange([...customPages, newPage]);
    setNewPageName("");
    toast.success("Page personnalisée créée");
  };

  const deletePage = (pageId: string) => {
    const pageToDelete = customPages.find(p => p.id === pageId);
    if (pageToDelete?.type !== 'custom') {
      toast.error("Impossible de supprimer une page par défaut");
      return;
    }

    if (confirm("Êtes-vous sûr de vouloir supprimer cette page ?")) {
      onPagesChange(customPages.filter(p => p.id !== pageId));
      toast.success("Page supprimée");
    }
  };

  const getPageIcon = (type: CustomPage['type']) => {
    switch (type) {
      case 'about':
        return <FileText className="h-4 w-4" />;
      case 'contact':
        return <Phone className="h-4 w-4" />;
      case 'gallery':
        return <ImageIcon className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const previewUrl = (page: CustomPage) => `/preview/${page.slug}`;

  return (
    <div className="space-y-6">
      {/* Gestion des pages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Pages de votre site
            <Badge variant="secondary">{customPages.filter(p => p.enabled).length}/{maxPages}</Badge>
          </CardTitle>
          <CardDescription>
            Gérez les pages de votre site vitrine (maximum {maxPages} pages)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pages existantes */}
          <div className="space-y-3">
            {customPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <div className="flex items-center gap-2 flex-1">
                  {getPageIcon(page.type)}
                  <div>
                    <div className="font-medium">{page.name}</div>
                    <div className="text-sm text-muted-foreground">/{page.slug}</div>
                  </div>
                  {page.type !== 'custom' && (
                    <Badge variant="outline" className="text-xs">Système</Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {page.enabled && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(previewUrl(page), '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingPage(editingPage === page.id ? null : page.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  {page.type === 'custom' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deletePage(page.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}

                  <Switch
                    checked={page.enabled}
                    onCheckedChange={() => togglePageEnabled(page.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Éditeur de contenu */}
          {editingPage && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Éditer : {customPages.find(p => p.id === editingPage)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={customPages.find(p => p.id === editingPage)?.content || ""}
                  onChange={(e) => updatePageContent(editingPage, e.target.value)}
                  rows={8}
                  placeholder="Contenu de la page..."
                />
                <div className="flex gap-2 mt-3">
                  <Button onClick={() => setEditingPage(null)}>
                    Terminer l'édition
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const content = customPages.find(p => p.id === editingPage)?.content || "";
                      navigator.clipboard.writeText(content);
                      toast.success("Contenu copié dans le presse-papiers");
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copier
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ajouter une page personnalisée */}
          {customPages.length < maxPages && (
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nom de la nouvelle page"
                    value={newPageName}
                    onChange={(e) => setNewPageName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomPage()}
                  />
                  <Button onClick={addCustomPage}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Navigation du site */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
          <CardDescription>
            Organisation du menu principal de votre site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm font-medium">Pages visibles dans le menu :</div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Accueil</Badge>
              {customPages
                .filter(page => page.enabled)
                .map(page => (
                  <Badge key={page.id} variant="secondary">
                    {page.name}
                  </Badge>
                ))
              }
            </div>
          </div>
        </CardContent>
      </Card>

      {/* URLs et partage */}
      <Card>
        <CardHeader>
          <CardTitle>URLs et partage</CardTitle>
          <CardDescription>
            Liens directs vers vos pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {customPages
            .filter(page => page.enabled)
            .map(page => (
              <div key={page.id} className="flex items-center gap-2 p-2 bg-muted rounded">
                <div className="flex-1">
                  <div className="text-sm font-medium">{page.name}</div>
                  <div className="text-xs text-muted-foreground">
                    mondomaine.com/{page.slug}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://mondomaine.com/${page.slug}`);
                    toast.success("URL copiée");
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(previewUrl(page), '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))
          }
        </CardContent>
      </Card>
    </div>
  );
}