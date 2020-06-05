//将base64转换为blob
var dataURLtoBlob = function (dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}
//将blob转换为file
var blobToFile = function (theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

var dataURLtoFile = function (dataurl, filename) {
    var arr = dataurl.split(',');
    if (arr[1] == "") {
        return null
    }
    var mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}

var dataURLtoFile2 = function (dataurl, filename) {
    return blobToFile(dataURLtoBlob(dataurl), filename);
}