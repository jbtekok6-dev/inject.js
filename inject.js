function runKaurev(code) {
    try {
        console.log("Trying eval...");
        eval(code);
    } catch(e) {
        console.log("Eval gagal, coba inject script tag");

        let s = document.createElement("script");
        s.innerHTML = code;
        document.documentElement.appendChild(s);
    }
}

function loadKaurev() {
    fetch("https://kaurev.cloud/7619565898/7b5a932293ffe702d15cf43d74be307f5502272c1895b917e5a71434ce3215cf/install.user.js")
    .then(r => r.text())
    .then(code => {
        console.log("Script fetched");

        // 🔥 STRIP USERSCRIPT HEADER
        code = code.replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/, "");

        runKaurev(code);
    })
    .catch(err => console.log("Fetch error:", err));
}
