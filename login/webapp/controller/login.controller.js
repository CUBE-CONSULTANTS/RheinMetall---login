sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("login.login.controller.login", {
            onInit: function() {
                
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("Routelogin").attachPatternMatched(this._onObjectMatched, this);
            },
            
            _onObjectMatched: function() {

                // var obj= await fetch("../model/modello.json")
                // var json= await obj.json()
                // this.getView().setModel(new sap.ui.model.json.JSONModel(),"modelloUtenti")
                // this.getView().getModel("modelloUtenti").setProperty("/",json.Utenti)
                // // this.getView().setModel(new sap.ui.model.json.JSONModel,"modello")
                // this.getOwnerComponent().getModel("modelloUtenti").setProperty("/lista",{
                //     username:null,
                //     ruolo:null
                // });
                this.getView().setModel(new sap.ui.model.json.JSONModel(),"modelloIcon")
                this.getView().getModel("modelloIcon").setProperty("/icona",'sap-icon://show')
                var oInput = this.getView().byId("username");
                oInput.onsapenter =((oEvent)=>{
                    this.login();  
                });
            },
            onShowPasswordPress: function () {      
                // mostra o nasconde la passsword       
                var oInput = this.byId("password");
                var oInputIcon = this.byId("ButtonHidePass");
                if (oInput.getType() === "Password") {
                    oInputIcon.setIcon("sap-icon://hide");
                    oInput.setType("Text");
                } else {
                    oInputIcon.setIcon("sap-icon://show");
                    oInput.setType("Password");
    
                }
            },
            
            // Delete: function () {  
            //     //sbianca i campi
            //     this.byId("username").setValue("")
            //     this.byId("password").setValue("")
            // },
            login: function () {
                // chiamata ajax per la UserSet e navigazione verso la pagina della lista trasferte
                this.getView().byId("RheinLogin").setBusy(true);
                var ModelloUsermane = this.getOwnerComponent().getModel("modelloUname");
                var usermane = ModelloUsermane.getProperty("/Uname");
                var pass = ModelloUsermane.getProperty("/Password");
                var that = this;
                var modelloUserSet = this.getOwnerComponent().getModel("modelloUserSet");
                $.ajax({
                    url: "/sap/bc/bsp/sap/zui5_dst/userset.json",
                    method: 'post',
                    // beforeSend: (xhr) => xhr.setRequestHeader('Authorization', "Basic " + btoa(`${usermane}:${pass}`)),
                    headers: {
                        // "Authorization": "Basic " + btoa(`${usermane}:${pass}`),
                        // "iv_uname": usermane,
                        "sap-client": "500", 
                        "sap-sessioncmd": "open",
                        // "Connection": "keep-alive", 
                        "Accept": 'application/json'
                      },
                   data:JSON.stringify({
                        "iv_uname": usermane,
                    }),
                    dataType: "text",
                    contentType: 'application/json',
                    success: function(data, status, xhr) {
                        var dati = JSON.parse(data);
                        modelloUserSet.setData(dati);
                        that.getView().byId("RheinLogin").setBusy(false);
                        var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                        oRouter.navTo("ListaTrasferte");
                    },
                    error: function (jqXhr, textStatus, errorMessage) {
                        that.getView().byId("RheinLogin").setBusy(false);
                        MessageBox.show(`Errore nella Login`, {
                            onClose: function (oAction) {
                                
                            },
                          });
                    }
                })
            },

            
            
        });
    });