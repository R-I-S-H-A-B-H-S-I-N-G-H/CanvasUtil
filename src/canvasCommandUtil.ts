import { CanvasUtil } from "./canvasUtil";

export interface Command {
	type: "RECT" | "DOT" | "CIRCLE" | "LINE" | "STROKE" | "FILL";
	props: {
		x?: number;
		y?: number;
		h?: number;
		w?: number;
		weight?: number;
		r?: number;

		prevX?: number;
		prevY?: number;
		curX?: number;
		curY?: number;
		strokeSize?: number;

		// r?: number;
		g?: number;
		b?: number;
		a?: number;
	};
}

export class CanvasCommandUtil {
	canvasUtilInstance: CanvasUtil;

	constructor(canvas: CanvasUtil) {
		this.canvasUtilInstance = canvas;
	}

	execCommand(command: Command) {
		const { type, props } = command;

		if (type === "FILL") return this.canvasUtilInstance.fill(props.r, props.g, props.b, props.a);
		if (type === "STROKE") return this.canvasUtilInstance.stroke(props.r, props.g, props.b, props.a);

		//shapes
		if (type === "RECT") return this.canvasUtilInstance.rect(props.x, props.y, props.w, props.h);
		if (type === "CIRCLE") return this.canvasUtilInstance.circle(props.x, props.y, props.r);
	}
}
