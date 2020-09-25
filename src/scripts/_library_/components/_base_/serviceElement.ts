import { internalProperty } from 'lit-element';
import AppRepository from '../../../data/appRepository';
import CommonElement from './commonElement';

export default class ServiceElement extends CommonElement {
    @internalProperty()
    protected _repository = new AppRepository();
}