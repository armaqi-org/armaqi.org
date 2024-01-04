// import { describe, expect, test } from "@jest/globals";
import { getTimeAgo } from '../time-ago';

describe('getTimeAgo', () => {
    test('return 1 minute', () => {
        expect(getTimeAgo(
            new Date('2023-12-01T01:02:00'),
            new Date('2023-12-01T01:03:00'),
        )).toEqual([1, 'm']);
    });
    test('return 59 minutes', () => {
        expect(getTimeAgo(
            new Date('2023-12-01T01:02:00'),
            new Date('2023-12-01T02:01:00'),
        )).toEqual([59, 'm']);
    });
    test('return 1 hour', () => {
        expect(getTimeAgo(
            new Date('2023-12-01T01:02:00'),
            new Date('2023-12-01T02:03:00'),
        )).toEqual([1, 'h']);
    });
    test('return 23 hours', () => {
        expect(getTimeAgo(
            new Date('2023-12-01T01:02:00'),
            new Date('2023-12-02T00:03:00'),
        )).toEqual([23, 'h']);
    });
    test('return 1 day', () => {
        expect(getTimeAgo(
            new Date('2023-12-01T01:02:00'),
            new Date('2023-12-02T01:03:00'),
        )).toEqual([1, 'd']);
    });
    test('return 2 days', () => {
        expect(getTimeAgo(
            new Date('2023-12-01T01:02:00'),
            new Date('2023-12-04T01:01:00'),
        )).toEqual([2, 'd']);
    });
    test('return over', () => {
        expect(getTimeAgo(
            new Date('2023-12-01T01:02:00'),
            new Date('2023-12-06T01:03:00'),
        )).toEqual([1, 'o']);
    });
});
