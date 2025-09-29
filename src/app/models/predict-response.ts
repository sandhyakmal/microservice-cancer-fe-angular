export interface PredictResponse {
    predicted_class: string;
    confidence: number;
    probabilities: {
        Cancer: number;
        'Non-Cancer': number;
    };
}
