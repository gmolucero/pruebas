import request from "./index";

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

export const deleteIncome = async function (income_id) {
    return request({
        method: "DELETE",
        url: `/income/${income_id}`,
    });
};

export const deleteIncomeAttachedFile = async function (income_id, file_id) {
    return request({
        method: "DELETE",
        url: `/income/${income_id}/file/${file_id}`,
    });
};


// CUSTOMER !!!
export const getCustomer = async function () {
    return request({
        method: "GET",
        url: `/customer`,
    });
};

export const updateCustomer = async function (user) {
    return request({
        method: "PATCH",
        data: user,
        url: `/customer`,
    });
};