const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2411-FTB-ET-WEB-PT/events"

const state = {
  events: [],
};


const fetchAllEvents = async () => {
  try {
    const response = await fetch(API);
    const json = await response.json();

    state.recipes = json.data;

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

    fetchEvents();
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
  const eventsList = state.recipes;

  if (!eventsList || eventsList.length === 0) {
    eventsContainer.innerHTML = "<h3>No events found</h3>";
    return;
  }

  eventsContainer.innerHTML = "";

  eventsList.forEach((events) => {
    const eventsElement = document.createElement("div");
    eventsElement.classList.add("events-card");
    eventsElement.innerHTML = `
            <h4>${events.name}</h4>
            <img src="${events.imageUrl}" alt="${events.name}">
            <p>${events.description}</p>
            <button class="delete-button" data-id="${events.id}">Remove</button>
        `;
    eventsContainer.appendChild(eventsElement);

    const deleteButton = eventsElement.querySelector(".delete-button");
    
    deleteButton.addEventListener("click", (event) => {
      try {
        event.preventDefault();
        removeEvents(events.id);
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

    await createNewEvent(
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