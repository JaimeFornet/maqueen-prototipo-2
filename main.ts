function followLine () {
    basic.showNumber(0)
    Sensors()
    while (stateOfMovement == 0) {
        Sensors()
        if (FLR2 || FLL2) {
            correctPath(FLL2)
        }
        if (ultrasound < minDistance) {
            turn(FLR2)
        }
        while (FLL1 && FLR1) {
            if (ultrasound < minDistance) {
                turn(FLR2)
            }
            if (FLR2) {
                Sensors()
                turn(FLR2)
            }
            DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, Motor_Speed)
            Sensors()
        }
        Sensors()
    }
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
}
function correctPath (Left: number) {
    if (Left == 1) {
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, Rotation_Motor_Speed)
        DFRobotMaqueenPlus.mototStop(Motors.M1)
    } else {
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, Rotation_Motor_Speed)
        DFRobotMaqueenPlus.mototStop(Motors.M2)
    }
}
function turningRight () {
    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, Rotation_Motor_Speed)
    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, Rotation_Motor_Speed)
    while (FLL1 && FLR1) {
        Sensors()
    }
    while (!(FLL1 && FLR1)) {
        Sensors()
    }
}
function Sensors () {
    FLL1 = 1 - DFRobotMaqueenPlus.readPatrol(Patrol.L1)
    FLL2 = 1 - DFRobotMaqueenPlus.readPatrol(Patrol.L2)
    FLL3 = 1 - DFRobotMaqueenPlus.readPatrol(Patrol.L3)
    FLR1 = 1 - DFRobotMaqueenPlus.readPatrol(Patrol.R1)
    FLR2 = 1 - DFRobotMaqueenPlus.readPatrol(Patrol.R2)
    FLR3 = 1 - DFRobotMaqueenPlus.readPatrol(Patrol.R3)
    ultrasound = DFRobotMaqueenPlus.ultraSonic(PIN.P2, PIN.P1)
}
function turningLeft () {
    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, Rotation_Motor_Speed)
    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, Rotation_Motor_Speed)
    while (FLL1 && FLR1) {
        Sensors()
    }
    while (!(FLL1 && FLR1)) {
        Sensors()
    }
}
function turn (turnRight: number) {
    if (turnRight == 1) {
        DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, Motor_Speed - 10)
        while (!(FLR3)) {
            if (!(FLL1 && FLR1)) {
                break;
            }
            Sensors()
        }
        basic.pause(800)
        DFRobotMaqueenPlus.mototStop(Motors.ALL)
        turningRight()
    } else {
        DFRobotMaqueenPlus.mototStop(Motors.ALL)
        turningLeft()
    }
}
let FLR3 = 0
let FLL3 = 0
let FLR1 = 0
let FLL1 = 0
let ultrasound = 0
let FLL2 = 0
let FLR2 = 0
let minDistance = 0
let Rotation_Motor_Speed = 0
let Motor_Speed = 0
let stateOfMovement = 0
stateOfMovement = 0
Motor_Speed = 40
Rotation_Motor_Speed = 50
minDistance = 7
DFRobotMaqueenPlus.PID(PID.OFF)
basic.forever(function () {
    basic.showNumber(0)
    followLine()
})
