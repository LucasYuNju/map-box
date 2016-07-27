import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "gd/service/ServiceClient";

import Application from "./Application";

export default class ApplicationController extends AdaptiveApplicationController
{
    init()
    {
        super.init();
        this._initModel();
    }

    _initModel()
    {
        const model = new sap.ui.model.json.JSONModel({
            selectedPoi: null,
            queryPoi: null,
        });
        sap.ui.getCore().setModel(model);
    }

    bindModel()
    {
        const model = sap.ui.getCore().getModel();
        model.bindProperty("/selectedPoi").attachChange(() => {
            const poi = model.getProperty("/selectedPoi");
            this._onSelectedPoiChanged(poi);
        });
    }

    createView(options)
    {
        return new Application(options);
    }

    run()
    {
        ServiceClient.getInstance().attachReady(() => {
            // this.view.mapView.searchRoute([31.9790247, 118.7548084], [32.04376, 118.77871]);
        });
    }

    _onSelectedPoiChanged(poi)
    {
        if (poi !== null)
        {
            this.view.mapView.setPoi(poi);
        }
    }
}
