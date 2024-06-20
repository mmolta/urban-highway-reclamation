mapboxgl.accessToken = 'pk.eyJ1IjoibW1tb2x0YSIsImEiOiJjbHhtbWpsdDkwNGJmMmtwdDR3NngxeHN6In0.591dUOKVnfx22BYxu8eqRw'

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

    map.addControl(navigationControl)
    map.fitBounds([
        [-148.253905,11.551389],
        [-44.894530,56.847727]
    ])

    return map
}

export default initMap