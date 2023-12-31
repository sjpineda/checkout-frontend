export const coveringFurniture = (totalRoomSupplies, newObject) => {
  console.log('totalRoomSupplies', totalRoomSupplies)
  if (newObject.propertyIs == 'Furnished') {
    if (newObject.furnishedRange.toString().includes('Medium')) {
      return totalRoomSupplies * 0.8
    }
    if (newObject.furnishedRange.toString().includes('Light')) {
      return totalRoomSupplies * 0.5
    }
    if (newObject.furnishedRange.toString().includes('Heavy')) {
      return totalRoomSupplies * 1.5
    }
  } else {
    return Math.round(totalRoomSupplies) * 0.2
  }
}
