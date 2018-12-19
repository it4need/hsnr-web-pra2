//------------------------------------------------------------------------------
//Demonstrator evs/tco/tmg
//------------------------------------------------------------------------------
// rev. 0, 21.11.2018, Bm
//------------------------------------------------------------------------------
// hier zur Vereinfachung (!) die Klassen in einer Datei

'use strict';
var isStrict = (function() { return !this; })();

window.onload = function () {
    APPUTIL.es_o = new APPUTIL.EventService_cl();
    var app_o = new Application_cl();
    APPUTIL.createTemplateManager_px();
}