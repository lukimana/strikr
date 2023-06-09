import characters from '@/core/relations/objects/characters'

export function parseStrikrMarkup(data: string) {
  // Regular expression pattern
  const pattern = /{([^:{}]+):([^{}]+)}/g

  // Extracting class and content
  const result = data.replace(pattern, '<span class="strikr-markup-$1">$2</span>')

  return result
}

export function getCharacterById(id: string) {
  return characters.find( character => {
    if (character.id === id) {
      return character
    }
  })
}

