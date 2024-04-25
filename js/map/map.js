mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

// const makeExtentCtrls = map => {
//     // create custom button elements
//     const button = document.createElement('button')
//     const icon = document.createElement('img')

//     button.type = 'button'
//     button.title = 'Zoom to country view'
    
//     icon.id = 'regional-extent-img'
//     icon.alt = 'home logo'

//     button.classList.add('mapboxgl-ctrl-icon')

//     button.setAttribute('aria-label', 'Default Map Extent')
//     button.appendChild(icon)
//     button.onclick = () => map.fitBounds(bounds)

//     return button
// }

// @TODO home icon to zoom back to USA?
const initMap = () => {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-96, 37.8],
        zoom: 4,
        maxBounds: [
            [-148.253905,11.551389],
            [-44.894530,56.847727]
        ]
    })

    const navigationControl = new mapboxgl.NavigationControl();
    // const extentControl = makeExtentCtrls(map)
    
    // navigationControl._extent = extentControl
    // navigationControl._container.appendChild(extentControl)

    map.addControl(navigationControl)
    map.fitBounds([
        [ -125.0011, 24.9493 ],
        [ -66.9326, 49.5904 ]
    ])

    return map
}

export default initMap