import makeProjectPopup from './popupContent.js'

// hover events
const hoverProject = (e, map, popup)  => {
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

        if(e.lngLat) {
            popup
                .setLngLat(e.lngLat)
                .setHTML(`<h3 class="hover-popup-title">${hoveredId}</h3>`)
                .addTo(map)
        }

        localStorage.setItem('project-hovered', hoveredId)
    }
}

const unHoverProject = (map, popup) => {
    let hoveredId = localStorage.getItem('project-hovered')

    map.getCanvas().style.cursor = '';

    if (hoveredId.length) {
        map.setFeatureState(
            { source: 'projects', sourceLayer: 'projects-3w0wjb', id: hoveredId },
            { hover: false }
        );
    }

    popup.remove()

    localStorage.setItem('project-hovered', null)
}

// click events
const clickProjectCircle = (e, map, popup) => {
    popup.remove()

    const project = e.features[0].properties

    const html = makeProjectPopup(project)

    popup
    .setLngLat(e.lngLat || project.coords)
    .setDOMContent(html)
    .addTo(map)
}

export { hoverProject, unHoverProject, clickProjectCircle }