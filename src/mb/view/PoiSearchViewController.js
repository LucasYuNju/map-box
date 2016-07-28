import ServiceClient from "../../gd/service/ServiceClient";

import PoiSearchView from "./PoiSearchView";
import ViewController from "../../sap/a/view/ViewController";

export default class PoiSeachViewController extends ViewController
{
    init()
    {
        super.init();
    }

    createView(options)
    {
        const opt = $.extend({
            poi: "{/selectedPoi}"
        }, options);
        return new PoiSearchView(opt);
    }

    initView(options)
    {
        this.view.attachSearch(() => {
            const keyword = this.view.getKeyword();
            ServiceClient.getInstance().searchPoiAutocomplete(keyword).then(result => {
                if (result.length === 0)
                {
                    return;
                }
                const newPoi = {
                    name: result[0].name,
                    location: result[0].location,
                }
                sap.ui.getCore().getModel().setProperty("/selectedPoi", newPoi);
            });
        });
        this.view.attachInput(() => {

        });
    }

    _onSelectedPoiChanged(poi)
    {
        console.log("changed");
        if (poi !== null && poi.name !== this.view.getKeyword())
        {
            this.view.setPoi(poi);
        }
    }
}
