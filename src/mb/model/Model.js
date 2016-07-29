import BaseModel from "sap/a/model/Model";

export default class Model extends BaseModel {
    constructor(...args) {
        super({
            selectedPoi: null,
            queryPoi: null
        });
        this.init();
    }

    init() {

    }
}
