<script>
	import { marked } from 'marked';
	let { markdown = '' } = $props();
</script>

<div class="card">
	<div class="card-info">
		<div class="preview">{@html marked(markdown)}</div>
	</div>
</div>

<style>
	.preview {
		color: white;
		font-family: Oxanium, sans-serif;
	}
	.card {
		--background: linear-gradient(to left, #014f44 0%, #00b48a 100%);
		width: 1200px;
		height: fit-content;
		padding-bottom: 10px;
		padding-top: 10px;
		margin-left: auto;
		height: 600px;
		padding: 5px;
		border-radius: 1rem;
		overflow: visible;
		background: #f7ba2b;
		background: var(--background);
		position: relative;
		z-index: 1;
	}

	.card::after {
		position: absolute;
		content: '';
		top: 30px;
		left: 0;
		right: 0;
		z-index: -1;
		height: 100%;
		width: 100%;
		transform: scale(0.8);
		filter: blur(25px);
		background: #f7ba2b;
		background: var(--background);
		transition: opacity 0.5s;
	}

	.card-info {
		--color: #181818;
		background: var(--color);
		color: var(--color);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		overflow: visible;
		border-radius: 0.7rem;
	}

	/*Hover*/
	.card:hover::after {
		opacity: 0;
	}

	.card:hover .card-info {
		transition: color 1s;
	}
</style>
