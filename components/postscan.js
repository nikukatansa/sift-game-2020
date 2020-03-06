import PlayerStat from '../components/playerstat'

export default (props) => {
  const proceed = () => {
    props.onAdvance()
  }
  return (
    <div>
      <PlayerStat {...props.player} />
      <div>
        <p className="mt-4">{props.desc}</p>
        <div className="flex justify-around">
          <button
            className="rounded-md bg-blue-200 p-2 mt-4"
            onClick={() => proceed()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
