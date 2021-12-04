# Advent Gifmas 📆

This project is a web-based, Christmas Advent calendar that gives the recipient a different `gif` for each of the 24 lead-up days to Christmas. The calendar was made with [React](https://github.com/facebook/create-react-app).

## Usage

The current gifs that have been selected are very much personal jokes based on the media consumed by my partner and I in 2020, however there is no reason that these cannot be swapped out for other gifs/images! If you DO want to do this, take a look at the [lessons learnt](https://github.com/Johoseph/advent-gifmas#lessons-learnt) section of this README that goes into more details about the good and bad of this project.

After installing (`yarn install`) and running (`yarn dev`) this repo, the following will need to be updated to 're-personalise' the calendar:

1. [`Welcome.jsx`](https://github.com/Johoseph/advent-gifmas/blob/master/src/components/Welcome.jsx) - this component is an overlay that shows when a user enters the web application at the start of a new session. Here you can update the name of the recipient and the year the calendar will be used. You will also need to replace images `Home1.png` ➡ `Home6.png` in the [`assets`](https://github.com/Johoseph/advent-gifmas/tree/master/src/assets) directory - two of these images are randomly selected and shown on the overlay each time the component renders.
2. [`index.html`](https://github.com/Johoseph/advent-gifmas/blob/master/public/index.html) - similar to above, you will need to update the references to the recipient/year to re-personalise the calendar.
3. [`Days.js`](https://github.com/Johoseph/advent-gifmas/blob/master/src/components/Days.js) - this file contains the configuration details for each day of the calendar. The configuration includes the following:

   | Config Key | Purpose                                                                                                                                             |
   | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
   | day        | The day of the month that this item is to be received                                                                                               |
   | title      | Some title text to be shown for that day                                                                                                            |
   | content    | A further explanation/elaboration of the title text                                                                                                 |
   | gif        | A variable reference to a gif/image file within the [`assets/gif`](https://github.com/Johoseph/advent-gifmas/tree/master/src/assets/gifs) directory |

4. [`helpers.js`](https://github.com/Johoseph/advent-gifmas/blob/master/src/util/helpers.js) - The exported method `dateChecker` references December 2020 (`.../12/2020`). Update this month/year to whatever month/year is desired.

As mentioned above, replace the existing gifs in the `gif` directory with the ones you have chosen!

And voila! You now have a personalised Advent calendar that can be shared with a family member, friend or loved one. I hope they like it 😁

## Lessons Learnt 📚

For context, this README has been written a full year after this project was completed. I have just finished developing the successor to this Advent Calendar ([Cosmic Flick Seekers](https://github.com/Johoseph/cosmic-flick-seekers); this is an even COOLER project, you should check it out 😎) and thought that it would be a good exercise to revisit this one, reflecting on what was done well (the good) and what could be improved upon (the bad).

### The Good 🐱‍🏍

- **React Spring usage** - This was my first time using the [`react-spring`](https://react-spring.io/) library and I think it is really useful. The flexibility provided by the `interpolate` method was fundamental in animating the opening/closing of each calendar door - nesting interpolates to further animate specific CSS Transform properties was even better. Check out how I used this in [`AdventCard.jsx`](https://github.com/Johoseph/advent-gifmas/blob/master/src/components/AdventCard.jsx#L108) for more insight.

  react-spring was also used to animate the snow falling in the background - this time taking advantage of the `useTransition` hook (snow generator written in the [`AdventBody.jsx`](https://github.com/Johoseph/advent-gifmas/blob/master/src/components/AdventBody.jsx#L125) component).

- **Mobile Compatibility** - It works on mobile? It truly is a Christmas miracle 🎄 When on mobile, the calendar will flip from its 6 x 4 grid to a 1-wide scrolling list. The calendar will also re-order to allow for quick user to the most relevant day (i.e. on the 5th of December the door marked '5' would be first, followed by the door marked '4', etc.).

### The Bad 🤢

- **Asset sizes and importing** - Taking a quick look at the size of the assets directory would alarm any front-end dev, especially those who frequent [bundlephobia](https://bundlephobia.com/) (AKA current me 🤦‍♂️). What's even worse is that these assets are required for import when the app first loads rather than on demand - meaning users would need to download over **50mb** of just assets to use the calendar.

  A great update to this project would be to refactor the way these gifs are imported - using something like the webpack [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext) method would work beautifully here to enable on demand/dynamic importing of each gif, only when a user clicks on that specific day of the calendar.

  Keep in mind that the above is only a problem when deploying this app to the web - if you are only planning on building/serving your calendar locally you won't run into any issues.

- **Duplicate functions and code** - This one is self-explanatory, these duplicate functions/code should be consolidated in one location to avoid the challenge of updating code in all these locations if a change was needing to be made.
