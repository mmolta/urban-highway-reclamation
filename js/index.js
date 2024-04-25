import { clickNav, clickToTop, makeProjectListItems, hoverMapList, clickMapList } from "./home.js";
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
localStorage.setItem('circle-features', '')

// default interactions
navBtns.forEach(btn => btn.onclick = e => clickNav(e))

const observer = clickToTop(toTop)
observer.observe(main)

const map = initMap()
const popup = new mapboxgl.Popup()
const hoverPopup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
})

map.on('load', () => {
    map.addSource('projects', sources.projects)
    map.addLayer(projectsLayer)

    map.on('mouseenter', 'project-circles', e => hoverProject(e, map, hoverPopup))
    map.on('mouseleave', 'project-circles', () => unHoverProject(map, hoverPopup))

    map.on('click', 'project-circles', e => clickProjectCircle(e, map, popup))

    // wait for a completed sourcedata content event
    map.on('sourcedata', e => {
        const loaded = e.isSourceLoaded
        const visibilityEvent = e.sourceDataType
        const listLoaded = localStorage.getItem('list-loaded')

        if(!visibilityEvent && !listLoaded && loaded) {
            const circleFeatures = map.queryRenderedFeatures({
                layers: ['project-circles']
            })
            
            const features = circleFeatures.map(features => {
                const coords = {coords: features.geometry.coordinates}
                
                return {
                    id: features.id,
                    props: {...features.properties, ...coords}
                }
            })

            makeProjectListItems(features, mapList)
            localStorage.setItem('list-loaded', true)
            localStorage.setItem('circle-features', JSON.stringify(features))
        }
    })
    
    mapList.onmouseover = e => hoverMapList(e, hoverProject, map, hoverPopup)
    mapList.onmouseleave = () => unHoverProject(map, hoverPopup)
    mapList.onclick = e => clickMapList(e, map, popup)

    map.on('zoomend', () => {
        const projectClicked = localStorage.getItem('project-clicked')

        if(projectClicked.length) {
            clickProjectCircle(JSON.parse(projectClicked), map, popup)
        }

        localStorage.setItem('project-clicked', '')
    })
})