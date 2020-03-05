from io import BytesIO
import pyqrcode

cards = [
    {'type': 'Y', 'count': 20},
    {'type': 'N', 'count': 15},
    {'type': 'R', 'count': 10}
]

for card_type in range(len(cards)):
    for val in range(cards[card_type]['count']):

        print("Creating QR code for card " +
              cards[card_type]['type'] + ":" + str(val))

        qr_data = cards[card_type]['type'] + f'{val:02}'
        fname = "./output/" + cards[card_type]['type'] + f'{val:02}' + ".svg"

        qr_code = pyqrcode.create(qr_data)
        qr_code.svg(fname, scale=6)
