This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!


## Run the sidepanel extension

Add the following to the plasmo-default-background script on the build folder:

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

NOTE: INSERT IT BEFORE THE GIBBERISH CODE OF THE SCRIPT (MAYBE LINE 344)
I don't know if this is a known issue of Plasmo Framework but if this code is not added, the sidepanel won't appear. 


## Adding Reusable Components?

Add your component inside the globals folder or create a directory named "components".
NOTE: When using this components, make sure to restart the session "yarn run dev" inorder for the components to appear.

## Using assets or images?

Plasmo has a strict rule to use data-base64:~<folder_name>/asset_name for it to recognize and use the assets. 

-------Sigmund---------
