import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowLeft,
  Euro,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface Transaction {
  id: number;
  amount: number;
  contactId?: string;
  prestationTypeId?: string;
  name: string;
  type: "expense";
  date: string;
  hours?: string;
  category?: string;
  status?: string;
  reference?: string;
}

const expenseCategories = [
  "Équipement",
  "Transport", 
  "Frais généraux",
  "Marketing",
  "Formation",
  "Logiciels",
  "Matériel",
  "Autre"
];

export default function FinanceDepenses() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    contactId: "",
    prestationTypeId: "",
    name: "",
    type: "expense" as const,
    date: "",
    hours: "",
    category: "",
    reference: ""
  });

  // Simulation des appels API
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // TODO: Remplacer par fetch('/v1/finances?type=expense')
      // Simulation avec données statiques pour le moment
      const mockData = [
        {
          id: 1,
          amount: 720000,
          name: "Achat objectif Canon 85mm",
          type: "expense" as const,
          date: "2024-07-15",
          category: "Équipement",
          reference: "FAC-2024-001"
        },
        {
          id: 2,
          amount: 27000,
          name: "Essence déplacement mariage",
          type: "expense" as const,
          date: "2024-07-20",
          category: "Transport"
        }
      ];
      setTransactions(mockData);
      setFilteredTransactions(mockData);
    } catch (error) {
      toast.error("Erreur lors du chargement des dépenses");
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData: any) => {
    setLoading(true);
    try {
      // TODO: Remplacer par fetch('/v1/finances/store', { method: 'POST', body: JSON.stringify(transactionData) })
      const newTransaction = {
        ...transactionData,
        id: Date.now(),
        amount: parseFloat(transactionData.amount)
      };
      
      const updatedTransactions = [...transactions, newTransaction];
      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
      toast.success("Dépense créée avec succès");
    } catch (error) {
      toast.error("Erreur lors de la création de la dépense");
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = async () => {
    try {
      // TODO: Remplacer par fetch('/v1/finances/filter', { method: 'GET', params: filters })
      let filtered = transactions;

      if (searchTerm) {
        filtered = filtered.filter(t => 
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (t.category && t.category.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      if (statusFilter !== "all") {
        filtered = filtered.filter(t => t.status === statusFilter);
      }

      if (categoryFilter !== "all") {
        filtered = filtered.filter(t => t.category === categoryFilter);
      }

      setFilteredTransactions(filtered);
    } catch (error) {
      toast.error("Erreur lors du filtrage");
    }
  };

  const exportData = async (format: string) => {
    try {
      // TODO: Remplacer par fetch(`/v1/finances/export/${format}`)
      toast.success(`Export ${format.toUpperCase()} en cours...`);
    } catch (error) {
      toast.error("Erreur lors de l'export");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [searchTerm, statusFilter, categoryFilter, transactions]);

  const resetForm = () => {
    setFormData({
      amount: "",
      contactId: "",
      prestationTypeId: "",
      name: "",
      type: "expense" as const,
      date: "",
      hours: "",
      category: "",
      reference: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTransaction(formData);
    setIsDialogOpen(false);
    resetForm();
  };

  const totalExpenses = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <a href="/finances">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dépenses</h1>
              <p className="text-muted-foreground">Créer et suivre vos dépenses professionnelles</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => exportData('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => exportData('xlsx')}>
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle dépense
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nouvelle dépense</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom de la dépense *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="amount">Montant (FCFA) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="1"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Date</Label>
                      <DatePicker
                        value={formData.date ? new Date(formData.date) : undefined}
                        onChange={(date) => setFormData({ ...formData, date: date ? date.toISOString().split('T')[0] : "" })}
                        placeholder="Choisir une date"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours">Heure</Label>
                      <Input
                        id="hours"
                        type="time"
                        value={formData.hours}
                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Catégorie (optionnel)</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactId">Contact/Client ID (optionnel)</Label>
                      <Input
                        id="contactId"
                        value={formData.contactId}
                        onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
                        placeholder="ID du contact"
                      />
                    </div>
                    <div>
                      <Label htmlFor="prestationTypeId">Type prestation ID (optionnel)</Label>
                      <Input
                        id="prestationTypeId"
                        value={formData.prestationTypeId}
                        onChange={(e) => setFormData({ ...formData, prestationTypeId: e.target.value })}
                        placeholder="ID du type de prestation"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reference">Référence (optionnel)</Label>
                    <Input
                      id="reference"
                      value={formData.reference}
                      onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                      placeholder="Numéro de facture, référence..."
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Création..." : "Créer"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <Euro className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold truncate">{totalExpenses.toLocaleString()} FCFA</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total dépenses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-6 w-6 sm:h-8 sm:w-8 text-destructive flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold truncate">{filteredTransactions.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Nombre de dépenses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="min-w-0 flex-1"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    {expenseCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des dépenses */}
        <Card>
          <CardHeader>
            <CardTitle>Dépenses ({filteredTransactions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Chargement...
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <p className="font-medium truncate">{transaction.name}</p>
                        {transaction.category && (
                          <Badge variant="outline">{transaction.category}</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                        <span>{transaction.date}</span>
                        {transaction.reference && <span>Réf: {transaction.reference}</span>}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg sm:text-base">{transaction.amount.toLocaleString()} FCFA</p>
                    </div>
                  </div>
                ))}
                
                {filteredTransactions.length === 0 && !loading && (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucune dépense trouvée
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}