import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DistributionData } from '../models/distributionData';

interface Props {
    data: DistributionData[],
    label: string,
    color: string,
}
export const QuestionsDistributionChart: React.FC<Props> = ({ data, label, color }) => {
    const short = () => ("");

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
                <Bar dataKey="questions" barSize={20} fill={color} />
            </BarChart>
        </ResponsiveContainer>
    </div>
}