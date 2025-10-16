import { CategoriesProvider } from "./categories_provider"
import { QuestionsProvider } from "./questions_provider"

// Combines multiple context providers
// and wraps them around the application tree
export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <CategoriesProvider>
        <QuestionsProvider>
            {children}
        </QuestionsProvider>
    </CategoriesProvider>
}