import { RequestHandler } from 'express';
import { NO_CONTENT } from 'http-status';

import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import { ILogger } from '@infrastructure/logger/ILogger';
import ICloseAccountService from '@service/close/ICloseAccountService';

export default class CloseAccountController {
  constructor(private closeAccountService: ICloseAccountService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { CPF } = request.params;

      await this.closeAccountService.close(CPF as string);

      this.logger.info(`Close successfully`);

      return response.status(NO_CONTENT).json();
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      this.logger.controllerError(`fail to close`, errorInfo, request, responseData);

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
