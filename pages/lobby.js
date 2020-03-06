import Page from '../components/page'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'react-use'
import Select from 'react-select'

export default () => {
  const router = useRouter()
  const [gamestate, setGamestate] = useLocalStorage('gamestate')
  const [players, setPlayers] = useLocalStorage('players', [])

  const select_options = [
    { value: 2, label: '2 players' },
    { value: 3, label: '3 players' },
    { value: 4, label: '4 players' },
    { value: 5, label: '5 players' },
    { value: 6, label: '6 players' }
  ]

  const handleSelectChange = (selectedOption) => {
    if (selectedOption.value > players.length) {
      setPlayers([
        ...players,
        ...Array.from(
          { length: selectedOption.value - players.length },
          () => ({
            name: '',
            p_score: 50,
            e_score: 50,
            old_p_score: 50,
            old_e_score: 50
          })
        )
      ])
    } else if (selectedOption.value < players.length) {
      setPlayers(players.slice(0, selectedOption.value))
    }
  }

  const handleNameInput = (event) => {
    const idx = parseInt(event.target.attributes.data_idx.value)
    const val = event.target.value
    const new_players = [
      ...players.slice(0, idx),
      { name: val, p_score: 50, e_score: 50, old_p_score: 50, old_e_score: 50 },
      ...players.slice(idx + 1)
    ]
    setPlayers(new_players)
  }

  const proceed = () => {
    // Check that all player slots contain a distinct name
    let names = [
      ...new Set(
        players.map((player) => {
          return player.name.trim()
        })
      )
    ]
    if (names.includes('')) {
      window.alert('Please enter a name for all of the players!')
    } else if (names.length < players.length) {
      window.alert(
        'Please make sure that all of the players have different names'
      )
    } else {
      setGamestate({ ...gamestate, stage: 'tutorial', round: -1, subround: -1 })
      router.push('/tutorial')
    }
  }

  return (
    <Page>
      <div className="bg-blue-400 py-4 min-h-screen">
        <main className="max-w-lg mx-auto py-4 bg-white rounded-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Welcome to the game...
            </h1>
            <p>How many people are playing the game?</p>
            <Select
              className="mb-4 mt-2 px-4"
              options={select_options}
              onChange={handleSelectChange}
            ></Select>
            <p>Please enter the names of the players:</p>
            <form className="w-full mb-4">
              {players.map((player, index) => {
                return (
                  <div key={`player_${index}`} className="flex items-center">
                    <div className="w-1/3">
                      <label className="px-4">{`Player ${index + 1}:`}</label>
                    </div>
                    <div className="w-2/3">
                      <input
                        className="my-2 mx-2 px-2 py-2 border border-gray-400 rounded-md focus:border-2 focus:border-blue-400"
                        data_idx={index}
                        type="text"
                        value={player.name}
                        onChange={handleNameInput}
                      ></input>
                    </div>
                  </div>
                )
              })}
            </form>
            <div className="flex justify-around">
              <button
                className="rounded-md bg-blue-200 p-2"
                onClick={() => proceed()}
              >
                Start playing!
              </button>
            </div>
          </div>
        </main>
      </div>
    </Page>
  )
}
