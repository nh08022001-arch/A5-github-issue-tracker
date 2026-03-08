console.log("hello");
const container = document.getElementById("issues-container");

async function loadIssues() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  const issues = data.data; // API structure

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

        <p class="text-sm text-gray-500">
          ${issue.description}
        </p>

        <div class="flex gap-2 mt-2">
          ${labels}
        </div>

        <div class="flex justify-between items-center text-xs text-gray-500 mt-4">
          <span class="font-semibold">#${issue.id} by ${issue.author}</span>
          <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
        </div>

      </div>
    </div>
    `;

    container.innerHTML += card;
  });
}

loadIssues();