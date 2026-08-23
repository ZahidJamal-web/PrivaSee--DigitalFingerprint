// default-command.js - Shell Commands Parser Interface

function initializeInteractiveShell() {
  const outputEl = document.querySelector(".terminal-screen");
  if (!outputEl) return;

  // Append a fresh interactive line element
  const inputRow = document.createElement("div");
  inputRow.className = "command-line-wrapper";
  inputRow.innerHTML = `
    <div class="command-line" style="display:flex; align-items:center; gap:8px; margin-top:8px;">
      <span class="prompt" style="font-family:var(--font-mono); color:var(--accent-green)"><b>root@df:</b>~$</span>
      <input type="text" class="terminal-input-field" 
             style="background:none; border:none; color:var(--text-primary); font-family:var(--font-mono); outline:none; flex:1;" 
             placeholder="type 'help'...">
    </div>
  `;
  outputEl.appendChild(inputRow);
  
  const inputField = inputRow.querySelector(".terminal-input-field");
  inputField.focus();

  inputField.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      const commandString = this.value.trim().toLowerCase();
      this.disabled = true;
      this.removeAttribute("placeholder");

      const printResponse = document.createElement("div");
      printResponse.style.margin = "4px 0";
      printResponse.style.fontFamily = "var(--font-mono)";
      outputEl.appendChild(printResponse);

      if (commandString === "help") {
        printResponse.innerHTML = `
          <div style="color:var(--text-secondary)">Available Interface Directives:</div>
          <ul style="list-style:none; padding-left:8px; color:var(--accent-cyan)">
            <li>• <b style="color:#fff">help</b> - Render shell instruction map.</li>
            <li>• <b style="color:#fff">df</b> - Digital Fingerprint core information.</li>
            <li>• <b style="color:#fff">diagnose</b> - Re-evaluate and compile telemetry arrays.</li>
            <li>• <b style="color:#fff">clear</b> - Wipe current active logs from console view.</li>
          </ul>
        `;
      } else if (commandString === "df") {
        printResponse.innerHTML = `
          <p style="color:var(--text-secondary); font-size:0.85rem; line-height:1.4">
            Digital Fingerprinting uses browser metrics to profile devices without tracking cookies. 
            This interface displays how simple JS vectors leak explicit tracking telemetry parameters.
          </p>
        `;
      } else if (commandString === "diagnose") {
        printResponse.innerHTML = `<span style="color:var(--accent-amber)">Re-initializing data scanner routines...</span>`;
        setTimeout(() => { runPrint(); }, 800);
        return;
      } else if (commandString === "clear") {
        outputEl.innerHTML = "";
        initializeInteractiveShell();
        return;
      } else if (commandString !== "") {
        printResponse.innerHTML = `<span style="color:var(--accent-red)">Command not found: '${commandString}'. Type 'help' for instructions.</span>`;
      }

      // Re-trigger the active shell row automatically
      initializeInteractiveShell();
      outputEl.scrollTop = outputEl.scrollHeight;
    }
  });
}

// Global hook processing safe text validation entries
function inputData(event) {
  if(window.fingerprintData) {
    window.fingerprintData.typedText = event.target.value;
    window.fingerprintData.inputActivity = event.inputType || 'keydown';
  }
}

// Keep tab status updates clean
let preservedTitle = document.title;
window.addEventListener("blur", () => { document.title = "⚠️ Probe Suspended"; });
window.addEventListener("focus", () => { document.title = preservedTitle; });
