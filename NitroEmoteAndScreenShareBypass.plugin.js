//META{"name":"NitroEmoteAndScreenShareBypass","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class NitroEmoteAndScreenShareBypass {
    getName() {
        return "NitroEmoteAndScreenShareBypass";
    }
    getDescription() {
        return "Send Nitro emojies without Nitro (lame bypass) and enable high quality screen sharing";
    }
    getVersion() {
        return "3.0";
    }
    getAuthor() {
        return "oSumAtrIX";
    }
    load() {

    }
    start() {
        var currentUserModule = BdApi.findModule("getCurrentUser");
        var checkExist = setInterval(function() {
            var cUser = currentUserModule.getCurrentUser();
            if (cUser == undefined) return;
            cUser.premiumType = 2;
            clearInterval(checkExist);
        }, 500);
    }

    stop() {

    }
    onSwitch() {
        var div = document.getElementsByClassName("name-3YKhmS")[0];
        var serverName = div != undefined ? div.innerHTML : "noServer";
        var btn = $(".buttonContainer-28fw2U")[1];
        if (btn != null)
            btn.onclick = () => {
                var checkExist = setInterval(function() {
                    var scroller = $(".listItems-1uJgMC")[0];
                    if (scroller == null) return;

                    clearInterval(checkExist);
                    scroller.parentElement.onclick = (e) => {
                        var target = e.target;
                        var src = target.firstChild.src;
                        if (src.slice(-7, -4) == "gif" || target.parentElement.parentElement.children[0].firstChild.children[1].innerHTML != serverName) {
                            fetch(src.slice(0, -4) + "?size=40")
                                .then(res => res.blob())
                                .then(blob => {
                                    BdApi.findModuleByProps("instantBatchUpload").instantBatchUpload(BdApi.findModuleByProps("getChannelId").getChannelId(), [new File([blob], 'oSumAtrIX.gif', blob)]);
                                })
                        }
                    }
                }, 100);
            }
    }

}
