// API Components
const baseURL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const cohort = "/2508-FTB-ET-WEB-FT";
const segment = "/events";
const API = baseURL + cohort + segment;

// ===== State Variables =====
let events = [];
let selectedEvent;

/** Updates state with all events from the API */
async function getEvents() {
  try {
    const res = await fetch(API);
    const json = await res.json();
    events = json.data;
    console.log(events);
    render();
  } catch (error) {
    console.log(error);
  }
}

/** Updates state with a single event from the API */
async function getEvent(id) {
  // TODO
  //   try {
  //     const res = await fetch(API);
  //     const json = await res.json();

  //     for (let artist of json.data) {
  //       if (artist.id === id) {
  //         selectedArtist = artist;
  //         break;
  //       }
  //     }
  //     console.log(selectedArtist);
  //     render();
  //   } catch (error) {
  //     console.log(error);
  //   }

  try {
    const res = await fetch(`${API}/${id}`);
    const json = await res.json();
    selectedEvent = json.data;
    render();
  } catch (error) {
    console.log(error);
  }
}

// === Components ===

/** Artist name that shows more details about the artist when clicked */
function EventListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `
  <a href="#selected">${event.name}</a>
  `;
  $li.addEventListener("click", async function () {
    getEvent(event.id);
  });
  return $li;
}

function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);
  return $ul;
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }

  const $section = document.createElement("section");
  $section.classList.add("event");
  $section.innerHTML = `
  <h3>${selectedEvent.name}</h3>
     <p>${selectedEvent.date.slice(0, 10)}</p>
     <p id="location">${selectedEvent.location}</p>
     <p>${selectedEvent.description}</p>
  `;
  return $section;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("PartyDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();
