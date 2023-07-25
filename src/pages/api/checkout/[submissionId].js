import Network from '../../../../utils/Network'
import { normalizeData } from '../../../../utils/normalizeData'
import { materialCosts } from '../../../../utils/materialCosts'
import { coveringFurniture } from '../../../../utils/hours/coveringFurniture'
import { primingHoursTotal } from '../../../../utils/hours/priming'
import { paintingWallsHours } from '../../../../utils/hours/paintingWalls'
import { repairingWalls } from '../../../../utils/hours/repairingWalls'
import { paintingTrimHours } from '../../../../utils/hours/paintingTrim'
import { repairingCeiling } from '../../../../utils/hours/repairingCeiling'
import { repairingTrim } from '../../../../utils/hours/repairingTrim'
import { getDescriptions, getJobDescription } from '../../../../utils/getDescriptions'
import { getConstants } from '../../../../utils/constants/descriptions'
import { getPropertyDescriptions } from '../../../../utils/getPropertyDescription'
const apiKey = process.env.JOTFORM_API_KEY

export default async function getCheckout(req, res) {
  const { submissionId } = req.query
  const url = `${process.env.JOTFORM_BASE_URL}/submission/${submissionId}?apiKey=${apiKey}`
  const response = await Network.get(url)
  const answers = response.content.answers
  let {
    newObject,
    totalRoomSupplies,
    totalRooms,
    totalCrownMolding,
    objectTotal,
    baseboardKeys,
    totalSuppliesObject,
  } = await normalizeData(answers)

  // const propertyDescription = getDescriptions(newObject)
  const { propertyDescription, bottomDescription } = await getConstants(
    newObject,
    totalRoomSupplies,
    totalCrownMolding,
    objectTotal
  )
  const propertyDescriptions = await getPropertyDescriptions(newObject)
  const jobDescription = await getJobDescription(newObject)
  const coveringFurnitureCost = coveringFurniture(totalRoomSupplies, newObject)
  // console.log('coveringFurnitureCost', coveringFurnitureCost)
  const primingCost = primingHoursTotal(
    Number(newObject.numberRoomsDarkToLight),
    Number(newObject.numberRoomsTrimDarkToLight),
    Number(newObject.dryWallRooms)
  )
  const paintingWallsCost = paintingWallsHours(
    totalSuppliesObject.totalSuppliesWall,
    newObject,
    objectTotal
  )
  const paintingTrimCost = paintingTrimHours(
    totalRoomSupplies,
    newObject,
    totalCrownMolding,
    totalSuppliesObject
  )
  const repairingWallsCost = repairingWalls(totalSuppliesObject.totalSuppliesWall, newObject)
  console.log('senf wall', objectTotal.totalWalls)
  const repairingCeilingCost = repairingCeiling(
    totalRoomSupplies,
    newObject,
    totalCrownMolding,
    objectTotal,
    totalSuppliesObject
  )
  const repairingTrimCost = repairingTrim(
    totalRoomSupplies,
    newObject,
    totalSuppliesObject.totalSuppliesCrownMolding,
    totalSuppliesObject
  )
  const paintingCeilingCost = isNaN(Number(totalSuppliesObject.totalSuppliesCeilings))
    ? 0
    : Number(totalSuppliesObject.totalSuppliesCeilings)
  console.log('coveringFurnitureCost', coveringFurnitureCost)
  console.log('primingCost', primingCost)
  console.log('paintingWallsCost', paintingWallsCost)
  console.log('paintingTrimCost', paintingTrimCost)
  console.log('repairingWallsCost', repairingWallsCost)
  console.log('repairingCeilingCost', repairingCeilingCost)
  console.log('repairingTrimCost', repairingTrimCost)
  console.log('repairingWallsCost', repairingWallsCost)
  console.log('paintingCeilingCost', paintingCeilingCost)
  const totalSumMaterials = materialCosts(newObject, totalRoomSupplies, objectTotal, baseboardKeys)
  const totalHours =
    coveringFurnitureCost +
    primingCost +
    paintingWallsCost +
    paintingTrimCost +
    repairingWallsCost +
    repairingCeilingCost +
    repairingTrimCost +
    paintingCeilingCost
  // console.log('totalHours', totalHours)
  const daysOfWork = Math.round(totalHours / 8)
  const labourCost = totalHours < 8 ? 450 : totalHours * 28
  console.log('totalHours', totalHours)
  console.log('labourCost', labourCost)
  const totalOfCosts = totalSumMaterials + labourCost
  console.log('totalSumMaterials', totalSumMaterials)
  console.log('totalOfCosts', totalOfCosts)
  const contigency = totalOfCosts * 0.05
  console.log('contigency', contigency)
  const finalPrice = ((totalOfCosts + contigency) / 0.57).toFixed(2).toLocaleString()
  const ccExtraCharge = finalPrice * 0.03
  const profit = finalPrice - totalOfCosts - contigency - ccExtraCharge
  const profitPercentage = (profit / finalPrice) * 100
  const finalResult = {
    userInfo: {
      name: newObject.fullName,
      email: newObject.email,
      phoneNumber: newObject.phoneNumber,
      address: newObject.address,
      quoteCreatedAt: new Date().toLocaleString('en-us', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    },
    propertyDescription: propertyDescriptions,
    jobDescription: jobDescription,
    bottomDescription: bottomDescription,
  }
  // console.log('finalPrice', finalPrice)
  res.status(200).json({
    totalCost: finalPrice,
    contigency,
    finalResult,
    // // totalCost,
    // contigency,
    // totalRoomsForSupplies,
    // materialCost,
    // totalRooms,
    // coveringFurnitureHours,
    // primer,
    // totalHours,
    // painter,
    // labourDays,
    // labourCost,
    // // materialCost,
    // trimPreparing, // 8
    // sheetRockRepair, // 30
    // wallPreparing,
    // trimPaint,
    // primer,
    // wallsPaint,
    // ceilingPaint,
  })
}
