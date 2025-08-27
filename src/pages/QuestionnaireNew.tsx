import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react";
import { QuizFormData, Question, QuestionType, questionTypeLabels } from "@/types/quiz";
import { toast } from "sonner";

const QuestionnaireNew = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<QuizFormData>({
    title: "",
    description: "",
    contactId: "",
    benefitId: "",
    questions: [
      {
        text: "",
        type: QuestionType.TEXT,
        isRequired: true,
        options: []
      }
    ]
  });

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          type: QuestionType.TEXT,
          isRequired: true,
          options: []
        }
      ]
    }));
  };

  const removeQuestion = (index: number) => {
    if (formData.questions.length > 1) {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }));
    }
  };

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, ...updates } : q
      )
    }));
  };

  const addOption = (questionIndex: number) => {
    const question = formData.questions[questionIndex];
    const newOptions = [...(question.options || []), ""];
    updateQuestion(questionIndex, { options: newOptions });
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const question = formData.questions[questionIndex];
    const newOptions = [...(question.options || [])];
    newOptions[optionIndex] = value;
    updateQuestion(questionIndex, { options: newOptions });
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const question = formData.questions[questionIndex];
    const newOptions = (question.options || []).filter((_, i) => i !== optionIndex);
    updateQuestion(questionIndex, { options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error("Le titre est obligatoire");
      return;
    }

    if (formData.questions.some(q => !q.text.trim())) {
      toast.error("Toutes les questions doivent avoir un texte");
      return;
    }

    if (formData.questions.some(q => 
      (q.type === QuestionType.MULTIPLE_CHOICE || q.type === QuestionType.SINGLE_CHOICE) && 
      (!q.options || q.options.length < 2 || q.options.some(opt => !opt.trim()))
    )) {
      toast.error("Les questions à choix multiples doivent avoir au moins 2 options non vides");
      return;
    }

    try {
      // TODO: Replace with actual API call
      console.log("Creating quiz:", formData);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Questionnaire créé avec succès");
      navigate("/questionnaires");
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Erreur lors de la création du questionnaire");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Nouveau questionnaire</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du questionnaire *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Questionnaire de satisfaction client"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez l'objectif de ce questionnaire..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactId">Contact associé</Label>
                  <Select 
                    value={formData.contactId} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, contactId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un contact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contact1">Jean Dupont</SelectItem>
                      <SelectItem value="contact2">Marie Martin</SelectItem>
                      <SelectItem value="contact3">Pierre Durand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefitId">Prestation associée</Label>
                  <Select 
                    value={formData.benefitId} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, benefitId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une prestation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="benefit1">Séance photo portrait</SelectItem>
                      <SelectItem value="benefit2">Mariage complet</SelectItem>
                      <SelectItem value="benefit3">Événement d'entreprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Questions</CardTitle>
              <Button type="button" onClick={addQuestion} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une question
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Question {questionIndex + 1}</span>
                    </div>
                    {formData.questions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeQuestion(questionIndex)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Texte de la question *</Label>
                    <Input
                      value={question.text}
                      onChange={(e) => updateQuestion(questionIndex, { text: e.target.value })}
                      placeholder="Saisissez votre question..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type de question</Label>
                      <Select
                        value={question.type.toString()}
                        onValueChange={(value) => {
                          const type = parseInt(value) as QuestionType;
                          updateQuestion(questionIndex, { 
                            type,
                            options: type === QuestionType.TEXT ? [] : question.options || ["", ""]
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(questionTypeLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2 mt-6">
                      <Switch
                        checked={question.isRequired}
                        onCheckedChange={(checked) => updateQuestion(questionIndex, { isRequired: checked })}
                      />
                      <Label>Question obligatoire</Label>
                    </div>
                  </div>

                  {(question.type === QuestionType.MULTIPLE_CHOICE || question.type === QuestionType.SINGLE_CHOICE) && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Options de réponse</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(questionIndex)}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Ajouter
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(question.options || []).map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <Input
                              value={option}
                              onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                              placeholder={`Option ${optionIndex + 1}`}
                              className="flex-1"
                            />
                            {(question.options?.length || 0) > 2 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeOption(questionIndex, optionIndex)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Annuler
            </Button>
            <Button type="submit">
              Créer le questionnaire
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default QuestionnaireNew;