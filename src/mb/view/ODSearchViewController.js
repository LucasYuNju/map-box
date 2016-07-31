import ViewController from "sap/a/view/ViewController";

import ODSearchView from "./ODSearchView";
import POISearchViewController from "./POISearchViewController";

export default class ODSearchViewController extends ViewController {

    afterInit() {
        super.afterInit();
        this.initChildViewController();
    }

    createView() {
        return new ODSearchView();
    }

    initView() {
        this.view.attachSwapOD(this._onSwapOD.bind(this));
    }

    initChildViewController() {
        this.originController = new POISearchViewController({poiPath: "/originPoi"});
        this.addChildViewController(this.originController, this.view.$("> .od-search-form"));
        this.destController = new POISearchViewController({poiPath: "/destPoi"});
        this.addChildViewController(this.destController, this.view.$("> .od-search-form"));
    }

    _onSwapOD(e) {
        const model = sap.ui.getCore().getModel();
        const originPoi = model.getProperty("/originPoi");
        const destPoi = model.getProperty("/destPoi");
        model.setProperty("/originPoi", destPoi);
        model.setProperty("/destPoi", originPoi);
    }
}
