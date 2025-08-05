import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveTable, ResponsiveTableHeader, ResponsiveTableHeaderCell, ResponsiveTableCell } from "@/components/ResponsiveTable";
import { Pagination } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, MoreHorizontal, CircleDot } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const prestations = [
  {
    id: 1,
    nom: "Courture",
    client: "Joel TAMBO",
    type: "Mariage",
    statut: "En attente",
    date: "24/07/2025",
    montant: "100 000 FCFA"
  },
  {
    id: 2,
    nom: "dfdtdf",
    client: "Lionel FOSTO",
    type: "Shooting",
    statut: "En attente",
    date: "15/07/2025",
    montant: "10 000 000 FCFA"
  },
  {
    id: 3,
    nom: "Mariage Jo & JP",
    client: "Lionel FOSTO",
    type: "Corporate",
    statut: "Refusé",
    date: "11/07/2025",
    montant: "1 200 000 FCFA"
  },
  {
    id: 4,
    nom: "AAAA",
    client: "Lionel FOSTO",
    type: "Mariage",
    statut: "En attente",
    date: "04/07/2025",
    montant: "100 000 FCFA"
  }
];

const getStatusBadgeVariant = (statut: string) => {
  switch (statut) {
    case "En attente":
      return "outline";
    case "Accepté":
      return "default";
    case "Refusé":
      return "destructive";
    default:
      return "secondary";
  }
};

export default function Prestations() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedPrestations, setSelectedPrestations] = useState<number[]>([]);
  
  const filteredPrestations = prestations.filter(prestation => {
    if (selectedTab === "all") return true;
    if (selectedTab === "accepted") return prestation.statut === "Accepté";
    if (selectedTab === "pending") return prestation.statut === "En attente";
    if (selectedTab === "refused") return prestation.statut === "Refusé";
    return true;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPrestations(filteredPrestations.map(p => p.id));
    } else {
      setSelectedPrestations([]);
    }
  };

  const handleSelectPrestation = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedPrestations([...selectedPrestations, id]);
    } else {
      setSelectedPrestations(selectedPrestations.filter(pid => pid !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Prestations</h1>
          </div>
          <Link to="/prestations/new">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle prestation
            </Button>
          </Link>
        </div>

        {/* Filters Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Toutes les prestations</TabsTrigger>
            <TabsTrigger value="accepted">Accepté</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="refused">Refusé</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab} className="mt-6">
            <Card>
              <CardContent className="p-0">
                <ResponsiveTable>
                  <ResponsiveTableHeader>
                    <tr className="border-b border-border">
                      <ResponsiveTableHeaderCell>
                        <Checkbox
                          checked={selectedPrestations.length === filteredPrestations.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </ResponsiveTableHeaderCell>
                      <ResponsiveTableHeaderCell>Nom du projet</ResponsiveTableHeaderCell>
                      <ResponsiveTableHeaderCell hideOnMobile>Client</ResponsiveTableHeaderCell>
                      <ResponsiveTableHeaderCell>Type</ResponsiveTableHeaderCell>
                      <ResponsiveTableHeaderCell>Statut</ResponsiveTableHeaderCell>
                      <ResponsiveTableHeaderCell hideOnTablet>Date du projet</ResponsiveTableHeaderCell>
                      <ResponsiveTableHeaderCell>Montant</ResponsiveTableHeaderCell>
                      <ResponsiveTableHeaderCell className="w-12">Actions</ResponsiveTableHeaderCell>
                    </tr>
                  </ResponsiveTableHeader>
                  <tbody>
                    {filteredPrestations.map((prestation) => (
                      <tr key={prestation.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <ResponsiveTableCell>
                          <Checkbox
                            checked={selectedPrestations.includes(prestation.id)}
                            onCheckedChange={(checked) => handleSelectPrestation(prestation.id, checked as boolean)}
                          />
                        </ResponsiveTableCell>
                        <ResponsiveTableCell mobileLabel="Projet">
                          <div className="font-medium">{prestation.nom}</div>
                        </ResponsiveTableCell>
                        <ResponsiveTableCell hideOnMobile mobileLabel="Client">
                          {prestation.client}
                        </ResponsiveTableCell>
                        <ResponsiveTableCell mobileLabel="Type">
                          <Badge variant="secondary">{prestation.type}</Badge>
                        </ResponsiveTableCell>
                        <ResponsiveTableCell mobileLabel="Statut">
                          <div className="flex items-center space-x-2">
                            <CircleDot className={`h-3 w-3 ${
                              prestation.statut === "En attente" ? "text-orange-500" :
                              prestation.statut === "Accepté" ? "text-green-500" :
                              "text-red-500"
                            }`} />
                            <span className="text-sm">{prestation.statut}</span>
                          </div>
                        </ResponsiveTableCell>
                        <ResponsiveTableCell hideOnTablet mobileLabel="Date">
                          {prestation.date}
                        </ResponsiveTableCell>
                        <ResponsiveTableCell mobileLabel="Montant">
                          <div className="font-medium">{prestation.montant}</div>
                        </ResponsiveTableCell>
                        <ResponsiveTableCell>
                          <Link to={`/prestations/${prestation.id}/edit`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </Link>
                        </ResponsiveTableCell>
                      </tr>
                    ))}
                  </tbody>
                </ResponsiveTable>
                
                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    0 sur {filteredPrestations.length} ligne(s) sélectionnée(s).
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Lignes par page</span>
                      <Select defaultValue="10">
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="text-sm text-muted-foreground">Page 1 sur 1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}