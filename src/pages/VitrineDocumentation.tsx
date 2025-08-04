import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Database, 
  Globe, 
  Code, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function VitrineDocumentation() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documentation Module Vitrine</h1>
          <p className="text-muted-foreground mt-2">
            Spécifications techniques pour l'implémentation backend du module CRM vitrine
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="database">Base de données</TabsTrigger>
            <TabsTrigger value="api">API Endpoints</TabsTrigger>
            <TabsTrigger value="themes">Thèmes</TabsTrigger>
            <TabsTrigger value="dns">DNS</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Architecture générale
                </CardTitle>
                <CardDescription>
                  Vue d'ensemble du système de vitrines avec sous-domaines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg space-y-2">
                    <Database className="h-8 w-8 text-blue-500" />
                    <h3 className="font-semibold">PostgreSQL</h3>
                    <p className="text-sm text-muted-foreground">Base de données relationnelle pour les vitrines</p>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <Code className="h-8 w-8 text-green-500" />
                    <h3 className="font-semibold">Next.js</h3>
                    <p className="text-sm text-muted-foreground">SSR/SSG pour le rendu des vitrines</p>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <Zap className="h-8 w-8 text-yellow-500" />
                    <h3 className="font-semibold">S3/Cloudinary</h3>
                    <p className="text-sm text-muted-foreground">Stockage des médias et images</p>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <Shield className="h-8 w-8 text-red-500" />
                    <h3 className="font-semibold">JWT</h3>
                    <p className="text-sm text-muted-foreground">Authentification sécurisée</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Workflow utilisateur</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>1. Création vitrine via dashboard CRM</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span>2. Sélection sous-domaine et thème</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>3. Configuration contenu et médias</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span>4. Aperçu temps réel</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>5. Publication</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span>6. Vitrine accessible publiquement</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Fonctionnalités clés</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Frontend</Badge>
                      <span className="text-sm">Dashboard CRM intégré</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Frontend</Badge>
                      <span className="text-sm">Système de thèmes modulaires</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Backend</Badge>
                      <span className="text-sm">API REST/GraphQL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Backend</Badge>
                      <span className="text-sm">Gestion DNS wildcard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Sécurité</Badge>
                      <span className="text-sm">Validation sous-domaines</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Performance</Badge>
                      <span className="text-sm">CDN pour médias</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Structure de la base de données</CardTitle>
                <CardDescription>
                  Schéma PostgreSQL pour le module vitrine
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Table: users</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Table: vitrines</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`CREATE TABLE vitrines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  sous_domaine VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  theme_id UUID REFERENCES themes(id),
  statut VARCHAR(20) DEFAULT 'brouillon',
  contenu_json JSONB,
  logo_url VARCHAR(500),
  image_couverture_url VARCHAR(500),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT valid_sous_domaine CHECK (
    sous_domaine ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$' AND
    LENGTH(sous_domaine) >= 3 AND
    LENGTH(sous_domaine) <= 50
  ),
  CONSTRAINT valid_statut CHECK (
    statut IN ('brouillon', 'publié', 'hors-ligne')
  )
);

-- Index pour performances
CREATE INDEX idx_vitrines_sous_domaine ON vitrines(sous_domaine);
CREATE INDEX idx_vitrines_user_id ON vitrines(user_id);
CREATE INDEX idx_vitrines_statut ON vitrines(statut);`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Table: themes</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  structure_json JSONB NOT NULL,
  preview_url VARCHAR(500),
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Table: vitrine_medias</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`CREATE TABLE vitrine_medias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vitrine_id UUID REFERENCES vitrines(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'logo', 'couverture', 'galerie'
  url VARCHAR(500) NOT NULL,
  nom_fichier VARCHAR(255),
  taille_bytes INTEGER,
  mime_type VARCHAR(100),
  ordre INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_vitrine_medias_vitrine_id ON vitrine_medias(vitrine_id);
CREATE INDEX idx_vitrine_medias_type ON vitrine_medias(type);`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Table: vitrine_analytics</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`CREATE TABLE vitrine_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vitrine_id UUID REFERENCES vitrines(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  visites INTEGER DEFAULT 0,
  visiteurs_uniques INTEGER DEFAULT 0,
  pages_vues INTEGER DEFAULT 0,
  duree_moyenne_secondes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(vitrine_id, date)
);

CREATE INDEX idx_analytics_vitrine_date ON vitrine_analytics(vitrine_id, date);`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Endpoints API</CardTitle>
                <CardDescription>
                  Documentation complète des API REST pour le module vitrine
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-600">Gestion des vitrines</h3>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                      <code className="ml-2 text-sm">/api/vitrines</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Liste les vitrines de l'utilisateur connecté
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">POST</Badge>
                      <code className="ml-2 text-sm">/api/vitrines</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Crée une nouvelle vitrine
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">PUT</Badge>
                      <code className="ml-2 text-sm">/api/vitrines/:id</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Met à jour une vitrine existante
                      </p>
                    </div>

                    <div className="border-l-4 border-red-500 pl-4">
                      <Badge variant="outline" className="bg-red-50 text-red-700">DELETE</Badge>
                      <code className="ml-2 text-sm">/api/vitrines/:id</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Supprime une vitrine
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">Gestion des sous-domaines</h3>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                      <code className="ml-2 text-sm">/api/sous-domaines/check/:nom</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Vérifie la disponibilité d'un sous-domaine
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700">GET</Badge>
                      <code className="ml-2 text-sm">/api/vitrine-publique/:sousDomaine</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Récupère les données d'une vitrine publique par sous-domaine
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-600">Upload de médias</h3>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">POST</Badge>
                      <code className="ml-2 text-sm">/api/upload/media</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload d'images (logo, couverture, galerie)
                      </p>
                    </div>

                    <div className="border-l-4 border-red-500 pl-4">
                      <Badge variant="outline" className="bg-red-50 text-red-700">DELETE</Badge>
                      <code className="ml-2 text-sm">/api/upload/media/:id</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Supprime un média
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Exemples de payload</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">POST /api/vitrines</h4>
                      <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
{`{
  "nom": "Studio Photo Lumière",
  "sous_domaine": "studio-lumiere",
  "description": "Studio photo professionnel...",
  "theme_id": "uuid-theme-moderne",
  "contenu_json": {
    "biographie": "Photographe depuis 10 ans...",
    "contact": {
      "email": "contact@studio.com",
      "telephone": "+33123456789",
      "adresse": "123 Rue de la Photo, Paris"
    },
    "reseaux_sociaux": {
      "facebook": "https://facebook.com/studio",
      "instagram": "https://instagram.com/studio"
    }
  }
}`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Response 200 OK</h4>
                      <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
{`{
  "success": true,
  "data": {
    "id": "uuid-vitrine",
    "nom": "Studio Photo Lumière",
    "sous_domaine": "studio-lumiere",
    "url": "https://studio-lumiere.mondomaine.com",
    "statut": "brouillon",
    "created_at": "2024-01-20T10:00:00Z"
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="themes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Système de thèmes</CardTitle>
                <CardDescription>
                  Architecture modulaire des thèmes pour les vitrines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Structure d'un thème</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`{
  "id": "theme-moderne",
  "nom": "Moderne",
  "description": "Design épuré et contemporain",
  "preview_url": "/themes/moderne/preview.jpg",
  "structure": {
    "sections": [
      {
        "id": "hero",
        "nom": "Section Hero",
        "obligatoire": true,
        "champs": [
          {
            "nom": "titre",
            "type": "text",
            "obligatoire": true,
            "placeholder": "Votre nom ou titre"
          },
          {
            "nom": "sous_titre",
            "type": "text",
            "obligatoire": false,
            "placeholder": "Votre spécialité"
          },
          {
            "nom": "image_fond",
            "type": "image",
            "obligatoire": false,
            "formats": ["jpg", "png", "webp"]
          }
        ]
      },
      {
        "id": "about",
        "nom": "À propos",
        "obligatoire": false,
        "champs": [
          {
            "nom": "biographie",
            "type": "textarea",
            "obligatoire": false,
            "max_length": 1000
          },
          {
            "nom": "photo_profil",
            "type": "image",
            "obligatoire": false
          }
        ]
      },
      {
        "id": "galerie",
        "nom": "Galerie",
        "obligatoire": false,
        "champs": [
          {
            "nom": "images",
            "type": "galerie",
            "max_images": 20,
            "formats": ["jpg", "png", "webp"]
          }
        ]
      },
      {
        "id": "contact",
        "nom": "Contact",
        "obligatoire": true,
        "champs": [
          {
            "nom": "email",
            "type": "email",
            "obligatoire": true
          },
          {
            "nom": "telephone",
            "type": "tel",
            "obligatoire": false
          },
          {
            "nom": "adresse",
            "type": "textarea",
            "obligatoire": false
          }
        ]
      }
    ],
    "personnalisation": {
      "couleurs": {
        "primaire": "#3B82F6",
        "secondaire": "#64748B",
        "accent": "#F59E0B"
      },
      "typographie": {
        "famille": "Inter",
        "tailles": {
          "h1": "2.5rem",
          "h2": "2rem",
          "body": "1rem"
        }
      },
      "espacements": {
        "section": "4rem",
        "element": "1.5rem"
      }
    }
  }
}`}
                    </pre>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Types de champs supportés</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Badge variant="outline">text</Badge>
                      <p className="text-sm text-muted-foreground">Champ texte simple</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">textarea</Badge>
                      <p className="text-sm text-muted-foreground">Texte long/biographie</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">email</Badge>
                      <p className="text-sm text-muted-foreground">Adresse email avec validation</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">tel</Badge>
                      <p className="text-sm text-muted-foreground">Numéro de téléphone</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">image</Badge>
                      <p className="text-sm text-muted-foreground">Upload d'image unique</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">galerie</Badge>
                      <p className="text-sm text-muted-foreground">Upload d'images multiples</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">color</Badge>
                      <p className="text-sm text-muted-foreground">Sélecteur de couleur</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">url</Badge>
                      <p className="text-sm text-muted-foreground">Lien vers site/réseau social</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Thèmes disponibles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { nom: "Moderne", description: "Design épuré et contemporain", couleur: "blue" },
                      { nom: "Élégant", description: "Style raffiné et sophistiqué", couleur: "gray" },
                      { nom: "Minimal", description: "Simplicité et clarté", couleur: "slate" },
                      { nom: "Artistique", description: "Créatif et expressif", couleur: "pink" },
                      { nom: "Professionnel", description: "Sobre et corporate", couleur: "indigo" }
                    ].map((theme) => (
                      <div key={theme.nom} className="border rounded-lg p-4">
                        <div className={`aspect-video bg-gradient-to-br from-${theme.couleur}-400 to-${theme.couleur}-600 rounded mb-3`}></div>
                        <h4 className="font-medium">{theme.nom}</h4>
                        <p className="text-sm text-muted-foreground">{theme.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion DNS et sous-domaines</CardTitle>
                <CardDescription>
                  Configuration DNS wildcard et routing dynamique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Configuration DNS</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Enregistrement DNS wildcard</h4>
                    <div className="space-y-1 text-sm font-mono">
                      <div>*.mondomaine.com → CNAME → proxy.mondomaine.com</div>
                      <div>proxy.mondomaine.com → A → 185.199.108.153</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Middleware Next.js</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const url = request.nextUrl.clone();

  // Extraire le sous-domaine
  if (hostname) {
    const subdomain = hostname.split('.')[0];
    
    // Ignorer les sous-domaines système
    const systemSubdomains = ['www', 'api', 'admin', 'mail'];
    if (systemSubdomains.includes(subdomain)) {
      return NextResponse.next();
    }

    // Rediriger vers la page vitrine
    if (subdomain !== 'mondomaine') {
      url.pathname = \`/vitrine/\${subdomain}\`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};`}
                    </pre>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Validation des sous-domaines</h3>
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-green-500 bg-green-50">
                      <h4 className="font-medium text-green-800">Règles de validation</h4>
                      <ul className="text-sm text-green-700 mt-1 space-y-1">
                        <li>• Longueur: 3-50 caractères</li>
                        <li>• Format: lettres minuscules, chiffres, tirets</li>
                        <li>• Ne peut pas commencer ou finir par un tiret</li>
                        <li>• Pas de tirets consécutifs</li>
                      </ul>
                    </div>

                    <div className="p-3 border-l-4 border-red-500 bg-red-50">
                      <h4 className="font-medium text-red-800">Sous-domaines interdits</h4>
                      <div className="text-sm text-red-700 mt-1">
                        <code>www, api, mail, ftp, admin, test, dev, staging, blog, shop, store</code>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">SSL/TLS</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Certificats SSL wildcard automatiques via Let's Encrypt ou Cloudflare
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm font-mono">
                        *.mondomaine.com → Certificat SSL automatique
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>
                  Mesures de sécurité pour le module vitrine
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600">Authentification & Autorisation</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">JWT Authentication</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tokens JWT avec expiration pour l'accès au dashboard CRM
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Role-Based Access</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Utilisateurs ne peuvent modifier que leurs propres vitrines
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-600">Validation & Sanitisation</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`// Validation des données d'entrée
const vitrineSchema = {
  nom: {
    type: 'string',
    required: true,
    maxLength: 255,
    sanitize: 'html'
  },
  sous_domaine: {
    type: 'string',
    required: true,
    pattern: '^[a-z0-9][a-z0-9-]*[a-z0-9]$',
    minLength: 3,
    maxLength: 50,
    blacklist: ['www', 'api', 'admin', 'mail']
  },
  biographie: {
    type: 'string',
    maxLength: 2000,
    sanitize: 'html'
  },
  email: {
    type: 'email',
    required: true
  }
};`}
                    </pre>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-600">Upload de fichiers</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Restrictions de format</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Images uniquement: JPG, PNG, WebP
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Taille maximale</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        5MB par image, 50MB total par vitrine
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Scan antivirus</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Vérification automatique des fichiers uploadés
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">Protection DDoS & Rate Limiting</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`// Rate limiting par IP
const rateLimits = {
  // API privée (dashboard)
  '/api/vitrines': {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // 100 requêtes par fenêtre
  },
  
  // Upload de médias
  '/api/upload': {
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 50 // 50 uploads par heure
  },
  
  // Vitrines publiques
  '/vitrine/*': {
    windowMs: 60 * 1000, // 1 minute
    max: 60 // 60 vues par minute
  }
};`}
                    </pre>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-600">Monitoring & Logging</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Logs de sécurité</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tentatives d'accès non autorisé, modifications de vitrines
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Alertes automatiques</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Notification en cas d'activité suspecte
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Audit trail</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Historique complet des actions utilisateurs
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}