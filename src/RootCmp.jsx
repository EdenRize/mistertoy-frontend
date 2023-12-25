import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'

import { AppHeader } from './cmps/AppHeader.jsx'

import { store } from './store/store'
import { HomePage } from './pages/HomePage'
import { ToyIndex } from './pages/ToyIndex.jsx'

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
                    {/* <Route element={<AboutUs />} path="/about" />
                    <Route element={<CarDetails />} path="/car/:carId" /> */}
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </section>
    </Router>
</Provider>
  )
}

