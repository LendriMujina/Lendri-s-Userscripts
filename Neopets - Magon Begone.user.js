// ==UserScript==
// @name         Neopets - Magon Begone
// @namespace    http://tampermonkey.net/
// @version      2024-11-03
// @description  Makes the lingering remnants of the Brightvale portal event go away.
// @author       Lendri Mujina
// @include      *.neopets.com/medieval/brightvale.phtml
// @downloadURL  https://raw.githubusercontent.com/LendriMujina/Lendri-s-Userscripts/refs/heads/main/Neopets%20-%20Magon%20Begone.user.js
// @icon         https://pets.neopets.com/cp/j58z8q5z/1/1.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
let nodes = document.querySelectorAll(".nh-masthead, .accordionWrapper");
    for (let i=0;i<nodes.length;i++){
     nodes[i].style.display = "none";
    }
    // Your code here...
})();
