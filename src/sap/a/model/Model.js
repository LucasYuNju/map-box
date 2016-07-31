import JSONModel from "sap/ui/model/json/JSONModel";

export default class Model extends JSONModel
{
    constructor(...args)
    {
        super(...args);
        this.init();
    }

    init()
    {

    }

    forceSetProperty(sPath, oValue, oContent, bAsyncUpdate) {
        const result = super.setProperty(sPath, oValue, oContent, bAsyncUpdate);
        // checkUpdate会刷新所有的model属性
        this.checkUpdate(true, false);
        return result;
    }
}
