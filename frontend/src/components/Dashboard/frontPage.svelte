<script>
	import DarkButton from "../buttons/darkButton.svelte";
	import BrainIcon from '$lib/icons/ai/network_intelligence_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
	import NavBar from "../navigation/navbar/navBar.svelte";
	import { goto } from "$app/navigation";
</script>

<div class="nexus-launch">
	<NavBar />
	<section class="hero">
		<div class="logo-title">
			<h1 class="brand-name">
				N
				<span class="icon-wrapper">
					<img src={BrainIcon} alt="brain" />
				</span>
				A
			</h1>
			<h2 class="tagline">The Nexus of Intelligence & Speed</h2>
			<p class="subtext">A powerful, lightweight research assistant built for the future.</p>

		</div>
	</section>
</div>

<style>
	.nexus-launch {
		background: radial-gradient(circle at 20% 40%, #0e0e0e 0%, #090909 100%);
		color: var(--text-color-dark);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hero {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 90vh;
		text-align: center;
		padding: 2rem;
	}

	.logo-title {
		background: rgba(255, 255, 255, 0.02);
		padding: 3rem;
		border: 1px solid var(--border-1);
		border-radius: 24px;
		backdrop-filter: blur(10px);
		box-shadow: 0 0 40px rgba(0, 255, 200, 0.05);
		transition: all 0.3s ease;
	}

	.logo-title:hover {
		box-shadow: 0 0 80px rgba(0, 255, 200, 0.15);
		transform: scale(1.015);
	}

	.brand-name {
		font-size: 8rem;
		font-family: "Orbitron", sans-serif;
		letter-spacing: 0.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-color-dark);
	}

	.icon-wrapper img {
		width: 100px;
		margin: 0 1rem;
		filter: drop-shadow(0 0 10px rgba(0, 255, 200, 0.4));
	}

	.tagline {
		font-size: 2rem;
		font-family: "Oxanium", sans-serif;
		margin-top: 1.5rem;
		color: var(--text-color-dark);
	}

	.subtext {
		font-size: 1rem;
		font-family: "Oxanium", sans-serif;
		color: var(--text-color-muted);
		margin-top: 0.5rem;
		margin-bottom: 2rem;
		max-width: 480px;
		margin-left: auto;
		margin-right: auto;
	}
	
</style>
