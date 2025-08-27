import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Eye, Download, Loader2, FileText } from "lucide-react";
import { Quiz } from "@/types/quiz";
import { toast } from "sonner";

interface QuizResponse {
  id: string;
  submittedAt: string;
  submitterEmail?: string;
  submitterName?: string;
  answers: {
    questionIndex: number;
    questionText: string;
    answer: string | string[];
  }[];
}

const QuestionnaireResponses = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [questionnaire, setQuestionnaire] = useState<Quiz | null>(null);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // TODO: Replace with actual API calls
        // Mock questionnaire data
        const mockQuestionnaire: Quiz = {
          id: id!,
          title: "Questionnaire de satisfaction client",
          description: "Évaluation de la qualité de nos services photographiques",
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
        };

        // Mock responses data
        const mockResponses: QuizResponse[] = [
          {
            id: "resp_1",
            submittedAt: "2024-01-16T10:30:00Z",
            submitterEmail: "jean.dupont@email.com",
            submitterName: "Jean Dupont",
            answers: [
              {
                questionIndex: 0,
                questionText: "Comment évaluez-vous notre service ?",
                answer: "Excellent"
              },
              {
                questionIndex: 1,
                questionText: "Recommanderiez-vous nos services ?",
                answer: "Oui"
              },
              {
                questionIndex: 2,
                questionText: "Avez-vous des commentaires supplémentaires ?",
                answer: "Service impeccable, très professionnel !"
              }
            ]
          },
          {
            id: "resp_2",
            submittedAt: "2024-01-17T14:15:00Z",
            submitterEmail: "marie.martin@email.com",
            submitterName: "Marie Martin",
            answers: [
              {
                questionIndex: 0,
                questionText: "Comment évaluez-vous notre service ?",
                answer: "Très bien"
              },
              {
                questionIndex: 1,
                questionText: "Recommanderiez-vous nos services ?",
                answer: "Oui"
              },
              {
                questionIndex: 2,
                questionText: "Avez-vous des commentaires supplémentaires ?",
                answer: "Bon travail, quelques améliorations possibles sur la communication."
              }
            ]
          },
          {
            id: "resp_3",
            submittedAt: "2024-01-18T09:45:00Z",
            submitterEmail: "pierre.durand@email.com",
            submitterName: "Pierre Durand",
            answers: [
              {
                questionIndex: 0,
                questionText: "Comment évaluez-vous notre service ?",
                answer: "Bien"
              },
              {
                questionIndex: 1,
                questionText: "Recommanderiez-vous nos services ?",
                answer: "Peut-être"
              },
              {
                questionIndex: 2,
                questionText: "Avez-vous des commentaires supplémentaires ?",
                answer: ""
              }
            ]
          }
        ];

        await new Promise(resolve => setTimeout(resolve, 500));
        setQuestionnaire(mockQuestionnaire);
        setResponses(mockResponses);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Erreur lors du chargement des données");
        navigate("/questionnaires");
      }
    };

    if (id) {
      loadData();
    }
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExport = () => {
    // TODO: Implement actual export functionality
    toast.success("Export en cours de développement");
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
              <h1 className="text-3xl font-bold tracking-tight">Réponses du questionnaire</h1>
              <p className="text-muted-foreground mt-1">{questionnaire.title}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Link to={`/questionnaires/${questionnaire.id}`}>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Voir le questionnaire
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Total des réponses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{responses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Taux de réponse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                {responses.length} sur 12 envoyés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Dernière réponse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {responses.length > 0 ? formatDate(responses[0].submittedAt).split(' à ')[0] : 'N/A'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Satisfaction moyenne</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2/5</div>
              <p className="text-xs text-muted-foreground">
                Basé sur les évaluations
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Réponses individuelles</CardTitle>
          </CardHeader>
          <CardContent>
            {responses.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Aucune réponse</h3>
                <p className="text-muted-foreground">
                  Ce questionnaire n'a pas encore reçu de réponse.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Répondant</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date de soumission</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {responses.map((response) => (
                    <TableRow key={response.id}>
                      <TableCell className="font-medium">
                        {response.submitterName || 'Anonyme'}
                      </TableCell>
                      <TableCell>
                        {response.submitterEmail || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {formatDate(response.submittedAt)}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          Voir détail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {responses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Aperçu des réponses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {questionnaire.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border-l-4 border-primary/20 pl-4">
                  <h4 className="font-medium mb-3">
                    Question {questionIndex + 1}: {question.text}
                  </h4>
                  
                  <div className="space-y-2">
                    {responses.map((response) => {
                      const answer = response.answers.find(a => a.questionIndex === questionIndex);
                      return (
                        <div key={response.id} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {response.submitterName || 'Anonyme'}:
                          </span>
                          <span className="max-w-md text-right">
                            {answer?.answer || 'Pas de réponse'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default QuestionnaireResponses;