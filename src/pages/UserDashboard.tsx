import { AdminLayout } from "@/components/AdminLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Euro, 
  FileText, 
  TrendingUp, 
  Users, 
  Calendar, 
  UserPlus, 
  Camera, 
  FileCheck, 
  CalendarDays,
  MoreHorizontal 
} from "lucide-react";

const userStats = [
  {
    title: "Revenus du mois",
    value: "0 FCFA",
    change: "Ce mois",
    changeType: "positive" as const,
    icon: <Euro className="h-5 w-5" />,
  },
  {
    title: "Devis en attente",
    value: "0",
    change: "En cours",
    changeType: "positive" as const,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Chiffre d'affaires total",
    value: "0 FCFA",
    change: "+10.5%",
    changeType: "positive" as const,
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: "Clients totaux",
    value: "3",
    change: "+2 ce mois",
    changeType: "positive" as const,
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Factures non payées",
    value: "2",
    change: "À relancer",
    changeType: "negative" as const,
    icon: <FileText className="h-5 w-5" />,
  },
];

const recentQuotes = [
  {
    id: 1,
    client: "Sydney Amougou",
    avatar: "S",
    type: "Portrait",
    status: "En attente",
    date: "10/06/2023",
    amount: "200 000 Fcfa",
    statusColor: "orange" as const,
  },
  {
    id: 2,
    client: "Courtney Henry",
    avatar: "CH",
    type: "Réalisation",
    status: "Accepté",
    date: "10/06/2023",
    amount: "400 000 Fcfa",
    statusColor: "green" as const,
  },
];

const recentInvoices = [
  {
    id: 1,
    client: "Cody Fisher",
    avatar: "CF",
    type: "Shooting",
    status: "Accepté",
    date: "10/06/2023",
    amount: "500 000 Fcfa",
    statusColor: "green" as const,
  },
  {
    id: 2,
    client: "Sydney Amougou",
    avatar: "S",
    type: "Mariage",
    status: "Accepté",
    date: "10/06/2023",
    amount: "800 000 Fcfa",
    statusColor: "green" as const,
  },
];

const quickActions = [
  {
    title: "Nouveau contact",
    icon: <UserPlus className="h-8 w-8" />,
    description: "Ajouter un nouveau client",
  },
  {
    title: "Nouvelle prestation",
    icon: <Camera className="h-8 w-8" />,
    description: "Créer une prestation",
  },
  {
    title: "Créer un devis",
    icon: <FileCheck className="h-8 w-8" />,
    description: "Nouveau devis client",
  },
  {
    title: "Créer un contrat",
    icon: <CalendarDays className="h-8 w-8" />,
    description: "Nouveau contrat client",
  },
];

const getStatusColor = (status: string, colorType: "green" | "orange" | "red") => {
  switch (colorType) {
    case "green":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "orange":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "red":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export default function UserDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Bon après-midi, 2F FOTSO
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Voici un aperçu de votre activité</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {userStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Devis récents */}
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Devis récents</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {recentQuotes.map((quote) => (
                <div key={quote.id} className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-border">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">{quote.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm truncate">{quote.client}</p>
                      <p className="text-xs text-muted-foreground truncate">{quote.type}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(quote.status, quote.statusColor)}`}
                    >
                      {quote.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{quote.amount}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Factures récentes */}
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Factures récentes</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-border">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">{invoice.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm truncate">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground truncate">{invoice.type}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(invoice.status, invoice.statusColor)}`}
                    >
                      {invoice.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{invoice.amount}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Événements du jour */}
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Événements du jour</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-blue-200 bg-blue-50">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    📸
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-blue-900">Shooting Mariage</p>
                    <p className="text-xs text-blue-700">15h00 - Bonanjo</p>
                  </div>
                </div>
                <span className="text-xs text-blue-700 flex-shrink-0">Demain</span>
              </div>
              <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-green-200 bg-green-50">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    📦
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs sm:text-sm text-green-900">Livraison Photos</p>
                    <p className="text-xs text-green-700">10h00 - Bureau client</p>
                  </div>
                </div>
                <span className="text-xs text-green-700 flex-shrink-0">Vendredi</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 sm:p-6 flex flex-col items-center space-y-1 sm:space-y-2 hover:bg-primary/5 hover:border-primary/20"
                >
                  <div className="text-primary">{action.icon}</div>
                  <div className="text-center">
                    <p className="font-medium text-xs sm:text-sm">{action.title}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}