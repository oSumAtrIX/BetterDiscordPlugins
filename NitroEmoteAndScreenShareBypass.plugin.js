//META{"name":"NitroEmoteAndScreenShareBypass","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class NitroEmoteAndScreenShareBypass {
    getName() {
        return "NitroEmoteAndScreenShareBypass";
    }
    getDescription() {
        return "Send nitro emotes (lame bypass) and enable high quality screen sharing without Nitro";
    }
    getVersion() {
        return "3.3";
    }
    getAuthor() {
        return "oSumAtrIX";
    }
    stop() {

    }
    start() {
        const checkExist = setInterval(() => {
            for (const mdl of Object.values(webpackJsonp.push([
                    [], {
                        ['']: (_, e, r) => {
                            e.cache = r.c
                        }
                    },
                    [
                        ['']
                    ]
                ]).cache)) {
            	if (mdl.exports == undefined) 
            		continue;
            	
                const d = mdl.exports.default;
                if (d && d['getCurrentUser']) d.getCurrentUser().premiumType = 2;
            }
            clearInterval(checkExist);
        }, 1000);
    }

    onSwitch() {
        const
            useFileUpload = false,
            div = document.getElementsByClassName("name-3YKhmS")[0],
            serverName = div != undefined ? div.innerHTML : "noServer",
            btnContainer = $(".buttonContainer-28fw2U"),
            btn = btnContainer[btnContainer.length - 1];

        if (btn != null)
            btn.onclick = () => {
                const checkExist = setInterval(function() {
                    const scroller = $(".listItems-1uJgMC")[0];
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

                            var txtBar = $(".textArea-12jD-V")[0];
                            if (txtBar.children.length != 1) {
                                url = url + "?size=40";
                                useFileUpload ?
                                    fetch(url)
                                    .then(res => res.blob()).then(upLoad) :
                                    BdApi.findModuleByProps("sendMessage").sendMessage(curChannel, {
                                        content: url
                                    });
                                return;
                            }

                            var measuringSpan = document.createElement("span");
                            measuringSpan.innerText = txtBar.textContent.split(' ').join('M');
                            measuringSpan.style.display = 'none';
                            document.body.appendChild(measuringSpan);
                            var width = $(measuringSpan).width();

                            var img = document.createElement("img");
                            img.crossOrigin = "Anonymous"
                            document.body.appendChild(img);

                            var img = document.createElement("img");
                            img.crossOrigin = "Anonymous"
                            document.body.appendChild(img);
                            img.onload = (me) => {
                                var img = $(me.path[0]);
                                var canvas = document.createElement('canvas'),
                                    ctx = canvas.getContext('2d');
                                canvas.width = img.width() + width + 10;
                                canvas.crossOrigin = "Anonymous";
                                canvas.height = 20;
                                ctx.drawImage(img.get(0), 0, 0);
                                ctx.font = "16px Whitney";
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(img.get(0), 0, 0);
                                ctx.fillStyle = "#DCDDDE";
                                ctx.fillText(txtBar.textContent, 27, 15);
                                canvas.toBlob((blob) => {
                                    upLoad(blob);
                                    img.remove();
                                    measuringSpan.remove();
                                });
                            };

                            img.src = url + "?size=20";
                        }

                    }
                }, 100);
            }
    }
}
