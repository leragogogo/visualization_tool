import { useCategories } from "../providers/categories_provider";
import { useQuestions } from "../providers/questions_provider";
import "./categorySelector.css";

export const CategorySelector: React.FC = () => {
    const { state: categoriesState, selectCategory } = useCategories();
    const { filterByCategory } = useQuestions();
    return <div className="category-selector">
        <label className="category-label">Choose a category:</label>
        <select
            className="category-select"
            id="category"
            value={categoriesState.selectedCategory?.id ?? ""}
            onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                    selectCategory(NaN);
                    filterByCategory(NaN);
                    return;
                }
                const id = Number(value);
                selectCategory(id);
                filterByCategory(id);
            }}
        >
            <option value="">Any categories</option>
            {
                categoriesState.categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))
            }
        </select>
    </div>
} 