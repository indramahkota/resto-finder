import AppRepository from '../../../data/appRepository';
import ClientDatabase from '../../../data/sources/local/clientDatabase';
import NetworkServer from '../../../data/sources/network/networkServer';
import CommonElement from './commonElement';

export default class ServiceElement extends CommonElement {
    private net = new NetworkServer();
    private db = new ClientDatabase();
    protected _repository = new AppRepository(this.net, this.db);
}