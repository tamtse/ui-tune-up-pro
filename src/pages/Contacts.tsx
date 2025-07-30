import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Search, Filter, Grid, List, Plus, MoreHorizontal, Users, Building, User, TrendingUp, Download, Upload, Copy, CheckIcon } from "lucide-react";

const contactsData = [
  {
    id: 1,
    name: "Joel TAMBO",
    email: "aaa@y.fr",
    phone: "676767676",
    location: "Douala, Cameroon",
    type: "particulier",
    initials: "JT",
    avatar: null,
    projectsTotal: 0,
    revenue: "0 FCFA",
    pendingQuotes: 0
  },
  {
    id: 2,
    name: "Lio LL",
    email: "a@t.fr",
    phone: "0666666666",
    location: "Douala, Cameroon",
    type: "particulier",
    initials: "LL",
    avatar: null,
    projectsTotal: 0,
    revenue: "0 FCFA",
    pendingQuotes: 0
  },
  {
    id: 3,
    name: "Lionel FOSTO",
    email: "a@y.fr",
    phone: "+237",
    location: "Dla, Cameroon",
    type: "entreprise",
    initials: "LF",
    avatar: null,
    company: "AAAAA",
    projectsTotal: 0,
    revenue: "0 FCFA",
    pendingQuotes: 0
  }
];

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [portalLink, setPortalLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const totalContacts = contactsData.length;
  const enterprises = contactsData.filter(c => c.type === "entreprise").length;
  const particuliers = contactsData.filter(c => c.type === "particulier").length;
  const nouveaux = 1; // 7j

  const generatePortalLink = () => {
    const link = `https://monapp.com/client/${selectedContact?.id}/portal`;
    setPortalLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portalLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  if (selectedContact) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedContact(null)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <div className="text-primary text-lg font-bold">{selectedContact.initials}</div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{selectedContact.name}</h1>
                  <p className="text-muted-foreground">Voir détails</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Actions rapides
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Créer un devis</DropdownMenuItem>
                  <DropdownMenuItem>Créer une facture</DropdownMenuItem>
                  <DropdownMenuItem>Créer un contrat</DropdownMenuItem>
                  <DropdownMenuItem>Planifier une séance</DropdownMenuItem>
                  <DropdownMenuItem>Nouvelle prestation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>
                <span className="mr-2">✏️</span>
                Modifier
              </Button>
            </div>
          </div>

          {/* Contact Info Header */}
          <div className="bg-muted/30 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-lg font-bold">{selectedContact.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h2 className="text-xl font-bold">{selectedContact.name}</h2>
                    <Badge variant={selectedContact.type === "entreprise" ? "default" : "secondary"}>
                      {selectedContact.type === "entreprise" ? "Client" : "Homme"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>📧 {selectedContact.email}</span>
                    <span>📞 {selectedContact.phone}</span>
                    <span>📍 {selectedContact.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{selectedContact.projectsTotal}</div>
                  <div className="text-sm text-muted-foreground">Projets totaux</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">{selectedContact.revenue}</div>
                  <div className="text-sm text-muted-foreground">Chiffre d'affaires</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">{selectedContact.pendingQuotes}</div>
                  <div className="text-sm text-muted-foreground">Devis en attente</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="informations" className="space-y-4">
            <TabsList>
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
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Informations personnelles</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Prénom</label>
                        <p className="font-medium">{selectedContact.name.split(' ')[0]}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Nom</label>
                        <p className="font-medium">{selectedContact.name.split(' ')[1] || selectedContact.name.split(' ')[0]}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Date de naissance</label>
                        <p className="font-medium">1 janvier 1970</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Genre</label>
                        <p className="font-medium">Homme</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Informations entreprise</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <label className="text-sm text-muted-foreground">Adresse</label>
                      <p className="font-medium">{selectedContact.location}</p>
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
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvelle prestation
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="text-muted-foreground mb-2">Aucune prestation planifiée</div>
                    <div className="text-sm text-muted-foreground">Créez votre première prestation</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evenements" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Événements liés aux prestations</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvel événement
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="text-6xl text-muted-foreground mb-4">📅</div>
                    <div className="text-lg font-medium mb-2">Aucun événement planifié</div>
                    <div className="text-sm text-muted-foreground">Planifiez votre prochaine séance photo</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Documents du client</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="text-6xl text-muted-foreground mb-4">📄</div>
                    <div className="text-lg font-medium mb-2">Aucun document</div>
                    <div className="text-sm text-muted-foreground">Les devis, contrats et documents apparaîtront ici</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portail" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Portail client</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Générez un lien sécurisé pour permettre à votre client d'accéder à son portail personnel
                    où il pourra consulter ses devis, factures, contrats et documents.
                  </p>
                  
                  <div className="space-y-3">
                    <Button onClick={generatePortalLink} className="w-full">
                      Générer le lien du portail client
                    </Button>
                    
                    {portalLink && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Lien du portail client :</label>
                        <div className="flex items-center space-x-2">
                          <Input value={portalLink} readOnly className="flex-1" />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={copyToClipboard}
                            className="flex items-center space-x-1"
                          >
                            {linkCopied ? <CheckIcon className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            <span>{linkCopied ? "Copié !" : "Copier"}</span>
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Partagez ce lien avec votre client pour qu'il puisse accéder à son portail.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
            <h1 className="text-2xl font-bold">Mes Clients</h1>
            <p className="text-muted-foreground">Gérez vos clients et prospects pour vos projets photo et vidéo</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importer des contacts
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau contact
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total contacts</p>
                  <p className="text-2xl font-bold">{totalContacts}</p>
                  <p className="text-xs text-muted-foreground">contacts dans votre base</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Entreprises</p>
                  <p className="text-2xl font-bold">{enterprises}</p>
                  <p className="text-xs text-muted-foreground">clients entreprise</p>
                </div>
                <Building className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Particuliers</p>
                  <p className="text-2xl font-bold">{particuliers}</p>
                  <p className="text-xs text-muted-foreground">clients particuliers</p>
                </div>
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Nouveaux (7j)</p>
                  <p className="text-2xl font-bold">{nouveaux}</p>
                  <p className="text-xs text-muted-foreground">ajoutés récemment</p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un client par nom, email, projet..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant={isGridView ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsGridView(true)}
                className="border-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={!isGridView ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsGridView(false)}
                className="border-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactsData.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-bold text-lg">
                      {contact.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{contact.name}</h3>
                        {contact.type === "entreprise" && (
                          <Badge variant="secondary">Entreprise</Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <span>📧</span>
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>📞</span>
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>📍</span>
                          <span>{contact.location}</span>
                        </div>
                        {contact.company && (
                          <div className="flex items-center space-x-1">
                            <span>🏢</span>
                            <span>{contact.company}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedContact(contact)}
                  >
                    Voir détails
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Actions rapides
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Créer un devis</DropdownMenuItem>
                      <DropdownMenuItem>Créer une facture</DropdownMenuItem>
                      <DropdownMenuItem>Créer un contrat</DropdownMenuItem>
                      <DropdownMenuItem>Planifier une séance</DropdownMenuItem>
                      <DropdownMenuItem>Nouvelle prestation</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}