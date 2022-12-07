import completed from "./completed.js";
import future from "./future.js";
import { clickNav, clickToTop } from "./home.js";
import { populateCompleted, populateFuture } from "./makeProjects.js";
import projectsLayer from './map/layers.js'
import projectsSource from './map/sources.js'

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

// @MAP TODOS:
    // - only render USA
    // much simpler style (render as little info as possible)

// const map = initMap()

// map.on('load', () => {
//     map.addLayer(projectsLayer(projectsSource))
// })