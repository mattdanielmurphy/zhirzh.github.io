Using dashed-dotted-lines to create _sweet and simple_ animations.

## Static borders

We can render dotted and dashed lines using CSS borders but we can't animate them. The size and spacing of the border is controlled by the browser.

<figure>
    <div id="demo-1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
    </div>
    <style>
        #demo-1 {
            border-width: 4px;
            border-color: silver;
            border-bottom-style: dashed;
            border-top-style: dotted;
        }
    </style>
</figure>

```html
<div id="demo-1">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit
</div>

<style>
  #demo-1 {
    border-width: 4px;
    border-color: silver;
    border-bottom-style: dashed;
    border-top-style: dotted;
  }
</style>
```

## Background & animations

If we use linear gradient background for drawing the lines, we can use CSS animations to animate them.

<figure>
    <div id="demo-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit
    </div>
    <style>
        #demo-2 {
            background-image: linear-gradient(
                to right,
                silver 50%,
                transparent 0%
            );
            background-size: 8px 4px;
            background-repeat: repeat-x;
            background-position: 0% bottom;
            animation: border-dance linear infinite 24s;
        }
        @keyframes border-dance {
            from {
                background-position-x: 0%;
            }
            to {
                background-position-x: 100%;
            }
        }
    </style>
</figure>

```html
<div id="demo-2">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit
</div>

<style>
  #demo-2 {
    background-image: linear-gradient(
      to right,
      silver 50%,
      transparent 0%
    );
    background-size: 8px 4px;
    background-repeat: repeat-x;
    background-position: 0% bottom;
    animation: border-dance linear infinite 24s;
  }
  @keyframes border-dance {
    from {
      background-position-x: 0%;
    }
    to {
      background-position-x: 100%;
    }
  }
</style>
```

## SVG is better

We already have animated lines but the main problem here is that it is rather difficult to to control the animation. For example, animating the dash size change the animation speed.

SVG is a much better alternative for this purpose. It allows us control over the dash sizes, their spacing and the offset. Try out the interactive demo below to test out the parameters.

<figure>
    <div>
        <style>
            #demo-3-box {
                display: table;
                margin: 20px auto 10px;
            }
            #demo-3 {
                border: 1px solid silver;
            }
            #demo-3 line {
                stroke: black;
                stroke-width: 4px;
            }
        </style>
        <div id="demo-3-box">
            <svg id="demo-3" width="200" height="50">
                <line id="trial" y1="25" x2="200" y2="25" stroke-dasharray="10" />
            </svg>
            <div>
                Dash Size
                <input id="strokeDashSize" type="range" value="10" min="1" max="50">
                <span id="strokeDashSizeValue">10</span>
            </div>
            <div>
                Dash Space
                <input id="strokeDashSpace" type="range" value="10" min="0" max="50">
                <span id="strokeDashSpaceValue">10</span>
            </div>
            <div>
                Dash Offset
                <input id="strokeDashOffset" type="range" value="0" min="-100" max="100">
                <span id="strokeDashOffsetValue">0</span>
            </div>
        </div>
        <script>
            strokeDashSize.oninput = e => {
                trial.setAttribute('stroke-dasharray', `${strokeDashSize.value}, ${strokeDashSpace.value}`);
                strokeDashSizeValue.innerText = strokeDashSize.value;
            };
            strokeDashSpace.oninput = e => {
                trial.setAttribute('stroke-dasharray', `${strokeDashSize.value}, ${strokeDashSpace.value}`);
                strokeDashSpaceValue.innerText = strokeDashSpace.value;
            };
            strokeDashOffset.oninput = e => {
                trial.setAttribute('stroke-dashoffset', strokeDashOffset.value);
                strokeDashOffsetValue.innerText = strokeDashOffset.value;
            };
        </script>
    </div>
</figure>

We can create loaders and interactive elements simply by animating these values.

<figure>
    <style>
        #demo-final {
            display: flex;
            justify-content: space-around;
        }
        #demo-final svg {
            width: 130px;
            height: 130px;
            box-shadow: 0 0 2px silver;
        }
        #demo-final path {
            stroke-width: 1px;
            stroke: black;
            fill: none;
        }
        #loader line {
            stroke-width: 20px;
        }
        #loader #line-bg {
            stroke: deepskyblue;
        }
        #loader #line-fg {
            opacity: 0.2;
            stroke: black;
            stroke-dasharray: 20px, 20px;
            transform-origin: center;
            transform: skewX(30deg);
            animation: loader-progress 2s linear infinite;
        }
        @keyframes loader-progress {
            from {
                stroke-dashoffset: 0;
            }
            to {
                stroke-dashoffset: -120px;
            }
        }
        #computer path {
            stroke-dasharray: 1000px;
            stroke-dashoffset: 1000px;
            transition: stroke-dashoffset 600ms;
            transition-timing-function: ease-out;
        }
        #computer:hover path {
            transition-timing-function: ease-in;
            stroke-dashoffset: 0;
        }
        #lock path {
            stroke-dasharray: 5px;
            stroke-dashoffset: 0;
            animation: lock-marching-ants 4s infinite linear;
            transition: animation-duration 10s;
        }
        #lock:hover path {
            animation-play-state: paused;
        }
        @keyframes lock-marching-ants {
            from {
                stroke-dashoffset: 0;
            }
            to {
                stroke-dashoffset: 100px;
            }
        }
    </style>
    <div id="demo-final">
        <svg id="loader" width="30%" height="150px">
            <line id="line-bg" x1="0" x2="100%" y1="50%" y2="50%" />
            <line id="line-fg" x1="0" x2="100%" y1="50%" y2="50%" />
        </svg>
        <svg id="computer">
            <path
                d="M9.778,104h38.222v16h-8.08c-4.374,0,-7.920,3.546,-7.920,7.920v0.083h64v-0.083c0,-4.374,-3.546,-7.920,-7.920,-7.920h-8.08v-16h38.222c5.4,0,9.778,-4.378,9.778,-9.778v-76.445c0,-5.4,-4.378,-9.778,-9.778,-9.778h-108.445c-5.4,0,-9.778,4.378,-9.778,9.778v76.445c0,5.4,4.378,9.778,9.778,9.778ZM8,16h112v80h-112v-80Z"
                transform="translate(1, 0)"
            />
        </svg>
        <svg id="lock">
            <path
                d="M64,0c-17.673,0,-32,14.327,-32,32v24h-8c-4.55,0.837,-8,4.8165,-8,9.6v52.613c0,5.4,4.378,9.778,9.778,9.778h76.445c5.4,0,9.778,-4.378,9.778,-9.778v-52.613c0,-4.792,-3.45,-8.772,-8,-9.6h-8v-24c0,-17.673,-14.327,-32,-32,-32ZM40,32c0,-13.255,10.745,-24,24,-24s24,10.745,24,24v24h-48v-24ZM68,94.921v9.08c0,2.2,-1.79,4,-4,4s-4,-1.79,-4,-4v-9.08c-2.389,-1.384,-4,-3.962,-4,-6.921c0,-4.42,3.581,-8,8,-8s8,3.581,8,8c0,2.959,-1.611,5.537,-4,6.921Z"
            />
        </svg>
    </div>
</figure>

You can see the on their respective codepens:

- [Loader](https://codepen.io/zhirzh/pen/dWWKjj?editors=1100)
- [Computer](https://codepen.io/zhirzh/pen/Pmmaag?editors=1100)
- [Lock](https://codepen.io/zhirzh/pen/xddzJp?editors=1100)
