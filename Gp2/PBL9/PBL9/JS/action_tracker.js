const currentDate = document.querySelector(".calendar-current-date");
const prevNextIcons = document.querySelectorAll(".calendar-navigation span");

const liDays = document.querySelector(".calendar-dates");

let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

const today = new Date(); // today date, the real date


let events = JSON.parse(localStorage.getItem("calendarEvents")) || {}; // / parse , splitting object, used object array becasue there are a lot of string data type

const saveEvents = () =>{
localStorage.setItem("calendarEvents",JSON.stringify(events)); // value turning into string, setItem = key, value
}

    let selectedDate = null; 
   let selectedDayElement = null;

  const months = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

function calendar(){
  const firstDayofthisMonth = new Date(currentYear, currentMonth, 1).getDay();
  const lastDateofthisMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayofThisMonth = new Date(currentYear,currentMonth, lastDateofthisMonth ).getDay();
  const lastDateofLastMonth = new Date(currentYear,currentMonth, 0).getDate();

  currentDate.innerHTML = `${months[currentMonth]} ${currentYear}`; // eg.December 2025

  let lidays ="";
  // previous month day
  for (let i=firstDayofthisMonth; i>0; i--){
    lidays += `<li class ="inactive">${lastDateofLastMonth - i + 1}</li>`
  }

  //current Month
  for (let i=1; i<= lastDateofthisMonth; i++){
    let dateKey = `${currentYear}-${currentMonth+1}-${i}`;
    const isToday = i === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear()
                    ? "active"
                    : "";

   
    // Check if this is the selected date (consider month and year)
        const currentDateKey = `${currentYear}-${currentMonth + 1}-${i}`;
        const isSelected = selectedDate ===currentDateKey? "highlight":""
        const hasEvent = events[dateKey] && events[dateKey].length > 0 ? "has-event": "";

        lidays += `<li class="${isToday} ${isSelected} ${hasEvent}" data-day="${i}" data-date="${currentDateKey}">${i}</li>`;

       
  }
   // Next month

        for (let i= lastDayofThisMonth; i < 6; i++) {
           lidays += `<li class = "inactive">${i - lastDayofThisMonth +1}</li>`
        }

        liDays.innerHTML = lidays;
        addClickListeners_toaction();

}
calendar();

function addClickListeners_toaction() {
  const allDays = liDays.querySelectorAll("li:not(.inactive)");

  allDays.forEach((li) => {
    li.addEventListener("click", () => {

      //Remove highlight from previously selected day 
      if (selectedDayElement) {
        selectedDayElement.classList.remove("highlight");
      }

      //Highlight newly clicked day
      selectedDayElement = li;
      selectedDayElement.classList.add("highlight");

      // Save this date
      selectedDate = li.getAttribute("data-date");

      Update_todolist();
    });
  });
}


prevNextIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    if (icon.id === "calendar-next") {
      currentMonth = currentMonth + 1;
    } else {
      currentMonth = currentMonth - 1;
    }

   
    if (currentMonth < 0 || currentMonth > 11) {
      date = new Date(currentYear, currentMonth);
      currentMonth = date.getMonth();
      currentYear = date.getFullYear();
    }

    calendar();
  });
});
      function Update_todolist() {
      if (!selectedDate) {
        const todolist = document.querySelector(".todo-list");
        const selectedDateText = document.getElementById("selected-date-text");
        selectedDateText.innerText = "select a date";
        todolist.innerHTML = "";
        return;
      }
 
      const todolist = document.querySelector(".todo-list");
      const selectedDateText = document.getElementById("selected-date-text");
      const [year, month, day] = selectedDate.split("-");
     
      selectedDateText.innerText = `${months[month-1]} ${day}, ${year}`;
      todolist.innerHTML = "";
     
      if (events[selectedDate]) {
        events[selectedDate].forEach((event, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong class="ms-2">${event.title}</strong>
            <small class="ms-2">${event.details}</small>
            <span class="remove" data-index="${index}">x</span>
          `;
          todolist.appendChild(li);
        });
      }
    }

    
  const addBtn = document.getElementById("add-todo-btn");
  addBtn.addEventListener("click", () => {
      if (!selectedDate) {
        alert("Please select a date first!");
        return;
      }
 
      const titleInput = document.getElementById("todo-title");
      const detailsInput = document.getElementById("todo-details");
 
      const title = titleInput.value;
      const details = detailsInput.value;
 
      if (!title) {
        alert("Please enter an event title!");
        return;
      }
 
      if (!events[selectedDate]) events[selectedDate] = [];
      events[selectedDate].push({ title, details });
 
      saveEvents();
      Update_todolist();
      calendar(); // refresh to show has-event dot
      hasAddedEvent = true;
      unlockBadgeButton();
      // Clear input fields
      titleInput.value = "";
      detailsInput.value = "";
  });
  // getting badge
  let hasAddedEvent = false;
  const badgeBtn = document.getElementById("badge-btn");
  badgeBtn.disabled = true;
  badgeBtn.style.opacity = "0.5";
 
 function unlockBadgeButton() {
  // if there is an event, the btn will remove the disable, by checking with true and false
  if (hasAddedEvent) {
    badgeBtn.disabled = false;
    badgeBtn.style.opacity = "1";
    badgeBtn.style.cursor = "pointer"
  }
 }



  