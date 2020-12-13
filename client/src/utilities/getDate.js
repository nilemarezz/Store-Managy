const date = new Date()
const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];
export const getDateNow = () => {
  return `${date.getMonth() + 1}_${date.getFullYear().toString()}`
}

export const getFullyDateNow = () => {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
}
