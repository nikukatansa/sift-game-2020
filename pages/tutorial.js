import Page from '../components/page'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'react-use'

export default () => {
  const router = useRouter()
  const [gamestate, setGamestate] = useLocalStorage('gamestate')

  const proceed = () => {
    setGamestate({
      ...gamestate,
      stage: 'play',
      round: 0,
      subround: -1,
      last_card: ''
    })
    router.push('/play')
  }

  return (
    <Page>
      <div className="bg-blue-400 py-4 min-h-screen">
        <main className="max-w-lg mx-auto py-4 bg-white rounded-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Tutorial</h1>
            <p>
              This explains how the game works and how to get set up to play
              it...
            </p>
            <div className="flex justify-around">
              <button
                className="rounded-md bg-blue-200 p-2"
                onClick={() => proceed()}
              >
                Got it - let's go!
              </button>
            </div>
          </div>
        </main>
      </div>
    </Page>
  )
}
