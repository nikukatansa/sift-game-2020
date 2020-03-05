import Page from '../components/page'
import Situation from '../components/situation'
import Scanner from '../components/scanner'
import PostScan from '../components/postscan'
import PostRound from '../components/postround'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'react-use'
import { situations } from '../data/situation-data'

export default () => {
  const router = useRouter()
  const [gamestate, setGamestate] = useLocalStorage('gamestate', {})
  const [players, setPlayers] = useLocalStorage('players', [])

  function nextSubRound() {
    setGamestate({ ...gamestate, subround: gamestate.subround + 1 })
  }

  function processScan(data) {
    const idx = gamestate.subround / 2
    let p_new = players[idx].p_score
    let e_new = players[idx].e_score
    let p_mod, e_mod
    let new_result = ''
    if (data.charAt(0) === 'Y') {
      // Apply positive effects to player's stats
      // Need to add in variance
      p_mod = situations[gamestate.round].yes.p_impact
      e_mod = situations[gamestate.round].yes.e_impact
      new_result = situations[gamestate.round].yes.result
    } else if (data.charAt(0) === 'N') {
      // Apply negative effects to player's stats
      // Need to add in variance
      p_mod = situations[gamestate.round].no.p_impact
      e_mod = situations[gamestate.round].no.e_impact
      new_result = situations[gamestate.round].no.result
    } else {
      // Decide whether to apply positive, negative or random stats to player
      let choice = 2 * Math.random() - 1 // In range [-1, 1]
      if (Math.abs(choice) < situations[gamestate.round].random.threshold) {
        // Apply random effect to player's stats
        // Need to add in variance
        p_mod = situations[gamestate.round].random.p_impact
        e_mod = situations[gamestate.round].random.e_impact
        new_result = situations[gamestate.round].random.result
      } else if (choice > 0) {
        // Apply positive effect
        // Need to add in variance
        p_mod = situations[gamestate.round].yes.p_impact
        e_mod = situations[gamestate.round].yes.e_impact
        new_result = situations[gamestate.round].yes.result
      } else {
        // Apply negative effect
        // Need to add in variance
        p_mod = situations[gamestate.round].no.p_impact
        e_mod = situations[gamestate.round].no.e_impact
        new_result = situations[gamestate.round].no.result
      }
    }
    p_new = Math.max(Math.min(p_new + p_mod, 100), 0) // Constrain to range [0,100]
    e_new = Math.max(Math.min(e_new + e_mod, 100), 0) // Constrain to range [0,100]
    let new_player = {
      ...players[idx],
      p_score: p_new,
      e_score: e_new
    }
    setPlayers([
      ...players.slice(0, idx),
      new_player,
      ...players.slice(idx + 1)
    ])
    console.log(
      'Last result should be changed to',
      new_result,
      'Last card to',
      data
    )
    setGamestate({
      ...gamestate,
      lastresult: new_result,
      lastcard: data,
      subround: gamestate.subround + 1
    })
  }

  function nextRound() {
    // Add logic here for when we reach the end of the final round
    if (gamestate.round + 1 < situations.length) {
      setGamestate({ ...gamestate, round: gamestate.round + 1, subround: -1 })
    } else {
      console.log('End of the game.  Really should do something here!')
    }
  }

  return (
    <Page>
      <div className="bg-blue-400 py-4 min-h-screen">
        <main className="max-w-lg mx-auto py-4 bg-white rounded-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Round {gamestate.round + 1} of {situations.length}
            </h1>
            {gamestate.subround === -1 ? (
              <Situation
                desc={situations[gamestate.round].description}
                onAdvance={nextSubRound}
              />
            ) : gamestate.subround === 2 * players.length ? (
              <PostRound data={players} onAdvance={nextRound} />
            ) : gamestate.subround % 2 === 0 ? (
              <Scanner
                last={gamestate.lastcard}
                player={players[gamestate.subround / 2].name}
                onScan={processScan}
              />
            ) : (
              <PostScan desc={gamestate.lastresult} onAdvance={nextSubRound} />
            )}
          </div>
        </main>
      </div>
    </Page>
  )
}
