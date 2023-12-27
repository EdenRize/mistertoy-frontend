import { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '20px', textAlign: 'center' }}>{text}</div>

export function GoogleMap({ pins, initCenter }) {
    const [center, setCenter] = useState(initCenter)
    const zoom = 10.5

    useEffect(() => { setCenter(initCenter) }, [initCenter])


    function handleClick({ lat, lng }) {
        console.log('{ lat, lng }', { lat, lng })
        setCenter({ lat, lng })
    }

    return (
        <div className='google-map'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyC7slhrpbG9JzV8M5QCnZS7K2ALrniSKtQ" }}
                center={center}
                defaultZoom={zoom}
                onClick={handleClick}
            >

                {pins.map((pin, idx) => {
                    return <AnyReactComponent
                        key={idx}
                        {...pin}
                        text="🐻"
                    />
                })}
            </GoogleMapReact>
        </div>
    )
}

//AIzaSyC7slhrpbG9JzV8M5QCnZS7K2ALrniSKtQ