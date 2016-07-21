import AdaptiveApplication from "sap/a/app/Application";

import MapView from "../map/MapView";
import ExampleLayer from "../map/layer/ExampleLayer"

export default class Application extends AdaptiveApplication
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-app");
        this._initMapView();
    }

    _initMapView()
    {
        this.mapView = new MapView("map-view", {
            defaultZoom: 10
        });
        this.addSubview(this.mapView);

        
    }
}
