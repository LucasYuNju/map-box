import ManagedObject from "sap/ui/base/ManagedObject";
import Util from "./Util";

export default class ServiceClient extends ManagedObject {
    static _instance = null;

    metadata = {
        events: {
            ready: {}
        }
    };

    init() {
        AMap.service(["AMap.Driving", "AMap.Autocomplete", "AMap.Geocoder"], () => {
            window.setTimeout(() => {
                console.log("AMap.Driving is loaded");
                const options = {
                    city: "南京市",
                }
                this.driving = new AMap.Driving(options);
                this.autocomplete = new AMap.Autocomplete(options);
                this.geocoder = new AMap.Geocoder({
                    city: "南京市",
                    radius: 10,
                    extensions: "base",
                });
                this.fireReady();
            });
        });
    }

    static getInstance() {
        if (!gd.service.ServiceClient._instance)
        {
            const val = new gd.service.ServiceClient();
            gd.service.ServiceClient._instance = val;
        }
        return gd.service.ServiceClient._instance;
    }

    getPoiByLocation(latLng) {
        return new Promise((resolve, reject) => {
            const lngLat = [latLng[1], latLng[0]];
            this.geocoder.getAddress(lngLat, (status, result) => {
                if (status === "complete") {
                    resolve(result.regeocode);
                }
                else
                {
                    reject({
                        status,
                        info: result.info,
                    });
                }
            });
        });
    }

    searchPoiAutocomplete(keyword) {
        return new Promise((resolve, reject) => {
            this.autocomplete.search(keyword, (status, result) => {
                if (status === "complete") {
                    result.tips.forEach(tip => {
                        tip.location = Util.toWgs(tip.location);
                    });
                    resolve(result.tips);
                }
                else
                {
                    reject({
                        status,
                        info: result.info,
                    });
                }
            });
        });
    }

    searchDrivingRoute(locations) {
        return new Promise((resolve, reject) => {
            locations = locations.map(Util.toGcj);
            const origin = [locations[0].lng, locations[0].lat];
            const dest = [locations[1].lng, locations[1].lat];
            this.driving.search(origin, dest, (status, result) => {
                if (status === "complete") {
                    const steps = result.routes[0].steps;
                    const latlngs = steps.map(step => {
                        return step.path.map(location => {
                            return Util.toWgs(location);
                        });
                    });
                    resolve(latlngs);
                }
                else {
                    reject({
                        status,
                        info: result.info,
                    });
                }
            });
        });
    }
}
