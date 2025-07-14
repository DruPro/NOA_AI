<script>
	import useIndicatorManager from '../../managers/indicatorMangager.svelte';
	import ChatBox from '../chat/chatbox.svelte';
	import Indicator from '../chat/indicators/indicator.svelte';
	import ChatOutput from '../chat/ouput/chatOutput.svelte';
	import ThinkingImage from '$lib/icons/ai/network_intelligence_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
	import useChatConfigManager from '../../managers/chatConfigManager.svelte';
	import useChatListener  from '../../managers/chatListener.svelte';

	let indicatorManager = useIndicatorManager();
	let chatConfigManager = useChatConfigManager();
	let chatListener = useChatListener();
	let chatInput = $state('');

	async function onSend() {
		getChatOutput()
	}

	async function getChatOutput() {
		if(!chatListener.isListening()){
			chatConfigManager.setPrompt(chatInput)
			chatConfigManager.setPromptRole("User")
			chatListener.transition('chatInit')
			chatListener.exec(chatConfigManager,indicatorManager)
		}
	}
	
</script>

<div class="grid">
	<div class="column-left">
		<ChatBox bind:chatInput {onSend} {chatConfigManager}></ChatBox>
		<div class="indicator-list">
			{#each indicatorManager.context.indicators as indicator}
				<Indicator text={indicator.message} imageSource={indicator.icon} status={indicator.status}
				></Indicator>
			{/each}
		</div>
	</div>
	<ChatOutput markdown={chatListener.chatListenerConfig.output}></ChatOutput>
</div>

<style>
	.grid {
		height: 100%;
		--color: rgba(114, 114, 114, 0.3);
		background-color: #191a1a;
		background-image:
			linear-gradient(
				0deg,
				transparent 24%,
				var(--color) 25%,
				var(--color) 26%,
				transparent 27%,
				transparent 74%,
				var(--color) 75%,
				var(--color) 76%,
				transparent 77%,
				transparent
			),
			linear-gradient(
				90deg,
				transparent 24%,
				var(--color) 25%,
				var(--color) 26%,
				transparent 27%,
				transparent 74%,
				var(--color) 75%,
				var(--color) 76%,
				transparent 77%,
				transparent
			);
		background-size: 55px 55px;
		display: flex;
		padding: 40px;
	}
	.column-left {
		width: fit-content;
		max-width: 400px;
		padding-right: 10px;
	}
</style>
