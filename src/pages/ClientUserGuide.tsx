import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FileText, Calendar, CreditCard, Download, Eye, CheckCircle, XCircle, PenTool, User, Settings, HelpCircle, Phone } from "lucide-react";

const clientGuideSteps = [
  {
    id: "getting-started",
    title: "Premiers pas",
    icon: <User className="h-5 w-5" />,
    content: [
      {
        step: "1. Connexion",
        description: "Utilisez votre email et mot de passe fournis par PicStudio pour vous connecter à votre espace client.",
        tips: ["Conservez vos identifiants en sécurité", "Contactez-nous si vous avez oublié votre mot de passe"]
      },
      {
        step: "2. Découverte de l'interface",
        description: "Familiarisez-vous avec les deux sections principales : Documents et Profil.",
        tips: ["Les documents sont organisés par type et statut", "Votre profil contient vos informations personnelles"]
      },
      {
        step: "3. Navigation",
        description: "Utilisez les onglets pour basculer entre vos documents et votre profil client.",
        tips: ["Les notifications apparaissent en temps réel", "L'interface s'adapte à votre écran mobile"]
      }
    ]
  },
  {
    id: "documents",
    title: "Gestion des Documents",
    icon: <FileText className="h-5 w-5" />,
    content: [
      {
        step: "Types de documents",
        description: "Vous recevrez différents types de documents : Devis, Factures, Contrats et Documentation.",
        tips: ["Chaque type a ses propres actions possibles", "Les statuts sont mis à jour automatiquement"]
      },
      {
        step: "Actions disponibles",
        description: "Selon le type et le statut, vous pouvez : Consulter, Télécharger, Accepter, Refuser ou Signer.",
        tips: ["La signature électronique est juridiquement valide", "Téléchargez vos documents pour les conserver"]
      },
      {
        step: "Suivi des statuts",
        description: "Suivez l'évolution de vos documents grâce aux badges de statut colorés.",
        tips: ["Vert = validé/payé", "Orange = en attente", "Rouge = refusé/en retard"]
      }
    ]
  }
];

const documentTypes = [
  {
    type: "Devis",
    description: "Propositions commerciales détaillées",
    actions: ["Consulter", "Télécharger", "Accepter", "Refuser"],
    statuses: ["En attente", "Accepté", "Refusé", "Expiré"],
    icon: <FileText className="h-4 w-4" />
  },
  {
    type: "Factures", 
    description: "Documents de facturation",
    actions: ["Consulter", "Télécharger"],
    statuses: ["En attente", "Payée", "En retard"],
    icon: <CreditCard className="h-4 w-4" />
  },
  {
    type: "Contrats",
    description: "Contrats à signer électroniquement",
    actions: ["Consulter", "Télécharger", "Signer"],
    statuses: ["En attente de signature", "Signé", "Expiré"],
    icon: <PenTool className="h-4 w-4" />
  },
  {
    type: "Documentation",
    description: "Guides et documents informatifs",
    actions: ["Consulter", "Télécharger"],
    statuses: ["Disponible"],
    icon: <HelpCircle className="h-4 w-4" />
  }
];

const frequentQuestions = [
  {
    question: "Comment signer un contrat électroniquement ?",
    answer: "Cliquez sur 'Signer' dans le document concerné. Une fenêtre s'ouvrira avec un champ de signature tactile. Dessinez votre signature avec votre souris ou votre doigt (sur mobile), puis validez."
  },
  {
    question: "Puis-je modifier mes informations personnelles ?",
    answer: "Oui, rendez-vous dans l'onglet 'Profil' pour modifier vos informations. Certaines modifications peuvent nécessiter une validation de notre équipe."
  },
  {
    question: "Comment télécharger mes documents ?",
    answer: "Chaque document dispose d'un bouton 'Télécharger'. Le fichier sera sauvegardé au format PDF sur votre appareil."
  },
  {
    question: "Que faire si je refuse un devis par erreur ?",
    answer: "Contactez immédiatement notre équipe support. Selon les circonstances, nous pourrons réactiver le devis."
  },
  {
    question: "Puis-je accéder à mon espace depuis mon téléphone ?",
    answer: "Absolument ! Notre interface est entièrement responsive et optimisée pour les appareils mobiles."
  }
];

const supportInfo = {
  email: "support@picstudio.fr",
  phone: "+33 1 23 45 67 89",
  hours: "Lundi - Vendredi : 9h00 - 18h00",
  response: "Réponse sous 24h en moyenne"
};

export default function ClientUserGuide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("guide");

  const filteredSteps = clientGuideSteps.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.some(item => 
      item.step.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredQuestions = frequentQuestions.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepté":
      case "payée":
      case "signé":
      case "disponible":
        return "bg-green-100 text-green-800";
      case "en attente":
      case "en attente de signature":
        return "bg-yellow-100 text-yellow-800";
      case "refusé":
      case "en retard":
      case "expiré":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Guide Client PicStudio</h1>
            <p className="text-muted-foreground mt-1">Tout ce que vous devez savoir pour utiliser votre espace client</p>
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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="guide">Guide d'utilisation</TabsTrigger>
            <TabsTrigger value="documents">Types de documents</TabsTrigger>
            <TabsTrigger value="faq">Questions fréquentes</TabsTrigger>
            <TabsTrigger value="support">Support & Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-6">
            {filteredSteps.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {section.icon}
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {section.content.map((item, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h3 className="font-medium text-foreground mb-2">{item.step}</h3>
                        <p className="text-muted-foreground mb-3">{item.description}</p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-foreground">💡 Conseils :</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {item.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start space-x-2">
                                <span className="text-primary">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documentTypes.map((docType, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {docType.icon}
                      <span>{docType.type}</span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{docType.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Actions possibles :</h4>
                      <div className="flex flex-wrap gap-2">
                        {docType.actions.map((action, actionIndex) => (
                          <Badge key={actionIndex} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Statuts possibles :</h4>
                      <div className="flex flex-wrap gap-2">
                        {docType.statuses.map((status, statusIndex) => (
                          <Badge key={statusIndex} className={getStatusColor(status)} variant="secondary">
                            {status}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Questions Fréquemment Posées</CardTitle>
                <p className="text-muted-foreground">Trouvez rapidement des réponses à vos questions</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredQuestions.map((faq, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h3 className="font-medium text-foreground mb-2 flex items-start space-x-2">
                        <HelpCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-muted-foreground pl-6">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5" />
                    <span>Informations de Contact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email Support</p>
                        <p className="text-sm text-muted-foreground">{supportInfo.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Téléphone</p>
                        <p className="text-sm text-muted-foreground">{supportInfo.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Horaires</p>
                        <p className="text-sm text-muted-foreground">{supportInfo.hours}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Temps de Réponse</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Support Email</span>
                    </div>
                    <p className="text-sm text-green-700">{supportInfo.response}</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Support Téléphonique</span>
                    </div>
                    <p className="text-sm text-blue-700">Réponse immédiate pendant les heures d'ouverture</p>
                  </div>

                  <div className="mt-4 p-4 border rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Avant de nous contacter :</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Vérifiez vos identifiants de connexion</li>
                      <li>• Consultez cette documentation</li>
                      <li>• Notez le message d'erreur exact (si applicable)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}