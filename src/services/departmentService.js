import axios from "axios";
import { DEPARTMENT_API } from "./common";

export class Department {
    static getDepartment(){
        return axios.get(DEPARTMENT_API);
    }
}