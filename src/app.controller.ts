import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate')
  async generateWebsite(@Body() body: { prompt: string }): Promise<string> {
    return this.appService.generateWebsite(body.prompt);
  }
}
