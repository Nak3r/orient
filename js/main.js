
function parseData(url) {
fetch(url)
.then(response => response.json())
.then(function(data){
	var dataFields = ["name", "team", "finish", "penalty", "total", "place","points","time_from_first", "valid", "desc"];
	var headers = ["#","Фамилия, имя","Коллектив","На дистанции","Штраф","Результат","Место","Баллы","Отставание","Отметка","Примечание", "Сплиты"];
	description = data["description"];
	protocols =  data["data"];
	var body = document.getElementsByTagName("body")[0];
	var descriptionText = document.createElement("h4");
	descriptionText.innerHTML = description;
	descriptionText.classList.add("header");
	body.appendChild(descriptionText);

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
			p.appendChild(link);
		}

		var groupName = document.createElement("h4");
		groupName.innerHTML = group;
		body.appendChild(groupName);

		var table = document.createElement("table");
		table.classList.add("results");
		body.appendChild(table);

		//Table headers
		var row = table.insertRow(-1);
		for (var h in headers) {
			var th = document.createElement("th");
			th.innerHTML = headers[h];
			th.classList.add(dataFields[parseInt(h, 10)-1]);
			th.classList.add("headers");
			row.appendChild(th);
		}

		//Data
		for (var d in protocols[group]) {
			var row = table.insertRow(-1);
			row.classList.add("hover-row");
			var th = document.createElement("th");
			th.classList.add("headers");
			th.innerHTML = parseInt(d, 10) + 1;
			row.appendChild(th);			
			var n = 1
			for (var field in dataFields) {
				var cell = row.insertCell(n);
				cell.classList.add(dataFields[field]);
				cell.innerHTML = protocols[group][d][dataFields[field]];
				n = n + 1

			}
			var splits = protocols[group][d]["splits"];
			for (var split in splits) {
				var cell = row.insertCell(n);
				cell.classList.add("splits");
				n = n + 1;
				var splitData = splits[split];
				cell.innerHTML = splitData;
			}
			


		}
	}
});
}