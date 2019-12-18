export const BASE_URL = "http://127.0.0.1:8000/api/v1";
export const ROUTE    = {
    Pizza: {
        List: `${BASE_URL}/pizzas`,
        DELIVER_ORDER: `${BASE_URL}/deliver`
    },
    ME   : `${BASE_URL}/me`,
    MY_ORDERS : `${BASE_URL}/me/orders`,
    LOGIN: `${BASE_URL}/login`,
};
