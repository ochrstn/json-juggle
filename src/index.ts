/* eslint-disable @typescript-eslint/no-explicit-any */

type UpdateFnType = (data: any) => any | Promise<any>;
type JSONData = any | any[];

type ManipulateOptions = {
  clone?: boolean;
};

function pathToPathArray(path: string): string[] {
  const result = path.split('.');

  // replace entries like "items[*]" with "items"
  for (let i = 0; i < result.length; i++) {
    if (result[i].includes('[*]')) {
      const split = result[i].split('[*]');
      result[i] = split[0];
      result.splice(i + 1, 0, '[*]', split[1]);
      i++;
    }
  }

  return result.filter(Boolean);
}

export async function manipulate(
  data: JSONData,
  path: string,
  updateFn: UpdateFnType,
  options?: ManipulateOptions
): Promise<any> {
  const pathArray = pathToPathArray(path);
  return _manipulateRecurvice(
    options?.clone ? JSON.parse(JSON.stringify(data)) : data,
    pathArray,
    updateFn
  );
}

async function _manipulateRecurvice(
  data: JSONData,
  pathArray: string[],
  updateFn: UpdateFnType
): Promise<any> {
  if (pathArray.length === 0) {
    const newValue = await updateFn(data);
    return newValue;
  } else {
    const currentNode = pathArray[0];

    if (currentNode === '$') {
      pathArray = pathArray.slice(1);
      data = await _manipulateRecurvice(data, pathArray, updateFn);
    }

    if (Array.isArray(data)) {
      if (currentNode === '[*]') {
        pathArray = pathArray.slice(1);
      }

      for (let i = 0; i < data.length; i++) {
        data[i] = await _manipulateRecurvice(data[i], pathArray, updateFn);
      }
    } else if (data[currentNode]) {
      const subPathArray = pathArray.slice(1);
      data[currentNode] = await _manipulateRecurvice(
        data[currentNode],
        subPathArray,
        updateFn
      );
    }
    return data;
  }
}
