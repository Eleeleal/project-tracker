console.log("app.js berhasil dimuat"); // cek apakah file terbaca

// Referensi elemen
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeModal = document.getElementById("closeModal");
const settingsForm = document.getElementById("settingsForm");
const tbody = document.querySelector("#projectTable tbody");

let editId = null; // projectId yang sedang diedit

// Pastikan modal tertutup saat awal
settingsModal.style.display = "none";

// Buka modal
if (settingsBtn) {
  settingsBtn.addEventListener("click", () => {
    console.log("Tombol Pengaturan ditekan");
    settingsForm.reset();
    editId = null;
    settingsModal.style.display = "block";
  });
} else {
  console.error("Tombol dengan id 'settingsBtn' tidak ditemukan!");
}

// Tutup modal
if (closeModal) {
  closeModal.addEventListener("click", () => {
    console.log("Modal ditutup");
    settingsModal.style.display = "none";
  });
}

// Tutup modal kalau klik di luar konten
window.addEventListener("click", (e) => {
  if (e.target === settingsModal) {
    console.log("Klik di luar modal → modal ditutup");
    settingsModal.style.display = "none";
  }
});

// Simpan project (tambah/edit)
if (settingsForm) {
  settingsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form disubmit");

    const projectData = {
      name: document.getElementById("projectName").value,
      status: document.getElementById("projectStatus").value,
      created: document.getElementById("projectCreated").value,
      deadline: document.getElementById("projectDeadline").value
    };

    console.log("Data project yang akan disimpan:", projectData);

    try {
      if (editId) {
        await db.collection("projects").doc(editId).set(projectData);
        console.log("Project berhasil diperbarui dengan ID:", editId);
        alert("Project berhasil diperbarui!");
      } else {
        const docRef = await db.collection("projects").add(projectData);
        console.log("Project baru berhasil ditambahkan dengan ID:", docRef.id);
        alert("Project berhasil ditambahkan!");
      }
      settingsModal.style.display = "none";
      loadProjects();
    } catch (err) {
      console.error("Firestore error saat simpan:", err);
      alert("Error simpan project: " + err.message);
    }
  });
} else {
  console.error("Form dengan id 'settingsForm' tidak ditemukan!");
}

// Render tabel project
async function loadProjects() {
  tbody.innerHTML = "";
  console.log("Memuat project dari Firestore...");
  try {
    const snapshot = await db.collection("projects").get();
    console.log("Jumlah project ditemukan:", snapshot.size);
    snapshot.forEach(doc => {
      const p = doc.data();
      console.log("Project:", doc.id, p);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.status}</td>
        <td>${p.created}</td>
        <td>${p.deadline}</td>
        <td>
          <button onclick="editProject('${doc.id}')">Edit</button>
          <button onclick="deleteProject('${doc.id}')">Hapus</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Firestore error saat load:", err);
    alert("Gagal load project: " + err.message);
  }
}

// Edit project
async function editProject(id) {
  console.log("Edit project dengan ID:", id);
  try {
    const docSnap = await db.collection("projects").doc(id).get();
    if (docSnap.exists) {
      const p = docSnap.data();
      document.getElementById("projectName").value = p.name;
      document.getElementById("projectStatus").value = p.status;
      document.getElementById("projectCreated").value = p.created;
      document.getElementById("projectDeadline").value = p.deadline;
      editId = id;
      settingsModal.style.display = "block";
    } else {
      console.warn("Project tidak ditemukan:", id);
    }
  } catch (err) {
    console.error("Firestore error saat edit:", err);
    alert("Error: " + err.message);
  }
}

// Hapus project
async function deleteProject(id) {
  console.log("Hapus project dengan ID:", id);
  if (!confirm("Yakin ingin menghapus project ini?")) return;
  try {
    await db.collection("projects").doc(id).delete();
    console.log("Project berhasil dihapus:", id);
    alert("Project berhasil dihapus!");
    loadProjects();
  } catch (err) {
    console.error("Firestore error saat hapus:", err);
    alert("Error: " + err.message);
  }
}

// Load project saat halaman dibuka
loadProjects();
