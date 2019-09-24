
/*fetch("http://localhost:8000/data.json")*/
fetch("https://nak3r.github.io/orient/data.json")
.then(response => response.json())
.then(function(data){
	var fields = ["name", "team", "finish", "penalty", "total", "place","points","time_from_first", "valid", "desc"];
	headers = data["headers"];
	description = data["description"];
	protocols =  data["data"];
	var body = document.getElementsByTagName("body")[0];
	for (var group in protocols) {

		//Create anchor to group
		var a = document.createElement("a");
		a.name = group;
		body.appendChild(a);

		//Create link to anchors
		var p = document.createElement("p");
		body.appendChild(p);
		for (var groupName in protocols) {
			var link = document.createElement("a");
			link.href = "#" + groupName;
			link.innerHTML = groupName;
			link.classList.add("link");
			p.appendChild(link)
		}

		var groupName = document.createElement("h4");
		groupName.innerHTML = group;
		body.appendChild(groupName);

		var table = document.createElement("table");
		table.classList.add("results")
		body.appendChild(table);

		//Table headers
		var row = table.insertRow(-1);
		for (var h in headers) {
			var th = document.createElement("th");
			th.innerHTML = headers[h];
			th.classList.add(fields[parseInt(h, 10)-1]);
			row.appendChild(th);
		}

		//Data
		for (var d in protocols[group]) {
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
			var splits = protocols[group][d]["splits"];
			for (var split in splits) {
				var cell = row.insertCell(n);
				cell.classList.add("splits");
				n = n + 1
				var splitData = splits[split];
				cell.innerHTML = splitData;
			}
			


		}
	}
});