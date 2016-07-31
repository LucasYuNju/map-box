import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "gd/service/ServiceClient";
import Util from "gd/service/Util";

import Application from "./Application";
import MapViewController from "../map/MapViewController";
import Model from "../model/Model";
import ODSearchViewController from "../view/ODSearchViewController";
import POISearchViewController from "../view/POISearchViewController";

export default class ApplicationController extends AdaptiveApplicationController {
    init() {
        super.init();
    }

    afterInit() {
        super.afterInit();
        this._initModel();
        this._initMapViewController();
        // this._initPOISearchViewController();
        this._initODSearchViewController();
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

    _initODSearchViewController() {
        // TODO ODController如何通知ApplicationController比较好
        this.odSearchViewController = new ODSearchViewController();
        this.addChildViewController(this.odSearchViewController);
        this.odSearchViewController.view.attachSearchOD(this._onSearchOD.bind(this));
    }

    _onSearchOD(e) {
        const model = sap.ui.getCore().getModel();
        const originPoi = model.getProperty("/originPoi");
        const destPoi = model.getProperty("/destPoi");
        const origin = {
            lat: 32.04386024904109, lng: 118.77893458197231
        };
        const dest = {
            lat: 31.978337788573146, lng: 118.75630314846165
        };
        this.mapViewController.searchRoute(origin, dest);
        // this.mapViewController.searchRoute(originPoi.location, destPoi.location);
    }

    run() {
        ServiceClient.getInstance().attachReady(() => {
        });
    }
}
