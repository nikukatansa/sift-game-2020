export default (props) => {
  const proceed = () => {
    props.onAdvance()
  }

  return (
    <div>
      <p>This is the end of a round.</p>
      <button className="rounded-md bg-blue-200 p-2" onClick={() => proceed()}>
        Next
      </button>
    </div>
  )
}
