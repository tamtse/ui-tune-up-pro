import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Eye, Download } from "lucide-react";

export default function ClientFactures() {
  const [searchQuery, setSearchQuery] = useState("");

  const factures = [
    {
      id: "FAC010624-001",
      object: "Prestation photo studio",
      date: "15 Nov 2023",
      montant: "2 500 000 F CFA",
      status: "paid"
    },
    {
      id: "FAC010624-002", 
      object: "Séance photo corporate",
      date: "03 Nov 2023",
      montant: "1 800 000 F CFA",
      status: "pending"
    },
    {
      id: "FAC010624-003",
      object: "Retouche photos produits", 
      date: "28 Oct 2023",
      montant: "950 000 F CFA",
      status: "paid"
    },
    {
      id: "FAC010624-004",
      object: "Shooting mode collection",
      date: "15 Oct 2023", 
      montant: "3 200 000 F CFA",
      status: "overdue"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Payée</Badge>;
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">En attente</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 border-red-200">En retard</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg sm:text-xl">PS</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-blue-600 truncate">PICSTUDIO</div>
          </div>
          <div className="flex-1 max-w-md mx-2 sm:mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Rechercher fichiers et documents..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <span className="sr-only">Notifications</span>
            🔔
          </Button>
        </div>

        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">Bienvenue,</h1>
          
          <Card className="w-full sm:w-fit">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>KW</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="font-semibold text-sm sm:text-base">Kristin Watson</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">kristinwatson@mail.com</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <Card>
          <CardContent className="p-3 sm:p-6">
            <Tabs defaultValue="factures" className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                <TabsList className="w-full sm:w-auto overflow-x-auto">
                  <TabsTrigger value="devis" className="text-xs sm:text-sm">Devis</TabsTrigger>
                  <TabsTrigger value="factures" className="bg-blue-500 text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm">
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Factures
                  </TabsTrigger>
                  <TabsTrigger value="contrat" className="text-xs sm:text-sm">Contrat</TabsTrigger>
                  <TabsTrigger value="documentation" className="text-xs sm:text-sm">Documentation</TabsTrigger>
                </TabsList>
                
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Rechercher" className="pl-10 w-full sm:w-64" />
                </div>
              </div>

              <TabsContent value="factures">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Facture</TableHead>
                        <TableHead>Objet</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {factures.map((facture) => (
                        <TableRow key={facture.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-500" />
                              {facture.id}
                            </div>
                          </TableCell>
                          <TableCell>{facture.object}</TableCell>
                          <TableCell>{facture.date}</TableCell>
                          <TableCell className="font-medium">{facture.montant}</TableCell>
                          <TableCell>{getStatusBadge(facture.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-muted-foreground">
                    Page 1 sur 5
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Précédent</Button>
                    <Button variant="outline" size="sm">Suivant</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="devis">
                <div className="text-center py-8 text-muted-foreground">
                  Aucun devis disponible
                </div>
              </TabsContent>

              <TabsContent value="contrat">
                <div className="text-center py-8 text-muted-foreground">
                  Aucun contrat disponible
                </div>
              </TabsContent>

              <TabsContent value="documentation">
                <div className="text-center py-8 text-muted-foreground">
                  Aucune documentation disponible
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}