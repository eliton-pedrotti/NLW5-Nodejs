
import { Repository, EntityRepository } from 'typeorm';

import Setting from '../entities/Settings.entities';

@EntityRepository(Setting)
export default class SettingsRepository extends Repository<Setting> {

}