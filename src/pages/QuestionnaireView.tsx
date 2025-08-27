import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, BarChart3, Share, Copy, Loader2 } from "lucide-react";
import { Quiz, questionTypeLabels } from "@/types/quiz";
import { toast } from "sonner";

const QuestionnaireView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [questionnaire, setQuestionnaire] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestionnaire = async () => {
      try {
        // TODO: Replace with actual API call
        // Mock data for demonstration
        const mockData: Quiz = {
          id: id!,
          title: "Questionnaire de satisfaction client",
          description: "Évaluation de la qualité de nos services photographiques",
          contactId: "contact1",
          benefitId: "benefit1",
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
              options: ["Oui", "Non", "Peut-être"]
            },
            {
              text: "Avez-vous des commentaires supplémentaires ?",
              type: 1,
              isRequired: false,
            }
          ],
          createdAt: "2024-01-15",
          updatedAt: "2024-01-20"
        };

        await new Promise(resolve => setTimeout(resolve, 500));
        setQuestionnaire(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading questionnaire:", error);
        toast.error("Erreur lors du chargement du questionnaire");
        navigate("/questionnaires");
      }
    };

    if (id) {
      loadQuestionnaire();
    }
  }, [id, navigate]);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/public/questionnaire/${id}`;
    navigator.clipboard.writeText(link);
    toast.success("Lien copié dans le presse-papiers");
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!questionnaire) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold">Questionnaire non trouvé</h2>
          <p className="text-muted-foreground mt-2">Le questionnaire demandé n'existe pas ou a été supprimé.</p>
          <Button className="mt-4" onClick={() => navigate("/questionnaires")}>
            Retour aux questionnaires
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{questionnaire.title}</h1>
              {questionnaire.description && (
                <p className="text-muted-foreground mt-1">{questionnaire.description}</p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCopyLink}>
              <Copy className="mr-2 h-4 w-4" />
              Copier le lien
            </Button>
            <Link to={`/questionnaires/${questionnaire.id}/responses`}>
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Voir les réponses
              </Button>
            </Link>
            <Link to={`/questionnaires/${questionnaire.id}/edit`}>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Questions
                  <Badge variant="secondary">
                    {questionnaire.questions.length} question{questionnaire.questions.length > 1 ? 's' : ''}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {questionnaire.questions.map((question, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-muted-foreground">
                            Question {index + 1}
                          </span>
                          {question.isRequired && (
                            <Badge variant="destructive" className="text-xs">
                              Obligatoire
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-medium">{question.text}</h3>
                      </div>
                      <Badge variant="outline">
                        {questionTypeLabels[question.type as keyof typeof questionTypeLabels]}
                      </Badge>
                    </div>

                    {question.options && question.options.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Options de réponse :</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {question.options.map((option, optionIndex) => (
                            <li key={optionIndex} className="text-muted-foreground">
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Créé le</p>
                  <p className="text-sm">{questionnaire.createdAt}</p>
                </div>
                
                {questionnaire.updatedAt && questionnaire.updatedAt !== questionnaire.createdAt && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Modifié le</p>
                    <p className="text-sm">{questionnaire.updatedAt}</p>
                  </div>
                )}

                <Separator />

                {questionnaire.contactId && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contact associé</p>
                    <p className="text-sm">Jean Dupont</p>
                  </div>
                )}

                {questionnaire.benefitId && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Prestation associée</p>
                    <p className="text-sm">Séance photo portrait</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Lien public</p>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-muted p-2 rounded flex-1 truncate">
                      /public/questionnaire/{questionnaire.id}
                    </code>
                    <Button variant="outline" size="sm" onClick={handleCopyLink}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Ce lien peut être partagé avec vos clients pour qu'ils puissent répondre au questionnaire.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuestionnaireView;