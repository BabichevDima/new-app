//@ui5-bundle freestyle/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"freestyle/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models","./controller/ErrorHandler"],function(t,e,s,i){"use strict";return t.extend("freestyle.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments);this._oErrorHandler=new i(this);this.setModel(s.createDeviceModel(),"device");this.getRouter().initialize()},destroy:function(){this._oErrorHandler.destroy();t.prototype.destroy.apply(this,arguments)},getContentDensityClass:function(){if(this._sContentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this._sContentDensityClass=""}else if(!e.support.touch){this._sContentDensityClass="sapUiSizeCompact"}else{this._sContentDensityClass="sapUiSizeCozy"}}return this._sContentDensityClass}})});
},
	"freestyle/controller/App.controller.js":function(){sap.ui.define(["./BaseController"],function(e){"use strict";return e.extend("freestyle.controller.App",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
},
	"freestyle/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/m/library"],function(e,t,r){"use strict";var o=r.URLHelper;return e.extend("freestyle.controller.BaseController",{getRouter:function(){return t.getRouterFor(this)},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onShareEmailPress:function(){var e=this.getModel("objectView")||this.getModel("worklistView");o.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))}})});
},
	"freestyle/controller/ErrorHandler.js":function(){sap.ui.define(["sap/ui/base/Object","sap/m/MessageBox","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,s,t,n){"use strict";return e.extend("freestyle.controller.ErrorHandler",{constructor:function(e){var s=sap.ui.getCore().getMessageManager(),r=s.getMessageModel(),o=e.getModel("i18n").getResourceBundle(),i=o.getText("errorText"),a=o.getText("multipleErrorsText");this._oComponent=e;this._bMessageOpen=false;this.oMessageModelBinding=r.bindList("/",undefined,[],new t("technical",n.EQ,true));this.oMessageModelBinding.attachChange(function(e){var t=e.getSource().getContexts(),n=[],r;if(this._bMessageOpen||!t.length){return}t.forEach(function(e){n.push(e.getObject())});s.removeMessages(n);r=n.length===1?i:a;this._showServiceError(r,n[0].message)},this)},_showServiceError:function(e,t){this._bMessageOpen=true;s.error(e,{id:"serviceErrorMessageBox",details:t,styleClass:this._oComponent.getContentDensityClass(),actions:[s.Action.CLOSE],onClose:function(){this._bMessageOpen=false}.bind(this)})}})});
},
	"freestyle/controller/NotFound.controller.js":function(){sap.ui.define(["./BaseController"],function(e){"use strict";return e.extend("freestyle.controller.NotFound",{onLinkPressed:function(){this.getRouter().navTo("worklist")}})});
},
	"freestyle/controller/Object.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/core/routing/History","../model/formatter"],function(e,t,n,i){"use strict";return e.extend("freestyle.controller.Object",{formatter:i,onInit:function(){var e=new t({busy:true,delay:0});this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched,this);this.setModel(e,"objectView")},onNavBack:function(){var e=n.getInstance().getPreviousHash();if(e!==undefined){history.go(-1)}else{this.getRouter().navTo("worklist",{},true)}},_onObjectMatched:function(e){var t=e.getParameter("arguments").objectId;this._bindView("/Books"+t)},_bindView:function(e){var t=this.getModel("objectView");this.getView().bindElement({path:e,events:{change:this._onBindingChange.bind(this),dataRequested:function(){t.setProperty("/busy",true)},dataReceived:function(){t.setProperty("/busy",false)}}})},_onBindingChange:function(){var e=this.getView(),t=this.getModel("objectView"),n=e.getElementBinding();if(!n.getBoundContext()){this.getRouter().getTargets().display("objectNotFound");return}var i=this.getResourceBundle(),o=e.getBindingContext().getObject(),s=o.ID,r=o.Books;t.setProperty("/busy",false);t.setProperty("/shareSendEmailSubject",i.getText("shareSendEmailObjectSubject",[s]));t.setProperty("/shareSendEmailMessage",i.getText("shareSendEmailObjectMessage",[r,s,location.href]))}})});
},
	"freestyle/controller/Worklist.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,i,s,o){"use strict";return e.extend("freestyle.controller.Worklist",{formatter:i,onInit:function(){var e;this._aTableSearchState=[];e=new t({worklistTableTitle:this.getResourceBundle().getText("worklistTableTitle"),shareSendEmailSubject:this.getResourceBundle().getText("shareSendEmailWorklistSubject"),shareSendEmailMessage:this.getResourceBundle().getText("shareSendEmailWorklistMessage",[location.href]),tableNoDataText:this.getResourceBundle().getText("tableNoDataText")});this.setModel(e,"worklistView")},onUpdateFinished:function(e){var t,i=e.getSource(),s=e.getParameter("total");if(s&&i.getBinding("items").isLengthFinal()){t=this.getResourceBundle().getText("worklistTableTitleCount",[s])}else{t=this.getResourceBundle().getText("worklistTableTitle")}this.getModel("worklistView").setProperty("/worklistTableTitle",t)},onPress:function(e){this._showObject(e.getSource())},onNavBack:function(){history.go(-1)},onSearch:function(e){if(e.getParameters().refreshButtonPressed){this.onRefresh()}else{var t=[];var i=e.getParameter("query");if(i&&i.length>0){t=[new s("ID",o.Contains,i)]}this._applySearch(t)}},onRefresh:function(){var e=this.byId("table");e.getBinding("items").refresh()},_showObject:function(e){this.getRouter().navTo("object",{objectId:e.getBindingContext().getPath().substring("/Books".length)})},_applySearch:function(e){var t=this.byId("table"),i=this.getModel("worklistView");t.getBinding("items").filter(e,"Application");if(e.length!==0){i.setProperty("/tableNoDataText",this.getResourceBundle().getText("worklistNoDataWithSearchText"))}}})});
},
	"freestyle/i18n/i18n.properties":'# This is the resource bundle for freestyle\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=freestyle Title\n\n#YDES: Application description\nappDescription=A freestyle application.\n#~~~ Worklist View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Worklist view title\nworklistViewTitle=Manage Books\n\n#XTIT: Worklist page title\nworklistTitle=freestyle Title\n\n#XTIT: Table view title\nworklistTableTitle=Books\n\n#XTOL: Tooltip for the search field\nworklistSearchTooltip=Enter an Books name or a part of it.\n\n#XBLI: text for a table with no data with filter or search\nworklistNoDataWithSearchText=No matching Books found\n\n#XTIT: Table view title with placeholder for the number of items\nworklistTableTitleCount=Books ({0})\n\n#XTIT: The title of the column containing the ID of Books\ntableNameColumnTitle=ID\n\n\n#XTIT: The title of the column containing the ID and the unit of measure\ntableUnitNumberColumnTitle=ID\n\n\n#XBLI: text for a table with no data\ntableNoDataText=No Books are currently available\n\n#XLNK: text for link in \'not found\' pages\nbackToWorklist=Show freestyle Title\n\n#~~~ Object View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Object view title\nobjectViewTitle=Books Details\n\n#XTIT: Object page title\nobjectTitle=Books\n\n#XTIT: Label for the ID\nIDLabel=ID\n\n\n#XTIT: Label for the ID\nIDLabel=ID\n\n\n#~~~ Share Menu Options ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Send E-Mail subject\nshareSendEmailWorklistSubject=<Email subject PLEASE REPLACE ACCORDING TO YOUR USE CASE>\n\n#YMSG: Send E-Mail message\nshareSendEmailWorklistMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE>\\r\\n{0}\n\n#XTIT: Send E-Mail subject\nshareSendEmailObjectSubject=<Email subject including object identifier PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0}\n\n#YMSG: Send E-Mail message\nshareSendEmailObjectMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0} (id: {1})\\r\\n{2}\n\n#~~~ Not Found View ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Not found view title\nnotFoundTitle=Not Found\n\n#YMSG: The Books not found text is displayed when there is no Books with this id\nnoObjectFoundText=This Books is not available\n\n#YMSG: The Books not available text is displayed when there is no data when starting the app\nnoObjectsAvailableText=No Books are currently available\n\n#YMSG: The not found text is displayed when there was an error loading the resource (404 error)\nnotFoundText=The requested resource was not found\n\n#~~~ Error Handling ~~~~~~~~~~~~~~~~~~~~~~~\n\n#YMSG: Error dialog description\nerrorText=Sorry, a technical error occurred! Please try again later.\n\nflpTitle=freestyle title\n\nflpSubtitle=\n',
	"freestyle/manifest.json":'{"_version":"1.48.0","sap.app":{"id":"freestyle","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:worklist","version":"1.8.3","toolsId":"e6d404e7-6cef-4f4d-9f86-b2d82b6cb467"},"dataSources":{"mainService":{"uri":"book-shop/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"freestyle-inbound":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"freestyle","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","icon":""}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.108.4","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"freestyle.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"freestyle.view","controlId":"app","controlAggregation":"pages","bypassed":{"target":["notFound"]},"async":true},"routes":[{"pattern":"","name":"worklist","target":["worklist"]},{"pattern":"Books/{objectId}","name":"object","target":["object"]}],"targets":{"worklist":{"viewName":"Worklist","viewId":"worklist","viewLevel":1,"title":"{i18n>worklistViewTitle}"},"object":{"viewName":"Object","viewId":"object","viewLevel":2,"title":"{i18n>objectViewTitle}"},"objectNotFound":{"viewName":"ObjectNotFound","viewId":"objectNotFound"},"notFound":{"viewName":"NotFound","viewId":"notFound"}}},"rootView":{"viewName":"freestyle.view.App","type":"XML","async":true,"id":"app"}}}',
	"freestyle/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{numberUnit:function(n){if(!n){return""}return parseFloat(n).toFixed(2)}}});
},
	"freestyle/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"freestyle/utils/locate-reuse-libs.js":'(function(e){var t=function(e,t){var n=["sap.apf","sap.base","sap.chart","sap.collaboration","sap.f","sap.fe","sap.fileviewer","sap.gantt","sap.landvisz","sap.m","sap.ndc","sap.ovp","sap.rules","sap.suite","sap.tnt","sap.ui","sap.uiext","sap.ushell","sap.uxap","sap.viz","sap.webanalytics","sap.zen"];Object.keys(e).forEach(function(e){if(!n.some(function(t){return e===t||e.startsWith(t+".")})){if(t.length>0){t=t+","+e}else{t=e}}});return t};var n=function(e){var n="";if(e){if(e["sap.ui5"]&&e["sap.ui5"].dependencies){if(e["sap.ui5"].dependencies.libs){n=t(e["sap.ui5"].dependencies.libs,n)}if(e["sap.ui5"].dependencies.components){n=t(e["sap.ui5"].dependencies.components,n)}}if(e["sap.ui5"]&&e["sap.ui5"].componentUsages){n=t(e["sap.ui5"].componentUsages,n)}}return n};var r=function(e){var t=e;return new Promise(function(r,a){$.ajax(t).done(function(e){r(n(e))}).fail(function(){a(new Error("Could not fetch manifest at \'"+e))})})};var a=function(e){if(e){Object.keys(e).forEach(function(t){var n=e[t];if(n&&n.dependencies){n.dependencies.forEach(function(e){if(e.url&&e.url.length>0&&e.type==="UI5LIB"){jQuery.sap.log.info("Registering Library "+e.componentId+" from server "+e.url);jQuery.sap.registerModulePath(e.componentId,e.url)}})}})}};e.registerComponentDependencyPaths=function(e){return r(e).then(function(e){if(e&&e.length>0){var t="/sap/bc/ui2/app_index/ui5_app_info?id="+e;var n=jQuery.sap.getUriParameters().get("sap-client");if(n&&n.length===3){t=t+"&sap-client="+n}return $.ajax(t).done(a)}})}})(sap);var scripts=document.getElementsByTagName("script");var currentScript=document.getElementById("locate-reuse-libs");if(!currentScript){currentScript=document.currentScript}var manifestUri=currentScript.getAttribute("data-sap-ui-manifest-uri");var componentName=currentScript.getAttribute("data-sap-ui-componentName");var useMockserver=currentScript.getAttribute("data-sap-ui-use-mockserver");var bundleResources=function(){jQuery.sap.require("jquery.sap.resources");var e=sap.ui.getCore().getConfiguration().getLanguage();var t=jQuery.sap.resources({url:"i18n/i18n.properties",locale:e});document.title=t.getText("appTitle")};sap.registerComponentDependencyPaths(manifestUri).catch(function(e){jQuery.sap.log.error(e)}).finally(function(){sap.ui.getCore().attachInit(bundleResources);if(componentName&&componentName.length>0){if(useMockserver&&useMockserver==="true"){sap.ui.getCore().attachInit(function(){sap.ui.require([componentName.replace(/\\./g,"/")+"/localService/mockserver"],function(e){e.init();sap.ushell.Container.createRenderer().placeAt("content")})})}else{sap.ui.require(["sap/ui/core/ComponentSupport"]);sap.ui.getCore().attachInit(bundleResources)}}else{sap.ui.getCore().attachInit(function(){sap.ushell.Container.createRenderer().placeAt("content")})}});sap.registerComponentDependencyPaths(manifestUri);',
	"freestyle/view/App.view.xml":'<mvc:View\n    controllerName="freestyle.controller.App"\n    displayBlock="true"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"><Shell><App\n            id="app"\n            busy="{appView>/busy}"\n            busyIndicatorDelay="{appView>/delay}"/></Shell></mvc:View>',
	"freestyle/view/NotFound.view.xml":'<mvc:View\n    controllerName="freestyle.controller.NotFound"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"><MessagePage\n        title="{i18n>notFoundTitle}"\n        text="{i18n>notFoundText}"\n        icon="sap-icon://document"\n        id="page"\n        description=""><customDescription><Link id="link" text="{i18n>backToWorklist}" press=".onLinkPressed"/></customDescription></MessagePage></mvc:View>',
	"freestyle/view/Object.view.xml":'<mvc:View\n    controllerName="freestyle.controller.Object"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:semantic="sap.f.semantic"><semantic:SemanticPage\n        id="page"\n        headerPinnable="false"\n        toggleHeaderOnTitleClick="false"\n        busy="{objectView>/busy}"\n        busyIndicatorDelay="{objectView>/delay}"><semantic:titleHeading><Title\n                text="{ID}"\n                level="H2"/></semantic:titleHeading><semantic:headerContent><ObjectNumber\n                number="{\n                    path: \'ID\',\n                    formatter: \'.formatter.numberUnit\'\n                }"\n                unit="{ID}" /></semantic:headerContent><semantic:sendEmailAction><semantic:SendEmailAction id="shareEmail" press=".onShareEmailPress"/></semantic:sendEmailAction></semantic:SemanticPage></mvc:View>',
	"freestyle/view/ObjectNotFound.view.xml":'<mvc:View\n    controllerName="freestyle.controller.NotFound"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"><MessagePage\n        title="{i18n>objectTitle}"\n        text="{i18n>noObjectFoundText}"\n        icon="sap-icon://product"\n        description=""\n        id="page"><customDescription><Link id="link" text="{i18n>backToWorklist}" press=".onLinkPressed" /></customDescription></MessagePage></mvc:View>',
	"freestyle/view/Worklist.view.xml":'<mvc:View\n    controllerName="freestyle.controller.Worklist"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:semantic="sap.f.semantic"><semantic:SemanticPage\n        id="page"\n        headerPinnable="false"\n        toggleHeaderOnTitleClick="false"><semantic:titleHeading><Title\n                text="{i18n>worklistTitle}"\n                level="H2"/></semantic:titleHeading><semantic:content><Table\n                id="table"\n                width="auto"\n                items="{\n                    path: \'/Books\',\n                    sorter: {\n                        path: \'ID\',\n                        descending: false\n                    }\n                }"\n                noDataText="{worklistView>/tableNoDataText}"\n                busyIndicatorDelay="{worklistView>/tableBusyDelay}"\n                growing="true"\n                growingScrollToLoad="true"\n                updateFinished=".onUpdateFinished"><headerToolbar><OverflowToolbar><Title\n                            id="tableHeader"\n                            text="{worklistView>/worklistTableTitle}"\n                            level="H3"/><ToolbarSpacer /><SearchField\n                            id="searchField"\n                            tooltip="{i18n>worklistSearchTooltip}"\n                            search=".onSearch"><layoutData><OverflowToolbarLayoutData\n                                    maxWidth="200px"\n                                    priority="NeverOverflow"/></layoutData></SearchField></OverflowToolbar></headerToolbar><columns><Column id="nameColumn"><Text text="{i18n>tableNameColumnTitle}" id="nameColumnTitle"/></Column><Column id="unitNumberColumn" hAlign="End"><Text text="{i18n>tableUnitNumberColumnTitle}" id="unitNumberColumnTitle"/></Column></columns><items><ColumnListItem\n                        type="Navigation"\n                        press=".onPress"><cells><ObjectIdentifier\n                                title="{ID}"/><ObjectNumber\n                                number="{\n                                    path: \'ID\',\n                                    formatter: \'.formatter.numberUnit\'\n                                }"\n                                unit="{ID}" /></cells></ColumnListItem></items></Table></semantic:content><semantic:sendEmailAction><semantic:SendEmailAction id="shareEmail" press=".onShareEmailPress"/></semantic:sendEmailAction></semantic:SemanticPage></mvc:View>'
}});
