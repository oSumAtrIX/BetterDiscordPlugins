//META{"name":"NitroEmoteAndScreenShareBypass","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class NitroEmoteAndScreenShareBypass {
    getName() {
        return "NitroEmoteAndScreenShareBypass";
    }
    getDescription() {
        return "Send Nitro emojies without Nitro (lame bypass) and enable high quality screen sharing";
    }
    getVersion() {
        return "3.1";
    }
    getAuthor() {
        return "oSumAtrIX";
    }
    load() {

    }
    start() {
        const mod = ZeresPluginLibrary.DiscordModules.UserStore;
        const checkExist = setInterval(() => {
            const cUser = mod.getCurrentUser();
            if (cUser == undefined) return;
            cUser.premiumType = 2;
            clearInterval(checkExist);
        }, 500);
    }

    stop() {

    }

    onSwitch() {
        const useFileUpload = true;
        const div = document.getElementsByClassName("name-3YKhmS")[0];
        const serverName = div != undefined ? div.innerHTML : "noServer";
        const btn = $(".buttonContainer-28fw2U")[1];
        if (btn != null)
            btn.onclick = () => {
                const checkExist = setInterval(function() {
                    const scroller = $(".listItems-1uJgMC")[0];
                    if (scroller == null) return;

                    clearInterval(checkExist);
                    scroller.parentElement.onclick = (e) => {
                        const target = e.target;
                        const src = target.firstChild.src;
                        if (src.slice(-7, -4) == "gif" || target.parentElement.parentElement.children[0].firstChild.children[1].innerHTML != serverName) {
                            const curChannel = BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId();
                            const url = src.slice(0, -4) + "?size=40";
                            useFileUpload ?
                                fetch(url)
                                .then(res => res.blob()).then(blob => {
                                    BdApi.findModuleByProps("instantBatchUpload").instantBatchUpload(curChannel, [new File([blob], 'oSumAtrIX.gif', blob)]);
                                }) :
                                BdApi.findModuleByProps("sendMessage").sendMessage(curChannel, {
                                    content: url
                                });
                        }
                    }
                }, 100);
            }
    }
}
