import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import NaviLayer from "./layer/NaviLayer";
import ServiceClient from "gd/service/ServiceClient";

export default class MapView extends AdaptiveMapView
{
    metadata = {
        properties: {
            selectedPoi: { type: "object", bindable: true },
        },
        events: {
            mapClick: { parameters: { location: "object" } }
        }
    };

    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-map-view");
    }

    _initMap()
    {
        super._initMap();
        this.map.on("click", e => {
            if (e.originalEvent.shiftKey)
            {
                this.fireMapClick(e.latlng);
            }
        });
    }

    initLayers()
    {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);
        this.naviLayer = new NaviLayer();
        this.addLayer(this.naviLayer);
    }

    setSelectedPoi(poi)
    {
        if (poi)
        {
            L.popup()
                .setLatLng(poi.location)
                .setContent(poi.name)
                .openOn(this.map);
            this.setCenterLocation(poi.location);
        }
    }
}
