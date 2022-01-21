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
        serial.writeLine("" + PV + randint(0, 10))
    } else if (Comm.substr(0, 3) == "PV ") {
        PV = Comm.split(" ")[1]
        serial.writeLine("OK")
    } else if (Comm == "PC?") {
        serial.writeLine("" + (PC))
    } else if (Comm == "MC?") {
        serial.writeLine("" + PC + randint(0, 10))
    } else if (Comm.substr(0, 3) == "PC ") {
        PC = Comm.split(" ")[1]
        serial.writeLine("OK")
    } else if (Comm == "OUT?") {
        serial.writeLine(OUT)
    } else if (Comm == "OUT 0") {
        OUT = "OFF"
        serial.writeLine("OK")
    } else if (Comm == "OUT 1") {
        OUT = "ON"
        serial.writeLine("OK")
    } else {
        serial.writeLine("C01")
    }

    //basic.showString(Comm)
})
let PC = ""
let PV = ""
let Comm = ""
let OUT = ""
OUT = "OFF"
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate9600
)
serial.writeLine("HELLO!")
