// ==UserScript==
// @name         Just For Fun - Curse of Eliv Thade
// @namespace    http://tampermonkey.net/
// @version      2024-11-03
// @description  Surnt vyeer rodw no reyve bweetis noit na magnara!
// @match        *://*/*
// @author       Lendri Mujina
// @icon         https://images.neopets.com/images/buddy/aim_eliv_blink.gif
// @grant        none
// ==/UserScript==

//This is a novelty script that will affect ALL pages. Turn off when not toying around.

(function() {
  'use strict';

  // Function to shuffle characters in a word while preserving original casing
  function shuffleWord(word) {
    const letters = word.toLowerCase().split("");
    const isUpperCase = [...word].map(char => char === char.toUpperCase());

    let currentIndex = letters.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [letters[currentIndex], letters[randomIndex]] = [letters[randomIndex], letters[currentIndex]];
    }

    return letters.map((char, index) => isUpperCase[index] ? char.toUpperCase() : char).join("");
  }

  // Function to process and shuffle words in text nodes
  function processTextNode(node) {
    const words = node.textContent.split(/\b/); // Split by word boundaries to preserve spaces/punctuation
    const scrambledText = words.map(word => {
      return /\w+/.test(word) ? shuffleWord(word) : word;
    }).join("");

    node.textContent = scrambledText;
  }

  // Recursive function to walk through the DOM and process text nodes
  function walkDom(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node);
    } else {
      node.childNodes.forEach(child => walkDom(child));
    }
  }

  // Run the script
  walkDom(document.body);

})();
