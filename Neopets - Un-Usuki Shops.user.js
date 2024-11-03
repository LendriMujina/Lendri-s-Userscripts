// ==UserScript==
// @name         Neopets - Un-Usuki Shops
// @namespace    http://tampermonkey.net/
// @version      2024-11-02
// @description  Replaces that repetitive avatar shopkeeper image with a random one.
// @author       Lendri Mujina
// @include      *://*.neopets.com/browseshop*
// @match        *://*.neopets.com/browseshop*
// @downloadURL  https://raw.githubusercontent.com/LendriMujina/Lendri-s-Userscripts/refs/heads/main/Neopets%20-%20Un-Usuki%20Shops.user.js
// @icon         https://pets.neopets.com/cp/j58z8q5z/1/1.png
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Generate a range of numbers excluding specific values
  function generateRangeExcluding(start, end, exclude) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
      .filter(num => !exclude.includes(num));
  }

  // Get the file name from a URL
  function getFileName(url) {
    return url.split('/').pop();
  }

  // Get the shopkeeper image element and apply a temporary style to hide it
  const shopkeeper = document.querySelector('td.content > div[align="center"] > img');
  if (!shopkeeper) return; // Exit if no shopkeeper image is found

  shopkeeper.style.visibility = "hidden"; // Hide the image temporarily

  // Extract the filename and determine if the transparent version is used
  let imgFilename = getFileName(shopkeeper.src).slice(0, -4);
  let transparency = imgFilename.startsWith("t_") ? "t_" : "";
  if (transparency) imgFilename = imgFilename.slice(2);

  // Define a selection range, excluding specific broken images
  const excludedImages = [1684, 1685, 1686, 1687, 1998, 1999, 2000, 2050];
  let selection = imgFilename === "233"
    ? generateRangeExcluding(1, 2317, excludedImages)[Math.floor(Math.random() * 2316)]
    : imgFilename;

  // Set the new shopkeeper image source
  const newImageUrl = `https://images.neopets.com/new_shopkeepers/${transparency}${selection}.gif`;
  shopkeeper.src = newImageUrl;

  // Once the image is loaded, make it visible again
  shopkeeper.onload = () => {
    shopkeeper.style.visibility = "visible";
  };

})();
