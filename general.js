let speedrunTableBody = document.getElementById("speedrunTable").children[0]

console.log(fetchJSONData())

for (let i = 1; i < speedrunTableBody.children.length; i++) {
    let timeVar = speedrunTableBody.children[i].children[1]
    timeVar.textContent = "test"
}

function fetchJSONData() {
    fetch("./data/speedruns.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) =>
            console.log(data))
        .catch((error) =>
            console.error("Unable to fetch data:", error));
}