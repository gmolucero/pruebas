import request from "./index";

export const getRegion = function () {
    return request({
        method: "GET",
        url: `/region`,
    });
};

export const getComuneById = function (id) {
    return request({
        method: "GET",
        url: `/region/${id}/communes`,
    });
};
