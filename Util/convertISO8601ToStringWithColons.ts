export default function convertISO8601ToStringWithColons(
  input: string
): string {
  let hours, minutes, seconds;

  if (input.includes("H")) {
    hours = input.slice(2, input.indexOf("H"));
  } else {
    hours = false;
  }

  if (input.includes("S")) {
    // checks if number is one-digit and inserts 0 in front of it
    if (isNaN(parseInt(input.charAt(input.indexOf("S") - 2)))) {
      seconds = "0" + input.charAt(input.indexOf("S") - 1);
    } else {
      seconds = input.slice(-3, -1);
    }
  } else {
    seconds = "00";
  }

  // determines how minutes are displayed, based on existence of hours and minutes
  if (hours) {
    if (input.includes("M")) {
      if (input.indexOf("M") - input.indexOf("H") === 3) {
        minutes = input.slice(input.indexOf("H") + 1, input.indexOf("M"));
      } else {
        minutes = "0" + input.charAt(input.indexOf("M") - 1);
      }
    } else {
      minutes = "00";
    }
  } else {
    if (input.includes("M")) {
      minutes = input.slice(2, input.indexOf("M"));
    } else {
      minutes = "0";
    }
  }

  // distinction because livestreams (P0D) are not considered
  return input === "P0D"
    ? "Live"
    : `${hours ? hours + ":" : ""}${minutes}:${seconds}`;
}
