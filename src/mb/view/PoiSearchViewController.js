import ServiceClient from "../../gd/service/ServiceClient";

import PoiSearchView from "./PoiSearchView";
import ViewController from "../../sap/a/view/ViewController";

export default class PoiSeachViewController extends ViewController
{
    init()
    {
        super.init();
    }

    createView(options)
    {
        const opt = $.extend({
            poi: "{/selectedPoi}"
        }, options);
        return new PoiSearchView(opt);
    }

    initView(options)
    {
        this.view.attachSearch(this._onSearch.bind(this));
        this.view.attachInput(this._onInput.bind(this));
        this.view.attachUp(this._onPrevSuggestion.bind(this));
        this.view.attachDown(this._onNextSuggestion.bind(this));

        this.view.suggestionListView.attachItemClick(this._onSuggestionClick.bind(this));
    }

    _onInput(e)
    {
        const keyword = this.view.getKeyword();
        ServiceClient.getInstance().searchPoiAutocomplete(keyword).then(result => {
            if (result.length > 0)
            {
                this.view.suggestionListView.setItems(result);
            }
        });
    }

    _onSearch(e)
    {
        const keyword = this.view.getKeyword();
        ServiceClient.getInstance().searchPoiAutocomplete(keyword).then(result => {
            if (result.length > 0)
            {
                const newPoi = {
                    name: result[0].name,
                    location: result[0].location,
                }
                sap.ui.getCore().getModel().setProperty("/selectedPoi", newPoi);
            }
        });
    }

    _onPrevSuggestion(e)
    {
        console.log("up");
        this.view.suggestionListView.selectPrev();
        // TODO change input of search box
    }

    _onNextSuggestion(e)
    {
        console.log("down");
        this.view.suggestionListView.selectNext();
    }

    _onSuggestionClick(e)
    {
        console.log("click");
        const item = e.getParameter("item");
        const model = sap.ui.getCore().getModel();
        model.setProperty("/selectedPoi", item);
    }
}
