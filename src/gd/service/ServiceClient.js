import ManagedObject from "sap/ui/base/ManagedObject";

const x_PI = 3.14159265358979324 * 3000.0 / 180.0;
const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;

export default class ServiceClient extends ManagedObject {
    static _instance = null;

    metadata = {
        events: {
            ready: {}
        }
    };

    init() {
        AMap.service(["AMap.Driving", "AMap.Autocomplete"], () => {
            window.setTimeout(() => {
                console.log("AMap.Driving is loaded");
                const options = {
                    city: "南京市",
                }
                this.driving = new AMap.Driving(options);
                this.autocomplete =  new AMap.Autocomplete(options);
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

    searchPoiAutocomplete(keyword) {
        return new Promise((resolve, reject) => {
            this.autocomplete.search(keyword, (status, result) => {
                if (status === "complete") {
                    result.tips.forEach(tip => {
                        tip.location = this.toWgs84(tip.location.lat, tip.location.lng);
                    });
                    console.log(result);
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
            this.toGcj(locations).then(result => {
                this.driving.search(result[0], result[1], (status, result) => {
                    if (status === "complete") {
                        const steps = result.routes[0].steps;
                        const latlngs = steps.map(step => {
                            return step.path.map(location => {
                                return this.toWgs84(location.lat, location.lng);
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
            }, reject);
        });
    }

    toGcj(locations) {
        return new Promise((resolve, reject) => {
            const lnglats = locations.map(location => [location[1], location[0]]);
            AMap.convertFrom(lnglats, "gps", (status, result) => {
                if (status === "complete") {
                    const points = result.locations.map(location => [location.lng, location.lat]);
                    resolve(points);
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

    toWgs84(location) {
        // TODO
    }

    convertToWgs(locations) {
        if (Array.isArray(locations)) {

        }
    }

    toWgs84(lat, lng) {
        if (this.out_of_china(lng, lat)) {
            return [lng, lat];
        }
        else {
            var dlat = this.transformlat(lng - 105.0, lat - 35.0);
            var dlng = this.transformlng(lng - 105.0, lat - 35.0);
            var radlat = lat / 180.0 * PI;
            var magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            var sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            var mglat = lat + dlat;
            var mglng = lng + dlng;
            return [lat * 2 - mglat, lng * 2 - mglng];
        }
    }

    swapTuple(locations) {
        return locations.map(loc => [loc[1], loc[0]]);
    }

    out_of_china(lng, lat) {
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
    }

    transformlat(lng, lat) {
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    transformlng(lng, lat) {
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret;
    }
}
