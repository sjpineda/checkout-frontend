export const repairingCeiling = (
  totalRoomSupplies,
  object,
  totalCrownMolding,
  objectTotal,
  totalSuppliesObject
) => {
  let basicRepair = 0
  let mediumRepair = 0
  let advanceRepair = 0
  if (object.conditionOfTheCeilings !== 0) {
    if (object.conditionOfTheCeilings.toString().includes('Good')) {
      basicRepair = isNaN(Number(totalSuppliesObject.totalSuppliesCeilings))
        ? 0
        : Number(totalSuppliesObject.totalSuppliesCeilings) * 0
    }
    if (object.conditionOfTheCeilings.toString().includes('Minimum')) {
      mediumRepair = isNaN(totalSuppliesObject.totalSuppliesCeilings)
        ? 0
        : Number(totalSuppliesObject.totalSuppliesCeilings) * 0.7
    }
    if (object.conditionOfTheCeilings.toString().includes('Damaged')) {
      advanceRepair = isNaN(totalSuppliesObject.totalSuppliesCeilings)
        ? 0
        : Number(totalSuppliesObject.totalSuppliesCeilings) * 1.4
    }
  }

  return parseFloat((basicRepair + mediumRepair + advanceRepair).toFixed(2))
}
