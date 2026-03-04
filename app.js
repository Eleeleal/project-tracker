// Referensi elemen
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeModal = document.getElementById("closeModal");
const settingsForm = document.getElementById("settingsForm");
const tbody = document.querySelector("#projectTable tbody");

// Simpan projectId yang sedang diedit
let editId = null;

// Buka modal
settingsBtn.addEventListener("click", () => {
  settingsForm.reset();
  editId = null;
  settingsModal.style.display = "block";
});

// Tutup modal
closeModal.addEventListener("click", () => {
  settingsModal.style.display = "none";
});

// Simpan project (tambah/edit)
settingsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const projectData = {
    name: document.getElementById("projectName").value,
    status: document.getElementById("projectStatus").value,
    created: document.getElementById("projectCreated").value,
    deadline: document.getElementById("projectDeadline").value
  };

  try {
    if (editId) {
      // Update project
      await db.collection("projects").doc(editId).set(projectData);
      alert("Project berhasil diperbarui!");
    } else {
      // Tambah project baru
      await db.collection("projects").add(projectData);
      alert("Project berhasil ditambahkan!");
    }
    settingsModal.style.display = "none";
    loadProjects();
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Render tabel project
async function loadProjects() {
  tbody.innerHTML = "";
  try {
    const snapshot = await db.collection("projects").get();
    snapshot.forEach(doc => {
      const p = doc.data();
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
    alert("Gagal load project: " + err.message);
  }
}

// Edit project
async function editProject(id) {
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
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
}

// Hapus project
async function deleteProject(id) {
  if (!confirm("Yakin ingin menghapus project ini?")) return;
  try {
    await db.collection("projects").doc(id).delete();
    alert("Project berhasil dihapus!");
    loadProjects();
  } catch (err) {
    alert("Error: " + err.message);
  }
}

// Load project saat halaman dibuka
loadProjects();
