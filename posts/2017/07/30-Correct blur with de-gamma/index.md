I saw a video by [minutephysics] showing how the "blur" operation in almost all softwares is _broken_ and it is all connected to how humans percieve color and how the RGB color values stored in digital media are not the same as the recorded values.

<Insert
	type="iframe"
	title="Computer Color is Broken - minutephysics"
	src="https://www.youtube.com/embed/LKnqECcg6Gw?rel=0"
	allow="autoplay;encrypted-media"
	allowfullscreen
/>

According to the [Weber–Fechner law] humans perceive brightness logarithmically over a moderate range but more like a power-law over a wider range. A grayscale image with color `RGB(0.5, 0.5, 0.5)` appears halfway between black and white but it is only 22% bright and `RGB(0.25, 0.25, 0.25)` appears a quarter between black and white is only 5% bright.

<Insert type="image" src="images/rgb.jpg" alt="Human vision is non-linear">

Since we are bad at noticing tiny discrepancies in the brighter regions of the image, we can trade image accuracy for file size by storing the image data as the square-root of the original value. When an image is displayed on the screen, the compressed values are squared-up to give the correct-_ish_ colors.

<Insert type="image" src="images/process.png" alt="Non-linear image storage" />

Image blurring is done by replacing every pixel in an image with the average of its neighboring pixels.

<Insert type="image" src="images/blur.png" alt="Box blur is simple average of neighboring pixels" />

To get a correct blur, the average must be performed on the original values of the neighboring pixels. The resulting pixels must then be square-rooted

<Insert type="image" src="images/blur-correct.png" alt="Correct blurring" />

Unfortunately, most software applications do the transformation on the square-rooted values and yield a much darker result.

<Insert type="image" src="images/blur-incorrect.png" alt="Incorrect blurring" />

Try out the the <a post href="demo">Correct Blur demo</a> to see what a correct blur looks like.

[minutephysics]: https://www.youtube.com/user/minutephysics
[weber–fechner law]: https://wikipedia.org/wiki/Weber–Fechner_law#Vision
[1]: /20170730-correct-blur-with-de-gamma/demo/
