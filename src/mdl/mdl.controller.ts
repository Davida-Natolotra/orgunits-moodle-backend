import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MdlService } from './mdl.service';
import { UpdateMdlDto } from './dto/update-mdl.dto';

@Controller('mdl')
export class MdlController {
  constructor(private readonly mdlService: MdlService) {}

  @Get(':email')
  get(@Param('email') email: string): Observable<any> {
    return this.mdlService.get(email);
  }

  @Patch('update-fields')
  updateUser(@Body() updateMdlDto: UpdateMdlDto): Observable<any> {
    return this.mdlService.updateUser(updateMdlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<string> {
    return this.mdlService.remove(+id);
  }
}
