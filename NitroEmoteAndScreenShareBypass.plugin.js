/**
 * @name NitroEmoteAndScreenShareBypass
 * @author oSumAtrIX
 * @authorId 737323631117598811
 * @version 3.6.4
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
		return "3.6.4";
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
			div = document.getElementsByClassName("name-3Uvkvr")[0],
			serverName = div != undefined ? div.innerHTML : "noServer",
			btnContainer = document.getElementsByClassName("buttons-uaqb-5")[0].children,
			btn = btnContainer[btnContainer.length - 1];

		if (btn != null)
			btn.onclick = () => {
				const checkExist = setInterval(function() {
					const scroller = document.getElementsByClassName("listItems-6eZzQ1")[0];
					if (scroller == null) return;
					clearInterval(checkExist);
					scroller.parentElement.onclick = (e) => {
						const
							target = e.target,
							src = target.firstChild.src;
						if (src == undefined) return;

						let server = target.parentElement.parentElement.children[0].firstChild.children[1] || document.querySelector("div.colorStandard-21JIj7.size12-oc4dx4.titleSecondary-3hcpuB").children[0];
						let url = src.slice(0, -19);
						let ext = url.split(/[#?]/)[0].split('.').pop().trim();
						if (ext == "gif" || server != serverName) {
							const curChannel = BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId();
							function upload(blob) {
								BdApi.findModuleByProps("instantBatchUpload").instantBatchUpload(curChannel, [new File([blob], 'oSumAtrIX.' + ext, blob)]);
							}

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
