import { useQuestions } from "../../providers/questions_provider";
import { CATEGORY_DISTRIBITUON_COLOR, DIFFICULTY_DISTRIBUTION_COLOR } from "../../theme/colors";
import { CategorySelector } from "../CategorySelector/CategorySelector"
import { Chart } from "../Chart/Chart"
import './Charts.css';

export const Charts: React.FC = () => {
    const {
        state: questionsState,
        getDistributionByCategory,
        getDistributionByDifficulty,
        getDistributionByDifficultyForCategory
    } = useQuestions();

    // Flags to identify if a error occurs or data is empty
    const hasError = questionsState.questionsError != null;
    const isEmpty =
        !questionsState.questionsLoading &&
        !questionsState.questionsError &&
        questionsState.questions == null;

    return (
        <div className="charts-container">
            {/* Filter by category */}
            <CategorySelector />

            {/* Error state */}
            {hasError && (
                <div className="message-container">
                    <div className="blob" />
                    <div className="error-text">
                        {questionsState.questionsError} Try to refetch again.
                    </div>
                </div>
            )}

            {/* Empty state */}
            {isEmpty && (
                <div className="message-container">
                    <div className="blob" />
                    <div className="empty-text">
                        {`No data to visualize. Click on the "Fetch" button to see distributions of questions by category and difficulty.`}
                    </div>
                </div>
            )}

            {/* Data available*/}
            {!hasError && !isEmpty && (
                <div className="charts">
                    {/* Distribution by categories */}
                    <Chart
                        isCategoryDistribution={true}
                        data={getDistributionByCategory()}
                        label="Distribution of questions by categories"
                        color={CATEGORY_DISTRIBITUON_COLOR}
                    />

                    {/* Distribution by difficulties.
                    If a category is selected, use the filtered distribution,
                    otherwise use overall distribution. */}
                    {questionsState.questionsByCategory == null ? (
                        <Chart
                            isCategoryDistribution={false}
                            data={getDistributionByDifficulty()}
                            label="Distribution of questions by difficulties"
                            color={DIFFICULTY_DISTRIBUTION_COLOR}
                        />
                    ) : (
                        <Chart
                            isCategoryDistribution={false}
                            data={getDistributionByDifficultyForCategory()}
                            label="Distribution of questions by difficulties"
                            color={DIFFICULTY_DISTRIBUTION_COLOR}
                        />
                    )}
                </div>
            )}
        </div>
    );
}