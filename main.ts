function correctPath (FLL2: number) {
    if (FLL2 == 1) {
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 40)
        DFRobotMaqueenPlus.mototStop(Motors.M1)
    } else {
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 40)
        DFRobotMaqueenPlus.mototStop(Motors.M2)
    }
}
function turningRight () {
    basic.showNumber(3)
    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 40)
    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, 40)
    while (FLR2 && FLR1) {
        Sensors()
    }
    while (!(FLR2 && FLR1)) {
        Sensors()
    }
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
    basic.showNumber(0)
}
function Sensors () {
    FLL1 = DFRobotMaqueenPlus.readPatrol(Patrol.L1)
    FLL2 = DFRobotMaqueenPlus.readPatrol(Patrol.L2)
    FLL3 = DFRobotMaqueenPlus.readPatrol(Patrol.L3)
    FLR1 = DFRobotMaqueenPlus.readPatrol(Patrol.R1)
    FLR2 = DFRobotMaqueenPlus.readPatrol(Patrol.R2)
    FLR3 = DFRobotMaqueenPlus.readPatrol(Patrol.R3)
    ultrasound = DFRobotMaqueenPlus.ultraSonic(PIN.P2, PIN.P1)
}
function turningLeft () {
    basic.showNumber(4)
    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 40)
    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, 40)
    while (FLL1 && FLR1) {
        Sensors()
    }
    while (!(FLL1 && FLR1)) {
        Sensors()
    }
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
    basic.showNumber(0)
}
function followStraightLine () {
    basic.showNumber(0)
    Sensors()
    while (stateOfMovement == 0) {
        if (FLL2 || FLR2) {
            correctPath(FLL2)
        }
        while (FLL1 && FLR1) {
            if (ultrasound < 7) {
                turn(FLR2)
            }
            if (FLR2) {
                Sensors()
                turn(FLR2)
            }
            DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 40)
            Sensors()
        }
        Sensors()
    }
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
}
function turn (turnRight: number) {
    if (turnRight == 1) {
        while (!(FLR3)) {
            DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 30)
            Sensors()
        }
        basic.pause(800)
        DFRobotMaqueenPlus.mototStop(Motors.ALL)
        basic.showNumber(1)
        turningRight()
    } else {
        DFRobotMaqueenPlus.mototStop(Motors.ALL)
        basic.showNumber(2)
        turningLeft()
    }
}
let ultrasound = 0
let FLR3 = 0
let FLL3 = 0
let FLL2 = 0
let FLL1 = 0
let FLR1 = 0
let FLR2 = 0
let stateOfMovement = 0
stateOfMovement = 0
DFRobotMaqueenPlus.PID(PID.OFF)
basic.forever(function () {
    basic.showNumber(0)
    followStraightLine()
})
