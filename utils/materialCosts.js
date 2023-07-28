const materialCostsKeyValues = [
  ['Surface Protector Plastic', { amount: 0, modifier: 25, totalCost: 0 }],
  ['Drywall sheets', { amount: 0, modifier: 17.0, totalCost: 0 }],
  ['Drywall tape', { amount: 0, modifier: 5.0, totalCost: 0 }],
  ['Drywall screws', { amount: 0, modifier: 8.0, totalCost: 0 }],
  ['Compound for walls', { amount: 0, modifier: 7.0, totalCost: 0 }],
  [
    'Sandpaper',
    {
      amount: 0,
      modifier: 7.0,
      totalCost: 0,
    },
  ],
  ['Tape', { amount: 0, modifier: 20.0, totalCost: 0 }],
  ['Caulking', { amount: 0, modifier: 5.0, totalCost: 0 }],
  ['Wood Filler (putty)', { amount: 0, modifier: 5.0, totalCost: 0 }],
  ['Paint Brush', { amount: 0, modifier: 17.0, totalCost: 0 }],
  ['Rolls', { amount: 0, modifier: 15.0, totalCost: 0 }],
  ['Tarps', { amount: 0, modifier: 30.0, totalCost: 0 }],
  ['Pulidora - Lijadora', { amount: 0, modifier: 80.0, totalCost: 0 }],
  ['Trim Paint (Semi-Gloss)', { amount: 0, modifier: 45.0, totalCost: 0 }],
  ['Primer', { amount: 0, modifier: 30.0, totalCost: 0 }],
  ['Walls Paint (First Coat)', { amount: 0, modifier: 40.0, totalCost: 0 }],
  ['Walls Paint (Color change Coat)', { amount: 0, modifier: 40.0, totalCost: 0 }],
  ['Walls Paint (Finish Coat)', { amount: 0, modifier: 40.0, totalCost: 0 }],
  ['Ceiling Paint', { amount: 0, modifier: 40.0, totalCost: 0 }],
  ['Other Costs', { amount: 0, modifier: 0.05, totalCost: 0 }],
]
let amountOfMaterialsMap = new Map(materialCostsKeyValues)
export async function materialCosts(object, totalRoomSupplies, objectTotal, baseboardKeys) {
  if (object?.conditionOfTheWalls !== 0) {
    if (object?.conditionOfTheWalls?.toString().includes('Damaged')) {
      const getObject = amountOfMaterialsMap.get('Drywall sheets')
      getObject.amount = 1
      getObject.totalCost = getObject.amount * getObject.modifier
      amountOfMaterialsMap.set('Drywall sheets', getObject)
    }
  }
  const getObjectTape = amountOfMaterialsMap.get('Drywall tape')
  getObjectTape.amount = amountOfMaterialsMap.get('Drywall sheets').amount
  getObjectTape.totalCost = getObjectTape.amount * getObjectTape.modifier
  amountOfMaterialsMap.set('Drywall tape', getObjectTape)

  const getObjectScrews = amountOfMaterialsMap.get('Drywall screws')
  getObjectScrews.amount = amountOfMaterialsMap.get('Drywall sheets').amount
  getObjectScrews.totalCost = getObjectScrews.amount * getObjectScrews.modifier
  amountOfMaterialsMap.set('Drywall screws', getObjectScrews)

  if (Number(object?.wallpaperRooms) > 1) {
    const getObject = amountOfMaterialsMap.get('Compound for walls')
    getObject.amount = 1
    getObject.totalCost = getObject.amount * getObject.modifier
    amountOfMaterialsMap.set('Compound for walls', getObject)

    const getObjectSandpaper = amountOfMaterialsMap.get('Sandpaper')
    getObjectSandpaper.amount = 1
    getObjectSandpaper.totalCost = getObjectSandpaper.amount * getObjectSandpaper.modifier
    amountOfMaterialsMap.set('Sandpaper', getObjectSandpaper)
  } else {
    if (
      object?.conditionOfTheWalls?.toString().includes('Minimum') ||
      object?.conditionOfTheWalls?.toString().includes('Damaged')
    ) {
      const getObjectSandpaper = amountOfMaterialsMap.get('Sandpaper')
      getObjectSandpaper.amount = 1
      getObjectSandpaper.totalCost = getObjectSandpaper.amount * getObjectSandpaper.modifier
      amountOfMaterialsMap.set('Sandpaper', getObjectSandpaper)
      const getObject = amountOfMaterialsMap.get('Compound for walls')
      getObject.amount = 1
      getObject.totalCost = getObject.amount * getObject.modifier
      amountOfMaterialsMap.set('Compound for walls', getObject)
    } else if (
      object?.conditionOfTheWalls?.toString().includes('Minimum') ||
      object?.conditionOfTheWalls?.toString().includes('Damaged')
    ) {
      const getObjectCompound = amountOfMaterialsMap.get('Compound for walls')
      getObjectCompound.amount = 1
      getObjectCompound.totalCost = getObjectCompound.amount * getObjectCompound.modifier
      amountOfMaterialsMap.set('Compound for walls', getObjectCompound)
      const getObject = amountOfMaterialsMap.get('Sandpaper')
      getObject.amount = 1
      getObject.totalCost = getObject.amount * getObject.modifier
      amountOfMaterialsMap.set('Sandpaper', getObject)
    }
  }

  if (object.conditionOfTheTrim !== 0) {
    if (
      object.conditionOfTheTrim.toString().includes('Minimum') ||
      object.conditionOfTheTrim.toString().includes('Damaged')
    ) {
      const getObject = amountOfMaterialsMap.get('Caulking')
      getObject.amount = 1
      getObject.totalCost = getObject.amount * getObject.modifier
      amountOfMaterialsMap.set('Caulking', getObject)

      const getObject2 = amountOfMaterialsMap.get('Wood Filler (putty)')
      if (getObject.conditionOfTheTrim?.toString().includes('Damaged')) {
        getObject2.amount = 2
      } else {
        getObject2.amount = 1
      }
      getObject2.totalCost = getObject2.amount * getObject2.modifier
      amountOfMaterialsMap.set('Wood Filler (putty)', getObject2)
    }
  }

  let totalSum = 0
  if (object.paintProvided.toString().includes('Yes')) {

    if (Number(object.numberRoomsTrimLightToDark) > 0) {
      totalSum = Math.round(
        Number(objectTotal.totalBaseboards) * 0.2 +
          Number(objectTotal.totalCrownMolding) * 0.2 +
        (isNaN(Number(object.numberOfDoorWithFrames))
          ? 0
          : Number(object.numberOfDoorWithFrames) * 0.1) +
        ( isNaN(Number(object.numberOfWindowFrames))
          ? 0
          : Number(object.numberOfWindowFrames) * 0.1) + (isNaN(Number(object.numberOfClosets))
          ? 0
          : Number(object.numberOfClosets) * 0.1) + (isNaN(Number(object.numberOfDoorFrames))
          ? 0
          : Number(object.numberOfDoorFrames) * 0.1 )+
        (isNaN(Number(object.numberRoomsTrimLightToDark))
          ? 0
          : Number(object.numberRoomsTrimLightToDark) * 0.6)
      )
    } else {
      if (Number(object.numberRoomsTrimDarkToLight) > 0) {

        totalSum = Math.round(
          Number(objectTotal.totalBaseboards) * 0.2 +
            Number(objectTotal.totalCrownMolding) * 0.2 +
          (isNaN(Number(object.numberOfDoorWithFrames))
            ? 0
            : Number(object.numberOfDoorWithFrames) * 0.1) +
          (isNaN(Number(object.NumberofWindowsFrames))
            ? 0
            : Number(object.NumberofWindowsFrames) * 0.1) + (isNaN(Number(object.numberOfClosets))
            ? 0
            : Number(object.numberOfClosets) * 0.1) + (isNaN(Number(object.numberOfDoorFrames))
            ? 0
            : Number(object.numberOfDoorFrames) * 0.1 )+
          (isNaN(Number(object.numberRoomsTrimDarkToLight))
            ? 0
            : Number(object.numberRoomsTrimDarkToLight) * 0.3)
        )
      } else {
        totalSum += Math.round(
          objectTotal.totalBaseboards * 0.2 +
            objectTotal.totalCrownMolding * 0.2 +
            (isNaN(object.numberOfDoorWithFrames) ? 0 : Number(object.numberOfDoorWithFrames)) *
              0.1 +
            (isNaN(object.numberOfWindowFrames) ? 0 : Number(object.numberOfWindowFrames)) * 0.1 +
            (isNaN(object.numberOfClosets) ? 0 : Number(object.numberOfClosets)) * 0.1 +
            (isNaN(object.numberOfDoorFrames) ? 0 : Number(object.numberOfDoorFrames)) * 0.1
        )
      }
    }


    const getObject = amountOfMaterialsMap.get('Trim Paint (Semi-Gloss)')
    getObject.amount = totalSum
    getObject.totalCost = getObject.amount * getObject.modifier
    amountOfMaterialsMap.set('Trim Paint (Semi-Gloss)', getObject)
  }

  if (object.paintProvided.toString().includes('Yes')) {
    let totalSum = 0
    let trimSumValue = 0
    if (object?.conditionOfTheWalls !== 0) {
      if (object?.conditionOfTheWalls?.toString().includes('Damaged')) {
        trimSumValue = 3
      }
      // if (object?.conditionOfTheWalls?.toString().includes('Wallpaper')) {
      //   trimSumValue = 5
      // }
    }

    totalSum = Math.round(
      Number(object.numberRoomsDarkToLight) * 0.7 +
        Number(object.numberRoomsTrimDarkToLight) * 0.5 +
        Number(object.dryWallRooms) * 0.7 +
        Number(object.wallpaperRooms) * 0.5 +
        trimSumValue
    )
    const getObject = amountOfMaterialsMap.get('Primer')
    getObject.amount = totalSum
    getObject.totalCost = getObject.amount * getObject.modifier
    amountOfMaterialsMap.set('Primer', getObject)

    let ceilingPaintTotalSum = Math.round(objectTotal.totalCeilings * 0.6)
    const getObject2 = amountOfMaterialsMap.get('Ceiling Paint')
    getObject2.amount = ceilingPaintTotalSum
    getObject2.totalCost = getObject2.amount * getObject2.modifier
    amountOfMaterialsMap.set('Ceiling Paint', getObject2)

    let totalSumWallsPaintFinish = 0

    let totalSumWallsPaintFirst = Math.round(objectTotal.totalWalls * 1)
    const getObject4 = amountOfMaterialsMap.get('Walls Paint (First Coat)')
    getObject4.amount = totalSumWallsPaintFirst
    getObject4.totalCost = getObject4.amount * getObject4.modifier
    amountOfMaterialsMap.set('Walls Paint (First Coat)', getObject4)

    let totalSumWallsPaintColorChange = Math.round(
      Number(object.numberRoomsLightToDark) * 1 +
        Number(object.numberRoomsDarkToLight) * 0.5 +
        Number(object.dryWallRooms) * 0.6
    )
    const getObject5 = amountOfMaterialsMap.get('Walls Paint (Color change Coat)')
    getObject5.amount = totalSumWallsPaintColorChange
    getObject5.totalCost = getObject5.amount * getObject5.modifier
    amountOfMaterialsMap.set('Walls Paint (Color change Coat)', getObject5)

    if (object.desiredWallFinish === object.currentWallFinish) {
      totalSumWallsPaintFinish = 0
    } else {
      if (object.desiredWallFinish.toString().includes('Matte')) {
        totalSumWallsPaintFinish = (totalSumWallsPaintFirst + totalSumWallsPaintColorChange) * 0.1
      } else {
        console.log('got semi')
        totalSumWallsPaintFinish = (totalSumWallsPaintFirst + totalSumWallsPaintColorChange) * 0.3
      }
    }
    totalSumWallsPaintFinish = Math.round(totalSumWallsPaintFinish)
    const getObject3 = amountOfMaterialsMap.get('Walls Paint (Finish Coat)')
    getObject3.amount = totalSumWallsPaintFinish
    getObject3.totalCost = getObject3.amount * getObject3.modifier
    amountOfMaterialsMap.set('Walls Paint (Finish Coat)', getObject3)
  }
  let totalCostSum = 0
  for (let [key, value] of amountOfMaterialsMap) {
    totalCostSum += value.totalCost
  }
  totalCostSum += Math.floor(totalCostSum * 0.05)

  return totalCostSum
}
