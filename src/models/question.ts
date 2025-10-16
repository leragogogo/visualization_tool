import type { Category } from "./category";

// Needed Structure of the question Trivia entity for the distibution charts
export interface Question {
    difficulty: string;
    category: Category,
}