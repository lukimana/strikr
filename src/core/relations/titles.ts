const lookup = {
  'TitleData_KOChamp': {
    en: 'K.O Champion'
  }
}

export function getTitleLocale(id: string, locale = 'en') {
  return lookup[id as keyof typeof lookup]?.[locale as 'en'] || id
}