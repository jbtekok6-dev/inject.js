var body = $response.body;

if (body) {
    body = body.replace(/<\/head>/i, `
<script>
(function() {

    alert("INJECT JALAN");
    console.log("=== PROXY INJECT START ===");

    // ===== FORCE GLOBAL =====
    window.unsafeWindow = window;

    // ===== FAKE GM API =====
    window.GM_info = {};
    window.GM_addStyle = function(css){
        let s = document.createElement("style");
        s.innerHTML = css;
        document.head.appendChild(s);
    };

    window.GM_xmlhttpRequest = function(opt){
        fetch(opt.url, {method: opt.method || "GET"})
        .then(r => r.text())
        .then(t => opt.onload && opt.onload({responseText: t}));
    };

    window.GM_setValue = function(){};
    window.GM_getValue = function(){};

    // ===== HOOK FETCH =====
    const origFetch = window.fetch;
    window.fetch = function(...args){
        console.log("FETCH:", args);
        return origFetch.apply(this, args);
    };

    // ===== HOOK XHR =====
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(){
        console.log("XHR:", arguments);
        return open.apply(this, arguments);
    };

    // ===== LOAD KAUREV SCRIPT =====
    function loadKaurev() {
        console.log("Loading Kaurev script...");

        const url = "https://kaurev.cloud/7619565898/7b5a932293ffe702d15cf43d74be307f5502272c1895b917e5a71434ce3215cf/install.user.js";

        fetch(url)
        .then(r => r.text())
        .then(code => {
            console.log("Script fetched");

            try {
                // 🔥 STRIP HEADER USERSCRIPT
                code = code.replace(/\/\/ ==UserScript==[\\s\\S]*?\/\/ ==\\/UserScript==/, "");

                // 🔥 HAPUS STRICT MODE
                code = code.replace(/"use strict";/g, "");

                // 🔥 EXECUTE VIA SCRIPT TAG
                let s = document.createElement("script");
                s.innerHTML = code;
                document.documentElement.appendChild(s);

                console.log("Script injected");
            } catch(e) {
                console.log("Inject error:", e);
            }

        })
        .catch(err => console.log("Fetch error:", err));
    }

    // 🔥 TRIK PRO (NO DELAY + STABIL)
    document.addEventListener("DOMContentLoaded", loadKaurev);

})();
</script>

</head>`);

    $done({body});
} else {
    $done({});
}
