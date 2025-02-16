import { FC } from "react";
import { Section } from "@/components/section";
import { FCTL } from "@/tools/types";

const sections = [
    { key: 'stations', installed: 15, required: 100 },
    { key: 'cities', installed: 4, required: 48 },
    { key: 'marzes', installed: 4, required: 11 },
];

const getArcPath = (start: number, end: number, innerRadius: number, outerRadius: number) => {
    const startAngle = start * Math.PI * 2;
    const endAngle = end * Math.PI * 2;
    const x1 = innerRadius * Math.sin(startAngle);
    const y1 = innerRadius * -Math.cos(startAngle);
    const x2 = outerRadius * Math.sin(startAngle);
    const y2 = outerRadius * -Math.cos(startAngle);
    const x3 = outerRadius * Math.sin(endAngle);
    const y3 = outerRadius * -Math.cos(endAngle);
    const x4 = innerRadius * Math.sin(endAngle);
    const y4 = innerRadius * -Math.cos(endAngle);
    const bigArc = end - start >= 0.5;
    const outerFlags = bigArc ? '1 1 1' : '0 0 1';
    const innerFlags = bigArc ? '1 1 0' : '1 0 0';
    return `M ${x1},${y1} L ${x2},${y2} A ${outerRadius} ${outerRadius} ${outerFlags} ${x3},${y3} 
        L ${x4},${y4} A ${innerRadius} ${innerRadius} ${innerFlags} ${x1},${y1} Z`;
};


const DonutChart: FC<{
    done: number;
    required: number;
}> = ({ done, required }) => {
    const width = 160;
    const height = 160;
    const innerRadius = 70;
    const outerRadius = 80;
    const items = [
        { value: done, color: '#77C2EB' },
        { value: required - done, color: '#e5e7eb' }
    ];

    const segments = (() => {
        const sum = items.reduce((sum, item) => sum + item.value, 0);
        let start = 0;
        return items.map((item) => {
            const delta = (item.value / sum);
            const path = getArcPath(start, start + delta, innerRadius, outerRadius);
            start += delta;
            return { ...item, path };
        });
    })();

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width/2},${height/2})`}>
          {segments.map((segment) => (
            <path
              key={segment.color}
              stroke={segment.color}
              fill={segment.color}
              d={segment.path}
            />
          ))}
        </g>
        <text x="50%" y="50%" className="text-3xl" dominantBaseline="middle" textAnchor="middle">{done}</text>
      </svg>
    );
};

export const LandingCommunity: FCTL = ({ dict }) => {

  return (
    <Section
      id="community"
      title={dict.LandingCommunity.title}
    >

      <div className="mt-10 grid grid-cols-1 gap-20 text-center sm:mx-auto sm:max-w-sm md:mt-20 md:max-w-full md:grid-cols-3 md:text-left">
        {sections.map(({ installed, key, required }) => (
          <div key={key} className="flex flex-col items-center">
            <DonutChart done={installed} required={required} />
            <h5 className="font-semibold text-xl mt-4">{(dict.LandingCommunity as any)[key]}</h5>
            <p className="font-light">{(dict.LandingCommunity as any)[`${key}Required`]?.replace('{count}', required)}</p>
          </div>
        ))}
      </div>
    </Section>
    );
};
