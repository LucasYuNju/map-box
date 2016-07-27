import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import NaviLayer from "./layer/NaviLayer";
import PoiLayer from "./layer/PoiLayer";
import ServiceClient from "gd/service/ServiceClient";

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
        this.poiLayer = new PoiLayer();
        this.addLayer(this.poiLayer);
        // this.naviLayer = new NaviLayer();
        // this.addLayer(this.naviLayer);
    }

    searchRoute(startLocation, endLocation)
    {
        this.naviLayer.applySettings({
            startLocation,
            endLocation
        });

        this.naviLayer.fitBounds();

        ServiceClient.getInstance()
            .searchDrivingRoute([startLocation, endLocation])
            .then((result) => {
                this.naviLayer.drawRoutes(result);
            });
    }

    setPoi(poi)
    {
        this.setCenterLocation(poi.location);
        this.poiLayer.setPoi(poi);
    }
}
