/**
 * @name NitroEmoteAndScreenShareBypass
 * @author oSumAtrIX
 * @authorId 737323631117598811
 * @version 3.6.1
 * @description Send Nitro emotes and enable high quality screen sharing without Nitro
 * @website https://osumatrix.me
 * @source https://github.com/oSumAtrIX/BetterDiscordPlugins
 * @updateUrl https://raw.githubusercontent.com/oSumAtrIX/BetterDiscordPlugins/master/NitroEmoteAndScreenShareBypass.plugin.js
 */
class NitroEmoteAndScreenShareBypass {
	getName() {
		return "NitroEmoteAndScreenShareBypass";
	}
	getDescription() {
		return "Send Nitro emotes and enable high quality screen sharing without Nitro";
	}
	getVersion() {
		return "3.6.2";
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
						if (src == undefined) return;
						let server = target.parentElement.parentElement.children[0].firstChild.children[1] || document.querySelector("div.colorStandard-2KCXvj.size12-3cLvbJ.titleSecondary-3Dh_RZ").children[0];
						if (src.slice(-7, -4) == "gif" || server != serverName) {
							const curChannel = BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId();
							var url = src.slice(0, -2);
							var ext = url.slice(url.length - 9, -6);

							function upload(blob) {
								BdApi.findModuleByProps("instantBatchUpload").instantBatchUpload(curChannel, [new File([blob], 'oSumAtrIX.' + ext, blob)]);
							}

							var txtBar = document.getElementsByClassName("textArea-12jD-V")[0];
							url = url + "40";
							useFileUpload ?
								fetch(url)
								.then(res => res.blob()).then(upload) :
								BdApi.findModuleByProps("sendMessage").sendMessage(curChannel, {
									content: url
								});
						}

					}
				}, 100);

			}
	}
}
