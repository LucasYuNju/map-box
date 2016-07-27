import View from "../../sap/a/view/View";

export default class PoiSeachView extends View
{
    metadata = {
        properties: {
            keyword: { type: "string" }
        },
        events: {
            search: { }
        }
    };

    init()
    {
        super.init();
        this.addStyleClass("search-poi");
        this.$input = $(`<input type="search" placeholder="搜索位置">`);
        this.$input.on("keydown", (e) => {
            if (e.keyCode === 13)
            {
                this.fireSearch();
            }
        });
        this.$element.append(this.$input);
    }

    getKeyword()
    {
        return this.$input.val();
    }

    setKeyword(value)
    {
        this.$input.val(value);
    }
}
