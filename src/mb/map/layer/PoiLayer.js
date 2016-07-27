import Layer from "sap/a/map/layer/Layer";

export default class PoiLayer extends Layer
{
    metadata = {
    };

    init()
    {
        super.init();
        this.markerGroup = L.featureGroup();
        this.container.addLayer(this.markerGroup);
    }

    afterInit()
    {
        super.afterInit();
    }

    setPoi(poi)
    {
        const loc = L.latLng(poi.location);
        this._updatePoi(loc);
    }

    _updatePoi(location)
    {
        if (!this.poiMarker)
        {
            this.poiMarker = L.circleMarker(location);
            this.poiMarker.setRadius(10);
            this.poiMarker.setStyle({
                color: "red",
                fillColor: "red",
                opacity: 0.8,
                fillOpacity: 0.8
            });
            this.markerGroup.addLayer(this.poiMarker);
        }
        else
        {
            this.poiMarker.setLatLng(location);
        }
    }
}
