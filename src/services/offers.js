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

