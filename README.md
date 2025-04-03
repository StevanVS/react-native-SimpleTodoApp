# Desarrollo
En android
```bash
npm run android
```

# Build APK
[Articulo](https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51)

```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
cd android
```

- Debug
`./gradlew assembleDebug`

- Release
`./gradlew assembleRelease`
