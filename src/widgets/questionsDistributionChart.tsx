import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DistributionData } from '../models/distributionData';
import { useCategories } from '../providers/categories_provider';
import { useQuestions } from '../providers/questions_provider';
import './questionsDistributionChart.css';

interface Props {
    isCategoryDistribution: boolean,
    data: DistributionData[],
    label: string,
    color: string,
}
export const QuestionsDistributionChart: React.FC<Props> = ({ isCategoryDistribution, data, label, color }) => {
    const short = () => ("");
    const { state, findCategoryIdByName, selectCategory } = useCategories();
    const { filterByCategory } = useQuestions();

    return <div className="chart-container">
        <div className="chart-title">
            {label}
        </div>
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
                            fill={entry.name == state.selectedCategory?.name ? "#5e4b8b" : color}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
}