const settingsForm = document.getElementById("settingsForm");

settingsForm.addEventListener("submit", (e) => {
  e.preventDefault(); // cegah refresh halaman
  console.log("Form disubmit"); // cek di console
  alert("Form berhasil ditangkap JS!");
});
