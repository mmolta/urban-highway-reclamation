const projectsLayer = {
    id: 'project-circles',
    type: 'circle',
    source: 'projects',
    'source-layer': 'projects-3w0wjb',
    paint: {
        'circle-radius': ['case',
            ['boolean', ['feature-state', 'hover'], false],
            12,
            8
        ],
        'circle-color': ['match',
            ['get', 'type'],
            'completed', '#1D7874',
            'developing', '#EFCB68',
            'planned', '#BDADEA',
            '#fff'
        ],
        'circle-stroke-width': ['case',
            ['boolean', ['feature-state', 'hover'], false],
            2,
            1
        ],
        'circle-stroke-color': '#FDFFFC',
        'circle-stroke-opacity': 1,
    }
}

export default projectsLayer