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
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<"view" | "approve" | "sign">("view");

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
      title: "Contrat de prestation photo studio",
      date: "2024-01-05",
      amount: "5,000.00 €", 
      status: "en_cours",
      description: "Contrat annuel de prestations photo avec possibilité de signature électronique"
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
      id: "FAC-2024-002",
      type: "facture", 
      title: "Facture shooting corporate",
      date: "2024-01-25",
      amount: "2,100.00 €",
      status: "accepte",
      description: "Facturation shooting corporate équipe"
    },
    {
      id: "CON-2024-002",
      type: "contrat",
      title: "Contrat événementiel",
      date: "2024-01-12",
      amount: "4,500.00 €",
      status: "signe", 
      description: "Contrat pour couverture photo événement"
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
        <Button 
          key="accept" 
          variant="ghost" 
          size="sm" 
          className="text-green-600 hover:bg-green-50" 
          title="Accepter"
          onClick={() => handleDocumentAction(doc.id, 'accept')}
        >
          <Check className="h-4 w-4 mr-1" />
          Accepter
        </Button>,
        <Button 
          key="refuse" 
          variant="ghost" 
          size="sm" 
          className="text-red-600 hover:bg-red-50" 
          title="Refuser"
          onClick={() => handleDocumentAction(doc.id, 'refuse')}
        >
          <X className="h-4 w-4 mr-1" />
          Refuser
        </Button>
      );
    }

    if ((doc.type === "contrat" && doc.status === "en_cours") || 
        (doc.type === "devis" && doc.status === "accepte")) {
      actions.push(
        <Button 
          key="sign" 
          variant="ghost" 
          size="sm" 
          className="text-blue-600 hover:bg-blue-50" 
          title="Signer"
          onClick={() => handleDocumentAction(doc.id, 'sign')}
        >
          <PenTool className="h-4 w-4 mr-1" />
          Signer
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

  // Handle document actions
  const handleDocumentAction = (docId: string, action: string) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    setSelectedDocument(doc);
    
    if (action === 'accept' || action === 'refuse') {
      setCurrentStep("approve");
    } else if (action === 'sign') {
      setCurrentStep("sign");
    } else {
      setCurrentStep("view");
    }
  };

  const handleSignDocument = () => {
    // Simulate signature process
    alert(`Document ${selectedDocument?.id} signé avec succès !`);
    setSelectedDocument(null);
    setCurrentStep("view");
  };

  const handleApproveDocument = (approved: boolean) => {
    // Simulate approval process
    const action = approved ? "accepté" : "refusé";
    alert(`Document ${selectedDocument?.id} ${action} avec succès !`);
    setSelectedDocument(null);
    setCurrentStep("view");
  };

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
                             <div className="flex gap-1 flex-wrap">
                               <Button 
                                 variant="ghost" 
                                 size="icon" 
                                 title="Voir"
                                 onClick={() => handleDocumentAction(doc.id, 'view')}
                               >
                                 <Eye className="h-4 w-4" />
                               </Button>
                               <Button variant="ghost" size="icon" title="Télécharger">
                                 <Download className="h-4 w-4" />
                               </Button>
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

        {/* Document Viewer/Editor Modal */}
        {selectedDocument && (
          <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {selectedDocument.title} - {selectedDocument.id}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Document Preview */}
                <div className="lg:col-span-1 space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="bg-gradient-to-b from-blue-50 to-white border rounded-lg p-6 min-h-[400px] relative">
                        <div className="absolute top-4 left-4">
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                            1
                          </div>
                        </div>
                        
                        <div className="text-center space-y-4 mt-8">
                          <div className="flex items-center justify-center">
                            <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm">PICSTUDIO</div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="font-semibold text-lg">{selectedDocument.title}</div>
                            <div className="text-sm text-muted-foreground">{selectedDocument.description}</div>
                          </div>

                          <div className="mt-8 space-y-1 text-sm">
                            <div className="font-semibold">Document #{selectedDocument.id}</div>
                            <div>Date: {selectedDocument.date}</div>
                            <div>Montant: {selectedDocument.amount}</div>
                          </div>

                          <div className="text-xs space-y-2 mt-8">
                            <p>Ce document présente les détails de la prestation demandée...</p>
                            <p>Toutes les conditions sont précisées ci-dessous...</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Area */}
                <div className="lg:col-span-2">
                  {currentStep === "view" && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">Détails du document</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Type:</span> {selectedDocument.type}
                            </div>
                            <div>
                              <span className="font-medium">Statut:</span> {getStatusBadge(selectedDocument.type, selectedDocument.status)}
                            </div>
                            <div>
                              <span className="font-medium">Date:</span> {selectedDocument.date}
                            </div>
                            <div>
                              <span className="font-medium">Montant:</span> {selectedDocument.amount}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Description:</span>
                            <p className="mt-1">{selectedDocument.description}</p>
                          </div>
                          
                          <div className="flex gap-2 pt-4">
                            {selectedDocument.type === "devis" && selectedDocument.status === "a_signer" && (
                              <>
                                <Button 
                                  onClick={() => setCurrentStep("approve")}
                                  className="bg-orange-500 hover:bg-orange-600"
                                >
                                  Traiter le devis
                                </Button>
                              </>
                            )}
                            {((selectedDocument.type === "contrat" && selectedDocument.status === "en_cours") || 
                              (selectedDocument.type === "devis" && selectedDocument.status === "accepte")) && (
                              <Button 
                                onClick={() => setCurrentStep("sign")}
                                className="bg-blue-500 hover:bg-blue-600"
                              >
                                Signer le document
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {currentStep === "approve" && (
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-lg space-y-4">
                      <h2 className="text-2xl font-bold">Validation du devis</h2>
                      <p className="text-lg">Veuillez examiner ce devis et donner votre accord</p>
                      
                      <Card className="bg-white text-black">
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="font-semibold text-lg">{selectedDocument.title}</div>
                            <div className="text-sm text-muted-foreground">{selectedDocument.description}</div>
                            <div className="text-2xl font-bold text-blue-600">{selectedDocument.amount}</div>
                            
                            <div className="border-t pt-4 space-y-2 text-sm">
                              <div><strong>Prestations incluses:</strong></div>
                              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>Séance photo complète</li>
                                <li>Retouche des images</li>
                                <li>Livraison en haute définition</li>
                                <li>Droit d'usage commercial</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex gap-4 justify-center pt-4">
                        <Button 
                          onClick={() => handleApproveDocument(true)}
                          className="bg-green-500 hover:bg-green-600 px-8"
                        >
                          Accepter le devis
                        </Button>
                        <Button 
                          onClick={() => handleApproveDocument(false)}
                          className="bg-red-500 hover:bg-red-600 px-8"
                        >
                          Refuser le devis
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === "sign" && (
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg space-y-4">
                      <h2 className="text-2xl font-bold">Signature électronique</h2>
                      <p className="text-lg">Veuillez signer ce document pour finaliser l'accord</p>
                      
                      <Card className="bg-white text-black">
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="font-semibold text-lg">{selectedDocument.title}</div>
                            <div className="text-sm text-muted-foreground">{selectedDocument.description}</div>
                            
                            <div className="border rounded-lg p-4 bg-gray-50">
                              <div className="text-sm space-y-2">
                                <div><strong>En signant ce document, vous acceptez:</strong></div>
                                <ul className="list-disc list-inside space-y-1">
                                  <li>Les termes et conditions énoncés</li>
                                  <li>Le montant de {selectedDocument.amount}</li>
                                  <li>Les délais de réalisation convenus</li>
                                  <li>Les modalités de paiement</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                              <PenTool className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                              <div className="text-muted-foreground">Zone de signature électronique</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                La signature sera appliquée automatiquement lors de la validation
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex justify-center pt-4">
                        <Button 
                          onClick={handleSignDocument}
                          className="bg-green-500 hover:bg-green-600 px-12 py-3 text-lg"
                        >
                          <PenTool className="h-5 w-5 mr-2" />
                          Signer le document
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                  Fermer
                </Button>
                
                {currentStep !== "view" && (
                  <Button variant="outline" onClick={() => setCurrentStep("view")}>
                    Retour à la vue document
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}