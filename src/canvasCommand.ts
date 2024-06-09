import { CanvasUtil } from "./canvasUtil";
import CommandType from "./enums/CommandType";

export interface Command {
	// type: "RECT" | "DOT" | "CIRCLE" | "LINE" |
	// "STROKE" | "FILL";
	type: CommandType;
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

export class CanvasCommand {
	canvasUtilInstance: CanvasUtil;

	constructor(canvas: CanvasUtil) {
		this.canvasUtilInstance = canvas;
	}

	execCommand(command: Command) {
		const { type, props } = command;

		if (type === CommandType.FILL) return this.canvasUtilInstance.fill(props.r, props.g, props.b, props.a, true);
		if (type === CommandType.STROKE) return this.canvasUtilInstance.stroke(props.r, props.g, props.b, props.a, true);

		//shapes
		if (type === CommandType.RECT) return this.canvasUtilInstance.rect(props.x, props.y, props.w, props.h, true);
		if (type === CommandType.CIRCLE) return this.canvasUtilInstance.circle(props.x, props.y, props.r, true);
	}
}
