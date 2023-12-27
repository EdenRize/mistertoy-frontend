import { GoogleMap } from "../cmps/GoogleMap";
import { useState } from 'react'

export function About() {
    const [center, setCenter] = useState({ lat: 32.08402011636236, lng: 34.875183783823815 })
    const branches = [
        { name: 'Tel Aviv', loc: { lat: 32.0853, lng: 34.7818 } },
        { name: 'Holon', loc: { lat: 32.00800884137633, lng: 34.78935309272791 } },
        { name: 'Petah Tikva', loc: { lat: 32.09414243222364, lng: 34.887543400345095 } },
        { name: 'Herzliya', loc: { lat: 32.16240962845579, lng: 34.84291143971794 } },
        { name: 'Rosh Haayin', loc: { lat: 32.090070373143526, lng: 34.953461369095095 } },
    ]

    return (
        <section className="page about">
            <h1>About Us</h1>
            <GoogleMap pins={branches.map(branch => branch.loc)} initCenter={center} />

            <div className="branches-btns">
                {branches.map(branch => {
                    return <button key={branch.name} onClick={() => setCenter(branch.loc)}>{branch.name}</button>
                })}
            </div>
        </section>
    )
}
