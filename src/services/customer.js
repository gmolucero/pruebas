import request from "./index";

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

export const updateCustomerType = async function (user) {
    return request({
        method: "PATCH",
        data: user,
        url: `/customer/updateactivitytype`,
    });
};

export const getEducationOptions = async function () {
    return request({
        method: "GET",
        url: `/list/education-level`,
    });
};

