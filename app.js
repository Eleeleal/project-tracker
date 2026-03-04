const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeModal = document.getElementById("closeModal");

// Buka modal
settingsBtn.addEventListener("click", () => {
  console.log("Tombol Pengaturan ditekan"); // cek di console
  settingsModal.style.display = "block";
});

// Tutup modal
closeModal.addEventListener("click", () => {
  settingsModal.style.display = "none";
});

// Tutup modal kalau klik di luar konten
window.addEventListener("click", (e) => {
  if (e.target === settingsModal) {
    settingsModal.style.display = "none";
  }
});
