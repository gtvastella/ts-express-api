import { BaseRepository } from './BaseRepository';
import { Log, LogModel } from '../models/Log';

export class LogRepository extends BaseRepository<Log> {
    constructor() {
        super(LogModel);
    }

}
