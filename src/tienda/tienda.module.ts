import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tienda } from './entities/tienda.entity';
import { TiendaController } from './tienda.controller';
import { TiendaService } from './tienda.service';
import { TiendaImage } from './entities/tienda-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tienda, TiendaImage])],
  controllers: [TiendaController],
  providers: [TiendaService],
})
export class TiendaModule { }
