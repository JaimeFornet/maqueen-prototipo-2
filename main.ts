function transitionIntersectionState () {
    stateOfMovement = 1
    turnLeft = 0
    turnRight = 0
    intersectionT1 = 0
    intersectionT2 = 0
    completeIntersection = 0
    if (FLL22 && !(FLR2)) {
        basic.showNumber(2)
        basic.pause(1000)
        if (checkFrontalLine()) {
            intersectionT1 = 1
        } else {
            turnLeft = 1
        }
    } else if (FLR2 && !(FLL22)) {
        basic.showNumber(1)
        basic.pause(1000)
        if (checkFrontalLine()) {
            intersectionT1 = 1
        } else {
            turnRight = 1
        }
    } else if (FLR2 && FLL22) {
        basic.showNumber(3)
        basic.pause(1000)
        if (checkFrontalLine()) {
            intersectionT2 = 1
        } else {
            completeIntersection = 1
        }
    }
}
function checkFrontalLine () {
    frontalLine = 0
    lineSensors()
    while (!(FLL3) && !(FLR3)) {
        DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 20)
        lineSensors()
    }
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
    if (FLL1 && FLR1) {
        frontalLine = 1
    }
    return frontalLine
}
function correctPath (FLL2: number) {
    if (FLL2 == 1) {
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 40)
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 20)
    } else {
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 40)
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 20)
    }
}
function Giro () {
    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 40)
    while (FLL22 || FLR2) {
        lineSensors()
    }
    while (!(FLL22 || FLR2)) {
        lineSensors()
    }
}
function followStraightLine () {
    basic.showNumber(0)
    lineSensors()
    while (stateOfMovement == 0) {
        if (FLL22 || FLR2) {
            correctPath(FLL22)
        }
        while (FLL1 && FLR1) {
            if (FLL22 || FLR2) {
                DFRobotMaqueenPlus.mototStop(Motors.ALL)
                basic.pause(100)
                lineSensors()
                transitionIntersectionState()
            }
            DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 40)
            lineSensors()
            if (stateOfMovement) {
                FLL1 = 0
            }
        }
        lineSensors()
    }
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
}
function lineSensors () {
    FLL1 = DFRobotMaqueenPlus.readPatrol(Patrol.L1)
    FLL22 = DFRobotMaqueenPlus.readPatrol(Patrol.L2)
    FLL3 = DFRobotMaqueenPlus.readPatrol(Patrol.L3)
    FLR1 = DFRobotMaqueenPlus.readPatrol(Patrol.R1)
    FLR2 = DFRobotMaqueenPlus.readPatrol(Patrol.R2)
    FLR3 = DFRobotMaqueenPlus.readPatrol(Patrol.R3)
}
let FLR1 = 0
let FLL1 = 0
let FLR3 = 0
let FLL3 = 0
let frontalLine = 0
let FLR2 = 0
let FLL22 = 0
let completeIntersection = 0
let intersectionT2 = 0
let intersectionT1 = 0
let turnRight = 0
let turnLeft = 0
let stateOfMovement = 0
stateOfMovement = 0
DFRobotMaqueenPlus.PID(PID.OFF)
basic.forever(function () {
    followStraightLine()
})
