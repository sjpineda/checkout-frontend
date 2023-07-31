export async function getConstants(newObject, totalRoomSupplies, totalCrownMolding, objectTotal) {
  let serViceIncludes = '\nThis service includes:'
  if (!newObject.propertyIs.toString().includes('Vacant')) {
    serViceIncludes += '\n-Move furniture away from application areas.'
  }
  serViceIncludes += `\n-Protecting and covering of existing ${
    !newObject.propertyIs.toString().includes('Vacant')
      ? 'surface(s), floors, and furniture with drop cloths and plastic sheets where necessary'
      : 'surface(s), floors with drop cloths and plastic sheets where necessary'
  } `
  if (totalRoomSupplies > 0) {
    serViceIncludes += `\n ${objectTotal.totalWalls > 0 ? '-Walls ' : ''} ${
      objectTotal.totalCeilings > 0 ? '-Ceiling ' : ' '
    }`
  }
  if (
    objectTotal.totalWalls > 0 ||
    objectTotal.totalCrownMolding > 0 ||
    objectTotal.totalBaseboards > 0 ||
    objectTotal.totalCeilings > 0 ||
    Number(newObject.numberOfWindowFrames) > 0 ||
    Number(newObject.numberOfClosets) > 0
  ) {
    serViceIncludes +=
      '-Trim, surface preparation for paint (Repairing and sanding localized areas Cracks and nail holes will be filled where necessary) '
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

  let paintingService = `\n-Painting service for: ${
    objectTotal.totalWalls > 0
      ? `\n-Walls in the following areas:  ${
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
        } `
      : ''
  } `
  let ceilingService = ''
  if (newObject.whichAreasCeilings.toString() === 'All areas') {
    ceilingService =
      objectTotal.totalCeilings > 0
        ? `-Ceiling in the following areas  ${
            Number(newObject.bedrooms) !== 0 ? `${newObject.bedrooms} Bedrooms` : ''
          } ${Number(newObject.bathrooms) !== 0 ? `${newObject.bathrooms} Bathrooms` : ''} ${
            Number(newObject.livingRooms) !== 0 ? `${newObject.livingRooms} Living Rooms` : ''
          } ${
            Number(newObject.diningRooms) !== 0 ? ` ${newObject.diningRooms} Dining Rooms` : ''
          } ${Number(newObject.kitchens) !== 0 ? `${newObject.kitchens} Kitchens` : ''} ${
            Number(newObject.hallways) !== 0 ? `${newObject.hallways} Hallways` : ''
          } ${Number(newObject.stairwells) !== 0 ? ` ${newObject.stairwells} Stairwells` : ''} ${
            Number(newObject.foyers) !== 0 ? ` ${newObject.foyers} Foyers` : ''
          } ${Number(newObject.offices) !== 0 ? `${newObject.offices} Offices` : ''} ${
            Number(newObject.familyRooms) !== 0 ? `${newObject.familyRooms} Family Rooms` : ''
          } ${Number(newObject.basement) !== 0 ? `${newObject.basement} Basement` : ''}
    `
        : ''
  } else {
    ceilingService =
      objectTotal.totalCeilings > 0
        ? `\n-Ceiling in the following areas  ${
            newObject.selectAreasCeilings.toString().includes('Bedrooms')
              ? `${newObject.bedrooms} Bedrooms`
              : ''
          } ${
            newObject.selectAreasCeilings.toString().includes('Bathrooms')
              ? `${newObject.bathrooms} Bathrooms`
              : ''
          } ${
            newObject.selectAreasCeilings.toString().includes('Living Rooms')
              ? `${newObject.livingRooms} Living Rooms`
              : ''
          } ${
            newObject.selectAreasCeilings.toString().includes('Dining Rooms')
              ? ` ${newObject.diningRooms} Dining Rooms`
              : ''
          } ${
            newObject.selectAreasCeilings.toString().includes('Kitchens')
              ? `${newObject.kitchens} Kitchens`
              : ''
          } ${
            newObject.selectAreasCeilings.toString().includes('Hallways')
              ? `${newObject.hallways} Hallways`
              : ''
          } ${
            newObject.selectAreasCeilings.toString().includes('Stairwells')
              ? ` ${newObject.stairwells} Stairwells`
              : ''
          } ${
            newObject.selectAreasCeilings.toString().includes('Foyers')
              ? ` ${newObject.foyers} Foyers`
              : ''
          } ${
            newObject.selectAreasCeilings.toString().includes('Offices')
              ? `${newObject.offices} Offices`
              : ''
          } ${
            newObject.selectAreasCeilings.toString().includes('Family Rooms')
              ? `${newObject.familyRooms} Family Rooms`
              : ''
          } ${
            newObject.selectAreasCeilings.toString().includes('Basement')
              ? `${newObject.basement} Basement`
              : ''
          }
    `
        : ''
  }
  let baseboardService = ''
  if (newObject.whichAreasBaseboards.toString() === 'All areas') {
    baseboardService =
      objectTotal.totalBaseboards > 0
        ? `-Baseboard in the following areas ${
            Number(newObject.bedrooms) !== 0 ? `${newObject.bedrooms} Bedrooms` : ''
          } ${Number(newObject.bathrooms) !== 0 ? `${newObject.bathrooms} Bathrooms` : ''} ${
            Number(newObject.livingRooms) !== 0 ? `${newObject.livingRooms} Living Rooms` : ''
          } ${
            Number(newObject.diningRooms) !== 0 ? ` ${newObject.diningRooms} Dining Rooms` : ''
          } ${Number(newObject.kitchens) !== 0 ? `${newObject.kitchens} Kitchens` : ''} ${
            Number(newObject.hallways) !== 0 ? `${newObject.hallways} Hallways` : ''
          } ${Number(newObject.stairwells) !== 0 ? ` ${newObject.stairwells} Stairwells` : ''} ${
            Number(newObject.foyers) !== 0 ? ` ${newObject.foyers} Foyers` : ''
          } ${Number(newObject.offices) !== 0 ? `${newObject.offices} Offices` : ''} ${
            Number(newObject.familyRooms) !== 0 ? `${newObject.familyRooms} Family Rooms` : ''
          } ${Number(newObject.basement) !== 0 ? `${newObject.basement} Basement` : ''}
    `
        : ''
  } else {
    baseboardService =
      objectTotal.totalBaseboards > 0
        ? `-Baseboard in the following areas ${
            newObject.selectAreasPaintBaseboards.toString().includes('Bedrooms')
              ? `${newObject.bedrooms} Bedrooms`
              : ''
          } ${
            newObject.selectAreasPaintBaseboards.toString().includes('Bathrooms')
              ? `${newObject.bathrooms} Bathrooms`
              : ''
          } ${
            newObject.selectAreasPaintBaseboards.toString().includes('Living Rooms')
              ? `${newObject.livingRooms} Living Rooms`
              : ''
          } ${
            newObject.selectAreasPaintBaseboards.toString().includes('Dining Rooms')
              ? ` ${newObject.diningRooms} Dining Rooms`
              : ''
          } ${
            newObject.selectAreasPaintBaseboards.toString().includes('Kitchens')
              ? `${newObject.kitchens} Kitchens`
              : ''
          } ${
            newObject.selectAreasPaintBaseboards.toString().includes('Hallways')
              ? `${newObject.hallways} Hallways`
              : ''
          } ${
            newObject.selectAreasPaintBaseboards.toString().includes('Stairwells')
              ? ` ${newObject.stairwells} Stairwells`
              : ''
          } ${
            newObject.selectAreasPaintBaseboards.toString().includes('Foyers')
              ? ` ${newObject.foyers} Foyers`
              : ''
          } ${
            newObject.selectAreasPaintBaseboards.toString().includes('Offices')
              ? `${newObject.offices} Offices`
              : ''
          } ${
            newObject.selectAreasPaintBaseboards.toString().includes('Family Rooms')
              ? `${newObject.familyRooms} Family Rooms`
              : ''
          } ${
            newObject.selectAreasPaintBaseboards.toString().includes('Basement')
              ? `${newObject.basement} Basement`
              : ''
          }
    `
        : ''
  }

  let crownMoldingService = ''
  if (newObject.whichAreasCM.toString() === 'All areas') {
    crownMoldingService =
      totalCrownMolding > 0
        ? `Crown Molding in the following areas ${Number(newObject.bedrooms) !== 0 ? 'Bedrooms' : ''} ${
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
  } else {
    crownMoldingService =
      totalCrownMolding > 0
        ? `-Crown Molding in the following areas ${
            newObject.selectAreasPaintCM.toString().includes('Bedrooms')
              ? `${newObject.bedrooms} Bedrooms`
              : ''
          } ${
            newObject.selectAreasPaintCM.toString().includes('Bathrooms')
              ? `${newObject.bathrooms} Bathrooms`
              : ''
          } ${
            newObject.selectAreasPaintCM.toString().includes('Living Rooms')
              ? `${newObject.livingRooms} Living Rooms`
              : ''
          } ${
            newObject.selectAreasPaintCM.toString().includes('Dining Rooms')
              ? ` ${newObject.diningRooms} Dining Rooms`
              : ''
          } ${
            newObject.selectAreasPaintCM.toString().includes('Kitchens')
              ? `${newObject.kitchens} Kitchens`
              : ''
          } ${
            newObject.selectAreasPaintCM.toString().includes('Hallways')
              ? `${newObject.hallways} Hallways`
              : ''
          } ${
            newObject.selectAreasPaintCM.toString().includes('Stairwells')
              ? ` ${newObject.stairwells} Stairwells`
              : ''
          } ${
            newObject.selectAreasPaintCM.toString().includes('Foyers')
              ? ` ${newObject.foyers} Foyers`
              : ''
          } ${
            newObject.selectAreasPaintCM.toString().includes('Offices')
              ? `${newObject.offices} Offices`
              : ''
          } ${
            newObject.selectAreasPaintCM.toString().includes('Family Rooms')
              ? `${newObject.familyRooms} Family Rooms`
              : ''
          } ${
            newObject.selectAreasPaintCM.toString().includes('Basement')
              ? `${newObject.basement} Basement`
              : ''
          }
    `
        : ''
  }

  let noPaint = ''
if(objectTotal.totalBaseboards ===0){
  noPaint += 'No baseboards required '
}
  if (objectTotal.totalCrownMolding === 0) {
    noPaint += '-No crown molding required '
  }
  if (objectTotal.totalWalls === 0) {
    noPaint += '-No walls '
  }
  if (objectTotal.totalCeiling === 0) {
    noPaint += '-No ceilings'
  }
  let doorWithFrame =
    Number(newObject.numberOfDoorFrames) > 0
      ? `\n- ${newObject.numberOfDoorFrames} Door frames`
      : '- NO DOOR FRAMES'
  let windowWithFrame =
    Number(newObject.numberOfWindowFrames) > 0
      ? ` - ${newObject.numberOfWindowFrames} Windows with frames`
      : ' NO WINDOWS'
  let closets =
    Number(newObject.numberOfClosets) > 0
      ? ` - ${newObject.numberOfClosets} Closets`
      : ' NO CLOSETS'
  let doorFrames =
    Number(newObject.numberOfDoorWithFrames) > 0
      ? ` - ${newObject.numberOfDoorWithFrames} Doors with frames`
      : ' NO DOORS WITH FRAMES'
  let notesByClients = '\n* Notes (info provided by client): '
  if (objectTotal.totalWalls > 0) {
    if (newObject.currentWallFinish.toString().includes('Matte')) {
      notesByClients += '\n Current finish is Matte'
    } else {
      notesByClients += '\n Current finish is Gloss '
    }
    notesByClients += ' and new finish is '
    if (newObject.desiredWallFinish.toString().includes('Matte')) {
      notesByClients += 'Matte.'
    } else {
      notesByClients += 'Gloss.'
    }
  }

  let approx = ''

  notesByClients += ` ${
    newObject.numberKeepColorRooms > 0
      ? `Approx ${newObject.numberKeepColorRooms} areas will have the same or similar colors or a similar shade of color for walls.`
      : ''
  } ${
    newObject.numberRoomsLightToDark > 0
      ? ` Approx ${newObject.numberRoomsLightToDark} areas will change to colors of the wall to a much darker shade or color.`
      : ''
  }   ${
    newObject.numberRoomsDarkToLight > 0
      ? `Approx ${newObject.numberRoomsDarkToLight}  areas will change the colors of the walls to a much lighter shade or color`
      : ''
  } 
  `
  if (newObject.changeTrimColor.toString().includes('Keep the same')) {
    approx += 'Trim will keep the same or similar color'
  } else {
    approx += `${
      newObject.numberRoomsTrimLightToDark > 0
        ? `Approx ${newObject.numberRoomsTrimLightToDark} areas will change the trim to a darker color.`
        : ''
    }  ${
      newObject.numberRoomsTrimDarkToLight > 0
        ? `Approx ${newObject.numberRoomsTrimDarkToLight} areas will change the trim to a lighter color`
        : ''
    } `
  }

  let propertyCondition = `\nThis property is  ${
    Number(newObject.furnishedRange) === 0 ? newObject.propertyIs : newObject.furnishedRange
  } 
 ${newObject.brandOfPaint !== 0? `Paint: ${newObject.brandOfPaint} `: ''}`
  let exceedHeight = ''
  let wallPaperRemoval = ''
  let removeDryWall = ''
  if (newObject.paintProvided.toString().toLowerCase().includes('yes')) {
    propertyCondition += '\n- Paint and Supplies included'
  } else {
    propertyCondition += '- Paint Provided by Client'
  }
  if (newObject.tenFeetWall.toString().toLowerCase().includes('yes')) {
    exceedHeight = `\n- ${newObject.anyCeilingsTenFeet} rooms exceed the standard height`
  }else{
    exceedHeight = `\n- Standard height`
  }
  if (newObject.wallpaperRemoval.toString().toLowerCase().includes('yes')) {
    wallPaperRemoval = `\n- ${newObject.wallpaperRooms} walls need wallpaper removal`
  }

  if (newObject.anyRoomRawDrywall.toString().toLowerCase() === 'yes') {
    removeDryWall = `\n- ${newObject.dryWallRooms} rooms have raw drywall`
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
    doorFrames +
    closets
  let bottomDescription =
    propertyDescription +
    notesByClients +
    approx +
    exceedHeight +
    wallPaperRemoval +
    removeDryWall +
    propertyCondition
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
