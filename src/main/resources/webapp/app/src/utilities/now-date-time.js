import moment from 'moment';

export default class NowMonthYear {

    static getNowMonthYear() {
        return moment().format("MM-YYYY");
    }

}