# Top Posts of the Week: r/MacOSApps

## Docky is now live!
**Author:** u/kommonno | **Upvotes:** 171 | **Comments:** 41

A little follow-up to my last post here.

Docky is now live.

Thanks to everyone who gave feedback on the earlier post. It helped a lot while finishing things up for the beta!

If you want to check it out: [`getdocky.com`](https://getdocky.com)

Happy to answer questions or hear what you think.

[Join the discord](https://discord.gg/nErggua3Z)

EDIT: Thanks to everyone that posted feedback around trials and onboarding processes. I've since then pushed an update and should be simplified.

---

## I missed WinDirStat on macOS, so I built an open-source: MacDirStat
**Author:** u/qutibah_ | **Upvotes:** 144 | **Comments:** 16

Hey everyone,

If you've ever used Windows, you might know WinDirStat, a lifesaver for visualizing disk space and cleaning up drives.  
I couldn't find a free, open-source equivalent that I really liked on macOS, so I decided to build **MacDirStat**.

Just like the original, it reads your directory tree and presents it in three views to help you figure out exactly what is eating up your storage:

* **The Directory List:** Sorts your files and folders by size.
* **The Treemap:** Represents each file as a colored rectangle proportional to its size, making it instantly obvious where the big files are hiding.
* **The Extension List:** A legend showing statistics about the file types taking up space.

**You can check it out and download it from GitHub here:** 👉 [https://github.com/Ti-03/MacDirStat](https://github.com/Ti-03/MacDirStat)

*Note: It will also be available on the Mac App Store very soon!*

I'd love for you to try it out. Any feedback, bug reports, or GitHub stars are hugely appr...

---

## small update: my mac app now reacts when you plug things in
**Author:** u/SecretMention8994 | **Upvotes:** 96 | **Comments:** 26

been working on my mac app (*Tell*) for a bit now - it turns system stats into these interactive 3D objects on your desktop

just added something new that i didn’t expect to feel this good:

\- plug in an external drive and the drive animation pops up

\- open my earphone case - audio module shows up instantly

it’s a small thing but it makes the whole app feel way more “alive” instead of just sitting there

Having alot of fun designing all the object for the app - this is probably one of those features that sounds pointless until you use it

---

## I built a menu bar app that shames you for having too many tabs open
**Author:** u/thetalhatahir | **Upvotes:** 77 | **Comments:** 40

I tried many tab management apps, in the end i realised that its only shame which stops me from opening another tab.

Supports Chrome, Safari, Firefox, Brave, Edge, Opera. Polls every 10 seconds. 

Six sound packs to choose your preferred method of humiliation.

Set your own tab count threshold before it starts shaming you.

$4.99 one-time license. [tabshame.com](http://tabshame.com)

Video to show you how it works.

---

## Native YouTube Client for MacOS
**Author:** u/FizzyGX | **Upvotes:** 61 | **Comments:** 7

Developed a native YouTube client Native YouTube for macOS Ventura and later, with offline downloads, dynamic themes, and media key support one of my first app let me know what you think 

https://github.com/fizzygx/Youtube-X






---

## FREE CleanShot alternative with all the main features plus more. Including Video Effects Editing
**Author:** u/easysnaps | **Upvotes:** 48 | **Comments:** 33

**Free** CleanShot X alternative for macOS same core feature set, plus a few things CleanShot doesn't do. No subscription, no account, no telemetry.



  **Capture:**

* Region, window, fullscreen,
* scrolling (long pages, Slack threads,terminal logs)
* 13 annotation tools: arrow, rect,circle, text, numbered callouts, pen,highlight, blur, pixelate, line,signature, crop
* Auto-redact: detects emails, phone numbers, SSNs, credit cards, IPs, API keys, and addresses on the image and one-click blurs them
* Beautifier: gradient/solid/mesh backgrounds, padding, corner radius, shadow, border, macOS + browser frames
* OCR, color picker with history, pin-to-screen, floating thumbnail, Quick Actions panel
* Recording + Video Effects Editing , Screen recording with system audio + mic, pause/resume
* Webcam overlay:  circle, rounded, or square; pick a corner and a size
* Auto-zoom on click: drops zoom segments at every click; tweak each one on the timeline (zoom level, duration, hold)
* Cursor effe...

---

## All my paid apps are free for macOS 15 and earlier
**Author:** u/sindresorhus | **Upvotes:** 36 | **Comments:** 6

Every year, I provide builds of my apps for older macOS versions. All my paid apps are available for free for users on macOS 15 and earlier.

These versions do not run on macOS 26.

---

## HideMyData - open source PII redaction app
**Author:** u/blaznos | **Upvotes:** 35 | **Comments:** 8

As a small weekend project I made this macOS app, for personal data redaction from PDFs, images, scanned PDFs.

I think it's pretty niche, you will either find it useful or not at all. I got annoyed with manual redaction, as I need to do a lot for work.

What it does:

* Uses OpenAI 1.5b privacy-filter model for automated redaction of PII data (MLX framework, OpenMed 8bit model).
* Uses regrex for things that I'm quite sure are almost always PII.
* Can handle scans and images with on device Apple Vision OCR framework.
* You can switch between black rectangles and blur. You can manually annotate (add, remove redactions) if needed. Export, see recents.
* When saving, it actually re-encodes the image/pdf, so you can't just select the text underneath the redaction, it's gone.
* Ofc everything is local. Also native app in swift.

For now, I only made it for macOS, works only on 26.0 upwards due to MLX framework.

If you're interested take a look: [Github](https://github.com/Maciejonos/HideM...

---

## Mira - Search files semantically - no exact filenames required.
**Author:** u/BenAhmed23 | **Upvotes:** 30 | **Comments:** 15

I was trying to find something in an old folder the other day and realised I had no idea where it was or what it was called. 

Search is great when you know the keyword. It’s much less helpful when you only remember the idea. 

So I built Mira: a way to search your files in plain English. You point it at a folder, and it makes your files searchable by meaning instead of just keywords.

It uses Gemini’s embedding model, or a local embedding model if you want to keep things on your own machine. 

Install it here - [https://github.com/heidar-an/mira](https://github.com/heidar-an/mira)  
NOTE: Read the README for instructions on installing since I don't have an Apple developer ID.

I'd appreciate a star :)

---

## Just shipped Buffer v1.8.0 — multi-paste + clean clipboard manager (open-source)
**Author:** u/Moist_Tonight_3997 | **Upvotes:** 32 | **Comments:** 20

I built **Buffer** because most clipboard managers still feel… incomplete.

You either get:

* history
* or power features
* but not a smooth workflow

So I’ve been iterating on something faster + cleaner.

🚀 New in v1.8.0 — Multi Paste

You can now:

* select multiple clipboard items
* paste them together in one go

Sounds small, but if you:

* copy from multiple sources
* build prompts / docs / messages

this saves *a lot* of friction.

What Buffer does overall:

* Clean, minimal UI
* Fast clipboard history search
* Auto strip formatting (paste clean text)
* OCR (copy text from images)
* Keyboard-first workflow
* Free &amp; open source

Why this matters (at least for me):

I constantly copy things like:

* code snippets
* links
* prompts + image reference

Earlier → paste one by one 😵  
Now → select → paste once ✅

Still early, would love feedback — especially from heavy clipboard users.

👇 Link in comments

---

## I built a free browser-based tool to create custom macOS folder icons
**Author:** u/Automatic-Bike322 | **Upvotes:** 28 | **Comments:** 17

Hey everyone,

I built **Folder Icon Studio**, a small free web tool to generate custom macOS-style folder icons with your own artwork.

**What it does:**

* Upload any image (album cover, poster, artwork, photo) and it automatically fits it onto a folder shape
* The folder color adapts automatically to the dominant color of your image
* Add a Dymo-style tape label, pick color and opacity, and drag it anywhere on the folder
* Adjustable zoom and rotation for the image
* Output: 1024×1024 PNG, ready to use on macOS

**What it does NOT do:**

* No account, no login required
* No data uploaded to any server — everything runs in the browser
* No watermark

Link: [folder-icon-studio.vercel.app](https://folder-icon-studio.vercel.app/)

Feedback welcome, especially if you have ideas for new folder styles to add.

---

## Sonant — Menu bar music controller for Apple Music &amp; Spotify with live audio visualizer (first 10 free)
**Author:** u/Professional-Air6055 | **Upvotes:** 26 | **Comments:** 36

---

## I wanted a free open-source CleanShot X-style app, so I built one
**Author:** u/OmarVII7 | **Upvotes:** 23 | **Comments:** 10

Hey everyone, I’ve been working on a macOS screenshot app called Shotnix and figured this would be a good place to share it.

The idea is pretty simple: I wanted something in the same general lane as CleanShot X, but free and open source. Not trying to clone it 1:1, just building the screenshot workflow I personally wanted on my Mac.

It sits in the menu bar and does the usual area/window/fullscreen captures, plus annotation, OCR, scrolling capture, pinning, local history, and quick copy/save/edit actions right after capture.

It’s still a beta, so it’s not notarized yet and macOS might show the usual warning on first open. The app itself works locally, doesn’t need an account, and there’s no subscription or paid tier.

Website/download: [https://shotnix.com](https://shotnix.com)  
GitHub: [https://github.com/OMARVII/Shotnix](https://github.com/OMARVII/Shotnix)

Would love to hear what feels useful, what feels missing, or what would make it better for your own Mac setup.

---

## I shipped 5 open-source macOS apps. Here's the Skill I built from everything I kept re-doing.
**Author:** u/bluedoggee | **Upvotes:** 21 | **Comments:** 6

Over the past couple of years I've shipped a few open-source macOS apps:

* AnyDrag — drag-and-drop enhancer
* PastePaw — clipboard manager
* CCSwitcher — Claude Code account switcher
* …and a few more

Every single time I started a new one, I noticed the same thing: finishing the core feature is only half the work.

The other half is the tedious stuff:

* Wiring up XcodeGen / project.yml
* Getting GitHub Actions to actually do code-signing + notarization + DMG + Release without breaking
* Auto-update — Sparkle? Or roll your own GitHub API polling?
* Login items via SMAppService (and getting it right)
* File logging, settings window, accessibility permission prompts, localization, sandbox toggles…

None of it is hard in isolation. But together it eats a week. And every new project I'd basically re-do the same setup from scratch.

What made it worse: letting an AI assistant figure this out from scratch is even slower. It picks deprecated APIs, writes CI configs that build but won't nota...

---

## Sentient OS: your Mac &amp; iPhone understand your entire digital life using a custom on-device LLM, overnight while charging. Talk to your data, get proactive reminders, and explore knowledge graphs. [Free]
**Author:** u/TechExpert2910 | **Upvotes:** 19 | **Comments:** 15

Developer here! :D I've been working on this for nearly a year. Sentient OS is a native Swift app coming to Mac &amp; iPhone that turns your device into a private intelligence layer for your entire digital life.

# Problem:

We all have thousands of buried screenshots, notes, files, and bookmarks we'll never find again. That messy Downloads folder, that overflowing Desktop, those Obsidian vaults and browser bookmarks, your screenshots... all that knowledge, buried forever.

Sentient OS runs a custom vision LLM entirely on your device (while it's plugged in. no data ever leaves your machine!) to understand your entire digital life.

What this unlocks:

**1️⃣ Search your digital life in natural language** ("what was that wine i liked?" / "who was that person I wanted to email?") \[on-device RAG\]

**2️⃣ Proactive reminders:** "That tax return sitting in your downloads folder is due next week!"

**3️⃣ Auto-generated knowledge graphs of your entire digital life:** tap any node to find what...

---

## StyleBop — a native macOS visual editor for CSS files (canvas, tokens, animation timeline, project-wide refactors)
**Author:** u/FlowIll9219 | **Upvotes:** 15 | **Comments:** 16

I'm a designer/dev who got tired of editing CSS by scrolling through 1500-line stylesheets, so I built StyleBop — a native macOS app that opens a folder of .css files and gives you a visual workspace on top of them.

It writes plain CSS to disk (no proprietary format, no lock-in). Open the same folder in VS Code or whatever and your edits round-trip cleanly.

**What's in it:**

* **Rulesets canvas** — every selector becomes a node you can click into. Edit properties with type-safe popovers (color picker, gradient builder, box-shadow stack, cubic-bezier editor, grid template, filter chain).
* **Tokens tab** — your `:root` custom properties and u/font-face families in one place. Each variable has a usage badge that opens a popover listing every file/ruleset that uses it. Click a usage to jump straight to it.
* **Animations tab** — keyframe timeline with draggable stops, live preview running on the canvas, cubic-bezier curve editor.
* **Code tab** — full text view with autocompletion (pro...

---

## A virtual keyboard for launching apps and running shortcuts - Keboard
**Author:** u/Medical_Time1567 | **Upvotes:** 14 | **Comments:** 16

I recently created a macOS app.

Launch apps or Apple shortcuts instantly without remembering complex keyboard shortcuts by binding them to your virtual keyboard.

Suitable for:

1. Quickly launching apps
2. A Launchpad alternative for macOS 26
3. Quickly running shortcuts, such as note-taking.

Any feedback would be greatly appreciated.

**Official Website**  
[https://www.keboard.app](https://www.keboard.app)

**App Store**  
[https://apps.apple.com/us/app/keboard-app-launcher/id6762423830?mt=12](https://apps.apple.com/us/app/keboard-app-launcher/id6762423830?mt=12)

---

## Made a Mac app that captures everything you say onto an old-school vinyl. Local-only
**Author:** u/Narrow-Berry-4469 | **Upvotes:** 11 | **Comments:** 7

Hit **Control-R**. Start talking. Words appear live. Hit it again to stop. Now there's a new vinyl in your library — matte black, hand-set label, ready to play. Click any word in the transcript and the audio jumps there. *Like dragging a needle to a groove.* You can even **click and drag the vinyl itself like a DJ scratch** to scrub through the audio. All of it on your Mac, never uploaded. Local LLM cleans up titles and summaries on-device. Apple Silicon only.

Also does push-to-talk dictation into any text field — same hotkey, same local pipeline.

**2-day free trial → $29 one-time** for the first 500 (then $49, $69). No subscription.

[openear.fyi](https://openear.fyi)

*Honest feedback welcome — fresh public beta.*

---

## Don't want to send your financial info to companies? Private Portfolio
**Author:** u/Traditional-Card6096 | **Upvotes:** 12 | **Comments:** 19

I build stuff for myself and make it available for all. For those who value privacy, I made Private Portfolio, a fully locally encrypted wealth tracker, no servers, no subscription.  
  
I didn't want to send any financial data to some hackable random wealth tracker company. So I made a strongly encrypted local app. There's even a duress password for emergency situations.  
  
More info here : [https://apps.apple.com/ch/app/private-portfolio/id6758008475?l=en-GB&amp;mt=12](https://apps.apple.com/ch/app/private-portfolio/id6758008475?l=en-GB&amp;mt=12)

Try it for free. Cheers

---

## Ghostbar – Native Swift Cluely alternative for macOS. Invisible to screen sharing, Ollama support, no Electron, free.
**Author:** u/Trick-Assignment-828 | **Upvotes:** 12 | **Comments:** 5

Hey r/MacOSApps 👋

I got tired of every "invisible AI" tool being a 200MB Electron app so I built **Ghostbar** — a native Swift macOS menu bar AI that's invisible to screen capture.

**The pitch:** use AI during Zoom calls, interviews, demos — nobody sees it. It uses `NSWindow.sharingType = .none`, a native AppKit API that excludes the window from macOS's display capture pipeline entirely. Tested invisible in Zoom, Teams, Meet, OBS, QuickTime, Cmd+Shift+5.

**Why native Swift matters:**

* \~5MB app vs 150–500MB for Electron alternatives
* Instant startup, no Chromium overhead
* Actual macOS citizen — no Dock icon, no Mission Control trace

**Backends:** Ollama (local), OpenAI, Claude, OpenRouter, NVIDIA NIM, LM Studio, llama.cpp  
**Extras:** On-device voice input (whisper-cpp), screenshot analysis  
**Price:** Free, MIT license, no subscription, no telemetry

[https://github.com/rbc33/Ghostbar](https://github.com/rbc33/Ghostbar)

Happy to answer questions!

---

## I built a Mac app that organizes all your screenshots automatically — here's a 90-second demo
**Author:** u/Round-Nature7232 | **Upvotes:** 10 | **Comments:** 13

Been sitting on 4,000+ screenshots with no way to find anything. 

So I built Pizazoo.

It indexes every screenshot on your Mac the moment you open it. 

On-device OCR lets you search the actual text inside images — 

no cloud, nothing leaves your Mac.

Demo: [https://youtu.be/zUMS\_TVla1g](https://youtu.be/zUMS_TVla1g)

Site: [https://pizazoo.com](https://pizazoo.com)



Free to download. Would love feedback from macOS users.



---

## A review of the Sidebar App:
**Author:** u/Jumpy-Response5296 | **Upvotes:** 10 | **Comments:** 5

What it is:  
  
The app is a replacement for the generic and boring MacOS Dock, and the creator [u/empty23\_](https://www.reddit.com/user/empty23_/) has put a lot of effort into making it perfect, if not extremely close. It's an app that sits on the edge of your screen giving you quick access to all your apps, window previews, multimedia controls, a calendar, and a ton of customization options. Think of it as the Dock, but actually good.  
  
My experience with Sidebar:  
  
All I can say is that my time using this app had been absolutely wonderful. Firstly, I woudl like to mention that I love customization. One of the biggest let-downs of switching from Windows to MacOS was that I didn't have the power to mod basically everything at my fingertips. Every time I had to open an app, or just look at my dock in general, I remembered how I had completely customized my Windows experience, and how I would never have that on Mac. At least, that's what I used to think till I found Sidebar. My ...

---

## I made a free and open source spotlight-style note app with vim support. If you find yourself jotting notes down in SpotLight or Raycast at times, this is for you.
**Author:** u/Manitofigh | **Upvotes:** 11 | **Comments:** 5

SpotNote is a lightweight, SpotLight-style, note-taking app that can appear over whatever you have open with Shift+Cmd+Space, similar to SpotLight/Raycast (with Cmd+Space). Once open, you write, calculate, and navigate whatever you have in mind, entirely from the keyboard.

It supports many vim motions (still adding more features for vim mode), inline arithmetic completion (e.g. type `0xff + 0x8` and get `0x107` recommended), and is built to feel fast, not bloated, and takes cares of the "little things".

It's free, open source, and available at spotnote.org. The link to the GitHub repo is there too.

**Why I built it:** Every note app I tried either required too much mouse interaction or had too much interface. I wanted something closer to what a vim user would build for themselves if they had a weekend. It needs to just pop up, capture a thought, and go away without interrupting the workflow. Of course, if you don't want vim mode active, you can disable it. Pretty much everything is ...

---

## tuplutv(beta)
**Author:** u/safak45x | **Upvotes:** 11 | **Comments:** 3

Hello everyone — I shared the app on GitHub and got lots of great feedback; thanks to everyone who chimed in.

The name Tuplu TV is a pun on the Turkish phrase “tüplü TV” (what people called old tube / CRT TVs). Because of that, folks kept joking that a “CRT-style” app ought to have an actual remote — so I leaned into it and built a floating, remote-style control panel next to the player.

The floating remote is shipping in 0.4.0 (the build in the video is from that line of work). Current release is 0.3.0 — stay tuned for the update.

GitHub: [https://github.com/safakgenisol/tuplutv](https://github.com/safakgenisol/tuplutv)

---

## I made another game that lives in your menu bar - $1.99
**Author:** u/foxrlz | **Upvotes:** 8 | **Comments:** 3

Hey everyone!

One month ago I published my first app (game, actually) on the App Store, a small menu bar game called [Mini Pong](https://apps.apple.com/us/app/mini-pong-menu-bar-game/id6761107832?mt=12), and many people loved the idea and suggested I continue making more. So here we are, a month later with another menu bar game inspired by Breakout/Arkanoid.

I kept waiting around during compile breaks and LLM responses while coding. Too short to do anything useful, too long to just stare at the terminal. And tbh, I prefer gaming to social media. There are a few menu bar games but I couldn't find one that you could jump into and pause this quickly between tasks.

**Core features** 

* Lives in the menu bar, no Dock icon, pauses on click
* 5 difficulty levels (Zen to Nightmare)
* 8 game modes (Wobble, Mirror, Gravity, Chaos...)
* 8 dev-friendly themes (Monokai, Nord, Tokyo Night, Solarized...)
* Zen mode with no scoring
* Global shortcut to toggle from anywhere
* Localized in 8 languag...

---

