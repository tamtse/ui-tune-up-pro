import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PrestationNew() {
  const [formData, setFormData] = useState({
    client: "",
    type: "",
    statut: "En attente",
    titre: "",
    dateDebut: "",
    heureDebut: "",
    dateFin: "",
    heureFin: "",
    lieu: "",
    prix: "",
    devise: "FCFA",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de sauvegarde
    console.log("Données de prestation:", formData);
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
            Créer une nouvelle prestation
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client (Contact)</Label>
                  <Select value={formData.client} onValueChange={(value) => setFormData({...formData, client: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un contact..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joel-tambo">Joel TAMBO</SelectItem>
                      <SelectItem value="lionel-fosto">Lionel FOSTO</SelectItem>
                      <SelectItem value="marie-dupont">Marie DUPONT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type de projet</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mariage">Mariage</SelectItem>
                      <SelectItem value="shooting">Shooting</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="evenement">Événement</SelectItem>
                    </SelectContent>
                  </Select>
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="titre">Titre de la prestation</Label>
                <Input
                  id="titre"
                  placeholder="Ex: Mariage de Marianne et Moise"
                  value={formData.titre}
                  onChange={(e) => setFormData({...formData, titre: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Informations détaillées */}
          <Card>
            <CardHeader>
              <CardTitle>Informations détaillées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateDebut">Date et heure de début</Label>
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
                  <Label htmlFor="dateFin">Date et heure de fin</Label>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lieu">Lieu de la prestation</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lieu"
                      placeholder="Lieu de l'événement"
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
                      placeholder="0"
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
              
              <div className="space-y-2">
                <Label htmlFor="description">Description de la prestation</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez la prestation en détail..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                />
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
            <Button type="submit" className="w-full sm:w-auto">
              Créer la prestation
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}