let menu = document.querySelector("header>span");
let sidebar = document.querySelector("aside");
let day = document.querySelector(".day");
let muscle = document.querySelector(".muscle");
let tablecontent = document.querySelector("tbody");

menu.addEventListener("click", () => {
  if (menu.innerHTML == "close") {
    sidebar.style.width = "0";
    menu.innerHTML = "menu";
  } else {
    sidebar.style.width = "80%";
    menu.innerHTML = "close";
  }
});
let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
getschedule(date);

function changeday(element) {
  date = new Date(`March ${element.id}, 2021`);
  getschedule(date);
}

function getschedule(date) {
  fetch("Arjun.json")
    .then((response) => response.text())
    .then((data) => {
      let details = JSON.parse(data);
      day.innerHTML = days[date.getDay()];

      let dateschedule;
      if (day.innerHTML == "Monday") dateschedule = details.Schedule.Monday;
      else if (day.innerHTML == "Tuesday")
        dateschedule = details.Schedule.Tuesday;
      else if (day.innerHTML == "Wednesday")
        dateschedule = details.Schedule.Wednesday;
      else if (day.innerHTML == "Thursday")
        dateschedule = details.Schedule.Thursday;
      else if (day.innerHTML == "Friday")
        dateschedule = details.Schedule.Friday;
      else if (day.innerHTML == "Saturday")
        dateschedule = details.Schedule.Saturday;
      else dateschedule = details.Schedule.Sunday;

      muscle.innerHTML = dateschedule.Muscle;
      let str = "";

      Object.values(dateschedule.Exe).forEach((element, index) => {
        str += `<tr>
                  <td>${Object.keys(dateschedule.Exe)[index]}</td>
                  <td>${element.Name}</td>
                  <td>${element.Sets}</td>
                  <td>${element.Reps}</td>
               </tr>
               `;
      });
      tablecontent.innerHTML = str;
    });
}
