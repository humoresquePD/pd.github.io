let speedrunTableBody = document.getElementById("speedrunTable").children[0]

try {
    let speedrunData = JSON.parse(fetchJSONData("./data/speedruns.json"))
    console.log(speedrunData["speedruns"].length)
}
catch {
    console.error("Failed to extract JSON")
}


for (let i = 1; i < speedrunTableBody.children.length; i++) {
    let timeVar = speedrunTableBody.children[i].children[1]
    timeVar.textContent = "test"
}

function fetchJSONData(path) {
    fetch(path)
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