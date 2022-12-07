// @TODO: add hover Feature state
const projectsLayer = {
    id: "projects",
    type: "circle",
    source: 'projects',
    'source-layer': 'projects-3w0wjb',
    paint: {
        "circle-radius": 5,
        "circle-color": ["match",
            ["get", "type"],
            "completed", "#1D7874",
            "planned", "#EFCB68",
            "#fff"
        ],
        "circle-stroke-width": 1.25,
        "circle-stroke-color": ["match",
            ["get", "type"],
            "completed", "#4B7F52",
            "planned", "#FDFFFC",
            "#fff"
        ],
        "circle-stroke-opacity": 0.9,
    }
}

export default projectsLayer