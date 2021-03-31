import moment from 'moment';

export default class NowDateTime {

    static getNowDateTime() {
        return moment().format("DD-MM-YYYY HH:mm:ss");
    }

}