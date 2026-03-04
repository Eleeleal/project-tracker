console.log("app.js berhasil dimuat"); // cek apakah file terbaca

const settingsForm = document.getElementById("settingsForm");

if (settingsForm) {
  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault(); // cegah refresh halaman
    console.log("Form disubmit");
    alert("Form berhasil ditangkap JS!");
  });
} else {
  console.error("Form dengan id 'settingsForm' tidak ditemukan!");
}
