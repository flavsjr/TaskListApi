sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/ui/core/BusyIndicator"
], function (UIComponent, JSONModel, MessageToast, BusyIndicator) {
  "use strict";

  return UIComponent.extend("myui5app.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);

      var oTaskModel = new JSONModel();
      this.setModel(oTaskModel, "tasks");

      BusyIndicator.show(0);

      fetch("http://localhost:5000/todos")
        .then(response => response.json())
        .then(data => {
          oTaskModel.setData({ tasks: data });
          BusyIndicator.hide();
        })
        .catch(() => {
          BusyIndicator.hide();
          MessageToast.show("Erro ao carregar tarefas.");
        });

      this.getRouter().initialize();
    }
  });
});
