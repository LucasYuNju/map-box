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
            selectedPoi: null
        });
        sap.ui.getCore().setModel(model);
    }

    createView(options)
    {
        return new Application(options);
    }

    run()
    {
        // this.view.PoiSearchView.attachInput(() => {
        //     console.log(this.view.PoiSearchView.keyword);
        //     // ServiceClient.getInstance().searchPoiAutocomplete("南京大学");
        // });
        ServiceClient.getInstance().attachReady(() => {
            this.view.mapView.searchRoute([31.9790247, 118.7548084], [32.04376, 118.77871]);
        });
    }
}
