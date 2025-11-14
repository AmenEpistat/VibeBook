<template>
    <vue-particles
        id="tsparticles"
        :options="particlesOptions"
        @particles-loaded="particlesLoaded"
    />
</template>

<script setup lang="ts">
const particlesLoaded = async (container: any) => {
    console.log('Particles container loaded', container);
};

const particlesOptions = {
    background: {
        color: {
            value: '#ffffff',
        },
    },
    fpsLimit: 120,
    fullScreen: {
        enable: false,
        zIndex: 0,
    },
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push',
            },
            onHover: {
                enable: true,
                mode: 'grab',
            },
        },
        modes: {
            grab: {
                distance: 450,
            },
        },
    },
    particles: {
        color: {
            value: '#14919b',
        },
        links: {
            color: '#14919b',
            distance: 150,
            enable: true,
            opacity: 1,
            width: 0.7,
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: 'bounce',
            random: false,
            speed: 2,
            straight: false,
        },
        number: {
            density: {
                enable: true,
            },
            value: 140,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: 'circle',
            close: true,
            fill: true,
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
    detectRetina: true,
};
</script>

<style lang="scss">
#tsparticles {
    height: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
}
</style>
