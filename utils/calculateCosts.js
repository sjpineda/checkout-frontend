export function calculateCosts(totalHours, totalSumMaterials) {
  let labourCost = totalHours < 8 ? 450 : totalHours * 28
  let totalOfCosts = totalSumMaterials + labourCost

  return { labourCost, totalOfCosts }
}

export function calculateTotalHours(
  coveringFurnitureCost,
  primingCost,
  paintingWallsCost,
  paintingTrimCost,
  repairingWallsCost,
  repairingCeilingCost,
  repairingTrimCost,
  paintingCeilingCost
) {
  return coveringFurnitureCost + primingCost + paintingWallsCost + paintingTrimCost + repairingWallsCost + repairingCeilingCost + repairingTrimCost + paintingCeilingCost
}
