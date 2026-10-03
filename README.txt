KEMJUUKI'S BIRTHDAY WEBSITE — QUICK EDIT GUIDE
================================================

HOW TO OPEN
1. Double-click index.html.
2. Enter password: 0418
3. For a public share link, upload the whole folder to Netlify Drop, GitHub Pages, or any static host.

ADD YOUR PHOTOS
1. Create a folder named "photos" beside index.html.
2. Put your images inside it and name them photo1.jpg, photo2.jpg, etc.
3. In index.html, find: <div class="photo-slot"><span>PHOTO 01</span></div>
4. Replace it with: <img class="photo-slot" src="photos/photo1.jpg" alt="Describe this memory">
5. Repeat for PHOTO 02–04. The large hero “favourite photo” is already filled with photos/favorite-rani.jpeg. Replace that file with another image using the same filename whenever you want.
Tip: landscape and portrait photos both work. Add this text inside style.css if needed:
.photo-slot { width:100%; object-fit:cover; }

WRITE YOUR LETTER
Open index.html in Notepad / VS Code. Search for "Write your paragraph here later" and replace that sentence with your paragraph. You can use <br><br> for a paragraph break.

CHANGE CAPTIONS
Search for captions such as "The one that started it all" and "Add a date or tiny caption" and replace them.

CHANGE THE PASSWORD
Open script.js and replace '0418' with another four-digit code.
Note: this is a cute client-side lock, not bank-level security. Anyone who reads script.js can find the code.

PERSONALISE THE GIFTS
Open index.html and search for data-message=. Change the sentence inside the quotes for each gift.

PUBLISH FREE WITH NETLIFY DROP
1. Go to https://app.netlify.com/drop
2. Drag the entire birthday-site folder onto the page.
3. Netlify gives you a shareable link. Test it on your phone before sending.

FILES
index.html — words and sections
style.css — colours and layout
script.js — password and interactions
README.txt — this guide

COUPLE ARCADE
The Games section includes: Memory Match, Love Decoder, This or That date builder, and Catch My Hearts. Winning all four unlocks a screenshot-ready “one wish, no questions asked” coupon. Game text and prompts can be edited near the bottom of index.html and script.js.
