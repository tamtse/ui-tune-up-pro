import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Calendar, 
  User, 
  Mail, 
  DollarSign, 
  FileText, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

interface Transaction {
  id: number;
  name: string;
  email: string;
  avatar: string;
  date: string;
  subscription: string;
  amount: string;
  status: string;
  type: string;
}

interface TransactionDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function TransactionDetailDialog({ isOpen, onClose, transaction }: TransactionDetailDialogProps) {
  if (!transaction) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Payé":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "En attente":
        return <Clock className="h-4 w-4 text-warning" />;
      case "Annulé":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "Gratuit":
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Payé":
        return "bg-success/10 text-success";
      case "En attente":
        return "bg-warning/10 text-warning";
      case "Annulé":
        return "bg-destructive/10 text-destructive";
      case "Gratuit":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "upgrade":
        return "Mise à niveau";
      case "subscription":
        return "Abonnement";
      case "renewal":
        return "Renouvellement";
      case "cancellation":
        return "Annulation";
      case "free":
        return "Gratuit";
      default:
        return type;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg m-4">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Détails de la transaction #{transaction.id}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Utilisateur */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{transaction.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{transaction.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                {transaction.email}
              </p>
            </div>
          </div>

          <Separator />

          {/* Détails de la transaction */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground flex items-center mb-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  Date
                </Label>
                <p className="font-medium text-sm">{transaction.date}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground flex items-center mb-1">
                  <CreditCard className="h-3 w-3 mr-1" />
                  Type
                </Label>
                <p className="font-medium text-sm">{getTypeLabel(transaction.type)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground flex items-center mb-1">
                  <User className="h-3 w-3 mr-1" />
                  Abonnement
                </Label>
                <p className="font-medium text-sm">{transaction.subscription}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground flex items-center mb-1">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Montant
                </Label>
                <p className="font-medium text-sm">{transaction.amount}</p>
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Statut</Label>
              <div className="flex items-center space-x-2">
                {getStatusIcon(transaction.status)}
                <Badge className={`${getStatusColor(transaction.status)} text-xs`}>
                  {transaction.status}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informations additionnelles */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Informations de paiement</h4>
            <div className="p-3 bg-muted/30 rounded-lg text-sm">
              <div className="space-y-1">
                <p><span className="text-muted-foreground">ID Transaction:</span> TXN_{transaction.id.toString().padStart(6, '0')}</p>
                <p><span className="text-muted-foreground">Méthode de paiement:</span> Carte bancaire</p>
                {transaction.status === "Payé" && (
                  <p><span className="text-muted-foreground">Date de traitement:</span> {transaction.date}</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
            {transaction.status === "En attente" && (
              <Button variant="outline" size="sm" className="flex-1">
                Marquer comme payé
              </Button>
            )}
            <Button variant="outline" size="sm" className="flex-1">
              Télécharger reçu
            </Button>
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}