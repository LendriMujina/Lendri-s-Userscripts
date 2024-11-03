// ==UserScript==
// @name         Neopets - User Shop HTML Limiter
// @namespace    http://tampermonkey.net/
// @version      2024-11-01
// @description  Limit the size of custom shop descriptions by putting them in a scrollbox with a configurable height.
// @author       Lendri Mujina
// @include      *://*.neopets.com/browseshop*
// @match        *://*.neopets.com/browseshop*
// @icon         https://pets.neopets.com/cp/j58z8q5z/1/1.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configuration: Set the maximum height for the shop description.
    const maxHeight = "300px";

    let pageContent = document.body.innerHTML;

    // Define the regex pattern to find the content within the specific markers. Taken from coreha's Remove Custom User Shop Layouts script.
    const customCode = /<!-- desc start -->[\s\S]*<!-- desc end -->/ig;

    // Replace the matched content with <article> tags and specified styles
    document.body.innerHTML = pageContent.replace(customCode, match => {
        return `<article id="shopDescription" style="max-height:${maxHeight};overflow:auto;">${match}</article>`;
    });
})();
