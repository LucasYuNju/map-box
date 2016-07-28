import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "gd/service/ServiceClient";

import Application from "./Application";
import MapViewController from "../map/MapViewController";
import Model from "../model/Model";
import PoiSearchViewController from "../view/PoiSearchViewController";

export default class ApplicationController extends AdaptiveApplicationController
{
    init()
    {
        super.init();
    }

    afterInit()
    {
        super.afterInit();
        this._initModel();
        this._initMapViewController();
        this._initPoiSearchViewController();
    }

    _initModel()
    {
        const model = new Model();
        sap.ui.getCore().setModel(model);

        this.setModel(model);
    }

    createView(options)
    {
        return new Application(options);
    }

    _initMapViewController()
    {
        this.mapViewController = new MapViewController();
        this.addChildViewController(this.mapViewController);
        this.view.mapView = this.mapViewController.view;
    }

    _initPoiSearchViewController()
    {
        this.poiSearchViewController = new PoiSearchViewController();
        this.addChildViewController(this.poiSearchViewController);
        this.view.poiSearchView = this.poiSearchViewController.view;
    }

    run()
    {
        ServiceClient.getInstance().attachReady(() => {
            // this.view.mapView.searchRoute([31.9790247, 118.7548084], [32.04376, 118.77871]);
        });
    }
}
