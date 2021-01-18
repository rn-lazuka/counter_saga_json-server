import axios from "axios";
import {ICurrentValue, ISettingsValue} from "../entities/entities";


const instance = axios.create({
    baseURL: "http://localhost:3004/counter"
});

export const api = {
    getCurrentSettings() {
        return instance.get<ISettingsValue>("").then(res => {
            return res.data
        })
    },
    changeCurrentValue(newValue:ICurrentValue) {
        return instance.patch<ICurrentValue>("",newValue).then(res => {
            return {currentValue:res.data.currentValue}
        })
    },
    changeSettings(newValue:ISettingsValue) {
        return instance.patch<ISettingsValue>("",newValue).then(res => {
            return res.data
        })
    }
}
