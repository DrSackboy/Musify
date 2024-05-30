
var songCount = 0;

function addSong() {
    if (songCount >= 5) {
        alert("You can only add up to 5 songs.");
        return;
    }

    var songName = document.getElementById("songName").value;
    var artistName = document.getElementById("artistName").value;

    if (songName.trim() === "" || artistName.trim() === "") {
        alert("Please enter both song and artist names.");
        return;
    }

    var table = document.getElementById("songTable");
    var newRow = table.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.innerHTML = songCount + 1;
    cell2.innerHTML = songName;
    cell3.innerHTML = artistName;

    document.getElementById("songName").value = "";
    document.getElementById("artistName").value = "";

    songCount++;

    if (songCount === 5) {
        document.getElementById("addButton").disabled = true;
    }
}

function removeSong() {
    if (songCount <= 0) {
        alert("The song list is empty.");
        return;
    }

    var table = document.getElementById("songTable");
    table.deleteRow(songCount);
    songCount--;

    if (songCount < 5) {
        document.getElementById("addButton").disabled = false;
    }
}

function generateLink() {
    var table = document.getElementById("songTable");
    var rows = table.getElementsByTagName("tr");
    var data = [];

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var songName = cells[1].innerText;
        var artistName = cells[2].innerText;
        data.push(songName + " - " + artistName);
    }

    var shareLink = document.getElementById("shareLink");
    var url = window.location.href.split('?')[0];
    var queryParams = "?songs=" + encodeURIComponent(JSON.stringify(data));
    shareLink.innerHTML = "Share this link: <br>" + url + queryParams;
    shareLink.style.display = "block";
}

function clearAll() {
    document.getElementById("songTable").innerHTML = "<tr><th>#</th><th>Song Name</th><th>Artist</th></tr>";
    document.getElementById("shareLink").style.display = "none";
    document.getElementById("songName").value = "";
    document.getElementById("artistName").value = "";
    songCount = 0; 
    document.getElementById("addButton").disabled = false;
}
