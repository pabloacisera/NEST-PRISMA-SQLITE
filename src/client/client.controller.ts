import { Controller, Delete, Get, Post, Put, UseGuards, UsePipes, ValidationPipe, Body, Param, Patch } from '@nestjs/common';
import { jwtAuthGuard } from 'src/user_module/jwt.auth.guard';
import { ClientModuleService } from './client.service'
import { CreateClientDto } from './clientInterface/client.dto';
import { ApiTags } from '@nestjs/swagger'; 

@Controller('client')
export class ClientController {

  constructor( private readonly clientModuleService: ClientModuleService){}

  // @UseGuards(jwtAuthGuard)
  @Get('/')
  async getAllClients() {
    return this.clientModuleService.getAllClients();
  }

  @Get('/:id')
  async getClientById(@Param('id') id:string){
    return this.clientModuleService.getClientById(Number(id))
  }
  
  @Post('/create')
  @UsePipes(new ValidationPipe({transform:true}))
  async createClient(@Body() createClientDto: CreateClientDto ){
   return this.clientModuleService.createClient(createClientDto)
  }

  @Put('/update/:id')
  @UsePipes(new ValidationPipe({transform:true}))
  updateClientById(
    @Param('id') id:string,
    @Body() updateClientDto: CreateClientDto
  ){
    return this.clientModuleService.updateClient(Number(id), updateClientDto)
  }

  @Delete('/delete/:id')
  async deleteClientById( @Param('id') id:string ){
    return this.clientModuleService.deleteClient(Number(id))
  }

  @Patch('/patch/:id')
  @UsePipes(new ValidationPipe({transform:true}))
  async patchClientById(
    @Param('id') id:string,
    @Body() patchClientDto: CreateClientDto
  ){
    return this.clientModuleService.patchClient(Number(id), patchClientDto)
  }

}
