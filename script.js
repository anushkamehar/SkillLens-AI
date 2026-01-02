function signup() {
  alert("Signup successful (demo)");
}

function login() {
  alert("Login successful (demo)");
}

function analyzeSkills() {
  const role = document.getElementById("role").value;
  const fileInput = document.getElementById("resumeFile");
  const missingSkillsEl = document.getElementById("missingSkills");
  const roadmapEl = document.getElementById("roadmap");
  const matchEl = document.getElementById("match");

  // Clear old results
  missingSkillsEl.innerHTML = "";
  roadmapEl.innerHTML = "";
  matchEl.innerText = "0%";

  if (!role) {
    alert("Please select a job role");
    return;
  }

  if (fileInput.files.length === 0) {
    alert("Please upload a resume (.txt)");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const resumeText = reader.result.toLowerCase();

    const roleSkills = {
      "Web Developer": ["html", "css", "javascript", "react"],
      "ML Engineer": ["python", "machine learning", "tensorflow"],
      "Data Analyst": ["python", "sql", "excel", "power bi"],
      "Software Engineer": ["java", "python", "data structures"]
    };

    const requiredSkills = roleSkills[role];
    let matched = 0;

    requiredSkills.forEach(skill => {
      if (resumeText.includes(skill)) {
        matched++;
      } else {
        const li = document.createElement("li");
        li.textContent = skill;
        missingSkillsEl.appendChild(li);

        const road = document.createElement("li");
        road.textContent = `Learn ${skill}`;
        roadmapEl.appendChild(road);
      }
    });

    const percent = Math.round((matched / requiredSkills.length) * 100);
    matchEl.innerText = percent + "%";
  };

  reader.readAsText(fileInput.files[0]);
}// expose functions to HTML
window.signup = signup;
window.login = login;
window.analyzeSkills = analyzeSkills;

