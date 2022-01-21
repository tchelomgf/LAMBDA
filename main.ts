input.onButtonPressed(Button.A, function () {
    MC = MC + 0.007
})
input.onButtonPressed(Button.B, function () {
    MC = MC + 0.140
})
serial.onDataReceived(serial.delimiters(Delimiters.CarriageReturn), function () {
    Comm = serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))
    if (Comm == "ADR 6") {
        serial.writeLine("OK")
    } else if (Comm == "RST") {
        serial.writeLine("OK")
    } else if (Comm == "CLS") {
        serial.writeLine("OK")
    } else if (Comm == "PV?") {
        serial.writeLine("" + (PV))
    } else if (Comm == "MV?") {
        if (OUT == "ON") {
            serial.writeLine("" + (PV + randint(-0.1, 0.1)))
        } else {
            serial.writeLine("0.0000")
        }
    } else if (Comm.substr(0, 3) == "PV ") {
        PV = parseFloat(Comm.split(" ")[1])
        serial.writeLine("OK")
    } else if (Comm == "PC?") {
        serial.writeLine("" + (PC))
    } else if (Comm == "MC?") {
        if (OUT == "ON") {
            serial.writeLine("" + (MC + randint(-0.002, 0.002)))
        } else {
            serial.writeLine("0.0000")
        }
    } else if (Comm.substr(0, 3) == "PC ") {
        PC = parseFloat(Comm.split(" ")[1])
        serial.writeLine("OK")
    } else if (Comm == "OUT?") {
        serial.writeLine(OUT)
    } else if (Comm == "OUT 0") {
        OUT = "OFF"
        MC = 0
        led.unplot(0, 0)
        serial.writeLine("OK")
    } else if (Comm == "OUT 1") {
        OUT = "ON"
        led.plot(0, 0)
        serial.writeLine("OK")
    } else {
        serial.writeLine("C01")
        basic.showString(Comm)
    }
})
let Comm = ""
let OUT = ""
let PV = 0
let PC = 0
let MC = 0
PC = 1
MC = 0
PV = 0
OUT = "OFF"
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate9600
)
serial.writeLine("HELLO!")
