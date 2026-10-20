import { Injectable } from '@nestjs/common';
import { PrismaBaseService } from '../../common/services/prisma-base.service';
import {
  GetOptionsParams,
  Options,
} from '../../common/query/options.interface';
import { Role } from './entities/role.entity';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from '../../common/utils/query-util/query-util.service';
import { Prisma } from '@prisma/client';
import { GetRolesPaginationDto } from './dto/get-role.dto';
import { WithUser } from '../../common/decorators/user.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService extends PrismaBaseService<'role'> implements Options {
  private roleEntityName = Role.name;
  private excelSheets = {
    [this.roleEntityName]: this.roleEntityName,
  };
  constructor(
    public prismaService: PrismaService,
    private paginationUtilService: PaginationUtilService,
    private queryUtilService: QueryUtilService,
  ) {
    super(prismaService, 'role');
  }

  get client() {
    return super.client;
  }
  get extended() {
    return super.extended;
  }
  async getRole(where: Prisma.RoleWhereUniqueInput) {
    const data = await this.extended.findUnique({
      where,
    });
    return data;
  }
  async getRoles({
    page,
    itemPerPage,
    select,
    ...search
  }: GetRolesPaginationDto) {
    const totalItems = await this.extended.count();
    const paging = this.paginationUtilService.paging({
      page,
      itemPerPage,
      totalItems,
    });
    const fieldsSelect =
      this.queryUtilService.convertFieldsSelectOption<Role>(select);
    const searchQuery = this.queryUtilService.buildSearchQuery<Role>({
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
  async createRole(createRoleDto: WithUser<CreateRoleDto>) {
    const data = await this.extended.create({
      data: createRoleDto,
    });
    return data;
  }
  async updateRole(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: UpdateRoleDto;
  }) {
    const { where, data: dataUpdate } = params;
    const data = await this.extended.update({
      data: dataUpdate,
      where,
    });
    return data;
  }
  async deleteUser(where: Prisma.RoleWhereUniqueInput) {
    const data = await this.extended.softDelete(where);
    return data;
  }
  async getOptions(params: GetOptionsParams) {
    const { limit, select, ...search } = params;
    const fieldsSelect =
      this.queryUtilService.convertFieldsSelectOption<Role>(select);
    const searchQuery = this.queryUtilService.buildSearchQuery<Role>({
      search,
    });
    const data = await this.extended.findMany({
      select: fieldsSelect,
      take: limit,
      where: searchQuery,
    });
    return data;
  }
}
