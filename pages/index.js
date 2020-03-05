import Page from '../components/page'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'react-use'

export default () => {
  const router = useRouter()
  const [gamestate, setGamestate] = useLocalStorage('gamestate', {
    stage: 'lobby',
    round: -1,
    subround: -1,
    lastcard: '',
    lastresult: ''
  })
  const [players, setPlayers] = useLocalStorage('players', [])

  function continueGame() {
    console.log('User has chosen to continue existing game')
    if (gamestate['stage'] === 'play') {
      router.push('/play')
    } else {
      setGamestate({
        ...gamestate,
        stage: 'tutorial',
        round: -1,
        subround: -1,
        lastcard: '',
        lastresult: ''
      })
      router.push('/tutorial')
    }
  }

  function newGame() {
    console.log('User has chosen to start a new game')
    setGamestate({
      ...gamestate,
      stage: 'lobby',
      round: -1,
      subround: -1,
      lastcard: '',
      lastresult: ''
    })
    setPlayers([])
    router.push('/lobby')
  }

  return (
    <Page>
      <div className="bg-blue-400 py-4 min-h-screen">
        <main className="max-w-lg mx-auto py-4 bg-white rounded-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Welcome to the game...
            </h1>
            {gamestate['stage'] === 'lobby' ? (
              <div className="flex justify-around">
                <button
                  className="rounded-md bg-blue-200 p-2"
                  onClick={() => newGame()}
                >
                  Start a new game
                </button>
              </div>
            ) : (
              <div className="flex justify-around">
                <button
                  className="rounded-md bg-blue-200 p-2"
                  onClick={() => continueGame()}
                >
                  Continue your game
                </button>
                <button
                  className="rounded-md bg-blue-200 p-2"
                  onClick={() => newGame()}
                >
                  Start a new game
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </Page>
  )
}
