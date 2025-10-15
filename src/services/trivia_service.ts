import axios from "axios";
import type { Category } from "../models/category";

const trivia = axios.create(
    {
        baseURL: "https://opentdb.com",
    }
);

export async function fetchCategories() {
    const response = await trivia.get("api_category.php");
    return response.data["trivia_categories"] as Category[];
}

export async function fetchQuestions(amount: number) {
    const response = await trivia.get(`/api.php?amount=${amount}`);
    return response.data["results"];
}