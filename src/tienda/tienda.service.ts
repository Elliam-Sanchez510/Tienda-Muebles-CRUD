import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tienda } from './entities/tienda.entity';
import { TiendaImage } from './entities/tienda-image.entity';
import { CreateTiendaDto } from './dto/tienda.dto';

@Injectable()
export class TiendaService {
  constructor(
    @InjectRepository(Tienda)
    private readonly tiendaRepository: Repository<Tienda>,
    @InjectRepository(TiendaImage)
    private readonly imageRepository: Repository<TiendaImage>,
  ) { }

  async create(tiendaoDto: CreateTiendaDto) {
    const { images = [], ...detalleTienda } = tiendaoDto;
    const tienda = await this.tiendaRepository.create({
      ...detalleTienda,
      images: images.map((image) =>
        this.imageRepository.create({ url: image }),
      ),
    });
    await this.tiendaRepository.save(tienda);
    return tienda;
  }

  //Metodo para visualizar todos los productos
  findAll() {
    return this.tiendaRepository.find({relations:{images: true}});
  }

  //Metodo para visualizar un producto especifico
  findOne(id: string) {
    return this.tiendaRepository.findOneBy({ id });
  }

  //Remover un producto especifico
  async remove(id: string) {
    const product = await this.findOne(id);
    await this.tiendaRepository.remove(product);
    return 'Producto eliminado satisfactoriamente';
  }

  async update(id: string, cambios: CreateTiendaDto) {
    const tienda = await this.tiendaRepository.preload({
      id: id,
      ...cambios,
      images: [],
    });
    await this.tiendaRepository.save(tienda);
    return tienda;
  }
}
