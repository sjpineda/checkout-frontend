export const paintingTrimHours = (
  totalRoomSupplies,
  object,
  totalCrownMolding,
  totalSuppliesObject
) => {
  const trimBaseBoardCrown =
    (isNaN(totalSuppliesObject.totalSuppliesBaseboards)
      ? 0
      : Number(totalSuppliesObject.totalSuppliesBaseboards) +
        (isNaN(totalSuppliesObject.totalSuppliesCrownMolding)
          ? 0
          : Number(totalSuppliesObject.totalSuppliesCrownMolding))) * 0.7
  console.log(totalSuppliesObject)
  console.log('trimBaseBoardCrown', trimBaseBoardCrown)
  console.log('totalSuppliesObject', totalSuppliesObject)
  let trimExtraCoat = 0
  if (object.changeTrimColor === 'Keep the same') {
    trimExtraCoat = 0
  } else {
    trimExtraCoat =
      (Number(object.numberRoomsTrimLightToDark) + Number(object.numberRoomsTrimDarkToLight)) * 0.6
  }
  const doorsAndFrames =
    Number(object.numberOfDoorWithFrames) * 0.35 + Number(object.numberOfDoorFrames) * 0.25
  const windows = object.numberOfWindowFrames * 0.35
  const closets = object.numberOfClosets * 0.5

  console.log('trimBaseBoardCrown', trimBaseBoardCrown)
  console.log('trimExtraCoat', trimExtraCoat)
  console.log('doorsAndFrames', doorsAndFrames)
  console.log('windows', windows)
  console.log('closets', closets)
  return parseFloat(
    (trimBaseBoardCrown + trimExtraCoat + doorsAndFrames + windows + closets).toFixed(2)
  )
}
