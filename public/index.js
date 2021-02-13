/**
  LICENSE: https://github.com/MustafaTRK/wifi-qrcard/blob/main/LICENSE
  Source Code: https://github.com/MustafaTRK/wifi-qrcard/
*/

let main, root, wifiQr, wifiSsid = "", wifiPassword = "", title = "", note = "";

window.onload = () => {
  main = document.getElementById('app');

  main.innerHTML = `
  <i onclick="toggleSettingsScreen();" id="settingsButton" class="fas fa-cog"></i>
  <div id="settingsScreen">
    <div id="settings">
      <div class="input">
        <label>Background color:&nbsp;</label>
        <input spellcheck="false" ground="back" onchange="onColorChange(this);" type="color" value="#212121">
      </div>
      <div class="input">
        <label>Foreground color:&nbsp;</label>
        <input spellcheck="false" ground="fore" onchange="onColorChange(this);" type="color" value="#eeb416">
      </div>
      <div class="input">
        <label>QRCard Title:&nbsp;</label>
        <input spellcheck="false" id="title" onchange="onInputChange(this);" type="text" value="WiFi QRCard" placeholder="Title">
      </div>
      <div class="input">
        <label>WiFi SSID:&nbsp;</label>
        <input spellcheck="false" id="wifiSsid" onchange="onInputChange(this);" type="text" value="MyWireless" placeholder="SSID">
      </div>
      <div class="input">
        <label>WiFi Password:&nbsp;</label>
        <input spellcheck="false" id="wifiPassword" onchange="onInputChange(this);" type="text" value="Awesome2021" placeholder="Password">
      </div>
      <div class="input">
        <label>Note:&nbsp;</label>
        <input spellcheck="false" id="note" onchange="onInputChange(this);" type="text" placeholder="Note">
      </div>
    </div>
  </div>
  <div id="mainScreen">
    <div id="wifi-qrcard">
      <span class="info">WiFi QRCard</span>
      <canvas id="wifi-qr" width="180" height="180"></canvas>
      <div id="wifi-info">
        <span class="title">&nbsp;WiFi QRCard&nbsp;</span>
        <span class="ssid">SSID: <span class="value">MyWireless</span></span>
        <span class="password">Password: <span class="value">Awesome2021</span></span>
        <span class="note"></span>
      </div>
    </div>
  </div>
  <span class="generalInfo">
    You can print this page (with <a href="javascript:window.print();">Ctrl + P</a>) or take a screenshot!
    <br>
    Then, show this card to those who want to use WiFi!
  </span>
  <span class="sourceCode">
    View to <a href="https://github.com/MustafaTRK/wifi-qrcard" target="_blank" rel="noopener noreferrer">source code</a>!
  </span>`;

  root = document.documentElement;
  wifiQr = document.getElementById("wifi-qr");

  root.style.setProperty('--background-color', "33,33,33");
  root.style.setProperty('--foreground-color', "238,180,22");

  QRCode.toCanvas(wifiQr, `https://mustafatrk.github.io/wifi-qrcard`, {
    color: {
      dark: rgb2hex(root.style.getPropertyValue('--foreground-color')),
      light: rgb2hex(root.style.getPropertyValue('--background-color'))
    },
    width: 180
  }, function(error) {});
};

function toggleSettingsScreen() {
  let settingsButton = document.getElementById('settingsButton');
  let settingsScreen = document.getElementById('settingsScreen');
  let mainScreen = document.getElementById('mainScreen');
  settingsButton.className = settingsButton.className == 'fas fa-cog' ? 'fas fa-times' : 'fas fa-cog';
  settingsScreen.style.display = settingsScreen.style.display == 'block' ? 'none' : 'block';
  mainScreen.style.display = mainScreen.style.display == 'none' ? 'block' : 'none';
  drawWifiQr();
};

function drawWifiQr(ssid, password) {
  ssid = ssid || wifiSsid || "";
  password = password || wifiPassword || "";
  if (ssid == null || ssid == "") {
    QRCode.toCanvas(wifiQr, `https://mustafatrk.github.io/wifi-qrcard`, {
      color: {
        dark: rgb2hex(root.style.getPropertyValue('--foreground-color')),
        light: rgb2hex(root.style.getPropertyValue('--background-color'))
      },
      width: 180
    }, function(error) {});
  } else {
    QRCode.toCanvas(wifiQr, `WIFI:T:WPA;S:${ssid};P:${password};`, {
      color: {
        dark: rgb2hex(root.style.getPropertyValue('--foreground-color')),
        light: rgb2hex(root.style.getPropertyValue('--background-color'))
      },
      width: 180
    }, function(error) {});
  };
}

function onColorChange(input) {
  if (input.getAttribute('ground') == 'back') {
    root.style.setProperty('--background-color', hex2rgb(input.value));
  } else if (input.getAttribute('ground') == 'fore') {
    root.style.setProperty('--foreground-color', hex2rgb(input.value));
  };
};

function hex2rgb(hex) {
  let _r = parseInt(hex.substr(1,2), 16);
  let _g = parseInt(hex.substr(3,2), 16);
  let _b = parseInt(hex.substr(5,2), 16);
  return [_r, _g, _b];
};

function rgb2hex(rgb) {
  rgb = rgb.split(",");
  let _r = parseInt(rgb[0]).toString(16);
  let _g = parseInt(rgb[1]).toString(16);
  let _b = parseInt(rgb[2]).toString(16);
  return (_r.length == 1 ? "0" + _r : _r) + (_g.length == 1 ? "0" + _g : _g) + (_b.length == 1 ? "0" + _b : _b); 
};

function onInputChange(input) {
  if (input.id == 'wifiSsid') {
    wifiSsid = input.value;
    document.querySelector('span.ssid span.value').innerText = wifiSsid;
  } else if (input.id == 'wifiPassword') {
    wifiPassword = input.value;
    document.querySelector('span.password span.value').innerText = wifiPassword;
  } else if (input.id == 'title') {
    title = input.value;
    document.querySelector('span.title').innerHTML = "&nbsp;" + title + "&nbsp;";
  } else if (input.id == 'note') {
    note = input.value;
    document.querySelector('span.note').innerText = note;
  };
};