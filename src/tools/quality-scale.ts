
export const qualityScales: [ number, number, string, string][] = [
    [0, 50, '#009966', 'text-white'],
    [51, 100, '#FFDE33', 'text-black'],
    [101, 150, '#FF9933', 'text-black'],
    [151, 200, '#CC0033', 'text-white'],
    [201, 300, '#660099', 'text-white'],
    [300, 0, '#7E0023', 'text-white'],
];

export const getScaleColor = (value: number): [string, string] => {
    for (const [from, to, color, textColor] of qualityScales) {
        if (value >= from && value <= to) {
            return [color, textColor];
        }
    }

    return ['grey', '#fff'];
};
