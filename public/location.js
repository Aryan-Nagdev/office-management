const countrySel = document.getElementById("country");
const stateSel = document.getElementById("state");
const citySel = document.getElementById("city");

// Load countries
fetch("https://countriesnow.space/api/v0.1/countries")
.then(res => res.json())
.then(data => {
  data.data.forEach(c => {
    countrySel.innerHTML += `<option value="${c.country}">${c.country}</option>`;
  });
});

// When country changes → load states
countrySel.addEventListener("change", () => {
  stateSel.innerHTML = "<option>Loading...</option>";
  citySel.innerHTML = "<option>Select City</option>";

  fetch("https://countriesnow.space/api/v0.1/countries/states", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: countrySel.value })
  })
  .then(res => res.json())
  .then(data => {
    stateSel.innerHTML = "<option>Select State</option>";
    data.data.states.forEach(s => {
      stateSel.innerHTML += `<option value="${s.name}">${s.name}</option>`;
    });
  });
});

// When state changes → load cities
stateSel.addEventListener("change", () => {
  citySel.innerHTML = "<option>Loading...</option>";

  fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: countrySel.value, state: stateSel.value })
  })
  .then(res => res.json())
  .then(data => {
    citySel.innerHTML = "<option>Select City</option>";
    data.data.forEach(city => {
      citySel.innerHTML += `<option value="${city}">${city}</option>`;
    });
  });
});
