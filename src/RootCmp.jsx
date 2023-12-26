import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'

import { AppHeader } from './cmps/AppHeader.jsx'

import { store } from './store/store'
import { HomePage } from './pages/HomePage'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { About } from './pages/About.jsx'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                            <Route path="/toy/edit" element={<ToyEdit />} />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<About />} path="/about" />
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>
    )
}

