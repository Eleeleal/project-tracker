// Simpan project (tambah/edit)
settingsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form disubmit"); // log saat form dikirim

  const projectData = {
    name: document.getElementById("projectName").value,
    status: document.getElementById("projectStatus").value,
    created: document.getElementById("projectCreated").value,
    deadline: document.getElementById("projectDeadline").value
  };

  console.log("Data project yang akan disimpan:", projectData); // log isi data

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
    console.error("Firestore error:", err); // log error detail
    alert("Error: " + err.message);
  }
});

// Render tabel project
async function loadProjects() {
  tbody.innerHTML = "";
  console.log("Memuat project dari Firestore...");
  try {
    const snapshot = await db.collection("projects").get();
    console.log("Jumlah project ditemukan:", snapshot.size);
    snapshot.forEach(doc => {
      const p = doc.data();
      console.log("Project:", doc.id, p); // log tiap project
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
    console.error("Gagal load project:", err);
    alert("Gagal load project: " + err.message);
  }
}
