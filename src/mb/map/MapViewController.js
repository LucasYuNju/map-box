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
        this.view.attachMapClick(this._onMapClick.bind(this));
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

    _onMapClick(e)
    {
        const latlng = e.getParameters();
        const location = [latlng.lat, latlng.lng];
        ServiceClient.getInstance().getPoiByLocation(location).then(result => {
            const name = result.formattedAddress;
            sap.ui.getCore().getModel().setProperty("/selectedPoi", { name, location });
        });
    }
}
