<script>
	import { onMount } from 'svelte';
	import Banter from '../../loaders/banter.svelte';
	import CheckMark from '../../loaders/checkMark.svelte';
	import DefaultWebImage from '$lib/icons/web/website-icon-11.png' 
	let { imageSource = DefaultWebImage, text = 'This is an indicator', status = false } = $props();
</script>

<div class="indicator-wrapper">
	<h1>{text}</h1>
	<div><img src={imageSource? imageSource : DefaultWebImage } alt="web icon" /></div>
	{#if status}
		<Banter></Banter>
	{:else}
		<CheckMark></CheckMark>
	{/if}
</div>

<style>
	.indicator-wrapper {
		display: flex;
		gap: 10px;
		align-items: center;
		color: white;
		flex-wrap: wrap;
		text-wrap: wrap;
		font-family: 'Oxanium', sans-serif;
		font-size: 0.5rem;
		animation: slideIn 0.5s cubic-bezier(0.56, 0.09, 0, 1.11);
	}
	.indicator-wrapper img {
		width: 20px;
	}
	/* Slide-in animation */
	@keyframes slideIn {
		0% {
			transform: translateX(-100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
