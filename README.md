# PassPing
## What is PassPing?
<p>PassPing is a Google Chrome extension project, which helps remind post-secondary students living within the Greater Vancouver Area to load their monthly U-Passes onto their compass cards for each month. No more late reloads, missing bus passes or extra fees to be paid!</P>

<div align="center">
    <img src="project-assets\passping-home.png" width="350px">
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
<p>This JSON file is considered the "blueprint" for the extension. It is a basic requirement for EVERY extension. It details pertinent metadata (I.e., extension name; version etc.), and can be utilized to define specific aspects to your extension (I.e., background "service workers", alarms etc.). As per <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json#:~:text=Using%20manifest.,scripts%2C%20and%20browser%20actions).">this article</a>, note that there are many different keys that you can set in your file. Ultimately, the finalized configuration depends on your application needs. As such, this file is critical. Other components that make up a typical extensions' architecture may include: </p>

<table>
    <thead>
        <tr>
            <th>Requirement</th>
            <th>Function</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Manifest.json</td>
            <td>Described above. Tl;dr: A required JSON file containing integral metadata for your extension. Note that you are required to set the <code>manifest_version</code>. This informs the browser that the extension follows the <b>Manifest V3</b> standard. In short, it was developed to improve privacy, security and performance issues for extensions. Read more <a href="https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3">here</a>.</td>
        </tr>
        <tr>
            <td>Background Script/Service Worker</td>
            <td>This component functions as the extensions' event handler. It loads when required, and simply unloads when stagnant. It continues to run so long as it continuously receives events while the browser is running (I.e., browser-related events, coordinating communication, state management and data persistence etc). Read more <a href="https://developer.chrome.com/docs/extensions/develop/concepts/service-workers">here</a>.</td>
        </tr>
        <tr>
            <td>Pop-Up Component</td>
            <td>This is the UI window that appears when the user clicks on the designated extensions' icon, displaying HTML components such as buttons, forms, actions, status displays etc.</td>
        </tr>
        <tr>
            <td>Content Scripts</td>
            <td>**NOTE: This is something that can add more functionality to your extension. However, in the case of PassPing, this was not required.</td>
        </tr>
    </tbody>
</table>

### React + Vite Integration 
<p>Google Chrome extensions are traditionally written with the basic modern web development languages (HTML5, CSS3 and JavaScript). However, there are modernized frameworks that can be integrated, such as React.js and Vue.js as well. <a href="https://medium.com/@5tigerjelly/creating-a-chrome-extension-with-react-and-vite-boilerplate-provided-db3d14473bf6">This Medium article</a> provides a comprehensive guide (including boilerplate code) to assist in the initial project set-up.</p>

### Chrome APIs (Notifications, Alarms, Storage) using background.js
<p>Chrome comes equipped with a number of APIs that can be used for development. You can define these in your <code>manifest.json</code> file.</p>

#### Notifications 
<p>The notifications API functions to display notifications for a users' system tray. In accordance to <a href="https://m2kdevelopments.medium.com/14-understanding-chrome-extensions-notifications-3e32a5d4cf00">this Medium article</a>,
4 different notification types exist. For PassPing, I created a basic notification, which includes an image for an icon, title and 
corresponding message. Code implementation for PassPings' reload notification can be found in <code>background.js</code>. There are also 
3 additional parameters that were included here:</p>

<ul>
<li>priority:  Can take on any value in between the range of -2 to 2. This controls the visibility duration and system tray placement of 
the notification on a users' device. Here, the value was set to 2.</li>
<li>requireInteraction:  This enforces the notification pop-up to persist on the screen until the user clicks or dismisses it. 
By default, it is set to false, which indicates that the notification will be automatically dismissed after a short timeframe. When set to 
true, it prevents the auto-dismissal of the notification. Since there is a guard in place to silence notifications and the background service worker only fires at 3-hour increments, this parameter was set to true.</li>
<li>silent:  This parameter, when set to True, mutes the alert without playing the system notification sound. In this case, silent was set to 
false.</li>
</ul>

#### Alarms 
<p>The alarms API functions to schedule code to execute at preset timeframes. Note that Chrome alarms continue to run, even while the users' device is put to sleep. As <a href="https://dev.to/scriptjsh/deep-dive-into-chrome-alarm-api-scheduling-timed-events-in-chrome-extensions-2glc">this article</a> simply states, it is synonymous to "having an alarm clock inside your Google extension". </p>
<p>For PassPing, a singular alarm was created in <code>background.js</code>. The alarm was the ideal solution for our task of sending U-Pass renewal reminders to the student. We use <code>chrome.alarms.create</code> to instantiate an alarm, and then specify <code>periodInMinutes</code> to dictate how many times it should repeat after the initial event.</p>
<p>Subsequently, we then call <code>chrome.alarms.onAlarm.addListener</code>, which contains code that will be executed when the alarm is triggered and fired. Here, multiple guards are put in place, including checks for:</p>

<ul>
<li>If the current date is less than the 16th of each month;</li>
<li>If the current date is equal to the users' set reminder date;</li>
<li>If it is the right time to be sending notifications;</li>
<li>If the Snooze Until Tomorrow button has been activated, and,</li>
<li>If next months' U-Pass has already been loaded.</li>
</ul>

<p>Once all checks have passed, it calls the notification method, triggering the callback successfully.</p>

#### Storage
<p>Asides from the users' preferred reminder date and time, PassPing is designed to store very minimal amounts of data. As such, the ideal solution to be used here to ensure that the aforementioned settings get persisted for each user was to use <code>chrome.storage</code>. <a href="https://m2kdevelopments.medium.com/12-understanding-chrome-extensions-storage-93f0e3daa67e">This article</a> extensively compares the difference between using <code>window.localStorage</code>, as well as additional information on how it can be used effectively.</p>
<p>While there are 4 different storage areas, I used <code>sync</code> to ensure that data gets stored locally, then syncs with all Chrome browsers the user is logged into. Note the different usages of set and get, which can write new data to storage, and retrieve data, respectively.</p>

## Dependencies 
<p>Not many new dependencies were utilized for developing this project. <b>React-Icons</b> was previously employed in former projects. Both of these dependencies were utilized to include commonly-used icons into the extension, providing it with a much more vibrant and stimulating UI for the end-user.</p>

<p><b>date-fns</b>: During the initial stages of building, JavaScript's Date() object and its relevant methods were used. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">This article</a> covers more information on its general background and usage. However, further research soon revealed that this was not the most ideal solution, given its many problems (I.e., Mutability, lack of support for non-local timezones, inconsistent parsing and 0-indexed months). As such, an alternative package was utilized. With <b>date-fns</b>, it offers a more elegant solution to date manipulations. While complex manipulations were not required for PassPing, it was noticeably much easier to use, especially in terms of formatting.</p>

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
            <p>A new feature that was implemented to silence notifications temporarily under the condition if next months' pass has NOT been loaded. I designed this to ensure that users are not bombarded by notifications consistently, especially if they are unable to reload their U-Pass in the immediate timeframe. This does reset itself for the next day, resuming notification delivery.</p>
        </li>
    </ol>
</p> 

### Settings 
<p>Clicking the Settings button in the header of the home page will link to a separate page on the extension that allows users to edit their reminder date and reminder time preferences.</p>
<p>The reminder date and time have default starting settings of the 16th and 9:00 AM, respectively. The 16th was selectively chosen, given that Translink U-Pass reloads only start then.</p> 
<p>A setting for the users' preferred reminder frequency was also recently implemented. It allows users to set a reminder frequency as an integer - one, meaning that notifications are sent once every hour, capped to a maximum value of 4 (1 notification sent every 4 hours).</p>

<p align="center">
    <img src="project-assets\passping-settings.png" width="350px;">
</p>

<p>However, these values can be edited very easily with different valid inputs. See below for an example. You can then click the Save Settings button at the very bottom of the page to save these, with a transient confirmation message that displays a confirmation message that disappears thereafter.</p>

## Future Improvements 
<ol>
    <li>Customizable notification delivery times
        <p>Currently, the default setting for the alarm to fire and send notifications is programmed for every 3 hours. However, the 
        functionality could be improved with a more tailored approach by letting users customize how often they would like to receive 
        these notifications.</p>
        <p>As of <b>June 2026</b>: This functionality has now been successfully integrated! Users can pre-set the notification reminder frequency, starting at once per hour, capped to a maximum of once every 4 hours.</p>
    </li>
    <li>Potential semi-automation (Selenium, Playwright)
        <p>Work in progress.</p>
    </li>
</ol>

## How to Use
<p>As of <b>July 2026</b>, PassPing is now available on the Chrome Extension store for download! :D</p>
<p>To use, simply install the extension. You can find it by searching PassPing in the Chrome store search bar, or click here to directly access the extension: </p>

<b><p>Download link coming soon!</p></b>

<p>Please note that you need to enable notifications on your local machines' system in order to trigger the "toast" popup.</p>

<p>For <b>Windows</b>:  Ensure that notifications are toggled as <b>"On"</b> for Google Chrome. Additionally, enable notification banners and notifications to be shown in the notification centre.</p>

<p>For <b>MacOS</b>: Click into your system settings, followed by Notifications. Scroll down to find Google Chrome, and toggle "ON" for <b>Allow Notifications</b>. Ensure that you choose <b>Persistent</b> for Alert Style. For additional troubleshooting, be sure to consult this guide <a href="https://support.apple.com/en-ca/guide/mac-help/mh40583/mac">here</a>.</p>

### Try It Yourself - Instructions for Set-Up 
<ul>
<li>As mentioned above, a default reminder date and default reminder time have already been set up to the 16th and 9:00 AM PST, respectively. To change these, simply input your preferred parameters and click Save Settings. This will save your preferences directly.</li>
</ul>

<p>I am always open to feedback and improvements on how to make PassPing even better for students. Please feel free to contact me via e-mail to get in touch!</p>

## Thank You!
<p>Finally, thank you so much for installing and trying out my first Google extension. Additionally, huge kudos to my fellow testers and for providing such useful feedback: <a href="https://github.com/ajarodpaulson">ajarodpaulson</a>, <a href="https://github.com/behold-mycode">behold_mycode</a>, <a href="https://github.com/Lada496">lada496</a> and <a href="https://github.com/steph-xue">steph-xue</a>. Happy transiting! 🚌🚏</p>

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
    <li>https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API</li>
    <li>https://m2kdevelopments.medium.com/13-understanding-chrome-extensions-alarms-74a4f4ea81d8</li>
    <li>https://javascript-conference.com/blog/why-you-should-use-date-fns-for-manipulating-dates-with-javascript/</li>
</ol>

### Publishing onto the Google Chrome Store
<ol>
    <li>https://www.youtube.com/watch?v=XBZ3Hhx-tS8&t=13s</li>
    <li>https://developer.chrome.com/docs/webstore/publish</li>
</ol>

