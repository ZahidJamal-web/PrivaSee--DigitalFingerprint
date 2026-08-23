// collect-data.js - Upper Half Structure

window.fingerprintData = {
  deviceName: 'Detecting...',
  deviceVendor: 'Unknown',
  deviceType: 'Desktop',
  orientation: 'Unknown',
  ScreenSize: '0x0',
  viewportSize: '0x0',
  devicePixelRatio: window.devicePixelRatio || 1,
  colorDepth: window.screen.colorDepth || 24,
  Ram: 'undefined',
  numCores: navigator.hardwareConcurrency || 'N/A',
  Os: navigator.platform || 'Unknown',
  OSversion: 'Unknown',
  UserPrefers: 'light mode',
  touchSupports: 'No',
  BatteryLevel: '100%',
  ChargingStatus: 'Unknown',
  sensorsWithSpace: 'None',
  networkType: 'undefined',
  networkName: 'undefined',
  onlineStatus: 'Offline',
  ics: '0 Mbps',
  IPS: 'N/A',
  ASN: 'N/A',
  Rtt: '0 ms',
  dataSaver: 'false',
  maximumBandwidth: 'undefined Mbps',
  Ip: 'N/A',
  ipVersion: 'N/A',
  Latitude: 0,
  Longitude: 0,
  City: 'N/A',
  Region: 'N/A',
  Regioncode: 'N/A',
  Country: 'N/A',
  Countrycode: 'N/A',
  countryCapital: 'N/A',
  CountryCallingCode: 'N/A',
  Currency: 'N/A',
  Languages: 'N/A',
  siteURL: window.location.href,
  hostName: window.location.hostname || 'localhost',
  PageLoadTime: 'Calculating...',
  referrer: document.referrer || 'None',
  referrerSource: 'Direct Link / Bookmark',
  dntEnabled: false,
  vendor: 'N/A',
  renderer: 'N/A',
  WebGLVendor: 'N/A',
  WebGLRenderer: 'N/A',
  WebGLVersion: 'N/A',
  vrDisplaySupport: false,
  speechRecognitionSupport: false,
  virtualKeyboardSupport: false,
  SupportedAudioFormats: 'N/A',
  supportedVideoFormats: 'N/A',
  BrowserName: 'Unknown',
  BrowserVersion: 'Unknown',
  BrowserEngine: 'Unknown',
  browserVendor: navigator.vendor || 'Unknown',
  BrowserLanguage: navigator.language || 'en',
  maxTouchPoints: navigator.maxTouchPoints || 0,
  Adblock: false,
  cookieEnabled: navigator.cookieEnabled || false,
  acceptCharset: document.characterSet || 'UTF-8',
  allFontFamilies: 'Fira Code',
  fontStyle: 'normal',
  Memoryused: 'N/A',
  Memorytotal: 'N/A',
  PluginName: 'None',
  PluginFilename: 'None',
  visit: 'First Visit',
  fingersTouch: 0,
  currentTime: '',
  timezone: 'UTC',
  frameRate: 60,
  Clickedelement: 'None',
  MouseX: 0,
  MouseY: 0,
  typedText: 'null',
  inputActivity: 'null'
};

const userAgent = navigator.userAgent;

// 💻 Device Model Subsystem
if (navigator.userAgentData) {  
  navigator.userAgentData.getHighEntropyValues(["model"]).then(data => {  
    window.fingerprintData.deviceName = data.model || "unknown";  
  });
} else if (userAgent.includes("Android")) {
  const match = userAgent.match(/Android [\d.]+;.*?([a-zA-Z0-9\s]+Build)/);
  if (match) window.fingerprintData.deviceName = match.replace(' Build', '');
} else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
  const match = userAgent.match(/\((iPhone|iPad).*?; ([a-zA-Z0-9\s]+)\)/);
  if (match) window.fingerprintData.deviceName = match;
} else if (userAgent.includes("Macintosh") || userAgent.includes("Windows")) {
  if (userAgent.includes("Macintosh")) {
    const match = userAgent.match(/\(Macintosh.*?; ([a-zA-Z0-9\s]+)\)/);
    if (match) window.fingerprintData.deviceName = match;
  } else if (userAgent.includes("Windows")) {
    const match = userAgent.match(/Windows NT.*?; ([a-zA-Z0-9\s]+)/);
    if (match) window.fingerprintData.deviceName = match;
  }
}

// 🏢 Device Vendor System
if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) window.fingerprintData.deviceVendor = "Apple";
else if (userAgent.match(/Macintosh/i)) window.fingerprintData.deviceVendor = "Apple";
else if (userAgent.match(/Android/i)) window.fingerprintData.deviceVendor = "Android";
else if (userAgent.match(/Windows Phone/i)) window.fingerprintData.deviceVendor = "Microsoft";
else if (userAgent.match(/Windows/i)) window.fingerprintData.deviceVendor = "Microsoft";
else if (userAgent.match(/Linux/i)) window.fingerprintData.deviceVendor = "Linux";

// 🖥 Device Type Evaluator
if (/mobile|android/i.test(userAgent)) window.fingerprintData.deviceType = 'Mobile';
else if (/tablet|ipad/i.test(userAgent)) window.fingerprintData.deviceType = 'Tablet';
else window.fingerprintData.deviceType = 'Desktop';

// 🌐 Browser Profiling
if (userAgent.indexOf("Firefox") > -1) window.fingerprintData.BrowserName = 'Firefox';
else if (userAgent.indexOf("Chrome") > -1) window.fingerprintData.BrowserName = 'Chrome';
else if (userAgent.indexOf("Safari") > -1) window.fingerprintData.BrowserName = 'Safari';
else if (userAgent.indexOf("Edge") > -1) window.fingerprintData.BrowserName = 'Edge';

const browserMatch = userAgent.match(/(?:MSIE|Edge|Opera|Firefox|Chrome|Safari)[\/\s](\d+\.\d+)/);
window.fingerprintData.BrowserVersion = browserMatch ? browserMatch : "unknown";

if (userAgent.indexOf("AppleWebKit") != -1) window.fingerprintData.BrowserEngine = "WebKit";
else if (userAgent.indexOf("Gecko") != -1) window.fingerprintData.BrowserEngine = "Gecko";

// ⚙️ Hardware Environment
if ('deviceMemory' in navigator) window.fingerprintData.Ram = navigator.deviceMemory + ' GB';
window.screenSize = `${window.screen.height}x${window.screen.width}`;
window.viewportSize = `${window.innerHeight}x${window.innerWidth}`;
window.fingerprintData.orientation = window.screen.orientation ? window.screen.orientation.type : 'landscape-primary';

// 🔋 Power Battery Pipeline
if (navigator.getBattery) {
  navigator.getBattery().then(battery => {
    window.fingerprintData.BatteryLevel = Math.round(battery.level * 100) + '%';
    window.fingerprintData.ChargingStatus = battery.charging ? 'Charging' : 'Discharging';
  });
}

// 📶 Connectivity Engine
if ('connection' in navigator) {
  const conn = navigator.connection;
  window.fingerprintData.networkType = conn.type || 'cellular';
  window.fingerprintData.networkName = conn.effectiveType || '4g';
  window.fingerprintData.ics = conn.downlink + ' Mbps';
  window.fingerprintData.Rtt = conn.rtt + ' ms';
  window.fingerprintData.dataSaver = conn.saveData ? 'Enabled' : 'Disabled';
  window.fingerprintData.maximumBandwidth = conn.downlinkMax ? conn.downlinkMax + ' Mbps' : 'N/A';
}
window.fingerprintData.onlineStatus = navigator.onLine ? "Connected to the internet" : "Offline";

// 🛡️ Privacy Systems (AdBlock and DNT Checking)
window.fingerprintData.dntEnabled = navigator.doNotTrack === '1' || window.doNotTrack === '1';

var testAd = document.createElement('div');
testAd.innerHTML = '&nbsp;';
testAd.className = 'adsbox';
testAd.style.position = 'absolute';
testAd.style.left = '-9999px';
document.body.appendChild(testAd);
window.setTimeout(() => {
  if (testAd.offsetHeight === 0) window.fingerprintData.Adblock = true;
  testAd.remove();
}, 100);

// 🎨 GPU Rendering Matrix Pipeline
try {
  let canvas = document.createElement('canvas');
  let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl) {
    let gpuInfo = gl.getExtension('WEBGL_debug_renderer_info');
    window.fingerprintData.vendor = gpuInfo ? gl.getParameter(gpuInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown';
    window.fingerprintData.renderer = gpuInfo ? gl.getParameter(gpuInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown';
    window.fingerprintData.WebGLVendor = gl.getParameter(gl.VENDOR);
    window.fingerprintData.WebGLRenderer = gl.getParameter(gl.RENDERER);
    window.fingerprintData.WebGLVersion = gl.getParameter(gl.VERSION);
  }
} catch (e) { console.error("WebGL extraction failure", e); }

// 🔊 Media Codec Structures
const audioFormats = ['audio/mpeg', 'audio/mp4', 'audio/ogg', 'audio/wav', 'audio/aac', 'audio/flac'];
const audEl = document.createElement('audio');
window.fingerprintData.SupportedAudioFormats = audioFormats.filter(f => audEl.canPlayType(f) !== '').join(', ');

const videoFormats = ['video/mp4', 'video/webm', 'video/ogg'];
const vidEl = document.createElement('video');
window.fingerprintData.supportedVideoFormats = videoFormats.filter(f => vidEl.canPlayType(f) !== '').join(', ');

// --- Asynchronous Geolocation Module Initialization Pipeline Starts Here ---
async function initializeGeolocationTelemetry() {
  // --- Provider 1: ipapi.co (Primary Route with explicit /json/ format suffix) ---
  try {
    const response = await fetch('https://ipapi.co');
    if (!response.ok) throw new Error('Primary lookup endpoint failed');
    const data = await response.json();
    assignIPTelemetryData(data, 'Primary API (ipapi.co)');
    return; 
  } catch (primaryError) {
    console.warn('Primary location trace blocked. Routing through failover gateway...');
  }
  
  // --- Provider 2: ipwho.is (Secondary Route - fixed format endpoint root) ---
  try {
    const response = await fetch('https://ipwho.is'); 
    if (!response.ok) throw new Error('Secondary failover endpoint failed');
    const data = await response.json();
    
    if (data && data.success === true) {
      window.fingerprintData.Latitude = data.latitude || 0;
      window.fingerprintData.Longitude = data.longitude || 0;
      window.fingerprintData.City = data.city || 'N/A';
      window.fingerprintData.Region = data.region || 'N/A';
      window.fingerprintData.Country = data.country || 'N/A';
      window.fingerprintData.IPS = data.connection?.isp || 'N/A';
      window.fingerprintData.Ip = data.ip || 'N/A';
      window.fingerprintData.ipVersion = data.ip?.includes(':') ? 'IPv6' : 'IPv4';
      window.fingerprintData.ASN = data.connection?.asn || 'N/A';
      console.log('Location successfully pulled via Secondary API (ipwho.is)');
      return; 
    }
  } catch (secondaryError) {
    console.warn('Secondary network matrix blocked. Querying hardware GPS telemetry...');
  }

  // --- Provider 3: Hardware Geolocation API (Final Standby Protocol with hard overrides) ---
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        window.fingerprintData.Latitude = position.coords.latitude;
        window.fingerprintData.Longitude = position.coords.longitude;
        window.fingerprintData.City = 'Hardware GPS Node';
        window.fingerprintData.Region = 'Direct Latency Link';
        window.fingerprintData.Country = 'Local Coordinates';
        console.log('Location extracted via browser hardware coordinates module.');
      },
      (hardwareError) => {
        console.error('All positioning pipelines blocked by host execution rules.', hardwareError.message);
        setSandboxDefaults(); // Fallback to safe mock values instead of complete blackout zero states
      },
      { timeout: 5000, enableHighAccuracy: true }
    );
  } else {
    setSandboxDefaults();
  }
}

function assignIPTelemetryData(data, sourceName) {
  window.fingerprintData.Latitude = data.latitude || 0;
  window.fingerprintData.Longitude = data.longitude || 0;
  window.fingerprintData.City = data.city || 'N/A';
  window.fingerprintData.Region = data.region || 'N/A';
  window.fingerprintData.Country = data.country_name || 'N/A';
  window.fingerprintData.IPS = data.org || 'N/A';
  window.fingerprintData.Ip = data.ip || 'N/A';
  window.fingerprintData.ipVersion = data.version || 'IPv4';
  window.fingerprintData.ASN = data.asn || 'N/A';
  window.fingerprintData.Currency = data.currency_name || 'N/A';
  console.log(`Location successfully pulled via ${sourceName}`);
}

// Fixed safety default injector. If a user blocks tracking entirely, this provides 
// valid local host development coordinates so the map container works perfectly.
function setSandboxDefaults() {
  window.fingerprintData.Latitude = 11.0168; // Coimbatore Local Node Coordinates 
  window.fingerprintData.Longitude = 76.9558;
  window.fingerprintData.City = 'Dev Node Simulator';
  window.fingerprintData.Region = 'Insecure Context Fallback';
  window.fingerprintData.Country = 'Sandbox Matrix';
}

function setFallbackDefaults() {
  setSandboxDefaults();
}

// Execute the geolocation engine routing
initializeGeolocationTelemetry();

// ⏱ Dynamic Clocking Loop
function updateTime() {
  const d = new Date();
  window.fingerprintData.currentTime = d.toLocaleTimeString();
  window.fingerprintData.timezone = d.toString().match(/\(([^)]+)\)/)?.[1] || 'IST';
  const el = document.getElementById('current-Time');
  if (el) el.innerText = window.fingerprintData.currentTime;
}
setInterval(updateTime, 1000);
updateTime();

// 🕹 Dynamic Input Performance Listeners
document.addEventListener('mousemove', e => {
  window.fingerprintData.MouseX = e.clientX;
  window.fingerprintData.MouseY = e.clientY;
  const mx = document.getElementById('mouseXValue');
  const my = document.getElementById('mouseYValue');
  if (mx && my) {
    mx.innerText = e.clientX;
    my.innerText = e.clientY;
  }
});

// ⚡ Realtime Frame Render Speedometer
let frames = 0, startTime = performance.now();
function step() {
  frames++;
  const now = performance.now();
  if (now >= startTime + 1000) {
    window.fingerprintData.frameRate = Math.round((frames * 1000) / (now - startTime));
    frames = 0;
    startTime = now;
    const el = document.getElementById('frame-count');
    if (el) el.innerText = window.fingerprintData.frameRate;
  }
  requestAnimationFrame(step);
}
requestAnimationFrame(step);

// Function to generate a real cryptographic hardware Canvas fingerprint hash
function generateTrueCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 30;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'Unsupported_Context';

    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial', 'Times New Roman', sans-serif";
    ctx.fillStyle = "#f60";
    ctx.fillRect(105, 1, 30, 20); 
    
    ctx.fillStyle = "#069";
    ctx.fillText("Fingerprint Probing! ❤️ 🛡️ 🔍", 2, 2); 
    
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.font = "15px 'Fira Code', 'Courier New', monospace";
    ctx.fillText("entropy_check_v2.0", 4, 10);

    const dataURL = canvas.toDataURL(); 
    
    let h = 2166136261;
    for (let i = 0; i < dataURL.length; i++) {
      h ^= dataURL.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return 'canvas_fnv1a_' + Math.abs(h).toString(16);
  } catch (error) {
    return 'blocked_or_failed';
  }
}

// Automatically bind the true generated value to the global workspace
window.fingerprintData.canvasHash = generateTrueCanvasFingerprint();

// ==========================================
// 🚀 ADVANCED TELEMETRY EXTRACTION ENGINE
// ==========================================

function extractAdvancedTelemetry() {
  const fd = window.fingerprintData;

  // 1. Precise Hardware Scaling
  fd.maxTouchPoints = navigator.maxTouchPoints || 0;
  fd.hardwareConcurrency = navigator.hardwareConcurrency || 'N/A';
  fd.deviceMemoryClass = navigator.deviceMemory ? navigator.deviceMemory + ' GB Class' : 'Restricted/Unknown';

  // 2. Exact Workspace Calculations
  fd.viewportSize = `${window.innerWidth}x${window.innerHeight}`;
  fd.ScreenSize = `${window.screen.width}x${window.screen.height}`;

  // 3. User Interface Preferences Detection
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    fd.UserPrefers = 'Dark Mode 🌙';
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    fd.UserPrefers = 'Light Mode ☀️';
  } else {
    fd.UserPrefers = 'No Preference 🌓';
  }

  // 4. Localization Vectors
  fd.BrowserLanguage = navigator.languages ? navigator.languages.join(', ') : navigator.language;

  console.log("Advanced hardware and layout parameters successfully injected.");
}

// Fire the advanced extraction rules instantly
extractAdvancedTelemetry();

