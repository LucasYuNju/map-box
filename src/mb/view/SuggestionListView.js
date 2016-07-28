import BaseListView from "sap/a/view/BaseListView";

export default class SuggestionListView extends BaseListView
{
    init() {
        super.init();
        this.addStyleClass("suggestion-list-view");
    }
}
