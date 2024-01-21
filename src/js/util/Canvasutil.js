export default class CanvasUtil {
	constructor(canvas) {
		if (!canvas) throw new Error("INVALID CANVAS");
		this.canvas = canvas;
		const canvasRect = this.canvas.getBoundingClientRect();
		this.canvasCoord = { x: canvasRect.left, y: canvasRect.top };

		this.context = canvas.getContext("2d");
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;

		//Mouse util function
		this.mouseInfo = { px: 0, py: 0, x: 0, y: 0, up: true };
		this.MOUSE_EVENTS = { MOVE: "MOVE" };
		this.eventSubMap = {};
		this.startMouseEvent();

		//for the loop function
		this.ANIMATE_EVENTS = { START: "START", UPDATE: "UPDATE" };
		this.startUpdateLoop();
	}

	startUpdateLoop() {
		// this.publishEvents(this.ANIMATE_EVENTS.START, {});
		setInterval(() => {
			this.publishEvents(this.ANIMATE_EVENTS.UPDATE, this);
		}, 10);
	}

	update(handler) {
		this.subscribeEvents(this.ANIMATE_EVENTS.UPDATE, handler);
	}

	startMouseEvent() {
		document.addEventListener("mousemove", (event) => {
			this.updateMouseCorrds(event);
			this.publishEvents(this.MOUSE_EVENTS.MOVE, this.mouseInfo);
		});

		document.addEventListener("mousedown", () => {
			this.mouseInfo.up = false;
		});

		document.addEventListener("mouseup", () => {
			this.mouseInfo.up = true;
		});
	}

	onMouseMove(handler) {
		this.subscribeEvents(this.MOUSE_EVENTS.MOVE, handler);
	}

	subscribeEvents(event, handler) {
		this.eventSubMap[event] = this.eventSubMap[event] || [];
		this.eventSubMap[event].push(handler);
	}

	publishEvents(event, data) {
		this.eventSubMap[event] = this.eventSubMap[event] || [];
		this.eventSubMap[event].map((handler) => handler(data));
	}

	updateMouseCorrds(event) {
		const { clientX, clientY } = event;
		this.mouseInfo.px = this.mouseInfo.x;
		this.mouseInfo.py = this.mouseInfo.y;
		this.mouseInfo.x = clientX - this.canvasCoord.x;
		this.mouseInfo.y = clientY - this.canvasCoord.y;
	}

	rect(x, y, w, h) {
		this.context.fillRect(x, y, w, h);
		this.context.strokeRect(x, y, w, h);
	}

	stroke(r, g, b, a = 1) {
		this.context.stroke();
		this.context.strokeStyle = `rgba(${r},${g},${b},${a})`;
	}

	fill(r, g, b, a = 1) {
		this.context.fill();
		this.context.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`;
	}

	background(r, g, b, a = 1) {
		this.fill(r, g, b, a);
		this.stroke(r, g, b, a);
		this.rect(0, 0, this.canvasWidth, this.canvasHeight);
	}

	dot(x, y, weight = 5) {
		this.circle(x, y, weight);
	}

	circle(x, y, r) {
		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2 * Math.PI);
	}

	line(prevx, prevy, curx, cury, strokeSize = 1) {
		this.context.lineCap = "round";
		this.context.lineWidth = strokeSize;
		this.context.beginPath();
		this.context.moveTo(prevx, prevy);
		this.context.lineTo(curx, cury);
		this.context.stroke();
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

	getImageData() {
		const myImageData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
		return myImageData;
	}
	setImageData(imageData, x = 0, y = 0) {
		this.context.putImageData(imageData, x, y);
	}
}
