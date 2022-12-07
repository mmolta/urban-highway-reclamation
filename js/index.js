import { clickNav, clickToTop } from "./home.js";
import initMap from "./map/map.js";
import projectsLayer from './map/layers.js'
import sources from './map/sources.js'
import { hoverProject, unHoverProject } from "./map/mapEvents.js";

const main = document.getElementById('main')
const toTop = document.getElementById('to-top')
const navBtns = document.querySelectorAll('.nav-btn')
const mapList = document.getElementById('map-list')

// default state
localStorage.setItem('project-hovered', '')

// default interactions
navBtns.forEach(btn => btn.onclick = e => clickNav(e))

const observer = clickToTop(toTop)
observer.observe(main)

// @MAP TODOS:
//     - only render USA (?)
//     stripped down basemap (?)

// const map = initMap()

// map.on('load', () => {
//     map.addSource('projects', sources.projects)
//     map.addLayer(projectsLayer)


//     map.on('mouseenter', 'project-circles', e => hoverProject(e, map))
//     map.on('mouseleave', 'project-circles', () => unHoverProject(map))

mapList.onmouseover = e => {
    let listItem;

    switch(e.target.nodeName) {
        case 'STRONG':
            listItem = e.target.parentElement
        case 'SMALL':
            listItem = e.target.parentElement
            break
        case 'UL':
            return
        default:
            listItem = e.target
    }

    // need a no-maintenance way to get corresponding elements
    const shimE = {
        features: [
            {
                id: e.dataCircleId
            }
        ]
    }
}

//     // @TODO: apply hover and unhover state to list items
//     map.on('click', 'project-circles', e => clickProjectCircle(e))
// })

// click state applies to:
    // clicking on project circles
const clickProjectCircle = e => {

}