// Hover events. Applies to:
// hovering on project circles
    // hovering on list items
const hoverProject = (e, map)  => {
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

        // add new hover state
        map.setFeatureState(
            { source: 'projects', sourceLayer: 'projects-3w0wjb', id: hoveredId },
            { hover: true }
        );

        localStorage.setItem('project-hovered', hoveredId)
    }
}
const unHoverProject = map => {
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



// Click events. Applies to:
    // clicking on project circles
    // clicking on list items
const popup = new mapboxgl.Popup()

const makeTitle = props => {
    const wrapper = document.createElement('div')
    const textWrapper = document.createElement('div')
    const title = document.createElement('h3')
    const subtitle = document.createElement('h4')
    const facts = document.createElement('span')
    let factsText;

    switch(props.type) {
        case 'completed': 
            factsText = `$${props.cost} ${props.name != 'The Big Dig' ? 'million' : 'billion'} | ${props.length} miles`
            break
        default:
            factsText = 'Cost & length TBD'
    }

    wrapper.classList.add('popup-header', `popup-${props.type}`, 'flex-row', 'flex-between', 'flex-align-center')
    title.classList.add('popup-title')
    subtitle.classList.add('popup-subtitle')

    title.textContent = props.name
    subtitle.textContent = props.location
    facts.textContent = factsText

    textWrapper.appendChild(title)
    textWrapper.appendChild(subtitle)
    wrapper.appendChild(textWrapper)
    wrapper.appendChild(facts)

    return wrapper
}

const makeFigure = props => {
    const fig = document.createElement('figure')
    const img = document.createElement('img')
    const capt = document.createElement('figcaption')
    const a = document.createElement('a')
    const projA = document.createElement('a')

    fig.classList.add('popup-figure')
    img.classList.add('popup-img')
    capt.classList.add('popup-figcaption')
    projA.classList.add('project-link', `project-link-${props.type}`)
    
    img.src = props.imgSrc
    img.alt = `${props.name} photo`
    a.href = props.imgLink
    projA.href = props.link
    a.target = "_blank"
    projA.target = "_blank"
    a.rel = "noopener noreferrer"
    projA.rel = "noopener noreferrer"
    
    a.textContent = props.caption
    projA.textContent = 'view project'
    capt.textContent = 'credit: '


    capt.appendChild(a)
    capt.appendChild(projA)
    fig.appendChild(img)
    fig.appendChild(capt)

    return fig
}

const makeImpactList = impact => {
    const ul = document.createElement('ul')
    const lis = impact.split('--').map(i => `<li>${i}</li>`).join('')
    
    ul.classList.add('impact-list')
    ul.insertAdjacentHTML('afterbegin', lis)

    return ul
}

const makeImpactSection = props => {
    const container = document.createElement('section')
    const impact = document.createElement('h4')
    const impactList = makeImpactList(props.impact)

    container.classList.add('impact-container')
    impact.classList.add('impact-header')
    impactList.classList.add('popup-list')

    impact.textContent = `Key impacts: `

    container.appendChild(impact)
    container.appendChild(impactList)

    return container
}

const makePopupBody = props => {
    const container = document.createElement('div')
    const fig = makeFigure(props)
    const impact = makeImpactSection(props)

    container.classList.add('flex-row', 'flex-align-start', 'popup-body')

    container.appendChild(fig)
    container.appendChild(impact)

    return container
}

const makeProjectPopup = props => {
    const popup = document.createElement('div')

    const title = makeTitle(props)
    const content = makePopupBody(props)

    popup.classList.add('popup-div')

    popup.appendChild(title)
    popup.appendChild(content)

    return popup
}

const clickProjectCircle = (e, map) => {
    const project = e.features[0].properties

    const html = makeProjectPopup(project)

    popup
    .setLngLat(e.lngLat || project.coords)
    .setDOMContent(html)
    .addTo(map)
}

export { hoverProject, unHoverProject, clickProjectCircle }