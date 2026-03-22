export function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    timeZone: "America/Araguaina",
  }).format(new Date(date));
}

export function formatEventDateLong(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Araguaina",
  }).format(new Date(date));
}
