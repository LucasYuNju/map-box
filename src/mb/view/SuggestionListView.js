import BaseListView from "sap/a/view/BaseListView";

export default class SuggestionListView extends BaseListView
{
    init()
    {
        super.init();
        this.addStyleClass("suggestion-list-view");
    }

    afterInit()
    {
        super.afterInit();
        // this.$container.on("keydown", this._onKeyDown.bind(this));
    }

    selectNext()
    {

    }

    selectPrev()
    {

    }

    _onKeyDown(e)
    {
        console.log(e.keyCode);
    }
}
