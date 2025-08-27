import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  BarChart3,
  Trash2,
} from "lucide-react";
import { Quiz } from "@/types/quiz";
import { toast } from "sonner";

const Questionnaires = () => {
  const [questionnaires, setQuestionnaires] = useState<Quiz[]>([]);
  const [filteredQuestionnaires, setFilteredQuestionnaires] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockData: Quiz[] = [
      {
        id: "1",
        title: "Questionnaire de satisfaction client",
        description: "Évaluation de la qualité de nos services photographiques",
        contactId: "contact_1",
        questions: [
          {
            text: "Comment évaluez-vous notre service ?",
            type: 2,
            isRequired: true,
            options: ["Excellent", "Très bien", "Bien", "Moyen", "Décevant"]
          },
          {
            text: "Recommanderiez-vous nos services ?",
            type: 3,
            isRequired: true,
            options: ["Oui", "Non"]
          }
        ],
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        title: "Questionnaire pré-shooting",
        description: "Informations nécessaires avant la séance photo",
        questions: [
          {
            text: "Décrivez le style souhaité pour votre séance",
            type: 1,
            isRequired: true,
          },
          {
            text: "Avez-vous des exigences particulières ?",
            type: 1,
            isRequired: false,
          }
        ],
        createdAt: "2024-01-20",
      }
    ];
    
    setTimeout(() => {
      setQuestionnaires(mockData);
      setFilteredQuestionnaires(mockData);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredQuestionnaires(
        questionnaires.filter(q => 
          q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredQuestionnaires(questionnaires);
    }
  }, [searchTerm, questionnaires]);

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce questionnaire ?")) {
      setQuestionnaires(prev => prev.filter(q => q.id !== id));
      toast.success("Questionnaire supprimé avec succès");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Questionnaires</h1>
          <Link to="/questionnaires/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau questionnaire
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un questionnaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-48 animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuestionnaires.map((questionnaire) => (
              <Card key={questionnaire.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {questionnaire.title}
                    </CardTitle>
                    <Badge variant="secondary">
                      {questionnaire.questions.length} question{questionnaire.questions.length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  {questionnaire.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {questionnaire.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Créé le {questionnaire.createdAt}
                    </span>
                    <div className="flex space-x-2">
                      <Link to={`/questionnaires/${questionnaire.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/questionnaires/${questionnaire.id}/responses`}>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/questionnaires/${questionnaire.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(questionnaire.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && filteredQuestionnaires.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground">
                {searchTerm ? (
                  <>
                    Aucun questionnaire trouvé pour "{searchTerm}"
                    <br />
                    <Button 
                      variant="link" 
                      onClick={() => setSearchTerm("")}
                      className="mt-2"
                    >
                      Afficher tous les questionnaires
                    </Button>
                  </>
                ) : (
                  <>
                    Aucun questionnaire créé pour le moment
                    <br />
                    <Link to="/questionnaires/new">
                      <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Créer votre premier questionnaire
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default Questionnaires;