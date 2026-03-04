console.log("app.js berhasil dimuat");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeModal = document.getElementById("closeModal");

if (settingsBtn) {
  settingsBtn.addEventListener("click", () => {
    console.log("Tombol Pengaturan ditekan");
    settingsModal.style.display = "block";
  });
} else {
  console.error("Tombol dengan id 'settingsBtn' tidak ditemukan!");
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    console.log("Modal ditutup");
    settingsModal.style.display = "none";
  });
}
