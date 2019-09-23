export default (data: any) => {
    const outObj = {};
    Object.keys(data).forEach((key) => {
        let pointer = outObj;
        key.split(".").forEach((item, i, arr) => {
            if (i !== (arr.length - 1)) {
                if (pointer[item] === undefined) {
                    pointer[item] = {};
                }
                pointer = pointer[item];
            } else {
                pointer[item] = data[key];
            }
        });
    });
    return outObj;
};
