import { Command, CanvasCommand } from "./canvasCommand.ts";
import CommandType from "./CommandType.ts";

class CanvasUtil {
	canvas: HTMLCanvasElement;
	canvasCoord;
	context;
	canvasWidth: number;
	canvasHeight: number;
	mouseInfo: { px: number; py: number; x: number; y: number; up: boolean };
	MOUSE_EVENTS;
	eventSubMap;
	ANIMATE_EVENTS;
	commandUtilInstance;
	GLOBAL_EVENTS;

	constructor(canvas: HTMLCanvasElement) {
		if (!canvas) throw new Error("INVALID CANVAS");
		this.canvas = canvas;
		const canvasRect = this.canvas.getBoundingClientRect();
		this.canvasCoord = { x: canvasRect.left, y: canvasRect.top };

		this.context = canvas.getContext("2d", { willReadFrequently: true });
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;
		this.commandUtilInstance = new CanvasCommand(this);

		//Mouse util function
		this.mouseInfo = { px: 0, py: 0, x: 0, y: 0, up: true };
		this.MOUSE_EVENTS = { MOVE: "MOVE" };
		this.eventSubMap = {};
		this.startMouseEvent();

		//for the loop function
		this.ANIMATE_EVENTS = { START: "START", UPDATE: "UPDATE" };
		this.GLOBAL_EVENTS = { CHANGE: "CHANGE" };
		this.startUpdateLoop();
	}

	startUpdateLoop() {
		// this.publishEvents(this.ANIMATE_EVENTS.START, {});
		setInterval(() => {
			this.publishEvents(this.ANIMATE_EVENTS.UPDATE, this);
		}, 10);
	}

	update(handler = () => {}) {
		this.subscribeEvents(this.ANIMATE_EVENTS.UPDATE, handler);
	}

	startMouseEvent() {
		this.canvas.addEventListener("mousemove", (event) => {
			this.updateMouseCorrds(event);
			this.publishEvents(this.MOUSE_EVENTS.MOVE, this.mouseInfo);
		});

		this.canvas.addEventListener("mousedown", () => {
			this.mouseInfo.up = false;
		});

		document.addEventListener("mouseup", () => {
			this.mouseInfo.up = true;
		});
	}

	onMouseMove(handler = () => {}) {
		this.subscribeEvents(this.MOUSE_EVENTS.MOVE, handler);
	}

	subscribeEvents(event: any, handler = () => {}) {
		// @ts-ignore
		this.eventSubMap[event] = this.eventSubMap[event] || [];

		// @ts-ignore
		this.eventSubMap[event].push(handler);
	}

	publishEvents(event: any, data: any) {
		// @ts-ignore
		this.eventSubMap[event] = this.eventSubMap[event] || [];

		// @ts-ignore
		this.eventSubMap[event].map((handler) => handler(data));
	}

	updateMouseCorrds(event: MouseEvent) {
		const { clientX, clientY } = event;
		this.mouseInfo.px = this.mouseInfo.x;
		this.mouseInfo.py = this.mouseInfo.y;
		this.mouseInfo.x = clientX - this.canvasCoord.x;
		this.mouseInfo.y = clientY - this.canvasCoord.y;
	}

	rect(x = 0, y = 0, w = 0, h = 0) {
		if (!this.context) return;
		this.context.fillRect(x, y, w, h);
		this.context.strokeRect(x, y, w, h);

		const command: Command = { type: CommandType.RECT, props: { x, y, w, h } };
		this.onCanvasAction(command);
	}

	stroke(r = 0, g = 0, b = 0, a = 1) {
		if (!this.context) return;

		this.context.stroke();
		this.context.strokeStyle = `rgba(${r},${g},${b},${a})`;

		const command: Command = { type: CommandType.STROKE, props: { r, g, b, a } };
		this.onCanvasAction(command);
	}

	fill(r = 0, g = 0, b = 0, a = 1) {
		if (!this.context) return;

		this.context.fill();
		this.context.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`;

		const command: Command = { type: CommandType.FILL, props: { r, g, b, a } };
		this.onCanvasAction(command);
	}

	background(r = 0, g = 0, b = 0, a = 1) {
		if (!this.context) return;

		this.fill(r, g, b, a);
		this.stroke(r, g, b, a);
		this.rect(0, 0, this.canvasWidth, this.canvasHeight);
	}

	dot(x = 0, y = 0, weight = 5) {
		this.circle(x, y, weight);
	}

	circle(x = 0, y = 0, r = 1) {
		if (!this.context) return;

		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2 * Math.PI);

		const command: Command = { type: CommandType.CIRCLE, props: { x, y, r } };
		this.onCanvasAction(command);
	}

	line(prevX = 0, prevY = 0, curX = 0, curY = 0, strokeSize = 1) {
		if (!this.context) return;

		this.context.lineCap = "round";
		this.context.lineWidth = strokeSize;
		this.context.beginPath();
		this.context.moveTo(prevX, prevY);
		this.context.lineTo(curX, curY);
		this.context.stroke();

		const command: Command = { type: CommandType.LINE, props: { prevX, prevY, curX, curY, strokeSize } };
		this.onCanvasAction(command);
	}

	/**
	 * 	setScale(canvas, pixelRatio) {
		canvas.width = canvas.clientWidth * pixelRatio;
		canvas.height = canvas.clientHeight * pixelRatio;
		canvas.getContext("2d").scale(pixelRatio,
		pixelRatio);
		const scale = window.devicePixelRatio;
		console.log(scale);
		canvas.width = Math.floor(300 * scale);
		canvas.height = Math.floor(300 * scale);
		const ctx = canvas.getContext("2d");
		ctx.scale(scale, scale);
	}
	 *
	 */

	getImageData(): ImageData {
		if (!this.context) throw new Error("Context not defined");
		const myImageData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
		return myImageData;
	}
	setImageData(imageData: ImageData, x = 0, y = 0) {
		if (!this.context) throw new Error("Context not defined");
		this.context.putImageData(imageData, x, y);
	}

	getPixelArr() {
		return [...this.getImageData().data];
	}

	setPixelArr(updatedImageData: ImageData) {
		const inputArr = updatedImageData.data;
		const imageData = this.getImageData();
		if (inputArr.length != imageData.data.length) return;

		for (let index = 0; index < imageData.data.length; index++) imageData.data[index] = inputArr[index];
		this.setImageData(imageData);
	}

	exec(command: Command) {
		this.commandUtilInstance.execCommand(command);
	}

	onCanvasAction(command: Command) {
		this.publishEvents(this.GLOBAL_EVENTS.CHANGE, command);
	}

	onChange(handler = () => {}) {
		this.subscribeEvents(this.GLOBAL_EVENTS.CHANGE, handler);
	}
}

function init(canvas: HTMLCanvasElement, height?: number, width?: number) {
	if (!canvas) throw new Error("Invalid canvas");

	console.log("this is your canvas :: ", canvas);
	if (height && width) {
		canvas.height = height;
		canvas.width = width;
	}
	return new CanvasUtil(canvas);
}

export { CanvasUtil, init };
