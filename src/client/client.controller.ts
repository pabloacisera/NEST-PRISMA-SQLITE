import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('client')
export class ClientController {

  @Get('/')
  getAllClients(){
    return '¡Listar Clientes!'
  }

  @Get('/:id')
  getClientId(){
    return 'Obteniendo cliente por Id;'
  }
  
  @Post('/create')
  createClient(){
    return '¡Creando nuevo cliente!'
  }

  @Put('/update/:id')
  updateClient(){
    return '¡Modificando perfil de cliente!'
  }

  @Delete('/delete/:id')
  deleteClient(){
    return '¡Borrando perfil de cliente!'
  }
}
