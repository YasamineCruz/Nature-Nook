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

// let item = 4.9;

// let itemQty = 1;

// const formatting_options = { style: 'currency', currency: 'USD', minimumFractionDigits: 2, }; const dollarFormatter = new Intl.NumberFormat("en-US", formatting_options); 

// {dollarFormatter.format(item[1][0].price * itemQty[item[1][0].id])} 