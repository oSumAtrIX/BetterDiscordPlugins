//META{"name":"YTSearch","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class YTSearch {
    getName() {
        return "YTSearch";
    }
    getDescription() {
        return "Send Youtube Videos by pressing [SHIFT]+[ENTER] while using the following syntax: 'yt [searchterm]'";
    }
    getVersion() {
        return "2.1";
    }
    getAuthor() {
        return "oSumAtrIX";
    }

    getKey() {return BdApi.getData('YTSearch', 'apiKey')}
    getSettingsPanel() {
    	const key = this.getKey();
        return `<input name="apiKey" type=text value="` + (key == undefined ? "" : key) + `" placeholder="YouTube Data API v3 Key" onChange="BdApi.setData('YTSearch', 'apiKey', this.value)">`;
    }
    onSwitch() {
        const doc = $(".textArea-12jD-V")[0], key = this.getKey();
        if (doc == undefined) return;
        doc.addEventListener('keyup', (e) => {
        	const text = doc.textContent;
            if (e.keyCode === 13 && text.substring(0, 3).includes('yt ')) {
                $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + encodeURIComponent(text.substring(3, text.length)) + '&type=video&key=' + key, function(data) {
                    BdApi.findModuleByProps("sendMessage").sendMessage(BdApi.findModuleByProps("getChannelId").getChannelId(), {
                        content: 'https://www.youtube.com/watch?v=' + data.items[0].id.videoId
                    });
                });
            }
        });
    }

    start() {}
    stop() {}

}
