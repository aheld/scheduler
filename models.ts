
function schedule(hourslots: Array<HourSlot>): Array<Shift> {
    if (hourslots.length == 0) return []
    var cmd = new ScheduleCommand([], hourslots, 0)
    return scheduleBlock(cmd).shifts
}

function scheduleBlock(cmd: ScheduleCommand): ScheduleCommand{
    var drivers = Math.min(...cmd.gaps.map(x => x.driversNeeded).filter((x)=>x>0))
    var startTime = Math.min(...cmd.gaps.map((x)=>x.startTime))
    var duration = Math.max(...cmd.gaps.map((x)=>x.startTime)) - startTime + 1
    var shift = new Shift(startTime, duration, drivers)
    var newGap = cmd.gaps.map((x) => {return new HourSlot(x.startTime, x.driversNeeded - drivers)}).filter((x)=>x.driversNeeded > 0)
    var acc = new ScheduleCommand(cmd.shifts.concat(shift), newGap, cmd.generation + 1)
    if (acc.isDone()) return acc
    return scheduleBlock(acc)
}

class ScheduleCommand{
    public shifts: Array<Shift>
    public gaps: Array<HourSlot>
    public generation = 0

    constructor(shifts: Array<Shift>, gaps: Array<HourSlot>, generation: number) {
        this.shifts = shifts
        this.gaps = gaps
        this.generation = generation
    }

    public isDone(){
        return (this.generation > 10 || this.gaps.every((x)=> x.driversNeeded == 0 )) 
    }
}


class HourSlot {
    startTime: number
    driversNeeded: number

    constructor(startTime: number, driversNeeded: number) {
        this.startTime = startTime
        this.driversNeeded = driversNeeded
    }

    public toString = (): string => {
        return `${startTime}: ${this.driversNeeded} drivers`
    }
}

class Shift {
    public startTime: number
    public duration: number
    public driversNeeded: number
    
    constructor(startTime: number, duration: number, driversNeeded: number) {
        this.startTime = startTime
        this.duration = duration
        this.driversNeeded = driversNeeded
    }

    public toString = (): string => `Shift(${startTime}, ${duration}, ${this.driversNeeded})`
}


let day: Array<HourSlot> = [
    new HourSlot(0,1),
    new HourSlot(1,2),
    new HourSlot(2,2),
    new HourSlot(3,1)    ]


export {schedule, HourSlot, Shift}
