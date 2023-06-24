const lookup = {
  'TitleData_KOChamp': {
    en: 'K.O Champion'
  },
  'ScalingForLateGameTitle': {
    en: 'Scaling For Late Game',
  },
  'ProductionTitle': {
    en: 'The Eternal Flame',
  },
  'FounderTitle': {
    en: 'Founding Member',
  },
  'RookieRoadTitle': {
    en: 'Competitor',
  },
  'BPS1Title1': {
    en: 'Beta Season Striker',
  },
  'BPS1Title2': {
    en: 'The Early Investor',
  },
  'BPS2Title1': {
    en: 'Season Two Striker',
  },
  'BPS2Title2': {
    en: 'The Hotshot',
  },
  'RankedChampionTitle': {
    en: 'Season 1 Omega Striker',
  },
  'TournamentWinnerTitle': {
    en: 'S1 Tournament Winner',
  },
  'TournamentFlawlessTitle': {
    en: 'S1 Flawless Tournament Winner',
  },
  'TournamentTitle1': {
    en: 'Season 1 Tournament Warrior',
  },
  'TournamentTitle2': {
    en: 'Season 1 Tournament Legend',
  },
  'TournamentTitle3': {
    en: 'Season 1 Tournament Champion',
  },
  'TournamentShadowTitle1': {
    en: 'Shadow Helper',
  },
  'TournamentShadowTitle2': {
    en: 'Shadow Warrior',
  },
  'TournamentShadowTitle3': {
    en: 'Shadow Hero',
  },
  'TournamentShadowTitle4': {
    en: 'The Selfless',
  },
  'TournamentShadowTitle5': {
    en: 'World\'s Best Loser',
  },
  'SniperBrawlerEventTitle1': {
    en: 'Expert Brawler',
  },
  'SniperBrawlerEventTitle2': {
    en: 'Expert Sniper',
  },
  'JulietteMasteryTitle': {
    en: 'Rising Star',
  },
  'KaiMasteryTitle': {
    en: 'Prodigy',
  },
  'DubuMasteryTitle': {
    en: 'The Most Huggable',
  },
  'EstelleMasteryTitle': {
    en: 'Fashion Icon',
  },
  'DrekarMasteryTitle': {
    en: 'Space Invader',
  },
  'AtlasMasteryTitle': {
    en: 'Time Traveler',
  },
  'JunoMasteryTitle': {
    en: 'Blobbo Buddy',
  },
  'RuneMasteryTitle': {
    en: 'Sinister Shadow',
  },
  'EraMasteryTitle': {
    en: 'Bewitched',
  },
  'AiMiMasteryTitle': {
    en: 'Glitchy',
  },
  'AsherMasteryTitle': {
    en: 'Unbreakable',
  },
  'ZentaroMasteryTitle': {
    en: 'Blade Master',
  },
  'RasmusMasteryTitle': {
    en: 'Off the Hook',
  },
  'LunaMasteryTitle': {
    en: 'Chaotic',
  },
  'XMasteryTitle': {
    en: 'Excessive',
  },
  'ZipMasteryTitle': {
    en: 'Virtuoso',
  },
  'GravityMageMasteryTitle': {
    en: 'Illusionist',
  },
  'S1ChampionTitle': {
    en: 'Beta Season Omega Striker',
  },
  'S1TournamentFlawlessTitle': {
    en: 'S1 Flawless Tournament Winner',
  },
  'S1TournamentChampionTitle': {
    en: 'S1 Tournament Champion',
  },
  'S1TournamentLegendTitle': {
    en: 'S1 Tournament Legend',
  },
  'S1TournamentWarriorTitle': {
    en: 'S1 Tournament Warrior',
  },
  'HalloweenTitle1': {
    en: 'Pumpkin',
  },
  'HalloweenTitle2': {
    en: 'Spooky',
  },
  'LaunchBattlePassTitle1': {
    en: 'Rise & Grind',
  },
  'LaunchBattlePassTitle2': {
    en: 'Built Different',
  },
  'LaunchBattlePassTitle3': {
    en: 'Sigma Striker',
  },
  'LaunchBattlePassTitle4': {
    en: 'Cracked',
  },
  'LaunchBattlePassTitle5': {
    en: 'Cringe',
  },
  'LaunchBattlePassTitle6': {
    en: 'K.O. Champ',
  },
  'LaunchBattlePassTitle7': {
    en: 'Trailblazer',
  },
  'HyperXTitle': {
    en: 'HyperX Hero',
  },
  'AbandonedTitle': {
    en: 'Abandoned',
  },
  'IdolTitle': {
    en: 'Idol',
  },
  'PerformerTitle': {
    en: 'Performer',
  },
  'TeaTimeJellyTitle': {
    en: 'Jelly',
  },
  'TeaTimeCaffeinatedTitle': {
    en: 'Caffeinated',
  },
  'TeaTimeBobaTitle': {
    en: 'Boba',
  },
  'TeamRockOniTItle': {
    en: 'Vice Versa',
  },
  'TeamEDMOniTitle': {
    en: 'Thousand Absolutes',
  },
}

export function getTitleLocale(id: string, locale = 'en') {
  return lookup[id as keyof typeof lookup]?.[locale as 'en'] || id
}