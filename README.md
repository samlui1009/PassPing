# PassPing
## What is PassPing?
<p>PassPing is a Google Chrome extension project, which helps remind post-secondary students living within the Greater Vancouver Area to load their monthly U-Passes onto their compass cards for each month. No more late reloads, missing bus passes or extra fees to be paid!</P>

<div>
<img src="project-assets\passping-home.png">
</div>

## Inspiration behind Project
<p>As a current post-secondary student, I am a huge fan of having a discounted transit pass. I love being able to travel at a lower price across the Greater Vancouver area as much as I want at a much lower price. That being said, having to remember <i>when</i> to load the bus pass prior to the start of the next month is often a frustrating experience. Personally, I attribute that mainly to my own forgetfulness. As such, I wanted to create a simplistic, lightweight yet visually appealing solution that can provide U-Pass reload reminders to the user, prompting them to load it when required. I believe that this would not only benefit myself, but other future students as well.</p>

## Tech Stack
<p>Due to the simplicity of this project, I decided to turn this idea into a Google extension. The reasoning for this was relatively straightforward: Chrome is one of the most commonly-used browsers across all platforms, is rapid and fast, and also houses a large extension library. Since I did not plan on saving any confidential user data into this extension, a backend was not implemented. Instead, I made use of 
Google Chrome's <code>chrome.storage</code> API. See below for more details.</p>

<p>Much of this project was purely focused on developing the frontend, and to learn and understand how Chrome extensions work under the hood, which will be explained further down in this README.</p>

<p>In terms of developing the frontend, I wanted to use a technology that I had previously utilized. As such, I integrated React + Vite, using TypeScript. Both of these tools have been used extensively in previous projects for frontend development, and I appreciated their ease in rapid prototyping with components that are designed for reusability. I also chose to use TypeScript, given that it is one of the most common programming languages often utilized in development. It also serves as good practice for understanding typing (In comparison to other projects that I have worked on, that utilizes a loosely-typed language like JavaScript).</p>

## Self-Guided Learnings 

### How to Create a Google Extension - The Main Components 
<p>Google Chrome Extensions require basic, fundamental components.</p>

#### Manifest.json
<p>This JSON file is considered the "blueprint" for the extension. It is a basic requirement for EVERY extension. It details pertinent metadata (I.e., extension name; version etc.), and can be utilized to define specific aspects to your extension (I.e., background "service workers", alarms etc.). As per <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json#:~:text=Using%20manifest.,scripts%2C%20and%20browser%20actions).">this article</a>, note that there are many different keys that you can set in your file. Ultimately, the finalized configuration depends on your application needs. In this case, a Chrome Extension will require: </p>

<br>

<table>
</table>

### React + Vite Integration 

### Chrome APIs (Notifications, Alarms, Storage) using background.js
<p>Chrome comes equipped with a number of APIs that can be used for development. You can define these in your <code>manifest.json</code> file.</p>

#### Notifications 

#### Alarms 

#### Storage

## Dependencies 
<p>Not many new dependencies were utilized for developing this project. <b>React-Icons</b> was previously employed in former projects. Both of these dependencies were utilized to include commonly-used icons into the extension, providing it with a much more vibrant and stimulating UI for the end-user.</p>

<br>

<p><b>date-fns</b></p>

## Current Functionalities
### Home Page
<p>Upon first installation, the extensions' home page will show the header, relevant taglines and information regarding the CURRENT pass in use, as well as next months' pass.</p>
<p>A small status bar is present that informs users if next months' pass is already loaded or not. Below the status bar are 3 menu buttons, each that executes different actions.</p>
<p>
    <ol>
        <li><b>Mark Pending Pass as Loaded</b>: 
            <p>When clicked, this changes the status message to display a completion. This will also silence all notifications until the next month.</p>
        </li>
        <li><b>Open U-Pass Website</b>:
            <p>This opens the Translink BC's U-Pass website in a different tab on your browser. Manual input of user credentials are 
            required.</p>
        </li>
        <li><b>Snooze Until Tomorrow</b>:
            <p>A new feature that was implemented to silence notifications temporarily under the condition if next months' pass has NOT been loaded. I designed this to ensure that users are not bombarded by notifications consistently, especially if they are unable to reload their U-Pass in the immediate timeframe. This does reset itself for the next day, resuming notification delivery. See below for an example.</p>
            <img src="project-assets\passping-snoozedconfirmation.png">
        </li>
    </ol>
</p> 

<img src="project-assets\passping-home2.png">

### Settings 
<p>Clicking the Settings button in the header of the home page will link to a separate page on the extension that allows users to edit their reminder date and reminder time preferences.</p>
<p>The reminder date and time have default starting settings of the 15th and 9:00 AM, respectively. The 16th was selectively chosen, given that Translink U-Pass reloads only start then.</p> 

<img src="project-assets\passping-settings.png">

<p>However, these values can be edited very easily with different valid inputs. See below for an example. You can then click the Save Settings button at the very bottom of the page to save these, with a transient confirmation message that will display the newly saved settings.</p>

<img src="project-assets\passping-settingsconfirmation.png">

## Future Functionalities 
<ol>
    <li>Customizable notification delivery times
        <p></p>
    </li>
    <li>Semi-automation with Selenium & Playwright
        <p></p>
    </li>
</ol>

## How to Use
<p>As of <b>August 2026</b>, PassPing is now available on the Chrome Extension store for download! :D</p>
<p>To use, simply install the extension. You can find it by searching PassPing in the Chrome store search bar, or click here to directly access the extension: </p>

### Try It Yourself - Instructions for Set-Up 
<ul>
<li>As mentioned above, a default reminder date and default reminder time have already been set up to the 16th and 9:00 AM PST, respectively. To change these, simply input your preferred parameters and click Save Settings. This will save your preferences directly.</li>
</ul>

<p>I am always open to feedback and improvements on how to make PassPing even better for students. Please feel free to contact the e-mail in my GitHub to get in touch!</p>

## Thank You!
<p>Finally, thank you so much for installing and trying out my first Google extension. Additionally, huge kudos to my fellow testers and for providing such useful feedback: lada496, ajarodpaulson and behold_mycode. Happy transiting! 🚌🚏</p>

## References

### Google Chrome Extensions (As a Whole!)
<ol>
    <li>https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world</li>
    <li>https://medium.com/@jonnykalambay/anatomy-of-a-chrome-extension-54b9dd019825</li>
</ol>

### Integrating React for Google Extensions 
<ol>
    <li>https://medium.com/@5tigerjelly/creating-a-chrome-extension-with-react-and-vite-boilerplate-provided-db3d14473bf6</li>
</ol>

### Chrome Extension Capabilities (Notifications, Alarms)
<ol>
    <li>https://developer.chrome.com/docs/extensions/reference/api/notifications</li>
    <li>https://m2kdevelopments.medium.com/13-understanding-chrome-extensions-alarms-74a4f4ea81d8</li>
</ol>

### Publishing onto the Google Chrome Store
<ol>
    <li>https://www.youtube.com/watch?v=XBZ3Hhx-tS8&t=13s</li>
    <li>https://developer.chrome.com/docs/webstore/publish</li>
</ol>

