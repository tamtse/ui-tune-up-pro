import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Euro,
  Calendar,
  CheckCircle
} from "lucide-react";

interface Payment {
  id: number;
  date: string;
  description: string;
  client: string;
  amount: number;
  type: "invoice" | "quote" | "deposit" | "other";
  status: "received" | "pending" | "partial";
  reference?: string;
  method: "cash" | "bank_transfer" | "check" | "card";
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

const prestationOptions = [
  "Mariage",
  "Portrait",
  "Corporate",
  "Événement",
  "Autre"
];

export default function FinancePaiements() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      date: "2024-07-15",
      description: "Séance portrait en studio",
      client: "Marie Dubois",
      amount: 210000,
      type: "invoice",
      status: "received",
      reference: "FAC-2024-015",
      method: "bank_transfer"
    },
    {
      id: 2,
      date: "2024-07-18",
      description: "Shooting mariage - Acompte",
      client: "Pierre & Julie Martin",
      amount: 480000,
      type: "deposit",
      status: "received",
      reference: "DEP-2024-003",
      method: "check"
    },
    {
      id: 3,
      date: "2024-07-22",
      description: "Photos corporate entreprise",
      client: "Tech Solutions SARL",
      amount: 720000,
      type: "invoice",
      status: "pending",
      reference: "FAC-2024-018",
      method: "bank_transfer"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    client: "",
    amount: "",
    type: "invoice" as "invoice" | "quote" | "deposit" | "other",
    status: "pending" as "received" | "pending" | "partial",
    reference: "",
    method: "bank_transfer" as "cash" | "bank_transfer" | "check" | "card",
    time: ""
  });

  const resetForm = () => {
    setFormData({
      date: "",
      description: "",
      client: "",
      amount: "",
      type: "invoice" as "invoice" | "quote" | "deposit" | "other",
      status: "pending" as "received" | "pending" | "partial",
      reference: "",
      method: "bank_transfer" as "cash" | "bank_transfer" | "check" | "card",
      time: ""
    });
    setSelectedPayment(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const paymentData = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: selectedPayment?.id || Date.now()
    };

    if (selectedPayment) {
      setPayments(payments.map(payment => 
        payment.id === selectedPayment.id ? paymentData : payment
      ));
    } else {
      setPayments([...payments, paymentData]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setFormData({
      date: payment.date,
      description: payment.description,
      client: payment.client,
      amount: payment.amount.toString(),
      type: payment.type,
      status: payment.status,
      reference: payment.reference || "",
      method: payment.method,
      time: ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setPayments(payments.filter(payment => payment.id !== id));
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesType = typeFilter === "all" || payment.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const receivedPayments = payments.filter(payment => payment.status === "received").reduce((sum, payment) => sum + payment.amount, 0);
  const pendingPayments = payments.filter(payment => payment.status === "pending").reduce((sum, payment) => sum + payment.amount, 0);

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

  const getTypeBadge = (type: string) => {
    const typeObj = paymentTypes.find(t => t.value === type);
    return <Badge variant="outline">{typeObj?.label || type}</Badge>;
  };

  const getMethodLabel = (method: string) => {
    const methodObj = paymentMethods.find(m => m.value === method);
    return methodObj?.label || method;
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
              <p className="text-muted-foreground">Gérer vos encaissements</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau paiement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedPayment ? "Modifier le paiement" : "Nouveau paiement"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="client">Contact (client)</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="prestation">Prestation (Sélectionner le projet)</Label>
                  <Select 
                    value={(prestationOptions.includes(formData.description) ? formData.description : undefined) as any}
                    onValueChange={(value) => setFormData({ ...formData, description: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {prestationOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="amount">Montant (FCFA)</Label>
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
                  <div className="flex flex-col">
                    <Label>Date de paiement</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start pl-3 text-left font-normal",
                            !formData.date && "text-muted-foreground"
                          )}
                          type="button"
                        >
                          {formData.date ? (
                            format(new Date(formData.date), "dd-MM-yyyy")
                          ) : (
                            <span>Choisir une date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarUI
                          mode="single"
                          selected={formData.date ? new Date(formData.date) : undefined}
                          onSelect={(d) => setFormData({ ...formData, date: d ? format(d, "yyyy-MM-dd") : "" })}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="time">Heure de paiement</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => setFormData({ ...formData, type: value as any })}
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
                      onValueChange={(value) => setFormData({ ...formData, method: value as any })}
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
                    <Label htmlFor="status">Statut</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="received">Reçu</SelectItem>
                        <SelectItem value="partial">Partiel</SelectItem>
                      </SelectContent>
                    </Select>
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
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {selectedPayment ? "Modifier" : "Créer"}
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
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-warning flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold truncate">{pendingPayments.toLocaleString()} FCFA</p>
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
                  <SelectItem value="received">Reçu</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="partial">Partiel</SelectItem>
                </SelectContent>
              </Select>

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
            <CardTitle>Paiements ({filteredPayments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <p className="font-medium truncate">{payment.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(payment.status)}
                        {getTypeBadge(payment.type)}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                      <span>{payment.date}</span>
                      <span>{payment.client}</span>
                      <span>{getMethodLabel(payment.method)}</span>
                      {payment.reference && <span>Réf: {payment.reference}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end space-x-3">
                    <div className="text-right">
                      <p className="font-bold text-success text-lg sm:text-base">{payment.amount.toLocaleString()} FCFA</p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(payment)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(payment.id)}
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
              
              {filteredPayments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun paiement trouvé
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}