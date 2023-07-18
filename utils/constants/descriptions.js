export function getConstants(newObject, totalRoomSupplies, totalCrownMolding) {
  let serViceIncludes = '\nThis service includes:'
  if (newObject.propertyIs.includes('Furnished')) {
    serViceIncludes +=
      '\n-Move furniture away from application areas.\n-Protecting and covering of existing surface(s), floors, and furniture with drop cloths and plastic sheets where necessary.'
    if (totalRoomSupplies > 0) {
      serViceIncludes += '\n-Walls -Ceiling '
    }
    if (
      totalRoomSupplies > 0 &&
      Number(newObject.numberOfWindowFrames) > 0 &&
      newObject.numberOfWindowFrames !== '' &&
      newObject.numberOfClosets !== '0'
    ) {
      serViceIncludes +=
        '-Trim, surface preparation for paint (Repairing and sanding localized areas Cracks and nail holes will be filled where necessary) '
    }
  }

  let considering = '\n-Considering: '
  if (newObject.conditionOfTheWalls?.toString().includes('Good')) {
    considering += `Walls ${commonStrings.goodCondition}`
  }
  if (newObject.conditionOfTheWalls?.toString().includes('Minimum')) {
    considering += `Walls ${commonStrings.minimumCondition}`
  }
  if (newObject.conditionOfTheWalls?.toString().includes('Damaged')) {
    considering += `Walls ${commonStrings.damagedCondition}`
  }

  if (newObject.conditionOfTheCeilings.toString().includes('Good')) {
    considering += ` - Ceiling ${commonStrings.goodCondition}`
  }
  if (newObject.conditionOfTheCeilings.toString().includes('Minimum')) {
    considering += ` - Ceiling ${commonStrings.minimumCondition}`
  }
  if (newObject.conditionOfTheCeilings.toString().includes('Damaged')) {
    considering += ` - Ceiling ${commonStrings.damagedCondition}`
  }
  if (newObject.conditionOfTheTrim.toString().includes('Good')) {
    considering += ` - Trim ${commonStrings.goodCondition}`
  }
  if (newObject.conditionOfTheTrim.toString().includes('Minimum')) {
    considering += ` - Trim ${commonStrings.minimumCondition}`
  }
  if (newObject.conditionOfTheTrim.toString().includes('Damaged')) {
    considering += ` - Trim ${commonStrings.damagedCondition}`
  }

  let paintingService = `\n-Painting service for: \nWalls in the following areas:  ${
    Number(newObject.bedrooms) !== 0 ? `${newObject.bedrooms} Bedrooms` : ''
  } ${Number(newObject.bathrooms) !== 0 ? `${newObject.bathrooms} Bathrooms` : ''} ${
    Number(newObject.livingRooms) !== 0 ? `${newObject.livingRooms} Living Rooms` : ''
  } ${Number(newObject.diningRooms) !== 0 ? ` ${newObject.diningRooms} Dining Rooms` : ''} ${
    Number(newObject.kitchens) !== 0 ? `${newObject.kitchens} Kitchens` : ''
  } ${Number(newObject.hallways) !== 0 ? `${newObject.hallways} Hallways` : ''} ${
    Number(newObject.stairwells) !== 0 ? ` ${newObject.stairwells} Stairwells` : ''
  } ${Number(newObject.foyers) !== 0 ? ` ${newObject.foyers} Foyers` : ''} ${
    Number(newObject.offices) !== 0 ? `${newObject.offices} Offices` : ''
  } ${Number(newObject.familyRooms) !== 0 ? `${newObject.familyRooms} Family Rooms` : ''} ${
    Number(newObject.basement) !== 0 ? `${newObject.basement} Basement` : ''
  }
    `

  let ceilingService = `-Ceiling in areas including   ${
    Number(newObject.bedrooms) !== 0 ? `${newObject.bedrooms} Bedrooms` : ''
  } ${Number(newObject.bathrooms) !== 0 ? `${newObject.bathrooms} Bathrooms` : ''} ${
    Number(newObject.livingRooms) !== 0 ? `${newObject.livingRooms} Living Rooms` : ''
  } ${Number(newObject.diningRooms) !== 0 ? ` ${newObject.diningRooms} Dining Rooms` : ''} ${
    Number(newObject.kitchens) !== 0 ? `${newObject.kitchens} Kitchens` : ''
  } ${Number(newObject.hallways) !== 0 ? `${newObject.hallways} Hallways` : ''} ${
    Number(newObject.stairwells) !== 0 ? ` ${newObject.stairwells} Stairwells` : ''
  } ${Number(newObject.foyers) !== 0 ? ` ${newObject.foyers} Foyers` : ''} ${
    Number(newObject.offices) !== 0 ? `${newObject.offices} Offices` : ''
  } ${Number(newObject.familyRooms) !== 0 ? `${newObject.familyRooms} Family Rooms` : ''} ${
    Number(newObject.basement) !== 0 ? `${newObject.basement} Basement` : ''
  }
    `

  let baseboardService = `-Baseboard in areas including ${
    Number(newObject.bedrooms) !== 0 ? `${newObject.bedrooms} Bedrooms` : ''
  } ${Number(newObject.bathrooms) !== 0 ? `${newObject.bathrooms} Bathrooms` : ''} ${
    Number(newObject.livingRooms) !== 0 ? `${newObject.livingRooms} Living Rooms` : ''
  } ${Number(newObject.diningRooms) !== 0 ? ` ${newObject.diningRooms} Dining Rooms` : ''} ${
    Number(newObject.kitchens) !== 0 ? `${newObject.kitchens} Kitchens` : ''
  } ${Number(newObject.hallways) !== 0 ? `${newObject.hallways} Hallways` : ''} ${
    Number(newObject.stairwells) !== 0 ? ` ${newObject.stairwells} Stairwells` : ''
  } ${Number(newObject.foyers) !== 0 ? ` ${newObject.foyers} Foyers` : ''} ${
    Number(newObject.offices) !== 0 ? `${newObject.offices} Offices` : ''
  } ${Number(newObject.familyRooms) !== 0 ? `${newObject.familyRooms} Family Rooms` : ''} ${
    Number(newObject.basement) !== 0 ? `${newObject.basement} Basement` : ''
  }
    `

  let crownMoldingService =
    totalCrownMolding > 0
      ? `Crown Molding in areas including 
${Number(newObject.bedrooms) !== 0 ? 'Bedrooms' : ''} ${
          Number(newObject.bathrooms) !== 0 ? 'Bathrooms' : ''
        } ${Number(newObject.livingRooms) !== 0 ? 'Living Rooms' : ''} ${
          Number(newObject.diningRooms) !== 0 ? 'Dining Rooms' : ''
        } ${Number(newObject.kitchens) !== 0 ? 'Kitchens' : ''} ${
          Number(newObject.hallways) !== 0 ? 'Hallways' : ''
        } ${Number(newObject.stairwells) !== 0 ? 'Stairwells' : ''} ${
          Number(newObject.foyers) !== 0 ? 'Foyers' : ''
        } ${Number(newObject.offices) !== 0 ? 'Offices' : ''} ${
          Number(newObject.familyRooms) !== 0 ? 'Family Rooms' : ''
        } ${Number(newObject.basement) !== 0 ? 'Basement' : ''}`
      : ''

  let noPaint = ''
  if (totalRoomSupplies === 0) {
    noPaint = '\n- No Walls - No Ceiling - No Baseboards'
  }
  if (totalCrownMolding === 0) {
    noPaint = '\n- No crown molding required'
  }
  let doorWithFrame =
    Number(newObject.numberOfDoorWithFrames) > 0
      ? `\n- ${newObject.numberOfDoorWithFrames} Doors with frames`
      : '\n- NO DOORS'
  let windowWithFrame =
    Number(newObject.numberOfWindowFrames) > 0
      ? ` - ${newObject.numberOfWindowFrames} Windows with frames`
      : 'NO WINDOWS'
  let closets =
    Number(newObject.numberOfClosets) > 0 ? ` - ${newObject.numberOfClosets} Closets` : 'NO CLOSETS'

  let notesByClients = '\n* Notes (info provided by client): '
  if (newObject.currentWallFinish.includes('Matte')) {
    notesByClients += '\nMatte'
  } else {
    notesByClients += '\nGloss '
  }
  notesByClients += 'and new finish is '
  if (newObject.desiredWallFinish.includes('Matte')) {
    notesByClients += 'Matte'
  } else {
    notesByClients += 'Gloss'
  }
  let approx = ''
  notesByClients += ` Approx ${newObject.numberKeepColorRooms} areas will have the same or similar colors or a similar shade of color for walls.   Approx ${newObject.numberRoomsLightToDark} areas will change to collors of the wall to a much darker shade or color. Approx ${newObject.numberRoomsDarkToLight}  areas will change the colors of the walls to a much lighter shade or color
  `

  if (newObject.changeTrimColor.toString().includes('Keep the same')) {
    approx += 'Trim will keep the same or similar color'
  } else {
    approx += `Approx ${newObject.numberRoomsTrimLightToDark} areas will
     change the trim to a darker color. Approx ${newObject.numberRoomsTrimDarkToLight} areas will change the trim to a lighter color`
  }

  let propertyCondition = `\nThis property is ${newObject.propertyIs} ${newObject.furnishedRange}
   Paint: ${newObject.brandOfPaint}`

  if (newObject.paintProvided.includes('Yes')) {
    propertyCondition += '\n- Paint and Supplies included'
  } else {
    propertyCondition += '\n- Paint Provided by Client'
  }
  let propertyDescription =
    serViceIncludes +
    considering +
    paintingService +
    ceilingService +
    baseboardService +
    crownMoldingService +
    noPaint +
    doorWithFrame +
    windowWithFrame +
    closets
  let bottomDescription = propertyDescription + notesByClients + approx + propertyCondition
  return {
    propertyDescription,
    bottomDescription,
  }
}

const commonStrings = {
  goodCondition: 'in good condition (no repairs required).',
  minimumCondition: 'require minor repairs (minimum damage).',
  damagedCondition: 'require major repairs (pending photos).',
}
