import completed from "./completed.js";
import future from "./future.js";
import { clickNav, clickToTop } from "./home.js";
import { populateCompleted, populateFuture } from "./makeProjects.js";
import projects from './map/projectsLayer.js'

const main = document.getElementById('main')
const completedProjects = document.getElementById('completed-projects')
const futureProjects = document.getElementById('future-projects')
const toTop = document.getElementById('to-top')
const navBtns = document.querySelectorAll('.nav-btn')

populateCompleted(completedProjects, completed)
populateFuture(futureProjects, future)

// nav
navBtns.forEach(btn => btn.onclick = e => clickNav(e))

// to top jawn
const observer = clickToTop(toTop)

observer.observe(main)


// @TEST MAP
mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

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

    return map
}

// @MAP TODOS:
    // - only render USA
    // much simpler style (render as little info as possible)
    // disable scrolling / other interactions

const map = initMap()

map.on('load', () => {
    // @TODO: add map layers 
    // for(const source in sources) map.addSource(source, sources[source])
    // for(const layer in mapLayers) map.addLayer(mapLayers[layer])
    map.addLayer(projects)
})