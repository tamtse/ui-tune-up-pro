import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Search, Filter, Grid, List, Plus, MoreHorizontal, Users, Building, User, TrendingUp, Download, Upload, Copy, CheckIcon, StickyNote, Trash2 } from "lucide-react";

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
  const [notes, setNotes] = useState([
    { id: 1, content: "Client très satisfait de la dernière séance photo. Souhaite programmer une nouvelle séance pour l'été.", date: "2024-07-20", author: "Admin" },
    { id: 2, content: "Préfère être contacté par téléphone plutôt que par email.", date: "2024-07-15", author: "Admin" }
  ]);
  const [newNote, setNewNote] = useState("");

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

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote.trim(),
        date: new Date().toISOString().split('T')[0],
        author: "Admin"
      };
      setNotes([note, ...notes]);
      setNewNote("");
    }
  };

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  if (selectedContact) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedContact(null)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                  <div className="text-primary text-base sm:text-lg font-bold">{selectedContact.initials}</div>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold">{selectedContact.name}</h1>
                  <p className="text-muted-foreground text-sm sm:text-base">Voir détails</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Actions rapides</span>
                    <span className="sm:hidden">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Créer un devis</DropdownMenuItem>
                    <DropdownMenuItem>Créer une facture</DropdownMenuItem>
                    <DropdownMenuItem>Créer un contrat</DropdownMenuItem>
                    <DropdownMenuItem>Nouvelle prestation</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
              <Button className="w-full sm:w-auto">
                <span className="mr-2">✏️</span>
                Modifier
              </Button>
            </div>
          </div>

          {/* Contact Info Header */}
          <div className="bg-muted/30 rounded-lg p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Avatar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto sm:mx-0">
                  <AvatarFallback className="text-sm sm:text-lg font-bold">{selectedContact.initials}</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-2">
                    <h2 className="text-lg sm:text-xl font-bold">{selectedContact.name}</h2>
                    <Badge variant={selectedContact.type === "entreprise" ? "default" : "secondary"} className="w-fit mx-auto sm:mx-0">
                      {selectedContact.type === "entreprise" ? "Client" : "Homme"}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
                    <span className="truncate">📧 {selectedContact.email}</span>
                    <span>📞 {selectedContact.phone}</span>
                    <span className="hidden lg:inline">📍 {selectedContact.location}</span>
                  </div>
                  <div className="lg:hidden mt-1">
                    <span className="text-xs text-muted-foreground">📍 {selectedContact.location}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-primary">{selectedContact.projectsTotal}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Projets totaux</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-success">{selectedContact.revenue}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Chiffre d'affaires</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-warning">{selectedContact.pendingQuotes}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Devis en attente</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="informations" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto gap-1">
              <TabsTrigger value="informations" className="text-xs sm:text-sm p-2 sm:p-3">
                <span className="hidden sm:inline">Informations personnelles</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="prestations" className="text-xs sm:text-sm p-2 sm:p-3">
                <span className="hidden sm:inline">Prestations</span>
                <span className="sm:hidden">Presta</span>
              </TabsTrigger>
              <TabsTrigger value="evenements" className="text-xs sm:text-sm p-2 sm:p-3">
                <span className="hidden sm:inline">Événements</span>
                <span className="sm:hidden">Events</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-xs sm:text-sm p-2 sm:p-3">Documents</TabsTrigger>
              <TabsTrigger value="notes" className="text-xs sm:text-sm p-2 sm:p-3">Notes</TabsTrigger>
              <TabsTrigger value="portail" className="text-xs sm:text-sm p-2 sm:p-3 col-span-3 lg:col-span-1">
                <span className="hidden sm:inline">Portail client</span>
                <span className="sm:hidden">Portail</span>
              </TabsTrigger>
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
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">Séance Portrait</h4>
                          <p className="text-sm text-muted-foreground">Studio - 2 heures</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Terminé</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>📅 15 juin 2024 - 14h00</p>
                        <p>💰 200 000 FCFA</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">Shooting Produit</h4>
                          <p className="text-sm text-muted-foreground">E-commerce - 4 heures</p>
                        </div>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">En cours</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>📅 25 juin 2024 - 09h00</p>
                        <p>💰 350 000 FCFA</p>
                      </div>
                    </div>
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
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-blue-900">Pré-production Mariage</h4>
                        <span className="text-sm text-blue-700">Dans 3 jours</span>
                      </div>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>📅 28 juillet 2024 - 10h00</p>
                        <p>📍 Douala, Bonanjo</p>
                        <p>👥 Rendez-vous avec les mariés</p>
                      </div>
                    </div>
                    <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-green-900">Livraison Photos</h4>
                        <span className="text-sm text-green-700">Dans 5 jours</span>
                      </div>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>📅 30 juillet 2024 - 15h00</p>
                        <p>📍 Bureau client</p>
                        <p>📦 Remise des photos éditées</p>
                      </div>
                    </div>
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
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <span className="text-blue-600">📄</span>
                        </div>
                        <div>
                          <p className="font-medium">Devis Portrait Studio</p>
                          <p className="text-sm text-muted-foreground">Créé le 10 juin 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Accepté</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <span className="text-orange-600">📋</span>
                        </div>
                        <div>
                          <p className="font-medium">Contrat Shooting Produit</p>
                          <p className="text-sm text-muted-foreground">Créé le 15 juin 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">En attente</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <span className="text-purple-600">🧾</span>
                        </div>
                        <div>
                          <p className="font-medium">Facture F-2024-001</p>
                          <p className="text-sm text-muted-foreground">Créé le 20 juin 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Payée</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <StickyNote className="h-5 w-5" />
                      <span>Notes client</span>
                    </CardTitle>
                    <Badge variant="outline">{notes.length} note{notes.length !== 1 ? 's' : ''}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Ajouter une nouvelle note */}
                  <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-medium">Ajouter une note</h4>
                    <Textarea
                      placeholder="Saisir une note concernant ce client..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={addNote}
                        disabled={!newNote.trim()}
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter la note
                      </Button>
                    </div>
                  </div>

                  {/* Liste des notes */}
                  <div className="space-y-3">
                    {notes.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <StickyNote className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Aucune note pour ce client</p>
                        <p className="text-sm">Ajoutez votre première note ci-dessus</p>
                      </div>
                    ) : (
                      notes.map((note) => (
                        <div key={note.id} className="border rounded-lg p-4 bg-background">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>📝 {note.author}</span>
                              <span>•</span>
                              <span>{new Date(note.date).toLocaleDateString('fr-FR', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                              })}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNote(note.id)}
                              className="text-destructive hover:text-destructive h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm leading-relaxed">{note.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portail" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Portail client</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Qu'est-ce que le portail client ?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Le portail client permet à votre client d'accéder de manière sécurisée à :
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Ses devis et leur statut en temps réel</li>
                      <li>• Ses factures et historique de paiements</li>
                      <li>• Ses contrats et documents signés</li>
                      <li>• La galerie de ses photos livrées</li>
                      <li>• Le planning de ses prochaines séances</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <Button onClick={generatePortalLink} size="default" className="w-auto">
                      🔗 Générer le lien du portail client
                    </Button>
                    
                    {portalLink && (
                      <div className="space-y-3 p-4 border rounded-lg bg-green-50">
                        <label className="text-sm font-medium text-green-800">Lien du portail client généré :</label>
                        <div className="flex items-center space-x-2">
                          <Input value={portalLink} readOnly className="flex-1 bg-white" />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={copyToClipboard}
                            className="flex items-center space-x-2"
                          >
                            {linkCopied ? <CheckIcon className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            <span>{linkCopied ? "Copié !" : "Copier"}</span>
                          </Button>
                        </div>
                        <p className="text-xs text-green-700">
                          ✅ Partagez ce lien avec votre client par email ou SMS. Le lien est sécurisé et personnel.
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