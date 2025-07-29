import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Eye, Download } from "lucide-react";

export default function ClientDevis() {
  const [searchQuery, setSearchQuery] = useState("");

  const documents = [
    {
      id: "Fac010624-001",
      object: "Objet du devis",
      date: "10 Nov 2023",
      status: "pending",
      actions: ["accept", "refuse", "sign"]
    },
    {
      id: "Fac010624-002", 
      object: "Objet du devis",
      date: "01 Jan 2023",
      status: "pending",
      actions: ["accept", "refuse", "sign"]
    },
    {
      id: "Fac010624-003",
      object: "Objet du devis", 
      date: "3 Mar 2023",
      status: "pending",
      actions: ["accept", "refuse", "sign"]
    },
    {
      id: "Fac010624-004",
      object: "Objet du devis",
      date: "9 Juil 2023", 
      status: "pending",
      actions: ["accept", "refuse", "sign"]
    },
    {
      id: "Fac010624-005",
      object: "Objet du devis",
      date: "9 Juil 2023",
      status: "pending", 
      actions: ["accept", "refuse", "sign"]
    }
  ];

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
            <Tabs defaultValue="devis" className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                <TabsList className="w-full sm:w-auto overflow-x-auto">
                  <TabsTrigger value="devis" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                    Devis
                  </TabsTrigger>
                  <TabsTrigger value="facture" className="text-xs sm:text-sm">Facture</TabsTrigger>
                  <TabsTrigger value="contrat" className="text-xs sm:text-sm">Contrat</TabsTrigger>
                  <TabsTrigger value="documentation" className="text-xs sm:text-sm">Documentation</TabsTrigger>
                </TabsList>
                
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Rechercher" className="pl-10 w-full sm:w-64" />
                </div>
              </div>

              <TabsContent value="devis">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Objet</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-500" />
                              {doc.id}
                            </div>
                          </TableCell>
                          <TableCell>{doc.object}</TableCell>
                          <TableCell>{doc.date}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Badge variant="outline" className="text-green-600 border-green-600 text-xs px-2 py-1">
                                <span className="hidden sm:inline">Accepter</span>
                                <span className="sm:hidden">✓</span>
                              </Badge>
                              <Badge variant="outline" className="text-red-600 border-red-600 text-xs px-2 py-1">
                                <span className="hidden sm:inline">Refuser</span>
                                <span className="sm:hidden">✕</span>
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="link" className="text-blue-500 p-0">
                              Signer le document
                            </Button>
                          </TableCell>
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
                    Page 1 sur 10
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Précédent</Button>
                    <Button variant="outline" size="sm">Suivant</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="facture">
                <div className="text-center py-8 text-muted-foreground">
                  Aucune facture disponible
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