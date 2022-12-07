// @TODO: add hover Feature state to increase size of 
const projectsLayer = {
    id: "projects",
    type: "circle",
    source: 'projects',
    'source-layer': 'projects-3w0wjb',
    paint: {
        "circle-radius": ['case',
            ['boolean', ['feature-state', 'hover'], false],
            5,
            8
        ],
        "circle-color": ["match",
            ["get", "type"],
            "completed", "#1D7874",
            "planned", "#EFCB68",
            "#fff"
        ],
        "circle-stroke-width": 1,
        "circle-stroke-color": "#FDFFFC",
        "circle-stroke-opacity": 1,
    }
}

export default projectsLayer