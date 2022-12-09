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
        <ul class="list-unstyled popup-list popup-${props.type}">
            <li>
                <h3 class="popup-title">${props.name}</h3>
                <h4 class="popup-subtitle">${props.location}</h4>
            </li>
            
            <li>
                length: ${props.length} miles
            </li>

            <li>
                cost: $${props.cost} million
            </li>

            <li>
                impact: ${props.impact}
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
    .setLngLat(e.lngLat || project.coords)
    .setHTML(html)
    .addTo(map)
}

export { hoverProject, unHoverProject, clickProjectCircle }