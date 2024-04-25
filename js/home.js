// navigation events
const sections = {
    background: null,
    projects: null,
    glossary: null,
    disclaimer: null,
    references: null
}

const clickNav = e => {
    const section = e.target.dataset.navto

    if(!sections[section]) sections[section] = document.getElementById(section)

    const el = sections[section]

    el.scrollIntoView({behavior: 'smooth'})
}

const clickToTop = toTop => {
    return new IntersectionObserver(el => {
        if(el[0].isIntersecting) {
            toTop.style.opacity = '100%'
        }
        else {
            toTop.style.opacity = '0%'
        }
    }, { threshold: [0.1] })
}

// list items events
const makeProjectListItems = (features, list) => {
    const frag = document.createDocumentFragment()

    features.forEach(feature => {
        const li = document.createElement('li')
        const title = document.createElement('strong')
        const br = document.createElement('br')
        const subtitle = document.createElement('small')
    
        li.dataset.circleid = feature.id
        li.classList.add('map-list-item')
    
        title.textContent = feature.props.name
        subtitle.textContent = feature.props.location
    
        li.appendChild(title)
        li.appendChild(br)
        li.appendChild(subtitle)
        
        frag.appendChild(li)
    })

    list.appendChild(frag)
}

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

const hoverMapList = (e, hoverProject, map) => {
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

const clickMapList = (e, map, popup) => {
    const listItem = getListItem(e)
    const featuresString = localStorage.getItem('circle-features')
    const features = JSON.parse(featuresString)

    // == because comparing string and int
    const project = features.filter(el => el.id == listItem.dataset.circleid)
    
    if(project.length){
        popup.remove()

        // fake a map event object
        const shimE = {
            features: [
                {properties: project[0].props}
            ]
        }

        localStorage.setItem('project-clicked', JSON.stringify(shimE))

        map.flyTo({
            center: shimE.features[0].properties.coords,
            zoom: 8,
            padding: {bottom: 175}
        })
    }
}

export { clickNav, clickToTop, makeProjectListItems, hoverMapList, clickMapList }