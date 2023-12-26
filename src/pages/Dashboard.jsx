
import { toyService } from '../services/toy.service'
import { loadToys, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LabelsPricesChart } from '../cmps/LabelsPricesChart.jsx'




export function Dashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)


    useEffect(() => {
        setFilterBy(toyService.getDefaultFilter())
        loadToys()
            .catch(() => {
                showErrorMsgRedux('Cannot show toys')
            })
    }, [])



    return (
        <section className="main-layout dashboard">
            <h1>Dashboard</h1>
            <LabelsPricesChart toys={toys} />

        </section>
    )
}
