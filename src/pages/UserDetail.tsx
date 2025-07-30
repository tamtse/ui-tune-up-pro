
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, ChevronDown, User, Mail, MapPin, Building2, TrendingUp, TrendingDown, Calendar, FileText, CreditCard, Briefcase, ExternalLink, Copy } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const activityData = {
  clients: { value: 450, change: "+10 la semaine précédente", trend: "up" },
  prestations: { value: 8, change: "+10 la semaine précédente", trend: "up" },
  devis: { value: 100, change: "+10 la semaine précédente", trend: "up" },
  factures: { value: 120, change: "+10 la semaine précédente", trend: "down" },
};

export default function UserDetail() {
  const { id } = useParams();
  const [clientPortalLink, setClientPortalLink] = useState("");

  const generateClientPortalLink = () => {
    const link = `${window.location.origin}/client-portal/${id}`;
    setClientPortalLink(link);
    toast.success("Lien du portail client généré avec succès !");
  };

  const copyPortalLink = () => {
    if (clientPortalLink) {
      navigator.clipboard.writeText(clientPortalLink);
      toast.success("Lien copié dans le presse-papier !");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/users">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Joel TAMBO</h1>
              <p className="text-muted-foreground">Voir détails</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  Actions rapides
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Créer un devis
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Créer une facture
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Créer un contrat
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Briefcase className="h-4 w-4 mr-2" />
                  Créer une prestation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 mr-2" />
                  Planifier une séance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">Modifier</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">
                      <User className="h-10 w-10" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <h2 className="text-xl font-bold mb-1">Joel TAMBO</h2>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Badge className="bg-success/10 text-success">Homme</Badge>
                  <Badge className="bg-blue-500/10 text-blue-500">Client</Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">0</div>
                    <div className="text-xs text-muted-foreground">Projets totaux</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">0 FCFA</div>
                    <div className="text-xs text-muted-foreground">Chiffre d'affaires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">0</div>
                    <div className="text-xs text-muted-foreground">Devis en attente</div>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    aaa@y.fr
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2">📞</span>
                    67676767
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Douala, Cameroon
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="informations" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="informations">Informations personnelles</TabsTrigger>
                <TabsTrigger value="prestations">Prestations</TabsTrigger>
                <TabsTrigger value="evenements">Événements</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="portail">Portail client</TabsTrigger>
              </TabsList>

              <TabsContent value="informations" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Informations personnelles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Prénom</label>
                        <p className="font-medium">Joel</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Nom</label>
                        <p className="font-medium">TAMBO</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Date de naissance</label>
                        <p className="font-medium">1 janvier 1970</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Genre</label>
                        <p className="font-medium">Homme</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building2 className="h-5 w-5 mr-2" />
                        Informations entreprise
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Adresse</label>
                        <p className="font-medium">Douala, Cameroon</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="prestations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Prestations</CardTitle>
                      <Button size="sm">
                        + Nouvelle prestation
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="text-muted-foreground mb-4">Aucune prestation</div>
                      <p className="text-sm text-muted-foreground">
                        Les prestations apparaîtront ici
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="evenements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Événements liés aux prestations</CardTitle>
                      <Button size="sm">
                        + Nouvel événement
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <div className="font-medium mb-2">Aucun événement planifié</div>
                      <p className="text-sm text-muted-foreground">
                        Planifiez votre prochaine séance photo
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Documents du client</CardTitle>
                      <Button size="sm">
                        + Nouveau document
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <div className="font-medium mb-2">Aucun document</div>
                      <p className="text-sm text-muted-foreground">
                        Les devis, contrats et documents apparaîtront ici
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portail" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Portail client
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Générez un lien sécurisé pour que votre client puisse accéder à son portail personnel et consulter ses projets, factures et documents.
                      </p>
                      
                      {!clientPortalLink ? (
                        <Button onClick={generateClientPortalLink} className="w-full sm:w-auto">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Générer le lien du portail client
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Lien du portail client
                            </label>
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex-1 p-3 bg-muted rounded-md text-sm font-mono break-all">
                                {clientPortalLink}
                              </div>
                              <Button size="sm" variant="outline" onClick={copyPortalLink}>
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" onClick={generateClientPortalLink}>
                              Regénérer le lien
                            </Button>
                            <Button variant="outline" asChild>
                              <a href={clientPortalLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Tester le portail
                              </a>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Fonctionnalités du portail client</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Consultation des projets en cours</li>
                        <li>• Accès aux galeries photos</li>
                        <li>• Téléchargement des documents</li>
                        <li>• Suivi des factures et paiements</li>
                        <li>• Communication directe avec le photographe</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
