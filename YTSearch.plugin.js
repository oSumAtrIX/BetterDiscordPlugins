/**
 * @name YTSearch
 * @author oSumAtrIX
 * @authorId 737323631117598811
 * @version 2.4.2
 * @description Send videos from YouTube.
 * @website https://osumatrix.me
 * @source https://github.com/oSumAtrIX/BetterDiscordPlugins
 * @updateUrl https://raw.githubusercontent.com/oSumAtrIX/BetterDiscordPlugins/master/YTSearch.plugin.js
 */
class YTSearch {
    getName() {
        return "YTSearch";
    }
    getDescription() {
        return "Send videos from YouTube. Usage: yt [searchterm] (SHIFT+ENTER to send the youtube video)";
    }
    getVersion() {
        return "2.4.2";
    }
    getAuthor() {
        return "oSumAtrIX";
    }
    getKey() {
        return BdApi.getData('YTSearch', 'apiKey')
    }
    getSettingsPanel() {
        const key = this.getKey();
        return `<input type="password" class="inputDefault-_djjkz input-cIJ7To" name="apiKey" type=text value="` + (key == undefined ? "" : key) + `" placeholder="YouTube Data API v3 Key" onChange="key = this.value; BdApi.setData('YTSearch', 'apiKey', this.value)">
<br><a target="_blank" href="https://console.developers.google.com/apis/library/youtube.googleapis.com?q=youtube">Get it here</a>
        `;
    }
    onSwitch() {
        const tb = document.getElementsByClassName("textArea-12jD-V")[0],
            key = this.getKey();
        if (tb == undefined) return;
        tb.addEventListener('keyup', (e) => {
            const content = tb.textContent;
            if (e.keyCode === 13 && content.substring(0, 3).includes('yt ')) {
                fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + content + '&type=video&key=' + this.getKey()).then(r => r.json()).then(r => {
                    BdApi.findModuleByProps("sendMessage").sendMessage(BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId(), {
                        content: 'https://www.youtube.com/watch?v=' + r.items[0].id.videoId
                    });
                })
            }
        });
    }
    start() {}
    stop() {}
}
