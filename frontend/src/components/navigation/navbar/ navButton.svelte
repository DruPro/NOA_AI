<script>
	let { route = "/", text = "" } = $props();
</script>

<div class="nav-button">
	<a class="audio-wide" href={route}>{text}</a>
	<span class="border top"></span>
	<span class="border right"></span>
	<span class="border bottom"></span>
	<span class="border left"></span>
</div>

<style>
	.nav-button {
		position: relative;
		padding: 20px 40px;
		border-radius: 10px;
		overflow: hidden;
		cursor: pointer;
		background: transparent;
		display: inline-block;
		text-align: center;
		transition: background 0.3s ease;
	}

	.nav-button a {
		color: white;
		text-decoration: none;
		position: relative;
		z-index: 1;
	}

	/* Border elements */
	.border {
		position: absolute;
		background: white;
		transition: transform 0.3s ease;
	}

	/* Top & bottom */
	.border.top,
	.border.bottom {
		height: 2px;
		width: 100%;
		left: 0;
		transform: scaleX(0);
		transform-origin: left;
	}
	.border.top {
		top: 0;
	}
	.border.bottom {
		bottom: 0;
		transform-origin: right;
	}

	/* Left & right */
	.border.left,
	.border.right {
		width: 2px;
		height: 100%;
		top: 0;
		transform: scaleY(0);
		transform-origin: top;
	}
	.border.left {
		left: 0;
	}
	.border.right {
		right: 0;
		transform-origin: bottom;
	}

	/* Hover animation */
	.nav-button:hover .border.top {
		transform: scaleX(1);
		transition-delay: 0s;
	}
	.nav-button:hover .border.right {
		transform: scaleY(1);
		transition-delay: 0.1s;
	}
	.nav-button:hover .border.bottom {
		transform: scaleX(1);
		transition-delay: 0.2s;
	}
	.nav-button:hover .border.left {
		transform: scaleY(1);
		transition-delay: 0.3s;
	}
</style>
