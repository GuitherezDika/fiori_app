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
        "ui5.walkthrough.controller.First",
        {
            onInit() {
                const oModel = new JSONModel({
                    recipient: {
                        name: "Guitherez Mahardika Sinaga"
                    }
                });

                const oJsonModel = new JSONModel({
                    CountSweets: 2,
                    SweetShops: [
                        {
                            ID: 0,
                            Name: "Sweet Magic",
                            Address: {
                                Street: "Setiabudi",
                                City: "Jakarta Selatan",
                                State: "DKI Jakarta",
                                Country: "Indonesia",
                                ZipCode: "234123"
                            }
                        },
                        {
                            ID: 1,
                            Name: "Purnomo Shop",
                            Address: {
                                Street: "Nandan Street",
                                City: "Yogyakarta",
                                State: "Yogyakarta",
                                Country: "Indonesia",
                                ZipCode: "6667897"
                            }
                        }
                    ]
                });

                this.getView().setModel(oModel);
                this.getView().setModel(oJsonModel, "sweetModel");

                const resourceBundle = new ResourceModel({
                    bundleName: "ui5.walkthrough.i18n.i18n"
                });

                this.getView().setModel(resourceBundle, "translateableTexts");
            },
            onImagePress: function (oEvent) {
                oEvent.getSource().getId().endsWith('image1')
                    ? MessageToast.show("Image 1 is pressed!")
                    : MessageToast.show("Image 2 is pressed!")
            },
            onSayHiPress: function () {
                console.log('poooo!');
            },
            onListItemPress: function (oEvent) {
                var oView = this.getView();
                var oApp = oView.getParent(); // langsung sap.m.App (__xmlview0--app)

                var oDetailPage = oApp && oApp.getPages().find(function (oPage) {
                    console.log('= ', oPage);
                    // sId: __xmlview0--detailPage
                    var aa = oPage.getId();
                    console.log('== ', aa); //  __xmlview0--detailPage

                    // indexOf('something') = apakah 'something' terdapat dalam oPage.getId()
                    // kalau ada = true; kalau tidak ada = false / -1

                    return oPage.getId().indexOf("detailPage") !== -1;
                });

                /*
                mObjectBindingInfos
                mProperties
                oBindingContexts
                    sweetModel: constructor {oModel: constructor, sPath: '/SweetShops/1', bForceRefresh: false, sDeepPath: ''}
                oParent
                dll
                */

                var oContext = oEvent.getSource().getBindingContext('sweetModel')

                /*
                bForceRefresh
                : 
                false
                oModel
                : 
                constructor {pSequentialImportCompleted: Promise, mEventRegistry: {…}, mMessages: {…}, id: 'id-1795591117825-10', aBindings: Array(6), …}
                sDeepPath
                : 
                ""
                sPath
                : 
                "/SweetShops/1"
                
                */

                if (oApp && oDetailPage && oContext) {
                    // Pastikan model "sweetModel" juga terdaftar di oApp / oDetailPage
                    oApp.setModel(oView.getModel("sweetModel"), "sweetModel");

                    oDetailPage.setBindingContext(oContext, "sweetModel");
                    oApp.to(oDetailPage);
                } else {
                    console.warn("Navigasi gagal:", { oApp: oApp, oDetailPage: oDetailPage, oContext: oContext });
                }
            }
        }
    )
})