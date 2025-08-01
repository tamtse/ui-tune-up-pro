import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Eye, Download } from "lucide-react";

export default function ClientDocumentation() {
  const [searchQuery, setSearchQuery] = useState("");

  const documents = [
    {
      id: "Brief",
      description: "Objet du devis",
      date: "10 Nov 2023"
    },
    {
      id: "Documentation", 
      description: "Objet du devis",
      date: "01 Jan 2023"
    },
    {
      id: "Cahier de charge",
      description: "Objet du devis", 
      date: "3 Mar 2023"
    },
    {
      id: "Brief",
      description: "Objet du devis",
      date: "3 Mar 2023"
    },
    {
      id: "Documentation",
      description: "Objet du devis",
      date: "3 Mar 2023"
    },
    {
      id: "Cahier de charge",
      description: "Objet du devis",
      date: "9 Juil 2023"
    },
    {
      id: "Brief",
      description: "Objet du devis",
      date: "9 Juil 2023"
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
            <Tabs defaultValue="documentation" className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                <TabsList className="w-full sm:w-auto overflow-x-auto">
                  <TabsTrigger value="devis" className="text-xs sm:text-sm">Devis</TabsTrigger>
                  <TabsTrigger value="facture" className="text-xs sm:text-sm">Facture</TabsTrigger>
                  <TabsTrigger value="facture2" className="text-xs sm:text-sm">Facture</TabsTrigger>
                  <TabsTrigger value="documentation" className="bg-blue-500 text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm">
                    Documentation
                  </TabsTrigger>
                </TabsList>
                
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Rechercher" className="pl-10 w-full sm:w-64" />
                </div>
              </div>

              <TabsContent value="documentation">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-500" />
                              {doc.id}
                            </div>
                          </TableCell>
                          <TableCell>{doc.description}</TableCell>
                          <TableCell>{doc.date}</TableCell>
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

              <TabsContent value="devis">
                <div className="text-center py-8 text-muted-foreground">
                  Aucun devis disponible
                </div>
              </TabsContent>

              <TabsContent value="facture">
                <div className="text-center py-8 text-muted-foreground">
                  Aucune facture disponible
                </div>
              </TabsContent>

              <TabsContent value="facture2">
                <div className="text-center py-8 text-muted-foreground">
                  Aucune facture disponible
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}