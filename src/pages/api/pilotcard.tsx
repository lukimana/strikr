import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
 
export const config = {
  runtime: 'experimental-edge',
}
 
// eslint-disable-next-line import/no-anonymous-default-export
export default function (req: NextRequest) {

  const { searchParams } = new URL(req.url)
  const isVerified = searchParams.get('isVerified')
  const isStaff = searchParams.get('isStaff')
  const username = searchParams.get('username')
  const title = searchParams.get('title')
  const rank = searchParams.get('rank')
  const lp = searchParams.get('lp')
  const win = searchParams.get('win')
  const loss = searchParams.get('loss')
  const region = searchParams.get('region')
  const emote = searchParams.get('emote')
  const elo = searchParams.get('elo')
  const eloImage = searchParams.get('eloImage')
  const eloColor = searchParams.get('eloColor')
  const role = searchParams.get('role')
  const character = searchParams.get('character')
  const characterImage = searchParams.get('characterImage')
  console.log('Emojiname', `url('http://localhost:3000/${emote?.endsWith('.webp') ? emote.replace('-512x512.webp', '_thumbnail-512x512.png') : emote}')`)
  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections

      <div 
        tw="flex flex-col w-full h-full items-center justify-center bg-[#101211] text-white relative"
        style={{
          backgroundImage: `url('http://localhost:3000${characterImage}.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '10% 0',
          backgroundSize: '100% 200%'
        }}
      >
        <div 
          tw="absolute inset-0 w-full h-full flex"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #101211AA 10%, #101211 100%)'
          }}
        />
        <div
          tw="w-full h-full flex flex-col px-16 justify-center"
        >
          <div
            tw="flex items-center "
          >
            <div
              tw="w-44 h-44 rounded-lg bg-[#1E1F1F] flex"
            >
              <div
                tw="w-full h-full flex"
                style={{
                  backgroundImage: `url('http://localhost:3000/${emote?.endsWith('.webp') ? emote.replace('-512x512.webp', '_thumbnail-512x512.png') : emote}')`,
                  backgroundSize: '90% 90%',
                  backgroundPosition: '5% 5%',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
            <div
              tw="flex flex-col h-44 ml-4"
            >
              <div tw="flex items-center">
                <span tw=" font-semibold text-5xl">{username || 'Unknown'}</span>
                { Boolean(isStaff) && <img src='https://i.imgur.com/dk8LlV9.png' tw="w-8 h-8 ml-4" alt='ody' /> }
                { Boolean(isVerified) &&  <img src='https://i.imgur.com/0554Cd5.png' tw="w-8 h-8 ml-4" alt='creator' /> }
              </div>
              <span tw=" font-regular text-white/60 text-lg">{title || 'No title'}</span>
              <div tw="flex w-full font-semibold mt-2">
                <span tw="px-2 py-1.4 bg-[#1E1F1F] rounded-lg">{role || '✨ Flex'}</span>
                <span tw="px-2 py-1.4 bg-[#1E1F1F] rounded-lg ml-2">{character || 'OS'} Enjoyer</span>
              </div>
            </div>
          </div>
          <div tw="flex w-full justify-center mt-16 relative">
            <div
              tw="bg-[#1E1F1F] rounded-lg w-full flex overflow-hidden relative"
            >
              <div 
                tw="absolute w-full h-full top-0 left-0" 
                style={{
                  background: `${eloColor || '#000000'}33`
                }}
              />
              <div tw="flex p-4 w-full justify-between items-center" >
                <div tw="flex items-center">
                  <div 
                    tw="w-26 h-26 flex"
                    style={{
                      backgroundImage: `url('http://localhost:3000/${eloImage || '/i/rank/T_UI_RankedEmblem_Rookie_Low'}.png')`,
                      backgroundSize: '100% 100%'
                    }}
                  />
                  <div tw="flex flex-col h-full ml-4">
                    <span 
                      tw="font-bold text-3xl"
                      style={{
                        color: `${eloColor || '#DDDDDD'}`,
                        fontWeight: 900
                      }}
                    >{elo || 'Rookie'}</span>
                    <span tw="text-white/60">{lp || 0} LP</span>
                    <span tw="text-white/60">{`${win}W ${loss || 0}L ${(Number(win) / (Number(win) + Number(loss)) * 100).toFixed()}%`}</span>
                  </div>
                </div>
                <div tw="h-[80%] w-[1px] bg-white/20" />
                <div tw="flex flex-col items-end mr-2">
                  <span tw="text-4xl font-bold">#{rank || '10000+'}</span>
                  <span tw="text-lg text-white/60">{region || 'World'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,

    },
  )
}