import { useCategories } from './providers/categories_provider';
import { useQuestions } from './providers/questions_provider'
import { CategorySelector } from './widgets/categorySelector';
import { QuestionsDistributionChart } from './widgets/questionsDistributionChart';

function App() {
  const {
    state: questionsState, load: loadQuestions,
    getDistributionByCategory,
    getDistributionByDifficulty,
    getDistributionByDifficultyForCategory
  } = useQuestions();

  const { selectCategory } = useCategories();
  return (
    <div style={{
      display: "flex", flexDirection: "row",
      marginTop: 40, marginLeft: 40, minHeight: "100vh"
    }}>
      <div style={{ flex: 2 }}>
        <CategorySelector />
        <div style={{ width: "100%", height: 500, display: "flex", flexDirection: 'row' }}>
          <QuestionsDistributionChart
            data={getDistributionByCategory()}
            label={"Distribution of questions by categories"}
            color={"#8884d8"} />
          {questionsState.questionsByCategory == null ?
            <QuestionsDistributionChart
              data={getDistributionByDifficulty()}
              label={"Distribution of questions by difficulties"}
              color={"#82ca9d"} />
            : <QuestionsDistributionChart
              data={getDistributionByDifficultyForCategory()}
              label={"Distribution of questions by difficulties"}
              color={"#82ca9d"} />
          }
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <button onClick={async () => {
          selectCategory(NaN);
          await loadQuestions(50);
        }}>
          Fetch
        </button>
      </div>
    </div>
  )
}

export default App
