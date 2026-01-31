import { Module } from '@nestjs/common';
import { MdlService } from './mdl.service';
import { MdlController } from './mdl.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [MdlController],
  providers: [MdlService],
  imports: [HttpModule],
})
export class MdlModule {}
