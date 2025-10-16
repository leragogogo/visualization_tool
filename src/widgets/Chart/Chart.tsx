import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DistributionData } from '../../models/distributionData';
import { useCategories } from '../../providers/categories_provider';
import { useQuestions } from '../../providers/questions_provider';
import './Chart.css';
import { SELECTED_BAR_COLOR } from '../../theme/colors';

interface Props {
    isCategoryDistribution: boolean, // true = chart by categories, false = chart by difficulty
    data: DistributionData[],
    label: string,
    color: string,
}

export const Chart: React.FC<Props> = (
    {
        isCategoryDistribution,
        data, label, color
    }) => {

    // Tick formatter that hides x-axis labels
    const short = () => ("");
    const { state, findCategoryIdByName, selectCategory } = useCategories();
    const { filterByCategory } = useQuestions();

    return (
        <div className="chart-container">
            {/* Chart title */}
            <div className="chart-title">
                {label}
            </div>

            {/* Chart that scales automatically with screen size */}
            <div className="chart-inner">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickFormatter={short} />
                    <YAxis dataKey="questions" />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="questions"
                        barSize={20}
                        fill={color}
                        cursor={isCategoryDistribution ? "pointer" : undefined}
                        onClick={(data) => {
                            // Select only if chart is a category distribution
                            if (isCategoryDistribution) {
                                const id = findCategoryIdByName(data.payload.name) ?? -1;
                                selectCategory(id);
                                filterByCategory(id);
                            }
                        }}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                // Highlight selected category with a distinct color
                                fill={
                                    entry.name == state.selectedCategory?.name ?
                                        SELECTED_BAR_COLOR :
                                        color
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
    );
}