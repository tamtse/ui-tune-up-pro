import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Code, Database, Users, Settings, CreditCard, FileText, Mail, Calendar, Calculator } from "lucide-react";

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

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("overview");

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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="api">API Endpoints</TabsTrigger>
            <TabsTrigger value="business">Règles Métier</TabsTrigger>
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