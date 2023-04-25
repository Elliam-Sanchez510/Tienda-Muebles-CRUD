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
  ) {}

  //Metodo para crear un producto
  /*   async create(productoDto: CreateProductDto) {
    const product = this.tiendaRepository.create(productoDto);
    await this.tiendaRepository.save(product);

    return product;
  } */
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
    return this.tiendaRepository.find();
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

  //Actualizar un producto especifico
  // async update(id: string, cambios: CreateProductDto) {
  //   const findProduct = await this.findOne(id);
  //   const updatedProducto = await this.tiendaRepository.merge(
  //     findProduct,
  //     cambios,
  //   );

  //   return this.tiendaRepository.save(updatedProducto);
  // }
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
