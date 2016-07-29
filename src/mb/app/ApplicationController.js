import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "gd/service/ServiceClient";

import Application from "./Application";
import MapViewController from "../map/MapViewController";
import Model from "../model/Model";
import POISearchViewController from "../view/POISearchViewController";

export default class ApplicationController extends AdaptiveApplicationController {
    init() {
        super.init();
    }

    afterInit() {
        super.afterInit();
        this._initModel();
        this._initMapViewController();
        this._initPOISearchViewController();
    }

    _initModel() {
        const model = new Model();
        sap.ui.getCore().setModel(model);
        this.setModel(model);
    }

    createView(options) {
        return new Application(options);
    }

    _initMapViewController() {
        this.mapViewController = new MapViewController();
        this.addChildViewController(this.mapViewController);
    }

    _initPOISearchViewController() {
        this.poiSearchViewController = new POISearchViewController();
        this.addChildViewController(this.poiSearchViewController);
    }

    run() {
        ServiceClient.getInstance().attachReady(() => {
            // this.view.mapView.searchRoute([31.9790247, 118.7548084], [32.04376, 118.77871]);
        });
    }
}
