# How to Add a New Application and Customize Your Portfolio

This guide will walk you through adding new applications and personalizing your Ubuntu web portfolio.

## 1. Adding a New Application

To integrate a new application into your Ubuntu web environment, follow these steps:

### Step 1: Create the App Component

First, you need to create the React component that will house your application's UI and logic.

*   **Create a new file** in the `components/apps/` directory. Name it descriptively, for example, `MyNewApp.js`.

    ```javascript
    // components/apps/MyNewApp.js
    import React from 'react';

    export default class MyNewApp extends React.Component {
        constructor() {
            super();
            this.state = {
                // Your app's state
            };
        }

        // Your app's methods

        render() {
            return (
                <div className="h-full w-full flex flex-col justify-start items-center bg-ub-cool-grey text-white">
                    {/* Your app's UI goes here */}
                    <p>Hello from My New App!</p>
                </div>
            );
        }
    }
    ```

### Step 2: Configure the App

Next, you need to register your new application in `apps.config.js`. This file acts as the central registry for all applications.

*   **Open `apps.config.js`**.
*   **Import your new app component** at the top of the file:

    ```javascript
    // apps.config.js
    import MyNewApp from './components/apps/MyNewApp'; // Adjust path if necessary
    // ... other imports
    ```

*   **Add a new object to the `apps` array**. This object will define your application's properties:

    ```javascript
    // apps.config.js
    const apps = [
        // ... existing apps
        {
            id: "my-new-app", // Unique identifier for your app
            title: "My New App", // Display name
            icon: "./themes/Yaru/apps/my-new-app.png", // Path to your app's icon
            disabled: false, // Set to true to disable the app
            favourite: true, // Set to true to show in the sidebar favorites
            desktop_shortcut: true, // Set to true to create a desktop shortcut
            screen: MyNewApp, // Reference to your app's React component
        },
    ];
    ```

    *   **`id`**: A unique string identifier for your app.
    *   **`title`**: The name displayed to the user.
    *   **`icon`**: The path to your app's icon. This icon should be placed in `public/themes/Yaru/apps/`.
    *   **`disabled`**: Set to `true` if you want the app to be present but not launchable.
    *   **`favourite`**: Set to `true` if you want the app to appear in the sidebar's "favorites" section.
    *   **`desktop_shortcut`**: Set to `true` if you want an icon for this app to appear directly on the desktop.
    *   **`screen`**: This is crucial. It should be a direct reference to the React component you created in Step 1.

### Step 3: Add an App Icon

Your application needs an icon to be displayed correctly on the desktop, sidebar, and "All Applications" screen.

*   **Place your icon image file** (e.g., `my-new-app.png`) into the `public/themes/Yaru/apps/` directory. Ensure the filename matches the `icon` path you specified in `apps.config.js`.

### Step 4: Verify Integration

Once you've completed the above steps, your new application should automatically appear in the "All Applications" view. If you set `favourite: true` or `desktop_shortcut: true`, it will also appear in those respective locations.

## 2. Customizing Your Portfolio

This section guides you on how to personalize the existing Ubuntu web portfolio.

### Changing Personal Information (Sincere App)

The `sincere.js` app appears to be the main portfolio application.

*   **`components/apps/sincere.js`**:
    *   This file likely contains the content for your "About" section, projects, and other portfolio details. You'll need to modify the JSX and potentially the state within this component to reflect your own information.
    *   Look for text content, project details, and links that you need to update.
    *   The file also references `Sincere_Resume.pdf`.

*   **`public/files/Sincere_Resume.pdf`**:
    *   Replace this PDF with your own resume. Make sure to name your resume file `Sincere_Resume.pdf` or update the reference in `components/apps/sincere.js` if you choose a different filename.

### Changing "About Me" in Terminal

The terminal app has an "about-vivek" command.

*   **`components/apps/terminal.js`**:
    *   Search for the `about-vivek` command within this file. You'll find the output associated with this command. Modify it to display your own "about me" text.

### Updating Social Media Links

Your LinkedIn profile is linked in a couple of places.

*   **`components/context menus/default.js`**:
    *   Search for `linkedin.com/in/sincere-bhattarai/` and update the URL to your own LinkedIn profile.
*   **`components/screen/booting_screen.js`**:
    *   Similarly, search for `linkedin.com/in/sincere-bhattarai/` and update the URL to your own LinkedIn profile.

### Changing Background Image

*   **`public/images/wallpapers/`**:
    *   You can add your own wallpaper images to this directory.
*   **`components/ubuntu.js`**:
    *   The `bg_image_name` state in the `Ubuntu` component manages the current background. You can modify the default value here, or the user can change it through the settings.
*   **`components/screen/desktop.js`**:
    *   The `changeBackgroundImage` function is passed down to allow changing the background.

### Changing App Icons

*   **`public/themes/Yaru/apps/`**:
    *   To change an existing app's icon, simply replace the corresponding image file in this directory with your new icon, ensuring it has the same filename.

### Modifying Existing Apps

*   **`components/apps/`**:
    *   Each file in this directory corresponds to an existing application. You can open these files and modify their React components to change their functionality, UI, or content.

## 3. General Tips

### Running the Project

To run the project locally, you'll typically use `npm` or `yarn`. Check the `package.json` file for available scripts. Common commands are:

```bash
npm install   # or yarn install
npm run dev   # or yarn dev (for development server)
npm run build # or yarn build (for production build)
npm start     # or yarn start (to run the production build)
```

### Troubleshooting

*   **Clear Cache**: If changes aren't reflecting, try clearing your browser cache or restarting the development server.
*   **Console Errors**: Always check your browser's developer console for any JavaScript errors.
*   **File Paths**: Double-check all file paths, especially for images and component imports. Relative paths can be tricky.

This guide should provide a solid foundation for customizing your Ubuntu web portfolio. Good luck!
