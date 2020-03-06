import dynamic from 'next/dynamic'
import PlayerStat from '../components/playerstat'

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })

export default (props) => {
  function handleError(error) {
    console.error(error)
  }

  function handleScan(data) {
    const card_types = ['Y', 'N', 'R']
    if (!scanned && data !== null) {
      try {
        if (
          data !== last_card &&
          data.length === 3 &&
          card_types.includes(data.charAt(0))
        ) {
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
      <PlayerStat {...props.player} />
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
