import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Code, Database, Users, Settings, CreditCard, FileText, Mail, Calendar, Calculator, Copy, Check } from "lucide-react";

const apiSections = [
  {
    id: "auth",
    title: "Authentification",
    icon: <Users className="h-5 w-5" />,
    description: "Gestion de l'authentification et des sessions utilisateurs",
    endpoints: [
      { method: "POST", path: "/auth/login", description: "Connexion utilisateur" },
      { method: "POST", path: "/auth/signup", description: "Inscription utilisateur" },
      { method: "POST", path: "/admin/login", description: "Connexion administrateur" },
      { method: "GET", path: "/auth/verify/email/{token}", description: "Vérification email" },
    ]
  },
  {
    id: "users",
    title: "Gestion Utilisateurs",
    icon: <Users className="h-5 w-5" />,
    description: "CRUD des utilisateurs et gestion des profils",
    endpoints: [
      { method: "GET", path: "/admin/users", description: "Liste des utilisateurs" },
      { method: "POST", path: "/admin/users", description: "Créer un utilisateur" },
      { method: "PUT", path: "/admin/users/{id}", description: "Modifier un utilisateur" },
      { method: "DELETE", path: "/admin/users/{id}", description: "Supprimer un utilisateur" },
      { method: "PUT", path: "/admin/users/{id}/status", description: "Changer le statut" },
    ]
  },
  {
    id: "subscriptions",
    title: "Abonnements",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Gestion des plans et abonnements",
    endpoints: [
      { method: "GET", path: "/admin/subscription-plans", description: "Plans d'abonnement" },
      { method: "GET", path: "/v1/settings/subscriptions/current", description: "Abonnement actuel" },
      { method: "POST", path: "/v1/settings/subscriptions", description: "Créer abonnement" },
      { method: "PUT", path: "/v1/settings/subscriptions/{id}/cancel", description: "Annuler abonnement" },
    ]
  },
  {
    id: "transactions",
    title: "Transactions",
    icon: <Calculator className="h-5 w-5" />,
    description: "Historique et gestion des transactions",
    endpoints: [
      { method: "GET", path: "/admin/all-transactions", description: "Toutes les transactions" },
      { method: "GET", path: "/v1/settings/transactions-list", description: "Liste des transactions utilisateur" },
      { method: "GET", path: "/v1/settings/transactions/{id}/doc", description: "Document de transaction" },
    ]
  },
  {
    id: "contacts",
    title: "Contacts",
    icon: <FileText className="h-5 w-5" />,
    description: "Gestion des contacts clients",
    endpoints: [
      { method: "GET", path: "/v1/contacts", description: "Liste des contacts" },
      { method: "POST", path: "/v1/contacts", description: "Créer un contact" },
      { method: "PUT", path: "/v1/contacts/{id}", description: "Modifier un contact" },
      { method: "DELETE", path: "/v1/contacts/{id}", description: "Supprimer un contact" },
      { method: "POST", path: "/v1/contacts/import", description: "Importer des contacts" },
    ]
  },
  {
    id: "finances",
    title: "Finances",
    icon: <Calculator className="h-5 w-5" />,
    description: "Gestion financière et comptabilité",
    endpoints: [
      { method: "GET", path: "/v1/finances", description: "Données financières" },
      { method: "GET", path: "/v1/finances/revenue-stats", description: "Statistiques revenus" },
      { method: "GET", path: "/v1/finances/invoices/stats", description: "Statistiques factures" },
      { method: "GET", path: "/v1/finances/export/{type}", description: "Export des données" },
    ]
  }
];

const businessRules = [
  {
    title: "Gestion des Abonnements",
    rules: [
      "Un utilisateur gratuit peut être upgrader immédiatement vers un plan payant",
      "Pour les utilisateurs payants, le nouvel abonnement commence après l'expiration de l'actuel",
      "Les annulations d'abonnement prennent effet à la fin de la période payée",
      "Les révocations sont immédiates et sans remboursement"
    ]
  },
  {
    title: "Plans Disponibles", 
    rules: [
      "Plan Gratuit : Accès limité, durée permanente",
      "Plan Mensuel : Facturation mensuelle, renouvellement automatique",
      "Plan Annuel : Facturation annuelle avec réduction, renouvellement automatique"
    ]
  },
  {
    title: "Transactions",
    rules: [
      "Toutes les transactions sont en FCFA",
      "Les transactions sont automatiquement créées lors des changements d'abonnement",
      "Les documents de transaction sont générés automatiquement",
      "L'historique des transactions est conservé indéfiniment"
    ]
  },
  {
    title: "Utilisateurs",
    rules: [
      "Un email ne peut être utilisé que pour un seul compte",
      "Les comptes inactifs sont suspendus après 90 jours sans connexion",
      "La suppression d'un utilisateur archive ses données sans les supprimer",
      "Les administrateurs ont accès à toutes les fonctionnalités"
    ]
  }
];

const codeStructure = [
  {
    category: "Pages",
    files: [
      { name: "src/pages/Dashboard.tsx", description: "Tableau de bord administrateur avec statistiques" },
      { name: "src/pages/Users.tsx", description: "Gestion des utilisateurs (CRUD)" },
      { name: "src/pages/Transactions.tsx", description: "Historique des transactions" },
      { name: "src/pages/Subscriptions.tsx", description: "Gestion des abonnements" },
      { name: "src/pages/UserDetail.tsx", description: "Détails d'un utilisateur spécifique" },
      { name: "src/pages/ClientPortal.tsx", description: "Portail client avec devis et factures" },
      { name: "src/pages/ClientContract.tsx", description: "Signature de contrats client" },
      { name: "src/pages/ClientFactures.tsx", description: "Factures client" },
      { name: "src/pages/ClientDevis.tsx", description: "Devis client" },
      { name: "src/pages/ClientDocumentation.tsx", description: "Documentation client" },
      { name: "src/pages/Documentation.tsx", description: "Documentation API et code" }
    ]
  },
  {
    category: "Composants",
    files: [
      { name: "src/components/AdminLayout.tsx", description: "Layout principal avec sidebar et header" },
      { name: "src/components/AdminSidebar.tsx", description: "Sidebar de navigation administrative" },
      { name: "src/components/AdminHeader.tsx", description: "Header avec menu mobile et notifications" },
      { name: "src/components/StatCard.tsx", description: "Cartes de statistiques réutilisables" },
      { name: "src/components/ui/", description: "Composants UI basés sur shadcn/ui" }
    ]
  },
  {
    category: "Configuration",
    files: [
      { name: "src/main.tsx", description: "Point d'entrée de l'application React" },
      { name: "src/App.tsx", description: "Composant racine avec routage" },
      { name: "src/index.css", description: "Styles globaux et tokens de design" },
      { name: "tailwind.config.ts", description: "Configuration Tailwind CSS" },
      { name: "vite.config.ts", description: "Configuration Vite" },
      { name: "tsconfig.json", description: "Configuration TypeScript" }
    ]
  },
  {
    category: "Utilitaires",
    files: [
      { name: "src/lib/utils.ts", description: "Fonctions utilitaires (classnames, etc.)" },
      { name: "src/hooks/use-mobile.tsx", description: "Hook pour détecter les appareils mobiles" },
      { name: "src/hooks/use-toast.ts", description: "Hook pour les notifications toast" }
    ]
  }
];

const installationSteps = [
  "npm create vite@latest picstudio-crm --template react-ts",
  "cd picstudio-crm",
  "npm install",
  "npx shadcn-ui@latest init",
  "npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog",
  "npm install lucide-react react-router-dom recharts",
  "npm install @tanstack/react-query sonner",
  "npm install class-variance-authority clsx tailwind-merge",
  "npm run dev"
];

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("overview");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredSections = apiSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.endpoints.some(endpoint => 
      endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-blue-100 text-blue-800";
      case "POST": return "bg-green-100 text-green-800";
      case "PUT": return "bg-yellow-100 text-yellow-800";
      case "DELETE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(type);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documentation API</h1>
            <p className="text-muted-foreground mt-1">Guide métier et technique pour l'administration de PicStudio</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans la documentation..."
              className="pl-10 w-full lg:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={selectedSection} onValueChange={setSelectedSection} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="api">API Endpoints</TabsTrigger>
            <TabsTrigger value="business">Règles Métier</TabsTrigger>
            <TabsTrigger value="code">Code Source</TabsTrigger>
            <TabsTrigger value="examples">Exemples</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>API PicStudio v1.0.0</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-foreground">URL de base</h3>
                    <p className="text-sm text-muted-foreground mt-1">https://api.piccloud.fr</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-foreground">Authentification</h3>
                    <p className="text-sm text-muted-foreground mt-1">JWT Bearer Token</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-foreground">Format de données</h3>
                    <p className="text-sm text-muted-foreground mt-1">JSON (application/json)</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium text-foreground mb-3">Modules principaux</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {apiSections.slice(0, 6).map((section) => (
                      <div key={section.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                          {section.icon}
                          <h4 className="font-medium text-foreground">{section.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {section.endpoints.length} endpoints
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            {filteredSections.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {section.icon}
                    <span>{section.title}</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.endpoints.map((endpoint, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <Badge className={getMethodColor(endpoint.method)} variant="secondary">
                            {endpoint.method}
                          </Badge>
                          <div>
                            <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
                            <p className="text-sm text-muted-foreground mt-1">{endpoint.description}</p>
                          </div>
                        </div>
                        <Code className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            {businessRules.map((ruleGroup, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{ruleGroup.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {ruleGroup.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Structure du Code Source</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {codeStructure.map((category, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{category.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {category.files.map((file, fileIndex) => (
                            <div key={fileIndex} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <code className="text-sm font-mono text-primary font-medium">
                                    {file.name}
                                  </code>
                                  <p className="text-xs text-muted-foreground mt-1">{file.description}</p>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(file.name, file.name)}
                                  className="ml-2 p-1 hover:bg-muted rounded"
                                  title="Copier le chemin"
                                >
                                  {copiedCode === file.name ? (
                                    <Check className="h-3 w-3 text-green-600" />
                                  ) : (
                                    <Copy className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Installation & Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center justify-between">
                    Étapes d'installation
                    <button
                      onClick={() => copyToClipboard(installationSteps.join('\n'), 'installation')}
                      className="p-2 hover:bg-muted rounded flex items-center space-x-1 text-sm"
                    >
                      {copiedCode === 'installation' ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span>Copier</span>
                    </button>
                  </h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{installationSteps.join('\n')}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Technologies utilisées</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { name: "React 18", desc: "Framework UI" },
                      { name: "TypeScript", desc: "Typage statique" },
                      { name: "Vite", desc: "Build tool" },
                      { name: "Tailwind CSS", desc: "Framework CSS" },
                      { name: "Shadcn/UI", desc: "Composants UI" },
                      { name: "React Router", desc: "Routage" },
                      { name: "Lucide React", desc: "Icônes" },
                      { name: "Recharts", desc: "Graphiques" }
                    ].map((tech, index) => (
                      <div key={index} className="p-3 border rounded-lg text-center">
                        <p className="font-medium text-sm">{tech.name}</p>
                        <p className="text-xs text-muted-foreground">{tech.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center justify-between">
                    Structure des dossiers
                    <button
                      onClick={() => copyToClipboard(
                        `src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants shadcn/ui
│   ├── AdminLayout.tsx # Layout principal
│   ├── AdminSidebar.tsx # Navigation
│   └── AdminHeader.tsx # En-tête
├── pages/              # Pages de l'application
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires
├── index.css           # Styles globaux
└── main.tsx            # Point d'entrée`, 
                        'folder-structure'
                      )}
                      className="p-2 hover:bg-muted rounded flex items-center space-x-1 text-sm"
                    >
                      {copiedCode === 'folder-structure' ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span>Copier</span>
                    </button>
                  </h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants shadcn/ui
│   ├── AdminLayout.tsx # Layout principal
│   ├── AdminSidebar.tsx # Navigation
│   └── AdminHeader.tsx # En-tête
├── pages/              # Pages de l'application
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires
├── index.css           # Styles globaux
└── main.tsx            # Point d'entrée`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exemples d'utilisation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Créer un utilisateur</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`POST /admin/users
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Jean Dupont",
  "email": "jean.dupont@email.com",
  "location": "Yaoundé, Cameroun",
  "accountType": "Mensuel"
}`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Modifier un abonnement</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`POST /v1/settings/subscriptions
Content-Type: application/json
Authorization: Bearer {token}

{
  "userId": "123",
  "planType": "Annuel",
  "startDate": "2024-01-01",
  "duration": 12
}`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Récupérer les statistiques</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`GET /admin/admin-stats
Authorization: Bearer {token}

Response:
{
  "totalUsers": 3120,
  "newUsers": 156,
  "revenue": 2500000,
  "transactions": 847
}`}</code>
                    </pre>
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