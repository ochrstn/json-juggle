import { manipulate } from '../src';

describe('manipulate', () => {
  it('should manipulate array items', async () => {
    const data = [1, 2, 3];
    const result = await manipulate(data, '$[*]', (value) => {
      return value - 1;
    });
    expect(result).toEqual([0, 1, 2]);
  });

  it('should manipulate array items within object', async () => {
    const data = { list: [1, 2, 3] };
    const result = await manipulate(data, 'list[*]', (value) => {
      return value - 1;
    });
    expect(result).toEqual({ list: [0, 1, 2] });
  });

  it('should manipulate objects within array items', async () => {
    const data = [
      { id: 'item1', name: 'Item 1' },
      { id: 'item2', name: 'Item 2' },
      { id: 'item3', name: 'Item 3' },
    ];
    const result = await manipulate(data, '$[*]', (value) => {
      return { ...value, version: 0 };
    });
    expect(result).toEqual([
      { id: 'item1', name: 'Item 1', version: 0 },
      { id: 'item2', name: 'Item 2', version: 0 },
      { id: 'item3', name: 'Item 3', version: 0 },
    ]);
  });

  it('should manipulate nested field', async () => {
    const data = {
      a: 1,
      b: {
        c: 2,
      },
      d: [1, 2, 3],
    };
    const result = await manipulate(data, 'b.c', (value) => {
      return value + 1;
    });
    expect(result).toEqual({
      a: 1,
      b: {
        c: 3,
      },
      d: [1, 2, 3],
    });
  });

  it('should manipulate the original data', async () => {
    const data = {
      a: 1,
    };
    const result = await manipulate(data, 'a', (value) => {
      return value + 1;
    });
    expect(result).toEqual({
      a: 2,
    });
    expect(data).toEqual({
      a: 2,
    });
  });

  it('should not manipulate the original data', async () => {
    const data = {
      a: 1,
    };
    const result = await manipulate(
      data,
      'a',
      (value) => {
        return value + 1;
      },
      { clone: true }
    );
    expect(result).toEqual({
      a: 2,
    });
    expect(data).toEqual({
      a: 1,
    });
  });
});
