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

map.on('load', () => {
    map.addSource('projects', sources.projects)
    map.addLayer(projectsLayer)


    map.on('mouseenter', 'project-circles', e => hoverProject(e, map))
    map.on('mouseleave', 'project-circles', () => unHoverProject(map))

    // @TODO: apply hover and unhover state to list items
    map.on('click', 'project-circles', e => clickProjectCircle(e, map))

    //map.on('idle') works but fires on every idle. ITS A START THOOOOOO
        // immeidate solution: 
            // exit if mapList.children.length
            // else build list and apply them THANGS
    map.on('styledata', () => {
        const features = map.querySourceFeatures('projects', {
            sourceLayer: 'projects-3w0wjb'
        });
        console.log(features)

        const circleFeatures = map.queryRenderedFeatures({
            layers: ['project-circles']
        })

        console.log(circleFeatures)
    })

    // @NOTE: once the bs with features is sorted, this does work
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


    