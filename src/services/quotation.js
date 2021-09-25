import request from "./index";

export const createQuotation = async function (user) {
    return request({
        method: "POST",
        data: user,
        url: `/quotation/create`,
    });
};

export const updateQuotation = async function (user) {
    return request({
        method: "PUT",
        data: user,
        url: `/quotation/update`,
    });
};

export const getRent = async function () {
    return request({
        method: "GET",
        url: `/rent`,
    });
};