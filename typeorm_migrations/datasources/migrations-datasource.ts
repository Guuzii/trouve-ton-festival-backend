import { DataSource, DataSourceOptions } from "typeorm";
import { dataSourceOpt } from "../../src/common/constant/datasource-opt.const";

export const datasource: DataSource = new DataSource(dataSourceOpt as DataSourceOptions);
