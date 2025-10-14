import { CategoriesProvider } from "./categories_provider"
import { QuestionsProvider } from "./questions_provider"

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <CategoriesProvider>
        <QuestionsProvider>
            {children}
        </QuestionsProvider>
    </CategoriesProvider>
}