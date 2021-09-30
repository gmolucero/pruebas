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

export const deleteRent = async function (income_id) {
    return request({
        method: "DELETE",
        url: `/rent/${income_id}`,
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
