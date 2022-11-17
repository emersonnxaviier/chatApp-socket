var data = new Date();

export function handleGetCurrentHour() {
  var hour = data.getHours();
  var minutes = data.getMinutes();

  return `${hour}:${minutes > 10 ? minutes : "0" + minutes}`;
}
