// ==UserScript==
// @name         GeoFS - Etihad A380 Mach 50
// @namespace    geofs-custom
// @version      1.2
// @description  A380 Etihad Mach 50 avec autopilote, visible dans GeoFS
// @match        https://*.geo-fs.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const aircraftDefinition = {
        id: "etihad-a380-mach50",
        livery: 0,
        category: 4,
        url: "https://cdn.jsdelivr.net/gh/Lucavador49/geofs-etihad-a380@main/etihad.xml",
        title: "Etihad A380 Mach 50",
        description: "A380 Etihad customisé, Mach 50 avec autopilote",
        author: "TonNom",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Etihad_Airways_A380_A6-APA_LHR_2015_01.jpg/320px-Etihad_Airways_A380_A6-APA_LHR_2015_01.jpg"
    };

    function waitForGeoFS() {
        if (window.geofs?.api?.aircraft?.AIRCRAFT) {
            geofs.api.aircraft.AIRCRAFT.push(aircraftDefinition);
            console.log("✅ Avion ajouté à GeoFS : Etihad A380 Mach 50");
        } else {
            console.log("⏳ Chargement de GeoFS en cours...");
            setTimeout(waitForGeoFS, 1000);
        }
    }

    waitForGeoFS();

    setInterval(() => {
        const ac = geofs?.aircraft?.instance;
        if (ac?.id === "etihad-a380-mach50") {
            ac.engines?.forEach(e => e.setThrust(1e7));
            ac.maxSpeed = 30000;
            ac.autopilotAltitudeHold = true;
            ac.autopilotSpeedHold = true;
            ac.autopilotHeadingHold = true;
        }
    }, 1000);
})();
