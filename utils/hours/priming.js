export const primingHoursTotal = (darkToLight, trimDarkToLight, dryWallRooms) => {
  return darkToLight * 1.5 + trimDarkToLight * 1.2 + dryWallRooms * 1.2
}
