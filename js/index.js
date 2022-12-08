import { clickNav, clickToTop, makeProjectListItems, hoverMapList } from "./home.js";
import initMap from "./map/map.js";
import projectsLayer from './map/layers.js'
import sources from './map/sources.js'
import { hoverProject, unHoverProject, clickProjectCircle } from "./map/mapEvents.js";

const main = document.getElementById('main')
const toTop = document.getElementById('to-top')
const navBtns = document.querySelectorAll('.nav-btn')
const mapList = document.getElementById('map-list')

// default state
localStorage.setItem('project-hovered', '')
localStorage.setItem('project-clicked', '')
localStorage.setItem('list-loaded', '')

// default interactions
navBtns.forEach(btn => btn.onclick = e => clickNav(e))

const observer = clickToTop(toTop)
observer.observe(main)

const map = initMap()

map.on('load', () => {
    map.addSource('projects', sources.projects)
    map.addLayer(projectsLayer)

    map.on('mouseenter', 'project-circles', e => hoverProject(e, map))
    map.on('mouseleave', 'project-circles', () => unHoverProject(map))

    map.on('click', 'project-circles', e => clickProjectCircle(e, map))

    // wait for a completed sourcedata content event
    map.on('sourcedata', e => {
        const loaded = e.isSourceLoaded
        const visibilityEvent = e.sourceDataType
        const listLoaded = localStorage.getItem('list-loaded')
        console.log(listLoaded)

        // @NOTE: for map click, I could place
        // the circleFeatures on localStorage
        // and then select from there for the mapList click event
            // or just do another queryRendered...
        if(!visibilityEvent && !listLoaded && loaded) {
            const circleFeatures = map.queryRenderedFeatures({
                layers: ['project-circles']
            })
            
            makeProjectListItems(circleFeatures, mapList)
            localStorage.setItem('list-loaded', true)
        }
    })

    mapList.onmouseover = e => hoverMapList(e, hoverProject, map)
    mapList.onmouseleave = () => unHoverProject(map)

    mapList.onclick = e => {
        const listItem = getListItem(e)

        const shimE = {
            features: [
                {
                    id: listItem.dataset.circleid
                }
            ]
        }

        clickProjectCircle(shimE, map)
    }
})