import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { CreateTiendaDto } from './dto/tienda.dto';

@Controller('tienda')
export class TiendaController {
  constructor(private readonly tiendaServiceRepo: TiendaService) { }

  //Metodo para crear un producto
  @Post()
  create(@Body() tiendaDto: CreateTiendaDto) {
    return this.tiendaServiceRepo.create(tiendaDto);
  }

  //Metodo para mostrar todos los productos
  @Get()
  findAll() {
    return this.tiendaServiceRepo.findAll();
  }

  //Metodo para mostrar un producto especifico
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiendaServiceRepo.findOne(id);
  }

  //Eliminar un producto especifico
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiendaServiceRepo.remove(id);
  }

  //Crear método patch, para actualizar
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTiendaDto: CreateTiendaDto,
  ) {
    return this.tiendaServiceRepo.update(id, updateTiendaDto);
  }
}
