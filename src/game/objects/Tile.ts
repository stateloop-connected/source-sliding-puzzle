import Phaser from 'phaser'

export class Tile extends Phaser.GameObjects.Container {
  value: number
  row: number
  col: number
  size: number
  bg: Phaser.GameObjects.Rectangle
  label: Phaser.GameObjects.Text

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    size: number,
    value: number,
    row: number,
    col: number
  ) {
    super(scene, x, y)

    this.value = value
    this.row = row
    this.col = col
    this.size = size

    this.bg = scene.add.rectangle(0, 0, size, size, 0x4f46e5)
    this.bg.setStrokeStyle(2, 0xffffff)

    this.label = scene.add.text(0, 0, value.toString(), {
      fontSize: '32px',
      color: '#ffffff'
    })
    this.label.setOrigin(0.5)

    this.add([this.bg, this.label])

    this.setSize(size, size)
    this.setInteractive()

    scene.add.existing(this)
  }

  moveTo(x: number, y: number) {
    this.scene.tweens.add({
      targets: this,
      x,
      y,
      duration: 150,
      ease: 'Power2'
    })
  }
}
