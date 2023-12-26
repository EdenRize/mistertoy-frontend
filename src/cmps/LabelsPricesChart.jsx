import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { Doughnut, PolarArea } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)


export function LabelsPricesChart({ toys }) {
    const priceMap = calculateAveragePriceByLabel(toys)
    const { labels, prices } = separateLabelsAndPrices(priceMap)

    function calculateAveragePriceByLabel(toys) {
        const labelMap = toys.reduce((acc, toy) => {
            if (toy.labels && toy.labels.length > 0) {
                toy.labels.forEach(label => {
                    acc[label] = acc[label] || { totalPrice: 0, count: 0 };
                    acc[label].totalPrice += toy.price;
                    acc[label].count++;
                });
            }
            return acc;
        }, {});

        const result = {};
        for (const label in labelMap) {
            console.log('label', label)
            if (labelMap.hasOwnProperty(label)) {
                const averagePrice = labelMap[label].totalPrice / labelMap[label].count;
                result[label] = +averagePrice.toFixed(2);
            }
        }

        return result;
    }

    function separateLabelsAndPrices(priceMap) {
        const labelsArray = [];
        const pricesArray = [];

        for (const label in priceMap) {
            if (priceMap.hasOwnProperty(label)) {
                labelsArray.push(label);
                pricesArray.push(+priceMap[label]);
            }
        }

        return { labels: labelsArray, prices: pricesArray };
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Average Price',
                data: prices,
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
    return (
        <div className="labels-prices-chart">
            <h2>Prices Per Label</h2>
            <div style={{ maxWidth: '50vw', margin: 'auto' }}>
                <Doughnut data={data} />
            </div>
        </div>
    )
}
