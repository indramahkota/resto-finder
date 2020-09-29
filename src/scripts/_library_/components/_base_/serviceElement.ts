import AppRepository from '../../../data/appRepository';
import ClientDatabase from '../../../data/sources/local/clientDatabase';
import NetworkServer from '../../../data/sources/network/networkServer';
import CommonElement from './commonElement';

export default class ServiceElement extends CommonElement {
    private network = new NetworkServer();
    private database = new ClientDatabase();
    protected _repository = new AppRepository(this.network, this.database);
}