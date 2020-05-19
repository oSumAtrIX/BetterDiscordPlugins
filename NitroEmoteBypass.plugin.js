//META{"name":"NitroEmoteBypass","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class NitroEmoteBypass {
    getName() {
        return "NitroEmoteBypass";
    }
    getDescription() {
        return "Send Nitro emojies without Nitro (lame bypass)";
    }
    getVersion() {
        return "2.0";
    }
    getAuthor() {
        return "oSumAtrIX";
    }
    load() {

    }
    start() {
        var style = document.createElement('style');
        style.innerHTML = ".emojiItemDisabled-1FvFuF {filter: none;}";
        document.head.appendChild(style);
    }

    stop() {

    }
    onSwitch() {
        var btn = $(".buttonContainer-28fw2U")[1];
        if (btn != null)
            btn.onclick = () => {
                var checkExist = setInterval(function() {
                    var scroller = $(".listItems-1uJgMC")[0];
                    if (scroller == null) return;

                    clearInterval(checkExist);
                    scroller.parentElement.onclick = (e) => {
                        var target = e.target;
                        if (target.classList.contains("emojiItemDisabled-1FvFuF")) {
                            var img = target.firstChild.src.slice(0, -4);
                            fetch(img + "?size=40")
                                .then(res => res.blob())
                                .then(blob => {
                                    var split = img.split('.');
                                    BdApi.findModuleByProps("instantBatchUpload").instantBatchUpload(BdApi.findModuleByProps("getChannelId").getChannelId(), [new File([blob], 'oSumAtrIX.' + split[split.length - 1].split('?')[0], blob)]);
                                })
                        }
                    }
                }, 100);
            }
    }

}
