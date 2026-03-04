console.log("app.js berhasil dimuat");

const settingsBtn = document.getElementById("settingsBtn");
console.log("settingsBtn:", settingsBtn);

settingsBtn.addEventListener("click", () => {
  console.log("Tombol Pengaturan ditekan");
  alert("Klik berhasil!");
});
