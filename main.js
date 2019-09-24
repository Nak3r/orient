fetch("https://nak3r.github.io/orient/data.json")
.then(response => response.json())
.then(function(data){
	var fields = ["name", "team", "finish", "penalty", "total", "place","time_from_first", "valid", "desc"];
	headers = data["headers"];
	description = data["description"];
	protocols =  data["data"];
	console.log(headers, description, protocols);

	for (var group in protocols) {
		var body = document.getElementsByTagName("body")[0];
		var classDistance = document.createElement("h4");
		var a = document.createElement("a");
		a.name = group;
		body.appendChild(a);
		var p = document.createElement("p");
		body.appendChild(p);
		for (var groupName in protocols) {
			var link = document.createElement("a");
			link.href = "#" + groupName;
			link.innerHTML = groupName;
			link.classList.add("link");
			p.appendChild(link)
		}
		body.appendChild(classDistance);
		classDistance.innerHTML = group;
		var table = document.createElement("table");
		body.appendChild(table);

		var row = table.insertRow(-1);
		for (var h in headers) {
			var th = document.createElement("th");
			th.innerHTML = headers[h];
			th.classList.add(fields[parseInt(h, 10)-1]);
			row.appendChild(th);
		}

		for (var d in protocols[group]) {
			console.log(protocols[group][d]);
			let formatedJSON = JSON.stringify(protocols[group][d], null, 4);
			var row = table.insertRow(-1);
			
			var cell = row.insertCell(0);
			cell.innerHTML = parseInt(d, 10) + 1
			var n = 1
			for (var field in fields) {
				var cell = row.insertCell(n);
				cell.classList.add(fields[field]);
				cell.innerHTML = protocols[group][d][fields[field]]
				n = n + 1

			}

			/*document.body.innerHTML += `<pre>${formatedJSON}</pre>`;*/
		}
	}
});