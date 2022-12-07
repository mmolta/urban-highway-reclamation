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

localStorage.setItem('project-hovered', '')

// default content
populateCompleted(completedProjects, completed)
populateFuture(futureProjects, future)

// default interactions
navBtns.forEach(btn => btn.onclick = e => clickNav(e))

const observer = clickToTop(toTop)
observer.observe(main)

// @MAP TODOS:
//     - only render USA (?)
//     stripped down basemap (?)

const map = initMap()

map.on('load', () => {
    map.addSource('projects', sources.projects)
    map.addLayer(projectsLayer)

    map.on('mouseenter', 'project-circles', e => hoverProject(e))
    map.on('mouseleave', 'project-circles', () => unHoverProject())

    // @TODO: apply hover and unhover state to list items
})

// hover state applies to:
    // hovering on list items
    // hovering on project circles
const hoverProject = e  => {
    let hoveredId = localStorage.getItem('project-hovered')
    
    map.getCanvas().style.cursor = 'pointer'

    if (e.features.length > 0) {
        
        // check and remove old hover state
        if (hoveredId.length) {
            map.setFeatureState(
                { source: 'projects', sourceLayer: 'projects-3w0wjb', id: hoveredId },
                { hover: false }
            );
        }

        hoveredId = e.features[0].id;

        console.log('what the fuck ', e.features[0])

        // add new hover state
        map.setFeatureState(
            { source: 'projects', sourceLayer: 'projects-3w0wjb', id: hoveredId },
            { hover: true }
        );

        localStorage.setItem('project-hovered', hoveredId)
    }
}

const unHoverProject = () => {
    let hoveredId = localStorage.getItem('project-hovered')

    map.getCanvas().style.cursor = '';

    if (hoveredId.length) {
        map.setFeatureState(
            { source: 'projects', sourceLayer: 'projects-3w0wjb', id: hoveredId },
            { hover: false }
        );
    }

    localStorage.setItem('project-hovered', null)
}

// click state applies to:
    // clicking on project circles
const clickProject = e => {

}