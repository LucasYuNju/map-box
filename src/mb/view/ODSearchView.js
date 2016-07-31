import View from "sap/a/view/View";

export default class ODSearchView extends View {
    metadata = {
        events: {
            searchOD: { }
        }
    };

    init() {
        super.init();
        this.addStyleClass("mb-od-search");
        this.$container.append(`<span class="icon iconfont icon-swap"></span>`);
        this.$container.append(`<div class="od-search-form"/>`);
        this.$("> .od-search-form").append(
            `<p class="submit-line">
                <button class="submit">查询路线</button>
            </p>`);
        this.$submit = this.$("button.submit");
        this.$submit.on("click", this._onSubmitClick.bind(this));
    }

    _onSubmitClick() {
        this.fireSearchOD();        
    }
}
