import axios from "axios";
import { STAFF_API } from "./common";

export class Staff{
    static getStaff(){
        return axios.get(STAFF_API);
    };

    static createStaff(newStaff){
        return axios.post(STAFF_API,newStaff);
    };
}