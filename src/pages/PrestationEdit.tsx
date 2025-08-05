import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MapPin, Paperclip } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PrestationEdit() {
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    client: "Joel TAMBO",
    type: "Mariage",
    statut: "En attente",
    titre: "Courture",
    dateDebut: "2025-07-24",
    heureDebut: "10:57",
    dateFin: "2025-07-24",
    heureFin: "16:03",
    lieu: "Douala",
    prix: "100000",
    devise: "FCFA",
    description: "dede"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de mise à jour
    console.log("Mise à jour prestation:", formData);
  };

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="flex items-center space-x-4">
          <Link to="/prestations">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Modifier la prestation
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Contact (client)</Label>
                <div className="flex items-center space-x-3 p-3 border rounded-md bg-muted/30">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JT</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{formData.client}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Type de projet</Label>
                <div className="p-3 border rounded-md bg-muted/30">
                  <span className="font-medium">{formData.type}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select value={formData.statut} onValueChange={(value) => setFormData({...formData, statut: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En attente">En attente</SelectItem>
                    <SelectItem value="Accepté">Accepté</SelectItem>
                    <SelectItem value="Refusé">Refusé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Informations détaillées */}
          <Card>
            <CardHeader>
              <CardTitle>Informations détaillées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre de la prestation</Label>
                <Input
                  id="titre"
                  value={formData.titre}
                  onChange={(e) => setFormData({...formData, titre: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Date et heure de début</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="date"
                      value={formData.dateDebut}
                      onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
                      className="flex-1"
                    />
                    <Input
                      type="time"
                      value={formData.heureDebut}
                      onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
                      className="w-24"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Date et heure de fin</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="date"
                      value={formData.dateFin}
                      onChange={(e) => setFormData({...formData, dateFin: e.target.value})}
                      className="flex-1"
                    />
                    <Input
                      type="time"
                      value={formData.heureFin}
                      onChange={(e) => setFormData({...formData, heureFin: e.target.value})}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lieu">Lieu de la prestation</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lieu"
                      value={formData.lieu}
                      onChange={(e) => setFormData({...formData, lieu: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prix">Prix de la prestation</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="prix"
                      type="number"
                      value={formData.prix}
                      onChange={(e) => setFormData({...formData, prix: e.target.value})}
                      className="flex-1"
                    />
                    <Select value={formData.devise} onValueChange={(value) => setFormData({...formData, devise: value})}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FCFA">FCFA</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description de la prestation</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Joindre des documents</CardTitle>
              <Button variant="outline" size="sm">
                Mettre à jour
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Paperclip className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Glissez vos documents ici ou cliquez pour parcourir</p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <Link to="/prestations">
            <Button variant="outline" className="w-full sm:w-auto">
              Annuler
            </Button>
          </Link>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Modifier la prestation
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}