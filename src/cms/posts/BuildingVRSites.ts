const BUILDING_VR_WEBSITES = `

![0_wvQKeBpJSX_OnHBG.gif](https://i.imgur.com/FOJt0t6.gif)

Now the web might not be the first thing you think of when you think about virtual reality. In reality, however, the web is one of the few truly cross platform technologies that exist.

Building a VR app once with Javascript will allow it to run on virtually any VR system.

## **What Are The Relevant Technologies?**

First, we are going to be taking advantage of [Aframe.io](https://aframe.io/), a library for building and rendering VR scenes with some simple HTML and Javascript. Additionally, you may decide to use Three.js for more complex graphics. Aframe.io includes support for the Three.js API.

Next, we are going to be taking advantage of WebXR, a library originally developed by Mozilla that allows you to interact with VR devices directly from the web. Additionally, I’m going to show you how you can test your apps without a VR device using a WebXR API extension.

## **Getting Started With AFrame.io**

To gain access to Aframe.io, just add the following script via CDN:

\`<script src=”https://aframe.io/releases/1.2.0/aframe.min.js"></script>\`

We can then create a simple scene with the following html:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-sphere id = "ball" position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
\`\`\`

![Untitled](https://i.imgur.com/b4pajsG.png)

Now the key piece to notice here is that we surround our VR scene with the \`<a-scene> tag. We can then insert various shapes into our scene by including the relevant tag.

You can find a full list of a-frame tags, as well as the full A-Frame docs here:

https://aframe.io/docs/1.2.0/introduction/

You’ll notice that while you can drag the screen to move the camera, you can’t yet actually use a VR device. This is because the html file has to be served, it can’t be run off a static file.

This can be done fairly easily with nodeJS. Simply setup an npm project with the following javascript file:

\`\`\html
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('PUT THE NAME OF YOUR HTML FILE HERE').pipe(res)
})

server.listen(process.env.PORT || 3000)
\`\`\

Finally, we can get a little fancier, and manipulate our scene with Javascript like so:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-sphere id = "ball" position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
    
    <script>
      let sceneEl = document.querySelector('a-scene');
      let dBalls = [] // Array of the balls we are about to create
      let orbitalRadius = 1.2
      let cycle = 0 // Track angular revolution of balls
      for(let i = 0; i < 7; i++) {
        let db = document.createElement('a-sphere');
        let ang = i * 2 * 3.14159 / (7) // Calculate angular position of the ball
        // Use entity.setAttribute to change a certain value
        db.setAttribute('geometry', {
          radius: 0.2
        })
        // Some nice trig to get the ball in the right position
        db.setAttribute('position', {
          x: orbitalRadius * Math.cos(ang), 
          y: 0.5, 
          z: orbitalRadius * Math.sin(ang) - 4
        })
        
        db.setAttribute('material', {
          color: 'orange'
        })

        sceneEl.appendChild(db) // Add the ball to the scene
        dBalls.push(db) // Add the ball to our array of balls for later access
      }

      let ball = sceneEl.querySelector('#ball') // Grab the red ball that we created in HTML

      let rad = 0.1 // Radius of the ball
      let sign = 1 // Stores whether the ball is currently growing or shrinking
      let timer = setInterval(() => {
        rad += (0.005 * sign) // Either increase or decrease the radius of the ball

        ball.setAttribute('geometry', {
          radius: rad
        })
        
        // If radius is above/below threshold then flip sign
        if(rad >= 1.2 || rad <= 0.1) {
          sign *= -1
        }
        
        // Rotate the dragon balls
        dBalls.forEach((d, ind) => {
          let ang = cycle + (ind * 2 * 3.14159 / (7))
          d.setAttribute('position', {
            x: orbitalRadius * Math.cos(ang), 
            y: 0.5, 
            z: orbitalRadius * Math.sin(ang) - 4
          })
        });
        cycle += 0.01
      }, 50)
    </script>
  </body>
</html>
\`\`\`

And there you have it! We successfully created an animated VR scene with less than 100 lines of code!

![0_crnfjZhugmzqpVqZ.gif](https://i.imgur.com/EGHC5fm.gif)

## **Testing it with the WebXR API**

Now if you’re anything like me and haven’t shelled out for a VR headset yet, don’t worrry. You can test out your VR website in either Chrome or Firefox using the WebXR API. Just install the following extension:

For Firefox: [https://addons.mozilla.org/en-US/firefox/addon/webxr-api-emulator/](https://addons.mozilla.org/en-US/firefox/addon/webxr-api-emulator/)

For Chrome: [https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=en](https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=en)

Once installed, you can head to the WebXR tab when inspecting the page, and play with an emulated headset!

![0_wvQKeBpJSX_OnHBG.gif](https://i.imgur.com/FOJt0t6.gif)

*This Article was originally written for the Codesphere Blog*
`;

export default BUILDING_VR_WEBSITES;
