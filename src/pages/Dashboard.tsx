import { AdminLayout } from "@/components/AdminLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, CreditCard, DollarSign, TrendingUp, Search, Download, Filter, MoreHorizontal } from "lucide-react";

const stats = [
  {
    title: "Nombre d'utilisateurs",
    value: "3120",
    change: "-3,5%",
    changeType: "negative" as const,
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Souscriptions",
    value: "2600",
    change: "-3,5%",
    changeType: "negative" as const,
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "C.A.",
    value: "2 500 000",
    change: "+4,2%",
    changeType: "positive" as const,
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    title: "C.A Total",
    value: "4 800 000",
    change: "12 / Mois",
    changeType: "positive" as const,
    icon: <TrendingUp className="h-5 w-5" />,
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
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Administration</h1>
            <div className="flex space-x-1 mt-2">
              <Button variant="default" size="sm">Tableau de bord</Button>
              <Button variant="ghost" size="sm">Gestion des dépenses</Button>
              <Button variant="ghost" size="sm">Gestion des paiements</Button>
            </div>
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Jul 09-July 16 2024</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transactions</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transaction..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Nom</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Date</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Souscription</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Montant</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{transaction.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{transaction.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{transaction.date}</td>
                      <td className="py-4 px-4">
                        <Badge variant="secondary">{transaction.subscription}</Badge>
                      </td>
                      <td className="py-4 px-4 font-medium">{transaction.amount}</td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm">
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