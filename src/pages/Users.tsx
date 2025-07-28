import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Plus, Eye, MoreHorizontal, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const users = [
  {
    id: 1,
    name: "Michael Hun",
    email: "michaelhun@mail.com",
    location: "Yaoundé, Cameroun",
    accountType: "Gratuit",
    avatar: "MH",
    selected: false,
  },
  {
    id: 2,
    name: "Courtney Henry",
    email: "courtney00@mail.com",
    location: "Douala, Cameroun",
    accountType: "Mensuel",
    avatar: "CH",
    selected: true,
  },
  {
    id: 3,
    name: "Annette Black",
    email: "anneteblack@mail.com",
    location: "Abidjan, Côte d'ivoire",
    accountType: "Annuel",
    avatar: "AB",
    selected: true,
  },
  {
    id: 4,
    name: "Jenny Wilson",
    email: "jenny123@mail.com",
    location: "Ouagadougou, Burkina Faso",
    accountType: "Mensuel",
    avatar: "JW",
    selected: false,
  },
  {
    id: 5,
    name: "Ralph Edwards",
    email: "ralph12edwards@mail.com",
    location: "Yaoundé, Cameroun",
    accountType: "Annuel",
    avatar: "RE",
    selected: false,
  },
];

const transactions = [
  {
    id: 1,
    name: "Michael Hun",
    email: "michaelhun@mail.com",
    avatar: "MH",
    date: "10 Nov 2023, 08:00",
    subscription: "Annuelle",
    amount: "$500.00",
    status: "Payé",
  },
  {
    id: 2,
    name: "Courtney Henry",
    email: "courtney00@mail.com",
    avatar: "CH",
    date: "10 Nov 2023, 08:00",
    subscription: "Trimestrielle",
    amount: "$250.00",
    status: "Payé",
  },
  {
    id: 3,
    name: "Jacob Jones",
    email: "jacob.jones@mail.com",
    avatar: "JJ",
    date: "10 Nov 2023, 08:00",
    subscription: "Mensuelle",
    amount: "$1,250.00",
    status: "Payé",
  },
  {
    id: 4,
    name: "Cody Fisher",
    email: "cody.fisher@mail.com",
    avatar: "CF",
    date: "10 Nov 2023, 08:00",
    subscription: "Annuelle",
    amount: "$310.99",
    status: "Annulé",
  },
  {
    id: 5,
    name: "Michael Hun",
    email: "michaelhun@mail.com",
    avatar: "MH",
    date: "10 Nov 2023, 08:00",
    subscription: "Trimestrielle",
    amount: "$310.99",
    status: "Payé",
  },
  {
    id: 6,
    name: "Courtney Henry",
    email: "courtney00@mail.com",
    avatar: "CH",
    date: "10 Nov 2023, 08:00",
    subscription: "Mensuelle",
    amount: "$310.99",
    status: "Payé",
  },
  {
    id: 7,
    name: "Jacob Jones",
    email: "jacob.jones@mail.com",
    avatar: "JJ",
    date: "10 Nov 2023, 08:00",
    subscription: "Trimestrielle",
    amount: "$310.99",
    status: "En attente",
  },
  {
    id: 8,
    name: "Cody Fisher",
    email: "cody.fisher@mail.com",
    avatar: "CF",
    date: "10 Nov 2023, 08:00",
    subscription: "Mensuelle",
    amount: "$310.99",
    status: "Payé",
  },
];

export default function Users() {
  const [activeTab, setActiveTab] = useState("users");

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "Gratuit":
        return "bg-muted text-muted-foreground";
      case "Mensuel":
        return "bg-warning/10 text-warning";
      case "Annuel":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case "Payé":
        return "bg-success/10 text-success";
      case "En attente":
        return "bg-warning/10 text-warning";
      case "Annulé":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex space-x-1">
              <Button 
                variant={activeTab === "transactions" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setActiveTab("transactions")}
              >
                Transactions
              </Button>
              <Button 
                variant={activeTab === "users" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setActiveTab("users")}
              >
                Utilisateurs
              </Button>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "users" ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Utilisateurs</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Recherche d'utilisateurs"
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un utilisateur
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left font-medium text-muted-foreground py-3 px-4 w-12">
                        <Checkbox />
                      </th>
                      <th className="text-left font-medium text-muted-foreground py-3 px-4">Name</th>
                      <th className="text-left font-medium text-muted-foreground py-3 px-4">Email</th>
                      <th className="text-left font-medium text-muted-foreground py-3 px-4">Localisation</th>
                      <th className="text-left font-medium text-muted-foreground py-3 px-4">Account Type</th>
                      <th className="text-left font-medium text-muted-foreground py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">
                          <Checkbox checked={user.selected} />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                        <td className="py-4 px-4 text-muted-foreground">{user.location}</td>
                        <td className="py-4 px-4">
                          <Badge className={getAccountTypeColor(user.accountType)}>
                            {user.accountType}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/users/${user.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
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
        ) : (
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
                      <th className="text-left font-medium text-muted-foreground py-3 px-4">Nom</th>
                      <th className="text-left font-medium text-muted-foreground py-3 px-4">Date</th>
                      <th className="text-left font-medium text-muted-foreground py-3 px-4">Souscription</th>
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
        )}
      </div>
    </AdminLayout>
  );
}