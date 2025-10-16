import { useCategories } from './providers/categories_provider';
import { useQuestions } from './providers/questions_provider'
import { CategorySelector } from './widgets/categorySelector';
import { QuestionsDistributionChart } from './widgets/questionsDistributionChart';
import "./App.css";

function App() {
  const {
    state: questionsState, load: loadQuestions,
    getDistributionByCategory,
    getDistributionByDifficulty,
    getDistributionByDifficultyForCategory
  } = useQuestions();

  const { selectCategory } = useCategories();

  console.log(questionsState.questions, questionsState.questionsLoading, questionsState.questionsError);
  return (
    <div className="app-root">
      <div className="app-left">
        <CategorySelector />
        {(questionsState.questions == null) &&
          (questionsState.questionsError == null) &&
          (!questionsState.questionsLoading) ?
          <div className="empty-state">
            <div className="empty-blob" />
            <div className="empty-text">
              {`No data to visualize. Click on the "Fetch" button to see distributions of questions by category and difficulty.`}
            </div>
          </div> :
          <div className="charts-row">
            <QuestionsDistributionChart
              isCategoryDistribution={true}
              data={getDistributionByCategory()}
              label={"Distribution of questions by categories"}
              color={"#8884d8"} />
            {questionsState.questionsByCategory == null ?
              <QuestionsDistributionChart
                isCategoryDistribution={false}
                data={getDistributionByDifficulty()}
                label={"Distribution of questions by difficulties"}
                color={"#82ca9d"} />
              : <QuestionsDistributionChart
                isCategoryDistribution={false}
                data={getDistributionByDifficultyForCategory()}
                label={"Distribution of questions by difficulties"}
                color={"#82ca9d"} />
            }
          </div>}
      </div>
      <div className="app-right">
        <button className="btn-grad" onClick={async () => {
          selectCategory(NaN);
          await loadQuestions(50);
        }} >
          Fetch
        </button>
      </div>
    </div>
  )
}

export default App
