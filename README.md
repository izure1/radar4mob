# radar4mob

Detects and emits an event when the position of an mob with coordinates changes.

```javascript
import { Area, Mob } from 'radar4mob'

const area = new Area

class SomeGameObject {
  mob: Mob

  constructor() {
    ...
    this.mob = area.addMob('objects-unique-id', threshold)
  }
}

const obj = new SomeGameObject

obj.mob.position.set(x, y, z, w)
obj.mob
  .on('in', (mob) => {
    console.log(`The object ${mob.id} came into your threshold radius.`)
  })
  .on('out', (mob) => {
    console.log(`The object ${mob.id} is out of your threshold radius.`)
  })

const onSceneUpdate = () => {
  // When this function is called, an 'in', 'out' event emits according to the coordinates of the mob.
  area.update()
}

const onSceneDestroy = () => {
  // Destroys all mob when scene destroyed.
  area.destroy()
}

// game update
setInterval(onFrameUpdate, 60 / 1000)
```

## Install

```bash
npm i radar4mob
```

## How to use

### Node.js

```javascript
import { Area, Mob } from 'radar4mob'
```

### Browser (umd)

```html
<script src="https://cdn.jsdelivr.net/npm/radar4mob@latest/dist/umd/index.min.js"></script>
```

### Browser (esm)

```html
<script src="https://cdn.jsdelivr.net/npm/radar4mob@latest/dist/esm/index.min.js"></script>
```

## API

### `Area`

#### *addMob(id: `string`, thresholdRadius: `number`)*: `Mob`

Create a new mobility object. You can use `mob.id` property for `getMob` or `removeMob` method.

#### *getMob(id: `string`)*: `Mob|null`

Get a added mobility object from area instance. If object not exists, It will be returns `null`.

#### *removeMob(id: `string`)*: `boolean`

Remove a added mobility. If object exists, returns `true`. otherwise, returns `false`.

#### *update()*: `void`

When this function is called, an 'in', 'out' event emits according to the coordinates of the mob.

#### *destroy()*: `void`

Destroys all mobs. It will be calls garbage collect.

### `Mob`

#### (property) *thresholdRadius*: `number`

You can set threshold of mob.

```javascript
const mob = area.addMob('test-mob')
mob.thresholdRadius = 10
```

#### (property) *position*: `Position`

You can set position of mob.

```javascript
const mob = area.addMob('test-mob')

mob.position.set(x, y, z, w)
// or
mob.position.x = 10
```

#### *destroy()*: `void`

Destroy a mob instance. A area instance will drops mob instance too.
