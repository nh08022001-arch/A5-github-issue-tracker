console.log("hello");
//get elements
const container = document.getElementById("issues-container");
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const totalCountEl = document.getElementById("total-issues");

let allIssues = [];

// for active button
function setActiveButton(activeBtn) {
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  allBtn.classList.add("btn-outline");
  openBtn.classList.add("btn-outline");
  closedBtn.classList.add("btn-outline");

  activeBtn.classList.remove("btn-outline");
  activeBtn.classList.add("btn-primary");
}

// for count
function updateDisplayedCount(issues) {
  totalCountEl.innerText = `${issues.length} Issues`;
}

// for issues cards
function displayIssues(issues) {
  container.innerHTML = "";

  issues.forEach(issue => {
    const labels = issue.labels.map(label =>
      `<span class="badge badge-outline">${label}</span>`
    ).join("");

    const card = `
      <div class="card bg-base-100 shadow-md border border-base-200">
        <div class="card-body">

          <div class="flex justify-between items-center">
            <h2 class="card-title text-lg">${issue.title}</h2>
            <span class="badge badge-success">${issue.priority}</span>
          </div>

          <p class="text-sm text-gray-500">${issue.description}</p>

          <div class="flex gap-2 mt-2">${labels}</div>

          <div class="flex justify-between items-center text-xs text-gray-500 mt-4">
            <span class="font-semibold">#${issue.id} by ${issue.author}</span>
            <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>

        </div>
      </div>
    `;

    container.innerHTML += card;
  });

  updateDisplayedCount(issues); // update count dynamically
}

// Fetch API data
async function loadIssues() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  allIssues = data.data;

  displayIssues(allIssues);
}
loadIssues();

// btn event listeners
allBtn.addEventListener("click", () => {
  setActiveButton(allBtn);
  displayIssues(allIssues);
});

openBtn.addEventListener("click", () => {
  setActiveButton(openBtn);
  const openIssues = allIssues.filter(issue => issue.status === "open");
  //open
  displayIssues(openIssues);
});

closedBtn.addEventListener("click", () => {
  setActiveButton(closedBtn);
  const closedIssues = allIssues.filter(issue => issue.status === "closed");
  //closed
  displayIssues(closedIssues);
});