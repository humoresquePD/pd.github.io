let speedrunTableBody = document.getElementById("speedrunTable").children[0]

try {
    fetchJSONData("./data/speedruns.json")
}
catch {
    console.error("Failed to extract JSON")
}



function fetchJSONData(path) {
    fetch(path)
        .then((response) => response.json())
        .then((json) => UpdateSpeedrunText(json));
}

function UpdateSpeedrunText(json) {

    let max = speedrunTableBody.children.length
    if (json.speedruns.length < speedrunTableBody.children.length) {
        max = json.speedruns.length
    }

    for (let i = 0; i < max; i++) {
        let timeVar = speedrunTableBody.children[i + 1].children[1]
        let userVar = speedrunTableBody.children[i + 1].children[2]

        minutes = Math.floor(Number(json.speedruns[i].time) / 60)

        timeVar.textContent = minutes + ":" + Number(json.speedruns[i].time) % 60
        userVar.textContent = json.speedruns[i].users
    }
}