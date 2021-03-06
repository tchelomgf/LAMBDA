input.onButtonPressed(Button.A, function () {
    MC = MC + 0.007
    OUT = "ON"
    led.plot(0, 0)
})
input.onButtonPressed(Button.B, function () {
    if (toogle) {
        MC = MC + 0.14
    }else{
        MC = MC - 0.14
    }
    toogle = !toogle
})
serial.onDataReceived(serial.delimiters(Delimiters.CarriageReturn), function () {
    Comm = serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))
    if (Comm == "ADR 06") {
        serial.writeLine("OK")
    } else if (Comm == "RST") {
        PC = 1
        MC = 0
        PV = 0
        OUT = "OFF"
        toogle = true
        led.unplot(0, 0)
        serial.writeLine("OK")
    } else if (Comm == "CLS") {
        serial.writeLine("OK")
    } else if (Comm == "PV?") {
        serial.writeLine(PV.toString().substr(0, 6))
    } else if (Comm == "MV?") {
        if (OUT == "ON") {
            serial.writeLine((PV + randint(-0.1, 0.1)).toString().substr(0, 6))
        } else {
            serial.writeLine("0.0000")
        }
    } else if (Comm.substr(0, 3) == "PV ") {
        PV = parseFloat(Comm.split(" ")[1])
        serial.writeLine("OK")
    } else if (Comm == "PC?") {
        serial.writeLine(PC.toString().substr(0, 6))
    } else if (Comm == "MC?") {
        if (OUT == "ON") {
            serial.writeLine((MC + randint(-0.002, 0.002)).toString().substr(0, 6))
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
        toogle = true
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
let MC = 0
let PC = 0
let PV = 0
let toogle = true
toogle = true
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
