import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, ChevronDown, User, Mail, MapPin, Building2, Search, Plus, FileText, CreditCard, Briefcase, Calendar, ExternalLink, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

// Mock data for contacts
const contacts = [
  {
    id: "1",
    name: "Joel TAMBO",
    email: "aaa@y.fr",
    phone: "67676767",
    location: "Douala, Cameroon",
    gender: "Homme",
    type: "Client",
    projects: 0,
    revenue: "0 FCFA",
    pendingQuotes: 0,
    birthDate: "1 janvier 1970"
  },
  // Add more mock contacts here
];

export default function Contacts() {
  const { id } = useParams();
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientPortalLink, setClientPortalLink] = useState("");

  const isDetailView = !!id;
  const contact = contacts.find(c => c.id === id);

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

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isDetailView && contact) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/contacts">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{contact.name}</h1>
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
            {/* Contact Profile Card */}
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
                  
                  <h2 className="text-xl font-bold mb-1">{contact.name}</h2>
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <Badge className="bg-success/10 text-success">{contact.gender}</Badge>
                    <Badge className="bg-blue-500/10 text-blue-500">{contact.type}</Badge>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">{contact.projects}</div>
                      <div className="text-xs text-muted-foreground">Projets totaux</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{contact.revenue}</div>
                      <div className="text-xs text-muted-foreground">Chiffre d'affaires</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">{contact.pendingQuotes}</div>
                      <div className="text-xs text-muted-foreground">Devis en attente</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      {contact.email}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="mr-2">📞</span>
                      {contact.phone}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {contact.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
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
                          <p className="font-medium">{contact.name.split(' ')[0]}</p>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Nom</label>
                          <p className="font-medium">{contact.name.split(' ')[1]}</p>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Date de naissance</label>
                          <p className="font-medium">{contact.birthDate}</p>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Genre</label>
                          <p className="font-medium">{contact.gender}</p>
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
                          <p className="font-medium">{contact.location}</p>
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Contacts</h1>
            <p className="text-muted-foreground">Gérez vos clients et prospects</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau contact
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher un contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{contact.email}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2">📞</span>
                    {contact.phone}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {contact.location}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Badge className="bg-success/10 text-success">{contact.gender}</Badge>
                    <Badge className="bg-blue-500/10 text-blue-500">{contact.type}</Badge>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/contacts/${contact.id}`}>
                      Voir contact
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun contact trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Aucun contact ne correspond à votre recherche." : "Commencez par ajouter votre premier contact."}
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau contact
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}