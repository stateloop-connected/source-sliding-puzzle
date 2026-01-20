import Phaser from 'phaser'
import { Tile } from './Tile'

export class Board {
  scene: Phaser.Scene
  size: number = 3
  tileSize: number = 100
  tiles: (Tile | null)[][] = []

  emptyRow: number = 2
  emptyCol: number = 2

  offsetX: number
  offsetY: number

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    const boardWidth = this.size * this.tileSize
    const boardHeight = this.size * this.tileSize

    this.offsetX = (360 - boardWidth) / 2 + this.tileSize / 2
    this.offsetY = (640 - boardHeight) / 2 + this.tileSize / 2

    this.createBoard()
  }

  createBoard() {
    let value = 1

    for (let row = 0; row < this.size; row++) {
      this.tiles[row] = []

      for (let col = 0; col < this.size; col++) {
        if (row === this.size - 1 && col === this.size - 1) {
          this.tiles[row][col] = null
          continue
        }

        const x = this.getX(col)
        const y = this.getY(row)

        const tile = new Tile(
          this.scene,
          x,
          y,
          this.tileSize - 4,
          value,
          row,
          col
        )

        tile.on('pointerdown', () => {
          this.tryMove(tile)
        })

        this.tiles[row][col] = tile
        value++
      }
    }
  }

  tryMove(tile: Tile) {
    const dr = Math.abs(tile.row - this.emptyRow)
    const dc = Math.abs(tile.col - this.emptyCol)

    const isAdjacent = dr + dc === 1

    if (!isAdjacent) return

    // Posición visual del vacío
    const newX = this.getX(this.emptyCol)
    const newY = this.getY(this.emptyRow)

    // Mover visualmente
    tile.moveTo(newX, newY)

    // Actualizar matriz
    this.tiles[this.emptyRow][this.emptyCol] = tile
    this.tiles[tile.row][tile.col] = null

    // Guardar antigua posición
    const oldRow = tile.row
    const oldCol = tile.col

    // Actualizar tile
    tile.row = this.emptyRow
    tile.col = this.emptyCol

    // Actualizar vacío
    this.emptyRow = oldRow
    this.emptyCol = oldCol
  }

  getX(col: number) {
    return this.offsetX + col * this.tileSize
  }

  getY(row: number) {
    return this.offsetY + row * this.tileSize
  }
}
