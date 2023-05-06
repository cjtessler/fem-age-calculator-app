/* Helper functions */
function resetOnFocus(e) {
  const id = e.target.id;
  document.querySelector(`#${id}-error`).style.visibility = "hidden";
}

// A function to find the difference between two dates and return it as a human readable string (e.g. "1 year, 2 months, 3 days, 4 hours, 5 minutes, 6 seconds ago")
function dateDiff(date1, date2) {
  const d1 = date1.getDate();
  const m1 = 1 + date1.getMonth();
  const y1 = date1.getFullYear();

  let d2 = date2.getDate();
  let m2 = 1 + date2.getMonth();
  let y2 = date2.getFullYear();

  const month = [31,28,31,30,31,30,31,31,30,31,30,31];

  // If a full month has not passed, then update days and subtract 1 from the month
  if (d1 > d2) {
    d2 = d2 + month[m2-1];
    m2 = m2 - 1;
  }

  if (m1 > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }

  return ({
    year: y2 - y1,
    month: m2 - m1,
    day: d2 - d1
  })
}

/* Add event listeners to the form inputs */
document.querySelector('#day').addEventListener('focus', resetOnFocus);
document.querySelector('#month').addEventListener('focus', resetOnFocus);
document.querySelector('#year').addEventListener('focus', resetOnFocus);

document.querySelector('#form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Obtain date values
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  // Setup dates
  const today = new Date();
  const entry = new Date(year.value, month.value-1, day.value);

  // Compute the difference between today and entry dates
  const diff = dateDiff(entry, today);

  let hasError = false;

  // Guard against future years,
  if (diff.year < 0) {
    let elt = document.querySelector("#year-error");
    elt.innerHTML = "Must be in the past";
    elt.style.visibility = "visible";
    hasError = true;
  }
  
  if (month.value > 12 || month.value < 1) {
    let elt = document.querySelector("#month-error");
    elt.innerHTML = "Must be a valid month";
    elt.style.visibility = "visible";
    hasError = true;
  }

  if (day.value > 31 || day.value < 1) {
    let elt = document.querySelector("#day-error");
    elt.innerHTML = "Must be a valid day";
    elt.style.visibility = "visible";
    hasError = true;
  }

  // Guard against empty fields
  if (day.value === "") {
    let elt = document.querySelector("#day-error");
    elt.innerHTML = "This field is required";
    elt.style.visibility = "visible";
    hasError = true;
  }

  if (month.value === "") {
    let elt = document.querySelector("#month-error");
    elt.innerHTML = "This field is required";
    elt.style.visibility = "visible";
    hasError = true;
  }

  if (year.value === "") {
    let elt = document.querySelector("#year-error");
    elt.innerHTML = "This field is required";
    elt.style.visibility = "visible";
    hasError = true;
  }

  if (hasError) {
    document.querySelector("#y_diff").innerHTML = "--";
    document.querySelector("#m_diff").innerHTML = "--";
    document.querySelector("#d_diff").innerHTML = "--";
    return
  }

  // obtain year difference of diff
  document.querySelector("#y_diff").innerHTML = diff.year;
  document.querySelector("#m_diff").innerHTML = diff.month;
  document.querySelector("#d_diff").innerHTML = diff.day;
})
