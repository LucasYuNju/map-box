import ViewController from "sap/a/view/ViewController";

import ServiceClient from "gd/service/ServiceClient";

import MapView from "../map/MapView";

export default class MapViewController extends ViewController
{
    createView()
    {
        const mapView = new MapView("map-view", {
            defaultZoom: 10
        });
        mapView.attachShiftClicked(e => {
            const latlng = e.getParameters();
            const location = [latlng.lat, latlng.lng];
            ServiceClient.getInstance().getPoiByLocation(location).then(result => {
                const name = result.formattedAddress;
                sap.ui.getCore().getModel().setProperty("/queryPoi", { name, location });
            });
        });
        return mapView;
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

    _onSelectedPoiChanged(poi)
    {
        if (poi !== null)
        {
            this.view.setPoi(poi);
            this.view.setCenterLocation(poi.location);
        }
    }

    _onQueryPoiChanged(poi)
    {
        if (poi !== null)
        {
            this.view.setPoi(poi);
        }
    }
}
