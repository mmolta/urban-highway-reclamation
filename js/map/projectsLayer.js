// @TODO: current vs future project distinction

const projectsLayer = {
    type: "FeatureCollection",
    name: "VisitorAttractions_All",
    crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    features: [
        {
            type: "Feature",
            properties: {
                name: 'Inner Loop Jawn',
                location: 'Rochester, New York',
                duration: '',
                type: '',
                cost: 0,
                return: 0,
                link: ''
            },
            geometry: { type: "Point", coordinates: [43.158985, -77.595756] }
        },
        {
            type: 'Feature',
            properties: {
                name: 'Park East Corridor',
                location: 'Milwaukee, Wisconsin',
                duration: '',
                type: '',
                cost: 25,
                return: 2,
                link: 'https://www.milwaukeeindependent.com/syndicated/park-east-corridor-freeway-teardown-helped-put-milwaukee-national-stage-summer/'
            },
            geometry: { type: 'Point', coordinates: [43.042932, -87.899371]}
        }
    ]
}

export default projectsLayer