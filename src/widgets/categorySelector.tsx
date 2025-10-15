import { useCategories } from "../providers/categories_provider";

export const CategorySelector: React.FC = () => {
    const { state: categoriesState, selectCategory } = useCategories();

    return <div style={{ marginBottom: 60 }}>
        <label style={{ marginRight: 10 }}>Choose a category:</label>
        <select
            id="category"
            value={categoriesState.selectedCategory?.id}
            onChange={(e) => selectCategory(Number(e.target.value))}
        >
            <option>Any categories</option>
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