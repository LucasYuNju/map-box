import View from "sap/a/view/View";

import SuggestionListView from "./SuggestionListView";

export default class POISearchView extends View {
    metadata = {
        properties: {
            poi: { type: "object", bindable: true },
            keyword: { type: "string" }
        },
        events: {
            search: { },
            input: { },
            focus: { },
            blur: { },
            arrowKeyUp: { },
            arrowKeyDown: { },
            // click, load, focus, blur不用ed，是比较传统的写法
            // changed, changing通常用cancel的属性
        }
    };

    init() {
        super.init();
        this.addStyleClass("search-poi");
        this.$element.append(`<span class="logo"/>`)
        this.$input = $(`<input type="search" placeholder="搜索位置"/>`);
        this.$element.append(this.$input);
        this.$searchIcon = $(`<span class="icon iconfont icon-search"/>`);
        this.$element.append(this.$searchIcon);
        this._initSuggestionListView();

        this.$input.on("keydown", e => {
            if (e.keyCode === 13)
            {
                this.fireSearch();
            }
            else if (e.keyCode === 38)
            {
                this.fireArrowKeyUp();
            }
            else if (e.keyCode === 40)
            {
                this.fireArrowKeyDown();
            }
        });
        this.$input.on("focus", e => {
            this.fireFocus();
        });
        this.$input.on("blur", e => {
            this.fireBlur();
        });
        let inputTimer = null;
        this.$input.on("input", e => {
            if (inputTimer !== null) {
                window.clearTimeout(inputTimer);
                inputTimer = null;
            }
            inputTimer = window.setTimeout(() => {
                this.fireInput();
            }, 200);
        });
        this.$searchIcon.on("click", e => {
            this.fireSearch();
        });
    }

    _initSuggestionListView() {
        this.suggestionListView = new SuggestionListView();
        this.addSubview(this.suggestionListView);
    }

    getKeyword() {
        return this.$input.val();
    }

    setKeyword(value) {
        this.$input.val(value);
    }

    setPoi(poi) {
        this.setProperty("poi", poi);
        // console.log("setPOI");
        if (poi)
        {
            this.$input.val(poi.name)
        }
    }
}
