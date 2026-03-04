// Google Sign-In
document.getElementById("googleSignIn").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert("Login berhasil!"))
    .catch(err => alert("Login gagal: " + err.message));
});

// Tambah Project
document.getElementById("projectForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const name = document.getElementById("projectName").value;
    const desc = document.getElementById("projectDesc").value;
    const deadline = document.getElementById("projectDeadline").value;

    const projectRef = await db.collection("projects").add({
      name, desc, deadline
    });

    alert("Project berhasil disimpan!");
    localStorage.setItem("currentProjectId", projectRef.id);
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Tambah Progress
document.getElementById("progressForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const projectId = localStorage.getItem("currentProjectId");
    const date = document.getElementById("progressDate").value;
    const status = document.getElementById("progressStatus").value;
    const notes = document.getElementById("progressNotes").value;

    await db.collection("projects").doc(projectId).collection("progress").add({
      date, status, notes
    });

    alert("Progress berhasil disimpan!");
    loadProgress();
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Load Progress
async function loadProgress() {
  const projectId = localStorage.getItem("currentProjectId");
  const tbody = document.querySelector("#progressTable tbody");
  tbody.innerHTML = "";

  try {
    const snapshot = await db.collection("projects").doc(projectId).collection("progress").get();
    snapshot.forEach(doc => {
      const data = doc.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${data.date}</td>
        <td>${data.status}</td>
        <td>${data.notes}</td>
        <td>
          <button onclick="deleteProgress('${doc.id}')">Hapus</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    alert("Gagal load progress: " + err.message);
  }
}

// Hapus Progress
async function deleteProgress(id) {
  const projectId = localStorage.getItem("currentProjectId");
  try {
    await db.collection("projects").doc(projectId).collection("progress").doc(id).delete();
    alert("Progress berhasil dihapus!");
    loadProgress();
  } catch (err) {
    alert("Error: " + err.message);
  }
}

// Export JSON
document.getElementById("exportJson").addEventListener("click", async () => {
  const projectId = localStorage.getItem("currentProjectId");
  try {
    const projectDoc = await db.collection("projects").doc(projectId).get();
    const progressDocs = await db.collection("projects").doc(projectId).collection("progress").get();

    const projectData = projectDoc.data();
    projectData.progress = progressDocs.docs.map(doc => doc.data());

    const blob = new Blob([JSON.stringify(projectData, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project.json";
    a.click();
  } catch (err) {
    alert("Error export: " + err.message);
  }
});