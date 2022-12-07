import { clickNav, clickToTop } from "./home.js";
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

// default interactions
navBtns.forEach(btn => btn.onclick = e => clickNav(e))

const observer = clickToTop(toTop)
observer.observe(main)

const map = initMap()

const getListItem = e => {
    switch(e.target.nodeName) {
        case 'STRONG':
            return e.target.parentElement
        case 'SMALL':
            return e.target.parentElement
        case 'UL':
            return e.target.children[e.target.children.length - 1]
        default:
            return e.target
    }
}

const makeProjectListItems = (features, list) => {
    const frag = document.createDocumentFragment()

    features.forEach(feature => {
        const li = document.createElement('li')
        const title = document.createElement('strong')
        const br = document.createElement('br')
        const subtitle = document.createElement('small')
    
        li.dataset.circleid = feature.id
        li.classList.add('map-list-item')
    
        title.textContent = feature.properties.name
        subtitle.textContent = feature.properties.location
    
        li.appendChild(title)
        li.appendChild(br)
        li.appendChild(subtitle)
        
        frag.appendChild(li)
    })

    list.appendChild(frag)
}

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

        if(!visibilityEvent && loaded) {
            const circleFeatures = map.queryRenderedFeatures({
                layers: ['project-circles']
            })
            
            makeProjectListItems(circleFeatures, mapList)
        }
    })

    // @NOTE:
    mapList.onmouseover = e => {
        const listItem = getListItem(e)

        const shimE = {
            features: [
                {
                    id: listItem.dataset.circleid
                }
            ]
        }

        hoverProject(shimE, map)
    }

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


    