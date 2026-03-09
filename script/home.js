// console.log("Hello! This is home page")
let activeTab = "all"
let issuesData = [];


// spinner
const manageSpinner = (status) => {
    const spinner = document.getElementById("spinner");
    const issueContainer = document.getElementById("issue-container");

    if (status == true) {
        spinner.classList.remove("hidden");
        spinner.classList.add("flex");
        issueContainer.classList.add("hidden");
    } else {
        issueContainer.classList.remove("hidden");
        spinner.classList.add("hidden");
        spinner.classList.remove("flex");
    }
}

const api = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// console.log(api.length)
manageSpinner(true);
fetch(api)
    .then(res => res.json())
    .then(data => {
        issuesData = data.data;
        showIssues(issuesData);
        manageSpinner(false);
    })

// modal
const loadIssueDetail = async (id) => {
    manageSpinner(true);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetails(details.data)
    manageSpinner(false);
}

const displayIssueDetails = (issue) => {

    // console.log(issue);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
                    <div>
                        <h1 class="font-bold text-lg">${issue.title}</h1>
                    </div>
                     <div class="flex gap-4 items-center">
                    <button class="btn btn-soft rounded-full">${issue.status === "open" ? "Opened" : "Closed"}</button>
                    <div class="flex gap-4">
                     <p>Opened by ${issue.author}</p>
                     <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                     </div>
                    </div>
                    <div>
                     ${issue.labels.map(label => `<button class="btn btn-soft btn-secondary rounded-full border">${label.toUpperCase()}</button>`).join(" ")}
                    </div>
                     <div>
                     <p>${issue.description}</p>
                    </div>
        <div class="flex p-4 bg-[#F8FAFC] items-center gap-5 rounded-md">
            <p>Assignee: <span class="font-bold">${issue.assignee}</span></p>
            <p>Priority: <button class="btn btn-soft rounded-full">${issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}</button></p>
        </div>
    `;
    document.getElementById("issue_modal").showModal();
};


// card load

function showIssues(issues) {
    const issuesContainer = document.getElementById("issues-container");
    issuesContainer.innerHTML = "";

    // filter issue
    let filteredIssues;

    if (activeTab === "all") {
        filteredIssues = issues;
    } else {
        filteredIssues = issues.filter(function (issue) {
            return issue.status === activeTab;
        });
    }

    const issueCount = document.getElementById("issue-count");
    issueCount.innerText = `${filteredIssues.length} Issues`;

    for (let issue of filteredIssues) {
        // console.log(issue)
        const statusImg = issue.status === "open"
            ? "assets/Open-Status.png"
            : "assets/Closed-Status.png";

        const issueCard = document.createElement("div");

        // add border top dynamically
        issueCard.style.borderTop = issue.status === "open" ? "4px solid #00A96E" : "4px solid #A855F7";
        issueCard.style.borderRadius = "0.5rem";

        // labels dynamically
        const labelAdd = issue.labels.map(label => `
                <button class="btn btn-soft btn-secondary rounded-full border">${label.toUpperCase()}</button>
            `).join(" ")


        issueCard.innerHTML = `
                <div class="issue-card space-y-4 shadow-sm p-4 rounded-lg">

                    <!-- card status img -->
                    <div class="card-img-priority flex flex-1 justify-between items-center">
                        <div>
                            <img width="30px" src="${statusImg}" alt="">
                        </div>
                        
                        <button class="btn btn-soft btn-secondary rounded-full">${issue.priority}</button>
                    </div>

                    <!-- card header -->
                     <div class="card-header space-y-2">
                        <h2 class="font-semibold">${issue.title}</h2>
                        <p class="text-[#64748B] text-[14px]">${issue.description}</p>
                     </div>

                     <!-- topics name -->
                      ${labelAdd}

                      <!-- date -->

                      <div class="date py-4 border-t border-[#64748B]">
                        <p class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
                        <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString()}</p>
                      </div>


                </div>
        `

        issueCard.addEventListener("click", () => loadIssueDetail(issue.id));
        issuesContainer.append(issueCard);

    }
}

// tab-buttons
const tabButtons = document.querySelectorAll(".issue-tab-btn");
tabButtons.forEach(btn => {
    btn.addEventListener("click", async () => {
        activeTab = btn.dataset.tab;

        // Clear search input when switching tabs
        document.getElementById("input-search").value = "";

        tabButtons.forEach(b => {
            b.classList.remove("btn-primary");
            b.classList.add("btn-outline");
        });

        btn.classList.remove("btn-outline");
        btn.classList.add("btn-primary");

        manageSpinner(true);
        await new Promise(resolve => setTimeout(resolve, 0));

        if (activeTab === "all") {
            showIssues(issuesData);
        } else {
            const filtered = issuesData.filter(issue => issue.status === activeTab);
            showIssues(filtered);
        }
        manageSpinner(false);
    })
})

// Search functionality - triggered on input
document.getElementById("input-search").addEventListener("input", async (e) => {
    const searchValue = e.target.value.trim().toLowerCase();

    if (searchValue === "") {
        // Show all issues respecting the active tab
        if (activeTab === "all") {
            showIssues(issuesData);
        } else {
            const filtered = issuesData.filter(issue => issue.status === activeTab);
            showIssues(filtered);
        }
        return;
    }

    // Filter by search term, then the result will be filtered by activeTab in showIssues
    const filtered = issuesData.filter(issue =>
        issue.title.toLowerCase().includes(searchValue) ||
        issue.description.toLowerCase().includes(searchValue)
    );

    showIssues(filtered);
});






