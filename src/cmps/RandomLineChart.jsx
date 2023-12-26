import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export function RandomLineChart() {
    const dataMap = generateRandomLineChartData()
    const { labels, datas } = separateLabelsAndDatas(dataMap)

    function generateRandomLineChartData() {
        const dataObject = {};
        const range = 90;
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        const oneDay = 24 * 60 * 60 * 1000;

        for (let i = 0; i < 10; i++) {
            const randomNumber = 10 + Math.random() * range;
            const currentDate = new Date(startDate.getTime() + i * oneDay);
            const dateKey = currentDate.toISOString().split('T')[0];
            dataObject[dateKey] = randomNumber;
        }

        return dataObject;
    }

    function separateLabelsAndDatas(priceMap) {
        const labelsArray = [];
        const datasArray = [];

        for (const label in priceMap) {
            if (priceMap.hasOwnProperty(label)) {
                labelsArray.push(label);
                datasArray.push(+priceMap[label]);
            }
        }

        return { labels: labelsArray, datas: datasArray };
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: datas,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    return (
        <div className="random-line-chart">
            <h2>Dates & Numbers</h2>
            <Line data={data} />
        </div>
    )
}
