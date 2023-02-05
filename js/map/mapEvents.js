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

const makeCompletedHTML = props => {
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
    `
}
const makeProposedHTML = props => {
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
                    <a href="${props.link}" target="_blank" rel="noopener noreferrer">view ${props.type === 'developing' ? 'project' : 'proposal'}</a>
                </li>
            </ul>
        </div>
    `
}
const clickProjectCircle = (e, map) => {
    const project = e.features[0].properties
    const html = project.type === 'completed' ? makeCompletedHTML(project) : makeProposedHTML(project)

    popup
    .setLngLat(e.lngLat || project.coords)
    .setHTML(html)
    .addTo(map)
}

export { hoverProject, unHoverProject, clickProjectCircle }