import { createContext, useContext, useReducer } from "react";
import type { Category } from "../models/category";
import type { Question } from "../models/question";
import { fetchQuestions } from "../services/trivia_service";
import { useCategories } from "./categories_provider";
import { difficulties } from "../models/difficulty";
import type { DistributionData } from "../models/distributionData";

type State = {
    questionsLoading: boolean;
    questionsError: string | null;
    questions: Question[] | null;
    questionsByCategory: Question[] | null;
    questionsByDifficulty: Question[] | null;
}

type Action =
    | { type: "LOAD_START" }
    | { type: "LOAD_SUCCESS", payload: Question[] }
    | { type: "LOAD_ERROR"; payload: string }
    | { type: "FILTER_BY_CATEGORY", payload: Question[] | null }
    | { type: "FILTER_BY_DIFFICULTY", payload: Question[] | null }

const initial: State = {
    questionsLoading: true,
    questionsError: null,
    questions: null,
    questionsByCategory: null,
    questionsByDifficulty: null
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "LOAD_START": return initial;
        case "LOAD_SUCCESS": return {
            questionsLoading: false,
            questionsError: null,
            questions: action.payload,
            questionsByCategory: null,
            questionsByDifficulty: null
        };
        case "LOAD_ERROR": return {
            questionsLoading: false,
            questionsError: action.payload,
            questions: null,
            questionsByCategory: null,
            questionsByDifficulty: null
        };
        case "FILTER_BY_CATEGORY": return {
            ...state, questionsByCategory: action.payload
        };
        case "FILTER_BY_DIFFICULTY": return {
            ...state, questionsByDifficulty: action.payload
        };
        default: return state;
    }
}

type QuestionsContextState = {
    state: State;
    load: (amount: number) => Promise<void>;
    filterByCategory: (category: Category) => void;
    filterByDifficulty: (difficulty: string) => void;
    getNumberOfQuestionsByCategory: (category: Category) => number;
    getNumberOfQuestionsByDifficulty: (difficulty: string) => number;
    getDistributionByCategory: () => { name: string, questions: number }[];
    getDistributionByDifficulty: () => { name: string, questions: number }[];
}

const QuestionsContext = createContext<QuestionsContextState | undefined>(undefined);

export const QuestionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial);
    const { state: categoriesState, findCategoryIdByName } = useCategories();

    const load = async (amount: number) => {
        dispatch({ type: "LOAD_START" });
        try {
            const questions = await fetchQuestions(amount);
            const formattedQuestions: Question[] = [];
            for (const q of questions) {
                formattedQuestions.push({
                    difficulty: q.difficulty,
                    category: {
                        id: findCategoryIdByName(q.category),
                        name: q.category
                    } as Category
                })
            };
            dispatch({ type: "LOAD_SUCCESS", payload: formattedQuestions })
        } catch {
            dispatch({ type: "LOAD_ERROR", payload: "Failed to load questions" });
        }
    }

    const getDistributionByCategory = (): DistributionData[] => {
        let data: DistributionData[] = []
        for (const category of categoriesState.categories ?? []) {
            data.push({
                name: category.name,
                questions: getNumberOfQuestionsByCategory(category),
            });
        }
        return data;
    }

    const getDistributionByDifficulty = (): DistributionData[] => {
        let data: DistributionData[] = []
        for (const difficulty of difficulties) {
            data.push({
                name: difficulty,
                questions: getNumberOfQuestionsByDifficulty(difficulty),
            });
        }
        return data;
    }

    const filterByCategory = (category: Category) => {
        let filteredQuestions =
            state.questions?.filter((questions) => questions.category.id == category.id);
        dispatch({ type: "FILTER_BY_CATEGORY", payload: filteredQuestions ?? null });
    }

    const filterByDifficulty = (difficulty: string) => {
        let filteredQuestions: Question[] | undefined =
            state.questions?.filter((questions) => questions.difficulty == difficulty);
        dispatch({ type: "FILTER_BY_DIFFICULTY", payload: filteredQuestions ?? null });
    }

    const getNumberOfQuestionsByCategory = (category: Category): number => {
        let filteredQuestions =
            state.questions?.filter((questions) => questions.category.id == category.id);
        return filteredQuestions?.length ?? 0;
    }

    const getNumberOfQuestionsByDifficulty = (difficulty: string): number => {
        let filteredQuestions: Question[] | undefined =
            state.questions?.filter((questions) => questions.difficulty == difficulty);
        return filteredQuestions?.length ?? 0;
    }

    return <QuestionsContext.Provider value={
        {
            state, load,
            filterByCategory,
            filterByDifficulty,
            getNumberOfQuestionsByCategory,
            getNumberOfQuestionsByDifficulty,
            getDistributionByCategory,
            getDistributionByDifficulty
        }}>
        {children}
    </QuestionsContext.Provider>
}

export function useQuestions(): QuestionsContextState {
    const ctx = useContext(QuestionsContext);
    if (!ctx) throw Error("useQuestions must be used inside QuestionsProvider");
    return ctx
} 