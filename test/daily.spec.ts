import { expect } from 'chai'
import 'mocha'

import {  HourSlot, Shift, schedule } from '../models'

describe('Schedule a day', () => {
    it('Schedule an empty shift', () => {
      expect(schedule([])).to.deep.equal([]);
    });
    it('Schedule an simple shift', () => {
      expect(schedule([new HourSlot(9, 1)])).to
        .deep.equal([new Shift(9, 1, 1)]);
    });
    it('Schedule an simple shift with 2 drivers', () => {
      expect(schedule([new HourSlot(9, 2)])).to
        .deep.equal([new Shift(9, 1, 2)]);
    });
    it('Schedule an simple 2 hours shift', () => {
      expect(schedule(
          [new HourSlot(9, 1),
           new HourSlot(10, 1)]
        )).to
        .deep.equal([new Shift(9, 2, 1)]);
    });

    var nineAmTests = [
      { slots:[1, 1, 1], shifts:[[9, 3, 1]] },
      { slots:[2, 2, 2], shifts:[[9, 3, 2]] },
      { slots:[2, 2, 2, 2, 2, 2], shifts:[[9, 6, 2]] },
      { slots:[2, 2, 2, 2, 3, 3, 3, 3], shifts:[[9, 8, 2], [14, 4, 1]] }
    ]
    

    nineAmTests.forEach(function(tc: Object){
      it(`Schedules ${tc.slots} for ${tc.shifts.length} shift`, function() {
        var slots = tc.slots.map((x, i) => { return new HourSlot(9 + i, x)})
        var expectedShifts = tc.shifts.map(
            (x)=> {
                return new Shift(x[0], x[1], x[2]) })
        var shifts = schedule(slots)
        expect(shifts).to.deep.equal(expectedShifts)
      });
    });
});




