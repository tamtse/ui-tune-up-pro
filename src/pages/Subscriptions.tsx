import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Edit, Trash2, Users, Settings } from "lucide-react";
import { useState } from "react";

const subscriptionPlans = [
  {
    id: 1,
    name: "Gratuit",
    price: "0",
    currency: "FCFA",
    duration: "Mois",
    features: ["5 photos par mois", "Support basique", "Watermark"],
    userCount: 45,
    status: "Actif",
  },
  {
    id: 2,
    name: "Supérieur",
    price: "8000",
    currency: "FCFA",
    duration: "Mois",
    features: ["50 photos par mois", "Support prioritaire", "Sans watermark", "Filtres avancés"],
    userCount: 12,
    status: "Actif",
  },
  {
    id: 3,
    name: "Supérieur +",
    price: "8000",
    currency: "FCFA",
    duration: "An",
    features: ["Photos illimitées", "Support 24/7", "Sans watermark", "Tous les filtres", "API access"],
    userCount: 8,
    status: "Actif",
  },
  {
    id: 4,
    name: "Entreprise",
    price: "25000",
    currency: "FCFA",
    duration: "Mois",
    features: ["Multi-utilisateurs", "Dashboard admin", "Branding personnalisé", "Support dédié"],
    userCount: 3,
    status: "Inactif",
  },
];

export default function Subscriptions() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-success/10 text-success";
      case "Inactif":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleEdit = (plan: any) => {
    setSelectedPlan(plan);
    setIsEditDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion des Abonnements</h1>
            <p className="text-muted-foreground">Gérez les plans d'abonnement de votre application</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plans Actifs</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Abonnés</p>
                  <p className="text-2xl font-bold">68</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-12 w-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-warning">FCFA</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenus Mensuels</p>
                  <p className="text-2xl font-bold">341K</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-12 w-12 bg-info/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-info">%</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taux Conversion</p>
                  <p className="text-2xl font-bold">12.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Plans Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Plans d'Abonnement</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un plan..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Créer un plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Créer un nouveau plan</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nom du plan</Label>
                        <Input id="name" placeholder="Ex: Premium" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="price">Prix</Label>
                          <Input id="price" placeholder="8000" type="number" />
                        </div>
                        <div>
                          <Label htmlFor="duration">Durée</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="month">Mois</SelectItem>
                              <SelectItem value="year">An</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="features">Fonctionnalités (une par ligne)</Label>
                        <Textarea 
                          id="features" 
                          placeholder="50 photos par mois&#10;Support prioritaire&#10;Sans watermark"
                          rows={4}
                        />
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button className="flex-1">Créer le plan</Button>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Annuler
                        </Button>
                      </div>
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
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Plan</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Prix</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Fonctionnalités</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Utilisateurs</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Status</th>
                    <th className="text-left font-medium text-muted-foreground py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionPlans.map((plan) => (
                    <tr key={plan.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <span className="font-medium">{plan.name}</span>
                          <p className="text-sm text-muted-foreground">ID: {plan.id}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <span className="font-medium">{plan.price} {plan.currency}</span>
                          <p className="text-sm text-muted-foreground">/ {plan.duration}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {plan.features.slice(0, 2).map((feature, index) => (
                            <p key={index} className="text-sm text-muted-foreground">• {feature}</p>
                          ))}
                          {plan.features.length > 2 && (
                            <p className="text-xs text-muted-foreground">+{plan.features.length - 2} autres</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{plan.userCount}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(plan.status)}>
                          {plan.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(plan)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Modifier le plan</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-name">Nom du plan</Label>
                                  <Input id="edit-name" defaultValue={selectedPlan?.name} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label htmlFor="edit-price">Prix</Label>
                                    <Input id="edit-price" defaultValue={selectedPlan?.price} type="number" />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-duration">Durée</Label>
                                    <Select defaultValue={selectedPlan?.duration === "Mois" ? "month" : "year"}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="month">Mois</SelectItem>
                                        <SelectItem value="year">An</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="edit-features">Fonctionnalités</Label>
                                  <Textarea 
                                    id="edit-features" 
                                    defaultValue={selectedPlan?.features.join('\n')}
                                    rows={4}
                                  />
                                </div>
                                <div className="flex space-x-2 pt-4">
                                  <Button className="flex-1">Sauvegarder</Button>
                                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Annuler
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
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
                Page 1 of 1
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
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