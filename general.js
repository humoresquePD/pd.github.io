
var speedrunTableBody = document.getElementById("speedrunTable").children[0]
var ratioTable = document.getElementById("ratioTable")

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

function AddPersonToRatioRankings(user) {

    var form = document.getElementById("ratio_adder")

    user.preventDefault();
    console.log("hello from the new func" + form.user.value)

    fetch("https://apibeta.deeeep.io/users/u/" + form.user.value).then(function (response) {
        return response.json()
    }).then(function (data) {
        GetFurtherDataOnUser(data)
    }).catch(function (error) {
        alert("Invalid Username")
    })
}

function GetFurtherDataOnUser(data1) {
    if (data1.username == null) {
        alert("Invalid Username")
        return
    }

    console.log(data1.id)

    fetch("https://apibeta.deeeep.io/userStats/" + data1.id).then(function (response) {
        return response.json()
    }).then(function (data) {
        AddNewUserRow(data1, data)
    }).catch(function (error) {
        alert("Invalid Username 2")
    })
}

function AddNewUserRow(data1, data2) {

    var row = ratioTable.insertRow(1)
    row.insertCell(0).textContent = "N/A"
    row.insertCell(1).textContent = data1.username
    row.insertCell(2).textContent = data2.pd.ratio + "%"
    row.insertCell(3).textContent = data2.pd.played
    row.insertCell(4).textContent = data2.pd.won

    console.log(data1)

}