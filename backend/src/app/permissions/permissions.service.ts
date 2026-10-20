import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaBaseService } from '../../common/services/prisma-base.service';
import {
  GetOptionsParams,
  Options,
} from '../../common/query/options.interface';
import { Permission } from './entities/permissions.entity';
import { ExcelUtilService } from '../../common/utils/excel-util/excel-util.service';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from '../../common/utils/query-util/query-util.service';
import { Prisma } from '@prisma/client';
import {
  ExportPermissionsDto,
  GetPermissionPaginationDto,
} from './dto/get-permission.dto';
import { Actions } from '../../common/guards/access-control/access-control.const';
import { WithUser } from '../../common/decorators/user.decorator';
import {
  CreatePermissionDto,
  ImportPermissionsDto,
} from './dto/create-permission.dto';
import { validate } from 'nestjs-zod';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService
  extends PrismaBaseService<'permission'>
  implements Options
{
  private permissionEntityName = Permission.name;
  private excelSheets = {
    [this.permissionEntityName]: this.permissionEntityName,
  };
  constructor(
    private excelUtilService: ExcelUtilService,
    public prismaService: PrismaService,
    private paginationUtilService: PaginationUtilService,
    private queryUtilService: QueryUtilService,
  ) {
    super(prismaService, 'permission');
  }

  get client() {
    return super.client;
  }
  get extended() {
    return super.extended;
  }

  async getPermission(where: Prisma.PermissionWhereUniqueInput) {
    const data = await this.extended.findUnique({
      where,
    });
    return data;
  }
  async getPermissions({
    page,
    itemPerPage,
    select,
    ...search
  }: GetPermissionPaginationDto) {
    const totalItems = await this.extended.count();
    const paging = this.paginationUtilService.paging({
      page,
      itemPerPage,
      totalItems,
    });
    const fieldsSelect =
      this.queryUtilService.convertFieldsSelectOption<Permission>(select);
    const searchQuery = this.queryUtilService.buildSearchQuery<Permission>({
      search,
    });
    const list = await this.extended.findMany({
      select: fieldsSelect,
      skip: paging.skip,
      take: paging.itemPerPage,
      where: searchQuery,
    });
    const data = paging.format(list);
    return data;
  }
  private isKeyValid(key: string) {
    const actions = Object.values(Actions).join('|');
    const regex = new RegExp(
      `^\\[\\/[a-zA-Z0-9\\/\\-]+\\]_\\[(${actions})\\]$`,
    );
    return regex.test(key);
  }
  async getOptions(params: GetOptionsParams) {
    const { limit, select, ...search } = params;
    const fieldsSelect =
      this.queryUtilService.convertFieldsSelectOption<Permission>(select);
    const searchQuery = this.queryUtilService.buildSearchQuery<Permission>({
      search,
    });
    const data = await this.extended.findMany({
      select: fieldsSelect,
      take: limit,
      where: searchQuery,
    });
    return data;
  }

  async createPermission(createPermissionDto: WithUser<CreatePermissionDto>) {
    const isKeyValid = this.isKeyValid(createPermissionDto.key);
    if (!isKeyValid) {
      const actions = Object.values(Actions).join(', ');
      throw new BadRequestException(
        `Permission key${createPermissionDto.key} is not valid. It must follow the pattern [/resource]_[action] where action is one of the following: ${actions}.`,
      );
    }
    const data = await this.extended.create({
      data: createPermissionDto,
    });
    return data;
  }
  async exportPermissions({ ids, select }: ExportPermissionsDto) {
    const where: Record<string, any> = {};
    if (ids) {
      where.id = { in: ids };
    }
    const fieldsSelect =
      this.queryUtilService.convertFieldsSelectOption<Permission>(select);
    const permissions = await this.extended.export({
      select: fieldsSelect,
      where,
    });

    const data = this.excelUtilService.generateExcel({
      worksheets: [
        {
          sheetName: this.excelSheets[this.permissionEntityName],
          data: permissions,
        },
      ],
    });

    return data;
  }
  async importPermissions({ file, user }: ImportPermissionsDto) {
    const permissionSheetName = this.excelSheets[this.permissionEntityName];
    const dataCreated = await this.excelUtilService.read(file);
    const data = await this.extended.createMany({
      data: dataCreated[permissionSheetName].map((item) => ({
        ...item,
        user,
      })),
    });
    return data;
  }
  async updatePermission(params: {
    where: Prisma.PermissionWhereUniqueInput;
    data: UpdatePermissionDto;
  }) {
    const { where, data: dataUpdate } = params;
    const data = await this.extended.update({
      data: dataUpdate,
      where,
    });
    return data;
  }

  async deletePermission(where: Prisma.PermissionWhereUniqueInput) {
    const data = this.extended.softDelete(where);
    return data;
  }
}
