mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

// @TODO home icon to zoom back to USA?
const initMap = () => {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-96, 37.8],
        zoom: 4
    })

    const navigationControl = new mapboxgl.NavigationControl();

    map.addControl(navigationControl)

    map.fitBounds([
        [ -125.0011, 24.9493 ],
        [ -66.9326, 49.5904 ]
    ])

    map.scrollZoom.disable()

    return map
}

export default initMap