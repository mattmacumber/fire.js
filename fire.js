console.log("init");
var canvas = document.getElementById('canvas1');
var context = canvas.getContext("2d");
var firePixels = [];

var palette = [
    [0x07, 0x07, 0x07],
    [0x1f, 0x07, 0x07],
    [0x2f, 0x0f, 0x07],
    [0x47, 0x0f, 0x07],
    [0x57, 0x17, 0x07],
    [0x67, 0x1f, 0x07],
    [0x77, 0x1f, 0x07],
    [0x8f, 0x27, 0x07],
    [0x9f, 0x2f, 0x07],
    [0xaf, 0x3f, 0x07],
    [0xbf, 0x47, 0x07],
    [0xc7, 0x47, 0x07],
    [0xDF, 0x4F, 0x07],
    [0xDF, 0x57, 0x07],
    [0xDF, 0x57, 0x07],
    [0xD7, 0x5F, 0x07],
    [0xD7, 0x67, 0x0F],
    [0xcf, 0x6f, 0x0f],
    [0xcf, 0x77, 0x0f],
    [0xcf, 0x7f, 0x0f],
    [0xCF, 0x87, 0x17],
    [0xC7, 0x87, 0x17],
    [0xC7, 0x8F, 0x17],
    [0xC7, 0x97, 0x1F],
    [0xBF, 0x9F, 0x1F],
    [0xBF, 0x9F, 0x1F],
    [0xBF, 0xA7, 0x27],
    [0xBF, 0xA7, 0x27],
    [0xBF, 0xAF, 0x2F],
    [0xB7, 0xAF, 0x2F],
    [0xB7, 0xB7, 0x2F],
    [0xB7, 0xB7, 0x37],
    [0xCF, 0xCF, 0x6F],
    [0xDF, 0xDF, 0x9F],
    [0xEF, 0xEF, 0xC7],
    [0xFF, 0xFF, 0xFF]
];

function resetCanvas() {
    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {
            i = x + y * canvas.width;
            if (y < canvas.height - 1) {
                firePixels[i] = 0;
            } else {
                firePixels[i] = palette.length - 1;
            }
        }
    }
}

function stepFire() {
    for (y = 0; y < canvas.height; y++) {
        for (x = 0; x < canvas.width; x++) {
            var src = x + y * canvas.width;

            var lr = Math.floor(Math.random() * 3.0) - 1;
            var dst = src - canvas.width + lr;

            var pal_idx = firePixels[src];
            if (pal_idx > 0) {
                var palette_decay = Math.floor(Math.random() * 2.0);
                firePixels[dst] = pal_idx - palette_decay;
            }
        }
    }
}

function render() {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
            var idx = firePixels[y * canvas.width + x];
            var pixel = palette[idx];

            imgData.data[((canvas.width * y) + x) * 4 + 0] = pixel[0];
            imgData.data[((canvas.width * y) + x) * 4 + 1] = pixel[1];
            imgData.data[((canvas.width * y) + x) * 4 + 2] = pixel[2];
            imgData.data[((canvas.width * y) + x) * 4 + 3] = 255;
        }
    }

    context.putImageData(imgData, 0, 0);
}

function step_render_loop(Hz) {
    render();
    stepFire();
    setTimeout(function () { step_render_loop(Hz); }, 1000 / Hz);
}


resetCanvas();
step_render_loop(30);
