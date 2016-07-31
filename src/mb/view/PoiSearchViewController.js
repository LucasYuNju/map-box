import ServiceClient from "gd/service/ServiceClient";

import ViewController from "sap/a/view/ViewController";

import POISearchView from "./POISearchView";

export default class POISeachViewController extends ViewController {
    constructor(...args)
    {
        this.poiPath = args[0].poiPath;
        super(...args);
    }

    init() {
        super.init();
    }

    createView(options) {
        return new POISearchView(options);
    }

    initView(options) {
        this.view.bindPoi(this.poiPath);

        this.view.attachSearch(this._onSearch.bind(this));
        this.view.attachInput(this._onInput.bind(this));
        this.view.attachArrowKeyUp(this._onArrowKeyUp.bind(this));
        this.view.attachArrowKeyDown(this._onArrowKeyDown.bind(this));
        this.view.attachFocus(this._onFocus.bind(this));
        this.view.attachBlur(this._onBlur.bind(this));

        this.view.suggestionListView.hide();
        this.view.suggestionListView.attachItemClick(this._onSuggestionClick.bind(this));
    }

    _onInput(e) {
        const keyword = this.view.getKeyword();
        if (keyword === "") {
            this.view.suggestionListView.hide();
        }
        else {
            ServiceClient.getInstance().searchPoiAutocomplete(keyword).then(result => {
                if (result.length > 0)
                {
                    this.view.suggestionListView.setItems(result);
                    this.view.suggestionListView.show();
                }
            });
        }
    }

    _onSearch(e) {
        const keyword = this.view.getKeyword();
        ServiceClient.getInstance().searchPoiAutocomplete(keyword).then(result => {
            if (result.length > 0)
            {
                const newPoi = {
                    name: result[0].name,
                    location: result[0].location,
                }
                sap.ui.getCore().getModel().setProperty(this.poiPath, newPoi);
            }
        }, reason => console.log(reason));
    }

    _onArrowKeyUp(e) {
        console.log("up");
        this.view.suggestionListView.selectPrev();
    }

    _onArrowKeyDown(e) {
        console.log("down");
        this.view.suggestionListView.selectNext();
    }

    _onSuggestionClick(e) {
        this.view.removeStyleClass("focus");
        const item = e.getParameter("item");
        const model = sap.ui.getCore().getModel();
        model.forceSetProperty(this.poiPath, item);
    }

    _onFocus(e) {
        this.view.addStyleClass("focus");
    }

    _onBlur(e) {
        this.view.removeStyleClass("focus");
        this.view.suggestionListView.hide();
    }
}
