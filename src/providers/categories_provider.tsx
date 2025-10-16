import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Category } from "../models/category";
import { fetchCategories } from "../services/trivia_service";

type State = {
  categories: Category[] | null;
  categoriesError: string | null;
  selectedCategory: Category | null;
};

// Action types for the reducer
type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Category[] }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "SELECT_CATEGORY"; payload: Category | null };

const initial: State = { categories: null, categoriesError: null, selectedCategory: null };

// Handles state transitions
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_START":
      return initial;
    case "LOAD_SUCCESS":
      return { categories: action.payload, categoriesError: null, selectedCategory: null };
    case "LOAD_ERROR":
      return { categories: null, categoriesError: action.payload, selectedCategory: null };
    case "SELECT_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
}

type CategoriesContextState = {
  state: State;
  load: () => Promise<void>;
  findCategoryIdByName: (name: string) => number | null;
  selectCategory: (categoryId: number) => void;
}

const CategoriesContext = createContext<
  CategoriesContextState
  | undefined
>(undefined);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  // Select category to filter the questions by it
  const selectCategory = (categoryId: number) => {
    const category = state.categories?.find((category) => category.id == categoryId);
    dispatch({ type: "SELECT_CATEGORY", payload: category ?? null });
  }

  const findCategoryIdByName = (name: string): number | null => {
    const category = state.categories?.find((c) => c.name == name);
    return category?.id ?? null;
  }

  // Load categories from API
  const load = async () => {
    dispatch({ type: "LOAD_START" });
    try {
      const categories = await fetchCategories();
      dispatch({ type: "LOAD_SUCCESS", payload: categories });
    } catch (err: any) {
      dispatch({ type: "LOAD_ERROR", payload: "Failed to load categories" });
    }
  };

  // Load categories on mount
  useEffect(() => {
    load();
  }, []);


  return (
    <CategoriesContext.Provider value={{ state, selectCategory, load, findCategoryIdByName }}>
      {children}
    </CategoriesContext.Provider>
  );

};

// Provides access to context with safety check
export function useCategories(): CategoriesContextState {
  const ctx = useContext(CategoriesContext);
  if (!ctx) throw Error("useCategories must be used inside CategoriesProvider")
  return ctx;
}