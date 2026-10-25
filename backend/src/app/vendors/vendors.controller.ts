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
import { VendorsService } from './vendors.service';
import {
  ExportVendorsDto,
  GetVendorsPaginationDto,
} from './dto/get-vendor.dto';
import { IDDto } from '../../common/dto/param.dto';
import { GetOptionsParams } from '../../common/query/options.interface';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { User } from '../../common/decorators/user.decorator';
import type { UserInfo } from '../../common/decorators/user.decorator';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ExcelResponseInterceptor } from '../../common/interceptors/excel-response/excel-response.interceptor';
import type { Response } from 'express';
import { ImportExcel } from '../../common/utils/excel-util/excel-util.decorator';
import type { File } from '../../common/utils/excel-util/dto/excel-util.interface';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  getVendors(@Query() query: GetVendorsPaginationDto) {
    return this.vendorsService.getVendors(query);
  }

  @Get(':id')
  getVendor(@Param() { id }: IDDto) {
    return this.vendorsService.getVendor({ id });
  }

  @Get('options')
  getVendorOptions(@Query() query: GetOptionsParams) {
    return this.vendorsService.getOptions(query);
  }

  @Post()
  createVendor(
    @Body() createVendorDto: CreateVendorDto,
    @User() user: UserInfo,
  ) {
    createVendorDto['user'] = user;
    return this.vendorsService.createVendor({ ...createVendorDto });
  }

  @Patch(':id')
  updateVendor(
    @Param() { id }: IDDto,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return this.vendorsService.updateVendor({
      data: updateVendorDto,
      where: { id },
    });
  }

  @Post('export')
  @UseInterceptors(ExcelResponseInterceptor)
  async exportVendors(
    @Query() exportVendorDto: ExportVendorsDto,
    @Res() res: Response,
  ) {
    const workbook = await this.vendorsService.exportVendors(exportVendorDto);
    await workbook.xlsx.write(res);
    res.end();
    return { message: 'Export success' };
  }

  @Post('import')
  @ImportExcel()
  importVendors(@UploadedFile() file: File, @User() user: UserInfo) {
    return this.vendorsService.importVendors({ file, user });
  }

  @Delete(':id')
  deleteVendor(@Param() { id }: IDDto) {
    return this.vendorsService.deleteVendor({ id });
  }
}
