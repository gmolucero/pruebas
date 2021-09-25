import request from "./index";

export const getRegion = function (user) {
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
