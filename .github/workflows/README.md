# Creating a CI/CD Pipeline for PassPing 

## Background: Why do this?
<p>To practice and apply my past co-op experience working with CI/CD pipelines into a working GitHub Actions pipeline, and to further cultivate DevOps-related skills. 
Using it on PassPing appeared the least inconsequential.</p>

## Self-Guided Learnings
<p>Below is a table that briefly describes the basic components of a GitHub Actions CI pipeline.</p>

<br>

<table>
    <thead>
        <tr>
            <th>Syntax</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>Provides a human-readable label to the pipeline.</td>
        </tr>
        <tr>
            <td>on & workflow_dispatch</td>
            <td>The <code>on</code> key is used to dictate which events triggers the workflow. Note that this workflow is triggered when a push OR pull request is made in the <code>main</code> branch.
            <p><code>workflow_dispatch</code>: Permits a workflow to be triggered manually through interactions via the GitHub UI/CLI. I included this for manual testing and verification that the pipeline would succeed.</p></td>
        </tr>
        <tr>
            <td>runs-on</td>
            <td>This defines the machine (runner) that executes the jobs in your pipeline. <code>Ubuntu-latest</code> is the most common Linux environment. Read <a href="https://docs.github.com/en/actions/concepts/runners/github-hosted-runners">here</a> for more detailed information.</td>
        </tr>
        <tr>
            <td>jobs</td>
            <td>An execution environment that hosts the tasks. At a high-level, multiple jobs can be run in parallel by default inside a job. These are defined using YAML syntax.</td>
        </tr>
        <tr>
            <td>steps</td>
            <td>Individual tasks that are executed INSIDE the runner, provided by the job. Scripts are then run sequentially, one step after another. These make use of bash/PowerShell syntax to create executable scripts.</td>
        </tr>
    </tbody>
</table>

### Actions
<p>Note that some steps include the <code>uses</code> keyword (I.e., See: "Checkout repository" and "Setup Node.js"). These reference reusable GitHub Actions code snippets that can be called to perform specific, repeating tasks.</p>
<p>The 3 used in this pipeline include:
<ul>
    <li><code>actions/checkout</code>:  Pulls the target code repository to the runner to execute tasks;</li>
    <li><code>actions/setup-node</code>: Downloads, caches and configures a Node.js environment within your GitHub Actions pipeline. You can also include the cache-dependency-path and specify the relative path to your package lockfiles, and,</li>
    <li><code>actions/upload-artifact</code>: Allows file persistence, ensuring that your artifact is available for download in the Summary tab of your GitHub Actions workflow. You can also set the number of retention days, which dictates the duration that your artifact will be available before it is consequently destroyed.</li>
</ul>
</p>

### Setting up Continuous Deployment Using <code>chrome-webstore-upload-cli</code>
<p>I wanted an easy, surefire way to upload my zipped artifact into the Google Chrome Extension webstore without the need for me to manually upload the file. After some Google searching, I found an npm package, <code>chrome-webstore-upload-cli</code>. Documentation
is provided via <a href="https://www.npmjs.com/package/chrome-webstore-upload-cli">this link</a> on how to use it. There was more set-up involved on how to generate the relevant Google API keys. <a href="https://github.com/fregante/chrome-webstore-upload-keys">This guide</a> provides thorough, step-by-step instructions on how to do so.</p>

## References & Resources 
<ol>
    <li>https://docs.github.com/en/actions</li>
    <li>https://github.com/orgs/community/discussions/26174</li>
    <li>https://github.com/fregante/chrome-webstore-upload-keys</li>
</ol>
