<label class="container">
	<input type="checkbox" checked="checked" />
	<div class="checkmark"></div>
</label>

<style>
	.container input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.container {
		display: block;
		position: relative;
		cursor: pointer;
		font-size: 25px;
		user-select: none;
	}

	/* Create a custom checkbox */
	.checkmark {
		position: relative;
		top: 0;
		left: 0.8;
		height: 1em;
		width: 1em;
		background: black;
		border-radius: 50px;
		transition: all 0.7s;
		--spread: 20px;
	}

	/* When the checkbox is checked, add a blue background */
	.container input:checked ~ .checkmark {
		background: rgb(0, 0, 0);
		box-shadow:
			-10px -10px var(--spread) 0px #5b51d8,
			0 -10px var(--spread) 0px #833ab4,
			10px -10px var(--spread) 0px #e1306c,
			10px 0 var(--spread) 0px #fd1d1d,
			10px 10px var(--spread) 0px #f77737,
			0 10px var(--spread) 0px #fcaf45,
			-10px 10px var(--spread) 0px #ffdc80;
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	.checkmark:after {
		content: '';
		position: absolute;
		display: none;
	}

	/* Show the checkmark when checked */
	.container input:checked ~ .checkmark:after {
		display: block;
	}

	/* Style the checkmark/indicator */
	.container .checkmark:after {
		left: 0.3em;
		top: 0em;
		width: 0.25em;
		height: 0.5em;
		border: solid #f0f0f0;
		border-width: 0 0.15em 0.15em 0;
		transform: rotate(40deg);
	}
</style>
