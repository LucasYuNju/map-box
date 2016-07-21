import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ExampleLayer from "./layer/ExampleLayer";
import LocationService from "gd/service/ServiceClient";

export default class MapView extends AdaptiveMapView
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-map-view");
    }

    initLayers()
    {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);

        this.exampleLayer = new ExampleLayer({
            startLocation: [31.9790247, 118.7548084],
            endLocation: [32.04376, 118.77871]
        });
        this.addLayer(this.exampleLayer);
        this.exampleLayer.drawRoute();

        this.exampleLayer.fitBounds();
    }

    searchRoute(startLocation, endLocation, callback)
    {
        this.exampleLayer.applySettings({
            startLocation,
            endLocation
        });

        // convert to Amap location
        LocationService.toMars([startLocation, endLocation], (result) => {
            const driving = new AMap.Driving();
            driving.search(result[0], result[1], (status, result) => {
                console.log("search", status, result);
                // convert result to
                const steps = result.routes[0].steps;
                const latlngs = steps.map(step => {
                    return step.path.map(loc => {
                        return LocationService.to84(loc.lat, loc.lng);
                    });
                });
                this.exampleLayer.drawRoutes(latlngs);
            });
        });
    }
}
