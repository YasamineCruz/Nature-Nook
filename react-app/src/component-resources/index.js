import NotFound from "../components/NotFound/NotFound";

export function normalizeArray(ele) {
    let obj = {};
    if (Array.isArray(ele)) {
        ele.forEach(el => {
            if( typeof ele === 'object'){
                obj[el.id] = el
                obj[el.id].Photos = normalizeArray(obj[el.id].Photos)
                obj[el.id].Reviews = normalizeArray(obj[el.id].Reviews)
            }
        })
    };

    return obj;
  };


export function getImg(arr) {
    let url
    arr.forEach(photo => {
        if(photo.preview === true) url = photo.url
    })
  
    return url
}

export function getImgId(arr) {
    let id
    arr.forEach(photo => {
        if(photo.preview === true) id = photo.id
    })
  
    return id
}

export const addZero = (number) => {
    let str = number.toString()
    if(str.split('.').length === 2){
        if(str.split('.')[1].length === 1) return `${str.split('.')[0]}.${str.split('.')[1]}0`
        return number
    }
    return number
} 

export const checkUrl = (obj, id) => isNaN(id) || !obj[id] ? (<NotFound />) : false;
