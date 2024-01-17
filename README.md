# Strikr
Strikr / Strikr.gg was a stat & leaderboard tracking APP for the [OmegaStrikers](https://store.steampowered.com/app/1869590/Omega_Strikers/) game from [Odyssey Interactive](https://www.odysseyinteractive.gg/)

This repository contains code for the front-end of the Desktop Companion App, which tracked match status and awakenings<br />
And the default front-end for the website App, which displayed information available through the StrikrAPI

### Strikr API
The [Strikr API](https://github.com/Strikr-gg/strikr) cannot be made public since it's a reverse engineering effort.<br />
I have signed an NDA with Odyssey interactive and cannot disclose non-public informations about the game, how it works and where it's going.


# Running Strikr
Strikr is made entirely in typescript with React via the para-framework: NextJS.<br/>
No component library was used, but instead, every commponent is built with TailwindCSS ~~trying to~~ following [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/)
```
# Using yarn on this example, but you can replace this with your preferred package manager

# Install dependencies, equivalent on NPM would be `npm i`
yarn

# Runs the website is developer mode
yarn dev

# Builds the website
yarn build

# Runs the website in production mode
yarn start
```
