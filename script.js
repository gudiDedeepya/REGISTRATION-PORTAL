// script.js — Full CRUD with Update/Delete

let participants = JSON.parse(localStorage.getItem("participants")) || [];
const save = () => localStorage.setItem("participants", JSON.stringify(participants));

document.addEventListener("DOMContentLoaded", () => {
  // -------- CREATE --------
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const participant = {
        id: Date.now(), // unique identifier
        name: document.getElementById("name").value.trim(),
        rollno: document.getElementById("rollno").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value,
        year: document.getElementById("year").value,
      };

      participants.push(participant);
      save();

      window.location.href = "success.html";
    });
  }

  // -------- READ + UPDATE + DELETE --------
  const list = document.getElementById("participantsList");
  if (list) {
    const render = () => {
      list.innerHTML = "";
      if (participants.length === 0) {
        list.innerHTML = "<li>No participants yet.</li>";
        return;
      }
      participants.forEach((p, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div>
            <strong>${i + 1}. ${p.name}</strong> (${p.rollno}) — ${p.department}, ${p.year}<br>
             ${p.phone} | ${p.email}
          </div>
          <div class="actions">
            <button class="edit-btn" data-id="${p.id}"> Edit</button>
            <button class="del-btn" data-id="${p.id}"> Delete</button>
          </div>
        `;
        list.appendChild(li);
      });
    };

    // Handle Edit/Delete actions
    list.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLElement)) return;

      // DELETE
      if (e.target.classList.contains("del-btn")) {
        const id = Number(e.target.dataset.id);
        participants = participants.filter(p => p.id !== id);
        save();
        render();
      }

      // UPDATE
      if (e.target.classList.contains("edit-btn")) {
        const id = Number(e.target.dataset.id);
        const idx = participants.findIndex(p => p.id === id);
        if (idx === -1) return;

        const p = participants[idx];

        let name = prompt("Name:", p.name) || p.name;
        let rollno = prompt("Roll No:", p.rollno) || p.rollno;
        let phone = prompt("Phone:", p.phone) || p.phone;
        let email = prompt("Email:", p.email) || p.email;
        let department = prompt("Department:", p.department) || p.department;
        let year = prompt("Year:", p.year) || p.year;

        participants[idx] = { ...p, name, rollno, phone, email, department, year };
        save();
        render();
      }
    });

    render();
  }
});