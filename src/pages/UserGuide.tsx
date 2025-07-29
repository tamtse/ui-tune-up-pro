import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Users, Calendar, CreditCard, FileText, Settings, BarChart3, Database, Shield, Mail, Globe, Copy, Check } from "lucide-react";

const userWorkflows = [
  {
    id: "client-management",
    title: "Gestion des Clients",
    icon: <Users className="h-5 w-5" />,
    description: "Workflow complet de gestion des relations clients",
    steps: [
      {
        title: "1. Création du contact",
        description: "Ajoutez un nouveau client via la section Contacts",
        details: ["Remplissez les informations de base", "Définissez le type de client (particulier/entreprise)", "Ajoutez les coordonnées complètes"],
        apiEndpoint: "POST /v1/contacts"
      },
      {
        title: "2. Création du devis",
        description: "Établissez une proposition commerciale personnalisée",
        details: ["Sélectionnez les prestations", "Calculez automatiquement les tarifs", "Personnalisez les conditions"],
        apiEndpoint: "POST /v1/quotes"
      },
      {
        title: "3. Suivi et validation",
        description: "Accompagnez le client dans sa décision",
        details: ["Envoyez le devis par email", "Surveillez les consultations", "Relancez si nécessaire"],
        apiEndpoint: "GET /v1/quotes/{id}/status"
      },
      {
        title: "4. Conversion en facture",
        description: "Transformez le devis accepté en facture",
        details: ["Validation automatique du devis", "Génération de la facture", "Planification du paiement"],
        apiEndpoint: "POST /v1/invoices/from-quote/{id}"
      }
    ]
  },
  {
    id: "financial-management",
    title: "Gestion Financière",
    icon: <BarChart3 className="h-5 w-5" />,
    description: "Suivi des performances et analyse financière",
    steps: [
      {
        title: "1. Tableau de bord financier",
        description: "Consultez vos indicateurs clés en temps réel",
        details: ["Chiffre d'affaires mensuel/annuel", "Évolution des marges", "Prévisions de trésorerie"],
        apiEndpoint: "GET /v1/finances/dashboard"
      },
      {
        title: "2. Analyse des revenus",
        description: "Décortiquez vos sources de revenus",
        details: ["Revenus par type de prestation", "Clients les plus rentables", "Saisonnalité des activités"],
        apiEndpoint: "GET /v1/finances/revenue-analysis"
      },
      {
        title: "3. Gestion des impayés",
        description: "Surveillez et relancez les factures en retard",
        details: ["Identification automatique des retards", "Système de relances graduées", "Suivi des actions de recouvrement"],
        apiEndpoint: "GET /v1/finances/overdue-invoices"
      },
      {
        title: "4. Export comptable",
        description: "Préparez vos données pour la comptabilité",
        details: ["Export des écritures comptables", "Génération des rapports TVA", "Synchronisation avec votre expert-comptable"],
        apiEndpoint: "GET /v1/finances/export/{format}"
      }
    ]
  }
];

const advancedFeatures = [
  {
    category: "Automatisation",
    features: [
      {
        name: "Relances automatiques",
        description: "Configuration de relances email automatiques pour les devis et factures",
        implementation: "Utilisez les webhooks pour déclencher les relances selon vos règles métier",
        apiRef: "POST /v1/automation/reminders"
      },
      {
        name: "Synchronisation calendrier",
        description: "Intégration avec Google Calendar, Outlook pour la gestion des rendez-vous",
        implementation: "Configuration OAuth2 pour synchroniser vos événements clients",
        apiRef: "POST /v1/calendar/sync"
      },
      {
        name: "Notifications intelligentes",
        description: "Alertes contextuelles basées sur l'activité client et les échéances",
        implementation: "Système de notifications push et email personnalisables",
        apiRef: "GET /v1/notifications/settings"
      }
    ]
  },
  {
    category: "Intégrations",
    features: [
      {
        name: "Passerelle de paiement",
        description: "Intégration Stripe pour l'encaissement direct des factures",
        implementation: "Configuration des webhooks Stripe pour le suivi des paiements",
        apiRef: "POST /v1/payments/stripe/setup"
      },
      {
        name: "Signature électronique",
        description: "Validation juridique des contrats avec signature numérique",
        implementation: "API de signature conforme aux standards européens eIDAS",
        apiRef: "POST /v1/contracts/sign"
      },
      {
        name: "Export comptable",
        description: "Connecteurs vers les principaux logiciels de comptabilité",
        implementation: "Formats standards : FEC, CSV personnalisés, API directes",
        apiRef: "GET /v1/accounting/export/{software}"
      }
    ]
  }
];

const businessRules = [
  {
    rule: "Gestion des statuts de devis",
    description: "Un devis a une durée de validité configurable (30 jours par défaut)",
    implementation: "Vérification automatique lors de chaque consultation",
    impact: "Les devis expirés ne peuvent plus être acceptés sans revalidation"
  },
  {
    rule: "Calcul automatique des prix",
    description: "Les tarifs sont calculés selon votre grille tarifaire personnalisée",
    implementation: "Algorithme de pricing avec règles de remises et majorations",
    impact: "Cohérence des prix et optimisation de la marge"
  },
  {
    rule: "Workflow de validation",
    description: "Les documents passent par des étapes de validation définies",
    implementation: "Machine à états avec transitions contrôlées",
    impact: "Traçabilité complète et conformité des processus"
  },
  {
    rule: "Gestion des droits d'accès",
    description: "Contrôle granulaire des permissions selon les rôles utilisateur",
    implementation: "RBAC (Role-Based Access Control) avec héritage",
    impact: "Sécurité des données et respect de la confidentialité"
  }
];

const performanceTips = [
  {
    category: "Optimisation du processus commercial",
    tips: [
      "Utilisez les modèles de devis pour accélérer la création",
      "Configurez des relances automatiques pour améliorer le taux de conversion",
      "Analysez vos métriques de conversion pour identifier les points d'amélioration",
      "Personnalisez vos communications client selon leur profil"
    ]
  },
  {
    category: "Gestion financière efficace",
    tips: [
      "Consultez le tableau de bord quotidiennement pour anticiper les problèmes",
      "Configurez des alertes sur les objectifs de CA pour rester motivé",
      "Utilisez les exports comptables pour simplifier votre déclaration",
      "Analysez la rentabilité par type de prestation pour optimiser votre offre"
    ]
  },
  {
    category: "Organisation et productivité",
    tips: [
      "Synchronisez votre calendrier pour éviter les doubles bookings",
      "Utilisez les tags et catégories pour organiser vos contacts",
      "Programmez des tâches récurrentes pour les actions administratives",
      "Exploitez les rapports pour identifier vos clients les plus rentables"
    ]
  }
];

export default function UserGuide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("workflows");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(type);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const filteredWorkflows = userWorkflows.filter(workflow =>
    workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.steps.some(step => 
      step.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      step.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Guide Utilisateur Avancé</h1>
            <p className="text-muted-foreground mt-1">Maîtrisez tous les aspects de PicStudio CRM</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans le guide..."
              className="pl-10 w-full lg:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="workflows">Workflows Métier</TabsTrigger>
            <TabsTrigger value="advanced">Fonctions Avancées</TabsTrigger>
            <TabsTrigger value="business">Règles Métier</TabsTrigger>
            <TabsTrigger value="performance">Optimisation</TabsTrigger>
            <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {workflow.icon}
                    <span>{workflow.title}</span>
                  </CardTitle>
                  <p className="text-muted-foreground">{workflow.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {workflow.steps.map((step, index) => (
                      <div key={index} className="relative">
                        {index < workflow.steps.length - 1 && (
                          <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border"></div>
                        )}
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 space-y-2">
                            <h3 className="font-medium text-foreground">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                            <div className="space-y-1">
                              {step.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex items-start space-x-2 text-sm">
                                  <span className="text-primary mt-1">•</span>
                                  <span className="text-muted-foreground">{detail}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                              <Badge variant="outline" className="text-xs">
                                <Database className="h-3 w-3 mr-1" />
                                {step.apiEndpoint}
                              </Badge>
                              <button
                                onClick={() => copyToClipboard(step.apiEndpoint, step.apiEndpoint)}
                                className="p-1 hover:bg-muted rounded"
                                title="Copier l'endpoint"
                              >
                                {copiedCode === step.apiEndpoint ? (
                                  <Check className="h-3 w-3 text-green-600" />
                                ) : (
                                  <Copy className="h-3 w-3 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            {advancedFeatures.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-foreground">{feature.name}</h3>
                          <Settings className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-foreground">💡 Mise en œuvre :</p>
                          <p className="text-xs text-muted-foreground">{feature.implementation}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            <Database className="h-3 w-3 mr-1" />
                            {feature.apiRef}
                          </Badge>
                          <button
                            onClick={() => copyToClipboard(feature.apiRef, feature.apiRef)}
                            className="p-1 hover:bg-muted rounded"
                            title="Copier l'endpoint"
                          >
                            {copiedCode === feature.apiRef ? (
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
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Règles Métier & Logique Applicative</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {businessRules.map((rule, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4 space-y-2">
                      <h3 className="font-medium text-foreground">{rule.rule}</h3>
                      <p className="text-muted-foreground">{rule.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs font-medium text-foreground mb-1">🔧 Implémentation :</p>
                          <p className="text-xs text-muted-foreground">{rule.implementation}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground mb-1">📊 Impact métier :</p>
                          <p className="text-xs text-muted-foreground">{rule.impact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {performanceTips.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs font-bold">✓</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Écosystème d'Intégrations</span>
                </CardTitle>
                <p className="text-muted-foreground">Connectez PicStudio à vos outils existants</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 border rounded-lg text-center space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-foreground">Paiements</h3>
                    <p className="text-sm text-muted-foreground">Stripe, PayPal, virements SEPA</p>
                    <Badge variant="outline" className="text-xs">Disponible</Badge>
                  </div>

                  <div className="p-6 border rounded-lg text-center space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium text-foreground">Calendriers</h3>
                    <p className="text-sm text-muted-foreground">Google, Outlook, Apple Calendar</p>
                    <Badge variant="outline" className="text-xs">Disponible</Badge>
                  </div>

                  <div className="p-6 border rounded-lg text-center space-y-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-foreground">Email Marketing</h3>
                    <p className="text-sm text-muted-foreground">Mailchimp, SendGrid, newsletters</p>
                    <Badge variant="outline" className="text-xs">En développement</Badge>
                  </div>

                  <div className="p-6 border rounded-lg text-center space-y-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Database className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-medium text-foreground">Comptabilité</h3>
                    <p className="text-sm text-muted-foreground">Sage, QuickBooks, exports FEC</p>
                    <Badge variant="outline" className="text-xs">Disponible</Badge>
                  </div>

                  <div className="p-6 border rounded-lg text-center space-y-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <FileText className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="font-medium text-foreground">Signature</h3>
                    <p className="text-sm text-muted-foreground">DocuSign, Adobe Sign, eIDAS</p>
                    <Badge variant="outline" className="text-xs">Disponible</Badge>
                  </div>

                  <div className="p-6 border rounded-lg text-center space-y-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Settings className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="font-medium text-foreground">Webhooks</h3>
                    <p className="text-sm text-muted-foreground">API personnalisées, Zapier</p>
                    <Badge variant="outline" className="text-xs">Disponible</Badge>
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