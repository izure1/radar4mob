import EventEmitter from 'eventemitter3'
import TypedEmitter from 'typed-emitter'

import { Area } from './Area'
import { Position } from './Position'

type MobEvent = {
  'in': (mob: Mob) => void
  'out': (mob: Mob) => void
}

export class Mob {
  readonly id: string
  readonly position: Position
  readonly emitter: TypedEmitter<MobEvent>
  readonly neighbors = new Set<Mob>()
  private __thresholdRadius: number
  protected readonly area: Area

  constructor(id: string, thresholdRadius: number, area: Area) {
    this.id = id
    this.area = area
    this.position = new Position(area, this)
    this.emitter = new EventEmitter() as TypedEmitter<MobEvent>
    this.__thresholdRadius = thresholdRadius

    this.__setDirty()
  }

  get thresholdRadius(): number {
    return this.__thresholdRadius
  }

  set thresholdRadius(v: number) {
    this.__thresholdRadius = v
    this.area.dirties.add(this)
  }

  private __setDirty(): void {
    this.area.dirties.add(this)
  }

  /**
   * It is same as `area.removeMob(mob.id)`
   */
  destroy(): void {
    this.neighbors.clear()
    this.area.dirties.delete(this)
    this.area.mobs.delete(this.id)
    this.area.mobs.forEach((mob) => {
      const isExists = mob.neighbors.delete(this)
      if (isExists) {
        mob.emitter.emit('out', this)
      }
    })
  }
}