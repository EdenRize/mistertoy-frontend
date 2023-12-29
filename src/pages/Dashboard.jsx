
import { toyService } from '../services/toy.service'
import { loadToys, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LabelsPricesChart } from '../cmps/LabelsPricesChart.jsx'
import { LabelInventoryChart } from '../cmps/LabelInventoryChart.jsx'
import { RandomLineChart } from '../cmps/RandomLineChart.jsx'




export function Dashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setFilterBy(toyService.getDefaultFilter())
                await loadToys()
            } catch (error) {
                showErrorMsgRedux('Cannot show toys')
            }
        }

        fetchData()
    }, [])



    return (
        <section className="page dashboard">
            <h1>Dashboard</h1>
            <div className="doughnuts-container">

                <LabelsPricesChart toys={toys} />
                <LabelInventoryChart toys={toys} />
            </div>
            <RandomLineChart />
        </section>
    )
}
