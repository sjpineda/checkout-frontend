const roomKeys = {
  bedrooms: {
    value: 1,
  },
  basement: {
    value: 2,
  },
  bathrooms: {
    value: 0.6,
  },
  livingRooms: {
    value: 1,
  },
  stairwells: {
    value: 0.8,
  },
  hallways: {
    value: 0.8,
  },
  kitchens: {
    value: 0.8,
  },
  familyRooms: {
    value: 1,
  },
  diningRooms: {
    value: 1,
  },
  foyers: {
    value: 1.3,
  },
  offices: {
    value: 0.7,
  },
  dens: {
    value: 0.7,
  },
}
let wallKeys = {
  bedrooms: {
    value: 0,
  },
  basement: {
    value: 0,
  },
  bathrooms: {
    value: 0,
  },
  livingRooms: {
    value: 0,
  },
  stairwells: {
    value: 0,
  },
  hallways: {
    value: 0,
  },
  kitchens: {
    value: 0,
  },
  familyRooms: {
    value: 0,
  },
  diningRooms: {
    value: 0,
  },
  foyers: {
    value: 0,
  },
  offices: {
    value: 0,
  },
  dens: {
    value: 0,
  },
}
let ceilingKeys = {
  bedrooms: {
    value: 0,
  },
  basement: {
    value: 0,
  },
  bathrooms: {
    value: 0,
  },
  livingRooms: {
    value: 0,
  },
  stairwells: {
    value: 0,
  },
  hallways: {
    value: 0,
  },
  kitchens: {
    value: 0,
  },
  familyRooms: {
    value: 0,
  },
  diningRooms: {
    value: 0,
  },
  foyers: {
    value: 0,
  },
  offices: {
    value: 0,
  },
  dens: {
    value: 0,
  },
}
let baseboardKeys = {
  bedrooms: {
    value: 0,
  },
  basement: {
    value: 0,
  },
  bathrooms: {
    value: 0,
  },
  livingRooms: {
    value: 0,
  },
  stairwells: {
    value: 0,
  },
  hallways: {
    value: 0,
  },
  kitchens: {
    value: 0,
  },
  familyRooms: {
    value: 0,
  },
  diningRooms: {
    value: 0,
  },
  foyers: {
    value: 0,
  },
  offices: {
    value: 0,
  },
  dens: {
    value: 0,
  },
}
let crownMoldKeys = {
  bedrooms: {
    value: 0,
  },
  basement: {
    value: 0,
  },
  bathrooms: {
    value: 0,
  },
  livingRooms: {
    value: 0,
  },
  stairwells: {
    value: 0,
  },
  hallways: {
    value: 0,
  },
  kitchens: {
    value: 0,
  },
  familyRooms: {
    value: 0,
  },
  diningRooms: {
    value: 0,
  },
  foyers: {
    value: 0,
  },
  offices: {
    value: 0,
  },
  dens: {
    value: 0,
  },
}
const propertiesDictionary = {
  email: 'email',
  phoneNumber: 'phoneNumber',
  address: 'address',
  whenWould: 'projectDate',
  fullName: 'fullName',
  paintThe: 'whatToPaint',
  willAny: 'changeRoomColor',
  typeA: 'tenFeetWall',
  desiredWall45: 'desiredWallFinish',
  currentWall: 'currentWallFinish',
  willAny48: 'changeTrimColor',
  conditionOf50: 'conditionOfTheCeilings',
  conditionOf: 'conditionOfTheWalls',
  conditionOf52: 'conditionOfTheTrim',
  propertyIs59: 'propertyIs',
  numberOf64: 'numberOfWindowFrames',
  numberOf65: 'numberOfDoorWithFrames',
  numberOf: 'numberOfClosets',
  numberOf67: 'numberKeepColorRooms',
  number68: 'numberRoomsLightToDark',
  number69: 'numberRoomsDarkToLight',
  numberOf70: 'numberRoomsTrimLightToDark',
  number71: 'numberRoomsTrimDarkToLight',
  typeA86: 'painttotalPlace',
  iWould: 'paintCeilings',
  doYou: 'paintProvided',
  brandOf: 'brandOfPaint',
  furnishedRange: 'furnishedRange',
  bedrooms: 'bedrooms',
  number117: 'basement',
  number118: 'bathrooms',
  number119: 'livingRooms',
  number120: 'stairwells',
  number121: 'hallways',
  number122: 'kitchens',
  number123: 'familyRooms',
  number124: 'diningRooms',
  number125: 'foyers',
  offices: 'offices',
  number127: 'dens',
  areThere: 'additionalDetails',
  numberOf133: 'dryWallRooms',
  typeA134: 'wallpaperRemoval',
  typeA135: 'wallpaperRooms',
  whichAreas: 'whichAreas',
  typeA138: 'colorsForWalls',
  numberOf141: 'numberOfDoorFrames',
  whichAreas147: 'whichAreasCeilings',
  selectAreas148: 'selectAreasCeilings',
  whichAreas149: 'whichAreasBaseboards',
  selectAreas150: 'selectAreasPaintCM',
  selectAreas: 'selectWallAreasPaint',
  typeA152: 'anyRoomRawDrywall',
  typeA153: 'anyCeilingsTenFeet',
  wouldYou: 'trimPaintedBaseboardsCM',
  whichAreas155: 'whichAreasCM',
  selectAreas156: 'selectAreasPaintBaseboards',
  wouldYou157: 'includeTrimOptions',
}
// let totalRooms = 0
// let totalRoomSupplies = 0
const normalizeData = async (answers) => {
  let newObject = {}
  let totalRooms = 0
  let totalRoomSupplies = 0
  for (const [key, value] of Object.entries(answers)) {
    let obj = {}
    obj = value
    if (
      obj.type !== 'control_pagebreak' &&
      obj.type !== 'control_head' &&
      obj.type !== 'control_widget'
    ) {
      // let key = obj.text.split(' ').join('')
      // answers[key] = obj.hasOwnProperty('prettyFormat') ? obj.prettyFormat : obj.answer
      // if(obj.text.includes('State and City')) {
      //   console.log('ENTERED', obj)
      //   newObject[propertiesDictionary['address']] += obj.answer
      // }
      if (obj.text === 'Address') {
        console.log("HEllO HELLo")
        let address = ''
        for (const property in obj.answer) {
          address += ` ${obj.answer[property]},`
        }
        address = address.replace(/,$/, '')
        newObject[propertiesDictionary[obj.name]] = address
        newObject.addressLine = obj.answer.addr_line1
      } else {
        const dictionaryName = propertiesDictionary[obj.name]
        newObject[dictionaryName] = obj.hasOwnProperty('prettyFormat')
          ? obj.prettyFormat
          : obj.answer
          ? obj.answer
          : 0
      }
    }
  }
  // newObject['address'] = newObject.address?.replace(/<br>/g, '')
   newObject['address'] +=  ` ${answers['105'].answer}`
  console.log('obj', newObject)
  for (let item in roomKeys) {
    if (newObject.hasOwnProperty(item)) {
      totalRooms += isNaN(newObject[item]) ? 0 : parseInt(newObject[item])
      totalRoomSupplies += isNaN(newObject[item])
        ? 0
        : parseInt(newObject[item]) * roomKeys[item].value
    }
  }

  console.log('totalRooms', totalRooms)
  console.log('totalRoomSupplies', totalRoomSupplies)
  let totalCrownMolding = 0
  if (newObject?.trimPaintedBaseboardsCM?.toString().includes('Crown Molding')) {
    totalCrownMolding = totalRoomSupplies
  }

  let objectTotal = {}
  let totalSuppliesObject = {
    totalSuppliesWall: 0,
    totalSuppliesCeilings: 0,
    totalSuppliesBaseboards: 0,
    totalSuppliesCrownMolding: 0,
  }
  if (newObject.whichAreas?.toString().includes('All areas')) {
    objectTotal = {
      totalWalls: totalRoomSupplies,
    }
    totalSuppliesObject.totalSuppliesWall = totalRoomSupplies
  } else {
    objectTotal = {
      totalWalls: getTotalRooms(newObject, newObject.selectWallAreasPaint, wallKeys),
    }
  }
  if (newObject.whichAreasCeilings.toString().includes('All areas')) {
    objectTotal.totalCeilings = totalRoomSupplies
    totalSuppliesObject.totalSuppliesCeilings = totalRoomSupplies
  } else {
    objectTotal.totalCeilings = getTotalRooms(
      newObject,
      newObject.selectAreasCeilings.toString(),
      ceilingKeys
    )
  }
  if (newObject.whichAreasBaseboards.toString().includes('All areas')) {
    objectTotal.totalBaseboards = totalRoomSupplies
    totalSuppliesObject.totalSuppliesBaseboards = totalRoomSupplies
  } else {
    objectTotal.totalBaseboards = getTotalRooms(
      newObject,
      newObject.selectAreasPaintBaseboards.toString(),
      baseboardKeys
    )
  }
  if (newObject.whichAreasCM.toString().includes('All areas')) {
    objectTotal.totalCrownMolding = totalRoomSupplies
    totalSuppliesObject.totalSuppliesWall = totalRoomSupplies
  } else {
    objectTotal.totalCrownMolding = getTotalRooms(
      newObject,
      newObject.selectAreasPaintCM.toString(),
      crownMoldKeys
    )
  }
  console.log('objectTotal', objectTotal)
  const totalSuppliesWall = calculateTotalSupplies(wallKeys)
  if (!newObject.whichAreas.toString().includes('All areas')) {
    totalSuppliesObject.totalSuppliesWall = totalSuppliesWall
  }
  const totalSuppliesCeiling = calculateTotalSupplies(ceilingKeys)

  if (!newObject.whichAreasCeilings.toString().includes('All areas')) {
    totalSuppliesObject.totalSuppliesCeilings = totalSuppliesCeiling
  }
  const totalSuppliesBaseboard = calculateTotalSupplies(baseboardKeys)
  if (!newObject.whichAreasBaseboards.toString().includes('All areas')) {
    totalSuppliesObject.totalSuppliesBaseboards = totalSuppliesBaseboard
    for (let item in roomKeys) {
      if (newObject.hasOwnProperty(item)) {
        baseboardKeys[item].value = isNaN(newObject[item]) ? 0 : parseInt(newObject[item])
      }
    }
  }
  const totalSuppliesCrownMolding = calculateTotalSupplies(crownMoldKeys)
  if (!newObject.whichAreasCM.toString().includes('All areas')) {
    totalSuppliesObject.totalSuppliesCrownMolding = totalSuppliesCrownMolding
    for (let item in roomKeys) {
      if (newObject.hasOwnProperty(item)) {
        crownMoldKeys[item].value = isNaN(newObject[item]) ? 0 : parseInt(newObject[item])
      }
    }
  }
  let averageCeilingHeight = 10
  if (newObject.tenFeetWall === 'Yes') {
    averageCeilingHeight =
      ((totalRoomSupplies -
        (isNaN(newObject.anyCeilingsTenFeet) ? 0 : newObject.anyCeilingsTenFeet)) *
        9.5 +
        (isNaN(newObject.anyCeilingsTenFeet) ? 0 : newObject.anyCeilingsTenFeet) * 13) /
      totalRoomSupplies
  }

  let heightPercent = averageCeilingHeight > 10 ? averageCeilingHeight / 10 : 1
  console.log('heightPercent', heightPercent)
  console.log('averageCeilingHeight', averageCeilingHeight)
  console.log('totalSuppliesObject', totalSuppliesObject)
  totalSuppliesObject.totalSuppliesWall = totalSuppliesObject.totalSuppliesWall * heightPercent
  totalSuppliesObject.totalSuppliesCeilings =
    totalSuppliesObject.totalSuppliesCeilings * heightPercent

  return {
    newObject,
    totalRooms,
    totalRoomSupplies,
    totalCrownMolding,
    objectTotal,
    baseboardKeys,
    totalSuppliesObject,
  }
}
function calculateTotalSupplies(placeKeys) {
  let totalSupplies = 0
  for (let item in roomKeys) {
    totalSupplies += placeKeys[item].value * roomKeys[item].value
  }
  return Number(totalSupplies.toFixed(1))
}
function getTotalRooms(newObject, selectAreas, placeKeys) {
  let totalPlace = 0
  if (selectAreas.toString().includes('Bedrooms')) {
    totalPlace += Number(newObject.bedrooms)
    placeKeys['bedrooms'].value = Number(newObject.bedrooms)
  }
  if (selectAreas.toString().includes('Bathrooms')) {
    totalPlace += Number(newObject.bathrooms)
    placeKeys['bathrooms'].value = Number(newObject.bathrooms)
  }
  if (selectAreas.toString().includes('Living Rooms')) {
    totalPlace += Number(newObject.livingRooms)
    placeKeys['livingRooms'].value = Number(newObject.livingRooms)
  }
  if (selectAreas.toString().includes('Family')) {
    totalPlace += Number(newObject.familyRooms)
    placeKeys['familyRooms'].value = Number(newObject.familyRooms)
  }
  if (selectAreas.toString().includes('Dining')) {
    totalPlace += Number(newObject.diningRooms)
    placeKeys['diningRooms'].value = Number(newObject.diningRooms)
  }
  if (selectAreas.toString().includes('Kitchens')) {
    totalPlace += Number(newObject.kitchens)
    placeKeys['kitchens'].value = Number(newObject.kitchens)
  }
  if (selectAreas.toString().includes('Hallway')) {
    totalPlace += Number(newObject.hallways)
    placeKeys['hallways'].value = Number(newObject.hallways)
  }
  if (selectAreas.toString().includes('Stairwell')) {
    totalPlace += Number(newObject.stairwells)
    placeKeys['stairwells'].value = Number(newObject.stairwells)
  }
  if (selectAreas.toString().includes('Foyer')) {
    totalPlace += Number(newObject.foyers)
    placeKeys['foyers'].value = Number(newObject.foyers)
  }
  if (selectAreas.toString().includes('Office')) {
    totalPlace += Number(newObject.offices)
    placeKeys['offices'].value = Number(newObject.offices)
  }
  if (selectAreas.toString().includes('Den')) {
    totalPlace += Number(newObject.dens)
    placeKeys['dens'].value = Number(newObject.dens)
  }
  if (selectAreas.toString().includes('Basement')) {
    totalPlace += Number(newObject.basement)
    placeKeys['basement'].value = Number(newObject.basement)
  }
  return totalPlace
}
module.exports = {
  normalizeData,
}
