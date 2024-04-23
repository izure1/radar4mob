import { Area, Mob } from '../'

describe('unit-test', () => {
  const init = () => {
    const area = new Area()
    for (let i = 1; i < 4; i++) {
      const mob = area.addMob(`mob-${i}`, 50)
      mob.position.set(Infinity)
    }
    area.addMob('beacon', 100)
    const beacon = area.getMob('beacon')!
    const mob1 = area.getMob('mob-1')!
    const mob2 = area.getMob('mob-2')!
    const mob3 = area.getMob('mob-3')!
    return {
      area,
      beacon,
      mob1,
      mob2,
      mob3,
    }
  }

  test('only-1', () => {
    const { area, beacon, mob1, mob2, mob3 } = init()

    beacon.position.set(0, 0)
    mob1.position.set(0, 70)

    area.update()

    expect(beacon.neighbors.has(mob1)).toBe(true)
    expect(beacon.neighbors.has(mob2)).toBe(false)
    expect(beacon.neighbors.has(mob3)).toBe(false)
    
    expect(mob1.neighbors.has(beacon)).toBe(false)
  })

  test('only-twice', () => {
    const { area, beacon, mob1, mob2, mob3 } = init()

    beacon.position.set(0, 0)
    mob1.position.set(30, 30)
    mob2.position.set(60, 70)

    area.update()

    expect(beacon.neighbors.has(mob1)).toBe(true)
    expect(beacon.neighbors.has(mob2)).toBe(true)
    expect(beacon.neighbors.has(mob3)).toBe(false)

    expect(mob1.neighbors.has(beacon)).toBe(true)
    expect(mob2.neighbors.has(beacon)).toBe(false)
  })
})
