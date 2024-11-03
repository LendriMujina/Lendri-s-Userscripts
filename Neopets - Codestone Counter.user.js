// ==UserScript==
// @name         Neopets - Codestone Counter
// @namespace    http://tampermonkey.net/
// @version      2024-11-02
// @description  Quickly view required training items, with a link to retrieve them.
// @author       Lendri Mujina
// @match        *.neopets.com/island/training.phtml?type=status*
// @match        *.neopets.com/island/fight_training.phtml?type=status*
// @match        *.neopets.com/pirates/academy.phtml?type=status*
// @icon         https://pets.neopets.com/cp/j58z8q5z/1/1.png
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Define codestones and dubloons to count with image paths
  const itemsToCount = {
    codestones: [
      { name: "Mau", src: "//images.neopets.com/items/codestone1.gif" },
      { name: "Tai-Kai", src: "//images.neopets.com/items/codestone2.gif" },
      { name: "Lu", src: "//images.neopets.com/items/codestone3.gif" },
      { name: "Vo", src: "//images.neopets.com/items/codestone4.gif" },
      { name: "Eo", src: "//images.neopets.com/items/codestone5.gif" },
      { name: "Main", src: "//images.neopets.com/items/codestone6.gif" },
      { name: "Zei", src: "//images.neopets.com/items/codestone7.gif" },
      { name: "Orn", src: "//images.neopets.com/items/codestone8.gif" },
      { name: "Har", src: "//images.neopets.com/items/codestone9.gif" },
      { name: "Bri", src: "//images.neopets.com/items/codestone10.gif" },
      { name: "Mag", src: "//images.neopets.com/items/codestone11.gif" },
      { name: "Vux", src: "//images.neopets.com/items/codestone12.gif" },
      { name: "Cui", src: "//images.neopets.com/items/codestone13.gif" },
      { name: "Kew", src: "//images.neopets.com/items/codestone14.gif" },
      { name: "Sho", src: "//images.neopets.com/items/codestone15.gif" },
      { name: "Zed", src: "//images.neopets.com/items/codestone16.gif" },
    ],
    dubloons: [
      { name: "💀1", src: "//images.neopets.com/items/dubloon1.gif" },
      { name: "💀2", src: "//images.neopets.com/items/dubloon2.gif" },
      { name: "💀5", src: "//images.neopets.com/items/dubloon3.gif" },
    ]
  };

  // Function to count occurrences of each item within the specified DOM container
  function countItems(items, container) {
    return items.map(item => ({
      name: item.name,
      count: container.querySelectorAll(`img[src="${item.src}"]`).length
    }));
  }

function renderTable(counts, link, type) {
  // Set the number of items per row based on the page URL
  const itemsPerRow = window.location.href.includes("island/training.phtml") ? 5 : 3;

  let rows = '';

  // Loop through items and group them into rows
  for (let i = 0; i < counts.length; i += itemsPerRow) {
    const rowItems = counts.slice(i, i + itemsPerRow);
    rows += '<tr>';
    rowItems.forEach(item => {
      rows += `
        <td style="padding: 10px 10px 10px 10px; text-align: left;font-weight:bold;">${item.name}:</td>
        <td style="padding: 10px 10px 10px 10px; text-align: right;">${item.count}</td>
      `;
    });
    rows += '</tr>';
  }

  return `
    <table style="font-family: monospace; width: 100%; max-width: 600px; margin: auto; border-spacing: 10px;">
      <tbody>${rows}</tbody>
    </table>
    <br><a href="${link}">${type} SDB link</a>`;
}

  // Detect the page type and get relevant item counts
  const url = window.location.href;
  const container = document.querySelector('td.content > p > table > tbody'); // Restrict search area
  if (!container) return; // Exit if the specified container is not found

  let counts = [];
  let newHeaderText, sdbLink;

  if (url.includes("island/training")) {
    counts = countItems(itemsToCount.codestones.slice(0, 10), container);
    sdbLink = "https://www.neopets.com/safetydeposit.phtml?obj_name=&category=2";
    newHeaderText = renderTable(counts, sdbLink, "Codestone");
  } else if (url.includes("island/fight_training")) {
    counts = countItems(itemsToCount.codestones.slice(10), container);
    sdbLink = "https://www.neopets.com/safetydeposit.phtml?obj_name=&category=2";
    newHeaderText = renderTable(counts, sdbLink, "Codestone");
  } else if (url.includes("pirates/academy")) {
    counts = countItems(itemsToCount.dubloons, container);
    sdbLink = "https://www.neopets.com/safetydeposit.phtml?obj_name=&category=3";
    newHeaderText = renderTable(counts, sdbLink, "Dubloon");
  }

  // Insert the generated table into the header text element
  const headerText = document.querySelector("td.content > div > p > b") || document.querySelector("td.content > p > b");
  if (headerText) {
    headerText.innerHTML = newHeaderText;
  } else {
    console.warn("Header text not found; unable to display codestone/dubloon count.");
  }
})();
