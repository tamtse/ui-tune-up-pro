import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Euro,
  Calendar
} from "lucide-react";

interface Expense {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: "paid" | "pending";
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
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      date: "2024-07-15",
      description: "Achat objectif Canon 85mm",
      category: "Équipement",
      amount: 720000,
      status: "paid",
      reference: "FAC-2024-001"
    },
    {
      id: 2,
      date: "2024-07-20",
      description: "Essence déplacement mariage",
      category: "Transport",
      amount: 27000,
      status: "pending"
    },
    {
      id: 3,
      date: "2024-07-22",
      description: "Abonnement Adobe Creative",
      category: "Logiciels",
      amount: 36000,
      status: "paid",
      reference: "SUB-2024-002"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
    status: "pending" as "paid" | "pending",
    reference: ""
  });

  const resetForm = () => {
    setFormData({
      date: "",
      description: "",
      category: "",
      amount: "",
      status: "pending" as "paid" | "pending",
      reference: ""
    });
    setSelectedExpense(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: selectedExpense?.id || Date.now()
    };

    if (selectedExpense) {
      setExpenses(expenses.map(exp => 
        exp.id === selectedExpense.id ? expenseData : exp
      ));
    } else {
      setExpenses([...expenses, expenseData]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setFormData({
      date: expense.date,
      description: expense.description,
      category: expense.category,
      amount: expense.amount.toString(),
      status: expense.status,
      reference: expense.reference || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || expense.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const paidExpenses = expenses.filter(exp => exp.status === "paid").reduce((sum, exp) => sum + exp.amount, 0);
  const pendingExpenses = expenses.filter(exp => exp.status === "pending").reduce((sum, exp) => sum + exp.amount, 0);

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
              <p className="text-muted-foreground">Gérer vos dépenses professionnelles</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle dépense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedExpense ? "Modifier la dépense" : "Nouvelle dépense"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Montant (FCFA)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="1"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({...formData, category: value})}
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
                  <div>
                    <Label htmlFor="status">Statut</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => setFormData({...formData, status: value as "paid" | "pending"})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="paid">Payé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="reference">Référence (optionnel)</Label>
                  <Input
                    id="reference"
                    value={formData.reference}
                    onChange={(e) => setFormData({...formData, reference: e.target.value})}
                    placeholder="Numéro de facture, référence..."
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {selectedExpense ? "Modifier" : "Créer"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-success flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold truncate">{paidExpenses.toLocaleString()} FCFA</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Payées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-warning flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold truncate">{pendingExpenses.toLocaleString()} FCFA</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">En attente</p>
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>

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
            <CardTitle>Dépenses ({filteredExpenses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div key={expense.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <p className="font-medium truncate">{expense.description}</p>
                      <Badge variant={expense.status === "paid" ? "default" : "secondary"} className="w-fit">
                        {expense.status === "paid" ? "Payé" : "En attente"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                      <span>{expense.date}</span>
                      <span>{expense.category}</span>
                      {expense.reference && <span>Réf: {expense.reference}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end space-x-3">
                    <div className="text-right">
                      <p className="font-bold text-lg sm:text-base">{expense.amount.toLocaleString()} FCFA</p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(expense)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(expense.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {filteredExpenses.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aucune dépense trouvée
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}