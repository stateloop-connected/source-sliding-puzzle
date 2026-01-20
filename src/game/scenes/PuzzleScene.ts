import Phaser from 'phaser'
import { Board } from '../objects/Board'

export class PuzzleScene extends Phaser.Scene {
  constructor() {
    super('PuzzleScene')
  }

  create() {
    this.add.text(180, 40, 'Sliding Puzzle 3x3', {
        fontSize: '28px',
        color: '#ffffff'
      }).setOrigin(0.5)
  
      new Board(this)
  }
}
