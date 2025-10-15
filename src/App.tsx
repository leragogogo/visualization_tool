import { useQuestions } from './providers/questions_provider'
import { CategorySelector } from './widgets/categorySelector';
import { QuestionsDistributionChart } from './widgets/questionsDistributionChart';

function App() {
  const { state: questionsState, load: loadQuestions, getDistributionByCategory, getDistributionByDifficulty } = useQuestions();

  return (
    <div style={{
      display: "flex", flexDirection: "row",
      marginTop: 40, marginLeft: 40, minHeight: "100vh"
    }}>
      <div style={{ flex: 2}}>
        <CategorySelector />
        <div style={{ width: "100%", height: 500, display: "flex", flexDirection: 'row' }}>
          <QuestionsDistributionChart
            data={getDistributionByCategory()}
            label={"Distribution of questions by categories"}
            color={"#8884d8"} />
          <QuestionsDistributionChart
            data={getDistributionByDifficulty()}
            label={"Distribution of questions by difficulties"}
            color={"#82ca9d"} />
        </div>
      </div>
      <div style={{ flex: 1}}>
        <button onClick={async () => {
          await loadQuestions(50);
          console.log(questionsState.questions)
        }}>
          Fetch
        </button>
      </div>
    </div>
  )
}

export default App
