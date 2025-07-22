sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/ui/core/BusyIndicator"
], function (Controller, JSONModel, MessageToast, BusyIndicator) {
  "use strict";

  return Controller.extend("myui5app.controller.Main", {
    onInit: function () {
      this._oView = this.getView();
      this._oTable = this._oView.byId("taskTable");
      this._oModel = new JSONModel();
      this._aAllTasks = [];   
      this._aFilteredTasks = []; 
      this._iPage = 1;
      this._iPageSize = 20;
      this._oTable.setModel(this._oModel, "tasks");

      BusyIndicator.show(0);
      fetch("http://localhost:5000/todos")
        .then((res) => {
          if (!res.ok) throw new Error("Erro na resposta");
          return res.json();
        })
        .then((data) => {
          this.getOwnerComponent().getModel("tasks").setProperty("/todos", data);
          this._aAllTasks = data;
          this._aFilteredTasks = data;
          this._iPage = 1;
          this._updateTableData();  
        })
        .catch(() => {
          MessageToast.show("Erro ao carregar tarefas.");
        })
        .finally(() => {
          BusyIndicator.hide();
        });
    },

    _updateTableData: function () {
      const start = (this._iPage - 1) * this._iPageSize;
      const end = start + this._iPageSize;
      const pageData = this._aFilteredTasks.slice(start, end);
      this._oModel.setProperty("/todos", pageData);
      this._updatePagingButtons();
    },

    onSearch: function (oEvent) {
      const query = oEvent.getParameter("query") || oEvent.getParameter("newValue");
      if (!this._aAllTasks.length) return;

      if (query && query.trim().length > 0) {
        const lower = query.toLowerCase();
        this._aFilteredTasks = this._aAllTasks.filter(task =>
          task.title.toLowerCase().includes(lower)
        );
      } else {
        this._aFilteredTasks = this._aAllTasks;
      }

      this._iPage = 1;
      this._updateTableData();
    },

    onNextPage: function () {
      const maxPage = Math.ceil(this._aFilteredTasks.length / this._iPageSize);
      if (this._iPage < maxPage) {
        this._iPage++;
        this._updateTableData();
      }
    },

    onPrevPage: function () {
      if (this._iPage > 1) {
        this._iPage--;
        this._updateTableData();
      }
    },

    _updatePagingButtons: function () {
      const maxPage = Math.ceil(this._aFilteredTasks.length / this._iPageSize);
      const btnPrev = this._oView.byId("btnPrev");
      const btnNext = this._oView.byId("btnNext");
      if (btnPrev) btnPrev.setEnabled(this._iPage > 1);
      if (btnNext) btnNext.setEnabled(this._iPage < maxPage);
    },

    onPressDetails: function (oEvent) {
      const oContext = oEvent.getSource().getBindingContext("tasks");
      if (!oContext) {
        MessageToast.show("Contexto da tarefa não encontrado.");
        return;
      }

      const oData = oContext.getObject();
      const sId = oData.id;

      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("detail", { taskId: sId });
    },

    formatCompleted: function (completed) {
      return completed ? "taskCompleted" : "";
    }
  });
});
