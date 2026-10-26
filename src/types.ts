export interface SurveyAnswer {
  questionId: number;
  answer: string;
}

export interface VoucherDetails {
  code: string;
  discount: string;
  title: string;
  validUntil: string;
  securityHash: string;
}

export type ViewState = 'landing' | 'survey' | 'verifying' | 'reward';
