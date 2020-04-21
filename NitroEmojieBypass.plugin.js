//META{"name":"NitroEmojieBypass","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class NitroEmojieBypass {
    getName() {
        return "NitroEmojieBypass";
    }
    getDescription() {
        return "Send Nitro emojies without Nitro (lame bypass)";
    }
    getVersion() {
        return "1.0";
    }
    getAuthor() {
        return "oSumAtrIX";
    }
    load() {

    }
    start() {

    }

    stop() {

    }
    onSwitch() {
        var btn = document.getElementsByClassName("emojiButtonNormal-TdumYh emojiButton-3uL3Aw button-318s1X button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN noFocus-2C7BQj");
        if (btn.length > 0) {
            btn[0].onclick = () => {
                var checkExist = setInterval(function() {
                    var scroller = document.getElementsByClassName("scroller-2FKFPG systemPad-3UxEGl scroller-3vODG7");
                    if (scroller.length) {
                        clearInterval(checkExist);
                        scroller[0].onclick = (e) => {
                            var target = e.target;
                            if (target.classList.contains("disabled-1H1CfW")) {
                                var img = target.style.backgroundImage.slice(4, -1).replace(/"/g, "");
                                var split = img.split('.')
                                fetch(img + "&size=40")
                                    .then(res => res.blob())
                                    .then(blob => {
                                        BdApi.findModuleByProps("instantBatchUpload").instantBatchUpload(BdApi.findModuleByProps("getChannelId").getChannelId(), [new File([blob], 'nitro.' + split[split.length - 1].split('?')[0], blob)]);
                                    })
                            }
                        }
                    }
                }, 100);
            }
        }
    }

}
