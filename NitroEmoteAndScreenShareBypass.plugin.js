//META{"name":"NitroEmoteAndScreenShareBypass","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class NitroEmoteAndScreenShareBypass {
    getName() {
        return "NitroEmoteAndScreenShareBypass";
    }
    getDescription() {
        return "Send nitro emotes (lame bypass) and enable high quality screen sharing without Nitro";
    }
    getVersion() {
        return "3.5";
    }
    getAuthor() {
        return "oSumAtrIX";
    }
    stop() {

    }
    start() {
        const mod = BdApi.findModuleByProps("getCurrentUser")
        let tries;
        const checkExist = setInterval(() => {
            let cUser;
            if ((cUser = mod.getCurrentUser()) != undefined) {
                cUser.premiumType = 2;
                tries = 10;
            }
            if (++tries > 10)
                clearInterval(checkExist);
        }, 1000);
    }

    onSwitch() {
        const
            useFileUpload = false,
            div = document.getElementsByClassName("name-3YKhmS")[0],
            serverName = div != undefined ? div.innerHTML : "noServer",
            btnContainer = document.getElementsByClassName("buttons-3JBrkn")[0].children,
            btn = btnContainer[btnContainer.length - 1];

        if (btn != null)
            btn.onclick = () => {

                const checkExist = setInterval(function() {
                    const scroller = document.getElementsByClassName("listItems-1uJgMC")[0];
                    if (scroller == null) return;
                    clearInterval(checkExist);
                    scroller.parentElement.onclick = (e) => {
                        const
                            target = e.target,
                            src = target.firstChild.src;
                        if (src.slice(-7, -4) == "gif" || target.parentElement.parentElement.children[0].firstChild.children[1].innerHTML != serverName) {
                            const curChannel = BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId();
                            var url = src.slice(0, -4);
                            var ext = url.slice(url.length - 3);

                            function upLoad(blob) {
                                BdApi.findModuleByProps("instantBatchUpload").instantBatchUpload(curChannel, [new File([blob], 'oSumAtrIX.' + ext, blob)]);
                            }

                            var txtBar = document.getElementsByClassName("textArea-12jD-V")[0];
                            url = url + "?size=40";
                            useFileUpload ?
                                fetch(url)
                                .then(res => res.blob()).then(upLoad) :
                                BdApi.findModuleByProps("sendMessage").sendMessage(curChannel, {
                                    content: url
                                });



                        }

                    }
                }, 100);

            }
    }
}
