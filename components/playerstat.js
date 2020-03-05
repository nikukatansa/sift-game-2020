export default (player) => {
  return (
    <div className="flex items-center">
      <div className="w-1/3">{player.name}</div>
      <div className="w-1/3">Physical: {player.p_score}</div>
      <div className="w-1/3">Emotional: {player.e_score}</div>
    </div>
  )
}
