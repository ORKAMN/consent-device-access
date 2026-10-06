export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(INDEX_HTML, {
        headers: {"content-type": "text/html; charset=UTF-8"}
      });
    }
    return new Response("Not found", {status: 404});
  }
};

const INDEX_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Device Access — User Consent</title>
  <style>
    body{font-family:system-ui,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;line-height:1.5}
    button{padding:12px 16px;margin:6px 4px 6px 0;border:0;border-radius:8px;cursor:pointer}
    .card{padding:20px;border:1px solid #ddd;border-radius:14px}
    video{width:100%;max-height:360px;background:#111;border-radius:10px;margin-top:12px}
    #status{white-space:pre-wrap}
  </style>
</head>
<body>
  <div class="card">
    <h1>Device Access Request</h1>
    <p>This page requests device permissions only after you choose an action. Your browser will show its own permission prompt. Nothing is accessed silently.</p>
    <ul>
      <li>Camera — optional</li>
      <li>Microphone — optional</li>
      <li>Location — optional</li>
      <li>Files — selected by you through the system file picker</li>
      <li>Screen — selected by you through the browser's screen-sharing dialog</li>
    </ul>

    <button onclick="requestCamera()">Allow Camera</button>
    <button onclick="requestMicrophone()">Allow Microphone</button>
    <button onclick="requestLocation()">Allow Location</button>
    <button onclick="chooseFiles()">Choose Files</button>
    <button onclick="shareScreen()">Share Screen</button>
    <button onclick="stopAll()">Stop Camera/Mic/Screen</button>

    <input id="files" type="file" multiple hidden onchange="showFiles()">
    <video id="preview" autoplay playsinline muted></video>
    <p id="status">No permission has been requested.</p>
  </div>

<script>
let streams = [];

function log(msg){ document.getElementById('status').textContent = msg; }

async function requestCamera(){
  try{
    const s = await navigator.mediaDevices.getUserMedia({video:true});
    streams.push(s);
    document.getElementById('preview').srcObject = s;
    log("Camera permission granted by the user.");
  }catch(e){ log("Camera was not granted: " + e.name); }
}

async function requestMicrophone(){
  try{
    const s = await navigator.mediaDevices.getUserMedia({audio:true});
    streams.push(s);
    log("Microphone permission granted by the user.");
  }catch(e){ log("Microphone was not granted: " + e.name); }
}

function requestLocation(){
  if(!navigator.geolocation){ return log("Geolocation is not supported by this browser."); }
  navigator.geolocation.getCurrentPosition(
    p => log("Location permission granted.\\nLatitude: " + p.coords.latitude + "\\nLongitude: " + p.coords.longitude),
    e => log("Location was not granted: " + e.message)
  );
}

function chooseFiles(){
  document.getElementById('files').click();
}

function showFiles(){
  const files = [...document.getElementById('files').files];
  log(files.length ? "User selected:\\n" + files.map(f => f.name).join("\\n") : "No files selected.");
}

async function shareScreen(){
  try{
    const s = await navigator.mediaDevices.getDisplayMedia({video:true,audio:true});
    streams.push(s);
    document.getElementById('preview').srcObject = s;
    log("Screen-sharing permission granted by the user.");
  }catch(e){ log("Screen sharing was not granted: " + e.name); }
}

function stopAll(){
  streams.flatMap(s => s.getTracks()).forEach(t => t.stop());
  streams = [];
  document.getElementById('preview').srcObject = null;
  log("Camera/microphone/screen streams stopped.");
}
</script>
</body>
</html>
`;
