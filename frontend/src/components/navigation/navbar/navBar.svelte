<script>
    import NavButton from "./ navButton.svelte";
</script>

<div class="navbar-wrapper">
    <NavButton route="/dashboard" text="Dashboard"></NavButton>
</div>


<style>
    .navbar-wrapper{
        background: #111111;
        display: flex;
        border-bottom: 1px solid white;
        border-radius: 0px 0px 10px 10px;
        box-shadow: 0px 10px 400px 1px rgb(57, 57, 57)    }
</style>