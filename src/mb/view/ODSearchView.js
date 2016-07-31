import View from "sap/a/view/View";

export default class ODSearchView extends View {
    metadata = {
        events: {
            searchOD: { },
            swapOD: { }
        }
    };

    init() {
        super.init();
        this.addStyleClass("mb-od-search");
        this.$swap = $(`<span class="icon iconfont icon-swap"></span>`);
        this.$container.append(this.$swap);
        this.$container.append(`<div class="od-search-form"/>`);
        this.$("> .od-search-form").append(
            `<p class="submit-line">
                <button class="submit">查询路线</button>
            </p>`);
        this.$submit = this.$("button.submit");
        this.$swap.on("click", this._onSwapButtonClick.bind(this));
        this.$submit.on("click", this._onSubmitButtonClick.bind(this));
    }

    _onSubmitButtonClick() {
        this.fireSearchOD();
    }

    _onSwapButtonClick() {
        this.fireSwapOD();
    }
}
