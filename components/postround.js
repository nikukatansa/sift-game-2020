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
      {props.data.map((player, index) => {
        return <PlayerStat key={index} {...player} />
      })}
      <div className="flex justify-around">
        <button
          className="rounded-md bg-blue-200 p-2 mt-4"
          onClick={() => proceed()}
        >
          Next
        </button>
      </div>
    </div>
  )
}
