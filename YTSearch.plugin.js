//META{"name":"YTSearch","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class YTSearch {
    getName() {
        return "YTSearch";
    }
    getDescription() {
        return "Send Youtube Videos by pressing [SHIFT]+[ENTER] while using the following syntax: 'yt [searchterm]'";
    }
    getVersion() {
        return "2.2";
    }
    getAuthor() {
        return "oSumAtrIX";
    }
    getKey() {return BdApi.getData('YTSearch', 'apiKey')}
    getSettingsPanel() {
    	const key = this.getKey();
        return `<input type="password" class="inputDefault-_djjkz input-cIJ7To" name="apiKey" type=text value="` + (key == undefined ? "" : key) + `" placeholder="YouTube Data API v3 Key" onChange="key = this.value; BdApi.setData('YTSearch', 'apiKey', this.value)">
<br><a target="_blank" href="https://console.developers.google.com/apis/library/youtube.googleapis.com?q=youtube">Get it here</a>
        `;
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
