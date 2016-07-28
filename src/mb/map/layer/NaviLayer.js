import Layer from "sap/a/map/layer/Layer";

export default class NaviLayer extends Layer
{
    metadata = {
        properties: {
            startLocation: { type: "any" },
            endLocation: { type: "any" },
        },
    };

    init()
    {
        super.init();
        this.markerGroup = L.featureGroup();
        this.container.addLayer(this.markerGroup);
        this.routeGroup = L.featureGroup();
        this.container.addLayer(this.routeGroup);
    }

    afterInit()
    {
        super.afterInit();
    }

    setStartLocation(location)
    {
        const loc = L.latLng(location);
        this.setProperty("startLocation", loc);
        this._updateStartMarker();
    }

    setEndLocation(location)
    {
        const loc = L.latLng(location);
        this.setProperty("endLocation", loc);
        this._updateEndMarker();
    }

    // multipolyline
    drawRoute(latlngs)
    {
        this.routeGroup.clearLayers();
        this.path = L.multiPolyline(latlngs);
        this.routeGroup.addLayer(this.path);
    }

    _updateStartMarker()
    {
        if (!this.startMarker)
        {
            this.startMarker = L.circle(this.getStartLocation());
            this.startMarker.setRadius(200);
            this.startMarker.setStyle({
                color: "green",
                fillColor: "green",
                opacity: 0.8,
                fillOpacity: 0.8
            })
            this.markerGroup.addLayer(this.startMarker);
        }
        else
        {
            this.startMarker.setLatLng(this.getStartLocation());
        }
    }

    _updateEndMarker()
    {
        if (!this.endMarker)
        {
            this.endMarker = L.circle(this.getEndLocation());
            this.endMarker.setRadius(200);
            this.endMarker.setStyle({
                color: "red",
                fillColor: "red",
                opacity: 0.8,
                fillOpacity: 0.8
            })
            this.markerGroup.addLayer(this.endMarker);
        }
        else
        {
            this.endMarker.setLatLng(this.getEndLocation());
        }
    }
}
