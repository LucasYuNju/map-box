import ServiceClient from "../../gd/service/ServiceClient";

import PoiSearchView from "./PoiSearchView";
import ViewController from "../../sap/a/view/ViewController";

export default class PoiSeachViewController extends ViewController
{
    init()
    {
        super.init();
    }

    bindModel()
    {
        const model = sap.ui.getCore().getModel();
        model.bindProperty("/selectedPoi").attachChange(() => {
            const poi = model.getProperty("/selectedPoi");
            this._onSelectedPoiChanged(poi);
        });
        model.bindProperty("/queryPoi").attachChange(() => {
            const poi = model.getProperty("/queryPoi");
            this._onQueryPoiChanged(poi);
        });
    }

    createView()
    {
        const view = new PoiSearchView();
        view.attachSearch(() => {
            const keyword = view.getKeyword();
            ServiceClient.getInstance()
                .searchPoiAutocomplete(keyword)
                .then(result => {
                    if (result.length > 0)
                    {
                        const newPoi = {
                            name: result[0].name,
                            location: result[0].location,
                        }
                        sap.ui.getCore().getModel().setProperty("/selectedPoi", newPoi);
                    }
                });
        });
        return view;
    }

    _onSelectedPoiChanged(poi)
    {
        if (poi !== null && poi.name !== this.view.getKeyword())
        {
            this.view.setKeyword(poi.name);
            // update location

        }
    }

    _onQueryPoiChanged(poi)
    {
        
    }
}
