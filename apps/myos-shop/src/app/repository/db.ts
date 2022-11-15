import * as postgres from 'postgres';
import * as config from '../../../../../config/config.json';

const sql = postgres(config);

export default sql;
