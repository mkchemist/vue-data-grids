<template>
  <div id="vue__data-grids-processing" class="vue__data-grids-processing">
    <p>Processing</p>
    <div class="loading__circles-container">
        <div class="loading__circle-dot"></div>
        <div class="loading__circle-dot"></div>
        <div class="loading__circle-dot"></div>
        <div class="loading__circle-dot"></div>
    </div>  
  </div>
</template>

<script>
export default {

};
</script>

<style  scoped>
    .vue__data-grids-processing {
        position:absolute;
        background-color: white;
        top:0;
        width:40%;
        left:30%;
        text-align: center;
        font-weight: 500;
        box-shadow: 1px 5px 5px 2px #1113;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding:.5rem;
        border-radius: 5px;
    }

    .loading__circles-container {
        width:100%;
        display: flex;
        justify-content: center;
    }

    .loading__circle-dot {
        width:10px;
        height:10px;
        background-color: #282830;
        margin:0 1rem;
        border-radius: 50%;
        animation-name: grow_up;
        animation-duration: 1s;
        animation-iteration-count: infinite;
    }

    .loading__circle-dot:nth-child(2) {
        animation-delay: .25s;
    }
    .loading__circle-dot:nth-child(3) {
        animation-delay: .5s;
    }

    .loading__circle-dot:nth-child(4) {
        animation-delay: .75s;
    }

    @keyframes grow_up {
        0% {
            width:10px;
            height:10px;
        }
        80% {
            width: 15px;
            height: 15px;
            opacity:.8;
        }
        100% {
            width:10px;
            height:10px;
        }
    }
</style>