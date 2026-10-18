import { Injectable } from '@nestjs/common';
import {
  Pagination,
  PagingDefault,
} from './interface/pagination-util.interface';

@Injectable()
export class PaginationUtilService extends Pagination {
  private _skip: number = 0;
  public get skip(): number {
    return this._skip;
  }
  public set skip(value: number) {
    this._skip = value;
  }

  private _totalPages: number = 0;
  public get totalPages(): number {
    return this._totalPages;
  }
  public set totalPages(value: number) {
    this._totalPages = value;
  }
  private totalItems: number = 0;

  paging({
    page = PagingDefault.PAGE,
    itemPerPage = PagingDefault.ITEM_PER_PAGE,
    totalItems = 0,
  }) {
    this.itemPerPage = itemPerPage;
    this.totalItems = totalItems;
    const skip = (page - 1) * itemPerPage;
    this.skip = skip;
    const totalPages = this.totalPages;
    return this;
  }
  format<T>(list: T) {
    return {
      list,
      totalPages: this.totalPages,
      totalItems: this.totalItems,
    };
  }
}
