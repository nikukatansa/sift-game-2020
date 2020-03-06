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

  function updateScores(old_p_score, old_e_score, modifiers) {
    let p_var = modifiers.p_variance * (2 * Math.random() - 1) // In range [-p_variance, +p_variance]
    let e_var = modifiers.e_variance * (2 * Math.random() - 1) // In range [-e_variance, +e_variance]
    let p_mod = modifiers.p_impact + p_var
    let e_mod = modifiers.e_impact + e_var
    let p_new = Math.max(Math.min(old_p_score + p_mod, 100), 0) // Constrain to range [0,100]
    let e_new = Math.max(Math.min(old_e_score + e_mod, 100), 0) // Constrain to range [0,100]
    return [p_new, e_new, modifiers.result]
  }

  function processScan(data) {
    const idx = gamestate.subround / 2
    let p_old = players[idx].p_score
    let e_old = players[idx].e_score
    let modifiers
    if (data.charAt(0) === 'Y') {
      // Apply positive effects to player's stats
      modifiers = situations[gamestate.round].yes
    } else if (data.charAt(0) === 'N') {
      // Apply negative effects to player's stats
      modifiers = situations[gamestate.round].no
    } else {
      // Decide whether to apply positive, negative or random stats to player
      let choice = 2 * Math.random() - 1 // In range [-1, 1]
      if (Math.abs(choice) < situations[gamestate.round].random.threshold) {
        // Apply random effect to player's stats
        modifiers = situations[gamestate.round].random
      } else if (choice > 0) {
        // Apply positive effect
        modifiers = situations[gamestate.round].yes
      } else {
        // Apply negative effect
        modifiers = situations[gamestate.round].no
      }
    }
    const [p_new, e_new, new_result] = updateScores(p_old, e_old, modifiers)
    let new_player = {
      ...players[idx],
      old_p_score: p_old,
      old_e_score: e_old,
      p_score: p_new,
      e_score: e_new
    }
    setPlayers([
      ...players.slice(0, idx),
      new_player,
      ...players.slice(idx + 1)
    ])
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
                player={players[gamestate.subround / 2]}
                onScan={processScan}
              />
            ) : (
              <PostScan
                desc={gamestate.lastresult}
                player={players[Math.floor(gamestate.subround / 2)]}
                onAdvance={nextSubRound}
              />
            )}
          </div>
        </main>
      </div>
    </Page>
  )
}
