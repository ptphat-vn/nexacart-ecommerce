import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { User, type UserInfo } from '../../common/decorators/user.decorator';
import {
  ExportPermissionsDto,
  GetPermissionPaginationDto,
} from './dto/get-permission.dto';
import { IDDto } from '../../common/dto/param.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { GetOptionsParams } from '../../common/query/options.interface';
import { type Response } from 'express';
import { ImportExcel } from '../../common/utils/excel-util/excel-util.decorator';
import { ExcelResponseInterceptor } from '../../common/interceptors/excel-response/excel-response.interceptor';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  createPermission(
    @Body() createPermissionDto: CreatePermissionDto,
    @User() user: UserInfo,
  ) {
    return this.permissionsService.createPermission({
      ...createPermissionDto,
      user,
    });
  }

  @Get()
  getPermissions(@Query() query: GetPermissionPaginationDto) {
    return this.permissionsService.getPermissions(query);
  }
  @Get(':id')
  getPermission(@Param() { id }: IDDto) {
    return this.permissionsService.getPermission({ id });
  }
  @Patch(':id')
  updatePermission(
    @Param() { id }: IDDto,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.updatePermission({
      data: updatePermissionDto,
      where: { id },
    });
  }
  @Delete(':id')
  deletePermission(@Param() { id }: IDDto) {
    return this.permissionsService.deletePermission({ id });
  }
  @Get('options')
  getPermissionOptions(@Query() query: GetOptionsParams) {
    return this.permissionsService.getOptions(query);
  }

  @Post('export')
  @UseInterceptors(ExcelResponseInterceptor)
  async exportPermissions(
    @Query() exportPermissionsDto: ExportPermissionsDto,
    @Res() res: Response,
  ) {
    const workbook =
      await this.permissionsService.exportPermissions(exportPermissionsDto);
    await workbook.xlsx.write(res);
    res.end();
    return { message: 'Export success' };
  }

  @Post('import')
  @ImportExcel()
  importPermissions(@UploadedFile() file: File, @User() user: UserInfo) {
    return this.permissionsService.importPermissions({ file, user });
  }
}
