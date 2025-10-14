import './App.css'
import { useQuestions } from './providers/questions_provider'
import { useCategories } from './providers/categories_provider';

function App() {
  const { state: questionsState, load: loadQuestions } = useQuestions();
  const { state: categoriesState, selectCategory } = useCategories();

  return (
    <>
      <div>
        <label>Choose a category:</label>
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
      <button onClick={async () => {
        await loadQuestions(50);
        console.log(questionsState.questions)
      }}>
        Fetch
      </button>
    </>
  )
}

export default App
