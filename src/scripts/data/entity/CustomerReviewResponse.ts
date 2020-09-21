import { CustomerReview } from "./CustomerReviewEntity";

export interface CustomerReviewResponse {
    error: boolean;
    message: string;
    customerReviews: CustomerReview[];
}