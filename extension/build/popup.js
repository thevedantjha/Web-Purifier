/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById('toggleButton');
  const styleSelector = document.getElementById('styleSelector');
  const colorPicker = document.getElementById('colorPicker');
  const applyColorButton = document.getElementById('applyColorButton');

  chrome.storage.local.get(['isTheExtensionOn', 'textStyleSelected', 'lightBarColor'], (data) => {
    const isOn = data.isTheExtensionOn || false;
    const textStyle = data.textStyleSelected || 'as-is';
    const lightBarColor = data.lightBarColor || '#008000';

    updateButton(isOn);
    styleSelector.value = textStyle;
    colorPicker.value = lightBarColor;
  });

  toggleButton.addEventListener('click', () => {
    const isCurrentlyOn = toggleButton.classList.contains('toggle-on');
    const newState = !isCurrentlyOn;

    chrome.storage.local.set({ 'isTheExtensionOn': newState }, () => {
      updateButton(newState);
      chrome.tabs.reload();
    });
  });

  styleSelector.addEventListener('change', () => {
    const selectedStyle = styleSelector.value;
    chrome.storage.local.set({ 'textStyleSelected': selectedStyle }, () => {
      chrome.tabs.reload();
    });
  });

  applyColorButton.addEventListener('click', () => {
    const selectedColor = colorPicker.value;
    chrome.storage.local.set({ 'lightBarColor': selectedColor }, () => {
      chrome.tabs.reload();
    });
  });

  function updateButton(isOn) {
    if (isOn) {
      toggleButton.classList.add('toggle-on');
      toggleButton.classList.remove('toggle-off');
      toggleButton.textContent = "ON";
    } else {
      toggleButton.classList.remove('toggle-on');
      toggleButton.classList.add('toggle-off');
      toggleButton.textContent = "OFF";
    }
  }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBLCtCQUErQiw4QkFBOEI7QUFDN0Q7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSwrQkFBK0Isb0NBQW9DO0FBQ25FO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLCtCQUErQixnQ0FBZ0M7QUFDL0Q7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicHVyaWZpZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicHVyaWZpZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwdXJpZmllci8uL3NyYy9wb3B1cC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCB0b2dnbGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9nZ2xlQnV0dG9uJyk7XG4gIGNvbnN0IHN0eWxlU2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R5bGVTZWxlY3RvcicpO1xuICBjb25zdCBjb2xvclBpY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvclBpY2tlcicpO1xuICBjb25zdCBhcHBseUNvbG9yQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcGx5Q29sb3JCdXR0b24nKTtcblxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoWydpc1RoZUV4dGVuc2lvbk9uJywgJ3RleHRTdHlsZVNlbGVjdGVkJywgJ2xpZ2h0QmFyQ29sb3InXSwgKGRhdGEpID0+IHtcbiAgICBjb25zdCBpc09uID0gZGF0YS5pc1RoZUV4dGVuc2lvbk9uIHx8IGZhbHNlO1xuICAgIGNvbnN0IHRleHRTdHlsZSA9IGRhdGEudGV4dFN0eWxlU2VsZWN0ZWQgfHwgJ2FzLWlzJztcbiAgICBjb25zdCBsaWdodEJhckNvbG9yID0gZGF0YS5saWdodEJhckNvbG9yIHx8ICcjMDA4MDAwJztcblxuICAgIHVwZGF0ZUJ1dHRvbihpc09uKTtcbiAgICBzdHlsZVNlbGVjdG9yLnZhbHVlID0gdGV4dFN0eWxlO1xuICAgIGNvbG9yUGlja2VyLnZhbHVlID0gbGlnaHRCYXJDb2xvcjtcbiAgfSk7XG5cbiAgdG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGlzQ3VycmVudGx5T24gPSB0b2dnbGVCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2dnbGUtb24nKTtcbiAgICBjb25zdCBuZXdTdGF0ZSA9ICFpc0N1cnJlbnRseU9uO1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2lzVGhlRXh0ZW5zaW9uT24nOiBuZXdTdGF0ZSB9LCAoKSA9PiB7XG4gICAgICB1cGRhdGVCdXR0b24obmV3U3RhdGUpO1xuICAgICAgY2hyb21lLnRhYnMucmVsb2FkKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHN0eWxlU2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkU3R5bGUgPSBzdHlsZVNlbGVjdG9yLnZhbHVlO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICd0ZXh0U3R5bGVTZWxlY3RlZCc6IHNlbGVjdGVkU3R5bGUgfSwgKCkgPT4ge1xuICAgICAgY2hyb21lLnRhYnMucmVsb2FkKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGFwcGx5Q29sb3JCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRDb2xvciA9IGNvbG9yUGlja2VyLnZhbHVlO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdsaWdodEJhckNvbG9yJzogc2VsZWN0ZWRDb2xvciB9LCAoKSA9PiB7XG4gICAgICBjaHJvbWUudGFicy5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gdXBkYXRlQnV0dG9uKGlzT24pIHtcbiAgICBpZiAoaXNPbikge1xuICAgICAgdG9nZ2xlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3RvZ2dsZS1vbicpO1xuICAgICAgdG9nZ2xlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZS1vZmYnKTtcbiAgICAgIHRvZ2dsZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiT05cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9nZ2xlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZS1vbicpO1xuICAgICAgdG9nZ2xlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3RvZ2dsZS1vZmYnKTtcbiAgICAgIHRvZ2dsZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiT0ZGXCI7XG4gICAgfVxuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==