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
            clearInput: { }
            // click, load, focus, blur不用ed，是比较传统的写法
            // changed, changing通常用cancel的属性
        }
    };

    constructor(...args) {
        this.placeHolder = "搜索位置";
        if (args.length > 0 && args[0].placeHolder) {
            this.placeHolder = args[0].placeHolder;
        }
        super(...args);
    }

    init() {
        super.init();
        this.addStyleClass("search-poi");
        this.$element.append(`<span class="logo"/>`)
        this.$input = $(`<input type="search" placeholder="${this.placeHolder}"/>`);
        this.$element.append(this.$input);
        this.$search = $(`<span class="icon iconfont icon-search"/>`);
        this.$element.append(this.$search);
        this.$delete = $(`<span class="icon iconfont icon-delete" />`);
        this.$delete.hide();
        this.$element.append(this.$delete);
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
        this.$search.on("click", e => {
            this.fireSearch();
        });
        this.$input.on("input", this._onInput.bind(this));
        this.$delete.on("click", this._onClearInput.bind(this));
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
        console.log("setpoi", poi);
        this.setProperty("poi", poi);
        if (poi) {
            this.$input.val(poi.name)
            if (poi.name === "") {
                this.$delete.hide();
            }
        }
    }

    _onInput(e) {
        if (this.inputTimer) {
            window.clearTimeout(this.inputTimer);
            this.inputTimer = null;
        }
        this.inputTimer = window.setTimeout(() => {
            this.fireInput();
        }, 200);
        if (this.$input.val() === "") {
            this.$delete.hide();
        }
        else {
            this.$delete.show();
        }
    }

    _onClearInput(e) {
        this.fireClearInput();
    }
}
