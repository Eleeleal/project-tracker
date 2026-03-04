console.log("app.js berhasil dimuat"); // cek apakah file terbaca

const settingsBtn = document.getElementById("settingsBtn");
console.log("settingsBtn:", settingsBtn); // cek apakah null atau button

const settingsModal = document.getElementById("settingsModal");
console.log("settingsModal:", settingsModal);

const closeModal = document.getElementById("closeModal");
console.log("closeModal:", closeModal);

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
