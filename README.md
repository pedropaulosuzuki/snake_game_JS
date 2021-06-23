# Snake game made in HTML, CSS and JS!

I made this game to test an event-driven UI model which could be used on other GUI applications in the future.

## Events folder

Inside the **events** folder, there is the **EventHandler** class, which implements the **observer pattern** for custom (non-HTML) events, which are mostly used for UI and game logic message passing.

## Graphics folder

Inside the graphics folder, we can see three classes: a **Header** class, a **Footer** class and a **Display** class. The display class is the most important, which receives all the events inside an update method, which simply uses some if statements to check which event has been received. This could be refactored into an per-function update subscription, instead of a single monolythic function, but that is not implemented here.

The UI is responsive and supports both light and dark themes, according to the global browser theme.

## Game folder

Inside the game folder there is all the game logic, which is pretty simple. It includes keyboard events, which should be separated into its own class and communicate with the game through message-passing, but it works as a single monolythic game class for now. Some features include queueing up commands per frame and a promise-based sleep method inside an async loop, meant to avoid callback hell on recursive setTimeout calls, which was needed to garantee a minimum time between frames, which could not be garanteed with a regular setInterval. Fortunately the async sleep method solves all of those issues without causing major overhead.

## How to play

Just press [Enter] to start a new game. You can use the arrow keys to move and the [Space] key to pause and unpause. Enjoy the game at <https://pedropaulosuzuki.github.io/snake_game_JS>!

This software is licensed under the [MIT License](https://github.com/pedropaulosuzuki/snake_game_JS/blob/main/LICENSE).