import View from "./View";

export default class ListView extends View {
    metadata = {
        properties: {

            selection: { type: "object" },
            items: { type: "object" },
        },
    };

    afterInit() {
        super.afterInit();
        this._$itemTemplates = [];
        this.addStyleClass("sap-a-list-view");
        this.$container.on("mousedown", this.getItemElementTag(), this._onclick.bind(this));
    }

    getElementTag() {
        return "ul";
    }

    getItemElementTag() {
        return "li";
    }

    getItems() {
        return this.getItems();
    }

    setItems(value) {
        this.setItems(value);
        this.removeAllItems(false);
        this.resizeItems(value);

        const $items = this.$container.children(this.getItemElementTag());
        for (let i = 0; i < value.length; i++) {
            this.renderItem(value[i], $items.eq(i));
        }
    }

    setSelection(value) {
        this.setProperty("selection", value);
        this.selectItem(value);
    }

    get selectedId() {
        return this.getIdOfItem(this.getSelection());
    }

    getTypeOfItem(item) {
        return 0;
    }

    getIdOfItem(item) {
        if (item) {
            return item.id;
        }
        return null;
    }

    removeAllItems(remove = true) {
        this.setSelection(null);
        if (this.getItems().length > 0) {
            if (remove) {
                this.getItems().splice(0);
                this.$container.children(this.getItemElementTag()).remove();
            }
            else {
                this.$container.children(this.getItemElementTag()).data("item", null);
                this.$container.children(this.getItemElementTag()).removeAttr("id");
            }
        }
    }

    resizeItems(items) {
        const $items = this.$container.children(this.getItemElementTag());
        if (items.length > $items.length) {
            // add $item
            const numToAdd = items.length - $items.length;
            for (let i = 0; i < numToAdd; i++) {
                this.addItem(items[i]);
            }
        }
        else {
            // remove $item
            const numToDel = $items.length - items.length;
            $items.slice($items.length - numToDel).remove();
        }
    }

    addItem(item) {
        const $item = this.createItem(this.getTypeOfItem(item));
        this.$container.append($item);
    }

    selectItem(item = null) {
        if (this.getSelection() === item) {
            return;
        }

        if (this.getSelection() !== null) {
            this.$getItem(this.getSelection()).removeClass("selected");
            this.setSelection(null);
        }
        this.setSeleciton(item);

        if (item) {
            const $item = this.$getItem(item);
            $item.addClass("selected");
        }
        this.trigger("selectionchanged");
    }

    renderItem(item, $item) {
        $item.data("item", item);
        $item.attr("id", "i-" + this.getIdOfItem(item))
    }

    createItem(type = 0) {
        if (!this._$itemTemplates[type]) {
            return this._$itemTemplates[type] = this.$createNewItem(type);
        }
        return this._$itemTemplates[type].clone();
    }

    $createNewItem(type = 0) {
        return $(`<${this.getItemElementTag()}/>`);
    }

    $getItem(item) {
        const id = this.getIdOfItem(item)
        return this.$container.children("#i-" + id);
    }

    _onclick(e) {
        const $item = $(e.currentTarget);
        const item = $item.data("item");
        this.fireItemClick({item});
        this.selectItem(item);
    }
}
