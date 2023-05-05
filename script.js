document.querySelector('#form').addEventListener('submit', function(e) {
  e.preventDefault();

  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  const today = new Date();
  // console.log("today: " + today);
  
  const entry = new Date(year.value, month.value-1, day.value);
  // const entry = new Date(1989, 10, 20);
  // console.log("entry: " + entry);

  // Compute the difference between today and entry dates
  const diff = dateDiff(entry, today);

  // Guard against future dates
  if (diff.year < 0 || diff.month < 0 || diff.day < 0) {
    return;
  }

  // obtain year difference of diff
  document.querySelector("#y_diff").innerHTML = diff.year;
  document.querySelector("#m_diff").innerHTML = diff.month;
  document.querySelector("#d_diff").innerHTML = diff.day;
})

// Write a function to find the difference between two dates and return it as a human readable string (e.g. "1 year, 2 months, 3 days, 4 hours, 5 minutes, 6 seconds ago")
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

