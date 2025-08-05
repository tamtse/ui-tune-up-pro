import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  isPro?: boolean;
}

interface DesignSectionProps {
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onColorChange: (type: 'primary' | 'secondary' | 'accent', color: string) => void;
}

const themes: Theme[] = [
  {
    id: 'gallery',
    name: 'Galerie Simple',
    description: 'Design épuré avec focus sur les images',
    preview: (
      <div className="bg-white rounded border p-3 h-20">
        <div className="flex justify-between items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gray-300"></div>
            <div className="w-1 h-1 bg-gray-300"></div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-square bg-gray-200 rounded-sm"></div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'masonry',
    name: 'Masonry',
    description: 'Layout créatif avec grille dynamique',
    preview: (
      <div className="bg-white rounded border p-3 h-20">
        <div className="flex justify-between items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gray-300"></div>
            <div className="w-1 h-1 bg-gray-300"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="aspect-square bg-gray-200 rounded-sm"></div>
          <div className="aspect-[3/4] bg-gray-200 rounded-sm"></div>
          <div className="aspect-square bg-gray-200 rounded-sm"></div>
        </div>
      </div>
    ),
    isPro: true
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Style épuré et moderne',
    preview: (
      <div className="bg-white rounded border p-3 h-20">
        <div className="text-center mb-2">
          <div className="w-4 h-4 rounded-full bg-gray-800 mx-auto mb-1"></div>
          <div className="h-1 w-12 bg-gray-300 mx-auto"></div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[1,2,3].map(i => (
            <div key={i} className="aspect-square bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    ),
    isPro: true
  }
];

const colorPalettes = [
  { name: "Bleu Professionnel", primary: "#2563eb", secondary: "#1e40af", accent: "#3b82f6" },
  { name: "Vert Nature", primary: "#16a34a", secondary: "#15803d", accent: "#22c55e" },
  { name: "Violet Créatif", primary: "#9333ea", secondary: "#7c3aed", accent: "#a855f7" },
  { name: "Orange Énergique", primary: "#ea580c", secondary: "#dc2626", accent: "#f97316" },
  { name: "Rose Élégant", primary: "#e11d48", secondary: "#be185d", accent: "#f43f5e" },
  { name: "Gris Minimaliste", primary: "#374151", secondary: "#1f2937", accent: "#6b7280" }
];

export function DesignSection({ 
  selectedTheme, 
  onThemeChange, 
  colors, 
  onColorChange 
}: DesignSectionProps) {
  return (
    <div className="space-y-6">
      {/* Choix du thème */}
      <Card>
        <CardHeader>
          <CardTitle>Choisissez votre thème</CardTitle>
          <CardDescription>
            Sélectionnez le design qui correspond le mieux à votre style
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                  selectedTheme === theme.id
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-muted-foreground/50'
                }`}
                onClick={() => onThemeChange(theme.id)}
              >
                <div className="flex gap-4">
                  <div className="w-24 h-20 shrink-0">
                    {theme.preview}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{theme.name}</h3>
                      {theme.isPro && (
                        <Badge variant="secondary" className="text-xs">PRO</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{theme.description}</p>
                  </div>
                  {selectedTheme === theme.id && (
                    <div className="shrink-0">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Palette de couleurs */}
      <Card>
        <CardHeader>
          <CardTitle>Couleurs</CardTitle>
          <CardDescription>
            Personnalisez les couleurs de votre site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {colorPalettes.map((palette, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 justify-start"
                onClick={() => {
                  onColorChange('primary', palette.primary);
                  onColorChange('secondary', palette.secondary);
                  onColorChange('accent', palette.accent);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: palette.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: palette.secondary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: palette.accent }}
                    />
                  </div>
                  <span className="text-sm">{palette.name}</span>
                </div>
              </Button>
            ))}
          </div>
          
          {/* Couleurs personnalisées */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="text-sm font-medium">Couleurs personnalisées</h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Primaire</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={colors.primary}
                    onChange={(e) => onColorChange('primary', e.target.value)}
                    className="w-8 h-8 rounded border cursor-pointer"
                  />
                  <span className="text-xs font-mono">{colors.primary}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Secondaire</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={colors.secondary}
                    onChange={(e) => onColorChange('secondary', e.target.value)}
                    className="w-8 h-8 rounded border cursor-pointer"
                  />
                  <span className="text-xs font-mono">{colors.secondary}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Accent</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={colors.accent}
                    onChange={(e) => onColorChange('accent', e.target.value)}
                    className="w-8 h-8 rounded border cursor-pointer"
                  />
                  <span className="text-xs font-mono">{colors.accent}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}