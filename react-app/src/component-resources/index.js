export function normalizeArray(ele) {
    let obj = {};
    if (Array.isArray(ele)) {
        ele.forEach(el => {
            obj[el.id] = el
            normalizeArray(el)
        })
    };

    if( typeof ele === 'object'){
        let elValues = Object.values(ele)
        elValues.forEach((ell, i) => {

            if(Array.isArray(ell)) {
                obj[ell.id] = normalizeArray(ell)
            }
        })      
    }

    if(typeof ele !== 'object' && !Array.isArray(ele)) return ele
    return obj;
  };


export function getImg(arr) {
    let url
    arr.forEach(photo => {
        if(photo.preview === true) url = photo.url
    })
    return url
}