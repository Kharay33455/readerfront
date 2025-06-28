# Bank query app

Simple web app to take a pdf document and highlight all occurence of a given search query. 

## To run this app

1. fork code, create your own env file in root dir

   ```
      EXPO_PUBLIC_ENV=DEV
      EXPO_PUBLIC_BH_DEV=http://192.168.0.3:8000
      EXPO_PUBLIC_BH_PROD=https://productionserver.com
   ```

2. Install dependecies
```
   npm install
```

3. Start app
   ```
   npm run web
   ```

   for web. Look up android and ios bundling for expo if you choose that environment

4. Set up the back end server

   https://github.com/Kharay33455/readerrest.git
