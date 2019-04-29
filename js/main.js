
		var mydate = new Date();

		var th = mydate.getHours();

		var yy = mydate.getFullYear();
		var mm = mydate.getUTCMonth() + 1;                 /*получаю дату для того, чтобы работать с данными*/
		var dd = mydate.getDate();

		var date = '';
		var time = '';

		if (dd > 1 && dd < 10) {
			date = yy + '-' + mm + '-' + 0 + dd;
		}
		if (mm > 1 && mm < 10) {
			date = yy + '-' + 0 + mm + '-' + dd;
		}
		else
		date =  yy + '-' + mm + '-' + dd ;


	 	if (th > 1 && th < 10) {
			time = 0 + th + ':' + '00' + ':' + '00';
		}
		else
		time = th + ':' + '00' + ':' + '00';

		var curDate = date + ' ' + time;     /*Дата сегодня*/


		$(document).ready(function() {
			var city = "Rostov-on-Don";
			var key = '11cbd924f81424298f2e371ea09fc703';


			$.ajax({
				url: 'http://api.openweathermap.org/data/2.5/weather',
				dataType: 'json',
				type: 'GET',
				data: {q:city, appid: key, units: 'metric'},


				success: function(data) {

					var wf = '';
					var weather_icon = '';
					var weather_stat1 = '';
					var weather_stat2 = '';


					$.each(data.weather, function(index, val) {                 /*просто текущая погода в городе*/
							wf = data.main.temp.toPrecision(2) + '&deg;C' ;
							weather_icon= "<img width='100' src=http://openweathermap.org/img/w/" + val.icon  + ".png>";
							weather_stat1 = val.main;
							weather_stat2 = val.description;
						});


					$("#currWeatherTemp").html(wf);
					$("#currWeatherIcon").html(weather_icon);
					$("#currStatus").html(weather_stat1);
					$("#currStatus2").html(weather_stat2);
				}
				
			});

		});




		$(document).ready(function() {
				var city = "Rostov-on-Don";
				var key = '11cbd924f81424298f2e371ea09fc703';

				$.ajax({
					url: 'http://api.openweathermap.org/data/2.5/forecast',
					dataType: 'json',
					type: 'GET',
					data: {q:city, appid: key, units: 'metric'},


					success: function(data) {

						var iterator = 0;
						var endDate = date + ' ' + '21:00:00';     /*переменная с последними данными на сегодня,
																	 т.е на 21:00*/

						for (var i = 0; i < 40; i++) {
							iterator += 1;
							if (data.list[i].dt_txt == endDate){   /*т.е счетчик считает все записи на сегодня и мы получаем */
								break;							   /*значение итератора, после которого нужно считывать данные*/
							}									   /*на следующие дни*/
						}



						var numofDays = 3;
						var arr = new Array(numofDays)
						var mean_temp = 0;

						var arr_icon = new Array(numofDays)

						for (var k = 0; k < numofDays; k++){          /* для каждого дня берется среднее значение из всех 8 записей*/
							mean_temp = 0;							  /* для этого дня                                             */
							for (i = iterator + 1; i < iterator + 8 ; i++){
								var curIterator = k * 8 + i;
								mean_temp += data.list[curIterator].main.temp;
							}
							arr[k] = mean_temp/8;
						}

						

						var curIterator = iterator + 4;					/*все добавляется в массив (string) а затем в HTML*/

						for (var y = 0; y < numofDays; y++){
							
							arr_icon[y] = "<img src=http://openweathermap.org/img/w/" + data.list[curIterator].weather[0].icon + ".png>";
				
							curIterator += 8;
						}



						for (var k = 0; k < numofDays; k++){
							arr[k] =arr[k].toPrecision(2) + '&deg;C';

							var temp = '#show' + k;
							var temp2 = '#tmrw' + (k + 1) + 'WeatherIcon';

							$(temp).html(arr[k]);
							$(temp2).html(arr_icon[k]);

						}

						/*arr[0] =arr[0].toPrecision(2) + '&deg;C';
						arr[1] =arr[1].toPrecision(2) + '&deg;C';
						arr[2] =arr[2].toPrecision(2) + '&deg;C';

						$('#show0').html(arr[0]);
						$('#show1').html(arr[1]);
						$('#show2').html(arr[2]);

						$('#tmrw1WeatherIcon').html(arr_icon[0]);
						$('#tmrw2WeatherIcon').html(arr_icon[1]);
						$('#tmrw3WeatherIcon').html(arr_icon[2]);*/

						//$("#showWeatherForecast").html(wf);
					}

				});
		});

		$(document).ready(function() {


			var curWeekDay = mydate.getDay(); /*здесь расчет даты для следующих дней*/


			var arr_weekdays = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];

			var arr_months = ['Янв.','Фев.','Мар.','Апр.','Мая','Июня','Июля','Авг.','Сент.','Окт.','Ноябю','Дек.'];

			var today = new Date();
			var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
			var dayTomorrow = tomorrow.getDate(); 
			var monthTomorrow = tomorrow.getMonth();



			var daytoday = mydate.getDate() + ' ' + arr_months[mydate.getMonth()];

			var dayTmrw = dayTomorrow + ' ' + arr_months[monthTomorrow];


			$('#curWeekDay').html(arr_weekdays[curWeekDay]);
			$('#curDay').html(daytoday);
			curWeekDay += 1;

			if (curWeekDay>6){
				curWeekDay = curWeekDay % 6 - 1;
			}
			$('#tmrwWeekDay1').html(arr_weekdays[curWeekDay]);
			$('#curDay1').html(dayTmrw);
			curWeekDay += 1;


			tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000 * 2));
			dayTomorrow = tomorrow.getDate(); 
			dayTmrw = dayTomorrow + ' ' + arr_months[monthTomorrow];

			if (curWeekDay>6){
				curWeekDay = curWeekDay % 6 - 1;
			}

			$('#tmrwWeekDay2').html(arr_weekdays[curWeekDay]);
			$('#curDay2').html(dayTmrw);
			curWeekDay += 1;

			tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000 * 3));
			dayTomorrow = tomorrow.getDate(); 
			dayTmrw = dayTomorrow + ' ' + arr_months[monthTomorrow];

			if (curWeekDay>6){
				curWeekDay = curWeekDay % 6 - 1;
			}
			$('#tmrwWeekDay3').html(arr_weekdays[curWeekDay]);
			$('#curDay3').html(dayTmrw);
		});


		$(document).ready(function() {    /*дополнительный прогноз на сегодня через каждые 3 часа*/

			var city = "Rostov-on-Don";
			var key = '11cbd924f81424298f2e371ea09fc703';

				$.ajax({
					url: 'http://api.openweathermap.org/data/2.5/forecast',
					dataType: 'json',
					type: 'GET',
					data: {q:city, appid: key, units: 'metric'},


					success: function(data) {		


						var numofTimes = 7;
						var arr_info = new Array(numofTimes);

						var iterator = 0;
						var endDate = date + ' ' + '21:00:00';


						var arr_time = ['00:00','03:00','06:00','09:00','12:00','15:00','18:00','21:00'];

	
					
						for (var i = 0; i < 40; i++) {
							iterator += 1;
							if (data.list[i].dt_txt == endDate){
								break;
							}
						}


	

						var temp = 0;
						var temp2 = new Array(3);

						for (var i = 0; i < 3; i++) {
							temp2[i] = "<img width='40' height='40' src=http://openweathermap.org/img/w/" + data.list[i+1].weather[0].icon + ".png>";
						}
				
						if (iterator > 3){
							for (var i = 8 - iterator; i < 8; i++) {
								arr_info[temp] = arr_time[i];
								temp+=1;

							}

						}		
				

						if (iterator <= 3){

							for (var i = 8 - iterator; i < 8; i++) {
								arr_info[temp] = arr_time[i];

								temp+=1;
							}


							for (var i = 0; i < 3 - iterator; i++) {
								arr_info[temp] = arr_time[i];
								temp+=1;
							}

							if (3-iterator == 0){
								arr_info[temp] = arr_time[0];
							}
						}



						for (var i = 1; i < 4; i++) {
							arr_info[i] = arr_info[i] + " " + temp2[i-1] + " " + data.list[i].main.temp + '&deg;C';
						}


						for (var k = 1; k < 4; k++){
							var temp3 = '#forecastbar'+ k ;

							$(temp3).html(arr_info[k]);
						}

					}

				});

			});


		
