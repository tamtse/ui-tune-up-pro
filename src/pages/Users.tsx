import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Eye, MoreHorizontal, Users as UsersIcon, UserPlus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/StatCard";

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

export default function Users() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    location: "",
    accountType: "",
  });

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

  const handleCreateUser = () => {
    // Logique de création d'utilisateur
    console.log("Nouvel utilisateur:", newUser);
    setIsDialogOpen(false);
    setNewUser({ name: "", email: "", location: "", accountType: "" });
  };


  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total utilisateurs"
            value="1,247"
            change="+12% ce mois"
            changeType="positive"
            icon={<UsersIcon className="h-5 w-5" />}
          />
          <StatCard
            title="Nouveaux ce mois"
            value="156"
            change="+25% vs mois dernier"
            changeType="positive"
            icon={<UserPlus className="h-5 w-5" />}
          />
          <StatCard
            title="Actifs cette semaine"
            value="892"
            change="+8% vs semaine dernière"
            changeType="positive"
            icon={<Calendar className="h-5 w-5" />}
          />
        </div>

        {/* Users List */}
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
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un utilisateur
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Nom
                          </Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                            className="col-span-3"
                            placeholder="Nom complet"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            className="col-span-3"
                            placeholder="email@exemple.com"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right">
                            Localisation
                          </Label>
                          <Input
                            id="location"
                            value={newUser.location}
                            onChange={(e) => setNewUser({...newUser, location: e.target.value})}
                            className="col-span-3"
                            placeholder="Ville, Pays"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="accountType" className="text-right">
                            Abonnement
                          </Label>
                          <Select value={newUser.accountType} onValueChange={(value) => setNewUser({...newUser, accountType: value})}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Sélectionner un plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Gratuit">Gratuit</SelectItem>
                              <SelectItem value="Mensuel">Mensuel</SelectItem>
                              <SelectItem value="Annuel">Annuel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button onClick={handleCreateUser}>
                          Créer l'utilisateur
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
      </div>
    </AdminLayout>
  );
}