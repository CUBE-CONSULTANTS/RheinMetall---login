sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("login.login.controller.launch", {
    onInit: function() {
           
      
  },
  logOut: function() {
    debugger
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("Routelogin")     
  }
	});
});