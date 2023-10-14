let FLR3 = 0
let FLL3 = 0
let FLR2 = 0
let FLL2 = 0
let FLR1 = 0
let FLL1 = 0
let distance = DFRobotMaqueenPlus.ultraSonic(PIN.P2, PIN.P1)
let minDIstanceCal = 10
DFRobotMaqueenPlus.PID(PID.OFF)
while (minDIstanceCal <= distance) {
    DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 50)
    basic.pause(100)
    distance = DFRobotMaqueenPlus.ultraSonic(PIN.P2, PIN.P1)
}
DFRobotMaqueenPlus.mototStop(Motors.ALL)
basic.forever(function () {
    FLL1 = DFRobotMaqueenPlus.readPatrol(Patrol.L1)
    FLR1 = DFRobotMaqueenPlus.readPatrol(Patrol.R1)
    FLL2 = DFRobotMaqueenPlus.readPatrol(Patrol.L2)
    FLR2 = 0
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
    basic.pause(200)
    while (FLL1 == 1 || (FLR1 == 1 || (FLL2 == 1 || FLR2 == 1))) {
        if (FLL2 == 1) {
            DFRobotMaqueenPlus.mototStop(Motors.M1)
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 40)
        } else if (FLR2 == 1) {
            DFRobotMaqueenPlus.mototStop(Motors.M2)
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 40)
        }
        while (FLL1 == 1 && FLR1 == 1) {
            DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 40)
            FLL1 = DFRobotMaqueenPlus.readPatrol(Patrol.L1)
            FLR1 = DFRobotMaqueenPlus.readPatrol(Patrol.R1)
            FLL3 = DFRobotMaqueenPlus.readPatrol(Patrol.L3)
            FLR3 = DFRobotMaqueenPlus.readPatrol(Patrol.R3)
            if (FLR3 == 1 || FLL3 == 1) {
                DFRobotMaqueenPlus.mototStop(Motors.ALL)
                basic.pause(1000)
            }
        }
        FLL1 = DFRobotMaqueenPlus.readPatrol(Patrol.L1)
        FLR1 = DFRobotMaqueenPlus.readPatrol(Patrol.R1)
        FLL2 = DFRobotMaqueenPlus.readPatrol(Patrol.L2)
        FLR2 = DFRobotMaqueenPlus.readPatrol(Patrol.R2)
        FLL3 = DFRobotMaqueenPlus.readPatrol(Patrol.L3)
        FLR3 = DFRobotMaqueenPlus.readPatrol(Patrol.R3)
    }
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
})
