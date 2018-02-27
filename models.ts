
function schedule(hourslots: Array<HourSlot>): Array<Shift> {
    if (hourslots.length == 0) return []
    var slot = hourslots[0]
    var drivers = Math.max(...hourslots.map(x => x.driversNeeded))
    var ps = hourslots.filter((x)=> x.driversNeeded === drivers)
    var startTime = Math.min(...hourslots.map((x)=>x.startTime))
    var duration = Math.max(...hourslots.map((x)=>x.startTime)) - startTime + 1
    console.log(`Shift(${startTime}, ${duration}, ${drivers})`)
    var baseShift = new Shift(startTime, duration, drivers)
    
    var ns = hourslots.map((x) => {return new HourSlot(x.startTime)})


    return [ baseShift ]

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
    private startTime: number
    private duration: number
    private driversNeeded: number
    
    constructor(startTime: number, duration: number, driversNeeded: number) {
        this.startTime = startTime
        this.duration = duration
        this.driversNeeded = driversNeeded
    }

    public toString = (): string => `Shift(${startTime}, ${duration}, ${drivers})`
}


let day: Array<HourSlot> = [
    new HourSlot(0,1),
    new HourSlot(1,2),
    new HourSlot(2,2),
    new HourSlot(3,1)    ]


export {schedule, HourSlot, Shift}
