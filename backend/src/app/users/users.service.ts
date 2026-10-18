import { Inject, Injectable } from '@nestjs/common';

import { Prisma, VendorStatus } from '@prisma/client';
import { PrismaBaseService } from '../../common/services/prisma-base.service';
import { User } from './entities/user.entity';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from '../../common/utils/query-util/query-util.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  GetUsersPaginationDto,
  IsExistPermissionKeyDto,
} from './dto/get-user.dto';
import { isEmpty } from 'es-toolkit/compat';

import { CreateUserDto } from './dto/create-user.dto';
import { Actions } from '../../common/guards/access-control/access-control.const';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable() //khi khai báo thằng này thì sẽ tự động khởi tạo DI
export class UsersService extends PrismaBaseService<'user'> {
  private userEntityName = User.name;
  private excelSheets = {
    [this.userEntityName]: this.userEntityName,
  };
  constructor(
    public prismaService: PrismaService,
    private paginationUtilService: PaginationUtilService,
    private queryUtilService: QueryUtilService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super(prismaService, 'user');
  }
  get client() {
    return super.client;
  }
  get extended() {
    return super.extended;
  }

  async getUser(where: Prisma.UserWhereUniqueInput) {
    // this.prismaService.user.create();
    // this.client.create();
    // const data = await this.client.findUnique({ where });
    const data = await this.extended.findUnique({
      where,
    });
    return data;
  }
  async getUsers({
    page,
    itemPerPage,
    select,
    ...search
  }: GetUsersPaginationDto) {
    const userCacheKey = this.getUsers.name;
    const userCached = await this.cacheManager.get(userCacheKey);
    if (userCached) return userCached;
    const totalItems = await this.extended.count();
    const paging = this.paginationUtilService.paging({
      page,
      itemPerPage,
      totalItems,
    });
    const fieldsSelect =
      this.queryUtilService.convertFieldsSelectOption<User>(select);
    let searchQuery = {};
    if (!isEmpty(search)) {
      searchQuery = this.queryUtilService.buildSearchQuery<User>({
        search,
      });
    }

    const list = await this.extended.findMany({
      select: fieldsSelect,
      skip: paging.skip,
      take: paging.itemPerPage,
      where: searchQuery,
    });
    const data = paging.format(list);
    await this.cacheManager.set(userCacheKey, data);
    return data;
  }

  async createUser(createUserDto: CreateUserDto) {
    const data = await this.extended.create({
      data: createUserDto,
    });
    return data;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }) {
    const { where, data: dataUpdate } = params;
    const data = await this.extended.update({
      data: dataUpdate,
      where,
    });
    return data;
  }
  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    // const data = await this.extended.delete({
    //   where,
    // });
    const data = await this.extended.softDelete(where);
    return data;
  }

  // async getOptions(params: GetOptionsParams) {
  //   const { limit, select, ...search } = params;
  //   const fieldsSelect =
  //     this.queryUtilService.convertFieldsSelectOption<User>(select);
  //   const searchQuery = this.queryUtilService.buildSearchQuery<User>({
  //     search,
  //   });
  //   const data = await this.extended.findMany({
  //     select: fieldsSelect,
  //     take: limit,
  //     where: searchQuery,
  //   });
  //   return data;
  // }

  // async exportUsers({ ids, select }: ExportUsersDto) {
  //   const where: Record<string, any> = {};
  //   if (ids) {
  //     where.id = { in: ids };
  //   }
  //   const fieldsSelect =
  //     this.queryUtilService.convertFieldsSelectOption<User>(select);
  //   const users = await this.extended.export({
  //     select: fieldsSelect,
  //     where,
  //   });

  //   const data = this.excelUtilService.generateExcel({
  //     worksheets: [
  //       {
  //         sheetName: this.excelSheets[this.userEntityName],
  //         data: users,
  //       },
  //     ],
  //   });

  //   return data;
  // }

  // async importUsers({ file, user }: ImportUsersDto) {
  //   const userSheetName = this.excelSheets[this.userEntityName];
  //   const dataCreated = await this.excelUtilService.read(file);
  //   const data = await this.extended.createMany({
  //     data: dataCreated[userSheetName].map((item) => ({
  //       ...item,
  //       user,
  //     })),
  //   });
  //   return data;
  // }
  async isSupperAdmin(userID: User['id']) {
    const data = await this.extended.findFirst({
      where: {
        id: userID,
        userVendorRoles: {
          some: {
            role: {
              isSystemRole: true,
            },
          },
        },
      },
    });
    return data ? true : false;
  }

  async isExistPermissionKey({
    userID,
    permissionKey,
  }: IsExistPermissionKeyDto) {
    const user = await this.extended.findFirst({
      include: {
        userVendorRoles: {
          select: {
            role: {
              select: {
                rolePermissions: {
                  select: {
                    permission: {
                      select: {
                        key: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id: userID,
        userVendorRoles: {
          some: { status: VendorStatus.active },
        },
      },
    });
    if (!user) return false;

    const [route] = permissionKey.split('_');
    const isExistPermission = user.userVendorRoles?.some((item) =>
      item.role?.rolePermissions?.some(
        (rp) =>
          rp.permission?.key?.includes(permissionKey) ||
          rp.permission?.key?.includes(`${route}_[${Actions.MANAGE}]`),
      ),
    );
    return isExistPermission ? true : false;
  }
}
