// https://ui5.sap.com/#/api/sap.ui.model.json.JSONModel

sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/resource/ResourceModel',
    "sap/m/MessageToast"
], (
    Controller,
    JSONModel,
    ResourceModel,
    MessageToast
) => {
    "use strict";
    return Controller.extend(
        "ui5.walkthrough.controller.Second",
        {
            onNavButtonPress: function () {
                var oView = this.getView();
                var oApp = oView.getParent(); // langsung sap.m.App (__xmlview0--app)
                oApp.back();
            }
        }
    )
})