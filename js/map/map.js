mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

const initMap = () => {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [-96, 37.8],
        zoom: 4,
        maxBounds: [
            [-148.253905,11.551389],
            [-44.894530,56.847727]
        ]
    })

    const navigationControl = new mapboxgl.NavigationControl();

    map.addControl(navigationControl)
    map.fitBounds([
        [-135.2097, 19.1965],
        [-51.4200, 52.8056]
    ])

    return map
}

export default initMap