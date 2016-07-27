import AdaptiveApplication from "sap/a/app/Application";

import MapView from "../map/MapView";

export default class Application extends AdaptiveApplication
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-app");
        this._initMapView();
        this._initSearchView();
    }

    _initMapView()
    {
        this.mapView = new MapView("map-view", {
            defaultZoom: 10
        });
        this.addSubview(this.mapView);
    }

    _initSearchView()
    {
        // this.poiSearchView = new PoiSearchView("poi-search-view");
        // this.addSubview(this.poiSearchView);
    }
}
