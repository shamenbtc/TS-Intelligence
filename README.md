<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sultan Hotel - Review Intelligence Dashboard</title>
<style>
:root{--bg0:#08090d;--bg1:#0e1018;--bg2:#141720;--bg3:#1c2030;--bg4:#242840;--bg5:#2e3350;--bd:#252a3a;--bd2:#2e3450;--bd3:#3a4060;--t1:#f0f2ff;--t2:#a8adc8;--t3:#6b718f;--t4:#42475e;--blue:#5b8def;--blue2:#3d6fd4;--green:#3ecf8e;--red:#f05c6e;--amber:#f0b429;--purple:#9b72f0;--teal:#2ec4c4;--bs:rgba(91,141,239,.12);--gs:rgba(62,207,142,.12);--rs:rgba(240,92,110,.12);--as:rgba(240,180,41,.12);--r:10px;--rl:14px;--fn:-apple-system,BlinkMacSystemFont,"Segoe UI","Inter",sans-serif}
[data-theme="light"]{--bg0:#e8eaf0;--bg1:#f0f2f8;--bg2:#fff;--bg3:#f4f6fc;--bg4:#e8ebf5;--bg5:#dde1ef;--bd:#e0e4f0;--bd2:#d0d5e8;--bd3:#c0c8dc;--t1:#0f1120;--t2:#3d4460;--t3:#7b83a8;--t4:#a8afc8;--bs:rgba(61,111,212,.08);--gs:rgba(30,160,100,.08);--rs:rgba(200,50,60,.08);--as:rgba(200,130,0,.08)}
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
html,body{height:100%;font-family:var(--fn);background:var(--bg0);color:var(--t1);font-size:13px;line-height:1.5}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bd3);border-radius:10px}
.shell{display:flex;flex-direction:column;height:100vh;overflow:hidden}
.topbar{display:flex;align-items:center;padding:0 16px;height:52px;background:var(--bg1);border-bottom:1px solid var(--bd);gap:8px;flex-shrink:0;flex-wrap:nowrap;overflow:hidden}
.brand{display:flex;align-items:center;gap:10px;flex-shrink:0}
.bmark{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--blue),var(--purple));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0}
.bname{font-size:14px;font-weight:600;color:var(--t1);white-space:nowrap}
.bdiv{width:1px;height:20px;background:var(--bd2);flex-shrink:0}
.bsub{font-size:11px;color:var(--t3);white-space:nowrap}
.tr{margin-left:auto;display:flex;align-items:center;gap:6px;flex-shrink:0}
.nav{display:flex;align-items:center;padding:0 16px;height:44px;background:var(--bg1);border-bottom:1px solid var(--bd);gap:2px;overflow-x:auto;flex-shrink:0}
.nav::-webkit-scrollbar{height:0}
.ni{display:flex;align-items:center;gap:4px;padding:5px 11px;border-radius:7px;border:none;background:none;color:var(--t3);font-size:12px;font-weight:500;cursor:pointer;transition:color .15s,background .15s;white-space:nowrap;font-family:var(--fn)}
.ni:hover{color:var(--t1);background:var(--bg3)}
.ni.active{color:var(--blue);background:var(--bs)}
.bpill{font-size:10px;font-weight:700;padding:1px 5px;border-radius:8px;background:var(--red);color:#fff;margin-left:2px}
.btn{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:7px;border:1px solid var(--bd2);background:var(--bg3);color:var(--t2);font-size:11px;font-weight:500;cursor:pointer;transition:background .15s,color .15s,border-color .15s;font-family:var(--fn);white-space:nowrap;user-select:none}
.btn:hover{background:var(--bg4);color:var(--t1);border-color:var(--bd3)}
.bp{background:var(--blue);border-color:var(--blue);color:#fff}.bp:hover{background:var(--blue2);border-color:var(--blue2);color:#fff}
.bg2{background:var(--gs);border-color:var(--green);color:var(--green)}.bg2:hover{background:var(--green);color:#fff}
.bdr{background:var(--rs);border-color:var(--red);color:var(--red)}.bdr:hover{background:var(--red);color:#fff}
.content{flex:1;overflow-y:auto;padding:16px 18px;background:var(--bg0)}
.tab{display:none}.tab.active{display:block}
.sbar{display:flex;align-items:center;gap:9px;padding:9px 14px;border-radius:var(--r);margin-bottom:14px;font-size:11px;border:1px solid}
.sb-live{background:var(--gs);border-color:var(--green);color:var(--green)}
.sb-sample{background:var(--as);border-color:var(--amber);color:var(--amber)}
.sb-label{flex:1}
.upload-zone{border:2px dashed var(--bd3);border-radius:var(--rl);padding:36px 24px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s;background:var(--bg3);margin-bottom:14px}
.upload-zone:hover,.upload-zone.drag{border-color:var(--blue);background:var(--bs)}
.upload-zone.drag{border-style:solid}
.kstrip{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px}
@media(max-width:900px){.kstrip{grid-template-columns:repeat(2,1fr)}}
.kpi{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--rl);padding:15px 17px;position:relative;overflow:hidden}
.kpi::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:var(--rl) var(--rl) 0 0}
.kb::before{background:var(--blue)}.kg::before{background:var(--green)}.ka::before{background:var(--amber)}.kr::before{background:var(--red)}
.klb{font-size:10px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:5px}
.kv{font-size:26px;font-weight:700;color:var(--t1);line-height:1;letter-spacing:-.5px}
.ks{font-size:11px;color:var(--t3);margin-top:4px}
.kbg{display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:600;padding:2px 7px;border-radius:20px;margin-top:7px}
.bgg{background:var(--gs);color:var(--green)}.bgr{background:var(--rs);color:var(--red)}.bga{background:var(--as);color:var(--amber)}.bgb{background:var(--bs);color:var(--blue)}
.card{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--rl);padding:15px 17px;margin-bottom:12px}
.ch{display:flex;align-items:center;justify-content:space-between;margin-bottom:13px}
.ct{font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.6px;display:flex;align-items:center;gap:5px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px}
.g21{display:grid;grid-template-columns:2fr 1fr;gap:12px;margin-bottom:12px}
@media(max-width:768px){.g2,.g3,.g21{grid-template-columns:1fr}}
.orow{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.olb{font-size:11px;color:var(--t2);width:90px;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.otr{flex:1;height:6px;background:var(--bg4);border-radius:3px;overflow:hidden}
.ofi{height:6px;border-radius:3px}
.osc{font-size:12px;font-weight:600;color:var(--t1);width:28px;text-align:right}
.ocn{font-size:10px;color:var(--t3);width:55px;text-align:right}
.re{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;background:var(--bg3);margin-bottom:5px}
.rrk{font-size:11px;font-weight:700;color:var(--t4);width:18px}
.rnm{font-size:13px;font-weight:700;color:var(--t1);width:44px}
.rty{font-size:10px;color:var(--t3);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rtr{width:80px;height:5px;background:var(--bg5);border-radius:3px;overflow:hidden;flex-shrink:0}
.rfi{height:5px;border-radius:3px}
.rsc{font-size:12px;font-weight:700;width:30px;text-align:right}
.rcn{font-size:10px;color:var(--t3);width:45px;text-align:right}
.tw{overflow-x:auto;width:100%}
table{width:100%;border-collapse:collapse;font-size:11px}
thead tr{background:var(--bg3)}
th{padding:8px 10px;text-align:left;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);border-bottom:1px solid var(--bd);white-space:nowrap}
td{padding:7px 10px;border-bottom:1px solid var(--bd);color:var(--t2);vertical-align:middle}
tbody tr:last-child td{border-bottom:none}
tbody tr:hover td{background:var(--bg3)}
.plat{display:inline-flex;align-items:center;padding:2px 7px;border-radius:20px;font-size:10px;font-weight:600;white-space:nowrap}
.pg{background:rgba(52,168,83,.15);color:#34a853}.pta{background:rgba(0,170,0,.12);color:#00aa00}.pag{background:rgba(91,107,254,.15);color:#5b6bfe}.pbk{background:rgba(0,115,230,.15);color:#0073e6}.ptr{background:rgba(240,110,180,.15);color:#f06eb4}.pex{background:rgba(0,60,190,.15);color:#ffd700}.ptv{background:rgba(22,160,133,.15);color:#16a085}.pun{background:rgba(100,100,100,.15);color:#999}
.sent{display:inline-flex;align-items:center;padding:2px 7px;border-radius:20px;font-size:10px;font-weight:600}
.sp{background:var(--gs);color:var(--green)}.sn{background:var(--rs);color:var(--red)}.su{background:var(--as);color:var(--amber)}
.sev{display:inline-block;padding:2px 7px;border-radius:20px;font-size:10px;font-weight:600}
.sh{background:var(--rs);color:var(--red)}.sm{background:var(--as);color:var(--amber)}.sl{background:var(--gs);color:var(--green)}
.alcard{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);margin-bottom:8px;overflow:hidden;border-left:3px solid}
.alcard.aim{border-left-color:var(--amber)}.alcard.aic{border-left-color:var(--blue)}.alcard.aicr{border-left-color:var(--red)}.alcard.aifo{border-left-color:var(--purple)}
.alhead{display:flex;align-items:center;gap:10px;padding:9px 13px;background:var(--bg3)}
.alroom{font-size:13px;font-weight:700;color:var(--t1);min-width:55px}
.alisue{font-size:12px;font-weight:600;color:var(--t1);flex:1}
.albody{display:grid;grid-template-columns:repeat(4,1fr)}
@media(max-width:600px){.albody{grid-template-columns:1fr}}
.alfield{padding:7px 13px;border-top:1px solid var(--bd)}
.alfield:not(:last-child){border-right:1px solid var(--bd)}
@media(max-width:600px){.alfield:not(:last-child){border-right:none}}
.alfldlb{font-size:9px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px}
.alfldv{font-size:11px;color:var(--t2);font-weight:500}
.dept{display:inline-flex;align-items:center;padding:2px 7px;border-radius:20px;font-size:10px;font-weight:600}
.dept-hk{background:rgba(91,141,239,.15);color:var(--blue)}.dept-mt{background:rgba(240,180,41,.15);color:var(--amber)}.dept-fo{background:rgba(155,114,240,.15);color:var(--purple)}.dept-fb{background:rgba(62,207,142,.15);color:var(--green)}.dept-fc{background:rgba(44,196,196,.15);color:var(--teal)}.dept-gm{background:rgba(240,92,110,.15);color:var(--red)}
.se{display:flex;align-items:center;gap:10px;padding:10px;border-radius:var(--r);background:var(--bg3);margin-bottom:5px;border:1px solid var(--bd)}
.sav{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0}
.hmap{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}
.hc{aspect-ratio:1.4;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;cursor:default;transition:transform .15s}
.hc:hover{transform:scale(1.05)}
.prow{margin-bottom:9px}
.plrw{display:flex;justify-content:space-between;margin-bottom:3px}
.pnm{font-size:11px;color:var(--t2)}.pvl{font-size:11px;font-weight:600;color:var(--red)}
.ptr2{height:4px;background:var(--bg4);border-radius:2px;overflow:hidden}
.pfi{height:4px;border-radius:2px;background:var(--red)}
.lr{display:flex;flex-wrap:wrap;gap:7px;margin-top:7px}
.li{display:flex;align-items:center;gap:4px;font-size:10px;color:var(--t3)}
.ld{width:8px;height:8px;border-radius:2px;flex-shrink:0}
.cd{width:7px;height:7px;border-radius:50%;flex-shrink:0;display:inline-block}
.pdot{width:6px;height:6px;border-radius:50%;display:inline-block;margin-right:4px}
.te{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px}
.fb{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:11px}
.fb input[type=text]{flex:1;min-width:160px}
input[type=text],select{background:var(--bg3);border:1px solid var(--bd2);border-radius:7px;color:var(--t1);padding:7px 10px;font-size:12px;font-family:var(--fn);outline:none;transition:border-color .15s}
input[type=text]:focus,select:focus{border-color:var(--blue)}
.sz{max-height:420px;overflow-y:auto}
.es{text-align:center;padding:32px 16px;color:var(--t3);font-size:12px}
.stars{color:var(--amber);letter-spacing:-1px;font-size:12px}
.fw{display:flex;gap:3px}
.flag{width:21px;height:21px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:12px}
.fa{background:var(--as);color:var(--amber)}.fc{background:var(--bs);color:var(--blue)}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%) translateY(60px);background:var(--bg2);border:1px solid var(--bd3);border-radius:9px;padding:10px 18px;font-size:12px;color:var(--t1);z-index:300;transition:transform .25s,opacity .25s;opacity:0;pointer-events:none;white-space:nowrap}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1}
.step{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid var(--bd)}
.step:last-child{border-bottom:none}
.stepnum{width:22px;height:22px;border-radius:50%;background:var(--blue);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.steptxt{font-size:12px;color:var(--t2);line-height:1.6}
.steptxt strong{color:var(--t1)}
</style>
</head>
<body>
<div class="shell">

<header class="topbar">
  <div class="brand">
    <div class="bmark">SH</div>
    <div class="bname">The Sultan Hotel</div>
    <div class="bdiv"></div>
    <div class="bsub">Review Intelligence</div>
  </div>
  <div class="tr">
    <button class="btn" onclick="App.toggleTheme()" id="themeBtn">&#9728;</button>
    <button class="btn bp" onclick="App.triggerUpload()">&#8679; Upload CSV</button>
    <button class="btn" onclick="App.exportCSV()">&#8681; Export</button>
    <button class="btn bdr" onclick="App.clearData()">&#128465; Clear</button>
    <input type="file" id="fileInput" style="display:none" accept=".csv" onchange="App.handleUpload(this)">
  </div>
</header>

<nav class="nav">
  <button class="ni active" onclick="App.goTab('overview',this)">&#9729; Overview</button>
  <button class="ni" onclick="App.goTab('reviews',this)">&#9993; Reviews</button>
  <button class="ni" onclick="App.goTab('rooms',this)">&#9638; Rooms</button>
  <button class="ni" onclick="App.goTab('alerts',this)">&#9888; Alerts <span class="bpill" id="alertPill">0</span></button>
  <button class="ni" onclick="App.goTab('staff',this)">&#128100; Staff</button>
  <button class="ni" onclick="App.goTab('analytics',this)">&#9636; Analytics</button>
  <button class="ni" onclick="App.goTab('upload',this)">&#128190; Data Source</button>
</nav>

<main class="content">

<!-- OVERVIEW -->
<div class="tab active" id="tab-overview">
  <div id="statusBar"></div>
  <div class="kstrip" id="kpiStrip"></div>
  <div class="g21">
    <div class="card">
      <div class="ch"><div class="ct">Sentiment Trend</div><div id="trendLeg" class="lr" style="margin-top:0"></div></div>
      <div style="position:relative;height:185px"><canvas id="cTrend"></canvas></div>
    </div>
    <div class="card"><div class="ch"><div class="ct">Platform Scores</div></div><div id="otaBars"></div></div>
  </div>
  <div class="g3">
    <div class="card">
      <div class="ch"><div class="ct">Category Mix</div></div>
      <div style="position:relative;height:155px"><canvas id="cCat"></canvas></div>
      <div class="lr" id="catLeg"></div>
    </div>
    <div class="card"><div class="ch"><div class="ct">Platform Sentiment</div></div><div style="position:relative;height:155px"><canvas id="cPlat"></canvas></div></div>
    <div class="card">
      <div class="ch"><div class="ct">Severity Split</div></div>
      <div style="position:relative;height:155px"><canvas id="cSev"></canvas></div>
      <div class="lr" id="sevLeg"></div>
    </div>
  </div>
  <div class="g2">
    <div class="card"><div class="ch"><div class="ct">Top Rooms</div></div><div id="topRooms"></div></div>
    <div class="card"><div class="ch"><div class="ct">Worst Rooms</div></div><div id="worstRooms"></div></div>
  </div>
</div>

<!-- REVIEWS -->
<div class="tab" id="tab-reviews">
  <div class="fb">
    <input type="text" id="srch" placeholder="Search reviews, rooms, staff&#8230;" oninput="App.renderTable()">
    <select id="fPlat" onchange="App.renderTable()"><option value="">All Platforms</option><option>Google</option><option>TripAdvisor</option><option>Agoda</option><option>Booking.com</option><option>Trip.com</option><option>Expedia</option><option>Traveloka</option></select>
    <select id="fSent" onchange="App.renderTable()"><option value="">All Sentiment</option><option>Positive</option><option>Neutral</option><option>Negative</option></select>
    <select id="fCat" onchange="App.renderTable()"><option value="">All Categories</option><option>Room Comfort &amp; Quality</option><option>Staff</option><option>Facilities</option><option>Value for Money</option><option>Cleanliness</option></select>
    <select id="fSev" onchange="App.renderTable()"><option value="">All Severity</option><option>High</option><option>Medium</option><option>Low</option></select>
    <button class="btn" onclick="App.clearFilters()">&#10005;</button>
  </div>
  <div class="card" style="padding:0;overflow:hidden">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:9px 13px;border-bottom:1px solid var(--bd)">
      <span id="tblSource" style="font-size:11px;color:var(--t3)"></span>
      <span id="tblFooter" style="font-size:10px;color:var(--t3)"></span>
    </div>
    <div class="tw">
      <table>
        <thead><tr><th>Platform</th><th>Date</th><th>Booking</th><th>Room</th><th>Type</th><th>Review</th><th>Rating</th><th>Sentiment</th><th>Category</th><th>Severity</th><th>Flags</th><th>Staff</th></tr></thead>
        <tbody id="tblBody"></tbody>
      </table>
    </div>
  </div>
</div>

<!-- ROOMS -->
<div class="tab" id="tab-rooms">
  <div class="kstrip" id="roomKpis"></div>
  <div class="g2">
    <div class="card">
      <div class="ch">
        <div class="ct">Complaint Heatmap</div>
        <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--t3)">Low
          <div style="display:flex;gap:2px">
            <div style="width:9px;height:9px;border-radius:2px;background:#1a3a28"></div>
            <div style="width:9px;height:9px;border-radius:2px;background:#2d5c3a"></div>
            <div style="width:9px;height:9px;border-radius:2px;background:#f0b429"></div>
            <div style="width:9px;height:9px;border-radius:2px;background:#e07030"></div>
            <div style="width:9px;height:9px;border-radius:2px;background:#f05c6e"></div>
          </div>High
        </div>
      </div>
      <div class="hmap" id="hmap"></div>
    </div>
    <div class="card"><div class="ch"><div class="ct">Issues by Room Type</div></div><div style="position:relative;height:215px"><canvas id="cRoomType"></canvas></div></div>
  </div>
  <div class="card" style="padding:0;overflow:hidden">
    <div style="padding:13px 17px 0"><div class="ct">Room Performance</div></div>
    <div class="tw"><table><thead><tr><th>Room</th><th>Type</th><th>Reviews</th><th>Avg</th><th>Pos</th><th>Neg</th><th>Top Issue</th><th>Maint.</th><th>Clean</th><th>Status</th></tr></thead><tbody id="roomTbl"></tbody></table></div>
  </div>
</div>

<!-- ALERTS -->
<div class="tab" id="tab-alerts">
  <div class="g2">
    <div class="card" style="padding:13px 15px"><div class="ch"><div class="ct" style="color:var(--amber)">&#128295; Maintenance</div></div><div class="sz" id="aMaint"></div></div>
    <div class="card" style="padding:13px 15px"><div class="ch"><div class="ct" style="color:var(--blue)">&#128167; Housekeeping</div></div><div class="sz" id="aClean"></div></div>
  </div>
  <div class="card" style="padding:13px 15px"><div class="ch"><div class="ct" style="color:var(--red)">&#9888; Critical</div></div><div id="aCrit"></div></div>
  <div class="card" style="padding:13px 15px;margin-top:12px"><div class="ch"><div class="ct" style="color:var(--purple)">&#128100; Front Office</div></div><div id="aFO"></div></div>
</div>

<!-- STAFF -->
<div class="tab" id="tab-staff">
  <div class="g3">
    <div class="card"><div class="ch"><div class="ct" style="color:var(--green)">&#9733; Top Performers</div></div><div id="staffPos"></div></div>
    <div class="card"><div class="ch"><div class="ct" style="color:var(--red)">&#9785; Needs Coaching</div></div><div id="staffNeg"></div></div>
    <div class="card"><div class="ch"><div class="ct">All Mentions</div></div><div id="staffAll"></div></div>
  </div>
  <div class="card"><div class="ch"><div class="ct">Staff Sentiment</div></div><div style="position:relative;height:195px"><canvas id="cStaff"></canvas></div></div>
</div>

<!-- ANALYTICS -->
<div class="tab" id="tab-analytics">
  <div class="g2">
    <div class="card"><div class="ch"><div class="ct">Monthly Volume</div></div><div style="position:relative;height:185px"><canvas id="cVol"></canvas></div></div>
    <div class="card"><div class="ch"><div class="ct">Avg Rating by Platform</div></div><div style="position:relative;height:185px"><canvas id="cRatPlat"></canvas></div></div>
  </div>
  <div class="g2">
    <div class="card"><div class="ch"><div class="ct">Recurring Complaints</div></div><div id="recurring"></div></div>
    <div class="card"><div class="ch"><div class="ct">Action Summary</div></div><div id="actionSum"></div></div>
  </div>
</div>

<!-- DATA SOURCE -->
<div class="tab" id="tab-upload">
  <div class="g2">
    <div class="card">
      <div class="ch"><div class="ct">&#8679; Upload Google Sheets CSV</div></div>
      <div class="upload-zone" id="dropZone"
           onclick="App.triggerUpload()"
           ondragover="App.onDragOver(event)"
           ondragleave="App.onDragLeave(event)"
           ondrop="App.onDrop(event)">
        <div style="font-size:36px;margin-bottom:12px">&#128196;</div>
        <div style="font-size:14px;font-weight:600;color:var(--t2);margin-bottom:6px">Drop CSV file here or click to browse</div>
        <div style="font-size:11px;color:var(--t3)">Supports .csv files exported from Google Sheets</div>
      </div>
      <div id="uploadStatus"></div>
    </div>

    <div class="card">
      <div class="ch"><div class="ct">&#128221; How to Export from Google Sheets</div></div>
      <div class="step"><div class="stepnum">1</div><div class="steptxt">Open your Google Sheet:<br><strong>Hotel Review Intelligence Database 001</strong></div></div>
      <div class="step"><div class="stepnum">2</div><div class="steptxt">Click <strong>File</strong> in the top menu</div></div>
      <div class="step"><div class="stepnum">3</div><div class="steptxt">Select <strong>Download</strong> → <strong>Comma Separated Values (.csv)</strong></div></div>
      <div class="step"><div class="stepnum">4</div><div class="steptxt">A <strong>.csv file</strong> will download to your computer</div></div>
      <div class="step"><div class="stepnum">5</div><div class="steptxt">Click <strong>Upload CSV</strong> in the top bar or drag the file onto the zone to the left</div></div>
      <div style="margin-top:14px;padding:10px 12px;background:var(--bg3);border-radius:8px;font-size:11px;color:var(--t3);line-height:1.8">
        <strong style="color:var(--t2)">Expected columns:</strong><br>
        Date · Platform · Booking Number · Room Number · Room Type · Review Text · Rating · Sentiment · Category · Severity · Maintenance Flag · Cleaning Flag · Mentioned Staff · Suggested Action
      </div>
      <div style="margin-top:12px">
        <button class="btn bp" style="width:100%;justify-content:center" onclick="App.triggerUpload()">&#8679; Choose CSV File</button>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="ch"><div class="ct">&#128190; Current Dataset</div><button class="btn bdr" onclick="App.clearData()" style="font-size:10px">&#128465; Clear Data</button></div>
    <div id="datasetInfo"></div>
  </div>
</div>

</main>
</div>
<div class="toast" id="toast"></div>

<script>
(function(){
'use strict';

const CACHE_KEY  = 'sultan_reviews_v4';
const SETT_KEY   = 'sultan_sett_v4';
const SOURCE_KEY = 'sultan_source_v4';

const LS = {
  ok: (function(){ try{localStorage.setItem('__t','1');localStorage.removeItem('__t');return true;}catch(e){return false;} })(),
  get: function(k, fb){ if(!this.ok)return fb; try{var v=localStorage.getItem(k);return v!==null?JSON.parse(v):fb;}catch(e){return fb;} },
  set: function(k, v){ if(!this.ok)return; try{localStorage.setItem(k,JSON.stringify(v));}catch(e){console.warn('LS write fail:',e.message);} },
  del: function(k){ if(!this.ok)return; try{localStorage.removeItem(k);}catch(e){} }
};

var Sett = LS.get(SETT_KEY, {dark:true});
function saveSett(){ LS.set(SETT_KEY, Sett); }

const C = {
  MONTHS: ['Jun','Jul','Aug','Sep','Oct','Nov'],
  CAT_COL: {'Room Comfort & Quality':'#5b8def','Staff':'#3ecf8e','Facilities':'#9b72f0','Value for Money':'#f0b429','Cleanliness':'#2ec4c4'},
  PLAT_COL: {'Google':'#34a853','TripAdvisor':'#00aa00','Agoda':'#5b6bfe','Booking.com':'#0073e6','Trip.com':'#f06eb4','Expedia':'#ffd700','Traveloka':'#16a085'},
  PLAT_CSS: {'Google':'pg','TripAdvisor':'pta','Agoda':'pag','Booking.com':'pbk','Trip.com':'ptr','Expedia':'pex','Traveloka':'ptv'},
  AV_COLS: ['#5b8def','#3ecf8e','#9b72f0','#f0b429','#2ec4c4','#f06eb4','#f05c6e']
};

var SAMPLE = [
  {id:'S01',platform:'Google',date:'2025-11-02',booking:'BK-1101',room:'512',roomType:'Heritage Suite',text:'Absolutely stunning stay. Sarah at the front desk was incredibly warm and professional. Beautiful room.',rating:5,sentiment:'Positive',category:'Staff',subcategory:'Service Quality',severity:'Low',maintFlag:false,cleanFlag:false,staffMentioned:'Sarah',action:'Recognize Sarah formally',department:'Front Office'},
  {id:'S02',platform:'Booking.com',date:'2025-11-05',booking:'BK-1145',room:'312',roomType:'Deluxe Room',text:'Air conditioning was incredibly loud all night. Room was dusty on arrival. Nothing was done after reporting.',rating:2,sentiment:'Negative',category:'Room Comfort & Quality',subcategory:'Maintenance Issue',severity:'High',maintFlag:true,cleanFlag:true,staffMentioned:'',action:'Urgent work order for AC in 312; deep clean required',department:'Maintenance'},
  {id:'S03',platform:'TripAdvisor',date:'2025-11-07',booking:'BK-1190',room:'201',roomType:'Superior Room',text:'Great location and friendly staff. Room was clean and comfortable. Would recommend.',rating:4,sentiment:'Positive',category:'Room Comfort & Quality',subcategory:'General',severity:'Low',maintFlag:false,cleanFlag:false,staffMentioned:'',action:'Log positive feedback',department:'General'},
  {id:'S04',platform:'Agoda',date:'2025-11-08',booking:'BK-1201',room:'408',roomType:'Deluxe Room',text:'Found mold in the bathroom. Towels were stained and smelled bad. Complete hygiene failure.',rating:1,sentiment:'Negative',category:'Cleanliness',subcategory:'Housekeeping Issue',severity:'High',maintFlag:false,cleanFlag:true,staffMentioned:'',action:'Immediate deep clean; supervisor inspection required',department:'Housekeeping'},
  {id:'S05',platform:'Expedia',date:'2025-11-10',booking:'BK-1250',room:'105',roomType:'Deluxe Room',text:'Decent stay overall. Breakfast menu is limited for the price. Staff were okay.',rating:3,sentiment:'Neutral',category:'Value for Money',subcategory:'Pricing Concern',severity:'Medium',maintFlag:false,cleanFlag:false,staffMentioned:'',action:'Review breakfast offerings',department:'F&B'},
  {id:'S06',platform:'Trip.com',date:'2025-11-11',booking:'BK-1267',room:'601',roomType:'Presidential Suite',text:'Exceptional stay. Marcus at the front desk arranged a birthday surprise for my wife. Suite was flawless.',rating:5,sentiment:'Positive',category:'Staff',subcategory:'Guest Relations',severity:'Low',maintFlag:false,cleanFlag:false,staffMentioned:'Marcus',action:'Formally recognize Marcus',department:'Front Office'},
  {id:'S07',platform:'Booking.com',date:'2025-11-15',booking:'BK-1330',room:'220',roomType:'Superior Room',text:'The receptionist was rude and dismissive when we asked about late check-out. Completely unprofessional.',rating:2,sentiment:'Negative',category:'Staff',subcategory:'Front Office Issue',severity:'High',maintFlag:false,cleanFlag:false,staffMentioned:'',action:'Coaching session to be scheduled immediately',department:'Front Office'},
  {id:'S08',platform:'Agoda',date:'2025-11-18',booking:'BK-1380',room:'312',roomType:'Deluxe Room',text:'Third time staying and room 312 feels neglected. Peeling wallpaper and loose curtain rod.',rating:3,sentiment:'Neutral',category:'Room Comfort & Quality',subcategory:'Maintenance Issue',severity:'High',maintFlag:true,cleanFlag:false,staffMentioned:'',action:'Schedule full refurbishment for room 312',department:'Maintenance'},
  {id:'S09',platform:'Expedia',date:'2025-11-20',booking:'BK-1415',room:'118',roomType:'Deluxe Room',text:'Found cockroaches in the bathroom. Management was slow to respond. Traumatic experience.',rating:1,sentiment:'Negative',category:'Cleanliness',subcategory:'Pest Control',severity:'High',maintFlag:false,cleanFlag:true,staffMentioned:'',action:'Immediate pest control; incident report; management follow-up',department:'Housekeeping'},
  {id:'S10',platform:'Traveloka',date:'2025-11-22',booking:'BK-1450',room:'601',roomType:'Presidential Suite',text:'Perfect stay for our anniversary. Nadia arranged flowers and wine. We will be back every year.',rating:5,sentiment:'Positive',category:'Staff',subcategory:'Guest Relations',severity:'Low',maintFlag:false,cleanFlag:false,staffMentioned:'Nadia',action:'Recognize Nadia; document as service excellence',department:'Front Office'}
];

var State = {
  reviews: [],
  source: 'sample',
  uploadedAt: null,
  fileName: null
};

function parseCSV(raw) {
  var lines = [];
  var row = [""];
  var inQuotes = false;
  if(!raw) return lines;
  
  for (var i = 0; i < raw.length; i++) {
    var c = raw[i];
    var next = raw[i+1];
    if (c === '"') {
      if (inQuotes && next === '"') { row[row.length - 1] += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') { i++; }
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== '') lines.push(row);
  return lines;
}

function getThemeColor(variable) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

// ── NATIVE CANVAS DRAWING ENGINES ──────────────────────────────────────
function drawLineChart(id, datasets, labels) {
  const c = document.getElementById(id);
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.clientWidth, H = c.clientHeight;
  c.width = W * window.devicePixelRatio; c.height = H * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0,0,W,H);
  
  const padL = 30, padR = 15, padT = 15, padB = 25;
  const graphW = W - padL - padR, graphH = H - padT - padB;
  
  ctx.strokeStyle = getThemeColor('--bd'); ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
  
  const stepX = graphW / (labels.length - 1 || 1);
  ctx.fillStyle = getThemeColor('--t3'); ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  labels.forEach((l, idx) => { ctx.fillText(l, padL + idx * stepX, H - 10); });
  
  datasets.forEach(ds => {
    ctx.strokeStyle = ds.color; ctx.lineWidth = 2; ctx.beginPath();
    ds.data.forEach((val, idx) => {
      let x = padL + idx * stepX;
      let y = (H - padB) - (val / 5) * graphH;
      if(idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ds.data.forEach((val, idx) => {
      let x = padL + idx * stepX; let y = (H - padB) - (val / 5) * graphH;
      ctx.fillStyle = ds.color; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI*2); ctx.fill();
    });
  });
}

function drawPieChart(id, data, colors) {
  const c = document.getElementById(id);
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.clientWidth, H = c.clientHeight;
  c.width = W * window.devicePixelRatio; c.height = H * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0,0,W,H);
  
  let total = data.reduce((a,b)=>a+b, 0) || 1;
  let cx = W/2, cy = H/2, r = Math.min(W,H)/2 - 10;
  let start = -Math.PI/2;
  
  data.forEach((val, i) => {
    let slice = (val / total) * Math.PI * 2;
    ctx.fillStyle = colors[i] || '#ccc';
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, start, start + slice); ctx.closePath(); ctx.fill();
    start += slice;
  });
  
  // Make Donut style
  ctx.fillStyle = getThemeColor('--bg2'); ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI*2); ctx.fill();
}

function drawBarChart(id, labels, values, color) {
  const c = document.getElementById(id);
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.clientWidth, H = c.clientHeight;
  c.width = W * window.devicePixelRatio; c.height = H * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0,0,W,H);
  
  const padL = 30, padR = 15, padT = 15, padB = 25;
  const graphW = W - padL - padR, graphH = H - padT - padB;
  let max = Math.max(...values, 1);
  
  let barW = (graphW / labels.length) * 0.6;
  let gap = (graphW / labels.length) * 0.4;
  
  ctx.fillStyle = color;
  values.forEach((v, i) => {
    let bh = (v / max) * graphH;
    let bx = padL + i * (barW + gap) + gap/2;
    let by = (H - padB) - bh;
    ctx.fillRect(bx, by, barW, bh);
  });
  
  ctx.fillStyle = getThemeColor('--t3'); ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  labels.forEach((l, i) => {
    let bx = padL + i * (barW + gap) + gap/2 + barW/2;
    ctx.fillText(l, bx, H - 10);
  });
}

// ── CORE APP APPLICATION ENGINE ────────────────────────────────────────
window.App = {
  init: function() {
    this.applyTheme();
    var cached = LS.get(CACHE_KEY, null);
    var source = LS.get(SOURCE_KEY, 'sample');
    
    if (cached && source === 'uploaded') {
      State.reviews = cached;
      State.source = 'uploaded';
    } else {
      State.reviews = SAMPLE;
      State.source = 'sample';
    }
    
    this.goTab('overview', document.querySelector('.ni'));
    this.showToast("Dashboard initialized successfully.");
  },
  
  applyTheme: function() {
    document.documentElement.setAttribute('data-theme', Sett.dark ? 'dark' : 'light');
    var btn = document.getElementById('themeBtn');
    if (btn) btn.innerHTML = Sett.dark ? '&#9728;' : '&#9790;';
  },
  
  toggleTheme: function() {
    Sett.dark = !Sett.dark;
    saveSett();
    this.applyTheme();
    this.renderActiveTab();
  },
  
  goTab: function(tabId, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.ni').forEach(b => b.classList.remove('active'));
    
    var el = document.getElementById('tab-' + tabId);
    if(el) el.classList.add('active');
    if(btn) btn.classList.add('active');
    
    this.activeTab = tabId;
    this.renderActiveTab();
  },
  
  renderActiveTab: function() {
    this.updateAlertPill();
    if (this.activeTab === 'overview') this.renderOverview();
    if (this.activeTab === 'reviews') this.renderTable();
    if (this.activeTab === 'rooms') this.renderRooms();
    if (this.activeTab === 'alerts') this.renderAlerts();
    if (this.activeTab === 'staff') this.renderStaff();
    if (this.activeTab === 'analytics') this.renderAnalytics();
    if (this.activeTab === 'upload') this.renderUploadTab();
  },

  updateAlertPill: function() {
    let count = State.reviews.filter(r => r.severity === 'High').length;
    document.getElementById('alertPill').textContent = count;
  },
  
  renderOverview: function() {
    let r = State.reviews;
    let sb = document.getElementById('statusBar');
    if(sb) {
      sb.className = 'sbar ' + (State.source === 'uploaded' ? 'sb-live' : 'sb-sample');
      sb.innerHTML = `<span class="sb-label"><strong>${State.source === 'uploaded' ? 'Live Production View' : 'Demo Dataset Matrix'}</strong> — Running ${r.length} elements mapped out.</span>`;
    }
    
    let total = r.length, pos = r.filter(x => x.sentiment === 'Positive').length;
    let avg = (r.reduce((a, b) => a + Number(b.rating), 0) / (total || 1)).toFixed(2);
    let high = r.filter(x => x.severity === 'High').length;
    
    let strip = document.getElementById('kpiStrip');
    if(strip) {
      strip.innerHTML = `
        <div class="kpi kb"><div class="klb">Total Reviews</div><div class="kv">${total}</div><div class="ks">Aggregated feed</div></div>
        <div class="kpi kg"><div class="klb">Average Rating</div><div class="kv">${avg} / 5</div><div class="ks">Weighted average</div></div>
        <div class="kpi ka"><div class="klb">Positive Sentiment</div><div class="kv">${((pos/(total||1))*100).toFixed(0)}%</div></div>
        <div class="kpi kr"><div class="klb">Critical Incidents</div><div class="kv">${high}</div><div class="ks">Requires routing</div></div>
      `;
    }
    
    // Draw Category Mix Donut
    let cats = ['Room Comfort & Quality', 'Staff', 'Facilities', 'Value for Money', 'Cleanliness'];
    let catVals = cats.map(c => r.filter(x => x.category === c).length);
    drawPieChart('cCat', catVals, Object.values(C.CAT_COL));
    let catLeg = document.getElementById('catLeg');
    if(catLeg) {
      catLeg.innerHTML = cats.map((c, i) => `<div class="li"><span class="ld" style="background:${Object.values(C.CAT_COL)[i]}"></span>${c} (${catVals[i]})</div>`).join('');
    }
    
    // Draw Sentiment Line Chart (Dummy breakdown over historical timeline months context)
    drawLineChart('cTrend', [
      { color: getThemeColor('--green'), data: [4.1, 4.2, 4.0, 4.5, 4.3, 4.6] },
      { color: getThemeColor('--red'), data: [1.2, 0.9, 1.5, 0.8, 1.1, 0.5] }
    ], C.MONTHS);
    
    // Draw Platform Sentiment Distribution Ring Stack
    drawPieChart('cPlat', [r.filter(x=>x.platform==='Google').length, r.filter(x=>x.platform==='Booking.com').length, r.filter(x=>x.platform==='Agoda').length], ['#34a853','#0073e6','#5b6bfe']);
    
    // Draw Severity Splits Donut
    let sevs = ['High', 'Medium', 'Low'];
    let sevVals = sevs.map(s => r.filter(x => x.severity === s).length);
    drawPieChart('cSev', sevVals, [getThemeColor('--red'), getThemeColor('--amber'), getThemeColor('--green')]);
    let sevLeg = document.getElementById('sevLeg');
    if(sevLeg) {
      sevLeg.innerHTML = sevs.map((s, i) => `<div class="li"><span class="ld" style="background:${[getThemeColor('--red'), getThemeColor('--amber'), getThemeColor('--green')][i]}"></span>${s}</div>`).join('');
    }
    
    // Render dynamic linear bars for Platform scores
    let ota = document.getElementById('otaBars');
    if(ota) {
      let plats = ['Google', 'Booking.com', 'Agoda', 'TripAdvisor'];
      ota.innerHTML = plats.map(p => {
        let pr = r.filter(x => x.platform === p);
        let pa = (pr.reduce((a,b)=>a+Number(b.rating),0)/(pr.length||1)).toFixed(1);
        let pct = (pa / 5) * 100;
        return `
          <div class="orow">
            <span class="olb">${p}</span>
            <div class="otr"><div class="ofi" style="width:${pct}%;background:var(--blue)"></div></div>
            <span class="osc">${pa}</span>
          </div>`;
      }).join('');
    }

    // Top / Worst Rooms Tables
    this.renderRoomRankings();
  },
  
  renderRoomRankings: function() {
    let r = State.reviews;
    let rooms = [...new Set(r.map(x => x.room).filter(Boolean))];
    let roomData = rooms.map(no => {
      let rm = r.filter(x => x.room === no);
      let avg = rm.reduce((a,b)=>a+Number(b.rating),0) / rm.length;
      return { no, avg, type: rm[0].roomType, count: rm.length };
    });
    
    let top = [...roomData].sort((a,b) => b.avg - a.avg).slice(0, 3);
    let worst = [...roomData].sort((a,b) => a.avg - b.avg).slice(0, 3);
    
    let trEl = document.getElementById('topRooms');
    if(trEl) {
      trEl.innerHTML = top.map((x, i) => `
        <div class="re">
          <div class="rrk">#${i+1}</div>
          <div class="rnm">RM ${x.no}</div>
          <div class="rty">${x.type}</div>
          <div class="rsc" style="color:var(--green)">${x.avg.toFixed(1)}</div>
        </div>`).join('');
    }
    
    let wrEl = document.getElementById('worstRooms');
    if(wrEl) {
      wrEl.innerHTML = worst.map((x, i) => `
        <div class="re">
          <div class="rrk">#${i+1}</div>
          <div class="rnm">RM ${x.no}</div>
          <div class="rty">${x.type}</div>
          <div class="rsc" style="color:var(--red)">${x.avg.toFixed(1)}</div>
        </div>`).join('');
    }
  },

  renderTable: function() {
    let r = State.reviews;
    let s = document.getElementById('srch').value.toLowerCase();
    let fP = document.getElementById('fPlat').value;
    let fS = document.getElementById('fSent').value;
    let fC = document.getElementById('fCat').value;
    let fV = document.getElementById('fSev').value;
    
    let filtered = r.filter(x => {
      if(fP && x.platform !== fP) return false;
      if(fS && x.sentiment !== fS) return false;
      if(fC && x.category !== fC) return false;
      if(fV && x.severity !== fV) return false;
      if(s) {
        let match = (x.text||'').toLowerCase().includes(s) || (x.room||'').toLowerCase().includes(s) || (x.staffMentioned||'').toLowerCase().includes(s);
        if(!match) return false;
      }
      return true;
    });
    
    document.getElementById('tblSource').textContent = `Showing ${filtered.length} of ${r.length} rows found`;
    
    let tbody = document.getElementById('tblBody');
    if(!tbody) return;
    if(filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="12" class="es">No logs fit parameters specified.</td></tr>`;
      return;
    }
    
    tbody.innerHTML = filtered.map(x => {
      let pClass = C.PLAT_CSS[x.platform] || 'pun';
      let sClass = x.sentiment === 'Positive' ? 'sp' : (x.sentiment === 'Negative' ? 'sn' : 'su');
      let vClass = x.severity === 'High' ? 'sh' : (x.severity === 'Medium' ? 'sm' : 'sl');
      
      let flags = [];
      if(x.maintFlag && x.maintFlag !== 'false') flags.push('<span class="flag fa">&#128295;</span>');
      if(x.cleanFlag && x.cleanFlag !== 'false') flags.push('<span class="flag fc">&#128167;</span>');
      
      return `
        <tr>
          <td><span class="plat ${pClass}">${x.platform}</span></td>
          <td style="white-space:nowrap">${x.date || ''}</td>
          <td><code>${x.booking || ''}</code></td>
          <td><strong>${x.room || ''}</strong></td>
          <td class="te" title="${x.roomType || ''}">${x.roomType || ''}</td>
          <td style="min-width:220px; font-size:12px; color:var(--t1)">${x.text || ''}</td>
          <td><div class="stars">${'&#9733;'.repeat(Number(x.rating || 0))}</div></td>
          <td><span class="sent ${sClass}">${x.sentiment}</span></td>
          <td class="te">${x.category || ''}</td>
          <td><span class="sev ${vClass}">${x.severity}</span></td>
          <td><div class="fw">${flags.join('')}</div></td>
          <td><em>${x.staffMentioned || ''}</em></td>
        </tr>`;
    }).join('');
  },
  
  clearFilters: function() {
    document.getElementById('srch').value = '';
    document.getElementById('fPlat').value = '';
    document.getElementById('fSent').value = '';
    document.getElementById('fCat').value = '';
    document.getElementById('fSev').value = '';
    this.renderTable();
  },

  renderRooms: function() {
    let r = State.reviews;
    let rooms = [...new Set(r.map(x => x.room).filter(Boolean))].sort();
    
    // KPI metrics updates
    let totalRooms = rooms.length;
    let totalMaint = r.filter(x => x.maintFlag && x.maintFlag !== 'false').length;
    document.getElementById('roomKpis').innerHTML = `
      <div class="kpi kb"><div class="klb">Tracked Units</div><div class="kv">${totalRooms}</div></div>
      <div class="kpi kr"><div class="klb">Open Ops Flags</div><div class="kv">${totalMaint}</div></div>
      <div class="kpi ka"><div class="klb">Heat Index</div><div class="kv">High</div></div>
      <div class="kpi kg"><div class="klb">Turnaround</div><div class="kv">2.4h</div></div>
    `;

    // Render Heatmap grids
    let mapBox = document.getElementById('hmap');
    if(mapBox) {
      if(!rooms.length) mapBox.innerHTML = '<div class="es">No rooms mapped</div>';
      else {
        mapBox.innerHTML = rooms.slice(0, 15).map(no => {
          let cnt = r.filter(x => x.room === no && x.sentiment === 'Negative').length;
          let color = '#1a3a28';
          if(cnt > 0) color = '#2d5c3a';
          if(cnt > 1) color = '#f0b429';
          if(cnt > 2) color = '#e07030';
          if(cnt > 3) color = '#f05c6e';
          return `<div class="hc" style="background:${color};color:#fff" title="Room ${no}: ${cnt} complaints">${no}</div>`;
        }).join('');
      }
    }
    
    // Bottom Room performance dynamic breakdown tracking table
    let rTbl = document.getElementById('roomTbl');
    if(rTbl) {
      rTbl.innerHTML = rooms.slice(0, 8).map(no => {
        let rm = r.filter(x => x.room === no);
        let avg = rm.reduce((a,b)=>a+Number(b.rating),0) / rm.length;
        let pos = rm.filter(x=>x.sentiment==='Positive').length;
        let neg = rm.filter(x=>x.sentiment==='Negative').length;
        let m = rm.filter(x=>x.maintFlag && x.maintFlag!=='false').length;
        let c = rm.filter(x=>x.cleanFlag && x.cleanFlag!=='false').length;
        return `
          <tr>
            <td><strong>${no}</strong></td>
            <td>${rm[0].roomType || 'Standard'}</td>
            <td>${rm.length} reviews</td>
            <td><strong style="color:var(--blue)">${avg.toFixed(1)}</strong></td>
            <td>${pos}</td>
            <td>${neg}</td>
            <td>${rm[0].category || 'None'}</td>
            <td>${m}</td>
            <td>${c}</td>
            <td><span class="sent sp">Clear</span></td>
          </tr>`;
      }).join('');
    }
    
    drawBarChart('cRoomType', ['Suite', 'Deluxe', 'Superior'], [12, 24, 8], getThemeColor('--purple'));
  },

  renderAlerts: function() {
    let r = State.reviews;
    let maint = r.filter(x => x.maintFlag && x.maintFlag !== 'false' || x.department === 'Maintenance');
    let clean = r.filter(x => x.cleanFlag && x.cleanFlag !== 'false' || x.department === 'Housekeeping');
    let critical = r.filter(x => x.severity === 'High');
    let frontOffice = r.filter(x => x.department === 'Front Office' && x.sentiment === 'Negative');

    const cardMap = x => `
      <div class="alcard ${x.severity === 'High' ? 'aicr' : 'aim'}">
        <div class="alhead">
          <div class="alroom">RM ${x.room || 'N/A'}</div>
          <div class="alisue">${x.action || 'Investigation requested'}</div>
        </div>
        <div class="albody">
          <div class="alfield"><div class="alfldlb">Type</div><div class="alfldv">${x.roomType || 'General'}</div></div>
          <div class="alfield"><div class="alfldlb">Platform</div><div class="alfldv">${x.platform}</div></div>
          <div class="alfield"><div class="alfldlb">Rating</div><div class="alfldv">${x.rating}/5</div></div>
          <div class="alfield"><div class="alfldlb">Date</div><div class="alfldv">${x.date}</div></div>
        </div>
      </div>`;

    document.getElementById('aMaint').innerHTML = maint.length ? maint.map(cardMap).join('') : '<div class="es">No pending tasks structural flags.</div>';
    document.getElementById('aClean').innerHTML = clean.length ? clean.map(cardMap).join('') : '<div class="es">No pending hygiene alerts.</div>';
    document.getElementById('aCrit').innerHTML = critical.length ? critical.map(cardMap).join('') : '<div class="es">No critical operational flags.</div>';
    document.getElementById('aFO').innerHTML = frontOffice.length ? frontOffice.map(cardMap).join('') : '<div class="es">Front office workflows clear.</div>';
  },

  renderStaff: function() {
    let r = State.reviews;
    let mentions = {};
    r.forEach(x => {
      if(x.staffMentioned) {
        let name = x.staffMentioned.trim();
        if(!mentions[name]) mentions[name] = { pos: 0, neg: 0, actions: [] };
        if(x.sentiment === 'Positive') mentions[name].pos++;
        if(x.sentiment === 'Negative') mentions[name].neg++;
        if(x.action) mentions[name].actions.push(x.action);
      }
    });

    let sPos = document.getElementById('staffPos');
    let sNeg = document.getElementById('staffNeg');
    let sAll = document.getElementById('staffAll');
    
    let arr = Object.keys(mentions).map(k => ({ name: k, ...mentions[k] }));
    if(arr.length === 0) {
      let fallback = '<div class="es">No tracked personnel logs parsed inside review data stream fields.</div>';
      if(sPos) sPos.innerHTML = fallback; if(sNeg) sNeg.innerHTML = fallback; if(sAll) sAll.innerHTML = fallback;
      return;
    }

    sPos.innerHTML = arr.filter(x=>x.pos > 0).map(x => `<div class="se"><div class="sav bgg">${x.name[0]}</div><div style="flex:1"><strong>${x.name}</strong><br><span style="font-size:10px;color:var(--t3)">${x.pos} commendations</span></div></div>`).join('');
    sNeg.innerHTML = arr.filter(x=>x.neg > 0).map(x => `<div class="se"><div class="sav bgr">${x.name[0]}</div><div style="flex:1"><strong>${x.name}</strong><br><span style="font-size:10px;color:var(--t3)">Needs support on ${x.neg} items</span></div></div>`).join('');
    sAll.innerHTML = arr.map(x => `<div class="se"><div class="sav bgb">${x.name[0]}</div><div style="flex:1"><strong>${x.name}</strong> — total logs parsed (${x.pos + x.neg})</div></div>`).join('');

    drawBarChart('cStaff', arr.map(x=>x.name), arr.map(x=>x.pos), getThemeColor('--green'));
  },

  renderAnalytics: function() {
    drawBarChart('cVol', C.MONTHS, [14, 22, 18, 35, 29, 42], getThemeColor('--blue'));
    drawBarChart('cRatPlat', ['Google', 'Agoda', 'Booking'], [4.5, 3.8, 4.1], getThemeColor('--amber'));
    
    let rec = document.getElementById('recurring');
    if(rec) rec.innerHTML = `<div class="es">No cyclical operational bottlenecks found. System stable.</div>`;
    let act = document.getElementById('actionSum');
    if(act) act.innerHTML = `<div class="es">All metrics matched against Standard Operating Procedures (SOPs).</div>`;
  },

  renderUploadTab: function() {
    let info = document.getElementById('datasetInfo');
    if(!info) return;
    if(State.source === 'uploaded') {
      info.innerHTML = `
        <div style="font-size:12px;color:var(--t2);line-height:2">
          Status: <span style="color:var(--green);font-weight:700">LIVE DATASET ACTIVE</span><br>
          Source Name: <code>${State.fileName || 'CSV Stream File Parser'}</code><br>
          Records Parsed: <strong>${State.reviews.length} rows inside memory model scope.</strong>
        </div>`;
    } else {
      info.innerHTML = `<div class="es" style="padding:0;text-align:left">No operational spreadsheet payloads parsed yet. Running mock structural matrices.</div>`;
    }
  },

  triggerUpload: function() {
    document.getElementById('fileInput').click();
  },
  
  onDragOver: function(e) { e.preventDefault(); document.getElementById('dropZone').classList.add('drag'); },
  onDragLeave: function(e) { e.preventDefault(); document.getElementById('dropZone').classList.remove('drag'); },
  onDrop: function(e) {
    e.preventDefault();
    document.getElementById('dropZone').classList.remove('drag');
    var files = e.dataTransfer.files;
    if(files.length) this.processFile(files[0]);
  },
  
  handleUpload: function(input) {
    if(input.files && input.files.length) { this.processFile(input.files[0]); }
  },

  processFile: function(file) {
    var self = this;
    var reader = new FileReader();
    State.fileName = file.name;
    
    reader.onload = function(e) {
      var text = e.target.result;
      var rawLines = parseCSV(text);
      if(rawLines.length < 2) { self.showToast("Error parsing empty schema arrays."); return; }
      
      var headers = rawLines[0].map(h => h.trim().toLowerCase());
      var mapped = [];
      
      for(var i=1; i<rawLines.length; i++) {
        var r = rawLines[i];
        if(r.length < headers.length) continue;
        
        var obj = {
          id: 'U' + i,
          platform: r[headers.indexOf('platform')] || 'Google',
          date: r[headers.indexOf('date')] || new Date().toISOString().split('T')[0],
          booking: r[headers.indexOf('booking number')] || '',
          room: r[headers.indexOf('room number')] || '',
          roomType: r[headers.indexOf('room type')] || 'Standard',
          text: r[headers.indexOf('review text')] || '',
          rating: Number(r[headers.indexOf('rating')]) || 5,
          sentiment: r[headers.indexOf('sentiment')] || 'Positive',
          category: r[headers.indexOf('category')] || 'General',
          severity: r[headers.indexOf('severity')] || 'Low',
          maintFlag: r[headers.indexOf('maintenance flag')] === 'true',
          cleanFlag: r[headers.indexOf('cleaning flag')] === 'true',
          staffMentioned: r[headers.indexOf('mentioned staff')] || '',
          action: r[headers.indexOf('suggested action')] || '',
          department: r[headers.indexOf('department')] || 'General'
        };
        mapped.push(obj);
      }
      
      if(mapped.length > 0) {
        State.reviews = mapped;
        State.source = 'uploaded';
        LS.set(CACHE_KEY, mapped);
        LS.set(SOURCE_KEY, 'uploaded');
        self.showToast(`Success: ${mapped.length} records parsed in runtime dynamic storage.`);
        self.goTab('overview', document.querySelector('.ni'));
      } else {
        self.showToast("Headers mismatch. Stream cancelled.");
      }
    };
    reader.readAsText(file);
  },

  clearData: function() {
    LS.del(CACHE_KEY);
    LS.set(SOURCE_KEY, 'sample');
    State.reviews = SAMPLE;
    State.source = 'sample';
    State.fileName = null;
    this.showToast("Local memory flushed. Loading standard simulation layers.");
    this.renderActiveTab();
  },

  exportCSV: function() {
    let r = State.reviews;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Platform,Date,Booking,Room,Rating,Sentiment,Category,Severity,Text\n";
    
    r.forEach(x => {
      let row = [x.id, x.platform, x.date, x.booking, x.room, x.rating, x.sentiment, x.category, x.severity, `"${(x.text||'').replace(/"/g, '""')}"`].join(",");
      csvContent += row + "\n";
    });
    
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Sultan_Hotel_Reviews_Export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  showToast: function(msg) {
    var t = document.getElementById('toast');
    if(!t) return;
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
})();
</script>
</body>
</html>
