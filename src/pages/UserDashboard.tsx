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
    title: "Événements à venir",
    value: "0",
    change: "Cette semaine",
    changeType: "positive" as const,
    icon: <Calendar className="h-5 w-5" />,
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
    title: "Planifier",
    icon: <CalendarDays className="h-8 w-8" />,
    description: "Gérer le calendrier",
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
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Bon après-midi, 2F FOTSO
          </h1>
          <p className="text-muted-foreground">Voici un aperçu de votre activité</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {userStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Devis récents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">Devis récents</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentQuotes.map((quote) => (
                <div key={quote.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{quote.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{quote.client}</p>
                      <p className="text-xs text-muted-foreground">{quote.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(quote.status, quote.statusColor)}`}
                    >
                      {quote.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{quote.amount}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Factures récentes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">Factures récentes</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{invoice.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground">{invoice.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(invoice.status, invoice.statusColor)}`}
                    >
                      {invoice.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{invoice.amount}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Événements du jour */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">Événements du jour</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Aucun événement prévu</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center space-y-2 hover:bg-primary/5 hover:border-primary/20"
                >
                  <div className="text-primary">{action.icon}</div>
                  <div className="text-center">
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
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