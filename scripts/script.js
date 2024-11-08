const shareBtn = document.getElementById("share-btn"); //get share button by id
const bubble = document.getElementById("share-bubble"); //get share bubble by id
const userSection = document.getElementById("user-section"); //get div element that contains user avatar, name and date by id
const card = document.getElementById("card"); //get component card by id
const path = document.getElementsByTagName("path")[0]; //get svg path element by tag name
let cardWidth = card.offsetWidth; //get initial size of card. 
let screenWidth = window.innerWidth; // get initial size of screen width

let bubbleVisible = false; //initially share bubble is not visible. this will be used to hide or show user avatar and name conditionally


// An observer needed to get the width of the card and set share bubble width to fill the width of the card on a mobile device
new ResizeObserver(() => {
  cardWidth = card.offsetWidth;
}).observe(card);

// listen to document click to hide share bubble 
document.addEventListener("click", (evt) => {
  let targetElement = evt.target;
    //Share bubble will be hidden if user clicks outside of the share bubble or share button
  if (targetElement != bubble && targetElement != shareBtn) {
    bubble.setAttribute("style", "display: none;");
    shareBtn.setAttribute("style", "background-color: #ecf2f8;"); //reset share button background color to original color
    path.setAttribute("style", "fill: #6E8098;"); //reset share button background color to original color
    userSection.setAttribute("style", "opacity: 1"); //user avatar name and date will be visible when the bubble is no longer visible.
    bubbleVisible = false; 
  }
});

// listen to share button click to show the share bubble 
shareBtn.onclick = function () {
  bubble.setAttribute("style", "display: flex;");
  this.setAttribute("style", "background-color: #6d7f97;"); //change the share button background color to active state color
  path.setAttribute("style", "fill: white;"); // change arrow icon color to active state color 
  bubbleVisible = true;
  if (screenWidth <= 640) { 
    bubble.style["width"] = `${cardWidth + 5}px`; // if screen size is mobile size the bubble will fill card horizontal space
    userSection.setAttribute("style", "opacity: 0"); // and if screen is mobile sized the user section will be hidden
  } else {
    bubble.style["width"] = "200px"; //if screen size is not mobile sized the bubble width will be 200px
    userSection.setAttribute("style", "opacity: 1"); // unlike mobile screen the user section won't be hidden
  }
};

// listen window screen size change, so we can adjust bubble width to fill card horizontal space
window.addEventListener(
  "resize",
  (e) => {
    screenWidth = e.target.outerWidth;
    if (screenWidth <= 640 && bubbleVisible) {
      bubble.style["width"] = `${cardWidth + 5}px`;
      userSection.setAttribute("style", "opacity: 0");
    } else {
        bubble.style["width"] = "200px";
        userSection.setAttribute("style", "opacity: 1");
    }
  },
  true
);
