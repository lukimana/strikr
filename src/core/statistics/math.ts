import dayjs from 'dayjs'

export const calculateMedian = (values: number[]): number | null => {
  if (values.length === 0) return null

  const sortedValues = values.sort((a, b) => a - b)
  const middleIndex = Math.floor(sortedValues.length / 2)

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2
  } else {
    return sortedValues[middleIndex]
  }
}

export function getLatestCharacterMasterySamples(samples: STRIKR.API.PlayerCharacterRatingObjectType[], gamemode?: string): Map<string, STRIKR.API.PlayerCharacterRatingObjectType> {
  const calcuatedCharacters = new Map<string, STRIKR.API.PlayerCharacterRatingObjectType>()

  const sortedSamples = samples
  .sort( 
    (a, b) => dayjs(b.createdAt).isBefore(dayjs(a.createdAt)) ? -1 : 0
  )
  .filter(
    (sample) => gamemode ? sample.gamemode === gamemode : true
  )

  for (const sample of sortedSamples) {
    if (calcuatedCharacters.has(`${sample.character}@${sample.role}`)) {
      continue
    }

    calcuatedCharacters.set(`${sample.character}@${sample.role}`, sample)
  }
 
  return calcuatedCharacters
}


export const createSequentialArray = (initial: number, end: number): number[] =>
  Array.from({ length: end - initial + 1 }, (_, index) => initial + index)