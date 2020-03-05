export default (props) => {
  const proceed = () => {
    props.onAdvance()
  }

  return (
    <div>
      <p>{props.desc}</p>
      <button className="rounded-md bg-blue-200 p-2" onClick={() => proceed()}>
        Next
      </button>
    </div>
  )
}
