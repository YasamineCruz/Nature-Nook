export function normalizeArray(arr) {
    let obj = {};
    if (Array.isArray(arr)) {
        arr.forEach(el => {
            obj[el.id] = el
            let elValues = Object.values(el)
            let elKeys = Object.keys(el)
            elValues.forEach((ell, i) => {
                if(Array.isArray(ell)) {
                    let key = elKeys[i]
                    obj[el.id][key] = normalizeArray(ell)
                }
            })      
        })
    };
    return obj;
  };