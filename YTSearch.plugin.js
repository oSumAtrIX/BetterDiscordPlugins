//META{"name":"YTSearch","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class YTSearch {

    getName() {
        return "YTSearch";
    }
    getDescription() {
        return "Send Youtube Videos by pressing [SHIFT]+[ENTER] while using the following syntax: 'yt [searchterm]'";
    }
    getVersion() {
        return "0.0.1";
    }
    getAuthor() {
        return "oSumAtrIX";
    }
        getSettingsPanel() {
  return `
  <input type=text value="" placeholder="YouTube Data API v3 Key" onChange="BdApi.setData("YTSearch", "apiKey", this.value)">`;
    }
    onSwitch(){
        var apiKey = '',
    	textArea =  document.getElementsByClassName('textArea-2Spzkt')[0];
        textArea.addEventListener('keyup', function(event) {
            event.preventDefault();  
            var content = textArea.value;
            if (event.keyCode === 13) {
                if (content.substring(0, 3).includes('yt ')) {
                    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + encodeURIComponent(content.substring(3, content.length)) + '&type=video&key=' + apiKey, function(data) {
                        BdApi.findModuleByProps("sendMessage").sendMessage(BdApi.findModuleByProps("getChannelId").getChannelId(), {
                            content: 'https://www.youtube.com/watch?v=' + data.items[0].id.videoId
                        });
                    });
                }
            }
        });
    }

    start() {}
    stop() {}

}
