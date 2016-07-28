import ViewController from "sap/a/view/ViewController";

import ServiceClient from "gd/service/ServiceClient";

import MapView from "../map/MapView";

export default class MapViewController extends ViewController
{
    createView()
    {
        const mapView = new MapView({
            defaultZoom: 10,
            selectedPoi: "{/selectedPoi}",
        });
        return mapView;
    }

    initView()
    {
        super.initView();
        this.view.attachMapClick(this._map_click.bind(this));
    }

    searchRoute(startLocation, endLocation)
    {
        this.view.naviLayer.applySettings({
            startLocation,
            endLocation
        });
        this.view.naviLayer.fitBounds();

        ServiceClient.getInstance()
            .searchDrivingRoute([startLocation, endLocation])
            .then((result) => {
                this.view.naviLayer.drawRoute(result);
            });
    }

    _map_click(e)
    {
        const latlng = e.getParameters();
        const location = [latlng.lat, latlng.lng];
        ServiceClient.getInstance().getPoiByLocation(location).then(result => {
            const name = result.formattedAddress;
            sap.ui.getCore().getModel().setProperty("/selectedPoi", { name, location });
        });
    }

    // _onQueryPoiChanged(e)
    // {
    //     const model = sap.ui.getCore().getModel();
    //     const poi = model.getProperty("/queryPoi");
    //     if (poi !== null)
    //     {
    //         this.view.setSelectedPoi(poi);
    //     }
    // }
}
