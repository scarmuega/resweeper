# resweeper

## Demo

http://resweeper.s3-website-us-east-1.amazonaws.com/

Instructions:

* left-click to disclose the cell.
* right-click to flag the cell (clicking again toggles the value)

## Design Decisions

* use CRA to scaffold the project (pretty obvious why)
* be very strict regarding inmutable data, to avoid the root of all evils (shared mutable state)
* use CSS-in-JS because it's easier for small-size projects
* use Font-Awesome instead of images to make it resolution-agnostic

## Goals Completed (AFAIK):

* When a cell with no adjacent mines is revealed, all adjacent squares will be revealed (and repeat)
* Ability to 'flag' a cell with a question mark or red flag
* Alert when game is over
* Time tracking
* Ability to select the game parameters: number of rows, columns, and mines
* Nice user experience (eg avoid page reload while playing)

NOTE: regarding persistence, didn't get there, but I was careful to leave all relevant game-state as a serializable object. Would be pretty straightfoward to implement a local-storage solution.

## Time spent

Coding time was roughly *6 hours*. Tried to stay below the 5 hours bound, but got carried away trying to give it that vintage look of the original game.