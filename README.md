# Redworth Humidifier IoT Project - Mobile Application

This git repository contains the code for our IoT backend for the IoT Humidifier project.

## Environment Setup
Prerequisites:
- Node.js (LTM or Latest) installed.
- Git installed.
- Any editor that supports React Native development.
- Expo Go mobile app (available on Android and iOS).

Clone the git repository to your machine (https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository). Then create a feature branch (https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) to work on the code.

Run `npm install -g expo-cli` to download the Expo cli. This is used to run a development server for React Native.

Next, run `npm install` to install packages defined in `package.json`.

The environment is now ready for development.

## Usage
Prerequsites:
- Environment is setup (see above).
- Development machine and mobile phone are connected to the same Wi-Fi network.

Run the command:
```
expo start
```
to begin the Expo development server. Any edits to the code will then be live reloaded.

Connect your phone to the development server by using the Expo Go mobile app. Tap the "Scan QR Code" button and scan the QR code shown in the terminal window.

![Expo Go QR Code Prompt](/docs/expo_go_img.jpg)