function httpRequest(url,callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url,true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4){
			callback(xhr.responseText);
		}
	}
	xhr.send();
}

var weekday=new Array(7);
weekday[0]="星期天";
weekday[1]="星期一";
weekday[2]="星期二";
weekday[3]="星期三";
weekday[4]="星期四";
weekday[5]="星期五";
weekday[6]="星期六";
function showWeather(result){
	result = JSON.parse(result);
	var list = result.list;
	var table = "<table><tr><th>日期</th><th>星期</th><th>天气</th><th>最低温度</th><th>最高温度</th></tr>";
	for(var i in list){
		var d = new Date(list[i].dt*1000);
		table += "<tr>";
		table += "<td>"+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"</td>";
		table += "<td>"+weekday[d.getDay()]+"</td>";
		table += "<td>"+list[i].weather[0].description+"</td>";
		table += "<td>"+Math.round(list[i].temp.min-273.15)+" °C</td>";
		table += "<td>"+Math.round(list[i].temp.max-273.15)+" °C</td>";
		table += "</tr>"
	}
	table += "</table>";
	document.getElementById("weather").innerHTML = table;
}

var city = localStorage.city;
city = city?city:"beijing";
var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+',china&lang=zh_cn&APPID=65d1bd8ddc51490ee98f0d478e91db85';
httpRequest(url, showWeather);