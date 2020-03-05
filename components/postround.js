import PlayerStat from '../components/playerstat'

export default (props) => {
  const proceed = () => {
    props.onAdvance()
  }

  return (
    <div>
      <p>
        This is the end of the round. Here are everyone's stats at this point in
        the game.
      </p>
      {props.data.map((player) => {
        return <PlayerStat {...player} />
      })}
      <button className="rounded-md bg-blue-200 p-2" onClick={() => proceed()}>
        Next
      </button>
    </div>
  )
}
