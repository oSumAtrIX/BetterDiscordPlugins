//META{"name":"VoiceMessage","source":"https://github.com/oSumAtrIX/BetterDiscordPlugins","website":"https://github.com/oSumAtrIX"}*//
class VoiceMessage {
    getName() {
        return "VoiceMessage";
    }
    getDescription() {
        return "Send Voice Messages just like in WhatsApp";
    }
    getVersion() {
        return "1.1";
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
        var buttonRow = document.getElementsByClassName("buttons-3JBrkn")[0],
            audioButton = document.createElement("button"),
            svgContainer = document.createElement("svg"),
            svgContainerAttributes = {
                "width": "22",
                "height": "22",
                "fill": "currentColor",
                "class": "icon-GhnIRB icon-3D60ES",
                "viewBox": "0 -4 24 24"
            },
            svgPath = document.createElement("path");

        for (var key in svgContainerAttributes) {
            svgContainer.setAttribute(key, svgContainerAttributes[key]);
        }

        svgPath.setAttribute("d", "M7,4.4408921e-16 C8.65685425,0 10,1.34314575 10,3 L10,9 C10,10.6568542 8.65685425,12 7,12 C5.34314575,12 4,10.6568542 4,9 L4,3 C4,1.34314575 5.34314575,4.4408921e-16 7,0 L7,4.4408921e-16 Z M14,9 C14,12.53 11.39,15.44 8,15.93 L8,19 L6,19 L6,15.93 C2.61,15.44 0,12.53 0,9 L2,9 C2,11.7614237 4.23857625,14 7,14 C9.76142375,14 12,11.7614237 12,9 L14,9 L14,9 Z");
        
        audioButton.setAttribute("type", "button");
        audioButton.setAttribute("class", "lookBlank-");
        audioButton.addEventListener("onmouseenter", function() {
            svgContainer.style.filter = "brightness(0.2)";
        });

        svgContainer.appendChild(svgPath);
        audioButton.appendChild(svgContainer);
        buttonRow.insertBefore(audioButton, buttonRow.firstChild);

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(function(stream) {
            var mediaRecorder = new MediaRecorder(stream),
                chunks = [];
            audioButton.addEventListener("click", function() {
                if (mediaRecorder.state === 'inactive') {
                    audioButton.setAttribute("fill", "red");
                    svgContainer.style.filter = "brightness(1)";
                    mediaRecorder.start();
                } else {
                    svgContainer.style.filter = "brightness(0.7)";
                    setTimeout(() => mediaRecorder.stop(), 200)
                }
            });
            mediaRecorder.onstop = function(e) {
                BdApi.findModuleByProps("instantBatchUpload").instantBatchUpload(BdApi.findModuleByProps("getChannelId").getChannelId(), [new File(chunks, "VoiceMessage-" + new Date().toString().slice(4, 21).replace(" ", "-").replace(" ", "-").replace(" ", " ").replace(":", "-") + ".mp3")]);
                chunks = [];
            }
            mediaRecorder.ondataavailable = function(e) {
                chunks.push(e.data);
            }
        })
    }

}