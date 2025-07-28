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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, Plus, Eye, MoreHorizontal, Users as UsersIcon, UserPlus, Calendar, Ban, XCircle } from "lucide-react";
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
    phone: "",
    company: "",
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

  const handleCreateUser = async () => {
    // Appel API selon la documentation PicStudio
    const userData = {
      name: newUser.name,
      email: newUser.email,
      location: newUser.location,
      phone: newUser.phone,
      company: newUser.company,
      accountType: newUser.accountType,
    };
    
    console.log("Création utilisateur via API POST /admin/users:", userData);
    // TODO: Implémenter l'appel API réel
    // const response = await fetch('/admin/users', { method: 'POST', body: JSON.stringify(userData) });
    
    setIsDialogOpen(false);
    setNewUser({ name: "", email: "", location: "", phone: "", company: "", accountType: "" });
  };

  const handleCancelSubscription = async (userId: number, userName: string) => {
    console.log(`Annulation via API PUT /v1/settings/subscriptions/${userId}/cancel pour ${userName}`);
    // TODO: Implémenter l'appel API réel
  };

  const handleRevokeSubscription = async (userId: number, userName: string) => {
    console.log(`Révocation via API PUT /admin/users/${userId}/status pour ${userName}`);
    // TODO: Implémenter l'appel API réel
  };


  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <CardTitle className="text-lg lg:text-xl">Utilisateurs</CardTitle>
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Recherche d'utilisateurs"
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Filter className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex-1 sm:flex-none">
                        <Plus className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Ajouter</span>
                        <span className="sm:hidden">Nouvel utilisateur</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] m-4">
                      <DialogHeader>
                        <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="sm:text-right">
                            Nom complet *
                          </Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                            className="sm:col-span-3"
                            placeholder="Nom complet"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="sm:text-right">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            className="sm:col-span-3"
                            placeholder="email@exemple.com"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="sm:text-right">
                            Téléphone
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={newUser.phone}
                            onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                            className="sm:col-span-3"
                            placeholder="+237 6XX XXX XXX"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="sm:text-right">
                            Localisation
                          </Label>
                          <Input
                            id="location"
                            value={newUser.location}
                            onChange={(e) => setNewUser({...newUser, location: e.target.value})}
                            className="sm:col-span-3"
                            placeholder="Ville, Pays"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                          <Label htmlFor="company" className="sm:text-right">
                            Entreprise
                          </Label>
                          <Input
                            id="company"
                            value={newUser.company}
                            onChange={(e) => setNewUser({...newUser, company: e.target.value})}
                            className="sm:col-span-3"
                            placeholder="Nom de l'entreprise"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                          <Label htmlFor="accountType" className="sm:text-right">
                            Plan d'abonnement *
                          </Label>
                          <Select value={newUser.accountType} onValueChange={(value) => setNewUser({...newUser, accountType: value})}>
                            <SelectTrigger className="sm:col-span-3">
                              <SelectValue placeholder="Sélectionner un plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Gratuit">Plan Gratuit</SelectItem>
                              <SelectItem value="Mensuel">Plan Mensuel</SelectItem>
                              <SelectItem value="Annuel">Plan Annuel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                          Annuler
                        </Button>
                        <Button onClick={handleCreateUser} className="w-full sm:w-auto">
                          Créer l'utilisateur
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4 w-12">
                      <Checkbox />
                    </th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4">Nom</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4 hidden lg:table-cell">Email</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4 hidden md:table-cell">Localisation</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4">Abonnement</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-2 sm:px-4 w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2 sm:py-4 sm:px-4">
                        <Checkbox checked={user.selected} />
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                            <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <span className="font-medium text-sm sm:text-base truncate block">{user.name}</span>
                            <span className="text-xs text-muted-foreground lg:hidden truncate block">{user.email}</span>
                            <span className="text-xs text-muted-foreground md:hidden truncate block">{user.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-4 text-muted-foreground text-sm hidden lg:table-cell">{user.email}</td>
                      <td className="py-3 px-2 sm:py-4 sm:px-4 text-muted-foreground text-sm hidden md:table-cell">{user.location}</td>
                      <td className="py-3 px-2 sm:py-4 sm:px-4">
                        <Badge className={`${getAccountTypeColor(user.accountType)} text-xs`}>
                          {user.accountType}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-4">
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                            <Link to={`/users/${user.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {user.accountType !== "Gratuit" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleCancelSubscription(user.id, user.name)}>
                                    <Ban className="mr-2 h-4 w-4" />
                                    Annuler l'abonnement
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleRevokeSubscription(user.id, user.name)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Révoquer l'abonnement
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-2 sm:space-y-0">
              <div className="text-sm text-muted-foreground">
                Page 1 of 10
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled className="w-20">
                  Précédent
                </Button>
                <Button variant="outline" size="sm" className="w-20">
                  Suivant
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}