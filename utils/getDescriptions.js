const keysForProperties = [
  'bedrooms',
  'basement',
  'bathrooms',
  'livingRooms',
  'stairwells',
  'hallways',
  'kitchens',
  'familyRooms',
  'diningRooms',
  'foyers',
  'offices',
]
export const getDescriptions = (newObject) => {
  let propertyDescription = ''
  for (let i = 0; i < keysForProperties.length; i++) {
    if (Number(newObject[keysForProperties[i]]) !== 0) {
      if (i === keysForProperties.length - 1) {
        propertyDescription += `and ${newObject[keysForProperties[i]]} ${keysForProperties[i]}.`
      } else {
        propertyDescription += ` ${newObject[keysForProperties[i]]} ${keysForProperties[i]}, `
      }
    }
  }
  return propertyDescription.slice(0, -2)
}

export const getJobDescription = async (newObject, objectTotal) => {
  let jobDescription = `Painting service for ${objectTotal.totalWalls > 0 ? 'walls' : ''}`
  if (newObject.paintCeilings.toString() === 'Yes') {
    jobDescription += ', ceilings'
  }
  if (objectTotal.totalBaseboards > 0) {
    jobDescription += ', baseboards'
  }
  if (objectTotal.totalCrownMolding > 0) {
    jobDescription += ', crown molding,'
  }
  const whatpaint = newObject.whatToPaint.toString().toLowerCase().replace(/;/g, ',')
  console.log('whatpaint', whatpaint)
  jobDescription += `, ${whatpaint > 0 ? whatpaint : ''}`
  jobDescription += ' according to the instructions provided by the client'
  // jobDescription += ' ' + newObject.Paintthefollowingtrim
  // jobDescription += `  in ${newObject.bedrooms} bedrooms  ${newObject.bathrooms}  bathrooms ${newObject.livingRooms}
  // living rooms ${newObject.kitchens} kitchens ${newObject.familyRooms} family rooms ${newObject.diningRooms}
  // dinning rooms ${newObject.foyers} foyers ${newObject.offices} offices ${newObject.hallways} hallways ${newObject.stairwells} stairwells ${newObject.basement} basement.
  // in ${newObject.numberOfDoorWithFrames} doors ${newObject.numberOfClosets} closets.`
  console.log('jobDescri', jobDescription)

  return jobDescription
}
