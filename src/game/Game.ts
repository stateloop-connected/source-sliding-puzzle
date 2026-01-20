import Phaser from 'phaser'
import { PuzzleScene } from './scenes/PuzzleScene'

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  backgroundColor: '#1e1e1e',
  parent: 'app',
  scene: [PuzzleScene]
}

export class Game extends Phaser.Game {
  constructor() {
    super(config)
  }
}
