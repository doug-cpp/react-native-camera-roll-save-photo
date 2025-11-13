# React Native Android POC Base Template

This project is a base template for creating Proof of Concept (POC) applications for Android using React Native. It provides a minimal, clean starting point with essential configurations and dependencies pre-configured for Android development.

The template includes:

- React Native 0.82.1 with React 19.1.1
- TypeScript configuration
- Safe area context handling
- Dark/light mode support
- Clean project structure ready for Android development

---

# Getting Started

> **Note**: Make sure you have prepared your environment with the steps described below before proceeding.

## Prerequisites

- Node.js (version 18 or higher)
- Java JDK (version 17 or higher)
- Android Studio
- Android device with USB debugging enabled

## Environment Setup

### 1. Install Java SDK (JDK)

- Download and install the latest [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html)
- Set the `JAVA_HOME` environment variable to point to your JDK installation folder
- Verify installation by running `java -version` in your terminal

### 2. Install Android Studio

- Download and install [Android Studio](https://developer.android.com/studio)
- During installation, include the Android SDK, SDK Platform tools, and Android SDK Build-Tools components
- Install the necessary SDK packages for React Native development

### 3. Prepare Your Android Device

#### Enable Developer Options

1. Go to **Settings** > **About phone**
2. Tap **Build number** 7 times until you see "You are now a developer!"
3. Go back to **Settings** > **Developer options**

#### Enable USB Debugging

1. In **Developer options**, enable **USB debugging**
2. Connect your device to computer via USB cable

#### Grant USB Debugging Permission

1. When first connecting, you'll see a dialog on your device: **"Allow USB debugging?"**
2. Check **"Always allow from this computer"** and tap **OK**
3. If you don't see the prompt, disconnect and reconnect the USB cable

#### Verify Connection

```sh
adb devices
```

You should see your device listed. If it shows "unauthorized", check the USB debugging prompt on your device.

## Quick Start

### Step 1: Install Dependencies

```sh
npm install
```
### Step 2: Start Metro Bundler

```sh
npm start
```
Keep this terminal open - Metro will bundle your JavaScript code.

### Step 3: Run on Android Device

```sh
npm run android
```
This will build and install the app on your connected Android device.

---

## Development Workflow

### Making Changes

1. Edit your files (Metro will automatically detect changes)
2. Save the file - Fast Refresh will update the app instantly
3. For native changes, you may need to run `npm run android` again

### Common Development Commands

```sh
# Start development server
npm start

# Build and run on Android
npm run android

# Run tests
npm test

# Lint code
npm run lint
```
---

# Template Structure

```text
src/
├── App.tsx                 # Main application component
├── components/             # Custom components directory
android/                    # Android native code
├── app/src/main/java/com/meuapp/
│   ├── MainActivity.kt    # Android main activity
│   └── MainApplication.kt # Android application class
```
---

# Creating a New POC

To create a new POC from this template:

1. **Copy the template** to a new directory
2. **Update package.json** with your POC name and description
3. **Add specific dependencies** your POC requires
4. **Update app.json** with your display name
5. **Rename Android package** from `com.meuapp` to `com.yourpocname`
6. **Implement your functionality** in `App.tsx` and components

---

# Customization Guide

## Adding New Dependencies

When creating your specific POC, add necessary dependencies:

```bash
# Example for QR Code POC
npm install react-native-camera react-native-qrcode-scanner

# Example for Geolocation POC  
npm install react-native-geolocation-service @react-native-community/geolocation

# Example for Camera POC
npm install react-native-camera react-native-fs react-native-permissions
```

## Android Configuration Updates

For each new POC, update the following Android files:

1. **`android/app/build.gradle`**:
    
    ```gradle  
    android {
        defaultConfig {
            applicationId "com.yourpocname"  // Update this
        }
    }
    ```
    
2. **Rename package directory**:
    
    ```bash
    # From:
    android/app/src/main/java/com/meuapp/
    
    # To:
    android/app/src/main/java/com/yourpocname/
    ```
    
3. **Update package references** in:
    
    - `MainActivity.kt`
    - `MainApplication.kt`
    - `AndroidManifest.xml`

## Component Development

Create your POC components in the `components/` directory:

```typescript
// components/YourFeature.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function YourFeature() {
  return (
    <View style={styles.container}>
      <Text>Your POC functionality here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

---

# App.tsx Template

```typescript
// App.tsx - Template base
import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';

  return (
    <View style={styles.container}>
      <Text style={{color: textColor}}>Android POC Base Template</Text>
      <Text style={{color: textColor}}>Implement your functionality here</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

---

# Troubleshooting

## Common Issues

### Device Not Recognized

```sh
# Check if device is connected
adb devices

# If device shows "unauthorized":
# 1. Check USB cable connection
# 2. Look for USB debugging prompt on device
# 3. Revoke USB debugging authorizations in Developer options and reconnect
```

### Build Failures

```sh
# Clean Android build
cd android && ./gradlew clean

# Reset Metro cache
npm start -- --reset-cache

# Reinstall dependencies
rm -rf node_modules && npm install
```

### Metro Connection Issues

- Ensure Metro is running (`npm start`)
- Check that device and computer are on same network if using Wi-Fi debugging    
- For USB: verify proper connection and drivers

### USB Debugging Not Appearing

1. Try different USB ports
2. Use original USB cable
3. Check if USB debugging is properly enabled
4. Restart both device and computer if needed

## Useful ADB Commands

```sh

# List connected devices
adb devices

# Restart ADB server
adb kill-server && adb start-server

# View device logs
adb logcat

# Install APK directly
adb install app-debug.apk
```

---

# Checklist for New POCs

For each new POC Android:

- `package.json` - name and description
- `app.json` - name and displayName
- `android/app/build.gradle` - applicationId
- Rename folder: `android/app/src/main/java/com/meuapp/` → `android/app/src/main/java/com/[pocname]/`
- Update package in Kotlin files (`MainActivity.kt`, `MainApplication.kt`)
- Update `AndroidManifest.xml`
- `App.tsx` - implement functionality
- `README.md` - specific documentation
- Specific dependencies in package.json

---

# Learn More

- [React Native Official Documentation](https://reactnative.dev/docs/getting-started)
- [Android Developer Setup](https://developer.android.com/studio)
- [TypeScript with React Native](https://reactnative.dev/docs/typescript)
- [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)

This template provides a solid foundation for rapid POC development while maintaining code quality and development best practices.

<div align="center"> <br/> Made with ❤️ for React Native Android Development </div><div align="center">⁂</div>
