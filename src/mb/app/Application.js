import AdaptiveApplication from "sap/a/app/Application";

import MapView from "../map/MapView";
import PoiSearchView from "../view/PoiSearchView";
import PoiSearchViewController from "../view/PoiSearchViewController";

export default class Application extends AdaptiveApplication
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-app");
        this._initMapView();
        this._initPoiSearchView();
    }

    _initMapView()
    {
        this.mapView = new MapView("map-view", {
            defaultZoom: 10
        });
        this.addSubview(this.mapView);
    }

    _initPoiSearchView()
    {
        this.poiSearchViewController = new PoiSearchViewController();
        this.poiSearchView = this.poiSearchViewController.view;
        this.addSubview(this.poiSearchView);
    }
}
