radio.onReceivedValueDeprecated(function (name, value) {
    let mottatt_tall = 0
    let mottatt_streng = ""
    if (mottatt_streng == "pitch") {
        pitch_verdi = mottatt_tall
    } else {
        roll_verdi = mottatt_tall
    }
    hastighet = Math.idiv(Math.abs(pitch_verdi) * 100, 90)
    svinghastigheten = Math.idiv(roll_verdi * 5, 10)
})
let svinghastigheten = 0
let hastighet = 0
let roll_verdi = 0
let pitch_verdi = 0
// Husk å sette samme radiogruppe tall som på fjernkontrolleren
radio.setGroup(42)
basic.forever(function () {
    basic.showIcon(IconNames.Happy)
    if (pitch_verdi < -10) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, hastighet - svinghastigheten)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, hastighet + svinghastigheten)
    } else if (pitch_verdi > 10) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, hastighet - svinghastigheten)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, hastighet + svinghastigheten)
    } else {
        if (roll_verdi < -10) {
            kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, Math.abs(svinghastigheten))
        } else if (roll_verdi > 10) {
            kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, Math.abs(svinghastigheten))
        } else {
            kitronik.motorOff(kitronik.Motors.Motor1)
            kitronik.motorOff(kitronik.Motors.Motor2)
        }
    }
})
