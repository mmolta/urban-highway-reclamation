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
localStorage.setItem('project-clicked', '')

// default interactions
navBtns.forEach(btn => btn.onclick = e => clickNav(e))

const observer = clickToTop(toTop)
observer.observe(main)

// @MAP TODOS:
//     - only render USA (?)
//     stripped down basemap (?)

const map = initMap()
const popup = new mapboxgl.Popup()

map.on('load', () => {
    map.addSource('projects', sources.projects)
    map.addLayer(projectsLayer)


    map.on('mouseenter', 'project-circles', e => hoverProject(e, map))
    map.on('mouseleave', 'project-circles', () => unHoverProject(map))

    // @TODO: apply hover and unhover state to list items
    map.on('click', 'project-circles', e => clickProjectCircle(e, map))
})

// click state applies to:
    // clicking on project circles

const makeCompletedHTML = props => {
    return `
        <ul class="list-unstyled popup-list popup-${props.type}">
            <li>
                <h3 class="popup-title">${props.name}</h3>
                <h4 class="popup-subtitle">${props.location}</h4>
            </li>

            <li>
                duration: ${props.duration}
            </li>

            <li>
                cost: $${props.cost} million
            </li>

            <li>
                return: $${props.return} billion
            </li>

            <li>
                <a href="${props.link}" target="_blank" rel="noopener noreferrer">view project</a>
            </li>
        </ul>
    `
}

const makePlannedHTML = props => {
    return `
        <ul class="list-unstyled popup-list popup-${props.type}">
            <li>
                <h3 class="popup-title">${props.name}</h3>
                <h4 class="popup-subtitle">${props.location}</h4>
            </li>

            <li>
                <a href="${props.link}" target="_blank" rel="noopener noreferrer">view proposal</a>
            </li>
        </ul>
    `
}
const clickProjectCircle = (e, map) => {
    const project = e.features[0].properties
    const html = project.type === 'completed' ? makeCompletedHTML(project) : makePlannedHTML(project)

    popup
    .setLngLat(e.lngLat)
    .setHTML(html)
    .addTo(map)
}

// this is horseshit
// new plan: build the list from rendered features
        // attach data-id and click handler at creation
    // const circleFeatures = map.queryRenderedFeatures({
    //     layers: ['project-circles']
    // })

    /*
        source: "mmolta.2i15axa1"
        source_name: "projects-3w0w"
    */

    // how the fuck is this an empty array. hoverState uses the same source - sourceLayer
    // and GETS THE FEATURES I NEED WHAT THE FUCK
    // const features = map.querySourceFeatures('projects', {
    //     sourceLayer: 'projects-3w0wjb'
    // });


    // mapList.onmouseover = e => {
    //     let listItem;

    //     switch(e.target.nodeName) {
    //         case 'STRONG':
    //             listItem = e.target.parentElement
    //         case 'SMALL':
    //             listItem = e.target.parentElement
    //             break
    //         case 'UL':
    //             return
    //         default:
    //             listItem = e.target
    //     }

    //     // need a no-maintenance way to get corresponding elements
    //     const shimE = {
    //         features: [
    //             {
    //                 id: e.dataCircleId
    //             }
    //         ]
    //     }
    // }