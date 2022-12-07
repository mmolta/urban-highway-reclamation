import completed from "./completed.js";
import future from "./future.js";
import { clickNav, clickToTop } from "./home.js";
import { populateCompleted, populateFuture } from "./makeProjects.js";
import initMap from "./map/map.js";
import projectsLayer from './map/layers.js'
import sources from './map/sources.js'

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

// @MAP TODOS:
    // - only render USA
    // much simpler style (render as little info as possible)

const map = initMap()

map.on('load', () => {
    map.addSource('projects', sources.projects)
    map.addLayer(projectsLayer)
})