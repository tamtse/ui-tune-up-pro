export interface Quiz {
  id: string;
  title: string;
  contactId?: string;
  benefitId?: string;
  description?: string;
  questions: Question[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Question {
  text: string;
  type: number; // 1=text, 2=multiple choice, 3=single choice, etc.
  isRequired: boolean;
  options?: string[];
}

export interface QuizFormData {
  title: string;
  contactId?: string;
  benefitId?: string;
  description?: string;
  questions: Question[];
}

export enum QuestionType {
  TEXT = 1,
  MULTIPLE_CHOICE = 2,
  SINGLE_CHOICE = 3,
}

export const questionTypeLabels = {
  [QuestionType.TEXT]: "Texte libre",
  [QuestionType.MULTIPLE_CHOICE]: "Choix multiple",
  [QuestionType.SINGLE_CHOICE]: "Choix unique",
};