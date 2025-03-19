<template>

    <div slot="footer" id="main-flow-header-text-wrapper">
        <p>Public Works Department</p>
        <p><a target="_blank" href="https://www.lowerpaxtonatwork.com/">www.lowerpaxtonatwork.com</a></p>
    </div>

</template>

<style scoped>
#main-flow-header-text-wrapper {
    display: flex;
    flex-direction: column;

    & p {
        text-align: center;
        margin: 0px;
        padding: 0px;
        line-height: 1.25rem;
    }

    & p a {
        color: inherit;
        text-underline-offset: 3px;
    }

    & p:nth-child(1) {
        color: var(--calcite-color-text-1);
        font-size: 1rem;
        font-weight: 500;
    }
}
</style>
