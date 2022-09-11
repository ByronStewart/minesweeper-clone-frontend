# Modern Minesweeper

This project is a react version of the classic minesweeper game.
You can play it live at https://byronstewart.github.io/minesweeper-clone-frontend/

The project was built as an experiment to see how I could push my knowledge of React to the limit.

The entire game is declaratively rendered using React in Typescript.
The internal state of the game is saved using a Redux store to isolate it from the component tree.
The game is backed by an API to save highscores.
Auth is implemented using react hooks and context using JWT's.
Scores are saved automatically on win.
Gamestate is preserved across page changes.

All features you would expect from a Minesweeper game are present:

- including a game timer, remaining mine tracker
- revelation of undiscovered mines on a game loss
- indication of false flags.
- mulitple game modes
