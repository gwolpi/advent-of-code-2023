import '../extension-methods.ts';

type CubeType = 'red' | 'green' | 'blue';
type Cube = { type: CubeType; amount: number };
type Game = { id: string; cubes: Cube[] };

const processInput = (input: string): Game[] =>
	input.splitRows().map((ln): Game => {
		const [, id, log] = /^Game (\d+): (.*)$/.exec(ln) ?? [];
		const cubes = log.matchMap(/(\d+) (\w+)/g, ([, amount, colour]): Cube => {
			const type = colour as CubeType;
			return { type, amount: Number(amount) };
		});
		return { id, cubes };
	});

export const p1 = (input: string): number => {
	const maxPerType: Record<CubeType, number> = { red: 12, green: 13, blue: 14 };
	return processInput(input)
		.filter(({ cubes }) => cubes.every(({ type, amount }) => amount <= maxPerType[type]))
		.reduce((acc, { id }) => acc + Number(id), 0);
};

export const p2 = (input: string): number => {
	return processInput(input)
		.map(({ cubes }) =>
			cubes.reduce((maxPerType: Record<CubeType, number>, { amount, type }) => {
				maxPerType[type] = Math.max(maxPerType[type], amount);
				return maxPerType;
			}, { red: 0, green: 0, blue: 0 })
		)
		.reduce((acc, { red, green, blue }) => acc + (red * green * blue), 0);
};
