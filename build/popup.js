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
  const hoverViewCheckbox = document.getElementById('hoverViewCheckbox');
  const hoverEmoji = document.getElementById('hoverEmoji');

  chrome.storage.local.get(['isTheExtensionOn', 'textStyleSelected', 'lightBarColor', 'hoverUnblur'], (data) => {
    const isOn = data.isTheExtensionOn || false;
    const textStyle = data.textStyleSelected || 'as-is';
    const lightBarColor = data.lightBarColor || '#008000';
    const hoverUnblur = data.hoverUnblur !== undefined ? data.hoverUnblur : true;


    updateButton(isOn);
    styleSelector.value = textStyle;
    colorPicker.value = lightBarColor;
    hoverViewCheckbox.checked = hoverUnblur;
    updateHoverEmoji(hoverUnblur);
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
    const hoverUnblur = hoverViewCheckbox.checked;

    chrome.storage.local.set({
      'lightBarColor': selectedColor,
      'hoverUnblur': hoverUnblur
    }, () => {
      chrome.tabs.reload();
    });
  });

  hoverViewCheckbox.addEventListener('change', () => {
    updateHoverEmoji(hoverViewCheckbox.checked);
  });

  function updateHoverEmoji(isChecked) {
    hoverEmoji.textContent = isChecked ? "✓" : "✕";
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLDhCQUE4QjtBQUM3RDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLCtCQUErQixvQ0FBb0M7QUFDbkU7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWxheGVkLXdlYi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZWxheGVkLXdlYi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JlbGF4ZWQtd2ViLy4vc3JjL3BvcHVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IHRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGVCdXR0b24nKTtcbiAgY29uc3Qgc3R5bGVTZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHlsZVNlbGVjdG9yJyk7XG4gIGNvbnN0IGNvbG9yUGlja2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yUGlja2VyJyk7XG4gIGNvbnN0IGFwcGx5Q29sb3JCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwbHlDb2xvckJ1dHRvbicpO1xuICBjb25zdCBob3ZlclZpZXdDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3ZlclZpZXdDaGVja2JveCcpO1xuICBjb25zdCBob3ZlckVtb2ppID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdmVyRW1vamknKTtcblxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoWydpc1RoZUV4dGVuc2lvbk9uJywgJ3RleHRTdHlsZVNlbGVjdGVkJywgJ2xpZ2h0QmFyQ29sb3InLCAnaG92ZXJVbmJsdXInXSwgKGRhdGEpID0+IHtcbiAgICBjb25zdCBpc09uID0gZGF0YS5pc1RoZUV4dGVuc2lvbk9uIHx8IGZhbHNlO1xuICAgIGNvbnN0IHRleHRTdHlsZSA9IGRhdGEudGV4dFN0eWxlU2VsZWN0ZWQgfHwgJ2FzLWlzJztcbiAgICBjb25zdCBsaWdodEJhckNvbG9yID0gZGF0YS5saWdodEJhckNvbG9yIHx8ICcjMDA4MDAwJztcbiAgICBjb25zdCBob3ZlclVuYmx1ciA9IGRhdGEuaG92ZXJVbmJsdXIgIT09IHVuZGVmaW5lZCA/IGRhdGEuaG92ZXJVbmJsdXIgOiB0cnVlO1xuXG5cbiAgICB1cGRhdGVCdXR0b24oaXNPbik7XG4gICAgc3R5bGVTZWxlY3Rvci52YWx1ZSA9IHRleHRTdHlsZTtcbiAgICBjb2xvclBpY2tlci52YWx1ZSA9IGxpZ2h0QmFyQ29sb3I7XG4gICAgaG92ZXJWaWV3Q2hlY2tib3guY2hlY2tlZCA9IGhvdmVyVW5ibHVyO1xuICAgIHVwZGF0ZUhvdmVyRW1vamkoaG92ZXJVbmJsdXIpO1xuICB9KTtcblxuICB0b2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgaXNDdXJyZW50bHlPbiA9IHRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZ2dsZS1vbicpO1xuICAgIGNvbnN0IG5ld1N0YXRlID0gIWlzQ3VycmVudGx5T247XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnaXNUaGVFeHRlbnNpb25Pbic6IG5ld1N0YXRlIH0sICgpID0+IHtcbiAgICAgIHVwZGF0ZUJ1dHRvbihuZXdTdGF0ZSk7XG4gICAgICBjaHJvbWUudGFicy5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgc3R5bGVTZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRTdHlsZSA9IHN0eWxlU2VsZWN0b3IudmFsdWU7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ3RleHRTdHlsZVNlbGVjdGVkJzogc2VsZWN0ZWRTdHlsZSB9LCAoKSA9PiB7XG4gICAgICBjaHJvbWUudGFicy5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgYXBwbHlDb2xvckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZENvbG9yID0gY29sb3JQaWNrZXIudmFsdWU7XG4gICAgY29uc3QgaG92ZXJVbmJsdXIgPSBob3ZlclZpZXdDaGVja2JveC5jaGVja2VkO1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICdsaWdodEJhckNvbG9yJzogc2VsZWN0ZWRDb2xvcixcbiAgICAgICdob3ZlclVuYmx1cic6IGhvdmVyVW5ibHVyXG4gICAgfSwgKCkgPT4ge1xuICAgICAgY2hyb21lLnRhYnMucmVsb2FkKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGhvdmVyVmlld0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICB1cGRhdGVIb3ZlckVtb2ppKGhvdmVyVmlld0NoZWNrYm94LmNoZWNrZWQpO1xuICB9KTtcblxuICBmdW5jdGlvbiB1cGRhdGVIb3ZlckVtb2ppKGlzQ2hlY2tlZCkge1xuICAgIGhvdmVyRW1vamkudGV4dENvbnRlbnQgPSBpc0NoZWNrZWQgPyBcIuKck1wiIDogXCLinJVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUJ1dHRvbihpc09uKSB7XG4gICAgaWYgKGlzT24pIHtcbiAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0b2dnbGUtb24nKTtcbiAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2dnbGUtb2ZmJyk7XG4gICAgICB0b2dnbGVCdXR0b24udGV4dENvbnRlbnQgPSBcIk9OXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2dnbGUtb24nKTtcbiAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0b2dnbGUtb2ZmJyk7XG4gICAgICB0b2dnbGVCdXR0b24udGV4dENvbnRlbnQgPSBcIk9GRlwiO1xuICAgIH1cbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=