import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
 
export const config = {
  runtime: 'experimental-edge',
}
 
// eslint-disable-next-line import/no-anonymous-default-export
export default function (req: NextRequest) {

  const { searchParams } = new URL(req.url)
  const isVerified = searchParams.get('verified')
  const isStaff = searchParams.get('staff')
  const username = searchParams.get('username')
  const title = searchParams.get('title')
  const rank = searchParams.get('rank')
  const lp = searchParams.get('lp')
  const win = searchParams.get('win')
  const region = searchParams.get('region')
  const emoji = searchParams.get('emoji')
  const elo = searchParams.get('elo')
  const eloImage = searchParams.get('eloImage')
  const eloColor = searchParams.get('eloColor')
  const role = searchParams.get('position')

  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections

      <div 
        tw="flex flex-col w-full h-full items-center justify-center bg-[#101211] text-white relative"
        style={{
          backgroundImage: `url('${emoji ? `http://localhost:3000/${emoji}` : 'https://i.imgur.com/0QZQY5n.png'}')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0px',
          backgroundSize: '100% 130%'
        }}
      >
        <div 
          tw="absolute inset-0 w-full h-full flex"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #101211AA 10%, #101211 100%)'
          }}
        />
        <div
          tw="w-full h-full flex flex-col px-8 justify-center"
        >
          <div
            tw="flex items-center "
          >
            <div
              tw="w-26 h-26 rounded-lg bg-[#1E1F1F] flex"
            >
              <div
                tw="w-full h-full flex"
                style={{
                  backgroundImage: 'url(\'https://i.imgur.com/xNtqhpp.png\')',
                  backgroundSize: '98% 98%'
                }}
              />
            </div>
            <div
              tw="flex flex-col h-26 ml-4"
            >
              <div tw="flex items-center">
                <span tw=" font-semibold text-3xl">{username || 'Unknown'}</span>
                { Boolean(isStaff) && <img src='https://i.imgur.com/dk8LlV9.png' tw="w-5 h-5 ml-2" alt='ody' /> }
                { Boolean(isVerified) &&  <img src='https://i.imgur.com/0554Cd5.png' tw="w-6 h-6 ml-2" alt='creator' /> }
              </div>
              <span tw=" font-regular text-white/60">{title || 'No title'}</span>
              <div tw="flex w-full text-xs font-semibold mt-2">
                <span tw="px-2 py-1.4 bg-[#1E1F1F] rounded-lg">{role || '🦐 🥅 Flex'}</span>
                <span tw="px-2 py-1.4 bg-[#1E1F1F] rounded-lg ml-2">{role || 'OS Enjoyer'}</span>
              </div>
            </div>
          </div>
          <div tw="flex w-full justify-center mt-6 relative">
            <div
              tw="bg-[#1E1F1F] rounded-lg w-full flex overflow-hidden relative"
            >
              <div 
                tw="absolute w-full h-full top-0 left-0" 
                style={{
                  background: `${eloColor || '#000000'}33`
                }}
              />
              <div tw="flex p-2 w-full justify-between items-center" >
                <div tw="flex">
                  <div 
                    tw="w-16 h-16 flex"
                    style={{
                      backgroundImage: `url('http://localhost:3000/${eloImage || '/i/rank/T_UI_RankedEmblem_Rookie_Low.png'}')`,
                      backgroundSize: '100% 100%'
                    }}
                  />
                  <div tw="flex flex-col h-full ml-2">
                    <span 
                      tw="font-bold text-xl"
                      style={{
                        color: `${eloColor || '#DDDDDD'}`
                      }}
                    >{elo || 'Rookie'}</span>
                    <span tw="text-sm text-white/60">{lp || 0} LP</span>
                    <span tw="text-sm  text-white/60">{win || '0W 0L 0%'}</span>
                  </div>
                </div>
                <div tw="h-[80%] w-[1px] bg-white/20" />
                <div tw="flex flex-col items-end mr-2">
                  <span tw="text-2xl font-bold">#{rank || '10000+'}</span>
                  <span tw="text-sm text-white/60">{region || 'World'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,

    },
  )
}