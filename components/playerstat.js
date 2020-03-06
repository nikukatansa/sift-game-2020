export default (player) => {
  const p_style = {
    width: `${player.p_score}%`
  }
  const e_style = {
    width: `${player.e_score}%`
  }
  return (
    <div className="border-b border-gray-400 p-4">
      <div className="w-1/4 font-bold">{player.name}</div>
      <div className="flex">
        <div className="w-1/4">Physical:</div>
        <div className="w-3/4">
          <div className="w-full">
            <div className="h-4 my-1 bg-yellow-500" style={p_style}></div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/4">Emotional:</div>
        <div className="w-3/4">
          <div className="w-full">
            <div className="h-4 my-1 bg-red-500" style={e_style}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
