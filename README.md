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
1. There are 2 different implementations of the ELO rating algorithm here, mine
at src/util/MyELOAlg and another at src/utils/EloMatch, which I found here
(https://github.com/FigBug/Multiplayer-ELO) and slightly extended. I used
the other implementation (instead of mine) because it seemed to have more unique
player ratings.

2. I had to skip some snapshot tests because Material-ui generates classes using
class-counters (for them be to unique) and this breaks the snapshot which was rendered
with different class counters. Here is the link to one such issue:
https://github.com/mui-org/material-ui/issues/9492

3. Added some screenshots in /screenshots with markup to explain the functionality

4. At first my bundle size was 16 mb (in dev mode). The App would take 1-2 seconds to load with a high speed internet connection (200 MBps+); I spent some time on optimizing the bundle size first, by using the webpack-bundle-analyzer to visualize the library sizes, then fixing import statements and finally learning about webpack and babel configuration options. I've got the bundle size to approximately ~ 2.5 mb. Surely, if one could learn more, it can be further reduced.

5. Issues:
  a) Chart x-axis (bottom axis) is not responsive enough - implementing some logic to
  have a certain number of ticks (time points on x axis) gave strange results. 
  b) Lots of unit tests still need to be implemented
  