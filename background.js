const meow = async () => {
    const tabs = await browser.tabs.query({
        url: '*://*.twitch.tv/*'
    });

    for (const tab of tabs) {
        const result = await browser.tabs.sendMessage(tab.id, { action: "adCheck" });

        if (result && result.hasAdBanner && !tab.mutedInfo.muted) {
            console.log('%c[twitch-admute]', 'color:rgb(218, 85, 174)', '- muting tab');
            await browser.tabs.update(tab.id, { muted: true });
        }

        if (result && !result.hasAdBanner && tab.mutedInfo.muted && tab.mutedInfo.reason !== 'user') {
            console.log('%c[twitch-admute]', 'color:rgb(218, 85, 174)', '- unmuting tab');
            await browser.tabs.update(tab.id, { muted: false });
        }
    }
}

setInterval(async () => {
    await meow();
}, 1000);