
export interface ChartYAxis {
    hide?: boolean;
    orientation?: "left" | "right";
    fontSize?: number | string;
}

export interface ChartXAxis {
    hide?: boolean;
    orientation?: "top" | "bottom";
    fontSize?: number | string;
}

export interface ChartMargin {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}
