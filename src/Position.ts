import { Area } from './Area'
import { Mob } from './Mob'


export class Position {
  private readonly __area: Area
  private readonly __mob: Mob
  private __x = 0
  private __y = 0
  private __z = 0
  private __w = 0

  static GetDistance(a: Position, b: Position): number {
    const x = Math.abs(a.__x) - Math.abs(b.__x)
    const y = Math.abs(a.__y) - Math.abs(b.__y)
    const z = Math.abs(a.__z) - Math.abs(b.__z)
    const w = Math.abs(a.__w) - Math.abs(b.__w)
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) + Math.pow(w, 2))
  }

  constructor(area: Area, mob: Mob) {
    this.__area = area
    this.__mob = mob
  }

  get x(): number {
    return this.__x
  }

  get y(): number {
    return this.__y
  }

  get z(): number {
    return this.__z
  }

  get w(): number {
    return this.__w
  }

  set x(v: number) {
    this.__x = v
    this.__area.dirties.add(this.__mob)
  }

  set y(v: number) {
    this.__y = v
    this.__area.dirties.add(this.__mob)
  }

  set z(v: number) {
    this.__z = v
    this.__area.dirties.add(this.__mob)
  }

  set w(v: number) {
    this.__w = v
    this.__area.dirties.add(this.__mob)
  }

  set(x: number, y = 0, z = 0, w = 0): this {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
    return this
  }
}