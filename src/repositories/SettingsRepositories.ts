
import { Repository, EntityRepository } from 'typeorm';

import Setting from '../entities/SettingsEntities';

@EntityRepository(Setting)
export default class SettingsRepository extends Repository<Setting> {

}