import NowMonthYear from "./now-date-time";

export default class CodeGeneration {

    static generateCode(prefix, suffix, isContainMonthYear) {
        let code = '';
    
        if (isContainMonthYear === true) {
            let MonthYear = NowMonthYear.getNowMonthYear();
            code = `${prefix}${MonthYear.substring(5,7)}${MonthYear.substring(0,2)}${suffix}`;
        }
        else {
            let newSuffix = `${parseInt(suffix) + 1}`;
            newSuffix = `${'0'.repeat(suffix.length - newSuffix.length)}${newSuffix}`;
            code = `${prefix}${newSuffix}`;
        }

        return code;
    }
}