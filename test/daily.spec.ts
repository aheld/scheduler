import { expect } from 'chai'
import 'mocha'

import {  HourSlot, Shift, schedule } from '../models'

function stringify(input: Array<Shift>){
  return input.map((x)=>x.toString())
}

function equalShifts(actual, expected){
  expect(stringify(actual)).to.deep.equal(
    stringify(expected)
  )
}
describe('Schedule a day', () => {
    it('Schedule an empty shift', () => {
      expect(schedule([])).to.deep.equal([]);
    });
    it('Schedule an simple shift', () => {
      equalShifts(schedule([new HourSlot(9, 1)]),[new Shift(9, 1, 1)])
    });
    it('Schedule an simple shift with 2 drivers', () => {
      equalShifts(schedule([new HourSlot(9, 2)]), [new Shift(9, 1, 2)])
    });
    it('Schedule an simple 2 hours shift', () => {
      equalShifts(
        schedule(
          [new HourSlot(9, 1),
           new HourSlot(10, 1)]
        ),
          [new Shift(9, 2, 1)])
    });

    var nineAmTests = [
      { slots:[1, 1, 1], shifts:[[9, 3, 1]] },
      { slots:[2, 2, 2], shifts:[[9, 3, 2]] },
      { slots:[2, 2, 2, 2, 2, 2], shifts:[[9, 6, 2]] },
      { slots:[2, 2, 2, 2, 3, 3, 3, 3], shifts:[[9, 8, 2], [13, 4, 1]] },
      { slots:[1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
        shifts:[[9, 4, 1], [13, 8, 2], [17, 4, 1]] }
    ]
    

    nineAmTests.forEach(function(tc: Object){
      it(`Schedules ${tc.slots} for ${tc.shifts.length} shift`, function() {
        var slots = tc.slots.map((x, i) => { return new HourSlot(9 + i, x)})
        var shifts = schedule(slots)
        var expectedShifts = tc.shifts.map(
            (x)=> {
                return new Shift(x[0], x[1], x[2]) })
        equalShifts(shifts, expectedShifts)
      });
    });
});




