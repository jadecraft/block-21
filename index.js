const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2411-FTB-ET-WEB-PT/events";

const state = {
  events: [],
};

const fetchAllEvents = async () => {
  try {
    const response = await fetch(API);
    const json = await response.json();

    state.events = json.data; // Fix: Changed from state.recipes to state.events

    renderAllEvents();
  } catch (error) {
    console.log("ERROR in fetchAllEvents", error);
  }
};

const createEvents = async (name, imageUrl, description, date) => {
  try {
    await fetch(API, {
      method: "POST",
      body: JSON.stringify({
        name,
        imageUrl,
        description,
        date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchAllEvents(); // Fix: Changed from fetchEvents() to fetchAllEvents()
  } catch (error) {
    console.log("ERROR in createEvents", error);
  }
};

const removeEvent = async (id) => {
  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    fetchAllEvents();
  } catch (error) {
    console.log("ERROR in removeEvent", error);
  }
};

const renderAllEvents = () => {
  const eventsContainer = document.getElementById("events-container");
  const eventsList = state.events; // Fix: Changed from state.recipes to state.events

  if (!eventsList || eventsList.length === 0) {
    eventsContainer.innerHTML = "<h3>No events found</h3>";
    return;
  }

  eventsContainer.innerHTML = "";

  eventsList.forEach((event) => {
    const eventElement = document.createElement("div");
    eventElement.classList.add("events-card");
    eventElement.innerHTML = `
            <h4>${event.name}</h4>
            <img src="${event.imageUrl}" alt="${event.name}">
            <p>${event.description}</p>
            <button class="delete-button" data-id="${event.id}">Remove</button>
        `;
    eventsContainer.appendChild(eventElement);

    const deleteButton = eventElement.querySelector(".delete-button");

    deleteButton.addEventListener("click", (e) => {
      try {
        e.preventDefault();
        removeEvent(event.id); // Fix: Changed from removeEvents() to removeEvent()
      } catch (error) {
        console.log(error);
      }
    });
  });
};

const addListenerToForm = () => {
  const form = document.querySelector("#new-events-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    await createEvents( // Fix: Changed from createNewEvent() to createEvents()
      form.name.value,
      form.imageUrl.value,
      form.description.value,
      form.date.value
    );

    form.name.value = "";
    form.imageUrl.value = "";
    form.description.value = "";
    form.date.value = "";
  });
};

const init = async () => {
  await fetchAllEvents();
  addListenerToForm();
};

init();
