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
export const getPropertyDescriptions = async newObject => {
  let propertyDescription = ''
  for (let i = 0; i < keysForProperties.length; i++) {
    if (Number(newObject[keysForProperties[i]]) !== 0) {
      const uppercased =
        keysForProperties[i].charAt(0).toUpperCase() + keysForProperties[i].slice(1)
      propertyDescription += ` ${newObject[keysForProperties[i]]} ${
        uppercased === 'Kitchens' ? 'Kitchen' : uppercased
      }  / `
    }
  }
  propertyDescription = propertyDescription.replace(/\/(?=\D*$)/, '')

  return propertyDescription
}
