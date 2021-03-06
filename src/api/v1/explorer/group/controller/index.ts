import IExplorerGroupService from '../../../../../services/interface/explorer_group.service';
import IExplorerCelebrityService from '../../../../../services/interface/explorer_celeb.service';
import IExplorerCategoryService from '../../../../../services/interface/explorer_category.service';
import { CreateExplorerGroupDto, RetrieveExplorerGroupDto, UpdateExplorerGroupsDto } from '../../../../../database/dto';
import EXPLORER_GROUP_TYPE from '../../../../../utils/constants/explorerGroupType';
import { QueryFailedError } from 'typeorm';
import { BadRequestError } from '../../../../../common/api-error';
import { ExplorerGroup } from '../../../../../database/entities';

class ExplorerGroupController {
  private _ExplorerGroupService: IExplorerGroupService;
  private _ExplorerCelebrityService: IExplorerCelebrityService;
  private _ExplorerCategoryService: IExplorerCategoryService;

  constructor(
    explorerGroupService: IExplorerGroupService,
    explorerCelebService: IExplorerCelebrityService,
    explorerCategoryService: IExplorerCategoryService
  ) {
    this._ExplorerGroupService = explorerGroupService;
    this._ExplorerCelebrityService = explorerCelebService;
    this._ExplorerCategoryService = explorerCategoryService;
  }

  /**
   * Insert new entity ExplorerGroup
   *
   * @param {CreateExplorerGroupDto} reqBody
   * @returns {Promise<RetrieveExplorerGroupDto>} dto instance
   * @memberof ExplorerGroupController
   */
  async create(reqBody: CreateExplorerGroupDto): Promise<RetrieveExplorerGroupDto> {
    try {
      const explorerGroup = this.convertDtoToEntity(reqBody);
      // save ExplorerGroup entity
      const savedExplorerGroup = await this._ExplorerGroupService.save(explorerGroup);
      // convert to dto
      const retrieveExplorerGroupDto = new RetrieveExplorerGroupDto(savedExplorerGroup);

      return retrieveExplorerGroupDto;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get all groups for Explorer Screen
   *
   * @returns {Promise<RetrieveExplorerGroupDto[]>}
   * @memberof ExplorerGroupController
   */
  async getAll(): Promise<RetrieveExplorerGroupDto[]> {
    try {
      // get array all ExplorerGroup entities
      const explorerGroups = await this._ExplorerGroupService.getAllExplorerGroups();
      // convert to array dtos
      const retrieveExplorerGroupDtos = explorerGroups.map((explorerGroup) => {
        // sort by order
        explorerGroup.explorerCelebs = explorerGroup.explorerCelebs
          .filter((explorerCeleb) => !explorerCeleb.celeb.deleted_at)
          .sort((a, b) => {
            return a.order - b.order;
          });
        explorerGroup.explorerCategories = explorerGroup.explorerCategories
          .filter((explorerCategory) => !explorerCategory.category.deleted_at)
          .sort((a, b) => {
            return a.order - b.order;
          });

        return new RetrieveExplorerGroupDto(explorerGroup);
      });

      return retrieveExplorerGroupDtos;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Delete ExplorerGroup entity by id
   *
   * @param {string} id
   * @returns {Promise<boolean>}
   * @memberof ExplorerGroupController
   */
  async delete(id: string): Promise<boolean> {
    try {
      // remove ExplorerGroup Entity
      await this._ExplorerGroupService.removeById(id);

      return true;
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestError('invalid id');
      }

      throw e;
    }
  }

  /**
   * Edit ExplorerGroup elements for explore screen
   *
   * @param {UpdateExplorerGroupsDto} reqBody
   * @returns {Promise<RetrieveExplorerGroupDto[]>}
   * @memberof ExplorerGroupController
   */
  async edit(reqBody: UpdateExplorerGroupsDto): Promise<RetrieveExplorerGroupDto[]> {
    try {
      // parse body request object
      const { groups } = reqBody;
      // convert to array entities
      const entities = groups.map((group) => this.convertDtoToEntity(group));
      // edit ExplorerGroup entities
      const savedEntities = await this._ExplorerGroupService.saveMany(entities);
      const ids = savedEntities.map((entity) => entity.id);
      // remove unnecessary entities
      await this._ExplorerGroupService.removeAllWithIdNotInArray(ids);
      await this._ExplorerCelebrityService.removeAllNullGroupId();
      await this._ExplorerCategoryService.removeAllNullGroupId();
      // convert to array dtos
      const data = savedEntities.map((explorerGroup) => new RetrieveExplorerGroupDto(explorerGroup));

      return data;
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestError('nonexistent id');
      }
      throw e;
    }
  }

  private convertDtoToEntity(dto: CreateExplorerGroupDto): ExplorerGroup {
    const { explorerCelebs, explorerCategories, type } = dto;
    const entity = dto.toEntityObject();

    // filter duplicate celebId and categoryId
    if (type != EXPLORER_GROUP_TYPE.CATEGORY) {
      dto.explorerCelebs = explorerCelebs.filter(
        (obj, pos, arr) => arr.map((mapObj) => mapObj.celebId).indexOf(obj.celebId) === pos
      );
      entity.explorerCategories = [];
    } else {
      dto.explorerCategories = explorerCategories.filter(
        (obj, pos, arr) => arr.map((mapObj) => mapObj.categoryId).indexOf(obj.categoryId) === pos
      );
      entity.explorerCelebs = [];
    }

    return entity;
  }
}
export default ExplorerGroupController;
