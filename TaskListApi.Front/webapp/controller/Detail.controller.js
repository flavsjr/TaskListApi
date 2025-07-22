sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/BusyIndicator",
  "sap/m/MessageToast"
], function(Controller, JSONModel, BusyIndicator, MessageToast) {
  "use strict";

  return Controller.extend("myui5app.controller.Detail", {
    onInit: function() {
      this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function (oEvent) {
      BusyIndicator.show(0);
      try {
        const sId = oEvent.getParameter("arguments").taskId;

        const oModel = this.getOwnerComponent().getModel("tasks");
        const aTasks = oModel.getProperty("/todos") || [];

        const oTask = aTasks.find(task => task.id == sId);

        if (!oTask) {
          MessageToast.show("Tarefa não encontrada.");
          this.getOwnerComponent().getRouter().navTo("main");
          return;
        }

        const oTaskModel = new JSONModel(oTask);
        this.getView().setModel(oTaskModel, "taskModel");
      } catch (error) {
        MessageToast.show("Erro ao carregar detalhes da tarefa.");
        console.error(error);
      } finally {
        BusyIndicator.hide();
      }
    },

    onNavBack: function() {
      this.getOwnerComponent().getRouter().navTo("main");
    }
  });
});
