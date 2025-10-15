import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DistributionData } from '../models/distributionData';
import { useCategories } from '../providers/categories_provider';
import { useQuestions } from '../providers/questions_provider';

interface Props {
    data: DistributionData[],
    label: string,
    color: string,
}
export const QuestionsDistributionChart: React.FC<Props> = ({ data, label, color }) => {
    const short = () => ("");
    const { state, findCategoryIdByName, selectCategory } = useCategories();
    const { filterByCategory } = useQuestions();

    return <div style={{ marginRight: 20, flex: 1 }}>
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 16 }}>
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
                    cursor="pointer"
                    onClick={(data) => {
                        const id = findCategoryIdByName(data.payload.name) ?? -1;
                        selectCategory(id);
                        filterByCategory(id);
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