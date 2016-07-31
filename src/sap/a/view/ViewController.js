import ManagedObject from "sap/ui/base/ManagedObject";

import View from "./View";

export default class ViewController extends ManagedObject
{
    metadata = {
        aggregations: {
            childViewControllers: {
                type: "sap.a.view.ViewController"
            }
        },
        properties: {
            viewOptions: { type: "object", defaultValue: {} }
        }
    };

    constructor(...args)
    {
        super(...args);
        this.afterInit();
        this.bindModel();
    }

    init()
	{

    }

    afterInit()
    {
        this.view = this.createView(this.getViewOptions());
        if (this.view instanceof View)
        {
            this.initView();
        }
        else
        {
            throw new Error("createView(options) must return an instance of sap.a.view.View.");
        }
    }

    bindModel()
    {

    }

    getView()
    {
        return this.view;
    }

    createView(options)
    {
        throw new Error("createView(options) must be override in the derived class.");
    }

    initView()
    {

    }

    addChildViewController(viewController, $container)
    {
        this.addAggregation("childViewControllers", viewController);
        this.view.addSubview(viewController.view, $container);
        return this;
    }

    removeChildViewController(viewController)
    {
        const result = this.removeAggregation("childViewControllers", viewController);
        if (result)
        {
            this.view.removeSubview(viewController.view, neverUseAgain);
        }
        return result;
    }

    removeAllChildViewController(neverUseAgain)
    {
        while (this.getChildViewControllers.length > 0)
        {
            this.removeAggregation(this.getChildViewControllers[0], neverUseAgain);
        }
    }

    removeFromParent()
    {
        if (this.getParent())
        {
            this.getParent().removeChildViewController()
        }
    }

    setModel(model, name)
    {
        super.setModel(model);
        if (this.view)
        {
            this.view.setModel(model, name);
        }
    }
}
