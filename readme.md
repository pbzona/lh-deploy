# LaunchDarkly North Star

This project is the frontend for the North Star engagement and also serves as live documentation for users who want to learn more about LaunchDarkly.

To run the project locally, you can use `npm run dev` or run it as a container using the included Dockerfile. Note that the Docker method does include a build step, so this should not be used if you intend to run it for development purposes.

## Prerequisites

Before using this app, you should have access to a LaunchDarkly account and should have a project where you have at least writer permissions. 

You should also have the backend server (TODO: put link here) running at a URL that is accessible from the frontend. For instance, if you are using a deployed frontend, you will likely not be able to use a locally running backend. It is easiest to run both locally, or use hosted versions of each. (TODO: put instructions on how to use the hosted versions)

## Usage

The documentation will always start with SDK setup - without this module, the rest of the application will not work.

The instructions in this module will require you to import a server-side SDK library, configure the LaunchDarkly client with an SDK key, and initialize.

From here, the modules may differ or be swapped in/out and used modularly. Each module contains detailed instructions on how to proceed through it, but in the event something goes wrong, see the troubleshooting section below.

## Troubleshooting

### Dependencies won't install when I run `npm install`

This is a known issue and it has to do with how NPM resolves dependencies. For the time being, use `yarn install` instead.

### The development server keeps crashing!

Check to ensure you haven't saved any partially modified files, especially React components. If the server totally crashes, this is usually because of invalid syntax in one of the Javascript files.

### One of the interactive components isn't behaving as expected

There are a few things to check here:

- Ensure your LaunchDarkly flag(s) are actually in the state they are meant to be in. It's easy to modify a flag, click "Review and save" and forget to hit the save button to actually apply the changes.
- The frontend application isn't able to reach the backend. This probably means the backend has crashed - the easiest way to fix this is to restart it. You'll likely see errors in the browser console or network tab that indicate this.
- The interactive component may be configured to poll the wrong backend endpoint. Make sure that the `moduleId` prop in the component is set to the correct module - this should be the same number as you see in the name of its parent folder.
- The backend endpoint may be loading the wrong module. Check that the backend is mapping the module ID in the content to the correct module directory and the correct transform function. See the backend documentation for more details on how to check this.
