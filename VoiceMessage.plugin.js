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
        const btn = document.createElement("button");
        btn.style.background = "url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTEyIDE0YzEuNjYgMCAyLjk5LTEuMzQgMi45OS0zTDE1IDVjMC0xLjY2LTEuMzQtMy0zLTNTOSAzLjM0IDkgNXY2YzAgMS42NiAxLjM0IDMgMyAzem01LjMtM2MwIDMtMi41NCA1LjEtNS4zIDUuMVM2LjcgMTQgNi43IDExSDVjMCAzLjQxIDIuNzIgNi4yMyA2IDYuNzJWMjFoMnYtMy4yOGMzLjI4LS40OCA2LTMuMyA2LTYuNzJoLTEuN3oiLz4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==)";
        btn.style.backgroundRepeat = "no-repeat";
        btn.style.backgroundPosition = "center";
        btn.style.filter = "brightness(0.5)";
        btn.className = "recordAudio";
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
        if (!document.getElementsByClassName(btn.className)[0]) {
            document.querySelector(".buttons-205you").appendChild(btn);
        }
    }

}
