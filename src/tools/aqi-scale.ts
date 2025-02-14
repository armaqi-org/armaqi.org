export enum AqiScale {
    Great = 'great',
    Good = 'good',
    Neutral = 'neutral',
    Poor = 'poor',
    Bad = 'bad',
    Horrific = 'horrific',
}
export const aqiScaleList = [
    AqiScale.Great,
    AqiScale.Good,
    AqiScale.Neutral,
    AqiScale.Poor,
    AqiScale.Bad,
    AqiScale.Horrific,
];

export interface AqiScaleData {
    from: number;
    to: number;
    bgColor: string;
    borderColor: string;
}

export interface AqiScaleDataKey extends AqiScaleData {
    key: AqiScale;
}

export const aqiScales: Record<AqiScale, AqiScaleData> = {
    [AqiScale.Great]: { from: 0, to: 50, bgColor: '#A9E05F', borderColor: '#5FA600' },
    [AqiScale.Good]: { from: 50, to: 100, bgColor: '#FED54C', borderColor: '#BA8F00' },
    [AqiScale.Neutral]: { from: 100, to: 150, bgColor: '#FF9B57', borderColor: '#D05B0B' },
    [AqiScale.Poor]: { from: 150, to: 200, bgColor: '#FE6A69', borderColor: '#AE3535' },
    [AqiScale.Bad]: { from: 200, to: 300, bgColor: '#9E6FB4', borderColor: '#6B3E81' },
    [AqiScale.Horrific]: { from: 300, to: 9999, bgColor: '#9E6879', borderColor: '#784051' },
};


export const getScaleData = (value: number): AqiScaleDataKey => {
    for (const key of Object.keys(aqiScales) as AqiScale[]) {
        const data = aqiScales[key] ?? aqiScales[AqiScale.Horrific];

        if (value >= data.from && value <= data.to) {
            return {
                ...data,
                key,
            };
        }
    }

    return {
        ...aqiScales[AqiScale.Horrific],
        key: AqiScale.Horrific,
    };
};
