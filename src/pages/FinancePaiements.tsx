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
  ArrowLeft,
  Euro,
  CheckCircle,
  Download,
  TrendingUp
} from "lucide-react";

interface Transaction {
  id: number;
  amount: number;
  contactId?: string;
  prestationTypeId?: string;
  name: string;
  type: "income";
  date: string;
  hours?: string;
  client?: string;
  paymentType?: string;
  status?: string;
  reference?: string;
  method?: string;
}

const paymentTypes = [
  { value: "invoice", label: "Facture" },
  { value: "quote", label: "Devis" },
  { value: "deposit", label: "Acompte" },
  { value: "other", label: "Autre" }
];

const paymentMethods = [
  { value: "cash", label: "Espèces" },
  { value: "bank_transfer", label: "Virement" },
  { value: "check", label: "Chèque" },
  { value: "card", label: "Carte bancaire" }
];

export default function FinancePaiements() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    contactId: "",
    prestationTypeId: "",
    name: "",
    type: "income" as const,
    date: "",
    hours: "",
    client: "",
    paymentType: "invoice",
    status: "pending",
    reference: "",
    method: "bank_transfer"
  });

  // Simulation des appels API
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // TODO: Remplacer par fetch('/v1/finances?type=income')
      const mockData = [
        {
          id: 1,
          amount: 210000,
          name: "Séance portrait en studio",
          type: "income" as const,
          date: "2024-07-15",
          client: "Marie Dubois",
          paymentType: "invoice",
          status: "received",
          reference: "FAC-2024-015",
          method: "bank_transfer"
        },
        {
          id: 2,
          amount: 480000,
          name: "Shooting mariage - Acompte",
          type: "income" as const,
          date: "2024-07-18",
          client: "Pierre & Julie Martin",
          paymentType: "deposit",
          status: "received",
          reference: "DEP-2024-003",
          method: "check"
        }
      ];
      setTransactions(mockData);
      setFilteredTransactions(mockData);
    } catch (error) {
      toast.error("Erreur lors du chargement des paiements");
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
      toast.success("Paiement créé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la création du paiement");
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
          (t.client && t.client.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      if (statusFilter !== "all") {
        filtered = filtered.filter(t => t.status === statusFilter);
      }

      if (typeFilter !== "all") {
        filtered = filtered.filter(t => t.paymentType === typeFilter);
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
  }, [searchTerm, statusFilter, typeFilter, transactions]);

  const resetForm = () => {
    setFormData({
      amount: "",
      contactId: "",
      prestationTypeId: "",
      name: "",
      type: "income" as const,
      date: "",
      hours: "",
      client: "",
      paymentType: "invoice",
      status: "pending",
      reference: "",
      method: "bank_transfer"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTransaction(formData);
    setIsDialogOpen(false);
    resetForm();
  };

  const totalPayments = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const receivedPayments = filteredTransactions.filter(t => t.status === "received").reduce((sum, t) => sum + t.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "received":
        return <Badge className="bg-green-100 text-green-800">Reçu</Badge>;
      case "pending":
        return <Badge variant="secondary">En attente</Badge>;
      case "partial":
        return <Badge className="bg-orange-100 text-orange-800">Partiel</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (paymentType: string) => {
    const typeObj = paymentTypes.find(t => t.value === paymentType);
    return <Badge variant="outline">{typeObj?.label || paymentType}</Badge>;
  };

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
              <h1 className="text-2xl font-bold tracking-tight">Paiements</h1>
              <p className="text-muted-foreground">Créer et suivre vos encaissements</p>
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
                  Nouveau paiement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nouveau paiement</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom du paiement/prestation *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nom de la prestation"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="client">Client *</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
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
                      <Label>Date de paiement</Label>
                      <DatePicker
                        value={formData.date ? new Date(formData.date) : undefined}
                        onChange={(date) => setFormData({ ...formData, date: date ? date.toISOString().split('T')[0] : "" })}
                        placeholder="Choisir une date"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours">Heure de paiement</Label>
                      <Input
                        id="hours"
                        type="time"
                        value={formData.hours}
                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="paymentType">Type</Label>
                      <Select 
                        value={formData.paymentType} 
                        onValueChange={(value) => setFormData({ ...formData, paymentType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="method">Méthode de paiement</Label>
                      <Select 
                        value={formData.method} 
                        onValueChange={(value) => setFormData({ ...formData, method: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map(method => (
                            <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactId">Contact ID (optionnel)</Label>
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
                      placeholder="Numéro de facture, devis..."
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
                  <p className="text-lg sm:text-2xl font-bold truncate">{totalPayments.toLocaleString()} FCFA</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total paiements</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-success flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold truncate">{receivedPayments.toLocaleString()} FCFA</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Reçus</p>
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
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    {paymentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des paiements */}
        <Card>
          <CardHeader>
            <CardTitle>Paiements ({filteredTransactions.length})</CardTitle>
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
                        <div className="flex flex-wrap gap-2">
                          {transaction.status && getStatusBadge(transaction.status)}
                          {transaction.paymentType && getTypeBadge(transaction.paymentType)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                        <span>{transaction.date}</span>
                        {transaction.client && <span>Client: {transaction.client}</span>}
                        {transaction.reference && <span>Réf: {transaction.reference}</span>}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg sm:text-base text-success">{transaction.amount.toLocaleString()} FCFA</p>
                    </div>
                  </div>
                ))}
                
                {filteredTransactions.length === 0 && !loading && (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucun paiement trouvé
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