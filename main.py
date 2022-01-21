def on_data_received():
    basic.show_string(serial.read_line())
    serial.write_line("OK")
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

serial.redirect(SerialPin.USB_TX, SerialPin.USB_RX, BaudRate.BAUD_RATE9600)
serial.write_line("HELLO!")