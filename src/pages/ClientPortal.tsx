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
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  FileText, 
  Eye, 
  Download, 
  Check, 
  X, 
  PenTool, 
  User,
  Calendar,
  Euro,
  Shield,
  Clock,
  CheckCircle
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<"view" | "sign">("view");
  const [signature, setSignature] = useState("");

  // Mock client data
  const clientData = {
    name: "Kristin Watson",
    email: "kristinwatson@mail.com",
    phone: "+33 6 12 34 56 78",
    company: "Sample Client Company",
    address: "123 rue de la Paix, 75001 Paris"
  };

  // Mock documents with enhanced contract data
  const documents = [
    {
      id: "CON-2024-001",
      type: "contrat",
      title: "Contrat de prestation photo studio",
      date: "2024-01-05",
      amount: "5,000.00 €", 
      status: "en_cours",
      description: "Contrat annuel de prestations photo avec studio professionnel",
      content: `CONTRAT DE PRESTATION PHOTOGRAPHIQUE

Entre les soussignés :
• PICSTUDIO, société spécialisée en photographie professionnelle
• ${clientData.name}, représentant ${clientData.company}

OBJET DU CONTRAT :
Le présent contrat a pour objet la réalisation de prestations photographiques professionnelles comprenant :
- Séances photo en studio
- Retouches et post-production
- Livraison des fichiers haute définition

DURÉE : 12 mois à compter de la signature
MONTANT : 5,000.00 € HT

CONDITIONS PARTICULIÈRES :
- Planning des séances à définir conjointement
- Délai de livraison : 7 jours ouvrés
- Cession des droits d'usage incluse

Ce contrat nécessite votre signature électronique pour être validé.`,
      signatureRequired: true
    },
    {
      id: "DEV-2024-001",
      type: "devis",
      title: "Devis séance photo corporate",
      date: "2024-01-15",
      amount: "2,500.00 €",
      status: "a_signer",
      description: "Séance photo corporate pour 10 personnes",
      content: `DEVIS - SÉANCE PHOTO CORPORATE

Prestation proposée :
• Séance photo corporate (8h)
• Studio professionnel avec éclairage
• Photographe expert + assistant
• 50 photos retouchées livrées
• Formats : web et print

Tarif : 2,500.00 € HT
TVA 20% : 500.00 €
TOTAL TTC : 3,000.00 €

Validité du devis : 30 jours`,
      signatureRequired: false
    },
    {
      id: "FAC-2024-001", 
      type: "facture",
      title: "Facture prestation photo",
      date: "2024-01-10",
      amount: "1,800.00 €",
      status: "en_cours",
      description: "Facturation séance photo produits",
      content: `FACTURE N° FAC-2024-001

Date : 10/01/2024
Échéance : 10/02/2024

Prestation :
• Séance photo produits (6h)
• Post-production et retouches
• Livraison 30 visuels HD

Montant HT : 1,800.00 €
TVA 20% : 360.00 €
TOTAL TTC : 2,160.00 €

Règlement par virement ou chèque`,
      signatureRequired: false
    },
    {
      id: "CON-2024-002",
      type: "contrat",
      title: "Contrat événementiel",
      date: "2024-01-12",
      amount: "4,500.00 €",
      status: "signe", 
      description: "Contrat pour couverture photo événement",
      content: "Contrat signé pour événement corporate...",
      signatureRequired: false
    },
    {
      id: "CGV-2024",
      type: "cgv",
      title: "Conditions générales de vente",
      date: "2024-01-01",
      amount: "-",
      status: "consultable",
      description: "Conditions générales applicables",
      content: `CONDITIONS GÉNÉRALES DE VENTE - PICSTUDIO

Article 1 - Objet
Les présentes conditions générales s'appliquent à toutes les prestations photographiques.

Article 2 - Commandes
Toute commande implique l'acceptation de nos CGV.

Article 3 - Tarifs
Les tarifs sont exprimés en euros HT.

Article 4 - Paiement
Règlement à 30 jours fin de mois.

Article 5 - Livraison
Les fichiers sont livrés par transfert sécurisé.

Article 6 - Propriété intellectuelle
Les droits d'auteur restent la propriété du photographe.`,
      signatureRequired: false
    }
  ];

  const getStatusBadge = (type: string, status: string) => {
    const statusConfig = {
      devis: {
        a_signer: { label: "À signer", variant: "secondary", color: "bg-amber-100 text-amber-800 border-amber-200" },
        refuse: { label: "Refusé", variant: "destructive", color: "bg-red-100 text-red-800 border-red-200" },
        accepte: { label: "Accepté", variant: "default", color: "bg-green-100 text-green-800 border-green-200" }
      },
      facture: {
        en_cours: { label: "En cours", variant: "secondary", color: "bg-blue-100 text-blue-800 border-blue-200" },
        refuse: { label: "Refusé", variant: "destructive", color: "bg-red-100 text-red-800 border-red-200" },
        accepte: { label: "Payée", variant: "default", color: "bg-green-100 text-green-800 border-green-200" }
      },
      contrat: {
        en_cours: { label: "À signer", variant: "secondary", color: "bg-amber-100 text-amber-800 border-amber-200" },
        signe: { label: "Signé", variant: "default", color: "bg-green-100 text-green-800 border-green-200" }
      },
      cgv: {
        consultable: { label: "Consultable", variant: "outline", color: "bg-gray-100 text-gray-800 border-gray-200" }
      }
    };

    const config = statusConfig[type as keyof typeof statusConfig]?.[status as keyof any];
    return (
      <Badge className={config?.color || "bg-gray-100 text-gray-800 border-gray-200"}>
        {config?.label || status}
      </Badge>
    );
  };

  const getDocumentIcon = (type: string) => {
    const icons = {
      devis: <FileText className="h-4 w-4 text-blue-600" />,
      facture: <FileText className="h-4 w-4 text-green-600" />,
      contrat: <Shield className="h-4 w-4 text-purple-600" />,
      cgv: <FileText className="h-4 w-4 text-gray-600" />
    };
    return icons[type as keyof typeof icons] || <FileText className="h-4 w-4" />;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = documentFilter === "all" || doc.type === documentFilter;
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewDocument = (doc: any) => {
    setSelectedDocument(doc);
    setModalStep("view");
    setIsModalOpen(true);
  };

  const handleSignDocument = (doc: any) => {
    setSelectedDocument(doc);
    setModalStep("sign");
    setIsModalOpen(true);
  };

  const handleCompleteSignature = () => {
    if (!signature.trim()) {
      alert("Veuillez saisir votre signature");
      return;
    }
    
    // Simulate signature completion
    alert(`Document ${selectedDocument?.id} signé avec succès !`);
    setIsModalOpen(false);
    setSignature("");
    setSelectedDocument(null);
  };

  const handleDocumentAction = (docId: string, action: string) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    switch(action) {
      case 'accept':
        alert(`Devis ${docId} accepté avec succès !`);
        break;
      case 'refuse':
        alert(`Document ${docId} refusé.`);
        break;
      case 'download':
        alert(`Téléchargement du document ${docId} en cours...`);
        break;
    }
  };

  // Stats for dashboard
  const documentStats = {
    total: documents.length,
    pending: documents.filter(d => d.status === "en_cours" || d.status === "a_signer").length,
    signed: documents.filter(d => d.status === "signe" || d.status === "accepte").length,
    toSign: documents.filter(d => d.signatureRequired && d.status === "en_cours").length
  };

  // Check token validity
  useEffect(() => {
    if (!token) {
      console.error("Token manquant dans l'URL");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">PS</span>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PICSTUDIO
                </div>
                <div className="text-sm text-muted-foreground">Portail Client</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                  {clientData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-right hidden sm:block">
                <div className="font-semibold text-foreground">{clientData.name}</div>
                <div className="text-sm text-muted-foreground">{clientData.company}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="documents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Mes Documents
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Mon Profil
            </TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{documentStats.total}</div>
                      <div className="text-sm text-muted-foreground">Total documents</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{documentStats.pending}</div>
                      <div className="text-sm text-muted-foreground">En attente</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{documentStats.signed}</div>
                      <div className="text-sm text-muted-foreground">Validés</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <PenTool className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{documentStats.toSign}</div>
                      <div className="text-sm text-muted-foreground">À signer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Rechercher un document..."
                        className="pl-10 bg-white/80 border-0 shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={documentFilter} onValueChange={setDocumentFilter}>
                    <SelectTrigger className="w-full sm:w-48 bg-white/80 border-0 shadow-sm">
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
                    <SelectTrigger className="w-full sm:w-48 bg-white/80 border-0 shadow-sm">
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
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="h-6 w-6 text-blue-600" />
                  Mes Documents ({filteredDocuments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-lg border bg-white/50 hover:bg-white/80 transition-all duration-200 hover:shadow-md">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          {getDocumentIcon(doc.type)}
                          <div className="flex-1">
                            <div className="font-semibold text-foreground">{doc.title}</div>
                            <div className="text-sm text-muted-foreground">{doc.description}</div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {doc.date}
                              </span>
                              {doc.amount !== "-" && (
                                <span className="flex items-center gap-1">
                                  <Euro className="h-3 w-3" />
                                  {doc.amount}
                                </span>
                              )}
                              <Badge variant="outline" className="capitalize text-xs">
                                {doc.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {getStatusBadge(doc.type, doc.status)}
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewDocument(doc)}
                              className="bg-white/80 hover:bg-white"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDocumentAction(doc.id, 'download')}
                              className="bg-white/80 hover:bg-white"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                            
                            {/* Action buttons based on document type and status */}
                            {doc.type === "devis" && doc.status === "a_signer" && (
                              <>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleDocumentAction(doc.id, 'accept')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Accepter
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleDocumentAction(doc.id, 'refuse')}
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Refuser
                                </Button>
                              </>
                            )}
                            
                            {doc.signatureRequired && doc.status === "en_cours" && (
                              <Button 
                                size="sm" 
                                onClick={() => handleSignDocument(doc)}
                                className="bg-purple-600 hover:bg-purple-700"
                              >
                                <PenTool className="h-4 w-4 mr-1" />
                                Signer
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-6 w-6 text-blue-600" />
                  Mon Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Nom complet</Label>
                      <Input id="name" value={clientData.name} readOnly className="bg-white/80 border-0 shadow-sm" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input id="email" value={clientData.email} readOnly className="bg-white/80 border-0 shadow-sm" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                      <Input id="phone" value={clientData.phone} readOnly className="bg-white/80 border-0 shadow-sm" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium">Entreprise</Label>
                      <Input id="company" value={clientData.company} readOnly className="bg-white/80 border-0 shadow-sm" />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-sm font-medium">Adresse</Label>
                      <Input id="address" value={clientData.address} readOnly className="bg-white/80 border-0 shadow-sm" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-white/80 hover:bg-white">
                        Changer le mot de passe
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
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
                        <Button className="w-full">Changer le mot de passe</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Document Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {modalStep === "view" ? (
                <>
                  <Eye className="h-5 w-5" />
                  Consultation du document
                </>
              ) : (
                <>
                  <PenTool className="h-5 w-5" />
                  Signature électronique
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {modalStep === "view" && selectedDocument && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg">{selectedDocument.title}</h3>
                <div className="text-sm text-muted-foreground mt-1">
                  {selectedDocument.id} • {selectedDocument.date} • {selectedDocument.amount}
                </div>
              </div>
              
              <div className="bg-white border rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedDocument.content}
                </pre>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleDocumentAction(selectedDocument.id, 'download')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger PDF
                </Button>
                
                {selectedDocument.signatureRequired && selectedDocument.status === "en_cours" && (
                  <Button 
                    onClick={() => setModalStep("sign")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <PenTool className="h-4 w-4 mr-2" />
                    Procéder à la signature
                  </Button>
                )}
                
                {selectedDocument.type === "devis" && selectedDocument.status === "a_signer" && (
                  <>
                    <Button 
                      onClick={() => {
                        handleDocumentAction(selectedDocument.id, 'accept');
                        setIsModalOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accepter ce devis
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleDocumentAction(selectedDocument.id, 'refuse');
                        setIsModalOpen(false);
                      }}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Refuser
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
          
          {modalStep === "sign" && selectedDocument && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900">Document à signer</h3>
                <p className="text-blue-700 text-sm mt-1">{selectedDocument.title}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="signature" className="text-sm font-medium">
                    Signature électronique *
                  </Label>
                  <Textarea
                    id="signature"
                    placeholder="Saisissez votre nom complet pour confirmer votre signature..."
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    En saisissant votre nom, vous acceptez de signer électroniquement ce document.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>Important :</strong> Votre signature électronique a la même valeur juridique qu'une signature manuscrite. 
                    En signant, vous vous engagez à respecter les termes du contrat.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline"
                  onClick={() => setModalStep("view")}
                >
                  Retour à la consultation
                </Button>
                <Button 
                  onClick={handleCompleteSignature}
                  disabled={!signature.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Confirmer la signature
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}