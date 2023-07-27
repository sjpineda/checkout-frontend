export const repairingTrim = (
  totalRoomSupplies,
  object,
  totalCrownMolding,
  totalSuppliesObject
) => {
  if (object.conditionOfTheTrim !== 0) {
    if (object.conditionOfTheTrim.toString().includes('Good')) {
      return isNaN(totalSuppliesObject.totalSuppliesBaseboards)
        ? 0
        : Number(totalSuppliesObject.totalSuppliesBaseboards * 0.1) +
            (isNaN(totalSuppliesObject.totalSuppliesCrownMolding)
              ? 0
              : Number(totalSuppliesObject.totalSuppliesCrownMolding * 0.1)) +
            object.numberOfDoorWithFrames * 0.1 +
            object.numberOfWindowFrames * 0.1 +
            object.numberOfDoorFrames * 0.1 +
            object.numberOfClosets * 0.1
    }
    if (object.conditionOfTheTrim.toString().includes('Minimum')) {
      return isNaN(totalSuppliesObject.totalSuppliesBaseboards)
        ? 0
        : Number(totalSuppliesObject.totalSuppliesBaseboards) * 0.35 +
          (isNaN(totalSuppliesObject.totalSuppliesCrownMolding)
            ? 0
            : Number(totalSuppliesObject.totalSuppliesCrownMolding) * 0.35) +
          object.numberOfDoorWithFrames * 0.2 +
          object.numberOfWindowFrames * 0.2 +
          object.numberOfDoorFrames * 0.2 +
          object.numberOfClosets * 0.2
    }
    if (object.conditionOfTheTrim.toString().includes('Damaged')) {
      return isNaN(totalSuppliesObject.totalSuppliesBaseboards)
        ? 0
        : Number(totalSuppliesObject.totalSuppliesBaseboards) * 0.5 +
          (isNaN(totalSuppliesObject.totalSuppliesCrownMolding)
            ? 0
            : Number(totalSuppliesObject.totalSuppliesCrownMolding) * 0.5) +
          object.numberOfDoorWithFrames * 0.3 +
          object.numberOfWindowFrames * 0.3 +
          object.numberOfDoorFrames * 0.3 +
          object.numberOfClosets * 0.3
    }
  }
}
