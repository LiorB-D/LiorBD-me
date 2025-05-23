const GENERATING_TIKTOK_SLOP = `

This past week I scratched my "I could probably build that" itch and built something a bit heinous: A fully automated script to generate AI tiktok slop:
<div class="flex w-full justify-between mt-4">
<video style="height: 480px;" class="post video-post" id="video-element" poster="//i.imgur.com/5u8HMNKh.jpg" preload="auto" muted="muted" webkit-playsinline="" controls="" style="width: 480px; height: 840px;"><source type="video/mp4" src="//i.imgur.com/5u8HMNK.mp4"></video>
<video style="height: 480px;" class="post video-post" id="video-element" poster="//i.imgur.com/9CtD2lO.jpg" preload="auto" muted="muted" webkit-playsinline="" controls="" style="width: 480px; height: 840px;"><source type="video/mp4" src="//i.imgur.com/9CtD2lO.mp4"></video>
</div>

I built this for 2 reasons:
1) I wanted to see if I could
2) I wanted a good project to get more comfortable writing bash scripts

You can view the full repo [here](https://github.com/LiorB-D/TiktokSlopGenerator) 
### The Scripts

The flow is composed of 7 core scripts. I highly recommend running each step seperately and verifying the output. The steps are:

1. Generate Script
2. Generate Images
3. Generate Audio
4. Apply Ken Burns Affect to Images
5. Concatenate Clips
6. Add audio to video

To run the CLI, run \`slop.sh\`. The first time you run it, it will check for and if neccesary install \`JQ\`, a Bash JSON parser.

The output of each step will be in the \`./assets\` folder.

**1. Script Generation**

This script asks you for the topic that you want to make a video on. It uses GPT-4o to write a json output to a file named \`transcript.json\`. The json will be of the form:

\`\`\`json
{
  "lines": [
    {
      "text": "The Election of 1800 was intense and historic.",
      "image": "American flag from 1800"
    },
    {
      "text": "John Adams, the incumbent, faced Thomas Jefferson.",
      "image": "Portrait of John Adams"
    },
    {
      "text": "Jefferson and Aaron Burr tied in the Electoral College.",
      "image": "Jefferson and Aaron Burr arguing on a presidential debate stage"
    },
    {
      "text": "The House of Representatives cast 36 ballots.",
      "image": "Interior of the House of Representatives. Representatives are voting and arguing."
    }
  ]
}
\`\`\`

The \`text\` is what will be used for the TTS, while the \`image\` field will be used to generate the image.

**2. Generate Images**

The images are generated using DALLE-3 in \`1024x1792\`. As of 12/24/24, it costs $0.08 per image.

Images are saved to the \`assets/images\` folder, named \`IMG_x.jpg\` where x is its index in the list of clips

**3. Generate Audio**

This step supports both ElevenLabs and OpenAI's TTS models. In my opinion, Eleven Labs are much higher quality, but you may prefer to keep all your AI bills to one vendor.

The text fields in the transcript are concatenated to form the transcript.

Audio is saved to \`assets/audio.mp3\`

**4. Apply Ken Burns**

This step generated a clip from each image using the Ken Burns effect (Zooming into a certain corner). Warning: The ffmpeg commands are pretty messy.

Clips are saved to \`assets/clips_nocap/VID_x.mp4\`

This step then uses ffmpeg's \`drawfilter\` to add captions to each clips based on the transcript. The font for the captions is read from \`assets/font.ttf\`. You may want to play with the font color and border.

The final result is saved to \`assets/clips/VID_x.mp4\`

**5. Concatenate Clips**

This step uses ffmpeg to concatenate the clips into a singular video. The video is saved as \`assets/vidWithoutAudio.mp4\`

**6. Add Audio**

Finally, we use ffmpeg to slow down (or speed up) the video to the length of the audio, and combine the two into \`finalVid.mp4\`




`;

export default GENERATING_TIKTOK_SLOP;
