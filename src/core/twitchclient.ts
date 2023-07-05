import axios, { AxiosResponse } from 'axios'

interface TwitchStream {
  id: string;
  title: string;
  viewers: number;
  // Add more properties as per your requirement
}

async function getStreamsFromGame(gameId: string, clientId: string): Promise<TwitchStream[]> {
  const url = `https://api.twitch.tv/helix/streams?game_id=${gameId}`
  const headers = {
    'Client-ID': clientId,
    'Authorization': `Bearer ${process.env.TWITCH_TOKEN}`, // Add your access token if required
  }

  try {
    const response: AxiosResponse = await axios.get(url, { headers })
    const { data } = response.data

    const streams: TwitchStream[] = data.map((stream: any) => ({
      id: stream.id,
      title: stream.title,
      viewers: stream.viewer_count,
      // Add more properties as per your requirement
    }))

    return streams
  } catch (error) {
    console.error('Error retrieving streams:', error)
    return []
  }
}