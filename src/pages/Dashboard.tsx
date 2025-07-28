import { AdminLayout } from "@/components/AdminLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, CreditCard, DollarSign, TrendingUp, Search, Download, Filter, MoreHorizontal, UserPlus, Crown, Activity, Target } from "lucide-react";

const stats = [
  {
    title: "Total Utilisateurs",
    value: "3,120",
    change: "+12%",
    changeType: "positive" as const,
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Nouveaux Utilisateurs",
    value: "156",
    change: "Ce mois",
    changeType: "positive" as const,
    icon: <UserPlus className="h-5 w-5" />,
  },
  {
    title: "Revenus (FCFA)",
    value: "2,500,000",
    change: "+15,2%",
    changeType: "positive" as const,
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    title: "Transactions",
    value: "847",
    change: "Cette semaine",
    changeType: "positive" as const,
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: "Plans Gratuits",
    value: "1,245",
    change: "-5,8%",
    changeType: "negative" as const,
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Plans Premium",
    value: "1,602",
    change: "+18,4%",
    changeType: "positive" as const,
    icon: <Crown className="h-5 w-5" />,
  },
];

const transactions = [
  {
    id: 1,
    name: "Michael Hun",
    avatar: "MH",
    date: "10 Nov 2023, 08:00",
    subscription: "Annuel",
    amount: "$500.00",
  },
  {
    id: 2,
    name: "Courtney Henry",
    avatar: "CH",
    date: "10 Nov 2023, 08:00",
    subscription: "Mensuel",
    amount: "$250.00",
  },
  {
    id: 3,
    name: "Jacob Jones",
    avatar: "JJ",
    date: "10 Nov 2023, 08:00",
    subscription: "Trim",
    amount: "$1,250.00",
  },
  {
    id: 4,
    name: "Cody Fisher",
    avatar: "CF",
    date: "10 Nov 2023, 08:00",
    subscription: "Annuel",
    amount: "$310.99",
  },
  {
    id: 5,
    name: "Michael Hun",
    avatar: "MH",
    date: "10 Nov 2023, 08:00",
    subscription: "Annuel",
    amount: "$310.99",
  },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Vue d'ensemble des activités de votre CRM</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <CardTitle className="text-lg lg:text-xl">Transactions</CardTitle>
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Download className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Filter className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4">Nom</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4 hidden sm:table-cell">Date</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4">Souscription</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4">Montant</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2 sm:py-4 sm:px-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                            <AvatarFallback className="text-xs">{transaction.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <span className="font-medium text-sm sm:text-base truncate block">{transaction.name}</span>
                            <span className="text-xs text-muted-foreground sm:hidden">{transaction.date}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-4 text-muted-foreground text-sm hidden sm:table-cell">{transaction.date}</td>
                      <td className="py-3 px-2 sm:py-4 sm:px-4">
                        <Badge variant="secondary" className="text-xs">{transaction.subscription}</Badge>
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-4 font-medium text-sm sm:text-base">{transaction.amount}</td>
                      <td className="py-3 px-2 sm:py-4 sm:px-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}