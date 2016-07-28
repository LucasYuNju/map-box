import View from "sap/a/view/View";

import SuggestionListView from "./SuggestionListView";

export default class PoiSeachView extends View
{
    metadata = {
        properties: {
            poi: { type: "object", bindable: true },
            keyword: { type: "string" }
        },
        events: {
            search: { },
            input: {}
        }
    };

    init()
    {
        super.init();
        this.addStyleClass("search-poi");
        this.$input = $(`<input type="search" placeholder="搜索位置">`);
        this.$input.on("keydown", e => {
            if (e.keyCode === 13)
            {
                this.fireSearch();
            }
        });
        let inputTimer = null;
        this.$input.on("input", e => {
            if (inputTimer !== null) {
                window.clearTimeout(inputTimer);
                inputTimer = null;
            }
            inputTimer = window.setTimeout(() => {
                fireInput();
            }, 200);
        });

        this.$element.append(this.$input);
        this.$element.append(`<span class="icon iconfont icon-search"/>`);
        this._initSuggestionListView();
    }

    _initSuggestionListView()
    {
        this.suggestionListView = new SuggestionListView();
        this.suggestionListView.setItems([
        {
            id: "1",
            name: "Bamboo",
        },
        {
            id: "2",
            name: "Panda",
        },

    ]);
        this.addSubview(this.suggestionListView);
    }

    getKeyword()
    {
        return this.$input.val();
    }

    setKeyword(value)
    {
        this.$input.val(value);
    }

    setPoi(poi)
    {
        if (poi)
        {
            this.$input.val(poi.name)
        }
    }
}
