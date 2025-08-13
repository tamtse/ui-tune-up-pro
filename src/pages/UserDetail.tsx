import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share, MoreHorizontal, Mail, MessageSquare, TrendingUp, TrendingDown, CheckCircle, XCircle, Shield, Edit, Trash2, Eye } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { SubscriptionActionDialog } from "@/components/SubscriptionActionDialog";
import { useState } from "react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const activityData = {
  clients: { value: 450, change: "+10 la semaine précédente", trend: "up" },
  prestations: { value: 8, change: "+10 la semaine précédente", trend: "up" },
  devis: { value: 100, change: "+10 la semaine précédente", trend: "up" },
  factures: { value: 120, change: "+10 la semaine précédente", trend: "down" },
};

export default function UserDetail() {
  const { id } = useParams();
  const [isExtendDialogOpen, setIsExtendDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEditUser = () => {
    setIsEditDialogOpen(true);
    toast.success("Fonction d'édition - En développement");
  };

  const handleDeleteUser = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    toast.success("Utilisateur supprimé avec succès");
    setIsDeleteDialogOpen(false);
    // Redirection vers la liste des utilisateurs
  };

  const handleValidateEmail = () => {
    toast.success("Email validé manuellement avec succès");
  };

  const handleResendEmail = () => {
    toast.success("Email de validation renvoyé");
  };

  const handleRevokeEmail = () => {
    toast.error("Validation d'email révoquée");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/users">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                <div className="text-primary text-base sm:text-lg font-bold">A</div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">Information utilisateur</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-auto lg:ml-0">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Eye className="h-4 w-4 mr-2" />
              Voir
            </Button>
            <Button variant="outline" size="sm" className="sm:hidden">
              <Eye className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEditUser}>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDeleteUser}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-4 sm:p-6">
              <div className="text-center">
                <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                    <AvatarImage src="/avatars/kristin.jpg" alt="Kristin Watson" />
                    <AvatarFallback className="text-base sm:text-lg">KW</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-success rounded-full border-2 border-background"></div>
                </div>
                
                <h2 className="text-lg sm:text-xl font-bold mb-1">Kristin Watson</h2>
                <p className="text-muted-foreground mb-2 text-sm sm:text-base truncate">kristinwatson@mail.com</p>
                <div className="flex items-center justify-center text-muted-foreground mb-4">
                  <span className="text-xs sm:text-sm text-center">📍 Yaoundé - Douala</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Email</span>
                    <span className="sm:hidden">Envoyer un email</span>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Plus
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="informations" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
                <TabsTrigger value="informations" className="text-xs sm:text-sm p-2 sm:p-3">
                  <span className="hidden sm:inline">Informations</span>
                  <span className="sm:hidden">Info</span>
                </TabsTrigger>
                <TabsTrigger value="activite" className="text-xs sm:text-sm p-2 sm:p-3">Activité</TabsTrigger>
                <TabsTrigger value="abonnement" className="text-xs sm:text-sm p-2 sm:p-3">
                  <span className="hidden sm:inline">Abonnement</span>
                  <span className="sm:hidden">Abo</span>
                </TabsTrigger>
                <TabsTrigger value="validation" className="text-xs sm:text-sm p-2 sm:p-3">
                  <span className="hidden sm:inline">Validation</span>
                  <span className="sm:hidden">Valid</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="informations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>General</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Nom</label>
                        <p className="font-medium">Company Studio</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Entreprise</label>
                        <p className="font-medium">✖️ Xing</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Email</label>
                        <p className="font-medium">kristinwatson@mail.com</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Numéro</label>
                        <p className="font-medium">(303) 555-0105</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Autres informations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Pays</label>
                        <p className="font-medium">Cameroun</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Ville</label>
                        <p className="font-medium">Douala</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activite" className="space-y-4">
                {/* Activity Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(activityData).map(([key, data]) => (
                    <Card key={key}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground capitalize">
                              Nombre de {key}
                            </p>
                            <p className="text-2xl font-bold mt-2">{data.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {data.change}
                            </p>
                          </div>
                          <div className="text-right">
                            {data.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-success" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-destructive" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Monthly Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Prestations mensuelles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'].map((month, index) => (
                        <div key={month} className="flex flex-col items-center flex-1">
                          <div
                            className={`w-full rounded-t-sm ${index === 7 ? 'bg-primary' : 'bg-primary/30'}`}
                            style={{ 
                              height: `${Math.random() * 100 + 50}px`,
                              minHeight: '20px'
                            }}
                          ></div>
                          <span className="text-xs text-muted-foreground mt-2">{month}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="abonnement" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations d'abonnement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Plan actuel</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-success/10 text-success">Premium</Badge>
                          <span className="text-sm text-muted-foreground">- Facturation mensuelle</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Date d'expiration</label>
                        <p className="font-medium">15 Décembre 2024</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Montant mensuel</label>
                        <p className="font-medium">29 900 F CFA</p>
                      </div>
                      
                      {/* Actions d'abonnement */}
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-3">Actions d'abonnement</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setIsExtendDialogOpen(true)}
                          >
                            Prolonger l'abonnement
                          </Button>
                          <Button 
                            variant="destructive" 
                            className="w-full"
                            onClick={() => setIsCancelDialogOpen(true)}
                          >
                            Annuler l'abonnement
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="validation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Validation du compte email</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Statut de validation */}
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <XCircle className="h-5 w-5 text-destructive" />
                            <span className="font-medium">Email non validé</span>
                          </div>
                          <Badge variant="destructive">Non vérifié</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          kristinwatson@mail.com
                        </div>
                      </div>

                      {/* Informations de validation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Date d'inscription</label>
                          <p className="font-medium">15 Novembre 2024</p>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Dernier email envoyé</label>
                          <p className="font-medium">20 Novembre 2024</p>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Tentatives de validation</label>
                          <p className="font-medium">3 tentatives</p>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Statut du compte</label>
                          <Badge variant="outline">En attente de validation</Badge>
                        </div>
                      </div>

                      {/* Actions administrateur */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Actions administrateur</h4>
                        <div className="flex flex-col gap-3">
                          <Button variant="default" className="flex items-center justify-center space-x-2 w-full" onClick={handleValidateEmail}>
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm sm:text-base">Valider manuellement</span>
                          </Button>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Button variant="outline" className="flex items-center justify-center space-x-2 w-full" onClick={handleResendEmail}>
                              <Mail className="h-4 w-4" />
                              <span className="text-sm">Renvoyer email</span>
                            </Button>
                            <Button variant="destructive" className="flex items-center justify-center space-x-2 w-full" onClick={handleRevokeEmail}>
                              <XCircle className="h-4 w-4" />
                              <span className="text-sm">Révoquer</span>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Historique */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Historique de validation</h4>
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span>Email de validation envoyé</span>
                                </div>
                                <span className="text-muted-foreground">20 Nov 2024, 14:30</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                                  <span>Email de validation envoyé</span>
                                </div>
                                <span className="text-muted-foreground">18 Nov 2024, 09:15</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                                  <span>Inscription du compte</span>
                                </div>
                                <span className="text-muted-foreground">15 Nov 2024, 16:45</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <SubscriptionActionDialog
        isOpen={isExtendDialogOpen}
        onClose={() => setIsExtendDialogOpen(false)}
        action="extend"
        currentPlan="Premium"
        currentEndDate="2024-12-15"
      />
      
      <SubscriptionActionDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        action="cancel"
        currentPlan="Premium"
        currentEndDate="2024-12-15"
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}