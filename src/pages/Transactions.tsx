import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Download, MoreHorizontal, DollarSign, CreditCard, TrendingUp, TrendingDown } from "lucide-react";
import { StatCard } from "@/components/StatCard";

const transactions = [
  {
    id: 1,
    name: "Michael Hun",
    email: "michaelhun@mail.com",
    avatar: "MH",
    date: "10 Nov 2023, 08:00",
    subscription: "Annuel",
    amount: "50,000 FCFA",
    status: "Payé",
    type: "upgrade"
  },
  {
    id: 2,
    name: "Courtney Henry",
    email: "courtney00@mail.com",
    avatar: "CH",
    date: "10 Nov 2023, 08:00",
    subscription: "Mensuel",
    amount: "5,000 FCFA",
    status: "Payé",
    type: "subscription"
  },
  {
    id: 3,
    name: "Jacob Jones",
    email: "jacob.jones@mail.com",
    avatar: "JJ",
    date: "10 Nov 2023, 08:00",
    subscription: "Mensuel",
    amount: "5,000 FCFA",
    status: "Payé",
    type: "renewal"
  },
  {
    id: 4,
    name: "Cody Fisher",
    email: "cody.fisher@mail.com",
    avatar: "CF",
    date: "10 Nov 2023, 08:00",
    subscription: "Annuel",
    amount: "50,000 FCFA",
    status: "Annulé",
    type: "cancellation"
  },
  {
    id: 5,
    name: "Michael Hun",
    email: "michaelhun@mail.com",
    avatar: "MH",
    date: "09 Nov 2023, 14:30",
    subscription: "Gratuit",
    amount: "0 FCFA",
    status: "Gratuit",
    type: "free"
  },
  {
    id: 6,
    name: "Courtney Henry",
    email: "courtney00@mail.com",
    avatar: "CH",
    date: "08 Nov 2023, 11:15",
    subscription: "Mensuel",
    amount: "5,000 FCFA",
    status: "En attente",
    type: "subscription"
  },
  {
    id: 7,
    name: "Jacob Jones",
    email: "jacob.jones@mail.com",
    avatar: "JJ",
    date: "07 Nov 2023, 16:45",
    subscription: "Annuel",
    amount: "50,000 FCFA",
    status: "Payé",
    type: "upgrade"
  },
  {
    id: 8,
    name: "Cody Fisher",
    email: "cody.fisher@mail.com",
    avatar: "CF",
    date: "06 Nov 2023, 09:20",
    subscription: "Mensuel",
    amount: "5,000 FCFA",
    status: "Payé",
    type: "renewal"
  },
];

export default function Transactions() {
  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case "Payé":
        return "bg-success/10 text-success";
      case "En attente":
        return "bg-warning/10 text-warning";
      case "Annulé":
        return "bg-destructive/10 text-destructive";
      case "Gratuit":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Revenus totaux"
            value="125,000 FCFA"
            change="+12% ce mois"
            changeType="positive"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <StatCard
            title="Transactions"
            value="1,247"
            change="+8% ce mois"
            changeType="positive"
            icon={<CreditCard className="h-5 w-5" />}
          />
          <StatCard
            title="Abonnements actifs"
            value="834"
            change="+15% ce mois"
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <StatCard
            title="Annulations"
            value="23"
            change="-5% ce mois"
            changeType="positive"
            icon={<TrendingDown className="h-5 w-5" />}
          />
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
                    placeholder="Rechercher une transaction..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Utilisateur</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Date</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Type d'abonnement</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Montant</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Status</th>
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
                          <div>
                            <span className="font-medium">{transaction.name}</span>
                            <p className="text-sm text-muted-foreground">{transaction.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{transaction.date}</td>
                      <td className="py-4 px-4 text-muted-foreground">{transaction.subscription}</td>
                      <td className="py-4 px-4 font-medium">{transaction.amount}</td>
                      <td className="py-4 px-4">
                        <Badge className={getTransactionStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </td>
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
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Page 1 of 10
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}