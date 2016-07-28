import AdaptiveApplication from "sap/a/app/Application";

import MapViewController from "../map/MapViewController";
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
        this.mapViewController = new MapViewController();
        this.mapView = this.mapViewController.view;
        this.addSubview(this.mapView);
    }

    _initPoiSearchView()
    {
        this.poiSearchViewController = new PoiSearchViewController();
        this.poiSearchView = this.poiSearchViewController.view;
        this.addSubview(this.poiSearchView);
    }
}
