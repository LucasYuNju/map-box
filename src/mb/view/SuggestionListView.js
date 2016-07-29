import BaseListView from "sap/a/view/BaseListView";

export default class SuggestionListView extends BaseListView
{
    init() {
        super.init();
        this.addStyleClass("suggestion-list-view");
    }

    afterInit() {
        super.afterInit();
    }

    $createNewItem() {
        const $item = super.$createNewItem(0);
        $item.append(`<span class="district"/>`);
        return $item;
    }

    renderItem(item, $item) {
        super.renderItem(item, $item);
        $item.children("district").text(item.district);
    }

    selectNext() {

    }

    selectPrev() {

    }
}
