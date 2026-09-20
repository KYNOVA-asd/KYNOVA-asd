import { select } from "../core/dom.js";

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1X8Hk_NkLekkwYYa_GLcjGFJZT8jT8Tfwv8GUPXkyUX8600kLpzsKSo_Hj6ZujirnURSkgo1b6?gv=true";
const GOOGLE_CALENDAR_SCRIPT =
  "https://calendar.google.com/calendar/scheduling-button-script.js";

const loadCalendarScript = () => {
  if (window.calendar?.schedulingButton) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${GOOGLE_CALENDAR_SCRIPT}"]`);

    if (existingScript) {
      existingScript.addEventListener("load", resolve, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_CALENDAR_SCRIPT;
    script.async = true;
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.append(script);
  });
};

export const createCalendarBooking = async () => {
  const container = select("[data-calendar-booking]");

  if (!container) {
    return;
  }

  try {
    await loadCalendarScript();
    window.calendar.schedulingButton.load({
      url: GOOGLE_CALENDAR_URL,
      color: "#039BE5",
      label: "Programar una cita",
      target: container,
    });
  } catch (error) {
    console.error("No fue posible cargar el botón de Google Calendar.", error);
  }
};
