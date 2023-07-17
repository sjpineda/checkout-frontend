export const repairingWalls = (totalRoomSupplies, object) => {
  let basicRepair = 0
  let mediumRepair = 0
  let advanceRepair = 0
  let wallpaperRemoval = 0
  if (object?.conditionOfTheWalls !== 0) {
    if (object?.conditionOfTheWalls?.toString().includes('Good')) {
      basicRepair = totalRoomSupplies * 0.5
    }
    if (object?.conditionOfTheWalls?.toString().includes('Minimum')) {
      mediumRepair = totalRoomSupplies * 1
    }
    if (object?.conditionOfTheWalls?.toString().includes('Damaged')) {
      advanceRepair = totalRoomSupplies * 2
    }
    wallpaperRemoval = Number(object?.wallpaperRooms) * 2
  }

  return parseFloat((basicRepair + mediumRepair + advanceRepair + wallpaperRemoval).toFixed(2))
}
