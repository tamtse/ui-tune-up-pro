import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  FileText, 
  Eye, 
  Download, 
  Check, 
  X, 
  PenTool, 
  User,
  Filter,
  Calendar,
  Euro
} from "lucide-react";

export default function ClientPortal() {
  const { clientId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [activeTab, setActiveTab] = useState("documents");
  const [documentFilter, setDocumentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock client data
  const clientData = {
    name: "Kristin Watson",
    email: "kristinwatson@mail.com",
    phone: "+33 6 12 34 56 78",
    company: "Sample Client Company",
    address: "123 rue de la Paix, 75001 Paris"
  };

  // Mock documents with different types and statuses
  const documents = [
    {
      id: "DEV-2024-001",
      type: "devis",
      title: "Devis séance photo corporate",
      date: "2024-01-15",
      amount: "2,500.00 €",
      status: "a_signer",
      description: "Séance photo corporate pour 10 personnes"
    },
    {
      id: "FAC-2024-001", 
      type: "facture",
      title: "Facture prestation photo",
      date: "2024-01-10",
      amount: "1,800.00 €",
      status: "en_cours",
      description: "Facturation séance photo produits"
    },
    {
      id: "CON-2024-001",
      type: "contrat",
      title: "Contrat de prestation",
      date: "2024-01-05",
      amount: "5,000.00 €", 
      status: "en_cours",
      description: "Contrat annuel de prestations photo"
    },
    {
      id: "DEV-2024-002",
      type: "devis",
      title: "Devis shooting mode",
      date: "2024-01-20",
      amount: "3,200.00 €",
      status: "accepte",
      description: "Shooting pour nouvelle collection"
    },
    {
      id: "CGV-2024",
      type: "cgv",
      title: "Conditions générales de vente",
      date: "2024-01-01",
      amount: "-",
      status: "visible",
      description: "Conditions générales applicables"
    }
  ];

  const getStatusBadge = (type: string, status: string) => {
    const statusConfig = {
      devis: {
        a_signer: { label: "À signer", class: "bg-orange-100 text-orange-800 border-orange-200" },
        refuse: { label: "Refusé", class: "bg-red-100 text-red-800 border-red-200" },
        accepte: { label: "Accepté", class: "bg-green-100 text-green-800 border-green-200" }
      },
      facture: {
        en_cours: { label: "En cours", class: "bg-blue-100 text-blue-800 border-blue-200" },
        refuse: { label: "Refusé", class: "bg-red-100 text-red-800 border-red-200" },
        accepte: { label: "Accepté", class: "bg-green-100 text-green-800 border-green-200" }
      },
      contrat: {
        en_cours: { label: "En cours", class: "bg-blue-100 text-blue-800 border-blue-200" },
        signe: { label: "Signé", class: "bg-green-100 text-green-800 border-green-200" }
      },
      cgv: {
        visible: { label: "Consultable", class: "bg-gray-100 text-gray-800 border-gray-200" }
      }
    };

    const config = statusConfig[type as keyof typeof statusConfig]?.[status as keyof any];
    return (
      <Badge className={config?.class || "bg-gray-100 text-gray-800 border-gray-200"}>
        {config?.label || status}
      </Badge>
    );
  };

  const getDocumentActions = (doc: any) => {
    const actions = [
      <Button key="view" variant="ghost" size="icon" title="Voir">
        <Eye className="h-4 w-4" />
      </Button>,
      <Button key="download" variant="ghost" size="icon" title="Télécharger">
        <Download className="h-4 w-4" />
      </Button>
    ];

    if (doc.type === "devis" && doc.status === "a_signer") {
      actions.push(
        <Button key="accept" variant="ghost" size="icon" className="text-green-600" title="Accepter">
          <Check className="h-4 w-4" />
        </Button>,
        <Button key="refuse" variant="ghost" size="icon" className="text-red-600" title="Refuser">
          <X className="h-4 w-4" />
        </Button>
      );
    }

    if ((doc.type === "contrat" && doc.status === "en_cours") || 
        (doc.type === "devis" && doc.status === "accepte")) {
      actions.push(
        <Button key="sign" variant="ghost" size="icon" className="text-blue-600" title="Signer">
          <PenTool className="h-4 w-4" />
        </Button>
      );
    }

    return actions;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = documentFilter === "all" || doc.type === documentFilter;
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Check token validity
  useEffect(() => {
    if (!token) {
      console.error("Token manquant dans l'URL");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PS</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">PICSTUDIO</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>KW</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <div className="font-semibold">{clientData.name}</div>
                <div className="text-sm text-muted-foreground">{clientData.company}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="documents">Mes Documents</TabsTrigger>
            <TabsTrigger value="profile">Mon Profil</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Rechercher un document..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={documentFilter} onValueChange={setDocumentFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Type de document" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="devis">Devis</SelectItem>
                      <SelectItem value="facture">Factures</SelectItem>
                      <SelectItem value="contrat">Contrats</SelectItem>
                      <SelectItem value="cgv">Documents CGV</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="a_signer">À signer</SelectItem>
                      <SelectItem value="en_cours">En cours</SelectItem>
                      <SelectItem value="accepte">Accepté</SelectItem>
                      <SelectItem value="signe">Signé</SelectItem>
                      <SelectItem value="refuse">Refusé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents ({filteredDocuments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead className="hidden sm:table-cell">Type</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="hidden lg:table-cell">Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{doc.title}</div>
                              <div className="text-sm text-muted-foreground">{doc.id}</div>
                              <div className="text-xs text-muted-foreground sm:hidden">
                                {doc.type} • {doc.date} • {doc.amount}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline" className="capitalize">
                              {doc.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {doc.date}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-1">
                              <Euro className="h-4 w-4" />
                              {doc.amount}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(doc.type, doc.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {getDocumentActions(doc)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Mon Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" value={clientData.name} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={clientData.email} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" value={clientData.phone} readOnly />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company">Entreprise</Label>
                      <Input id="company" value={clientData.company} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input id="address" value={clientData.address} readOnly />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        Changer le mot de passe
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Changer le mot de passe</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="current-password">Mot de passe actuel</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="new-password">Nouveau mot de passe</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Annuler</Button>
                          <Button>Valider</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}