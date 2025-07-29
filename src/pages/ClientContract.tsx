import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, PenTool, FileText, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ClientContract() {
  const { clientId, contractId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [signature, setSignature] = useState("");
  const [contractStatus, setContractStatus] = useState("en cours");

  // Mock contract data
  const contractData = {
    id: "CONT-001",
    number: "1867",
    title: "Contrat de prestation photographique",
    client: {
      name: "Lionel Feugana",
      company: "Sample Client",
      email: "contact@sampleclient.com"
    },
    photographer: {
      name: "John Smith",
      title: "Chef Directeur",
      address: "35, 35 Lorem Road Singapore - 8965",
      email: "www.example.com",
      phone: "+865 - 1234 - 4789"
    },
    date: "19 Septembre, 2018",
    status: contractStatus,
    content: `Dans le cadre de notre collaboration, le présent contrat a été élaboré pour démontrer les options offertes par l'Your Company Letter Head Design. Votre prestataire préféré, il est prévu de travail en harmonie avec tous les autres éléments Letter Head.

Ce Letter Head Design a le droit de projeter une image de professionnalisme et de la fiabilité. En utilisant simple design nous avons créé un sentiment très agréable. La simplicité suggérer négative questionnaires contribuent à appuyer le layout. Ces trois variétés autres que la plum Your Company.

Look and helps reconnect the Your Company brand. Letter Head design a le droit de projeter une image de design. Votre prestataire préféré, il est prévu de travail en harmonie avec tous les autres éléments Letter Head simplicité and reliabilité.

Ce Letter Head Design est basé sur la forme de votre logo de Your Company Logo. Each stationery we have created a very spacious feeling. The simplicity suggests strengths like spreadsamont contribué post of the thorns of your logos.

Dans le cadre de notre collaboration photographique, les termes suivants sont convenus :

1. OBJET DU CONTRAT
   - Prestation photographique pour événement d'entreprise
   - Livraison des images retouchées sous 15 jours ouvrables
   - Remise d'un DVD avec l'ensemble des photos haute définition

2. OBLIGATIONS DU PHOTOGRAPHE
   - Respecter les horaires convenus
   - Fournir un matériel professionnel adapté
   - Assurer la confidentialité des images

3. OBLIGATIONS DU CLIENT
   - Faciliter l'accès aux lieux de prise de vue
   - Régler les honoraires selon les modalités convenues
   - Informer de toute contrainte particulière

4. PROPRIÉTÉ INTELLECTUELLE
   - Les droits d'auteur restent la propriété du photographe
   - Le client obtient un droit d'usage selon les termes convenus
   - Toute utilisation commerciale nécessite un accord préalable

5. MODALITÉS FINANCIÈRES
   - Montant total : 2 500 000 F CFA TTC
   - Acompte de 30% à la signature
   - Solde à la livraison des images

Ce contrat prend effet à sa signature par les deux parties et reste valable pour la durée de la prestation convenue.`
  };

  const handleDownload = () => {
    toast({
      title: "Téléchargement en cours",
      description: "Le contrat est en cours de téléchargement...",
    });
  };

  const handleSign = () => {
    if (!signature.trim()) {
      toast({
        title: "Signature requise",
        description: "Veuillez entrer votre signature avant de signer le document.",
        variant: "destructive"
      });
      return;
    }
    
    setContractStatus("signé");
    toast({
      title: "Contrat signé avec succès",
      description: "Votre signature a été enregistrée.",
    });
    
    // Redirect back to portal after 2 seconds
    setTimeout(() => {
      navigate(`/client/${clientId}?token=${token}`);
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "brouillon": { color: "bg-gray-100 text-gray-800", label: "Brouillon" },
      "en cours": { color: "bg-blue-100 text-blue-800", label: "En cours" },
      "signé": { color: "bg-green-100 text-green-800", label: "Signé" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["en cours"];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Accès non autorisé</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/client/${clientId}?token=${token}`)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au portail
            </Button>
            <div className="text-center">
              <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <FileText className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm font-medium">Logo</span>
              </div>
            </div>
            <div></div>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">
              Hello {contractData.client.name},
            </h1>
            <p className="text-blue-100">
              {contractStatus === "signé" 
                ? "Votre contrat a été signé avec succès" 
                : "Veuillez examiner et signer ce contrat"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Document viewer */}
      <div className="max-w-4xl mx-auto p-6">
        <Card className="shadow-xl">
          <CardHeader className="border-b bg-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Contrat N° {contractData.number}</CardTitle>
                <p className="text-muted-foreground mt-1">
                  FROM: {contractData.photographer.name} - TO: {contractData.client.company}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(contractStatus)}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* Contract header info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Prestataire</h3>
                <p className="font-medium">{contractData.photographer.name}</p>
                <p className="text-sm text-muted-foreground">{contractData.photographer.title}</p>
                <p className="text-sm text-muted-foreground">{contractData.photographer.address}</p>
                <p className="text-sm text-muted-foreground">{contractData.photographer.phone}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Client</h3>
                <p className="font-medium">{contractData.client.name}</p>
                <p className="text-sm text-muted-foreground">{contractData.client.company}</p>
                <p className="text-sm text-muted-foreground">{contractData.client.email}</p>
                <p className="text-sm text-muted-foreground">Date: {contractData.date}</p>
              </div>
            </div>

            {/* Contract content */}
            <div className="prose max-w-none mb-8">
              <div className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                {contractData.content}
              </div>
            </div>

            {/* Signature section */}
            {contractStatus !== "signé" && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <PenTool className="h-5 w-5 mr-2 text-blue-600" />
                  Signature électronique
                </h3>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800 mb-3">
                    En signant ce document, vous acceptez tous les termes et conditions énoncés ci-dessus.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tapez votre nom complet pour signer :
                      </label>
                      <Textarea
                        placeholder="Entrez votre nom complet ici..."
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        className="min-h-[80px] font-mono text-lg"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSign}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <PenTool className="h-4 w-4 mr-2" />
                      Signer le document
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Signed confirmation */}
            {contractStatus === "signé" && (
              <div className="border-t pt-6">
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Document signé avec succès
                  </h3>
                  <p className="text-green-700 mb-4">
                    Signature : <span className="font-mono font-semibold">{signature}</span>
                  </p>
                  <p className="text-sm text-green-600">
                    Date de signature : {new Date().toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}