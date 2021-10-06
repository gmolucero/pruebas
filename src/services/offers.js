import request from "./index";

export const getPreOffer = function (offer_id) {
    return request({
        method: "GET",
        url: `/preoffer/${offer_id}`,
    });
};

export const getOfferDetails = function (offer_id) {
    return request({
        method: "GET",
        url: `/preoffer/detail/${offer_id}`,
    });
};


export const acceptPreOffer = function (offer_id) {
    return request({
        method: "POST",
        url: `/preoffer/${offer_id}/accept`,
    });
};

export const rejectPreOffer = function (offer_id) {
    return request({
        method: "POST",
        url: `/preoffer/${offer_id}/reject`,
    });
};

