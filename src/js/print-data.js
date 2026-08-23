// print-data.js - UI Rendering Engine

const commandLine = document.querySelector(".command-line");
const screen = document.querySelector(".screen");
const output = document.querySelector(".output");

// Simple helper function to apply a badge state safely
function applyBadge(elementId, value, trueText, falseText) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerText = value ? trueText : falseText;
  el.className = 'badge ' + (value ? 'badge-success' : 'badge-danger');
}

function updateVisualDashboard(fd) {
  // Update Card 1: Hardware Specifications
  if(document.getElementById('val-device-type')) {
    document.getElementById('val-device-type').innerText = `${fd.deviceVendor} (${fd.deviceType})`;
  }
  if(document.getElementById('val-cpu')) document.getElementById('val-cpu').innerText = fd.numCores;
  if(document.getElementById('val-ram')) document.getElementById('val-ram').innerText = fd.Ram;
  if(document.getElementById('val-gpu') && fd.renderer) {
    document.getElementById('val-gpu').innerText = fd.renderer.split(' vs_')[0];
  }

  // Update Card 2: Browser & Software Environment
  if(document.getElementById('val-browser-name')) {
    document.getElementById('val-browser-name').innerText = `${fd.BrowserName} [Engine: ${fd.BrowserEngine}]`;
  }
  if(document.getElementById('val-screen-size')) document.getElementById('val-screen-size').innerText = fd.ScreenSize;
  
  if(document.getElementById('val-js-heap')) {
    document.getElementById('val-js-heap').innerText = (window.performance?.memory) ? 
      (window.performance.memory.usedJSHeapSize / 1048576).toFixed(1) + ' MB' : 'Not Supported';
  }
  applyBadge('badge-cookies', fd.cookieEnabled, 'Cookie Enabled', 'Cookie Blocked');

    // --- New Hardware Elements Binder ---
  if(document.getElementById('val-cpu-cores')) {
    document.getElementById('val-cpu-cores').innerText = fd.hardwareConcurrency || 'N/A';
  }
  if(document.getElementById('val-ram-class')) {
    document.getElementById('val-ram-class').innerText = fd.deviceMemoryClass || 'Unknown';
  }
  if(document.getElementById('val-max-touch')) {
    document.getElementById('val-max-touch').innerText = fd.maxTouchPoints || '0';
  }

  // --- New Software/Environment Elements Binder ---
  if(document.getElementById('val-viewport-size')) {
    document.getElementById('val-viewport-size').innerText = fd.viewportSize || '0x0';
  }
  if(document.getElementById('val-color-scheme')) {
    document.getElementById('val-color-scheme').innerText = fd.UserPrefers || 'Unknown';
  }
  if(document.getElementById('val-browser-lang')) {
    document.getElementById('val-browser-lang').innerText = fd.BrowserLanguage || 'en-IN';
  }


  // Update Card 3: Network Mechanics
  if(document.getElementById('val-net-type')) document.getElementById('val-net-type').innerText = fd.networkType.toUpperCase();
  if(document.getElementById('val-net-speed')) document.getElementById('val-net-speed').innerText = fd.ics;
  if(document.getElementById('val-rtt')) document.getElementById('val-rtt').innerText = fd.Rtt;
  if(document.getElementById('val-battery')) document.getElementById('val-battery').innerText = `${fd.BatteryLevel} (${fd.ChargingStatus})`;

  // Update Card 4: Real Security Leak Check
  applyBadge('badge-adblock', fd.Adblock, 'Protected', 'AdBlock Absent');
  applyBadge('badge-dnt', fd.dntEnabled, 'DNT On', 'No DNT Leak');
  
  // Bind your accurate cryptographic canvas & audio hashes directly to the UI elements
  if(document.getElementById('val-canvas-hash')) {
    document.getElementById('val-canvas-hash').innerText = fd.canvasHash || 'sn3_hash_disabled';
  }
  if(document.getElementById('val-audio-hash')) {
    document.getElementById('val-audio-hash').innerText = fd.audioHash || 'aud_sig_' + Math.abs((fd.SupportedAudioFormats + fd.numCores).hashCode()).toString(16);
  }

  // Initialize Map Framework safely once telemetry data stabilizes
  renderTelemetryMap(fd.Latitude, fd.Longitude, `${fd.City}, ${fd.Country}`);
}

let currentLeafletMap = null;
function renderTelemetryMap(lat, lng, locationString) {
  const mapElement = document.getElementById('telemetry-map');
  
  // Check if coordinates exist or if access was completely denied (0 values)
  if (!mapElement || !lat || lat === 0) {
    if(mapElement) mapElement.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--accent-red); font-family: var(--font-mono);">[!] Geolocation Telemetry Blocked or Unavailable</div>`;
    return;
  }
  
  if (currentLeafletMap) currentLeafletMap.remove();
  
  // Create and construct your functional mapping window
  currentLeafletMap = L.map('telemetry-map').setView([lat, lng], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Telemetry Mapping System'
  }).addTo(currentLeafletMap);

  // Crucial rendering engine size dimensions calculation patch
  setTimeout(() => { 
    if(currentLeafletMap) currentLeafletMap.invalidateSize(); 
  }, 250);

  L.marker([lat, lng]).addTo(currentLeafletMap)
    .bindPopup(`<b>Target Node Identified</b><br>${locationString}`)
    .openPopup();
}

// String Hashing Helper for unique fingerprint identities
String.prototype.hashCode = function() {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    hash = (hash << 5) - hash + this.charCodeAt(i);
    hash |= 0;
  }
  return hash;
};

function runPrint() {
  const targetOutput = document.querySelector(".output") || output;
  if(!targetOutput) return;

  targetOutput.innerHTML = `
    <div class="command-line"><span class="prompt"><b>root@df:</b>~$</span><input type="text" value="pip install df" disabled></div>
    <div><b id="fetching-data">Probing Node Parameters... <span id="loading-value">0%</span></b></div>
    <div id="progress-bar" style="width: 0%; background-color: #06b6d4; transition: all 0.1s ease; height: 4px; margin-bottom: 12px; border-radius: 2px;"></div>
  `;

  let percentage = 0;
  const loop = setInterval(() => {
    percentage += 5;
    if (percentage <= 100) {
      const pBar = document.getElementById("progress-bar");
      const lVal = document.getElementById("loading-value");
      if(pBar) pBar.style.width = `${percentage}%`;
      if(lVal) lVal.innerText = `${percentage}%`;
    } else {
      clearInterval(loop);
      const fData = document.getElementById("fetching-data");
      if(fData) fData.innerHTML = "<span style='color:#10b981'>Telemetry Matrix Download Complete.</span>";

      const fd = window.fingerprintData || {};
      updateVisualDashboard(fd);

      const logs = [
        `<b>[SYSTEM] Device Identifier:</b> ${fd.deviceName || 'Unknown'}`,
        `<b>[SYSTEM] OS Architecture:</b> ${fd.Os || 'Unknown'} (${fd.deviceType || 'Desktop'})`,
        `<b>[BROWSER] Identity Matrix:</b> ${fd.BrowserName || 'Browser'} v${fd.BrowserVersion || '1.0'}`,
        `<b>[NETWORK] Assigned Address:</b> ${fd.Ip || 'N/A'} via ${fd.IPS || 'N/A'}`,
        `<b>[SECURITY] AdBlock Engine Active:</b> <span style="color:${fd.Adblock ? '#10b981':'#ef4444'}">${fd.Adblock || false}</span>`,
        `<b>[TELEMETRY] Coordinates Linked:</b> Lat ${fd.Latitude || 0} / Lng ${fd.Longitude || 0}`
      ];

      let logIdx = 0;
      const logPrinter = setInterval(() => {
        if (logIdx < logs.length) {
          const line = document.createElement("div");
          line.innerHTML = logs[logIdx];
          line.className = 'font-mono text-small';
          targetOutput.appendChild(line);
          logIdx++;
          const screenElement = document.querySelector('.terminal-screen') || document.querySelector('.screen');
          if (screenElement) screenElement.scrollTop = screenElement.scrollHeight;
        } else {
          clearInterval(logPrinter);
          if (typeof initializeInteractiveShell === "function") {
            initializeInteractiveShell();
          }
        }
      }, 150);
    }
  }, 50);
}

window.addEventListener('DOMContentLoaded', runPrint);
