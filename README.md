let body = $response.body;

// hapus CSP meta (biar peluang naik)
body = body.replace(/<meta[^>]*Content-Security-Policy[^>]*>/gi, "");

let inject = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

<script>
(function(){

  function show(title, data){
    let box = document.createElement("div");
    box.style.position = "fixed";
    box.style.top = "0";
    box.style.left = "0";
    box.style.width = "100%";
    box.style.height = "100%";
    box.style.background = "black";
    box.style.color = "lime";
    box.style.zIndex = "999999";
    box.style.overflow = "auto";
    box.style.fontSize = "12px";
    box.innerText = title + "\\n\\n" + data;
    document.body.appendChild(box);
  }

  // hook eval
  const origEval = window.eval;
  window.eval = function(code){
    show("=== EVAL ===", code);
    return origEval(code);
  };

  // hook Function
  const origFunc = window.Function;
  window.Function = function(...args){
    show("=== FUNCTION ===", args.join("\\n\\n"));
    return origFunc.apply(this, args);
  };

  // hook decrypt (kalau ada)
  if (window.CryptoJS) {
    const origDec = CryptoJS.AES.decrypt;
    CryptoJS.AES.decrypt = function(...args){
      let res = origDec.apply(this, args);
      try {
        let txt = res.toString(CryptoJS.enc.Utf8);
        show("=== DECRYPTED ===", txt);
      } catch(e){}
      return res;
    };
  }

  // load script target
  fetch("https://kaurev.cloud/7619565898/7b5a932293ffe702d15cf43d74be307f5502272c1895b917e5a71434ce3215cf/install.user.js")
    .then(r=>r.text())
    .then(code=>{
      show("=== RAW SCRIPT ===", code);
      eval(code);
    })
    .catch(e=>{
      show("ERROR", e.toString());
    });

})();
</script>
`;

body = body.replace("</body>", inject + "</body>");

$done({ body });
