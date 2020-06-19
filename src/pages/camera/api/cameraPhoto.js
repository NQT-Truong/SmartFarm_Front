const config_api = require("../../../config/config").config_api;
const utils = require("../../../utils/utils");
const axios = require('axios');

function getPhoto(query,callback) {
    console.log(query);
    axios({
        url: `${config_api.camera}?${utils.convertToQuery(query)}`,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            if(result.data.length==0) return callback(false, result.data);
            result.data = result.data.sortBy("created_date");
            let dateCmp = result.data[0].created_date.split("T")[0];
            let arrPhotoBydate = [[]];
            for (let i = 0; i < result.data.length; i++) {
                const photo = result.data[i];
                if(photo.created_date.split("T")[0]!==dateCmp){
                    arrPhotoBydate.push([]);
                    dateCmp = photo.created_date.split("T")[0];
                }
                arrPhotoBydate[arrPhotoBydate.length-1].push(photo)
            }
            return callback(false, arrPhotoBydate)
        })
        .catch(error => {
            console.log(error);
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

module.exports = {
    getPhoto: getPhoto,
}