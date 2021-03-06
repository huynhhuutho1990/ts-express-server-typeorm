import express, { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { SuccessResponse, SuccessMsgResponse } from '../../../../common/api-response';
import ExplorerGroupController from '../../explorer/group/controller';
import { ExplorerGroupService, ExplorerCelebrityService, ExplorerCategoryService } from '../../../../services';
import { RetrieveExplorerGroupDto, UpdateExplorerGroupsDto, CreateExplorerGroupDto } from '../../../../database/dto';
import RequestDtoValidator from '../../../../middlewares/requestDtoValidator';

const router = express.Router();
const explorerGroupService = new ExplorerGroupService();
const explorerCelebService = new ExplorerCelebrityService();
const explorerCategoryService = new ExplorerCategoryService();

router.put('/', RequestDtoValidator(UpdateExplorerGroupsDto), async (req: Request, res: Response) => {
  const explorerGroupController = new ExplorerGroupController(
    explorerGroupService,
    explorerCelebService,
    explorerCategoryService
  );

  const updateHomeGroupsDto = plainToClass(UpdateExplorerGroupsDto, req.body);
  const retrieveHomeGroupDto: RetrieveExplorerGroupDto[] = await explorerGroupController.edit(updateHomeGroupsDto);

  new SuccessResponse('Update Successfully', retrieveHomeGroupDto).send(res);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const explorerGroupController = new ExplorerGroupController(
    explorerGroupService,
    explorerCelebService,
    explorerCategoryService
  );

  await explorerGroupController.delete(id);

  new SuccessMsgResponse('Delete Successfully').send(res);
});

router.post('/', RequestDtoValidator(CreateExplorerGroupDto), async (req: Request, res: Response) => {
  const explorerGroupController = new ExplorerGroupController(
    explorerGroupService,
    explorerCelebService,
    explorerCategoryService
  );

  const createExplorerGroupDto = plainToClass(CreateExplorerGroupDto, req.body);
  const retrieveHomeGroupDto: RetrieveExplorerGroupDto = await explorerGroupController.create(createExplorerGroupDto);

  new SuccessResponse('Create Successfully', retrieveHomeGroupDto).send(res);
});

export default router;
