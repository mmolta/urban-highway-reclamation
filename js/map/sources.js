// @TODO put id on features for hover state
// @TODO create own tileset? https://studio.mapbox.com/tilesets/
// @TODO use mapbox country boundaries tilese to ONLY render USA..?
    // https://studio.mapbox.com/tilesets/mapbox.country-boundaries-v1/#2.73/30.28/-77.83
const projectsSource = {
    "type": "FeatureCollection",
    "name": "projects",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::26912" } },
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Inner Loop Jawn",
                "location": "Rochester, New York",
                "duration": "",
                "type": "completed",
                "cost": 0,
                "return": 0,
                "link": ""
            },
            "geometry": { "type": "Point", "coordinates": [43.158985, -77.595756] }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Park East Corridor",
                "location": "Milwaukee, Wisconsin",
                "duration": "",
                "type": "completed",
                "cost": 25,
                "return": 2,
                "link": "https://www.milwaukeeindependent.com/syndicated/park-east-corridor-freeway-teardown-helped-put-milwaukee-national-stage-summer/"
            },
            "geometry": { "type": "Point", "coordinates": [43.042932, -87.899371]}
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Alaskan Way Viaduct",
                "location": "Seattle, Washington",
                "type": "planned",
                "link": "https://www.cnu.org/what-we-do/build-great-places/terminal-island-freeway"
            },
            "geometry": { "type": "Point", "coordinates": [43.042932, -87.899371]}
        }
    ]
};

export default projectsSource