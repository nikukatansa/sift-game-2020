import dynamic from 'next/dynamic'

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })

export default (props) => {
  function handleError(error) {
    console.error(error)
  }

  function handleScan(data) {
    const card_types = ['Y', 'N', 'R']
    if (!scanned && data !== null) {
      try {
        console.log('Data:', data)
        if (
          data !== last_card &&
          data.length === 3 &&
          card_types.includes(data.charAt(0))
        ) {
          console.log('Different valid card seen')
          scanned = true
          props.onScan(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  let scanned = false
  let last_card = props.last

  return (
    <div className="container mx-auto">
      <p>Play a card, {props.player}</p>
      <section>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </section>
      <input type="file" accept="image/*" capture="camera" className="hidden" />
    </div>
  )
}
