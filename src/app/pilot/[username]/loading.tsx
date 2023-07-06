'use client'

import FetchingIndicator from "@/components/atoms/FetchingIndicator";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios'
import { gql } from "@apollo/client";

export default function Loading() {
  const [pilot, setPilot] = useState(null)
  const params = useParams()
  
  useEffect(() => {
    console.log('params', params)
    if (!params.username) { return }
    ;(async ()=>{
      const data = await axios({
        method: 'POST',
        url: process.env.NEXT_PUBLIC_API_URL,
        data: {
          query: gql`
          query($pilotname: String!) {
            getPlayerByName(name: $pilotname) {
              username
              ratings {
                games
                losses
                rank
                rating
              }
              characterRatings {
                createdAt
                character
                gamemode
                knockouts
                losses
                wins
                games
                role
                saves
                scores
                mvp
              }
              mastery {
                currentLevel
                currentLevelXp
                xpToNextLevel
              }
              
            }
          }          
          `,
          variables: { pilotname: params.username }
        },
        headers: {
          "content-type": "application/json",
        }
      })

      console.log('data', data)
    })()
  }, [params])

  return <div className="flex flex-col mt-10 min-h-screen">
      <FetchingIndicator
        textContent="Ai.Mi is searching for this information!"
        subTextContent="Please be patient, she's trying her best"
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
}