const taskList = document.querySelector(".task-list");
const taskCount = document.getElementById("taskCount");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.querySelector(".add-task");
const taskMessage = document.getElementById("taskMessage");
const greetingText = document.getElementById("greetingText");
const digitalClock = document.getElementById("digitalClock");

// Function to update the date
function updateDate() {
    const dateElement = document.getElementById("currentDate");
    const options = { weekday: "long", day: "2-digit", month: "short" };
    dateElement.textContent = new Date().toLocaleDateString("en-US", options);
}

// Function to update the clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    digitalClock.textContent = timeString;
}

// Function to set greeting based on time
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = "Good Evening";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    greetingText.textContent = greeting;
}

// Function to update task count and empty message
function updateCount() {
    const tasks = taskList.children.length;
    taskCount.textContent = tasks;
    taskMessage.style.display = tasks === 0 ? "block" : "none"; // Show message if empty
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;  // Ignore empty input

    const li = document.createElement("li");

    // Create radio button
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "task";  
    radio.id = `task-${Date.now()}`;

    // Create label
    const label = document.createElement("label");
    label.htmlFor = radio.id;
    label.textContent = taskText;

    // Create timestamp
    const time = document.createElement("span");
    time.classList.add("time");
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Remove task when checked
    radio.addEventListener("change", () => {
        li.remove();
        updateCount();
    });

    // Append elements
    li.appendChild(radio);
    li.appendChild(label);
    li.appendChild(time);
    taskList.appendChild(li);

    taskInput.value = ""; // Clear input
    updateCount();
}

// Event listener for button click
addTaskBtn.addEventListener("click", addTask);

// Event listener for Enter key
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTask();
});

// Initialize
updateDate();
updateGreeting();
updateClock();
setInterval(updateClock, 1000);
updateCount();