<script>
	let { onclick, text } = $props();
</script>

<button {onclick}>{text}</button>

<style>
    button {
        color: white;
        background-color: var(--dark-tint);
        border: 1px solid white;
        padding: 20px;
        border-radius: 0px 10px 0px 10px
    }
</style>
