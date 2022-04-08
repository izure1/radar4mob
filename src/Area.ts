import { Mob } from './Mob'
import { Position } from './Position'

export class Area {
  readonly mobs = new Map<string, Mob>()
  readonly dirties = new Set<Mob>()

  addMob(id: string, thresholdRadius: number): Mob {
    const alreadyExists = this.getMob(id)
    if (alreadyExists) {
      return alreadyExists
    }

    const mob = new Mob(id, thresholdRadius, this)
    this.mobs.set(mob.id, mob)
    return mob
  }

  getMob(id: string): Mob|null {
    return this.mobs.get(id) ?? null
  }

  removeMob(id: string): boolean {
    const mob = this.getMob(id)
    if (mob) {
      mob.destroy()
    }
    return !!mob
  }

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

  destroy(): void {
    this.mobs.forEach((mob) => mob.destroy())
    this.mobs.clear()
    this.dirties.clear()
  }
}