Scopely frontend challenge Server
=================================

This is a small node js server based on [expressjs](https://expressjs.com/), that
acts as backend for the Scopely frontend challenge.

It has been tested to work on node version 10.14.2.

These are the steps to follow to serve content as described:
1. Install dependencies with `npm install`.
2. Generate a list of matches. This is done running `npm run generate`.
3. Run the webserver. This can be accomplished running `npm start`

Candidate's Note (Adhir's Note)
=================================
1. I have 2 different implementations of the ELO rating algorithm here, mine
at src/util/MyELOAlg and another at src/utils/EloMatch, which I found here
(https://github.com/FigBug/Multiplayer-ELO) and slightly extended. I used
the other implementation (instead of mine) because it seemed to have more unique
player ratings.
