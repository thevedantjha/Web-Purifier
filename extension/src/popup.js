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
