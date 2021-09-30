import request from "./index";

export const getCreditReason = function (user) {
    return request({
        method: "GET",
        url: `/list/credit-reason`,
    });
};

export const getProfession = function (id) {
    return request({
        method: "GET",
        url: `/list/profession`,
    });
};
