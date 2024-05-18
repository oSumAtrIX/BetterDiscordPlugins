/**
 * @name NitroEmoteAndScreenShareBypass
 * @author oSumAtrIX
 * @authorId 737323631117598811
 * @version 4.3
 * @description Send Nitro emojis and enable high quality screen sharing without Discord Nitro.
 * @website https://osumatrix.me
 * @source https://github.com/oSumAtrIX/BetterDiscordPlugins
 * @updateUrl https://raw.githubusercontent.com/oSumAtrIX/BetterDiscordPlugins/master/NitroEmoteAndScreenShareBypass.plugin.js
 */
module.exports = (() => {
	const config = {
		info: {
			name: "NitroEmoteAndScreenShareBypass",
			authors: [
				{
					name: "oSumAtrIX",
					discord_id: "737323631117598811",
					github_username: "oSumAtrIX",
				},
			],
			version: "4.2",
			description:
				"Send Nitro emojis and enable high quality screen sharing without Discord Nitro",
			github: "https://github.com/oSumAtrIX/BetterDiscordPlugins",
			github_raw:
				"https://raw.githubusercontent.com/oSumAtrIX/BetterDiscordPlugins/master/NitroEmoteAndScreenShareBypass.plugin.js",
		},
		main: "NitroEmoteAndScreenShareBypass.plugin.js",
	};

	return !global.ZeresPluginLibrary
		? class {
				constructor() {
					this._config = config;
				}
				getName() {
					return config.info.name;
				}
				getAuthor() {
					return config.info.authors.map((a) => a.name).join(", ");
				}
				getDescription() {
					return config.info.description;
				}
				getVersion() {
					return config.info.version;
				}
				load() {
					BdApi.showConfirmationModal(
						"Library Missing",
						`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`,
						{
							confirmText: "Download Now",
							cancelText: "Cancel",
							onConfirm: () => {
								require("request").get(
									"https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",
									async (error, response, body) => {
										if (error)
											return require("electron").shell.openExternal(
												"https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js"
											);
										await new Promise((r) =>
											require("fs").writeFile(
												require("path").join(
													BdApi.Plugins.folder,
													"0PluginLibrary.plugin.js"
												),
												body,
												r
											)
										);
									}
								);
							},
						}
					);
				}
				start() {}
				stop() {}
		  }
		: (([Plugin, Api]) => {
				const plugin = (Plugin, Api) => {
					const { Patcher, DiscordModules, Settings, PluginUtilities } = Api;
					return class NitroEmoteAndScreenShareBypass extends Plugin {
						settings = PluginUtilities.loadSettings(this.getName(), {
							size: 48,
						});
						getSettingsPanel() {
							return Settings.SettingPanel.build(
								(_) =>
									PluginUtilities.saveSettings(this.getName(), this.settings),
								...[
									new Settings.Slider(
										"Emoji size",
										"Chose the size of emojis.",
										16,
										128,
										this.settings.size,
										(size) => (this.settings.size = size),
										{
											markers: [16, 20, 32, 48, 64, 128],
											stickToMarkers: true,
										}
									),
								]
							);
						}

						onStart() {
							// Spoof client side Discord Nitro.
							let tries = 1;
							let intervalId = setInterval(() => {
								if (++tries > 5) clearInterval(intervalId);

								const user =
									ZeresPluginLibrary.DiscordModules.UserStore.getCurrentUser();
								if (!user) return;
								user.premiumType = 2;
								clearInterval(intervalId);
							}, 1000);

							Patcher.before(
								DiscordModules.MessageActions,
								"sendMessage",
								(_, [, message]) => {
									const emojis = message.validNonShortcutEmojis;

									emojis.forEach((emoji) => {
										// Skip Discord emojis.
										if (!emoji.require_colons) return;

										// Construct the emoji string in the original message.
										const emojiString = `<${emoji.animated ? "a" : ""}:${
											emoji.name
										}:${emoji.id}>`;

										let url =
											"https://cdn.discordapp.com/emojis/" +
											emoji.id +
											"." +
											(emoji.animated ? "gif" : "webp") +
											"?size=" +
											this.settings.size;

										// Replace the message containing the emoji string with the URL.
										message.content = message.content.replace(emojiString, url);
									});
								}
							);
						}

						onStop() {
							Patcher.unpatchAll();
						}
					};
				};
				return plugin(Plugin, Api);
		  })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
