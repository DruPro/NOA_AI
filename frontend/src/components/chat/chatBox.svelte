<script>
	let { chatInput = $bindable(), onSend, chatConfigManager } = $props();
	const modButtons = $state([
		{
			modiferType: 'file',
			vector: 'M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8',
			active: false
		},
		{
			modiferType: 'search',
			vector:
				'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.01 8.01 0 0 0 5.648 6.667M10.03 13c.151 2.439.848 4.73 1.97 6.752A15.9 15.9 0 0 0 13.97 13zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.01 8.01 0 0 0 19.938 13M4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333A8.01 8.01 0 0 0 4.062 11m5.969 0h3.938A15.9 15.9 0 0 0 12 4.248A15.9 15.9 0 0 0 10.03 11m4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.01 8.01 0 0 0-5.648-6.667',
			active: false
		}
	]);
	/**
	 * @typedef {import('$lib/types/chatConfig').Modifier;} Modifier
	 */

	/**
	 * @param {Modifier} modifier
	 */
	function onModifierToggle(modifier) {
		let handler = {
			/**
			 * @param {Modifier} modifier
			 */
			file: function (modifier) {
				chatConfigManager.toggleModifier(modifier);
			},
			/**
			 * @param {Modifier} modifier
			 */
			search: function (modifier) {
				chatConfigManager.toggleModifier(modifier);
				let selected = modButtons.find((button) => button.modiferType === modifier);
				if (selected.active) {
					selected.active = false;
				} else {
					selected.active = true;
				}
			}
		};
		if (handler.hasOwnProperty(modifier)) {
			handler[modifier](modifier);
		} else {
			console.error(`Error: ${modifier} does not have an existing handler`);
			return;
		}
	}
</script>

<div class="container_chat_bot">
	<div class="container-chat-options">
		<div class="chat">
			<div class="chat-bot">
				<textarea
					bind:value={chatInput}
					id="chat_bot"
					name="chat_bot"
					placeholder="Show me the current stock prices...✦˚"
				></textarea>
			</div>
			<div class="options">
				<div class="modifier-buttons">
					{#each modButtons as bttn}
						<button
							onclick={() => {
								onModifierToggle(bttn.modiferType);
							}}
							aria-label="modifier {bttn.modiferType} button"
							style="color:{bttn.active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.1'};"
						>
							<svg width="20" height="20" viewBox="0 0 24 24">
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d={bttn.vector}
								></path>
							</svg>
						</button>
					{/each}
				</div>
				<button onclick={onSend} class="btn-submit" aria-label="submit button">
					<i>
						<svg viewBox="0 0 512 512">
							<path
								fill="currentColor"
								d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05"
							></path>
						</svg>
					</i>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.container_chat_bot {
		display: flex;
		flex-direction: column;
	}

	.container_chat_bot .container-chat-options {
		position: relative;
		display: flex;
		background: linear-gradient(to bottom right, #7e7e7e, #363636, #363636, #363636, #363636);
		border-radius: 16px;
		padding: 1.5px;
		overflow: hidden;

		&::after {
			position: absolute;
			content: '';
			top: -10px;
			left: -10px;
			background: radial-gradient(
				ellipse at center,
				#ffffff,
				rgba(255, 255, 255, 0.3),
				rgba(255, 255, 255, 0.1),
				rgba(0, 0, 0, 0),
				rgba(0, 0, 0, 0),
				rgba(0, 0, 0, 0),
				rgba(0, 0, 0, 0)
			);
			width: 30px;
			height: 30px;
			filter: blur(1px);
		}
	}

	.container_chat_bot .container-chat-options .chat {
		display: flex;
		flex-direction: column;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 15px;
		width: 100%;
		overflow: hidden;
	}

	.container_chat_bot .container-chat-options .chat .chat-bot {
		position: relative;
		display: flex;
	}

	.container_chat_bot .chat .chat-bot textarea {
		background-color: transparent;
		border-radius: 16px;
		border: none;
		width: 100%;
		height: 50px;
		color: #ffffff;
		font-family: sans-serif;
		font-size: 12px;
		font-weight: 400;
		padding: 10px;
		resize: none;
		outline: none;

		&::-webkit-scrollbar {
			width: 10px;
			height: 10px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: #888;
			border-radius: 5px;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: #555;
			cursor: pointer;
		}

		&::placeholder {
			color: #f3f6fd;
			transition: all 0.3s ease;
		}
		&:focus::placeholder {
			color: #363636;
		}
	}

	.container_chat_bot .chat .options {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 10px;
	}

	.container_chat_bot .chat .options .modifier-buttons {
		display: flex;
		gap: 8px;

		& button {
			display: flex;
			background-color: transparent;
			border: none;
			cursor: pointer;
			transition: all 0.3s ease;

			&:hover {
				transform: translateY(-5px);
				color: #ffffff;
			}
		}
	}

	.container_chat_bot .chat .options .btn-submit {
		display: flex;
		padding: 2px;
		background-image: linear-gradient(to top, #292929, #555555, #292929);
		border-radius: 10px;
		box-shadow: inset 0 6px 2px -4px rgba(255, 255, 255, 0.5);
		cursor: pointer;
		border: none;
		outline: none;
		transition: all 0.15s ease;

		& i {
			width: 30px;
			height: 30px;
			padding: 6px;
			background: rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			backdrop-filter: blur(3px);
			color: #8b8b8b;
		}
		& svg {
			transition: all 0.3s ease;
		}
		&:hover svg {
			color: #f3f6fd;
			filter: drop-shadow(0 0 5px #ffffff);
		}

		&:focus svg {
			color: #f3f6fd;
			filter: drop-shadow(0 0 5px #ffffff);
			transform: scale(1.2) rotate(45deg) translateX(-2px) translateY(1px);
		}

		&:active {
			transform: scale(0.92);
		}
	}

	.container_chat_bot {
		padding: 14px 0;
		display: flex;
		color: #ffffff;
		font-size: 10px;
		gap: 4px;
	}
</style>
