// ==UserScript==
// @name         Neopets - HTML5 Pet Lookup Fix
// @namespace    http://tampermonkey.net/
// @version      2024-11-02
// @description  Replaces the often-incomplete renders with static images.
// @author       Lendri Mujina
// @include      *://www.neopets.com/petlookup*
// @include      *://www.neopets.com/pl_preview.phtml?pet=*
// @icon         https://pets.neopets.com/cp/j58z8q5z/1/1.png
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
        var nameLocation = document.querySelector('[style="font-weight: bold; font-size: 18px;"]').textContent;
        var petThe = nameLocation.lastIndexOf(" the "); //Though EXTREMELY rare, some very, very old pets created as Grundos may have this substring in their names. This accounts for that.
        var petName = nameLocation.substr(0,petThe);
        let imgContainer = document.querySelector("#CustomNeopetView.pet_image_container");
        imgContainer.style = "width:400px;height:400px;border:1px solid #000;padding-top:0;background:url('http://pets.neopets.com/cpn/" + petName + "/1/7.png') center / cover no-repeat;";
        document.querySelector("#CustomNeopetView > div").style = "display:none;";
}
 )();
