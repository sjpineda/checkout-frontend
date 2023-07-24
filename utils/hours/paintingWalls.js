export const paintingWallsHours = (totalRoomSupplies, object, objectTotal) => {
  const firstCoat = totalRoomSupplies * 0.8 * 4
  const extraCoatLD = object.numberRoomsLightToDark * 0.5 * 4
  const extraCoatDL = object.numberRoomsDarkToLight * 0.3 * 4
  const extraCoatRawDrywall = object.dryWallRooms * 4 * 0.6
  let additionCoatsMatte = 0
  if (object.desiredWallFinish === object.currentWallFinish) {
    additionCoatsMatte = 0
  } else if (object.desiredWallFinish.toString().includes('Matte')) {
    additionCoatsMatte = totalRoomSupplies * 0.3 * 4
  }
  let additionCoatGloss = 0
  if (object.desiredWallFinish === object.currentWallFinish) {
    additionCoatGloss = 0
  } else if (object.desiredWallFinish.toString().includes('Gloss')) {
    additionCoatGloss = totalRoomSupplies * 0.3 * 4
  }

  console.log('firstCoat', firstCoat)
  console.log('hi')
  console.log('extraCoatDrywall', extraCoatRawDrywall)
  console.log('extraCoatLD', extraCoatLD)
  console.log('extraCoatDL', extraCoatDL)
  console.log('additionCoatsMatte', additionCoatsMatte)
  console.log('additionCoatGloss', additionCoatGloss)

  return parseFloat(
    (
      firstCoat +
      extraCoatLD +
      extraCoatRawDrywall +
      extraCoatDL +
      additionCoatsMatte +
      additionCoatGloss
    ).toFixed(2)
  )
}
