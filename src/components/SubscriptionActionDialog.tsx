import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, AlertTriangle } from "lucide-react";

interface SubscriptionActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  action: "extend" | "cancel";
  currentPlan: string;
  currentEndDate: string;
}

export function SubscriptionActionDialog({ 
  isOpen, 
  onClose, 
  action, 
  currentPlan, 
  currentEndDate 
}: SubscriptionActionDialogProps) {
  const [extensionMonths, setExtensionMonths] = useState("1");
  const [newEndDate, setNewEndDate] = useState("");
  const [reason, setReason] = useState("");

  const calculateNewEndDate = (months: string) => {
    const current = new Date(currentEndDate);
    current.setMonth(current.getMonth() + parseInt(months));
    setNewEndDate(current.toISOString().split('T')[0]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md m-4">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {action === "extend" ? (
              <>
                <Calendar className="h-5 w-5 text-primary" />
                <span>Prolonger l'abonnement</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span>Annuler l'abonnement</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informations actuelles */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium">Plan actuel: {currentPlan}</p>
            <p className="text-sm text-muted-foreground">Expire le: {currentEndDate}</p>
          </div>

          {action === "extend" ? (
            <>
              <div>
                <Label htmlFor="extension-months">Durée d'extension</Label>
                <Select 
                  value={extensionMonths} 
                  onValueChange={(value) => {
                    setExtensionMonths(value);
                    calculateNewEndDate(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 mois</SelectItem>
                    <SelectItem value="3">3 mois</SelectItem>
                    <SelectItem value="6">6 mois</SelectItem>
                    <SelectItem value="12">12 mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newEndDate && (
                <div className="p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-success">
                      Nouvelle date d'expiration: {newEndDate}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-4">
                <Button className="flex-1">
                  Confirmer l'extension
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Annuler
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="cancel-reason">Raison de l'annulation</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une raison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user-request">Demande de l'utilisateur</SelectItem>
                    <SelectItem value="payment-issue">Problème de paiement</SelectItem>
                    <SelectItem value="violation">Violation des conditions</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-destructive/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">
                    L'abonnement sera annulé immédiatement
                  </span>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="destructive" className="flex-1" disabled={!reason}>
                  Confirmer l'annulation
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Annuler
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}