import request from "./index";

export const updateQuotation = async function (user) {
    return request({
        method: "PUT",
        data: user,
        url: `/quotation/update`,
    });
};

// Rent !!!
export const getRent = async function () {
    return request({
        method: "GET",
        url: `/rent`,
    });
};

export const createRent = async function (rent) {
    return request({
        method: "POST",
        data: rent,
        url: `/rent`,
    });
};

export const deleteDependentRent = async function (income_id) {
    return request({
        method: "DELETE",
        url: `/rent/dependent/${income_id}`,
    });
};

export const deleteIndependentRent = async function (income_id) {
    return request({
        method: "DELETE",
        url: `/rent/independent/${income_id}`,
    });
};

export const createRentFile = async function (rent) {
    return request({
        method: "POST",
        data: rent,
        url: `/rent/file`,
    });
};

export const createSolicitude = async function (data) {
    return request({
        method: "POST",
        data: data,
        url: `/debt`,
    });
};

export const deleteRentAttachedFile = async function (file_id) {
    return request({
        method: "DELETE",
        url: `/rent/file/${file_id}`,
    });
};

export const getRentAttachedFile = async function (file_id) {
    return request({
        method: "GET",
        url: `/rent/file/${file_id}`,
        responseType: "blob",
    });
};

export const getSolicitudes = async function () {
    return request({
        method: "GET",
        url: `/debt/user`,
    });
};

