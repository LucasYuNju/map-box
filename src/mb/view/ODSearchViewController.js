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
        
    }

    initChildViewController() {
        this.originController = new POISearchViewController({poiPath: "/originPoi"});
        this.addChildViewController(this.originController, this.view.$("> .od-search-form"));
        this.destController = new POISearchViewController({poiPath: "/destPoi"});
        this.addChildViewController(this.destController, this.view.$("> .od-search-form"));
    }
}
