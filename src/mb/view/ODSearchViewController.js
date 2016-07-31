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
        this.originController = new POISearchViewController({
            poiPath: "/originPoi",
            viewOptions: {
                placeHolder: "请输入起点",
            }
        });
        this.addChildViewController(this.originController, this.view.$("> .od-search-form"));
        this.destController = new POISearchViewController({
            poiPath: "/destPoi",
            viewOptions: {
                placeHolder: "请输入终点",
            }
        });
        this.addChildViewController(this.destController, this.view.$("> .od-search-form"));
    }

    _onSwapOD(e) {
        const from = this.originController.view.getKeyword();
        const to = this.destController.view.getKeyword();
        this.originController.view.setKeyword(to);
        this.destController.view.setKeyword(from);
    }
}
