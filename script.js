"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var DeviceDetector = require("device-detector-js");

//import DeviceDetector = require("./node_modules/device-detector-js");
// Usage: testSupport({client?: string, os?: string}[])
// Client and os are regular expressions.
// See: https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/README.md for
// legal values for client and os
testSupport([
    { client: 'Chrome' },
]);
function testSupport(supportedDevices) {
    var deviceDetector = new DeviceDetector();
    var detectedDevice = deviceDetector.parse(navigator.userAgent);
    var isSupported = false;
    for (var _i = 0, supportedDevices_1 = supportedDevices; _i < supportedDevices_1.length; _i++) {
        var device = supportedDevices_1[_i];
        if (device.client !== undefined) {
            var re = new RegExp("^".concat(device.client, "$"));
            if (!re.test(detectedDevice.client.name)) {
                continue;
            }
        }
        if (device.os !== undefined) {
            var re = new RegExp("^".concat(device.os, "$"));
            if (!re.test(detectedDevice.os.name)) {
                continue;
            }
        }
        isSupported = true;
        break;
    }
    if (!isSupported) {
        alert("This demo, running on ".concat(detectedDevice.client.name, "/").concat(detectedDevice.os.name, ", ") +
            "is not well supported at this time, continue at your own risk.");
    }
}
var controls = window;
var drawingUtils = window;
var mpObjectron = window;
var config = { locateFile: function (file) {
        return "https://cdn.jsdelivr.net/npm/@mediapipe/objectron@0.3.1627447724/".concat(file);
    } };
var examples = {
    images: [
        { name: 'Camera image', src: 'https://assets.codepen.io/5409376/camera.jpg' },
        { name: 'Chair image', src: 'https://assets.codepen.io/5409376/chair.jpg' },
        { name: 'Cup image', src: 'https://assets.codepen.io/5409376/cup.jpg' },
        { name: 'Shoe image', src: 'https://assets.codepen.io/5409376/shoe.jpg' },
    ],
    videos: [
        {
            name: 'Camera video',
            src: 'https://assets.codepen.io/5409376/camera_3_8.mp4'
        },
        {
            name: 'Chair video',
            src: 'https://assets.codepen.io/5409376/chair_10_1.mp4'
        },
        { name: 'Cup video', src: 'https://assets.codepen.io/5409376/cup_43_42.mp4' },
        {
            name: 'Shoe video',
            src: 'https://assets.codepen.io/5409376/shoe_1063642984-sd-trim-short.mov'
        }
    ]
};
// Our input frames will come from here.
var videoElement = document.getElementsByClassName('input_video')[0];
var canvasElement = document.getElementsByClassName('output_canvas')[0];
var controlsElement = document.getElementsByClassName('control-panel')[0];
var canvasCtx = canvasElement.getContext('2d');
// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
var fpsControl = new controls.FPS();
// Optimization: Turn off animated spinner after its hiding animation is done.
var spinner = document.querySelector('.loading');
spinner.ontransitionend = function () {
    spinner.style.display = 'none';
};
function onResults(results) {
    // Hide the spinner.
    document.body.classList.add('loaded');
    // Update the frame rate.
    fpsControl.tick();
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (!!results.objectDetections) {
        for (var _i = 0, _a = results.objectDetections; _i < _a.length; _i++) {
            var detectedObject = _a[_i];
            // Reformat keypoint information as landmarks, for easy drawing.
            var landmarks = detectedObject.keypoints.map(function (x) { return x.point2d; });
            // Draw bounding box.
            drawingUtils.drawConnectors(canvasCtx, landmarks, mpObjectron.BOX_CONNECTIONS, { color: '#FF0000' });
            // Draw Axes
            drawAxes(canvasCtx, landmarks, {
                x: '#00FF00',
                y: '#FF0000',
                z: '#0000FF'
            });
            // Draw centroid.
            drawingUtils.drawLandmarks(canvasCtx, [landmarks[0]], { color: '#FFFFFF' });
        }
    }
    canvasCtx.restore();
}
var objectron = new mpObjectron.Objectron(config);
objectron.onResults(onResults);
// Present a control panel through which the user can manipulate the solution
// options.
new controls
    .ControlPanel(controlsElement, {
    selfieMode: false,
    modelName: 'Shoe',
    maxNumObjects: 5,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.99
})
    .add([
    new controls.StaticText({ title: 'MediaPipe Objectron' }),
    fpsControl,
    new controls.SourcePicker({
        onSourceChanged: function (name, type) {
            objectron.setOptions({ staticImageMode: type !== 'image' });
            objectron.reset();
        },
        onFrame: function (input, size) { return __awaiter(void 0, void 0, void 0, function () {
            var aspect, width, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aspect = size.height / size.width;
                        if (window.innerWidth > window.innerHeight) {
                            height = window.innerHeight;
                            width = height / aspect;
                        }
                        else {
                            width = window.innerWidth;
                            height = width * aspect;
                        }
                        canvasElement.width = width;
                        canvasElement.height = height;
                        return [4 /*yield*/, objectron.send({ image: input })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        examples: examples
    }),
    new controls.Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
    new controls.DropDownControl({
        title: 'Model',
        field: 'modelName',
        options: [
            {
                name: 'Shoe',
                value: 'Shoe'
            },
            {
                name: 'Camera',
                value: 'Camera'
            },
            {
                name: 'Chair',
                value: 'Chair'
            },
            {
                name: 'Cup',
                value: 'Cup'
            },
        ]
    }),
    new controls.Slider({
        title: 'Max Num Objects',
        field: 'maxNumObjects',
        range: [1, 10],
        step: 1
    }),
    new controls.Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
    }),
    new controls.Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
    }),
])
    .on(function (x) {
    var options = x;
    videoElement.classList.toggle('selfie', options.selfieMode);
    objectron.setOptions(options);
});
function drawAxes(canvasCtx, landmarks, color) {
    var _a = mpObjectron.BOX_KEYPOINTS, BACK_BOTTOM_RIGHT = _a.BACK_BOTTOM_RIGHT, BACK_TOP_LEFT = _a.BACK_TOP_LEFT, BACK_TOP_RIGHT = _a.BACK_TOP_RIGHT, FRONT_BOTTOM_LEFT = _a.FRONT_BOTTOM_LEFT, FRONT_BOTTOM_RIGHT = _a.FRONT_BOTTOM_RIGHT, FRONT_TOP_RIGHT = _a.FRONT_TOP_RIGHT, FRONT_TOP_LEFT = _a.FRONT_TOP_LEFT, CENTER = _a.CENTER;
    var xMidPoint = lineIntersection([landmarks[BACK_BOTTOM_RIGHT], landmarks[FRONT_TOP_RIGHT]], [landmarks[BACK_TOP_RIGHT], landmarks[FRONT_BOTTOM_RIGHT]]);
    var yMidPoint = lineIntersection([landmarks[BACK_TOP_LEFT], landmarks[FRONT_TOP_RIGHT]], [landmarks[FRONT_TOP_LEFT], landmarks[BACK_TOP_RIGHT]]);
    var zMidPoint = lineIntersection([landmarks[FRONT_TOP_RIGHT], landmarks[FRONT_BOTTOM_LEFT]], [landmarks[FRONT_TOP_LEFT], landmarks[FRONT_BOTTOM_RIGHT]]);
    var LINE_WIDTH = 8;
    var TRIANGLE_BASE = 2 * LINE_WIDTH;
    drawingUtils.drawConnectors(canvasCtx, [landmarks[CENTER], xMidPoint], [[0, 1]], { color: color.x, lineWidth: LINE_WIDTH });
    drawingUtils.drawConnectors(canvasCtx, [landmarks[CENTER], yMidPoint], [[0, 1]], { color: color.y, lineWidth: LINE_WIDTH });
    drawingUtils.drawConnectors(canvasCtx, [landmarks[CENTER], zMidPoint], [[0, 1]], { color: color.z, lineWidth: LINE_WIDTH });
    drawTriangle(canvasCtx, xMidPoint, TRIANGLE_BASE, TRIANGLE_BASE, color.x, arctan360(xMidPoint.x - landmarks[CENTER].x, xMidPoint.y - landmarks[CENTER].y) +
        Math.PI / 2);
    drawTriangle(canvasCtx, yMidPoint, TRIANGLE_BASE, TRIANGLE_BASE, color.y, arctan360(yMidPoint.x - landmarks[CENTER].x, yMidPoint.y - landmarks[CENTER].y) +
        Math.PI / 2);
    drawTriangle(canvasCtx, zMidPoint, TRIANGLE_BASE, TRIANGLE_BASE, color.z, arctan360(zMidPoint.x - landmarks[CENTER].x, zMidPoint.y - landmarks[CENTER].y) +
        Math.PI / 2);
}
function lineIntersection(a, b) {
    var yDiffB = b[0].y - b[1].y;
    var xDiffB = b[0].x - b[1].x;
    var top = (a[0].x - b[0].x) * yDiffB - (a[0].y - b[0].y) * xDiffB;
    var bot = (a[0].x - a[1].x) * yDiffB - (a[0].y - a[1].y) * xDiffB;
    var t = top / bot;
    return {
        x: a[0].x + t * (a[1].x - a[0].x),
        y: a[0].y + t * (a[1].y - a[0].y),
        depth: 0
    };
}
function drawTriangle(ctx, point, height, base, color, rotation) {
    if (rotation === void 0) { rotation = 0; }
    var canvas = ctx.canvas;
    var realX = canvas.width * point.x;
    var realY = canvas.height * point.y;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.translate(realX, realY);
    ctx.rotate(rotation);
    ctx.moveTo(base / 2, 0);
    ctx.lineTo(0, -height);
    ctx.lineTo(-base / 2, 0);
    ctx.lineTo(base / 2, 0);
    ctx.translate(-realX, -realY);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}
function arctan360(x, y) {
    if (x === 0) {
        return y >= 0 ? Math.PI / 2 : -Math.PI / 2;
    }
    var angle = Math.atan(y / x);
    if (x > 0) {
        return angle;
    }
    return y >= 0 ? (angle + Math.PI) : angle - Math.PI;
}
