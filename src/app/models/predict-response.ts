export interface PredictResponse {
    status: string;
    code: number;
    message: string;
    data: PredictData | null;
}

export interface PredictData {
  predicted_class: string;
  confidence: number;
  probabilities: {
    Cancer: number;
    'Non-Cancer': number;
  };
}