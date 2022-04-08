import { Mob } from './Mob'
import { Position } from './Position'

export class Area {
  readonly mobs = new Map<string, Mob>()
  readonly dirties = new Set<Mob>()

  /**
   * Create a new mobility object. You can use `mob.id` property for `getMob` or `removeMob` method.
   * @param id Mobility identifier. If same id is already exists, it will be not create mob and returns exists one.
   * @param thresholdRadius Sight of mob.
   */
  addMob(id: string, thresholdRadius: number): Mob {
    const alreadyExists = this.getMob(id)
    if (alreadyExists) {
      return alreadyExists
    }

    const mob = new Mob(id, thresholdRadius, this)
    this.mobs.set(mob.id, mob)
    return mob
  }

  /**
   * Get a added mobility object from area instance. If object not exists, It will be returns `null`.
   * @param id Mobility identifier what you want find.
   */
  getMob(id: string): Mob|null {
    return this.mobs.get(id) ?? null
  }

  /**
   * Remove a added mobility. If object exists, returns `true`. otherwise, returns `false`.
   * @param id Mobility identifier what you want remove.
   */
  removeMob(id: string): boolean {
    const mob = this.getMob(id)
    if (mob) {
      mob.destroy()
    }
    return !!mob
  }

  /**
   * When this function is called, an 'in', 'out' event emits according to the coordinates of the mob.
   */
  update(): void {
    for (const dirty of this.dirties) {
      for (const current of this.mobs.values()) {
        if (current === dirty) {
          continue
        }
        
        const isNeighbor = dirty.neighbors.has(current)
        const threshold = dirty.thresholdRadius
        const distance = Position.GetDistance(dirty.position, current.position)

        if (isNeighbor && threshold < distance) {
          dirty.emit('out', current)
          dirty.neighbors.delete(current)
        }
        else if (!isNeighbor && threshold > distance) {
          dirty.emit('in', current)
          dirty.neighbors.add(current)
        }
      }
    }
    this.dirties.clear()
  }

  /**
   * Destroys all mob.
   */
  destroy(): void {
    this.mobs.forEach((mob) => mob.destroy())
    this.mobs.clear()
    this.dirties.clear()
  }
}