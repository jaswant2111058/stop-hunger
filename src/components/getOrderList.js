import axios from "axios";

export const getOrderList = async (user, baseURL) => {
    try {
        const response = await axios.get(`${baseURL}/getorderlist`, {
            headers: {
                "Authorization": user.token
            }
        });
        return response.data;
    } catch (err) {

        console.log(err)

    }
};

export const getRecipt = async ( user, _id, baseURL) => {
    try {
        const response = await axios.get(`${baseURL}/getplacedorder/${_id}`, {
            headers: {
                "Authorization": user.token
            }
        });
        return response.data;
    } catch (err) {

        console.log(err)

    }
}