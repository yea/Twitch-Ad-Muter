browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "adCheck") {
        const adBanner = document.querySelectorAll('[data-test-selector="ad-banner-default-text"]');
        sendResponse({ hasAdBanner: adBanner.length > 0 });
    }
});