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
    const div = document.createElement('div')
    const title = document.createElement('h3')
    const subtitle = document.createElement('h4')

    div.classList.add('popup-header', `popup-${props.type}`)
    title.classList.add('popup-title')
    subtitle.classList.add('popup-subtitle')

    title.textContent = props.name
    subtitle.textContent = props.location

    div.appendChild(title)
    div.appendChild(subtitle)

    return div
}

const makeFigure = props => {
    const fig = document.createElement('figure')
    const img = document.createElement('img')
    const capt = document.createElement('figcaption')
    const a = document.createElement('a')

    fig.classList.add('popup-figure')
    img.classList.add('popup-img')
    capt.classList.add('popup-figcaption')
    
    img.src = props.imgSrc
    img.alt = `${props.name} photo`
    a.href = props.imgLink
    a.target = "_blank"
    a.rel = "noopener noreferrer"
    a.textContent = props.caption
    capt.textContent = 'credit: '

    capt.appendChild(a)
    fig.appendChild(img)
    fig.appendChild(capt)

    return fig
}

const makeImpactList = impact => {
    const ul = document.createElement('ul')
    const lis = impact.split('--').map(i => `<li>${i}</li>`).join('')
    
    ul.insertAdjacentHTML('afterbegin', lis)

    return ul
}

const makeCompletedList = props => {
    const ul = document.createElement('ul')
    const len = document.createElement('li')
    const cost = document.createElement('li')
    const impact = document.createElement('li')
    const link = document.createElement('li')
    const a = document.createElement('a')

    const impactBody = makeImpactList(props.impact)

    ul.classList.add('list-unstyled', 'popup-list')

    len.textContent = `length: ${props.length} miles`
    cost.textContent = `cost: $${props.cost} ${props.name != 'The Big Dig' ? 'million' : 'billion'}`
    impact.textContent = `impact: `
    a.textContent = 'view project'
    
    a.href = props.link
    a.target = "_blank"
    a.rel = "noopener noreferrer"

    impact.appendChild(impactBody)
    link.appendChild(a)
    ul.appendChild(len)
    ul.appendChild(cost)
    ul.appendChild(impact)
    ul.appendChild(link)

    return ul
}

const makePlannedList = props => {

}

const makePopupBody = (props, type) => {
    const div = document.createElement('div')
    const fig = makeFigure(props)
    let list;
    
    switch(type) {
        case 'completed':
            list = makeCompletedList(props)
            break
        default:
            list = makePlannedList(props)
    }

    div.classList.add('flex-row', 'flex-align-start')

    div.appendChild(fig)
    div.appendChild(list)

    return div
}

const makeProjectPopup = (props, type) => {
    const popup = document.createElement('div')

    const title = makeTitle(props)
    const content = makePopupBody(props, type)

    popup.classList.add('popup-div')

    popup.appendChild(title)
    popup.appendChild(content)

    return popup
}

const makeCompletedHTML = props => {
    return `
        <div class="popup-div">
            <div class="popup-header popup-${props.type}">
                <h3 class="popup-title">${props.name}</h3>
                <h4 class="popup-subtitle">${props.location}</h4>
            </div>
            <div class="flex-row">    
                <ul class="list-unstyled popup-list">  
                    <li>
                        <figure class="popup-figure">
                            <img src="${props.imgSrc}" alt="${props.name} photo" class="popup-img" />
                            <figcaption class="popup-figcaption">credit: <a href="${props.imgLink}" target="_blank" rel="noopener noreferrer">${props.caption}</a></figcaption>
                        </figure>
                    </li>
                    <li>
                        length: ${props.length} miles
                    </li>
                    <li>
                        cost: $${props.cost} ${props.name != 'The Big Dig' ? 'million' : 'billion'}
                    </li>
                    <li>
                        impact:<ul>${props.impact.split('--').map(i => `<li>${i}</li>`).join('')}</ul>
                    </li>
                    <li>
                        <a href="${props.link}" target="_blank" rel="noopener noreferrer">view project</a>
                    </li>
                </ul>    
            </div>
        </div>
    `
}

const makePlannedHTML = props => {
    return `
        <div class="popup-div">
            <div class="popup-header popup-${props.type}">
                <h3 class="popup-title">${props.name}</h3>
                <h4 class="popup-subtitle">${props.location}</h4>
            </div>
            <ul class="list-unstyled popup-list">
                <li>
                    <figure class="popup-figure">
                        <img src="${props.imgSrc}" alt="${props.name} photo" class="popup-img" />
                        <figcaption class="popup-figcaption">credit: <a href="${props.imgLink}" target="_blank" rel="noopener noreferrer">${props.caption}</a></figcaption>
                    </figure>
                </li>
                <li>
                    details:<ul>${props.details.split('--').map(i => `<li>${i}</li>`).join('')}</ul>
                </li>
                <li>
                    <a href="${props.link}" target="_blank" rel="noopener noreferrer">view ${props.type === 'developing' ? 'project' : 'plan'}</a>
                </li>
            </ul>
        </div>
    `
}

const clickProjectCircle = (e, map) => {
    const project = e.features[0].properties
    const html = project.type === 'completed' ? makeProjectPopup(project, project.type) : makePlannedHTML(project)

    // makeProjectPopup(project, project.type)

    popup
    .setLngLat(e.lngLat || project.coords)
    .setDOMContent(html)
    .addTo(map)
}

export { hoverProject, unHoverProject, clickProjectCircle }