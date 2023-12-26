import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { Doughnut, PolarArea } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export function LabelInventoryChart({ toys }) {
    const priceMap = calculateStockPercentageByLabel(toys)
    const { labels, percentages } = separateLabelsAndPercentages(priceMap)

    function calculateStockPercentageByLabel(toys) {
        const labelStockMap = toys.reduce((acc, toy) => {
            if (toy.labels && toy.labels.length > 0) {
                toy.labels.forEach(label => {
                    acc[label] = acc[label] || { total: 0, inStock: 0 };
                    acc[label].total++;
                    if (toy.inStock) {
                        acc[label].inStock++;
                    }
                });
            }
            return acc;
        }, {});

        const result = {};
        for (const label in labelStockMap) {
            if (labelStockMap.hasOwnProperty(label)) {
                const percentage = (labelStockMap[label].inStock / labelStockMap[label].total) * 100 || 0;
                result[label] = percentage.toFixed(2);
            }
        }

        return result;
    }

    function separateLabelsAndPercentages(stockResult) {
        const labelsArray = [];
        const percentagesArray = [];

        for (const label in stockResult) {
            if (stockResult.hasOwnProperty(label)) {
                labelsArray.push(label);
                percentagesArray.push(stockResult[label]);
            }
        }

        return { labels: labelsArray, percentages: percentagesArray };
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'In Stock',
                data: percentages,
                backgroundColor: [
                    '#F4CE14',
                    '#495E57',
                    '#45474B',
                    '#007BA7',
                    '#FF6F61',
                    '#5D5D5A',
                    '#B2DBBF',
                    '#E8491D',
                    '#8F3985',
                    '#FFE156 ',
                ],
                borderColor: [
                    '#D3B30E',
                    '#3D4F49',
                    '#3D3F43',
                    '#00587E',
                    '#D8433F',
                    '#4F4F4C',
                    '#85A492',
                    '#C53116',
                    '#6D2C69',
                    '#D7C142',
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                    const currentValue = dataset.data[tooltipItem.index];
                    const percentage = ((currentValue / total) * 100).toFixed(2) + '%';
                    return `${data.labels[tooltipItem.index]}: ${currentValue} (${percentage})`;
                },
            },
        },
    };

    return (
        <div className="label-inventory-chart">
            <h2>Inventory by Label</h2>
            <div style={{ maxWidth: '50vw', margin: 'auto' }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
}
