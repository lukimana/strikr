const awakenings = [
  {
    'id': 'T_AdrenalineRush',
    'image': 'https://strikr.pro/i/awakening/T_AdrenalineRush.png',
    'name': {
      en: 'Adrenaline Rush'
    },
    'description': {
      en: 'Ability {buff:cooldowns} reduced by {time:1s}. Earning a Takedown increases {buff:Speed} by {value:100%} for {time:8s} and reduces current {buff:cooldowns} by {time:5s}.'
    }
  },
  {
    'id': 'T_Aerials',
    'image': 'https://strikr.pro/i/awakening/T_Aerials.png',
    'name': {
      en: 'Aerials'
    },
    'description': {
      en: '{skill_type:DASH} {buff:range}, {skill_type:BLINK} {buff:range}, and {skill_type:HASTE} effects {value:increased 70%}. {skill_type:PROJECTILES} {value:gain 30%} {buff:travel} or {buff:cast range}.'
    }
  },
  {
    'id': 'T_BigFish',
    'image': 'https://strikr.pro/i/awakening/T_BigFish.png',
    'name': {
      en: 'Big Fish'
    },
    'description': {
      en: 'Gain {value:30% Size} and {value:200} {heal:max Stagger}.'
    }
  },
  {
    'id': 'T_BuiltDifferent',
    'image': 'https://strikr.pro/i/awakening/T_BuiltDifferent.png',
    'name': {
      en: 'BuiltDifferent'
    },
    'description': {
      en: '{value:Gain 30%} {buff:Size}. Your {skill_type:IMPACT} abilities {damage:hit 5% harder} (1% on Core)}.'
    }
  },
  {
    'id': 'T_BulkUp',
    'image': 'https://strikr.pro/i/awakening/T_BulkUp.png',
    'name': {
      en: 'Bulk Up'
    },
    'description': {
      en: '{value:Gain 350} {heal:max Stagger} and {value:1.75} {buf:Power} {value:per 100 max Stagger}.'
    }
  },
  {
    'id': 'T_CastToLast',
    'image': 'https://strikr.pro/i/awakening/T_CastToLast.png',
    'name': {
      en: 'Cast To Last'
    },
    'description': {
      en: 'Ability {buff:BUFFS} and {debuff:DEBUFFS} you cast {value:last 45% longer}. {skill_type:CREATIONS} {value:last 40% longer}.'
    }
  },
  {
    'id': 'T_Chronoboost',
    'image': 'https://strikr.pro/i/awakening/T_Chronoboost.png',
    'name': {
      en: 'Chronoboost'
    },
    'description': {
      en: '{skill_type:DASH} {buff:range}, {skill_type:BLINK} {buff:range}, and {skill_type:HASTE} effects {value:increased 75%}. Ability {buff:BUFFS} and {debuff:DEBUFFS} {value:last 20% longer}.'
    }
  },
  {
    'id': 'T_DeadEye',
    'image': 'https://strikr.pro/i/awakening/T_DeadEye.png',
    'name': {
      en: 'Deadeye'
    },
    'description': {
      en: '{damage:Hit} {value:32.5% harder (6.5% to Core)} against targets at {value:550+ range}.'
    }
  },
  {
    'id': 'T_ExtraSpecial',
    'image': 'https://strikr.pro/i/awakening/T_ExtraSpecial.png',
    'name': {
      en: 'Extra Special'
    },
    'description': {
      en: '{skill:SPECIAL} {buff:cooldown} {value:reduced by 30%}. Each face off its {buff:cooldown} is reset.'
    }
  },
  {
    'id': 'T_GlassCannon',
    'image': 'https://strikr.pro/i/awakening/T_GlassCannon.png',
    'name': {
      en: 'Glass Cannon'
    },
    'description': {
      en: '{value:Gain 5} {damage:Power} and {value:3%} {buff:Speed} {time:every 2.5s} ({value:up to 30} {buff:Power} and {value:18%} {buff:Speed}).\nGetting hit resets the timer.'
    }
  },
  {
    'id': 'T_HotShot',
    'image': 'https://strikr.pro/i/awakening/T_HotShot.png',
    'name': {
      en: 'Hotshot'
    },
    'description': {
      en: 'Character abilities {damage:hit} the {core:Core} {value:12% harder} and refund {value:30% of the ability\'s} {buff:cooldown} (once per cast, {time:max 3s}).'
    }
  },
  {
    'id': 'T_SpecializedTraining',
    'image': 'https://strikr.pro/i/awakening/T_ImpactSpecialist.png',
    'name': {
      en: 'Specialized Training'
    },
    'description': {
      en: '{skill:SPECIAL} {damage:hits} {value:40% harder} ({value:8% to Core}) and {heal:heals} {value:40% more}.'
    }
  },
  {
    'id': 'T_MissilePropulsion',
    'image': 'https://strikr.pro/i/awakening/T_MissilePropulsion.png',
    'name': {
      en: 'Missile Propulsion'
    },
    'description': {
      en: '{skill_type:PROJECTILES} gain {value:70%} {buff:travel} or {buff:cast range} and {damage:hit} {value:20% harder (40% to Core)}.'
    }
  },
  {
    'id': 'T_MomentumBoots',
    'image': 'https://strikr.pro/i/awakening/T_MomentumBoots.png',
    'name': {
      en: 'Momentum Boots'
    },
    'description': {
      en: ''
    }
  },
  {
    'id': 'T_Monumentalist',
    'image': 'https://strikr.pro/i/awakening/T_Monumentalist.png',
    'name': {
      en: 'Monumentalist'
    },
    'description': {
      en: '{skill_type:CREATIONS} gain {value:100%} {buff:size} and {damage:hit} {value:20% harder} ({value:4% to Core}).'
    }
  },
  {
    'id': 'T_OneTwoPunch',
    'image': 'https://strikr.pro/i/awakening/T_OneTwoPunch.png',
    'name': {
      en: 'One-Two Punch'
    },
    'description': {
      en: '{damage:Hit} {value:28% harder} ({value:14% to Core}) against targets you\'ve hit within {time:2.5s}.'
    }
  },
  {
    'id': 'T_OrbDancer',
    'image': 'https://strikr.pro/i/awakening/T_OrbDancer.png',
    'name': {
      en: 'Orb Dancer'
    },
    'description': {
      en: 'Active {buff:Speed}: {value:increase by 40%} {time:for 6s} ({value:80% when fully stacked})'
    }
  },
  {
    'id': 'T_OrbPonderer',
    'image': 'https://strikr.pro/i/awakening/T_OrbPonderer.png',
    'name': {
      en: 'Orb Ponderer'
    },
    'description': {
      en: 'Active {buff:Cooldown Reduction}: {value:25%"} ({value:45% when fully stacked})'
    }
  },
  {
    'id': 'T_OrbReplicator',
    'image': 'https://strikr.pro/i/awakening/T_OrbSharer.png',
    'name': {
      en: 'Orb Replicator'
    },
    'description': {
      en: '{value:50% of benefits from Power Orbs} you collect is also {buff:granted to allies}.'
    }
  },
  {
    'id': 'T_PeakPerformance',
    'image': 'https://strikr.pro/i/awakening/T_PeakPerformance.png',
    'name': {
      en: 'Peak Performance'
    },
    'description': {
      en: 'Gain {value:350} {heal:max Stagger} and {value:0.6%} {buff:Speed} {value:per 100} {heal:max Stagger}.'
    }
  },
  {
    'id': 'T_PerfectForm',
    'image': 'https://strikr.pro/i/awakening/T_PerfectForm.png',
    'name': {
      en: 'Perfect Form'
    },
    'description': {
      en: '{damage:Hits} {buff:reduce other ability cooldowns} by {value:20%}, up to {time:2s} per {damage:hit} ({value:6%/.6s for LIGHT hits}).'
    }
  },
  {
    'id': 'T_PrimeTime',
    'image': 'https://strikr.pro/i/awakening/T_PrimeTime.png',
    'name': {
      en: 'Primetime'
    },
    'description': {
      en: '{skill:PRIMARY} gains {value:+1 charge} but {damage:hits} {value:5% less hard (1% to Core)}.'
    }
  },
  {
    'id': 'T_PrizeFighter',
    'image': 'https://strikr.pro/i/awakening/T_PrizeFighter.png',
    'name': {
      en: 'Prize Fighter'
    },
    'description': {
      en: 'Begin each set with {value:1 Prize Fighter stack}, {value:granting 20 Power}.\nTakedowns grant {value:1 Prize Fighter stack (max 3 stacks)}, but {debuff:getting K.O.\'d removes 1 stack}.\nStacks resets between sets.'
    }
  },
  {
    'id': 'T_QuickStrike',
    'image': 'https://strikr.pro/i/awakening/T_QuickStrike.png',
    'name': {
      en: 'Quick Strike'
    },
    'description': {
      en: '{skill:Strike} {buff:cooldown} {value:reduced by 20%}.\n{skill:Strike} {damage:hits} {value:grant 1 additional energy}.'
    }
  },
  {
    'id': 'T_RapidFire',
    'image': 'https://strikr.pro/i/awakening/T_RapidFire.png',
    'name': {
      en: 'Rapid Fire'
    },
    'description': {
      en: '{skill:PRIMARY} {buff:cooldown reduced} {value:by 33%}.'
    }
  },
  {
    'id': 'T_HeavyImpact',
    'image': 'https://strikr.pro/i/awakening/T_ShockAndAwe.png',
    'name': {
      en: 'Heavy Impact'
    },
    'description': {
      en: '{skill_type:IMPACT} abilities {damage:hit} {value:20% harder} (4% on {core:Core})}. Whenever you {damage:hit} {value:2} or more targets with a single ability}, its {buff:cooldown} is {value:reduced by 35% (up to 7s)}.'
    }
  },
  {
    'id': 'T_SparkofAgility',
    'image': 'https://strikr.pro/i/awakening/T_SparkofAgility.png',
    'name': {
      en: 'Spark of Agility'
    },
    'description': {
      en: 'SPARK - {value:Gain 1% Speed}, {value:plus 6% per SPARK you have}.'
    }
  },
  {
    'id': 'T_SparkofFocus',
    'image': 'https://strikr.pro/i/awakening/T_SparkofFocus.png',
    'name': {
      en: 'Spark of Focus'
    },
    'description': {
      en: 'SPARK - {value:Gain 4} {buff:Cooldown Rate}, {value:plus 12 per SPARK you have}.'
    }
  },
  {
    'id': 'T_SparkofResilience',
    'image': 'https://strikr.pro/i/awakening/T_SparkofResilience.png',
    'name': {
      en: 'Spark of Resilience'
    },
    'description': {
      en: 'SPARK - {value:Gain 100} {heal:max Stagger}, {value:plus 350 per SPARK you have}.'
    }
  },
  {
    'id': 'T_SparkofStrength',
    'image': 'https://strikr.pro/i/awakening/T_SparkofStrength.png',
    'name': {
      en: 'Spark of Strength'
    },
    'description': {
      en: 'SPARK - {buff:Gain 4 Power}, {value:plus 22 per SPARK you have}.'
    }
  },
  {
    'id': 'T_StacksOnStacks',
    'image': 'https://strikr.pro/i/awakening/T_StacksOnStacks.png',
    'name': {
      en: 'Stacks on Stacks'
    },
    'description': {
      en: '{damage:Hits} grant {value:6 stacks of} {buff:Speed} ({value:0.10% per stack}, {value:2 stacks for LIGHT hits}). At {value:100 stacks}, {buff:double the Speed per stack}.\nStacks reset when K.O.\'d and between sets.'
    }
  },
  {
    'id': 'T_StaggerSwagger',
    'image': 'https://strikr.pro/i/awakening/T_StaggerSwagger.png',
    'name': {
      en: 'Stagger Swagger'
    },
    'description': {
      en: '{buff:Gain 12% Speed}. While {value:below 50% Stagger}, this effect {value:increases to 20%} and you {heal:heal 150 Stagger per second}, including while in the Staggered state.'
    }
  },
  {
    'id': 'T_Stinger',
    'image': 'https://strikr.pro/i/awakening/T_Stinger.png',
    'name': {
      en: 'Stinger'
    },
    'description': {
      en: '{damage:Hits} deal {buff:bonus damage} {value:equal to 12%} of enemies\nmax Stagger over {time:2.5s}.'
    }
  },
  {
    'id': 'T_SuperSurge',
    'image': 'https://strikr.pro/i/awakening/T_SuperSurge.png',
    'name': {
      en: 'Super Surge'
    },
    'description': {
      en: '{skill_type:DASH} {buff:range}, {skill_type:BLINK} {buff:range}, and {buff:HASTE} {value:effects increased 75%}. These abilities {damage:hit} {value:30%} harder ({value:6%} to {core:Core}).'
    }
  },
  {
    'id': 'T_TempoSwing',
    'image': 'https://strikr.pro/i/awakening/T_TempoSwings.png',
    'name': {
      en: 'Tempo Swing'
    },
    'description': {
      en: 'Hitting anything {heal:heals} you {value:for 6%} of your {heal:max Stagger} ({value:2%} for LIGHT hits) and deals that amount as {damage:damage} to the target hit.'
    }
  },
  {
    'id': 'T_TimelessCreator',
    'image': 'https://strikr.pro/i/awakening/T_TimelessCreator.png',
    'name': {
      en: 'Timeless Creator'
    },
    'description': {
      en: '{skill_type:CREATIONS} gain {value:65% duration} and {value: 40% size}.'
    }
  },
  {
    'id': 'T_TwinDrive',
    'image': 'https://strikr.pro/i/awakening/T_TwinDrive.png',
    'name': {
      en: 'Twin Drive'
    },
    'description': {
      en: '{skill:SECONDARY} gains {value:+1 charge} and has {value:5%} {buff:reduced cooldown}.'
    }
  }
  ,
  {
    'id': 'T_Unstoppable',
    'image': 'https://strikr.pro/i/awakening/T_Unstoppable.png',
    'name': {
      en: 'Unstoppable'
    },
    'description': {
      en: 'Gain a shield that protects you from {value:100%} of the {buff:damage} and {value:100%} {buff:knockback} from the first hit you take. This shield recharges at the start of each round and after {time:7.5s} of not getting hit',
    }
  }
  ,{
    'id': 'T_SpecializedTraining',
    'image': 'https://strikr.pro/i/awakening/T_SpecializedTraining.png',
    'name': {
      en: 'Specialized Training'
    },
    'description': {
      en: '{skill:SPECIAL} {damage:hits} {value:40% harder} ({value:8% to} {core:Core}) and {heal:heals} {value:40% more}.'
    }
  },
  {
    'id': 'T_Egoist',
    'image': 'https://strikr.pro/i/awakening/T_Egoist.png',
    'name': {
      en: 'Egoist'
    },
    'description': {
      en: '{skill:Evades} refund {energy:12 Energy} ({value:25 from Energy Bursts}). Reaching max Energy grants {buff:80% Speed} for {time:8s}, reducing to {buff:12% speed} when you remain at max Energy. '
    }
  },
  {
    'id': 'T_FireUp',
    'image': 'https://strikr.pro/i/awakening/T_FireUp.png',
    'name': {
      en: 'Fire Up'
    },
    'description': {
      en: 'Gain {energy:10 Energy} on round start. Casting {skill:Energy Burst} restores {energy:25% of max Energy} to other allies and {buff:Speeds up your whole team} by {value:40%} for {time:5s}. '
    }
  },
  {
    'id': 'T_Catalyst',
    'image': 'https://strikr.pro/i/awakening/T_Catalyst.png',
    'name': {
      en: 'Catalyst'
    },
    'description': {
      en: 'Gain {energy:20% more Energy} from {damage:dealing hits}. Being hit generates {energy:4.5 Energy} ({value:1.5 for LIGHT hits}).'
    }
  },
  {
    'id': 'T_Reverberation',
    'image': 'https://strikr.pro/i/awakening/T_Reverberation.png',
    'name': {
      en: 'Reverberation'
    },
    'description': {
      en: '{value:Gain 350} {heal:max Stagger} and [value:1.25} {buff:Cooldown Rate} per {value:100 max Stagger}.'
    }
  },
  {
    'id': 'T_Demolitionist',
    'image': 'https://strikr.pro/i/awakening/T_Demolitionist.png',
    'name': {
      en: 'Demolitionist'
    },
    'description': {
      en: '{value:Gain 25%} {buff:Size}. Whenever you destroy or assist in destroying an enemy barrier, your {buff:cooldowns are reduced} {time:by 3s}.'
    }
  },
  {
    'id': 'T_AmongTitans',
    'image': 'https://strikr.pro/i/awakening/T_AmongTitans.png',
    'name': {
      en: 'Among Titans'
    },
    'description': {
      en: '{value:Lose 30%} {debuff:Size} and {value:gain 15%} {buff:Speed}. Your teammates {value:gain 15%} {buff:Size}. '
    }
  },
  {
    'id': 'T_TeamPlayer',
    'image': 'https://strikr.pro/i/awakening/T_TeamPlayer.png',
    'name': {
      en: 'Team Player'
    },
    'description': {
      en: '{skill:STRIKE} hits the core {value:20% harder} when aiming towards an ally. If that Ally strikes the core {time:within 1.5 second(s)} they will {damage:hit} the core {value:20% harder}, if they strike towards an Ally they can transfer this buff.'
    }
  },
  {
    'id': 'T_FightorFlight',
    'image': 'https://strikr.pro/i/awakening/T_FightorFlight.png',
    'name': {
      en: 'Fight or Flight'
    },
    'description': {
      en: 'Gain {buff:17.5% Speed} {time:for 1.75s} whenever you {damage:hit something} or {damage:get hit}. Refresh your {skill:SECONDARY} whenever you {damage:stagger an enemy} or become {effect:staggered}.'
    }
  },
  {
    'id': 'T_KnifesEdge',
    'image': 'https://strikr.pro/i/awakening/T_KnifesEdge.png',
    'name': {
      en: 'Knife\'s Edge'
    },
    'description': {
      en: '{buff:Gain 30 Power} and {buff:30% Speed} whenever you\'re {value:within 400 range} of the Arena\'s edge.'
    }
  },
  {
    'id': 'T_SparkofLeadership',
    'image': 'https://strikr.pro/i/awakening/T_SparkofLeadership.png',
    'name': {
      en: 'Spark of Leadership'
    },
    'description': {
      en: 'SPARK - Your Allies gain {value:40% of your SPARK effects}. Gain {buff:5 Cooldown Rate}, {heal:150 max Stagger}, {buff:8 Power}, and {buff:2% Speed}.'
    }
  },
  {
    'id': 'T_RecoveryDrone',
    'image': 'https://strikr.pro/i/awakening/T_RecoveryDrone.png',
    'name': {
      en: 'Recovery Drone'
    },
    'description': {
      en: '{value:Gain 30%} {buff:Size}. The first time each set you would be KO\'d, prevent it. '
    }
  },
  {
    'id': 'T_SiegeMachine',
    'image': 'https://strikr.pro/i/awakening/T_SiegeMachine.png',
    'name': {
      en: 'Siege Machine'
    },
    'description': {
      en: '{skill_type:PROJECTILES} {value:gain 30%} {buff:travel} or {buff:cast range}. {skill_type:CREATIONS} {buff:gain 30% duration} and {damage:hit} {value:15% harder (3% to Core)}. '
    }
  },
  {
    'id': 'T_ExplosiveEntrance',
    'image': 'https://strikr.pro/i/awakening/T_ExplosiveEntrance.png',
    'name': {
      en: 'Explosive Entrance'
    },
    'description': {
      en: '{skill_type:DASH} {buff:range}, {skill_type:BLINK} {buff:range}, and {skill_type:HASTE} effects {value:increased 70%}. Your {skill_type:IMPACT} abilities {damage:hit} {value:12.5% harder (2.5% on Core)}. '
    }
  },
]

export default awakenings