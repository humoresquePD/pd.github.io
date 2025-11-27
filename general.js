var usersDisplayed = []
var statsDisplayed = []
var defaultPeopleList = ["Dinoo", "Humoresque811", "卄anu卄al", "Lilith", "NoxiRad"]

var speedrunTableBody = document.getElementById("speedrunTable").children[0]
var ratioTable = document.getElementById("ratioTable")

var form = document.getElementById("ratio_adder")


for (let i = 0; i < defaultPeopleList.length; i++) {
    AddPersonToRatioRankingsDirect(defaultPeopleList[i])
}

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

    user.preventDefault();
    console.log("hello from the new func" + form.user.value)

    AddPersonToRatioRankingsDirect(form.user.value)
}
function AddPersonToRatioRankingsDirect(username) {
    fetch("https://apibeta.deeeep.io/users/u/" + username).then(function (response) {
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
        console.error(error)
        alert("Invalid Username 2")
    })
}

function AddNewUserRow(data1, data2) {

    if (usersDisplayed.includes(data1.username)) {
        alert("User already in list")
        return;
    }

    form.user.value = ""

    let scoreNumber = CalculateCustomNumber(data2)
    let saveRow = 0

    for (let i = 0; i < usersDisplayed.length + 1; i++) {
        if (statsDisplayed[i] == null) {
            usersDisplayed.splice(i, 0, data1.username)
            statsDisplayed.splice(i, 0, CalculateCustomNumber(data2))
            saveRow = i
            break;
        }
        if (scoreNumber >= statsDisplayed[i]) {
            usersDisplayed.splice(i, 0, data1.username)
            statsDisplayed.splice(i, 0, CalculateCustomNumber(data2))
            saveRow = i
            break;
        }
    }

    var row = ratioTable.insertRow(1 + saveRow)
    row.insertCell(0).textContent = "N/A"
    row.insertCell(1).textContent = data1.username
    row.insertCell(2).textContent = scoreNumber
    row.insertCell(3).textContent = data2.pd.ratio + "%"
    row.insertCell(4).textContent = data2.pd.played
    row.insertCell(5).textContent = data2.pd.won

    for (let i = 1; i < ratioTable.rows.length; i++) {
        ratioTable.rows[i].cells[0].textContent = i
    }
}

function CalculateCustomNumber(data2) {
    let modifier = Math.min((data2.pd.played / 60) + .2, 1) // Scales from 1 game .2 to 48 games 1
    return Math.ceil(data2.pd.ratio * modifier)
}
