//META{"name":"VoiceMessage","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class VoiceMessage {
    getName() {
        return "VoiceMessage";
    }
    getDescription() {
        return "Send Voice Messages just like in WhatsApp";
    }
    getVersion() {
        return "0.0.1";
    }
    getAuthor() {
        return "oSumAtrIX";
    }
    load() {

    }
    start() { }

    stop() {
    	
    }
    onSwitch() {
    	if (document.getElementsByClassName("ghost-button-wrapper").length == 0) {
        var daButtons = document.getElementsByClassName("buttons-205you")[0], ghostButton = document.createElement("button"), btnInner = document.createElement("div"), btn = document.createElement("img");
        ghostButton.setAttribute("type", "button");
        ghostButton.setAttribute("class", "buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL da-lookBlank colorBrand-3pXr91 da-colorBrand grow-q77ONN da-grow normal ghost-button-wrapper");
        btn.setAttribute("src", "https://discordapp.com/assets/4bc527c257233fc69b94342d77bcb9ee.svg");
        btn.setAttribute("class", "icon-3D60ES da-icon");
        btn.setAttribute("width", "22");
        btn.setAttribute("height", "22");
        btnInner.setAttribute("class", "contents-18-Yxp da-contents button-3AYNKb da-button button-2vd_v_ da-button ghost-button-inner");
        btnInner.appendChild(btn);
        ghostButton.appendChild(btnInner);
        daButtons.insertBefore(ghostButton, daButtons.firstChild);

        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({
                    audio: true
                })
                .then(function(stream) {
                    var mediaRecorder = new MediaRecorder(stream),
                        chunks = [];
                    btn.addEventListener("mousedown", function() {
                        btn.style.filter = "brightness(1.5)";
                        mediaRecorder.start();
                    });
                    btn.addEventListener("mouseup", function() {
                        btn.style.filter = "brightness(0.5)";
                        setTimeout(()=>mediaRecorder.stop(), 200)
                    });
                    mediaRecorder.onstop = function(e) {
                        BdApi.findModuleByProps("instantBatchUpload").instantBatchUpload(BdApi.findModuleByProps("getChannelId").getChannelId(), [new File(chunks, "Voice Message.mp3")]);
                        chunks = [];
                    }
                    mediaRecorder.ondataavailable = function(e) {
                        chunks.push(e.data);
                    }
                })
        };
        }
        if (!document.getElementsByClassName(btn.className)[0]) {
            document.querySelector(".buttons-205you").appendChild(btn);
        }
    }

}
